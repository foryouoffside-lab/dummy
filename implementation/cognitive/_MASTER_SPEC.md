# COGNITIVE DRILL MASTER SPEC — v1

**Status:** Authoritative. Every cognitive drill must conform to this document.
**Audience:** Gemini CLI (implementer). Read this fully before touching any drill.
**Category size:** 12 drills, all self-contained (no shared game-state provider).

**References — read in this order, they cover different things:**

1. `app/drills/fps/180-degree-awareness/AwarenessDrillClient.js` — sound, difficulty curve,
   scoring/grading, start-card layout, result-card layout, accordion/footer structure, SEO
   shape. **Desktop-only** (pointer-lock + raw mouse input) — do not copy its input model.
2. `app/drills/cognitive/attention/batch-processing/BatchProcessingClient.tsx` — the SAME
   pattern already adapted for touch and mobile. Fullscreen-on-tap, single `onPointerDown`
   handler for mouse+touch, responsive portrait/landscape box sizing, all shared libs wired.
   Its two known defects (rotate-gate copy, only-3 unrelated Related Drills) are listed in
   §7.2 and still need fixing.
3. **`app/drills/cognitive/focus/concentration-grid/ConcentrationGridClient.js` and
   `app/drills/cognitive/attention/concentration-stamina/ConcentrationStaminaClient.js` — the
   two drills actually finished and live-verified (headless-browser playthrough, not just
   code review) as of 2026-08-03. Treat these as the primary reference for the shell/optimization
   pattern from here on** — they're what batch-processing was supposed to be, corrected after
   two real implementation passes each got the `DrillCountdown`/`DrillAccordion` APIs and the
   fullscreen-exit path wrong (full story in §7.2 and §9). If this document and either of these
   two files disagree on anything **shell-related** (sound wiring, countdown mechanics,
   accordion structure, fullscreen lifecycle, flash implementation, HUD layout), **the file
   wins** — update this document to match, don't trust the prose over verified running code.

When references disagree, batch-processing/concentration-grid/concentration-stamina win for
anything mobile/input/shell-related; 180-degree-awareness wins for anything sound/scoring/SEO
-shaped that the cognitive drills haven't diverged on.

---

## SHELL vs. LOGIC — read this before touching any drill

Everything in this document is **shell**: sound wiring, countdown mechanics, accordion
structure and grouping, fullscreen lifecycle, flash implementation, mobile layout, HUD
chrome, start/result card structure, SEO scaffolding. Shell must be **identical** across all
12 drills — that's the entire point of this migration.

**A drill's core game mechanic is not shell, and is not reset by this migration.**
Concentration Grid's specific gameplay decisions — removing its combo multiplier, refilling
the clock to 45s on every full grid clear, rendering lives as heart icons in the HUD — were
bespoke requests for *that drill's* specific grid-clearing loop. **Do not port those specific
mechanic changes to any other drill.** Divided Attention keeps its dual-task tracking, Switch
Cost keeps its rule-switch penalty, Symbol Matching keeps its symbol-to-number mapping — each
drill's existing scoring/combo/mechanic design carries over unchanged unless a future request
explicitly asks to change that specific drill's logic.

The one piece of Concentration Grid's UI that *is* general-purpose shell, reusable anywhere a
drill happens to have a lives mechanic: **render lives as `Heart` icons (filled vs. faded),
not plain colored dots** — see §6.3.1. This is a presentation rule, not a mechanic; it applies
only to drills that already track lives, and changes nothing about how lives are gained or
lost.

