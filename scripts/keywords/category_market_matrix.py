#!/usr/bin/env python3
"""
Category x Market demand matrix.

Answers one question: for each of the 8 drill categories, which countries
actually search for it, and how much?

This exists because the strategy question -- "point each category at the
country where it has the most demand" -- was being answered by intuition.
`country_keywords.py --matrix` only covered FPS/reaction/CPS across 4 markets,
and `market_volume.py` is likewise aim-heavy, so neither could rank a category
like memory or cognitive against a market.

Method notes, and the traps they avoid:

  1. Head terms are written the way each market actually searches, not
     translated word-for-word from English. Several categories are searched
     for in English even in non-English markets ("aim trainer" in DE/JP/KR is
     a loanword), so the English term is tested alongside the local one and
     the higher number wins.

  2. A category's score for a market is the MAX exact volume across its
     phrase variants, not the sum. Summing double-counts near-synonyms that
     Bing already reports overlapping impressions for, which would flatter
     whichever category happens to have the most phrasings listed here.

  3. Bing returns a null -- indistinguishable from zero at the call site --
     when it rate-limits. Recording that as 0 would silently erase demand for
     whatever category happened to hit the limit, which is exactly the kind of
     error that would send the whole strategy at the wrong country. So a null
     is retried with backoff, and if it still fails it is recorded as ERR and
     printed as ERR. Never as 0.

  4. Diacritics are load-bearing. Bing's GetKeyword matches the string it is
     given: `gedachtnistraining` returns exact 0 while `gedaechtnistraining`
     spelled properly (gedächtnistraining) returns 244. An unaccented table
     would have reported "no demand" for memory in Germany, France, Poland,
     Turkey and Brazil -- silently, and in exactly the direction that kills a
     market before it is ever considered. Every phrase below carries its
     correct diacritics for that reason. Verified 2026-09-02.

Usage:
  python scripts/keywords/category_market_matrix.py            # all markets
  python scripts/keywords/category_market_matrix.py br de jp   # subset
  python scripts/keywords/category_market_matrix.py --csv out.csv
"""

import sys
import os
import time
import csv

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'bing'))
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

import bing

# Markets worth testing: large search markets where the site could plausibly
# rank, restricted to ones bing.MARKET_LANG can resolve a language for.
MARKETS = ['us', 'gb', 'in', 'br', 'mx', 'es', 'de', 'fr',
           'it', 'jp', 'kr', 'pl', 'tr', 'id', 'ru']

EN = ['us', 'gb', 'in']

