# Typing section — plan, evidence, and honest expectation

**Status:** plan only. No code written. Decide before building.
**Written:** 2026-08-25

---

## 0. A correction to the claim that triggered this plan

I earlier told the user that the deleted typing section "already held page one,"
citing `/drills/academic` at position 9.7. **That was wrong**, and the plan below
does not rest on it.

I pulled the actual Search Console query data for `/drills/academic` over 180
days. Every query that reached it:

| Query | Impr | Position |
|---|---|---|
| skilldrills | 18 | 1.0 |
| drills online | 17 | 13.1 |
| online drills | 8 | 22.2 |
| academic skill builder | 4 | 40.8 |
| academic skills builder | 4 | 63.8 |
| skilldrills.online | 4 | 1.2 |
| skill drills | 3 | 29.0 |
| skills practice | 3 | 86.0 |
| academic skill builders | 1 | 66.0 |
| learning drills | 1 | 76.0 |

**Zero typing queries. Zero clicks.** The position 9.7 average was earned by
*brand* searches landing on that page, not by typing demand. Further checks, all
over 180 days:

| Filter | Rows |
|---|---|
| page contains `typing-test` | **0** |
| query contains `typing` | **0** |
| query contains `wpm` | **0** |
| page contains `speed-reader` | **0** |
| page contains `mental-math` | **0** |

The typing pages never earned a single impression.

### The nuance that keeps this worth considering

Absence of data here is not evidence of failure, because of *when* it happened:

| Event | Date |
|---|---|
| Typing section deleted | **2026-08-09** |
| Crawlability fixed (SSR, `/_next/`, orphan links) | **2026-08-21** |

The typing pages existed *only* during the period when this site was
structurally uncrawlable — `/_next/` blocked in robots.txt, hubs rendering as
loading skeletons, drill pages orphaned with no inbound links. That is the exact
condition that left **82 of 91 URLs never crawled by Google, not once**.

So the typing pages were almost certainly never crawled either. They were not
tried and found wanting; they were never tried.

**Correct conclusion: we have no evidence either way.** Not "it worked before."

---

## 1. The demand is real and very large

Bing Webmaster keyword API, exact match, US, per month. Bing is ~3–4% of search,
so Google demand is roughly 25–30x these numbers.

| Term | Bing exact/mo |
|---|---|
| `typing test` | **179,006** |
| `typing practice` | 36,340 |
| `typing games` | 33,794 |
| `typing speed test` | 12,624 |
| `free typing test` | 9,123 |
| `wpm test` | 6,170 |
| `typing lessons` | 4,340 |
| `words per minute test` | 4,279 |
| `typing test online` | 2,687 |
| `typing speed` | 1,408 |
| `average typing speed` | 1,181 |
| `typing tutor` | 845 |
| `touch typing` | 645 |
| `learn typing` | 558 |
| `1 minute typing test` | 527 |
| `keyboard typing test` | 228 |
| `typing test for kids` | 140 |
| `how fast do i type` | 107 |
| **cluster total** | **~294,000** |

For scale, the term this entire site is built around: **`aim trainer` = 9,821.**

## 2. The competition is brutal, and the head term is not winnable

`typing test` and its big variants are held by monkeytype, 10fastfingers,
typing.com, keybr, typingclub and ratatype. These are established, high-authority,
single-purpose sites. This domain currently sits at **position 45–78 for
`aim trainer online`** — a term with 1/18th the competition of `typing test`.

**Do not plan around ranking for `typing test`.** It will not happen.

What is plausibly reachable is the long tail, where intent is specific and the
big sites are weakly optimised:

| Realistic target | Bing exact/mo |
|---|---|
| `average typing speed` (informational — easiest to rank) | 1,181 |
| `1 minute typing test` | 527 |
| `keyboard typing test` | 228 |
| `typing test for kids` | 140 |
| `how fast do i type` | 107 |
| `typing accuracy test` | 39 |
| `typing test 5 minute` | 37 |
| **realistic addressable subtotal** | **~2,260/mo on Bing** |

Scaled for Google, that is on the order of a few tens of thousands of monthly
searches — of which a new entrant might capture low single-digit percentages
initially. **Expect tens of visits per month at first, not thousands.**

## 3. The code already exists — this is restoration, not a build

All of it is recoverable from git history. Nothing needs writing from scratch.

| File | Lines | Recover from |
|---|---|---|
| `app/drills/academic/writing-speed/typing-test/TypingTestClient.js` | **999** | `71ef8b2^` |
| `app/drills/academic/writing-speed/typing-test/page.js` | 134 | `71ef8b2^` |
| `app/drills/academic/writing-speed/code-typing/CodeTypingClient.js` | 289 | `c3d5c53^` |
| `app/drills/academic/reading-speed/speed-reader/SpeedReaderClient.js` | 888 | `71ef8b2^` |
| `app/drills/academic/math-speed/mental-math/MentalMathClient.js` | 1,172 | `71ef8b2^` |

