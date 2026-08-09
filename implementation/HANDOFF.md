# PROJECT HANDOFF — FPS DRILL OVERHAUL

**Purpose:** paste the prompt in Part 1 into a new chat. Everything else here is reference the
new session will read from disk itself.

**Last updated:** 2026-07-31 · after ad hoc Pro Flick Trainer polish + Micro-Correction plan written

---

## PART 1 — THE PROMPT (copy everything in the box)

```
I'm overhauling the FPS drills in this Next.js app (SkillDrills). We work in a fixed loop:

- YOU are the brain: architect, designer, decision-maker. You audit code, decide what's
  wrong, and write implementation plans. You do NOT write the drill code.
- ANTIGRAVITY CLI implements your plans. I relay them.
- I report back what it built. You review it against your plan, find what it missed or got
  wrong, and write a polish pass. We repeat until the drill is perfect.
- You take decisions on my behalf. If you see something wrong or something that could be
  better, decide it yourself and tell me. Don't ask permission for obvious calls.

START HERE — read these three files before doing anything:
1. implementation/HANDOFF.md          ← full project state, what's done, what's next
2. implementation/fps/_MASTER_SPEC.md ← the constitution every FPS drill must follow
3. AGENTS.md                          ← lazy-senior-dev rules (reuse > rewrite)

REFERENCE APP — read-only, NEVER modify:
"C:\Users\sangmesh\Desktop\global-drill-system-nextjs - Copy - Copy"
It's the mobile app whose sound, difficulty, and card UI we're matching. When you need to
check how something should behave, read ONE drill from it, not many — reading many costs
too many tokens. The canonical reference drill is:
app/drills/cognitive/processing-speed/reaction-time/EliteNeuroSwitchClient.js

Rules that keep tripping things up:
- Sound values come from that DRILL's inline synth, NOT from the app's lib/audioSynth.js.
  The drills don't use that library and its values are different.
- Red is the ONLY flash colour. No gold, no cyan, no level-up sound, no combo sound.
- Never reduce difficulty — not mid-session, not between sessions.
- No time penalties, no time rewards, no negative scoring.

Confirm you've read the three files and tell me the current state before we continue.
```

---

## PART 2 — WHERE THINGS ARE

| Path | What |
|---|---|
| `implementation/fps/_MASTER_SPEC.md` | **The constitution.** Sound, difficulty, layout, SEO, footer — every rule for all 16 FPS drills |
| `implementation/fps/180-degree-awareness/IMPLEMENTATION_PLAN.md` | Drill 1, original 9 changes |
| `implementation/fps/180-degree-awareness/POLISH_PASS_1.md` | Review 1 — silent audio, fullscreen, difficulty saturation |
| `implementation/fps/180-degree-awareness/POLISH_PASS_2.md` | Review 2 — corrected sounds, red-only flash, aggressive scaling |
| `- Copy - Copy/` (sibling folder) | **Reference app. READ ONLY.** |

---

## PART 3 — CURRENT STATE

### Shared modules — BUILT ✅

| File | Contains |
|---|---|
| `lib/drillAudio.js` | 5 canonical sounds + `chimeVoice()` + `playSpatialCue()` (180-only) |
| `lib/drillDifficulty.js` | `MAX_LEVEL=15`, `RESUME_FACTOR=0.65`, `getStartLevel`, `getNextLevel`, `getDifficultyProgress` |
| `lib/canvasFx.js` | `createBackdropCache`, `getCanvasDpr`, `drawPulseRing` |
| `components/drill/DrillFooter.js` | IG · FB · YT · X (Pinterest removed) |
| `lib/scoringEngine.js` | +`getFpsPerformancePct()` added |
| `lib/adaptiveDifficulty.js` | **DELETED** — tier system retired |

| `components/drill/DrillCountdown.js` | Shared 3-2-1-GO, used by all 3 drills |
| `components/drill/DrillAccordion.js` | Shared accordion, used by all 3 drills |

### Cleanup owed ⬜

- `getFpsPerformancePct` in `lib/scoringEngine.js` is now unused (replaced by
  `getFpsScoreGrade`). Delete it on the next pass through that file.

### Drill 1 — `180-degree-awareness` — COMPLETE ✅

All of Implementation Plan + Polish 1 + Polish 2 verified applied:

- Audio: `playGo` C5→G5 · `playPenalty` 220/165 sine · `chimeVoice` session end · `osc.connect(gain)` fixed
- `playLevelUp` / `playComboTier` deleted; gold/cyan flashes gone; **red only**
- `DRILL_DURATION = 45` · `POINTS_PER_LEVEL = 250` · `STORAGE_KEY = ..._v2`
- Difficulty curve driven by `getDifficultyProgress`, no clamps, reaches extremes at L15
- `hitPad` scales 12→5px · lateral `drift` from L10 with edge-bounce
- `resumeDrill()` restores fullscreen **then** pointer lock
- Sensitivity slider back on start card
- `adaptiveDifficulty.js` deleted, no dangling imports
- **Grade is score-based**: `getFpsScoreGrade(score, ELITE_SCORE=17000)`, sqrt curve. Score now
  carries a level multiplier (1.0×→1.5×) so high-level play isn't punished
- **SEO complete**: 5 schemas, FAQ schema === visible FAQ (15=15, no numbering),
  `opengraph-image.js` generating a verified 1200×630 PNG
- `npx next build` exits 0

### Drill 2 — `target-acquisition` — COMPLETE ✅

Implemented by Gemini CLI, then polished. Verified: `-2.0s` penalties gone, 15 continuous levels,
Bronze→Master ranks deleted, `getFpsScoreGrade(score, 18000)`, FAQ schema `diff` empty (8=8),
5 schemas, OG image verified 1200×630.

Polish applied directly by Claude — target rendering was flat and cheap-looking:
- Flat fill → offset radial gradient (highlight → body → deep rim) so targets read as lit spheres
- White rim floating 4px off the body → 2px warm rim light on the edge
- Dropped `shadowBlur`; wired `drawPulseRing`, which was imported but never called
- **Two traps avoided:** pulse phase seeded randomly (never from `t.id`, which encodes
  brightness and would leak the answer), and `t.val` baked into the ring colour (because
  `drawPulseRing` sets `globalAlpha` itself, which would have flattened the opacity cue)

### Drill 5 — `instant-response` — COMPLETE ✅

`implementation/fps/instant-response/IMPLEMENTATION_PLAN.md` — 17 defects, 16 steps. Implemented,
then reviewed and polished by Claude directly (no Antigravity pass needed for the polish).

Verified against the plan: the drill-breaking `flashDuration` floor bug (10ms — shorter than one
frame) was already fixed at implementation time (`Math.max(200, 550 - p*350)`). Reaction-speed
bonus and the deleted flash-onset sound — both justified exceptions in the plan — are present
exactly as specced.

Claude's polish pass found and fixed on top of that:
1. **E9 recurred a sixth time** — FAQ nested inside About despite the written rule. Split into
   its own top-level accordion, same fix as every other drill needed.
2. **FAQ text advertised a mechanic that doesn't exist** — both the visible copy and the
   `FAQPage` schema asked "why does this drill have time penalties?" The drill has none, only a
   combo reset. Rewrote the Q&A in both places, word-for-word identical.
3. **`RuleItem` had per-item colour badges** 180 doesn't have — reverted to the plain shared
   treatment so the two drills' "one product" visual language actually matches.

Then, per a second explicit request: **target visual reskinned to 180's exact glow-shell**
(dark core + `shadowBlur` glow + dot core + contracting lifetime ring — was a flat gradient
sphere before). **Anti-spam gate added** (`SPAM_CALM_WINDOW = 350ms`): continuous spam-clicking
now withholds the next exposure until the player stops, closing an exploit where holding the
mouse button guaranteed a hit in every exposure window regardless of real reaction speed.
**Sensitivity slider removed entirely** — this drill's target is fixed at screen-center, so
adjustable sensitivity was vestigial; deleted the control, its state, and its localStorage key
rather than leaving a frozen, unreachable setting.

### Drill 6 — `flick-shot-training` (Pro Flick Trainer) — PLAN WRITTEN, NOT IMPLEMENTED 📝

`implementation/fps/flick-shot-training/IMPLEMENTATION_PLAN.md` — 24 defects, 12 steps. The most
out-of-date file in the category — predates even the old single-source-of-truth pattern the
other five drills started from.

**Worst defect: the client renders a second, conflicting set of JSON-LD via `next/head`** on top
of `page.js`'s own separate schema set — two different `BreadcrumbList`s, two different
application schemas, two `FAQPage` blocks with **non-overlapping question sets**, and a duplicate
`<title>`/meta description. This isn't just under-optimized, it's actively confusing to search
engines today. Fix is first in the plan, ahead of the usual audio/difficulty/scoring order.

