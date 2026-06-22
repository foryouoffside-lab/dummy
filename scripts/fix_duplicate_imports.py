#!/usr/bin/env python3
"""Remove duplicate import lines from JS files."""
import os

def fix_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
    except:
        return False
    
    seen = set()
    out = []
    changed = False
    for line in lines:
        stripped = line.strip()
        # Only remove duplicate import lines, keep all other duplicate lines
        if stripped.startswith('import ') and stripped in seen:
            changed = True
            continue
        seen.add(stripped)
        out.append(line)
    
    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.writelines(out)
        return True
    return False

fixed = 0
app_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'app')
for root, dirs, files in os.walk(app_dir):
    for fname in files:
        if fname.endswith('.js'):
            filepath = os.path.join(root, fname)
            if fix_file(filepath):
                fixed += 1
                print(f'  Fixed: {os.path.relpath(filepath, os.path.dirname(app_dir))}')

print(f'\nTotal files with duplicates fixed: {fixed}')