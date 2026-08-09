# RECOIL CONTROL — IMPLEMENTATION PLAN

**Drill:** `app/drills/fps/recoil-control/`
**Client:** `RecoilControlClient.js` (1,551 lines) · **Page:** `page.js` (184 lines)
**Read first:** `implementation/fps/_MASTER_SPEC.md`
**Reference implementations — both already conform, copy their patterns:**
`app/drills/fps/180-degree-awareness/` and `app/drills/fps/target-acquisition/`

---

## 0. READ THIS BEFORE WRITING ANY CODE

- **All shared modules already exist. Import them, write no new versions.**
  `lib/drillAudio.js` · `lib/drillDifficulty.js` · `lib/canvasFx.js` · `lib/scoringEngine.js` ·
  `components/drill/DrillFooter.js` · `components/drill/DrillCountdown.js` ·
  `components/drill/DrillAccordion.js`
- **Do not open the reference app** (`- Copy - Copy`). Every correct sound value is already in
  `lib/drillAudio.js`. That app is read-only and reading it wastes tokens.
- **Five sound events only.** No level-up sound, no combo sound, no weapon-specific sounds.
- **Red is the only flash colour.**
- **Difficulty must be aggressive AND keep scaling to L15** — no clamps that bite early.

---

## 1. WHAT THIS DRILL IS

Hold left-click; the weapon fires a 30-round magazine along a fixed recoil pattern. The player
must pull the mouse to counteract the pattern and keep rounds on a strafing target. Hits score
by zone: **headshot / chest / limb**.

The trained skill is **sustained motor compensation** — a continuous corrective motion, not
discrete flicks. Difficulty must therefore attack the *pattern* and the *target motion*, not
just target size.

**Preserve the weapon config, the recoil pattern, and the zone-based hit model.** Everything
below changes how it scales, sounds, scores, and looks — never what it is.

---

## 2. AUDIT — 16 DEFECTS

| # | Defect | Location |
|---|---|---|
| 1 | Inline `class AudioSynthesizer`, 5 non-canonical sounds (`playShoot`, `playDink`, `playKill`, `playClick`, `playFail`) | L18-100 |
| 2 | **`-50 PTS` negative score** — the only one in the category | L789 |
| 3 | **`-2.0s` time penalty** | L790 |
| 4 | 5 hardcoded difficulty branches; L6+ fallback clamps at `0.45` scale / `420` speed | L134-160 |
| 5 | Score has **no combo, no level multiplier** (flat `+15` / `+5` / `+3`) | L692, L707, L720 |
| 6 | **Absolute-threshold rank system** (`score >= 4000`…) — unfair across resume levels | L166-171 |
| 7 | **No 3-2-1 countdown** | — |
| 8 | Flash is a **canvas background swap**, not `fx-flash-red` | L246, L826 |
| 9 | **Fullscreen not restored** on resume | L546 |
| 10 | **5 stat cards** (spec: 4); Level shown as a stat | L1008-1012 |
| 11 | H1 is `Recoil Control Trainer – FPS Spray Pattern Mastery Drill` — long, left-aligned, not centered above the box | L988 |
| 12 | **No instruction accordions** | — |
| 13 | Only **4 related-drill cards** (spec: 6) | — |
| 14 | **Pinterest** in footer; footer duplicated inline | — |
| 15 | **Storage is loose keys** (`recoil_sens`, `recoil_bestScore`) — **no `bestLevel` or `bestCombo` saved at all**, so adaptive resume is impossible | L327-387 |
| 16 | **FAQ schema has 5 Qs, page renders 15.** No `VideoGame` schema. No `opengraph-image.js` | `page.js` |

---

## 3. THE SPRAY-DISCIPLINE PROBLEM — READ CAREFULLY

L789-790 punishes emptying a full magazine without a kill:

```js
e.score = Math.max(0, e.score - 50);
e.timeLeft = Math.max(0, e.timeLeft - 2.0);
```

Both must go — negative scoring and time penalties are banned category-wide. But this drill's
**entire teaching point** is "don't dump your whole magazine." Deleting the punishment with no
replacement removes the lesson.

**Resolution: make the consequence intrinsic instead of extrinsic.**

