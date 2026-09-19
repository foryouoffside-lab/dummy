# §7 Translation Audit — Localized Drill Pages

Produced per `xx.md` §7 ("produce a list of every localized page that is a straight
translation of the English page"). Read the **Methodology & Limits** section first —
it materially changes how the two lists below should be used.

---

## Methodology & Limits

`xx.md` §7.2 defines a page as TRANSLATED (a defect) only when its target phrase has
**no Bing measurement behind it in that market**, and NATIVE when it does. Producing
that verdict requires real search-volume data.

This audit could not get real search-volume data:

- `scripts/bing/bing.py` (the repo's own Bing Webmaster API tool) needs an API key —
  none is configured in this environment.
- Even with a key, outbound network access to `ssl.bing.com` and
  `suggestqueries.google.com` is blocked by this sandbox's network policy (confirmed
  via `403 policy denial` in the proxy's own rejection log — this is an environment
  constraint, not a missing credential alone).
- `WebSearch` was available and used for qualitative signal (does native content use
  this phrase at all, does it read naturally) but it does **not** return search-volume
  or competition numbers. Nothing in this document states a volume number that wasn't
  already on record in this repo before this audit.

Given that, this audit produces two lists of different strength:

1. **Confirmed findings** — pages using a phrase this repo's own prior work already
   measured at zero volume. These are real defects, not heuristic guesses.
2. **Heuristic candidate list** — every locale drill page that lacks this repo's own
   established "documented keyword research" comment block (the
   `SEO RESEARCH FINDINGS` / `KEYWORD RESEARCH & INTENT CLUSTERING` style header seen
   on pages that went through real research, e.g.
   `app/de/drills/fps/flick-shot-training/page.js`). Absence of that marker is a
   **lead, not proof** — some of these pages may still be natively researched without
   documenting it in that exact comment style, and some may be fine even if translated
   (structure mirroring the English page is expected per §7.2; word-for-word sentence
   translation is the actual problem, and that distinction needs a native speaker or
   real volume data to resolve, not just presence/absence of a comment).

**Do not treat list 2 as a finished defect list.** It is the audit's own required
first pass ("Treat these as heuristics, not ground truth — confirm each hit by opening
the file"), scoped down from 545 total locale drill pages to 347 real candidates
(hub/category-listing pages excluded).

---

## 1. Confirmed findings

Two exact phrases were already on record in this repo (cited in `xx.md` itself) as
measured at **zero** monthly Bing search volume in their market. Both still appear
live in page content:

### `es` — "entrenador de puntería" / "entrenador de punteria" (0/mo, proven dead)

11 pages. All hits are in the `keywords` metadata array (not the visible H1/subtitle),
**except one**:

- `app/es/drills/motor/hand-eye-coordination/aim-trainer/page.js` — uses it in the
  page `<title>` itself ("Aim Trainer Online – Entrenador de Puntería"). This page
  *does* have a documented research comment, and that comment cites a real number for
  "aim trainer" (174 exact / 294 broad Bing/mo) but cites **no number** for "entrenador
  de puntería" — it's labeled only "High-intent Spanish query", i.e. asserted, not
  measured. This is the one page where the defect reaches user-visible content.

Other 10 (metadata-array only, lower severity but still worth cleaning up since it's a
term this repo already knows is dead):
`drills/motor/page.js`, `drills/motor/movement-speed/finger-sequencing/page.js`,
`drills/fps/micro-correction-precision/page.js`, `drills/fps/target-prioritization/page.js`,
`drills/fps/angle-hold-trainer/page.js`, `drills/fps/page.js`,
`drills/fps/180-degree-awareness/page.js`, `drills/fps/flick-shot-training/page.js`,
`drills/fps/flow-state/page.js`, `drills/page.js`

### `fr` — "test de réaction" (0/mo, proven dead)

5 pages:
- `app/fr/drills/visual/reaction-speed/light-reaction/page.js` — in the `<title>`,
  meta `keywords`, FAQ question text, and FAQ answer body. Highest-severity hit in
  this audit — the dead phrase is the page's primary visible identity, not just
  metadata.
- `app/fr/drills/reaction-speed/reflex-training-drill/page.js` — in the meta
  `description`. This page has a research marker; same pattern as the Spanish
  aim-trainer page above (a measured primary term coexisting with an unmeasured
  supplementary one).
- `drills/visual-tracking/zig-zag-path-pursuit/page.js`,
  `drills/visual/page.js`, `drills/motor/movement-speed/keyboard-recognition/page.js`
  — metadata-array only.

**Recommended fix for both:** per xx.md's own §7.3 guidance, these are real-content
fixes (keyword measurement + native rewrite), not something to batch-patch in this
pass. `light-reaction/fr` is the one to prioritize — it's the only page in this whole
audit where a proven-dead phrase is load-bearing, visible content (title *and* FAQ),
not just an unused metadata keyword.

---

## 2. Heuristic candidate list — pages with no documented research marker

347 leaf drill pages (hub/category-index pages excluded) across the 6 locales lack
any `SEO RESEARCH FINDINGS` / `KEYWORD RESEARCH` / `PRIMARY DOMESTIC` style comment.
Grouped by locale, route only (prefix with `app/<locale>/drills/` for the file path,
or `/​<locale>/drills/` for the URL):

**Pattern worth noting:** coverage is very uneven by category, not by locale. Across
all 6 locales, `visual`, `visual-tracking`, `cognitive`, and `memory` drills are
almost universally missing a research marker, while `fps` and
`motor/hand-eye-coordination` are a mix. This matches `NO_TRANSLATION_NATIVE_SEARCH_MANDATE.md`,
which names `de`/`ja`/`ko` as its original enforced scope — `es`/`fr`/`pt` have
roughly half the research-marker coverage `de`/`ja`/`ko` do (23–28% vs 44–49%),
suggesting the mandate was applied inconsistently across locales, not just across
categories.

### de (46 pages)
cognitive/attention/concentration-stamina, cognitive/attention/divided-attention,
cognitive/attention/multi-tasking, cognitive/processing-speed/reaction-time,
cognitive/processing-speed/rsvp-reader, cognitive/processing-speed/symbol-matching,
fps/angle-hold-trainer, fps/anti-strafe-jitter-duel, fps/anti-zigzag-movement-trainer,
fps/flow-state, fps/pro-smooth-pursuit, fps/target-prioritization,
fps/target-switching-swarm, memory/short-term-memory/digit-span,
memory/short-term-memory/word-recall, memory/spatial-memory/grid-memorization,
memory/spatial-memory/object-location, memory/spatial-memory/path-tracing,
motor/hand-eye-coordination/drag-and-drop, motor/hand-eye-coordination/precision-flick-shot,
motor/keyboard-tester, motor/movement-speed/finger-sequencing,
motor/movement-speed/keyboard-recognition, motor/precision-control/tracing,
visual-tracking/split-screen-tracking, visual-tracking/staircase-step,
visual-tracking/strobe-prediction-pursuit, visual-tracking/triangular-pursuit,
visual-tracking/zig-zag-path-pursuit, visual/reaction-speed/go/no-go,
visual/reaction-speed/light-reaction, visual/tracking-accuracy/moving-target,
visual/tracking-accuracy/multiple-targets, visual/tracking-accuracy/pursuit-tracker,
visual/visual-recognition/entropic-grid, visual/visual-recognition/rhythm-anomaly,
visual/visual-recognition/visual-search
*(+ 9 category-hub pages: `page.js`, `cognitive/`, `fps/`, `memory/`, `motor/`, `physical/`, `reaction-speed/`, `visual-tracking/`, `visual/`)*

### es (66 pages)
cognitive/attention/concentration-stamina, cognitive/attention/divided-attention,
cognitive/attention/multi-tasking, cognitive/focus/distraction-fighter,
cognitive/processing-speed/reaction-time, cognitive/processing-speed/rsvp-reader,
cognitive/processing-speed/symbol-matching, fps/180-degree-awareness,
fps/angle-hold-trainer, fps/anti-strafe-jitter-duel, fps/anti-zigzag-movement-trainer,
fps/flick-shot-training, fps/flow-state, fps/instant-response,
fps/micro-correction-precision, fps/pro-smooth-pursuit, fps/recoil-control,
fps/strafe-tracking, fps/target-acquisition, fps/target-prioritization,
fps/target-switching-swarm, fps/vertical-air-track,
memory/short-term-memory/color-sequence, memory/short-term-memory/digit-span,
memory/short-term-memory/word-recall, memory/spatial-memory/grid-memorization,
memory/spatial-memory/object-location, memory/spatial-memory/path-tracing,
motor/hand-eye-coordination/drag-and-drop, motor/hand-eye-coordination/precision-flick-shot,
motor/keyboard-tester, motor/movement-speed/finger-sequencing,
motor/movement-speed/keyboard-recognition,
physical/coordination/cross-body-movement, physical/coordination/dynamic-grid-evasion,
physical/fitness/agility-ladder, physical/fitness/jump-sequence,
visual-tracking/constant-slow-pursuit, visual-tracking/directional-chaos-pursuit,
visual-tracking/dynamic-evasion-pursuit, visual-tracking/ghosting-suppress-pursuit,
visual-tracking/infinity-pursuit, visual-tracking/sine-wave-pursuit,
visual-tracking/spatial-shift-pursuit, visual-tracking/split-screen-tracking,
visual-tracking/staircase-step, visual-tracking/strobe-prediction-pursuit,
visual-tracking/triangular-pursuit, visual-tracking/zig-zag-path-pursuit,
visual/reaction-speed/go/no-go, visual/reaction-speed/light-reaction,
visual/tracking-accuracy/moving-target, visual/tracking-accuracy/multiple-targets,
visual/tracking-accuracy/pursuit-tracker, visual/visual-recognition/entropic-grid,
visual/visual-recognition/rhythm-anomaly, visual/visual-recognition/visual-search
*(+ 9 category-hub pages)*

### fr (70 pages)
cognitive/attention/concentration-stamina, cognitive/attention/divided-attention,
cognitive/attention/multi-tasking, cognitive/focus/concentration-grid,
cognitive/focus/distraction-fighter, cognitive/processing-speed/reaction-time,
cognitive/processing-speed/rsvp-reader, cognitive/processing-speed/symbol-matching,
fps/180-degree-awareness, fps/angle-hold-trainer, fps/anti-strafe-jitter-duel,
fps/anti-zigzag-movement-trainer, fps/flick-shot-training, fps/flow-state,
fps/instant-response, fps/micro-correction-precision, fps/pro-smooth-pursuit,
fps/recoil-control, fps/strafe-tracking, fps/target-acquisition,
fps/target-prioritization, fps/target-switching-swarm, fps/vertical-air-track,
memory/short-term-memory/color-sequence, memory/short-term-memory/digit-span,
memory/short-term-memory/word-recall, memory/spatial-memory/grid-memorization,
memory/spatial-memory/object-location, memory/spatial-memory/path-tracing,
memory/working-memory/n-back, motor/hand-eye-coordination/aim-trainer,
motor/hand-eye-coordination/drag-and-drop, motor/hand-eye-coordination/precision-flick-shot,
motor/keyboard-tester, motor/movement-speed/finger-sequencing,
motor/movement-speed/keyboard-recognition, motor/movement-speed/rapid-tapping,
physical/coordination/cross-body-movement, physical/coordination/dynamic-grid-evasion,
physical/fitness/agility-ladder, physical/fitness/jump-sequence,
visual-tracking/constant-slow-pursuit, visual-tracking/directional-chaos-pursuit,
visual-tracking/dynamic-evasion-pursuit, visual-tracking/ghosting-suppress-pursuit,
visual-tracking/infinity-pursuit, visual-tracking/sine-wave-pursuit,
visual-tracking/spatial-shift-pursuit, visual-tracking/split-screen-tracking,
visual-tracking/staircase-step, visual-tracking/strobe-prediction-pursuit,
visual-tracking/triangular-pursuit, visual-tracking/zig-zag-path-pursuit,
visual/reaction-speed/go/no-go, visual/reaction-speed/light-reaction,
visual/tracking-accuracy/moving-target, visual/tracking-accuracy/multiple-targets,
visual/tracking-accuracy/pursuit-tracker, visual/visual-recognition/entropic-grid,
visual/visual-recognition/rhythm-anomaly, visual/visual-recognition/visual-search
*(+ 9 category-hub pages)*

### ja (49 pages)
cognitive/attention/concentration-stamina, cognitive/attention/divided-attention,
cognitive/attention/multi-tasking, cognitive/processing-speed/reaction-time,
cognitive/processing-speed/rsvp-reader, cognitive/processing-speed/symbol-matching,
fps/180-degree-awareness, fps/anti-strafe-jitter-duel, fps/anti-zigzag-movement-trainer,
fps/flick-shot-training, fps/flow-state, fps/instant-response,
fps/micro-correction-precision, fps/pro-smooth-pursuit, fps/target-acquisition,
fps/target-prioritization, memory/short-term-memory/digit-span,
memory/short-term-memory/word-recall, memory/spatial-memory/grid-memorization,
memory/spatial-memory/object-location, memory/spatial-memory/path-tracing,
motor/hand-eye-coordination/drag-and-drop, motor/hand-eye-coordination/precision-flick-shot,
motor/keyboard-tester, motor/movement-speed/finger-sequencing,
motor/movement-speed/keyboard-recognition, motor/precision-control/tracing,
visual-tracking/split-screen-tracking, visual-tracking/staircase-step,
visual-tracking/strobe-prediction-pursuit, visual-tracking/triangular-pursuit,
visual-tracking/zig-zag-path-pursuit, visual/reaction-speed/go/no-go,
visual/reaction-speed/light-reaction, visual/tracking-accuracy/moving-target,
visual/tracking-accuracy/multiple-targets, visual/tracking-accuracy/pursuit-tracker,
visual/visual-recognition/entropic-grid, visual/visual-recognition/rhythm-anomaly,
visual/visual-recognition/visual-search
*(+ 9 category-hub pages)*

### ko (49 pages)
cognitive/attention/concentration-stamina, cognitive/attention/divided-attention,
cognitive/attention/multi-tasking, cognitive/processing-speed/reaction-time,
cognitive/processing-speed/rsvp-reader, cognitive/processing-speed/symbol-matching,
fps/180-degree-awareness, fps/angle-hold-trainer, fps/anti-strafe-jitter-duel,
fps/anti-zigzag-movement-trainer, fps/flick-shot-training, fps/flow-state,
fps/instant-response, fps/micro-correction-precision, fps/pro-smooth-pursuit,
fps/recoil-control, fps/target-acquisition, fps/target-prioritization,
memory/short-term-memory/digit-span, memory/short-term-memory/word-recall,
memory/spatial-memory/grid-memorization, memory/spatial-memory/object-location,
memory/spatial-memory/path-tracing, motor/hand-eye-coordination/drag-and-drop,
motor/hand-eye-coordination/precision-flick-shot, motor/keyboard-tester,
motor/movement-speed/finger-sequencing, motor/movement-speed/keyboard-recognition,
motor/precision-control/tracing, visual-tracking/split-screen-tracking,
visual-tracking/staircase-step, visual-tracking/strobe-prediction-pursuit,
visual-tracking/triangular-pursuit, visual-tracking/zig-zag-path-pursuit,
visual/reaction-speed/go/no-go, visual/reaction-speed/light-reaction,
visual/tracking-accuracy/moving-target, visual/tracking-accuracy/multiple-targets,
visual/tracking-accuracy/pursuit-tracker, visual/visual-recognition/entropic-grid,
visual/visual-recognition/rhythm-anomaly, visual/visual-recognition/visual-search
*(+ 9 category-hub pages)*

### pt (65 pages)
cognitive/attention/concentration-stamina, cognitive/attention/divided-attention,
cognitive/attention/multi-tasking, cognitive/focus/distraction-fighter,
cognitive/processing-speed/reaction-time, cognitive/processing-speed/rsvp-reader,
cognitive/processing-speed/symbol-matching, fps/180-degree-awareness,
fps/angle-hold-trainer, fps/anti-strafe-jitter-duel, fps/anti-zigzag-movement-trainer,
fps/flick-shot-training, fps/flow-state, fps/instant-response,
fps/micro-correction-precision, fps/pro-smooth-pursuit, fps/recoil-control,
fps/strafe-tracking, fps/target-acquisition, fps/target-prioritization,
fps/target-switching-swarm, fps/vertical-air-track,
memory/short-term-memory/color-sequence, memory/short-term-memory/digit-span,
memory/short-term-memory/word-recall, memory/spatial-memory/grid-memorization,
memory/spatial-memory/object-location, memory/spatial-memory/path-tracing,
motor/hand-eye-coordination/drag-and-drop, motor/hand-eye-coordination/precision-flick-shot,
motor/movement-speed/finger-sequencing, motor/movement-speed/keyboard-recognition,
physical/coordination/cross-body-movement, physical/coordination/dynamic-grid-evasion,
physical/fitness/agility-ladder, physical/fitness/jump-sequence,
visual-tracking/constant-slow-pursuit, visual-tracking/directional-chaos-pursuit,
visual-tracking/dynamic-evasion-pursuit, visual-tracking/ghosting-suppress-pursuit,
visual-tracking/infinity-pursuit, visual-tracking/sine-wave-pursuit,
visual-tracking/spatial-shift-pursuit, visual-tracking/split-screen-tracking,
visual-tracking/staircase-step, visual-tracking/strobe-prediction-pursuit,
visual-tracking/triangular-pursuit, visual-tracking/zig-zag-path-pursuit,
visual/reaction-speed/go/no-go, visual/reaction-speed/light-reaction,
visual/tracking-accuracy/moving-target, visual/tracking-accuracy/multiple-targets,
visual/tracking-accuracy/pursuit-tracker, visual/visual-recognition/entropic-grid,
visual/visual-recognition/rhythm-anomaly, visual/visual-recognition/visual-search
*(+ 9 category-hub pages)*

---

## Recommended next steps

1. **Fix `fr/visual/reaction-speed/light-reaction` first** — the one confirmed,
   highest-severity hit (dead phrase in title + FAQ, not just metadata).
2. **Clean the other 10 `es` + 4 `fr` metadata-only hits** of the proven-dead phrases
   — low effort, no research needed, just remove/replace the specific dead string.
3. **The 347-page heuristic list is a scoping tool, not a to-do list.** Per xx.md's own
   §9.5 "one drill at a time" mandate, each would need real keyword measurement before
   any content change — that means either restoring Bing API access (a working key
   *and* network egress to `ssl.bing.com` from wherever the work happens) or manually
   supplying volume data for the specific phrases as pages come up for rework.
4. The `visual` / `visual-tracking` / `cognitive` / `memory` categories are
   consistently the least-researched across every locale — if only one category gets
   prioritized for real research next, it should be one of these four.
