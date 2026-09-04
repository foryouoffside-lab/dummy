#!/usr/bin/env python3
"""
Deep Research Keyword & Demand Collector for reaction-speed category.
Measures Bing Webmaster Tools keyword volumes across 17 markets:
  Tier A: kr, jp, de, br, es
  Tier B: fr, pl, it, tr, id, vi, th, ru, nl, se
  Tier C: us, gb (control)

Features:
- Exponential backoff retry on nulls/errors (distinguishes ERR from ZERO).
- Diacritic sensitivity (both accented and unaccented tested).
- Generates raw CSV and formatted Markdown report.
"""
import sys
import os
import time
import csv
import json
from datetime import datetime, timezone

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'bing'))
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

import bing

TODAY = datetime.now(timezone.utc).strftime('%Y-%m-%d')
OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'out')
os.makedirs(OUT_DIR, exist_ok=True)

CSV_PATH = os.path.join(OUT_DIR, f'reaction-speed-intl-{TODAY}.csv')
MD_PATH = os.path.join(OUT_DIR, f'reaction-speed-intl-{TODAY}.md')

TIER_A = ['kr', 'jp', 'de', 'br', 'es']
TIER_B = ['fr', 'pl', 'it', 'tr', 'id', 'vi', 'th', 'ru', 'nl', 'se']
TIER_C = ['us', 'gb']
ALL_MARKETS = TIER_A + TIER_B + TIER_C

