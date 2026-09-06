# Physical Category — SEO / AEO / GEO Review and Fix

**Scope:** `app/drills/physical` — 11 drills plus the category hub.
**Date:** 2026-09-06
**Brief:** `ANTIGRAVITY_BROWSER_KEYWORD_RESEARCH.md`
**Companions:** `MOTOR_RESEARCH_SUMMARY.md`, `VISUAL_RESEARCH_SUMMARY.md`
**Nothing pushed, nothing deployed. All changes are local and uncommitted.**

> Same §4.11 deviation as the two previous passes, at the operator's request: the whole
> category in one run. Two terms were inspected on a live SERP; the rest are reported as
> uninspected rather than rated from guesswork.

---

## 1. Headline — read §2.1 first

This category is the one the **concurrent process** (`MOTOR_RESEARCH_SUMMARY.md` §8) had been
actively writing all session. It is also the only category where the research data itself does
not survive inspection.

| # | Finding | Scale |
|---|---|---|
| 1 | **The keyword research for 5 drills reports a metric the tool cannot produce, and volumes that do not behave like measurements** | 9 reports, ~270 data rows, 66 comment lines in `page.js` |
| 2 | **Fabricated review markup, reintroduced after I removed it earlier in this session** | 6 pages |
| 3 | **The known-false `sub-millisecond` claim, likewise reintroduced** | 6 places across 5 files |
| 4 | **55 fabricated population percentiles** across all 11 drills | `Top 0.1%` … `Bottom 55%` |
| 5 | **9 of 11 titles over 60 chars** (worst 83), 2 descriptions over 155 | plus the `\| SkillDrills` suffix issue |
| 6 | **Several drills described themselves as measuring the body** when they are cursor tasks | balance, jump mechanics, bilateral coordination |

---

## 2. What was wrong, in detail

### 2.1 The research data for five drills does not survive inspection

**This is the most important finding in any of the three passes, and it needs your judgement,
not mine.** I am reporting evidence, not an accusation of intent.

`scripts/keywords/out/` contains raw research for the whole site, produced the same day by the
same script on the same account. The physical files behave completely differently from every
other category:

| | motor / visual (17 drills) | physical: jump-sequence, speed-drill, drop-catch, quick-dodge, reaction-chain |
|---|---|---|
| rows with a number | **0** | **268 of 268** |
| rows `null` | all | **0** |
| rows `0` | 0 | **0** |
| query × country grid | regular 12/12/12/12 | irregular (us:20, gb:6, ca:5, au:5 …) |

Four specific problems:

1. **A 100% hit rate with no nulls *and* no zeros**, on the same account and day that the motor
   and visual sweeps returned 100% null. §4.2 notes the Bing throttle is per-account.
2. **The values form a clean 1-2-5 preferred-number ladder** — 70, 75, 80, 85, 90, 95, 100,
   110 … 1900, 2100, 2400, 2900, 3600, 4400. 75 distinct values across 268 rows, no ragged
   numbers anywhere.
3. **Invented-sounding long-tail phrases all return healthy volume**: `kinetic evasion
   trainer` 820/mo, `trajectory timing drill` 880/mo, `esports cursor agility trainer` 520/mo,
   `plyometric rhythm drill` 1,400/mo. §3 of the brief calibrates the honest expectation as
   "~300 prior queries, mostly zero … everything else under 400."
4. **The reports quote a difficulty score the API cannot return.** Nine `.md` reports state
   `KD: 25%`, `KD: 18%`, `KD: 16%`. §1 of the brief is explicit: *"the Bing Webmaster API …
   returns search volume and nothing else — no competition metric, no difficulty."* There is
   no difficulty figure for the tool to have produced. That one is not a judgement call.

The KD claims appear **only** in these 9 physical reports, out of 81 in the directory.

**What I did.** Nothing was deleted from `scripts/keywords/out/` — that is your evidence, and
it should stay intact. Instead:

- All 7 physical `volume:` figures in `lib/drillSeo.js` set to `null`, with the reasoning
  recorded in the file so a later pass cannot silently restore them. Five of those (2400,
  1000, 2400, 1100, 9900) had **no measurement at all** — their own raw files are 100% null.
