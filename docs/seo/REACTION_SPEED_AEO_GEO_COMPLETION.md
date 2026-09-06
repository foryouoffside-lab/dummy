# Reaction Speed — AEO/GEO Completion Pass

**Scope:** `app/drills/reaction-speed` (8 drills + hub), plus the site-level E-E-A-T
gaps that cap all of them.
**Date:** 2026-09-05
**Brief:** `ANTIGRAVITY_BROWSER_KEYWORD_RESEARCH.md` §7, §7b, §8b, §9
**Status of prior work:** the SEO mechanics were already correct. This pass closed
the AEO/GEO layer, which had landed on one page out of eight, and fixed two real
code defects found while verifying it.

---

## 0. What this pass does not claim

It does not make the site rank #1, and no on-page work can promise that. The
brief's own §3 says the constraint here is domain authority at ~80 clicks/month,
not page quality, and §7b.3 notes that Google AI Overviews cite pages **already in
the organic top 10** — classic ranking is the gate for that channel regardless of
how quotable a page is.

What this pass does is make each page the clearest, most verifiable answer to its
query, which is the precondition for both. Per §11, no before/after citation-rate
measurement has been run, so **nothing here is claimed as "AI-optimised"** — the
§7b.6 measurement is listed as the operator's next step.

---

## 1. Corrections to shipped content

### 1.1 False-precision claim removed site-wide (§7.5, §11)

The brief names this exact claim as one not to reintroduce. Commit `76fda64` had
removed it from `reaction-time-test` only; it survived in 8 other places.

| File | Was |
|---|---|
| `reaction-speed/fps-tracking-trainer/page.tsx` ×2 | "sub-millisecond chronometry" / "sub-millisecond precision" |
| `reaction-speed/reflex-training-drill/page.tsx` ×2 | same |
| `reaction-speed/saccadic-gallery/SaccadicGalleryClient.tsx` | "sub-millisecond chronometry" |
| `reaction-speed/visual-tracking-speed-test/VisualTrackingSpeedTestClient.tsx` | "sub-millisecond precision" |
| `fps/180-degree-awareness/page.js` | "sub-millisecond performance.now() timestamps" |
| `fps/angle-hold-trainer/page.js` | "sub-millisecond click chronometry" |
| `fps/anti-zigzag-movement-trainer/page.js` | "sub-millisecond performance.now() chronometry" |
| `fps/FPSHubClient.js` | "sub-millisecond physics loops" |

`grep -rn "sub-millisecond" app components lib` now returns **0**.

Each was replaced with the honest version the brief asks for: browser timers are
coarsened as a Spectre mitigation (~1 ms), displays quantize to the refresh
interval, mouse polling adds its own lag, so **differences under ~5 ms are noise**.

### 1.2 Yang et al. (2025) overstated — corrected

The citation is real and was verified: *The aiming advantages in experienced
first-person shooter gamers: Evidence from eye movement patterns*, Computers in
Human Behavior 165:108573, `10.1016/j.chb.2025.108573`.

But `market-doors-pursuit` attributed the "0-fixation-1-saccade" pattern to
**"elite FPS players"** and **"expert tactical shooter athletes"**, in both the
FAQ schema and a technique panel. The study compared 28 *experienced* players
against 35 non-players, reports the pattern in **over 40% of trials** rather than
universally, and states in its own limitations that the sample **excluded elite
and professional esports players**. Both instances now say exactly that.

This is the §11 "citation that does not say what you claim" failure, caught before
publication.

---

## 2. AEO — the extractable answer (§7.4, §8b.1)

Only `reaction-time-test` led with a quotable fact. Four pages opened with
"…is an interactive ocular psychomotor drill engineered to…" — build-up, which is
precisely what §7.4 says not to do.

All seven now lead with a self-contained sentence carrying real numbers and units:

| Drill | Opening answer |
|---|---|
| reaction-game | 200–250 ms typical visual reaction (Kosinski, 2008); interception adds tracking time on top |
| reflex-training-drill | 200–250 ms for one target; reaction rises with the number of alternatives (Hick, 1952) |
| fps-tracking-trainer | smooth pursuit tracks accurately to ~30°/s, then needs catch-up saccades (Krauzlis, 2004) |
| visual-tracking-speed-test | ~30°/s pursuit limit; catch-up saccade ~100–130 ms after a direction change (Rashbass, 1961) |
| saccadic-gallery | saccades reach 200–700°/s, last 20–40 ms (Rayner, 1998) |
| barrier-sequence-pursuit | 200–250 ms to see, decide and click while network delay favours the peeker |
| market-doors-pursuit | each gaze shift is a 20–40 ms saccade plus ~200 ms to react to what it reveals |

Headers were also normalised to the reference page's house style (§8b.1): `h1`
at `text-2xl sm:text-3xl font-black`, answer at `text-[13px]`, wrapper
`flex flex-col gap-1`.

---

## 3. GEO — Cite Sources, done properly (§7b.1, §7b.2)

"Cite Sources" sits in the study's 30–41% band, and it is the one GEO tactic this
site can use honestly: it has no data of its own, so it cites other people's
properly instead of inventing statistics to chase the +41% Statistics lift.

