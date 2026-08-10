import argparse
import base64
import json
import re
import unicodedata
from pathlib import Path
from urllib import error, request

# 画像ファイルの拡張子リスト
IMAGE_EXTENSIONS = ('.png', '.jpg', '.jpeg', '.webp')

# グローバル変数
RAW_RESULTS_FILE = 'raw_results.json'
REVIEW_FILE = 'review.json'
ERROR_LOG_FILE = 'error.log'

# Qwen3-VLモデル名
QWEN3_VL_MODEL = 'qwen3-vl:8b'
REQUEST_TIMEOUT_SECONDS = 180

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
IMAGE_DIR_CANDIDATES = [
    SCRIPT_DIR / 'images',
    PROJECT_ROOT / 'images',
    PROJECT_ROOT / 'src' / 'images',
]
IMAGE_DIR = next((path for path in IMAGE_DIR_CANDIDATES if path.exists()), SCRIPT_DIR / 'images')
RAW_RESULTS_PATH = PROJECT_ROOT / RAW_RESULTS_FILE
REVIEW_PATH = PROJECT_ROOT / REVIEW_FILE
ERROR_LOG_PATH = PROJECT_ROOT / ERROR_LOG_FILE


def ensure_output_files():
    """出力ファイルを存在させる"""
    RAW_RESULTS_PATH.write_text('[]\n', encoding='utf-8')
    REVIEW_PATH.write_text('[]\n', encoding='utf-8')
    if not ERROR_LOG_PATH.exists():
        ERROR_LOG_PATH.touch()


def get_image_files():
    """imagesフォルダ内の画像ファイルを取得"""
    if not IMAGE_DIR.exists():
        print(f'Error: imagesフォルダが存在しません (checked: {IMAGE_DIR})')
        return []

    print(f'Using image directory: {IMAGE_DIR}')

    image_files = []
    for ext in IMAGE_EXTENSIONS:
        image_files.extend(IMAGE_DIR.glob(f'*{ext}'))
        image_files.extend(IMAGE_DIR.glob(f'*{ext.upper()}'))

    image_files = sorted(set(image_files), key=lambda path: path.name)
    return [path.name for path in image_files]


def load_existing_results():
    """既存の解析結果を読み込む"""
    if RAW_RESULTS_PATH.exists():
        with RAW_RESULTS_PATH.open('r', encoding='utf-8') as handle:
            return json.load(handle)
    return []


def load_review_list():
    """レビューが必要な画像リストを読み込む"""
    if REVIEW_PATH.exists():
        with REVIEW_PATH.open('r', encoding='utf-8') as handle:
            review_items = json.load(handle)
            if isinstance(review_items, list):
                return [item.get('source_image') for item in review_items if isinstance(item, dict)]
    return []


def append_error_log(message):
    """エラー内容をログに追記する"""
    with ERROR_LOG_PATH.open('a', encoding='utf-8') as handle:
        handle.write(message + '\n')


def encode_image(image_path):
    """画像をbase64エンコード"""
    with image_path.open('rb') as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')


def prepare_prompt():
    """AIに渡すプロンプトを作成"""
    return """画像内のゲームアイテム情報を読み取り、次のキーだけを持つJSONオブジェクトを返してください。
- name
- description
- notes
- confidence

ルール:
- 画像に書かれている内容だけを使う
- 推測しない
- 余計な説明やMarkdownを付けない
- 文字が読めない場合はnullまたは\"unknown\"を使う
- 返却はJSONのみ
"""


