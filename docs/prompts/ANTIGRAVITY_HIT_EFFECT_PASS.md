# Brief: Hit-Impact Effect Pass (ring + spark burst on a correct hit)

**Give Antigravity this file plus ONE drill.** Fix that drill, verify it in the
browser, report, then STOP for review before the next one.

---

## 0. THE GAP — evidenced, not guessed

`app/drills/visual/tracking-accuracy/moving-target/KineticInterceptClient.js`
draws a target on canvas (`drawTacticalTarget`) and plays a hit sound on a
correct tap, but **nothing is drawn at the impact point**:

```js
// KineticInterceptClient.js, handlePointerDown, correct-hit branch (~line 278-300)
if (dist <= hitTolerance) {
  eng.perfectHits++;
  eng.combo += 1;
  ...
  drillAudio?.playHit?.();
  spawnTarget();   // <-- next target spawns immediately, no visual acknowledgement of the hit at all
}
```

Compare `app/drills/fps/flick-shot-training/ProFlickClient.js`, which already
does this correctly:

```js
eRef.hitRings.push(createHitRing(tgt.x, tgt.y, tgt.radius, TARGET_COLOR));
```

plus a particle burst pushed into `engine.current.particles` and drawn every
frame (same file, `~line 317` push site, drawn in the render loop).

**This is not a missing feature — it's an inconsistently-applied one.**
`lib/canvasFx.js` already exports `createHitRing` / `drawHitRings` for exactly
this. It's wired into ~20 files across `fps/`, `motor/`, `physical/`,
`reaction-speed/` (confirmed via `grep -rl "hitRing" app/drills`), and wired
into **zero** files under `cognitive/`, `visual/` (outside the FPS-style
sub-tree), `visual-tracking/`, `memory/` (confirmed via
`grep -rl "particles\|hitRing" app/drills/cognitive app/drills/visual
app/drills/visual-tracking app/drills/memory` → no real hits).

**Goal:** every drill where a correct action lands on a specific point on
screen gets a visible impact at that point — an expanding ring plus a small
spark burst, in the target's own color. Not a new design — reuse the one this
repo already has.

---

## 0.1 Ground rules

1. **One drill per pass.** Fix it, screenshot it, report, stop. Do not batch.
2. **Reuse `lib/canvasFx.js`. Do not invent a second ring/particle system.**
   `createHitRing(x, y, radius, color)` + `drawHitRings(ctx, rings, dt)` are
   already exported and already proven in ~20 files.
3. **The hard gate — check this BEFORE touching a drill:**
   - Does a correct action resolve at a **specific x/y point** the player just
     interacted with (a tapped target, a clicked cell, a caught object)? → in scope.
   - Is it a **sequence/recall** interaction with no single spatial impact point
     (e.g. typing a remembered digit string, replaying a Simon-style order from
     memory with no live cursor position)? → **out of scope, skip it, say so in
     the report.** Do not invent a fake x/y to hang an effect on.
   - **EXCLUDE BUTTON-BASED DRILLS (Non-Ball Target Rule):** NEVER add canvas hit effects
     (rings or particle bursts) to drills that do NOT have a ball/projectile target
     (e.g. UI button grids, card tiles, text recall, or keyboard inputs). You cannot
     and must not add a canvas hit effect on buttons. These drills rely on clean native
     DOM states or audio feedback. Hit effects apply STRICTLY to drills with target balls.
4. **Canvas drills vs DOM drills need different plumbing** — see §1 vs §2. Check
   which one a drill is (does it have a `<canvas>` + `requestAnimationFrame`
   loop, or is it plain React state driving styled `<div>`s?) before picking a
   section.
5. **Ring/spark color = the target's own color on that drill**, never a fixed
   red. `moving-target` draws its target as `"#f97316"` (orange) — its hit
   ring and sparks must be `#f97316`, not the `#ef4444` seen elsewhere. Read the
   `drawTacticalTarget(...)` or fill-color call already in the file and match it.
6. **`npx next build`. Never `npm run build`** — `postbuild` pings live
   IndexNow endpoints (Bing/Yandex/Seznam) for real.
7. **Install nothing.** Both effects are ~10 lines using code already in the repo.
8. **If a drill doesn't cleanly fit either section, stop and describe what you
   found instead of improvising a third approach.**

---

## 1. CANVAS drills (has `<canvas>` + a `requestAnimationFrame` draw loop)

