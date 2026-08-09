# ANGLE HOLD TRAINER — IMPLEMENTATION PLAN

**Drill:** `app/drills/fps/angle-hold-trainer/`
**Client:** `AngleHoldClient.js` (1,341 lines) · **Page:** `page.js` (185 lines)
**Read first:** `implementation/fps/_MASTER_SPEC.md`
**Reference implementations — all three already conform. Copy their patterns:**
`180-degree-awareness/` · `target-acquisition/` · `recoil-control/`

> This is the **least compliant** drill so far: no level system, no countdown, no flash system,
> no accordions, and it is the only drill in the category with a **positive** time reward.

---

## 0. EXPECTED BUGS — READ BEFORE YOU START

These are not hypothetical. Each one is a mistake that **actually occurred** on drills 1-3.
This drill's structure makes every one of them likely again.

### 🔴 E1 — Deleting the time mechanics will silently kill the difficulty curve

This is the highest-risk item on the page, and it is not obvious.

`timeSurvived` is currently load-bearing in **three** places:

```js
const timeFactor = Math.min(2.5, 1.0 + (eRef.timeSurvived / 30.0));   // L405, L512
speed = speed * speedMod * timeFactor;                                 // L555
const rank = calculateRank(e.timeSurvived, finalAccuracy, avgRt);      // L248
```

`timeFactor` is the **only** thing that makes this drill get harder. Once the timer is a fixed
45 s, `timeSurvived` still increments — but the moment you replace it with the level system and
forget to remove `timeFactor`, you have **two** difficulty engines multiplying each other, and
the drill becomes unplayably fast by second 30.

**Delete `timeFactor` entirely.** `getLevelConfig(level)` is the sole difficulty authority.
Search the file for `timeFactor` and `timeSurvived` and make sure neither drives anything.

### 🔴 E2 — Removing a penalty without adding the combo reset

This exact bug shipped in `recoil-control`: the penalty branch was deleted, but `combo = 0` was
never added, so the failure had **no consequence at all**. There are **three** penalty sites here
(pre-fire L379, miss L411, escape L603). Every one needs `combo = 0` after the `-1.5s` comes out.

### 🔴 E3 — Removing the `baseSpeed` slider leaves a dangling reference

`speedMod` (L554) is derived from `baseSpeed`. Delete the state without deleting `speedMod` and
the render loop throws on the first frame — a black canvas with a console error, easy to miss if
you only check that the build passes. **A green `next build` does not prove the game loop runs.**

### 🟠 E4 — Peek window can go to zero and make targets unhittable

The new curve shortens the exposure window as level rises. If `peekDuration` is allowed to reach
0 (or the retreat animation eats the whole window), targets become impossible at high level and
the drill reads as broken rather than hard. **Floor it and verify at L15 by playing, not by
reading the formula.**

### 🟠 E5 — Untracked `setTimeout` outliving the drill

Shipped in `recoil-control`: a bare `setTimeout` fired on the result screen. Any timer added here
(peek scheduling, retreat, reload-style delays) must be stored in a ref and cleared in `endGame`,
`handleExitDrill`, and unmount.

### 🟡 E6 — JSX closing tags break during the accordion conversion

Happened three times while converting drills 1-3. Converting inline accordion markup to
`<DrillAccordion>` changes the nesting depth; the old `</div>)}</div>)}` tail will not match.
**Convert one accordion at a time and check diagnostics between each.**

### 🟡 E7 — Orphaned imports after deletion

`ChevronDown` was left imported-but-unused on 180 after its accordion was extracted. Removing the
inline audio class, the rank system, and the accordion markup here will orphan several icons.
Sweep the `lucide-react` import list at the end.

### 🟡 E8 — `animate-in fade-in` is a silent no-op

This repo has **no `tailwindcss-animate` plugin**. `globals.css` documents this. Use `fx-fade-up`,
`fx-fade-in`, `fx-pop-in`. If you hand-roll any animation, check it exists in `globals.css` first.

