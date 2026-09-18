#!/usr/bin/env python3
import sys
import os
import time

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'bing'))
import bing

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

queries = [
    # Brazil
    ('BR', 'teste teclado', 'br'),
    ('BR', 'teste de teclado', 'br'),
    ('BR', 'testar teclado', 'br'),
    ('BR', 'teste teclado online', 'br'),
    ('BR', 'teste de teclado online', 'br'),
    ('BR', 'teste teclado abnt2', 'br'),
    ('BR', 'teste teclado mecanico', 'br'),
    # South Korea
    ('KR', '키보드 테스트', 'kr'),
    ('KR', '키보드 테스트 사이트', 'kr'),
    ('KR', '키보드 검사', 'kr'),
    ('KR', '키보드 고장 테스트', 'kr'),
    ('KR', '키보드 입력 테스트', 'kr'),
    # Japan
    ('JP', 'キーボード テスト', 'jp'),
    ('JP', 'キーボード テスト 日本語配列', 'jp'),
    ('JP', 'キーボード チャタリング テスト', 'jp'),
    ('JP', 'キーボード 入力 テスト', 'jp'),
]

print(f"{'MKT':3} | {'QUERY':32} | {'EXACT':8} | {'BROAD':8}")
print("-" * 56)
for country, q, code in queries:
    res = bing.keyword_volume(q, code)
    exact = res.get('exact', 0) if res else 'None'
    broad = res.get('broad', 0) if res else 'None'
    print(f"{country:3} | {q:32} | {str(exact):8} | {str(broad):8}")
    time.sleep(1.0)
