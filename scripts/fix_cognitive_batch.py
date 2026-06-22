import os, re

BASE = r"c:\Users\sangmesh\Desktop\global-drill-system-nextjs - Copy"
DRILS_DIR = os.path.join(BASE, "app", "drills", "cognitive")

CHANGES = 0

def fix_cognitive_drill(fp):
    global CHANGES
    fname = os.path.basename(fp)
    drill_id = os.path.basename(os.path.dirname(fp))
    drill_name = drill_id.replace("-", " ").title()
    rel = os.path.relpath(fp, BASE).replace("\\", "/")
    share_path = rel.replace("/" + fname, "").replace("app/", "")
    
    with open(fp, "r", encoding="utf-8") as fh:
        c = fh.read()
    
    # Already migrated
    if "GameEndScreen" in c and "engine.shareScore" in c:
        return False
    
    # No end screen
    if "ResultCard" not in c and "Time's Up!" not in c and "Final Score" not in c:
        return False
    
    print(f"FIXING: {rel} (id={drill_id})")
    
    # 1. Add imports
    if "GameEndScreen" not in c:
        c = c.replace(
            "} from 'lucide-react';",
            "} from 'lucide-react';\nimport useGameEngine from '../../../../../lib/useGameEngine';\nimport GameEndScreen from '../../../../../components/GameEndScreen';"
        )
    
    # 2. Replace end screen block
    new_end = "{engine.gameState === 'ended' && (\n                            <GameEndScreen\n                              score={engine.score}\n                              bestScore={engine.bestScore}\n                              accuracy={engine.accuracy}\n                              bestCombo={engine.bestCombo}\n                              rating={engine.rating}\n                              newBest={engine.newBest}\n                              lives={engine.lives}\n                              maxLives={5}\n                              drillName=\"" + drill_name + "\"\n                              drillBackLink=\"/drills/cognitive\"\n                              isDarkMode={isDarkMode}\n                              onPlayAgain={engine.startGame}\n                              onShare={engine.shareScore}\n                            />\n                          )}"
    
    # Find the old end screen (contains ResultCard + Time's Up etc.)
    for marker in ["gameState === 'gameOver'", "gameState === 'ended'"]:
        idx = c.find(marker)
        if idx < 0:
            continue
        brace_start = c.rfind("{", 0, idx)
        if brace_start < 0:
            continue
        # Find matching closing brace
        depth = 0
        end_idx = brace_start
        for i in range(brace_start, len(c)):
            if c[i] == '{':
                depth += 1
            elif c[i] == '}':
                depth -= 1
                if depth == 0:
                    end_idx = i + 1
                    break
        old = c[brace_start:end_idx]
        if "ResultCard" in old:
            c = c[:brace_start] + new_end + c[end_idx:]
            print("  - Replaced end screen")
            break
    
    # 3. Remove ResultCard function
    if "function ResultCard" in c:
        c = re.sub(r'\nfunction ResultCard[\s\S]*?\n\}', '', c)
        print("  - Removed ResultCard function")
    
    # 4. Add engine init
    if "const engine = useGameEngine" not in c:
        engine_init = """
  // === Shared Game Engine ===
  const engine = useGameEngine({
    category: 'cognitive',
    drillId: '""" + drill_id + """',
    drillName: '""" + drill_name + """',
    totalGameTime: 60,
    sharePath: '""" + share_path + """',
  });
"""
        mark = "const [isDarkMode, setIsDarkMode]"
        idx = c.find(mark)
        if idx > 0:
            line_end = c.find(";", idx)
            if line_end > 0:
                next_line = c.find("\n", line_end) + 1
                c = c[:next_line] + engine_init + c[next_line:]
                print("  - Added engine init")
    
    with open(fp, "w", encoding="utf-8") as fh:
        fh.write(c)
    CHANGES += 1
    print("  COMPLETE!")
    return True

def main():
    for root, dirs, files in os.walk(DRILS_DIR):
        for f in files:
            if not f.endswith("Client.js") or f == "CognitiveHubClient.js":
                continue
            fp = os.path.join(root, f)
            fix_cognitive_drill(fp)
    
    print(f"\n{'='*50}")
    print(f"Fixed {CHANGES} cognitive drill files")

if __name__ == "__main__":
    main()