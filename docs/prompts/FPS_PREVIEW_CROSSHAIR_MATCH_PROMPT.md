# FPS Card Previews — Match the Real Drill Crosshair — Execution Prompt

Scope: the **FPS category only** (`/drills/fps`). One run, one category. No phase plan.

Paste **Sections 1–6** into Antigravity.

---

## 1. Objective

On `/drills/motor` the animated card previews draw the **same crosshair the real drill
draws** — `components/drill-previews/AimTrainerPreview.js` even carries the comment
*"Draw Tactical Crosshair (matching client exact crosshair geometry)"* and reproduces the
client's `arc` + gapped-tick + centre-pip geometry in canvas.

On `/drills/fps` the previews instead draw a **hand-approximated reticle** in
`styles/globals.css` — per-preview class sets (`.ir-prev-reticle`, `.ta-prev-reticle`,
`.mc-reticle`, `.fs-flick-reticle`, …) with inconsistent radius, tick length, stroke
width, glow, and — for several — **no centre dot at all**. It reads as a made-up cursor,
not the drill's cursor.

Fix: for every FPS preview, make its reticle match that drill's **actual in-game
crosshair**, the way the motor previews match theirs.

### The real FPS crosshair (identical shape in every FPS drill client)

Every `app/drills/fps/*/**Client.js` draws the crosshair with this exact geometry in its
canvas `loop()` (grep `const activeColor = pointerLocked`):

```js
// ring
ctx.lineWidth = 2;
ctx.beginPath(); ctx.arc(ch.x, ch.y, R, 0, Math.PI * 2); ctx.stroke();   // R = 14 or 16

// 4 gapped ticks
ctx.lineWidth = 1.5;
const gap = 5;
ctx.moveTo(ch.x, ch.y - R); ctx.lineTo(ch.x, ch.y - gap);   // + s, w, e
ctx.stroke();

// filled centre dot
ctx.beginPath(); ctx.arc(ch.x, ch.y, 2, 0, Math.PI * 2); ctx.fill();
```

Colour is the drill's **pointer-locked** colour (the `pointerLocked ? A : B` first value —
the preview is always "locked").

### Per-drill values (verify each against the client before using)

| Preview component | Route | CSS prefix in globals.css | Ring R | Locked colour |
|---|---|---|---|---|
| `FlickShotPreview` | fps/flick-shot-training | `.fs-flick-` | 14 | `#10b981` |
| `MicroCorrectionPreview` | fps/micro-correction-precision | `.mc-` | 14 | `#06b6d4` |
| `TargetAcquisitionPreview` | fps/target-acquisition | `.ta-` | 16 | `#f59e0b` |
| `InstantResponsePreview` | fps/instant-response | `.ir-prev-` | 16 | `#00ff88` |
| `Awareness180Preview` | fps/180-degree-awareness | `.aw180-` | 14 | `#10b981` |
| `FlowStatePreview` | fps/flow-state | `.fs-prev-` | 14 | `#00ff88` |
| `StrafeTrackingPreview` | fps/strafe-tracking | `.st-` | 16 | `#22c55e` |
| `RecoilControlPreview` | fps/recoil-control | `.rc-` | *(read client)* | `#ef4444` |
| `AngleHoldPreview` | fps/angle-hold-trainer | `.ah-` / `.angle-` *(confirm)* | 14 | `#00ff88` |
| `TargetSwitchingSwarmPreview` | fps/target-switching-swarm | `.tps-` *(confirm)* | 16 | `#06b6d4` |
| `AntiStrafeJitterPreview` | fps/anti-strafe-jitter-duel | `.asj-` *(confirm)* | 14 | `#06b6d4` |
| `VerticalAirTrackPreview` | fps/vertical-air-track | `.vat-` *(confirm)* | 16 | `#ef4444` |
| `ProSmoothPursuitPreview` | fps/pro-smooth-pursuit | `.psp-` | *(read client)* | *(read client)* |
| `TargetPrioritizationPreview` | fps/target-prioritization | `.tp-` | *(read client)* | `#ef4444` |
| `AntiZigzagPreview` | fps/anti-zigzag-movement-trainer | `.az-` | *(read client)* | `#ef4444` |

The previews are **CSS-sized in px inside a fixed-size `.*-prev-field`**, not canvas — so
"R = 14" from the client does not transcribe 1:1. The preview field is smaller than the
live canvas, so scale the whole reticle down by the same factor you already use for the
targets in that preview (they are already scaled — match it). What must be **exactly
right** is the *proportions and parts*, not the absolute px:

- ring : tick-length : gap : dot-diameter ratio ≈ `14 : 9 : 5 : 4` (ring radius : tick
  length : centre gap : dot ø), i.e. ticks start at `gap` from centre and end at the ring.
- ring stroke ≈ `1.5px` (never 2px+ at preview scale — it reads heavy).
- **centre dot present on every one**, filled, the reticle colour.
- reticle colour = the drill's locked colour from the table.
- **no `box-shadow` glow on the ring or ticks** — the real crosshair has none; a few
  previews add one, remove it.

### Definition of done

Open `/drills/fps` and `/drills/motor` side by side. The FPS card reticles read as the
same instrument as the motor ones — thin ring, four gapped ticks, a centre dot — each in
its own drill's colour, none glowing, none missing the dot.

---

## 2. Codebase facts

