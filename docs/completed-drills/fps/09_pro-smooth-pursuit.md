# Drill #47: Pro Smooth Pursuit (`fps/pro-smooth-pursuit`)

## 1. Overview
- **Global Drill Number**: #47
- **Category Order**: Drill 9 of 15 in FPS Training (`fps/`)
- **Route**: `/drills/fps/pro-smooth-pursuit`
- **Component**: `ProSmoothPursuitClient.js`
- **Completed Date**: 2026-09-16
- **Locales Covered**: 7 (`en`, `ko`, `ja`, `de`, `pt`, `es`, `fr`) + `x-default` (8 alternates)

---

## 2. Metadata & Search Terms Matrix

| Locale | Character Count (Title / Desc) | Title | Meta Description | Primary Search Query |
| :--- | :--- | :--- | :--- | :--- |
| **EN** | 57c / 142c | Smooth Pursuit Aim Trainer – Curve Tracking \| SkillDrills | Free smooth pursuit aim trainer. Train continuous target tracking and velocity matching against high-mobility targets in Apex and Overwatch 2. | `smooth pursuit aim trainer` |
| **KO** | 41c / 103c | 스무스 트래킹 에임 연습 – 활창 추적 안구 운동 \| SkillDrills | 웹 브라우저에서 무료로 즐기는 스무스 트래킹(활창 추적 안구 운동) 에임 연습. 에이펙스 레전드, 오버워치 2의 유려한 곡선 궤적과 고기동 공중 타겟을 흔들림 없이 매끄럽게 추적하세요. | `스무스 트래킹 에임 연습` |
| **JA** | 38c / 99c | スムーズ トラッキング 練習 – 滑走性眼球運動 \| SkillDrills | ブラウザで無料プレイできるスムーズトラッキング（滑走性眼球運動）エイム練習。Apex LegendsやOverwatch 2の滑らかな曲線軌道や空中ターゲットに照準を吸い付かせ、手の震えを抑えます。 | `スムーズ トラッキング 練習` |
| **DE** | 58c / 154c | Smooth Pursuit Aim Trainer – Kurven-Tracking \| SkillDrills | Kostenloser Smooth Pursuit Aim Trainer. Trainiere kontinuierliches Kurven-Tracking und flüssige Mausführung für High-TTK-Shooter wie Apex und Overwatch 2. | `Smooth Pursuit Aim Trainer` |
| **PT** | 54c / 142c | Treino de Tracking Suave – Mira em Curva \| SkillDrills | Treine tracking suave e rastreamento em curva no navegador. Domine a mira contínua sem tremores para Apex Legends e Overwatch 2 gratuitamente. | `treino de tracking suave fps` |
| **ES** | 53c / 142c | Tracking Suave de Puntería – Curvas FPS \| SkillDrills | Entrena el tracking suave y seguimiento en curva en tu navegador. Domina la puntería continua y fluida para Apex Legends y Overwatch 2 gratis. | `entrenamiento de tracking suave` |
| **FR** | 54c / 138c | Tracking Fluide FPS – Visée en Poursuite \| SkillDrills | Entraînez le tracking fluide et le suivi de trajectoire en courbe. Maîtrisez la visée continue sans tremblements pour Apex et Overwatch 2. | `entraînement tracking fluide fps` |

---

## 3. SEO & Structural Rigor Checklist
- [x] **Title <= 60 Chars**: All 7 titles strictly bounded (<= 58 chars), front-loading primary keywords, terminating in ` | SkillDrills`.
- [x] **Description <= 155 Chars**: All 7 descriptions between 99c and 154c (accounting for HTML entity expansions).
- [x] **Keywords Array**: Exactly 12 native keywords per locale with 0 English leaks in non-English locales.
- [x] **Reciprocal Hreflangs**: All 8 alternates (`en`, `ko`, `ja`, `de`, `pt`, `es`, `fr`, `x-default`) registered in `lib/i18n/locales.js` and rendered in static HTML.
- [x] **6 Schema.org Blocks**: `BreadcrumbList`, `SoftwareApplication`, `WebApplication`, `VideoGame`, `FAQPage` (10 FAQs), `HowTo` (4 steps).
- [x] **Scientific Foundations**: Citing Krauzlis (2004) recurrent neural networks for smooth pursuit, Lisberger et al. (1987) MT/V5 visual motion processing, Barnes (2008) predictive visual pursuit, Fitts (1954), and Woods et al. (2015).
- [x] **Benchmark Table**: Standard 5-tier scientific tracking uptime benchmark table (`85% – 95%+` to `< 42%`).
- [x] **10 Bespoke FAQs per Locale**: 10 authentic, distinct, scientifically validated FAQs per page.
- [x] **Client Component Copy**: Localized HUD captions, stats, rules, and about modal texts passed directly to `ProSmoothPursuitClient`.

---

## 4. Verification Logs
- **Level 1 (AST Verification)**: PASSED across all 7 locales.
- **Level 2 (Production Build)**: PASSED with Exit Code 0 (580 static routes generated).
- **Level 3 (Static HTML Audit)**: PASSED with 100% attribute match across canonical, hreflang, JSON-LD schemas, and benchmark table.
