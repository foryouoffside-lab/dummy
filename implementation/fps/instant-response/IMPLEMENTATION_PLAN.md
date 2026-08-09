# INSTANT RESPONSE — IMPLEMENTATION PLAN

**Drill:** `app/drills/fps/instant-response/`
**Client:** `InstantResponseClient.js` (1,150 lines) · **Page:** `page.js` (185 lines)
**Read first:** `implementation/fps/_MASTER_SPEC.md`
**Reference implementations — all four conform. Copy their patterns:**
`180-degree-awareness/` · `target-acquisition/` · `recoil-control/` · `angle-hold-trainer/`

---

## 0. EXPECTED BUGS — READ BEFORE YOU START

Every item below is a mistake that **actually occurred** on drills 1-4. This drill's structure
makes each one likely again.

### 🔴 E1 — Two difficulty engines will end up fighting

`e.level` exists (L287) but drives **nothing**. The real difficulty comes from
`flashDuration = Math.max(10, 200 - (e.score * 0.2))` (L429) — driven by **raw score**, not level.

Add `getLevelConfig(level)` without deleting the score-driven formula and you get two engines
multiplying. This is exactly what happened on `angle-hold-trainer` with `timeFactor`.
**Search for `e.score * 0.2` and every use of `flashDuration` and make the level config the sole
authority.**

### 🔴 E2 — Removing a penalty without adding the combo reset

Shipped in `recoil-control`. There are **three** `-0.5s` sites here (L309 miss, L328 pre-fire,
L443 timeout). Every one needs `combo = 0` once the time penalty comes out, or the failure has
no consequence at all.

### 🔴 E3 — The flash window must stay frame-safe

See §3. The current floor is **10 ms**, which is shorter than a single frame at 60 fps. Any new
formula must floor well above one frame time. **Verify at L15 by playing, not by reading the
formula** — a green build proves nothing about whether the target is hittable.

### 🟠 E4 — Canvas has no DPR backing store

L378 does `cvs.width = width` with no device-pixel-ratio scaling, so this drill renders blurry on
every high-DPI display while the other four are sharp. Adding `getCanvasDpr()` means **every
coordinate that currently reads `cvs.width` must switch to logical width** (L240, L448, L471,
L475, L486). Miss one and the target renders in a different place from where it is hit-tested.

### 🟠 E5 — Untracked `setTimeout`

Shipped in `recoil-control`: a bare timer fired on the result screen. Any timer added here must
be ref-tracked and cleared in `endGame`, `handleExitDrill`, and unmount.

### 🟡 E6 — JSX closing tags break during accordion conversion

Happened on all four previous drills. Convert one accordion at a time and check diagnostics
between each.

### 🟡 E7 — FAQ nested inside About

Happened on **every** drill so far, including after the rule was written down. **FAQ is its own
top-level accordion** — `_MASTER_SPEC.md` §1.8.

### 🟡 E8 — Orphaned imports after deletion

Removing the audio class, the rank system, and inline accordion markup will orphan several
`lucide-react` icons. Sweep the import list at the end.

### 🟡 E9 — `animate-in fade-in` is a silent no-op

No `tailwindcss-animate` plugin in this repo. Use `fx-fade-up` / `fx-fade-in` / `fx-pop-in`.

---

## 1. WHAT THIS DRILL IS

A single target sits at the centre of the screen. After a randomised idle delay it **flashes**
for a brief window. The player must click **during** the flash.

Three failure modes:
- **Pre-fire** — clicking while the target is idle (anticipating instead of reacting)
- **Miss** — clicking during the flash but off-target
- **Timeout** — the flash window closes unclicked

The trained skill is **pure visual reaction latency**. There is deliberately no travel: the
target never moves, so nothing is being measured except stimulus → response time.

**Keep the target centred and stationary.** Adding positional variance would turn this into a
flick drill and duplicate `flick-shot-training`. Difficulty must come from the *timing*, not
from travel.

---

## 2. AUDIT — 17 DEFECTS

