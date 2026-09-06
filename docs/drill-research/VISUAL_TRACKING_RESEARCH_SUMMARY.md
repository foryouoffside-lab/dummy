# Visual-Tracking Category — SEO / AEO / GEO Review and Fix

**Scope:** `app/drills/visual-tracking` — 15 drills plus the category hub.
**Date:** 2026-09-06
**Brief:** `ANTIGRAVITY_BROWSER_KEYWORD_RESEARCH.md`
**Companions:** `MOTOR_`, `VISUAL_`, `PHYSICAL_RESEARCH_SUMMARY.md`
**Nothing pushed, nothing deployed. All changes are local and uncommitted.**

---

## 1. Headline

**This is the best-built category on the site**, and it needs saying plainly: zero fabricated
ratings, zero `sub-millisecond` claims, zero invented percentiles, zero invented volumes, no
"Evidence-Based" over-claiming, and answer sentences that already defined the entity and named
a real source. Nothing in §2 of the previous three summaries applies here.

What it had instead were three structural problems, one of which also invalidates a number I
reported in the earlier passes.

| # | Finding | Scale |
|---|---|---|
| 1 | **`guides.js` is dead code** — 390 lines of purpose-written per-drill copy that nothing imports and that appears nowhere in the build | 15 headings, 30 intros, 60 steps, 45 FAQs, 45 cross-links |
| 2 | **45 of 45 cross-link anchors in that file were the drill's internal codename**, not its canonical `DRILL_SEO` anchor | §10c.8 |
| 3 | **All 15 titles led with the codename** and put the researched term second | §8.2 |
| 4 | **0 of 15 answer sentences carried a figure with units** | §10c.3(b) |
| 5 | **My own FAQ-parity gate was silently skipping pages** — including all 15 here | see §4 |

---

## 2. What was wrong

### 2.1 `guides.js` renders nowhere

`app/drills/visual-tracking/guides.js` is 390 lines of genuinely good, drill-specific copy.
Its own header explains why it exists:

> *"The 15 visual-tracking pages previously shared a single title suffix and ~150 words of
> near-identical prose, measuring 0.77 mean pairwise similarity, and every one of them was
> stuck at 'Discovered - currently not indexed' in Search Console."*

**Nothing imports it.** Every `page.tsx` defines its own local `const guide = {...}` and passes
that to `<DrillGuide>`. A grep for `GUIDES` across `app`, `components` and `lib` returns
nothing outside the file itself, and no phrase from it appears anywhere in `.next`.

**The good news, measured rather than assumed:** the duplication problem it was written to
solve is *already fixed* in what actually ships. I shingled the rendered guide text of all 15
pages and computed pairwise Jaccard similarity:

```
  pages compared:        15
  mean pairwise Jaccard: 0.056
  highest pair:          0.229  triangular-pursuit  vs  zig-zag-path-pursuit
```

Against the 0.77 the header describes. So `guides.js` is not a lost fix — it is a **dead
alternative implementation** of a job the local guide objects already do well.

**I did not delete it.** That is 390 lines of usable content and the call is yours: either wire
it in (replacing the local objects) or remove it. Leaving it is the one option with a real
cost — it reads as live content and will mislead the next pass, as it briefly misled this one.

### 2.2 45 drifted cross-link anchors (§10c.8)

Every `related` entry in `guides.js` hand-typed the target's internal codename:

| href | label written | canonical `DRILL_SEO` anchor |
|---|---|---|
| `triangular-pursuit` | Triangular Pursuit | Eye Tracking Accuracy Drill |
| `ghosting-suppress-pursuit` | Ghosting Suppress Pursuit | Eye Fixation Stability Training |
| `momentum-teleport-pursuit` | Momentum Teleport Pursuit | Anticipatory Eye Tracking Drill |
| `infinity-pursuit` | Infinity Pursuit | Figure-8 Eye Tracking Exercise |

