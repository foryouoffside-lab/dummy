# Drill #51 (FPS Drill 13): Target Prioritization Aim Trainer (`fps/target-prioritization`)

## 1. Overview & Verification Status
- **Slug**: `fps/target-prioritization`
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
| **EN** | `target prioritization aim trainer` | Target Prioritization Aim Trainer – Threat Aim \| SkillDrills | 60c | Free target prioritization aim trainer. Train threat evaluation, attention filtering and shot inhibition against mixed friendly and enemy targets. | 146c | 12 | 0 |
| **KO** | `타겟 우선순위 에임` | 타겟 우선순위 에임 연습 – 위협 평가 트레이너 \| SkillDrills | 40c | 무료 브라우저 타겟 우선순위 에임 트레이너. 다중 목표 교전 상황에서의 위협 평가, 시각적 주의 필터링, 아군 오사 방지를 위한 반응 억제(Go/No-Go)를 과학적으로 훈련합니다. | 101c | 12 | 0 |
| **JA** | `ターゲット優先度 エイム` | ターゲット優先度 エイム練習 – 脅威度判定トレーナー \| SkillDrills | 41c | ブラウザで無料プレイできるターゲット優先度エイム練習。マルチターゲット交戦における脅威評価、注意フィルタリング、味方誤射の抑制制御（Go/No-Go）を科学的に鍛えます。 | 85c | 12 | 0 |
| **DE** | `Zielpriorisierung FPS` | Zielpriorisierung FPS Training – Aim Trainer \| SkillDrills | 58c | Kostenloses Zielpriorisierungs-Training im Browser: Trainiere Bedrohungseinschätzung, Trigger-Disziplin und Schusshemmung für CS2 und Valorant. | 143c | 12 | 0 |
| **PT** | `treino de priorizacao de alvos` | Treino de Priorização de Alvos – Mira FPS \| SkillDrills | 55c | Treine priorização de alvos, avaliação de ameaças e disciplina de gatilho no navegador. Domine a mira decisiva para Valorant e CS2 gratuitamente. | 145c | 12 | 0 |
| **ES** | `entrenamiento de priorizacion de objetivos` | Priorización de Objetivos FPS – Mira Táctica \| SkillDrills | 58c | Entrena priorización de objetivos, evaluación de amenazas y disciplina de gatillo en el navegador. Domina la toma de decisiones para Valorant y CS2 gratis. | 155c | 12 | 0 |
| **FR** | `priorisation des cibles fps` | Priorisation des Cibles FPS – Visée Décisive \| SkillDrills | 58c | Entraînez la priorisation des cibles, l'analyse des menaces et la discipline de tir. Maîtrisez la décision tactique pour Valorant et CS2. | 142c | 12 | 0 |

---

## 3. Structured Data Schemas & Content Verification
- **Schemas Implemented Across All 7 Locales (6 Blocks)**:
  1. `BreadcrumbList`
  2. `WebApplication`
  3. `SoftwareApplication`
  4. `VideoGame`
  5. `FAQPage` (10 bespoke, scientifically grounded FAQs per locale)
  6. `HowTo` (4 actionable training calibration steps)
- **Scientific Benchmark Table**: 5 tiers (Apex Commander / Radiant down to Developing / Panic Firing) with Resolution Latency, Priority Accuracy, and In-Game Implications citing Logan & Cowan (1984), Donders (1868/1969), Treisman & Gelade (1980), Posner (1990), Green & Bavelier (2003), and Woods et al. (2015).
- **Client Component Localization**: Full `copy` object provided to `TargetPrioritizationClient` covering HUD stats, pause modals, start screens, rules, and about cards.
