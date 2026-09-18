# Drill #50 (FPS Drill 12): Target Acquisition Aim Trainer (`fps/target-acquisition`)

## 1. Overview & Verification Status
- **Slug**: `fps/target-acquisition`
- **Category**: FPS Training (`fps`)
- **Status**: **100% COMPLETE & VERIFIED**
- **Date Completed**: 2026-09-16
- **Target Locales**: `en`, `ko`, `ja`, `de`, `pt`, `es`, `fr`
- **Bidirectional Alternates**: 8 routes registered (`en`, `de`, `ko`, `ja`, `pt`, `es`, `fr`, `x-default`) in `lib/i18n/locales.js`
- **Level 1 AST Audit**: PASS (all 7 locales)
- **Level 2 Production Build**: PASS (Next.js prerendered all static routes with Exit Code 0)
- **Level 3 Static HTML Audit**: PASS (all 7 static HTML files validated for canonicals, hreflang, schemas, benchmarks)

---

## 2. Localized Search Terms & Metadata Specifications

| Locale | Native Primary Keyword | Page Title (<=60 chars) | Rendered Title Length | Description (<=155 chars) | Rendered Desc Length | Keywords Count | Leaks |
|---|---|---|---|---|---|---|---|
| **EN** | `target acquisition aim trainer` | Target Acquisition Aim Trainer – Precision \| SkillDrills | 56c | Free target acquisition aim trainer. Train visual target detection, threat discrimination and first-shot flick accuracy under time pressure. | 140c | 12 | 0 |
| **KO** | `타겟 획득 에임` | 타겟 획득 에임 연습 – 초탄 정확도 트레이너 \| SkillDrills | 39c | 무료 브라우저 타겟 획득 에임 트레이너. 시야 내 위협 대상을 즉각 식별하고, 목표 구별 능력 및 긴장감 속에서의 초탄 플릭 정확도를 과학적으로 향상시킵니다. | 88c | 12 | 0 |
| **JA** | `ターゲット捕捉 エイム` | ターゲット捕捉 エイム練習 – 初弾精度トレーナー \| SkillDrills | 39c | ブラウザで無料プレイできるターゲット捕捉エイム練習。視覚的な敵識別スピード、脅威判別、プレッシャー下での初弾フリック精度を科学的に強化します。 | 71c | 12 | 0 |
| **DE** | `Zielerfassung FPS Training` | Zielerfassung FPS Training – First Shot Aim \| SkillDrills | 57c | Kostenloses Zielerfassungs-Training im Browser: Trainiere visuelle Zielerkennung, Kontrastunterscheidung und präzise erste Schüsse für CS2 und Valorant. | 152c | 12 | 0 |
| **PT** | `treino de aquisicao de alvos` | Treino de Aquisição de Alvos – Primeiro Tiro \| SkillDrills | 58c | Treine aquisição de alvos, velocidade de detecção visual e precisão do primeiro tiro no navegador. Domine o primeiro disparo para CS2 e Valorant grátis. | 152c | 12 | 0 |
| **ES** | `entrenamiento de adquisicion de blancos` | Adquisición de Objetivos FPS – Primer Disparo \| SkillDrills | 59c | Entrena adquisición de objetivos, detección visual y precisión del primer tiro en el navegador. Domina el primer disparo para CS2 y Valorant gratis. | 148c | 12 | 0 |
| **FR** | `acquisition de cibles fps` | Acquisition de Cibles FPS – Premier Tir \| SkillDrills | 53c | Entraînez l'acquisition de cibles, la détection visuelle et la précision du premier tir. Maîtrisez le premier coup pour CS2 et Valorant gratuitement. | 154c | 12 | 0 |

---

## 3. Structured Data Schemas & Content Verification
- **Schemas Implemented Across All 7 Locales (6 Blocks)**:
  1. `BreadcrumbList`
  2. `WebApplication`
  3. `SoftwareApplication`
  4. `VideoGame`
  5. `FAQPage` (10 bespoke, scientifically grounded FAQs per locale)
  6. `HowTo` (4 actionable training calibration steps)
- **Scientific Benchmark Table**: 5 tiers (Apex Sentinel / Radiant Pro down to Developing / Novice) with Acquisition Latency, First-Shot Accuracy, and In-Game Implications citing Treisman & Gelade (1980), Wolfe (1994, 2007), Fitts (1954), Meyer et al. (1988), and Woods et al. (2015).
- **Client Component Localization**: Full `copy` object provided to `TargetAcquisitionClient` covering HUD stats, pause modals, start screens, rules, and about cards.
