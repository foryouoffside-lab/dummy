# Execution Brief — International SEO Build-Out: `reaction-speed` Category

**Target agent:** Antigravity
**Scope:** `app/drills/reaction-speed` **only** — 8 drills + 1 hub. Do not touch any other category.
**Status of prerequisites:** Two blocking bugs are already fixed (see §2.3). Start from a clean tree.

---

## 1. Your Role

You are acting as a senior international SEO strategist and technical implementer with twenty years of search experience — the kind who has watched keyword-density tactics die, watched hreflang get botched at scale on enterprise sites, and learned that the only durable ranking asset is a page that genuinely answers a query better than the alternatives.

You hold two disciplines at once:

- **Researcher.** You do not assert search volume. You measure it, record the date, and cite the tool. When a number is unavailable you write "unmeasured," never "0" and never an estimate dressed as a fact.
- **Engineer.** You ship changes into a live Next.js App Router codebase that already has a working English site earning real impressions. Nothing you do may regress it.

Your professional bias: **fewer, better pages.** Twenty years has taught you that 12 excellent localized pages outrank 400 translated shells, and that the second option actively harms a site. You will push back on scope inflation, including from the user, if the data does not support it.

---

## 2. Context You Must Load Before Acting

### 2.1 The site

SkillDrills (`https://skilldrills.online`) — 81 free browser-based cognitive/aim/reaction training drills. Next.js App Router, JS + partial TS, Tailwind, deployed on Vercel.

**Current search reality — do not skip this, it constrains everything:**

| Fact | Implication |
|---|---|
| ~80 clicks/mo total | Domain authority is the binding constraint, not on-page optimization |
| 82 of 91 URLs historically never crawled | New pages do not get crawled automatically. They need internal links. |
| Bing is the larger channel; ranks page 1 at ~0% CTR | Title/description quality is the fastest available win |
| Google has indexed hubs only, not drill pages | Internal linking is the unlock, not more content |

Read `SEO_PROGRESS.md` in full before writing a line of code. It is the handoff document.

### 2.2 i18n architecture as it stands

```
lib/i18n/locales.js       LOCALES, LOCALIZED_ROUTES, stripLocale(),
                          localizedPath(), hasLocalizedRoute(),
                          getAlternateLanguages()
lib/i18n/dictionaries.js  Per-locale string tree (~573 lines), 6 locales
lib/i18n/useTranslation.js  Client hook: derives locale from pathname, t(), localizeHref()
app/{pt,es,ja,de,ko}/     Flat parallel route trees, 11 routes each
```

**`LOCALIZED_ROUTES` is load-bearing.** It is read by the language switcher, the suggestion banner, `app/sitemap.js`, and now `hasLocalizedRoute()`. A route listed there without a real `page.js` becomes a 404 in the sitemap. **Pages first, registry second. Always.**

Current coverage is 11 of ~150 routes. Zero drill pages are localized.

**Translation reach is far smaller than it appears.** `useTranslation` is imported in 11 files. In `ReactionSpeedDrillsClient.tsx` it is called exactly twice — the H1 and the description. Everything else on that hub is an English literal or English registry data. The `ui.*` dictionary block (`start`, `score`, `accuracy`, `rank`, `exit`) is fully translated into all six languages and consumed by exactly one file, `DrillResultCard.js`. **That is pre-paid work sitting unused.**

### 2.3 Bugs already fixed — do not redo, do not revert

1. **`components/drill/DrillCarousel.js`** — cards used `href={drill.href}` raw, sending every `/ko` visitor to the English site on their first click. Now routes through `hasLocalizedRoute(locale, …) ? localizeHref(…) : drill.href`.

   **Understand why the strict helper exists.** `localizeHref()` deliberately degrades to the nearest localized *ancestor* — correct for nav chrome, wrong for a card. Without the strict check, a card on `/ko/drills/reaction-speed` resolves to `/ko/drills/reaction-speed`, i.e. the page the visitor is already on. **When you add locale drill pages and register them in `LOCALIZED_ROUTES`, these cards begin pointing at them automatically. No further change in that file.**

2. **`app/drills/physical/reflex-training/drop-catch/page.js`** — emitted hreflang for 5 locale URLs that all 404. Removed. That file is outside your scope; leave it alone.

### 2.4 The 8 drills in scope

