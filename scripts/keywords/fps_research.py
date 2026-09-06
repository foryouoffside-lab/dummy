#!/usr/bin/env python3
"""
Deep Research Keyword & Demand Collector for fps category.
Measures Bing Webmaster Tools keyword volumes across Tier A (kr, jp, de, br, es),
Tier B (pl, tr, fr, id, vi, th, ru), and Tier C controls (us, gb).

Features:
- Auto-handles ThrottleUser / rate limits with adaptive sleep and retries.
- Checkpoints progress to a local JSON so execution can safely resume.
- Tests diacritics and English loanwords.
- Generates raw CSV and formatted Markdown report in scripts/keywords/out/.
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

CSV_PATH = os.path.join(OUT_DIR, f'fps-intl-{TODAY}.csv')
MD_PATH = os.path.join(OUT_DIR, f'fps-intl-{TODAY}.md')
CHECKPOINT_PATH = os.path.join(OUT_DIR, f'fps-checkpoint-{TODAY}.json')

# Full candidate dictionary for hub and all 15 drills
CANDIDATES = {
    'hub': {
        'display': 'FPS Hub',
        'href': '/drills/fps',
        'terms': {
            'us': ['aim trainer', 'fps aim trainer', 'aim practice', 'aim training games', 'fps practice', 'valorant aim trainer'],
            'gb': ['aim trainer', 'fps aim trainer', 'aim training'],
            'kr': ['에임 연습', '에임 훈련', '발로란트 에임 연습', '에임 연습 게임', 'fps 에임', '에임 트레이너', 'aim trainer'],
            'jp': ['エイム練習', 'エイム練習サイト', 'エイム練習 ブラウザ', 'バロラント エイム練習', 'エイム練習 無料', 'fps エイム練習', 'aim trainer'],
            'de': ['aim trainer', 'aim training kostenlos', 'zielübung', 'aim training browser', 'fps training kostenlos'],
            'br': ['treino de mira', 'treinador de mira', 'mira valorant', 'treinar mira valorant', 'treino de mira gratis', 'aim trainer'],
            'es': ['entrenar puntería', 'entrenar punteria', 'mejorar puntería valorant', 'mejorar punteria valorant', 'entrenamiento de puntería', 'entrenamiento de punteria', 'aim trainer'],
            'pl': ['trening celowania', 'aim trainer pl', 'trening aima', 'cwiczenie celowania', 'ćwiczenie celowania', 'aim trainer'],
            'tr': ['aim geliştirme', 'nişan alma antrenmanı', 'aim antrenmanı', 'valorant aim geliştirme', 'aim trainer'],
            'fr': ['entraînement visée', 'entrainement visee', 'aim trainer francais', 'ameliorer sa visee', 'améliorer sa visée', 'aim trainer'],
            'id': ['latihan aim', 'latihan aim valorant', 'cara melatih aim', 'aim trainer'],
            'vi': ['luyện aim', 'luyen aim', 'tap aim valorant', 'tập aim valorant', 'aim trainer'],
            'th': ['ฝึก aim', 'ซ้อม aim', 'ฝึกยิง valorant', 'aim trainer'],
            'ru': ['тренировка аима', 'тренировка прицела', 'аим тренер', 'тренировка аима онлайн', 'aim trainer'],
        }
    },
    'flick-shot-training': {
        'display': 'Flick Shot Training',
        'href': '/drills/fps/flick-shot-training',
        'terms': {
            'us': ['flick shot trainer', 'flick shot training', 'flick aim trainer', 'flick practice', 'aim flick trainer'],
            'gb': ['flick shot trainer', 'flick aim trainer'],
            'kr': ['플릭 에임', '플릭샷 연습', '끌어치기 연습', '끌어치기 훈련', '플릭 에임 연습'],
            'jp': ['フリック エイム', 'フリックエイム練習', 'フリック練習', 'フリックショット', 'フリック エイム練習'],
            'de': ['flick shot training', 'flick aim trainer', 'flicks üben'],
            'br': ['treino de flick', 'treinar flick', 'flick shot treino'],
            'es': ['entrenar flick', 'flick shot entrenamiento', 'tiro rapido entrenamiento'],
            'pl': ['trening flicków', 'trening flickow'],
            'ru': ['тренировка фликов', 'фликшот тренировка', 'тренировка фликшотов'],
        }
    },
    'strafe-tracking': {
        'display': 'Strafe Tracking Aim Trainer',
        'href': '/drills/fps/strafe-tracking',
        'terms': {
            'us': ['strafe tracking aim trainer', 'strafe tracking', 'tracking aim trainer', 'aim tracking trainer', 'fps tracking practice'],
            'gb': ['strafe tracking', 'tracking aim trainer'],
            'kr': ['트래킹 에임', '따라가기 에임', '트래킹 에임 연습', '에임 트래킹', '트래킹 훈련'],
            'jp': ['トラッキング エイム', '追いエイム練習', 'トラッキング練習', '追いエイム', 'トラッキング エイム練習'],
            'de': ['tracking aim trainer', 'aim tracking übung', 'tracking training fps'],
            'br': ['treino de tracking', 'treinar tracking mira', 'tracking mira valorant'],
            'es': ['entrenar tracking', 'tracking punteria', 'tracking puntería', 'entrenamiento de tracking'],
            'ru': ['тренировка трекинга', 'аим трекинг'],
        }
    },
    'recoil-control': {
        'display': 'Recoil Control Trainer',
        'href': '/drills/fps/recoil-control',
        'terms': {
            'us': ['recoil control trainer', 'spray control practice', 'recoil pattern practice', 'cs2 recoil practice', 'cs2 spray control'],
            'gb': ['recoil control trainer', 'spray control trainer'],
            'kr': ['반동 제어 연습', '스프레이 제어', '탄착군 제어', '배그 반동 연습', '서든 반동 제어'],
            'jp': ['リコイル制御 練習', 'リコイル コントロール', '反動制御 練習', 'スプレー制御', 'リコイル練習'],
            'de': ['recoil control training', 'spray control cs2', 'rückstoßkontrolle üben'],
            'br': ['controle de recoil', 'treino de spray', 'treinar recoil cs2'],
            'es': ['control de retroceso', 'control de spray', 'retroceso cs2'],
            'ru': ['контроль отдачи', 'тренировка зажима', 'контроль отдачи кс2'],
        }
    },
    'angle-hold-trainer': {
        'display': 'Crosshair Placement Trainer',
        'href': '/drills/fps/angle-hold-trainer',
        'terms': {
            'us': ['crosshair placement trainer', 'crosshair placement practice', 'angle hold trainer', 'pre aim practice'],
            'kr': ['크로스헤어 배치', '프리에임 연습', '대기 에임', '헤드라인 에임'],
            'jp': ['プリエイム練習', 'クロスヘアプレイスメント', '置きエイム練習', '置きエイム'],
            'de': ['crosshair placement training', 'fadenkreuz platzierung'],
            'br': ['posicionamento de mira', 'treino de pre aim', 'mira na cabeca'],
            'es': ['colocacion de mira', 'colocación de mira', 'pre aim entrenamiento'],
            'ru': ['постановка прицела', 'преаим тренировка'],
        }
    },
    '180-degree-awareness': {
        'display': '180 Snap Turn Aim Trainer',
        'href': '/drills/fps/180-degree-awareness',
        'terms': {
            'us': ['180 aim trainer', '180 turn aim trainer', '180 flick training', 'snap turn practice'],
            'kr': ['뒤돌기 에임', '180도 에임', '화면 전환 에임'],
            'jp': ['振り向き エイム', '180度 エイム', '振り向き練習'],
            'de': ['180 grad aim training', 'snap turn aim'],
        }
    },
    'anti-strafe-jitter-duel': {
        'display': 'Jitter Aim Trainer',
        'href': '/drills/fps/anti-strafe-jitter-duel',
        'terms': {
            'us': ['jitter aim trainer', 'jitter aim practice', 'adad strafe practice', 'reactive tracking trainer'],
            'kr': ['무빙 에임 연습', '지터 에임', '와리가리 에임'],
            'jp': ['ジッターエイム', 'ジッター エイム 練習', 'レレレ撃ち 対策'],
        }
    },
    'anti-zigzag-movement-trainer': {
        'display': 'Anti-Zigzag Aim Trainer',
        'href': '/drills/fps/anti-zigzag-movement-trainer',
        'terms': {
            'us': ['anti-zigzag aim trainer', 'evasive strafe tracking', 'strafe prediction aim'],
            'kr': ['지그재그 무빙 에임', '무빙 예측 에임'],
            'jp': ['ジグザグ移動 エイム', '回避ステップ エイム'],
        }
    },
    'micro-correction-precision': {
        'display': 'Micro-Correction Aim Trainer',
        'href': '/drills/fps/micro-correction-precision',
        'terms': {
            'us': ['micro-correction aim trainer', 'micro flick trainer', 'micro aim practice', 'precision micro adjustment'],
            'kr': ['미세 에임', '마이크로 플릭', '미세 조정 에임'],
            'jp': ['微調整 エイム', 'マイクロフリック', '精密エイム練習'],
        }
    },
    'pro-smooth-pursuit': {
        'display': 'Smooth Pursuit Aim Trainer',
        'href': '/drills/fps/pro-smooth-pursuit',
        'terms': {
            'us': ['smooth pursuit aim trainer', 'smooth tracking aim', 'continuous tracking practice'],
            'kr': ['부드러운 트래킹', '스무스 에임'],
            'jp': ['スムーズ トラッキング', '滑らかな追いエイム'],
        }
    },
    'target-acquisition': {
        'display': 'Target Acquisition Trainer',
        'href': '/drills/fps/target-acquisition',
        'terms': {
            'us': ['target acquisition trainer', 'fast target acquisition', 'rapid target acquisition'],
            'kr': ['목표물 포착 훈련', '타겟 포착'],
            'jp': ['ターゲット捕捉 練習', '標的捕捉 訓練'],
        }
    },
    'target-prioritization': {
        'display': 'Target Prioritization Trainer',
        'href': '/drills/fps/target-prioritization',
        'terms': {
            'us': ['target prioritization trainer', 'priority target aim', 'target priority training'],
            'kr': ['타겟 우선순위 훈련'],
            'jp': ['ターゲット優先順位', '優先標的 エイム'],
        }
    },
    'target-switching-swarm': {
        'display': 'Target Switching Trainer',
        'href': '/drills/fps/target-switching-swarm',
        'terms': {
            'us': ['target switching trainer', 'target switching aim', 'rapid target switching'],
            'kr': ['타겟 전환 에임', '타겟 스위칭 훈련'],
            'jp': ['ターゲットスイッチング', '標的切り替え エイム'],
        }
    },
    'vertical-air-track': {
        'display': 'Vertical Aim Trainer',
        'href': '/drills/fps/vertical-air-track',
        'terms': {
            'us': ['vertical aim trainer', 'vertical tracking practice', 'vertical aim practice'],
            'kr': ['수직 에임 연습', '상하 트래킹 에임'],
            'jp': ['上下エイム 練習', '垂直トラッキング'],
        }
    },
    'flow-state': {
        'display': 'Aim Flow State Trainer',
        'href': '/drills/fps/flow-state',
        'terms': {
            'us': ['aim flow state trainer', 'warm up aim trainer', 'aim routine training'],
            'kr': ['에임 웜업', '에임 손풀기', '에임 루틴'],
            'jp': ['エイム ウォーミングアップ', 'エイム ルーティン'],
        }
    },
    'instant-response': {
        'display': 'FPS Reaction Time Test',
        'href': '/drills/fps/instant-response',
        'terms': {
            'us': ['fps reaction time test', 'fps reaction speed', 'trigger reaction test'],
            'kr': ['fps 반응속도', '배틀그라운드 반응속도', '발로란트 반응속도'],
            'jp': ['fps 反応速度', 'fps 反応テスト', '射撃 反応速度'],
        }
    }
}

def load_checkpoint():
    if os.path.exists(CHECKPOINT_PATH):
        try:
            with open(CHECKPOINT_PATH, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception:
            return {}
    return {}

def save_checkpoint(data):
    try:
        with open(CHECKPOINT_PATH, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"Warning: Failed to save checkpoint: {e}", flush=True)

def measure_phrase_with_throttle_guard(phrase, country, max_retries=5):
    """
    Call Bing GetKeyword API. Handles ThrottleUser automatically by waiting.
    Returns: (exact, broad, status)
    status: 'OK', 'NO_DATA', 'ERR'
    """
    c, lang = bing.market(country)
    backoffs = [2, 5, 10, 20, 40]
    
    for attempt in range(max_retries):
        try:
            start, end = bing.month_range()
            r = bing.call("GetKeyword", {
                "q": phrase, "country": c, "language": lang,
                "startDate": start, "endDate": end
            })
            if "__error" in r:
                err_body = r.get("body", "")
                if "ThrottleUser" in err_body:
                    sleep_sec = backoffs[min(attempt, len(backoffs) - 1)]
                    print(f" [ThrottleUser hit on '{phrase}' ({c}). Sleeping {sleep_sec}s...]", end="", flush=True)
                    time.sleep(sleep_sec)
                    continue
                else:
                    time.sleep(1.5)
                    continue
            d = r.get("d")
            if d is None:
                return (0, 0, 'NO_DATA')
            exact = d.get("Impressions", 0)
            broad = d.get("BroadImpressions", 0)
            return (exact, broad, 'OK')
        except Exception as e:
            time.sleep(2)
            continue
    return (None, None, 'ERR')

def main():
    print("=" * 70, flush=True)
    print("FPS CATEGORY INTERNATIONAL KEYWORD RESEARCH", flush=True)
    print(f"Date: {TODAY} | Tool: Bing Webmaster Keyword API", flush=True)
    print("=" * 70, flush=True)

    checkpoint = load_checkpoint()

    # Step 1: Calibration Control (US aim trainer)
    print("\n[Step 1] Running Calibration Control: 'aim trainer' [US]...", flush=True)
    ctrl_key = "calibration::us::aim trainer"
    if ctrl_key in checkpoint and checkpoint[ctrl_key]['status'] == 'OK':
        ctrl_exact = checkpoint[ctrl_key]['exact']
        ctrl_broad = checkpoint[ctrl_key]['broad']
        ctrl_status = checkpoint[ctrl_key]['status']
    else:
        ctrl_exact, ctrl_broad, ctrl_status = measure_phrase_with_throttle_guard('aim trainer', 'us', max_retries=6)
        if ctrl_status == 'OK':
            checkpoint[ctrl_key] = {'exact': ctrl_exact, 'broad': ctrl_broad, 'status': ctrl_status}
            save_checkpoint(checkpoint)
    
    print(f"Calibration Result: Exact={ctrl_exact}, Broad={ctrl_broad}, Status={ctrl_status}", flush=True)
    if ctrl_status == 'ERR':
        print("CRITICAL: Calibration failed with ERR (API throttled or unavailable). Please wait for throttle window to clear.", flush=True)
        # Note: we do NOT exit abruptly, we report honestly.
    
    # Step 2: Query execution
    results = []
    total_queries = sum(len(terms) for drill in CANDIDATES.values() for terms in drill['terms'].values())
    print(f"\n[Step 2] Executing {total_queries} queries across 16 entities (1 hub + 15 drills)...", flush=True)
    
    count = 0
    for drill_id, drill_meta in CANDIDATES.items():
        disp = drill_meta['display']
        href = drill_meta['href']
        for country, phrases in drill_meta['terms'].items():
            for phrase in phrases:
                count += 1
                ckey = f"{drill_id}::{country}::{phrase}"
                if ckey in checkpoint and checkpoint[ckey]['status'] in ('OK', 'NO_DATA'):
                    item = checkpoint[ckey]
                    exact, broad, status = item['exact'], item['broad'], item['status']
                else:
                    exact, broad, status = measure_phrase_with_throttle_guard(phrase, country)
                    checkpoint[ckey] = {'exact': exact, 'broad': broad, 'status': status}
                    save_checkpoint(checkpoint)
                    time.sleep(1.2) # Friendly delay to stay under Bing per-minute rate limits
                
                print(f"[{count:3}/{total_queries}] {drill_id:25} [{country:2}] {phrase:35} -> exact: {str(exact):>6} | broad: {str(broad):>6} | {status}", flush=True)
                results.append({
                    'drill_id': drill_id,
                    'drill_name': disp,
                    'href': href,
                    'market': country,
                    'phrase': phrase,
                    'exact': exact,
                    'broad': broad,
                    'status': status,
                    'tool': 'Bing Webmaster API',
                    'date': TODAY
                })

    # Step 3: Write CSV
    print(f"\n[Step 3] Writing results to {CSV_PATH}...", flush=True)
    with open(CSV_PATH, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['Drill ID', 'Drill Name', 'Route', 'Market', 'Phrase', 'Exact Volume', 'Broad Volume', 'Status', 'Tool', 'Date'])
        for r in results:
            writer.writerow([
                r['drill_id'], r['drill_name'], r['href'], r['market'], r['phrase'],
                'ERR' if r['status'] == 'ERR' else r['exact'],
                'ERR' if r['status'] == 'ERR' else r['broad'],
                r['status'], r['tool'], r['date']
            ])

    # Step 4: Write Markdown
    print(f"[Step 4] Writing formatted markdown report to {MD_PATH}...", flush=True)
    with open(MD_PATH, 'w', encoding='utf-8') as f:
        f.write(f"# FPS Category International Keyword Research Report\n\n")
        f.write(f"- **Date:** {TODAY}\n")
        f.write(f"- **Tool:** Bing Webmaster Tools API\n")
        f.write(f"- **Calibration Control (US 'aim trainer'):** Exact={ctrl_exact}, Broad={ctrl_broad}, Status={ctrl_status} (Historical baseline ~9,821)\n\n")
        f.write(f"## High-Demand / Qualified Keywords (Exact >= 150)\n\n")
        f.write(f"| Drill | Market | Phrase | Exact Volume | Broad Volume | Status |\n")
        f.write(f"|---|---|---|---:|---:|:---:|\n")
        high_vol = [r for r in results if r['status'] == 'OK' and r['exact'] and r['exact'] >= 150]
        high_vol.sort(key=lambda x: -(x['exact'] or 0))
        for r in high_vol:
            f.write(f"| {r['drill_name']} | `{r['market']}` | `{r['phrase']}` | {r['exact']} | {r['broad']} | {r['status']} |\n")
        if not high_vol:
            f.write(f"| *None* | - | - | - | - | - |\n")

        f.write(f"\n## All Measured Phrases by Drill\n\n")
        f.write(f"| Drill | Route | Market | Phrase | Exact | Broad | Status |\n")
        f.write(f"|---|---|---|---|---:|---:|:---:|\n")
        for r in results:
            ex_str = 'ERR' if r['status'] == 'ERR' else str(r['exact'])
            br_str = 'ERR' if r['status'] == 'ERR' else str(r['broad'])
            f.write(f"| {r['drill_name']} | `{r['href']}` | `{r['market']}` | `{r['phrase']}` | {ex_str} | {br_str} | {r['status']} |\n")

    print(f"Research complete. CSV: {CSV_PATH} | MD: {MD_PATH}", flush=True)

if __name__ == '__main__':
    main()
