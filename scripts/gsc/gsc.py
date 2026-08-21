"""Google Search Console puller for skilldrills.online.

One-time setup (run this yourself, it opens a browser):
    python scripts/gsc/gsc.py auth

Then any of:
    python scripts/gsc/gsc.py sites
    python scripts/gsc/gsc.py queries [days] [limit]
    python scripts/gsc/gsc.py pages [days] [limit]
    python scripts/gsc/gsc.py opportunities [days] [limit]
    python scripts/gsc/gsc.py pageopps [days] [limit]
    python scripts/gsc/gsc.py csv <queries|pages> [days]

Secrets live outside the repo. Override with env vars:
    GSC_CREDENTIALS  default C:/Users/sangmesh/Desktop/credentials.json
    GSC_TOKEN        default C:/Users/sangmesh/Desktop/gsc-token.json
"""
import os
import sys
import csv
import json
import datetime as dt

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]
CREDENTIALS = os.environ.get(
    "GSC_CREDENTIALS", r"C:\Users\sangmesh\Desktop\credentials.json"
)
TOKEN = os.environ.get("GSC_TOKEN", r"C:\Users\sangmesh\Desktop\gsc-token.json")
SITE = os.environ.get("GSC_SITE", "https://skilldrills.online/")


def get_service(interactive=False):
    creds = None
    if os.path.exists(TOKEN):
        creds = Credentials.from_authorized_user_file(TOKEN, SCOPES)
    if creds and creds.expired and creds.refresh_token:
        creds.refresh(Request())
        _save(creds)
    if not creds or not creds.valid:
        if not interactive:
            sys.exit(
                "No valid token. Run this yourself in your own terminal:\n"
                "    python scripts/gsc/gsc.py auth"
            )
        flow = InstalledAppFlow.from_client_secrets_file(CREDENTIALS, SCOPES)
        creds = flow.run_local_server(port=0)
        _save(creds)
    return build("searchconsole", "v1", credentials=creds)


def _save(creds):
    with open(TOKEN, "w") as f:
        f.write(creds.to_json())
    try:
        os.chmod(TOKEN, 0o600)
    except OSError:
        pass


def _range(days):
    end = dt.date.today() - dt.timedelta(days=2)  # GSC lags ~2 days
    return (end - dt.timedelta(days=days)).isoformat(), end.isoformat()


def query(svc, dims, days, limit=100, filters=None):
    start, end = _range(days)
    body = {
        "startDate": start,
        "endDate": end,
        "dimensions": dims,
        "rowLimit": limit,
    }
    if filters:
        body["dimensionFilterGroups"] = [{"filters": filters}]
    resp = svc.searchanalytics().query(siteUrl=SITE, body=body).execute()
    return resp.get("rows", [])


def _table(rows, dim_label, limit):
    if not rows:
        print("No data returned. Check the property URL with: gsc.py sites")
        return
    w = max(len(str(r["keys"][0])) for r in rows[:limit])
    w = min(max(w, len(dim_label)), 70)
    print(f"{dim_label:<{w}}  {'clicks':>7} {'impr':>8} {'ctr':>7} {'pos':>6}")
    print("-" * (w + 32))
    for r in rows[:limit]:
        k = str(r["keys"][0])[:70]
        print(
            f"{k:<{w}}  {r['clicks']:>7.0f} {r['impressions']:>8.0f} "
            f"{r['ctr']*100:>6.2f}% {r['position']:>6.1f}"
        )
    tc = sum(r["clicks"] for r in rows)
    ti = sum(r["impressions"] for r in rows)
    print("-" * (w + 32))
    print(f"{'TOTAL (' + str(len(rows)) + ' rows)':<{w}}  {tc:>7.0f} {ti:>8.0f}")


def main():
    cmd = sys.argv[1] if len(sys.argv) > 1 else "queries"
    days = int(sys.argv[2]) if len(sys.argv) > 2 else 28
    limit = int(sys.argv[3]) if len(sys.argv) > 3 else 30

    if cmd == "auth":
        get_service(interactive=True)
        print(f"Authorized. Token saved to {TOKEN}")
        return

    svc = get_service()

    if cmd == "sites":
        for s in svc.sites().list().execute().get("siteEntry", []):
            print(f"{s['permissionLevel']:<22} {s['siteUrl']}")
        return

    if cmd == "queries":
        print(f"\nTop queries — last {days} days — {SITE}\n")
        _table(query(svc, ["query"], days, 500), "query", limit)

    elif cmd == "pages":
        print(f"\nTop pages — last {days} days — {SITE}\n")
        _table(query(svc, ["page"], days, 500), "page", limit)

    elif cmd == "pageopps":
        rows = query(svc, ["page"], days, 1000)
        opp = [r for r in rows if r["impressions"] >= 40 and r["position"] <= 15]
        # expected CTR by position; flag pages materially under it
        # observed average organic CTR by position, linearly interpolated
        CURVE = {1: .276, 2: .158, 3: .110, 4: .084, 5: .063, 6: .049,
                 7: .039, 8: .033, 9: .028, 10: .024, 12: .018, 15: .012,
                 20: .008}
        def expected(pos):
            ks = sorted(CURVE)
            if pos <= ks[0]:
                return CURVE[ks[0]]
            if pos >= ks[-1]:
                return CURVE[ks[-1]]
            for a, b in zip(ks, ks[1:]):
                if a <= pos <= b:
                    t = (pos - a) / (b - a)
                    return CURVE[a] + t * (CURVE[b] - CURVE[a])
            return CURVE[ks[-1]]
        opp = [r for r in opp if r["ctr"] < expected(r["position"]) * 0.6]
        opp.sort(key=lambda r: r["impressions"] * (expected(r["position"]) - r["ctr"]),
                 reverse=True)
        print(f"\nPage-level quick wins - last {days} days")
        print("ranking well but under-clicked; sorted by clicks left on the table\n")
        _table(opp, "page", limit)

    elif cmd == "opportunities":
        rows = query(svc, ["query"], days, 1000)
        # high impressions, poor CTR, ranking on page 1-2 = quick wins
        opp = [
            r for r in rows
            if r["impressions"] >= 50 and r["ctr"] < 0.02 and r["position"] <= 20
        ]
        opp.sort(key=lambda r: r["impressions"], reverse=True)
        print(f"\nQuick wins — high impressions, CTR under 2%, position <= 20")
        print(f"last {days} days — these need better titles/descriptions\n")
        _table(opp, "query", limit)

    elif cmd == "csv":
        what = sys.argv[2] if len(sys.argv) > 2 else "queries"
        days = int(sys.argv[3]) if len(sys.argv) > 3 else 28
        dim = "page" if what == "pages" else "query"
        rows = query(svc, [dim], days, 5000)
        out = f"gsc-{what}-{dt.date.today().isoformat()}.csv"
        with open(out, "w", newline="", encoding="utf-8") as f:
            wtr = csv.writer(f)
            wtr.writerow([dim, "clicks", "impressions", "ctr", "position"])
            for r in rows:
                wtr.writerow([
                    r["keys"][0], r["clicks"], r["impressions"],
                    round(r["ctr"], 4), round(r["position"], 2),
                ])
        print(f"Wrote {len(rows)} rows to {out}")

    else:
        print(__doc__)


if __name__ == "__main__":
    main()
