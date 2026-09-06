# Execution Brief — `reaction-speed` English SEO Cleanup

**Target agent:** Antigravity
**Scope:** `app/drills/reaction-speed` — 8 drills + 1 hub. Plus the specific shared-registry keys those drills own. Nothing else.
**Type:** Correctness, targeting, and depth repair on the English pages.

## Run order — this brief is FIRST

Three briefs exist. They must run in this order, because each one's output is the next one's input:

| # | Brief | Why this position |
|---|---|---|
| **1** | **This one** | Renames directories. Every later brief would have to redo its work on moved paths. |
| 2 | `ANTIGRAVITY_FAQ_SCHEMA_INTEGRITY.md` | Edits FAQ content on 15 pages, 6 of them here. Must run on final paths. |
| 3 | `ANTIGRAVITY_REACTION_SPEED_INTL_SEO.md` | Localizes. Must not translate pages that are about to be re-targeted or re-slugged. |

Do not start this brief until you have confirmed no other agent is mid-run on the same tree.

---

## 1. Your Role

Senior technical SEO engineer with two decades of experience, working on a live site that earns roughly 80 clicks/month with a history of crawl problems. Your defining trait is that you **verify before you assert** — you have seen enough dashboards to know that a plausible number with no source attached is worse than no number, because it gets acted on.

You are also unusually careful with URL changes. You have migrated enough sites to know that a slug rename is cheap on an uncrawled page and expensive on a ranking one, and that the difference is a measurement, not a guess.

---

## 2. Context

Read `SEO_PROGRESS.md` before starting.

**Site reality that constrains every decision here:**
- ~80 clicks/mo; domain authority is the binding constraint, not on-page work
- 82 of 91 URLs historically never crawled — new URLs are not discovered automatically
- Bing is the larger channel and ranks the site page 1 at ~0% CTR
- Google has indexed hubs only

**Already fixed — do not redo or revert:**
- `components/drill/DrillCarousel.js` — cards now resolve through `hasLocalizedRoute(locale, …) ? localizeHref(…) : drill.href`
- `lib/i18n/locales.js` — `hasLocalizedRoute()` added
- `app/drills/physical/reflex-training/drop-catch/page.js` — 404-pointing hreflang removed

**Current measured state of this category (verified against rendered HTML in `.next/server/`):**

| Drill | Words | Inbound links | Target term | Slug carries term? |
|---|---:|---:|---|---|
| `reaction-time-test` | **1,510** | 26 | reaction time test | yes |
| `reaction-simulator` | 967 | 21 | reflex training game | **NO** |
| `fps-tracking-trainer` | 845 | 25 | fps tracking trainer | yes |
| `reflex-training-drill` | 813 | 20 | reflex training drill | yes |
| `visual-tracking-speed-test` | 810 | 12 | visual tracking test | yes |
| `saccadic-gallery` | 802 | 22 | saccadic eye exercises | yes |
| `market-doors-pursuit` | 798 | 25 | corner checking trainer | **NO** |
| `barrier-sequence-pursuit` | 778 | 22 | jiggle peek trainer | **NO** |

`reaction-time-test` is the reference page: it is the only one with `DrillGuide`, the only one at 1,500 words, and the only one whose slug, title, H1 and anchor text all agree.

---

## 3. Workstreams

Five, ordered by dependency. **WS-3 is conditional on WS-2's measurements** — do not begin it before those numbers exist.

---

### WS-1 — hreflang pointing at 404s

**Two files.** Both call `getAlternateLanguages()` while their route is absent from `LOCALIZED_ROUTES`, so each advertises 5 locale alternates that all 404:

- `app/drills/reaction-speed/reaction-time-test/page.tsx`
- `app/drills/reaction-speed/reflex-training-drill/page.tsx`

Remove the `languages` key and the now-unused import. Keep `canonical`. Follow the exact pattern already applied to `drop-catch`, including a comment stating the condition for adding it back.

The other 6 drills in this category correctly omit hreflang. Leave them alone.

---

### WS-2 — Keyword research (blocking gate for WS-3)

Three drills target phrases with **no recorded volume anywhere in the repo**:

| Drill | Target term | Evidence in source |
|---|---|---|
| `market-doors-pursuit` | corner checking trainer | header comment says only *"highly targeted niche tool"* — no number, while listing `slicing the pie` ~1,900/mo in the *secondary* list |
| `barrier-sequence-pursuit` | jiggle peek trainer | **no SEO research comment block at all** |
| `reaction-simulator` | reflex training game | unverified |

**Measure them.** Tooling exists — use it, do not reinvent or estimate:

```
scripts/bing/bing.py          BING_API_KEY env var, or scripts/bing/.bing-key
  bing.keyword_volume(phrase, country) -> {"exact": n, "broad": n} | None
  python scripts/bing/bing.py keyword "<phrase>" us
  python scripts/bing/bing.py related "<phrase>" us    # term discovery
  python scripts/bing/bing.py quota                    # check before batching
```

