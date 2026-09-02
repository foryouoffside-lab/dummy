#!/usr/bin/env python3
"""
Drill-level keyword demand, per market.

`category_market_matrix.py` answers "which category in which country". This
answers the next question down: **which individual drill on this site answers a
real query, and what is that query called in each market.**

Two things shape the term list:

  1. Only a minority of the 81 drills map to a query at all. Nobody searches
     "Ghosting Suppress Pursuit" or "Entropic Grid" -- those are internal names
     for mechanics, not things people look for. Listing every drill would pad
     the output with guaranteed zeros and hide the ones that matter, so only
     drills with a plausible standalone query are tested. A drill's absence
     here is a finding, not an oversight.

  2. The queries that exist are overwhelmingly **test names, not training
     names**. People search for a thing to take, not a thing to practise, so
     the terms below are phrased the way the demand is phrased ("number memory
     test"), not the way the drill is named ("Digit Span").

Same traps as the category matrix apply and are handled the same way: correct
diacritics (an unaccented phrase silently returns 0), retries around the
rate-limit null and around URLError, and ERR is never recorded as 0.

Usage:
  python scripts/keywords/drill_market_terms.py               # all markets
  python scripts/keywords/drill_market_terms.py kr jp de      # subset
  python scripts/keywords/drill_market_terms.py --csv out.csv
"""

import sys
import os
import time
import csv

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'bing'))
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

import bing

MARKETS = ['us', 'gb', 'de', 'fr', 'br', 'pl', 'kr', 'jp']
EN = ['us', 'gb']

# (drill name, site path, {market: [local phrases]}) -- 'en' is tested everywhere.
DRILLS = [
    ('Rapid Tapping', '/drills/motor/movement-speed/rapid-tapping', {
        'en': ['cps test', 'click speed test', 'clicks per second test'],
        'jp': ['クリック連打テスト'], 'kr': ['클릭 속도 테스트'],
        'de': ['klicktest'], 'br': ['teste de clique'],
    }),
    ('Reaction Time Test', '/drills/reaction-speed/reaction-time-test', {
        'en': ['reaction time test', 'human benchmark reaction time'],
        'kr': ['반응속도 테스트'], 'jp': ['反射神経テスト'],
        'de': ['reaktionstest'], 'fr': ['test temps de réaction'],
    }),
    ('Aim Trainer', '/drills/motor/hand-eye-coordination/aim-trainer', {
        'en': ['aim trainer', 'aim training'],
        'jp': ['エイム練習'], 'kr': ['에임 연습'], 'br': ['treino de mira'],
    }),
    ('Digit Span', '/drills/memory/short-term-memory/digit-span', {
        'en': ['number memory test', 'digit span test'],
        'de': ['zahlengedächtnis test'], 'kr': ['숫자 기억력 테스트'],
        'jp': ['数字記憶テスト'],
    }),
    ('Color Sequence', '/drills/memory/short-term-memory/color-sequence', {
        'en': ['sequence memory test', 'simon game'],
        'de': ['sequenz gedächtnis test'], 'br': ['jogo da memória sequência'],
    }),
    ('Word Recall', '/drills/memory/short-term-memory/word-recall', {
        'en': ['verbal memory test', 'word memory test'],
        'de': ['wortgedächtnis test'],
    }),
    ('Grid Memorization', '/drills/memory/spatial-memory/grid-memorization', {
        'en': ['visual memory test'],
        'de': ['visuelles gedächtnis test'], 'jp': ['視覚記憶テスト'],
    }),
    ('3-Back Training', '/drills/memory/working-memory/n-back', {
        'en': ['n back test', 'dual n back'],
        'de': ['n back training'],
    }),
    ('Concentration Grid', '/drills/cognitive/focus/concentration-grid', {
        'en': ['concentration grid', 'schulte table'],
        'de': ['schulte tabelle'], 'jp': ['シュルテテーブル'],
    }),
    ('Drop Catch', '/drills/physical/reflex-training/drop-catch', {
        'en': ['ruler drop test', 'reaction ruler test'],
        'de': ['lineal fallen test'],
    }),
    ('Steady Hand', '/drills/motor/precision-control/steady-hand', {
        'en': ['steady hand game', 'hand steadiness test'],
    }),
    ('Visual Tracking Speed Test', '/drills/reaction-speed/visual-tracking-speed-test', {
        'en': ['dynamic visual acuity test', 'eye tracking test'],
        'jp': ['動体視力テスト'], 'kr': ['동체시력 테스트'],
    }),
    ('Chroma-Sync Lab', '/drills/visual/reaction-speed/go/no-go', {
        'en': ['go no go test'],
        'de': ['go nogo test'],
    }),
    ('Ghost-Link Tracking', '/drills/visual/tracking-accuracy/multiple-targets', {
        'en': ['multiple object tracking test'],
    }),
    ('Distance Judgment Lab', '/drills/visual/depth-perception/distance-judgment', {
        'en': ['depth perception test'],
        'de': ['tiefenwahrnehmung test'], 'jp': ['奥行き知覚テスト'],
    }),
    ('Visual Search', '/drills/visual/visual-recognition/visual-search', {
        'en': ['visual search test'],
    }),
    ('Flick Shot Training', '/drills/fps/flick-shot-training', {
        'en': ['flick training', 'flick aim trainer'],
        'kr': ['플릭 연습'], 'jp': ['フリック エイム'],
    }),
    ('Keyboard Recognition', '/drills/motor/movement-speed/keyboard-recognition', {
        'en': ['keyboard test', 'key press test'],
        'de': ['tastatur test'],
    }),
    ('180° Peripheral Scan', '/drills/fps/180-degree-awareness', {
        'en': ['peripheral vision test'],
        'jp': ['周辺視野テスト'], 'de': ['gesichtsfeld test'],
    }),
    ('Symbol Matching', '/drills/cognitive/processing-speed/symbol-matching', {
        'en': ['symbol digit modalities test', 'processing speed test'],
    }),
    ('RSVP Speed Reader', '/drills/cognitive/processing-speed/rsvp-reader', {
        'en': ['reading speed test', 'speed reading test'],
        'de': ['lesegeschwindigkeit test'], 'br': ['teste de velocidade de leitura'],
    }),
    ('Multi-Tasking', '/drills/cognitive/attention/multi-tasking', {
        'en': ['multitasking test', 'divided attention test'],
    }),
]