When in doubt whether something is shell or logic: shell is "how the chrome around the game
looks and behaves" (would look the same rendered over a totally different game); logic is
"what you actually do to score points and lose" (specific to that drill's design). Only shell
gets unified.

---

## 0. THE RULE THAT OVERRIDES EVERYTHING

> **Build shared modules once. Never copy-paste behaviour into 12 drill files.**

Good news for this category: the shared modules mostly **already exist** and are already
proven (built during the FPS overhaul, see `implementation/fps/_MASTER_SPEC.md` and
`implementation/HANDOFF.md`). This is a **migration + mobile-adaptation** job, not a
build-from-zero job:

| Module | Status | Notes |
|---|---|---|
| `lib/drillAudio.js` | ✅ exists, use as-is | 7 canonical events, `playSpatialCue` is FPS-only, do not call it here |
| `lib/drillDifficulty.js` | ✅ exists, use as-is | `MAX_LEVEL=15`, `RESUME_FACTOR=0.65`, `getStartLevel`, `getDifficultyProgress` |
| `lib/scoringEngine.js` | ✅ exists, use as-is | `getComboMultiplier`, `getFpsScoreGrade` (score-based grade, same formula works here) |
| `components/drill/DrillCountdown.js` | ✅ exists, use as-is | 3-2-1-GO |
| `components/drill/DrillAccordion.js` | ✅ exists, use as-is | rules / about / faq |
| `components/drill/DrillFooter.js` | ✅ exists, use as-is | IG · FB · YT · X |
| `components/ShareScoreCard.js` | ✅ exists, use as-is | share card generator |
| `lib/canvasFx.js` | ✅ exists, use as-is | `createBackdropCache`, `getCanvasDpr`/`canvasDpr`, `drawPulseRing` |

**Do NOT introduce, import, or leave dangling references to any of the following** — they
belong to a *different*, Capacitor-wrapped mobile-app build of this project
(`global-drill-system-nextjs - Copy - Copy`, a sibling folder, read-only reference for FPS
sound values only — never copy its architecture into this web app):

- `components/DrillWrapper.js`
- `lib/progressStore.js`
- `lib/challengeEngine.js`
- `lib/orientation.js` (`lockLandscape`/`unlockOrientation` — native Capacitor orientation lock)
- `@capacitor/core`, `@capacitor/status-bar`, or any `Capacitor.isNativePlatform()` check
- Leaderboard/duel/daily-challenge wiring (`saveLeaderboardEntrySync`, `useDuelMatchStart`,
  `previewDailyCompletion`) — **exception:** `lib/dailyChallenge.js` already exists in this repo
  and is fine to leave alone if a drill already reads from it; just don't add new dependents.

**Historical note, resolved 2026-08-03:** `concentration-grid` originally imported all four
banned modules above and did not compile. It was reverted to the self-contained pattern (state
in the component, `useState`/`useRef`, own `localStorage` key), then went through a second
bug-fix pass (§7.2, §9) before being verified live. Kept here as the concrete example of why
this rule exists — the next drill that reaches for `DrillWrapper` et al. breaks the same way.

---

## 1. SOUND — identical to FPS, zero exceptions

Import `drillAudio` from `lib/drillAudio.js`. Delete every inline `AudioSynthesizer` class /
raw `audioCtx` found in a drill (see §7 audit — 8 of 12 drills still have one).

The **7 canonical events**, exact values in `lib/drillAudio.js` (already correct, do not
retune):

| Event | When |
|---|---|
| `playHit()` | correct hit/tap |
| `playPenalty()` | wrong click, miss, timeout, false alarm — **the ONE sound for all of these** |
| `playCountdownTick()` | 3, 2, 1 |
| `playGo()` | GO |
| `playSessionEnd()` | result card reveal |

**Do not call `playSpatialCue()`** — that is 180-degree-awareness's own exception for its stereo-pan
mechanic and has no meaning in any cognitive drill.

**Do not invent new events** (no `playLevelUp`, `playComboTier`, `playHeartbeat`,
`playWrongBoom` as a *distinct* sound, etc.). If a drill's current code has one of these,
remap it to the closest canonical event per the FPS master spec's remap table (§1.1) and
delete the rest.

---

## 2. VISUAL FEEDBACK — red flash only, plus the one approved calm-state exception

`styles/globals.css` already defines `.fx-flash` / `.fx-flash-red` (and unused
`.fx-flash-gold` / `.fx-flash-cyan` — never call those from a cognitive drill; a level-up chime
or combo flash is a *notification*, banned by §4).

Standard implementation (copy from `AwarenessDrillClient.js` or `BatchProcessingClient.tsx`
verbatim — both already have it right):

```js
const triggerFlash = useCallback(() => {
  const id = Date.now() + Math.random();
  setFlashes((f) => [...f, { id }]);
  setTimeout(() => setFlashes((f) => f.filter((x) => x.id !== id)), 480);
}, []);
```

Fires on: wrong click/tap, timeout, false alarm — always paired with `drillAudio.playPenalty()`.
**No screen-shake-only or flash-only mistakes** — the two always travel together.

**Confirmed defect, check every drill for it:** `concentration-grid` originally rendered its
flash as `<div className="absolute inset-0 bg-red-600/30 z-50 pointer-events-none animate-ping" style={{ animationDuration: '300ms' }} />` — a hand-rolled pulsing-ring effect (`animate-ping`
scales and fades in a loop) instead of the one-shot `.fx-flash`/`.fx-flash-red` keyframe. It
*looked* like a flash but was visually and temporally wrong (ping's easing/repeat behavior
reads as a pulse, not an impact). The fix is always the same: delete any inline
`style={{ animation... }}`, `animate-ping`, `animate-pulse`, or hand-written `bg-red-*/opacity`
div, and render exactly `<div className="fx-flash fx-flash-red" />` per active flash — nothing
else, no extra classes, no inline style.

---

## 3. DIFFICULTY — reuse `lib/drillDifficulty.js`, no drill invents its own curve

```js
import { MAX_LEVEL, getStartLevel, getDifficultyProgress } from '@/lib/drillDifficulty';
```

Same rules as FPS (`implementation/fps/_MASTER_SPEC.md` §1.2), restated for this category:

1. **In-session, level only ever rises.** `Math.max(currentLevel, earned)`.
2. **A returning player resumes at `getStartLevel(bestLevel)`** (65% of personal best).
3. **Every difficulty parameter must be driven by `getDifficultyProgress(level)` with no
   clamp that saturates before L15.** Audit each drill's `getLevelConfig`-equivalent function
   for this — it's the single most common defect in the FPS category and will recur here.
4. **`POINTS_PER_LEVEL` is drill-specific**, calibrated so `MAX_LEVEL` is reachable in the
   first ~⅓ of a **45-second** session under strong play (see §5's worked-example formula).
   Because the session is now shorter than the FPS drills' 45s-after-being-60s history, a
   drill migrating from 60s/75s/Untimed to 45s must recompute this constant from its own
   points-per-hit — do not just copy `250` from 180/batch-processing without checking the
   drill's own scoring rate.

---

## 4. NOTIFICATION-FREE, WITH ONE NAMED EXCEPTION

No toasts, snackbars, floating banners, achievement pop-ups, or "Level Up!" text during play.
Feedback is **sound + flash only**, exactly as in the FPS category.

**The one exception, and it is NOT a notification in the same sense:** a single static line of
copy under the START button on the start card (see §6.1 point 7). It is never dismissed,
never triggered by an event, never animated in/out — it just always renders when the card
renders. If it blinks, slides, or reacts to orientation changes, it has become a notification
and must be reverted to static copy.

---

## 5. DURATION — every drill is a fixed 45 seconds

`DRILL_DURATION = 45` (or `TOTAL_TIME = 45`, match whichever constant name the drill already
uses). **No time penalties, no time rewards.** Timer only counts down; nothing in gameplay
adds or subtracts from it.

Per-drill migration notes (see §7 baseline table for current values):

- Drills currently at **60s** (concentration-stamina, divided-attention, multi-tasking,
  selective-attention, sustained-attention, switch-cost, distraction-fighter, reaction-time):
  cutting 15s changes hits-per-session — recompute `POINTS_PER_LEVEL` per §3.4, don't just
  truncate the clock and leave old pacing constants in place.
- **symbol-matching**: registry metadata claims `"duration": "75s"` but the code hardcodes
  `useState(60)` — **this mismatch is itself a bug** (§7.2, item to fix regardless of the
  45s migration). Fix both to 45s and update `lib/drillsRegistry.js`'s `duration` field to
  match — never let the registry and the runtime disagree again.
- **rsvp-reader**: currently `"Untimed"` (reads until the player stops). This needs a genuine
  redesign, not a truncation: reframe as a **45-second sprint** — flash as many words as
  possible at the player's chosen WPM, ending either on a comprehension-check miss streak or
  the clock, whichever the drill's own logic makes cleanest. Score on words-correctly-tracked
  × combo, same formula shape as every other drill. This is the one drill in the category where
  "port the reference pattern" isn't enough — the core loop needs a real redesign decision.
  Flag the exact mechanic chosen in the per-drill plan before implementing; don't invent it
  silently mid-file.
- **batch-processing** and **concentration-grid** are already at 45s — leave the constant
  alone, just verify §3.4's pacing math still holds once concentration-grid's difficulty
  curve is otherwise brought in line with this spec.

Update `lib/drillsRegistry.js`'s `duration` field for every drill touched, and the
`app/drills/cognitive/page.js` / `CognitiveHubClient.js` copy if it names a specific duration
anywhere (spot-check; it currently doesn't hardcode per-drill durations).

---

## 6. THE UNIVERSAL DRILL SHELL — mobile-first, both orientations

Every cognitive drill page renders this exact structure. Same skeleton as the FPS shell
(`implementation/fps/_MASTER_SPEC.md` §Phase 2), with the mobile-input changes below.

```
┌─────────────────────────────────────────────────────────┐
│ Breadcrumb:  Home › Cognitive › <Drill Name>             │
├─────────────────────────────────────────────────────────┤
│              <H1 — DRILL NAME, CENTERED>                 │
├─────────────────────────────────────────────────────────┤
│  ┌────────┬────────┬────────┬────────┐                  │
│  │ Score  │  Time  │ Level  │  Best  │                  │  ← 4 stat cards
│  └────────┴────────┴────────┴────────┘                  │
├─────────────────────────────────────────────────────────┤
│ ╔═════════════════════════════════════════════════════╗ │
│ ║ Score                                        Time    ║ │  ← ONLY 3 things in the box
│ ║              [ GAME CANVAS / DOM ]                   ║ │
│ ║                                          [🔊]        ║ │
│ ╚═════════════════════════════════════════════════════╝ │
├─────────────────────────────────────────────────────────┤
│  ▸ Drill Instructions & Scoring  ▸ About  ▸ FAQ           │
├─────────────────────────────────────────────────────────┤
│  Related Cognitive Drills  (6 cards, uniform)             │
├─────────────────────────────────────────────────────────┤
│  Footer — IG · FB · YT · X                                │
└─────────────────────────────────────────────────────────┘
```

### 6.1 Input model — tap/click, no pointer lock

Cognitive drills are **not** raw-mouse-input drills. Use a **single handler** bound to
`onPointerDown` on the interactive surface (canvas or DOM targets) that handles mouse clicks
and touch taps identically — this is what `BatchProcessingClient.tsx`'s
`handleCanvasInteraction` already does correctly. Do not add separate `onClick`/`onTouchStart`
paths; that's how double-fire bugs happen (see §7.1).

- **No `requestPointerLock()`, no `movementX/Y` tracking, no cursor-hidden crosshair.** The
  cursor stays visible; there's nothing to aim, only something to tap.
- Hit-test radius gets a **generous touch pad** on touch devices —
  `BatchProcessingClient.tsx`'s `isMobile ? 24 : 14` pattern is correct, port it.
- **Fullscreen is requested once, on the START button's click handler** (`enterDrill`), not
  automatically and not tied to pointer lock:
  ```js
  if (containerRef.current && !document.fullscreenElement) {
    try { await containerRef.current.requestFullscreen(); } catch (e) {}
  }
  ```
  This must be the literal first `await` inside the click handler — fullscreen requests only
  succeed inside a direct user-gesture call stack; anything awaited before it (audio init,
  network, etc.) risks the browser silently rejecting the request. `drillAudio.init()` can run
  either just before or just after; it doesn't consume the gesture the way an `await` does.

### 6.2 Both orientations, genuinely playable in each — no rotate gate

**Delete every "rotate device" blocking screen / warning** in the category (7 of 12 drills
currently have one — see §7.1). Replace with responsive layout that works in **both**
orientations:

```jsx
className={isFullscreen
  ? 'fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#050508]'
  : isMobile
    ? (isPortrait
        ? 'w-full rounded-2xl aspect-[3/4] min-h-[420px] max-h-[76vh]'
        : 'w-full rounded-2xl aspect-video min-h-[340px] max-h-[85vh]')
    : 'w-full rounded-2xl aspect-video min-h-[460px] sm:min-h-[500px] max-h-[88vh]'}
```

Port this exact pattern (already correct in `BatchProcessingClient.tsx`) to all 12 drills.
Each drill's own spawn-position logic (target placement, item layout) must use the container's
**actual measured width/height** (via `ResizeObserver`, already the norm in this category —
see §7.1), never a hardcoded desktop aspect ratio, so portrait's taller-than-wide canvas still
places things sensibly.

**Replace the rotate warning with a static, non-blocking reassurance line under the START
button** (§4's one exception):

```jsx
<p className="text-[10.5px] font-medium text-slate-500 text-center mt-0.5">
  Playable in portrait or landscape
</p>
```

This line is **identical across all 12 drills** — don't customize the wording per drill, and
don't make it conditional on `isMobile`/`isPortrait` (that conditionality is exactly what made
the old rotate warning a notification instead of static copy). It always renders.

### 6.3 Start card — same structure as FPS §2.7, minus the sensitivity slider

Max width `340px`, `rounded-[20px]`, `bg-[#0d0d18]`, centered. In order:

1. Icon badge (drill-accent gradient)
2. Drill name + one-line positioning subtitle
3. 2 instructional rows (Objective / Mechanic) — `BatchProcessingClient.tsx`'s exact pattern
4. 3 mini-stats: Best Score · Best Combo · Best Level
5. START button — full width, drill-accent gradient, requests fullscreen (§6.1)
6. The reassurance line (§6.2)

**No sensitivity slider anywhere in this category** — there is no mouse input to calibrate.
If a drill's current start card has one (none currently do; flag if found), delete it.

#### 6.3.1 Lives, if the drill has them — hearts, not dots

Not every drill has a lives mechanic; this only applies to the ones that already do
(`concentration-grid` is the reference — do not add a lives mechanic to a drill that doesn't
already have one, that's a logic change, see the SHELL vs. LOGIC section above). Where a lives
count exists, render it as `Heart` icons from `lucide-react`, filled for remaining lives, faded
for lost ones — not plain colored `<span>` dots:

```jsx
{Array.from({ length: MAX_LIVES }).map((_, i) => (
  <Heart key={i} className={`w-4 h-4 ${i < lives ? 'fill-red-500 text-red-500' : 'text-white/15'}`} />
))}
```

### 6.4 Result card — identical to FPS §2.8

Split layout: left 36% grade letter + score, right 64% stat tiles + coach-advice line +
Play Again / Share / Exit buttons. Grade from `getFpsScoreGrade(score, eliteScore)` — each
drill picks its own `ELITE_SCORE` calibrated to its own scoring rate (180 uses 17000,
batch-processing uses 15000 — do not reuse either number verbatim for a different drill's
scoring rate without checking).

### 6.5 Cursor & typography

Same as FPS §2.4/§2.6 minus the "cursor-none, canvas-drawn crosshair" rule (there is no
crosshair in this category — `cursor-pointer`/`cursor-crosshair` on the interactive surface is
fine, since taps land directly on visible targets, not an invisible aim point).
`font-sans` throughout, `tabular-nums` on live numerics, one family (Inter, already wired).

### 6.6 Accordion grouping — no gap between the three, and enough content in each

The three `DrillAccordion` instances (rules, about, faq) render **back-to-back with zero
visible gap between them** — not the ~40px (24px flex `gap-6` + the component's own 16px
`mt-4`) that a naive render produces. Wrap all three in one container so the parent's flex
`gap` only applies at the group's outer boundary, and neutralize the component's internal
margin inside that wrapper:

```jsx
{!isFullscreen && (
<div className="[&>div]:!mt-0">
  <DrillAccordion id="rules" ...>...</DrillAccordion>
  <DrillAccordion id="about" ...>...</DrillAccordion>
  <DrillAccordion id="faq" ...>...</DrillAccordion>
</div>
)}
```

Don't edit `components/drill/DrillAccordion.js` itself to remove its `mt-4` — other call sites
(if any render a single accordion outside a group) still depend on it having its own spacing.
The override belongs at the call site, scoped to the wrapper.

**Content depth per section — this is copy work, not filler.** Each section should read like
it has something to say, not like three near-empty boxes:

- **Rules**: 3–4 items. If the drill has more than one mechanic worth calling out (e.g. a
  bonus condition, a lives system, a time-refill), each gets its own item — don't compress two
  ideas into one line.
- **About**: 2–3 paragraphs. What the skill is, why it matters, and (the paragraph most drills
  are currently missing) what the specific run structure teaches — reference the drill's own
  distinguishing mechanic by name, don't just restate generic "improves focus" copy.
- **FAQ**: 5+ Q&A pairs, and they must earn their place — a question whose answer is "yes" with
  no elaboration is filler. If a drill just gained or changed a mechanic (a time-refill, a
  lives system), add a question that explains it; that's real content, not padding, and it's
  exactly what a confused first-time player would search for.

Whenever a mechanic changes, audit the Rules/About/FAQ copy for stale references to the old
behavior (see `concentration-grid`'s FAQ #2 before/after: "multiplied by your current combo
multiplier" had to be rewritten once combo was removed from that drill specifically — copy
drift is a real defect, not cosmetic).

---

## 7. BASELINE AUDIT — current state of all 12 drills

Confirmed by direct read/grep of each file, 2026-08-03. Re-verify per-drill at plan time —
this table is a starting point, not a substitute for reading the actual file before writing
its `IMPLEMENTATION_PLAN.md`.

### 7.1 Structural signals

| Drill | Inline audio class | `drillAudio` | `drillDifficulty` | `scoringEngine` | Countdown/Accordion/Footer | Rotate gate | Fullscreen | Duration now |
|---|---|---|---|---|---|---|---|---|
| batch-processing | — | ✅ | ✅ | ✅ | ✅/✅/✅ | ⚠️ has one (soften, don't delete outright — becomes §6.2's static line) | ✅ on start | 45s ✅ |
| concentration-grid | ✅ **DONE, live-verified 2026-08-03** | ✅ | ✅ (`getStartLevel`; `getDifficultyProgress` deliberately unused — single discrete grid-size axis, not a continuous curve, and that's fine for this drill) | ✅ | ✅/✅/✅ (accordions grouped, zero gap) | ✅ removed, static line present | ✅ on start, real exit path | 45s ✅ |
| concentration-stamina | ✅ **DONE, live-verified 2026-08-03** | ✅ | ✅ | ✅ | ✅/✅/✅ | ✅ removed, static line present | ✅ on start, real exit path | 45s ✅ |
| divided-attention | ✅ (delete) | ❌ | ❌ | ❌ | ❌/❌/❌ | ✅ has one (remove) | ? | 60s |
| multi-tasking (DualTargetFlowClient) | ✅ (delete) | ❌ | ❌ | ❌ | ❌/❌/❌ | ✅ has one (remove) | ? | 60s |
| selective-attention | ✅ (delete) | ❌ | ❌ | ❌ | ❌/❌/❌ | ✅ has one (remove) | ? | 60s (assumed, verify) |
| sustained-attention | ✅ (delete) | ❌ | ❌ | ❌ | ❌/❌/❌ | ❌ none found (verify) | ? | 60s (assumed, verify) |
| switch-cost | ✅ (delete) | ❌ | ❌ | ❌ | ❌/❌/❌ | ✅ has one (remove) | ? | 60s |
| distraction-fighter | ✅ (delete) | ❌ | ❌ | ❌ | ❌/❌/❌ | ✅ has one (remove) | ? | 60s (assumed, verify) |
| reaction-time (EliteNeuroSwitchClient, **this repo's own**, distinct from the sibling reference app's file of the same name) | ✅ (delete) | ❌ | ❌ | ✅ (partial) | ❌/❌/❌ | ✅ has one (remove) | ? | 60s (hardcoded `useState(60)`) |
| rsvp-reader | ? (verify) | ❌ | ❌ | ❌ | ❌/❌/❌ | ❌ none found | ? | Untimed — needs redesign (§5) |
| symbol-matching | ✅ (delete) | ❌ | ❌ | ❌ | ❌/❌/❌ | ✅ has one (remove) | ? | 60s hardcoded, registry says 75s (mismatch, §5) |

`?` = not yet confirmed by direct read; confirm before writing that drill's
`IMPLEMENTATION_PLAN.md`. Everything marked ✅/❌ without `?` was confirmed by grep across the
whole category on 2026-08-03.

### 7.2 Known specific defects (beyond the category-wide migration above)

1. ~~`concentration-grid` doesn't compile~~ — **resolved**, see the historical note in §0.
   `concentration-grid` and `concentration-stamina` are both done; their specific defects
   (found on a *second* pass, after they already compiled and looked plausible at a glance)
   are documented in §9, not here — read §9 before starting any of the remaining 9 drills,
   since those are the defects most likely to recur.
2. **`symbol-matching`: registry/runtime duration mismatch** — `lib/drillsRegistry.js` says
   `"75s"`, code hardcodes `60`. Neither will be true after the 45s migration; fix both to 45
   together so they can never drift again.
3. **`batch-processing`'s Related Drills section links to FPS and reaction-speed drills, not
   a single cognitive drill** (`/drills/fps/180-degree-awareness`,
   `/drills/reaction-speed/barrier-sequence-pursuit`,
   `/drills/reaction-speed/fps-tracking-trainer`) — and only has 3 cards, not 6. Fix: 6 cards,
   thematically the closest **cognitive** drills (e.g. concentration-stamina, switch-cost,
   sustained-attention for an attention-training drill's neighbors).
4. **`batch-processing`'s rotate line is a blocking-styled warning**, not the static
   reassurance line specced in §6.2 — soften it, don't just delete it (this drill should keep
   *some* copy under Start, since §4/§6.2 mandate one).
5. Every drill without `drillAudio` (10 of 12) has **the class `AudioSynthesizer` or a raw
   `AudioContext`/`webkitAudioContext` construction inline** — confirm the exact method names
   present before remapping, per the FPS spec's remap table pattern, since names vary drill to
   drill (`playBeep`, `playDing`, whatever that file invented).

---

## 8. SEO — same bar as FPS, adapted

1. **Schema ↔ visible content parity.** `FAQPage` JSON-LD must match the FAQ accordion text
   word for word.
2. **`SoftwareApplication` schema, not `VideoGame`** — these are cognitive/brain-training
   tools, not games in the search-intent sense FPS trainers are. Keep the existing pattern in
   `app/drills/cognitive/page.js`.
3. Title format: `<Primary Keyword> — <Secondary> | SkillDrills`, ≤60 chars.
4. Description 150-160 chars, primary keyword in the first 90 chars.
5. H-structure: one `H1` (drill name, centered above the box) → `H2` per accordion → `H3` per
   FAQ question.
6. "About This Drill" accordion: 300-500 words, genuinely useful (what the skill is, why it
   matters, how to train it) — not keyword filler. `batch-processing`'s About section is a
   good length/tone reference.
7. 6 related-drill cards, descriptive anchor text, **thematically the closest drills within
   cognitive** (not cross-category unless there's a real mechanical link, and even then it
   should supplement, not replace, in-category links).
8. `alternates.canonical` present on every drill page — spot-check, most already have it.
9. Register every drill's route in `app/sitemap.js` and `scripts/notify-indexnow.js` — **both
   files are currently missing several already-shipped cognitive routes**
   (`switch-cost`, `concentration-stamina`, `rsvp-reader` are absent from both lists as of
   2026-08-03, independent of anything in this spec). Fix while touching each drill.
10. `opengraph-image.js` per drill, 1200×630, same technique as
    `app/drills/fps/180-degree-awareness/opengraph-image.js`. Currently **zero cognitive
    drills have one** — this is new work for the whole category, not a migration.

---

## 9. BUG-DETECTION CHECKLIST — apply to every drill during its own review pass

This is not a list of confirmed bugs (that requires reading each file individually, which
happens at per-drill plan/polish time — see `HANDOFF.md`). It's the specific failure patterns
that recurred repeatedly during the FPS overhaul and are likely to recur here, given these
drills share the same era/author patterns as the pre-overhaul FPS drills:

- **Difficulty curve clamped before L15** — any `Math.max`/`Math.min` inside a
  `getLevelConfig`-equivalent that bites before `getDifficultyProgress(level)` reaches 1.0.
- **Flat hit-forgiveness pad that doesn't scale with level** — if target/item radius shrinks
  by level but the click-tolerance pad is a constant, high levels become *easier* to hit than
  intended, or the pad exceeds the visible target and the drill silently stops testing
  precision.
- **`requestAnimationFrame` loop not cancelled on unmount/state change** — check every
  drill's canvas-loop `useEffect` cleanup actually calls `cancelAnimationFrame` and that the
  loop's own exit condition (`if (gameState !== 'playing') return`) doesn't leave a stale
  closure running one extra frame after state flips.
- **Double-fire input** — a drill with both an `onClick` and a separate `onTouchStart`/
  `onPointerDown` on the same element can register one tap as two hits/misses. Consolidate to
  the single-handler pattern in §6.1.
- **`AudioContext` not resumed after tab backgrounding** — mobile Safari/Chrome suspend the
  context when the tab loses focus; verify `drillAudio.init()`'s existing
  `ctx.state === 'suspended'` resume check actually gets called again on the next sound
  rather than assuming init-once is enough (this is already handled correctly inside
  `lib/drillAudio.js` itself — the risk is a drill bypassing `drillAudio` and calling its own
  dead inline synth instead, which is exactly what §1 is deleting).
- **Countdown timers (`setTimeout` chains) not cleared on rapid Play-Again clicks** — a player
  hitting "Play Again" before an earlier countdown's timeouts fired can end up with two
  overlapping countdown sequences. `AwarenessDrillClient.js`'s
  `countdownTimeoutsRef.current.forEach(clearTimeout)` pattern at the top of `enterDrill` is
  the fix; confirm every migrated drill does this before scheduling new timeouts.
- **Fullscreen request awaited after another `await`** — see §6.1's gesture-consumption note;
  a drill that does `await drillAudio.init()` (if that ever becomes genuinely async) or any
  network/localStorage read before `requestFullscreen()` risks silent rejection on Safari.
- **Registry/runtime drift** — `lib/drillsRegistry.js`'s `duration`/`difficulty` fields not
  matching what the component actually does (confirmed already present once, §7.2 item 2 —
  check every drill for the same class of mismatch, not just duration).
- **`DrillCountdown`/`DrillAccordion` called with an API that doesn't exist.** Confirmed live
  in two drills (`concentration-stamina`, `concentration-grid`): both were implemented as
  `<DrillCountdown onComplete={handleCountdownComplete} />` — `DrillCountdown` has no
  `onComplete` prop and drives no internal timer; it only renders whatever `value` you pass
  it. Result: the countdown froze on a static ring forever and the game never started. Same
  drills also called `<DrillAccordion rules={...} about={...} faq={...} />` in one shot —
  the real component takes one `id`/`title`/`isOpen`/`onToggle`/`children` per instance and
  needs three separate instances with local `openAccordion` state. **Before marking any drill
  done, read `components/drill/DrillCountdown.js` and `DrillAccordion.js` and diff the drill's
  actual usage against their real prop signatures** — don't assume a prior conversion pass
  got this right just because it compiles (both drills built fine; the bug was runtime-only).
- **Fullscreen engaged with no working exit path.** An "Exit Drill" control that does a plain
  client-side `<Link>` navigation does NOT release the Fullscreen API (it's bound to the
  document, not the route) — write a real `handleExitDrill` that calls
  `document.exitFullscreen()`. Separately, verify every section below the drill box (header,
  title, stat cards, all three accordions, related drills, footer) is wrapped in
  `{!isFullscreen && (...)}`, not rendered unconditionally — otherwise once fullscreen engages
  that whole section becomes permanently covered and unclickable for the rest of the session,
  which surfaces to a user as "the instructions/FAQ aren't expandable" even though the
  accordion component itself is working correctly.

---

## ACCEPTANCE CHECKLIST

A drill is done when **all** of these pass:

- [ ] Imports `drillAudio`; **zero** local audio code, zero inline `AudioSynthesizer`/raw `AudioContext`
- [ ] Uses only the 5 canonical sound events (no `playSpatialCue`, no invented events)
- [ ] Wrong click/tap, miss, timeout, and false alarm all fire `playPenalty()` + literal
      `<div className="fx-flash fx-flash-red" />` — no `animate-ping`/`animate-pulse`/inline
      `style={{ animation }}` hand-rolled flash
- [ ] 3-2-1-GO countdown via shared `DrillCountdown`, **driven by the parent's own
      `countdownValue` state + `setTimeout` chain** — `DrillCountdown` takes `value` only, it
      has no `onComplete` prop and no internal timer
- [ ] Zero time penalties/rewards; timer is a fixed **45s**
- [ ] Difficulty via `lib/drillDifficulty.js`; monotonic in-session; resumes at `getStartLevel`;
      no parameter clamps before L15; `POINTS_PER_LEVEL` recalibrated for the 45s session
- [ ] Single `onPointerDown` handler for mouse+touch; no pointer lock, no hidden cursor
- [ ] **No rotate-device gate.** Responsive portrait AND landscape layouts, both genuinely
      playable, driven by measured container size
- [ ] Fullscreen requested as the first `await` inside the START click handler
- [ ] Static reassurance line under Start: "Playable in portrait or landscape" — always
      rendered, never conditional, never dismissible
- [ ] Start card: icon badge → name+subtitle → 2 instruction rows → 3 mini-stats → START →
      reassurance line. **No sensitivity slider.**
- [ ] Result card: 36/64 split, grade from `getFpsScoreGrade`, coach-advice line, Play Again /
      Share / Exit
- [ ] 3 accordions via shared `DrillAccordion` — **each rendered as its own instance** with
      its own `id`/`isOpen`/`onToggle`/`children` (never a single call with `rules=`/`about=`/
      `faq=` props, that API doesn't exist), grouped in one wrapper with zero gap between them
      (§6.6), FAQ text matches `FAQPage` schema exactly, and each section has real
      depth (rules 3-4 items, about 2-3 paragraphs, FAQ 5+ pairs) — see §6.6
- [ ] If the drill has a lives mechanic, lives render as `Heart` icons (§6.3.1), not dots
- [ ] Fullscreen has a real exit path: a `handleExitDrill` that calls
      `document.exitFullscreen()`, not a bare `<Link>`. Header, title, stat cards, all 3
      accordions, related drills, and footer are each wrapped in `{!isFullscreen && (...)}`
- [ ] 6 related-drill cards, thematically closest **cognitive** drills, descriptive anchors
- [ ] Footer via shared `DrillFooter`
- [ ] `lib/drillsRegistry.js` duration/description match the shipped drill exactly
- [ ] Registered in `app/sitemap.js` and `scripts/notify-indexnow.js`
- [ ] `opengraph-image.js` added, 1200×630, verified
- [ ] `npx next build` exits 0 with this drill included
- [ ] **Verified live**, not just read — run the dev server, drive it (headless browser or by
      hand): click Start, let the countdown actually complete into `'playing'`, confirm the
      in-box HUD and sound toggle render, expand all 3 accordions with real clicks (not just
      confirm they're in the DOM), and check the browser console for errors. Both
      `concentration-grid` and `concentration-stamina` compiled cleanly and *looked* correct on
      read-through while still being completely unplayable — a clean build is not evidence a
      drill works.

---

## DECISIONS LOG

| # | Question | Decision |
|---|---|---|
| 1 | Port the sibling app's DrillWrapper/leaderboard/challenge/Capacitor ecosystem? | **No.** Stay self-contained like `180-degree-awareness`. `concentration-grid`'s dangling imports into that ecosystem are a mistake to revert, not a direction to extend. |
| 2 | Rotate-device handling | **Delete the blocking gate entirely.** Both portrait and landscape must be genuinely playable via responsive layout. Replace with one static, always-visible reassurance line under Start: "Playable in portrait or landscape." |
| 3 | Fullscreen trigger | On the START button's click handler, as the literal first `await`, not automatic and not tied to any input-lock mechanism (there is no pointer lock in this category). |
| 4 | Duration | **45s, every drill, no exceptions.** `rsvp-reader` (currently Untimed) needs a real mechanic redesign, not a truncation — decide and document the exact loop before implementing. |
| 5 | Primary reference for input/mobile handling | `batch-processing`, not `180-degree-awareness` — it already solved touch input and responsive orientation for this exact category. |
| 6 | Whether a completed drill's bespoke mechanic changes (e.g. `concentration-grid` losing its combo multiplier and gaining a time-refill-on-clear) propagate to other drills | **No.** Those are logic, not shell — see the SHELL vs. LOGIC section up top. Only the shell fixes (countdown, accordions, audio, fullscreen, flash, HUD, mobile layout) are uniform across all 12. Each drill keeps its own existing scoring/combo/mechanic design unless a future request names that specific drill. |
| 7 | Reference status after `concentration-grid`/`concentration-stamina` | Both are now primary shell references alongside `batch-processing`, promoted above `180-degree-awareness` for anything shell-related, because they're the only two in this category verified by an actual driven playthrough, not just a clean compile. |
