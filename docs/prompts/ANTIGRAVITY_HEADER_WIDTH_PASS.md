# Brief: Drill & Hub Header-Width Pass

**Status:** 27 files already fixed in this first pass (see §3). Your job is to
finish the sweep — find every remaining page where the header description is
capped narrower than the content below it, and un-cap it.

**The bug:** on the drill-category hub pages and on individual drill pages, the
`<h1>` subtitle / description paragraph carries a `max-w-2xl` (hub) or
`max-w-3xl` (drill) class. The content directly beneath it — the drill carousel,
the live stat-card row, the game stage — runs the full width of the page
container (`max-w-6xl` / `max-w-7xl`). So the description stops dead in the
middle of the page and the right half is empty, and the paragraph looks visually
detached from the thing it describes.

**The fix:** remove the narrow `max-w-*` token from the description paragraph so
it runs to the same right edge as the content column below it, then wraps to the
next line. Nothing else changes — same font size, same margins, same colour.

**Cadence:** small, verifiable batches. See §0.

---

## 0. Ground rules — read before anything else

1. **One category per pass.** Do all the hub pages in one pass, then one drill
   sub-tree per pass (`app/drills/fps/*`, then `app/drills/memory/*`, etc.).
   Report the file list and the diff, then stop for approval before the next
   sub-tree. Do not "apply to all remaining files" in a single change.
2. **This is a className-only edit.** You are deleting one token
   (`max-w-2xl` or `max-w-3xl`) from a `<p>`'s `className`. If a change needs
   more than that — a wrapping `<div>` also has a `max-w`, the markup is
   structured differently, the description is inside a shared component — STOP
   and describe what you found. Do not improvise.
3. **Only the header description.** Do NOT touch `max-w-*` on:
   - option grids, answer buttons, modal/overlay panels, result screens
     (`max-w-lg`, `max-w-xl` inside gameplay are correct — leave them);
   - anything with `mx-auto` (that element is deliberately centred and
     narrow — e.g. `app/drills/DrillsDirectoryClient.js`);
   - `<DrillGuide>` / FAQ / "how it works" prose sections lower down the page.
   The target is the single paragraph that sits immediately under the page
   `<h1>` and above the first block of interactive content.
4. **Match the reference.** `app/drills/reaction-speed/reaction-time-test/
   ReactionTimeTestClient.tsx` is the canonical already-correct example — the
   header `<p>` there has no `max-w` and there is a comment (~line 627)
   explaining why. Your result should look like that.
5. **Verify in the browser at a wide viewport (≥1280px).** The description
   should reach the same right edge as the stat-card row / carousel beneath it
   and wrap to a second line, with no large empty gutter on the right. Check one
   representative page per sub-tree at 1280px and at 768px (mobile: it should be
   unchanged — full width already).
6. **Build with `npx next build`, never `npm run build`.** The `postbuild` hook
   pings the live Bing / Yandex / Seznam IndexNow endpoints for real.
7. **If reality does not match this brief, stop and ask.**

---

## 1. How to find the remaining offenders

Run these from the repo root. The header description is a `<p>` right after an
`<h1>`, styled with `leading-relaxed` and a muted text colour
(`text-slate-300`, `text-slate-400`, or `text-ink-2`).

```
# Any header-style paragraph still carrying a narrow cap:
rg -n 'className="[^"]*\bmax-w-(xl|2xl|3xl|prose|screen-\w+)\b[^"]*(leading-relaxed|text-slate-[34]|text-ink-2)' app/drills

# Reverse angle (class order varies):
rg -n 'className="[^"]*(leading-relaxed|text-slate-[34]|text-ink-2)[^"]*\bmax-w-(xl|2xl|3xl|prose)\b' app/drills

# Also check for a wrapping div that caps the whole header block:
rg -n -U '<h1[\s\S]{0,300}?max-w-(2xl|3xl)' app/drills
```

For each hit, open the file, confirm it is the header description (under the
`<h1>`, above the first interactive block), and confirm the content below it
(stat cards / carousel / stage) is wider. If both are true → remove the cap.

Then widen the net beyond `app/drills` if the same pattern turns up:

```
rg -n 'className="[^"]*\bmax-w-(2xl|3xl)\b[^"]*leading-relaxed' app
```