Also the category's only drill with **both** a time reward (`+1s` per hit) and a time penalty
(`-1s`, three separate sites) — the dual violation flagged in the original baseline audit.
Difficulty caps at level 7 (score-threshold branches, no continuous curve). Score stacks an
end-of-session accuracy bonus (+50 to +500) outside the normal grading model — deleted for
category consistency, nothing else does this. Also carries a rank system, loose storage keys, no
countdown, canvas-fillRect flash, no DPR cap, an in-box progress bar and fullscreen toggle button
(both banned), and 4 related-drill cards (one outside the FPS category) instead of 6.

One thing already right: the glow-shell target render (dark core + shadowBlur + dot core +
lifetime ring) already matches 180's construction almost verbatim — this file appears to predate
from the same original template 180 does. Plan says keep it, just retint to this drill's new
blue (`#3b82f6`) identity rather than rebuilding it.

**⚠️ SUPERSEDED BY DIRECT USER REQUEST (2026-07-31), outside the normal Antigravity flow:**
Sangmesh asked Claude to apply three fixes directly, ahead of full plan implementation:
1. Target reskinned from the 3D-look radial-gradient sphere to 180's flat 2D construction (dark
   `#050508` core + `shadowBlur` glow + dot core + contracting lifetime ring) — this is actually
   the *opposite* of what the plan above assumed (it thought the target already matched 180 and
   only needed retinting; it did not — it was the old gradient-sphere look, now fixed).
2. **Accent recoloured to green (`#00ff88` core / `#38bdf8` high-combo, emerald/teal UI chrome)
   instead of the plan's blue `#3b82f6`.** This directly overrides §"Accent colour: blue" above —
   treat blue as dead guidance for this drill going forward. Retinted: target, crosshair,
   explosions, breadcrumb, start-card badge/button, countdown accent, result-panel glow, rule
   badges, related-card hovers, `opengraph-image.js` `ACCENT`. Left blue where 180's own reference
   pattern keeps blue (Accuracy stat icon, Best Level mini-stat, About-accordion icon, Eye icon) —
   deliberately mirrored, not missed.