Wasting a magazine already costs the player, through mechanics that already exist:

1. **The forced reload.** The clock keeps running at 1× while you reload and cannot shoot. That
   is a real, self-inflicted cost — and unlike a `-2s` deduction it is a *game mechanic* the
   player understands and controls, not an arbitrary clock deduction. Make the reload the sole
   consequence, and give it presence: a visible reload bar and a disabled trigger.
2. **The combo resets.** With the new combo multiplier (§6.2) a broken streak is worth far more
   than 50 points — the punishment is now *larger* than before, but it is expressed as
   opportunity cost rather than confiscation.
3. **The target survives**, so the scoring opportunity is lost outright.

So a spray-discipline failure does exactly this:

1. `combo = 0`
2. `sprayDisciplineCount += 1` (keep — it feeds `getPerformanceAnalysis`)
3. `drillAudio.playPenalty()`
4. `triggerFlash()` (red)
5. Forced reload
6. **Score unchanged. Timer unchanged.**

**Do not shorten the reload to compensate, and do not add a "penalty reload" that is longer than
a normal one** — that would be a time penalty wearing a costume.

Update the visible copy too: `RuleItem num="4" text="Discipline Penalty" highlight="-50 PTS / -2s"`
becomes `"Magazine Discipline" / "Combo reset + reload"` with result
*"Dumping a full mag costs your streak and your reload time — no points or seconds are deducted."*

---

## 4. AUDIO

**Delete L18-100** (the inline class and its singleton).

```js
import { drillAudio } from '../../../../lib/drillAudio';
```

| Current | Becomes | Notes |
|---|---|---|
| `audioSynth.playShoot()` (L673) | **DELETE — see below** | Per-bullet muzzle sound |
| `audioSynth.playDink()` (L698) | `drillAudio.playHit()` | Headshot |
| `audioSynth.playKill()` (L739) | `drillAudio.playHit()` | Kill — **no separate fanfare** |
| `audioSynth.playClick()` (L785) | `drillAudio.playPenalty()` | Dry fire / empty mag |
| `audioSynth.playFail()` (L792) | `drillAudio.playPenalty()` | Spray-discipline failure |
| `.init()` / `.setEnabled()` | `drillAudio.init()` / `.setEnabled()` | — |

Add `drillAudio.playSessionEnd()` in the end-game handler.

### ⚠️ The per-bullet fire sound — deliberate decision

`playShoot()` fires **once per bullet**, up to 30 per magazine at full auto. Mapped to
`playHit()` that becomes a rapid burst of identical 880 Hz tones — genuinely unpleasant, and it
would mask the `playHit()` that signals an actual hit, destroying the audio feedback the drill
depends on.

**Decision: delete the per-bullet fire sound entirely.** Hits are audible (`playHit`), misses are
silent, and the difference between them is exactly the signal the player needs. Muzzle noise
carries no training information and actively hides the useful cue.

Chest and limb hits also use `playHit()`. **Do not** introduce quieter or pitched variants per
zone — that would be a sixth event. Zone differentiation is visual (hit marker) and numeric
(`fx-score-popup` `+N`), not auditory.

---

## 5. DIFFICULTY — 5 BRANCHES → 15 CONTINUOUS

**Delete L134-160.**

```js
import { MAX_LEVEL, getStartLevel, getDifficultyProgress } from '../../../../lib/drillDifficulty';

const POINTS_PER_LEVEL = 150;

const getLevelConfig = (level) => {
  const p = getDifficultyProgress(level);   // 0 → 1 across L1..L15
  return {
    targetScale: 1.25 - p * 0.80,   // 1.25 → 0.45
    speed:       60   + p * 360,    // 60 → 420 px/s strafe
    recoilMult:  1.0  + p * 0.60,   // 1.0 → 1.6  ← the drill-specific axis
    hitPad:      8    - p * 5,      // 8 → 3 px
  };
};
```

**`recoilMult` is this drill's top-end dimension.** Scale size and strafe speed max out as
useful axes fairly early; a stronger kick keeps the *compensation* skill — the actual subject of
the drill — getting harder all the way to L15. Multiply the existing recoil pattern's per-shot
offsets by it. **Do not change the pattern's shape**, only its magnitude — the shape is the
muscle memory being trained.

