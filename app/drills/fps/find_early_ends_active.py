import os
import re

drills_dir = r"C:\Users\sangmesh\Desktop\global-drill-system-nextjs - Copy\app\drills"

end_conditions = []

for root, dirs, files in os.walk(drills_dir):
    for file in files:
        if file.endswith('.js') and not file.endswith('page.js') and file != 'FPSHubClient.js':
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                code = f.read()
            
            lines = code.splitlines()
            for idx, line in enumerate(lines):
                # Look for calls to endGame() or setGameState('gameOver')
                if ('endGame(' in line or "setGameState('gameOver')" in line or 'setGameState("gameOver")' in line) and not line.strip().startswith('//'):
                    # Check context of preceding 8 lines
                    start = max(0, idx - 8)
                    context = "\n".join(lines[start:idx+1]).lower()
                    
                    # Look for lives, misses, strikes, wrong clicks, stamina, penalty, collapse, errors
                    if any(kw in context for kw in ['live', 'miss', 'strike', 'wrong', 'stamina', 'depleted', 'collapse']):
                        # Exclude timer-based completions
                        if 'time' not in context or ('timeleft' not in context and 'time_left' not in context and 'time_remaining' not in context):
                            end_conditions.append({
                                'file': file,
                                'line': idx + 1,
                                'content': line.strip(),
                                'context': "\n".join(lines[start:idx+2])
                            })

print(f"Found {len(end_conditions)} early endgame locations:")
for ec in end_conditions:
    print(f"File: {ec['file']} - Line {ec['line']}")
    print(f"Code: {ec['content']}".encode('ascii', 'ignore').decode('ascii'))
    print("Context:")
    print(ec['context'].encode('ascii', 'ignore').decode('ascii'))
    print("=" * 60)