| Fact | Detail |
|---|---|
| Stack | Next 15, React 18, Tailwind 3.4. Previews are **hand-authored** — CSS previews live as class sets in `styles/globals.css`; canvas previews are per-file components. |
| FPS previews | 15 components in `components/drill-previews/`, all CSS-driven (`<div className="xx-prev">` + reticle classes). Registered in `components/drill/DrillPreview.js` `DEDICATED_PREVIEWS`. |
| Reference (do this, in CSS terms) | `components/drill-previews/AimTrainerPreview.js` lines ~359–391 — canvas crosshair "matching client exact crosshair geometry". |
| Real crosshair source | each `app/drills/fps/<route>/*Client.js`, in the render `loop()`, block guarded by `if (ch.initialized && (gameState === 'playing' || 'start'))`. Grep `activeColor = pointerLocked`. |
| The reticle CSS | `styles/globals.css`, roughly lines 375–1200, one block per prefix. Each block: `.<p>-reticle` (position/size/animation), `.<p>-reticle-ring`, `.<p>-reticle-tick` + `.<p>-tick-{n,s,w,e}`, and *sometimes* `.<p>-reticle-dot`. |
| Motion | leave every `@keyframes *-reticle-motion` / `*-crosshair-*` animation exactly as-is — this task changes the reticle's **shape and colour only**, never its path or timing. |
| Build | `npx next build` — **NOT** `npm run build` (postbuild pings live IndexNow). |
| Localised | `/{de,es,ja,ko,pt}/drills/fps` reuse the same components + the same global CSS — nothing locale-specific here. |

---

## 3. Operating rules

1. **CSS + preview components only.** Do not touch any `app/drills/fps/**/*Client.js`, any
   `page.js`, `lib/`, or the motor/other-category previews. If a preview's reticle markup
   needs a `<span className="xx-reticle-dot" />` added (because the drill has a centre dot
   and the preview omits it), add that one span to that one preview component — nothing else.
2. **One drill at a time.** For each row of the Section 1 table: (a) open the client, copy
   the real `R`, `gap`, tick length, dot radius, colour; (b) update that prefix's CSS block
   in `globals.css`; (c) add the dot span to the component if missing. Then next drill.
3. **Preserve proportions, scale the size.** Match the target scale already used in that
   preview. Do not blow the reticle up to literal client px.
4. **No glow.** Strip `box-shadow` from `*-reticle-ring` and `*-reticle-tick` in these
   blocks. The centre dot stays flat too.
5. **No new colours invented.** The reticle colour is copied from the client's
   `pointerLocked ? '<this>' : …`.
6. **Don't touch the targets, hitmarkers, grid, or field** in any preview — only the
   reticle/crosshair sub-tree.
7. After the pass: `npx next build` + `npm run lint`, report the `/drills/fps` route-size
   delta (should be ~0 — CSS-only).

---

## 4. Method per drill (worked example — flick-shot-training)

1. `app/drills/fps/flick-shot-training/ProFlickClient.js`, grep `activeColor = pointerLocked`:
   ```
   activeColor = pointerLocked ? '#10b981' : '#eab308'
   arc(ch.x, ch.y, 14, …) lineWidth 2      // ring
   gap = 5 ; ticks run to 14 ; lineWidth 1.5
   arc(ch.x, ch.y, 2, …) fill              // dot
   ```
2. `styles/globals.css`, block `.fs-flick-reticle*` (~line 839):
   - `.fs-flick-reticle` — keep size/animation; if its `width/height` implies a ring
     radius far off `14 × previewScale`, nudge it to match the other parts.
   - `.fs-flick-reticle-ring` — `border: 1.5px solid #10b981; box-shadow: none;`
   - `.fs-flick-tick-*` — length ≈ `9 × previewScale` starting `5 × previewScale` from
     centre (i.e. the tick sits between the gap and the ring), `1.5px` thick,
     `background: #10b981; box-shadow: none;`
   - `.fs-flick-dot` — `width/height: 4px` (≈ `2 × 2 × previewScale`), `background: #10b981;`
3. `FlickShotPreview.js` already has `<span className="fs-flick-dot" />` — good. For a
   preview that lacks the dot (e.g. `MicroCorrectionPreview` → `.mc-reticle` has no
   `.mc-reticle-dot`), add `<span className="mc-reticle-dot" />` inside `.mc-reticle` and a
   matching `.mc-reticle-dot` rule.

Repeat for all 15.

---

## 5. Verification

1. `npx next build` passes; `/drills/fps` route size unchanged (±1KB).
2. `npm run lint` clean.
3. `/drills/fps` — every card reticle: thin ring + 4 gapped ticks + centre dot, in the
   drill's locked colour, no glow. Cross-check three at random against their client's
   `activeColor` line — colour matches.
4. `/drills/motor` — unchanged (screenshot diff vs `main`).
5. Reduced-motion emulation — reticles still render (static), still correct shape.
6. One localised hub (`/de/drills/fps`) — identical.

Report each. "Looks fine" is not a result.

---

## 6. Out of scope

- Motor / cognitive / memory / physical / visual / reaction-speed previews — untouched.
- Crosshair **motion paths** and animation timing — untouched.
- Target / hitmarker / grid rendering in any preview — untouched.
- Any drill client, page, metadata, or the card layout (`DrillCarousel.js`).
- Converting CSS previews to canvas — not this task; match within the CSS approach.
