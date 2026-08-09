# 180° AWARENESS PRO — IMPLEMENTATION PLAN

**Drill:** `app/drills/fps/180-degree-awareness/`
**Client:** `AwarenessDrillClient.js` (1,299 lines)
**Read first:** `implementation/fps/_MASTER_SPEC.md` — this plan only covers what is
**drill-specific**. Everything shared is defined there and must not be re-specified here.

---

## VERDICT

**This drill is the strongest in the FPS category and becomes the reference implementation.**
It already satisfies ~80% of the master spec. Sangmesh's instinct to nominate it as the template
was correct.

**Already compliant — do not "fix" these:**

- ✅ `H1` centered above the drill box (lines 766-773)
- ✅ Exactly 4 stat cards: Score · Time · Accuracy · Best (lines 775-799)
- ✅ In-box HUD is exactly Score + Time + Sound (lines 818-848)
- ✅ Drill box `bg-[#050508]`, `aspect-video`, `rounded-2xl`, `border-white/10`
- ✅ `fx-flash` red overlay wired (lines 813-816)
- ✅ `cursor-none` during play, canvas-drawn crosshair (line 870)
- ✅ Full 3-2-1-GO countdown — **the only drill in the category that has one**
- ✅ Expandable accordions — **the only drill that has them**
- ✅ 6 related-drill cards (lines 1166-1171)
- ✅ `font-sans` throughout
- ✅ **No time penalties, no negative scoring** — already correct
- ✅ Difficulty already monotonic: `eRef.level = Math.max(eRef.level, rawLevel)` (line 518)
- ✅ Resume already ~60% of best: `Math.round(saved.bestLevel * 0.6)` (line 406)
- ✅ `page.js` ships metadata + 4 JSON-LD schemas

So the work here is **conformance, not reconstruction**. Nine changes.

---

## CHANGE 1 — Migrate to shared audio ⬛ HIGH

**Delete lines 20-143** — the entire inline `class AudioSynthesizer` and the
`const audioSynth = ...` singleton.

Replace with:

```js
import { drillAudio } from '@/lib/drillAudio';
```

Then remap every call site:

| Current call | Becomes |
|---|---|
| `audioSynth.playPulseHit()` | `drillAudio.playHit()` |
| `audioSynth.playPenalty()` | `drillAudio.playPenalty()` |
| `audioSynth.playHazardBoom()` | `drillAudio.playPenalty()` |
| `audioSynth.playCountdownTick()` | `drillAudio.playCountdownTick()` |
| `audioSynth.playGo()` | `drillAudio.playGo()` |
| `audioSynth.playResultsReveal()` | `drillAudio.playSessionEnd()` |
| `audioSynth.init()` / `.setEnabled()` | `drillAudio.init()` / `.setEnabled()` |

Note `playGo()` currently uses 523.25→784 Hz here but 660→990 Hz in the reference app.
**The shared 660→990 Hz value wins** — that is the point of the shared module.

### ⚠️ ONE DELIBERATE EXCEPTION — `playSpawnStereo`

The master spec deletes `playSpawnStereo` category-wide. **This drill keeps it**, and it is the
only drill permitted to.

**Reason:** in a 180° awareness drill the stereo pan *is the core mechanic*, not decoration.
The target spawns behind the player's field of view; the left/right pan is the only cue telling
them which way to spin. The drill's own coaching copy confirms this design intent — *"Trust your
audio cue and pull the trigger earlier."* Removing it would delete the skill the drill teaches.

**Therefore:** add `playSpatialCue(panValue)` to `lib/drillAudio.js`, documented as a
**mechanic cue, not a feedback sound**. Keep the existing spec (550→700 Hz sine, 0.08 s,
vol 0.06 — quiet on purpose, it must not compete with `playHit`). No other FPS drill may call it.

---

## CHANGE 2 — Use the shared combo multiplier ⬛ HIGH

Lines 509-512 hand-roll a combo ladder that disagrees with `lib/scoringEngine.js`:

| Combo | This drill | `scoringEngine.js` |
|---|---|---|
| 5 | 1.1× | 1.25× |
| 10 | 1.25× | 1.5× |
| 15 | 1.5× | 1.75× |
| 20 | 2.0× | 2.0× |
| 30 | — | 2.5× |
| 50 | — | 3.0× |

