# Drill Overhaul — Execution Prompt

Paste **Section 2 (Operating Rules)** plus **one row of Section 5** into Antigravity per run.
`fps/flick-shot-training` is already converted and is the reference implementation — read
`app/drills/fps/flick-shot-training/ProFlickClient.js` before touching anything else.

---

## 1. Why the time penalty is a toggle, not a default

The time values are `+0.6s` per hit and `-0.8s` per miss. A 40-run-per-tier simulation of
the converted curve showed the penalty **inverts session length**:

| Skill tier | +0.6 / no penalty | +0.6 / **-0.8** |
|---|---|---|
| Elite (170ms) | **145s** | **87s** |
| Strong (240ms) | 129s | 93s |
| Average (300ms) | 121s | 97s |
| Casual (420ms) | 107s | 100s |
| Struggling (600ms) | 86s | 90s |

Without the penalty, session length rises with skill. With it, the **better player gets the
shorter session** — a strong player climbs to high difficulty fast, and at high difficulty
everyone misses, so the penalty bites hardest exactly where skill takes you. Break-even hit
rate for +0.6/-0.8 is 57%, before the clock's own 1s/s drain. Peak level and score still
rank correctly (elite Lv30/53k vs struggling Lv9/14.5k) — only session length inverts.

**Resolution: the penalty ships as an opt-in setting, off by default.**
`lib/drillPenalty.js` is a singleton in the same shape as `drillAudio` / `drillFlash` /
`drillTimeout`, surfaced as a "Time Penalty" row in `DrillGlobalSettings` on `/drills`.
Default balance keeps skill-ranked session length; players who find a drill too easy turn
it on for a hard mode.

Every penalty site in a drill must therefore be gated:

    if (drillPenalty.isEnabled()) eRef.timeLeft -= TIME_PENALTY;

Never apply the penalty unconditionally, and never change the default to `true`.

Scores set with the penalty on are not directly comparable to scores set with it off, and
both land in the same `bestScore`. That is accepted — the existing "Target Timeouts" toggle
already changes difficulty the same way and shares one best.

---

## 2. Operating rules for the agent

1. **One drill per run.** Convert exactly one drill, report, then STOP. Do not begin the
   next drill until the user replies "yes".
2. **Never edit `lib/drillDifficulty.js` or `components/drill/DrillResultCard.js`.** Both
   are already correct and shared. Changing them silently alters every other drill.
3. **Do not touch any drill in Section 6.** They do not use the hit-target mechanic and
   this model does not apply to them.
4. After each drill run `npx next build` — NOT `npm run build`, whose postbuild step pings
   the live IndexNow endpoints at Bing, Yandex and Seznam.
5. Report what changed, the build result, and anything that did not match this spec.

---

## 3. Global spec — apply identically to every Tier A drill

### 3.1 Constants block

    const DRILL_DURATION = 45;   // starting clock only; a run grows past this
    const TIME_PER_HIT   = 0.6;  // clock returned by one clean hit
    const TIME_PENALTY   = 0.8;  // clock removed on a miss — see Section 1
    const POINTS_PER_LEVEL = <old value * 7>;  // see 3.3
    const ELITE_SCORE      = <old value * 3>;  // see 3.4
    const STORAGE_KEY = '<existing key, version suffix bumped by 1>';

### 3.2 Difficulty — continuous and unbounded

The old shape clamps at `p = 1` (level 15), which is why difficulty stops rising. New shape:

    import { getStartLevel, getDifficultyProgress, ramp } from '<path>/lib/drillDifficulty';

    const getLevelConfig = (level, combo = 0) => {
      const p = getDifficultyProgress(level);
      const heat = (getComboMultiplier(combo) - 1) / 2;
      return {
        someParam: ramp(START, FLOOR, p) * (1 - heat * H),
        // ...
      };
    };

**Mechanical rule for FLOOR** — preserves the drill's current feel exactly through level 15:

    FLOOR = (oldClampValue - 0.2397 * START) / 0.7603

where `START` is the level-1 value and `oldClampValue` is the number inside the old
`Math.max(...)`. Worked example from flick-shot: ttl `Math.max(380, 1300 - curve*920)`
gives `START=1300`, `oldClamp=380`, so `FLOOR = (380 - 311.6) / 0.7603 = 90`, i.e.
`ramp(1300, 90, p)`.

