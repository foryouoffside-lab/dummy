# 180° AWARENESS — POLISH PASS 2

**Reference source:** `- Copy - Copy/app/drills/cognitive/processing-speed/reaction-time/EliteNeuroSwitchClient.js`
(read-only — do not modify that app). This one drill is the authority for sound and difficulty.

---

## MY MISTAKE — READ THIS FIRST

In `_MASTER_SPEC.md` I specced the sound values from the reference app's shared
`lib/audioSynth.js`. **That was the wrong source.** The reference app's *drills* don't use that
shared library — each carries its own inline `AudioSynthesizer` with **different values**.

So Antigravity implemented exactly what I wrote, and what I wrote was wrong. The sounds are
correct-per-my-spec and wrong-per-your-app. Corrected below against the actual drill.

Also confirmed: `osc.connect(gain)` from Polish Pass 1 is now in place (`lib/drillAudio.js:50`) —
audio is no longer silent. That fix was right.

---

## PART A — CORRECT THE SOUND EFFECTS

### A1. `playGo()` — WRONG, must change

```js
// CURRENT (wrong — my error)
playGo() { this.tone(660, 0.16, 'triangle', 0.16, 990); }

// CORRECT — matches EliteNeuroSwitchClient.js:65
playGo() { this.tone(523.25, 0.18, 'triangle', 0.17, 784); }
```

C5 → G5, 0.18 s, vol 0.17. Note this is also what the **original** 180 drill had before my spec
told Antigravity to change it. Restoring it.

### A2. `playPenalty()` — WRONG, must change (this is the "smooth" one)

```js
// CURRENT (wrong — mid-range triangle, reads as buzzy)
playPenalty() {
  this.tone(392, 0.10, 'triangle', 0.16, null, 0, 12);
  this.tone(293.66, 0.16, 'triangle', 0.16, null, 0.08, 12);
}

// CORRECT — matches EliteNeuroSwitchClient.js:67-89
playPenalty() {
  this.tone(220, 0.08, 'sine', 0.12, null, 0,    10);   // A3
  this.tone(165, 0.08, 'sine', 0.12, null, 0.06, 10);   // E3
}
```

**Why yours is smoother, precisely:** low **sine** at 220/165 Hz has no harmonic content at all,
so nothing in it is sharp. My version used **triangle** at 392/293 Hz — triangle carries odd
harmonics, and at those mid frequencies they sit right in the ear's most sensitive band, which
is what makes it read as a buzz. Also: shorter (0.08 s vs 0.16 s), tighter spacing (60 ms vs
80 ms), quieter (0.12 vs 0.16), and a 10 ms attack.

**This one sound covers wrong-click, miss, AND timeout** — confirmed in the reference, which
aliases `playMiss()` and `playWrongBoom()` straight to `playPenalty()`. There is no separate
harsh "boom" anywhere in your app.

### A3. `playSessionEnd()` — WRONG, must change

The reference builds this from a **`chimeVoice` helper**, not plain tones. Each voice is
**two oscillators detuned ±4 cents through a lowpass filter** — that detuning is what gives your
app's result sound its warmth. A single raw sine cannot reproduce it.

**Add `chimeVoice()` to `lib/drillAudio.js`** (port from `EliteNeuroSwitchClient.js:93-116`):

```js
chimeVoice(freq, startAt, dur, vol, filterFreq = 2600) {
  if (!this.ctx) return;
  const t0 = startAt;
  const filter = this.ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(filterFreq, t0);
  filter.Q.setValueAtTime(0.5, t0);
  const gain = this.ctx.createGain();
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.linearRampToValueAtTime(vol, t0 + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
  filter.connect(gain);
  gain.connect(this.ctx.destination);
  [-4, 4].forEach((cents) => {
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t0);
    osc.detune.setValueAtTime(cents, t0);
    osc.connect(filter);
    osc.start(t0);
    osc.stop(t0 + dur);
  });
}

playSessionEnd() {
  if (!this.enabled) return;
  this.init();
  if (!this.ctx) return;
  try {
    const t0 = this.ctx.currentTime;
    [523.25, 659.25, 783.99].forEach((freq, i) => {
      this.chimeVoice(freq, t0 + i * 0.08, 0.24, 0.13, 3200);
    });
    this.chimeVoice(1046.50, t0 + 0.26, 0.6, 0.16, 4200);
  } catch (e) {}
}
```

⚠️ **`chimeVoice` connects oscillators to a filter, not through `tone()`.** Do not try to
express it via `tone()` — the detuned pair and the lowpass are the whole point.

### A4. Unchanged — already correct

```js
playHit()           { this.tone(880, 0.12, 'sine', 0.16, 1760); }   // ✓ matches
playCountdownTick() { this.tone(440, 0.09, 'sine', 0.12, 440);  }   // ✓ matches
playSpatialCue(pan) { this.tone(550, 0.08, 'sine', 0.06, 700, 0, 0, pan); } // ✓ 180-only
```

### A5. DELETE `playLevelUp()` and `playComboTier()`

Neither exists in your app. Remove both from `lib/drillAudio.js` **and** every call site.

This reverses my Polish Pass 1 Bug 2, which told Antigravity to *add* a level-up sound. Wrong
call — the reference drill has no such event.

**The canonical set drops from seven events to five:**

| # | Event | Fires on |
|---|---|---|
| 1 | `playHit()` | Correct hit |
| 2 | `playPenalty()` | Wrong click · miss · timeout |
| 3 | `playCountdownTick()` | 3, 2, 1 |
| 4 | `playGo()` | GO |
| 5 | `playSessionEnd()` | Result card |
| — | `playSpatialCue()` | Target spawn — **180 drill only** |

