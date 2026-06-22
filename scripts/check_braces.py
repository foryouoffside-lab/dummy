import sys

path = 'app/drills/visual/depth-perception/distance-judgment/DistanceJudgmentClient.js'
with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Check for any remaining <5% or <15% that aren't wrapped properly
for i, line in enumerate(lines, 1):
    if '<5%' in line or '<15%' in line:
        print(f'Line {i}: {line.rstrip()}')

print('---')
# Check for < that might be interpreted as JSX tags in text content
for i, line in enumerate(lines, 1):
    stripped = line.strip()
    # Look for patterns where < is used as less-than in JSX text (inside parentheses)
    if '(' in stripped and '<' in stripped and not stripped.startswith('//'):
        # This might be suspicious if it's not wrapped in {}
        if "{'<" not in stripped and "'<" not in stripped:
            if '<' in stripped:
                print(f'Possible issue Line {i}: {stripped[:120]}')