# Drill Card Previews — Match the Real Drill's Hit-Ring Effect — Execution Prompt

Scope: the **specific list of drill previews in Section 1** — the exact drills that just had a
new "hit ring" effect added or recolored in their real client component. One run, this list
only. No phase plan.

Paste **Sections 1–6** into Antigravity.

---

## 1. Objective

Every real drill in the list below now draws an expanding, fading **hit ring** at the target's
own colour the instant the player scores a correct hit — added via `createHitRing()` /
`drawHitRings()` in `lib/canvasFx.js` (canvas-based FPS/motor/physical drills), or a recoloured
local `hitColor`/`TARGET_FILL_COLOR` constant (reaction-speed drills, which already had a ring
but it was hardcoded red regardless of the target's real colour).

The **card previews** on `/drills/<category>` (the small always-looping demo shown on the hub
grid, `components/drill-previews/*.js`) were built earlier and do not reflect this. Concretely:

- Some previews (the FPS ones, CSS-only) have **no hit-ring element at all** — only a white
  hitmarker "X" flash (e.g. `Awareness180Preview.js`'s `.aw180-hitmarker`). Compare against
  `FlickShotPreview.js`, which already has a `.fs-flick-hit-ring` — but even that one is
  hardcoded **white** (`border: 2px solid #ffffff`), not the drill's actual target colour.
- Some previews (motor/physical/reaction-speed, canvas-based mini-simulations) already draw
  their own particle burst + ring on their simulated "hit," independently of `lib/canvasFx.js` —
  several with a code comment admitting it's hardcoded, e.g. `FPSTrackingTrainerPreview.js`:
  *"radiant **red**/white particle sparks"* even though that drill's real target is never red on
  a correct hit.

Fix: for every preview in Section 1, make its hit-ring (add one if missing, recolour if present)
match that drill's **real, current, correct-hit colour** — read fresh from the client, not
assumed from this document. The table in Section 1 is a **starting reference from the same
session that shipped the real-drill change**, not a substitute for checking the source.

**Never invent a colour.** If a row says "confirm in client," you must open that file and find
the literal hex before writing anything. If a preview's simulated colour scheme has no
correlate in the real drill (rare), say so in your report instead of guessing.

---

## 2. The two preview architectures — check which one before editing

This drill set has previews built two different ways. Grep the file for `<canvas` to tell them
apart before touching anything:

### Track A — CSS-only previews (`<div className="xx-prev">` + `styles/globals.css` classes)

All in-scope FPS previews are this kind. Structure per drill: a `.<prefix>-hit-ring` (or
`.<prefix>-hitmarker`) `<span>` inside the target wrapper, animated on an infinite CSS loop
(`animation: <prefix>-hit-ring-N 2.8s ease-out infinite;` — same 2.8s loop period as everything
else in that card, timed to land the "hit" beat in sync with the target's own life-ring cycle).
Colour is a literal `border-color`/`background` in the `@keyframes`/class block in
`styles/globals.css` — **not** a runtime variable, since these are static loops.

### Track B — Canvas previews (`<canvas ref={canvasRef}>` + a `useEffect` RAF loop)

All in-scope motor/physical/reaction-speed previews are this kind (confirm each — don't assume).
These already run their own small self-contained particle/ring simulation inside the component's
`useEffect`, independent of both the real drill's engine code and `lib/canvasFx.js`. The ring's
colour is a **JS literal inside that file** (a hex string passed to `ctx.strokeStyle` at the
"hit" moment in the simulated loop) — find and change that literal, in that one file. Do not
import `lib/canvasFx.js` into a preview component; these are self-contained by design (no drill
engine state, no React state loop) — keep them that way, just fix the literal.

---

## 3. Section 1 — the drill list, real colour, preview file, track

Verify every colour cell in the client before using it — this was correct at the time the real
change shipped in this same session, but re-derive it, don't trust the table blindly.

### FPS (Track A — CSS)

| Preview component | Route | CSS prefix | Real correct-hit colour(s) — verify in client | Preview currently has a ring? |
|---|---|---|---|---|
| `FlickShotPreview.js` | fps/flick-shot-training | `.fs-flick-` | `#00ff88` fixed (`TARGET_COLOR` const in `ProFlickClient.js`) | Yes — **wrong colour** (`#ffffff`), recolour it |
| `Awareness180Preview.js` | fps/180-degree-awareness | `.aw180-` | combo < 10 → `#00ff88`, combo ≥ 10 → `#5eead4` (pick one state to loop, or alternate) | No — add one |
| `AngleHoldPreview.js` | fps/angle-hold-trainer | `.ah-` | same combo-dependent `#00ff88`/`#5eead4` as above (real-target hits only, not decoys) | Confirm |
| `InstantResponsePreview.js` | fps/instant-response | `.ir-prev-` | `#00ff88` fixed | Confirm |
| `MicroCorrectionPreview.js` | fps/micro-correction-precision | `.mc-` | two hit types: anchor hit `#5eead4`, micro/precision hit `#00ff88` — confirm both in client | Confirm |
| `RecoilControlPreview.js` | fps/recoil-control | `.rc-` | 3 zones: head `#ef4444` (critical), chest/limb `#f59e0b` — confirm in client, this drill draws a custom silhouette, not `drawTacticalTarget` | Confirm |
| `TargetAcquisitionPreview.js` | fps/target-acquisition | `.ta-` | *(confirm in client — sequenced target set, not yet read)* | Confirm |
| `TargetPrioritizationPreview.js` | fps/target-prioritization | `.tp-` | red-priority hit `#ef4444`; yellow hit (only when no active reds) `#eab308`. Green target is friendly-fire (penalty, not a hit) — never ring it | Confirm |
| `TargetSwitchingSwarmPreview.js` | fps/target-switching-swarm | `.tss-` | per-target `t.color` — this drill has multiple simultaneous colours; pick whichever the preview's existing simulated target already uses so it stays self-consistent | Confirm |
| `VerticalAirTrackPreview.js` | fps/vertical-air-track | `.vat-` | *(confirm in client — HP-depletion kill mechanic, not a single-hit target)* | Confirm |

### Motor (Track B — canvas)

| Preview component | Route | Real correct-hit colour(s) — verify in client |
|---|---|---|
| `AimTrainerPreview.js` | motor/hand-eye-coordination/aim-trainer | combo-dependent `#38bdf8` / `#00ff88` |
| `DragAndDropPreview.js` | motor/hand-eye-coordination/drag-and-drop | bucket's own render colour: `#00f0ff` (high combo) / `#38bdf8` (normal) — **not** the `#3b82f6` used by the drill's particle explosion, the ring must match the bucket itself |
| `PrecisionFlickShotPreview.js` | motor/hand-eye-coordination/precision-flick-shot | `#eab308` (bullseye) / `#06b6d4` (standard ring) |
| `FingerSequencingPreview.js` | motor/movement-speed/finger-sequencing | `#10b981` (active node fill) |
| `RapidTappingPreview.js` | motor/movement-speed/rapid-tapping | `#d946ef` (ball's normal fill — real effect only fires every 10th hit, preview can loop it normally) |

### Physical (Track B — canvas)

| Preview component | Route | Real correct-hit colour(s) — verify in client |
|---|---|---|
| `ComplexPatternPreview.js` | physical/coordination/complex-pattern | `#10b981` |
| `CrossBodyMovementPreview.js` | physical/coordination/cross-body-movement | `#10b981` |
| `AgilityLadderPreview.js` | physical/fitness/agility-ladder | `#10b981` |
| `JumpSequencePreview.js` | physical/fitness/jump-sequence | `#10b981` |
| `SpeedDrillPreview.js` | physical/fitness/speed-drill | combo-dependent `#38bdf8` (combo ≥ 10) / `#eab308` (normal) — use the **dynamic** colour, not the drill's own slightly-stale hardcoded explosion literal |
| `DropCatchPreview.js` | physical/reflex-training/drop-catch | combo-dependent `#00ff88` (normal) / `#38bdf8` (combo ≥ 10) |
| `PeripheralThreatSweeperPreview.js` | physical/reflex-training/peripheral-threat-sweeper | keyed by threat type: `fast`→`#f97316`, `wobble`→`#a855f7`, else red/cyan by combo (confirm exact "else" hex in client) |
| `ReactionChainPreview.js` | physical/reflex-training/reaction-chain | `nodeColor` formula driven by speed-intensity/combo — *(confirm in client, no fixed hex)* |

### Reaction-speed (Track B — canvas, recolour only)

| Preview component | Route | Real correct-hit colour |
|---|---|---|
| `BarrierSequencePursuitPreview.js` | reaction-speed/barrier-sequence-pursuit | `#ef4444` fixed (`TARGET_FILL_COLOR` const in client) |
| `FPSTrackingTrainerPreview.js` | reaction-speed/fps-tracking-trainer | `#ef4444` fixed |
| `MarketDoorsPursuitPreview.js` | reaction-speed/market-doors-pursuit | `#ef4444` fixed |
| `ReactionGamePreview.js` | reaction-speed/reaction-game | `#ef4444` fixed |
| `ReflexTrainingDrillPreview.js` | reaction-speed/reflex-training-drill | `#ef4444` fixed |
| `SaccadicGalleryPreview.js` | reaction-speed/saccadic-gallery | `#ef4444` fixed |
| `VisualTrackingSpeedTestPreview.js` | reaction-speed/visual-tracking-speed-test | `#ef4444` fixed |

For this whole reaction-speed row-group the real colour genuinely is red in every case — the fix
in the real drills was de-duplicating a hardcoded literal into a named constant, not making it
non-red. **If a preview here is already drawing its ring/spark as `#ef4444`, it's already
correct — confirm and move on, don't edit for the sake of editing.**

---

## 4. Explicitly OUT OF SCOPE — do not touch these previews

The paired real drills for these either have no discrete "hit a specific coloured target"
moment (continuous dwell/lock-on tracking, avoidance-based scoring, or a non-spatial timing cue)
or were left alone this session on purpose. Do not add or guess a hit ring for:

- FPS dwell/lock-on drills: `AntiStrafeJitterPreview.js`, `AntiZigzagPreview.js`,
  `FlowStatePreview.js`, `ProSmoothPursuitPreview.js`, `StrafeTrackingPreview.js`
- `SteadyHandPreview.js`, `TracingPreview.js` (motor — continuous path/zone tasks)
- `QuickDodgePreview.js` (physical — success is avoidance, the only contact event is a penalty)
- `ReactionTimeTestPreview.js` (reaction-speed — timing-precision tap, colour is a *rating*, not
  a target; it already varies correctly by rating and was left alone in the real drill too)
- Any preview not named in Section 1 (cognitive, memory, visual, visual-tracking, and every
  other FPS/motor/physical/reaction-speed drill not listed) — none of those had a real hit-ring
  change this session.

---

## 5. Operating rules

1. **Preview components + `styles/globals.css` only.** Do not touch any `*Client.js`, `page.js`,
   or `lib/canvasFx.js`. Read the client to find the correct colour; never edit it.
2. **One drill at a time**, in the order listed in Section 1. For each: open the real client,
   confirm the correct-hit colour(s) at the source (grep `createHitRing(`, `hitColor`, or
   `TARGET_FILL_COLOR` in the FPS/motor/physical files; grep the recoloured hit-handler block in
   the reaction-speed files), then edit that one preview file (Track B) or that one CSS prefix
   block (Track A). Then move to the next drill.
3. **Track A (CSS):** if the prefix has no `-hit-ring` class yet, add one following
   `.fs-flick-hit-ring` / `.fs-flick-hit-ring-1` / `@keyframes fs-flick-hit-ring-1` in
   `styles/globals.css` as the template — same easing, same ~2.8s loop period synced to that
   card's existing target-life-ring timing, only the `border-color` (and, if the drill has more
   than one hit colour, which keyframe fires when) changes. Wire the new `<span
   className="<prefix>-hit-ring" />` into the JSX at the same nesting level as the existing
   `<span className="<prefix>-hitmarker">`.
4. **Track B (canvas):** find the literal hex passed to `ctx.strokeStyle`/`ctx.fillStyle` at the
   simulated "hit" moment inside that file's own `useEffect` loop, and replace it with the real
   colour. Leave the timing, particle count, ring-expansion math, and every other visual
   parameter untouched — this is a colour fix, not a redesign.
5. **Multi-colour drills** (target-prioritization, target-switching-swarm, peripheral-threat-
   sweeper, angle-hold-trainer, micro-correction-precision): the preview only needs to be
   internally consistent with whatever it's already simulating as "the target" — if the preview
   shows one simulated target type, ring it in that type's real colour; you don't need to add
   new target types to a preview that doesn't have them.
6. **No comments on new/changed lines.** Preserve any existing comments untouched.
7. **`npx next build` — never `npm run build`** (postbuild fires a live IndexNow ping at Bing,
   Yandex and Seznam).
8. If a client's actual colour logic doesn't match anything in Section 1's table, trust the
   client and note the correction in your report — the table is a starting point, not ground
   truth.

---

## 6. Verification

1. `npx next build` passes; route sizes for touched hub pages unchanged (±1KB for CSS-only
   Track A drills; Track B canvas edits are a literal swap, expect ~0 delta).
2. Open `/drills/fps`, `/drills/motor`, `/drills/physical`, `/drills/reaction-speed` — every
   listed card now shows an expanding ring at the moment its simulated target is "hit," in that
   drill's real colour. Cross-check at least 5 cards at random against their client's actual
   colour literal — must match exactly (hex-for-hex), not "close."
2b. No excluded preview (Section 4) grew a ring it didn't have before.
3. Reduced-motion emulation — rings still render (static frame), don't animate.
4. One localised hub (e.g. `/de/drills/fps`) — identical, since previews aren't locale-specific.
5. Report per drill: done (colour used, track) / already correct / skipped (why).

"Looks fine" is not a result — paste the colour you verified and where you read it from.
