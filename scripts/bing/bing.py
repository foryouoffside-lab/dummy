#!/usr/bin/env python3
"""Bing Webmaster Tools puller for skilldrills.online.

Mirrors scripts/gsc/gsc.py. The API key is read from the BING_API_KEY env var,
falling back to scripts/bing/.bing-key (gitignored). Never hardcode it here.

  python scripts/bing/bing.py sites
  python scripts/bing/bing.py traffic [days]
  python scripts/bing/bing.py queries [limit]      aggregated query stats
  python scripts/bing/bing.py pages [limit]        aggregated page stats
  python scripts/bing/bing.py pagequeries <url>    queries for one page
  python scripts/bing/bing.py crawl                crawl stats + issues
  python scripts/bing/bing.py quota                URL submission quota
  python scripts/bing/bing.py keyword <phrase>     keyword research volume
  python scripts/bing/bing.py related <phrase>     related keyword ideas
  python scripts/bing/bing.py submit <url> [...]   submit URLs for indexing
  python scripts/bing/bing.py submitall [--dry]    submit every sitemap URL
"""
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from collections import defaultdict
from datetime import datetime, timedelta, timezone

BASE = "https://ssl.bing.com/webmaster/api.svc/json"
SITE = "https://skilldrills.online/"
HERE = os.path.dirname(os.path.abspath(__file__))


def api_key():
    k = os.environ.get("BING_API_KEY")
    if k:
        return k.strip()
    path = os.path.join(HERE, ".bing-key")
    if os.path.exists(path):
        return open(path).read().strip()
    sys.exit("No API key. Set BING_API_KEY or create scripts/bing/.bing-key")