Rules: every value driven by `getDifficultyProgress`, reaching its extreme **exactly at L15**,
**no clamps biting before then**. `hitPad` must scale or shrinking targets stops mattering.

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

### 6.1 Delete the penalties

```js
e.score = Math.max(0, e.score - 50);          // L789 — DELETE
e.timeLeft = Math.max(0, e.timeLeft - 2.0);   // L790 — DELETE
```

Also delete the per-second `engine.current.timeLeft -= 1` (L505) in favour of the smooth timer
180° Awareness uses. Fixed, uninterruptible 45 s.

### 6.2 New score formula

```js
import { getComboMultiplier } from '../../../../lib/scoringEngine';

const ZONE_POINTS = { head: 100, chest: 40, limb: 20 };   // was 15 / 5 / 3

const levelMult = 1 + getDifficultyProgress(eRef.level) * 0.5;   // 1.0 → 1.5
eRef.score += Math.round(ZONE_POINTS[zone] * getComboMultiplier(eRef.combo) * levelMult);
```

**Bases raised deliberately.** They put an elite run near ~15,000, in the same band as 180°
Awareness (~17,000) and Target Acquisition (~18,000), so scores are comparable across the
category instead of each drill sitting on its own scale.

Read `levelMult` **before** the level update, so a hit is paid at the difficulty it was made at.

**Combo counts consecutive hits and resets on a miss or a discipline failure.** This is what
makes the removed `-50` unnecessary: at a 2.5× multiplier, losing the streak costs far more than
50 points, and it costs it as forfeited upside rather than confiscated score.

### 6.3 Grade — delete the rank system

**Delete L166-171** (`calculateRank`). Absolute score gates are structurally unfair here: a
player resuming at L10 faces a 1.6× recoil multiplier and a 0.45-scale target, so equal skill
yields a different raw score than a beginner at L1.

```js
import { getFpsScoreGrade } from '../../../../lib/scoringEngine';

const ELITE_SCORE = 15000;   // 100% mark for this drill — raise if S becomes common
const rating = getFpsScoreGrade(e.score, ELITE_SCORE);
```

**Keep `getPerformanceAnalysis()` (L177-220) unchanged** — it is genuinely good, drill-specific
coaching that reads spray discipline, headshot ratio, and efficiency. It is diagnostics, not
grading, and the two now cleanly separate.

### 6.4 Storage — currently broken for adaptive difficulty

L327-387 uses loose keys (`recoil_sens`, `recoil_bestScore`) and **never persists `bestLevel` or
`bestCombo`**, so §5's resume-at-65% cannot work. Replace with the standard object other drills
use:

```js
const STORAGE_KEY = 'skilldrills_fps_recoil_control_v2';
// { bestScore, bestCombo, bestLevel, totalSessions }
```

Keep `recoil_sens` as its own key (sensitivity is a device preference, not progress).
The `_v2` suffix is required — scores are on a new scale and old bests would be unbeatable.

---

## 7. VISUAL FEEDBACK

### 7.1 Flash

Delete `flashBg` state (L246), `flashBgRef` (L273-277), and the conditional canvas fill at L826.
The canvas background is **always `#050508`**.

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

Red fires on spray-discipline failure and dry fire. **Nothing else flashes.**

⚠️ **Do not flash on an individual missed bullet.** At full auto that would strobe the screen
dozens of times per magazine. Misses are communicated by the absence of a hit marker and by the
combo breaking.

### 7.2 Targets

Match the treatment now standard across the category (see `TargetAcquisitionClient.js` for a
worked example):

- Body: **radial gradient** with origin offset toward the upper-left (implies a light source and
  reads as a lit sphere, not a flat disc)
- Rim light: 2 px, **on** the edge, in a related warm tone — not white, not offset outward
- **No `shadowBlur`** — it is expensive per-frame and reads as a muddy smear
- `drawPulseRing` from `lib/canvasFx.js` with a **random per-target seed** stored at spawn
- Apply `createBackdropCache` and `getCanvasDpr()` — cap DPR at 2

