# TARGET ACQUISITION — IMPLEMENTATION PLAN

**Drill:** `app/drills/fps/target-acquisition/`
**Client:** `TargetAcquisitionClient.js` (1,304 lines) · **Page:** `page.js` (184 lines)
**Read first:** `implementation/fps/_MASTER_SPEC.md`
**Reference implementation:** `app/drills/fps/180-degree-awareness/` — **already conforms.
Copy its patterns rather than inventing new ones.**

---

## 0. READ THIS BEFORE WRITING ANY CODE

Four mistakes were made on the previous drill. Do not repeat them:

1. **Sound values come from the reference app's DRILL, not its `lib/audioSynth.js`.**
   The canonical source is
   `"...global-drill-system-nextjs - Copy - Copy"/app/drills/cognitive/processing-speed/reaction-time/EliteNeuroSwitchClient.js`.
   That app is **read-only — never modify it.** You do not need to open it: every value you
   need is already correct in **`lib/drillAudio.js`** in this repo. **Just import it.**
2. **Do not invent sound events.** There is no level-up sound and no combo sound. Five events
   only.
3. **Red is the only flash colour.** No gold, no cyan.
4. **Difficulty must be aggressive AND must keep scaling to L15.** Fast climbing into a curve
   that saturates early is still boring.

**Golden rule:** everything shared already exists. `lib/drillAudio.js`, `lib/drillDifficulty.js`,
`lib/canvasFx.js`, `lib/scoringEngine.js`, `components/drill/DrillFooter.js`. Import them.
Write no new audio, difficulty, or grading logic.

---

## 1. WHAT THIS DRILL IS

Multiple targets (2-5) spawn simultaneously. One is the "correct" target, distinguished only by
a small **opacity difference** from the decoys. The player must find and click it. Clearing all
targets in a set awards a bonus.

The trained skill is **visual discrimination under time pressure** — luminance sorting and
threat selection, not raw flick speed. Difficulty scaling must therefore attack the
*discrimination* (shrinking `opacityDelta`), not just target size.

**Preserve this mechanic. Everything below changes how it scales, sounds, scores, and looks —
never what it is.**

---

## 2. AUDIT — 14 DEFECTS

| # | Defect | Location |
|---|---|---|
| 1 | Inline `class AudioSynthesizer` with 3 non-canonical sounds (`playPop`, `playSetClear`, `playThud`) | L17-80 |
| 2 | **`-2.0s` time penalty ×2** | L522, L543 |
| 3 | Only **5 difficulty levels**, hardcoded score thresholds, discrete jumps | L257-283 |
| 4 | Score has **no combo, no level, no speed component** (`+20` / `+100` flat) | L483, L493 |
| 5 | **Bronze→Master rank system** — leftover of the deleted tier engine | L194-211 |
| 6 | **No 3-2-1 countdown** | — |
| 7 | Flash is a **background-colour swap**, not the shared `fx-flash-red` overlay | L537, L557, L793 |
| 8 | **Fullscreen not restored** on resume — only `requestPointerLock()` | L836, L849 |
| 9 | **5 stat cards** (spec: exactly 4); sensitivity shown as a stat | L779-783 |
| 10 | H1 long and inside a left-aligned header block, not centered above the box | L759 |
| 11 | **No instruction accordions** | — |
| 12 | Only **4 related-drill cards** (spec: 6) | L1138-1141 |
| 13 | **Pinterest** in footer; footer duplicated inline | L1209, L1148 |
| 14 | **FAQ schema has 5 Qs, page shows 8, wording differs.** No `VideoGame` schema. No `opengraph-image.js` | `page.js` |

---

## 3. SHARED COMPONENTS TO EXTRACT FIRST

180° Awareness has these **inline**. This is the first drill that also needs them, so extract
them now — 14 further drills will reuse them.

### 3.1 `components/drill/DrillCountdown.js`

Lift from `AwarenessDrillClient.js` (the `countdownValue` state, the four `setTimeout` chain,
and the countdown overlay JSX).

```jsx
<DrillCountdown value={countdownValue} accent="#f59e0b" subtitle="First set spawns at GO" />
```

