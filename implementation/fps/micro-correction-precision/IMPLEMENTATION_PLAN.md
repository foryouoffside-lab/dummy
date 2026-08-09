# MICRO-CORRECTION AIM TRAINER (micro-correction-precision) — IMPLEMENTATION PLAN

**Drill:** `app/drills/fps/micro-correction-precision/`
**Client:** `MicroCorrectionClient.js` (1,121 lines) · **Page:** `page.js` (272 lines) · **OG image:** `opengraph-image.js` (already correct — see §9)
**Read first:** `implementation/fps/_MASTER_SPEC.md`
**Reference implementation — copy its patterns exactly:** `app/drills/fps/180-degree-awareness/AwarenessDrillClient.js`
(this is the actual shipped file, not its own plan doc — where the two disagree, the shipped file wins, per the precedent already established in `implementation/fps/flick-shot-training/IMPLEMENTATION_PLAN.md` §9.4)

**Accent identity: keep cyan/sky (`#06b6d4` / `#38bdf8`).** Already used throughout this drill's
UI, its target colors, and its `opengraph-image.js`. Do not re-brand it — that would be a
cosmetic-only diff with no user-facing benefit and would touch files outside this drill.

---

## VERDICT

This is a strange case: **structurally, this is the second-most-conformant drill in the
category** — it already imports every shared module (`drillAudio`, `drillDifficulty`,
`canvasFx`, `scoringEngine`, `DrillFooter`, `DrillCountdown`, `DrillAccordion`) instead of
hand-rolling anything. No inline `AudioSynthesizer`, no duplicate JSON-LD, no time penalties.
On a surface read it looks nearly done.

**It is not done.** Reading the actual call sites turned up six defects that are worse than
anything cosmetic, because every one of them **fails silently**: the accordions never open, the
mute button doesn't mute, sound may not play at all on first launch, the FPS Hub can never show
this drill's level badge, clicking outside the drill box mid-session gets scored as a miss, and
"Back to Menu" can strand a player in fullscreen. None of these throw an error or show a warning
— they just quietly don't work, which is exactly why they survived up to now. Fix these six
first, before anything cosmetic.

**Already correct — do not touch:**
- ✅ Five canonical `drillAudio` events used correctly, no legacy/local synth
- ✅ `MAX_LEVEL` / `getStartLevel` / `getDifficultyProgress` from `lib/drillDifficulty.js`
- ✅ `getComboMultiplier` / `getFpsScoreGrade` from `lib/scoringEngine.js`
- ✅ `createBackdropCache` / `getCanvasDpr` from `lib/canvasFx.js`, DPR-capped, backdrop cached
- ✅ Zero time penalties, zero time rewards, fixed 45 s duration
- ✅ `<DrillFooter />` used (no Pinterest, no inline sitemap)
- ✅ `opengraph-image.js` present, correct 1200×630, correct copy, no manual `images` array
  clash in `page.js`
- ✅ `page.js` schemas: `BreadcrumbList` · `SoftwareApplication` · `VideoGame` · `FAQPage` (15 Qs)
  · `HowTo` — all present, and the FAQ schema text is **already word-for-word identical** to the
  client's FAQ accordion content (verified by direct comparison, not just count)
- ✅ Two-stage anchor→micro-correction core loop is a genuinely distinct, worthwhile mechanic —
  do not simplify it away

---

## 1. WHAT THIS DRILL IS

A large **anchor** target spawns first. Hitting it immediately spawns a small **micro** target
near where the anchor was — a short-distance secondary target that stands in for "the correction
you make after your flick already landed close." Precision on the micro hit (distance from
crosshair to micro-target center) drives a **precision multiplier** (0.7×–1.3×) on top of the
usual combo/level multipliers. Missing or timing out on *either* stage resets combo with no
time/score penalty, matching category convention.

This is the only drill in the category that scores **distance-to-center precision** rather than
pure hit/miss — that's worth preserving and, per §5.2 below, worth making the difficulty curve
actually protect instead of quietly undermining.

**Preserve:** the two-stage anchor→micro loop, the precision-multiplier formula, the dual green
(anchor) / cyan (micro) target coloring — that two-tone is a legitimate signal ("commit" vs
"refine"), not a spec violation. Nothing below changes what the mechanic *is*.

---

## 2. AUDIT — DEFECTS FOUND

