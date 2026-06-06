import os
import sys

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
            
            # Find livesRef.current <= 0 or livesRef.current == 0
            # Print if there is endGame() or setGameState('gameOver') in the following 10 lines
            lines = code.splitlines()
            for idx, line in enumerate(lines):
                if 'livesRef.current <=' in line or 'livesRef.current ==' in line:
                    # check next 10 lines
                    next_10 = lines[idx:idx+10]
                    next_10_str = "\n".join(next_10)
                    print(f"File: {file} - Line {idx+1}")
                    print("\n".join(f"  {idx+1+i}: {lines[idx+i]}" for i in range(10) if idx+i < len(lines)))
                    print("-" * 50)