def call(method, params=None, body=None):
    params = dict(params or {})
    params["apikey"] = api_key()
    url = BASE + "/" + method + "?" + urllib.parse.urlencode(params)
    data = None
    headers = {"Accept": "application/json"}
    if body is not None:
        data = json.dumps(body).encode()
        headers["Content-Type"] = "application/json; charset=utf-8"
    req = urllib.request.Request(url, data=data, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            raw = r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return {"__error": "HTTP " + str(e.code),
                "body": e.read().decode("utf-8", "replace")[:500]}
    if not raw.strip():
        return {"d": None}
    return json.loads(raw)


def dt(msdate):
    """Parse Bing's /Date(1779433200000-0700)/ into a date."""
    if not msdate:
        return None
    m = re.search(r"/Date\((-?\d+)", msdate)
    if not m:
        return None
    return datetime.fromtimestamp(int(m.group(1)) / 1000, timezone.utc).date()


def rows(method, params=None):
    r = call(method, params)
    if "__error" in r:
        print("  ! " + method + ": " + r["__error"] + " " + r.get("body", "")[:200])
        return []
    d = r.get("d")
    if d is None:
        return []
    return d if isinstance(d, list) else [d]


def table(headers, data, widths):
    line = "  ".join(h.ljust(w) for h, w in zip(headers, widths))
    print(line)
    print("-" * len(line))
    for row in data:
        print("  ".join(str(c)[:w].ljust(w) for c, w in zip(row, widths)))


def month_range():
    """Bing's keyword-research endpoints want plain ISO dates, NOT the
    /Date(ms)/ form that the traffic endpoints return. Passing /Date(...)/
    here fails with 'String was not recognized as a valid DateTime.'"""
    end = datetime.now(timezone.utc).date() - timedelta(days=1)
    start = end - timedelta(days=30)
    return start.isoformat(), end.isoformat()


# ---------------------------------------------------------------- commands

def cmd_sites():
    for s in rows("GetUserSites"):
        print(s["Url"] + "  verified=" + str(s["IsVerified"]))


def cmd_traffic(days=30):
    data = rows("GetRankAndTrafficStats", {"siteUrl": SITE})
    cutoff = datetime.now(timezone.utc).date() - timedelta(days=days)
    recent = [r for r in data if (dt(r["Date"]) or cutoff) >= cutoff]
    clicks = sum(r["Clicks"] for r in recent)
    impr = sum(r["Impressions"] for r in recent)
    ctr = clicks / impr * 100 if impr else 0
    print("Bing, last " + str(days) + " days (" + str(len(recent)) + " days of data)")
    print("  clicks      " + str(clicks))
    print("  impressions " + str(impr))
    print("  CTR         " + format(ctr, ".2f") + "%")
    if data:
        print("  range       " + str(dt(data[0]["Date"])) + " .. " + str(dt(data[-1]["Date"])))
    print("  all-time    " + str(sum(r["Clicks"] for r in data)) + " clicks / "
          + str(sum(r["Impressions"] for r in data)) + " impressions")


def _agg_queries():
    """Bing returns one row per query per day. Roll them up."""
    agg = defaultdict(lambda: {"c": 0, "i": 0, "pos": []})
    for r in rows("GetQueryStats", {"siteUrl": SITE}):
        q = agg[r["Query"]]
        q["c"] += r["Clicks"]
        q["i"] += r["Impressions"]
        if r["AvgImpressionPosition"] > 0:
            q["pos"].append((r["AvgImpressionPosition"], r["Impressions"]))
    out = []
    for query, v in agg.items():
        wsum = sum(p * w for p, w in v["pos"])
        wtot = sum(w for _, w in v["pos"])
        out.append({
            "query": query,
            "clicks": v["c"],
            "impr": v["i"],
            "pos": wsum / wtot if wtot else 0,
            "ctr": v["c"] / v["i"] * 100 if v["i"] else 0,
        })
    return sorted(out, key=lambda x: -x["impr"])


def cmd_queries(limit=40):
    data = _agg_queries()
    print("Bing queries (all time, " + str(len(data)) + " unique)\n")
    table(["query", "clicks", "impr", "CTR%", "pos"],
          [[d["query"], d["clicks"], d["impr"],
            format(d["ctr"], ".1f"), format(d["pos"], ".1f")] for d in data[:limit]],
          [58, 6, 6, 6, 5])


def _agg_pages():
    agg = defaultdict(lambda: {"c": 0, "i": 0})
    for r in rows("GetPageStats", {"siteUrl": SITE}):
        p = agg[r["Query"]]        # Bing puts the URL in the Query field here
        p["c"] += r["Clicks"]
        p["i"] += r["Impressions"]
    out = [{"page": k, "clicks": v["c"], "impr": v["i"],
            "ctr": v["c"] / v["i"] * 100 if v["i"] else 0} for k, v in agg.items()]
    return sorted(out, key=lambda x: -x["impr"])


def cmd_pages(limit=40):
    data = _agg_pages()
    print("Bing pages (all time, " + str(len(data)) + " URLs with impressions)\n")
    table(["page", "clicks", "impr", "CTR%"],
          [[d["page"], d["clicks"], d["impr"], format(d["ctr"], ".1f")] for d in data[:limit]],
          [70, 6, 6, 6])


def cmd_pagequeries(url):
    data = rows("GetPageQueryStats", {"siteUrl": SITE, "page": url})
    agg = defaultdict(lambda: {"c": 0, "i": 0, "pos": []})
    for r in data:
        a = agg[r["Query"]]
        a["c"] += r["Clicks"]
        a["i"] += r["Impressions"]
        if r["AvgImpressionPosition"] > 0:
            a["pos"].append(r["AvgImpressionPosition"])
    out = sorted(agg.items(), key=lambda kv: -kv[1]["i"])
    print(url + "\n")
    table(["query", "clicks", "impr", "pos"],
          [[k, v["c"], v["i"],
            format(sum(v["pos"]) / len(v["pos"]), ".1f") if v["pos"] else "-"]
           for k, v in out],
          [58, 6, 6, 5])


def cmd_crawl():
    data = rows("GetCrawlStats", {"siteUrl": SITE})
    tot = defaultdict(int)
    keys = ("CrawledPages", "InIndex", "Code2xx", "Code301", "Code302", "Code4xx",
            "Code5xx", "BlockedByRobotsTxt", "CrawlErrors", "DnsFailures",
            "ConnectionTimeout")
    for r in data:
        for k in keys:
            tot[k] += r.get(k, 0)
    print("Crawl totals over " + str(len(data)) + " days")
    for k in keys:
        print("  " + k.ljust(22) + str(tot[k]))
    if data:
        last = data[-1]
        print("\nMost recent day (" + str(dt(last["Date"])) + "): crawled="
              + str(last["CrawledPages"]) + " inIndex=" + str(last["InIndex"]))
    issues = rows("GetCrawlIssues", {"siteUrl": SITE})
    print("\nCrawl issues: " + str(len(issues)))
    for i in issues[:30]:
        print("  " + str(i))


def cmd_quota():
    q = call("GetUrlSubmissionQuota", {"siteUrl": SITE}).get("d") or {}
    print("Daily quota remaining:   " + str(q.get("DailyQuota")))
    print("Monthly quota remaining: " + str(q.get("MonthlyQuota")))
    return q.get("DailyQuota") or 0


def keyword_volume(phrase, country="us"):
    """Exact and broad Bing impressions per month for a phrase. None on error."""
    start, end = month_range()
    r = call("GetKeyword", {"q": phrase, "country": country, "language": "en-US",
                            "startDate": start, "endDate": end})
    if "__error" in r:
        return None
    d = r.get("d")
    if not d:
        return None
    return {"exact": d.get("Impressions"), "broad": d.get("BroadImpressions")}


def cmd_keyword(phrase, country="us"):
    v = keyword_volume(phrase, country)
    if not v:
        print(phrase.ljust(46) + "no data")
        return None
    print(phrase.ljust(46) + "exact " + str(v["exact"]).rjust(8)
          + "   broad " + str(v["broad"]).rjust(8))
    return v


def cmd_related(phrase, country="us"):
    start, end = month_range()
    data = rows("GetRelatedKeywords", {"q": phrase, "country": country,
                                       "language": "en-US",
                                       "startDate": start, "endDate": end})
    if not data:
        print(phrase + ": no related keywords")
        return []
    data = sorted(data, key=lambda x: -(x.get("Impressions") or 0))
    for d in data:
        print("  " + (d.get("Query") or "")[:58].ljust(58)
              + str(d.get("Impressions")).rjust(8))
    return data


def cmd_submit(urls, quiet=False):
    if not urls:
        print("no URLs")
        return False
    r = call("SubmitUrlbatch", body={"siteUrl": SITE, "urlList": urls})
    if "__error" in r:
        print("FAILED: " + r["__error"] + " " + r.get("body", "")[:300])
        return False
    if not quiet:
        print("submitted " + str(len(urls)) + " URLs -> ok")
    return True


def sitemap_urls():
    try:
        with urllib.request.urlopen("https://skilldrills.online/sitemap.xml", timeout=30) as r:
            xml = r.read().decode()
        return re.findall(r"<loc>([^<]+)</loc>", xml)
    except Exception as e:
        sys.exit("could not read sitemap: " + str(e))


def cmd_submitall(dry=False):
    urls = sitemap_urls()
    print(str(len(urls)) + " URLs in sitemap")
    if dry:
        for u in urls:
            print("  " + u)
        return
    daily = cmd_quota()
    batch = urls[:daily]
    if len(batch) < len(urls):
        print("quota allows " + str(len(batch)) + " today; "
              + str(len(urls) - len(batch)) + " deferred")
    ok = 0
    for i in range(0, len(batch), 50):
        chunk = batch[i:i + 50]
        if cmd_submit(chunk, quiet=True):
            ok += len(chunk)
            print("  batch " + str(i // 50 + 1) + ": " + str(len(chunk)) + " ok")
    print("\ntotal submitted: " + str(ok))
    cmd_quota()


def main():
    cmd = sys.argv[1] if len(sys.argv) > 1 else "traffic"
    a = sys.argv[2:]
    if cmd == "sites":
        cmd_sites()
    elif cmd == "traffic":
        cmd_traffic(int(a[0]) if a else 30)
    elif cmd == "queries":
        cmd_queries(int(a[0]) if a else 40)
    elif cmd == "pages":
        cmd_pages(int(a[0]) if a else 40)
    elif cmd == "pagequeries":
        cmd_pagequeries(a[0])
    elif cmd == "crawl":
        cmd_crawl()
    elif cmd == "quota":
        cmd_quota()
    elif cmd == "keyword":
        cmd_keyword(" ".join(a))
    elif cmd == "related":
        cmd_related(" ".join(a))
    elif cmd == "submit":
        cmd_submit(a)
    elif cmd == "submitall":
        cmd_submitall(dry="--dry" in a)
    else:
        print(__doc__)


if __name__ == "__main__":
    main()
