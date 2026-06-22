import os
import re

BASE = r"c:\Users\sangmesh\Desktop\global-drill-system-nextjs - Copy"

# Cognitive drill client files to fix
cognitive_drills = [
    # attention
    "app/drills/cognitive/attention/sustained-attention/SustainedAttentionClient.js",
    # focus
    "app/drills/cognitive/focus/concentration-grid/ConcentrationGridClient.js",
    "app/drills/cognitive/focus/distraction-fighter/DistractionFighterClient.js",
    "app/drills/cognitive/focus/focus-timer/FocusTimerClient.js",
    # memory  
    "app/drills/cognitive/memory/card-matching/CardMatchingClient.js",
    "app/drills/cognitive/memory/memory-sequence/MemorySequenceClient.js",
    "app/drills/cognitive/memory/number-recall/NumberRecallClient.js",
    "app/drills/cognitive/memory/pattern-recognition/PatternRecognitionClient.js",
    # problem-solving
    "app/drills/cognitive/problem-solving/logic-puzzles/LogicPuzzlesClient.js",
    "app/drills/cognitive/problem-solving/sudoku/SudokuClient.js",
    "app/drills/cognitive/problem-solving/tower-of-hanoi/TowerOfHanoiClient.js",
    # processing-speed
    "app/drills/cognitive/processing-speed/quick-math/QuickMathClient.js",
    "app/drills/cognitive/processing-speed/reaction-time/ReactionTimeClient.js",
    "app/drills/cognitive/processing-speed/symbol-matching/SymbolMatchingClient.js",
]

GAME_END_IMPORT = "import GameEndScreen from '../../../../../components/GameEndScreen';"
GAME_ENGINE_IMPORT = "import useGameEngine from '../../../../../lib/useGameEngine';"

def fix_file(rel_path):
    full = os.path.join(BASE, rel_path)
    if not os.path.exists(full):
        print(f"  SKIP: {rel_path} not found")
        return False
    
    with open(full, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Skip if already has GameEndScreen
    if 'GameEndScreen' in content and 'engine.shareScore' in content:
        print(f"  OK: {rel_path} already migrated")
        return False
    
    changes = []
    
    # 1. Add imports if missing
    if 'GameEndScreen' not in content:
        # Find the last import line
        match = re.search(r"(from ['\"][^'\"]+['\"];)\n", content)
        if match:
            last_import_end = match.end()
            content = content[:last_import_end] + "\n" + GAME_ENGINE_IMPORT + "\n" + GAME_END_IMPORT + content[last_import_end:]
            changes.append("imports")
    
    # 2. Replace old end screen with GameEndScreen
    old_end_pattern = r"\{gameState === 'ended' && \(<div class.*?Times Up.*?ResultCard.*?</div>\)\}"
    new_end = """{engine.gameState === 'ended' && (
            <GameEndScreen
              score={engine.score}
              bestScore={engine.bestScore}
              accuracy={engine.accuracy}
              bestCombo={engine.bestCombo}
              rating={engine.rating}
              newBest={engine.newBest}
              lives={engine.lives}
              maxLives={5}
              drillName="Drill"
              drillBackLink="/drills/cognitive"
              isDarkMode={isDarkMode}
              onPlayAgain={engine.startGame}
              onShare={engine.shareScore}
            />
          )}"""
    
    if 'ResultCard' in content or "Time's Up!" in content:
        # More flexible - find the end section
        start_marker = "{gameState === 'ended' && ("
        if start_marker in content:
            idx = content.find(start_marker)
            # Find the closing })}
            end_idx = content.find(")}", idx)
            while end_idx > 0:
                # Look for the pattern })} to end the block
                if content[end_idx:end_idx+3] == ")}>":
                    end_idx = content.find(")}", end_idx+3)
                    continue
                if content[end_idx:end_idx+3] != ")}":
                    end_idx = content.find(")}", end_idx+3)
                    continue
                break
            
            content = content[:idx] + new_end + content[end_idx+3:]
            changes.append("end screen")
    
    # 3. Remove old ResultCard and StatCard helper funcs (keep StatCard)
    if re.search(r'\nfunction ResultCard.*?\n\}', content, re.DOTALL):
        content = re.sub(r'\nfunction ResultCard.*?\n\}', '', content, re.DOTALL)
        changes.append("removed ResultCard")
    
    if changes:
        with open(full, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  FIXED: {rel_path} ({', '.join(changes)})")
        return True
    else:
        print(f"  NO CHANGE: {rel_path}")
        return False

count = 0
for drill in cognitive_drills:
    if fix_file(drill):
        count += 1

print(f"\nDone! {count} cognitive drill files updated.")