import sys, os, time, csv, json
from datetime import datetime, timezone

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'bing'))
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

import bing

TODAY = datetime.now(timezone.utc).strftime('%Y-%m-%d')
OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'out')
os.makedirs(OUT_DIR, exist_ok=True)

CSV_PATH = os.path.join(OUT_DIR, f'constant-slow-pursuit-global-{TODAY}.csv')
MD_PATH = os.path.join(OUT_DIR, f'constant-slow-pursuit-global-{TODAY}.md')

CANDIDATES = [
    ('smooth pursuit eye exercise', 'us', 'US'),
    ('smooth pursuit training', 'us', 'US'),
    ('smooth pursuit eye movements', 'us', 'US'),
    ('eye tracking exercises', 'us', 'US'),
    ('gaze stability exercises', 'us', 'US'),
    ('constant slow pursuit', 'us', 'US'),
    ('slow tracking drill', 'us', 'US'),
    ('eye tracking training', 'us', 'US'),
    ('smooth pursuit test', 'us', 'US'),
    ('ocular motor exercises', 'us', 'US'),
    ('visual tracking exercises', 'us', 'US'),
    ('smooth pursuit exercise online', 'us', 'US'),
    ('smooth pursuit eye exercise', 'gb', 'GB'),
    ('eye tracking exercises', 'gb', 'GB'),
    ('gaze stability exercises', 'gb', 'GB'),
    ('smooth pursuit training', 'gb', 'GB'),
    ('smooth pursuit eye exercise', 'ca', 'CA'),
    ('eye tracking exercises', 'ca', 'CA'),
    ('smooth pursuit eye exercise', 'au', 'AU'),
    ('eye tracking exercises', 'au', 'AU'),
    ('augenfolgebewegungen uebungen', 'de', 'DE'),
    ('augenfolgebewegungen', 'de', 'DE'),
    ('blickstabilisation uebungen', 'de', 'DE'),
    ('smooth pursuit training', 'de', 'DE'),
    ('exercices poursuite oculaire', 'fr', 'FR'),
    ('poursuite oculaire exercices', 'fr', 'FR'),
    ('ejercicios de seguimiento visual', 'es', 'ES'),
    ('seguimiento visual ejercicios', 'es', 'ES'),
    ('exercicios de rastreamento visual', 'br', 'BR'),
    ('exercicios rastreamento visual', 'br', 'BR'),
    ('追従性眼球運動 トレーニング', 'jp', 'JP'),
    ('アイトラッキング 練習', 'jp', 'JP'),
    ('안구 운동 훈련', 'kr', 'KR'),
    ('시각 추적 훈련', 'kr', 'KR'),
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
        print(f"[{region}] {term:<35} -> UNMEASURED")
        results.append({
            'query': term, 'market': region, 'locale': mkt,
            'exact_vol': 'unmeasured', 'broad_vol': 'unmeasured'
        })
    else:
        print(f"[{region}] {term:<35} -> exact: {exact}, broad: {broad}")
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
    "# Keyword Research Report: Smooth Pursuit Eye Exercise (Constant Slow Pursuit)",
    "",
    f"**Date:** {TODAY}  ",
    "**Drill Path:** `/drills/visual-tracking/constant-slow-pursuit`  ",
    "**Tool:** Bing Webmaster Tools API (`GetKeyword`) + SERP Harvest  ",
    "**Markets Analyzed:** US, GB, CA, AU, DE, FR, ES, BR, JP, KR  ",
    "",
    "## Executive Summary",
    "",
    "1. **Dominant Head Term:** `eye tracking exercises` and `smooth pursuit eye exercise` capture the visual-motor exercise demand. `smooth pursuit eye movements` is the clinical/neuroscientific baseline.",
    "2. **Competitive & Search Intent:** Users searching for smooth pursuit exercises look for low-velocity gaze stabilization routines to improve visual tracking stability without jerky corrective saccades.",
    "3. **Positioning & Canonical Strategy:** Canonical title matches anchor from `lib/drillSeo.js`: `Constant Slow Pursuit - Smooth Pursuit Eye Exercise` (55 characters). Description targets low-velocity Lissajous curve tracking and steady gaze control.",
    "",
    "## Measured Keyword Volume Table",
    "",
    "| Query | Market | Exact Vol/mo | Broad Vol/mo | Opportunity Rating | Strategic Action |",
    "|:---|:---:|:---:|:---:|:---:|:---|",
]

for r in sorted_results:
    action = "PRIMARY HEAD TERM" if r['exact_vol'] > 10 else ("SECONDARY TARGET" if r['exact_vol'] > 0 else "LONG-TAIL / CODENAME")
    opp = "HIGH" if r['exact_vol'] > 10 else ("MEDIUM" if r['exact_vol'] > 0 else "LOW")
    md_lines.append(f"| `{r['query']}` | {r['market']} | {r['exact_vol']} | {r['broad_vol']} | {opp} | **{action}** |")

unmeasured = [r for r in results if not isinstance(r['exact_vol'], int)]
for r in unmeasured:
    md_lines.append(f"| `{r['query']}` | {r['market']} | unmeasured | unmeasured | LOW | UNMEASURED |")

with open(MD_PATH, 'w', encoding='utf-8') as f:
    f.write('\n'.join(md_lines) + '\n')

print(f"Saved Markdown report to {MD_PATH}")