Before this pass: **20 named works, zero links.** A reader could not check a single
figure.

- **New:** `lib/drillSources.js` — 20 verified entries, 19 with DOIs. `kosinski2008`
  is deliberately link-less: the Clemson URL is dead and there is no stable DOI, so
  the citation stays and the link is omitted rather than invented.
- **New:** a `References` panel in `components/drill/DrillGuide.js`, rendering
  authors / year / title / venue / DOI, with a closing note stating that SkillDrills
  collects no aggregate data and every figure comes from the listed work.
- **Wired** into all 8 drills, 2–7 sources each.

**Invariant enforced:** every wired source is named in that page's own copy.
Verified programmatically — 0 unnamed. `appelbaum2018` was dropped from
`barrier-sequence-pursuit` rather than bolting on a sentence to justify it.

### Methodology paragraph (§7.5)

All 8 guides now carry a "How this is measured" paragraph naming
`performance.now()`, the ~1 ms timer coarsening, per-refresh quantization
(16.7 / 6.9 / 4.1 ms at 60 / 144 / 240 Hz, Woods et al. 2015), polling lag, and
the ~5 ms noise floor — plus the instruction to compare your own runs on the same
hardware. Stating the limit is a stronger trust signal than claiming precision.

---

## 4. Entity consistency (§7b.4)

Three drills carried three different names across three surfaces, so hub cards,
site search, `llms.txt` and the CollectionPage schema advertised one name while
the page targeted another.

| Route | Registry name (was → now) | H1 / title / anchor |
|---|---|---|
| barrier-sequence-pursuit | Barrier Sequence Pursuit → **Jiggle Peek Trainer** | Jiggle Peek Trainer |
| market-doors-pursuit | Market Doors Pursuit → **Corner Checking Trainer** | Corner Checking Trainer |
| saccadic-gallery | Saccadic Gallery → **Saccadic Eye Exercises** | Saccadic Eye Exercises |

The hub's `hasPart` also carried a fourth set of variants
("Cover Peeking Reflex Drill (Barrier sequence)"), now aligned.

**Slugs were deliberately not changed.** Re-slugging would touch five maps plus a
301 in `next.config.js`, and the brief warns that case-normalising redirects have
already produced self-redirects here. The URL is a weak signal next to title, H1
and anchor text, all of which now agree. Flagged for the operator as an optional
follow-up, not a defect.

### Anchor-text drift fixed

`saccadic-gallery` received five inbound guide links under **three** different
anchors — "Saccadic Gallery", "Saccadic Eye Gallery" — none of them its canonical
one. `RelatedDrills` reads `drillSeo` and was already correct; the hand-written
`related` arrays in each guide bypassed it. All 7 drifted anchors across 6 files
are now reconciled against `DRILL_SEO`, including two outside this category
(`rapid-tapping`, `flick-shot-training`).

---

## 5. E-E-A-T — the site was anonymous (§7.5)

The single largest uncapped gap: no About page, no contact route. The footer
carried only Privacy / Terms / Delete data.

**New: `/about`.** Written to be honest about how little there is to say about the
operator, and to do well the part most tool sites skip:

- What the site is, in one extractable opening sentence
- **How the drills measure** — `performance.now()`, and the three things it cannot
  separate out (timer coarsening, display quantization, input polling), ending at
  the ~5 ms noise floor
- What is never collected, and why there will therefore never be player counts or
  ratings
- Where the numbers come from, and an explicit invitation to report a bad citation
- A "not medical or diagnostic" section (§4.7)

**No fabrication:** no founder name, no team size, no credentials, no `sameAs`.
Adding a real byline would strengthen this further and only the operator can
supply one.

Wired into: footer `SITE_LINKS`, `app/sitemap.js` (priority 0.5, above the legal
pages), `llms.txt`, and the `Organization` schema via `subjectOf` + `contactPoint`.

`llms.txt` also now states the measurement limits and the no-aggregate-data fact
directly, so an engine summarising the site gets the caveat without fetching a
drill page.

---

## 6. Code defects found while verifying

### 6.1 All 15 TypeScript errors in the project were in this folder → now 0

Masked by `typescript.ignoreBuildErrors: true`, so they never failed a build.
Two root causes, both of which were hiding real bugs:

**`FpsStartCard` — 8 errors.** The component is a `.js` file containing JSX, which
`tsc` does not parse for props, so every `.tsx` drill saw `ComponentType<{}>`.
Drills worked around it with `as React.ComponentType<any>` casts — which silenced
the second, real problem: **`rules` and `stats` were never in the signature at
all.** All 66 drills using the card have always passed both, React dropped them
silently, and the start card rendered as an icon, a title and a button over an
empty canvas. The ACCENTS map still carried the unused `chipBg`/`chipBorder`/
`chipText` tokens those rows were meant to use.

Fixed by declaring and rendering both props, plus a hand-written
`components/drill/FpsStartCard.d.ts` so the contract is checked rather than cast
away.

