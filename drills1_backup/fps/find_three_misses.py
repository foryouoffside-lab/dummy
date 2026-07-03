import os
import re
import sys

if sys.platform.startswith('win'):
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.detach())

drills_dir = r"C:\Users\sangmesh\Desktop\global-drill-system-nextjs - Copy\app\drills"

# Patterns to match 3 misses, 3 strikes, 3 lives, 3 target misses, etc.
patterns = [
    r'\bmissesRef\.current\s*[>=]=\s*3',
    r'\bmisses\s*[>=]=\s*3',
    r'\bstrikesRef\.current\s*[>=]=\s*3',
    r'\bstrikes\s*[>=]=\s*3',
    r'\blivesRef\.current\s*<=\s*0',
    r'\blives\s*<=\s*0',
    r'===\s*3',
    r'==\s*3',
    r'>=\s*3',
    r'<=\s*0'
]

combined_pattern = re.compile('|'.join(patterns))

for root, dirs, files in os.walk(drills_dir):
    for file in files:
        if file.endswith('.js') and not file.endswith('page.js') and file != 'FPSHubClient.js':
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                code = f.read()
            
            lines = code.splitlines()
            for idx, line in enumerate(lines):
                if combined_pattern.search(line) and not line.strip().startswith('//'):
                    # Check if lives, misses, strikes, target, etc. is in the line or adjacent lines
                    start = max(0, idx - 3)
                    end = min(len(lines), idx + 4)
                    context = "\n".join(lines[start:end]).lower()
                    if any(kw in context for kw in ['live', 'miss', 'strike', 'target', 'fail', 'endgame', 'gameover']):
                        if 'timeleft' not in context and 'time_left' not in context and 'remaining' not in context:
                            print(f"File: {file} - Line {idx+1}")
                            print(f"Line content: {line}")
                            print("Context:")
                            print("\n".join(f"  {i+1}: {lines[i]}" for i in range(start, end)))
                            print("=" * 60)
