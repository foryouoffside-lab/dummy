# PRO FLICK TRAINER (flick-shot-training) — IMPLEMENTATION PLAN

**Drill:** `app/drills/fps/flick-shot-training/`
**Client:** `ProFlickClient.js` (1,191 lines) · **Page:** `page.js` (185 lines)
**Read first:** `implementation/fps/_MASTER_SPEC.md`
**Reference implementations — all four already conform, copy their patterns:**
`app/drills/fps/180-degree-awareness/`, `app/drills/fps/instant-response/`,
`app/drills/fps/target-acquisition/`, `app/drills/fps/recoil-control/`

**Display name:** keep **"Pro Flick Trainer"** — both `180-degree-awareness` and
`instant-response` already link to this drill under that exact title in their Related
Drills sections. Do not invent a new name; it would break those existing links' anchor text.

**Accent colour: blue `#3b82f6`.** Every other completed drill owns a colour (180 = emerald,
recoil-control = red, instant-response = cyan). This file already leans blue in its own UI
(start button, sensitivity slider accent) — formalize it as this drill's identity instead of
the inherited green/cyan glow copied from an older shared template.

---

## 0. READ THIS BEFORE WRITING ANY CODE

- **All shared modules already exist. Import them, write no new versions.**
  `lib/drillAudio.js` · `lib/drillDifficulty.js` · `lib/canvasFx.js` · `lib/scoringEngine.js` ·
  `components/drill/DrillFooter.js` · `components/drill/DrillCountdown.js` ·
  `components/drill/DrillAccordion.js`
- **Do not open the reference app** (`- Copy - Copy`). Every correct sound value is already in
  `lib/drillAudio.js`.
- **Five sound events only.** No combo pitch-bending, no level-up sound.
- **Red is the only flash colour.**
- **Difficulty must be aggressive AND keep scaling to L15** — no clamps that bite early.
- This drill is the most out-of-date file in the category — it predates even the old
  single-source-of-truth pattern the other four drills started from. Expect a larger diff than
  usual; the checklist below is longer because there are genuinely more defects, not because the
  bar moved.

---

## 1. WHAT THIS DRILL IS

A single flat target spawns at a random point inside the play area (no drift, no edge bias). The
player flicks their crosshair to it and clicks. Miss, click on nothing, or let it expire — the
consequence used to be a time penalty; a hit used to be a time *reward*.

The trained skill is **macro flicking** — a fast, ballistic snap from an arbitrary rest position
to an arbitrary target position, then stopping on it (not overshooting). This is the closest
mechanical sibling to `180-degree-awareness` in the whole category, minus the forced look-away
and the audio spatial cue — it is pure point-to-point flick speed and stopping precision.

**Preserve the spawn-anywhere-in-bounds, single-flat-target, click-to-hit core loop.** Everything
below changes how it sounds, scales, scores, looks, and is described in markup — never what the
moment-to-moment gameplay loop is.

---

## 2. AUDIT — 24 DEFECTS