| # | Defect | Severity | Location |
|---|---|---|---|
| 1 | `DrillAccordion` is a controlled component requiring `isOpen`/`onToggle` — this file passes neither, no `openAccordion` state exists at all. **All three accordions (Rules, About, FAQ) are permanently collapsed and un-openable.** | 🔴 Critical | L928, L941, L996; confirmed via `DrillAccordion.js` L6, L32 (`{isOpen && (...)}`) |
| 2 | `drillAudio.setEnabled()` is never called anywhere in the file. The sound toggle button flips only local `soundEnabled` UI state — it does not touch playback. | 🔴 Critical | L718-724 (button); confirmed absent file-wide |
| 3 | `drillAudio.init()` is never called synchronously inside `enterDrill()`. The first real sound (`playCountdownTick`) fires ~700 ms later inside a `setInterval` callback — outside the direct user-gesture chain some browsers require to resume a suspended `AudioContext`. Risk: silent audio, especially Safari/iOS, on every session start. | 🔴 Critical | L242-289 |
| 4 | Storage key is `skilldrills_fps_micro_correction_v2` — missing `_precision`. `FPSHubClient.js` computes its lookup key from `folderName` (`micro-correction-precision` → `skilldrills_fps_micro_correction_precision_v2`) and will **never** find this drill's saved data. The hub's `Lv. X` badge for this drill can never populate. | 🔴 Critical | L27; cross-checked against `FPSHubClient.js` L92-93 and `lib/drillsRegistry.js` L804 |
| 5 | Global `handleMouseDown` has no containment check (`containerRef.current.contains(e.target)`) unlike the reference. Any mousedown anywhere on the page while `gameState === 'playing'` is scored as a hit/miss attempt. | 🔴 Critical | L337-422 |
| 6 | "Back to Menu" only calls `setGameState('start')` — never `document.exitFullscreen()` / `exitPointerLock()`. A player can finish a session stuck in fullscreen with no way out short of pressing Esc manually. | 🟠 High | L912-918 |
| 7 | Countdown never shows `GO`. The `setInterval`-driven sequence goes `3 → 2 → 1 → playing`, skipping the GO frame the shared `DrillCountdown` and every other drill render, and giving the player zero reaction buffer before the first anchor spawns. | 🟠 High | L300-318 |
| 8 | `hitPad` (8→5 px) shrinks slower than `microRadius` (10→3.5 px). At L15 the forgiveness padding (5 px) is **larger than the visible micro target itself** (3.5 px) — the exact top-tier flattening `_MASTER_SPEC.md` §1.2 warns about, and it hits precisely the stat this drill exists to train. | 🟠 High | L55-65 |
| 9 | Anchor→micro travel distance **grows** with level (60–100 px → 200–260 px). At max difficulty the "micro-correction" is a ~230 px average flick — a second macro flick, not a correction. Works against the drill's own premise. | 🟠 High | L59, L151-162 |
| 10 | No `isTouchOnlyDevice` gate. Every other completed drill blocks touch-only devices with an explanatory message, since pointer lock requires a real mouse; this file lets a touch user tap Start into a drill that can never receive input. | 🟠 High | absent file-wide |
| 11 | Sensitivity applied to mouse movement is `universalSens * 0.8` (a hidden 0.8 fixed factor), but the displayed value and the `cm/360` estimate both assume a 1:1 mapping. The number shown never matches what's actually applied — actively counterproductive on a drill whose whole pitch is matching real in-game sensitivity. | 🟡 Medium | L330 vs L111 |
| 12 | Two different drill names on one page: H1/breadcrumb say "Micro-Correction Aim Trainer"; start-card heading says "Micro-Correction Precision". | 🟡 Medium | L663/673 vs L758 |
| 13 | Rule-tile copy understates the real numbers: "Up to +130 PTS" (actual ceiling ≈ 585) and "Up to 2.5x Multiplier" (shared `getComboMultiplier` ceiling is 3.0×, same as every sibling drill). | 🟡 Medium | L775, L932 |
| 14 | Start card and result card are not built on the shared 340px bordered-card template; no icon badge; buttons are flat `bg-cyan-600` instead of the drill-accent gradient every other drill uses. | 🟡 Medium | L755-826 |
| 15 | Result card is a single centered column with **9** stat tiles and the grade letter buried inside one of them — not the canonical 36%/64% split with a `text-6xl` hero grade. | 🟡 Medium | L829-921 |
| 16 | Page header carries an icon badge + subtitle the shared shell doesn't use (H1 should be bare and centered, per every completed drill). | 🟢 Low | L667-679 |
| 17 | In-box Score/Time are bordered "pill" cards at `z-20` without `pointer-events-none`; sound button lacks explicit `stopPropagation`. Spec is plain label+value at `z-30`/`z-40`. Functionally masked today by the button-tag check in `handleMouseDown`, but fragile and visually inconsistent with every other drill. | 🟢 Low | L708-724 |
| 18 | Container class is `bg-[#05060b]`; spec/backdrop cache use `#050508`. Visible as a one-frame mismatch before the first resize paints the cached backdrop. | 🟢 Low | L696 |
| 19 | Above-the-box `StatCard` uses `border-gray-800 bg-gray-900/50`; every completed drill uses `border-white/10 bg-black`. | 🟢 Low | L1049 |

