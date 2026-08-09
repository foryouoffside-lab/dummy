# 180° AWARENESS — POLISH PASS 1

**Context:** Antigravity implemented `IMPLEMENTATION_PLAN.md`. This document is the review.
**Read with:** `implementation/fps/_MASTER_SPEC.md`

---

## WHAT ANTIGRAVITY GOT RIGHT

Credit where due — the structural work is solid:

- ✅ `lib/drillAudio.js`, `lib/drillDifficulty.js`, `lib/canvasFx.js` all created
- ✅ `components/drill/DrillFooter.js` created; Pinterest removed, X kept
- ✅ `lib/adaptiveDifficulty.js` **deleted**; no dangling imports
- ✅ Inline `AudioSynthesizer` class removed from the drill (1,299 → 1,129 lines)
- ✅ `getComboMultiplier` / `getGrade` / `getFpsPerformancePct` wired from `scoringEngine.js`
- ✅ `getStartLevel()` at 0.65 resume factor
- ✅ `bestLevelRunRef` tracking added
- ✅ Monotonic level guard correct: `Math.min(MAX_LEVEL, Math.max(eRef.level, rawLevel))`
- ✅ `playSpatialCue` exception preserved
- ✅ All imports resolve against actual exports

The architecture landed. The defects below are implementation-level.

---

## 🔴 BUG 1 — ALL SOUND IS SILENT (root cause found)

**File:** `lib/drillAudio.js`, `tone()` method, lines ~30-60.

**The oscillator is never connected to the gain node.**

```js
const osc  = this.ctx.createOscillator();
const gain = this.ctx.createGain();

osc.type = type;
osc.frequency.setValueAtTime(freq, now);
// ... gain envelope set ...

let lastNode = gain;
if (pan !== 0 && ...) { gain.connect(panner); lastNode = panner; }

lastNode.connect(this.ctx.destination);   // gain → destination ✓
osc.start(now);                            // osc → ??? ✗
osc.stop(now + dur);
```

The audio graph built is `gain → destination`, with the oscillator dangling. An oscillator that
is started but connected to nothing produces **no audible output**. Every one of the seven
canonical events is affected. This is why you hear nothing.

**Fix — one line.** Insert immediately before `lastNode.connect(...)`:

```js
osc.connect(gain);
```

Final graph: `osc → gain → [panner] → destination`.

**Verify after fixing:** every event must be audible — hit, penalty (wrong click AND miss AND
timeout), 3-2-1 ticks, GO, combo tier at 5/10/15/20/30/50, session end, spatial cue panning
left/right with target position.

---

## 🔴 BUG 2 — Level-up has no feedback at all

`playLevelUp()` exists in `drillAudio.js` but **is never called anywhere**. `fx-flash-gold` is
handled in the render map (line 707) but `triggerFlash('gold')` is **never called** either.

So the single most motivating moment in the drill — difficulty increasing because the player
earned it — passes completely unmarked.

**Fix.** In the hit handler (~line 391), capture the level before and after:

```js
const prevLevel = eRef.level;
const rawLevel  = Math.floor(eRef.score / POINTS_PER_LEVEL) + 1;
eRef.level = Math.min(MAX_LEVEL, Math.max(eRef.level, rawLevel));
bestLevelRunRef.current = Math.max(bestLevelRunRef.current, eRef.level);

if (eRef.level > prevLevel) {
  drillAudio.playLevelUp();
  triggerFlash('gold');
}
```

---

## 🔴 BUG 3 — Fullscreen is not restored on resume

**This is the bug you described.** Pressing `ESC` releases **both** pointer lock and fullscreen
(browsers tie them together). The resume paths only ask for pointer lock back:

```js
// line 748 — pause overlay
onClick={(e) => { e.stopPropagation(); if (canvasRef.current) canvasRef.current.requestPointerLock(); }}

// line 761 — canvas
onClick={() => { if (gameState === 'playing' && !pointerLocked) canvasRef.current?.requestPointerLock(); }}
```

Neither calls `requestFullscreen()`. So you resume in a half-screen window — exactly what you saw.

**Fix.** Add one shared handler and use it in both places:

```js
const resumeDrill = useCallback(async () => {
  // Fullscreen FIRST. Requesting pointer lock before the fullscreen transition
  // completes gets the lock silently dropped by the transition itself.
  if (containerRef.current && !document.fullscreenElement) {
    try { await containerRef.current.requestFullscreen(); } catch (e) {}
  }
  if (canvasRef.current && !document.pointerLockElement) {
    try { await canvasRef.current.requestPointerLock(); } catch (e) {}
  }
}, []);
```

