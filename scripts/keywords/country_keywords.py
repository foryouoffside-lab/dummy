#!/usr/bin/env python3
"""
Multi-Country Live Keyword Researcher for SkillDrills.
Scrapes real-time Google, Bing, and YouTube search suggestions tailored by country (gl) and language (hl).

Usage:
  python scripts/keywords/country_keywords.py <seed_query> [country_code]
  python scripts/keywords/country_keywords.py "aim trainer" br
  python scripts/keywords/country_keywords.py "cps test" jp
  python scripts/keywords/country_keywords.py "reaction time" es
  python scripts/keywords/country_keywords.py --matrix
"""

import sys
import json
import urllib.parse
import urllib.request
import string

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

COUNTRY_CONFIG = {
    'br': {'name': 'Brazil', 'gl': 'br', 'hl': 'pt', 'bing_mkt': 'pt-BR'},
    'pt': {'name': 'Portugal/Brazil', 'gl': 'br', 'hl': 'pt', 'bing_mkt': 'pt-BR'},
    'es': {'name': 'Spain/LATAM', 'gl': 'es', 'hl': 'es', 'bing_mkt': 'es-ES'},
    'mx': {'name': 'Mexico', 'gl': 'mx', 'hl': 'es', 'bing_mkt': 'es-MX'},
    'jp': {'name': 'Japan', 'gl': 'jp', 'hl': 'ja', 'bing_mkt': 'ja-JP'},
    'ja': {'name': 'Japan', 'gl': 'jp', 'hl': 'ja', 'bing_mkt': 'ja-JP'},
    'kr': {'name': 'South Korea', 'gl': 'kr', 'hl': 'ko', 'bing_mkt': 'ko-KR'},
    'ko': {'name': 'South Korea', 'gl': 'kr', 'hl': 'ko', 'bing_mkt': 'ko-KR'},
    'de': {'name': 'Germany', 'gl': 'de', 'hl': 'de', 'bing_mkt': 'de-DE'},
    'fr': {'name': 'France', 'gl': 'fr', 'hl': 'fr', 'bing_mkt': 'fr-FR'},
    'us': {'name': 'United States', 'gl': 'us', 'hl': 'en', 'bing_mkt': 'en-US'},
    'en': {'name': 'Global English', 'gl': 'us', 'hl': 'en', 'bing_mkt': 'en-US'}
}

def fetch_google_suggestions(query, gl='us', hl='en'):
    encoded = urllib.parse.quote(query)
    url = f"https://suggestqueries.google.com/complete/search?client=chrome&q={encoded}&gl={gl}&hl={hl}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=10) as res:
            data = json.loads(res.read().decode('utf-8', 'ignore'))
            if len(data) > 1 and isinstance(data[1], list):
                return data[1]
    except Exception:
        pass
    return []

def fetch_youtube_suggestions(query, gl='us', hl='en'):
    encoded = urllib.parse.quote(query)
    url = f"https://suggestqueries.google.com/complete/search?client=youtube&ds=yt&q={encoded}&gl={gl}&hl={hl}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=10) as res:
            raw = res.read().decode('utf-8', 'ignore')
            if '(' in raw and raw.endswith(')'):
                raw_json = raw[raw.find('(') + 1 : raw.rfind(')')]
                data = json.loads(raw_json)
                if len(data) > 1 and isinstance(data[1], list):
                    return [item[0] for item in data[1] if isinstance(item, list)]
    except Exception:
        pass
    return []

def fetch_bing_suggestions(query, mkt='en-US'):
    encoded = urllib.parse.quote(query)
    url = f"https://api.bing.com/osjson.aspx?query={encoded}&market={mkt}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=10) as res:
            data = json.loads(res.read().decode('utf-8', 'ignore'))
            if len(data) > 1 and isinstance(data[1], list):
                return data[1]
    except Exception:
        pass
    return []

def research_query(query, country_key='us', expand=False):
    cfg = COUNTRY_CONFIG.get(country_key.lower(), COUNTRY_CONFIG['us'])
    print(f"\nResearching: '{query}' | Country: {cfg['name']} ({cfg['gl'].upper()}) | Lang: {cfg['hl']}")
    print("-" * 75)
    
    g_sug = fetch_google_suggestions(query, cfg['gl'], cfg['hl'])
    yt_sug = fetch_youtube_suggestions(query, cfg['gl'], cfg['hl'])
    b_sug = fetch_bing_suggestions(query, cfg['bing_mkt'])
    
    combined = list(dict.fromkeys(g_sug + yt_sug + b_sug))
    
    print(f"Direct Suggestions Found: {len(combined)}\n")
    print(f"{'Source':<12} | {'Suggested Search Term'}")
    print("-" * 75)
    for s in g_sug:
        print(f"{'Google':<12} | {s}")
    for s in yt_sug:
        if s not in g_sug:
            print(f"{'YouTube':<12} | {s}")
    for s in b_sug:
        if s not in g_sug and s not in yt_sug:
            print(f"{'Bing':<12} | {s}")
            
    if expand:
        print(f"\nExpanding Alphabetical Variations for '{query}'...")
        alpha_results = []
        for char in string.ascii_lowercase:
            sub_q = f"{query} {char}"
            sub_sug = fetch_google_suggestions(sub_q, cfg['gl'], cfg['hl'])
            for s in sub_sug:
                if s not in combined and s not in alpha_results:
                    alpha_results.append(s)
                    print(f"  [{char.upper()}] {s}")

def run_matrix():
    queries = [
        ('br', 'treinador de mira'),
        ('br', 'teste de cps'),
        ('br', 'teste de tempo de reação'),
        ('es', 'entrenador de puntería'),
        ('es', 'test de cps'),
        ('es', 'test de tiempo de reacción'),
        ('jp', 'エイム練習'),
        ('jp', 'CPSテスト'),
        ('jp', '反射神経テスト'),
        ('de', 'aim trainer kostenlos'),
        ('de', 'reaktionszeit test')
    ]
    print("\n=======================================================")
    print("GLOBAL MULTI-COUNTRY KEYWORD INTELLIGENCE MATRIX")
    print("=======================================================")
    for country, q in queries:
        research_query(q, country, expand=False)

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == '--matrix':
        run_matrix()
    elif len(sys.argv) > 1:
        q = sys.argv[1]
        c = sys.argv[2] if len(sys.argv) > 2 else 'us'
        research_query(q, c, expand=True)
    else:
        print(__doc__)
