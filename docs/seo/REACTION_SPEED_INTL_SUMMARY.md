# Reaction Speed International SEO — Research, Implementation & Verification Summary

**Date:** 2026-09-04  
**Scope:** `app/drills/reaction-speed` (8 drills + 1 category hub)  
**Dataset:** [`scripts/keywords/out/reaction-speed-intl-2026-09-04.csv`](../../scripts/keywords/out/reaction-speed-intl-2026-09-04.csv)  
**Full Research Report:** [`scripts/keywords/out/reaction-speed-intl-2026-09-04.md`](../../scripts/keywords/out/reaction-speed-intl-2026-09-04.md)  
**Guidelines Followed:** `ANTIGRAVITY_REACTION_SPEED_INTL_SEO.md`, lazy senior engineering rules (`AGENTS.md`)

---

## 1. Executive Summary & Strategic Rationale

SkillDrills evaluated international search demand across **17 national search markets** (5 existing Tier A locales + 10 Tier B expansion markets + US/GB benchmarks) covering **556 candidate keyword queries** via the live Bing Webmaster Tools API.

### Core Guiding Principles Applied
1. **Build Only What Data Proves:** Only queries meeting strict volume floors ($\ge 300$/mo exact for Tier A, $\ge 1,000$/mo exact for Tier B), low/moderate competition, and exact intent alignment were targeted.
2. **Never Ship 404 Alternates or Phantom Pages:** Introduced fine-grained per-route locale mapping (`ROUTE_LOCALES`) in `lib/i18n/locales.js`. Pages are only generated where justified. Alternate `hreflang` tags and `sitemap.xml` entries are strictly reciprocal and emit zero 404 URLs.
3. **No Cannibalization:** Differentiated Hub H1s from drill targets (`반응속도 훈련 및 테스트` vs. `반응속도 테스트` in KR; `反射神経テスト & トレーニング` vs. `反応速度テスト` / `反射神経ゲーム` in JP).
4. **Zero Dead Carousel Links:** Hub drill carousels dynamically link to localized URLs when live, and fall back cleanly to canonical English URLs rather than creating self-referential or dead loops.

---

## 2. Research-Backed Decisions Ledger

### 2.1. Measured Demand Summary (Tier A Markets)

| Market / Locale | Primary Keyword Candidate | Monthly Exact Search Volume | Status / Decision | Strategic Rationale |
|---|---|---|---|---|
| **South Korea (`ko` / `kr`)** | `반응속도 테스트` | **10,032** | **PROMOTED** | +49.9% surge over historical baseline. Massive high-intent gaming audience. Formed target for `/ko/drills/reaction-speed/reaction-time-test`. |
| **South Korea (`ko` / `kr`)** | `반속테스트` | **316** | **INTEGRATED (LSI)** | Standalone gaming slang contraction. Integrated into Korean FAQ and guide copy. |
| **Japan (`ja` / `jp`)** | `反射神経テスト` | **2,466** | **PROMOTED (HUB)** | Highest volume term in Japan. Aligns perfectly with the multi-drill category hub H1. |
| **Japan (`ja` / `jp`)** | `反応速度テスト` | **1,768** | **PROMOTED (DRILL)** | High-intent single-target visual latency search. Targeted by `/ja/drills/reaction-speed/reaction-time-test`. |
| **Japan (`ja` / `jp`)** | `反射神経ゲーム` | **606** | **PROMOTED (DRILL)** | Strong interactive game intent. Targeted by `/ja/drills/reaction-speed/reflex-training-drill`. |
| **Germany (`de`)** | `reaktionstest` | **397** | **SKIPPED (Intent Dissonance)** | Volume exceeded 300, but SERP intent is dominated by legal/medical driver license MPU tests (TÜV/Dekra/ADAC). A gaming drill cannot satisfy this search intent. |
| **Brazil (`pt` / `br`)** | `teste de reflexo` | **209** | **SKIPPED (Below Floor)** | Below 300 exact/mo threshold. |
| **Brazil (`pt` / `br`)** | `teste de tempo de reacao` | 13 | **SKIPPED (Below Floor)** | Low natural search volume. |
| **Spain / LatAm (`es`)** | `test de reflejos` | **73** | **SKIPPED (Below Floor)** | Below 300 exact/mo threshold. |
| **Spain / LatAm (`es`)** | `test de velocidad de reaccion` | 11 | **SKIPPED (Below Floor)** | Low natural search volume. |

