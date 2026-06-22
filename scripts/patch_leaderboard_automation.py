#!/usr/bin/env python3
"""
Patch all drill Client.js files to add:
1. Imports for LeaderboardDisplay, ShareModal, ScoreRating, saveLeaderboardEntry
2. Score saving on game end
3. Leaderboard + Share buttons in end screen
4. ScoreRating display in end screen
"""

import os
import re
import glob

PROJECT_ROOT = r'C:\Users\sangmesh\Desktop\global-drill-system-nextjs - Copy'

# Drill configs: (file_path, drill_id, drill_name, category)
DRILLS = []

def find_drills():
    """Scan for all drill Client.js files"""
    drills = []
    app_dir = os.path.join(PROJECT_ROOT, 'app', 'drills')
    
    for root, dirs, files in os.walk(app_dir):
        for f in files:
            if f.endswith('Client.js'):
                path = os.path.join(root, f)
                rel_path = os.path.relpath(path, PROJECT_ROOT).replace('\\', '/')
                
                # Extract drill info from path
                parts = rel_path.split('/')
                # Determine category from path
                category = 'cognitive'
                if 'fps' in parts:
                    category = 'fps'
                elif 'visual' in parts:
                    category = 'visual'
                elif 'motor' in parts:
                    category = 'motor'
                elif 'academic' in parts:
                    category = 'academic'
                elif 'memory' in parts:
                    category = 'memory'
                elif 'physical' in parts:
                    category = 'physical'
                elif 'productivity' in parts:
                    category = 'productivity'
                elif 'mental-fitness' in parts:
                    category = 'mental-fitness'
                
                # Extract drill name from file
                drill_id = f.replace('Client.js', '').lower().replace(' ', '-').replace('_', '-')
                drill_name = f.replace('Client.js', '').replace('_', ' ')
                
                drills.append((rel_path, drill_id, drill_name, category))
    
    return drills

def calculate_import_depth(file_path):
    """Calculate relative depth from project root to components/lib"""
    # All drill files are under app/drills/category/subcategory/drillname/
    # Components are at components/, lib is at lib/
    # So relative path is always ../../../../components/ and ../../../../lib/
    depth = '../../../../'
    
    # Some drills may be deeper (e.g., app/drills/physical/Balance-Training/dynamic-balance/)
    rel = os.path.relpath(file_path, PROJECT_ROOT)
    parts = rel.replace('\\', '/').split('/')
    
    # Remove 'app/' prefix
    if parts[0] == 'app':
        parts = parts[1:]
    
    # Count remaining parts (e.g., drills/cognitive/attention/divided-attention/DividedAttentionClient.js = 4 parts)
    depth_parts = len(parts) - 1  # -1 because the last part is the file itself
    
    # From file location, go back depth_parts dirs, then into components/ or lib/
    return '../' * depth_parts

def has_import(content, module_name):
    """Check if file already has import for the module"""
    patterns = [
        f"from '.*{module_name}'",
        f'from ".*{module_name}"',
        f"from '@/components/{module_name}'",
        f"from '@/lib/{module_name}'",
    ]
    return any(re.search(p, content) for p in patterns)

def needs_relative_import(content):
    """Check if file already uses relative imports"""
    return "from '../../../../" in content or "from '../../../" in content