| Folder | Display name | Current EN term | Current EN anchor |
|---|---|---|---|
| `reaction-time-test` | Reaction Time Test | reaction time test | Reaction Time Test |
| `reflex-training-drill` | Reflex Training Drill | reflex training drill | Multi-Target Reflex Drill |
| `saccadic-gallery` | Saccadic Gallery | saccadic eye exercises | Saccadic Eye Exercises |
| `visual-tracking-speed-test` | Visual Tracking Speed Test | visual tracking test | Visual Tracking Speed Test |
| `reaction-simulator` | Saccadic Reaction Simulator | reflex training game | Reaction Simulator Game |
| `fps-tracking-trainer` | FPS Tracking Trainer | fps tracking trainer | FPS Tracking Trainer |
| `barrier-sequence-pursuit` | Barrier Sequence Pursuit | jiggle peek trainer | Jiggle Peek Trainer |
| `market-doors-pursuit` | Market Doors Pursuit | corner checking trainer | Corner Checking Trainer |

Note the established pattern in `lib/drillSeo.js`: **the branded display name and the search term are allowed to differ.** "Saccadic Gallery" is the product name; "saccadic eye exercises" is what humans type. You will replicate this discipline per locale.

---

## 3. Non-Negotiable Constraints

Violating any of these means the work is rejected outright.

1. **No hidden text. Ever.** No `display:none` keyword blocks, no off-screen text, no `aria-hidden` keyword lists, no white-on-white, no zero-height containers, no multi-language keyword dumps behind a toggle. This is a named spam violation in both Google's and Bing's guidelines, it is algorithmically discounted anyway, and this site cannot absorb a manual action.

2. **One language per URL.** An English page is 100% English. A Korean page is 100% Korean. Never both on one URL. Mixed-language body content produces low-confidence language classification and ranks in neither market.
   *Permitted exception:* brand names, game titles, and genuine adopted loanwords in Latin script inside a native sentence — `FPS 에임`, `CS2`, `발로란트`, `エイム練習`. The test is whether a native speaker writes it that way naturally. The existing `ko` dictionary already does this correctly; match its register.

3. **Never fabricate a number.** No invented search volumes, user counts, ratings, testimonials, "trusted by N players," or benchmark claims. If the API returns null or rate-limits, record `ERR`/`unmeasured`. A rate-limit null that gets written down as `0` is the single most damaging error you can make here, because it permanently mis-scopes the build.

4. **Retargeting must stay factually honest.** You may rename a drill toward how people search — that is good practice. You may **not** retarget a drill to a phrase it does not deliver. If a drill measures saccadic eye movement, "saccadic eye exercises" is legitimate; "reaction time test" is not, regardless of volume. The page must do what the title promises.

5. **`keywords` meta is inert.** Google dropped it in 2009; Bing treats it as a spam hint. Do not spend effort tuning `keywords:` arrays and do not present that as SEO work. The signals that carry weight are: URL slug, `<title>`, H1, first paragraph, body copy, and inbound anchor text.

6. **Do not regress the English site.** It earns the impressions you currently have. English routes, copy, canonicals, and structure stay exactly as they are unless a change is explicitly justified and flagged.

7. **Pages before `LOCALIZED_ROUTES`.** Never register a route that lacks a real `page.js`.

8. **Scope discipline.** `reaction-speed` only. If you identify an issue in another category, write it into the report; do not fix it.

---

## 4. Phase 1 — Demand & Competition Research

**Deliverable:** `scripts/keywords/out/reaction-speed-intl-<YYYY-MM-DD>.md` plus a machine-readable `.csv`. Both committed. Every number carries its measurement date and source.

### 4.1 Tooling that already exists — use it, do not reinvent

```
scripts/bing/bing.py                    Bing Webmaster API client
  bing.keyword_volume(phrase, country)  → {"exact": n, "broad": n} or None
  bing.market(country)                  → (country, language)
  cmd_related(phrase, country)          → related-term discovery
  cmd_queries / cmd_pages / cmd_pagequeries → your own current performance

scripts/keywords/market_volume.py       Per-market phrase batches
scripts/keywords/drill_market_terms.py  Drill-level demand per market
scripts/keywords/category_market_matrix.py  Category × market
scripts/keywords/country_keywords.py
```

