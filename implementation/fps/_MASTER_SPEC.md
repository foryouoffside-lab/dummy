# FPS DRILL MASTER SPEC — v1

**Status:** Authoritative. Every FPS drill must conform to this document.
**Audience:** Antigravity CLI (implementer). Read this fully before touching any drill.
**Reference drill:** `app/drills/fps/180-degree-awareness/AwarenessDrillClient.js` — the closest
existing drill to this spec. When this document and that drill disagree, **this document wins**.

---

## 0. THE RULE THAT OVERRIDES EVERYTHING

> **Build shared modules once. Never copy-paste behaviour into 16 drill files.**

The single biggest defect in the current FPS category is duplication:

- `class AudioSynthesizer` is defined **inline in 12 separate drill files**.
- 4 more drills (`anti-zigzag`, `micro-correction-precision`, `pro-smooth-pursuit`,
  `reactive-sphere-tracking`) each hand-roll their own `audioCtxRef` + oscillators.
- Across the category there are **28 distinct sound method names** (`playDink`, `playThud`,
  `playPop`, `playKill`, `playBreak`, `playShoot`, `playBuzz`, `playCritical`, …) for what are
  really only ~7 events.
- The social footer markup is duplicated in 15 drill files.

This is why the drills do not feel like one product. **Phase 1 below is not optional and must
land before any individual drill is touched.**

---

## PHASE 1 — SHARED FOUNDATION (build first, once)

### 1.1 `lib/drillAudio.js` — the ONE sound system

Create this file. It replaces every inline `AudioSynthesizer` class and every ad-hoc
`audioCtxRef` in the FPS category.

Base it on the proven synth in the reference app
(`- Copy - Copy/lib/audioSynth.js`) — **do not modify that app, only read it.**

```js
// lib/drillAudio.js
'use client';

class DrillAudio {
  constructor() { this.ctx = null; this.enabled = true; }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {}
    }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  }

  setEnabled(v) { this.enabled = v; }

  tone(freq, dur, type = 'sine', vol = 0.15, sweepTo = null) { /* see audioSynth.js */ }

  // ── THE FIVE CANONICAL EVENTS ──
  playHit()           // correct hit
  playPenalty()       // wrong click / miss / timeout  (ONE sound for all three)
  playCountdownTick() // 3, 2, 1
  playGo()            // GO
  playSessionEnd()    // result card reveal — built on chimeVoice()

  chimeVoice(freq, startAt, dur, vol, filterFreq) // detuned pair → lowpass
}

export const drillAudio = typeof window !== 'undefined' ? new DrillAudio() : null;
```

**Exact sound design — these values are final. Do not retune per drill.**

> ⚠️ **CORRECTED v2.** These values are taken from the reference app's **drill**
> (`- Copy - Copy/app/drills/cognitive/processing-speed/reaction-time/EliteNeuroSwitchClient.js`),
> **not** from its `lib/audioSynth.js`. The drills do not use that shared library — each carries
> its own inline synth with different values, and the drills are what the player actually hears.
> An earlier version of this spec used `audioSynth.js` and produced wrong sounds.

**There are FIVE canonical events, not seven.**

| Event | Spec | Rationale |
|---|---|---|
| `playHit()` | 880 Hz sine → sweep 1760 Hz, 0.12 s, vol 0.16 | Bright, short, non-fatiguing at high fire rates |
| `playPenalty()` | Two low **sine** notes: A3 220 Hz (0 ms) → E3 165 Hz (+60 ms), each 0.08 s, vol 0.12, 10 ms linear attack | Low sine has **no harmonic content**, so nothing in it is sharp. Triangle/square at mid frequencies puts harmonics in the ear's most sensitive band — that is what reads as a buzz |
| `playCountdownTick()` | 440 Hz sine, 0.09 s, vol 0.12 | Neutral metronome |
| `playGo()` | C5 523.25 Hz triangle → sweep G5 784 Hz, 0.18 s, vol 0.17 | Rising = "begin" |
| `playSessionEnd()` | Built from `chimeVoice()`, **not** `tone()`: C5 523.25 / E5 659.25 / G5 783.99 at 80 ms spacing (0.24 s, vol 0.13, lowpass 3200 Hz), then C6 1046.5 at +260 ms (0.6 s, vol 0.16, lowpass 4200 Hz) | Resolution / reward |

