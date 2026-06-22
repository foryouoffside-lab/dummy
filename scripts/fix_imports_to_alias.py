#!/usr/bin/env python3
"""Fix all relative imports to use @/ alias instead"""
import os
import re

PROJECT_ROOT = r'C:\Users\sangmesh\Desktop\global-drill-system-nextjs - Copy'

# Patterns to replace: from '../../../components/' or '../../../../components/ etc -> from '@/components/'
patterns = [
    (r"from '\.\.\/(\.\.\/)*components\/", "from '@/components/"),
    (r"from '\.\.\/(\.\.\/)*lib\/", "from '@/lib/"),
]

fixed = 0
for root, dirs, files in os.walk(os.path.join(PROJECT_ROOT, 'app')):
    for f in files:
        if f.endswith('.js'):
            path = os.path.join(root, f)
            with open(path, 'r', encoding='utf-8') as fh:
                content = fh.read()
            
            new_content = content
            for pattern, replacement in patterns:
                new_content = re.sub(pattern, replacement, new_content)
            
            if new_content != content:
                with open(path, 'w', encoding='utf-8') as fh:
                    fh.write(new_content)
                rel = os.path.relpath(path, PROJECT_ROOT)
                print(f"Fixed: {rel}")
                fixed += 1

print(f"\nTotal files fixed: {fixed}")