3. FAQ split out of the About accordion into its own top-level `id="faq"` section (closes part of
   defect #19 in the plan below, §8.6's requirement).

**Still not done** — the rest of the 24-defect plan (duplicate JSON-LD schema, 7-branch/level-7
difficulty cap, `+1s`/`-1s` dual time violation, rank system, loose storage keys, no countdown,
canvas-fillRect flash, no DPR cap, in-box progress bar, only 4 related cards) remains
unimplemented. Do not mark this drill COMPLETE until the rest of the plan lands — just don't
revert the three fixes above or reintroduce blue when picking the rest of it up.

### Drill 4 — `angle-hold-trainer` — COMPLETE ✅

Gemini avoided all 9 predicted bugs. Claude found and fixed four more:

1. **Peek direction inverted** — left cover spans 0-35%, so a left peeker must travel RIGHT to
   reach the lane. Both signs were backwards; every target slid *deeper into its own cover*.
2. **No occlusion** — targets draw after the backdrop, so they rendered *on top of* the strip.
   Added a lane clip so the target genuinely emerges from behind cover, glow included.
3. **Peek distance derived from `targetRadius`** — shrinking targets also emerged less,
   compounding two difficulty sources into one unreadable jump. Split into its own axis.
4. **`peekSpeed` was dead config** — declared in `getLevelConfig`, never read.

Plus: a crosshair-in-lane guard (you could otherwise shoot a target through solid cover while it
was still hidden), vertical spread widened to ±25%→±45% of height, the lane repainted pure black
with neutral grey cover strips (was slate blue across 70% of the canvas), and 180's glow-shell
target treatment with a lifetime ring showing the closing peek window.

**E9 recurred again** — FAQ nested inside About despite the written rule. Split out.

### Drill 3 — `recoil-control` — COMPLETE ✅

Implemented by Gemini, then bug-fixed by Claude. Three bugs found and fixed:
1. **Spray-discipline check tested `combo === 0`** — only the last bullet. Landing 29 hits and
   missing the 30th was flagged as failure; missing 29 and hitting one was not. Replaced with
   per-magazine hit-rate tracking (`hitsThisMagazine` / `DISCIPLINE_HIT_RATE`).
2. **Combo never reset on discipline failure** — the entire replacement penalty was missing.
3. **Untracked reload `setTimeout`** fired on the result screen and could clear a fresh magazine
   mid-countdown. Now ref-tracked and cleared on end/exit/unmount.

### Category-wide cleanup done alongside drill 3

- 180 was still using **hand-rolled accordion markup** after `DrillAccordion` was extracted —
  refactored onto the shared component, `ChevronDown` import removed
- **FAQ split into its own top-level accordion** in all three drills (was nested inside About)
- Fixed a bug in `DrillAccordion` itself: `animate-in fade-in` is a **silent no-op** in this repo
  (no `tailwindcss-animate` plugin) → swapped to `fx-fade-up`
- `_MASTER_SPEC.md` §1.8 updated: **3** accordions, not 4; FAQ never nested; no hand-rolled markup

`implementation/fps/recoil-control/IMPLEMENTATION_PLAN.md` — 16 defects, 11 execution steps.
Worst: the category's **only negative score** (`-50 PTS`), a `-2s` penalty, no `bestLevel`
persisted at all (so adaptive resume can't work), and FAQ schema 5 vs 15 visible.

Three judgement calls documented in the plan: the spray-discipline punishment becomes intrinsic
(combo reset + reload) rather than confiscated points; the per-bullet fire sound is **deleted**
because 30 tones per magazine would mask the hit cue; and `recoilMult` (1.0→1.6) becomes the
drill-specific top-end difficulty axis.

### Drill 7 — `micro-correction-precision` — PLAN WRITTEN, NOT IMPLEMENTED 📝

`implementation/fps/micro-correction-precision/IMPLEMENTATION_PLAN.md` — 30 defects, 12 steps.
Picked as the next drill **by inbound-link count, not list order**: 7 already-completed drills
(180, flick-shot, instant-response, angle-hold, recoil-control, target-acquisition,
target-prioritization) all carry a "Micro Flicks" Related-Drill card pointing here — more than
double any other untouched drill — so this page is the one real users hit most often right now.

**Worst defect:** a flat `+8` hit-forgiveness pad that never scales with level, while the micro
target's radius shrinks to ~3.5px at L15 — the pad ends up **more than double the target**,
silently defeating the entire precision curve the drill claims to train. This is
`_MASTER_SPEC.md` §1.2's named warning about flat pads, found in the wild.

Also: the category's first **triple**-conflicting JSON-LD (page.js's 5-question FAQ + a dead
`next/head` client-side block with 14 different questions + a 15-question visible list, all
different — worse than flick-shot-training's already-bad double); the second drill (after
flick-shot) with **both** a time reward and time penalty in the same file, neither previously
in the master spec's known list; two competing grade systems where the "real" one shown on screen
is the unfair absolute-threshold rank and the fairer scoring-engine-based one is dead code; and a
genuine logic bug — `getSuggestion()`'s coaching-advice branch compares a counter to itself
(`missedAttempts` passed as both `timeouts` and `missed`), making its first branch permanently
unreachable.

One thing already right, explicitly preserved in the plan: this is the only drill in the category
with a **two-stage click chain** (large Anchor → small Micro, precision-scored) — that's its real
differentiator from `flick-shot-training` and the plan keeps it, along with its existing green/cyan
two-target colour language and its already-correct cyan/sky UI chrome (no retint needed, unlike
flick-shot's blue mixup).

### Remaining 9 FPS drills ⬜

`anti-strafe-jitter-duel` · `anti-zigzag-movement-trainer` · `flow-state` ·
`pro-smooth-pursuit` · `reactive-sphere-tracking` · `strafe-tracking` ·
`target-prioritization` · `target-switching-swarm` · `vertical-air-track`

Five drills are done (`180-degree-awareness`, `target-acquisition`, `recoil-control`,
`angle-hold-trainer`, `instant-response`); `flick-shot-training` and `micro-correction-precision`
each have a plan written but not yet fully implemented (above — flick-shot has partial ad hoc
polish applied directly). **None of the remaining 9 have been touched.** Baseline audit, originally
taken across all 16 before any work started (numbers below are stale for the seven drills above,
current for the rest):

| Issue | Count |
|---|---|
| Inline `AudioSynthesizer` class (12) or raw `audioCtx` (4) | **16 / 16** |
| Distinct sound method names to collapse into 5 | **28** |
| Missing 3-2-1 countdown | **15 / 16** |
| Missing instruction accordions | **15 / 16** |
| Has Pinterest in footer | **15 / 16** |
| Time penalties (`-2.0s`, `-1.5s`, `-1.0s`, `-0.5s`) | 7 drills |
| Time reward (`+1s`) | `flick-shot-training` |
| Negative score (`-50 PTS`) | `recoil-control` |

---

## PART 4 — THE WORKFLOW

```
Claude audits code
      ↓
Claude writes IMPLEMENTATION_PLAN.md
      ↓
Sangmesh → Antigravity CLI implements
      ↓
Sangmesh reports back
      ↓
Claude reviews vs plan → writes POLISH_PASS_N.md
      ↓
repeat until drill is perfect → next drill
```

**Roles:** Claude decides and reviews, never writes drill code. Antigravity writes code, never
decides. Sangmesh relays and playtests.

---

## PART 5 — NEXT STEPS

1. **Implement `flick-shot-training`.** Plan is written
   (`implementation/fps/flick-shot-training/IMPLEMENTATION_PLAN.md`, 24 defects) — 3 of them
   already applied directly (see the ⚠️ note in Part 3), the rest still open, most urgently the
   duplicate-JSON-LD fix and the dual `+1s`/`-1s` timer violation. Relay the remainder to
   Antigravity, then report back for review.
2. **Implement `micro-correction-precision`.** Plan is written
   (`implementation/fps/micro-correction-precision/IMPLEMENTATION_PLAN.md`, 30 defects). Picked
   ahead of the other 9 untouched drills because it's the most-linked-to page in the category
   right now (see Part 3). Relay it to Antigravity, then report back for review.
3. **Playtest the five completed drills** if not already done — pacing knobs flagged per-drill
   are the only open questions on any of them (e.g. 180's `POINTS_PER_LEVEL`, worked in its own
   plan). No known correctness bugs remain in 180, target-acquisition, recoil-control,
   angle-hold-trainer, or instant-response.
4. **After both pending plans land, pick the next drill from the remaining 9** (Part 3 above).
   No fixed order has been set for these — none of the original "worst first" list items
   (`-2.0s`, `-50 PTS`, `-1.5s`, `+1s`) remain among them. Consider ranking by inbound
   Related-Drill link count again (the method used to pick `micro-correction-precision`) rather
   than picking arbitrarily — it's a concrete, defensible signal for real-user impact.

---

## PART 6 — DECISIONS ALREADY MADE (don't relitigate)

| Decision | Why |
|---|---|
| Retire Bronze→Radiant tiers entirely | Had `shouldDemote()` which made drills easier. Multipliers were dead code — never wired to gameplay |
| Footer = IG · FB · YT · **X** | Pinterest removed. Telegram was a slip of the pen — X/Twitter stays |
| Sensitivity slider on **start card** | It's pre-flight calibration, not a setting. Buried in an accordion, new players start miscalibrated and never find out why |
| One `playPenalty()` for wrong-click + miss + timeout | Reference app aliases `playMiss` and `playWrongBoom` to it |
| **Red flash only**, no level-up/combo feedback | A chime + gold flash is a *notification*. Difficulty rising must be **felt** (smaller, faster targets), never announced |
| Duration 45s, storage key `_v2` | Last 15s of 60s measured fatigue, not skill. Key bumped because a 45s run scores ~25% less, so old bests would be unbeatable |
| Grade = `getGrade(getFpsPerformancePct(...))` | 50% accuracy + 30% reaction + 20% level. Stops players farming S+ with slow careful shots at level 1 |
| `playSpatialCue` kept in 180 **only** | The stereo pan IS the skill in a 180 drill — it's the only cue for which way to spin |

---

## PART 7 — MISTAKES MADE (so they aren't repeated)

1. **Sound values pulled from `lib/audioSynth.js` instead of a drill's inline synth.**
   The reference app's drills don't use that library. `playGo` and `playPenalty` came out wrong
   and had to be re-specced. → **Always read a real drill.**
2. **Specced a level-up sound + gold flash that don't exist in the reference app.** Added in
   Polish 1, deleted in Polish 2. → **Don't invent events; verify against the reference first.**
3. **Moved the sensitivity slider off the start card.** Wrong — it's calibration, not config.
   Reversed. → **Ask what a control is FOR before deciding where it lives.**
4. **Set `POINTS_PER_LEVEL` from our own scoring scale without comparing to the reference's
   pacing.** Landed 4× too slow and felt boring. → **Compare hits-per-level, not raw numbers.**