def send_to_ollama(image_path):
    """Ollamaに画像とプロンプトを送信して結果を得る"""
    try:
        encoded_image = encode_image(image_path)
        prompt = prepare_prompt()

        payload = {
            'model': QWEN3_VL_MODEL,
            'prompt': prompt,
            'images': [encoded_image],
            'stream': False,
            'format': 'json',
        }
        data = json.dumps(payload).encode('utf-8')
        req = request.Request(
            'http://localhost:11434/api/generate',
            data=data,
            headers={'Content-Type': 'application/json'},
            method='POST',
        )
        with request.urlopen(req, timeout=REQUEST_TIMEOUT_SECONDS) as response:
            body = response.read().decode('utf-8')

        if not body.strip():
            return None

        try:
            parsed_body = json.loads(body)
            if isinstance(parsed_body, dict):
                response_text = parsed_body.get('response', '')
                if isinstance(response_text, str) and response_text.strip():
                    return response_text

                thinking = parsed_body.get('thinking', '')
                if isinstance(thinking, str) and thinking.strip():
                    try:
                        thinking_obj = json.loads(thinking)
                        if isinstance(thinking_obj, dict):
                            if isinstance(thinking_obj.get('response'), str) and thinking_obj['response'].strip():
                                return thinking_obj['response']
                            if isinstance(thinking_obj.get('content'), str) and thinking_obj['content'].strip():
                                return thinking_obj['content']
                            if any(key in thinking_obj for key in ('name', 'description', 'notes', 'confidence')):
                                return json.dumps(thinking_obj, ensure_ascii=False)
                        elif isinstance(thinking_obj, str) and thinking_obj.strip():
                            return thinking_obj
                    except json.JSONDecodeError:
                        pass

                message = parsed_body.get('message', {})
                if isinstance(message, dict):
                    content = message.get('content', '')
                    if isinstance(content, str) and content.strip():
                        return content
        except json.JSONDecodeError:
            pass

        parts = []
        for line in body.splitlines():
            if not line.strip():
                continue
            try:
                parsed = json.loads(line)
            except json.JSONDecodeError:
                continue
            if isinstance(parsed, dict):
                part = parsed.get('response', '')
                if isinstance(part, str) and part:
                    parts.append(part)
                else:
                    thinking = parsed.get('thinking', '')
                    if isinstance(thinking, str) and thinking.strip():
                        try:
                            thinking_obj = json.loads(thinking)
                            if isinstance(thinking_obj, dict):
                                if isinstance(thinking_obj.get('response'), str) and thinking_obj['response'].strip():
                                    parts.append(thinking_obj['response'])
                                elif isinstance(thinking_obj.get('content'), str) and thinking_obj['content'].strip():
                                    parts.append(thinking_obj['content'])
                                elif any(key in thinking_obj for key in ('name', 'description', 'notes', 'confidence')):
                                    parts.append(json.dumps(thinking_obj, ensure_ascii=False))
                            elif isinstance(thinking_obj, str) and thinking_obj.strip():
                                parts.append(thinking_obj)
                        except json.JSONDecodeError:
                            parts.append(thinking)

                    message = parsed.get('message', {})
                    if isinstance(message, dict):
                        content = message.get('content', '')
                        if isinstance(content, str) and content.strip():
                            parts.append(content)

        return ''.join(parts)
    except (error.URLError, TimeoutError, ConnectionError, OSError) as exc:
        print(f'Ollamaサーバーに接続できません: {exc}')
        append_error_log(f'{image_path.name}: Ollamaサーバーに接続できません: {exc}')
        return None
    except Exception as exc:
        print(f'Ollamaへの送信中にエラーが発生しました: {exc}')
        append_error_log(f'{image_path.name}: Ollamaへの送信中にエラーが発生しました: {exc}')
        return None


def parse_json_response(response_text):
    """AIからのJSONレスポンスをパース"""
    try:
        if isinstance(response_text, dict):
            return response_text

        if not isinstance(response_text, str):
            return None

        text = response_text.strip()
        if not text:
            return None

        if text.startswith('```'):
            code_block = re.search(r'```(?:json)?\s*(.*?)```', text, re.S | re.I)
            if code_block:
                text = code_block.group(1)

        if text.startswith('{') or text.startswith('['):
            try:
                return json.loads(text)
            except json.JSONDecodeError:
                pass

        for start_idx in range(len(text)):
            if text[start_idx] == '{':
                brace_count = 0
                in_string = False
                escaped = False
                for end_idx in range(start_idx, len(text)):
                    char = text[end_idx]
                    if in_string:
                        if escaped:
                            escaped = False
                        elif char == '\\':
                            escaped = True
                        elif char == '"':
                            in_string = False
                        continue
                    if char == '"':
                        in_string = True
                    elif char == '{':
                        brace_count += 1
                    elif char == '}':
                        brace_count -= 1
                        if brace_count == 0:
                            candidate = text[start_idx:end_idx + 1]
                            try:
                                return json.loads(candidate)
                            except json.JSONDecodeError:
                                break
                break

        return None
    except Exception as exc:
        print(f'JSONパースエラー: {exc}')
        append_error_log(f'JSONパースエラー: {exc}')
        return None


def normalize_notes(notes_data):
    """注意書きの形式を安全に正規化する"""
    if not notes_data:
        return []

    if isinstance(notes_data, str):
        note_items = [notes_data]
    elif isinstance(notes_data, list):
        note_items = notes_data
    else:
        note_items = [notes_data]

    normalized = []
    for note in note_items:
        if isinstance(note, str) and note.strip():
            normalized.append(note.strip())
        elif isinstance(note, dict):
            normalized.append(json.dumps(note, ensure_ascii=False))

    return normalized


def build_filters(raw_text):
    """説明文からインゴット検索用の正規化済みフィルター値を作る。"""
    text = unicodedata.normalize('NFKC', raw_text if isinstance(raw_text, str) else str(raw_text or '')).replace('両手銃', '両手槍')
    weapon_types = ('片手直剣', '片手細剣', '片手棍', '両手斧', '両手槍', '短剣', '弓', '盾')
    weapon_weaknesses = ('斬', '打', '突')
    attributes = ('火', '水', '風', '土', '聖', '闇')

    def increase_type(keyword):
        match = re.search(
            rf'{re.escape(keyword)}[^※。\n]{{0,32}}?([0-9]+(?:\.[0-9]+)?)(%)?\s*(?:上昇|増加|アップ)',
            text,
        )
        if not match:
            return None
        return 'percent' if match.group(2) else 'fixed'

    damage = None
    if 'クリティカルダメージ' in text:
        damage = 'critical'
    elif 'ダメージ' in text:
        damage = 'nonCritical'

    return {
        'col': increase_type('Col獲得量'),
        'proficiency': increase_type('熟練度経験値獲得量'),
        'experience': None if '熟練度経験値獲得量' in text else increase_type('経験値獲得量'),
        'damage': damage,
        'weaponTypes': [weapon for weapon in weapon_types if weapon in text],
        'weaponWeaknesses': [
            weakness for weakness in weapon_weaknesses if f'{weakness}属性' in text
        ],
        'attributes': [attribute for attribute in attributes if f'{attribute}属性' in text],
    }


