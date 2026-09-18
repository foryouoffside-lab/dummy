#!/usr/bin/env python3
"""Live per-country autocomplete discovery.

Fills the one gap Bing's keyword API leaves: DISCOVERY breadth. Bing tells you
what a phrase is worth; autocomplete tells you what phrases exist in a market
in the first place. Use the two together --

    autocomplete.py  ->  candidate native phrases (no volume)
    bing.py keyword  ->  measured volume for each        (the filter)

Never target anything this file returns without measuring it. Suggestions are
ordered by Google's own popularity model but carry no volume, and treating
suggestion rank as demand is the classic error.

Usage:
    python scripts/keywords/autocomplete.py "타자연습" kr ko
    python scripts/keywords/autocomplete.py "typing" br pt --expand
"""

import sys
import json
import time
import urllib.parse
import urllib.request

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

ENDPOINT = "https://suggestqueries.google.com/complete/search"
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
ALPHABET = "abcdefghijklmnopqrstuvwxyz"


def suggest(term, gl="us", hl="en"):
    """Google Suggest for one term in one country/language. [] on failure."""
    q = urllib.parse.urlencode({
        "client": "chrome", "q": term, "gl": gl, "hl": hl,
    })
    req = urllib.request.Request(ENDPOINT + "?" + q, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=12) as r:
            data = json.loads(r.read().decode("utf-8", "replace"))
        return data[1] if len(data) > 1 else []
    except Exception:
        return []


def expand(term, gl="us", hl="en", pause=0.35):
    """Seed + a-z suffix sweep. Deduped, order preserved."""
    seen, out = set(), []
    for probe in [term] + [term + " " + c for c in ALPHABET]:
        for s in suggest(probe, gl, hl):
            if s not in seen:
                seen.add(s)
                out.append(s)
        time.sleep(pause)
    return out


if __name__ == "__main__":
    a = sys.argv[1:]
    if not a:
        print(__doc__)
        sys.exit(1)
    term = a[0]
    gl = a[1] if len(a) > 1 else "us"
    hl = a[2] if len(a) > 2 else "en"
    deep = "--expand" in a

    res = expand(term, gl, hl) if deep else suggest(term, gl, hl)
    print("# " + term + "  [gl=" + gl + " hl=" + hl + "]  "
          + str(len(res)) + " suggestions -- UNMEASURED, feed to bing.py keyword")
    for s in res:
        print("  " + s)