# Drill definitions & candidate lists
CANDIDATES = {
    'category': {
        'display': 'Reaction Speed Hub',
        'href': '/drills/reaction-speed',
        'terms': {
            'kr': ['반응속도 테스트', '반응속도테스트', '반응속도 훈련', '순발력 테스트', '반속 테스트', '반응속도 게임'],
            'jp': ['反射神経テスト', '反応速度テスト', '反射神経ゲーム', '反応速度トレーニング', '反射神経 鍛える'],
            'de': ['reaktionstest', 'reaktionszeit test', 'reaktionstraining', 'reaktionstest online', 'reaktionsspiel'],
            'br': ['teste de tempo de reação', 'teste de tempo de reacao', 'teste de reação', 'teste de reacao', 'teste de reflexo', 'jogos de reflexo'],
            'es': ['test de tiempo de reacción', 'test de tiempo de reaccion', 'test de reacción', 'test de reaccion', 'test de reflejos', 'juegos de reflejos'],
            'fr': ['test temps de réaction', 'test temps de reaction', 'test de reflexe', 'test de réflexe', 'jeux de réflexes'],
            'pl': ['test refleksu', 'test na refleks', 'test czasu reakcji', 'ćwiczenie refleksu', 'gra na refleks'],
            'it': ['test tempo di reazione', 'test riflessi', 'giochi di riflessi', 'allenamento riflessi'],
            'tr': ['reaksiyon süresi testi', 'reaksiyon testi', 'refleks testi', 'refleks oyunu'],
            'id': ['tes waktu reaksi', 'tes refleks', 'game refleks', 'latihan refleks'],
            'vi': ['kiểm tra tốc độ phản xạ', 'test tốc độ phản xạ', 'kiem tra toc do phan xa', 'game phản xạ'],
            'th': ['ทดสอบความเร็วในการตอบสนอง', 'ทดสอบปฏิกิริยา', 'เกมฝึกปฏิกิริยา'],
            'ru': ['тест на реакцию', 'тест скорости реакции', 'проверка реакции', 'игры на реакцию'],
            'nl': ['reactietest', 'reactiesnelheid test', 'reactietijd test', 'reactiespel'],
            'se': ['reaktionstest', 'reaktionstid test', 'testa reaktionsförmåga', 'reaktionsspel'],
            'us': ['reaction time test', 'reaction test', 'reaction training drills', 'reflex test', 'reflex training game'],
            'gb': ['reaction time test', 'reaction test', 'reaction training drills', 'reflex test', 'reflex training game'],
        }
    },
    'reaction-time-test': {
        'display': 'Reaction Time Test',
        'href': '/drills/reaction-speed/reaction-time-test',
        'terms': {
            'kr': ['반응속도 테스트', '반속 테스트', '반응속도테스트', '반속테스트', '순발력 테스트', '반응속도 측정', 'human benchmark 반응속도', '무료 반응속도 테스트'],
            'jp': ['反応速度テスト', '反射神経テスト', '反応速度測定', '反射神経測定', 'human benchmark 日本語', '無料 反応速度テスト', '反応速度 テスト'],
            'de': ['reaktionstest', 'reaktionszeit test', 'reaktionstest online', 'reaktionszeit messen', 'reaktionstest kostenlos', 'human benchmark deutsch'],
            'br': ['teste de tempo de reação', 'teste de tempo de reacao', 'teste de reação', 'teste de reacao', 'teste de reflexo', 'medir tempo de reação', 'teste de reflexos online'],
            'es': ['test de tiempo de reacción', 'test de tiempo de reaccion', 'test de reacción', 'test de reaccion', 'test de reflejos', 'medir tiempo de reaccion', 'test de reflejos online'],
            'fr': ['test temps de réaction', 'test temps de reaction', 'test de temps de réaction', 'test de réflexe', 'mesurer temps de réaction', 'test de reactivité'],
            'pl': ['test czasu reakcji', 'test na refleks', 'test refleksu', 'pomiar czasu reakcji', 'sprawdź swój refleks'],
            'it': ['test tempo di reazione', 'test riflessi', 'misura tempo di reazione', 'test tempi di reazione'],
            'tr': ['reaksiyon süresi testi', 'reaksiyon testi', 'refleks testi', 'tepki süresi testi', 'refleks ölçme'],
            'id': ['tes waktu reaksi', 'tes refleks', 'uji waktu reaksi', 'pengukur waktu reaksi'],
            'vi': ['kiểm tra tốc độ phản xạ', 'test tốc độ phản xạ', 'đo thời gian phản xạ', 'test phản xạ'],
            'th': ['ทดสอบความเร็วในการตอบสนอง', 'ทดสอบปฏิกิริยาตอบสนอง', 'วัดความเร็วในการตอบสนอง'],
            'ru': ['тест на реакцию', 'тест скорости реакции', 'проверка времени реакции', 'измерить реакцию'],
            'nl': ['reactietijd test', 'reactietest', 'reactiesnelheid meten', 'reactiesnelheid test online'],
            'se': ['reaktionstid test', 'reaktionstest', 'testa reaktionstid', 'mäta reaktionstid'],
            'us': ['reaction time test', 'human benchmark reaction time', 'reaction speed test', 'measure reaction time', 'free reaction time test'],
            'gb': ['reaction time test', 'human benchmark reaction time', 'reaction speed test', 'measure reaction time'],
        }
    },
    'reflex-training-drill': {
        'display': 'Reflex Training Drill',
        'href': '/drills/reaction-speed/reflex-training-drill',
        'terms': {
            'kr': ['반응속도 훈련', '순발력 훈련', '반응속도 키우기', '반응속도 연습', '반속 훈련', '순발력 기르기'],
            'jp': ['反射神経 鍛える', '反射神経 トレーニング', '反射神経ゲーム', '反応速度 練習', '反射神経 練習'],
            'de': ['reaktionstraining', 'reflexe trainieren', 'reaktionsspiel', 'reaktionszeit verbessern', 'reflexe verbessern'],
            'br': ['treino de reflexo', 'treinar reflexos', 'jogo de reflexo', 'exercicios de reflexo', 'como melhorar os reflexos'],
            'es': ['entrenar reflejos', 'juegos de reflejos', 'entrenamiento de reflejos', 'ejercicios de reflejos', 'mejorar reflejos'],
            'fr': ['entraîner ses réflexes', 'entrainement reflexe', 'jeux de réflexes', 'améliorer ses réflexes', 'exercices de reflexe'],
            'pl': ['trening refleksu', 'ćwiczenie refleksu', 'gra na refleks', 'jak poprawić refleks'],
            'it': ['allenare i riflessi', 'allenamento riflessi', 'giochi di riflessi', 'migliorare i riflessi'],
            'tr': ['refleks geliştirme', 'refleks oyunu', 'refleks egzersizleri', 'refleks hızlandırma'],
            'id': ['melatih refleks', 'game refleks', 'latihan refleks', 'cara melatih refleks'],
            'vi': ['luyện tập phản xạ', 'game phản xạ', 'cách tăng phản xạ', 'rèn luyện phản xạ'],
            'th': ['ฝึกปฏิกิริยาตอบสนอง', 'เกมฝึกปฏิกิริยา', 'ฝึกความเร็วในการตอบสนอง'],
            'ru': ['тренировка реакции', 'игры на реакцию', 'как улучшить реакцию', 'упражнения на реакцию'],
            'nl': ['reactievermogen trainen', 'reflexen trainen', 'reactiespel', 'reactiesnelheid verbeteren'],
            'se': ['träna reaktionsförmåga', 'reaktionsspel', 'träna reflexer'],
            'us': ['reflex training drill', 'reflex training game', 'train reflexes', 'reflex test game', 'how to improve reaction time'],
            'gb': ['reflex training drill', 'reflex training game', 'train reflexes', 'how to improve reaction time'],
        }
    },
    'saccadic-gallery': {
        'display': 'Saccadic Gallery',
        'href': '/drills/reaction-speed/saccadic-gallery',
        'terms': {
            'kr': ['사카딕', '안구운동', '눈 운동', '사카딕 운동', '안구 운동 훈련'],
            'jp': ['サッケード', '眼球運動', '目の体操', '跳躍性眼球運動', 'サッケード トレーニング'],
            'de': ['sakkaden training', 'augenübungen', 'augentraining', 'sakkadische augenbewegungen'],
            'br': ['treino sacádico', 'exercícios para os olhos', 'exercicios para os olhos', 'movimentos sacadicos'],
            'es': ['ejercicios sacádicos', 'ejercicios sacadicos', 'ejercicios para los ojos', 'movimientos sacadicos'],
            'fr': ['mouvements saccadiques', 'exercices oculaires', 'gymnastique des yeux', 'entraînement saccadique'],
            'pl': ['trening sakkadowy', 'ćwiczenia oczu', 'ruchy sakkadowe'],
            'it': ['movimenti saccadici', 'esercizi per gli occhi', 'ginnastica oculare'],
            'tr': ['sakkadik göz hareketleri', 'göz egzersizleri'],
            'id': ['gerakan sakadik', 'senam mata', 'latihan mata'],
            'vi': ['bài tập mắt', 'chuyển động mắt'],
            'th': ['การเคลื่อนไหวของตาแบบแซกเคด', 'บริหารสายตา'],
            'ru': ['саккадические движения', 'упражнения для глаз', 'саккады тренировка'],
            'nl': ['saccades training', 'oogoefeningen'],
            'se': ['saccader träning', 'ögonövningar'],
            'us': ['saccadic eye exercises', 'saccadic training', 'saccades exercises', 'saccadic eye movement training'],
            'gb': ['saccadic eye exercises', 'saccadic training', 'saccades exercises'],
        }
    },
    'visual-tracking-speed-test': {
        'display': 'Visual Tracking Speed Test',
        'href': '/drills/reaction-speed/visual-tracking-speed-test',
        'terms': {
            'kr': ['동체시력 테스트', '동체시력', '동체 시력 테스트', '시각 추적 테스트', '동체시력 측정'],
            'jp': ['動体視力テスト', '動体視力', '動体視力測定', '動体視力 トレーニング', '動体視力 鍛える'],
            'de': ['dynamische sehkraft test', 'augenfolgetest', 'visuelles tracking test', 'dynamische sehkraft'],
            'br': ['teste de acuidade visual dinâmica', 'teste de rastreamento visual', 'visao dinamica teste', 'acuidade visual dinamica'],
            'es': ['test de agudeza visual dinámica', 'test de seguimiento visual', 'agudeza visual dinamica'],
            'fr': ['test acuité visuelle dynamique', 'test poursuite visuelle', 'acuite visuelle dynamique'],
            'pl': ['test ostrości dynamicznej', 'test śledzenia wzrokowego', 'widzenie dynamiczne'],
            'it': ['test acuita visiva dinamica', 'test inseguimento visivo'],
            'tr': ['dinamik görme testi', 'göz takip testi'],
            'id': ['tes ketajaman visual dinamis', 'tes pelacakan visual'],
            'vi': ['kiểm tra thị lực động', 'test thị lực động'],
            'th': ['ทดสอบสายตาแบบไดนามิก'],
            'ru': ['тест динамической остроты зрения', 'тест слежения глазами', 'динамическая острота зрения'],
            'nl': ['dynamische gezichtsscherpte test', 'visuele tracking test'],
            'se': ['dynamisk synskärpa test'],
            'us': ['visual tracking test', 'dynamic visual acuity test', 'eye tracking speed test', 'visual tracking speed test'],
            'gb': ['visual tracking test', 'dynamic visual acuity test', 'eye tracking speed test'],
        }
    },
    'reaction-simulator': {
        'display': 'Saccadic Reaction Simulator',
        'href': '/drills/reaction-speed/reaction-simulator',
        'terms': {
            'kr': ['반응 시뮬레이터', '반응속도 시뮬레이터', '반속 시뮬레이터', '순발력 게임', '반응속도 테스트 게임'],
            'jp': ['反応シミュレーター', '反射神経シミュレーター', '反射ゲーム', '反応速度 ゲーム'],
            'de': ['reaktionssimulator', 'reaktionsspiel online', 'reaktionstest simulator', 'reflex simulator'],
            'br': ['simulador de reação', 'simulador de reacao', 'jogo de reflexo online', 'simulador de reflexo'],
            'es': ['simulador de reacción', 'simulador de reaccion', 'juego de reflejos online', 'simulador de reflejos'],
            'fr': ['simulateur de réaction', 'simulateur de reflexe', 'jeu de réflexe en ligne'],
            'pl': ['symulator refleksu', 'gra na czas reakcji', 'symulator czasu reakcji'],
            'it': ['simulatore di reazione', 'gioco di riflessi online'],
            'tr': ['reaksiyon simülatörü', 'refleks simülatörü', 'reaksiyon oyunu'],
            'id': ['simulasi waktu reaksi', 'simulasi refleks', 'game uji refleks'],
            'vi': ['mô phỏng phản xạ', 'game phản xạ online'],
            'th': ['จำลองการตอบสนอง', 'เกมทดสอบปฏิกิริยา'],
            'ru': ['симулятор реакции', 'тренажер реакции', 'игра на реакцию онлайн'],
            'nl': ['reactie simulator', 'reactie game online'],
            'se': ['reaktionssimulator', 'reaktionsspel online'],
            'us': ['reaction simulator', 'reflex simulator', 'reaction speed game', 'reaction simulator game'],
            'gb': ['reaction simulator', 'reflex simulator', 'reaction speed game'],
        }
    },
    'fps-tracking-trainer': {
        'display': 'FPS Tracking Trainer',
        'href': '/drills/reaction-speed/fps-tracking-trainer',
        'terms': {
            'kr': ['fps 트래킹', '에임 트래킹', '발로란트 트래킹', '에임 연습 트래킹', '트래킹 에임 연습'],
            'jp': ['fps トラッキング', 'エイム トラッキング', 'トラッキング 練習', 'apex トラッキング'],
            'de': ['fps tracking trainer', 'aim tracking üben', 'aim tracking kostenlos', 'aim tracking trainer'],
            'br': ['treino de tracking fps', 'tracking mira valorant', 'treinar tracking', 'aim tracking treino'],
            'es': ['entrenar tracking fps', 'tracking valorant', 'entrenamiento tracking', 'aim tracking entrenamiento'],
            'fr': ['entrainement tracking fps', 'tracking aim trainer', 'aim tracking entrainement'],
            'pl': ['trening trackingu fps', 'aim tracking ćwiczenia', 'trening celowania tracking'],
            'it': ['allenamento tracking fps', 'tracking mira', 'aim tracking'],
            'tr': ['fps tracking antrenmanı', 'aim tracking geliştirme', 'tracking aim çalışması'],
            'id': ['latihan tracking fps', 'aim tracking', 'cara melatih tracking fps'],
            'vi': ['luyện tracking fps', 'tập tracking aim', 'tracking fps'],
            'th': ['ฝึก tracking fps', 'aim tracking', 'ฝึกเล็ง tracking'],
            'ru': ['тренировка трекинга аим', 'трекинг в фпс', 'аим трекинг тренировка'],
            'nl': ['fps tracking trainer', 'aim tracking oefenen'],
            'se': ['fps tracking träning', 'aim tracking'],
            'us': ['fps tracking trainer', 'aim tracking trainer', 'fps tracking practice', 'smooth tracking aim trainer'],
            'gb': ['fps tracking trainer', 'aim tracking trainer', 'fps tracking practice'],
        }
    },
    'barrier-sequence-pursuit': {
        'display': 'Barrier Sequence Pursuit',
        'href': '/drills/reaction-speed/barrier-sequence-pursuit',
        'terms': {
            'kr': ['지글픽 연습', '발로란트 지글픽', '지글피킹', '피킹 연습', '발로란트 피킹 연습'],
            'jp': ['ピーク 練習', '飛び出し 練習', 'ジグルピーク', 'valorant ピーク 練習'],
            'de': ['jiggle peek training', 'peeking üben valorant', 'jiggle peek valorant'],
            'br': ['treino de jiggle peek', 'como fazer jiggle peek', 'treinar peek valorant', 'jiggle peek treino'],
            'es': ['entrenar jiggle peek', 'como hacer jiggle peek', 'peek valorant', 'entrenamiento jiggle peek'],
            'fr': ['entrainement jiggle peek', 'apprendre le jiggle peek', 'peek valorant entrainement'],
            'pl': ['trening jiggle peek', 'jak robić jiggle peek', 'jiggle peek ćwiczenia'],
            'it': ['allenamento jiggle peek', 'jiggle peek valorant'],
            'tr': ['jiggle peek antrenmanı', 'peek nasıl yapılır valorant', 'jiggle peek geliştirme'],
            'id': ['latihan jiggle peek', 'cara jiggle peek', 'jiggle peek valorant'],
            'vi': ['tập jiggle peek', 'cách jiggle peek valorant'],
            'th': ['ฝึก jiggle peek', 'jiggle peek valorant'],
            'ru': ['тренировка джигл пик', 'как делать джигл пик', 'jiggle peek валорант'],
            'nl': ['jiggle peek training', 'peeking oefenen'],
            'se': ['jiggle peek träning'],
            'us': ['jiggle peek trainer', 'jiggle peek practice', 'jiggle peek valorant', 'jiggle peeking drill'],
            'gb': ['jiggle peek trainer', 'jiggle peek practice', 'jiggle peek valorant'],
        }
    },
    'market-doors-pursuit': {
        'display': 'Market Doors Pursuit',
        'href': '/drills/reaction-speed/market-doors-pursuit',
        'terms': {
            'kr': ['각쪼개기', '각 쪼개기', '발로란트 각쪼개기', '코너 클리어링', '모퉁이 체크'],
            'jp': ['クリアリング 練習', 'コーナー クリアリング', '角待ち 対策', 'プリエイム 練習'],
            'de': ['corner checking valorant', 'angles clearen', 'corner clearing valorant', 'ecken clearen'],
            'br': ['como limpar pixels valorant', 'limpeza de pixels', 'corner clearing valorant', 'checar esquinas'],
            'es': ['limpiar esquinas valorant', 'limpiar ángulos', 'corner clearing valorant', 'revisar esquinas'],
            'fr': ['corner clearing valorant', 'nettoyer les angles valorant', 'check corners'],
            'pl': ['sprawdzanie rogów valorant', 'czyszczenie kątów valorant', 'corner clearing'],
            'it': ['corner clearing valorant', 'controllo angoli'],
            'tr': ['açı temizleme valorant', 'corner clearing valorant', 'köşe kontrolü'],
            'id': ['corner clearing valorant', 'membersihkan sudut valorant'],
            'vi': ['check góc valorant', 'corner clearing valorant'],
            'th': ['เช็คคอร์เนอร์ valorant', 'corner clearing'],
            'ru': ['чек углов валорант', 'проверка углов кс2', 'как чекать углы в валорант'],
            'nl': ['corner checking valorant', 'hoeken checken valorant'],
            'se': ['corner clearing valorant'],
            'us': ['corner checking trainer', 'corner clearing drill', 'angle clearing trainer', 'slicing the pie drill', 'pre aim practice'],
            'gb': ['corner checking trainer', 'corner clearing drill', 'angle clearing trainer'],
        }
    },
}