| # | Defect | Location |
|---|---|---|
| 1 | Inline `class AudioSynthesizer`; `playSuccess(combo)` takes a combo arg — non-canonical | L19-70 |
| 2 | **`-0.5s` on miss** | L309 |
| 3 | **`-0.5s` on pre-fire** | L328 |
| 4 | **`-0.5s` on timeout** | L443 |
| 5 | **Flash window floors at 10 ms** — shorter than one frame; drill becomes impossible | L429 |
| 6 | Difficulty driven by **raw score**, not level; `e.level` drives nothing | L429, L287 |
| 7 | Rank system on absolute thresholds | L77-83 |
| 8 | Score uses a local multiplier, no level component | L285 |
| 9 | **No DPR backing store** — blurry on high-DPI | L378 |
| 10 | **No `createBackdropCache`** | — |
| 11 | **No flash overlay system** (`fx-flash` count = 0) | — |
| 12 | **No 3-2-1 countdown** | — |
| 13 | **Fullscreen not restored** on resume | — |
| 14 | Storage is loose keys; **no `bestLevel`/`bestCombo`** | L139-141 |
| 15 | **5 stat cards** (spec: 4); **4 related** (spec: 6); **no accordions** | — |
| 16 | **Pinterest** in footer; footer inline | — |
| 17 | **FAQ schema 5 vs 15 visible.** No `VideoGame`. **No `opengraph-image.js`** | `page.js` |

---

## 3. THE 10 ms FLASH BUG — FIX THIS FIRST

```js
const flashDuration = Math.max(10, 200 - (e.score * 0.2));   // L429
```

Work the numbers:

| Score | Flash window |
|---|---|
| 0 | 200 ms |
| 500 | 100 ms |
| 950 | **10 ms (floor)** |

**At 60 fps a single frame is 16.7 ms.** A 10 ms window can open and close entirely *between*
two frames — the flash is never drawn, and the player is charged a timeout for a stimulus that
was never shown. Even at 100 ms the drill is already past the ~150 ms floor of elite human
reaction time.

So today: after roughly 950 points the drill is **not hard, it is impossible** — and every
subsequent flash is an unavoidable penalty that also drained the clock.

**The replacement window must respect human limits:**

```
L1  → 550 ms   comfortable
L8  → 375 ms   good players hit consistently
L15 → 200 ms   elite only, but genuinely achievable
```

**Never floor below 200 ms.** Elite reaction is 150-200 ms; below that no human can win, and an
unwinnable drill reads as broken rather than hard.

---

## 4. AUDIO

**Delete L19-70** (inline class and singleton).

```js
import { drillAudio } from '../../../../lib/drillAudio';
```

| Current | Becomes |
|---|---|
| `audioSynth.playSuccess(combo)` (L293) | `drillAudio.playHit()` |
| `audioSynth.playSuccess(combo)` (L432 — flash onset) | **see below** |
| `audioSynth.playFail()` (L312 miss, L331 pre-fire, L446 timeout) | `drillAudio.playPenalty()` |
| `.init()` / `.setEnabled()` | `drillAudio.init()` / `.setEnabled()` |

⚠️ **`playSuccess` takes a `combo` argument** — a pitch-shifting variant. Drop it. The canonical
`playHit()` takes no arguments and must sound identical at every combo level.

### 🔴 The flash-onset sound must be DELETED

L432 plays a sound the instant the target flashes. **In a reaction drill this destroys the thing
being measured.** Audio reaction latency is ~40 ms faster than visual, so players would respond
to the *sound* and the drill would stop measuring visual reaction entirely — it would silently
become an audio-reaction drill.

Delete it. The flash is a **visual** stimulus. `playHit()` on a successful click and
`playPenalty()` on failure are the only sounds during play.

Add `drillAudio.playSessionEnd()` in the end-game handler.

---

## 5. DIFFICULTY — SCORE-DRIVEN → 15 LEVELS

**Delete the `flashDuration` formula at L429 and the `e.level = Math.floor(...)` at L287.**
See **E1**.

```js
import { MAX_LEVEL, getStartLevel, getDifficultyProgress } from '../../../../lib/drillDifficulty';

const POINTS_PER_LEVEL = 200;

const getLevelConfig = (level) => {
  const p = getDifficultyProgress(level);   // 0 → 1 across L1..L15
  return {
    flashWindow:   550 - p * 350,   // 550 → 200 ms  ← PRIMARY AXIS, never floor below 200
    targetRadius:  35  - p * 15,    // 35 → 20 px
    idleMin:       700 - p * 300,   // 700 → 400 ms
    idleMax:       2200 - p * 900,  // 2200 → 1300 ms
    hitPad:        10  - p * 6,     // 10 → 4 px
    feintChance:   p < 0.5 ? 0 : (p - 0.5) * 0.5,   // 0 → 0.25 from L8
  };
};
```

**`flashWindow` is the primary axis** — this drill measures reaction latency, so the window is
the difficulty.

**The idle range must stay WIDE.** `idleMin`/`idleMax` keep a large spread even at L15
(400-1300 ms) on purpose: a narrow, predictable gap lets players build a rhythm and anticipate,
which is precisely the habit pre-fire punishment exists to break. **Do not converge these.**