**`chimeVoice(freq, startAt, dur, vol, filterFreq)` is required.** Each voice is **two sine
oscillators detuned ±4 cents** routed through a lowpass `BiquadFilter` (Q 0.5) into a gain with
a 15 ms attack. That detuned pair is what gives the result sound its warmth — a single raw sine
cannot reproduce it. Port verbatim from `EliteNeuroSwitchClient.js:93-116`.

**Explicitly DO NOT create `playLevelUp()` or `playComboTier()`.** Neither exists in the
reference app. A level-up chime or combo fanfare is a *notification*, which §2.3 forbids.
Difficulty rising must be **felt** (targets smaller/faster), never announced.

**Hard rules:**
- **`playPenalty()` is the single sound for wrong-click, miss, AND timeout.** You explicitly
  asked for this. Do not add a separate timeout sound.
- **No `sawtooth` or `square` waveforms anywhere.** The existing `playWrongBoom`
  (square 140→35 Hz) and `playGameOver` (sawtooth 400→80 Hz) are harsh and are **deleted**.
- Master volume ceiling **0.17**. Nothing louder.
- Every sound wrapped in `try {} catch (e) {}` — audio must never crash a drill.
- **DELETE** all 28 legacy method names. Any drill calling `playDink`/`playThud`/`playPop`/
  `playKill`/`playBreak`/`playShoot`/`playBuzz`/etc. is remapped to one of the seven above.

**Legacy → canonical remap table:**

| Legacy names found in codebase | Maps to |
|---|---|
| `playPulseHit`, `playHitBeep`, `playDink`, `playPop`, `playKill`, `playDestroy`, `playSuccess`, `playStandard`, `playShoot`, `playClick`, `playCritical` | `playHit()` |
| `playHazardBoom`, `playBuzz`, `playFail`, `playThud`, `playBreak`, `playPrefire` | `playPenalty()` |
| `playTick`, `playFlowTick` | `playCountdownTick()` |
| `playChainBonus`, `playSetClear` | **DELETE** — no combo/milestone sound exists |
| `playLevelUp` | **DELETE** — no level-up sound exists |
| `playResultsReveal` | `playSessionEnd()` |
| `playSpawnStereo` | **DELETE** everywhere except `180-degree-awareness` — see exception below |

**The one approved exception — `playSpatialCue(panValue)`**

Add this eighth method to `lib/drillAudio.js`, documented as a **mechanic cue, not a feedback
sound**: 550 → 700 Hz sine, 0.08 s, vol **0.06**, panned via `StereoPannerNode`.