def patch_file(file_path, drill_id, drill_name, category):
    """Patch a single drill Client.js file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    changes_made = []
    
    # Step 1: Add imports if missing
    depth = calculate_import_depth(file_path)
    
    # Check if already has the new components imported
    has_leaderboard_display = has_import(content, 'LeaderboardDisplay')
    has_share_modal = has_import(content, 'ShareModal')
    has_score_rating = has_import(content, 'ScoreRating')
    has_save_entry = has_import(content, 'saveLeaderboardEntry')
    
    # Find the last import line to add after
    import_lines = list(re.finditer(r"^import .+ from ['\"].+['\"];?\s*$", content, re.MULTILINE))
    
    if import_lines and not (has_leaderboard_display and has_share_modal and has_score_rating and has_save_entry):
        last_import = import_lines[-1]
        insert_pos = last_import.end()
        
        new_imports = ""
        if not has_save_entry:
            new_imports += f"\nimport {{ saveLeaderboardEntry }} from '{depth}lib/leaderboard';"
        if not has_leaderboard_display:
            new_imports += f"\nimport LeaderboardDisplay from '{depth}components/LeaderboardDisplay';"
        if not has_share_modal:
            new_imports += f"\nimport ShareModal from '{depth}components/ShareModal';"
        if not has_score_rating:
            new_imports += f"\nimport ScoreRating from '{depth}components/ScoreRating';"
        
        if new_imports:
            content = content[:insert_pos] + new_imports + content[insert_pos:]
            changes_made.append("Added imports")
    
    # Step 2: Add score saving to leaderboard if not present
    if 'saveLeaderboardEntry' in content and f"drillId: '{drill_id}'" not in content and f'drillId: "{drill_id}"' not in content:
        # Find the existing score saving effect or create one
        # Look for existing game ended handling
        game_ended_patterns = [
            r"gameState === 'ended' && score > bestScore",
            r"gameState === 'ended' && score > 0",
            r"gameState === 'ended' && score",
        ]
        
        has_score_saving = "saveLeaderboardEntry" in content and "drillId:" in content
        
        if not has_score_saving:
            # Try to find where to insert the leaderboard saving
            # Look for the component function to find state variables
            state_vars = {}
            for var in ['score', 'bestScore', 'bestCombo', 'accuracy', 'getAccuracy', 'lives', 'visualHits', 'numberHits']:
                if re.search(rf'set{var[0].upper()}{var[1:]}|const \[{var}', content):
                    state_vars[var] = True
            
            # Determine what data to save based on available state
            save_data_parts = ["drillId: '{drill_id}',"]
            save_data_parts.append(f"    drillName: '{drill_name}',")
            save_data_parts.append(f"    category: '{category}',")
            save_data_parts.append("    score,")
            
            if 'getAccuracy' in state_vars or 'getAccuracy' in content:
                save_data_parts.append("    accuracy: getAccuracy(),")
            elif 'accuracy' in state_vars:
                save_data_parts.append("    accuracy,")
            
            if 'bestCombo' in state_vars or 'bestCombo' in content:
                save_data_parts.append("    bestCombo,")
            
            if 'lives' in state_vars or 'lives' in content:
                save_data_parts.append("    livesRemaining: lives,")
            
            save_data = '\n      '.join(save_data_parts)
            
            # Insert save effect after the local storage save effect
            best_score_pattern = re.search(r"localStorage\.setItem\('[^']+', score\.toString\(\)\)", content)
            if best_score_pattern:
                insert_after = best_score_pattern.end()
                # Find the end of the effect
                end_of_effect = content.find("}", insert_after)
                if end_of_effect != -1:
                    # Add leaderboard saving after local storage saving
                    leaderboard_effect = f"""
      // Save to global leaderboard
      try {{
        saveLeaderboardEntry({{
          {save_data}
        }});
      }} catch (e) {{}}"""
                    content = content[:end_of_effect] + leaderboard_effect + "\n  " + content[end_of_effect:]
                    changes_made.append("Added leaderboard saving")
    
    # Step 3: Add ScoreRating to end screen if not present
    if 'ScoreRating' in content and 'gameState === ' in content:
        # Check if ScoreRating is already used in JSX
        if '<ScoreRating' not in content:
            # Find the time's up / game ended heading
            # Common patterns: "Time's Up", "Game Over", "Results", "Well Done", etc.
            heading_patterns = [
                r'<h2[^>]*>.*?Time.*?Up',
                r'<h2[^>]*>.*?Game.*?Over',
                r'<h2[^>]*>.*?Well Done',
                r'<h2[^>]*>.*?Complete',
                r'<h2[^>]*>.*?Finished',
                r'<h2[^>]*>.*?Results',
            ]
            
            for pattern in heading_patterns:
                match = re.search(pattern, content)
                if match:
                    # Find the closing </h2> after this match
                    h2_end = content.find('</h2>', match.end())
                    if h2_end != -1:
                        insert_point = h2_end + 5  # After </h2>
                        score_rating = "\n                {score > 0 && (\n                  <div className=\"flex justify-center mb-4\">\n                    <ScoreRating score={score} size=\"lg\" />\n                  </div>\n                )}"
                        content = content[:insert_point] + score_rating + content[insert_point:]
                        changes_made.append("Added ScoreRating")
                        break
    
    # Step 4: Add LeaderboardDisplay + ShareModal buttons to end screen
    if 'LeaderboardDisplay' in content and 'ShareModal' in content:
        # Check if already has leaderboard in JSX
        if '<LeaderboardDisplay' not in content:
            # Find the "Play Again" button in the end screen
            play_again_patterns = [
                r'Play Again',
                r'Play Again →',
                r'play again',
                r'Restart',
            ]
            
            for pattern in play_again_patterns:
                match = re.search(pattern, content)
                if match:
                    # Find the </div> after "Play Again" that closes the button row
                    # Look for the parent button div closing
                    after_play_again = content[match.end():]
                    # Find the closing pattern for the buttons section
                    # Usually: </button></div></div></div>
                    
                    # Find the end of the end screen's button section
                    # Look for patterns like </div></div></div>) or similar end-of-overlay patterns
                    end_patterns = [
                        r'</button>\s*</div>\s*</div>\s*</div>\s*\)',
                        r'</button>\s*</div>\s*</div>\s*</div>\s*\)\s*}',
                        r'>Play Again[^<]*</button>\s*</div>\s*</div>\s*</div>',
                    ]
                    
                    for ep in end_patterns:
                        end_match = re.search(ep, after_play_again)
                        if end_match:
                            # Insert leaderboard/share before the closing of the button container
                            insert_at = match.end() + end_match.start()
                            
                            # Find the </div> that closes the buttons flex container
                            buttons_close = content.rfind('</div>', match.end(), insert_at)
                            if buttons_close != -1:
                                leaderboard_share = """
              
                {/* Leaderboard & Share */}
                <div className="flex gap-2 mt-4">
                  <LeaderboardDisplay 
                    drillId="{drill_id}"
                    drillName="{drill_name}"
                    category="{category}"
                    currentScore={score}
                    showOnEnd={true}
                  />
                  <ShareModal 
                    title="{drill_name}"
                    text={`I scored ${{score}} on {drill_name} on SkillDrills! Can you beat me?`}
                    stats={{}}
                  />
                </div>"""
                                content = content[:buttons_close] + leaderboard_share + content[buttons_close:]
                                changes_made.append("Added LeaderboardDisplay + ShareModal")
                                break
                    break
    
    # Step 5: Fix @/ imports to relative if needed (for files that don't already use @/)
    if "@/components/" in content and not content.startswith("'use client'") == False:
        # Check if jsconfig has alias configured
        # For now, convert @/ to relative paths
        pass  # Skip if jsconfig.json handles it
    
    if changes_made:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return changes_made
    
    return []

def main():
    drills = find_drills()
    print(f"Found {len(drills)} drill Client.js files")
    
    patched = 0
    skipped = 0
    errors = []
    
    for rel_path, drill_id, drill_name, category in drills:
        file_path = os.path.join(PROJECT_ROOT, rel_path)
        try:
            changes = patch_file(file_path, drill_id, drill_name, category)
            if changes:
                print(f"✅ {rel_path}: {', '.join(changes)}")
                patched += 1
            else:
                print(f"⏭️  {rel_path}: already up to date")
                skipped += 1
        except Exception as e:
            print(f"❌ {rel_path}: {e}")
            errors.append((rel_path, str(e)))
    
    print(f"\n{'='*60}")
    print(f"Patched: {patched}")
    print(f"Skipped (already done): {skipped}")
    print(f"Errors: {len(errors)}")
    for path, err in errors:
        print(f"  - {path}: {err}")

if __name__ == '__main__':
    main()