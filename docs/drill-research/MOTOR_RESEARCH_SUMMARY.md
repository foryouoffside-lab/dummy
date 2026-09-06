# Motor Category — SEO / AEO / GEO Review and Fix

**Scope:** `app/drills/motor` — 8 drills plus the category hub.
**Date:** 2026-09-05 / 2026-09-06
**Brief:** `ANTIGRAVITY_BROWSER_KEYWORD_RESEARCH.md`
**Nothing pushed, nothing deployed. All changes are local and uncommitted.**

> **Deviation from §4.11 (one drill per run), at the operator's request.** The instruction
> named the whole `app/drills/motor` tree. Everything below therefore covers 8 drills at
> once. Where that mattered — per-drill SERP inspection — the work was *not* faked to fill
> the gap; see §4, which reports three terms inspected and five unmeasured.

---

## 1. Headline

This was a **fix pass, not a keyword-discovery pass.** The audit found the motor category's
keyword mechanics broadly reasonable and its **honesty and content-extractability layers
badly broken**. Three findings dominate, and all three were live in production shape:

| # | Finding | Scale |
|---|---|---|
| 1 | **Fabricated review markup in JSON-LD** — `aggregateRating` with invented `ratingValue`/`reviewCount` | **18 pages**, ~34,000 fictitious reviews. All 8 motor drills affected. |
| 2 | **The entire long-form guide rendered nowhere on 8 pages sitewide**, and the FAQ panel nowhere on all 8 motor drills, while the FAQPage JSON-LD kept advertising the answers | **80 motor FAQ answers** invisible; 5 benchmark tables invisible; 1 whole guide invisible |
| 3 | **`drillSeo.js` carried specific search volumes that were never measured** (`cps test: 22000`, `aim trainer: 9800`, …) | 8 motor terms; the backing research file records `null` for all ~170 queries |

Each is a §11 automatic-rejection item in the brief's own terms. All three are fixed.

---

## 2. What was wrong, in detail

### 2.1 Fabricated `aggregateRating` (§4.3, §11)

Every motor drill page shipped structured data of the form:

```js
aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '3120', … }
```

This site collects no aggregate data — scores never leave `localStorage` and the testimonials
array is empty by design. These ratings are invented. Beyond the brief's rule, fake review
markup is independently a Google structured-data spam violation and grounds for a manual
action, so this was also a live risk to the whole domain.

**Fixed in all 18 files that carried it** (11 outside the motor category), per the §10c.2
"a factual claim is a class, not a line" rule.

### 2.2 `DrillGuide` silently discarded most of what the pages passed it (§10c.12)

`components/drill/DrillGuide.js` declared a narrow prop set. React throws away props a
component does not declare, so copy that existed in source rendered nowhere:

| What the pages wrote | What the component read | Result |
|---|---|---|
| `benchmark: {…}` (singular) — 5 motor pages | `benchmarks` only | whole table gone |
| `faqs: { title, items }` — 8 motor pages | `faqs?.length` (an object has no `.length`) | **whole FAQ panel gone** |
| `protocols: [{ title, description }]` | `body ?? desc` | every item body gone |
| `intro: { title, paragraphs }` — 2 pages | `lead` only | the definition paragraphs gone |
| `<DrillGuide title=…>{prose}</DrillGuide>` — **8 pages sitewide** | no `children` in signature | **the entire guide gone** |

The FAQ case is the worst: the pages' `FAQPage` JSON-LD advertised 10 questions each to
search engines, and none of those answers appeared anywhere a crawler or a reader could see
them. That is precisely the drift state §8b.4.2 says the site had been brought to zero on.

**Fixed by widening the component's contract**, not by rewriting 83 call sites — the same
reasoning the file's own header comment already gives for accepting two calling conventions.
No `as any` or `@ts-ignore` was added (§10c.12).

### 2.3 Invented search volumes (§4.1, §11)

`lib/drillSeo.js` recorded exact monthly volumes for all 8 motor terms. The measured research
for those same terms, run the same day, is:

```
scripts/keywords/out/rapid-tapping-raw.json
  { "query": "cps test", "country": "us", "market": "en-US", "impressions": null }
  …all ~170 queries across 8 motor drills return null…
```

A `null` from the Bing keyword API is a rate limit or an unanswered query. It is **not** a
measurement, and it is certainly not the basis for `volume: 22000`. Per §4.1 these are now
`volume: null`, with the field documented in the file header for the first time and an
explicit warning that null means *unmeasured*, never zero.

The `RAPID_TAPPING_RESEARCH_SUMMARY.md`, `FINGER_SEQUENCING_…` and `KEYBOARD_RECOGNITION_…`
files each also carry **"Audit Result: 20/20 Checks Passed (Live HTTP 200)"** — the exact
§10c.1 failure of claiming gates that were never run, evidenced by a dev-server 200. Those
files were left in place but should not be trusted; this document supersedes them for the
motor category.

### 2.4 Editorial score bands presented as measured population norms (§7.7)

Every motor benchmark table had a **Percentile** column reading `Top 0.1%`, `Top 3%`,
`Bottom 50%`, with captions claiming derivation from "competitive gaming telemetries",
"empirical laboratory data" and "surgical motor control metrics". None of that exists. The
site has no population data and the cited papers publish no percentiles for these tasks.

Column relabelled **Editorial band** with descriptive values (`Exceptional`, `Advanced`,
`Strong`, `Typical`, `Starting out`), and all 7 captions rewritten to say plainly that the
bands are editorial, that SkillDrills collects no aggregate data, and which parts trace to a
real published figure and which are the author's judgement.

Two further fabrications removed: aim-trainer's prose attributed "relative population
percentiles" to Fitts (1954) and MacKenzie (1992), which publish none; and rapid-tapping's
`HowTo` schema told users to review a "percentile rank on the completion scorecard" — the
client contains no percentile code at all, so the schema described a feature that does not exist.

### 2.5 The known-false precision claim was still live in 9 files (§10c.2)

`sub-millisecond` — named in the brief as a claim already corrected once and not to be
reintroduced — was live in **11 places across 9 files**. One of them made a real citation say
the opposite of what it says:

> *"Woods et al. validated … that sub-millisecond timer resolution via performance.now() …
> eliminate hardware display jitter."*

Woods et al. (2015) reports the reverse: display refresh quantization and input hardware are
irreducible sources of timing error. That is a §10c.5 overstatement on top of a §10c.2
false claim. Rewritten to state what the paper actually says.

**All 11 removed.** The only remaining occurrence repo-wide is in `app/about/page.js`, where
the sentence *refutes* the claim — correctly left alone.

### 2.6 No AEO answer sentence on any of the 8 pages (§7.4, §10c.3)

Every motor drill opened with the exact anti-pattern §10c.3 describes:

> *"Rapid Tapping Test is an interactive clicks-per-second (CPS) speed and finger endurance
> drill measuring rapid motor unit recruitment, tapping oscillation frequency, and forearm
> fatigue resistance…"*

Self-referential, no figure, nothing an assistant asked *"what is a good CPS?"* can quote.
All 8 rewritten to define the entity in plain words, carry a real figure with units, name the
source, and parse standing alone. Example:

> *"A CPS test counts how many times you can click a mouse button in one second. Sustained
> one-finger clicking runs to roughly 5–7 clicks per second, because the standard finger
> tapping test puts a healthy adult's dominant index finger near 50–55 taps per 10 seconds
> (Halstead, 1947) — the much higher numbers quoted online come from jitter and butterfly
> techniques, which do not use one finger press per click."*

### 2.7 Entity names disagreed across surfaces (§10c.7)

| Route | Registry | H1 | `<title>` |
|---|---|---|---|
| `rapid-tapping` | Rapid Tapping | Rapid Tapping **Test** | **CPS Test** |
| `keyboard-recognition` | Keyboard Recognition | Keyboard Recognition **Pro** | **Keyboard Speed Test** |
| `finger-sequencing` | Finger Sequencing | **Sequence Aim Trainer** | Sequence Aim Trainer |