# category -> market -> phrases. 'en' is the fallback used for US/GB/IN and is
# also appended to every other market, because these terms are frequently
# searched untranslated outside English markets.
PHRASES = {
    'fps': {
        'en': ['aim trainer', 'aim training'],
        'br': ['treino de mira', 'treinador de mira'],
        'mx': ['entrenar puntería', 'mejorar puntería valorant'],
        'es': ['entrenar puntería', 'entrenamiento de puntería'],
        'de': ['zielübung', 'aim training kostenlos'],
        'fr': ['entraînement visée'],
        'it': ['allenamento mira'],
        'jp': ['エイム練習', 'エイム練習サイト'],
        'kr': ['에임 연습', '에임 훈련'],
        'pl': ['trening celowania'],
        'tr': ['nişan alma antrenmanı'],
        'id': ['latihan aim'],
        'ru': ['тренировка прицела', 'аим тренер'],
    },
    'reaction-speed': {
        'en': ['reaction time test', 'reaction test'],
        'br': ['teste de tempo de reação', 'teste de reação'],
        'mx': ['test de tiempo de reacción'],
        'es': ['test de tiempo de reacción'],
        'de': ['reaktionszeit test', 'reaktionstest'],
        'fr': ['test temps de réaction'],
        'it': ['test tempo di reazione'],
        'jp': ['反射神経テスト'],
        'kr': ['반응속도 테스트'],
        'pl': ['test refleksu'],
        'tr': ['reaksiyon süresi testi'],
        'id': ['tes waktu reaksi'],
        'ru': ['тест на реакцию'],
    },
    'motor': {
        'en': ['cps test', 'click speed test'],
        'br': ['teste de cps', 'teste de clique'],
        'mx': ['test de cps'],
        'es': ['test de cps', 'test de velocidad de clic'],
        'de': ['klickgeschwindigkeit test'],
        'fr': ['test de clic'],
        'it': ['test velocità click'],
        'jp': ['クリック連打テスト', 'cpsテスト'],
        'kr': ['클릭 속도 테스트'],
        'pl': ['test szybkości klikania'],
        'tr': ['tıklama hızı testi'],
        'id': ['tes kecepatan klik'],
        'ru': ['тест скорости клика'],
    },
    'memory': {
        'en': ['memory training', 'memory game'],
        'br': ['jogos de memória', 'treino de memória'],
        'mx': ['juegos de memoria'],
        'es': ['juegos de memoria', 'entrenamiento de memoria'],
        'de': ['gedächtnistraining'],
        'fr': ['jeux de mémoire'],
        'it': ['giochi di memoria'],
        'jp': ['記憶力トレーニング'],
        'kr': ['기억력 테스트'],
        'pl': ['trening pamięci'],
        'tr': ['hafıza oyunları'],
        'id': ['latihan memori'],
        'ru': ['тренировка памяти'],
    },
    'cognitive': {
        'en': ['brain training', 'brain games'],
        'br': ['treino cerebral', 'jogos mentais'],
        'mx': ['entrenamiento cerebral'],
        'es': ['entrenamiento cerebral', 'juegos mentales'],
        'de': ['gehirnjogging', 'gehirntraining'],
        'fr': ['entraînement cérébral'],
        'it': ['allenamento mentale'],
        'jp': ['脳トレ'],
        'kr': ['두뇌 훈련'],
        'pl': ['trening mózgu'],
        'tr': ['beyin egzersizleri'],
        'id': ['latihan otak'],
        'ru': ['тренировка мозга'],
    },
    'visual': {
        'en': ['visual training', 'eye training'],
        'br': ['treino visual'],
        'mx': ['entrenamiento visual'],
        'es': ['entrenamiento visual'],
        'de': ['sehtraining', 'augentraining'],
        'fr': ['entraînement visuel'],
        'it': ['allenamento visivo'],
        'jp': ['動体視力トレーニング'],
        'kr': ['동체시력 훈련'],
        'pl': ['trening wzroku'],
        'tr': ['göz egzersizleri'],
        'id': ['latihan mata'],
        'ru': ['тренировка зрения'],
    },
    'visual-tracking': {
        'en': ['eye tracking test', 'dynamic visual acuity'],
        'br': ['teste de visão dinâmica'],
        'mx': ['agudeza visual dinámica'],
        'es': ['agudeza visual dinámica'],
        'de': ['dynamische sehschärfe'],
        'fr': ['acuité visuelle dynamique'],
        'it': ['acuità visiva dinamica'],
        'jp': ['動体視力テスト'],
        'kr': ['동체시력 테스트'],
        'pl': ['test wzroku dynamicznego'],
        'tr': ['dinamik görme testi'],
        'id': ['tes penglihatan dinamis'],
        'ru': ['тест динамического зрения'],
    },
    'physical': {
        'en': ['reflex training', 'reflex test'],
        'br': ['teste de reflexo'],
        'mx': ['test de reflejos'],
        'es': ['test de reflejos'],
        'de': ['reflextraining'],
        'fr': ['test de réflexe'],
        'it': ['test dei riflessi'],
        'jp': ['反射神経 鍛える'],
        'kr': ['반사신경 테스트'],
        'pl': ['trening refleksu'],
        'tr': ['refleks testi'],
        'id': ['tes refleks'],
        'ru': ['тренировка рефлексов'],
    },
}

ERR = 'ERR'


def phrases_for(category, mkt):
    """Local phrases plus the English ones, which are often searched as-is."""
    table = PHRASES[category]
    if mkt in EN:
        return list(table['en'])
    return list(table.get(mkt, [])) + list(table['en'])


def volume(phrase, mkt, tries=4):
    """Exact volume, retrying the rate-limit null. Returns int or None.

    The try/except is not decoration. bing.call() catches HTTPError but not
    URLError, so a dropped TCP connection propagates all the way out -- which
    killed a full 15-market run at market 11 of 15 and lost every result with
    it, because the summary is only printed at the end. A transport failure on
    one phrase must cost that phrase, not the run.
    """
    for attempt in range(tries):
        try:
            v = bing.keyword_volume(phrase, mkt)
            if v is not None and v.get('exact') is not None:
                return v['exact']
        except Exception as e:                     # URLError, socket reset, etc.
            print('    ! %s [%s]: %s' % (phrase, mkt, e), flush=True)
        # Null here is ambiguous: genuinely no data, or throttled. Back off and
        # retry; only a repeated null is reported, and reported as ERR not 0.
        time.sleep(1.5 * (attempt + 1))
    return None