**`feintChance` is the drill-specific top-end axis.** From L8, some cycles produce a **feint** —
a very brief dim pulse (~60 ms, clearly dimmer than a real flash) that is *not* a valid target.
Clicking it counts as a pre-fire. This punishes trigger-happy anticipation without shortening the
real window below human limits — the honest way to keep raising difficulty once 200 ms is
reached.

⚠️ **A feint must be visually distinguishable from a real flash** — dimmer and shorter. If a
player cannot tell them apart, it is a coin flip, not a skill. Render feints at ~35% opacity.

```js
// monotonic — never regresses
const rawLevel = Math.floor(eRef.score / POINTS_PER_LEVEL) + 1;
eRef.level = Math.min(MAX_LEVEL, Math.max(eRef.level, rawLevel));
bestLevelRunRef.current = Math.max(bestLevelRunRef.current, eRef.level);

// session start — 65% of personal best
const startLevel = getStartLevel(saved.bestLevel);
```

---

## 6. SCORING

### 6.1 Delete all three time penalties

```js
eRef.timeLeft = Math.max(0, eRef.timeLeft - 0.5);   // L309 miss     — DELETE
eRef.timeLeft = Math.max(0, eRef.timeLeft - 0.5);   // L328 pre-fire — DELETE
e.timeLeft    = Math.max(0, e.timeLeft - 0.5);      // L443 timeout  — DELETE
```

All three failure modes become **exactly**:

1. `combo = 0`   ← **see E2**
2. increment the relevant counter (`missedClicks` / `preFires` / `timeouts`)
3. `drillAudio.playPenalty()`
4. `triggerFlash()` (red)
5. `screenShake` (keep — juice, not a penalty)
6. **Score unchanged. Timer unchanged.**

Rewrite the rule copy advertising `-0.5s` (L905, L954, L973 reference it in RuleItem and FAQ text).

### 6.2 New score formula — this drill gets a reaction-speed bonus

```js
import { getComboMultiplier } from '../../../../lib/scoringEngine';

// Reaction bonus: 150ms → +150, 500ms → 0, linear between.
const reactionMs = time - eRef.flashStartTime;
const speedBonus = Math.max(0, Math.min(150, Math.round((500 - reactionMs) / 350 * 150)));

const levelMult = 1 + getDifficultyProgress(eRef.level) * 0.5;   // 1.0 → 1.5
eRef.combo++;
if (eRef.combo > eRef.maxCombo) eRef.maxCombo = eRef.combo;
eRef.score += Math.round((100 + speedBonus) * getComboMultiplier(eRef.combo) * levelMult);
```

**Why a speed bonus here and nowhere else.** Every other drill captures reaction speed indirectly —
react faster, hit more targets in 45 s, score more. **This drill's throughput is capped by the
idle delay**: you cannot make flashes arrive sooner, so a 160 ms reaction and a 450 ms reaction
earn identical points. Without an explicit bonus the drill would not reward the one thing it
exists to train. This is a justified exception, not a precedent — do not copy it to other drills.

Read `levelMult` **before** the level update, so a hit is paid at the difficulty it was made at.

### 6.3 Grade — delete the rank system

**Delete L77-83** (`calculateRank`).

```js
import { getFpsScoreGrade } from '../../../../lib/scoringEngine';

const ELITE_SCORE = 16000;
const rating = getFpsScoreGrade(e.score, ELITE_SCORE);
```

**Keep `getSuggestion()` (L86-90)** — diagnostics, not grading. Update it to read the new
counters if its signature changes.

### 6.4 Storage

```js
const STORAGE_KEY = 'skilldrills_fps_instant_response_v2';
// { bestScore, bestCombo, bestLevel, totalSessions }
```

Keep `instantResp_sens` as its own key (device preference).
Drop `instantResp_bestScore2`. `_v2` is required — new scoring scale.

---

## 7. VISUAL

### 7.1 Flash overlay — currently absent

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

Fires on miss, pre-fire, and timeout. **Red is the only flash colour.**

⚠️ **Naming collision.** This drill already uses "flash" for the *target stimulus*
(`isFlashing`, `flashStartTime`, `flashEndTime`). The red overlay is a different thing. Rename
the stimulus state to `isExposed` / `exposeStartTime` / `exposeEndTime` so the two concepts do
not get confused during editing — this is the kind of ambiguity that produces a wrong-variable
bug like the one that shipped in `recoil-control`.

### 7.2 Target

Match the treatment now standard across the category (see `AngleHoldClient.js`):