Hit zones must stay visually distinct (head / chest / limb) — that is gameplay information, not
decoration. Keep the zone boundaries readable while applying the gradient treatment.

---

## 8. LAYOUT

Standard shell — see `_MASTER_SPEC.md` §2 and copy `target-acquisition`:

- **H1 centered above the box**, shortened to **`Recoil Control Pro`**. The current
  `Recoil Control Trainer – FPS Spray Pattern Mastery Drill` is too long for a title register and
  dilutes search intent across three competing phrases.
- **Exactly 4 stat cards:** Score · Time · Accuracy · Best. Delete the `Level` and 5th cards.
- **Exactly 3 things in the box:** Score `top-4 left-4` · Time `top-4 right-4` (red at ≤10 s) ·
  Sound `bottom-4 right-4`. **The magazine/ammo counter is the one permitted exception** — it is
  live gameplay state the player must act on, not chrome. Render it minimally at
  `bottom-4 left-4`, same type scale as the Score label.
- **Sensitivity slider on the start card**, between the how-to rows and the mini-stats. Persist to
  `recoil_sens`. Start card must fit 800×450 **without scrolling**.
- `<DrillCountdown value={countdownValue} accent="#ef4444" subtitle="Target spawns at GO" />`
- 4 accordions via `DrillAccordion`
- Related drills 4 → **6**: `target-acquisition`, `strafe-tracking`, `micro-correction-precision`,
  `flick-shot-training`, `anti-strafe-jitter-duel`, `pro-smooth-pursuit`
- `<DrillFooter />` — removes Pinterest
- `cursor-none` during play; `cursor-pointer` on all buttons

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

**Fullscreen first, then pointer lock — order is not optional.** ESC releases both; the
fullscreen transition resizes the canvas and silently discards a lock acquired before it,
trapping the player in a pause loop that looks like a frozen drill.

⚠️ **Also release the trigger on pause.** If the player holds left-click and hits ESC, the fire
loop must stop — otherwise the magazine drains while the game is paused. Clear the firing state
whenever pointer lock is lost.

---

## 9. SEO

### 9.1 FAQ parity — highest risk item

`page.js` ships **5** questions; the page renders **15**. Regenerate the `FAQPage` schema from
the visible accordion, word for word, **no numbering prefixes**.

Verify with a real diff, not a count:

```bash
grep -oP '(?<="name": ")[^"]*\?' page.js | sort > /tmp/a
grep -oP '(?<=FAQItem q=")[^"]*\?' RecoilControlClient.js | sort > /tmp/b
diff /tmp/a /tmp/b    # must be empty
```

### 9.2 Add `VideoGame` schema

Alongside `SoftwareApplication`: `gamePlatform: "Web Browser"`,
`genre: ["FPS Training", "Aim Trainer"]`, `playMode: "SinglePlayer"`,
`applicationCategory: "Game"`.

### 9.3 `opengraph-image.js` — mandatory

Copy `app/drills/fps/target-acquisition/opengraph-image.js`. Change:

