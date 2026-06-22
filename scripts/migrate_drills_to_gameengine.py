#!/usr/bin/env python
"""
Batch migration script: converts ALL drills to use shared GameEndScreen
Preserves: About sections, Related Drills, Footer, gameplay logic
Changes: end screen, scoring, timers, localStorage, imports
"""

import os
import re
import glob

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

CHANGES_MADE = 0

def get_relative_import_path(filepath):
    """Calculate relative path from a drill to lib/useGameEngine"""
    depth = filepath.replace(BASE_DIR, '').lstrip(os.sep)
    depth_count = depth.count(os.sep)
    go_up = '../' * (depth_count - 1)
    return go_up

def get_category_info(filepath):
    """Extract category and drillId from file path"""
    parts = filepath.replace(BASE_DIR, '').replace('\\', '/').split('/')
    # Pattern: app/drills/{category}/.../{drillId}/DrillNameClient.js
    try:
        drills_idx = parts.index('drills')
        category = parts[drills_idx + 1]
        drill_id = parts[-2]  # folder name = drill id
        return category, drill_id
    except ValueError:
        return 'cognitive', 'drill'

def get_share_path(filepath):
    """Build share path from file location"""
    parts = filepath.replace(BASE_DIR, '').replace('\\', '/').split('/')
    try:
        drills_idx = parts.index('drills')
        # Get everything after 'drills/' up to the drillId folder
        path_parts = parts[drills_idx + 1:-1]
        return 'drills/' + '/'.join(path_parts)
    except ValueError:
        return 'drills/cognitive/drill'

def migrate_end_screen(content, imports_needed, filepath):
    """
    Replace the old end screen with GameEndScreen
    """
    global CHANGES_MADE
    
    # Pattern 1: Old result screen with ResultCard components
    old_end_patterns = [
        # Full old end screen pattern
        r"\{gameState === 'ended' && \(<div className=`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40 \${isBoxDarkMode \? 'bg-gray-900/95' : 'bg-white/95'}`\)><div className=`rounded-2xl p-6 sm:p-8 shadow-xl border w-full max-w-\[480px\] mx-4 \${isBoxDarkMode \? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`\)>.*?<ResultCard.*?</div></div></div>\)}",
        # Simpler versions
        r"\{gameState === 'ended' && \(<div className=`absolute inset-0.*?ResultCard.*?</div>\)}",
    ]
    
    # Check if already migrated
    if 'GameEndScreen' in content and 'engine.shareScore' in content:
        return content  # Already migrated
    
    # Check if this file needs migration
    needs_migration = False
    for pattern in old_end_patterns:
        if re.search(pattern, content, re.DOTALL):
            needs_migration = True
            break
    
    if not needs_migration:
        # Check for end game patterns with ResultCard
        if 'ResultCard' in content or "Time's Up!" in content:
            needs_migration = True
        else:
            return content  # Not a standard drill
    
    print(f"  → Migrating end screen: {os.path.basename(filepath)}")
    CHANGES_MADE += 1
    
    # Add imports
    rel_path = get_relative_import_path(filepath)
    
    if 'useGameEngine' not in content:
        # Add import after existing imports
        content = content.replace(
            "from 'lucide-react';",
            "from 'lucide-react';\nimport useGameEngine from '" + rel_path + "lib/useGameEngine';\nimport GameEndScreen from '" + rel_path + "components/GameEndScreen';"
        )
    
    # Replace end screen with GameEndScreen
    end_screen_template = """{engine.gameState === 'ended' && (
            <GameEndScreen
              score={engine.score}
              bestScore={engine.bestScore}
              accuracy={engine.accuracy}
              bestCombo={engine.bestCombo}
              rating={engine.rating}
              newBest={engine.newBest}
              lives={engine.lives}
              maxLives={5}
              drillName="{drill_name}"
              drillBackLink="/drills/{category}"
              isDarkMode={isDarkMode}
              onPlayAgain={engine.startGame}
              onShare={engine.shareScore}
            />
          )}"""
    
    category, drill_id = get_category_info(filepath)
    drill_name = drill_id.replace('-', ' ').title()
    share_path = get_share_path(filepath)
    
    # Replace old end screen
    patterns_to_replace = [
        r"\{gameState === 'ended' && \(<div className=`absolute inset-0.*?ResultCard.*?</div>\)}",
        r"\{gameState === 'ended' && \(<div className=`absolute inset-0 flex items-center justify-center backdrop-blur-sm rounded-xl z-40.*?</div>\)}",
    ]
    
    for pattern in patterns_to_replace:
        content = re.sub(pattern, end_screen_template.format(drill_name=drill_name, category=category), content, flags=re.DOTALL)
    
    # Remove old ResultCard function if present (below main component)
    content = re.sub(r'\nfunction ResultCard.*?\n\}', '', content, flags=re.DOTALL)
    
    # Add engine initialization (find game state declarations)
    if 'useGameEngine' not in content:
        engine_init = f"""
  // === Shared Game Engine ===
  const engine = useGameEngine({{
    category: '{category}',
    drillId: '{drill_id}',
    drillName: '{drill_name}',
    totalGameTime: 60,
    sharePath: '{share_path}',
  }});"""
        
        # Insert after useState declarations
        match = re.search(r'(const \[isDarkMode,.*?\];)', content)
        if match:
            content = content.replace(match.group(1), match.group(1) + engine_init)
    
    return content

def process_file(filepath):
    """Process a single drill file"""
    if 'Client.js' not in filepath:
        return
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Skip if already uses GameEndScreen
    if 'GameEndScreen' in content:
        return
    
    original = content
    content = migrate_end_screen(content, False, filepath)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"✅ Updated: {os.path.relpath(filepath, BASE_DIR)}")

def main():
    # Find all drill client files
    drill_files = []
    for root, dirs, files in os.walk(os.path.join(BASE_DIR, 'app', 'drills')):
        for f in files:
            if f.endswith('Client.js') or f.endswith('client.js'):
                drill_files.append(os.path.join(root, f))
    
    print(f"Found {len(drill_files)} drill files")
    
    for filepath in sorted(drill_files):
        process_file(filepath)
    
    print(f"\n✅ Migration complete! {CHANGES_MADE} end screens updated.")

if __name__ == '__main__':
    main()