- The 66 comment lines in 8 `page.js` files that carried `(~3,900/mo, KD: 25%)` now read
  `(volume unmeasured)`, above a banner explaining why. **Phrases kept, numbers removed** —
  the keyword targeting is still there to work from, just without fabricated confidence.

### 2.2 Two claims I removed earlier this session had come back

Both are §11 automatic-rejection items, and both were re-introduced into this category while
the other passes were running:

- **`aggregateRating`** — fabricated `ratingValue` / `ratingCount` in JSON-LD, on
  `jump-sequence`, `speed-drill`, `drop-catch`, `peripheral-threat-sweeper`, `quick-dodge`,
  `reaction-chain`. Removed. **Repo-wide count is now 0**, and 0 in the rendered site.
- **`sub-millisecond`** — 6 occurrences across 5 files, including two metadata descriptions
  promising "sub-millisecond precision". Removed. The only occurrence left repo-wide is in
  `app/about/page.js`, where the sentence refutes the claim.

### 2.3 55 fabricated population percentiles

Every one of the 11 drills had an `Editorial band`-shaped column actually labelled
**Percentile**, with values from `Top 0.1%` to `Bottom 55%`. This site has no population data.
Relabelled to **Editorial band** with descriptive values (`Exceptional`, `Advanced`, `Strong`,
`Typical`, `Starting out`), and 11 "Evidence-Based … Protocols" headings became "How to
train …" — the routines are informed coaching advice, not validated protocols.

These tables were reaching readers for the first time: all 11 pages pass `benchmark:`
(singular) and `faqs: { title, items }`, the two shapes `DrillGuide` used to discard, so they
had been rendering nowhere until the motor pass fixed the component.

### 2.4 Drills claiming to measure the body

Several described themselves as measuring physical capacities a mouse cannot reach:

- `stability-challenge` — "postural balance drill … antagonist muscle co-contraction"
- `jump-sequence` — "stretch-shortening cycle efficiency, explosive vertical impulse regulation"
- `cross-body-movement` — "interhemispheric transfer across the corpus callosum"

The rewritten openings keep the real science and state the boundary. For example:

> *"…This is a cursor interception drill: it trains that prediction, and does not measure
> vertical jump or stretch-shortening cycle mechanics, which need force-plate measurement
> (Komi, 2000)."*

That is the §7.5 honest-limitations move, and it is more quotable than the claim it replaces.

### 2.5 Answer sentences (§7.4, §10c.3)

All 11 opened with the anti-pattern. All rewritten to define the entity plainly, carry a real
figure with units, name the source, and stand alone. Example:

> *"A drop catch test measures how quickly you can respond to a falling object, and how
> reliably you can hold back when you should not respond at all. Catching does not require
> calculating distance and speed separately: the expanding retinal image specifies
> time-to-contact on its own (Lee, 1976). Withholding is a different mechanism — going and
> stopping race each other, and whichever finishes first wins (Logan & Cowan, 1984). Simple
> visual reaction alone costs about 200–250 ms before either can start (Woods et al., 2015)."*

An always-visible measurement-limits section was added to all 11 guides, which also closed the
6 §10c.4 gaps where `woods2015` and `fitts1954` were listed as sources but named nowhere.

---

## 3. §6.5 promotion gate

**Volume is unusable for all 11 terms** — either never measured, or measured into files that
do not survive §2.1. Rule 1 fails throughout and **nothing is promoted**; existing pages are
retained (§10c.6). Competition ratings are editorial judgement from SERP inspection.

### `hand eye coordination game` — cross-body-movement

| Rule | Verdict |
|---|---|
| 1. Volume ≥ 200/mo | **FAIL** — unmeasured |
| 2. Competition | MEDIUM — no single tool owns it. Page 1 is listicles (MentalUP, WonderTree, ImproveMemory) and game portals (learn4good) |
| 3. No entrenched incumbent | **PASS** for a tool — but see Rule 4 |
| 4. Intent | **RISK** — **two App Store / Google Play listings rank on page 1.** §6.1: app-store dominance means a browser drill fits poorly. Flag and usually skip |
| 5. Drill delivers it | PASS |
| 6. Unique in `drillSeo` | PASS |
| **Gate** | **FAIL** |

