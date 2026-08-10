from pathlib import Path
import subprocess
import sys

root = Path(__file__).resolve().parent.parent
script = root / 'src' / 'analyze_images.py'
python_exe = r'C:\Users\yusuk\AppData\Local\Python\pythoncore-3.14-64\python.exe'

cmd = [python_exe, str(script), '--test']
result = subprocess.run(cmd, cwd=root, capture_output=True, text=True)
print(result.stdout)
print(result.stderr)
print(f'exit_code={result.returncode}')