The typing drill is a complete 999-line implementation with its own audio
synthesizer, fullscreen handling, and progressive difficulty.

**But it predates the current architecture.** Restored code must be wired into
systems that did not exist when it was deleted:

- `lib/drillsRegistry.js` — entry required, or it is invisible to hubs, search,
  sitemap and `notify-indexnow.js`
- `lib/drillSeo.js` — `term` / `anchor` / `also`, anchor must be unique across all 81
- `components/drill/DrillAccordion.js` — must render children always and collapse
  with `hidden`, or the content is invisible to crawlers (the bug that made 81
  pages thin)
- `components/drill/RelatedDrills.js` — automatic via `app/drills/layout.js`
- `lib/drillTimeout.js`, `lib/drillFlash.js`, `lib/drillAudio.js` — universal
  settings toggles
- `lib/useUnexpectedExitGuard.js`, `lib/scoringEngine.js`
- H1 needs the `data-seo-kw` sub-line pattern
- Idle frame-rate cap (applied to all 34 fps/motor/physical drills)

## 4. Recommended scope — smallest version that tests the thesis

**Restore ONE drill, not the whole academic section.**

The evidence does not justify rebuilding five drills. It justifies a cheap test
of whether this domain can rank for anything in typing at all.

### Build

**`/drills/motor/typing-speed-test`** (placed under `motor`, which is about
keyboard/mouse input, rather than resurrecting the `academic` tree)

- Restore `TypingTestClient.js`, modernise to current architecture
- Target: **`typing speed test`** (12,624) as the primary term, with
  `wpm test` (6,170) and `words per minute test` (4,279) as secondary
- Title: `Typing Speed Test - Free WPM Test Online` (40 chars)
- H1: `TYPING SPEED TEST` + sub-line `Free WPM Test`
- Include a 1-minute mode explicitly — `1 minute typing test` is 527/mo and is
  the single most winnable tool query in the cluster

### Also worth doing, separately and cheaply

**An `average typing speed` content section on that page.** 1,181/mo,
informational intent, and informational queries are markedly easier to rank than
tool queries because the incumbents optimise for the tool, not the explainer.
A well-structured table of average WPM by age/profession, server-rendered, in
the existing accordion pattern.

### Explicitly out of scope

- `code-typing` — `code typing practice` is 29/mo, `programming typing test` 16/mo.
  Near-zero demand. Do not restore.
- `mental-math` — `mental math` 175/mo, `mental math practice` 132/mo. `math games`
  is 14,999 but is kids-education intent and does not match this site.
- `speed-reader` — already served by `/drills/cognitive/processing-speed/rsvp-reader`,
  which now targets `reading speed test` (250/mo). Restoring a second speed reader
  would cannibalise it.
- Rebuilding the `/drills/academic` tree. The redirects added on 2026-08-25 send
  those URLs to `/drills/cognitive` and should stay.

## 5. Effort

| Task | Estimate |
|---|---|
| Recover + read the 999-line client | 0.5h |
| Modernise to current architecture (registry, SEO, accordion, timeout/flash/audio, exit guard, H1 pattern, frame cap) | 2–3h |
| `page.js` metadata, JSON-LD, FAQ block matching visible content | 1h |
| `average typing speed` content section | 1h |
| Build, verify, redirect check, deploy | 0.5h |
| **Total** | **~5–6h** |

## 6. Honest expectation

- **Will not** rank for `typing test`. Ever, realistically.
- **Might** reach page 1–2 for `1 minute typing test`, `typing accuracy test`,
  `how fast do i type` within 2–4 months, given the internal link mesh.
- **Best realistic outcome in 6 months:** low hundreds of visits/month.
- **Most likely outcome:** tens of visits/month, similar to the other 81 drills.

The reason to do it anyway is not the traffic forecast. It is that this is a
**~5 hour test** of whether the domain can gain traction in a category with 30x
the demand of its current one, using code that already exists. If it fails, it
fails cheaply and tells us the constraint is authority, not category — which is
itself the most useful thing we could learn.

## 7. The cheaper alternative, if 5 hours is too much

Add a **spacebar mode** to the existing `/drills/motor/movement-speed/rapid-tapping`.

- `spacebar clicker` = **4,476/mo** (nearly half of `aim trainer`)
- `spacebar counter` 213, `spacebar speed test` 80
- The drill is already a clicks-per-second counter; this is an input-source
  toggle plus a targeted content section, roughly **1–1.5h**
- Risk: the page now targets `cps test` (26,858). Adding a second target risks
  diluting it. Mitigate by giving spacebar its own URL rather than sharing.

## 8. Decision needed

1. Restore the typing speed test as scoped above (~5–6h)? **Recommended.**
2. Add the spacebar mode (~1–1.5h)? Cheap, independent of (1).
3. Neither — wait 3–4 weeks for the current retarget to show results first.
   Also defensible; the current changes have not been measured yet.