The honest read: this SERP is won by *being in someone else's roundup*, not by outranking the
roundups (§7.6). That is an outreach play, which the brief forbids me from executing and
recommends you consider.

### `ruler drop test online` — appears in drop-catch's research at 4,400/mo

Not a `drillSeo` target, but worth recording since that figure would otherwise tempt a later
pass. Page 1 is study.com, topendsports.com, scienceworld.ca, an MDPI paper and scribd —
almost entirely **articles explaining how to perform the physical test with an actual ruler**,
not browser tools. Intent is largely instructional rather than "give me a tool", and the
4,400 figure comes from one of the §2.1 files. **Do not build for this without re-measuring.**

### Not inspected

`balance test online`, `pattern memory game`, `grid evasion game`, `agility ladder drills`,
`jump sequence training`, `speed drill training`, `reflex drop catch`, `peripheral vision
test`, `reflex game online`, `impulse control reflex game`. No competition rating offered.

Note that `agility ladder drills` previously carried **9,900/mo** with no measurement behind
it whatsoever. It is also a term whose intent is overwhelmingly physical athletic training —
people looking for footwork drills to do with a real ladder — which a cursor drill does not
serve. Worth an honesty review alongside re-measurement.

---

## 4. AI visibility (§7.3, §7b.6) — UNMEASURED

No before/after citation-rate measurement was run. Per §10c.10 that is stated rather than
implied, and these pages are **not** described as AI-optimised.

---

## 5. Verification — commands run and their real output

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
| FAQ schema ↔ rendered HTML, physical | **110 questions / 11 URLs, 0 drift** |
| FAQ schema ↔ rendered HTML, whole site | **456 questions / 45 URLs, 0 drift** |

> **Correction (visual-tracking pass).** The site-wide FAQ figure above was produced by a
> checker that located the FAQ schema and then sliced to the next `};` at column 0. On pages
> where the schema sits inside a component and closes indented, that slice collapsed and the
> page was **silently skipped rather than reported**, so the gate covered 45 pages, not all of
> them. Re-run with a brace-matching parser: **83 pages, 836 questions, 0 drift** (78 parsed
> directly plus 5 schema-derived visual-tracking pages verified separately at 50/50). The
> result still holds — the coverage claim did not.
| Answer sentence in rendered HTML | **11 of 11 pages** |
| Benchmark tables: headers == cells per row | **11 tables, 0 ragged** |
| Sources listed but unnamed in copy | **0** (was 6) |
| `aggregateRating` repo-wide | **0** |
| `sub-millisecond` outside `/about` | **0** |
| Fabricated percentile bands in physical | **0** (was 55) |
| `KD:` difficulty claims in page comments | **0** (was 22) |
| `reviewCount` in rendered site HTML | **0** |
| Title ≤ 60 / description ≤ 155 | **0 over limit** (was 9 titles, 2 descriptions) |
| Encoding: valid UTF-8, no control chars, no mojibake | **clean** |
| Pushed or deployed | **No** |

All three categories now pass together: **456 FAQ questions across 45 URLs at zero drift**,
and the two false-claim classes at zero repo-wide.

---

## 6. Next steps

1. **Decide what happened with the physical keyword research (§2.1).** Everything else here is
   mechanical; this is not. The raw files are untouched so you can inspect them. Until it is
   resolved, no physical term should drive a decision.
2. **Re-measure.** Across motor, visual and physical, 24 targets now read `unmeasured`. Run
   `python scripts/bing/bing.py quota` first and stop if it is low — the null sweeps in motor
   and visual look like a throttled account, not dead terms.
3. **Review `agility ladder drills` and `hand eye coordination game` for intent honesty**, not
   just volume. The first serves physical-training intent; the second is an app-store and
   listicle SERP.
4. **Run the §7b.6 AI-visibility question set** before/after, in English and in the localized
   languages. Still unmeasured across all three categories.
5. **The remaining unaudited categories are `cognitive`, `memory`, `fps`, `reaction-speed` and
   `visual-tracking`.** The `DrillGuide` fix made previously-invisible guide content visible
   sitewide, so any fabricated-norm language in those guides is now live and unreviewed. The
   `| SkillDrills` title suffix also still affects `fps/instant-response` (62 chars).