def build_result(parsed_data):
    """パース済みデータから出力結果を組み立てる"""
    if not isinstance(parsed_data, dict):
        parsed_data = {}

    raw_text = parsed_data.get('description') or parsed_data.get('raw_text', '')
    if isinstance(raw_text, str):
        raw_text = raw_text.replace('両手銃', '両手槍')
    return {
        'source_image': '',
        'name': parsed_data.get('name') or parsed_data.get('item_name', 'unknown'),
        'filters': build_filters(raw_text),
        'raw_text': raw_text,
        'notes': normalize_notes(parsed_data.get('notes', [])),
        'confidence': parsed_data.get('confidence', 0.0),
    }


def process_image(image_name, force=False):
    """単一画像を処理"""
    existing_results = load_existing_results()
    review_list = load_review_list()

    if not force and any(item.get('source_image') == image_name for item in existing_results if isinstance(item, dict)):
        return 'skipped', None

    if image_name in review_list:
        return 'reviewed', None

    image_path = IMAGE_DIR / image_name

    print(f'[1/1] {image_name} processing...')

    try:
        response_text = send_to_ollama(image_path)

        if not response_text:
            print(f'{image_name}: Ollamaからの応答がありません')
            return 'error', None

        parsed_data = parse_json_response(response_text)

        if not parsed_data:
            print(f'{image_name}: JSONパースに失敗しました')
            return 'error', None

        result = build_result(parsed_data)
        result['source_image'] = image_name

        print(f"[1/1] success: {result['name']}")
        return 'success', result
    except Exception as exc:
        print(f'{image_name}: 処理中に予期しないエラーが発生しました: {exc}')
        append_error_log(f'{image_name}: 処理中に予期しないエラーが発生しました: {exc}')
        return 'error', None


def process_all_images(force=False):
    """すべての画像を処理"""
    ensure_output_files()
    image_files = get_image_files()

    if not image_files:
        print('画像ファイルが見つかりません')
        return

    print(f'全画像数: {len(image_files)}')

    existing_results = load_existing_results()
    success_count = 0
    review_count = 0
    error_count = 0

    all_results = existing_results.copy() if isinstance(existing_results, list) else []

    for i, image_name in enumerate(image_files, 1):
        print(f'[{i}/{len(image_files)}] {image_name} processing...')

        status, result = process_image(image_name, force)

        if status == 'success' and result:
            existing_result_index = None
            for idx, item in enumerate(all_results):
                if isinstance(item, dict) and item.get('source_image') == image_name:
                    existing_result_index = idx
                    break

            if existing_result_index is not None:
                all_results[existing_result_index] = result
            else:
                all_results.append(result)

            success_count += 1
            print(f'[{i}/{len(image_files)}] success: {result["name"]}')
        elif status == 'error':
            error_count += 1
            print(f'[{i}/{len(image_files)}] error: {image_name}')
        else:
            if status == 'reviewed':
                review_count += 1
                print(f'[{i}/{len(image_files)}] reviewed: {image_name}')

    with RAW_RESULTS_PATH.open('w', encoding='utf-8') as handle:
        json.dump(all_results, handle, ensure_ascii=False, indent=2)

    print(f'\nTotal: {len(image_files)}')
    print(f'Success: {success_count}')
    print(f'Review: {review_count}')
    print(f'Error: {error_count}')


def main():
    """メイン関数"""
    parser = argparse.ArgumentParser(description='画像からゲーム内アイテム情報を解析します')
    parser.add_argument('--force', action='store_true', help='全画像を再解析')
    parser.add_argument('--test', action='store_true', help='1枚だけテスト実行')

    args = parser.parse_args()
    ensure_output_files()

    if args.test:
        print('=== テスト実行 ===')
        image_files = get_image_files()
        if image_files:
            status, result = process_image(image_files[0], force=True)
            if status == 'success' and result:
                print('\nテスト結果:')
                print(json.dumps(result, ensure_ascii=False, indent=2))
                with RAW_RESULTS_PATH.open('w', encoding='utf-8') as handle:
                    json.dump([result], handle, ensure_ascii=False, indent=2)
            else:
                print('テスト失敗')
        else:
            print('画像が見つかりません')
    else:
        process_all_images(args.force)


if __name__ == '__main__':
    main()
