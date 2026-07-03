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
            
            # Search for any active endGame() or setGameState('gameOver')/setGameState("gameOver")
            # excluding comments
            lines = code.splitlines()
            for idx, line in enumerate(lines):
                if ('endGame(' in line or 'setGameState("gameOver")' in line or "setGameState('gameOver')" in line) and not line.strip().startswith('//'):
                    # Check if there is any reference to lives, misses, strikes, or stamina within the 10 preceding lines
                    start = max(0, idx - 10)
                    ctx = lines[start:idx+1]
                    ctx_str = "\n".join(ctx).lower()
                    
                    if any(w in ctx_str for w in ['live', 'miss', 'strike', 'stamina', 'penalty']):
                        # Make sure it's not a timer-based check
                        if 'timeleft' not in ctx_str and 'time_left' not in ctx_str and 'time_remaining' not in ctx_str:
                            # Verify if any part of the trigger is commented out
                            is_commented = False
                            for cl in lines[start:idx+1]:
                                if cl.strip().startswith('//'):
                                    is_commented = True
                            if not is_commented:
                                print(f"FILE: {file} - Line {idx+1}")
                                print("\n".join(f"  {start+1+i}: {lines[start+i]}" for i in range(idx - start + 2) if start+i < len(lines)))
                                print("=" * 60)
