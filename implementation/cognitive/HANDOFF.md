# PROJECT HANDOFF — COGNITIVE DRILL OVERHAUL

**Purpose:** paste the prompt in Part 1 into Gemini CLI, run in this repo's root. Everything
else here is reference Gemini can read from disk itself.

**Last updated:** 2026-08-03 · `concentration-grid` and `concentration-stamina` are now DONE
and live-verified — they're the shell reference going forward, not just `batch-processing`.
Master spec updated to encode a SHELL vs. LOGIC split: the shell fixes below are mandatory for
every remaining drill; `concentration-grid`'s own bespoke mechanic changes (combo removed,
time-refill-on-clear, hearts for lives) are **not** — see `_MASTER_SPEC.md`'s "SHELL vs. LOGIC"
section before starting the next drill.

---

## PART 1 — THE PROMPT (copy everything in the box into Gemini CLI)

```
I'm overhauling the Cognitive drills in this Next.js app (SkillDrills), the same way the FPS
category was already overhauled (see implementation/fps/ and implementation/HANDOFF.md for
that prior project — read it for context on the workflow and the shared modules it built,
but that one is DONE; don't touch FPS drills as part of this task).

We work in a fixed loop:
- Claude (a separate session) is the architect: audits code, writes implementation plans and
  the master spec, reviews what you build, and writes polish passes. Claude does not write
  drill code directly in this workflow.
- YOU (Gemini CLI) implement the plans. I relay them to you and report your output back to
  Claude.
- I (Sangmesh) relay between the two of you and playtest.

START HERE — read these two files in full before touching any code:
1. implementation/cognitive/_MASTER_SPEC.md  ← the constitution every cognitive drill must follow
2. implementation/cognitive/HANDOFF.md       ← this file, current project state, what's next

Also skim (don't need full detail, just the shape):
3. implementation/fps/_MASTER_SPEC.md — the sibling category's spec. Cognitive's spec quotes
   and diffs against this one in several places; the FPS one has more worked examples of the
   sound/difficulty/scoring patterns if you need a second reference.

REFERENCE DRILLS — read-only, do not modify as part of this task:
1. app/drills/fps/180-degree-awareness/AwarenessDrillClient.js — sound, difficulty, scoring,
   card layout, SEO shape. Desktop pointer-lock input model — do NOT copy that input pattern.
2. app/drills/cognitive/attention/batch-processing/BatchProcessingClient.tsx — touch/mobile
   input pattern. ~95% done; _MASTER_SPEC.md §7.2 lists its remaining 2 defects.
3. app/drills/cognitive/focus/concentration-grid/ConcentrationGridClient.js AND
   app/drills/cognitive/attention/concentration-stamina/ConcentrationStaminaClient.js — THE
   PRIMARY REFERENCES for the shell pattern now. Both are done and were verified by an actual
   driven playthrough (not just a clean compile — a clean compile is NOT sufficient evidence a
   drill works, both of these compiled fine while still being completely unplayable on the
   first pass). If anything in _MASTER_SPEC.md's prose disagrees with what these two files
   actually do for a shell concern, the files win.

CRITICAL — SHELL vs. LOGIC (read _MASTER_SPEC.md's own section on this, this is the one-line
version): everything about sound/countdown/accordions/fullscreen/flash/mobile-layout/HUD-chrome
is SHELL and must be identical across all 12 drills. `concentration-grid`'s specific gameplay
changes (its combo multiplier removed, its clock refilling to 45s on every full grid clear,
its lives rendered as hearts) are THAT DRILL'S OWN LOGIC, made for its own specific mechanic —
do not port the combo-removal or time-refill behavior to any other drill. Each drill keeps its
own existing scoring/mechanic design. The ONE piece of that list which IS general shell:
render any lives count as `Heart` icons instead of plain dots, wherever a drill already has a
lives mechanic (§6.3.1) — that's presentation only, not a mechanic change.

Critical constraints (all explained in full in _MASTER_SPEC.md, restated because they're the
ones most likely to get missed or half-applied):
- Self-contained architecture ONLY. Do NOT import or reference components/DrillWrapper.js,
  lib/progressStore.js, lib/challengeEngine.js, lib/orientation.js, or any @capacitor/* package
  — those belong to a different, Capacitor-wrapped sibling app and do not exist in this repo.
- Every drill: fixed 45-second duration, no time penalties/rewards.
- Every drill: red flash is the ONLY visual feedback — render it as the literal
  `<div className="fx-flash fx-flash-red" />`, nothing hand-rolled (no `animate-ping`, no
  inline `style={{ animation }}` — `concentration-grid` originally had exactly this bug: a
  pulsing `animate-ping` div that looked like a flash but was the wrong shape/timing entirely).
  `drillAudio` is the only sound system; `lib/drillDifficulty.js` is the only difficulty system.
- DELETE every rotate-device warning/gate. Both portrait and landscape must be genuinely
  playable via responsive layout, not by forcing one orientation. Replace with the single
  static line specified in _MASTER_SPEC.md §6.2 — always visible, never conditional.
- Fullscreen requested on the START button's click handler, as the first `await`. It needs a
  REAL exit path too: a `handleExitDrill` that calls `document.exitFullscreen()` (not a bare
  `<Link>`, which does not release fullscreen), and every section below the drill box
  (header/title/stat-cards/all 3 accordions/related-drills/footer) wrapped in
  `{!isFullscreen && (...)}`. Skipping either half of this makes the whole lower page
  permanently unreachable once a session starts — this happened in both `concentration-grid`
  and `concentration-stamina` and reads to a user as "the FAQ/instructions aren't expandable"
  even though the accordion component itself works fine.
- `DrillCountdown` takes `value` only — it has NO `onComplete` prop and drives no internal
  timer. The PARENT owns `countdownValue` state and a `setTimeout` chain (3→2→1→GO, 700ms
  apart); the last timeout calls your own "start playing" logic directly. Both
  `concentration-grid` and `concentration-stamina` were implemented calling
  `<DrillCountdown onComplete={...} />` and the countdown just froze forever — the game never
  started. Same story for `DrillAccordion`: it's `id`/`title`/`isOpen`/`onToggle`/`children`
  per instance, THREE separate instances, never `rules={}`/`about={}`/`faq={}` in one call.
- The three `DrillAccordion` instances render with ZERO gap between them (wrap in one
  container, override the component's own margin at the wrapper — see _MASTER_SPEC.md §6.6),
  and each needs real content depth (rules 3-4 items, about 2-3 paragraphs, FAQ 5+ pairs) —
  not just structurally present, actually worth reading.
- Never reduce difficulty, not mid-session, not between sessions.

Confirm you've read both files and tell me the current state (which drill you're starting
with and why) before writing any code. When you finish a drill, don't just report that it
compiles — actually run it and click through Start → countdown → playing → expand all 3
accordions before telling me it's done.
```

