import os
import sys

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
            
            lines = code.splitlines()
            for idx, line in enumerate(lines):
                if ('endGame(' in line or "setGameState('gameOver')" in line or 'setGameState("gameOver")' in line) and not line.strip().startswith('//'):
                    # Check if this call is NOT in a typical timer function checking <= 0 or timerInterval
                    # Grab a window of 10 lines
                    start = max(0, idx - 5)
                    end = min(len(lines), idx + 5)
                    window = lines[start:idx+1]
                    window_str = "\n".join(window).lower()
                    
                    # If it has "time" and ("<= 0" or "=== 0"), it's probably the countdown timer.
                    # Otherwise, it might be an early termination condition.
                    is_timer = False
                    if 'time' in window_str and ('<= 0' in window_str or '<= 1' in window_str or '=== 0' in window_str or '== 0' in window_str):
                        is_timer = True
                        
                    if not is_timer:
                        print(f"File: {file} - Line {idx+1}")
                        print("\n".join(f"{i+1}: {lines[i]}" for i in range(start, min(len(lines), idx+6))))
                        print("=" * 60)
