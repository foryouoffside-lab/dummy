# Drill #87: Keyboard Tester (Online Key Checker & Hardware Diagnostic)

## 1. Executive Summary & Verification Matrix
- **Drill ID**: `motor/keyboard-tester` (Catalog Drill #87)
- **Category**: Motor Control & Reaction (`motor/`)
- **Supported Locales (7/7)**: `en`, `de`, `ko`, `ja`, `pt`, `es`, `fr`
- **Verification Status**:
  - **Level 1 (AST & Metadata)**: PASS (All titles 30–60c, descriptions 70–160c, 12+ keywords, 10 FAQs, 5-tier benchmarks)
  - **Level 2 (Static Export Build)**: PASS (Next.js build code 0, 635 static routes generated)
  - **Level 3 (HTML Delivery & Schema Audit)**: PASS (All 7 HTML bundles audited: canonicals, alternate hreflangs, 6 JSON-LD schemas, 10 FAQs, 5 benchmark tiers)

---

## 2. Localization & Routing Matrix
| Locale | Route Path | Title Length | Description Length | Keyword Count | FAQ Count | Benchmark Tiers |
|---|---|---|---|---|---|---|
| **EN** | `/drills/motor/keyboard-tester` | 50c | 148c | 12 | 10 | 5 |
| **DE** | `/de/drills/motor/keyboard-tester` | 59c | 143c | 12 | 10 | 5 |
| **KO** | `/ko/drills/motor/keyboard-tester` | 44c | 103c | 15 | 10 | 5 |
| **JA** | `/ja/drills/motor/keyboard-tester` | 47c | 93c | 12 | 10 | 5 |
| **PT** | `/pt/teste-de-teclado` | 53c | 149c | 12 | 10 | 5 |
| **ES** | `/es/drills/motor/keyboard-tester` | 60c | 151c | 12 | 10 | 5 |
| **FR** | `/fr/drills/motor/keyboard-tester` | 56c | 146c | 12 | 10 | 5 |

*Special Note on PT*: Routed via dedicated domestic high-volume slug `/pt/teste-de-teclado` via `LOCALIZED_SLUGS` mapping in `lib/i18n/locales.js`.

---

## 3. Native Search Demand & Keyword Targeting
- **EN**: `keyboard tester`, `test keyboard keys online`, `anti ghosting test`, `key rollover test`, `stuck key checker`
- **DE**: `tastatur test online`, `tastatur tasten testen`, `anti ghosting tastatur test`, `tastatur rollover`, `chattering test`
- **KO**: `키보드 테스트`, `키보드 검사`, `키보드 동시입력 테스트`, `키보드 채터링`, `키 씹힘 테스트`
- **JA**: `キーボードテスト`, `キーボード 動作確認`, `キーボード 同時押し テスト`, `キーボード チャタリング テスト`, `キー反応チェック`
- **PT**: `teste de teclado`, `testar teclado online`, `teste de teclas`, `teclado anti ghosting teste`, `teste de rollover`
- **ES**: `test de teclado`, `probar teclado online`, `test de teclas`, `anti ghosting teclado test`, `test de rollover`
- **FR**: `test clavier`, `tester son clavier en ligne`, `test anti ghosting clavier`, `test rollover clavier`, `touches clavier qui ne marchent pas`

---

## 4. Hardware Diagnostic Benchmark Matrix
- **Tier 1 (Elite Competitive)**: Full NKRO (Magnetic Hall-Effect / Optical), True N-Key (50+ keys), Individual diodes, Under 1.0 ms latency.
- **Tier 2 (High-Performance Mechanical)**: 6KRO / 10KRO Mechanical switches, 6-10 simultaneous keys, Dedicated diodes, 2.0–5.0 ms debounce latency.
- **Tier 3 (Optimized Gaming Matrix)**: Hybrid membrane WASD cluster, 4-6 keys rollover, Cluster anti-ghosting, 8.0–15.0 ms latency.
- **Tier 4 (Standard Office Matrix)**: Basic membrane 2KRO, 2-3 keys rollover, Shared matrix traces, 15.0–30.0 ms latency.
- **Tier 5 (Faulty / Chattering Hardware)**: Contact switch wear/oxidation, Intermittent dropouts, Contact bounce jitter over 35 ms.

---

## 5. Schema.org Implementation
Every locale includes 6 structured JSON-LD data types:
1. `BreadcrumbList` (Clean hierarchy, no nested questions)
2. `WebApplication`
3. `SoftwareApplication`
4. `VideoGame`
5. `HowTo`
6. `FAQPage` (10 bespoke, scientifically and hardware grounded Q&As)
