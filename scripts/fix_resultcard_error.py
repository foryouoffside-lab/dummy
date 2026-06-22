import os, re

BASE = r"c:\Users\sangmesh\Desktop\global-drill-system-nextjs - Copy"
FIXED = 0

def fix_end_screen(fp, marker_state, game_over_text):
    """Fix a file that still has ResultCard references in the old end screen"""
    with open(fp, 'r', encoding='utf-8') as f:
        c = f.read()
    
    if 'ResultCard' not in c:
        return False
    
    drill_id = os.path.basename(os.path.dirname(fp))
    drill_name = drill_id.replace('-', ' ').title()
    rel = os.path.relpath(fp, BASE)
    
    print(f"FIXING: {rel}")
    
    # Build GameEndScreen replacement
    new_section = "{engine.gameState === 'ended' && (\n                            <GameEndScreen\n                              score={engine.score}\n                              bestScore={engine.bestScore}\n                              accuracy={engine.accuracy}\n                              bestCombo={engine.bestCombo}\n                              rating={engine.rating}\n                              newBest={engine.newBest}\n                              lives={engine.lives}\n                              maxLives={5}\n                              drillName=\"" + drill_name + "\"\n                              drillBackLink=\"/drills/cognitive\"\n                              isDarkMode={isDarkMode}\n                              onPlayAgain={engine.startGame}\n                              onShare={engine.shareScore}\n                            />\n                          )}"
    
    # Find the old end screen block containing ResultCard
    # Look for {gameState === 'gameOver' or {gameState === 'ended'
    marker = "gameState === '" + marker_state + "'"
    idx = c.find(marker)
    if idx < 0:
        print(f"  ERROR: marker '{marker}' not found")
        return False
    
    # Find the opening brace before the marker
    brace_start = c.rfind('{', 0, idx)
    if brace_start < 0:
        print(f"  ERROR: no opening brace found")
        return False
    
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
    
    old_block = c[brace_start:end_idx]
    
    if 'ResultCard' not in old_block:
        # Check for other blocks with ResultCard
        print(f"  First block doesn't have ResultCard, searching deeper...")
        # Look for other gameState markers
        for alt_marker in ["gameState === 'gameOver'", "gameState === 'ended'", game_over_text]:
            alt_idx = c.find(alt_marker, idx + 1)
            if alt_idx > 0:
                alt_brace = c.rfind('{', 0, alt_idx)
                if alt_brace > 0:
                    depth = 0
                    alt_end = alt_brace
                    for i in range(alt_brace, len(c)):
                        if c[i] == '{': depth += 1
                        elif c[i] == '}':
                            depth -= 1
                            if depth == 0:
                                alt_end = i + 1
                                break
                    alt_block = c[alt_brace:alt_end]
                    if 'ResultCard' in alt_block:
                        c = c[:alt_brace] + new_section + c[alt_end:]
                        print(f"  Replaced alt end screen block")
                        with open(fp, 'w', encoding='utf-8') as fh:
                            fh.write(c)
                        return True
        print(f"  No ResultCard found in any end screen block")
        return False
    
    c = c[:brace_start] + new_section + c[end_idx:]
    
    # Remove old ResultCard function if still present
    if "function ResultCard" in c:
        c = re.sub(r'\nfunction ResultCard[\s\S]*?\n\}', '', c)
    
    with open(fp, 'w', encoding='utf-8') as fh:
        fh.write(c)
    print(f"  FIXED!")
    return True

def main():
    global FIXED
    for root, dirs, files in os.walk(os.path.join(BASE, 'app/drills')):
        for f in files:
            if not f.endswith('Client.js') or 'CognitiveHub' in f:
                continue
            fp = os.path.join(root, f)
            with open(fp, 'r', encoding='utf-8') as fh:
                c = fh.read()
            
            # Check if file has ResultCard issue
            if 'ResultCard' not in c:
                continue
            
            rel = os.path.relpath(fp, BASE)
            marker_state = 'gameOver' if "gameState === 'gameOver'" in c else 'ended'
            
            if fix_end_screen(fp, marker_state, "Time's Up"):
                FIXED += 1
    
    print(f"\n{'='*50}")
    print(f"Fixed {FIXED} files with ResultCard errors")

if __name__ == '__main__':
    main()