### 2.2. Measured Demand Summary (Tier B Expansion Markets)

*Threshold requirement: $\ge 1,000$ exact searches/mo and LOW/MEDIUM competition.*

| Market | Locale Code | Top Query Checked | Monthly Volume | Status | Rationale |
|---|---|---|---|---|---|
| Russia | `ru` | `тест на реакцию` | **123** | **SKIPPED** | Failed 1,000 floor. |
| Turkey | `tr` | `reaksiyon testi` | **91** | **SKIPPED** | Failed 1,000 floor. |
| Indonesia | `id` | `tes reaksi` | **85** | **SKIPPED** | Failed 1,000 floor. |
| Poland | `pl` | `test na refleks` | **80** | **SKIPPED** | Failed 1,000 floor. |
| Italy | `it` | `test riflessi` | **74** | **SKIPPED** | Failed 1,000 floor. |
| France | `fr` | `test de reflexe` | **43** | **SKIPPED** | Failed 1,000 floor. |
| Vietnam | `vi` | `kiem tra phan xa` | **15** | **SKIPPED** | Failed 1,000 floor. |
| Thailand | `th` | `ทดสอบความเร็วในการตอบสนอง` | **11** | **SKIPPED** | Failed 1,000 floor. |
| Netherlands | `nl` | `reactiesnelheid test` | **6** | **SKIPPED** | Failed 1,000 floor. |
| Sweden | `se` | `reaktionstest` | **3** | **SKIPPED** | Failed 1,000 floor. |

---

## 3. What Was Built and What Was Deliberately Not Built

### 3.1. What Was Built (3 Research-Justified Drill Pages)

1. **[`app/ko/drills/reaction-speed/reaction-time-test/page.js`](../../app/ko/drills/reaction-speed/reaction-time-test/page.js)**
   - **Primary Keyword:** `반응속도 테스트` (10,032/mo exact).
   - **Secondary/LSI:** `반속테스트` (316/mo exact), `시각 반응속도`, `게이머 벤치마크`.
   - **Components:** Server-rendered Korean `DrillGuide`, 4-tier benchmark grading table (Elite 150-190ms down to Developing >300ms), 4-item FAQ schema, HowTo schema, WebApplication schema, BreadcrumbList schema.
   - **Self-canonical:** `https://skilldrills.online/ko/drills/reaction-speed/reaction-time-test`.

2. **[`app/ja/drills/reaction-speed/reaction-time-test/page.js`](../../app/ja/drills/reaction-speed/reaction-time-test/page.js)**
   - **Primary Keyword:** `反応速度テスト` (1,768/mo exact).
   - **Components:** Server-rendered Japanese `DrillGuide`, 4-tier benchmark grading table, 4-item FAQ schema, HowTo schema, WebApplication schema, BreadcrumbList schema.
   - **Self-canonical:** `https://skilldrills.online/ja/drills/reaction-speed/reaction-time-test`.

3. **[`app/ja/drills/reaction-speed/reflex-training-drill/page.js`](../../app/ja/drills/reaction-speed/reflex-training-drill/page.js)**
   - **Primary Keyword:** `反射神経ゲーム` (606/mo exact).
   - **Components:** Server-rendered Japanese `DrillGuide`, score tier benchmarks (Elite 10,000+ down to Beginner <3,000), 3-item FAQ schema, HowTo schema, WebApplication schema, BreadcrumbList schema.
   - **Self-canonical:** `https://skilldrills.online/ja/drills/reaction-speed/reflex-training-drill`.