- Sequence `3 → 2 → 1 → GO`, **700 ms per step**, then begin play at +350 ms
- Each digit fires `drillAudio.playCountdownTick()`; `GO` fires `drillAudio.playGo()`
- Digit uses `key={value}` + `.fx-pop-in` so each number re-animates
- 112 px circle, 3 px ring, counter-rotating accent arc (`animate-spin`, 0.7 s)
- Renders **inside the drill box**, `z-50`, over `bg-black/55 backdrop-blur-[2px]`
- **Store every timeout id in a ref and clear them on unmount** — 180 does this; skipping it
  leaves timers firing into an unmounted tree
- Refactor 180 to use the extracted component too, so there is one implementation

### 3.2 `components/drill/DrillAccordion.js`

Lift from `AwarenessDrillClient.js`.

- Single-open (`openAccordion` holds one id or `null`), chevron rotates 180°, `fx-fade-up`
- `aria-expanded` set correctly; keyboard operable
- Four sections per drill: **How to Play · Rules & Scoring · About This Drill · FAQ**

---

## 4. AUDIO — DELETE AND REPLACE

**Delete L17-80 entirely** (the inline `AudioSynthesizer` class and its singleton).

```js
import { drillAudio } from '../../../../lib/drillAudio';
```

**Remap every call site:**

| Current | Becomes | Why |
|---|---|---|
| `audioSynth.playPop()` (L512) | `drillAudio.playHit()` | Correct target clicked |
| `audioSynth.playSetClear()` (L504) | `drillAudio.playHit()` | Set cleared — **no separate fanfare**, that would be a notification |
| `audioSynth.playThud()` (L526, L546) | `drillAudio.playPenalty()` | Wrong target / empty-space click |
| `audioSynth.init()` / `.setEnabled()` | `drillAudio.init()` / `.setEnabled()` | — |

Add `drillAudio.playSessionEnd()` in the end-game handler — currently the drill ends silently.

**The five events are the complete vocabulary.** Do not add a sixth. `playSpatialCue` is
reserved for `180-degree-awareness` and must **not** be used here.

---

## 5. DIFFICULTY — 5 DISCRETE LEVELS → 15 CONTINUOUS

**Delete L257-283.** The hardcoded thresholds (`>= 2000`, `>= 1200`, `>= 700`, `>= 300`) and the
five-branch ternary chains all go.

```js
import { MAX_LEVEL, getStartLevel, getDifficultyProgress } from '../../../../lib/drillDifficulty';

const POINTS_PER_LEVEL = 300;

const getLevelConfig = (level) => {
  const p = getDifficultyProgress(level);   // 0 → 1 across L1..L15
  return {
    count:        Math.round(2 + p * 4),    // 2 → 6 targets on screen
    radius:       32 - p * 18,              // 32 → 14 px
    opacityDelta: 0.45 - p * 0.40,          // 0.45 → 0.05  ← the real difficulty
    margin:       120 - p * 90,             // 120 → 30 px (targets spread wider)
    hitPad:       10 - p * 6,               // 10 → 4 px
  };
};
```

**Rules:**

- Every value is driven by `getDifficultyProgress(level)` and reaches its extreme **exactly at
  L15**. **No `Math.max`/`Math.min` clamps that bite before L15** — that bug made levels 12-15
  identical on the previous drill.
- **`opacityDelta` is the primary difficulty axis** for this drill. At L15 a 0.05 delta is a
  genuine discrimination challenge. Do not soften it to compensate for smaller targets.
- **`hitPad` must scale.** A flat pad eventually exceeds the target radius and shrinking targets
  stops mattering. Use `dist <= radius + config.hitPad`.

**Level progression — monotonic, never regresses:**

```js
const rawLevel = Math.floor(eRef.score / POINTS_PER_LEVEL) + 1;
eRef.level = Math.min(MAX_LEVEL, Math.max(eRef.level, rawLevel));
bestLevelRunRef.current = Math.max(bestLevelRunRef.current, eRef.level);
```

**Session start — resume at 65% of personal best:**

```js
const startLevel = getStartLevel(saved.bestLevel);
```

---

## 6. SCORING

### 6.1 Delete all penalties

```js
eRef.timeLeft -= 2.0;   // L522 — DELETE
eRef.timeLeft -= 2.0;   // L543 — DELETE
```

A wrong click does exactly this and nothing more:

1. `combo = 0`
2. `mistakes += 1`
3. `drillAudio.playPenalty()`
4. `triggerFlash()` (red)
5. **Score unchanged. Timer unchanged.**

