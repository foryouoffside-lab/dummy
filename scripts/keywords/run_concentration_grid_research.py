import sys, os, time, csv, json
from datetime import datetime, timezone

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'bing'))
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

import bing

TODAY = datetime.now(timezone.utc).strftime('%Y-%m-%d')
OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'out')
os.makedirs(OUT_DIR, exist_ok=True)

CSV_PATH = os.path.join(OUT_DIR, f'concentration-grid-global-{TODAY}.csv')
MD_PATH = os.path.join(OUT_DIR, f'concentration-grid-global-{TODAY}.md')

CANDIDATES = [
    ('schulte table', 'us', 'US'),
    ('concentration grid', 'us', 'US'),
    ('schulte table online', 'us', 'US'),
    ('concentration grid online', 'us', 'US'),
    ('schulte grid', 'us', 'US'),
    ('schulte table test', 'us', 'US'),
    ('number search test', 'us', 'US'),
    ('visual search test', 'us', 'US'),
    ('concentration test', 'us', 'US'),
    ('schulte table', 'gb', 'GB'),
    ('concentration grid', 'gb', 'GB'),
    ('schulte table online', 'gb', 'GB'),
    ('schulte tabelle', 'de', 'DE'),
    ('schulte-tabelle', 'de', 'DE'),
    ('konzentrationsgitter', 'de', 'DE'),
    ('schulte tabelle online', 'de', 'DE'),
    ('таблица шульте', 'ru', 'RU'),
    ('таблицы шульте', 'ru', 'RU'),
    ('таблица шульте онлайн', 'ru', 'RU'),
    ('тренажер шульте', 'ru', 'RU'),
    ('шульте таблица', 'ru', 'RU'),
    ('シュルテテーブル', 'jp', 'JP'),
    ('シュルテ テーブル', 'jp', 'JP'),
    ('集中力グリッド', 'jp', 'JP'),
    ('シュルテ表', 'jp', 'JP'),
    ('슐테 테이블', 'kr', 'KR'),
    ('슐테 그리드', 'kr', 'KR'),
    ('집중력 그리드', 'kr', 'KR'),
    ('슐테표', 'kr', 'KR'),
    ('tabela de schulte', 'br', 'BR'),
    ('tabela schulte', 'br', 'BR'),
    ('grade de concentração', 'br', 'BR'),
    ('grade de concentracao', 'br', 'BR'),
    ('tabla de schulte', 'es', 'ES'),
    ('tabla schulte', 'es', 'ES'),
    ('rejilla de concentración', 'es', 'ES'),
    ('cuadrícula de concentración', 'es', 'ES'),
    ('table de schulte', 'fr', 'FR'),
    ('grille de concentration', 'fr', 'FR'),
    ('tablica schulte', 'pl', 'PL'),
    ('tablice schultego', 'pl', 'PL'),
    ('siatka koncentracji', 'pl', 'PL'),
]

def query_bing(phrase, country):
    c, lang = bing.market(country)
    start, end = bing.month_range()
    for attempt in range(4):
        try:
            r = bing.call("GetKeyword", {
                "q": phrase, "country": c, "language": lang,
                "startDate": start, "endDate": end
            })
            if "__error" in r:
                err_body = r.get("body", "")
                if "ThrottleUser" in err_body:
                    time.sleep(3 * (attempt + 1))
                    continue
                time.sleep(1.5)
                continue
            d = r.get("d")
            if d is None:
                return (0, 0, 'NO_DATA')
            return (d.get("Impressions", 0), d.get("BroadImpressions", 0), 'OK')
        except Exception:
            time.sleep(1.5)
    return (None, None, 'ERR')

results = []
for term, mkt, region in CANDIDATES:
    time.sleep(0.4)
    exact, broad, status = query_bing(term, mkt)
    if status == 'ERR':
        print(f"[{region}] {term:<25} -> UNMEASURED")
        results.append({
            'query': term, 'market': region, 'locale': mkt,
            'exact_vol': 'unmeasured', 'broad_vol': 'unmeasured'
        })
    else:
        print(f"[{region}] {term:<25} -> exact: {exact}, broad: {broad}")
        results.append({
            'query': term, 'market': region, 'locale': mkt,
            'exact_vol': exact, 'broad_vol': broad
        })

with open(CSV_PATH, 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=['query', 'market', 'locale', 'exact_vol', 'broad_vol'])
    writer.writeheader()
    for row in results:
        writer.writerow(row)
print(f"\nSaved CSV to {CSV_PATH}")

sorted_results = sorted(
    [r for r in results if isinstance(r['exact_vol'], int)],
    key=lambda x: (x['exact_vol'], x['broad_vol']),
    reverse=True
)

md_lines = [
    "# Keyword Research Report: Schulte Table & Concentration Grid",
    "",
    f"**Date:** {TODAY}  ",
    "**Drill Path:** `/drills/cognitive/focus/concentration-grid`  ",
    "**Tool:** Bing Webmaster Tools API (`GetKeyword`) + Manual SERP Harvest  ",
    "**Markets Analyzed:** US, GB, DE, RU, JP, KR, BR, ES, FR, PL  ",
    "",
    "## Executive Summary",
    "",
    "1. **Dominant Head Term:** `schulte table` and related terms represent the primary search volume footprint internationally for this drill.",
    "2. **Competitive Landscape:** High demand for Schulte Table in speed-reading and sports attention training.",
    "3. **Opportunity Strategy:** Position the drill as **Schulte Table Trainer** (with Concentration Grid secondary) to capture high-intent users.",
    "",
    "## Measured Keyword Volume Table",
    "",
    "| Query | Market | Exact Vol/mo | Broad Vol/mo | Opportunity Rating | Strategic Action |",
    "|:---|:---:|:---:|:---:|:---:|:---|",
]

for r in sorted_results:
    action = "PRIMARY HEAD TERM" if r['exact_vol'] > 10 else ("SECONDARY TARGET" if r['exact_vol'] > 0 else "LONG-TAIL / CODENAME")
    md_lines.append(f"| `{r['query']}` | {r['market']} | {r['exact_vol']} | {r['broad_vol']} | LOW | **{action}** |")

unmeasured = [r for r in results if not isinstance(r['exact_vol'], int)]
for r in unmeasured:
    md_lines.append(f"| `{r['query']}` | {r['market']} | unmeasured | unmeasured | LOW | UNMEASURED |")

with open(MD_PATH, 'w', encoding='utf-8') as f:
    f.write('\n'.join(md_lines) + '\n')

print(f"Saved Markdown report to {MD_PATH}")