Delete the local ladder. Import and use `getComboMultiplier(combo)`. This drill's version caps
at 20 and undervalues every tier below it — a 15-combo is worth 17% less here than in a
cognitive drill, for identical play.

Add `drillAudio.playComboTier()` + `fx-flash-cyan` when a combo crosses 5/10/15/20/30/50.
Currently crossing a tier is silent.

---

## CHANGE 3 — Replace the hand-rolled grade ⬛ HIGH

`calculateGrade()` (lines 166-173) uses **absolute score thresholds** (`score >= 4000`).
This is structurally broken: the drill starts a returning player at 65% of their best level, so
score-per-second varies hugely between sessions. A strong player resuming at level 9 and a
beginner at level 1 are graded on the same absolute scale.

Replace with `getGrade(percentage)` from `lib/scoringEngine.js`, fed a **composite performance
percentage** — not raw accuracy. Define this once in `lib/scoringEngine.js` so every FPS drill
grades identically:

```js
// lib/scoringEngine.js — ADD
export function getFpsPerformancePct({ accuracy, avgReactionMs, level, maxLevel = 15 }) {
  const accPart   = Math.min(100, accuracy);                                  // 0-100
  const speedPart = avgReactionMs > 0
    ? Math.max(0, Math.min(100, 100 - ((avgReactionMs - 150) / 450) * 100))   // 150ms→100, 600ms→0
    : 0;
  const levelPart = ((Math.min(level, maxLevel) - 1) / (maxLevel - 1)) * 100;
  return Math.round(accPart * 0.5 + speedPart * 0.3 + levelPart * 0.2);
}
```

**Weighting rationale:** accuracy is the primary skill (50%); reaction speed is what separates
good from elite (30%); reaching a high difficulty level proves the other two were sustained
under pressure (20%). A player cannot farm an S+ by taking 20 slow, careful shots at level 1.

Keep `getCoachAdvice()` — it is genuinely good, drill-specific, and diagnostic. Leave it alone.

---

## CHANGE 4 — Standardise the resume factor ⬛ MEDIUM

Line 406: `Math.round((saved.bestLevel || 1) * 0.6)` → replace with
`getStartLevel(saved.bestLevel)` from `lib/drillDifficulty.js` (which uses **0.65**).

Also replace the magic `15` on that line with the shared `MAX_LEVEL`.

---

## CHANGE 5 — Fix the `bestLevel` save ⬛ MEDIUM

Line 378: `bestLevel: Math.max(prevSaved.bestLevel, e.level)`

`e.level` is monotonic within a session, so this is *currently* correct — but it is correct by
accident. It reads the live engine level at the moment `endGame()` runs. Make the invariant
explicit by tracking `bestLevelRunRef` alongside, matching the reference app's pattern:

```js
bestLevelRunRef.current = Math.max(bestLevelRunRef.current, eRef.level);
// ...
bestLevel: Math.max(prevSaved.bestLevel, bestLevelRunRef.current),
```

This makes the "difficulty never walks backward" guarantee independent of engine-object lifetime.

---

## CHANGE 6 — Footer ⬛ HIGH

Lines ~1097-1111 (the in-file footer block) currently render **five** links:
YouTube, Facebook, X/Twitter, Instagram, **Pinterest**.

Replace the whole block with `<DrillFooter />` (master spec §1.7): Instagram · Facebook ·
YouTube · X/Twitter.

**Remove Pinterest only.** X/Twitter stays. All four surviving URLs already exist in this file —
lift them verbatim into the shared component.

---

## CHANGE 7 — Move the sensitivity slider ⬛ MEDIUM

Line ~926 puts a sensitivity `<input type="range">` on the start card. Per master spec §2.7 the
start card is an entry flow, not a settings panel.

Move it into the **Rules & Scoring** accordion. Keep the `universalSens` state and behaviour
exactly as-is — this is a relocation, not a rewrite. The start card drops to: icon · name ·
one-liner · 3 how-to rows · 3 mini-stats · START.

---