### 🟡 E9 — FAQ nested inside About

The default instinct is to put the FAQ inside the About section. **It must be its own top-level
accordion** — see `_MASTER_SPEC.md` §1.8.

---

## 1. WHAT THIS DRILL IS

The player holds their crosshair on a chokepoint ("the angle"). A target **peeks** out from
cover, is exposed briefly, then **retreats**. The player must fire during the exposure window.

Three failure modes:
- **Pre-fire** — clicking while nothing is exposed (spraying the angle blindly)
- **Miss** — clicking during a peek but off-target
- **Escape** — the target retreats before the player fires

The trained skill is **crosshair placement plus reaction discipline** — hold still, do not
pre-fire, react inside a shrinking window.

**Preserve the peek/retreat mechanic, the left/right sides, the crouch-peek variant, and the
three failure modes.** Everything below changes how it scales, sounds, scores, and looks.

---

## 2. AUDIT — 18 DEFECTS

| # | Defect | Location |
|---|---|---|
| 1 | Inline `class AudioSynthesizer` (`playSuccess`, `playFail`, `playPrefire`) | L19-80 |
| 2 | **`-1.5s` on pre-fire** | L379 |
| 3 | **`-1.5s` on miss** | L411 |
| 4 | **`-1.5s` on escape** | L603 |
| 5 | **`+1.0s` TIME REWARD on hit** — only positive time increment in the category | L396 |
| 6 | **No level system.** Difficulty is `timeFactor` from `timeSurvived`, capped 2.5× | L405, L512, L555 |
| 7 | **`baseSpeed` user slider** — the player self-selects difficulty | L141, L920 |
| 8 | Score flat `+100`; no combo, no level multiplier | L395 |
| 9 | Rank system on absolute `timeSurvived` thresholds | L87-93 |
| 10 | **No 3-2-1 countdown** | — |
| 11 | **No flash system at all** — no `fx-flash`, no `triggerFlash` | — |
| 12 | **Fullscreen not restored** on resume | L847, L860 |
| 13 | Storage is loose keys; **no `bestLevel`/`bestCombo`** | L200-214 |
| 14 | **5 stat cards** (spec: 4) | — |
| 15 | **No accordions** | — |
| 16 | Only **4 related-drill cards** (spec: 6) | — |
| 17 | **Pinterest** in footer; footer inline | — |
| 18 | **FAQ schema 5 vs 15 visible.** No `VideoGame`. **No `opengraph-image.js`** | `page.js` |

---

## 3. THE SURVIVAL-TIMER PROBLEM — DECIDE THIS FIRST

Today this is a **survival** drill: you start with 60 s, hits add `+1.0s`, failures subtract
`-1.5s`, and the run ends when the clock hits zero. `timeSurvived` is the score that matters.

The category rule is a **fixed, uninterruptible 45 s with no time increments or decrements**.
Applying it converts this from a survival drill into a scoring drill.

**That conversion is correct — do it.** Three reasons:

1. **A variable-length session makes scores incomparable.** A player who survives 90 s and one
   who survives 20 s cannot be ranked against each other on score, which is exactly why the
   existing `calculateRank` had to grade on `timeSurvived` instead — and why it breaks the moment
   difficulty resumes at 65% of best.
2. **The skill is unchanged.** Crosshair discipline, no pre-firing, and reacting inside a
   shrinking window are all still trained — and now the window shrinks by *level*, which is
   both harsher and fairer than shrinking by survival time.
3. **It matches every other drill**, which is the entire point of this project.

**What replaces the survival tension:** the peek window itself. At L1 you get ~1400 ms of
exposure; at L15 you get ~420 ms with fake peeks mixed in. The pressure moves from "don't run out
of clock" to "don't miss the window" — which is the actual competitive skill.

**Consequences that must be handled together:**

- `timeSurvived` stops being meaningful → `calculateRank` must go (§6.3)
- `timeFactor` stops being meaningful → `getLevelConfig` replaces it (§5) — **see E1**
- The stat card and rule copy advertising `-1.5s` / `+1.0s` must be rewritten (§6.1)

