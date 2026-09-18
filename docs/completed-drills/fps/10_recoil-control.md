# Drill #48: Recoil Control (`fps/recoil-control`)

## 1. Overview
- **Global Drill Number**: #48
- **Category Order**: Drill 10 of 15 in FPS Training (`fps/`)
- **Route**: `/drills/fps/recoil-control`
- **Component**: `RecoilControlClient.js`
- **Completed Date**: 2026-09-16
- **Locales Covered**: 7 (`en`, `ko`, `ja`, `de`, `pt`, `es`, `fr`) + `x-default` (8 alternates)

---

## 2. Metadata & Search Terms Matrix

| Locale | Character Count (Title / Desc) | Title | Meta Description | Primary Search Query |
| :--- | :--- | :--- | :--- | :--- |
| **EN** | 53c / 144c | Recoil Control Trainer – Spray Practice \| SkillDrills | Master weapon spray patterns, vertical mouse pull-down velocity, and horizontal recoil compensation for tactical shooters like CS2 and Valorant. | `recoil control trainer` |
| **KO** | 41c / 114c | 반동 제어 연습 – FPS 스프레이 조절 트레이너 \| SkillDrills | 무료 브라우저 FPS 반동 제어(Recoil Control) 및 스프레이 조절 훈련. 수직 마우스 드래그 속도와 총기별 스프레이 패턴 보정 능력을 단련하여 배그, 발로란트, CS2의 집탄율을 극대화하세요. | `반동 제어 연습` |
| **JA** | 37c / 102c | リコイル練習 – FPS反動制御・スプレー練習 \| SkillDrills | 無料のブラウザFPSリコイル練習ツール。マウスの垂直引き下げ速度やS字スプレーパターンの反動制御、初弾10発の集弾率を測定・強化。Apex Legends、VALORANT、CS2のウォームアップに最適。 | `リコイル練習` |
| **DE** | 59c / 153c | Recoil Control lernen – FPS Rückstoßkontrolle \| SkillDrills | Kostenloses Recoil Control Training im Browser. Meistere Spray Patterns, vertikale Mauskompensation und Trefferdichte für CS2, Valorant und Apex Legends. | `Recoil Control lernen` |
| **PT** | 54c / 148c | Treino de Controle de Recoil – Spray FPS \| SkillDrills | Treine controle de recoil e padrões de spray no navegador. Domine a compensação vertical e transferências de tiro para CS2 e Valorant gratuitamente. | `treino de controle de recoil` |
| **ES** | 54c / 138c | Control de Retroceso FPS – Spray Pattern \| SkillDrills | Entrena el control de retroceso y patrones de spray en tu navegador. Domina la compensación vertical y ráfagas para CS2 y Valorant gratis. | `control de retroceso fps` |
| **FR** | 51c / 151c | Contrôle du Recul FPS – Spray Pattern \| SkillDrills | Entraînez le contrôle du recul et les spray patterns sur votre navigateur. Maîtrisez la compensation verticale et les tirs groupés sur CS2 et Valorant. | `contrôle du recul fps` |

---

## 3. SEO & Structural Rigor Checklist
- [x] **Title <= 60 Chars**: All 7 titles strictly bounded (<= 59 chars), front-loading primary keywords, terminating in ` | SkillDrills`.
- [x] **Description <= 155 Chars**: All 7 descriptions between 102c and 153c (accounting for HTML entity expansions).
- [x] **Keywords Array**: Exactly 12 native keywords per locale with 0 English leaks in non-English locales.
- [x] **Reciprocal Hreflangs**: All 8 alternates (`en`, `ko`, `ja`, `de`, `pt`, `es`, `fr`, `x-default`) registered in `lib/i18n/locales.js` and rendered in static HTML.
- [x] **6 Schema.org Blocks**: `BreadcrumbList`, `SoftwareApplication`, `WebApplication`, `VideoGame`, `FAQPage` (10 FAQs), `HowTo` (4 steps).
- [x] **Scientific Foundations**: Citing Schmidt & Lee (2011) generalized motor programs, Wolpert & Kawato (1998) internal forward models, Fitts (1954), and Woods et al. (2015).
- [x] **Benchmark Table**: Standard 5-tier scientific magazine accuracy benchmark table (`78% – 90%+` down to `< 35%`).
- [x] **10 Bespoke FAQs per Locale**: 10 authentic, distinct, scientifically validated FAQs per page.
- [x] **Client Component Copy**: Localized HUD captions, stats, rules, and about modal texts passed directly to `RecoilControlClient`.

---

## 4. Verification Logs
- **Level 1 (AST Verification)**: PASSED across all 7 locales.
- **Level 2 (Production Build)**: PASSED with Exit Code 0 (583 static routes generated).
- **Level 3 (Static HTML Audit)**: PASSED with 100% attribute match across canonical, hreflang, JSON-LD schemas, and benchmark table.