Fix order: 🔴 (silent, functional) → 🟠 (difficulty integrity / missing safety) → 🟡 (accuracy/consistency) → 🟢 (visual polish).

---

## 3. CRITICAL BUGS — FIX FIRST

### 3.1 Wire up the accordions (Defect #1)

Add real state and pass the required props — this is a one-line-per-instance fix, not a rewrite:

```js
const [openAccordion, setOpenAccordion] = useState(null);
```

```jsx
<DrillAccordion
  id="rules"
  title="Drill Instructions & Scoring"
  subtitle="Anchor, then correct — precision decides your multiplier"
  icon={Brain}
  isOpen={openAccordion === 'rules'}
  onToggle={() => setOpenAccordion(openAccordion === 'rules' ? null : 'rules')}
>
```

Repeat for `about` (icon `Info`, blue) and `faq` (icon `Lightbulb`, yellow — **must stay its own
top-level instance**, never nested inside About, per `_MASTER_SPEC.md` §1.8). Delete the inert
`defaultOpen={true}` prop — `DrillAccordion` has no such prop; it was silently ignored.

This single fix is also the biggest SEO win available on this page: the `FAQPage` schema text
already matches the accordion content word-for-word (verified), but until the accordion can
actually open, that content **never exists in the rendered DOM at all** — worse than a text
mismatch, because there's nothing there to mismatch against. Fixing this makes an already-correct
schema finally mean something.

### 3.2 Wire up the mute button (Defect #2)

```js
useEffect(() => {
  drillAudio.setEnabled(soundEnabled);
}, [soundEnabled]);
```

Add this effect once; no other change needed. (Confirm no other stray `soundEnabled` reads exist
that would fight it — there are none today.)

### 3.3 Init audio inside the click gesture (Defect #3)

Add to the top of `enterDrill()`, before anything else:

```js
const enterDrill = useCallback(async () => {
  drillAudio.init();
  drillAudio.playCountdownTick(); // fires the "3" tick synchronously in the gesture, not 700ms later
  ...
```

This mirrors `180-degree-awareness`'s `enterDrill()` exactly (`drillAudio.init()` as the first
line). See §6 for the matching countdown rewrite — the tick for "3" moves out of the interval and
into this synchronous call, which also fixes Defect #7's missing `GO` frame in the same pass.

### 3.4 Fix the Hub storage-key mismatch (Defect #4)

```js
const STORAGE_KEY = 'skilldrills_fps_micro_correction_precision_v2';
```

**Do not just rename and ship it** — any player with existing progress under the old key
(`skilldrills_fps_micro_correction_v2`) would silently lose their `bestLevel`/`bestScore` and
appear to start over. Add a one-time fallback read in `getSavedData()`:

```js
const OLD_STORAGE_KEY = 'skilldrills_fps_micro_correction_v2';

const getSavedData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { bestScore: 0, bestCombo: 0, bestLevel: 1, totalSessions: 0, ...JSON.parse(raw) };
    const legacy = localStorage.getItem(OLD_STORAGE_KEY);
    if (legacy) return { bestScore: 0, bestCombo: 0, bestLevel: 1, totalSessions: 0, ...JSON.parse(legacy) };
    return { bestScore: 0, bestCombo: 0, bestLevel: 1, totalSessions: 0 };
  } catch (e) {
    return { bestScore: 0, bestCombo: 0, bestLevel: 1, totalSessions: 0 };
  }
};
```