Auth: `BING_API_KEY` env var, or `scripts/bing/.bing-key`.

**Two documented traps, both of which will silently corrupt your dataset:**

- **Diacritics.** An unaccented phrase silently returns 0. `teste de tempo de reação` ≠ `teste de tempo de reacao`. Test both spellings; report both.
- **The rate-limit null.** The API returns null under rate limiting, which is indistinguishable from genuine zero volume unless you handle it. Retry with backoff. Record `ERR`, never `0`. Also retry around `URLError`.
- **ISO dates** are required on keyword endpoints.

### 4.2 Markets to test

**Tier A — existing locale trees** (`app/<loc>/` already exists, cheapest to extend):
`kr`, `jp`, `de`, `br` (pt), `es`

**Tier B — no tree yet** (a positive result means recommending a *new* locale, which is a larger commit):
`fr`, `pl`, `it`, `tr`, `id`, `vi`, `th`, `ru`, `nl`, `se`

**Tier C — English baseline** (your control group): `us`, `gb`

Tier B is where genuine low-competition opportunity is most likely to hide, which is precisely why it is worth measuring. But a Tier B win must clear a higher bar (§4.5) because it carries the cost of a whole new locale tree, dictionary block, and route set.

### 4.3 Term construction — the part that requires actual expertise

For each of the 8 drills × each market, build a candidate term list. Do not machine-translate the English term and stop. That is the single most common failure in international SEO and it is why the existing notes record that the obvious "Treinador de X" / "Entrenador de X" phrasings measured **zero**.

Apply these principles:

1. **Demand is phrased as tests, not training.** People search for a thing to *take*, not a thing to *practise*. `number memory test`, not `Digit Span`. This holds across every market measured so far. Weight your candidates accordingly.
2. **Generate 4–8 native phrasings per drill per market**, including:
   - the literal native translation
   - the native *colloquial* name (what a gamer actually calls it)
   - the English loanword form, which is often dominant in `kr`/`jp`/`de` (`aim trainer`, `cpsテスト`)
   - the "test" framing and the "game" framing
   - with and without a `무료` / `無料` / `kostenlos` / `gratis` free-modifier
3. **Mine, don't guess.** Run `cmd_related()` on the highest-volume seed in each market and harvest what the API returns. Real user phrasing beats your intuition, and this step is where the non-obvious wins come from.
4. **Verify plausibility with a native-language SERP check** before committing a term (§4.4).

### 4.4 Competition assessment — do this manually, the API will not give it to you

**State this limitation plainly in your report:** the Bing Webmaster API returns volume (`exact`/`broad`) but **no competition or difficulty metric.** Any "difficulty score" must therefore be derived by inspection, and must be labelled as an editorial judgment, not a measurement. Do not invent a numeric KD and present it as data.

For every candidate term that clears the volume floor, inspect the live SERP in that market/language and record:

| Signal | What you are looking for |
|---|---|
| Page-1 composition | Dedicated interactive tools, or generic blog articles? Articles = soft SERP = opportunity |
| Domain strength | Wikipedia/major media/established tool sites, or thin affiliate content? |
| Native-language dedicated pages | Does a *native-language* purpose-built tool already exist, or only English ones ranking by default? **An English tool ranking in a Korean SERP is the strongest opportunity signal there is.** |
| SERP features | Does an interactive tool own a rich result you could plausibly compete for? |
| Intent match | Would a searcher on this term actually want your drill? Mismatch = bounce = no ranking regardless |

Classify each as **LOW / MEDIUM / HIGH** competition with a one-line justification citing what you actually saw.

### 4.5 Selection criteria — the decision rule

Compute and record for every candidate:

```
volume (exact, monthly)  ·  competition (LOW/MED/HIGH, justified)
·  intent match (does the drill genuinely answer it?)
·  locale cost (Tier A = existing tree, Tier B = new tree)
```

**Promote a term to BUILD only if all four hold:**

1. Exact monthly volume **≥ 300** in that market (Tier A) or **≥ 1,000** (Tier B — higher bar for the higher cost)
2. Competition is **LOW or MEDIUM**
3. The drill **genuinely delivers** what the term promises (constraint §4 above)
4. The term is **unique** across the map — two pages must never target the same phrase, in any language. Duplicate anchors send contradictory ownership signals.