def main():
    args = list(sys.argv[1:])
    csv_path = None
    if '--csv' in args:
        i = args.index('--csv')
        csv_path = args[i + 1] if len(args) > i + 1 else 'category_market_matrix.csv'
        del args[i:i + 2]
    markets = [a.lower() for a in args if a.lower() in MARKETS] or MARKETS

    cats = list(PHRASES.keys())
    results = {c: {} for c in cats}   # results[cat][mkt] = (volume|None, phrase)
    detail = []

    total = sum(len(phrases_for(c, m)) for c in cats for m in markets)
    done = 0
    print('Querying %d phrases across %d markets x %d categories...\n'
          % (total, len(markets), len(cats)), flush=True)

    # Rows are written and flushed as they arrive rather than at the end, so a
    # run that dies partway still leaves every market it did finish on disk.
    csv_f = csv_w = None
    if csv_path:
        csv_f = open(csv_path, 'w', newline='', encoding='utf-8')
        csv_w = csv.writer(csv_f)
        csv_w.writerow(['market', 'language', 'category', 'phrase', 'exact_volume'])

    for mkt in markets:
        _, lang = bing.market(mkt)
        print('=== %s / %s ===' % (mkt.upper(), lang), flush=True)
        for cat in cats:
            best, best_phrase, saw_error = None, None, False
            for ph in phrases_for(cat, mkt):
                v = volume(ph, mkt)
                done += 1
                if v is None:
                    saw_error = True
                elif best is None or v > best:
                    best, best_phrase = v, ph
                row = [mkt, lang, cat, ph, ERR if v is None else v]
                detail.append(row)
                if csv_w:
                    csv_w.writerow(row)
                    csv_f.flush()
                time.sleep(0.4)
            if best is None and saw_error:
                results[cat][mkt] = (None, None)
                print('  %-16s %8s' % (cat, ERR), flush=True)
            else:
                results[cat][mkt] = (best or 0, best_phrase)
                print('  %-16s %8s  %s' % (cat, best or 0, best_phrase or ''), flush=True)
        print('  [%d/%d]\n' % (done, total))

    # ---- matrix ----
    print('\n' + '=' * 100)
    print('CATEGORY x MARKET  --  Bing exact monthly impressions (best phrase per cell)')
    print('=' * 100)
    header = 'category'.ljust(17) + ''.join(m.upper().rjust(8) for m in markets)
    print(header)
    print('-' * len(header))
    for cat in cats:
        row = cat.ljust(17)
        for m in markets:
            val = results[cat][m][0]
            row += (ERR if val is None else str(val)).rjust(8)
        print(row)

    # ---- ranked opportunities ----
    print('\n' + '=' * 100)
    print('RANKED: strongest category-market pairs')
    print('=' * 100)
    pairs = []
    for cat in cats:
        for m in markets:
            v = results[cat][m][0]
            if v:
                pairs.append((v, cat, m, results[cat][m][1]))
    pairs.sort(reverse=True)
    print('%-7s %-17s %-4s %s' % ('vol', 'category', 'mkt', 'winning phrase'))
    for v, cat, m, ph in pairs[:40]:
        print('%-7d %-17s %-4s %s' % (v, cat, m.upper(), ph))

    # ---- best market per category ----
    print('\n' + '=' * 100)
    print('BEST MARKET PER CATEGORY (the actual strategy question)')
    print('=' * 100)
    for cat in cats:
        ranked = sorted(((results[cat][m][0] or 0, m) for m in markets), reverse=True)
        top = ', '.join('%s %d' % (m.upper(), v) for v, m in ranked[:4] if v)
        print('%-17s %s' % (cat, top or '(no measurable demand)'))

    if csv_path:
        with open(csv_path, 'w', newline='', encoding='utf-8') as f:
            w = csv.writer(f)
            w.writerow(['market', 'language', 'category', 'phrase', 'exact_volume'])
            w.writerows(detail)
        print('\nwrote %s (%d rows)' % (csv_path, len(detail)))


if __name__ == '__main__':
    main()