The next `saveData()` call (end of the player's next session) writes it forward under the correct
key permanently. This is different from the retired `adaptiveDifficulty` tier keys in
`_MASTER_SPEC.md` §1.3 — those were a dead system being deleted outright; this is the same
drill's own progress data under a typo'd key, and losing it is a real regression for a returning
player, not a harmless orphan.

### 3.5 Add the containment check (Defect #5)

```js
const handleMouseDown = (e) => {
  if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
  if (!containerRef.current || !containerRef.current.contains(e.target)) return; // ADD
  if (gameState !== 'playing') return;
  ...
```

This matters most exactly when things are already going wrong: if `requestFullscreen()` is denied
or unsupported (common on iOS Safari, or any browser policy requiring a more direct gesture), or
if the player presses Esc mid-session, `isFullscreen` flips to `false` and the breadcrumb, stat
cards, accordions, and footer all reappear **underneath** the pause overlay — while `gameState`
is still `'playing'`. Without this guard, clicking any of that reappeared page chrome (a related-
drill link, an accordion header is a `<button>` so it's excluded, but the footer's social icons
are `<a>` tags) registers as a missed click against the live game.

### 3.6 Fix the exit handler (Defect #6)

```js
const handleExitDrill = useCallback(async () => {
  if (document.fullscreenElement) await document.exitFullscreen().catch(() => {});
  if (document.pointerLockElement) document.exitPointerLock();
  setGameState('start');
}, []);
```

Rewire the result screen's `LogOut` button (`title="Back to Menu"`) to call `handleExitDrill`
instead of the inline `() => setGameState('start')`.

---

## 4. SOUND EFFECTS

No new sounds, no new methods — the five canonical events are already correctly imported and
called (`playHit`, `playPenalty`, `playCountdownTick`, `playGo`, `playSessionEnd`). Nothing here
needs to change except the two wiring bugs already covered in §3.2 and §3.3. Do **not** add a
combo-tier chime or a level-up sound — `_MASTER_SPEC.md` §1.1 explicitly forbids both; difficulty
changes must be felt (smaller/faster targets), never announced.

Optional, non-blocking enhancement: this drill is the only one in the category with a genuinely
variable per-hit score (10 for an anchor, up to ~585 for a precise micro-hit at high level/combo),
and none of that variance is currently visible in the moment. `fx-score-popup` already exists in
`globals.css` and is unused by every FPS drill so far — a floating `+N` at the micro-hit location
would make the precision→points relationship legible in real time. This is allowed by
`_MASTER_SPEC.md` §2.3 ("the single permitted on-canvas text") but not required; skip it if time
is tight, the drill is fully spec-compliant without it.

---

## 5. DIFFICULTY SCALING

### 5.1 Fix the hitPad-exceeds-radius flattening (Defect #8)

Split the single shared `hitPad` into two curves, one per target, each derived from that
target's own radius so forgiveness can never exceed — or even approach — the target itself:

```js
const getLevelConfig = (level) => {
  const p = getDifficultyProgress(level); // 0 -> 1 across L1..L15
  const anchorRadius = 24 - p * 14;   // 24 -> 10 px
  const microRadius  = 10 - p * 6.5;  // 10 -> 3.5 px
  return {
    anchorRadius,
    microRadius,
    ttl:            1800 - p * 1300,        // 1800 -> 500 ms
    minDistance:    55  + p * 30,           // see §5.2
    maxDistance:    90  + p * 50,           // see §5.2
    anchorHitPad:   Math.max(2,   anchorRadius * (0.55 - 0.2 * p)), // ~13 -> ~3.5
    microHitPad:    Math.max(1.5, microRadius  * (0.6  - 0.2 * p)), // ~6   -> ~1.4
  };
};
```

Update the two hit tests to use the matching curve instead of one shared `cfg.hitPad`:

```js
// anchor hit test
if (dist <= eRef.anchor.radius + cfg.anchorHitPad) { ... }

// micro hit test
if (dist <= eRef.micro.radius + cfg.microHitPad) { ... }
```

Check the math holds at both ends: at L1, `microHitPad` ≈ 6 vs `microRadius` 10 (ratio 0.6, close
to today's feel); at L15, `microHitPad` ≈ 1.4 vs `microRadius` 3.5 (ratio 0.4) — forgiveness now
shrinks *faster* than the target across the whole curve instead of overtaking it. Verify by
playtest and nudge the `0.55-0.2p` / `0.6-0.2p` coefficients if L15 feels unfairly punishing or
still too forgiving; the shape (forgiveness as a fraction of that target's own current radius,
monotonically shrinking) is the part that must not regress.

### 5.2 Fix the anchor→micro distance inversion (Defect #9)

The recommended `minDistance`/`maxDistance` values above (55→85, 90→140) replace the current
60→200 / 100→260 growth. Reasoning: this drill is named for and scored on *micro* correction —
letting the travel distance triple by L15 turns the back half of the difficulty curve into a
second flick-shot drill wearing this one's UI. Keeping distance modest and letting `ttl` (1800→
500 ms) and `microRadius` (10→3.5 px) carry the difficulty ramp keeps every level testing the
thing the drill's name promises. Tune via playtest same as the hitPad coefficients — the direction
(distance stays small, radius/time do the work) is the part that matters.

### 5.3 Pacing check — `POINTS_PER_LEVEL`

Worked example, same method as `_MASTER_SPEC.md`'s worked example for 180: a full cycle here is
one anchor hit + one micro hit. Early game (p≈0): anchor pays `10 × 1.0 = 10`; micro pays
`100 × precisionMult(~1.0 avg) × comboMult(~1.15 avg early) × 1.0 ≈ 115`. A cycle nets ≈125 pts.
At a strong early pace, ~12-15 cycles land in the first 15 s (⅓ of the 45 s session) as combo and
level multipliers ramp, which puts `15 × POINTS_PER_LEVEL` in the same ballpark as the current
`130`. **This value is already close to correctly calibrated** — unlike 180's original 1000
(a 4× miss) or Pro Flick's 7-branch score-threshold ladder, this drill's pacing does not need a
rescue. Leave `POINTS_PER_LEVEL = 130` as-is; re-verify by playtest only after §5.1/§5.2 land,
since tightening `hitPad` will lower the effective hit rate slightly and could push L15 a little
later than intended — nudge down toward ~110-120 only if L15 arrives past the first third in
practice, per `_MASTER_SPEC.md`'s "`POINTS_PER_LEVEL` is the only knob for pacing" rule.

### 5.4 Copy accuracy (Defect #13)

```jsx
// was: <span className="text-sm font-black text-amber-400">Up to 2.5x Multiplier</span>
<span className="text-sm font-black text-amber-400">Up to 3.0x Multiplier</span>

// was: <RuleItem num="2" ... highlight="Up to +130 PTS" .../>
<RuleItem num="2" ... highlight="Precision + Combo Scaled" .../>
```

The combo ceiling comes from the shared `getComboMultiplier` (3.0× at 50-combo) — matching the
number every sibling drill already advertises. The micro-hit ceiling isn't a clean round number
(it's `100 × up to 1.3 × up to 3.0 × up to 1.5 ≈ 585` and moves if any multiplier changes later),
so describe it structurally instead of hard-coding a number that will drift out of sync again.

### 5.5 Sensitivity display accuracy (Defect #11)

Either remove the hidden `0.8` factor so applied sensitivity matches the displayed slider 1:1
(matching every other drill's `dx = e.movementX * universalSens` pattern), or fold it into the
displayed math so the `cm/360` estimate stays honest:

```js
// Option A (recommended — matches every sibling drill, simplest, no hidden scaling):
const dx = e.movementX * universalSens; // was: universalSens * 0.8

// Option B, only if the 0.8 damping is intentional for this drill's feel:
const cmPer360 = (30 / (universalSens * 0.8)).toFixed(1);
```

Recommend Option A — a precision-branded drill training real muscle-memory sensitivity should
never show a number that doesn't match what the mouse actually does.

---

## 6. COUNTDOWN — ADD THE MISSING `GO` FRAME (Defect #7)

Replace the `setInterval`-based effect with the chained-`setTimeout` pattern used everywhere
else in the category, so `GO` actually renders and the first anchor spawns only once it does:

```js
const countdownTimeoutsRef = useRef([]);

// inside enterDrill(), after drillAudio.init() (§3.3):
countdownTimeoutsRef.current.forEach(clearTimeout);
countdownTimeoutsRef.current = [];

setGameState('countdown');
setCountdownValue(3);
drillAudio.playCountdownTick();

const t1 = setTimeout(() => { setCountdownValue(2); drillAudio.playCountdownTick(); }, 700);
const t2 = setTimeout(() => { setCountdownValue(1); drillAudio.playCountdownTick(); }, 1400);
const t3 = setTimeout(() => { setCountdownValue('GO'); drillAudio.playGo(); }, 2100);
const t4 = setTimeout(() => {
  setGameState('playing');
  const w = engine.current.logicalWidth || canvasRef.current?.width || 800;
  const h = engine.current.logicalHeight || canvasRef.current?.height || 600;
  spawnAnchor(w, h);
}, 2450);

countdownTimeoutsRef.current = [t1, t2, t3, t4];
```

Delete the old `useEffect(() => { if (gameState !== 'countdown') return; const timer = setInterval(...) }, ...)` block entirely. Add the cleanup-on-unmount effect the reference has:

```js
useEffect(() => {
  return () => countdownTimeoutsRef.current.forEach(clearTimeout);
}, []);
```

---

## 7. START CARD

Rebuild onto the shared 340px template (`app/drills/fps/180-degree-awareness/AwarenessDrillClient.js`
L790-862 is the exact structure to copy), substituting this drill's content:

1. **Card container:** `max-w-[340px] rounded-[20px] border border-white/10 bg-[#0d0d18] px-5 pt-4 pb-4` — currently missing entirely (content floats directly on the full-bleed overlay).
2. **Icon badge:** 44px, `rounded-[14px]`, `bg-gradient-to-br from-cyan-600 to-sky-600`, `Crosshair` icon — currently absent on the start card (it's on the outer page header instead, which is wrong per §10).
3. **Name:** single consistent name — see §9.1. One-liner subtitle underneath in the shared `text-[10px] text-slate-400 uppercase tracking-widest` treatment.
4. **Rule rows:** convert the current 2×2 grid of bordered tiles to the reference's row-list treatment (`bg-white/[0.02] border-white/5 rounded-[10px] px-3 py-1.5`, label left / value right). Content can stay (Objective, Failure Rule, Combo, Mechanic) — this is a restyle, not a content rewrite; just fix the two inaccurate values per §5.4.
5. **Sensitivity slider:** keep it on the start card — this drill genuinely needs it (mouse movement directly maps to correction distance), same reasoning `flick-shot-training`'s plan gives for keeping its own slider in place. Just match the shared label/value visual treatment and fix the display per §5.5.
6. **Mini-stats row:** Best Score / Best Combo / Best Level, `bg-black/40 border-white/5 rounded-lg p-1.5`, `text-[8px]` labels / `text-[13px]` values — content already correct, only the classes need aligning.
7. **Start button:** full-width gradient `bg-gradient-to-r from-cyan-600 to-sky-600`, `rounded-[13px]`, `active:scale-[0.97]` — replace the current flat `bg-cyan-600 hover:bg-cyan-500`.
8. **Touch gating (Defect #10):** add the standard detection and blocking copy:

```js
const [isTouchOnlyDevice, setIsTouchOnlyDevice] = useState(false);

useEffect(() => {
  if (typeof window !== 'undefined') {
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const isTouchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchOnlyDevice(isTouchCapable && !hasFinePointer);
  }
}, []);
```

```jsx
{isTouchOnlyDevice ? (
  <div className="w-full py-2.5 rounded-[13px] bg-red-950/60 border border-red-500/30 font-bold text-[11px] text-red-400 flex items-center justify-center gap-2">
    <AlertCircle className="w-4 h-4 text-red-400" /> Mouse Required for Pointer Lock
  </div>
) : (
  <button onClick={enterDrill} ...>...</button>
)}
```

---

## 8. RESULT CARD

Rebuild onto the reference's canonical 36%/64% split
(`AwarenessDrillClient.js` L871-950 is the exact structure to copy):

- **Left 36%:** `NEW BEST` pill (conditional) → grade letter at **`text-6xl font-black`** (the
  hero element — currently buried as a small "Assigned Rank" tile, one of nine) → grade label →
  final score → "POINTS".
- **Right 64%:** exactly **3** stat tiles, not nine. Canonical set for this drill:
  **Accuracy · Best Combo · Avg Correction Time**. Below the tiles, the coach-advice card, then
  the action row (Play Again / Share / Exit via `handleExitDrill` per §3.6).
- **What happens to the other 6 tiles** (Total Cycles, Precision Rating, Consistency, Missed
  Clicks, Micro-Target Accuracy): these are genuinely useful diagnostics unique to this drill's
  richer telemetry — don't delete the underlying data or the computations in `endGame()`. Fold
  `precisionRating` into the coach-advice copy as a labeled line (e.g. *"Precision Rating: Elite
  Precision"* above the advice text) instead of a separate tile, and drop `consistencyScore`,
  `microTargetAccuracy`, and the raw `missedClicks` count from the result screen entirely — they
  are useful internally-tracked signals but don't need their own tile to stay useful; the coach
  advice and grade already communicate what matters at a glance. This keeps the drill's own edge
  (precision-based grading feedback) without breaking the one shared result-card shape every
  other drill uses.
- `drillAudio.playSessionEnd()` already fires on the correct transition — no change needed there.

---

## 9. PAGE HEADER, IN-BOX HUD, STAT CARDS

### 9.1 Naming consistency (Defect #12)

Standardize on **"Micro-Correction Aim Trainer"** everywhere on this page (H1, breadcrumb, start
card, result card, share text) — it's already the name in `page.js`'s `metadata`, the JSON-LD
schemas, and the H1 itself; only the start-card heading currently disagrees ("Micro-Correction
Precision"). Leave other drills' Related-Drills anchor text alone — `180-degree-awareness` and
`flick-shot-training` both link here as **"Micro Flicks"**, and per the naming precedent already
established in `flick-shot-training`'s plan, differing inbound anchor text is normal SEO practice
and not worth a cross-file edit; only this page's own internal naming needs to agree with itself.

### 9.2 Header (Defect #16)

Replace the icon-badge + H1 + subtitle block with the reference's bare centered heading:

```jsx
{!isFullscreen && (
  <div className="text-center mb-4">
    <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-sans">
      Micro-Correction Aim Trainer
    </h1>
  </div>
)}
```

The dropped subtitle ("Tactical FPS Calibration • Hardware Raw Input") is redundant with the
start card's own one-liner — no content is lost, just the duplication.

### 9.3 In-box HUD (Defect #17) and background (Defect #18)

```jsx
<div className="absolute top-4 left-4 z-30 pointer-events-none">
  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Score</p>
  <p className="text-2xl sm:text-3xl font-bold text-white tabular-nums leading-tight">{score}</p>
</div>
<div className="absolute top-4 right-4 z-30 pointer-events-none text-right">
  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Time</p>
  <p className={`text-2xl sm:text-3xl font-bold tabular-nums leading-tight ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>{timeLeft}s</p>
</div>
```

Sound button: add `onPointerDown={(e) => e.stopPropagation()}` and call `e.stopPropagation()`
inside `onClick` before toggling, matching `_MASTER_SPEC.md` §2.2 exactly instead of relying
incidentally on the tag-name exclusion in `handleMouseDown`. Move to `z-40` per spec.

Container class: `bg-[#05060b]` → `bg-[#050508]` (one-character-looking fix, matches the backdrop
cache's own fill color so there's no first-paint mismatch).

### 9.4 Above-the-box stat cards (Defect #19)

`StatCard`'s container classes: `border-gray-800 bg-gray-900/50` → `border-white/10 bg-black`,
matching every completed drill's identical treatment.

---

## 10. SEO

Mostly already correct — this is the strongest `page.js` audited in the category so far. Only
two items:

1. **Title length:** `"Micro-Correction Aim Trainer — Precision Drill | SkillDrills"` is right at
   the ≤60-char guideline boundary (~60 chars). Acceptable as-is; if trimming, drop `"Precision"`
   (redundant with "Micro-Correction") rather than the brand suffix.
2. **Confirm FAQ/schema parity stays true after §3.1.** It already matches word-for-word today —
   after the accordion becomes openable, re-diff once by eye (or `grep -oP` the two question
   lists like `flick-shot-training`'s plan §9.2 does) to make sure no edits during this pass
   introduce drift. Nothing needs to change in `page.js` itself.

No duplicate schema, no `next/head` misuse, no missing `VideoGame` — none of the problems found in
`flick-shot-training` exist here. Do not add work to this section beyond the two items above.

---

## 11. PREDICTED FUTURE BUGS

Issues not yet observed but likely to surface, based on the patterns found above:

1. **Audio still silent after §3.3 on strict Safari/iOS.** Some WebKit versions require the
   `AudioContext` to be created *and* have `.resume()` called with zero intervening microtasks
   from the click handler. If `drillAudio.init()` alone doesn't resolve it in testing, the next
   step is confirming `this.ctx.resume()` is actually reached synchronously in `tone()`'s first
   call — not a deeper redesign, just verify empirically on an actual iOS device, not just desktop
   Chrome, before calling §3.3 closed.
2. **`totalAttempts` accuracy can go stale mid-run.** Live accuracy only recomputes every 5th
   total action (`if (totalClicks % 5 === 0 ...)`), so the stat card can show a number up to 4
   actions out of date. Not a regression from this pass, but worth switching to "recompute every
   action" while other numeric-display code is already being touched in §9.3 — cheap to fix now,
   easy to forget later.
3. **The one-time legacy-key migration in §3.4 is a permanent branch if left in place indefinitely.**
   Once telemetry shows the old key is essentially never hit anymore (a few weeks after this ships),
   delete the `OLD_STORAGE_KEY` fallback — leaving it forever is harmless but is exactly the kind
   of "dead code nobody remembers the reason for" `_MASTER_SPEC.md` is trying to eliminate
   elsewhere in the category.
4. **`minDistance`/`maxDistance` and `hitPad` coefficients in §5.1/§5.2 are analytically reasoned,
   not playtested.** Treat the acceptance checklist's difficulty items as "verify by playing
   through L1→L15," not "trust the algebra" — if the micro target ever becomes literally
   impossible to hit at L15 (hitPad underflows practical mouse precision) or the anchor→micro gap
   still feels like a flick rather than a correction, adjust the coefficients, not the overall
   shape (forgiveness shrinks with radius; distance stays modest across the whole curve).
5. **Fullscreen-denied path is still degraded UX even after §3.5's containment fix.** The
   containment check stops mis-scored clicks, but a player whose browser blocks
   `requestFullscreen()` still plays in a small, non-immersive box with the rest of the page
   visible around it. That's an acceptable degraded mode (matches how the reference drill
   behaves under the same failure), not a regression to fix here — just don't be surprised if a
   future bug report describes "the game box is tiny" and it turns out to be this, not a new bug.

---

## 12. EXECUTION ORDER

| # | Step | Depends on |
|---|---|---|
| 1 | Wire `openAccordion` state into all three `DrillAccordion` instances (§3.1) | — |
| 2 | Wire `drillAudio.setEnabled(soundEnabled)` effect (§3.2) | — |
| 3 | Move `drillAudio.init()` + first tick into `enterDrill()`, synchronous with the click (§3.3) | — |
| 4 | Fix `STORAGE_KEY` + add legacy-key fallback read (§3.4) | — |
| 5 | Add containment check to `handleMouseDown` (§3.5) | — |
| 6 | Add `handleExitDrill`, rewire "Back to Menu" (§3.6) | — |
| 7 | Replace `setInterval` countdown with chained `setTimeout` + `GO` frame (§6) | 3 |
| 8 | Split `hitPad` → `anchorHitPad`/`microHitPad`; retune anchor↔micro distance (§5.1, §5.2) | — |
| 9 | Fix rule-tile copy accuracy; fix sensitivity 0.8 factor (§5.4, §5.5) | — |
| 10 | Rebuild start card onto shared template incl. touch gating (§7) | 4, 5 |
| 11 | Rebuild result card onto 36/64 split, 3-tile canonical set (§8) | — |
| 12 | Simplify page header to bare H1; fix in-box HUD z-index/pointer-events/background; unify `StatCard` classes (§9) | — |
| 13 | Standardize drill naming to "Micro-Correction Aim Trainer" everywhere (§9.1) | 10, 11 |
| 14 | Re-verify FAQ/schema parity now that the accordion actually renders (§10) | 1 |

Nothing here is blocked — every shared module this drill needs already exists in the codebase.

---

## 13. ACCEPTANCE CHECKLIST

**Critical (must all pass before anything else counts)**
- [ ] All three accordions actually open/close; `aria-expanded` toggles correctly
- [ ] Muting via the sound button silences every subsequent sound; unmuting restores it
- [ ] `drillAudio.init()` called synchronously inside `enterDrill()`'s click handler; sound
      confirmed working on a real first-load session (not just after a page refresh)
- [ ] `localStorage` key is `skilldrills_fps_micro_correction_precision_v2`; FPS Hub shows a
      `Lv. X` badge for this drill after one completed session
- [ ] Clicking anywhere outside the drill container while `gameState === 'playing'` does **not**
      register as a miss
- [ ] "Back to Menu" exits fullscreen and releases pointer lock before returning to `start`

**Difficulty & scoring**
- [ ] Countdown shows `3 → 2 → 1 → GO`, first anchor spawns only after `GO`
- [ ] `microHitPad` never exceeds `microRadius` at any level, L1 through L15
- [ ] Anchor→micro distance stays in a genuinely "micro" range through L15 (no macro-flick feel)
- [ ] Rule-tile copy matches the real multiplier ceilings (3.0×, precision+combo framing)
- [ ] Sensitivity slider value matches actual applied mouse sensitivity 1:1

**Visual**
- [ ] Start card on the shared 340px bordered-card template with icon badge and gradient button
- [ ] Touch-only devices see the blocking message instead of a dead Start button
- [ ] Result card is the 36%/64% split with a `text-6xl` hero grade letter and exactly 3 stat tiles
- [ ] Page header is a bare centered H1, no icon/subtitle row
- [ ] In-box Score/Time are `pointer-events-none` at `z-30`; Sound button `stopPropagation`s at `z-40`
- [ ] Container and backdrop cache both paint `#050508`
- [ ] Above-the-box `StatCard` matches every completed drill's `border-white/10 bg-black`

**Naming & SEO**
- [ ] "Micro-Correction Aim Trainer" is the only name used anywhere on this page
- [ ] FAQ accordion text still matches `FAQPage` schema word-for-word after all edits
- [ ] `opengraph-image.js` unchanged and still builds to a valid 1200×630 PNG

**Regression**
- [ ] `npx next build` exits 0
- [ ] Full session start-to-finish still works: countdown → anchor → micro → combo → level-up →
      timeout → result → Play Again → Share → Exit
- [ ] 180-degree-awareness and other previously completed drills still work (no shared-module
      changes were needed for this drill, so this should be a formality — confirm anyway)
