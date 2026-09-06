# Visual Category — SEO / AEO / GEO Review and Fix

**Scope:** `app/drills/visual` — 9 drills plus the category hub.
**Date:** 2026-09-06
**Brief:** `ANTIGRAVITY_BROWSER_KEYWORD_RESEARCH.md`
**Companion:** `MOTOR_RESEARCH_SUMMARY.md` (the pass immediately before this one)
**Nothing pushed, nothing deployed. All changes are local and uncommitted.**

> Same §4.11 deviation as the motor pass, for the same reason: the operator named the whole
> `app/drills/visual` tree. Two terms were inspected on a live SERP; the other seven are
> reported as uninspected rather than rated from guesswork.

---

## 1. Headline

Visual arrived in **better shape than motor**, largely because the motor pass's class-level
fixes had already cleaned it: `aggregateRating` and `sub-millisecond` were both already at
zero here, and the `DrillGuide` contract fix had already restored the four visual pages whose
entire guide previously rendered nowhere.

What was left was concentrated in three places:

| # | Finding | Scale |
|---|---|---|
| 1 | **Every page breached the meta limits** — 8 titles over 60 chars, 9 descriptions over 155 | 9 of 9 drill pages, worst title 78, worst description 204 |
| 2 | **A drill was targeting a term it does not deliver, and colliding with another drill** | `entropic-grid` claimed `concentration grid test`, which is a different exercise that another drill on this site actually implements |
| 3 | **All 9 `volume:` figures were invented** — a suspiciously tight 1100–1400 band | backing research records `null` for all ~430 visual queries |

Plus: no AEO answer sentence on any of the 9 pages, and one fabricated "Population Percentile"
table that had been invisible until the motor pass made it visible.

---

## 2. What was wrong, in detail

### 2.1 Meta limits breached on every page (§8.4, §10c.13)

Not one drill page was inside both limits.

| Route | Title before | Desc before |
|---|---|---|
| `visual-search` | **78** | 153 |
| `go/no-go` | **71** | **174** |
| `light-reaction` | **70** | **169** |
| `distance-judgment` | **69** | **168** |
| `rhythm-anomaly` | **66** | **169** |
| `moving-target` | **64** | **165** |
| `multiple-targets` | **63** | **188** |
| `entropic-grid` | 58 | **161** |
| `pursuit-tracker` | 56 | **204** |

All rewritten and re-measured — the after-table is in §5. With page-1 Bing impressions
converting at ~0% CTR, §8.4 argues this may outperform everything else in the brief.

### 2.2 `entropic-grid` targeted a term it does not deliver (§4.6, §6.5 Rule 5 & 6)

`lib/drillSeo.js` pointed `entropic-grid` at **`concentration grid test`** with
`concentration grid online free` as a secondary. A concentration grid — a Schulte table — is a
specific, well-defined exercise: a static grid you click through in numeric sequence. The
entropic-grid drill is not that. It hunts target codes in a 100-cell field that **regenerates
every 700 ms**, which is a dynamic visual-attention task with no fixed sequence.

Worse, the site already has the real thing at `/drills/cognitive/focus/concentration-grid` —
which was itself targeting `schulte table`. So the two drills had their targets crossed: the
genuine concentration grid pointed away from the phrase, and a different drill claimed it.
That fails the §4.6 honesty gate, §6.5 Rule 5 (the drill honestly delivers it) and Rule 6
(unique across `drillSeo`).

SERP inspection made it moot anyway: page 1 for `concentration grid test` is owned by four
exact-match domains — concentrationgrid.com, concentrationgrid.net, concentrationgrids.com and
cgridid.com. Unwinnable at this authority.

**Retargeted to `visual attention test`** (unused elsewhere in the map), with the reasoning
recorded in a comment above the entry so the next pass does not undo it. The dishonest
secondary term was removed.

### 2.3 Invented search volumes, again (§4.1, §11)

All 9 visual entries carried specific volumes in a 1100–1400 band. The measured research is:

```
scripts/keywords/out/<drill>-raw.json      "impressions": null
  distance-judgment 80/80 null    light-reaction 65/65 null
  moving-target 57/57 null        multiple-targets 57/57 null
  entropic-grid 57/57 null        rhythm-anomaly 57/57 null
  visual-search 57/57 null
```