- **Glowing shell over a dark body** with a bright core dot — not a flat filled disc
- `drawPulseRing` with a random per-target seed
- **Lifetime ring** that contracts and shifts colour (accent → yellow → red) as the window
  closes. This drill needs it more than any other: the window is the entire challenge and is
  currently invisible.
- **No `shadowBlur` on the idle state** — only the exposed state glows. The contrast between
  idle and exposed *is* the stimulus, so keep idle visibly dim and inert.
- Feints render at ~35% opacity of a real flash
- `createBackdropCache` + `getCanvasDpr()` — **see E4**, switch every `cvs.width` to logical width

---

## 8. LAYOUT

Standard shell — `_MASTER_SPEC.md` §2. Copy `angle-hold-trainer`.

- **H1 centered above the box**, shortened to **`Instant Response Pro`**
- **Exactly 4 stat cards:** Score · Time · Accuracy · Best
- **Exactly 3 things in the box:** Score `top-4 left-4` · Time `top-4 right-4` (red at ≤10 s) ·
  Sound `bottom-4 right-4`. Delete the level and combo readouts.
- **Sensitivity slider on the start card**, between the how-to rows and the mini-stats. Persist to
  `instantResp_sens`. Start card must fit 800×450 **without scrolling**.
- `<DrillCountdown value={countdownValue} accent="#22d3ee" subtitle="First flash after GO" />`
- **3 accordions** via `DrillAccordion`: `rules` · `about` · **`faq` as its own section** (E7)
- Related drills 4 → **6**: `180-degree-awareness`, `angle-hold-trainer`, `target-acquisition`,
  `flick-shot-training`, `micro-correction-precision`, `target-switching-swarm`
- `<DrillFooter />` — removes Pinterest
- `cursor-none` during play; `cursor-pointer` on all buttons
- `const DRILL_DURATION = 45;` with the smooth timer

### Fullscreen resume

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

**Fullscreen first, then pointer lock — order is not optional.**

⚠️ **Pause must not let an exposure expire.** If pointer lock is lost mid-flash, freeze the
window timer — otherwise the player returns to an already-timed-out stimulus and eats a penalty
for a pause they did not cause. Same rule applied in `angle-hold-trainer`.

---

## 9. SEO

### 9.1 FAQ parity — highest risk item

Schema has **5**; the page renders **15**. Regenerate `FAQPage` from the visible accordion, word
for word, **no numbering prefixes**. Verify with a real diff:

```bash
grep -oP '(?<="name": ")[^"]*\?' page.js | sort > /tmp/a
grep -oP '(?<=FAQItem q=")[^"]*\?' InstantResponseClient.js | sort > /tmp/b
diff /tmp/a /tmp/b    # must be empty
```

Several FAQ answers reference the deleted `-0.5s` penalty (L954, L973) — rewrite them.

### 9.2 Add `VideoGame` schema

`gamePlatform: "Web Browser"`, `genre: ["FPS Training", "Reaction Trainer"]`,
`playMode: "SinglePlayer"`, `applicationCategory: "Game"`.

### 9.3 `opengraph-image.js` — missing, mandatory

Copy `app/drills/fps/angle-hold-trainer/opengraph-image.js`. Change:

- `ACCENT` → `'#22d3ee'` (cyan — distinct from the emerald/amber/red/orange already used)
- Title → `Instant Response Pro`
- Description → *"Pure visual reaction training. Click the instant the target flashes — no travel, no aim, just latency."*
- Pills → `45-SECOND DRILL`, `15 DIFFICULTY LEVELS`, `RAW MOUSE INPUT`, `FREE — NO SIGN-UP`

**Then delete the `images` arrays from BOTH `openGraph` and `twitter` in `page.js`.**

**Satori:** flexbox only, no CSS grid, explicit `display: flex` on multi-child elements, font
weights above ~700 fall back to regular.

**Verify the built binary:**
`.next/server/app/drills/fps/instant-response/opengraph-image.body` must be a valid PNG at
exactly 1200×630.

### 9.4 Keywords and copy

- **Primary:** `reaction time trainer fps`
- **Secondary:** `click reaction test`, `visual reaction training`,
  `CS2 reaction time practice`, `Valorant reaction trainer`
- **Long-tail:** `how to improve reaction time for gaming`, `what is a good reaction time fps`,
  `free browser reaction time test`, `how to stop pre-firing`,
  `average human reaction time gaming`, `train visual reflexes for shooters`

"About This Drill" carries 400-500 words: what visual reaction latency actually is, typical
human ranges (200-250 ms average, 150-180 ms elite), why anticipation is not reaction and why
pre-firing is punished, and why the idle delay is randomised. Coaching voice, real numbers.