Wire it to both the pause-overlay `onClick` and the canvas `onClick`.

**Order matters and is not optional.** The fullscreen transition resizes the canvas; a pointer
lock acquired before that resize is discarded mid-transition, which would leave the player stuck
in a pause loop that looks like the drill is frozen.

Also update the overlay copy — it currently says *"Click anywhere inside the box to lock cursor
and resume drill."* Change to: **"Click to resume — fullscreen and cursor lock will re-engage."**

---

## 🟠 BUG 4 — Difficulty stops increasing at level 11

**You asked to "make it hard as the user performs." Right now it structurally cannot.**

Every parameter in `getLevelConfig()` is clamped, and I worked out where each one saturates:

| Parameter | Formula | Saturates at |
|---|---|---|
| `radius` | `max(10, 30 − (L−1)×2.5)` | **L9** |
| `edgeProb` | `min(0.9, 0.25 + (L−1)×0.08)` | **L9** |
| `spawnDelayMax` | `max(250, 900 − (L−1)×80)` | **L9** |
| `spawnDelayMin` | `max(150, 700 − (L−1)×60)` | **L10** |
| `ttl` | `max(400, 1200 − (L−1)×80)` | **L11** |

**Levels 12, 13, 14 and 15 are mathematically identical to level 11.** A player who reaches
L11 experiences zero additional challenge for the rest of the session no matter how well they
play. The top third of the difficulty ladder is decorative.

There is a second, compounding problem. Hit detection uses a **flat forgiveness pad**:

```js
if (dist <= t.radius + 12)
```

At L9+ the radius is clamped to 10 px, so the effective hit area is 22 px — **the pad is larger
than the target**. Shrinking targets past L9 changes almost nothing, because forgiveness
dominates. The drill feels like it plateaus because it does.

### Fix — recalibrate the curve to actually reach L15

Replace `getLevelConfig()`:

```js
const getLevelConfig = (level) => {
  const p = getDifficultyProgress(level);  // 0 → 1 across L1..L15, from lib/drillDifficulty.js
  return {
    radius:        30 - p * 22,     // 30 → 8 px
    ttl:           1300 - p * 870,  // 1300 → 430 ms
    spawnDelayMin: 700 - p * 545,   // 700 → 155 ms
    spawnDelayMax: 900 - p * 690,   // 900 → 210 ms
    edgeProb:      0.25 + p * 0.65, // 0.25 → 0.90
    hitPad:        12 - p * 7,      // 12 → 5 px  ← scales with the target
    drift:         p < 0.6 ? 0 : (p - 0.6) * 55, // px/sec lateral drift, from L10
  };
};
```

Every value is now driven by `getDifficultyProgress(level)` and reaches its extreme **exactly at
L15**, not L9-11. No clamps, so no dead zone.

Then use the scaled pad in hit detection:

```js
if (dist <= t.radius + config.hitPad)
```

**`drift` is the new top-end dimension.** Below L10 it is `0` and the drill behaves exactly as
today. From L10 the target drifts laterally, so the player must lead their 180 rather than snap
to a static point. This gives the curve somewhere to keep going after size and timing have been
pushed as far as they usefully can — which is the real answer to "make it harder as they perform."

---

## 🟡 CHANGE 5 — Sensitivity slider back on the start card (my call was wrong)

I specced moving it into the Rules accordion. **That was a mistake and I'm reversing it.**

My reasoning was "settings don't belong in an entry flow." That was wrong here: sensitivity is
not a preference, it is a **calibration step the player must perform before the first shot**.
Burying it in an accordion means a new player starts at the wrong sensitivity, plays a bad run,
and never discovers why. The `cmPer360` readout is a pre-flight check, not a setting.

**Fix.** Move the sensitivity block back onto the start card, positioned between the how-to rows
and the mini-stats. Remove it from the Rules accordion. Keep `universalSens` state, the
`awareness180_sens` localStorage persistence, and the `cmPer360` calculation exactly as they are.

---

## 🟡 CHANGE 6 — Start card layout

With the slider returning, the card needs tightening so it doesn't become a wall. Final order:

1. Icon badge (44 px, emerald gradient)
2. Drill name — `text-[17px] font-bold`
3. One-line positioning statement
4. **3 how-to rows** — trim to 3 if there are more
5. **Sensitivity block** — label + `cmPer360` readout on one line, slider below
6. **3 mini-stats** — Best · Combo · `Lv.{bestLevel}`
7. START button