The timer is a fixed, uninterruptible 45 s.

### 6.2 New score formula

```js
import { getComboMultiplier } from '../../../../lib/scoringEngine';

// Correct target hit
const levelMult = 1 + getDifficultyProgress(eRef.level) * 0.5;   // 1.0 → 1.5
eRef.score += Math.round(100 * getComboMultiplier(eRef.combo) * levelMult);

// Set cleared — flat bonus, no combo multiplier (it rewards the set, not the streak)
eRef.score += Math.round(400 * levelMult);
```

**Base raised from 20/100 to 100/400 deliberately.** It puts an elite run at ~18,000, matching
180° Awareness's ~17,000, so scores are comparable across the FPS category instead of each drill
living on its own arbitrary scale.

**Read `levelMult` BEFORE the level update**, so a hit is paid at the difficulty it was actually
made at.

**Why the level multiplier is not optional:** a returning player resumes at 65% of their best
level and faces 6 targets at a 0.05 opacity delta. Without it they score *less* than a beginner
on 2 targets at 0.45 — and since the grade is score-based (§6.3), skill would be punished.

### 6.3 Grade — delete the rank system

**Delete L194-211** (`Bronze` / `Silver` / `Gold` / `Platinum` / `Diamond` / `Master`). It is a
leftover of the tier engine that was deleted in Phase 1.

```js
import { getFpsScoreGrade } from '../../../../lib/scoringEngine';

const ELITE_SCORE = 18000;   // 100% mark for this drill — raise if S becomes common
const rating = getFpsScoreGrade(e.score, ELITE_SCORE);
```

Returns a `SCORE_TIERS` entry (`letter`, `label`, `color`). Uses a square-root curve so every
grade is reachable — do not linearise it.

### 6.4 Track accuracy

Not currently tracked, but needed for the stat cards and coach advice:

```js
eRef.totalClicks++;      // every click
eRef.correctHits++;      // correct target only
const accuracy = eRef.totalClicks > 0
  ? Math.round((eRef.correctHits / eRef.totalClicks) * 100) : 0;
```

---

## 7. VISUAL FEEDBACK

### 7.1 Replace the background swap with the shared overlay

Delete `flashBg` state, both `setFlashBg('red')` blocks (L537, L557), and the conditional
`backgroundColor` on L793. The container background is **always `#050508`**.

```js
const triggerFlash = useCallback(() => {
  const id = Date.now() + Math.random();
  setFlashes((f) => [...f, { id }]);
  setTimeout(() => setFlashes((f) => f.filter((x) => x.id !== id)), 480);
}, []);
```

```jsx
{flashes.map((f) => <div key={f.id} className="fx-flash fx-flash-red" />)}
```

Red fires on wrong-target clicks and empty-space clicks. **Nothing else flashes** — no set-clear
flash, no level-up flash.

### 7.2 Targets

Use `drawPulseRing` from `lib/canvasFx.js` with a per-target seed. Same construction as every
other drill: radial gradient body, 2 px rim at 90% opacity. Hit effect is identical everywhere —
120 ms expanding ring + `fx-score-popup` `+N` + `drillAudio.playHit()`.

Also apply `createBackdropCache` and `getCanvasDpr()` from the same module — the static backdrop
is currently redrawn every frame, and DPR must be capped at 2.

⚠️ **`opacityDelta` must survive all of this.** The correct target is identified *only* by
opacity. Do not let a pulse ring, glow, or gradient give it away — the decoys must receive
byte-identical treatment apart from the opacity value itself. **This is the drill's entire
mechanic; breaking it makes the drill trivial.**

---

## 8. LAYOUT

### 8.1 Structure

```
Breadcrumb:  Home › FPS › Target Acquisition
        <H1 — CENTERED, above the box>
  [ Score ] [ Time ] [ Accuracy ] [ Best ]     ← exactly 4
╔══════════════════════════════════════════╗
║ Score                              Time  ║   ← only 3 things in the box
║              [ GAME CANVAS ]             ║
║                                    [🔊]  ║
╚══════════════════════════════════════════╝
  ▸ How to Play      ▸ Rules & Scoring
  ▸ About This Drill ▸ FAQ
  Related FPS Drills (6)
  Footer — IG · FB · YT · X
```

### 8.2 H1