---

## 4. AUDIO

**Delete L19-80** (inline class and singleton).

```js
import { drillAudio } from '../../../../lib/drillAudio';
```

| Current | Becomes |
|---|---|
| `audioSynth.playSuccess()` (L399) | `drillAudio.playHit()` |
| `audioSynth.playFail()` (L413 miss, L605 escape) | `drillAudio.playPenalty()` |
| `audioSynth.playPrefire()` (L381) | `drillAudio.playPenalty()` |
| `.init()` / `.setEnabled()` | `drillAudio.init()` / `.setEnabled()` |

Add `drillAudio.playSessionEnd()` in the end-game handler.

**All three failure modes share `playPenalty()`.** Do not give pre-fire its own sound — it is a
sixth event, and the master spec allows exactly five. The player already knows *which* mistake
they made from context (nothing was on screen).

**Do not use `playSpatialCue`** — that is reserved for `180-degree-awareness`.

---

## 5. DIFFICULTY — NO SYSTEM → 15 CONTINUOUS LEVELS

**Delete `timeFactor` (L405, L512), `speedMod`/`baseSpeed` (L141, L554, L920), and the
`baseSpeed` slider.** See **E1** and **E3**.

```js
import { MAX_LEVEL, getStartLevel, getDifficultyProgress } from '../../../../lib/drillDifficulty';

const POINTS_PER_LEVEL = 150;

const getLevelConfig = (level) => {
  const p = getDifficultyProgress(level);   // 0 → 1 across L1..L15
  return {
    peekDuration:  1400 - p * 980,   // 1400 → 420 ms exposure  ← PRIMARY AXIS
    peekSpeed:     1.0  + p * 1.2,   // 1.0 → 2.2x slide speed
    targetRadius:  26   - p * 14,    // 26 → 12 px
    peekDelayMin:  900  - p * 550,   // 900 → 350 ms between peeks
    peekDelayMax:  1600 - p * 950,   // 1600 → 650 ms
    hitPad:        10   - p * 6,     // 10 → 4 px
    fakePeekChance: p < 0.6 ? 0 : (p - 0.6) * 0.6,  // 0 → 0.24 from L10
  };
};
```

**`peekDuration` is the primary axis** — this drill is fundamentally about reacting inside a
window, so shrinking the window is the truest expression of difficulty.

**`fakePeekChance` is the drill-specific top-end axis.** From L10, some peeks are *jiggle peeks*:
the target commits only partway out and retreats almost immediately. This is a real CS2 mechanic
and it directly punishes pre-firing — the exact habit this drill exists to break.

⚠️ **A fake peek must still be hittable.** Give it roughly 40% of the normal exposure window,
never zero. An unhittable target reads as a broken drill, not a hard one — see **E4**. Floor the
effective window at ~180 ms.

**Rules:** every value driven by `getDifficultyProgress`, reaching its extreme **exactly at L15**,
no clamps biting earlier. `hitPad` must scale or shrinking targets stops mattering.

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

### 6.1 Delete every time modifier

```js
eRef.timeLeft = Math.max(0, eRef.timeLeft - 1.5);              // L379 pre-fire — DELETE
eRef.timeLeft = Math.max(0, eRef.timeLeft - 1.5);              // L411 miss     — DELETE
e.timeLeft    = Math.max(0, e.timeLeft - 1.5);                 // L603 escape   — DELETE
eRef.timeLeft = Math.min(DRILL_DURATION, eRef.timeLeft + 1.0); // L396 hit      — DELETE
```

All three failure modes become **exactly**:

1. `combo = 0`   ← **see E2, this is the one that gets forgotten**
2. increment the relevant counter (`preFires` / `missedClicks` / `targetsEscaped`)
3. `drillAudio.playPenalty()`
4. `triggerFlash()` (red)
5. `screenShake` (keep — it is drill juice, not a penalty)
6. **Score unchanged. Timer unchanged.**