4. **Shared Localization Infrastructure:**
   - **`lib/i18n/drillNames.js`:** Clean dictionary of localized drill titles and taglines, keyed strictly by English canonical `href`.
   - **`lib/i18n/dictionaries.js`:** Added full `ui.*` dictionary keys (`play`, `viewAll`, `oneAtATime`, `prevDrill`, `nextDrill`, `drills`, `exploreAdjacent`, `returnToAllSectors`, `difficulty`, `nav`) across all 6 locales. Anti-cannibalized hub H1s for `ko` and `ja`.
   - **`lib/i18n/locales.js`:** Added `ROUTE_LOCALES` defining exact route-locale availability; exported `hasLocalizedRoute(locale, pathname)` preventing dead links and 404 alternates.
   - **`app/sitemap.js`:** Filtered `localizedEntries` with `hasLocalizedRoute(loc, route)` ensuring 0 non-existent locale URLs are indexed.
   - **`components/drill/DrillCarousel.js` & `app/drills/reaction-speed/ReactionSpeedDrillsClient.tsx`:** Updated to render localized names/taglines, translate all carousel UI elements, and link directly to localized drill pages when available.
   - **`components/drill/RelatedDrills.js`:** Uses `stripLocale()` to maintain proper context across locales.

### 3.2. What Was Deliberately NOT Built and Why

- **German (`de`) `reaktionstest` Page:** Deliberately **NOT** built. Despite having 397 exact monthly searches, the search intent is almost entirely driven by medical-psychological assessments for driving licenses (MPU / "Idiotentest" via TÜV/Dekra/ADAC). Launching an aim-training reflex tool under this keyword would yield high bounce rates, zero satisfaction of search intent, and negative user signals.
- **Portuguese (`pt`) & Spanish (`es`) Drill Pages:** Deliberately **NOT** built. Queries like `teste de reflexo` (209/mo) and `test de reflejos` (73/mo) failed the 300 exact volume threshold. Creating thin or unsearched localized pages wastes crawl budget and dilutes domain authority.
- **Remaining 6 Reaction Speed Drills in Korean/Japanese:** Deliberately **NOT** localized into separate route pages because their search volume was below 300 exact/mo. Instead, they are displayed on the localized category hub with localized names and taglines via `DRILL_LOCALIZATIONS`, linking directly to the canonical English playable drill.
- **All Tier B Expansion Locales:** Deliberately **NOT** added. None reached the required 1,000 exact/mo threshold.
- **Inert `keywords` Meta Arrays:** Stripped from `app/ko/drills/reaction-speed/page.js` and `app/ja/drills/reaction-speed/page.js` and omitted from all new drill pages.

---

## 4. Technical Verification Log

### 4.1. Next.js Static Build (`npx next build`)
- **Status:** **PASS (Exit Code 0)**
- **IndexNow Protection:** Followed strictly — executed `npx next build` directly. `npm run build` was never invoked, ensuring zero accidental IndexNow API pings.
- **Generated Static Routes:**
  ```text
  ├ ○ /ja/drills/reaction-speed
  ├ ○ /ja/drills/reaction-speed/reaction-time-test
  ├ ○ /ja/drills/reaction-speed/reflex-training-drill
  ├ ○ /ko/drills/reaction-speed
  ├ ○ /ko/drills/reaction-speed/reaction-time-test
  ├ ○ /sitemap.xml
  ```
  Routes `/de`, `/pt`, and `/es` do NOT include these drill pages, exactly matching the research policy.

### 4.2. TypeScript Safety Check (`npx tsc --noEmit`)
- Fixed root-cause zero-argument bug in `app/drills/reaction-speed/reaction-time-test/ReactionTimeTestClient.tsx` line 222 (`getStartLevel()`).
- All new files, components, and internationalization helpers passed TypeScript checks with 0 errors.

### 4.3. Reciprocal Hreflang & Canonical Verification
Verified via direct inspection of pre-rendered HTML files (`.next/server/app/...`):

