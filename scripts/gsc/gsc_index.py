"""Pull the real index status of every sitemap URL from the GSC URL Inspection API.

    python scripts/gsc/gsc_index.py

Writes index-status.json next to this file. Answers "why is this page not
indexed" directly -- coverageState plus referringUrls, which is what exposed
that 64 drill pages had no internal referrer at all.

NOTE: never rename this to inspect.py. That shadows the stdlib `inspect`
module and breaks google-auth's import chain with a confusing error.
"""
import os
import sys
import json
import time
import re
import urllib.request

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gsc import get_service, SITE

svc = get_service()
xml = urllib.request.urlopen("https://skilldrills.online/sitemap.xml").read().decode()
urls = re.findall(r"<loc>([^<]+)</loc>", xml)
print(f"{len(urls)} urls in sitemap", flush=True)

out = []
for i, u in enumerate(urls):
    try:
        r = svc.urlInspection().index().inspect(
            body={"inspectionUrl": u, "siteUrl": SITE}).execute()
        s = r.get("inspectionResult", {}).get("indexStatusResult", {})
        row = {
            "url": u,
            "verdict": s.get("verdict"),
            "coverage": s.get("coverageState"),
            "robots": s.get("robotsTxtState"),
            "indexing": s.get("indexingState"),
            "crawled": s.get("lastCrawlTime"),
            "referring": s.get("referringUrls", []),
        }
    except Exception as e:
        row = {"url": u, "verdict": "ERROR", "coverage": str(e)[:120]}
    out.append(row)
    print(f"{i+1:3}/{len(urls)} {row['verdict']:12} {str(row.get('coverage'))[:55]:58} {u}", flush=True)
    time.sleep(0.12)

with open(os.path.join(os.path.dirname(__file__), "index-status.json"), "w") as f:
    json.dump(out, f, indent=1)
print("DONE", flush=True)