**Rewrite the visible copy.** L890 (`-1.5s (Miss/Prefire/Escape)`) and L1048
(`RuleItem ... highlight="-1.5s Time penalty"`) both advertise the deleted mechanic. Replace with
`"Resets Combo"` / result `"No time or point loss"`.

### 6.2 New score formula

```js
import { getComboMultiplier } from '../../../../lib/scoringEngine';

const levelMult = 1 + getDifficultyProgress(eRef.level) * 0.5;   // 1.0 → 1.5
eRef.combo++;
if (eRef.combo > eRef.maxCombo) eRef.maxCombo = eRef.combo;
eRef.score += Math.round(100 * getComboMultiplier(eRef.combo) * levelMult);
```

Read `levelMult` **before** the level update, so a hit is paid at the difficulty it was made at.

**Why the level multiplier is mandatory:** a returning player resumes at 65% of best and faces a
~500 ms window with fake peeks. Without it they score *less* than a beginner on a 1400 ms window —
and since the grade is score-based, skill would be punished.

### 6.3 Grade — delete the rank system

**Delete L87-93** (`calculateRank`). It grades on `timeSurvived`, which is now a constant 45 for
every session — it would hand every player the same letter.

```js
import { getFpsScoreGrade } from '../../../../lib/scoringEngine';

const ELITE_SCORE = 12000;   // 100% mark — lower than other drills because this
                             // drill has ~1 scoring event/sec, not 10
const rating = getFpsScoreGrade(e.score, ELITE_SCORE);
```

Keep the coach-advice function if one exists — diagnostics and grading are separate concerns.

### 6.4 Storage

Replace the loose keys with the standard object:

```js
const STORAGE_KEY = 'skilldrills_fps_angle_hold_v2';
// { bestScore, bestCombo, bestLevel, totalSessions }
```

Keep `angleHold_sens_v2` as its own key (device preference).
**Delete `angleHold_speed_v2`** — the speed slider is gone.
`_v2` is required: scores are on a new scale and old bests would be unbeatable.

---

## 7. VISUAL FEEDBACK

### 7.1 Flash — currently absent entirely

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

Red fires on pre-fire, miss, and escape. **Red is the only flash colour.** No gold, no cyan,
no level-up flash — see `_MASTER_SPEC.md` §1.5.

### 7.2 Targets

Match the treatment now standard across the category (see `TargetAcquisitionClient.js`):

- Body: **radial gradient**, origin offset toward the upper-left → reads as a lit sphere
- Rim light: **2 px, on the edge**, in a related warm tone — not white, not offset outward
- **No `shadowBlur`** — expensive per-frame and reads as a muddy smear
- `drawPulseRing` with a **random per-target seed** stored at spawn
- `createBackdropCache` + `getCanvasDpr()` (cap DPR at 2)

The cover/wall geometry and the left/right peek sides must stay clearly readable — that is
gameplay information the player reads to pre-position their crosshair.

---

## 8. LAYOUT

Standard shell — `_MASTER_SPEC.md` §2. Copy `recoil-control`.

- **H1 centered above the box**, shortened to **`Angle Hold Pro`**
- **Exactly 4 stat cards:** Score · Time · Accuracy · Best
- **Exactly 3 things in the box:** Score `top-4 left-4` · Time `top-4 right-4` (red at ≤10 s) ·
  Sound `bottom-4 right-4`. Delete everything else, including any survival-time readout.
- **Sensitivity slider on the start card**, between the how-to rows and the mini-stats. Persist to
  `angleHold_sens_v2`. **The speed slider is deleted, not moved** — difficulty is the system's
  job now, not the player's. Start card must fit 800×450 **without scrolling**.
- `<DrillCountdown value={countdownValue} accent="#f97316" subtitle="First peek at GO" />`
- **3 accordions** via `DrillAccordion`: `rules` · `about` · **`faq` as its own section** (see E9)
- Related drills 4 → **6**: `180-degree-awareness`, `instant-response`, `target-acquisition`,
  `micro-correction-precision`, `flick-shot-training`, `anti-strafe-jitter-duel`
