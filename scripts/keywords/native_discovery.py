#!/usr/bin/env python3
"""Native keyword discovery per market.

Method, in one line: native phrasings are HYPOTHESES that get measured and
discarded, never translations that get targeted on faith.

  1. Probe several candidate phrasings in the market's own language.
  2. Keep only those with measured Bing volume.
  3. Expand the winner with GetRelatedKeywords, which returns queries real
     users in that market actually typed.
  4. Report the expansions, not the seeds. The seed is scaffolding.

A null from the API means UNKNOWN (error or rate limit), never zero. The two
are printed differently on purpose.
"""

import sys
import time
import json
import os

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)) + "/../bing")
import bing  # noqa: E402

PAUSE = 1.2

# Candidate phrasings per market. Multiple registers on purpose: the formal
# term, the colloquial one, and the English term (many markets search in
# English, and discovering that is itself a result).
SEEDS = {
    "kr": ["반응속도 테스트", "반응속도", "반응 속도 측정", "reaction time test"],
    "jp": ["反応速度テスト", "反応速度", "動体視力 テスト", "reaction time test"],
    "de": ["reaktionstest", "reaktionszeit test", "reaktionsgeschwindigkeit",
           "reaction time test"],
    "br": ["teste de reação", "tempo de reação", "teste de reflexo",
           "reaction time test"],
    "es": ["test de reacción", "tiempo de reacción", "test de reflejos",
           "reaction time test"],
    "mx": ["test de reacción", "tiempo de reacción", "prueba de reacción"],
    "fr": ["test de réaction", "temps de réaction", "test de réflexe",
           "reaction time test"],
    "it": ["test di reazione", "tempo di reazione", "test dei riflessi"],
    "pl": ["test refleksu", "czas reakcji", "test czasu reakcji"],
    "tr": ["refleks testi", "tepki süresi", "tepki testi"],
    "id": ["tes reaksi", "tes refleks", "kecepatan reaksi"],
    "nl": ["reactietest", "reactiesnelheid", "reactietijd test"],
    "ru": ["тест на реакцию", "скорость реакции", "проверка реакции"],
    "in": ["reaction time test", "reflex test", "aim trainer"],
    "gb": ["reaction time test", "reaction speed test"],
}

ORDER = ["kr", "jp", "de", "br", "es", "mx", "fr", "it", "pl", "tr", "id",
         "nl", "ru", "in", "gb"]


def probe(phrase, country):
    v = bing.keyword_volume(phrase, country)
    time.sleep(PAUSE)
    if v is None:
        return None
    return v.get("exact")


def run(markets):
    out = {}
    for c in markets:
        seeds = SEEDS.get(c)
        if not seeds:
            continue
        country, lang = bing.market(c)
        print("\n" + "=" * 66)
        print("MARKET " + country.upper() + " / " + lang)
        print("=" * 66)

        scored = []
        for s in seeds:
            ex = probe(s, c)
            if ex is None:
                print("  ? " + s.ljust(34) + "UNKNOWN (null - error or rate limit)")
            else:
                print("  " + ("+" if ex else "-") + " " + s.ljust(34)
                      + str(ex).rjust(8) + "/mo exact")
                scored.append((ex, s))

        scored.sort(reverse=True)
        live = [x for x in scored if x[0] > 0]
        if not live:
            print("  -> no seed carried measurable volume. SKIP THIS MARKET.")
            out[country] = {"lang": lang, "seeds": scored, "related": []}
            continue

        best = live[0][1]
        print("  -> expanding on: " + best + " (" + str(live[0][0]) + "/mo)")
        try:
            rel = bing.cmd_related(best, c)
        except Exception as e:
            print("  related failed: " + str(e))
            rel = []
        time.sleep(PAUSE)

        out[country] = {
            "lang": lang,
            "best_seed": best,
            "seeds": scored,
            "related": [{"q": d.get("Query"), "impr": d.get("Impressions")}
                        for d in (rel or [])],
        }
    return out


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if a]
    markets = args if args else ORDER
    data = run(markets)
    dest = os.path.dirname(os.path.abspath(__file__)) + "/out/native-discovery.json"
    prev = {}
    if os.path.exists(dest):
        try:
            prev = json.load(open(dest, encoding="utf-8"))
        except Exception:
            prev = {}
    prev.update(data)
    with open(dest, "w", encoding="utf-8") as f:
        json.dump(prev, f, ensure_ascii=False, indent=2)
    print("\nwrote " + dest)