| # | Defect | Location |
|---|---|---|
| 1 | Inline `class AudioSynthesizer` — 2 non-canonical sounds, `playSuccess` **pitch-bends with combo** | L19-68 |
| 2 | **`+1s` time reward** on every hit | L351 |
| 3 | **`-1s` time penalty** — three separate sites (idle click, off-target click, timeout) | L331, L370, L472 |
| 4 | **Duplicate, conflicting JSON-LD** — see §3, its own section | L598-663 |
| 5 | 7-branch score-threshold difficulty ladder; caps at **level 7**, no `getDifficultyProgress` | L166-187 |
| 6 | **Absolute-threshold rank system** (`calculateRank`) — unfair across resume levels | L76-84 |
| 7 | Local `getComboMultiplier` (5/10/20/30 → 1.2/1.5/2.0/3.0) duplicates and diverges from `lib/scoringEngine.js`'s canonical curve; score has **no level multiplier** | L189-195 |
| 8 | **End-of-session accuracy bonus** (+50 to +500) stacked onto the score outside the standard grading model | L211-218 |
| 9 | **No 3-2-1 countdown** — game starts on click, pointer lock requested via a flat 150ms `setTimeout` | L265-298 |
| 10 | Flash is a **canvas `fillRect` overlay**, not `fx-flash-red` | L499-503 |
| 11 | Canvas background `#05060b` — spec is `#050508` | L496 |
| 12 | **No DPR cap, no backdrop cache** — `cvs.width = width` raw; grid redrawn every frame | L416-417, L505-509 |
| 13 | **Fullscreen not restored on resume** — pause overlay only re-requests pointer lock | L766-780 |
| 14 | **5 stat cards** (Score/Level/Combo/Time/Sens) — spec is exactly 4 (Score/Time/Accuracy/Best); **no live Accuracy or Best tracked in the row at all** | L702-715 |
| 15 | In-box HUD shows **level badge, combo-multiplier badge, and a manual fullscreen toggle button** — all explicitly banned inside the box | L729-763 |
| 16 | Page header is a left-aligned icon+title+subtitle+button row, not the standard Breadcrumb + centered H1 shell | L667-700 |
| 17 | H1-equivalent reads `Flick Aim Trainer – Free FPS Aim Training` — long, left-aligned | L685 |
| 18 | `isMobile` gate uses **UA-sniffing + `width < 768`** — blocks a legitimate desktop user who has simply resized their browser window, unlike the standard `hasFinePointer` check | L138-147 |
| 19 | **No instruction/about/FAQ accordions** — one static (non-collapsible) rules card, one static About article with **FAQ nested inside it**, questions carry baked-in `"1. "`, `"2. "` numbering | L931-1026 |
| 20 | **Only 4 related-drill cards** (spec: 6), one links **outside the FPS category** to `/drills/motor/hand-eye-coordination/aim-trainer` | L1036-1042 |
| 21 | **Full duplicate site footer** inline (Motor/Memory/Cognitive sitemap columns) plus **Pinterest** — not `<DrillFooter />` | L1046-1116 |
| 22 | **Storage is loose keys** (`flickAim_bestScore`, `flickAim_sens`) — no `bestLevel`/`bestCombo`/`totalSessions`, so adaptive resume (§5) cannot work | L150-156, L229-236 |
| 23 | Non-standard **progress bar spanning the top of the box** — a fourth in-box element beyond the permitted Score/Time/Sound | L723-727 |
| 24 | `opengraph-image.js` missing; `page.js` manual `images` arrays point at a square `icon-512x512.png` | `page.js` L38-45, L51 |

---

## 3. THE DUPLICATE SCHEMA PROBLEM — READ CAREFULLY, FIX FIRST

This is the worst defect in the category so far, worse than any single scoring bug, because it is
actively confusing to search engines **right now**, not just under-optimized.

`page.js` (server component) already renders four schemas: `BreadcrumbList`,
`SoftwareApplication`, `FAQPage` (with only **5** questions), `HowTo`. That is incomplete but at
least coherent.

`ProFlickClient.js` (client component) **also** renders its own, completely separate `schemaData`
object (L598-655) via `next/head` (L659-663) — `next/head` is a Pages Router API; it has no
place in an App Router client component and does not dedupe against server-rendered `<head>`
content. This second block contains:

- A **second** `BreadcrumbList` with different item text than the server one.
- A **second, differently-typed** application schema (`WebApplication`, not
  `SoftwareApplication` — plus the server's own separate `SoftwareApplication` right next to it).
- A **second** `HowTo` with different steps than the server one.
- A **second** `FAQPage` with **16** questions — **different questions, different wording** than
  the server's 5-question `FAQPage`.
- A **second, duplicate `<title>` and `<meta name="description">`** — App Router already renders
  these from `page.js`'s `metadata` export; this client-side pair can produce two title tags in
  the same document.

A page shipping two different `FAQPage` schemas with non-overlapping question sets, two
`BreadcrumbList`s, and two conflicting application schemas is precisely the kind of duplicate/
inconsistent structured data Google's documentation calls out as a rich-result disqualifier.

**Fix:**

1. Delete the entire `<Head>...</Head>` block and the `schemaData` object from
   `ProFlickClient.js`. Delete the `import Head from 'next/head'` line. The client renders
   **zero** metadata or schema — that is `page.js`'s job exclusively, exactly like the other four
   drills.
2. Rewrite `page.js` to the standard five-schema set: `BreadcrumbList` · `SoftwareApplication` ·
   **`VideoGame`** (currently missing entirely) · `FAQPage` · `HowTo`. See §9.

---

## 4. AUDIO

**Delete L19-68** (the inline class and its singleton) and L70 (`audioSynth` instance).

```js
import { drillAudio } from '../../../../lib/drillAudio';
```

| Current | Becomes | Notes |
|---|---|---|
| `audioSynth.playSuccess(combo)` (L360) — pitch rises with combo | `drillAudio.playHit()` | **Delete the combo pitch-bend.** §1.1 of the master spec: sound values are final, never retuned per drill or per combo state |
| `audioSynth.playFail()` (L336, L375, L477) | `drillAudio.playPenalty()` | Idle click, off-target click, and timeout all become the same one sound |
| `audioSynth.init()` / `.setEnabled()` | `drillAudio.init()` / `.setEnabled()` | — |

Add `drillAudio.playCountdownTick()` / `.playGo()` in the new countdown sequence (§8.4) and
`drillAudio.playSessionEnd()` in `endGame`.

---

## 5. DIFFICULTY — 7-BRANCH LADDER (CAPS AT L7) → 15 CONTINUOUS

**Delete L166-187** (`getLevelConfig(score)` and its six `if`/`else if` branches).

```js
import { MAX_LEVEL, getStartLevel, getDifficultyProgress } from '../../../../lib/drillDifficulty';

const POINTS_PER_LEVEL = 250; // same order as 180 — nearly identical mechanic, tune from playtest

const getLevelConfig = (level) => {
  const p = getDifficultyProgress(level); // 0 -> 1 across L1..L15
  return {
    targetRadius:  32   - p * 16,   // 32 -> 16 px
    ttl:           1300 - p * 850,  // 1300 -> 450 ms
    spawnDelayMin: 500  - p * 350,  // 500 -> 150 ms
    spawnDelayMax: 700  - p * 480,  // 700 -> 220 ms
    hitPad:        12   - p * 7,    // 12 -> 5 px
  };
};
```

Every value driven by `getDifficultyProgress`, reaching its extreme **exactly at L15**, no clamps
biting earlier. `hitPad` must scale with radius — a flat pad on an 16px target is nearly half its
size and would erase the shrink entirely at the top end.

```js
// monotonic — never regresses
const rawLevel = Math.floor(eRef.score / POINTS_PER_LEVEL) + 1;
eRef.level = Math.min(MAX_LEVEL, Math.max(eRef.level, rawLevel));
bestLevelRunRef.current = Math.max(bestLevelRunRef.current, eRef.level);

// session start — 65% of personal best
const startLevel = getStartLevel(saved.bestLevel);
```

`spawnTarget`'s existing edge padding (`Math.max(config.radius + 10, 50)`, L243) stays — just
reads the new `config.radius`.

---

## 6. SCORING

### 6.1 Delete the time reward and all three penalties

```js
eRef.timeLeft += 1;                              // L351 — DELETE (time reward)
eRef.timeLeft = Math.max(0, eRef.timeLeft - 1);  // L331, L370, L472 — DELETE (×3, time penalty)
```

Replacement for a miss / idle-click / timeout — identical in all three cases:

1. `combo = 0`
2. `drillAudio.playPenalty()`
3. `triggerFlash()` (red, via `fx-flash-red` — see §7.1)
4. **Score unchanged. Timer unchanged.**

### 6.2 New score formula

Delete the local `getComboMultiplier` (L189-195) — it diverges from the shared curve and would
give this drill a different combo economy than every sibling drill.

```js
import { getComboMultiplier } from '../../../../lib/scoringEngine';

const levelMult = 1 + getDifficultyProgress(eRef.level) * 0.5; // 1.0 -> 1.5
eRef.score += Math.round(100 * getComboMultiplier(eRef.combo) * levelMult); // was flat +10
```

Base raised from `10` to `100` deliberately, matching 180 / target-acquisition / instant-response
so an elite run lands in the same ~15,000-18,000 band and scores are comparable across the
category instead of this drill sitting two orders of magnitude below its siblings.

Read `levelMult` **before** the level update, so a hit is paid at the difficulty it was made at.

### 6.3 Delete the end-of-session accuracy bonus

**Delete L211-218** (the `accuracyBonus` ladder) and the `+{accuracyBonus} Acc Bonus` line on the
result card (L874). No other completed drill stacks a bonus on top of the raw score outside the
combo/level multipliers — keeping this one would make Pro Flick Trainer's number mean something
structurally different from every sibling drill's, and it duplicates what the grade curve
already rewards. `getSuggestion`'s closing line ("secure the end-of-session accuracy bonus
points", L91) needs rewording once this is gone — e.g. *"Focus on landing your first flick clean
rather than trading speed for a miss."*

### 6.4 Delete the rank system

**Delete L76-84** (`calculateRank`). Same reasoning as recoil-control: a player resuming at L10
faces 16px targets and a 450ms window, so an absolute score gate is structurally unfair against a
beginner at L1.

```js
import { getFpsScoreGrade } from '../../../../lib/scoringEngine';

const ELITE_SCORE = 17000; // 100% mark — same band as 180 (17000) and recoil-control (15000)
const rating = getFpsScoreGrade(e.score, ELITE_SCORE);
```

`getSuggestion()` stays as the coaching-advice function (diagnostics, not grading) — keep it,
just drop the accuracy-bonus reference per §6.3.

### 6.5 Storage — replace loose keys

```js
const STORAGE_KEY = 'skilldrills_fps_flick_shot_v2';
// { bestScore, bestCombo, bestLevel, totalSessions }
```

Keep `flickAim_sens` as its own key — sensitivity is a device preference, not progress, same
precedent as `recoil_sens` in recoil-control. Delete `flickAim_bestScore` in favour of the object.

---

## 7. VISUAL FEEDBACK

### 7.1 Flash

Delete `e.flash` state (engine object + L133, L285), the `fillRect` overlay (L499-503), and every
`eRef.flash = {...}` assignment (L334, L373, L475).

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

### 7.2 Canvas background and performance

- `#05060b` → **`#050508`** (L496).
- Add `getCanvasDpr()` + `createBackdropCache()` from `lib/canvasFx.js`. The static grid (L505-509,
  currently full of `beginPath`/`stroke` calls every single frame) moves into the cached backdrop
  draw function, matching the pattern in all four completed drills. This requires tracking
  `logicalWidth`/`logicalHeight` on the engine object and calling `ctx.scale(dpr, dpr)` once per
  frame (the resize observer currently sets `cvs.width = width` with no DPR multiplication at
  all — on a 2x-DPR screen this renders at half resolution).
- Update the crosshair-clamp and target-spawn bounds (currently `cvs.width`/`cvs.height`, device
  pixels) to use the tracked logical width/height instead, same as `180-degree-awareness`.

### 7.3 Targets

The existing glow-shell target (dark `#050508` core lit by `shadowBlur`, small bright dot core,
contracting lifetime ring — L511-528) is **already the correct 180-style construction**. Keep the
technique. Only retint it to this drill's blue identity:

- Base target colour: `#3b82f6` (was `#00ff88`)
- Combo ≥ 10 tier colour: `#a78bfa` (was `#38bdf8`) — a cooler violet shift at high combo, same
  role 180's cyan shift plays
- Hit explosion colour: `#3b82f6` (was `#00ff88`); miss explosion stays `#ef4444`
- Crosshair active colour: `pointerLocked ? '#3b82f6' : '#eab308'` (was `'#00ff88' : '#eab308'`)
- Hit hitbox: `dist <= t.radius + config.hitPad` (was the hardcoded `+ 12`, L342)

No `shadowBlur` removal needed here — unlike recoil-control's flat-fill targets, this drill's
`shadowBlur` usage already reads as an intentional glow, not a smear, and matches 180's own
approach verbatim. Do not "fix" what already matches the reference.

---

## 8. LAYOUT

### 8.1 Page shell

Replace the entire header block (L667-700: icon badge + title + subtitle + sound/fullscreen
buttons) with the standard Breadcrumb + centered H1, matching `_MASTER_SPEC.md` §2 and copying
`recoil-control`'s shell structure exactly:

- Breadcrumb: `Home › FPS › Pro Flick Trainer`
- **H1 centered above the box**, reads `Pro Flick Trainer` (was the long
  `Flick Aim Trainer – Free FPS Aim Training`)
- **Exactly 4 stat cards:** Score · Time · Accuracy · Best. Delete Level, Combo, and Sens cards
  (L704-713); add live `accuracy` and `bestScore` tracking to match (accuracy must update during
  play the same way `finalAccuracy` is computed at end-game — `successfulHits / totalActions`).

### 8.2 In-box HUD

Delete the level badge, combo-multiplier badge, and the manual fullscreen toggle button
(L731-763) — all three are explicitly banned inside the box. Replace with the standard three
elements only:

- Score `top-4 left-4` · Time `top-4 right-4` (red at ≤10s) · Sound `bottom-4 right-4`
- Delete the progress bar (L723-727) entirely — it is a fourth in-box element the spec doesn't
  permit; Time already carries this information numerically.

Fullscreen becomes fully automatic (request on start, restore on resume — §8.5). No manual toggle
button anywhere, matching every other completed drill.

### 8.3 Start card

Rebuild onto the standard 340px start-card template (icon badge → name → one-liner → rule rows →
sensitivity slider → best/combo/level mini-stats → start button):

- Add the 44px icon badge (currently missing) — `Crosshair` icon, blue gradient
- Keep the sensitivity slider — **this drill genuinely needs it** (targets spawn anywhere in
  bounds; sensitivity directly determines flick distance-to-degrees mapping, unlike
  `instant-response`'s stationary target). It is already correctly placed on the start card
  (L818-832) — keep the placement, just match the shared visual treatment (label/value layout)
  used in the other drills' sensitivity blocks.
- Rewrite the rule rows: `Objective / Flick & Click`, `Speed` or similar — delete `"+10 PTS & +1s
  Time"` and `"-1s Time Penalty"` copy (L805-810), replace with the standard combo/level framing
  used by the other drills (e.g. `Combo` row showing the multiplier ladder, `Failure Rule` row
  reading `Miss / Timeout` → `Resets Combo` / `No time or point loss`)
- Add the Best Score / Best Combo / Best Level mini-stats row (currently absent entirely)
- Replace the `isMobile` UA/width gate (L138-147) with the standard `hasFinePointer` +
  `isTouchOnlyDevice` check used in all four completed drills, and the standard blocking copy
  (`AlertCircle` + "Mouse Required for Pointer Lock") instead of `MonitorX` + "Desktop Only" — the
  current check would incorrectly block a real desktop mouse user who has simply narrowed their
  browser window below 768px.

### 8.4 Countdown

No countdown exists at all today. Add the shared sequence exactly as in the other four drills:

```jsx
<DrillCountdown value={countdownValue} accent="#3b82f6" subtitle="First target at GO" />
```

3 → 2 → 1 → GO at 700ms/step, `playCountdownTick()` per digit, `playGo()` on GO, first target
spawns on GO — never during the count. Game state must be fully reset before the countdown
starts (mirror the `enterDrill` pattern from `180-degree-awareness`; consider renaming
`startGame` → `enterDrill` for consistency with the other four files, non-blocking).

### 8.5 Fullscreen / pointer-lock resume

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

Wire this into **both** the initial start flow and the pause-overlay click handler (currently
L769-772 only re-requests pointer lock — fullscreen is never restored, so ESC mid-session
permanently drops the player out of fullscreen even after they "resume"). Fullscreen first, then
pointer lock — order is not optional; the fullscreen transition resizes the canvas and silently
discards a lock acquired before it.

### 8.6 Accordions

Replace the static "Progression & Scoring Rules" card and the static "About" article (with FAQ
nested inside, carrying baked-in `"1. "`/`"2. "` numbering) with three `DrillAccordion` instances:

1. `id="rules"` — Drill Instructions & Scoring
2. `id="about"` — About Pro Flick Trainer (keep the existing "What Is Flick Aim" copy and the
   3-card who/benefits/focus grid, L963-996 — it's good copy, just needs to live inside
   `DrillAccordion` instead of a static `<article>`)
3. `id="faq"` — **its own top-level accordion**, never nested inside About. Strip the `"1. "`
   through `"16. "` numbering prefixes from every question (L1006-1021) — the numbers are baked
   into the question text itself right now, which is wrong both for the accordion display and
   for the schema (a screen reader or Google snippet should never read "one period what is flick
   aim question mark").

### 8.7 Related drills → 6, all in-category

Delete the current 4 (one of which, `/drills/motor/hand-eye-coordination/aim-trainer`, is outside
the FPS category and not a mechanically close match). Replace with 6 thematically closest FPS
siblings:

```jsx
<RelatedCard href="/drills/fps/180-degree-awareness" title="180° Awareness Pro" desc="Macro flicks under a forced 180-degree turn and audio cue." />
<RelatedCard href="/drills/fps/target-acquisition" title="Target Acquisition Pro" desc="Visual discrimination and click timing under pressure." />
<RelatedCard href="/drills/fps/recoil-control" title="Recoil Control Pro" desc="Sustained motor compensation against a moving target." />
<RelatedCard href="/drills/fps/micro-correction-precision" title="Micro Flicks" desc="Tight-angle crosshair corrections after the initial flick." />
<RelatedCard href="/drills/fps/target-switching-swarm" title="Target Switching Swarm" desc="Rapid multi-target switching under time pressure." />
<RelatedCard href="/drills/fps/strafe-tracking" title="Strafe Tracking" desc="Smooth pursuit against erratic horizontal movement." />
```

### 8.8 Footer

Delete the entire inline footer (L1046-1116 — full sitemap columns plus Pinterest).
`<DrillFooter />` only.

---

## 9. SEO

### 9.1 Kill the duplicate schema — see §3

Non-negotiable, do this before anything else in this section.

### 9.2 Rewrite `page.js` to the standard five schemas

`BreadcrumbList` and `SoftwareApplication` already exist and are fine — keep them. Add
`VideoGame` (currently missing):

```js
const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Pro Flick Trainer",
  "url": "https://skilldrills.online/drills/fps/flick-shot-training",
  "gamePlatform": "Web Browser",
  "genre": ["FPS Training", "Aim Trainer"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser"
};
```

Regenerate `FAQPage` from the de-numbered, de-duplicated visible accordion list (§8.6) — pick one
canonical set of ~15 questions (the client's richer 16-question list is the better source
content; the server's current 5-question list is a subset). Verify with a real diff:

```bash
grep -oP '(?<="name": ")[^"]*\?' page.js | sort > /tmp/a
grep -oP '(?<=FAQItem q=")[^"]*\?' ProFlickClient.js | sort > /tmp/b
diff /tmp/a /tmp/b    # must be empty
```

`HowTo` already exists and is accurate to the new flow (Reset to Center / Spot the Target / Flick
and Click) — keep it, no changes needed.

### 9.3 `opengraph-image.js` — mandatory

Copy `app/drills/fps/180-degree-awareness/opengraph-image.js`. Change:

- `ACCENT` → `'#3b82f6'`
- Title → `Pro Flick Trainer`
- Description → *"Snap your crosshair to targets anywhere on screen. Train ballistic flick speed and stopping precision."*
- Pills stay: `45-SECOND DRILL`, `15 DIFFICULTY LEVELS`, `RAW MOUSE INPUT`, `FREE — NO SIGN-UP`

**Then delete the manual `images` arrays from both `openGraph` and `twitter`** in `page.js`
(L38-45, L51) — they point at `icon-512x512.png`, a square, while `twitter.card` is
`summary_large_image` (needs 1200×630).

### 9.4 Duration note

`_MASTER_SPEC.md` §1.4's literal text still says "every drill runs a fixed, uninterruptible 60s,"
but all four completed drills actually ship 45s (180's decisions log: the last 15s of a 60s
session measured fatigue, not skill — the spec text is stale, not the practice). Follow the
established 45s precedent for category consistency, not the outdated line in the doc.

### 9.5 Keywords and copy

Existing keyword list in `page.js` (L6-23) is already solid — keep it, no changes needed. Existing
title (52 chars) and description are already within format and length; no changes needed there
either. This drill's copy problems are entirely in the client, not the metadata.

---

## 10. EXECUTION ORDER

| # | Step | Depends on |
|---|---|---|
| 1 | Delete client-side `<Head>`/`schemaData`/`next/head` import entirely (§3) | — |
| 2 | Rewrite `page.js`: add `VideoGame`, regenerate `FAQPage` from de-numbered visible list, delete manual `images` arrays | 1, 8.6 |
| 3 | Delete inline audio class; import `drillAudio`; remap 2 sites; delete combo pitch-bend | — |
| 4 | Storage → `skilldrills_fps_flick_shot_v2` object with `bestLevel`/`bestCombo`; keep `flickAim_sens` | — |
| 5 | New `getLevelConfig` + `POINTS_PER_LEVEL` + monotonic level + `getStartLevel` | 4 |
| 6 | New score formula (shared `getComboMultiplier` + level mult); delete `+1s`/`-1s`×3; delete accuracy bonus; delete `calculateRank`; wire `getFpsScoreGrade(score, 17000)` | 5 |
| 7 | Replace canvas flash with `fx-flash-red`; canvas bg → `#050508`; DPR cap + backdrop cache; retint targets/crosshair/explosions to blue | — |
| 8 | Layout: Breadcrumb + centered H1, 4 stat cards, in-box HUD stripped to Score/Time/Sound, delete progress bar, rebuilt start card (icon badge, rule rows, sens slider kept, mini-stats added, `isTouchOnlyDevice` gate) | — |
| 9 | Countdown wired in; `resumeDrill()` fullscreen-then-pointer-lock, called from both start and pause overlay | — |
| 10 | 3 accordions via `DrillAccordion`; FAQ split to top-level, numbering stripped | — |
| 11 | 6 related-drill cards, all in-category; `<DrillFooter />` replaces inline footer | — |
| 12 | 45s fixed duration confirmed | — |

---

## 11. ACCEPTANCE CHECKLIST

**Schema (fix first)**
- [ ] Zero client-rendered metadata/schema; no `next/head` import anywhere in `ProFlickClient.js`
- [ ] `page.js` is the sole source of `<title>`, meta description, and all JSON-LD
- [ ] Exactly one `BreadcrumbList`, one `SoftwareApplication`, one `VideoGame`, one `FAQPage`, one `HowTo` in the rendered page

**Audio**
- [ ] Zero local audio code; `drillAudio` imported
- [ ] 5 canonical events only; no combo-based pitch bending
- [ ] Idle click, off-target click, and timeout all fire `playPenalty()`
- [ ] `playSessionEnd()` on the result card

**Difficulty & scoring**
- [ ] 15 levels via `getDifficultyProgress`; no clamps before L15
- [ ] `hitPad` scales with radius; never exceeds target radius
- [ ] Level monotonic; resumes at 65% of best; `bestLevel` actually persists
- [ ] Score uses shared `getComboMultiplier` + level multiplier; local duplicate deleted
- [ ] **Zero time penalties, zero time reward, zero end-of-session bonus stacking**; fixed 45s
- [ ] Grade from `getFpsScoreGrade(score, 17000)`; `calculateRank` deleted

**Visual**
- [ ] `fx-flash-red` overlay; canvas `fillRect` flash deleted; canvas always `#050508`
- [ ] DPR capped at 2; backdrop cache in place; static grid no longer redrawn every frame
- [ ] Targets/crosshair/explosions retinted to `#3b82f6` identity; glow-shell construction preserved unchanged

**Layout**
- [ ] H1 centered, reads "Pro Flick Trainer"; standard Breadcrumb above it
- [ ] Exactly 4 stat cards: Score · Time · Accuracy · Best; live accuracy tracked during play
- [ ] In-box: Score, Time, Sound only — no level badge, no combo badge, no fullscreen button, no progress bar
- [ ] Start card: icon badge, rule rows (no stale +1s/-1s copy), sensitivity slider kept, Best/Combo/Level mini-stats present
- [ ] `isTouchOnlyDevice` (`hasFinePointer`) gate replaces the UA/width `isMobile` check
- [ ] Countdown 3-2-1-GO wired in; first target spawns on GO
- [ ] `resumeDrill()` restores fullscreen **then** pointer lock, called from start and from pause overlay
- [ ] 3 accordions via shared `DrillAccordion`; FAQ is its own top-level section, numbering prefixes removed
- [ ] 6 related-drill cards, all within `/drills/fps/`
- [ ] `<DrillFooter />` only — inline sitemap footer and Pinterest deleted

**Build**
- [ ] `npx next build` exits 0, no errors or warnings
- [ ] `diff` of FAQ schema vs visible FAQ text is empty
- [ ] `opengraph-image.js` builds to a valid PNG at exactly 1200×630
      (`.next/server/app/drills/fps/flick-shot-training/opengraph-image.body`)
- [ ] Manual `images` arrays deleted from both `openGraph` and `twitter` in `page.js`
- [ ] All previously completed drills (180, target-acquisition, recoil-control, angle-hold-trainer, instant-response) still work