def query_volume_with_retry(phrase, country, max_retries=3):
    """Query keyword volume with backoff retry on nulls/errors."""
    c, lang = bing.market(country)
    for attempt in range(max_retries):
        v = bing.keyword_volume(phrase, c, lang)
        if v is not None:
            return v, 'OK'
        # Backoff sleep before retry
        time.sleep(1.0 + attempt * 1.5)
    return {'exact': None, 'broad': None}, 'ERR'

def main():
    print(f"Starting Reaction Speed International SEO Research ({TODAY})...")
    results = []
    
    total_calls = sum(
        len(drill_data['terms'].get(m, []))
        for drill_data in CANDIDATES.values()
        for m in ALL_MARKETS
    )
    print(f"Total candidate phrases to test: {total_calls} across {len(ALL_MARKETS)} markets.")
    
    count = 0
    start_time = time.time()
    
    for drill_key, drill_data in CANDIDATES.items():
        drill_name = drill_data['display']
        drill_href = drill_data['href']
        
        for market_code in ALL_MARKETS:
            phrases = drill_data['terms'].get(market_code, [])
            if not phrases:
                continue
                
            tier = 'Tier A' if market_code in TIER_A else ('Tier B' if market_code in TIER_B else 'Tier C')
            c, lang = bing.market(market_code)
            
            for phrase in phrases:
                count += 1
                vol, status = query_volume_with_retry(phrase, market_code)
                
                exact = vol['exact']
                broad = vol['broad']
                
                # Polite throttle to respect Bing API rate limits
                time.sleep(0.35)
                
                row = {
                    'drill_key': drill_key,
                    'drill_name': drill_name,
                    'drill_href': drill_href,
                    'market': market_code,
                    'tier': tier,
                    'language': lang,
                    'phrase': phrase,
                    'exact_volume': exact if exact is not None else ('ERR' if status == 'ERR' else 0),
                    'broad_volume': broad if broad is not None else ('ERR' if status == 'ERR' else 0),
                    'status': status,
                    'date': TODAY,
                    'source': 'Bing Webmaster API'
                }
                results.append(row)
                
                val_str = str(exact) if exact is not None else status
                if exact and exact >= 100:
                    print(f"[{count}/{total_calls}] [{market_code.upper()}] '{phrase}': exact={val_str} (broad={broad}) *** HIGH DEMAND ***")
                else:
                    print(f"[{count}/{total_calls}] [{market_code.upper()}] '{phrase}': exact={val_str}")

    print(f"\nCompleted {len(results)} queries in {time.time() - start_time:.1f}s.")
    
    # Save to CSV
    fieldnames = [
        'drill_key', 'drill_name', 'drill_href', 'market', 'tier',
        'language', 'phrase', 'exact_volume', 'broad_volume',
        'status', 'date', 'source'
    ]
    with open(CSV_PATH, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(results)
    print(f"Saved CSV output to: {CSV_PATH}")

    # Generate Summary Markdown
    with open(MD_PATH, 'w', encoding='utf-8') as f:
        f.write(f"# Reaction Speed International Demand Research Report\n\n")
        f.write(f"- **Measurement Date:** {TODAY}\n")
        f.write(f"- **Data Source:** Bing Webmaster Tools API (GetKeyword / GetRelatedKeywords)\n")
        f.write(f"- **Scope:** `app/drills/reaction-speed` (8 drills + 1 hub)\n")
        f.write(f"- **Markets Covered:** {len(ALL_MARKETS)} ({', '.join(ALL_MARKETS)})\n\n")
        
        f.write(f"## 1. High-Volume Candidates (Exact Volume >= 100)\n\n")
        f.write(f"| Market | Tier | Drill | Candidate Phrase | Exact Vol | Broad Vol | Status |\n")
        f.write(f"| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n")
        
        sorted_results = sorted(
            [r for r in results if isinstance(r['exact_volume'], int) and r['exact_volume'] >= 100],
            key=lambda x: -x['exact_volume']
        )
        for r in sorted_results:
            f.write(f"| `{r['market']}` | {r['tier']} | {r['drill_name']} | **{r['phrase']}** | {r['exact_volume']:,} | {r['broad_volume']:,} | {r['status']} |\n")
            
        f.write(f"\n\n## 2. Market-by-Market Summary\n\n")
        for m in ALL_MARKETS:
            m_rows = [r for r in results if r['market'] == m]
            f.write(f"### Market `{m.upper()}` ({m_rows[0]['language']} - {m_rows[0]['tier']})\n\n")
            f.write(f"| Drill | Phrase | Exact Vol | Broad Vol | Status |\n")
            f.write(f"| :--- | :--- | :--- | :--- | :--- |\n")
            for r in m_rows:
                ev = f"{r['exact_volume']:,}" if isinstance(r['exact_volume'], int) else str(r['exact_volume'])
                bv = f"{r['broad_volume']:,}" if isinstance(r['broad_volume'], int) else str(r['broad_volume'])
                f.write(f"| {r['drill_name']} | {r['phrase']} | {ev} | {bv} | {r['status']} |\n")
            f.write(f"\n")

    print(f"Saved Markdown report to: {MD_PATH}")

if __name__ == '__main__':
    main()