`H` (heat weight) = `1 - (value at max heat) / (value at level 15)`. Flick-shot's came out
at 0.30–0.67; keep each drill's own ratios.

**The parameter that decides success — target time-to-live, flash window, trial duration —
must have a FLOOR below human reaction time (~200ms).** That is what guarantees every run
ends. Size and position params may keep a small sanity floor via `Math.max(4, ...)`.

### 3.3 Level — continuous, never persisted

    // was: Math.floor(score / POINTS_PER_LEVEL) + 1 + getComboBonusLevel(combo)
    const rawLevel = (eRef.score / POINTS_PER_LEVEL) + 1;
    eRef.level = Math.max(eRef.level, rawLevel);

- Remove the `getComboBonusLevel` import and call. It added a whole level every 4th hit —
  that is the "sudden jump". Combo still drives the score multiplier and heat.
- No `Math.floor` in the maths. Floor **only** for display (`Math.floor(e.level)`) and when
  saving `bestLevel`.
- `getStartLevel()` takes **no argument** and always returns 1. Never seed from `bestLevel`.

**`POINTS_PER_LEVEL` must rise roughly 7x.** The old values were tuned for a run capped at
45s that could never pass level 15. Uncapped, the old value makes difficulty outrun the
player in about 30 hits and modelled hit rate collapses to 14%. Flick-shot went 250 → 1800.

### 3.4 Time economy

    import { drillPenalty } from '<path>/lib/drillPenalty';

    // on a clean hit, after score is added:
    eRef.timeLeft += TIME_PER_HIT;

    // on a miss / timeout / idle click — ALWAYS gated, see Section 1:
    if (drillPenalty.isEnabled()) eRef.timeLeft -= TIME_PENALTY;

- The clock is **uncapped**. Do not clamp it with `Math.min`.
- If the drill's start card states a failure rule, make it reflect the live setting so it
  does not lie when the toggle is on. Read `drillPenalty.isEnabled()` into state in the same
  `useEffect` that already hydrates `drillAudio` / `drillFlash`, and switch the rule text on
  it. Flick-shot does this — copy that.
- **Never** deduct score. Score-negative is not part of this change.
- `ELITE_SCORE` must rise about 3x, because runs are 2–3x longer and points per hit grows
  with level. Left unchanged, every player grades S+. Flick-shot went 17000 → 50000.
  For the visual drills whose `ELITE_SCORE` is 1000 the scale is different — measure a real
  run before picking the number rather than multiplying blindly.

### 3.5 Universal result card

Replace the drill's hand-rolled end screen with:

    import DrillResultCard from '<path>/components/drill/DrillResultCard';

    {gameState === 'gameOver' && analytics.grade && (
      <DrillResultCard
        accent="<drill identity colour>"
        grade={analytics.grade}
        score={uiScore}
        isNewBest={isNewBest}
        stats={[ /* exactly 4: { value, suffix?, label } */ ]}
        onPlayAgain={enterDrill}
        onShare={shareScore}
        onExit={handleExitDrill}
      />
    )}

Accents available: `emerald`, `blue`, `violet`, `amber`, `rose`, `cyan`. Delete the replaced
JSX and any imports it orphans (`Share2`, `LogOut`, `RefreshCw`).

### 3.6 SEO and copy — mandatory, in the same run as the code

- `lib/drillsRegistry.js`: this drill's `"duration": "45s"` is now wrong. Use `"45s+"`.
- Remove "15 Levels" and "15-level curve" claims from the client **and its `page.js`**.
- Remove or reword any "45 second" / "45-second" fixed-session claim on both files.
- **If the drill's copy claims there is no time penalty, it now needs a condition**, because
  the penalty is available as an opt-in setting. These claims sit inside FAQ schema markup,
  so they must stay accurate. Reword to say the penalty is off unless the player enables
  "Time Penalty" in session settings — do not simply delete the answer. Affected Tier A
  drills: `visual/reaction-speed/go/no-go`, `visual/reaction-speed/light-reaction`,
  `visual/tracking-accuracy/moving-target` — client **and** `page.js` for each.
- Do not invent performance claims to replace removed copy.

---

## 4. Expected errors and bugs