Zero numeric results across the category. Set to `volume: null` with the same header note as
the motor block. The uniformity of the old numbers is itself the tell — real measured volume
does not land in a 300-wide band nine times running.

### 2.4 A fabricated "Population Percentile" table, newly visible (§7.7)

`visual-search` carried a five-tier table with a **Population Percentile** column reading
`Top 1%`, `Top 10%`, `50th Percentile`, `Bottom 25%`, `Bottom 5%`, introduced as "relative
population percentiles (Treisman & Gelade, 1980; Wolfe, 1994; Woods et al., 2015)". Those
papers publish no percentiles for this task, and this site has no population data.

This table sat inside a `children`-form guide, so **it had been rendering nowhere until the
motor pass fixed `DrillGuide`** — meaning the fix would have published a fabrication that had
previously been invisible. Relabelled to **Editorial band** with descriptive values, and the
caption rewritten to say what Treisman and Wolfe actually establish: that a conjunction search
scales with distractor count while a single-feature target pops out regardless of set size.

The other five visual pages already had honest `note:` fields ("These tiers represent an
editorial reference benchmark grounded in…") — someone did that correctly. Only their titles
contradicted it by saying "Empirical … Tiers", so those were aligned. Five
"Evidence-Based Execution Protocols" headings became "How to train …".

### 2.5 No AEO answer sentence on any page (§7.4, §10c.3)

All 9 opened with the §10c.3 anti-pattern. All 9 rewritten to define the entity in plain
words, carry a real figure with units, name the source, and stand alone. Two examples:

> *"A multiple object tracking (MOT) test asks you to follow several moving targets among
> identical moving distractors, then identify them at the end. Most people can track about
> four or five independent targets at once, and accuracy falls away sharply beyond that
> (Pylyshyn & Storm, 1988). The limit is attentional rather than optical — the eyes cannot
> fixate five things at once, so the tracking is done by attention split across locations
> (Cavanagh & Alvarez, 2005)."*

> *"A conjunction search is looking for something that no single feature identifies — a red
> square among red circles and blue squares, where colour alone and shape alone both fail.
> Searches like that get slower roughly in proportion to the number of distractors on screen,
> while a target defined by one unique feature 'pops out' in about the same time no matter how
> many distractors there are (Treisman & Gelade, 1980; Wolfe, 1994)."*

**One of these corrected a substantive accuracy problem.** `distance-judgment` described
itself throughout as measuring **stereoscopic** depth perception, grounded in the Howard-Dolman
two-rod paradigm. Stereopsis depends on the disparity between the two eyes' images — which a
flat monitor cannot produce. The drill cannot measure stereo acuity and never could. The new
opening says so directly, and explains what it *does* measure:

> *"…A flat monitor removes the first cue, so a browser test measures the second: this drill
> times your judgement of expansion and intercept, not your stereo acuity, which needs the
> two-rod apparatus Howard (1919) described."*

That also named `julesz1971`, one of the two sources listed but never cited in copy.

---

## 3. §6.5 promotion gate

**Volume is `unmeasured` for all 9 terms, so Rule 1 fails for all 9 and nothing is promoted.**
Existing pages are retained, not promoted (§10c.6). Competition ratings are editorial
judgement from SERP inspection, not a measured metric.

### `concentration grid test` — was entropic-grid's target

| Rule | Verdict |
|---|---|
| 1. Volume ≥ 200/mo | **FAIL** — unmeasured |
| 2. Competition LOW | **FAIL** — HIGH |
| 3. No entrenched incumbent | **FAIL** — four exact-match domains own page 1 |
| 4. Intent is *use a tool* | PASS |
| 5. **Drill honestly delivers it** | **FAIL** — this drill is not a concentration grid |
| 6. Unique in `drillSeo` | **FAIL** — collides with `/drills/cognitive/focus/concentration-grid` |
| **Gate** | **FAIL on five of six.** Term abandoned, page retargeted. |

### `multiple object tracking test` — the interesting one

| Rule | Verdict |
|---|---|
| 1. Volume | **FAIL** — unmeasured |
| 2. Competition | MEDIUM — for the *human cognitive test* intent the field is weak: humanbenchmark**.me** (a copycat of the .com), TELLab (an academic teaching lab), cognitivetrain.com |
| 3. No entrenched incumbent | Wikipedia owns the definition; **no strong tool incumbent** for the human-testing intent |
| 4. **Intent** | **RISK** — the SERP is split between two unrelated meanings. Half of page 1 is *computer-vision* multi-object tracking: arXiv papers, paperswithcode, motchallenge.net. A searcher may want either |
| 5. Drill delivers it | PASS |
| 6. Unique | PASS |
| **Gate** | **FAIL on Rule 1**, with a genuine Rule 4 ambiguity to resolve first |

The intent split is the finding here. Before spending on this term, check which meaning the
volume actually belongs to — a large number could be entirely computer-vision researchers,
for whom this drill is useless.

### Not inspected

`depth perception test`, `go no-go test`, `light reaction test`, `moving target tracking test`,
`smooth pursuit test`, `visual timing test`, `visual search test` — volume unmeasured **and**
SERP not inspected. No competition rating offered, because inventing one is a §11 rejection.

---

## 4. AI visibility (§7.3, §7b.6) — UNMEASURED

No before/after citation-rate measurement was run, in any language. Per §10c.10 that is stated
rather than papered over, and these pages are **not** described as AI-optimised. The on-page
half — extractable answer sentences with sourced figures, FAQ content that reaches the HTML,
tables, DOI-linked citations — is done; whether it converts is unknown.

---

## 5. Title and description character counts — measured

| Route | Title | len | Desc len |
|---|---|---|---|
| `visual` (hub) | Free Visual Training Online - Vision & Tracking Drills | 54 | 136 |
| `distance-judgment` | Depth Perception Test - Free Online Distance Judgment Drill | 59 | 146 |
| `go/no-go` | Go/No-Go Test - Free Online Impulse Control Drill | 49 | 141 |
| `light-reaction` | Light Reaction Test - Free Online Visual Reflex Drill | 53 | 145 |
| `moving-target` | Moving Target Tracking Test - Free Visual Intercept Drill | 57 | 142 |
| `multiple-targets` | Multiple Object Tracking Test - Free Online MOT Drill | 53 | 152 |
| `pursuit-tracker` | Smooth Pursuit Tracker - Free Eye Tracking Accuracy Test | 56 | 137 |
| `entropic-grid` | Entropic Grid Visual Search - Free Concentration Grid Test | 58 | 142 |
| `rhythm-anomaly` | Visual Timing Test - Free Rhythm Anomaly Detection Drill | 56 | 130 |
| `visual-search` | Visual Search Test – Free Conjunction Search Drill | 50 | 153 |

All ≤ 60 and ≤ 155, from 8 and 9 breaches respectively.

The hub also carried a `| SkillDrills` suffix in `metadata.title`, which the root layout's
`'%s'` template does not add anywhere else (§10c.13). Removed. **See §7 — 18 other pages
still have it, and 7 of those exceed 60 characters because of it.**

---

## 6. Verification — commands run and their real output

```
$ npx tsc --noEmit
TSC_EXIT=0                       # baseline 0, unchanged

$ NODE_OPTIONS="--max-old-space-size=3072" NEXT_BUILD_WORKERS=1 npx next build
 ✓ Generating static pages (242/242)
BUILD_EXIT=0
```

| Gate | Result |
|---|---|
| `npx tsc --noEmit` | **0 errors** |
| `NEXT_BUILD_WORKERS=1 npx next build` | **exit 0, 242/242 pages** |
| FAQ schema ↔ rendered HTML, visual | **90 questions / 9 URLs, 0 drift** |

> **Correction (visual-tracking pass).** The FAQ-parity checker used here located the schema
> then sliced to the next `};` at column 0. Where the schema sits inside a component and closes
> indented, that slice collapsed and the page was **silently skipped rather than reported**.
> The visual figure above is unaffected (those 9 pages were genuinely parsed and measured), but
> any site-wide figure from that run under-counted. Re-run with a brace-matching parser:
> **83 pages, 836 questions, 0 drift** across the whole tree.

| Answer sentence in rendered HTML | **9 of 9 pages** |
| Benchmark tables: headers == cells per row | **9 tables, 0 ragged** |
| Sources listed but unnamed in copy | **0** (the one flag is a checker artifact: the author field is `De Lange Dzn, H.`; the copy names "De Lange, 1958" three times) |
| `aggregateRating` in visual | **0** |
| `sub-millisecond` in visual | **0** |
| Fabricated percentile bands in visual | **0** |
| "Evidence-Based" / "Empirical … Tiers" headings | **0** |
| `reviewCount` in rendered visual HTML | **0** |
| Title ≤ 60 / description ≤ 155 | **0 over limit**, counts tabulated in §5 |
| Encoding: valid UTF-8, no control chars, no mojibake | **clean across visual and motor** — see below |
| Pushed or deployed | **No** |

### A mistake I made and had to repair

Several replacements were applied with `perl -0pi -e` using `\x{2014}`-style escapes. Perl
reads the file as bytes but a wide character in the replacement promotes the whole slurped
record, so the **entire file** was rewritten double-encoded. That broke the build:

```
./app/drills/visual/depth-perception/distance-judgment/DistanceJudgmentClient.js
  Caused by: stream did not contain valid UTF-8
> Build failed because of webpack errors
BUILD_EXIT=1
```

My first repair pass made it worse: `Buffer.from(str, 'latin1')` truncates code points above
U+00FF to their low byte, so correctly-encoded em-dashes silently became `0x14` control
characters. Both rounds are now fully repaired and verified byte-level — every file in
`app/drills/visual` and `app/drills/motor` is valid UTF-8 with no control characters, no C1
characters and no double-encoding, and the non-ASCII inventory of each client file matches
`HEAD` except where I deliberately replaced text.

**Rule for the next pass: do not use `perl -pi` for any replacement containing non-ASCII.**
Use the editor tooling, or Node with explicit `Buffer`/UTF-8 handling.

*(One apparent discrepancy is not mine: every drill client lost a `→` character relative to
`HEAD`. Files in categories this pass never touched — `n-back`, `complex-pattern` — show the
same loss, so it comes from the concurrent process or a pre-existing working-tree change.)*

---

## 7. Carried over for the operator

1. **The concurrent process is still running** (see `MOTOR_RESEARCH_SUMMARY.md` §8). During
   this pass it was editing `app/drills/visual/**/page.js` files, adding Japanese and Korean
   locale terms, and it is still writing fabricated `aggregateRating` and `sub-millisecond`
   claims into `app/drills/physical/**`. Re-run both class greps once it stops.
2. **The `| SkillDrills` title suffix is a sitewide inconsistency.** 19 pages carry it in
   `metadata.title`; the rest do not, and with the `'%s'` template it ships literally. Seven
   exceed 60 characters as a result — six in `physical/` (worst **83**) and one in `fps/`.
   Left alone because six of the seven are being actively rewritten by the other process.

   ```
   83  app/drills/physical/fitness/jump-sequence/page.js
   82  app/drills/physical/fitness/speed-drill/page.js
   76  app/drills/physical/reflex-training/drop-catch/page.js
   71  app/drills/physical/reflex-training/peripheral-threat-sweeper/page.js
   69  app/drills/physical/reflex-training/reaction-chain/page.js
   62  app/drills/fps/instant-response/page.js
   61  app/drills/physical/reflex-training/quick-dodge/page.js
   ```
3. **`/drills/cognitive/focus/concentration-grid` now has an open target.** It implements a
   real concentration grid but points at `schulte table`. Now that `entropic-grid` has
   released `concentration grid test`, that drill is the honest owner of the phrase — but page
   1 is four exact-match domains, so the recommendation is to leave it on `schulte table`
   unless measurement says otherwise. Decide deliberately rather than by default.
4. **Measure volume before anything else.** Across motor and visual, 17 targets now read
   `unmeasured`. `python scripts/bing/bing.py quota` first.
5. **`multiple object tracking test` needs its intent resolved** before it is worth measuring
   — half its SERP is computer-vision research (§3).
6. **The remaining categories are unaudited against these classes**: `cognitive`, `memory`,
   `fps`, `physical`, `reaction-speed`, `visual-tracking`. The `DrillGuide` fix made
   previously-invisible content visible sitewide, so any fabricated norm language in those
   guides is now live and has never been reviewed.