---

## PART 2 — WHERE THINGS ARE

| Path | What |
|---|---|
| `implementation/cognitive/_MASTER_SPEC.md` | **The constitution.** Sound, difficulty, mobile input, layout, SEO, bug checklist — every rule for all 12 cognitive drills |
| `implementation/cognitive/HANDOFF.md` | This file |
| `implementation/fps/_MASTER_SPEC.md` | Sibling category's spec — cognitive's spec diffs against it in several places, useful as a second reference for sound/difficulty worked examples |
| `implementation/HANDOFF.md` | FPS project's own handoff — **that project is DONE**, this is a separate, later effort for a different category |
| `global-drill-system-nextjs - Copy - Copy` (sibling folder, same Desktop level) | The Capacitor mobile-app build. **Read-only if ever needed, but out of scope for this task** — do not port its architecture in (see Decisions Log #1 in the master spec) |

---

## PART 3 — CURRENT STATE (2026-08-03)

### Shared modules — all already BUILT ✅ (from the FPS project, reused here as-is)

`lib/drillAudio.js` · `lib/drillDifficulty.js` · `lib/scoringEngine.js` ·
`components/drill/DrillCountdown.js` · `components/drill/DrillAccordion.js` ·
`components/drill/DrillFooter.js` · `components/ShareScoreCard.js` · `lib/canvasFx.js`

Nothing needs to be built before drill work can start. This is purely a per-drill migration +
mobile-adaptation job.

### The 12 drills in this category

| Drill | Folder | Status |
|---|---|---|
| Batch Processing | `attention/batch-processing` | ~95% done — 2 defects to fix (see master spec §7.2 items 3-4) |
| Concentration Grid | `focus/concentration-grid` | **Converted + fixed 2026-08-03** — was broken twice: first the dangling DrillWrapper/progressStore/challengeEngine imports (compile error), then after a conversion pass, the same API-misuse bugs as Concentration Stamina below. Both rounds fixed by Claude directly; verified with `npx next build` |
| Concentration Stamina | `attention/concentration-stamina` | **Converted + fixed 2026-08-03** — a conversion pass wired the shared libs but misused two component APIs (see Part 7 below); fixed and verified live in a headless browser |
| Divided Attention | `attention/divided-attention` | Not started — inline audio, rotate gate, 60s |
| Multi-Tasking (DualTargetFlowClient) | `attention/multi-tasking` | Not started — inline audio, rotate gate, 60s |
| Selective Attention | `attention/selective-attention` | Not started — inline audio, rotate gate, likely 60s |
| Sustained Attention | `attention/sustained-attention` | Not started — inline audio, likely 60s |
| Switch Cost | `attention/switch-cost` | Not started — inline audio, rotate gate, 60s |
| Distraction Fighter | `focus/distraction-fighter` | Not started — inline audio, rotate gate, likely 60s |
| Reaction Time (EliteNeuroSwitchClient — this repo's own version) | `processing-speed/reaction-time` | Not started — inline audio, rotate gate, 60s hardcoded |
| RSVP Speed Reader | `processing-speed/rsvp-reader` | Not started — Untimed, needs mechanic redesign (§5 of spec), no rotate gate currently |
| Symbol Matching | `processing-speed/symbol-matching` | Not started — inline audio, rotate gate, 60s hardcoded (registry wrongly says 75s) |

Full per-drill signal table (audio/countdown/accordion/footer/rotate-gate/duration) is in
`_MASTER_SPEC.md` §7.1 — treat it as a starting point and re-verify each drill's actual current
code before writing its individual plan, per that section's own caveat.

### Not yet done for the whole category (new work, not migration)

- **`opengraph-image.js`** — zero cognitive drills have one yet. Every drill needs one, same
  technique as `app/drills/fps/180-degree-awareness/opengraph-image.js`.
- **`app/sitemap.js` and `scripts/notify-indexnow.js`** are already missing several
  already-shipped cognitive routes (`switch-cost`, `concentration-stamina`, `rsvp-reader`) —
  independent bug, fix while touching each drill (master spec §8 item 9).

---

## PART 4 — THE WORKFLOW

```
Claude audits code
      ↓
Claude writes implementation/cognitive/<drill>/IMPLEMENTATION_PLAN.md
      ↓
Sangmesh → Gemini CLI implements (Part 1 prompt above)
      ↓
Sangmesh reports back to Claude
      ↓
Claude reviews vs plan → writes implementation/cognitive/<drill>/POLISH_PASS_N.md if needed
      ↓
repeat until drill is perfect → next drill
```

No per-drill `IMPLEMENTATION_PLAN.md` files exist yet. `concentration-grid` and
`concentration-stamina` were done directly against the master spec without one (and needed a
second pass each to catch the countdown/accordion/fullscreen defects — see Part 7). For the
remaining drills, the master spec plus these two files as concrete examples should be enough;
write an individual plan only if a drill's own mechanic is unusual enough to need one (like
`rsvp-reader`'s redesign).

**"Done" requires a driven playthrough, not a clean build.** Both fixed drills compiled
without errors and looked correct in a code read while being completely unplayable. Before
reporting a drill done: click Start, let the countdown actually reach `'playing'`, expand all
3 accordions with real clicks, and check the browser console — or ask for this to be verified
in a headless browser the way the last two were.

---

## PART 5 — NEXT STEPS

1. **Finish `batch-processing`'s 2 remaining defects** (rotate-line copy, Related Drills
   section pointing at FPS/reaction-speed instead of cognitive drills) — everything else in
   that file is already right, this is the cheapest remaining "fully done" drill.
2. **Migrate the other 9 drills** to the master spec, using `concentration-grid` and
   `concentration-stamina` as the concrete shell reference (not just the prose). Roughly in
   this order (attention-category drills share the most structure with each other, tackle as a
   batch; processing-speed drills each have a more unique core loop):
   - `divided-attention`, `multi-tasking`, `selective-attention`, `sustained-attention`,
     `switch-cost` — attention subcategory, very similar shape
   - `distraction-fighter` — focus subcategory, Stroop mechanic
   - `reaction-time`, `symbol-matching` — processing-speed, straightforward 45s migration
   - `rsvp-reader` — processing-speed, but needs the mechanic redesign flagged in spec §5;
     do this one last since it's not a pure migration

   For every one of these: port the SHELL only (sound, countdown, accordions, fullscreen,
   flash, mobile layout, HUD chrome). Each drill's own scoring/combo/mechanic design is
   untouched — see the SHELL vs. LOGIC section in `_MASTER_SPEC.md` and Part 1's prompt above.
   Verify each one live before calling it done (Part 4).
3. **Category-wide SEO pass** once all 12 compile, match the shell, and are verified live:
   `opengraph-image.js` for all 12, sitemap/IndexNow route audit, schema/FAQ parity check.

---

## PART 6 — DECISIONS ALREADY MADE (don't relitigate)

See `_MASTER_SPEC.md`'s own Decisions Log for the full list with rationale. Summary:

| Decision | Why |
|---|---|
| Self-contained architecture, no DrillWrapper/leaderboard/challenge/Capacitor | That ecosystem belongs to a different sibling app; porting it is a much larger undertaking than this pass and wasn't asked for |
| Delete rotate-gate entirely, both orientations genuinely playable | Portrait-blocking was actively preventing play; a game that only works one way you hold your phone isn't actually mobile-optimized |
| Fullscreen on Start-button click, not automatic | Matches `batch-processing`'s already-correct pattern; automatic/pointer-lock-triggered fullscreen doesn't apply since there's no pointer lock in this category |
| 45s for every drill | Matches the FPS category's already-settled duration; `rsvp-reader`'s Untimed mechanic is the one genuine redesign this forces |
| `batch-processing`, not `180-degree-awareness`, is the primary reference | It already solved the mobile/touch/orientation problem this whole task is about; 180 solves sound/scoring/SEO but is desktop-only |
| `concentration-grid`/`concentration-stamina`'s bespoke mechanic changes (combo removed, time-refill-on-clear, hearts for lives) do NOT propagate to other drills | Those are logic, specific to Concentration Grid's own grid-clearing loop, not shell. Only the countdown/accordion/fullscreen/flash/mobile-layout fixes are uniform — see `_MASTER_SPEC.md`'s SHELL vs. LOGIC section |
| `concentration-grid` and `concentration-stamina` are now the primary shell references, promoted above `batch-processing` | They're the only two in the category verified by an actual driven playthrough (headless browser), not just a clean `npx next build` — which both of the others also passed while still being unplayable |

---

## PART 7 — MISTAKES TO NOT REPEAT (carried over from the FPS project's own Part 7)

1. **Don't pull sound values from a shared synth library "on principle" without checking a
   real drill first.** `lib/drillAudio.js` is already correct and already used by
   `batch-processing` — just import it, don't re-derive it.
2. **Don't invent feedback events that don't exist in the references** (level-up chimes, combo
   fanfares, gold/cyan flashes). If it's not in `180-degree-awareness` or
   `batch-processing`, it doesn't belong in a migrated drill either.
3. **Don't assume a duration/difficulty constant from one drill transfers to another.**
   `ELITE_SCORE`, `POINTS_PER_LEVEL`, and hit-radius values are all calibrated to that specific
   drill's own points-per-hit and click geometry — recompute per drill, don't copy the number.
4. **Don't treat `concentration-grid`'s DrillWrapper imports as "someone started the right
   thing, finish it."** They point at infrastructure that isn't part of this repo's plan
   (see Decisions Log #1) — reverting them is correct, not a regression.
5. **`DrillCountdown` and `DrillAccordion` are dumb, fully-controlled components — they do
   NOT drive their own state.** Both `concentration-stamina` and `concentration-grid` were
   implemented calling `<DrillCountdown onComplete={handleCountdownComplete} />` — that prop
   doesn't exist; the component only ever renders whatever `value` it's given and has no
   internal timer. The result: the countdown froze forever (visually: a static colored ring,
   default green, with no digit) and the game never reached `'playing'` — this reads to a user
   as **"the drill doesn't start at all."** The correct pattern (already right in
   `AwarenessDrillClient.js` and `BatchProcessingClient.tsx`): the PARENT owns a
   `countdownValue` state and a `setTimeout` chain (3 → 2 → 1 → GO, 700ms apart) that calls
   the state setter itself, and the last timeout calls the "on complete" logic directly — no
   prop on `DrillCountdown` does this for you. Same story for `<DrillAccordion rules={...}
   about={...} faq={...} />` — that's not the component's API at all; it takes exactly one
   `id`/`title`/`isOpen`/`onToggle`/`children` per instance, so you render **three separate
   instances** with your own `openAccordion` state, same as every other converted drill.
   **Check every remaining drill's use of these two components against their actual prop
   signatures in `components/drill/DrillCountdown.js` / `DrillAccordion.js` before assuming a
   conversion pass got them right** — this exact mistake landed in two drills in a row.
6. **Fullscreen needs an explicit, working exit path, or everything below the drill box
   becomes permanently unreachable.** Both fixed drills had a "Exit Drill" button that was a
   plain `<Link>` (client-side navigation), which never calls `document.exitFullscreen()` —
   the Fullscreen API is bound to the document, and an SPA route change doesn't release it.
   Combined with the header/title/stat-cards/accordions/related-drills/footer being rendered
   *unconditionally* instead of `{!isFullscreen && (...)}` (as the reference drills do), this
   meant that once fullscreen engaged, that whole lower section became invisible AND
   unclickable for the rest of the session — which is exactly what "the FAQ/About/Instructions
   aren't expandable" turned out to be, on inspection. Every drill needs a real
   `handleExitDrill` (clears timers, calls `exitFullscreen()`, resets to `'start'`) and every
   post-box section wrapped in `{!isFullscreen && (...)}`.
7. **A hand-rolled flash is not the same as `.fx-flash-red`, even if it's red and briefly
   appears.** `concentration-grid` originally used
   `<div className="... bg-red-600/30 ... animate-ping" style={{ animationDuration: '300ms' }} />`
   — visually in the right ballpark, but `animate-ping`'s scale+fade loop reads as a pulse, not
   an impact, and it's a different implementation from every other drill in both categories.
   Always render exactly `<div className="fx-flash fx-flash-red" />`, no extra classes, no
   inline style — the keyframe in `globals.css` already does the right thing.
8. **Don't generalize a completed drill's mechanic changes into "the new house style."**
   After `concentration-grid` lost its combo mechanic and gained a time-refill-on-clear, the
   instinct is to assume that's now how cognitive drills work. It isn't — that was a specific
   request for that drill's specific loop. Only the shell (sound/countdown/accordions/
   fullscreen/flash/mobile-layout/HUD-chrome) is meant to be uniform; each drill's actual game
   design stays whatever it already was. The one true generalization from that pass: lives, if
   a drill already has them, render as `Heart` icons instead of colored dots (§6.3.1) — that's
   presentation, not mechanic.
9. **The three accordions need to actually touch, and actually say something.** A naive render
   leaves ~40px between them (flex `gap-6` plus the component's own `mt-4`) and 2-3 line
   rules/FAQ items that don't explain a drill's own distinguishing mechanic. Wrap the three in
   one container with the margin zeroed at the wrapper (`_MASTER_SPEC.md` §6.6), and write
   rules (3-4 items) / about (2-3 paragraphs) / FAQ (5+ pairs) that reference what's actually
   different about *this* drill, not generic cognitive-training boilerplate repeated 9 times.