This is the `moving-target` case, and the same shape as every FPS/motor/physical
drill that already has the effect. Three edits:

**a) State/refs** — add a rings array (particles usually already exist per-file
as a local convention; if not, add one the same way `ProFlickClient.js` does):

```js
import { createHitRing, drawHitRings } from '../../../../../lib/canvasFx';
// alongside existing engine.current shape:
engine.current = { ..., hitRings: [], particles: [] };
```

**b) On the correct-hit branch**, at the point of impact (`t.x, t.y, t.radius`
are already in scope in `handlePointerDown` — use them, don't recompute):

```js
const TARGET_COLOR = '#f97316'; // match whatever drawTacticalTarget(...) already uses in this file
engine.current.hitRings.push(createHitRing(t.x, t.y, t.radius, TARGET_COLOR));
const sparkCount = 8;
for (let i = 0; i < sparkCount; i++) {
  const angle = Math.random() * Math.PI * 2;
  const speed = 2 + Math.random() * 3;
  engine.current.particles.push({
    x: t.x, y: t.y,
    vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
    life: 1.0, color: TARGET_COLOR,
  });
}
```

**c) In the draw loop**, after drawing the target each frame, age and draw both:

```js
drawHitRings(ctx, engine.current.hitRings, dt);

for (let i = engine.current.particles.length - 1; i >= 0; i--) {
  const p = engine.current.particles[i];
  p.x += p.vx; p.y += p.vy; p.life -= dt * 2.5;
  if (p.life <= 0) { engine.current.particles.splice(i, 1); continue; }
  ctx.globalAlpha = p.life;
  ctx.fillStyle = p.color;
  ctx.beginPath();
  ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
  ctx.fill();
}
ctx.globalAlpha = 1.0;
```

(That particle-aging shape is copied from the existing convention — check
`QuickDodgeClient.js` around its `e.particles` loop and match its exact numbers
if they differ from the above; consistency with the sibling file beats this brief.)

**Start here:** `app/drills/visual/tracking-accuracy/moving-target/KineticInterceptClient.js`.
It is the cleanest, fully-confirmed case of the gap.

**Other canvas drills to check next** (has a render loop, confirm via
`grep -n "requestAnimationFrame" <file>` before assuming): everything under
`app/drills/visual-tracking/*Pursuit*` and `app/drills/visual/tracking-accuracy/*`
— several are "avoid/track" drills where a *miss* is the scoring event, not a
hit; apply the hard gate in §0.1 per drill, not per folder.

---

## 2. DOM drills (React state → styled `<div>`s, no canvas, no rAF loop)

Most of `cognitive/`, `memory/`, and the non-tracking half of `visual/` are this
shape (grid cells, cards, buttons rendered by JSX). A per-frame canvas loop is
the wrong tool here — adding one just to draw a ring would reintroduce the exact
main-thread jank this repo has already paid down elsewhere. Use compositor-only
CSS animations instead, matching the geometry of the canvas version but costing
zero JS after spawn.

**a) Add to `styles/globals.css`** (does not exist yet in this repo — confirm
with `grep -n "fx-hit-ring" styles/globals.css` before adding, in case a
parallel pass already landed it):

```css
@keyframes fxHitRing { 0% { transform:scale(.32); opacity:.95; } 100% { transform:scale(1); opacity:0; } }
.fx-hit-ring { position:absolute; border-radius:50%; border-style:solid; pointer-events:none; animation: fxHitRing .45s ease-out forwards; }

@keyframes fxHitSpark { 0% { transform:translate(0,0) scale(1); opacity:1; } 100% { transform:translate(var(--tx), var(--ty)) scale(.25); opacity:0; } }
.fx-hit-spark { position:absolute; border-radius:50%; pointer-events:none; animation: fxHitSpark .45s ease-out forwards; }
```

**b) Add `lib/useHitBurst.js`** — a small hook, same shape as the existing
`lib/useDrillFlash.js` next to it (read that file first and match its style):

```js
'use client';
import { useState, useCallback, useRef } from 'react';

export default function useHitBurst() {
  const idRef = useRef(0);
  const [bursts, setBursts] = useState([]);

  const spawnBurst = useCallback((x, y, r, color) => {
    idRef.current += 1;
    const id = idRef.current;
    const sparks = Array.from({ length: 8 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const dist = r * (1.1 + Math.random() * 1.3);
      return { dx: Math.cos(angle) * dist, dy: Math.sin(angle) * dist };
    });
    setBursts((b) => [...b, { id, x, y, r, color, sparks }]);
    setTimeout(() => setBursts((b) => b.filter((p) => p.id !== id)), 480);
  }, []);

  return { bursts, spawnBurst };
}
```