- `<DrillFooter />` — removes Pinterest
- `cursor-none` during play; `cursor-pointer` on all buttons
- `const DRILL_DURATION = 45;` with the smooth timer 180 uses

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

**Fullscreen first, then pointer lock — order is not optional.** ESC releases both; the fullscreen
transition resizes the canvas and silently discards a lock acquired before it, trapping the player
in a pause loop that looks like a frozen drill. Wire it to both L847 and L860.

⚠️ **Pause must not let a peek expire.** If pointer lock is lost mid-peek, freeze the peek timer —
otherwise the player returns to a target that already escaped and eats a penalty for a pause they
did not cause.

---

## 9. SEO

### 9.1 FAQ parity — highest risk item

Schema has **5**; the page renders **15**. Regenerate the `FAQPage` schema from the visible
accordion, word for word, **no numbering prefixes**. Verify with a real diff:

```bash
grep -oP '(?<="name": ")[^"]*\?' page.js | sort > /tmp/a
grep -oP '(?<=FAQItem q=")[^"]*\?' AngleHoldClient.js | sort > /tmp/b
diff /tmp/a /tmp/b    # must be empty
```

### 9.2 Add `VideoGame` schema

Alongside `SoftwareApplication`: `gamePlatform: "Web Browser"`,
`genre: ["FPS Training", "Aim Trainer"]`, `playMode: "SinglePlayer"`,
`applicationCategory: "Game"`.

### 9.3 `opengraph-image.js` — missing entirely, mandatory

Copy `app/drills/fps/recoil-control/opengraph-image.js`. Change:

