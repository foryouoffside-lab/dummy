import os, re

BASE = r"c:\Users\sangmesh\Desktop\global-drill-system-nextjs - Copy"
IMPORTS = "\nimport useGameEngine from '../../../../../lib/useGameEngine';\nimport GameEndScreen from '../../../../../components/GameEndScreen';"

END_SCREEN = """{engine.gameState === 'ended' && (
                                <GameEndScreen
                                  score={engine.score}
                                  bestScore={engine.bestScore}
                                  accuracy={engine.accuracy}
                                  bestCombo={engine.bestCombo}
                                  rating={engine.rating}
                                  newBest={engine.newBest}
                                  lives={engine.lives}
                                  maxLives={5}
                                  drillName="%s"
                                  drillBackLink="/drills/cognitive"
                                  isDarkMode={isDarkMode}
                                  onPlayAgain={engine.startGame}
                                  onShare={engine.shareScore}
                                />
                              )}"""

ENGINE_INIT = """
  // === Shared Game Engine ===
  const engine = useGameEngine({
    category: 'cognitive',
    drillId: '%s',
    drillName: '%s',
    totalGameTime: 60,
    sharePath: '%s',
  });
"""

count = 0
for root, dirs, files in os.walk(os.path.join(BASE, "app", "drills", "cognitive")):
    for f in files:
        if not f.endswith("Client.js") or f == "CognitiveHubClient.js":
            continue
        
        fp = os.path.join(root, f)
        with open(fp, "r", encoding="utf-8") as fh:
            content = fh.read()
        
        if "GameEndScreen" in content and "engine.shareScore" in content:
            continue
            
        # Get drillId from folder
        drill_id = os.path.basename(os.path.dirname(fp))
        drill_name = drill_id.replace("-", " ").title()
        
        # Get share path relative to app/drills/
        rel = os.path.relpath(fp, BASE).replace("\\", "/")
        share_path = rel.replace("/" + f.split(".")[0] + ".js", "").replace("app/", "")
        
        print(f"Migrating: {rel} (id={drill_id})")
        
        # 1. Add imports
        if "GameEndScreen" not in content:
            # Find last import
            last_imp = content.rfind("from '")
            end_imp = content.find(";", last_imp) + 1 if last_imp >= 0 else 0
            content = content[:end_imp] + IMPORTS + content[end_imp:]
        
        # 2. Find and replace old end screen
        # Pattern: {gameState === 'ended' && (<div ... > ... </div>)}
        import re
        
        # Find the old end screen - look for the start marker and find matching braces
        idx = content.find("gameState === 'ended'")
        if idx > 0:
            # Go back to find the opening brace
            brace_start = content.rfind("{", 0, idx)
            if brace_start >= 0:
                # Find matching closing braces
                depth = 0
                end_idx = brace_start
                for i in range(brace_start, len(content)):
                    if content[i] == '{':
                        depth += 1
                    elif content[i] == '}':
                        depth -= 1
                        if depth == 0:
                            end_idx = i + 1
                            break
                
                # Replace the old end screen
                old_end = content[brace_start:end_idx]
                new_end = END_SCREEN % (drill_name,)
                
                # If the old end screen contains ResultCard calls, replace it
                if "ResultCard" in old_end or "Time's Up!" in old_end or "result" in old_end.lower():
                    content = content[:brace_start] + new_end + content[end_idx:]
                    print(f"  -> Replaced end screen")
                else:
                    print(f"  -> Old end screen didn't match expected pattern, skipping replacement")
                    continue
        else:
            print(f"  -> No end screen found, skipping")
            continue
        
        # 3. Add engine initialization (after useState declarations)
        if "const engine = useGameEngine" not in content:
            engine_code = ENGINE_INIT % (drill_id, drill_name, share_path)
            # Find the end of state declarations
            state_end = content.find("const [loading", 0)
            if state_end < 0:
                state_end = content.find("const [isDarkMode", 0)
            if state_end > 0:
                line_end = content.find(";", state_end)
                if line_end > 0:
                    # Find the next line after the last useState
                    next_line = content.find("\n", line_end)
                    content = content[:next_line+1] + engine_code + content[next_line+1:]
                    print(f"  -> Added engine init")
        
        # 4. Remove ResultCard function
        if "function ResultCard" in content:
            content = re.sub(r'\nfunction ResultCard[\s\S]*?\n\}', '', content)
            print(f"  -> Removed ResultCard helper")
        
        # 5. Update score stats in stat cards to use engine.*
        content = content.replace('value={score}', 'value={engine.score}')
        content = content.replace('value={bestScore}', 'value={engine.bestScore}')
        content = content.replace('value={combo}', 'value={engine.combo}')
        content = content.replace('value={bestCombo}', 'value={engine.bestCombo}')
        content = content.replace('value={lives}', 'value={engine.lives}')
        content = content.replace('value={timeRemaining}', 'value={engine.timeRemaining}')
        content = content.replace('value={`${timeRemaining}s`}', 'value={engine.timeRemaining === undefined ? "0s" : `${engine.timeRemaining}s`}')
        
        with open(fp, "w", encoding="utf-8") as fh:
            fh.write(content)
        count += 1
        print(f"  ✅ Done")

print(f"\n✅ {count} cognitive drill files migrated!")