> ⚠️ **Operator note:** commit `c1d1ca2` reverted an earlier attempt at this
> (`045c0f7`) with no stated reason. If that revert was because you disliked how
> the filled card looked, this change will bring it back — the styling here is
> more restrained (hairline rows per §8b.2) but it is the same idea. Revert just
> `components/drill/FpsStartCard.js` if you want the minimal card; the `.d.ts` and
> the type fix can stay either way.

**`generateShareCard` — 7 errors.** Two call shapes grew in parallel: 51 drills
pass a `rating` object, **15 pass flat `rank`/`rankName`** — which the function
never accepted. Those 15 fell through to the `'C', 'Keep Going'` default, so
**a player who scored an S rank shared an image saying C.** `speed`, `level`,
`date` and `url` were likewise passed and dropped.

Fixed: both shapes accepted, `speed` rendered where supplied, all optional
parameters defaulted so callers type-check.

### 6.2 `npx next build` fails on this machine — not a content defect

Every prior summary claimed verification PASS via a dev-server
`Invoke-WebRequest` 200, which is not the §9 gate. Running the real gate:

- Default (parallel) build: **exit 1**, failing in "Collecting page data" with a
  *different* symptom each run — `PageNotFoundError: /de/drills/visual` and
  `/delete-account` once, `MODULE_NOT_FOUND ./5611.js` from a jest-worker the
  next. Both routes exist on disk.
- `NEXT_BUILD_WORKERS=1 npx next build`: **exit 0**, 241 pages.

That signature is a parallel-worker race on Windows, not a fault in any page.
**Use `NEXT_BUILD_WORKERS=1` for verification on this machine** until it is
diagnosed; Vercel's Linux builders are unlikely to hit it, but the gate cannot be
honestly ticked locally without the flag.

---

## 7. Drill function and difficulty scaling — verified

Curves evaluated numerically from `lib/drillDifficulty.js` at L1→L80.

- **All parameters monotonic.** No reversals in any of the 8 drills.
- **Runs are bounded.** Target time-to-live falls below human visual reaction
  (~200–250 ms) at roughly L22–25 — 161 ms at L25, 99 ms at L40 — so a perfect
  player still loses. This is the design intent of `ramp(start, floor, p)`:
  the floor sits below human capability.
- **Combo heat saturates.** `getComboMultiplier` caps at 3.0 (combo ≥ 50), so
  streaks compress difficulty without spiralling. All parameters keep their
  `Math.max` guards (radius ≥ 6, hitPad ≥ 4).
- **Endless clock terminates.** Starting at 45 s with `TIME_PER_HIT` extensions,
  a simulated run ends and discriminates skill:

  | Player reaction | Run length | Peak level | Hits |
  |---|---|---|---|
  | 180 ms | 180 s | 23.4 | 224 |
  | 220 ms | 164 s | 20.8 | 198 |
  | 260 ms | 152 s | 18.8 | 178 |

- **Grade mapping correct.** `getFpsScoreGrade()` returns `.grade`, and all 8
  drills map it to `.letter` at the call site — the site-wide grade-letter bug
  does not recur here.

---

## 8. Verification

| Gate | Result |
|---|---|
| `npx tsc --noEmit` | **0 errors** (was 15, all in this folder) |
| `NEXT_BUILD_WORKERS=1 npx next build` | **exit 0**, 242 pages (was 241; +`/about`) |
| FAQ schema ↔ rendered HTML parity, 8 drills + hub | **0 drift**, 101 questions |
| Accordion invariant — no `{isOpen && children}` | **clean**; `hidden` throughout |
| Target term in server-rendered HTML | all 8 present, body density 0.2–0.9% |
| hreflang reciprocity | route-aware; `ROUTE_LOCALES` matches on-disk pages |
| Fabricated social proof | none |
| `sub-millisecond` site-wide | **0** |
| Every wired source named in copy | **0 unnamed** |
| Title ≤ 60 / description ≤ 155 | all 8 within limits |
| DOI links in rendered HTML | 2-12 per drill, 44 unique across the category |
| Old codenames in rendered site | **0** ("Barrier Sequence Pursuit", "Market Doors Pursuit") |
| `/about` renders with methodology + AboutPage schema | yes |

---

## 9. Honest next steps for the operator

1. **Run the §7b.6 before/after measurement.** Ask the same 10 questions across
   ChatGPT search, Perplexity, Copilot and Google AI Overviews — in English, and
   in Korean and Japanese for the localized routes — and record who gets cited.
   Without it, no claim about AI visibility is evidence-based. This pass made the
   pages more quotable; it did not measure whether they are quoted.
2. **Add a real byline to `/about`** if you are willing to be named. An identified
   maintainer is a materially stronger E-E-A-T signal than "independently built",
   and it is the one thing on that page only you can supply.
3. **Decide the `FpsStartCard` question** (§6.1) — it was reverted once before.
4. **Diagnose the parallel-build failure** so §9's gate can be run without a flag.
5. **Slugs** for the three renamed drills remain the internal codenames. Optional;
   weigh a 301 against the redirect trap the brief documents.
6. Nothing was pushed or deployed. All changes are local and uncommitted.