Constraints: `max-w-[340px]`, internal spacing `gap-2.5`, and the whole card must fit an 800×450
box **without scrolling**. If it doesn't fit, tighten the how-to rows to one line each — never
shrink the START button or the slider hit area.

---

## 🟢 CHANGE 7 — Drill duration: 60s → 45s

**My opinion: yes, do it.** Three reasons:

1. **The last 15 seconds measure fatigue, not skill.** At L10+ the spawn interval is ~200 ms.
   Sustained 180° sweeps at that rate degrade accuracy from arm fatigue well before the clock
   runs out, so the tail of the run adds noise to the score rather than signal.
2. **Shorter runs get replayed more.** A 45 s run with a ~10 s result screen is a sub-minute
   loop. That is the difference between "one more go" and "I'll come back later."
3. **It matches the category.** Kovaak's and Aim Lab scenarios cluster at 30-60 s. 45 s sits in
   the middle and reads as professional to anyone who has used those tools.

**Two things must change with it, or the drill breaks:**

- **Bump the storage key** to `skilldrills_fps_180_awareness_v2`. A 45 s run scores ~25% less
  than a 60 s run, so every existing `bestScore` becomes permanently unbeatable and every
  returning player would see a broken-looking personal best they can never match again.
- **Lower the level threshold** from 1000 to **750** points per level. Otherwise 25% less playing
  time means 25% fewer levels reached, and a player who was hitting L12 now tops out around L9 —
  which would make the drill *easier*, the opposite of the goal. Define it as
  `const POINTS_PER_LEVEL = 750;` and use it in both the hit handler and `getNextLevel()`.

---

## 🟢 CHANGE 8 — Share image resolution

**It already exceeds 4K.** `components/ShareScoreCard.js` renders at `SCALE = 6` →
**3600 × 2400 = 8.64 MP**, versus 4K UHD's 3840 × 2160 = 8.29 MP. More total pixels than 4K,
at a 3:2 aspect ratio.

If you want the literal 3840 px width for the "4K" claim, change one line:

```js
const SCALE = 6.4;   // 600×6.4 = 3840, 400×6.4 = 2560
```

**One caution:** at this size the PNG can exceed 10 MB, and WhatsApp/Telegram re-compress or
reject large images — so a bigger canvas can end up looking *worse* after their compression.
Recommend exporting as `toBlob(blob => ..., 'image/jpeg', 0.92)` instead of PNG. Visually
identical for this artwork, roughly 10× smaller, and survives messenger compression intact.

---

## EXECUTION ORDER

| # | Change | Priority | Risk |
|---|---|---|---|
| 1 | `osc.connect(gain)` in `drillAudio.js` | 🔴 Critical | None — one line |
| 2 | Level-up sound + gold flash | 🔴 Critical | None |
| 3 | `resumeDrill()` fullscreen restore | 🔴 Critical | Order-sensitive |
| 4 | `getLevelConfig()` recalibration + `hitPad` + `drift` | 🟠 High | Needs playtesting |
| 5 | Sensitivity slider → start card | 🟡 Medium | None |
| 6 | Start card layout | 🟡 Medium | Must not scroll |
| 7 | 45 s + storage `_v2` + `POINTS_PER_LEVEL = 750` | 🟢 Normal | Resets bests (intended) |
| 8 | Share card JPEG (+ optional `SCALE = 6.4`) | 🟢 Normal | None |

---

## ACCEPTANCE — POLISH PASS 1

- [ ] `osc.connect(gain)` present; **all 7 events audible**
- [ ] Spatial cue pans left/right with target position
- [ ] Level-up fires `playLevelUp()` + `fx-flash-gold`
- [ ] ESC → "Game Paused" → click resumes **in fullscreen**, pointer locked, no pause loop
- [ ] Difficulty measurably different at L11 vs L15 (target smaller, faster, drifting)
- [ ] `hitPad` shrinks with level; never larger than the target radius
- [ ] Sensitivity slider on the start card, not the accordion
- [ ] Start card fits 800×450 with no scrollbar
- [ ] `DRILL_DURATION = 45`, key is `_v2`, `POINTS_PER_LEVEL = 750`
- [ ] Share card exports as JPEG, opens crisp at full size
- [ ] Regression: countdown, accordions, related drills, footer, coach advice all intact