| Symptom | Cause | Fix |
|---|---|---|
| Build error: `getComboBonusLevel is not defined` | import removed, call left behind | delete the call too |
| Difficulty feels unchanged past level 15 | a `Math.max` still wraps a `ramp()` | only size/position params keep a floor |
| Run never ends, player survives indefinitely | the deciding param's FLOOR is above ~200ms | lower it |
| Everyone grades S+ | `ELITE_SCORE` not rescaled | multiply about 3x, then verify by playing |
| Run ends in ~30 hits, hit rate collapses | `POINTS_PER_LEVEL` not raised | multiply about 7x |
| Old personal best unbeatable or trivial | `STORAGE_KEY` not bumped | bump the version suffix |
| Timer UI freezes or shows a stale value | `Math.ceil(timeLeft)` compared against a stale ref | the ref must update whenever the ceil changes, in **both** directions — the clock now goes up as well as down |
| Timer renders `NaN` | `timeLeft -= TIME_PENALTY` ran before `timeLeft` was initialised | apply the penalty only while `gameState === 'playing'` |
| Penalty applies even with the toggle off | a penalty site left ungated | every site needs `if (drillPenalty.isEnabled())` |
| Toggle has no effect until reload | `drillPenalty.isEnabled()` read once into a const outside the loop | read it at the penalty site, not at module or render scope |
| Start card promises no penalty while hard mode is on | rule text hardcoded | switch it on the hydrated `penaltyEnabled` state |
| Level HUD shows `12.7` | fractional level reached the UI | `Math.floor` at the display site only |
| Result card blank | `analytics.grade` expects `.letter`; `getFpsScoreGrade()` returns `.grade` | map it: `{ letter: rating.grade, label: rating.label, color: rating.color }` |
| Targets vanish or render inverted | a `ramp()` product went below the sanity floor | keep `Math.max(4, ...)` on radius |
| Drill with lives ends early, ignoring the clock | lives are still wired to `endGame` | out of scope — leave the lives logic alone |

---

## 5. Tier A — convert, one at a time, in this order

`CONFIRMED` = discrete spawn → click → timeout verified in the source. `VERIFY` = classified
from code signatures only; the agent must confirm the drill really has a discrete hit event
with a time-to-live before converting, and report back instead of guessing if it does not.

| # | Drill path | Client file | PPL now → target | ELITE now → target | Confidence |
|---|---|---|---|---|---|
| 1 | `fps/flick-shot-training` | ProFlickClient.js | 250 → 1800 | 17000 → 50000 | **DONE — reference** |
| 2 | `fps/180-degree-awareness` | AwarenessDrillClient.js | 250 → 1750 | 17000 → 51000 | CONFIRMED |
| 3 | `fps/instant-response` | InstantResponseClient.js | 200 → 1400 | 16000 → 48000 | CONFIRMED |
| 4 | `fps/target-switching-swarm` | TargetSwitchingSwarmClient.js | 200 → 1400 | 16000 → 48000 | CONFIRMED |
| 5 | `fps/micro-correction-precision` | MicroCorrectionClient.js | 130 → 900 | 17000 → 51000 | CONFIRMED |
| 6 | `fps/target-acquisition` | TargetAcquisitionClient.js | 300 → 2100 | 18000 → 54000 | CONFIRMED |
| 7 | `fps/target-prioritization` | TargetPrioritizationClient.js | 200 → 1400 | 16000 → 48000 | CONFIRMED |
| 8 | `motor/hand-eye-coordination/aim-trainer` | AimTrainerClient.js | 250 → 1750 | 16000 → 48000 | CONFIRMED |
| 9 | `motor/hand-eye-coordination/precision-flick-shot` | PrecisionFlickShotClient.js | 200 → 1400 | 17000 → 51000 | CONFIRMED |
| 10 | `cognitive/processing-speed/reaction-time` | EliteNeuroSwitchClient.js | 250 → 1750 | 7500 → 22000 | CONFIRMED |
| 11 | `cognitive/processing-speed/symbol-matching` | SymbolMatchingClient.js | 250 → 1750 | 7500 → 22000 | CONFIRMED |
| 12 | `cognitive/focus/distraction-fighter` | DistractionFighterClient.js | 250 → 1750 | 7500 → 22000 | CONFIRMED |
| 13 | `visual/reaction-speed/light-reaction` | StrobeLatencyClient.js | 750 → 5250 | 1000 → measure | CONFIRMED + FAQ fix |
| 14 | `visual/reaction-speed/go/no-go` | ChromaSyncClient.js | 900 → 6300 | 1000 → measure | CONFIRMED + FAQ fix; has lives |
| 15 | `visual/tracking-accuracy/moving-target` | KineticInterceptClient.js | 750 → 5250 | 1000 → measure | VERIFY + FAQ fix |
| 16 | `physical/reflex-training/drop-catch` | DropCatchClient.js | 250 → 1750 | 17000 → 51000 | VERIFY |
| 17 | `physical/fitness/speed-drill` | SpeedDrillClient.js | 250 → 1750 | 17000 → 51000 | VERIFY |
| 18 | `physical/reflex-training/peripheral-threat-sweeper` | PeripheralThreatSweeperClient.js | 250 → 1750 | 17000 → 51000 | VERIFY |
| 19 | `cognitive/attention/multi-tasking` | DualTargetFlowClient.js | 250 → 1750 | 7500 → 22000 | VERIFY |
| 20 | `cognitive/attention/divided-attention` | DividedAttentionClient.js | 250 → 1750 | 10000 → 30000 | VERIFY |
| 21 | `motor/movement-speed/finger-sequencing` | FingerSequencingClient.js | 250 → 1750 | 16000 → 48000 | VERIFY |
| 22 | `fps/recoil-control` | RecoilControlClient.js | 2500 → 17500 | 40000 → 120000 | VERIFY — spray pattern, may not fit |
| 23 | `fps/angle-hold-trainer` | AngleHoldClient.js | 150 → 1050 | 12000 → 36000 | VERIFY — hold mechanic, may not fit |