45 of 45 drifted. Anchor text is one of the very few keyword levers this site has, so that is
45 internal links spent on phrases with no search demand.

**Fixed structurally rather than by retyping** — retyping is how they rotted in the first
place. Each block is now `related: rel('slug', 'slug', 'slug')`, where `rel` reads the anchor
out of `DRILL_SEO` at module load:

```js
const rel = (...slugs) =>
  slugs.map((slug) => {
    const href = `${VT}/${slug}`;
    return { href, label: DRILL_SEO[href]?.anchor ?? slug };
  });
```

The labels no longer exist to drift. **Caveat, stated plainly: because `guides.js` renders
nowhere (§2.1), this fix has no effect on the live site today.** It matters when the file is
wired in, and it removes 45 wrong strings either way.

The 30 `related` pairs that *are* live — in five `page.tsx` files — were already correct and
still measure 0 drift.

### 2.3 Titles led with an internal codename (§8.2)

All 15 titles put the drill's codename first and the researched phrase second:

```
before   Ghosting Suppress Pursuit - Eye Fixation Stability Training
after    Eye Fixation Stability Training - Free Online Drill

before   Triangular Pursuit - Eye Tracking Accuracy Drill
after    Eye Tracking Accuracy Drill - Triangular Pursuit
```

"Ghosting Suppress Pursuit" has no search demand; "Eye Fixation Stability Training" is the
researched term and is what `DRILL_SEO` targets. §8.2 puts the primary term first. All 15
swapped, 55 title occurrences updated across `metadata`, `openGraph`, `twitter` and schema
names. **This is a title rewrite, not an entity rename** — the H1, registry name and schema
`name` keep the drill's identity, so §10c.7's nine-surface sweep does not apply.

The hub also carried a `| SkillDrills` suffix that the root layout's `'%s'` template does not
add anywhere else; removed (§10c.13).

### 2.4 No figures in the answer sentences (§10c.3)

The openings were already good — they defined the concept and named a real source:

> *"Smooth pursuit is the continuous voluntary movement of the eyes to keep a moving target
> centered on the fovea (Rashbass, 1961)."*

But **0 of 15 carried a number with units**, which is requirement (b). One sourced figure was
appended to each, drawn only from works already in that page's own `sources: pickSources(...)`
list — so no page now names a source it does not list, or lists one it does not name:

- ten pages cite Krauzlis (2004) → *"pursuit tracks accurately up to roughly 30°/s; past that
  the eye falls behind and needs catch-up saccades"*
- `split-screen-tracking` → four or five trackable targets (Pylyshyn & Storm, 1988)
- `peripheral-ping-pursuit` → ~200 ms saccade initiation (Findlay & Walker, 1999)
- `sine-wave-pursuit` → pursuit gain near 1.0 at low speed (Robinson, 1965)
- `staircase-step` → vertical pursuit worse than horizontal (Rottach et al., 1996) plus ~100 ms
  pursuit latency (Lisberger, 2010)
- `strobe-prediction-pursuit` → the drill's own verifiable ratio (hidden one third of every
  cycle: 60 frames visible, 30 dark) plus the occlusion finding (Bennett et al., 2007)

15 of 15 now carry a figure.

---

## 3. §6.5 promotion gate

No `volume:` figures exist anywhere in the `VISUAL TRACKING` block of `lib/drillSeo.js` — this
category never had invented numbers to remove. Rule 1 therefore fails on *unmeasured* for all
15, and **nothing is promoted**. One term was inspected on a live SERP.

### `smooth pursuit eye exercise` — constant-slow-pursuit — **the strongest opening found so far**

