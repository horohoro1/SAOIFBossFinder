# ゲーム内アイテム画像解析ツール

このツールは、ゲーム内のアイテム画像を解析し、その情報をJSON形式で抽出するためのものです。

## 機能

- 画像からアイテム名、効果、属性、武器種などを抽出
- OllamaのQwen3-VLモデルを使用して画像解析
- 解析結果をraw_results.jsonに保存
- 解析が困難な画像はreview.jsonに記録

## インストール

1. Python 3.14.3以上が必要です
2. Ollamaをローカルで起動してください（ポート11434）
3. qwen3-vl:8bモデルをダウンロードしてください

## 使用方法

### 通常実行
```bash
python analyze_images.py
```

### 全画像再解析
```bash
python analyze_images.py --force
```

### テスト実行（1枚だけ解析）
```bash
python analyze_images.py --test
```

## フォルダ構成

- `images/` - 解析対象の画像ファイルが入る
- `raw_results.json` - 解析結果が保存される
- `review.json` - 解析不能な画像が記録される
- `error.log` - エラー情報が記録される

## 出力形式

解析結果は以下のようなJSON形式で保存されます：

```json
{
  "source_image": "001.png",
  "name": "怪食花のインゴット",
  "filters": {
    "col": null,
    "proficiency": null,
    "experience": null,
    "damage": "nonCritical",
    "weaponTypes": [],
    "weaponWeaknesses": [],
    "attributes": ["火"]
  },
  "raw_text": "火属性スキルの弱点ダメージが1.18%上昇。※重複不可。火属性以外のダメージが50%低下。",
  "notes": [
    "重複不可"
  ],
  "confidence": 0.95
}
```

## 注意事項

- 画像に書かれていない情報は推測しません
- 数字の認識精度に注意してください（1.18%と1.16%など）
- `filters` は説明文から抽出します。Col・熟練度・経験値は `fixed`・`percent`・`null`、該当しないダメージ分類は `null` です
- 解析不能な画像はreview.jsonに記録されます
```

## 必要な依存パッケージのインストール

```bash
pip install requests pillow
```

## 使い方

1. `images`フォルダに解析したい画像を配置してください
2. Ollamaが起動していることを確認してください（ポート11434）
3. qwen3-vl:8bモデルをダウンロードしてください（`ollama pull qwen3-vl:8b`）

```bash
# 1枚だけテスト実行
python analyze_images.py --test

# 全画像解析（新規）
python analyze_images.py

# 全画像再解析
python analyze_images.py --force