ERR = 'ERR'


def phrases_for(spec, mkt):
    if mkt in EN:
        return list(spec['en'])
    return list(spec.get(mkt, [])) + list(spec['en'])


def volume(phrase, mkt, tries=4):
    """Exact volume. None means unmeasured (error), never 'no demand'."""
    for attempt in range(tries):
        try:
            v = bing.keyword_volume(phrase, mkt)
            if v is not None and v.get('exact') is not None:
                return v['exact']
        except Exception as e:
            print('    ! %s [%s]: %s' % (phrase, mkt, e), flush=True)
        time.sleep(1.5 * (attempt + 1))
    return None


def main():
    args = list(sys.argv[1:])
    csv_path = None
    if '--csv' in args:
        i = args.index('--csv')
        csv_path = args[i + 1] if len(args) > i + 1 else 'drill_market_terms.csv'
        del args[i:i + 2]
    markets = [a.lower() for a in args if a.lower() in MARKETS] or MARKETS

    csv_f = csv_w = None
    if csv_path:
        csv_f = open(csv_path, 'w', newline='', encoding='utf-8')
        csv_w = csv.writer(csv_f)
        csv_w.writerow(['market', 'drill', 'path', 'phrase', 'exact_volume'])

    results = {}   # (drill, market) -> (vol|None, phrase)
    for name, path, spec in DRILLS:
        print('\n=== %s  (%s)' % (name, path), flush=True)
        for mkt in markets:
            best, best_phrase, saw_err = None, None, False
            for ph in phrases_for(spec, mkt):
                v = volume(ph, mkt)
                if v is None:
                    saw_err = True
                elif best is None or v > best:
                    best, best_phrase = v, ph
                if csv_w:
                    csv_w.writerow([mkt, name, path, ph, ERR if v is None else v])
                    csv_f.flush()
                time.sleep(0.4)
            results[(name, mkt)] = (None, None) if (best is None and saw_err) else (best or 0, best_phrase)
            v, p = results[(name, mkt)]
            print('   %-3s %8s  %s' % (mkt.upper(), ERR if v is None else v, p or ''), flush=True)

    print('\n' + '=' * 96)
    print('DRILL x MARKET  --  best term and its Bing exact monthly volume')
    print('=' * 96)
    hdr = 'drill'.ljust(28) + ''.join(m.upper().rjust(8) for m in markets)
    print(hdr)
    print('-' * len(hdr))
    for name, path, spec in DRILLS:
        row = name[:27].ljust(28)
        for m in markets:
            v = results[(name, m)][0]
            row += (ERR if v is None else str(v)).rjust(8)
        print(row)

    print('\n' + '=' * 96)
    print('RANKED drill-market pairs')
    print('=' * 96)
    pairs = []
    for (name, m), (v, p) in results.items():
        if v:
            pairs.append((v, name, m, p))
    pairs.sort(reverse=True)
    print('%-7s %-28s %-4s %s' % ('vol', 'drill', 'mkt', 'term'))
    for v, name, m, p in pairs[:45]:
        print('%-7d %-28s %-4s %s' % (v, name, m.upper(), p))

    print('\nDRILLS WITH NO MEASURABLE DEMAND IN ANY MARKET:')
    for name, path, spec in DRILLS:
        if not any(results[(name, m)][0] for m in markets):
            print('  %-28s %s' % (name, path))

    if csv_f:
        csv_f.close()
        print('\nwrote ' + csv_path)


if __name__ == '__main__':
    main()