**Known prior findings to verify, not assume.** These are from earlier measurement and may have drifted — re-measure and report deltas:
- `반응속도 테스트` (kr) ≈ 6,693/mo — strongest known non-English signal
- CPS is the #1 category by demand overall, *not* FPS
- Visual and tracking categories measure ≈ 0 across markets
- Only Korean and Japanese previously justified translation
- The obvious pt/es/de trainer phrasings measured **zero**

If your measurements contradict any of these, **say so explicitly and show the numbers.** Contradicting a prior finding with evidence is a valuable result, not a problem.

### 4.6 Expected honest outcome

Based on prior data, expect roughly **2–4 drills × 2 markets** to clear the bar — not 8 × 10. A report recommending 80 pages is a red flag that the criteria were not applied. **Recommending that a market be skipped entirely is a valid, valuable finding.** Say it clearly when the data says it.

---

## 5. Phase 2 — Implementation

Only build what Phase 1 justified. Work in this order; each step depends on the one before.

### 5.1 Drill name + tagline localization layer

`lib/drillsRegistry.js` (names, `href`-keyed) and `lib/drillCatalog.js` (`DRILL_TAGLINES`) are flat English. Add a per-locale override layer.

**Requirements:**
- New file, e.g. `lib/i18n/drillNames.js`, keyed by **canonical English `href`** → locale → `{ name, tagline }`
- Resolved through `t()` / a helper hook, with **English fallback** when a locale entry is absent
- **`drill.href` stays canonical English everywhere.** It is the lookup key for `lib/drillPreviews.js`, the React `key`, and the `drillSeo.js` map key. Localizing it will break preview rendering.
- Only populate locales Phase 1 justified. Do not stub the others with machine translation.

This is the highest-leverage change in the whole brief: the localized drill name becomes simultaneously the card title, the H1, and the internal anchor text — the three signals that actually carry keyword weight.

### 5.2 Hub-page translation coverage

`ReactionSpeedDrillsClient.tsx` currently calls `t()` twice. Extend coverage to every visitor-visible string on that hub:
- Breadcrumb — `HQ` is a hardcoded literal at approximately line 102
- `Play`, `View all`, difficulty chips (`BEGINNER`/`INTERMEDIATE`/`ADVANCED`), duration units
- Section headings, `EXPLORE ADJACENT HUBS`, CTA copy

Add keys to `lib/i18n/dictionaries.js` under the existing structure. **Reuse the already-translated `ui.*` block** rather than duplicating keys — it is populated for all six locales and currently near-unused.

Difficulty chips render straight from `drill.difficulty` in `DrillCarousel.js`. Map through a dictionary lookup rather than mutating the registry values.

### 5.3 Locale drill pages

For each (drill × market) promoted in Phase 1, create `app/<loc>/drills/reaction-speed/<folder>/page.js`.

Follow the **exact** existing pattern (`app/ko/drills/reaction-speed/page.js`): a thin metadata wrapper re-exporting the shared English client component, which localizes itself via `useTranslation`.

Each page must carry:
- `title` — native language, leading with the target term
- `description` — native, written for click-through, not stuffed
- `alternates.canonical` — self-referential, locale-prefixed
- `alternates.languages` — via `getAlternateLanguages()`
- `openGraph` with correct `locale` (`ko_KR`, `ja_JP`, …)
- **No `keywords` array.** It is inert (§3.5). Do not add one.

**Body copy must be genuinely written in the target language, not machine-translated.** If you cannot produce native-quality copy for a market, say so and stop — flag it for human review rather than shipping translationese. Translationese ranks badly and damages trust.

### 5.4 Register routes and wire hreflang

Only **after** the pages exist:
- Add the new routes to `LOCALIZED_ROUTES` in `lib/i18n/locales.js`
- Confirm `app/sitemap.js` emits them (it derives from that list)
- Confirm the English counterparts' `alternates.languages` now resolve to live URLs, not 404s
- Verify hreflang **reciprocity**: every alternate must point back. Non-reciprocal hreflang is ignored wholesale by Google.
- Confirm `x-default` is present and correct

### 5.5 Internal linking

The pages must be reachable, or they join the 82 uncrawled URLs.

