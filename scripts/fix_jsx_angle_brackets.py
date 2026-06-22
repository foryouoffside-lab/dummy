import sys

path = 'app/drills/visual/depth-perception/distance-judgment/DistanceJudgmentClient.js'
try:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix <5% and <15% in JSX text - replace "(<5%" with "{'<5%'}" and "(<15%" with "{'<15%'}"
    content = content.replace('(<5%', "({'<5%'}")
    content = content.replace('(<15%', "({'<15%'}")

    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Successfully fixed JSX angle bracket issues')
except Exception as e:
    print(f'Error: {e}')
    sys.exit(1)