**c) In the drill**, on the correct-hit handler, call
`spawnBurst(x, y, radius, color)` with the tapped element's own center and
whatever color that drill already uses for a correct state (green success
color, the target's accent color — check the file, don't default to red).

**d) Render** (drop this once, near wherever `flashes.map(...)` already renders
if the drill uses `useDrillFlash`):

```jsx
{bursts.map((b) => {
  const ringSize = b.r * 4.2;
  return (
    <React.Fragment key={b.id}>
      <div className="fx-hit-ring" style={{
        left: b.x, top: b.y, width: ringSize, height: ringSize,
        marginLeft: -ringSize / 2, marginTop: -ringSize / 2,
        borderWidth: Math.max(2, b.r * 0.1), borderColor: b.color, zIndex: 30,
      }} />
      {b.sparks.map((s, i) => (
        <div key={i} className="fx-hit-spark" style={{
          left: b.x, top: b.y, width: 6, height: 6, marginLeft: -3, marginTop: -3,
          background: b.color, '--tx': `${s.dx}px`, '--ty': `${s.dy}px`, zIndex: 30,
        }} />
      ))}
    </React.Fragment>
  );
})}
```

The parent element bursts render into must be `position: relative` (or already
`absolute inset-0`) and `x`/`y` must be pixel coordinates relative to it —
usually the same `rect`/`getBoundingClientRect()` math the drill's own tap
handler already computes for hit-testing. Don't recompute it a second way.

**Candidates to check next** (apply the §0.1 hard gate to each — skip any
sequence/recall drill with no live tap point, and say so):
`app/drills/cognitive/focus/concentration-grid/ConcentrationGridClient.js`,
`app/drills/cognitive/attention/multi-tasking/DualTargetFlowClient.js`,
`app/drills/cognitive/attention/divided-attention/DividedAttentionClient.js`,
`app/drills/visual/visual-recognition/visual-search/VisualSearchClient.js`,
`app/drills/visual/visual-recognition/entropic-grid/EntropicGridClient.js`,
`app/drills/visual/tracking-accuracy/multiple-targets/GhostLinkClient.js`,
`app/drills/memory/spatial-memory/object-location/ObjectLocationClient.js`,
`app/drills/memory/spatial-memory/grid-memorization/GridMemorizationClient.js`.

Likely **out of scope** on the hard gate (no live spatial tap point — verify,
don't assume): `DigitSpanClient.js`, `WordRecallClient.js`, `NBackClient.js`,
`PathTracingClient.js` (path tracing may qualify if it marks discrete
checkpoints — check before excluding), `RSVPReaderClient.js`, `SymbolMatchingClient.js`.

---

## 3. Verification (per drill, before reporting done)

```bash
# Confirm no duplicate ring/particle system already exists in this file:
grep -n "hitRing\|fx-hit\|spawnBurst" <file>

# Build (compile-only, never npm run build):
npx next build
```

Then in the browser: play the drill, score a hit, confirm you SEE a ring
expand and sparks fly from the exact point you tapped, in the drill's own
accent color — not a generic red, not offset from the tap point. Check one
hit at the drill's smallest target size and one at its largest (radius scales
with difficulty in most of these) — the ring/spark size should scale with it
(`ringSize = radius * 4.2`), not look tiny on a big target or oversized on a
small one.

---

## 4. Report format per drill

```
## DRILL: <name> — <file>

Type: canvas | DOM
Gate: IN SCOPE (has a live spatial hit point at <describe>) | OUT OF SCOPE (<why>)

Changes:
- file:line — what

Verification:
- grep output (§3)
- npx next build result
- what you saw in the browser: ring color, size at min/max target radius, spark count

Skipped / could not verify:
```

---

## STOP CONDITIONS

- The drill has no discrete spatial hit point (recall/sequence entry) — skip,
  don't fabricate one.
- The file already has `hitRing`/`fx-hit` wiring — it's already done, don't
  duplicate it, move to the next candidate.
- A canvas drill's scoring event is a *miss* (dodge/avoid drills) rather than a
  hit — this brief is about impact-on-hit, not applicable, skip and say so.
- `styles/globals.css` already defines `.fx-hit-ring` from a parallel pass —
  reuse it, don't redefine it.