- Verify the fixed `DrillCarousel` now emits locale hrefs for newly-registered routes (it should, with zero changes — confirm, do not modify)
- Ensure `components/drill/RelatedDrills.js` / `lib/relatedDrills.js` cross-links stay **within locale**
- Extend `lib/drillSeo.js` with per-locale `term`/`anchor` so localized anchor text is native — anchor uniqueness applies **across all locales**

---

## 6. Phase 3 — Verification

Nothing is "done" until these pass. Report actual output; do not assert success.

1. **Build.** Run `npx next build`, **not** `npm run build` — the `postbuild` hook pings live IndexNow endpoints (Bing/Yandex/Seznam). Do not trigger that during development.
2. **Pre-existing type errors.** `npx tsc --noEmit` currently reports errors in `reaction-speed` drill *clients* (`speed` prop, `icon` prop). These pre-date this work. Do not fix them in this pass; do not let them mask new errors you introduce. Diff against a baseline run.
3. **Rendered HTML, not source.** For each new route, confirm the target term appears in the server-rendered HTML — `curl` the built output. The historic root cause of 82 uncrawled URLs was content absent from server HTML (`isClient` gates, `{isOpen && children}` accordions).
4. **`DrillCarousel` invariant.** Every card in the server HTML must carry a real, non-self-referential `href`. A card linking to the page it sits on is the regression `hasLocalizedRoute` exists to prevent. Check explicitly.
5. **No 404s.** Crawl every URL in the emitted sitemap and every hreflang alternate. Zero 404s.
6. **Language purity.** Confirm no page mixes languages beyond the §3.2 loanword exception.
7. **Deploy verification.** Vercel's edge cache serves the *previous* build to plain `curl` after deploy. Bust the cache. Never grep for a phrase that also appears in the `<title>` — you will match the old page and conclude success falsely.

---

## 7. Deliverables

1. `scripts/keywords/out/reaction-speed-intl-<date>.md` — full research report: every term tested, volume, market, date, competition rating with justification, BUILD/SKIP decision with reasoning, and explicit deltas against §4.5 prior findings.
2. The matching `.csv`.
3. Code changes per §5, limited to `reaction-speed`.
4. `REACTION_SPEED_INTL_SUMMARY.md` at repo root:
   - What was measured and what it showed
   - What was built and why
   - **What was deliberately not built and why** — this section is as important as the rest
   - Verification output, pasted, including failures
   - Risks and open questions
   - A concrete recommendation on whether to extend this to the next category, with the reasoning
5. Conventional commits, scoped. Do not squash research and implementation together.

---

## 8. Definition of Done

- [ ] Every term measured, dated, sourced; nulls recorded as `ERR`, never `0`
- [ ] Competition assessed by SERP inspection and labelled as editorial judgment
- [ ] Build/skip decisions traceable to the §4.5 criteria
- [ ] Only justified pages built; skips documented with reasoning
- [ ] Every localized page is monolingual, natively written, canonical-correct
- [ ] hreflang reciprocal, `x-default` present, zero 404 alternates
- [ ] `LOCALIZED_ROUTES` updated **only** for routes with real `page.js`
- [ ] Every new page reachable by internal link from its locale hub
- [ ] `npx next build` clean; no new type errors above baseline
- [ ] Target term verified present in **server-rendered** HTML
- [ ] English site provably unchanged
- [ ] Scope held to `reaction-speed`
- [ ] Summary written, including the "not built" section

---

## 9. Automatic Rejection

- Any hidden, cloaked, or visually suppressed keyword text
- Any invented metric, volume, testimonial, or user-count
- A rate-limit null recorded as `0`
- Machine-translated body copy shipped as native
- A route in `LOCALIZED_ROUTES` without a `page.js`
- Non-reciprocal or 404-pointing hreflang
- Changes outside `reaction-speed`
- Reverting either §2.3 bug fix
- A drill retargeted to a phrase it does not honestly deliver
- Effort spent tuning inert `keywords` meta arrays and reported as SEO work
- `npm run build` executed during development (fires live IndexNow pings)

---

## 10. Judgment Clause

If the research shows the honest answer is **"only one drill in one market clears the bar"** — build that one, document the rest, and say so plainly. A small, correct, evidence-backed result is the successful outcome of this brief.

A large result that required loosening the criteria is the failed one.

The user will review your output and decide whether to extend this to the next category. Make that decision easy to make correctly.