L759 currently reads `Target Acquisition Trainer – FPS Strafe Drill` inside a left-aligned
header. Two problems: it's not centered above the box, and **"Strafe" is wrong** — this drill
has nothing to do with strafing, which also misleads search intent.

```jsx
<div className="text-center mb-4">
  <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-sans">
    Target Acquisition Pro
  </h1>
</div>
```

### 8.3 Stat cards — 5 → 4

Delete the `Level`, `Sets Cleared`, and `Sens` cards. Final set: **Score · Time · Accuracy · Best**.

### 8.4 Inside the box — exactly 3

Score `top-4 left-4` · Time `top-4 right-4` (red at ≤10 s) · Sound `bottom-4 right-4`.
Delete everything else. Score/Time are `pointer-events-none`; the sound button
`e.stopPropagation()` on both `onPointerDown` and `onClick`.

### 8.5 Sensitivity slider → start card

Currently a read-only stat card. Make it a working slider **on the start card**, between the
how-to rows and the mini-stats — it is pre-flight calibration, not a setting, and burying it
means players start miscalibrated and never find out why. Persist to
`localStorage` under `targetacq_sens`.

Start card order: icon badge → name → one-liner → 3 how-to rows → sensitivity → 3 mini-stats
(Best · Combo · `Lv.{bestLevel}`) → START. Must fit 800×450 **without scrolling**.

### 8.6 Fullscreen resume

Replace both `requestPointerLock()`-only handlers (L836, L849):

```js
const resumeDrill = useCallback(async () => {
  if (containerRef.current && !document.fullscreenElement) {
    try { await containerRef.current.requestFullscreen(); } catch (e) {}
  }
  if (canvasRef.current && !document.pointerLockElement) {
    try { await canvasRef.current.requestPointerLock(); } catch (e) {}
  }
}, []);
```

**Fullscreen first, then pointer lock — the order is not optional.** ESC releases both; the
fullscreen transition resizes the canvas and silently discards a lock acquired before it, which
traps the player in a pause loop that looks like a frozen drill.

Update the overlay copy to *"Click to resume — fullscreen and cursor lock will re-engage."*

### 8.7 Duration, storage, cursor, footer, related

- `const DRILL_DURATION = 45;` and delete the `timeLeft -= 1` per-second decrement in favour of
  the same smooth timer 180 uses
- **Bump the storage key to `..._v2`** — scores are on a new scale and old bests would be
  permanently unbeatable
- `cursor-none` during play (canvas-drawn crosshair), `cursor-crosshair` otherwise,
  `cursor-pointer` on all buttons
- Replace the inline `<footer>` (L1148-1210) with `<DrillFooter />` — **removes Pinterest**
- Related drills 4 → **6**: `180-degree-awareness`, `target-switching-swarm`,
  `target-prioritization`, `flick-shot-training`, `micro-correction-precision`, `instant-response`

---

## 9. SEO

### 9.1 FAQ parity — highest risk item

`page.js` ships **5** questions; the page renders **8**, with different wording. Google revokes
rich results for schema describing content that isn't visible.

**The visible accordion is the source of truth.** Regenerate the `FAQPage` schema from the 8
`FAQItem` entries at L1114-1121, word for word. **No numbering prefixes** in either place —
schema `name` renders directly into search results, and a leading "1." reads as broken markup.

### 9.2 Add `VideoGame` schema

Alongside the existing `SoftwareApplication`:
`gamePlatform: "Web Browser"`, `genre: ["FPS Training", "Aim Trainer"]`,
`playMode: "SinglePlayer"`, `applicationCategory: "Game"`.

### 9.3 `opengraph-image.js` — mandatory

Copy `app/drills/fps/180-degree-awareness/opengraph-image.js`. Change:

- `ACCENT` → `'#f59e0b'` (amber — this drill's identity)
- Title → `Target Acquisition Pro`
- Description → *"Find and eliminate the correct target among decoys. Train visual discrimination and threat selection under pressure."*
- Stat pills → `45-SECOND DRILL`, `15 DIFFICULTY LEVELS`, `RAW MOUSE INPUT`, `FREE — NO SIGN-UP`

**Then delete the `images` arrays from BOTH `openGraph` and `twitter` in `page.js`.** They point
at `icon-512x512.png` — a square — while `twitter.card` is `summary_large_image`, which needs
1200×630. X silently downgrades to a small card; Discord/WhatsApp show a tiny thumbnail. Leaving
the manual array puts the wrong-shaped image back in the candidate list.

**Satori constraints:** flexbox only, **no CSS grid**, explicit `display: flex` on any element
with more than one child, and font weights above ~700 fall back to regular.

### 9.4 Keywords and copy

- **Primary:** `target acquisition aim trainer`
- **Secondary:** `first shot accuracy drill`, `target selection training fps`,
  `CS2 target acquisition practice`, `Valorant target priority drill`
- **Long-tail:** `how to find enemies faster in fps`, `how to improve target selection valorant`,
  `best drill for first shot accuracy`, `free browser target acquisition trainer`,
  `visual discrimination training for gamers`, `how to stop missing the right target`

"About This Drill" carries 400-500 words: what target acquisition is neurologically, why
discrimination differs from raw flick speed, how luminance sorting works, and what good looks
like. Coaching voice, not keyword filler.

---

## 10. EXECUTION ORDER

| # | Step | Depends on |
|---|---|---|
| 1 | Extract `DrillCountdown.js` + `DrillAccordion.js`; refactor 180 to use them | — |
| 2 | Delete inline audio class; import `drillAudio`; remap 4 call sites; add `playSessionEnd` | 1 |
| 3 | Delete rank system; wire `getFpsScoreGrade` + `ELITE_SCORE` | — |
| 4 | New `getLevelConfig` + `POINTS_PER_LEVEL` + monotonic level + `getStartLevel` | — |
| 5 | New score formula; **delete both `-2.0s` penalties**; track accuracy | 4 |
| 6 | Replace `flashBg` with `fx-flash-red` overlay | — |
| 7 | Canvas: `drawPulseRing`, `createBackdropCache`, `getCanvasDpr` | — |
| 8 | Layout: H1, 4 stat cards, in-box 3, sensitivity slider, cursor | — |
| 9 | `resumeDrill()` fullscreen-then-lock | — |
| 10 | 45 s + storage `_v2` + `DrillFooter` + 6 related | — |
| 11 | Accordions wired with real content | 1 |
| 12 | SEO: FAQ parity, `VideoGame`, `opengraph-image.js`, keywords, About copy | 11 |

---

## 11. ACCEPTANCE CHECKLIST

**Audio**
- [ ] Zero local audio code; `drillAudio` imported
- [ ] Only the 5 canonical events; **no `playSpatialCue`** in this drill
- [ ] Wrong target **and** empty-space click both fire `playPenalty()`
- [ ] `playSessionEnd()` fires on the result card

**Difficulty & scoring**
- [ ] 15 levels via `getDifficultyProgress`; **no clamps biting before L15**
- [ ] L11 and L15 are measurably different (more targets, smaller, lower opacity delta)
- [ ] `hitPad` scales down; never exceeds target radius
- [ ] Level monotonic; resumes at 65% of best
- [ ] `POINTS_PER_LEVEL = 300`; L15 reachable in ~15 s of strong play
- [ ] Score includes combo **and** level multiplier
- [ ] **Zero time penalties/rewards; zero negative scoring**; fixed 45 s
- [ ] Grade from `getFpsScoreGrade(score, 18000)`; Bronze→Master system deleted

**Visual**
- [ ] `fx-flash-red` overlay; `flashBg` deleted; container always `#050508`
- [ ] **Red is the only flash**
- [ ] Decoys and the correct target differ by opacity **only**
- [ ] `cursor-none` during play

**Layout**
- [ ] H1 centered above the box, reads `Target Acquisition Pro` (no "Strafe")
- [ ] Exactly 4 stat cards; exactly 3 things in the box
- [ ] Sensitivity slider on the start card; start card doesn't scroll at 800×450
- [ ] ESC → resume returns to **fullscreen**, no pause loop
- [ ] 4 accordions; 6 related drills; footer is IG · FB · YT · X

**SEO**
- [ ] FAQ schema === visible FAQ, word for word, 8 = 8, no numbering
- [ ] `VideoGame` schema present
- [ ] `opengraph-image.js` builds to a valid PNG at **exactly 1200×630**
      (verify: `.next/server/app/drills/fps/target-acquisition/opengraph-image.body`)
- [ ] Manual `images` arrays deleted from `openGraph` **and** `twitter`

**Build**
- [ ] `npx next build` exits 0 with no errors or warnings
- [ ] 180° Awareness still works after the countdown/accordion refactor