Check `app/**/page-level` hero/intro paragraphs on category-style pages only —
NOT the homepage (its centred hero copy is deliberately narrow), NOT blog/article
prose (narrow measure is correct for long-form reading).

---

## 2. The edit, precisely

Before:
```jsx
<p className="mt-2 text-sm sm:text-base text-ink-2 max-w-2xl leading-relaxed">
```
After:
```jsx
<p className="mt-2 text-sm sm:text-base text-ink-2 leading-relaxed">
```

Before:
```jsx
<p className="text-sm text-slate-400 mt-1.5 leading-relaxed max-w-3xl">
```
After:
```jsx
<p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
```

Delete only the `max-w-*` token and the one surrounding space. Leave every other
class, and the order of the rest, exactly as it was.

---

## 3. Already fixed in the first pass (do NOT re-touch — verify only)

Hub pages (`max-w-2xl` removed from the `<h1>` description):
- app/drills/cognitive/CognitiveHubClient.js
- app/drills/visual/VisualDrillsClient.js
- app/drills/visual-tracking/VisualTrackingDrillsClient.tsx
- app/drills/reaction-speed/ReactionSpeedDrillsClient.tsx
- app/drills/physical/PhysicalDrillsClient.js
- app/drills/fps/FPSHubClient.js
- app/drills/motor/MotorDrillsClient.js
- app/drills/memory/MemoryClient.js

Drill pages (`max-w-3xl` removed from the `<h1>` description):
- app/drills/physical/reflex-training/reaction-chain/ReactionChainClient.js
- app/drills/physical/reflex-training/quick-dodge/QuickDodgeClient.js
- app/drills/physical/reflex-training/peripheral-threat-sweeper/PeripheralThreatSweeperClient.js
- app/drills/physical/reflex-training/drop-catch/DropCatchClient.js
- app/drills/physical/fitness/speed-drill/SpeedDrillClient.js
- app/drills/physical/fitness/jump-sequence/JumpSequenceClient.js
- app/drills/physical/fitness/agility-ladder/MotorSequencingClient.js
- app/drills/physical/coordination/complex-pattern/ComplexPatternClient.js
- app/drills/physical/coordination/dynamic-grid-evasion/DynamicGridEvasionClient.js
- app/drills/physical/coordination/cross-body-movement/CrossBodyMovementClient.js
- app/drills/visual/reaction-speed/light-reaction/StrobeLatencyClient.js
- app/drills/visual/reaction-speed/go/no-go/ChromaSyncClient.js
- app/drills/visual/depth-perception/distance-judgment/DistanceJudgmentClient.js
- app/drills/visual/visual-recognition/visual-search/VisualSearchClient.js
- app/drills/visual-tracking/split-screen-tracking/SplitScreenTrackingClient.tsx
- app/drills/visual-tracking/strobe-prediction-pursuit/StrobePredictionPursuitClient.tsx
- app/drills/visual-tracking/triangular-pursuit/TriangularPursuitClient.tsx
- app/drills/visual-tracking/staircase-step/StaircaseStepClient.tsx
- app/drills/visual-tracking/zig-zag-path-pursuit/ZigZagPathPursuitClient.tsx

Already correct before this pass (reference — no cap):
- app/drills/reaction-speed/reaction-time-test/ReactionTimeTestClient.tsx
- app/drills/fps/180-degree-awareness/AwarenessDrillClient.js (and the
  FPS / motor / reaction-speed drills that share its architecture)

---

## 4. What "same issue in the drills boxes" means

The user's second screenshot is a drill *page* (agility-ladder) — the header
paragraph stopping at centre while the SCORE / TIME LEFT / BEST SCORE / BEST
COMBO card row below runs full width. That specific case is fixed (§3). When you
sweep, the tell is always the same: **header text narrower than the row of
boxes directly beneath it.** If you find a drill where the stat row itself is
capped narrow (rare — most use `w-full`), leave the stat row alone and just
un-cap the description to match whatever the widest element in that column is.

---

## 5. Report format per pass

- Sub-tree covered.
- Files changed, with the one-line diff for each.
- Any file you skipped and why (wrapping div, shared component, deliberately
  narrow, already correct).
- Screenshot of one page at 1280px showing the description now reaching the
  content edge.
- `npx next build` result.