The target PPL and ELITE columns are the 7x / 3x rule applied to each drill's current value.
They are starting points to validate by playing, not measured figures.

---

## 6. Do NOT convert — wrong mechanic for this model

**Continuous tracking / dwell scoring** (no discrete hit, so there is nothing to award time
for): `fps/pro-smooth-pursuit`, `fps/strafe-tracking`, `fps/vertical-air-track`,
`fps/anti-zigzag-movement-trainer`, `fps/anti-strafe-jitter-duel`, `fps/flow-state`,
`visual/tracking-accuracy/pursuit-tracker`, `visual/tracking-accuracy/multiple-targets`
(MOT — excluded by the user), `motor/precision-control/steady-hand`,
`motor/precision-control/tracing`, `motor/hand-eye-coordination/drag-and-drop`.

**Sequence, recall and adaptive-staircase drills** (difficulty is span length, not speed, and
several are deliberately adaptive — making them monotonic would break the test):
all seven `memory/*` drills, `cognitive/focus/concentration-grid`,
`cognitive/attention/concentration-stamina`, `cognitive/processing-speed/rsvp-reader`,
`visual/visual-recognition/entropic-grid`, `visual/visual-recognition/rhythm-anomaly`,
`visual/visual-recognition/visual-search`, `visual/depth-perception/distance-judgment`,
`motor/movement-speed/keyboard-recognition`, `motor/movement-speed/rapid-tapping`,
`physical/coordination/complex-pattern`, `physical/coordination/cross-body-movement`,
`physical/coordination/dynamic-grid-evasion`, `physical/fitness/agility-ladder`,
`physical/fitness/jump-sequence`, `physical/balance-training/stability-challenge`,
`physical/reflex-training/quick-dodge`, `physical/reflex-training/reaction-chain`.

These keep their fixed 45s clock and their existing difficulty. Their published
"no negative score or time" FAQ answers stay true and must not be edited.

---

## 7. Per-drill verification before reporting done

1. `npx next build` is clean.
2. Play once: the level starts at 1 even after a previous high-level run.
3. Difficulty visibly keeps tightening past level 15.
4. The clock rises on a good streak and falls when missing.
5. The run ends on its own — it must not be survivable indefinitely.
6. The result card renders with a grade letter and four stat tiles.
7. `grep` the client and its `page.js` for `15 Level`, `45 second`, `45-second`, and any
   "no time penalty" claim. None may remain if they are now false.