- `ACCENT` → `'#ef4444'` (red — this drill's identity)
- Title → `Recoil Control Pro`
- Description → *"Master weapon spray patterns. Train sustained recoil compensation and first-magazine accuracy."*
- Pills → `45-SECOND DRILL`, `15 DIFFICULTY LEVELS`, `RAW MOUSE INPUT`, `FREE — NO SIGN-UP`

**Then delete the `images` arrays from BOTH `openGraph` and `twitter` in `page.js`** — they point
at `icon-512x512.png`, a square, while `twitter.card` is `summary_large_image` (needs 1200×630).
Leaving them puts the wrong-shaped candidate back in the tag list.

**Satori:** flexbox only, no CSS grid, explicit `display: flex` on multi-child elements, font
weights above ~700 fall back to regular.

### 9.4 Keywords and copy

- **Primary:** `recoil control trainer`
- **Secondary:** `spray pattern practice`, `AK47 spray control drill`,
  `CS2 recoil control practice`, `Valorant spray control trainer`
- **Long-tail:** `how to control recoil in cs2`, `how to master spray patterns fps`,
  `best recoil control drill browser`, `free spray pattern trainer online`,
  `how to pull down on spray`, `improve first magazine accuracy`

"About This Drill" carries 400-500 words: what a recoil pattern is, why compensation is a
sustained motor skill rather than a flick, why the first 10 rounds matter most, and how spray
discipline (resetting before losing control) beats holding the trigger. Coaching voice.

---

## 10. EXECUTION ORDER

| # | Step | Depends on |
|---|---|---|
| 1 | Delete inline audio; import `drillAudio`; remap 4 sites; **delete per-bullet fire sound**; add `playSessionEnd` | — |
| 2 | Storage → `skilldrills_fps_recoil_control_v2` object with `bestLevel`/`bestCombo` | — |
| 3 | New `getLevelConfig` + `POINTS_PER_LEVEL` + monotonic level + `getStartLevel` | 2 |
| 4 | New zone scoring with combo × level; **delete `-50` and `-2s`**; spray failure → combo reset + reload | 3 |
| 5 | Delete `calculateRank`; wire `getFpsScoreGrade(score, 15000)`; keep `getPerformanceAnalysis` | — |
| 6 | Replace `flashBg` with `fx-flash-red`; **no per-bullet flash** | — |
| 7 | Canvas: gradient targets, rim light, `drawPulseRing` + seed, backdrop cache, DPR cap | — |
| 8 | Layout: H1, 4 stat cards, in-box 3 + ammo, sensitivity slider, countdown, accordions, 6 related, footer | — |
| 9 | `resumeDrill()` + **release trigger on pause** | — |
| 10 | 45 s + smooth timer | — |
| 11 | SEO: FAQ parity, `VideoGame`, `opengraph-image.js`, keywords, About copy | 8 |

---

## 11. ACCEPTANCE CHECKLIST

**Audio**
- [ ] Zero local audio code; `drillAudio` imported
- [ ] 5 canonical events only; **no per-bullet fire sound**; no `playSpatialCue`
- [ ] Dry fire **and** spray-discipline failure both fire `playPenalty()`
- [ ] `playSessionEnd()` on the result card
- [ ] Full-auto magazine does not produce a machine-gun of tones

**Difficulty & scoring**
- [ ] 15 levels via `getDifficultyProgress`; **no clamps before L15**
- [ ] L11 vs L15 measurably different (smaller, faster, **stronger recoil**)
- [ ] Recoil pattern *shape* unchanged; only magnitude scales
- [ ] `hitPad` scales; never exceeds target radius
- [ ] Level monotonic; resumes at 65% of best; `bestLevel` actually persists
- [ ] `POINTS_PER_LEVEL = 150`; L15 reachable in ~15 s of strong play
- [ ] Score includes combo **and** level multiplier
- [ ] **Zero negative scoring; zero time penalties**; fixed 45 s
- [ ] Spray failure = combo reset + reload only; reload is normal length
- [ ] Grade from `getFpsScoreGrade(score, 15000)`; `calculateRank` deleted
- [ ] `getPerformanceAnalysis` preserved and still fires

**Visual**
- [ ] `fx-flash-red` overlay; `flashBg` deleted; canvas always `#050508`
- [ ] **Red is the only flash**; no per-bullet flash
- [ ] Targets use gradient + rim light + seeded pulse ring; no `shadowBlur`
- [ ] Hit zones remain visually distinguishable

**Layout**
- [ ] H1 centered, reads `Recoil Control Pro`
- [ ] Exactly 4 stat cards; box contains Score, Time, Sound + ammo counter
- [ ] Sensitivity slider on start card; no scroll at 800×450
- [ ] ESC → resume returns to **fullscreen**; trigger released on pause; magazine does not drain
- [ ] Countdown, 4 accordions, 6 related, footer IG · FB · YT · X

**SEO**
- [ ] `diff` of schema vs visible FAQ is **empty** (15 = 15, no numbering)
- [ ] `VideoGame` schema present
- [ ] `opengraph-image.js` builds to a valid PNG at **exactly 1200×630**
      (`.next/server/app/drills/fps/recoil-control/opengraph-image.body`)
- [ ] Manual `images` arrays deleted from `openGraph` **and** `twitter`

**Build**
- [ ] `npx next build` exits 0, no errors or warnings
- [ ] 180° Awareness and Target Acquisition still work
