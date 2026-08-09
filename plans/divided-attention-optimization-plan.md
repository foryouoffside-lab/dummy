# Divided Attention — Optimization Implementation Plan

Target file: `app/drills/cognitive/attention/divided-attention/DividedAttentionClient.js`

Reference files (read these first, do not copy their gameplay — only their patterns):
- `app/drills/cognitive/focus/concentration-grid/ConcentrationGridClient.js` — result-screen layout, related-drills card style, "no coach notes" pattern.
- `app/drills/fps/180-degree-awareness/AwarenessDrillClient.js` — difficulty-scaling formula, level-multiplier scoring, countdown with no subtitle, canonical sound-effect calls.
- `lib/drillDifficulty.js` — `MAX_LEVEL`, `getStartLevel`, `getDifficultyProgress`.
- `lib/drillAudio.js` — canonical shared sound engine. Do not add new sounds; only call the existing methods (`playHit`, `playPenalty`, `playCountdownTick`, `playGo`, `playSessionEnd`).

**Scope guardrail:** Divided Attention's core gameplay (dual-task: moving-target taps + even-number MATCH stream) stays exactly as-is. Do not port 180's lives system, canvas/pointer-lock rendering, or crosshair mechanic. Do not add a lives/hearts HUD — Divided Attention is combo-based, not life-based, and must stay that way. Do not change the page shell (breadcrumb nav, centered `<h1>`, 4-card `StatCard` row, drill-box container) — that shell already matches 180-degree-awareness and is out of scope.

---

## 1. Countdown: remove subtitle text ("321 GO, no text around it")

Current (~line 741):
```jsx
<DrillCountdown value={countdownValue} subtitle="PREPARE DUAL-TASK TRACKING" accent="#3b82f6" />
```

