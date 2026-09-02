import sys, os, time
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'bing'))
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
import bing

BATCH = {
 'br': ["teste de cps","teste de tempo de reacao","teste de tempo de reação","teste de reflexo",
        "treino de mira","mira valorant","teste de clique","jogos de treinar memoria",
        "aim trainer","teste de reacao"],
 'es': ["test de cps","test de tiempo de reaccion","test de reflejos","entrenar punteria",
        "mejorar punteria valorant","test de clics","juegos de memoria","aim trainer",
        "test de velocidad de clic"],
 'jp': ["エイム練習","エイム練習 ブラウザ","エイム練習サイト","反射神経テスト","反射神経テスト 無料",
        "クリック連打テスト","動体視力テスト","aim trainer","cpsテスト"],
 'kr': ["에임 연습","에임 훈련","반응속도 테스트","클릭 속도 테스트","동체시력 테스트","aim trainer"],
 'de': ["aim trainer","reaktionszeit test","reaktionstest","klickgeschwindigkeit test",
        "aim training kostenlos","gehirnjogging kostenlos","reaktionsgeschwindigkeit testen"],
 'us': ["aim trainer","reaction time test","cps test","click speed test","brain training",
        "visual tracking test","peripheral vision test"],
}

for country, kws in BATCH.items():
    c, lang = bing.market(country)
    print("\n===== %s / %s =====" % (c.upper(), lang))
    print("%-42s %9s %9s" % ("phrase", "exact", "broad"))
    for kw in kws:
        v = bing.keyword_volume(kw, c)
        if v is None:
            print("%-42s %9s %9s" % (kw, "ERR", "ERR"))
        else:
            print("%-42s %9s %9s" % (kw, v["exact"], v["broad"]))
        time.sleep(0.4)
