import os
import sys

# Ensure UTF-8 output on Windows console
if sys.platform.startswith('win'):
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.detach())

drills_dir = r"C:\Users\sangmesh\Desktop\global-drill-system-nextjs - Copy\app\drills\fps"

for root, dirs, files in os.walk(drills_dir):
    for file in files:
        if file.endswith('.js') and not file.endswith('page.js') and file != 'FPSHubClient.js':
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                code = f.read()
            
            # Find livesRef.current <= 0 or lives <= 0 or misses >= 3 or strikes
            lines = code.splitlines()
            for idx, line in enumerate(lines):
                if ('livesRef' in line or 'lives' in line or 'strikes' in line) and ('<=' in line or '==' in line or '>=' in line or '===' in line):
                    start = max(0, idx - 3)
                    end = min(len(lines), idx + 6)
                    print(f"--- File: {file} (Line {idx+1}) ---")
                    for i in range(start, end):
                        print(f"{i+1}: {lines[i]}")
                    print("-" * 50)
