import os
import sys

# Ensure UTF-8 output on Windows console
if sys.platform.startswith('win'):
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.detach())

drills_dir = r"C:\Users\sangmesh\Desktop\global-drill-system-nextjs - Copy\app\drills"

for root, dirs, files in os.walk(drills_dir):
    for file in files:
        if file.endswith('.js') and not file.endswith('page.js') and file != 'FPSHubClient.js':
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                code = f.read()
            
            # Check for active (not commented out) endGame() or setGameState('gameOver') that are conditioned on lives
            # We can find occurrences of 'endGame(' or 'gameOver' and check if there's any 'lives' or 'miss' or 'strike' on preceding lines.
            lines = code.splitlines()
            for idx, line in enumerate(lines):
                if ('endGame(' in line or 'setGameState("gameOver")' in line or "setGameState('gameOver')" in line) and not line.strip().startswith('//'):
                    # Check context of preceding 10 lines
                    start = max(0, idx - 8)
                    context = "\n".join(lines[start:idx+1])
                    if any(x in context.lower() for x in ['live', 'miss', 'strike', 'limit', 'fail']) and 'timeleft' not in context.lower() and 'time_left' not in context.lower():
                        # Make sure it's not commented out
                        print(f"File: {file} - Line {idx+1}")
                        print(context)
                        print("=" * 60)