| Page | Canonical Link | Alternate Hreflangs | Status |
|---|---|---|---|
| `/ko/drills/reaction-speed/reaction-time-test` | `https://skilldrills.online/ko/drills/reaction-speed/reaction-time-test` | `en`, `x-default`, `ja`, `ko` | **100% Reciprocal** |
| `/ja/drills/reaction-speed/reaction-time-test` | `https://skilldrills.online/ja/drills/reaction-speed/reaction-time-test` | `en`, `x-default`, `ja`, `ko` | **100% Reciprocal** |
| `/drills/reaction-speed/reaction-time-test` | `https://skilldrills.online/drills/reaction-speed/reaction-time-test` | `en`, `x-default`, `ja`, `ko` | **100% Reciprocal** |
| `/ja/drills/reaction-speed/reflex-training-drill` | `https://skilldrills.online/ja/drills/reaction-speed/reflex-training-drill` | `en`, `x-default`, `ja` | **100% Reciprocal** |
| `/drills/reaction-speed/reflex-training-drill` | `https://skilldrills.online/drills/reaction-speed/reflex-training-drill` | `en`, `x-default`, `ja` | **100% Reciprocal** |
| `/ko/drills/reaction-speed` (Hub) | `https://skilldrills.online/ko/drills/reaction-speed` | `en`, `x-default`, `pt`, `es`, `ja`, `de`, `ko` | **100% Reciprocal** |
| `/ja/drills/reaction-speed` (Hub) | `https://skilldrills.online/ja/drills/reaction-speed` | `en`, `x-default`, `pt`, `es`, `ja`, `de`, `ko` | **100% Reciprocal** |

### 4.4. Hub Carousel Link Resolution Verification
Checked rendered HTML on `/ko/drills/reaction-speed` and `/ja/drills/reaction-speed`:
- On `/ko/drills/reaction-speed`:
  - `Reaction Time Test` card links to `/ko/drills/reaction-speed/reaction-time-test` (Live localized page).
  - Remaining 7 cards link to `/drills/reaction-speed/<slug>` (Canonical English drill).
  - **Zero self-referential links** back to the hub.
- On `/ja/drills/reaction-speed`:
  - `Reaction Time Test` card links to `/ja/drills/reaction-speed/reaction-time-test` (Live localized page).
  - `Reflex Training Drill` card links to `/ja/drills/reaction-speed/reflex-training-drill` (Live localized page).
  - Remaining 6 cards link to `/drills/reaction-speed/<slug>` (Canonical English drill).
  - **Zero self-referential links** back to the hub.

### 4.5. Dynamic Sitemap (`sitemap.xml`) Output Verification
Inspection of `.next/server/app/sitemap.xml.body`:
- `https://skilldrills.online/ko/drills/reaction-speed/reaction-time-test` — Present (Priority: 0.9).
- `https://skilldrills.online/ja/drills/reaction-speed/reaction-time-test` — Present (Priority: 0.9).
- `https://skilldrills.online/ja/drills/reaction-speed/reflex-training-drill` — Present (Priority: 0.85).
- Zero non-existent drill URLs for `pt`, `es`, `de`, or `ko` (for reflex drill).

---

## 5. Maintenance Cadence & Next Category Recommendation

### 5.1. Re-Measurement Cadence
- **Quarterly Re-assessment (Q4 2026):**
  - Monitor `teste de reflexo` in Brazil (`pt`): currently 209/mo. If it crosses 300/mo, build `/pt/drills/reaction-speed/reaction-time-test`.
  - Re-evaluate Russian (`ru`) and Turkish (`tr`) gaming search trends.
  - Monitor SERP intent for German `reaktionstest` to determine if gaming intent gains measurable share over driver MPU tests.

### 5.2. Recommended Next Category: `app/drills/motor`
- **Rationale:**
  - `app/drills/motor` has already proven strong international traction (e.g., `CPS test` / `spacebar counter` / `rapid tapping` searches often reach 50,000+ monthly searches globally across Korean, Japanese, Portuguese, and German gaming demographics).
  - Following the identical rigorous research workflow (`/deepreaserch`) will unlock high-volume, low-competition clicks without generating low-value thin pages.