## CHANGE 8 — Backdrop caching + DPR cap ⬛ MEDIUM

Port `createBackdropCache` and `canvasDpr` from the reference app's `lib/canvasFx.js` into
`lib/canvasFx.js`, then apply here.

The render loop currently redraws the static backdrop every frame. Cache it once per resize and
`drawImage` thereafter. Cap DPR at 2 — canvas fill cost scales with the **square** of DPR, and
phones report 2.6-3.5, so an uncapped DPR-3 device pays 2.25× the fill cost of DPR-2 for a
difference invisible on a fast-moving target.

Also port `drawPulseRing` and use it for the target pulse, so this drill's target reads
identically to every other drill's (master spec §2.5).

---

## CHANGE 9 — SEO upgrades ⬛ MEDIUM

`page.js` is already the strongest in the category. Four additions:

1. **Add `VideoGame` schema** alongside the existing `SoftwareApplication`:
   `gamePlatform: "Web Browser"`, `genre: ["FPS Training", "Aim Trainer"]`,
   `playMode: "SinglePlayer"`, `applicationCategory: "Game"`.

2. **Verify FAQ parity.** `page.js` ships a 5-question `FAQPage` schema. The client renders its
   own FAQ accordion. **These must match word for word.** Audit both lists; if they diverge,
   make the visible accordion the source of truth and regenerate the schema from it. This is the
   highest-risk SEO item on the page.

3. **Keyword tiering.** Current `keywords` array is a flat list of 13. Restructure:
   - **Primary:** `180 aim trainer`
   - **Secondary:** `180 flick aim trainer`, `snap turn aim trainer`, `CS2 180 turn practice`,
     `Valorant 180 flick drill`
   - **Long-tail:** `how to practice 180 flicks`, `how to improve behind you awareness fps`,
     `best 180 turn drill for CS2`, `free browser 180 aim trainer`, `180 degree spin shot training`,
     `flank awareness training fps`, `improve turn speed aim trainer`

4. **Expand "About This Drill"** to 400-500 words covering: what a 180 flick is mechanically,
   why mouse travel distance and snap-deceleration are different skills from short flicks, how
   sensitivity and DPI affect 180 muscle memory, and what a good avg reaction time looks like
   (<420 ms is elite per this drill's own S+ gate). Written as coaching, not keyword filler.

---

## EXECUTION ORDER

| Step | Change | Depends on |
|---|---|---|
| 1 | `lib/drillAudio.js` exists (+ `playSpatialCue`) | Master spec §1.1 |
| 2 | `lib/drillDifficulty.js` exists | Master spec §1.2 |
| 3 | `lib/canvasFx.js` exists | Master spec §2.5 |
| 4 | `getFpsPerformancePct` added to `scoringEngine.js` | — |
| 5 | `components/drill/DrillFooter.js` exists | — |
| 6 | `lib/adaptiveDifficulty.js` deleted, `FPSHubClient.js` cleaned | Master spec §1.3 |
| 7 | Changes 1-5, 7-9 in `AwarenessDrillClient.js` | Steps 1-4 |
| 8 | Change 6 (footer swap) | Step 5 |

**Nothing in this plan is blocked.** Every URL, value, and decision is resolved.

---

## ACCEPTANCE — 180° AWARENESS

Master-spec checklist, **plus**:

- [ ] Zero local audio code; `drillAudio` imported
- [ ] `playSpatialCue` still fires on spawn, panned by target X (this drill only)
- [ ] Combo multipliers come from `getComboMultiplier()`
- [ ] Grade comes from `getGrade(getFpsPerformancePct(...))`
- [ ] `getCoachAdvice()` preserved unchanged
- [ ] Start level from `getStartLevel()` at 0.65
- [ ] Sensitivity slider is in the Rules accordion, not the start card
- [ ] Footer is exactly IG · FB · YT · X (Pinterest gone)
- [ ] `lib/adaptiveDifficulty.js` deleted; no `adaptiveDifficulty` references remain; hub builds
- [ ] FAQ accordion text === `FAQPage` schema text, verified line by line
- [ ] Backdrop cached; DPR capped at 2
- [ ] Regression: countdown, accordions, related drills, coach advice all still work