Only `180-degree-awareness` may call it. In that drill the stereo pan *is the skill being
trained* — the target spawns behind the player's field of view and the pan is the only cue for
which way to spin (the drill's own coaching copy says *"Trust your audio cue"*). Deleting it
would delete the drill's reason to exist. Every other drill uses the seven canonical events only.

### 1.2 `lib/drillDifficulty.js` — the ONE difficulty system

Create this file. It is the **only** difficulty authority for FPS drills.

```js
// lib/drillDifficulty.js
export const MAX_LEVEL = 15;

// Fraction of personal-best level a returning player resumes at.
// You asked for "60-70% of best" — 0.65 is the midpoint.
export const RESUME_FACTOR = 0.65;

/** Where a session starts. First-timers get level 1. */
export function getStartLevel(bestLevel) {
  return Math.max(1, Math.min(MAX_LEVEL, Math.round((bestLevel || 1) * RESUME_FACTOR)));
}

/**
 * In-session level. MONOTONIC — can only ever rise.
 * `currentLevel` is passed in so a bad patch late in a run can never walk it back.
 */
export function getNextLevel(score, currentLevel, pointsPerLevel = 1000) {
  const earned = Math.floor(score / pointsPerLevel) + 1;
  return Math.min(MAX_LEVEL, Math.max(currentLevel, earned));
}

/** Difficulty curve position, 0 → 1. Drills scale their own params off this. */
export function getDifficultyProgress(level) {
  return (Math.min(level, MAX_LEVEL) - 1) / (MAX_LEVEL - 1);
}
```

**The behaviour you specified, stated precisely:**

1. **Within a session, difficulty only ever goes up.** `Math.max(currentLevel, earned)`
   guarantees it. If a player starts strong and then struggles, the drill stays hard.
   It never softens to accommodate a bad patch.
2. **Between sessions, a returning player resumes at 65% of their best level.** They
   re-clear familiar ground fast (feels good, no boredom), then push past their previous
   ceiling (feels challenging).
3. **Progression is driven by score, not by accuracy.** Score already embeds speed, combo,
   and correctness — so "the drill gets harder as you perform better" falls out naturally.
4. **Progression must be AGGRESSIVE.** See the pacing rule below — this is not optional.

**PACING RULE — climb hard, then survive**

The reference drill levels up every **40 points** on a ~9-60 pts/hit scale — roughly **2-4 hits
per level**. A player reaches `MAX_LEVEL` in the first third of a session and then survives at
maximum difficulty for the rest. That shape is deliberate and is why the drills don't get boring.

Each drill sets `POINTS_PER_LEVEL` so that **`MAX_LEVEL` is reachable in the first ~⅓ of the
session under strong play.** Calibrate it against that drill's own points-per-hit:

```
POINTS_PER_LEVEL ≈ (avg points per hit × hits in the first third) / MAX_LEVEL
```

Worked example — 180° Awareness: `100 × comboMultiplier` ≈ 150 pts/hit avg, ~1.5 targets/sec,
45 s session → first third ≈ 22 hits ≈ 3,300 pts ÷ 15 levels ≈ **250**.

**`POINTS_PER_LEVEL` is the only knob for pacing.** Never adjust pace by editing the
difficulty curve — that changes what a level *means*, not how fast you reach it.

⚠️ **Fast climbing is worthless if the curve saturates early.** Every difficulty parameter must
reach its extreme at exactly `MAX_LEVEL` — drive them all from `getDifficultyProgress(level)`
with no `Math.max`/`Math.min` clamps that bite before L15. Audit this per drill: 180° Awareness
had every parameter clamped by L11, making levels 12-15 identical and the ladder's top third
decorative. Also scale any flat hit-forgiveness pad with level, or shrinking targets stops
mattering once the pad exceeds the target radius.

### 1.3 RETIRE the competing tier system — ✅ **DECIDED: retire completely**

`lib/adaptiveDifficulty.js` implements a second, conflicting engine:

- A Bronze → Silver → Gold → Diamond → Radiant tier ladder driven by *accuracy*.
- `shouldDemote()` — **which actively makes the drill easier after 3 weak sessions.**

That demotion is a direct contradiction of your rule. Two engines also means a drill can be
"level 9" and "Silver tier" simultaneously, with `targetSizeMult` and `speedMult` fighting the
level curve.

**Sangmesh has approved full retirement.** One engine, one number, one mental model.
`lib/drillDifficulty.js` above becomes the sole difficulty authority.

**Actions:**

**Good news — this is a clean deletion.** A full-project search shows `adaptiveDifficulty.js`
has **exactly one consumer**:

```
app/drills/fps/FPSHubClient.js:90   const { getAllDrillTiers } = require("../../../lib/adaptiveDifficulty");
app/drills/fps/FPSHubClient.js:91   setDrillTiers(getAllDrillTiers());
```

No drill imports `getAdaptiveParams`. The tier multipliers (`targetSizeMult`, `speedMult`,
`spawnDelayMult`) were **never actually wired into gameplay** — they were dead config all along.
The demotion bug was latent, not active. Deleting this removes ~300 lines of dead weight.

**Actions:**

1. **Delete `lib/adaptiveDifficulty.js`.**
2. In `FPSHubClient.js`: remove the `require` and the `drillTiers` state, and replace the tier
   badge on each hub card with `Lv.{bestLevel}` read from that drill's own `localStorage` key
   (e.g. `skilldrills_fps_180_awareness_v1` → `.bestLevel`). The hub keeps showing progression,
   using the surviving system.
3. Leave the orphaned `skilldrills_tier_*` localStorage keys alone — dead keys are harmless and
   wiping them would need migration code for zero benefit.

**Out of scope, noted for later:** `lib/difficultyManager.js` is a *third* difficulty system,
used only by two **visual** drills (`wide-field`, `peripheral-flash`). It does not touch FPS.
Leave it alone for now — flag it when we reach the visual category.

### 1.4 Scoring — what gets deleted

**Delete from every FPS drill, with no replacement:**

| Pattern | Found in |
|---|---|
| `eRef.timeLeft -= 2.0` | `target-acquisition` (×2) |
| `-1.5s` time penalty | `angle-hold-trainer` |
| `-1.0s` time penalty | `anti-strafe-jitter-duel`, `anti-zigzag-movement-trainer` |
| `-1s` time penalty | `flick-shot-training` |
| `-0.5s` time penalty | `instant-response`, `strafe-tracking` |
| `eRef.timeLeft += 1` (time **reward**) | `flick-shot-training` |
| `-50 PTS` score deduction | `recoil-control` |

**Replacement behaviour for a wrong click / miss / timeout — all three identical:**

1. `combo = 0`
2. `mistakes += 1`
3. `drillAudio.playPenalty()`
4. Red flash (`fx-flash-red`, see 1.5)
5. **Score unchanged. Timer unchanged.**

Rationale: the score is already a strong signal. Draining the clock punishes a player twice for
one error and makes the session length non-deterministic, which breaks score comparability
between runs. **Every drill runs a fixed, uninterruptible 60 s.**

Also update the visible copy — the start cards and rule lists still advertise these penalties
(e.g. `<RuleItem num="4" text="Time Penalties" highlight="-1s Time Penalty" />`). All such
`RuleItem` / `StatCard` "Penalty" rows must be rewritten to describe the new behaviour
("Miss → combo reset, no time or point loss").

### 1.5 Visual feedback — already present, just unused

`styles/globals.css` **already defines** every effect needed. Do not write new CSS:

| Class | Use |
|---|---|
| `.fx-flash .fx-flash-red` | Wrong click / miss / timeout. **Mandatory on all three.** |
| `.fx-pop-in` | Countdown digit entrance |
| `.fx-vignette` | Final 10 s urgency |
| `.fx-score-popup` | Floating `+N` at hit location |

> 🔴 **RED IS THE ONLY FLASH COLOUR A DRILL MAY TRIGGER.**
> `.fx-flash-gold` and `.fx-flash-cyan` stay defined in `globals.css` (shared utilities used
> elsewhere), but **no FPS drill calls them**. A gold level-up flash or cyan combo flash is a
> *notification*, which §2.3 forbids. Red then carries one unambiguous meaning: *you made a
> mistake*. Level changes are communicated by the targets themselves getting smaller and faster.

Standard flash implementation (lift verbatim from `AwarenessDrillClient.js` lines ~301-306):

```js
const triggerFlash = useCallback((variant) => {
  flashIdRef.current += 1;
  const id = `${Date.now()}-${flashIdRef.current}`;
  setFlashes((f) => [...f, { id, variant }]);
  setTimeout(() => { if (mountedRef.current) setFlashes((f) => f.filter((x) => x.id !== id)); }, 150);
}, []);
```

### 1.6 `components/drill/DrillCountdown.js` — shared 3-2-1-GO

**15 of 16 drills have no countdown at all.** Extract the reference implementation into one
component and mount it in every drill.

- Sequence: `3` → `2` → `1` → `GO`, **700 ms per step**.
- Each digit fires `drillAudio.playCountdownTick()`; `GO` fires `drillAudio.playGo()`.
- Digit uses `key={value}` + `.fx-pop-in` so each number re-animates.
- Visual: 112 px circle, 3 px ring, counter-rotating accent arc (`animate-spin`, 0.7 s),
  digit in `text-5xl font-black` with a white→accent gradient clip.
- Labels: `GET READY` above, drill-specific one-liner below.
- Renders **inside the drill box**, `z-50`, over `bg-black/55 backdrop-blur-[2px]`.
- Game state must be fully reset *before* the countdown starts, and the first target spawns
  on `GO` — never during the count.

### 1.7 `components/drill/DrillFooter.js` — social footer

Extract the footer duplicated across 15 drill files into one component.

**Exactly four links, in this order:**

1. Instagram — `https://www.instagram.com/skilldrills.online/?__pwa=1`
2. Facebook — `https://www.facebook.com/profile.php?id=61590093843779`
3. YouTube — `https://youtube.com/@skilldrills.online`
4. X / Twitter — `https://x.com/skilldrillss`

**Remove:** Pinterest (`https://pinterest.com/skilldrills`) — and **only** Pinterest. It
currently renders in all 15 drills. X/Twitter **stays**.

All four URLs already exist in the codebase. Nothing is blocked.

### 1.8 `components/drill/DrillAccordion.js` — expandable sections

One component, **three** instances per drill, below the drill box:

1. **Drill Instructions & Scoring** — `id="rules"`, icon `Brain`. How to play *and* the scoring
   rules. These were originally specced as two sections; "How to Play" is only a few lines and
   reads naturally alongside the rules, so a separate near-empty section isn't worth the click.
2. **About This Drill** — `id="about"`, icon `Info`, blue. 400-500 words of SEO body copy.
3. **FAQ** — `id="faq"`, icon `Lightbulb`, yellow. 8-15 Q&A pairs.

> 🔴 **The FAQ must be its own TOP-LEVEL accordion — never nested inside About.**
> All three completed drills originally shipped it nested, which meant a reader had to open
> About *and then scroll* to reach it. This is the section carrying the `FAQPage` schema and the
> most search traffic; it earns its own entry point.

Behaviour: single-open (`openAccordion` holds one id or `null`), chevron rotates 180°,
`fx-fade-up` on expand, `aria-expanded` correct, keyboard operable.

**Use `components/drill/DrillAccordion.js`. Never hand-roll accordion markup** — 180° Awareness
was left with an inline copy after the component was extracted, which is exactly the drift this
project exists to eliminate.

Behaviour: single-open (`openAccordion` state holds one id or `null`), chevron rotates 180°,
`fx-fade-up` on expand, full keyboard access, `aria-expanded` set correctly.

> **SEO-critical:** the FAQ rendered here **must be the same text** as the `FAQPage` JSON-LD in
> `page.js`. Google penalises schema describing content not visible on the page. See §3.

---

## PHASE 2 — THE UNIVERSAL DRILL SHELL

Every FPS drill page renders this exact structure, top to bottom. No drill deviates.

```
┌─────────────────────────────────────────────────────────┐
│ Breadcrumb:  Home › FPS › <Drill Name>                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│              <H1 — DRILL NAME, CENTERED>                 │  ← centered above the box
│                                                          │
├─────────────────────────────────────────────────────────┤
│  ┌────────┬────────┬────────┬────────┐                  │
│  │ Score  │  Time  │Accuracy│  Best  │                  │  ← EXACTLY 4 stat cards
│  └────────┴────────┴────────┴────────┘                  │
├─────────────────────────────────────────────────────────┤
│ ╔═════════════════════════════════════════════════════╗ │
│ ║ Score                                        Time   ║ │  ← ONLY 3 things in the box
│ ║                                                     ║ │
│ ║                  [ GAME CANVAS ]                    ║ │
│ ║                   black #050508                     ║ │
│ ║                                                     ║ │
│ ║                                          [🔊]       ║ │  ← sound = 3rd thing
│ ╚═════════════════════════════════════════════════════╝ │
├─────────────────────────────────────────────────────────┤
│  ▸ How to Play          ▸ Rules & Scoring                │
│  ▸ About This Drill     ▸ FAQ                            │
├─────────────────────────────────────────────────────────┤
│  Related FPS Drills  (6 cards, uniform)                  │
├─────────────────────────────────────────────────────────┤
│  Footer — IG · FB · YT · X                               │
└─────────────────────────────────────────────────────────┘
```

### 2.1 Drill box

```jsx
className={isFullscreen
  ? 'fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#050508]'
  : 'w-full rounded-2xl border border-white/10 bg-[#050508] shadow-[0_0_40px_rgba(0,0,0,0.9)] aspect-video min-h-[460px] sm:min-h-[500px] max-h-[88vh]'}
```

Background is **`#050508`** — near-black, not pure `#000`. Pure black crushes the target glow
and shadow work; `#050508` keeps depth while reading as black.

### 2.2 Inside the box during play — exactly three elements

| Element | Position | Spec |
|---|---|---|
| Score | `absolute top-4 left-4 z-30` | `text-[10px] uppercase tracking-wider text-white/50` label + `text-2xl sm:text-3xl font-bold tabular-nums` value |
| Time | `absolute top-4 right-4 z-30` | Same scale, right-aligned. Turns `text-red-400` at ≤10 s |
| Sound | `absolute bottom-4 right-4 z-40` | `p-2.5 rounded-full bg-black/60 border border-white/10` |

**Delete from inside the box:** level badges, combo counters, accuracy readouts, lives, XP,
tier chips, fullscreen buttons, sensitivity sliders, any text banner, any toast.
Everything else lives in the 4 stat cards above the box or on the result card.

Score and Time labels are `pointer-events-none`. The sound button must
`e.stopPropagation()` on both `onPointerDown` and `onClick` so toggling it never registers as
a game click.

### 2.3 Notification-free

No toasts, no snackbars, no floating banners, no "Level Up!" text popups, no achievement
cards during play. Feedback is **sound + flash only**. The single permitted on-canvas text is
the `fx-score-popup` floating `+N` at the hit location.

### 2.4 Cursor

- `cursor-none` on the canvas during `playing` — the crosshair is **drawn on the canvas**, never
  a CSS cursor.
- `cursor-crosshair` during `countdown` and on hover before start.
- `cursor-pointer` on every button, everywhere.
- Crosshair is drawn identically in all drills: 2 px stroke, 12 px arms, 4 px centre gap,
  1 px dark outline for contrast against bright targets.

### 2.5 Targets — one visual language

Every drill's primary target uses the same construction:

- **Body:** radial gradient, light centre → saturated rim.
- **Rim:** 2 px stroke at 90% opacity.
- **Pulse:** `drawPulseRing` — expanding+fading ring. Port from the reference app's
  `- Copy - Copy/lib/canvasFx.js` into `lib/canvasFx.js`. Seed per target so simultaneous
  targets don't pulse in lockstep.
- **Hit effect:** identical everywhere — 120 ms expanding ring from the hit point + `fx-score-popup`
  `+N` + `drillAudio.playHit()`.
- **Size:** `clamp(24px, min(w,h) * 0.075, 46px)` scaled by the level curve.
- **Colour:** category accent per drill (see per-drill plans), but **structure is identical**.

Also port `createBackdropCache` and `canvasDpr` from the reference app's `canvasFx.js` — the
current drills redraw static grid backdrops every frame (hundreds of draw calls/frame for a
pixel-identical image), and cap DPR at 2 (phones report 2.6-3.5, and canvas fill cost grows
with the *square* of DPR).

### 2.6 Typography

- **One family: Inter**, already wired via `next/font/google` in `app/layout.js`. Every drill
  uses `font-sans`. No drill declares its own family.
- `font-mono tabular-nums` **only** for live numerics (score, time, accuracy, reaction ms) —
  so digits don't jitter as they change.
- Scale: `text-3xl sm:text-4xl font-black` H1 · `text-xl font-bold` H2 · `text-sm` body ·
  `text-[10px] uppercase tracking-wider` labels.

### 2.7 Start card

Max width `340px`, `rounded-[20px]`, `border-white/10`, `bg-[#0d0d18]`, centred in the box.

1. Icon badge — 44 px, `rounded-[14px]`, drill-accent gradient, soft glow
2. Drill name — `text-[17px] font-bold tracking-tight`
3. One-line positioning statement
4. 3 × "How to Play" rows — icon + one line, `bg-white/[0.02] border-white/5 rounded-[10px]`
5. 3 × mini-stats — **Best · Best Combo · Level** (`Lv.{bestLevel}`)
6. START button — full width, drill-accent gradient, `active:scale-[0.97]`

**No sensitivity slider on the start card.** Move it into the "Rules & Scoring" accordion —
it is a settings control, not part of the entry flow.

### 2.8 Result card

Split layout, matching the reference app's `ResultScreen`:

- **Left 36%:** `NEW BEST` pill (conditional) · grade letter `text-6xl font-black` · grade
  label · final score · "POINTS"
- **Right 64%:** 3 stats (Accuracy · Best Combo · Avg Reaction) · coach advice line ·
  `Play Again` / `Share` / `Back` buttons
- `drillAudio.playSessionEnd()` on mount
- Grade tiers come from `lib/scoringEngine.js` — never hand-rolled per drill

---

## PHASE 3 — SEO

Current baseline is decent: `page.js` already ships `metadata` + Breadcrumb +
SoftwareApplication + FAQPage + HowTo JSON-LD. Required upgrades:

1. **Schema ↔ visible content parity.** The `FAQPage` JSON-LD must match the FAQ accordion text
   word for word. This is the single highest-risk SEO item — mismatched schema gets rich
   results revoked.
2. **Add `VideoGame` schema** alongside `SoftwareApplication` — FPS trainers rank in game-related
   SERPs, and `VideoGame` unlocks `gamePlatform` / `genre` / `playMode`.
3. **Title format:** `<Primary Keyword> — <Secondary> | SkillDrills`, ≤60 chars.
4. **Description:** 150-160 chars, primary keyword in the first 90, ends with a benefit.
5. **Keyword tiers per drill** — 1 primary (highest-intent exact match), 3-4 secondary
   (game-qualified: "CS2 …", "Valorant …"), 8-12 long-tail ("how to …", "best … drill").
6. **H-structure:** one `H1` (drill name, centered above the box) → `H2` per accordion →
   `H3` per FAQ question.
7. **Body copy:** the "About This Drill" accordion carries 300-500 words of genuinely useful
   text — what the skill is, why it matters, how to train it, what good looks like. This is the
   ranking body. It must read like a coach wrote it, not like keyword filler.
8. **Internal linking:** 6 related-drill cards with descriptive anchors (never "click here"),
   plus a contextual in-copy link to the FPS hub.
9. `alternates.canonical` on every page — already present, verify per drill.
10. Register every drill in `app/sitemap.js`.
11. **`opengraph-image.js` per drill — mandatory.** Every drill folder gets one, using Next's
    App Router file convention with `next/og`'s `ImageResponse`. Copy
    `app/drills/fps/180-degree-awareness/opengraph-image.js` and change the title, description,
    stat pills, and `ACCENT` colour.

    **Why it isn't optional:** every drill currently points `og:image` at
    `icons/icon-512x512.png` — a **square** — while declaring
    `twitter:card = summary_large_image`, which requires **1200×630 (1.91:1)**. X silently
    downgrades to a small summary card, Facebook/LinkedIn refuse the large format below 600px
    width, and Discord/WhatsApp render a tiny thumbnail. Every share looks unstyled.

    **When you add the file, DELETE the manual `images` arrays** from both `openGraph` and
    `twitter` in that drill's `page.js`. Next injects `og:image`, `og:image:width`,
    `og:image:height`, and `twitter:image` from the file automatically; leaving the manual array
    puts the wrong-shaped square back in the candidate list.

    **Satori constraints** (the renderer behind `ImageResponse`): flexbox only — **no CSS grid**,
    and every element with more than one child needs an explicit `display: flex`. Font weights
    above ~700 fall back to regular unless a font file is supplied, so don't rely on `900`.

    Verify per drill by reading the built binary:
    `.next/server/app/drills/fps/<drill>/opengraph-image.body` — must be a valid PNG at
    exactly 1200×630.

---

## PHASE 4 — RELATED DRILLS

Uniform card grid below the accordions, 6 cards, `grid-cols-2 md:grid-cols-3`:

- Title `text-sm font-bold`, one-line description `text-xs text-gray-400`
- `border-white/10 bg-white/[0.02] rounded-xl p-4`, hover lifts border + accent
- Selection is **thematic, not random** — pair each drill with the 6 mechanically closest
  drills (specified per drill plan)
- Descriptive anchor text for SEO

---

## ACCEPTANCE CHECKLIST

A drill is done when **all** of these pass:

- [ ] Imports `drillAudio` from `lib/drillAudio.js`; **zero** local audio code
- [ ] Uses only the 7 canonical sound events
- [ ] Wrong click, miss, **and** timeout all fire `playPenalty()` + `fx-flash-red`
- [ ] 3-2-1-GO countdown via shared `DrillCountdown`
- [ ] **Zero** time penalties, time rewards, or negative scoring — timer is a fixed 60 s
- [ ] Difficulty monotonic in-session; resumes at 65% of best level
- [ ] Drill box `#050508`, contains exactly Score + Time + Sound
- [ ] Drill name is an `H1`, centered, above the box
- [ ] Exactly 4 stat cards: Score · Time · Accuracy · Best
- [ ] `cursor-none` during play, canvas-drawn crosshair
- [ ] No toasts / banners / notifications during play
- [ ] 3 accordions via shared `DrillAccordion` (rules · about · **faq as its own section**);
      zero hand-rolled accordion markup; FAQ text matches `FAQPage` schema exactly (verify by
      `diff`, not by count)
- [ ] 6 related-drill cards
- [ ] Footer: exactly IG · FB · YT · X (Pinterest removed)
- [ ] `font-sans` throughout; `tabular-nums` on live numerics
- [ ] Result card uses `lib/scoringEngine.js` grades
- [ ] `page.js` has metadata + Breadcrumb + SoftwareApplication + VideoGame + FAQPage + HowTo

---

## DECISIONS LOG

| # | Question | Decision |
|---|---|---|
| 1 | Social links in the drill footer | **IG · FB · YT · X/Twitter.** Remove Pinterest only. (Telegram was written in error — X/Twitter stays.) |
| 2 | Bronze→Radiant tier system | **Retire completely.** Delete `lib/adaptiveDifficulty.js`. §1.2 is the sole difficulty authority. |
| 3 | Rollout order | **One drill at a time, perfected before moving on.** `180-degree-awareness` first. Antigravity implements → Claude reviews against this spec → gaps corrected → only then does the next drill get a plan. |

**Nothing is blocked. Phase 1 can start immediately.**
