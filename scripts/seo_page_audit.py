#!/usr/bin/env python3
"""Mechanical SEO audit of every prerendered page.

Reads .next/server/app/**/*.html after `npx next build` and reports the
gate-1-to-6 failures that stop a page ranking at all: missing h1, thin body,
absent canonical, over-long title, missing description.

noindex pages are skipped -- they are not trying to rank, so flagging them is
noise. /search is deliberately noindex,follow and correctly excluded.

Run:  npx next build  &&  python scripts/seo_page_audit.py [--csv]
"""

import re
import io
import sys
import json
import glob

SKIP = ('/opengraph-image', '/_not-found', '/icon', '/apple-icon')


def audit():
    rows = []
    for p in glob.glob('.next/server/app/**/*.html', recursive=True):
        norm = p.replace('\\', '/')
        url = norm.split('.next/server/app')[1][:-5]
        if any(s in url for s in SKIP):
            continue
        try:
            h = io.open(p, encoding='utf-8', errors='replace').read()
        except Exception:
            continue
        body = re.sub(r'(?is)<script.*?</script>|<style.*?</style>', '', h)
        text = re.sub(r'\s+', ' ', re.sub(r'(?s)<[^>]+>', ' ', body))
        if re.search(r'<meta name="robots" content="[^"]*noindex', h):
            continue
        title = re.search(r'<title[^>]*>(.*?)</title>', h, re.S)
        desc = re.search(r'<meta name="description" content="(.*?)"', h, re.S)
        t = title.group(1).strip() if title else ''
        d = desc.group(1).strip() if desc else ''
        rows.append({
            'url': url or '/',
            'words': len(text.split()),
            'h1': h.count('<h1'),
            'title': t,
            'tlen': len(t),
            'dlen': len(d),
            'canonical': 'rel="canonical"' in h,
            'seo_kw': 'data-seo-kw' in h,
        })
    return rows


def main():
    rows = audit()
    rows.sort(key=lambda r: r['words'])
    print('pages audited: %d\n' % len(rows))

    checks = [
        ('THIN  (<600 words)', lambda r: r['words'] < 600),
        ('NO H1', lambda r: r['h1'] == 0),
        ('MULTIPLE H1', lambda r: r['h1'] > 1),
        ('NO CANONICAL', lambda r: not r['canonical']),
        ('TITLE > 60 chars', lambda r: r['tlen'] > 60),
        ('NO DESCRIPTION', lambda r: r['dlen'] == 0),
        ('DESCRIPTION > 160', lambda r: r['dlen'] > 160),
        ('NO data-seo-kw', lambda r: not r['seo_kw'] and '/drills/' in r['url']),
    ]
    for name, fn in checks:
        hits = [r for r in rows if fn(r)]
        print('%-22s %3d' % (name, len(hits)))

    print('\n--- worst offenders by check ---')
    for name, fn in checks:
        hits = [r for r in rows if fn(r)]
        if not hits:
            continue
        print('\n%s (%d)' % (name, len(hits)))
        for r in hits[:12]:
            print('   %-58s words=%-5d h1=%d t=%d d=%d'
                  % (r['url'][:58], r['words'], r['h1'], r['tlen'], r['dlen']))
        if len(hits) > 12:
            print('   ... and %d more' % (len(hits) - 12))

    if '--json' in sys.argv:
        json.dump(rows, io.open('scripts/keywords/out/page-audit.json', 'w',
                                encoding='utf-8'), indent=1)
        print('\nwrote scripts/keywords/out/page-audit.json')


if __name__ == '__main__':
    main()
