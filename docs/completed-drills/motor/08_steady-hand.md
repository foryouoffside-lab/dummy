# Drill #91: Steady Hand Game (`motor/precision-control/steady-hand`)

## 1. Overview & Architecture
- **Canonical Slug**: `drills/motor/precision-control/steady-hand`
- **Category**: Motor Control (`motor/precision-control`)
- **Supported Locales**: English (`en`), Japanese (`ja`), German (`de`), Korean (`ko`), Portuguese (`pt`), Spanish (`es`), French (`fr`).
- **Locale Map Configuration**: `lib/i18n/locales.js` line 171 configured with all 6 target locales: `['ja', 'ko', 'de', 'pt', 'es', 'fr']`.
- **Client Component**: `SteadyHandClient` fully internationalized with bespoke in-game `copy` prop (`copy={localeCopy}`) covering game canvas HUD, timer, rules, about section, grade labels, and native share text.

## 2. Native Search Query Research & Transcreation
- Strictly ZERO direct translation; built around authentic country-specific search queries:
  - **English (`en`)**: *steady hand game, steady hand test, mouse path tracing, hand steadiness test, mouse precision test, cursor control test, fine motor control test mouse, Accot-Zhai Steering Law* (12 keywords)
  - **Japanese (`ja`)**: *イライラ棒, イライラ棒 ゲーム, イライラ棒 ゲーム 無料, イライラ棒 ゲーム ブラウザ, 電撃イライラ棒 ゲーム, マウス 精度 テスト, 手ぶれ 測定, ステアリングの法則* (12 keywords)
  - **German (`de`)**: *Heißer Draht Online, Heißer Draht Spiel, Ruhige Hand Spiel, Maus Präzisionstest, Handzittern Test Online, Feinmotorik Test Maus, Mausführung trainieren, Accot-Zhai Steuerungsgesetz* (12 keywords)
  - **Korean (`ko`)**: *전기충격 미로게임, 손떨림 테스트, 마우스 정밀도 테스트, 마우스 컨트롤 연습, 에임 안정성 테스트, 마우스 미로 통과 게임, 손떨림 측정, 스티어링 법칙* (12 keywords)
  - **Portuguese (`pt`)**: *jogo da mão firme, teste da mão firme, jogo do arame elétrico, teste de precisão do mouse, teste de tremor nas mãos online, coordenação motora fina mouse, lei de direção de accot-zhai* (12 keywords)
  - **Spanish (`es`)**: *juego del pulso, test de pulso online, prueba de pulso ratón, juego del alambre eléctrico, precisión de ratón test, test de temblor de manos online, control motor fino ratón, ley de dirección de accot-zhai* (12 keywords)
  - **French (`fr`)**: *jeu du fil électrique, jeu de la main ferme, test de précision souris, test de tremblement main en ligne, contrôle moteur fin souris, parcours souris précision, loi de direction d accot-zhai* (12 keywords)

## 3. Scientific Grounding & Deep Content
- **Theoretical Models**: Accot-Zhai Steering Law (Accot & Zhai, 1997), Robert S. Woodworth's Two-Component Model of Aimed Movements (1899), Fitts's Law (Fitts, 1954), and Display Latency Quantization (Woods et al., 2015).
- **5-Tier Benchmarks**: Multi-tier benchmark tables calibrated across cleared levels (Level 12+ down to Level 1-2), channel widths (12 px to 50 px), mean deviation, and qualitative editorial bands.
- **4 Protocols**: Accot-Zhai speed regulation pacing, Woodworth feedforward gaze tracking, physiological tremor attenuation (8-12 Hz) & joint decoupling, and corner apex navigation.
- **10 Bespoke FAQs per Locale**: 10 distinct, scientifically grounded questions answering motor control mechanics, hardware limits, grip styles, DPI scaling, and clinical/esports applications.
- **All 6 Schema.org JSON-LD Schemas**: `BreadcrumbList`, `SoftwareApplication`, `WebApplication`, `VideoGame`, `FAQPage`, `HowTo`.

## 4. Multi-Tier Verification Results
- **Level 1 (Babel AST Validation)**: PASSED (0 JSX syntax errors across all 7 bundles).
- **Level 2 (Next.js Production Build)**: PASSED (`npm run build`, exit code 0).
- **Level 3 (HTML Delivery Audit)**: PASSED (100% compliant across titles, descriptions, canonicals, bidirectional hreflang alternates, JSON-LD schemas, benchmarks, and FAQ elements).