Measure, at minimum, for `us` and `gb`:
- The three unverified primary terms above
- Every term already listed in those pages' header comments (`slicing the pie`, `clearing angles`, `saccadic eye movement training`, `peeker's advantage`, …)
- Whatever `related` surfaces from the strongest seed for each drill
- `reaction time test` as a **calibration control** — the repo records 10,978 exact for it. If your run returns something wildly different, your method or the API is off; stop and report rather than proceeding on bad data.

**Two documented traps that will silently corrupt the dataset:**
- **The rate-limit null.** The API returns null under rate limiting, indistinguishable from genuine zero. Retry with backoff; record `ERR`. **A null written down as `0` is the single most damaging error available here** — it would send you to re-slug a page that was correctly targeted.
- **`URLError`** — retry around it too.

**Also reconcile the unsourced figures already in the code.** `reaction-time-test` claims *"~90,500/mo US, KD ~80-85%"* in its header comment. Nothing in this repo produces a KD score, and the measured Bing exact for that term is 10,978. Either annotate every such figure with tool + date, or delete it. An undated number with no named source is not usable by the next person and must not survive this pass.

**Deliverable:** `scripts/keywords/out/reaction-speed-en-<YYYY-MM-DD>.md` + `.csv`, committed. Every row carries phrase, market, exact, broad, date, tool. Nulls as `ERR`.

---

### WS-3 — Re-target and re-slug *(conditional — only where WS-2 justifies it)*

For each of the three drills, decide from the measured data:

- **Keep** the current term if it has real volume → then only align the slug.
- **Re-target** to a better-measured term if one exists **and the drill honestly delivers it** → change term, anchor, title, H1, slug together.
- **Leave entirely alone** if nothing in its space has volume. A drill nobody searches for does not need a slug that pretends otherwise. **This is a legitimate outcome; take it when the data says so.**

#### Honesty gate

You may rename a drill toward how people search. You may **not** point it at a phrase it does not deliver. `saccadic-gallery` → "saccadic eye exercises" is legitimate: the drill measures saccades. Retargeting anything to "reaction time test" because that term is bigger is not, and `reaction-time-test` already owns that phrase — see the uniqueness rule below.

#### Uniqueness rule

`lib/drillSeo.js` states it: two pages sharing anchor text "would send Google a contradictory signal about which one owns the phrase." Every `term` and every `anchor` must stay unique **across the entire map**, not just within this category. Check before assigning.

#### If you re-slug — every one of these must be updated together

A rename is not just a directory move. `drill.href` is a lookup key in five places:

| File | What breaks |
|---|---|
| `lib/drillsRegistry.js` | `href` + `folderName` |
| `lib/drillCatalog.js` | `DRILL_TAGLINES` key |
| `lib/drillPreviews.js` | preview lookup key — **a miss silently renders no preview** |
| `lib/drillSeo.js` | term/anchor map key |
| `app/drills/reaction-speed/page.tsx` | ItemList schema URL (~line 87) |

Plus:
- **A 301 in `next.config.js`.** An established `redirects()` array exists — follow its conventions and its "most specific first" ordering comment. **Verify the destination, not only the source:** this repo has previously shipped redirects that 308'd a URL to itself. Curl every new redirect and confirm it lands on a 200 at the intended path.
- **`FOLDER_TO_STORAGE_KEY` in `app/drills/reaction-speed/ReactionSpeedDrillsClient.tsx`** — keyed by `folderName`. See WS-5; fix that bug first so you are not editing a broken map.
- **`lib/relatedDrills.js` / `components/drill/RelatedDrills.js`** — confirm cross-links still resolve.

**Saved scores are safe.** Storage keys are hardcoded string literals inside each client (`skilldrills_market_doors_v3`), not derived from the folder name, so a directory rename does not orphan a user's best scores. **Do not "helpfully" rename those literals** — that would destroy them.

---

### WS-4 — Content depth: roll `DrillGuide` out to the remaining 7

`reaction-time-test` has `DrillGuide` and 1,510 words. The other seven sit at ~800 with only the accordion. Close that gap.

Reference implementations — copy one, do not invent a third:
- `app/drills/reaction-speed/reaction-time-test/page.tsx` — guide derives FAQs from the schema object
- `app/drills/visual-tracking/constant-slow-pursuit/page.tsx` — schema appends the guide's FAQs

`components/drill/DrillGuide.js` consumes `{ heading, intro, benchmarks, techniques, steps, audience, faqs, related }`.

**Prefer the `reaction-time-test` pattern** (`faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text }))`) — one object is the source of truth, so schema and page cannot drift. This directly prevents the defect that brief #2 exists to clean up.

#### Content quality bar

This is the part most likely to go wrong. Every guide must be **genuinely useful writing**, not padding to hit a word count.

**Every factual claim must be defensible.** The existing `reaction-time-test` guide contains claims that are not, and which you must **delete or rewrite while you are in that file**:

- *"sub-millisecond precision"* — browser timers are coarsened to ~1ms for Spectre mitigation
- *"zero input lag"* — not achievable
- *"Benchmarks calibrated across millions of visual reaction trials"* — this site has ~80 clicks/mo and has run no such study
- *"**Official** Human Visual Reaction Time Benchmarks"* — official per whom?

Do not reproduce this pattern in the seven new guides. Specifically forbidden: invented sample sizes, made-up percentile tables presented as measured, fabricated user counts, invented citations, and unattributed "studies show."

Where a benchmark table is genuinely useful, either cite a real published source or frame it plainly as an editorial guide rather than measured data. Saying "these bands are our own rough guide" is honest and costs nothing.

---

### WS-5 — Storage-key bug (small, self-contained, do this first)

`app/drills/reaction-speed/ReactionSpeedDrillsClient.tsx`:

```js
const FOLDER_TO_STORAGE_KEY: Record<string, string> = {
  'market-doors-pursuit': 'skilldrills_market_doors_v2',   // client writes _v3
  'fps-tracking-trainer': 'skilldrills_fps_tracking_v2',   // client writes _v3
};
```

Both clients write `_v3`. The hub reads `_v2`, so the saved best-level badge never resolves for those two drills.

Fix the map to `_v3`. **Keep a `_v2` fallback in the read chain** — real users may hold `_v2` data from an older build, and dropping it would silently discard their history. The surrounding code already tries a key list; extend it rather than replacing.

---

## 4. Absolute Prohibitions

1. **No hidden text.** No `display:none` keyword blocks, off-screen text, `aria-hidden` keyword lists, or sr-only smuggling. Named spam violation in both Google's and Bing's guidelines; this site cannot absorb a manual action.
2. **No fabricated data.** No invented volumes, KD scores, sample sizes, benchmarks, testimonials, user counts, or citations.
3. **A null is never a zero.** `ERR`, always.
4. **No dishonest retargeting.** The page must deliver what the title promises.
5. **Do not tune `keywords` meta arrays.** Google dropped it in 2009; Bing treats it as a spam hint. Existing arrays may be left as-is or trimmed, but **effort spent there must not be reported as SEO work.**
6. **Do not rename storage-key string literals.** Destroys user data.
7. **Do not touch other categories**, `DrillCarousel.js`, `DrillAccordion.js`, or the three §2 fixes.
8. **`npx next build` only — never `npm run build`.** The `postbuild` hook fires live IndexNow pings to Bing/Yandex/Seznam.
9. **Do not re-slug on a hunch.** No measurement, no rename.

---

## 5. Verification

Report real output. Do not assert success.

- [ ] `npx next build` exits 0
- [ ] `npx tsc --noEmit` shows **no new** errors. A pre-existing baseline exists in this category's drill clients (`speed` prop, `icon` prop) — diff against it; do not fix them, do not let them mask yours.
- [ ] Every re-slugged URL: old path 301s to new, new path returns 200. **Curl both.** Confirm no redirect resolves to itself.
- [ ] Zero internal links to any old slug — grep the built HTML, not the source
- [ ] Every drill page still renders its preview (a stale `drillPreviews.js` key fails silently)
- [ ] Target term present in **server-rendered** HTML for each page — `curl` the built output. The historic cause of 82 uncrawled URLs was content missing from server HTML.
- [ ] Word count for the 7 guide pages materially above the ~800 baseline, with the numbers shown
- [ ] Every claim in every new guide defensible; the four listed `reaction-time-test` claims gone
- [ ] `FOLDER_TO_STORAGE_KEY` resolves; `_v2` fallback retained
- [ ] Research output committed, every row dated and sourced
- [ ] `git diff --stat` confined to `reaction-speed` + the five shared-registry files + `next.config.js`

**After deploy:** Vercel's edge cache serves the *previous* build to plain `curl`. Bust the cache. Never grep for a phrase that also appears in the `<title>` — you will match the stale page and wrongly conclude success.

---

## 6. Deliverables

1. `scripts/keywords/out/reaction-speed-en-<date>.md` + `.csv`
2. Code changes per WS-1 through WS-5
3. `REACTION_SPEED_EN_CLEANUP.md` at repo root:
   - Measured volumes, with the calibration-control result
   - **Per-drill re-slug decision: RENAMED / RETARGETED / LEFT ALONE, with the number that drove it**
   - Every claim deleted or rewritten under WS-4, quoted
   - Word-count before/after for all 8
   - Pasted verification output, including failures
   - What you did not do, and why
   - A go/no-go on brief #3 (i18n), with reasoning
4. One commit per workstream, conventional format. Do not squash research with implementation.

---

## 7. Judgment Clause

The most likely correct outcome of WS-2/WS-3 is that **one or two of the three drills get re-slugged and the rest are left alone** — because the honest finding will be that nobody searches for their subject in any phrasing. Say that plainly when the data says it.

Renaming all three to hit a perceived quota, or inventing a plausible-sounding target for a drill with no demand, is the failure mode of this brief. A short, evidence-backed result beats a thorough-looking one built on numbers nobody measured.