| Rule | Verdict |
|---|---|
| 1. Volume ≥ 200/mo | **FAIL** — unmeasured. *The only rule it fails.* |
| 2. Competition LOW | **PASS** — page 1 is Wikipedia, two USPTO patent PDFs, an arXiv paper, two YouTube videos, an occupational-therapy blog (theottoolbox.com) and one small free tool (eyedottrainer.com). Patents and preprints ranking is the signature of a thin commercial SERP |
| 3. No entrenched incumbent | **PASS** for the tool intent — Wikipedia owns the definition only, and there is no funded competitor |
| 4. Intent is *use a tool* | PASS, with a split: some of the demand is vision-therapy/OT practitioners looking for exercises, which this drill serves honestly |
| 5. Drill delivers it | PASS |
| 6. Unique in `drillSeo` | PASS |
| **Gate** | **FAIL on Rule 1 only** |

This has the same profile as `steady hand game` in the motor pass and is arguably better: no
exact-match domains, no app-store listings, no funded competitor. **Together those two are
where the next Bing quota should go.**

### Not inspected

The other 14 terms. No competition rating is offered for them, because inventing one is a §11
rejection.

---

## 4. A correction to the three earlier summaries

**My FAQ-parity checker was silently skipping pages, and I reported its output as a site-wide
result.** It located the FAQ schema then sliced to the next `};` at column 0. On pages where
the schema sits inside a component and closes indented, that slice collapsed to two
characters, zero questions were parsed, and the page was **skipped without being reported as
skipped** — the same failure mode §10c.1 warns about, in my own tooling.

All 15 visual-tracking pages were in that blind spot.

Re-run with a brace-matching parser that reports skips explicitly:

| | reported earlier | actual |
|---|---|---|
| pages measured | 45 | **83** |
| questions measured | 456 | **836** |
| drift | 0 | **0** |

(78 pages parsed directly, plus the 5 visual-tracking pages that build their schema *from*
`guide.faqs` — verified separately at 50/50, and structurally incapable of drifting since the
schema and the visible panel read the same object.)

**The result stands; my claim about its coverage did not.** A correction note has been added to
all three earlier summaries.

---

## 5. Verification

```
$ npx tsc --noEmit
TSC_EXIT=0

$ NODE_OPTIONS="--max-old-space-size=3072" NEXT_BUILD_WORKERS=1 npx next build
 ✓ Generating static pages (242/242)
BUILD_EXIT=0
```

| Gate | Result |
|---|---|
| `npx tsc --noEmit` | **0 errors** |
| `NEXT_BUILD_WORKERS=1 npx next build` | **exit 0, 242/242 pages** |
| FAQ schema ↔ rendered HTML, whole site (corrected parser) | **836 questions / 83 URLs, 0 drift** |
| Answer sentence carries a figure with units | **15 of 15** (was 0) |
| Anchor drift vs `DRILL_SEO[href].anchor` | **0** — 45 hand-typed labels eliminated |
| Canonical anchors in rendered HTML | present; **0** codename link labels remain |
| Title ≤ 60 / description ≤ 155 | **0 over limit** (longest title now 53) |
| `aggregateRating` / `sub-millisecond` / percentiles / `KD:` in this category | **0** — none were ever present |
| Rendered guide copy, mean pairwise similarity | **0.056** (header describes a prior 0.77) |
| Pushed or deployed | **No** |

---

## 6. Next steps

1. **Decide `guides.js`: wire it in or delete it.** Leaving 390 lines of dead content that
   reads as live is the worst of the three options.
2. **Measure `smooth pursuit eye exercise` and `steady hand game`.** They are the two terms
   across four categories whose SERPs show real weakness, and both fail the gate on nothing but
   an unmeasured volume. `python scripts/bing/bing.py quota` first.
3. **Run the §7b.6 AI-visibility question set.** Still unmeasured everywhere.
4. **Remaining unaudited: `cognitive`, `memory`, `fps`, `reaction-speed`.** The corrected
   parity parser now covers them, and all currently measure 0 drift.
5. **Re-check the physical keyword data question** (`PHYSICAL_RESEARCH_SUMMARY.md` §2.1) —
   still the largest open item across all four passes.