---

## PART B — RED FLASH ONLY

Remove **gold** and **cyan** flashes entirely. Red is the only flash in the drill.

**Delete these call sites** in `AwarenessDrillClient.js`:

```js
// ~line 386 — combo tier
if ([5, 10, 15, 20, 30, 50].includes(eRef.combo)) {
  drillAudio.playComboTier();   // ← DELETE
  triggerFlash('cyan');         // ← DELETE
}

// level-up gold flash from Polish Pass 1 — DELETE if implemented, do not add if not
```

**Simplify the render map** (~line 707) to red-only:

```jsx
{flashes.map((f) => (
  <div key={f.id} className="fx-flash fx-flash-red" />
))}
```

`triggerFlash()` keeps its `variant` parameter but every caller passes red — or drop the
parameter entirely, which is cleaner.

**Keep `fx-flash-gold` / `fx-flash-cyan` in `globals.css`.** They're shared utilities used
elsewhere; this drill just stops calling them.

**Why this is the right call:** a level-up chime plus a gold screen flash is a *notification* —
exactly what you said the drills must not have. Difficulty rising should be **felt** through
targets getting smaller and faster, not announced. Red flash then means one unambiguous thing:
*you made a mistake.*

---

## PART C — AGGRESSIVE DIFFICULTY SCALING

### The problem, measured

| | Points per level | Approx. hits per level |
|---|---|---|
| **Your reference drill** | **40** | **~2-4** |
| **Our 180 drill** | **1000** | **~5-10** |

`EliteNeuroSwitchClient.js:330`:
```js
const newLevel = Math.min(MAX_LEVEL, Math.floor(scoreRef.current / 40) + 1);
```

Ours:
```js
const rawLevel = Math.floor(eRef.score / 1000) + 1;
```

Raw ratio is 25×. Adjusting for scoring scale (reference `scoreAction` pays ~9-60 pts/hit;
ours pays a flat `100 × comboMultiplier` = 100-300 pts/hit), the **real** gap is roughly
**3-4× too slow**. That is the boredom you're feeling.

Also confirmed from the reference: `Math.round((bestLevel || 1) * 0.65)` at line 985 — **our
0.65 resume factor is already correct.** No change there.

### The fix

```js
const POINTS_PER_LEVEL = 250;   // was 1000
```

Use it in the hit handler and anywhere `getNextLevel()` is called.

**Resulting curve** (45 s run, ~1.5 targets/sec, avg ~150 pts/hit with combo):

| Elapsed | Score | Level |
|---|---|---|
| 3 s | ~600 | 3 |
| 8 s | ~1,800 | 8 |
| 15 s | ~3,750 | **15 (max)** |
| 15-45 s | — | sustained max |

You climb hard for the first third, then survive at maximum difficulty for the remaining two
thirds. That is the shape your reference drill has, and it's why it doesn't get boring.

**`POINTS_PER_LEVEL` is the single tuning knob.** Lower = more aggressive. If 250 still feels
slow after playtesting, try 200. Do not change anything else to adjust pace.

### Keep the Polish Pass 1 curve recalibration

Part C only fixes how *fast* you climb. Polish Pass 1 §Bug 4 fixes what climbing *does* — right
now every difficulty parameter saturates by L11, so levels 12-15 are identical to 11. **Both
changes are required.** Faster climbing into a dead ladder just reaches the plateau sooner.

---

## EXECUTION ORDER

| # | Change | File |
|---|---|---|
| 1 | `playGo` → 523.25 → 784, 0.18 s, vol 0.17 | `lib/drillAudio.js` |
| 2 | `playPenalty` → 220/165 sine, vol 0.12, 0.08 s, 60 ms apart, 10 ms attack | `lib/drillAudio.js` |
| 3 | Add `chimeVoice()`; rebuild `playSessionEnd()` on it | `lib/drillAudio.js` |
| 4 | Delete `playLevelUp()` + `playComboTier()` | `lib/drillAudio.js` |
| 5 | Delete combo-tier + level-up call sites and cyan/gold flashes | `AwarenessDrillClient.js` |
| 6 | Flash render map → red only | `AwarenessDrillClient.js` |
| 7 | `POINTS_PER_LEVEL = 250` | `AwarenessDrillClient.js` |
| 8 | Polish Pass 1 §Bug 4 curve recalibration (if not yet done) | `AwarenessDrillClient.js` |

---

## ACCEPTANCE — POLISH PASS 2

- [ ] `playGo` is C5→G5 (523.25→784), 0.18 s, vol 0.17
- [ ] `playPenalty` is 220→165 Hz **sine**, vol 0.12 — soft, low, no buzz
- [ ] Wrong click, miss, and timeout all fire the **same** `playPenalty()`
- [ ] `playSessionEnd` uses `chimeVoice` with ±4-cent detuned pairs through a lowpass
- [ ] `playLevelUp` and `playComboTier` **do not exist** anywhere in the codebase
- [ ] **Red is the only flash colour** the drill triggers
- [ ] No sound or flash marks a level change — difficulty change is felt, not announced
- [ ] `POINTS_PER_LEVEL = 250`; L15 reachable within ~15 s of strong play
- [ ] Difficulty measurably different at L11 vs L15 (Pass 1 §Bug 4 landed)
- [ ] Side-by-side A/B against `EliteNeuroSwitchClient.js` — hit, penalty, tick, go, and result
      sounds are **indistinguishable**