---

## 10. EXECUTION ORDER

| # | Step | Notes |
|---|---|---|
| 1 | **Fix the flash window**: delete score-driven `flashDuration`; new `getLevelConfig` | **E1, E3** |
| 2 | Rename stimulus state `isFlashing` → `isExposed` | §7.1 |
| 3 | Delete inline audio; import `drillAudio`; **delete the flash-onset sound**; add `playSessionEnd` | §4 |
| 4 | Storage → `skilldrills_fps_instant_response_v2` object | — |
| 5 | Monotonic level + `getStartLevel` | 1 |
| 6 | **Delete all three `-0.5s`**; add `combo = 0` to all three paths | **E2** |
| 7 | New score formula with reaction bonus × combo × level | 5 |
| 8 | Delete `calculateRank`; wire `getFpsScoreGrade(score, 16000)`; keep `getSuggestion` | — |
| 9 | Add red flash overlay system | 2 |
| 10 | Canvas: **DPR backing store**, backdrop cache, glow target, lifetime ring, feints | **E4** |
| 11 | Layout: H1, 4 stat cards, in-box 3, sensitivity slider, countdown, 6 related, footer | — |
| 12 | Accordions — one at a time, check diagnostics between each | **E6, E7** |
| 13 | `resumeDrill()` + freeze exposure timer on pause | — |
| 14 | 45 s fixed + smooth timer | — |
| 15 | SEO: FAQ parity, `VideoGame`, `opengraph-image.js`, keywords, About copy | — |
| 16 | **Sweep unused imports**; build; **then actually play it at L15** | **E3, E8** |

---

## 11. ACCEPTANCE CHECKLIST

**Expected-bug sweep**
- [ ] No `e.score * 0.2`; `getLevelConfig` is the sole difficulty authority
- [ ] All three failure paths set `combo = 0`
- [ ] Flash window at L15 is **200 ms** and demonstrably hittable — verified by playing
- [ ] DPR backing store present; **every** `cvs.width` switched to logical width
- [ ] Every `setTimeout` ref-tracked and cleared on end/exit/unmount
- [ ] No unused imports; no `animate-in` classes

**Audio**
- [ ] Zero local audio code; `drillAudio` imported
- [ ] 5 canonical events; `playHit()` takes **no** combo argument
- [ ] **No sound on flash onset** — the stimulus is visual only
- [ ] Miss, pre-fire, **and** timeout all fire `playPenalty()`
- [ ] `playSessionEnd()` on the result card

**Difficulty & scoring**
- [ ] 15 levels via `getDifficultyProgress`; no clamps before L15
- [ ] Idle range stays wide at L15 (≈400-1300 ms) — no rhythm to learn
- [ ] Feints from L8, visually distinguishable (~35% opacity), clicking one = pre-fire
- [ ] Level monotonic; resumes at 65% of best; `bestLevel` persists
- [ ] `POINTS_PER_LEVEL = 200`; L15 reachable in ~15 s of strong play
- [ ] Score = (100 + speedBonus) × combo × level
- [ ] **Zero time modifiers**; fixed 45 s
- [ ] Grade from `getFpsScoreGrade(score, 16000)`; `calculateRank` deleted
- [ ] Rule and FAQ copy no longer mention `-0.5s`

**Visual**
- [ ] `fx-flash-red` on all three failure modes; **red is the only flash**
- [ ] Stimulus state renamed to `isExposed` — no ambiguity with the red overlay
- [ ] Target: glow shell + dark body + bright core + **lifetime ring**
- [ ] Idle state visibly dim and inert; only exposure glows
- [ ] Sharp on high-DPI (DPR fix landed)

**Layout**
- [ ] H1 centered, reads `Instant Response Pro`
- [ ] Exactly 4 stat cards; exactly 3 things in the box
- [ ] Sensitivity slider on start card; no scroll at 800×450
- [ ] ESC → resume returns to **fullscreen**; exposure timer frozen while paused
- [ ] Countdown; 3 accordions (faq its own); 6 related; footer IG · FB · YT · X

**SEO**
- [ ] `diff` of schema vs visible FAQ is **empty** (15 = 15, no numbering)
- [ ] `VideoGame` schema present
- [ ] `opengraph-image.body` is a valid PNG at **exactly 1200×630**
- [ ] Manual `images` arrays deleted from `openGraph` **and** `twitter`

**Build & runtime**
- [ ] `npx next build` exits 0, no errors or warnings
- [ ] **Played start-to-finish at L15** — a green build does not prove the target is hittable
- [ ] Drills 1-4 still work