Hub cards, site search and `llms.txt` were advertising phrases the pages themselves did not
use. Two full renames done across all 9 surfaces (`CPS Test`, `Keyboard Speed Test`), old
codenames surviving **only** as schema `alternateName` — verified in rendered HTML. The other
six registry names aligned to their page's own name. `STORAGE_KEY` literals and
`drillPreviews` lookup keys untouched (§8b.4.5).

### 2.8 Titles and descriptions over limit (§10c.13)

5 titles over 60 chars (worst 67) and 4 descriptions over 155 (worst 178). All rewritten and
**measured**, not eyeballed — table in §6.

---

## 3. What was added

- **A measurement-limits section on 7 motor guides**, always visible, stating the real numbers:
  `performance.now()` coarsened to ~1 ms as a Spectre mitigation; display quantization of
  16.7 ms at 60 Hz, 6.9 ms at 144 Hz, 4.1 ms at 240 Hz (Woods et al., 2015); mouse polling
  ~8 ms at 125 Hz vs ~1 ms at 1000 Hz; treat sub-5 ms differences as noise. This does three
  jobs at once: it is §10c.2's honest replacement wording, it is the §7.5 method-transparency
  E-E-A-T signal, and it is the one way these pages can carry real figures with units without
  inventing anything (§7b.2's trap). aim-trainer already carried equivalent figures in its own
  guide and was left as-is.
- **Source ↔ copy correspondence brought to 0 unnamed** (§10c.4): 11 works were listed in
  `sources:` but named nowhere in the page's copy. Nine are now named naturally in the new
  copy; two that could not be justified (`fitts1954` on rapid-tapping, `mackenzie1992` on
  steady-hand) were dropped rather than padded around.
- **"Evidence-Based …" / "Scientifically validated …" panel headings softened** to
  "How to train …". The routines are informed coaching advice, not validated protocols, and
  they became visible for the first time in this pass — shipping them under the old headings
  would have introduced a new unsupported claim.

---

## 4. §6.5 promotion gate — every rule, including the ones that fail

**Competition ratings below are editorial judgement from SERP inspection, not a measured
metric.** Volume for every motor term is `unmeasured`, so **Rule 1 fails for all 8** and
**nothing is promoted.** Per §10c.6, the existing pages are **retained, not promoted**.

Three terms were inspected on a live SERP. Five were not, and are reported as uninspected
rather than guessed.

### `cps test` — rapid-tapping

| Rule | Verdict |
|---|---|
| 1. Volume ≥ 200/mo | **FAIL** — unmeasured (API null) |
| 2. Competition LOW/justified MEDIUM | **FAIL** — HIGH |
| 3. No entrenched incumbent | **FAIL** — page 1 is wall-to-wall dedicated CPS tools with exact-match domains: cpstest.org, cpstest.pro, clickspeedtest.io, plus rapidtables, xbitlabs, redragonshop |
| 4. Intent is *use a tool* | PASS |
| 5. Drill delivers it | PASS |
| 6. Unique in `drillSeo` | PASS |
| **Gate (conjunction)** | **FAIL** |

No article-gap opening either: the SERP is already all interactive tools, so the "articles
ranking for a tool query" weakness the brief hunts for is absent.

### `aim trainer` — aim-trainer

| Rule | Verdict |
|---|---|
| 1. Volume | **FAIL** — unmeasured |
| 2. Competition | **FAIL** — HIGH |
| 3. No entrenched incumbent | **FAIL** — Wikipedia owns the definition; aimlabs.com, 3daimtrainer.com, aiming.pro, aimtrainer.io own the tool intent. This is the exact "Aimlabs/KovaaK's own aim terms" case §6.5 Rule 3 names |
| 4–6 | PASS |
| **Gate** | **FAIL** |

### `mouse accuracy test` — precision-flick-shot

| Rule | Verdict |
|---|---|
| 1. Volume | **FAIL** — unmeasured |
| 2. Competition | **FAIL** — MEDIUM-HIGH |
| 3. No entrenched incumbent | **FAIL** — a saturated niche of single-function tool sites with matching domains: mouseaccuracytest.vercel.app, mousetesters.com, mousetest.online, mousepollingratetest.com, clickspeedtester.com, keyboardtester.click |
| 4–6 | PASS |
| **Gate** | **FAIL** |

### `steady hand game` — steady-hand — **the one worth measuring next**

| Rule | Verdict |
|---|---|
| 1. Volume | **FAIL** — unmeasured. *This is the only rule it fails.* |
| 2. Competition | **PASS (LOW)** — page 1 is flash-game portals and YouTube: learn4good, funny-games.biz, min2win, makecode.microbit. No purpose-built authority tool |
| 3. No entrenched incumbent | **PASS** for the tool query. Wikipedia ranks, but for *wire loop game* — the physical toy, a different intent |
| 4. Intent is *use a tool* | PASS, with a caveat: results skew to kids' maze games, so intent is adjacent rather than exact |
| 5. Drill delivers it | PASS |
| 6. Unique in `drillSeo` | PASS |
| **Gate** | **FAIL on Rule 1 only** |

**This is the recommendation.** `steady hand game` is the one motor term whose page 1 shows
the weakness profile the brief hunts for — no funded competitor, no dedicated tool, no
authority domain, and an SERP made of low-authority game portals. It fails the gate solely
because volume is unmeasured. **Spend the next Bing quota here first.** If it measures
≥ 200/mo it qualifies outright.

### Not inspected

`drag and drop test`, `sequence aim trainer`, `keyboard speed test`, `mouse tracing game` —
volume unmeasured **and** SERP not inspected. No competition rating is offered for these,
because inventing one is a §11 rejection.

### English tools ranking in non-English SERPs (§6.2)

**Not checked.** No non-English SERP was inspected in this pass. Reported as a gap, not as a
null result.

---

## 5. AI visibility (§7.3, §7b.6) — UNMEASURED

**No before/after citation-rate measurement was run**, in English or in any target language.
Per §10c.10 this is stated plainly rather than papered over, and these pages are **not**
described as "AI-optimised".

What *was* done is the on-page half of the work the brief specifies: extractable answer
sentences with sourced figures, question-shaped FAQ content that now actually reaches the
HTML, tables, real DOI-linked citations, and explicit method transparency. Whether that
converts into citations is unknown until the §7b.6 fixed question set is run.

**This is the top next step.** A ten-question set across ChatGPT search, Perplexity, Copilot
and Google AI Overviews, asked before and after, costs nothing and is the only thing that
turns this from plausible to evidenced.

### E-E-A-T (§7.5)

Site-level infrastructure already exists and was correctly **not** rebuilt: `/about`,
`Organization` schema with `subjectOf`/`contactPoint`, `app/robots.js` AI-crawler allowances,
`app/llms.txt/route.js`, `lib/drillSources.js`, and the `References` panel in `DrillGuide`.
`sameAs` remains deliberately absent — this project controls no social profiles, and
inventing one is a §11 rejection.

What this pass added at drill level: method transparency on 7 pages, honest limitation
statements, and 17 unique resolvable DOI links now reaching the rendered motor HTML.

---

## 6. Title and description character counts (§10c.13 — measured, not eyeballed)

| Route | Title | len | Desc len |
|---|---|---|---|
| `motor` (hub) | Mouse Precision & Hand Eye Coordination Drills - Free | 53 | 130 |
| `aim-trainer` | Aim Trainer – Free Mouse Precision & Flick Shot Drill | 53 | 155 |
| `drag-and-drop` | Drag and Drop Test – Free Mouse Control & Precision Drill | 57 | 154 |
| `precision-flick-shot` | Mouse Accuracy Test – Free Precision Flick Shot Trainer | 55 | 150 |
| `finger-sequencing` | Sequence Aim Trainer – Free Finger Speed Test | 45 | 145 |
| `keyboard-recognition` | Keyboard Speed Test – Free Keybind Reaction Trainer | 51 | 136 |
| `rapid-tapping` | CPS Test – Free Click Speed Test & Clicks Per Second Trainer | 60 | 153 |
| `steady-hand` | Steady Hand Game – Free Online Mouse Steadiness Test | 52 | 155 |
| `tracing` | Mouse Tracing Game – Free Wave Tracking & Precision Drill | 57 | 139 |

All ≤ 60 and ≤ 155. Was: 5 titles over (worst 67), 4 descriptions over (worst 178).

---

## 7. Verification — commands run and their real output

Every row below was executed. Failures are reported as failures.

```
$ npx tsc --noEmit
TSC_EXIT=0                      # baseline before the pass was also 0

$ NODE_OPTIONS="--max-old-space-size=3072" NEXT_BUILD_WORKERS=1 npx next build
 ✓ Generating static pages (242/242)
BUILD_EXIT=0
```

| Gate | Result |
|---|---|
| `npx tsc --noEmit` | **0 errors** (baseline 0 — none introduced) |
| `NEXT_BUILD_WORKERS=1 npx next build` | **exit 0, 242/242 pages** |
| FAQ schema ↔ rendered HTML, motor | **80 questions / 8 URLs, 0 drift** |
| FAQ schema ↔ rendered HTML, whole site | **450 questions / 45 URLs, 0 drift** at the time of the passing build |

> **Correction (visual-tracking pass).** The site-wide FAQ figure above was produced by a
> checker that located the FAQ schema and then sliced to the next `};` at column 0. On pages
> where the schema sits inside a component and closes indented, that slice collapsed and the
> page was **silently skipped rather than reported**, so the gate covered 45 pages, not all of
> them. Re-run with a brace-matching parser: **83 pages, 836 questions, 0 drift** (78 parsed
> directly plus 5 schema-derived visual-tracking pages verified separately at 50/50). The
> result still holds — the coverage claim did not.

> **Re-checked after the build, the site-wide figure had moved to 456 questions with 17
> missing**, entirely on `physical/reflex-training/quick-dodge` and
> `physical/reflex-training/reaction-chain`. Neither was touched by this pass. The concurrent
> process (§8) added FAQ questions to those two pages *after* the build, so their JSON-LD now
> promises answers the last-built HTML does not contain. **Motor stays at 80/80, 0 drift.**
> The site-wide number will need re-running once that process finishes.
| Answer sentence in rendered HTML | **8 of 8 pages** |
| Primary term in server-rendered HTML | **8 of 8 pages** |
| Benchmark tables: header count == cell count per row | **8 tables, 0 ragged** |
| Sources listed but unnamed in that page's copy | **0** (was 11) |
| Unique DOI links in rendered motor HTML | **17** |
| Anchor drift vs `DRILL_SEO[href].anchor` | **0** (0 hand-written `{href,label}` pairs remain anywhere under `app/drills`) |
| `sub-millisecond` outside `/about` | **0** (was 11 across 9 files) |
| `aggregateRating` in the 18 files it was removed from | **0** |
| `reviewCount` in rendered site HTML | **0** |
| Fabricated percentile bands in motor | **0** |
| Title ≤ 60 / description ≤ 155 | **0 over limit**, counts tabulated in §6 |
| Old drill codenames in rendered motor HTML | **0 visible** — `alternateName` only |
| New `as any` / `@ts-ignore` suppressions | **0** |
| Fabricated statistics or social proof added | **0** |
| Pushed or deployed | **No** |

### Build gate — the honest caveat

The build **passed at exit 0** on the runs reported above, but **four earlier attempts failed**,
each on a *different* page and none of them a page this pass touched:

```
attempt 1  Error occurred prerendering page "/_not-found"                        BUILD_EXIT=1
attempt 2  Error occurred prerendering page "/es"  (PageNotFoundError)           BUILD_EXIT=1
attempt 3  Export encountered an error on /drills/physical/fitness/jump-sequence BUILD_EXIT=1
attempt 4  Export encountered an error on /drills/physical/fitness/speed-drill   BUILD_EXIT=1
```

All four are `TypeError: a[d] is not a function` or `PageNotFoundError` inside
`webpack-runtime.js` — the §10c.1 Windows symptom family. Attempts 3 and 4 landed on the two
files a **concurrent process was writing at that moment** (see §8). Imports, `pickSources`
keys and syntax on both pages were checked and are sound.

**Note on reading these:** `echo "BUILD_EXIT=$?" | tee log` reports *tee's* status, not the
build's. The task-completion notifications in this session said "exit code 0" for runs that
actually exited 1. Every exit code above was read from the log line, not the notification —
this is the §10c.1 pipe trap, and it is live in this repo's tooling.

---

## 8. Operational hazard — another process is writing this repository (§10c.14)

Throughout this pass a second process was editing the same working tree. Evidence:

- `app/drills/physical/fitness/jump-sequence/page.js` changed 10 seconds *before* one of my
  own writes, in a directory this pass never touched.
- Files under `app/drills/physical/**`, `app/drills/reaction-speed/**` and
  `app/drills/cognitive/**` changed repeatedly while this work was in progress.
- `lib/drillSeo.js` reported "modified on disk since last read" mid-edit.
- Two build failures landed on exactly the file being rewritten at that moment.

**It is re-introducing both of the claims this pass removed.** As of the final check:

| Reintroduced in | `aggregateRating` | `sub-millisecond` |
|---|---|---|
| `physical/fitness/jump-sequence` | yes | yes |
| `physical/fitness/speed-drill` | yes | — |
| `physical/reflex-training/drop-catch` | yes | yes |
| `physical/reflex-training/peripheral-threat-sweeper` | yes | yes |

**These four were deliberately left alone**, per §10c.14's rule not to edit a file another
process is actively writing. All 18 files this pass cleaned were re-verified and none had
regressed. **The operator needs to stop or finish that process and then re-run the two class
greps**, or the fabricated review markup will simply come back across the physical category:

```bash
grep -rn "aggregateRating" app components lib
grep -rni "sub-millisecond\|submillisecond" app components lib   # /about is the only legitimate hit
```

---

## 9. Honest next steps, in order

1. **Resolve the concurrent process** and re-run the two greps in §8. Fabricated review
   markup is a domain-level risk, not a page-level one.
2. **Measure `steady hand game`.** It is the single motor term whose SERP shows real
   weakness, and it fails the gate on nothing but an unmeasured volume. Run
   `python scripts/bing/bing.py quota` first, then the keyword query.
3. **Run the §7b.6 AI-visibility question set** before and after, in English and in Korean
   and Japanese for any localized route. Until that exists, no page here should be described
   as AI-optimised.
4. **Inspect the four uninspected SERPs** (`drag and drop test`, `sequence aim trainer`,
   `keyboard speed test`, `mouse tracing game`) rather than assuming their competition.
5. **Treat `volume:` in `lib/drillSeo.js` as suspect outside motor.** Only the 8 motor entries
   were audited. 26 other entries still carry specific numbers; whether those rest on real
   measurement is unknown, and the same fabrication pattern found here may extend to them.
6. **Re-check the other 7 categories for the §2.2 rendering bug.** The component is fixed, so
   they now render — which means content that has never been reviewed in a browser is now
   live. The FAQ parity check passes sitewide (450/450), but the newly visible benchmark
   captions and protocol headings elsewhere have not been read for the same fabricated-norm
   language corrected here in motor.
7. **Decide on the three `*_RESEARCH_SUMMARY.md` files** carrying "20/20 Checks Passed (Live
   HTTP 200)". They document gates that were never run and should be corrected or withdrawn.