- `ACCENT` → `'#f97316'` (orange — distinct from recoil-control's red)
- Title → `Angle Hold Pro`
- Description → *"Hold the angle and punish the peek. Train crosshair placement, pre-fire discipline, and reaction inside a shrinking window."*
- Pills → `45-SECOND DRILL`, `15 DIFFICULTY LEVELS`, `RAW MOUSE INPUT`, `FREE — NO SIGN-UP`

**Then delete the `images` arrays from BOTH `openGraph` and `twitter` in `page.js`** — they point
at `icon-512x512.png`, a square, while `twitter.card` is `summary_large_image` (needs 1200×630).

**Satori:** flexbox only, no CSS grid, explicit `display: flex` on multi-child elements, font
weights above ~700 fall back to regular.

**Verify the built binary**, not just the build exit code:
`.next/server/app/drills/fps/angle-hold-trainer/opengraph-image.body` must be a valid PNG at
exactly 1200×630.

### 9.4 Keywords and copy

- **Primary:** `angle hold aim trainer`
- **Secondary:** `crosshair placement drill`, `pre-fire training fps`,
  `CS2 angle holding practice`, `Valorant crosshair placement trainer`
- **Long-tail:** `how to hold an angle in cs2`, `how to stop pre-firing`,
  `best crosshair placement drill browser`, `how to improve peek reaction time`,
  `free angle holding trainer online`, `how to punish jiggle peekers`

"About This Drill" carries 400-500 words: what holding an angle means, why crosshair
pre-placement beats reaction speed, why pre-firing loses more rounds than it wins, what a jiggle
peek is and how to counter it, and what a good peek-reaction time looks like. Coaching voice.

---

## 10. EXECUTION ORDER

| # | Step | Notes |
|---|---|---|
| 1 | Delete inline audio; import `drillAudio`; remap 4 sites; add `playSessionEnd` | — |
| 2 | Storage → `skilldrills_fps_angle_hold_v2` object; delete `angleHold_speed_v2` | — |
| 3 | **Delete `timeFactor`, `speedMod`, `baseSpeed` + slider** | **E1, E3** |
| 4 | New `getLevelConfig` + `POINTS_PER_LEVEL` + monotonic level + `getStartLevel` | E4 |
| 5 | **Delete all four time modifiers**; add `combo = 0` to all three failure paths | **E2** |
| 6 | New score formula with combo × level | 4 |
| 7 | Delete `calculateRank`; wire `getFpsScoreGrade(score, 12000)` | — |
| 8 | Add flash system (`fx-flash-red`) — currently absent | — |
| 9 | Canvas: gradient targets, rim light, seeded pulse ring, backdrop cache, DPR cap | — |
| 10 | Layout: H1, 4 stat cards, in-box 3, sensitivity slider, countdown, 6 related, footer | — |
| 11 | Accordions via `DrillAccordion` — one at a time, check diagnostics between each | **E6** |
| 12 | `resumeDrill()` + freeze peek timer on pause | — |
| 13 | 45 s fixed + smooth timer | — |
| 14 | SEO: FAQ parity, `VideoGame`, `opengraph-image.js`, keywords, About copy | — |
| 15 | **Sweep unused imports**; run build; **then actually play it** | **E3, E7** |

---

## 11. ACCEPTANCE CHECKLIST

**Expected-bug sweep**
- [ ] `grep -c "timeFactor\|timeSurvived"` drives **nothing** — level system is sole authority
- [ ] All three failure paths set `combo = 0`
- [ ] No reference to `baseSpeed` or `speedMod` remains
- [ ] Peek window at L15 is short but **hittable**; fake peeks floor at ~180 ms
- [ ] Every `setTimeout` is ref-tracked and cleared on end/exit/unmount
- [ ] No unused imports (`lucide-react` list swept)
- [ ] No `animate-in` / `fade-in` utility classes — only `fx-*` from `globals.css`

**Audio**
- [ ] Zero local audio code; `drillAudio` imported
- [ ] 5 canonical events only; **no `playSpatialCue`**
- [ ] Pre-fire, miss, **and** escape all fire the same `playPenalty()`
- [ ] `playSessionEnd()` on the result card

**Difficulty & scoring**
- [ ] 15 levels via `getDifficultyProgress`; no clamps before L15
- [ ] L11 vs L15 measurably different (shorter window, faster peek, smaller, fake peeks)
- [ ] `hitPad` scales; never exceeds target radius
- [ ] Level monotonic; resumes at 65% of best; `bestLevel` persists
- [ ] `POINTS_PER_LEVEL = 150`; L15 reachable in ~15 s of strong play
- [ ] Score includes combo **and** level multiplier
- [ ] **Zero time modifiers — negative OR positive**; fixed 45 s
- [ ] Grade from `getFpsScoreGrade(score, 12000)`; `calculateRank` deleted
- [ ] Rule copy no longer advertises `-1.5s` or `+1.0s`

**Visual**
- [ ] `fx-flash-red` fires on all three failure modes; **red is the only flash**
- [ ] Targets: gradient + rim light + seeded pulse ring; no `shadowBlur`
- [ ] Cover geometry and peek sides remain readable
- [ ] `cursor-none` during play

**Layout**
- [ ] H1 centered, reads `Angle Hold Pro`
- [ ] Exactly 4 stat cards; exactly 3 things in the box
- [ ] Sensitivity slider on start card; **speed slider deleted**; no scroll at 800×450
- [ ] ESC → resume returns to **fullscreen**; peek timer frozen while paused
- [ ] Countdown; 3 accordions (faq its own); 6 related; footer IG · FB · YT · X

**SEO**
- [ ] `diff` of schema vs visible FAQ is **empty** (15 = 15, no numbering)
- [ ] `VideoGame` schema present
- [ ] `opengraph-image.body` is a valid PNG at **exactly 1200×630**
- [ ] Manual `images` arrays deleted from `openGraph` **and** `twitter`

**Build & runtime**
- [ ] `npx next build` exits 0, no errors or warnings
- [ ] **Drill actually played start-to-finish** — a green build does not prove the loop runs (E3)
- [ ] Drills 1-3 still work