Change to (matches 180-degree-awareness exactly — `DrillCountdown`'s `subtitle` prop defaults to `''` and renders nothing when empty):
```jsx
<DrillCountdown value={countdownValue} accent="#3b82f6" />
```

## 2. Sound effects — verify, no changes expected

Confirm every event still uses the shared canonical calls (they already do — this is a verification pass, not a rewrite):
- Correct visual hit → `drillAudio.playHit()`
- Correct even-number match → `drillAudio.playHit()`
- Missed target / missed even number / false match / double-tap → `triggerFlash()` + `drillAudio.playPenalty()`
- Countdown 3‑2‑1 → three `drillAudio.playCountdownTick()` calls, then `drillAudio.playGo()` on "GO" (already correct, no change)
- Run end (time-out OR normal end) → `drillAudio.playSessionEnd()` (already correct)

If any of these call sites diverge from this list, fix them to match. Do not introduce a new sound (e.g. no separate "timeout" sound) — 180-degree-awareness does not have one either; a target/number timeout reuses `playPenalty()`.

## 3. Result screen — drop Coach Notes, keep the existing centered layout

Divided Attention's end screen (~line 745) already uses the centered `justify-center` right-panel layout (this part is already correct and matches what Concentration Grid was just changed to — no restructuring needed there). The one required change: **remove the Diagnostics Advice / coach-notes card**, mirroring the same removal just done on Concentration Grid.

Delete this block (~lines 789–794):
```jsx
<div className="bg-[#0b0f19] border border-white/10 p-3 rounded-xl text-left">
  <div className="flex items-center gap-1.5 text-[9px] font-bold text-white uppercase mb-1">
    <Sparkles className="w-3 h-3 text-amber-400" /> Diagnostics Advice:
  </div>
  <p className="text-[10px] text-slate-300 leading-relaxed">{analytics.coachAdvice}</p>
</div>
```

And remove the now-dead code that fed it:
- `getCoachAdvice` function (~lines 40–54)
- `coachAdvice: advice` field in the `setAnalytics(...)` call inside `endGame` (~line 252), and the `const advice = getCoachAdvice(...)` line above it (~line 239)
- `coachAdvice: ''` from the initial `analytics` state (~line 133)
- Remove the now-unused `Sparkles` import if nothing else in the file uses it (check first — `Sparkles` may still be needed if it's used elsewhere; it currently is only used in the block being deleted, so remove it from the `lucide-react` import list).

Result: the right panel keeps its 4 stat tiles (Dual Accuracy / Target Acc / Number Acc / Max Combo) and the action-button row, just without the advice card, with the same `justify-center gap-3 px-6 py-4` wrapper.

## 4. Related Drills — restyle to match Concentration Grid's compact card

Current section (~lines 878–899) uses the large-card 180-style layout. Replace with Concentration Grid's compact layout (`ConcentrationGridClient.js` ~lines 767–792), keeping Divided Attention's own `RELATED_DRILLS` data and blue accent color instead of cyan:

```jsx
{!isFullscreen && (
  <section className="mt-4">
    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
      Related Cognitive Drills
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {RELATED_DRILLS.map((drill) => (
        <Link
          key={drill.id}
          href={drill.href}
          className="group bg-[#0c0c16] border border-white/5 hover:border-blue-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
        >
          <div>
            <div className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1">{drill.cat}</div>
            <div className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">{drill.name}</div>
            <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{drill.desc}</div>
          </div>
          <div className="text-[10px] font-bold text-slate-500 group-hover:text-blue-400 mt-3 flex items-center gap-1 transition-colors">
            Train Drill <span>→</span>
          </div>
        </Link>
      ))}
    </div>
  </section>
)}
```

`RELATED_DRILLS` entries already have `cat` fields (`"Attention"` / `"Focus"`), so no data changes needed — only the JSX/classes change. Remove the old wrapping `<div className="mt-12 pt-8 border-t border-gray-800 font-sans">...<Zap/> Related Cognitive & Focus Drills...` block entirely; it's replaced by the `<section>` above.

## 5. Difficulty scaling — align with 180-degree-awareness's model

### 5a. Cap level at `MAX_LEVEL`
Import `MAX_LEVEL` alongside the existing `getDifficultyProgress`/`getStartLevel` import:
```js
import { MAX_LEVEL, getStartLevel, getDifficultyProgress } from '../../../../../lib/drillDifficulty';
```
In both `handleVisualClick` and `handleNumberCheck`, change:
```js
const rawLevel = Math.floor(eng.score / POINTS_PER_LEVEL) + 1;
eng.level = Math.max(eng.level, rawLevel);
```
to:
```js
const rawLevel = Math.floor(eng.score / POINTS_PER_LEVEL) + 1;
eng.level = Math.min(MAX_LEVEL, Math.max(eng.level, rawLevel));
```
(This is exactly 180's "Monotonic level guard rule" — see `AwarenessDrillClient.js` ~line 407-408.)

### 5b. Apply the level multiplier to scoring
180 pays out `Math.round(100 * comboMultiplier * levelMultiplier)`, not just `100 * comboMultiplier` — otherwise a high-level player scores no better than a level-1 player for the same hit, which punishes skill (see the comment above 180's scoring line, ~line 397-401). Apply the same in both hit handlers, reading the multiplier from the level **before** the level-up so a hit is paid at the difficulty it was actually made at:

In `handleVisualClick` (~line 352-354):
```js
const levelMult = 1 + getDifficultyProgress(eng.level) * 0.5;
const comboMult = getComboMultiplier(eng.combo);
const pts = Math.round(100 * comboMult * levelMult);
eng.score += pts;
```
Apply the identical change in `handleNumberCheck` (~line 390-392).

### 5c. Track peak level with a dedicated ref (matches 180's `bestLevelRunRef`)
180 keeps a separate `bestLevelRunRef` so the run's peak level is captured independent of any later state races. Add the same to Divided Attention:
```js
const bestLevelRunRef = useRef(1);
```
- In `enterDrill`, set `bestLevelRunRef.current = startLevel;` right after computing `startLevel` (mirrors 180 ~line 293).
- In both hit handlers, after updating `eng.level`, add:
  ```js
  bestLevelRunRef.current = Math.max(bestLevelRunRef.current, eng.level);
  ```
- In `endGame`, use `Math.max(prev.bestLevel, bestLevelRunRef.current)` instead of `Math.max(bestLevel, e.level)` when computing `newBestLevel`.

### 5d. Mirror level into React state for the live HUD (bug fix, see §6.1)
Add a `uiLevel` state and set it in both hit handlers alongside `setUiScore`, then use `uiLevel` instead of `engine.current.level` in the "Level" `StatCard` (~line 553).

### 5e. Optional (pacing parity) — spawn-delay ramp on the visual target
180's difficulty curve isn't just "shrink and speed up" — it also ramps a `spawnDelayMin/spawnDelayMax` gap between target hit and next target, driven by `getDifficultyProgress`. Divided Attention's `spawnBall()` currently calls itself immediately on hit with zero gap, so the target is *always* on screen regardless of level. For true parity with 180's pacing model, add to `getLevelConfig`:
```js
spawnDelayMin: Math.max(120, Math.round(500 - p * 350)), // 500ms -> 120ms
spawnDelayMax: Math.max(220, Math.round(700 - p * 420)), // 700ms -> 220ms
```
and in `handleVisualClick`, replace the direct `spawnBall();` call with a delayed re-arm:
```js
const config = getLevelConfig(eng.level);
ballTimerRef.current = setTimeout(spawnBall, config.spawnDelayMin + Math.random() * (config.spawnDelayMax - config.spawnDelayMin));
```
This is a gameplay-feel change, not a strict requirement — flag it to the user for a quick playtest after implementing, since it changes pacing rather than just visuals.

---

## 6. Bug fixes to include in this pass

1. **Level HUD reads a ref directly, can go stale.** The in-play "Level" `StatCard` reads `engine.current.level` directly in JSX (~line 553), bypassing React state. It only appears to update because `setUiScore` usually fires around the same time, but a sequence of misses-only won't refresh it promptly. Fix by mirroring `eng.level` into a `uiLevel` state (see §5d) and rendering that instead.

2. **Last in-flight target/number is never resolved if the clock hits zero first.** Both `spawnBall`'s miss-timeout and `spawnNumber`'s miss-check are `setTimeout`-driven and only recorded when they *fire* or when the *next* spawn cycle runs. If the session's 1-second `timerIntervalRef` reaches 0 and calls `endGame()` while a target is mid-flight or a number is unmatched, that last attempt is silently dropped from `visualAttempts`/`numberAttempts` — slightly inflating the reported accuracy at the exact end of a run. Fix in `endGame`, before computing `acc`/`visAccVal`/`numAccVal`: if `e.currentTargetId` is still active, count it as a miss (`visualAttempts += 1`); if `e.currentNumber % 2 === 0 && !e.wasMatched`, count it as a miss (`numberAttempts += 1`). Do this purely for the accuracy tally — no combo reset/flash needed since the run is already over.

3. **No `MAX_LEVEL` cap.** Covered by §5a — without it, `Lv.` in the HUD and the saved `bestLevel` can exceed 15, inconsistent with every other drill using `lib/drillDifficulty.js`.

4. **Missing level multiplier in scoring.** Covered by §5b — currently a level-15 hit scores identically to a level-1 hit, which both undervalues skill and makes the "Level" stat cosmetic rather than meaningful to score.

---

## 7. Explicit non-goals (do not do these)

- Do not add a lives/hearts system or any life-loss UI — Divided Attention stays combo-based.
- Do not change the breadcrumb/header/title/StatCard page shell — it already matches the 180-degree-awareness pattern and is intentionally being kept.
- Do not touch `ConcentrationGridClient.js` or `AwarenessDrillClient.js` — they're reference-only for this task.
- Do not rename `STORAGE_KEY` (`skilldrills_divided_attention_v6`) unless the saved-data shape changes in a way that requires a version bump (adding `bestLevel` capping does not require one, since the shape is unchanged — only the value's range is).

---

## 8. After implementation — verification checklist

- [ ] Countdown shows only the 3‑2‑1‑GO circle, no caption text above/below it.
- [ ] End screen has no "Diagnostics Advice" card; layout stays vertically centered.
- [ ] Related Drills section uses the compact 2/3-column card style with category label + "Train Drill →".
- [ ] No hearts/lives UI anywhere in the drill.
- [ ] Level shown during play never exceeds `Lv. 15` even on a very long/high-scoring run.
- [ ] A high-level hit visibly scores more than an identical combo-count hit at level 1 (check `eng.score` deltas).
- [ ] `bestLevel` saved to `localStorage` (`skilldrills_divided_attention_v6`) never exceeds 15.
- [ ] Sound: hit, penalty (miss/false-match/double-tap), 3 countdown ticks + GO, and session-end chime all still play and match 180-degree-awareness's timbre (shared `drillAudio` singleton — should be automatic).
- [ ] `npx next build` (not `npm run build` — that pings IndexNow) compiles cleanly with no unused-import warnings (`Sparkles`, `getCoachAdvice`, etc.).
