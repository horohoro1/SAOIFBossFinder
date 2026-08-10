import json
from pathlib import Path
p = Path('bosses.json')
data = json.loads(p.read_text(encoding='utf-8'))
lab = [b for b in data if b.get('location') == 'labyrinth']
lab = sorted(lab, key=lambda x: (x.get('chapter', 0), x.get('floor') if isinstance(x.get('floor'), int) else -1))
print('total', len(lab))
missing = [b for b in lab if 'integralSeries' not in b]
print('missing', len(missing))
print('---')
for b in lab:
    print(b.get('chapter'), b.get('floor'), b.get('integralSeries', '<missing>'), b.get('nickname'))
print('--- missing entries ---')
for b in missing:
    print(b.get('chapter'), b.get('floor'), b.get('nickname'))
