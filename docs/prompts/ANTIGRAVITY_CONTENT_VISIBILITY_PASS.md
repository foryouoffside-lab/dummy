# Brief: Content Visibility Pass

**Status:** not started, except `/drills/fps/180-degree-awareness`, which was
partly edited before this brief existed and **has a regression to repair first —
see §4.**

**Three parts:**
- **A** — delete two hidden `sr-only` keyword sections (2 edits).
- **B** — remove the start-card rules rows, keeping the content in the drill's
  existing expandable instructions (65 drills).
- **C** — remove the start-card best-stats row (66 drills).

**Cadence:** ONE unit of work per pass. Never batch. See §0.

---

## 0. Ground rules — read before anything else

1. **One at a time.** Part A is two edits. Parts B and C are one drill per pass.
   Do one, verify it, report it, stop. Never "apply the same change to the
   remaining N files" — the drills differ in state shape, prop wiring and JSX
   structure, and a bulk find-and-replace produces dozens of broken files
   reviewed as a single change.
2. **B and C are done together for a given drill**, in one pass, since both edit
   the same `<FpsStartCard ... />` call. Do not make two passes over one file.
3. **Wait for approval between drills.** Do not start the next one unprompted.
4. **Nothing is deleted before it is confirmed to exist elsewhere.** Part B is a
   *removal of a duplicate*, not a removal of content. See §B2 — you must diff
   before you delete.
5. **Never invent a number, a claim or a statistic.** Every figure you write must
   come from a constant in the code you just read. If two pieces of copy
   disagree, the code wins, and you say so in your report.
6. **Verify in the rendered HTML, not the source.** This repo has twice shipped
   content that looked right in the browser and was absent from the HTML —
   `FpsStartCard` silently dropped `rules` and `stats`, and `DrillGuide` dropped
   whole FAQ panels, both because an undeclared prop was discarded without error.
7. **Build with `npx next build`, never `npm run build`.** The `postbuild` hook
   pings the live Bing / Yandex / Seznam IndexNow endpoints for real.
8. **If reality does not match this brief, stop and ask.** Do not improvise a
   variant and carry it across the remaining drills.

---

## 1. The rule this whole pass is built on

Google sorts page content into three tiers:

| Tier | State | Indexed? |
| :-- | :--- | :--- |
| 1 | Visible on the page | Yes, normally |
| 2 | In the HTML, collapsed, visitor can expand it | **Yes, normally — no penalty** |
| 3 | In the HTML, visitor can *never* reveal it | **No — and it is a spam-policy violation** |

The line between tier 2 and tier 3 is **not** whether pixels are on screen. It is
**whether a real visitor can reach the content by a normal action.**

- An accordion the visitor can open is tier 2, fully indexed. Settled — Google
  has said so since mobile-first indexing.
- Text no visitor can ever see is tier 3: "hidden text" under Google's spam
  policies. White-on-white, off-screen positioning, `font-size: 0`, and `sr-only`
  used as a keyword container all land here.

**The one exception:** `sr-only` is legitimate when it genuinely serves
accessibility — a label for an icon-only button, "Loading, please wait", a skip
link, an `aria-live` announcement. It stops being legitimate the moment it holds
marketing or keyword copy that sighted visitors do not get.

**The repo already implements tier 2 correctly. Do not change it.**
`components/drill/DrillGuide.js:48` and `components/drill/DrillAccordion.js:43`
render panel bodies into the DOM always and collapse them with the `hidden`
attribute — never `{isOpen && ...}`. The comments at `DrillGuide.js:17-24`
explain why. **This is the reason Part B is safe:** the drill's instructions
accordion is already crawlable while collapsed.

---

## PART A — Delete hidden text

Two `sr-only` sections hold keyword copy no visitor can reach. Both **duplicate
claims already visible on the same page**, so deleting them loses nothing.

### A1. `app/HomePageClient.js` lines 254-261

```jsx
{/* SEO Structured Content */}
<section className="sr-only" aria-label="Platform description">
  <h2>SkillDrills - Free Brain Training and FPS Aim Trainer Platform</h2>
  <p>SkillDrills is a free online training platform offering {totalDrillsCount}
     interactive drills across {totalCategoriesCount} categories: ...</p>
</section>
```

**Delete the whole `<section>`, and the `{/* SEO Structured Content */}` comment
above it.** The visible hero at line 282 already says "Access {totalDrillsCount}
zero-latency drills across {totalCategoriesCount} performance categories", and
the stat tiles at lines 305-309 show both numbers.

### A2. `app/drills/layout.js` lines 33-40

```jsx
<section className="sr-only" aria-label="Drills section description">
  <h2>SkillDrills Training Platform</h2>
  <p>Browse {DRILLS.length}+ free interactive training drills organized into 8
     categories: ...</p>
</section>
```

**Delete the whole `<section>`.** The visible `/drills` subtitle at
`app/drills/DrillsDirectoryClient.js:113` already says "{totalDrills} free
training drills across 8 categories. No sign-up, no installs, instant start."

This is the worse of the two: it sits in the **layout**, so the same hidden
paragraph and invisible `<h2>` are injected into every page under `/drills/` —
all 80+ drill pages.

Afterwards check whether the `DRILLS` import is still used in the file; remove it
if not.

### A3. Do NOT touch these — they are correct accessibility uses

- `components/DrillLoading.js:18` — `<span className="sr-only">Loading SkillDrills. Please wait.</span>`
- `components/HeroReactionTest.js:106` — an `aria-live="polite"` announcement region
- Every `aria-hidden="true"` on a decorative icon (13 of them)
- Every `opacity-0 group-hover:opacity-100` — decorative hover effects on empty
  `<div>`s, no text involved

### A4. Confirm nothing else is hidden

```
grep -rn "sr-only\|text-\[0\|-left-\[9999\|text-indent\|visibility:\s*hidden" app components --include="*.js" --include="*.tsx"
```

For each hit, ask the tier-2/tier-3 question: *can a visitor reach this?* If yes,
leave it. If no, and it is not an accessibility affordance, **report it — do not
delete anything beyond A1/A2 without approval.**

---

## PART B — Remove the start-card rules rows (content stays)

### B1. Read this before touching anything

**The rules are NOT being deleted from the site.** Every drill already has an
expandable panel that carries this content:

```jsx
<DrillAccordion
  id="rules"
  title="Drill Instructions & Scoring System"
  isOpen={openAccordion === 'rules'}
  onToggle={...}
>
```

That accordion renders its body into the DOM always and hides it with the
`hidden` attribute — tier 2, fully crawlable while collapsed. All 66 drills have
it. 37 populate it from a `RULES_ITEMS` constant; 29 use inline JSX. The §6
ledger names the source per drill.

So the start-card `rules` prop is a **second copy** of content that already lives
in a better place. Part B removes the duplicate from the modal, after confirming
the accordion really covers it.

**65 of the 66 drills have a `rules` prop.** `/drills/fps/180-degree-awareness`
already has none — for that drill, do Part C only.

### B2. The diff step — mandatory, do this before deleting

Put the two lists side by side and check that **every fact** in the start-card
`rules` appears in the accordion. They are usually close but not identical.

Worked example, `/drills/physical/fitness/speed-drill`:

Start card:
| Title | Text |
| :--- | :--- |
| Click Shrinking Targets (+100 PTS) | +100 PTS × Combo × Level multiplier (+0.6s per hit) |
| Miss & Expiry Reset | Missing clicks or letting targets expire resets your combo multiplier |

`RULES_ITEMS` accordion:
| Title | Text |
| :--- | :--- |
| Target Acquisition | Click moving shrinking targets before radius decays to zero (+0.6s per hit). |
| Combo Multiplier | Chain unbroken target hits to build combo multiplier up to 3.0x max. |
| Level Progression | Score increases level continuously. Target velocity & shrink rate accelerate dynamically. |
| Miss / Target Expiry | Missing a target or letting target shrink to zero resets combo streak (and deducts 0.8s if enabled in settings). |

The accordion is a superset **except for one fact**: the `+100 PTS × Combo ×
Level` scoring formula appears only on the card.

**So for this drill: add that fact to `RULES_ITEMS` first, then delete the prop.**
For example, extend the "Target Acquisition" text to end with `Each hit scores
100 points multiplied by your combo and level.` — verified against the scoring
constants in the client file.

If the accordion already covers everything, add nothing and go straight to §B3.

### B3. Delete the `rules` prop

Remove the whole `rules={[...]}` prop from the `<FpsStartCard ... />` call.

`FpsStartCard` declares `rules = null` behind a `{rules?.length ? ... : null}`
guard, and `FpsStartCard.d.ts` types it `rules?`, so omitting it is safe and
type-clean. **Do not edit `FpsStartCard.js` or `FpsStartCard.d.ts`** — the
component must keep supporting the prop for every drill not yet converted.

### B4. Conditional rule text — 34 drills

34 drills build rule text from a ternary on a user setting
(`penaltyEnabled` and similar) that is `false` on the server and only set from
`localStorage` after mount. The §6 ledger flags them.

You are deleting that code, so the ternary disappears with it. **The point is
what to check first:** confirm the accordion states the same thing in a
settings-neutral way before you delete. Speed Drill's already does — *"(and
deducts 0.8s if enabled in settings)"*. If a drill's accordion does not mention
the setting at all, add a settings-neutral sentence in the §B2 step. **Never
introduce a settings ternary into the accordion copy.**

### B5. Clean up imports

Icons named only in the deleted `rules` array become unused and will trip lint.
Check each one (`Target`, `Zap`, `Flame`, …) for other uses in the file first —
several are also used by `stats`, the accordion, or the canvas HUD, and removing
those breaks the build. Note that Part C removes `stats` in the same pass, so
check against the file's *final* state.

---

## PART C — Remove the start-card best-stats row

### C1. What to remove

All 66 drills pass a three-cell personal-best row to the start card:

```jsx
stats={[
  { icon: Trophy, label: 'Best Score', value: bestScore, color: 'text-white', accent: 'slate' },
  { icon: Flame, label: 'Best Combo', value: `${bestCombo}x`, color: 'text-emerald-400', accent: 'emerald' },
  { icon: TrendingUp, label: 'Best Level', value: `Lv. ${bestLevel}`, color: 'text-blue-400', accent: 'blue' },
]}
```

**Delete the whole `stats={[...]}` prop.** Same guard as `rules` — `stats = null`
with a `{stats?.length ? ... : null}` check and a `stats?` type — so omitting it
is safe. Again, do not edit `FpsStartCard.js` or the `.d.ts`.

### C2. Known consequence — report it, do not silently fix it

These values are read from `localStorage`, so they render as `0 / 0x / Lv. 1` on
the server and for every first-time visitor. They carry no SEO value.

But **removing the row is not always lossless.** On
`/drills/fps/180-degree-awareness`, the header "Live Stat Cards" row shows Score,
Time, Accuracy and **Best Score** — so Best Score survives, while **Best Combo
and Best Level lose their only display on the page** (verified: they appear
nowhere else, and the result card carries only an `isNewBest` flag, not the
values).

The decision to remove the row anyway has been made. Your job is to **report,
per drill, which best-values lose their only display.** Do not add them to the
header, and do not invent a new panel for them, unless asked.

### C3. Do not rip out the persistence

`bestScore` / `bestCombo` / `bestLevel` are still written to `localStorage` and
still drive the `isNewBest` flag. **Leave all of that alone.** After deleting the
prop, a state variable may become write-only and trigger an unused-variable lint
warning. If that happens, **report the warning** — do not "fix" it by deleting
the state, the setter, or the storage logic.

---

## 2. Verification — all must pass before you report a unit done

1. **It compiles.** `npx next build` — never `npm run build` (§0.7).
2. **The rules survive in the HTML.** With the dev server running, grep the
   response for a phrase that exists only in the accordion copy, **with the
   accordion still collapsed**:
   ```
   curl -s http://localhost:3000/drills/physical/fitness/speed-drill | grep -c "resets combo streak"
   ```
   Must be ≥ 1. Choose a phrase that does *not* also appear in the `<title>`, the
   meta description or the JSON-LD, or you are matching schema and proving
   nothing. **If this returns 0, stop and revert — the content is gone.**
3. **The card is correct.** Load the page: the start card shows icon, title,
   subtitle and the Start button, with no rules rows and no stats row. Press
   Start — the drill runs. Open the instructions accordion — the rules are there.
4. **No new console errors, no hydration warning.** Report any lint warning
   raised by §C3.

For Part A, replace check 2 with: the deleted text is **gone** from the HTML, and
the visible equivalent copy is still present.

---

## 3. Report format

Per unit, report exactly:

- What you changed (file and route).
- **Part B:** the side-by-side diff from §B2, and any fact you had to add to the
  accordion before deleting the prop.
- **Part C:** which best-values lose their only display on this drill.
- Any number that disagreed between the old copy and the code constants.
- All four verification results, including the `grep -c` count.
- Which unit is next.

Then **stop and wait for approval.**

---

## 4. Prior work already on disk — read before starting

`/drills/fps/180-degree-awareness` was edited in an earlier session, **before this
brief existed**, and the working tree still holds those uncommitted changes. Three
things happened there:

1. **The `rules` prop was removed from the start card.** Correct, and it is why
   that drill's ledger row shows `—` under "Card rules".
2. **The hand-rolled FAQ accordion was removed from the client.** This is
   **fine — it was relocated, not lost.** `page.js:262` now passes
   `faqs: faqSchema.mainEntity.map(...)` into `guideProps`, so `DrillGuide`
   renders the FAQ panel from the same object that generates the JSON-LD.
   `FAQ_ITEMS` is gone from the client with no orphan left behind. Schema and
   visible answers can no longer drift apart. **Do not revert this.**
3. **A rule was lost.** The §B2 diff step was not done. Two rules were deleted
   from the card and only one is covered by `RULES_ITEMS`:

   | Deleted from card | In `RULES_ITEMS`? |
   | :--- | :--- |
   | `Hit Targets (+100 PTS)` — chain hits, combo to 3.0x | Yes — "Successful Hit (+100 PTS)" |
   | `Failure Rule` — `Miss / Timeout → Combo Reset`, `-0.8s` when enabled | **No** |

   Nothing in `AwarenessDrillClient.js` or `page.js` tells a player that missing
   resets the combo, or that a penalty exists. `TIME_PENALTY = 0.8` is in the
   code at line 39 and is explained nowhere.

**This is the exact failure §B2 exists to prevent.** The two lists look similar
enough to seem safe to delete, but the halves that do not overlap are real
content. Treat it as the worked counter-example.

---

## 5. Order of work

1. **Fix the `180-degree-awareness` regression.** Add a third entry to
   `RULES_ITEMS` in `app/drills/fps/180-degree-awareness/AwarenessDrillClient.js`,
   settings-neutral per §B4:

   ```js
   { title: "Miss / Timeout", text: "Missing a target or letting one time out resets your combo streak. If the time penalty is enabled in settings, it also costs you 0.8 seconds." }
   ```

   Verify against `TIME_PENALTY` on line 39. Do Part C for this drill in the same
   pass — the `stats` prop is still present. Then stop and report.
2. **A1** — `HomePageClient.js` hidden section.
3. **A2** — `app/drills/layout.js` hidden section.
4. **A4** — report the sweep results.
5. **`/drills/physical/fitness/speed-drill`** — Parts B and C together. This is
   the reference implementation, and the one drill whose §B2 diff is already
   worked out above. Do not touch the next drill until a human has approved it.
6. Then one drill per pass down the §6 ledger.

---

## 6. Ledger

Tick a row only after every check in §2 passes.

- **Card rules** — how many rows the start card passes. `—` means no `rules`
  prop; that drill is Part C only.
- **Rules accordion source** — the constant the `id="rules"` accordion maps over,
  or `inline JSX` if the content is written directly in the markup.
- **Rules conditional on** — the setting driving ternaries in the card's rules.
  Those need the §B4 check.

| # | Route | Client file | Card rules | Rules accordion source | Stats row | Rules conditional on | Done |
| :-- | :--- | :--- | :-- | :--- | :-- | :--- | :-- |
| 1 | `/drills/cognitive/attention/concentration-stamina` | `ConcentrationStaminaClient.js` | 3 | `RULES_ITEMS` | yes | static | ☐ |
| 2 | `/drills/cognitive/attention/divided-attention` | `DividedAttentionClient.js` | 2 | `RULES_ITEMS` | yes | `penaltyEnabled` | ☐ |
| 3 | `/drills/cognitive/attention/multi-tasking` | `DualTargetFlowClient.js` | 2 | `RULES_ITEMS` | yes | `penaltyEnabled` | ☐ |
| 4 | `/drills/cognitive/focus/concentration-grid` | `ConcentrationGridClient.js` | 2 | `RULES_ITEMS` | yes | static | ☐ |
| 5 | `/drills/cognitive/focus/distraction-fighter` | `DistractionFighterClient.js` | 2 | `RULES_ITEMS` | yes | `penaltyEnabled` | ☐ |
| 6 | `/drills/cognitive/processing-speed/reaction-time` | `EliteNeuroSwitchClient.js` | 2 | `RULES_ITEMS` | yes | `penaltyEnabled` | ☐ |
| 7 | `/drills/cognitive/processing-speed/rsvp-reader` | `RSVPReaderClient.js` | 2 | `RULES_ITEMS` | yes | static | ☐ |
| 8 | `/drills/cognitive/processing-speed/symbol-matching` | `SymbolMatchingClient.js` | 2 | `RULES_ITEMS` | yes | `penaltyEnabled` | ☐ |
| 9 | `/drills/fps/180-degree-awareness` | `AwarenessDrillClient.js` | — | `RULES_ITEMS` | yes | n/a | ☐ |
| 10 | `/drills/fps/angle-hold-trainer` | `AngleHoldClient.js` | 2 | `RULES_ITEMS` | yes | `penaltyEnabled` | ☐ |
| 11 | `/drills/fps/anti-strafe-jitter-duel` | `AntiStrafeJitterClient.js` | 2 | `RULES_ITEMS` | yes | `penaltyEnabled` | ☐ |
| 12 | `/drills/fps/anti-zigzag-movement-trainer` | `AntiZigzagClient.js` | 2 | `RULES_ITEMS` | yes | `penaltyEnabled` | ☐ |
| 13 | `/drills/fps/flick-shot-training` | `ProFlickClient.js` | 2 | `RULES_ITEMS` | yes | `penaltyEnabled` | ☐ |
| 14 | `/drills/fps/flow-state` | `FlowInductionClient.js` | 2 | `RULES_ITEMS` | yes | `penaltyEnabled` | ☐ |
| 15 | `/drills/fps/instant-response` | `InstantResponseClient.js` | 2 | `RULES_ITEMS` | yes | `penaltyEnabled` | ☐ |
| 16 | `/drills/fps/micro-correction-precision` | `MicroCorrectionClient.js` | 2 | `RULES_ITEMS` | yes | `penaltyEnabled` | ☐ |
| 17 | `/drills/fps/pro-smooth-pursuit` | `ProSmoothPursuitClient.js` | 2 | `RULES_ITEMS` | yes | `penaltyEnabled` | ☐ |
| 18 | `/drills/fps/recoil-control` | `RecoilControlClient.js` | 3 | `RULES_ITEMS` | yes | `penaltyEnabled` | ☐ |
| 19 | `/drills/fps/strafe-tracking` | `StrafeTrackingClient.js` | 2 | `inline JSX` | yes | `penaltyEnabled` | ☐ |
| 20 | `/drills/fps/target-acquisition` | `TargetAcquisitionClient.js` | 2 | `RULES_ITEMS` | yes | `penaltyEnabled` | ☐ |
| 21 | `/drills/fps/target-prioritization` | `TargetPrioritizationClient.js` | 4 | `RULES_ITEMS` | yes | `penaltyEnabled` | ☐ |
| 22 | `/drills/fps/target-switching-swarm` | `TargetSwitchingSwarmClient.js` | 2 | `RULES_ITEMS` | yes | `penaltyEnabled` | ☐ |
| 23 | `/drills/fps/vertical-air-track` | `VerticalAirTrackClient.js` | 3 | `RULES_ITEMS` | yes | `penaltyEnabled` | ☐ |
| 24 | `/drills/memory/short-term-memory/color-sequence` | `ColorSequenceClient.js` | 2 | `inline JSX` | yes | static | ☐ |
| 25 | `/drills/memory/short-term-memory/digit-span` | `DigitSpanClient.js` | 2 | `inline JSX` | yes | static | ☐ |
| 26 | `/drills/memory/short-term-memory/word-recall` | `WordRecallClient.js` | 2 | `inline JSX` | yes | static | ☐ |
| 27 | `/drills/memory/spatial-memory/grid-memorization` | `GridMemorizationClient.js` | 2 | `inline JSX` | yes | static | ☐ |
| 28 | `/drills/memory/spatial-memory/object-location` | `ObjectLocationClient.js` | 2 | `inline JSX` | yes | static | ☐ |
| 29 | `/drills/memory/spatial-memory/path-tracing` | `PathTracingClient.js` | 2 | `inline JSX` | yes | static | ☐ |
| 30 | `/drills/memory/working-memory/n-back` | `NBackClient.js` | 2 | `inline JSX` | yes | static | ☐ |
| 31 | `/drills/motor/hand-eye-coordination/aim-trainer` | `AimTrainerClient.js` | 2 | `RULES_ITEMS` | yes | `penaltyEnabled` | ☐ |
| 32 | `/drills/motor/hand-eye-coordination/drag-and-drop` | `DragAndDropClient.js` | 2 | `RULES_ITEMS` | yes | static | ☐ |
| 33 | `/drills/motor/hand-eye-coordination/precision-flick-shot` | `PrecisionFlickShotClient.js` | 2 | `RULES_ITEMS` | yes | `penaltyEnabled` | ☐ |
| 34 | `/drills/motor/movement-speed/finger-sequencing` | `FingerSequencingClient.js` | 2 | `inline JSX` | yes | `penaltyEnabled` | ☐ |
| 35 | `/drills/motor/movement-speed/keyboard-recognition` | `KeyboardRecognitionClient.js` | 2 | `RULES_ITEMS` | yes | static | ☐ |
| 36 | `/drills/motor/movement-speed/rapid-tapping` | `RapidTappingClient.js` | 2 | `inline JSX` | yes | static | ☐ |
| 37 | `/drills/motor/precision-control/steady-hand` | `SteadyHandClient.js` | 2 | `inline JSX` | yes | static | ☐ |
| 38 | `/drills/motor/precision-control/tracing` | `TracingClient.js` | 2 | `inline JSX` | yes | static | ☐ |
| 39 | `/drills/physical/balance-training/stability-challenge` | `StabilityChallengeClient.js` | 2 | `RULES_ITEMS` | yes | static | ☐ |
| 40 | `/drills/physical/coordination/complex-pattern` | `ComplexPatternClient.js` | 2 | `RULES_ITEMS` | yes | static | ☐ |
| 41 | `/drills/physical/coordination/cross-body-movement` | `CrossBodyMovementClient.js` | 2 | `RULES_ITEMS` | yes | static | ☐ |
| 42 | `/drills/physical/coordination/dynamic-grid-evasion` | `DynamicGridEvasionClient.js` | 2 | `RULES_ITEMS` | yes | static | ☐ |
| 43 | `/drills/physical/fitness/agility-ladder` | `MotorSequencingClient.js` | 2 | `RULES_ITEMS` | yes | static | ☐ |
| 44 | `/drills/physical/fitness/jump-sequence` | `JumpSequenceClient.js` | 2 | `RULES_ITEMS` | yes | static | ☐ |
| 45 | `/drills/physical/fitness/speed-drill` | `SpeedDrillClient.js` | 2 | `RULES_ITEMS` | yes | `penaltyEnabled` | ☐ |
| 46 | `/drills/physical/reflex-training/drop-catch` | `DropCatchClient.js` | 2 | `RULES_ITEMS` | yes | `penaltyEnabled` | ☐ |
| 47 | `/drills/physical/reflex-training/peripheral-threat-sweeper` | `PeripheralThreatSweeperClient.js` | 2 | `RULES_ITEMS` | yes | `penaltyEnabled` | ☐ |
| 48 | `/drills/physical/reflex-training/quick-dodge` | `QuickDodgeClient.js` | 2 | `RULES_ITEMS` | yes | static | ☐ |
| 49 | `/drills/physical/reflex-training/reaction-chain` | `ReactionChainClient.js` | 2 | `RULES_ITEMS` | yes | static | ☐ |
| 50 | `/drills/reaction-speed/barrier-sequence-pursuit` | `BarrierSequencePursuitClient.tsx` | 2 | `inline JSX` | yes | `penaltyEnabled` | ☐ |
| 51 | `/drills/reaction-speed/fps-tracking-trainer` | `FPSTrackingTrainerClient.tsx` | 2 | `inline JSX` | yes | `penaltyEnabled` | ☐ |
| 52 | `/drills/reaction-speed/market-doors-pursuit` | `MarketDoorsPursuitClient.tsx` | 2 | `inline JSX` | yes | `penaltyEnabled` | ☐ |
| 53 | `/drills/reaction-speed/reaction-game` | `ReactionSimulatorClient.tsx` | 2 | `inline JSX` | yes | `penaltyEnabled` | ☐ |
| 54 | `/drills/reaction-speed/reaction-time-test` | `ReactionTimeTestClient.tsx` | 3 | `inline JSX` | yes | static | ☐ |
| 55 | `/drills/reaction-speed/reflex-training-drill` | `ReflexTrainingDrillClient.tsx` | 2 | `inline JSX` | yes | `penaltyEnabled` | ☐ |
| 56 | `/drills/reaction-speed/saccadic-gallery` | `SaccadicGalleryClient.tsx` | 2 | `inline JSX` | yes | `penaltyEnabled` | ☐ |
| 57 | `/drills/reaction-speed/visual-tracking-speed-test` | `VisualTrackingSpeedTestClient.tsx` | 2 | `inline JSX` | yes | `penaltyEnabled` | ☐ |
| 58 | `/drills/visual/depth-perception/distance-judgment` | `DistanceJudgmentClient.js` | 2 | `inline JSX` | yes | static | ☐ |
| 59 | `/drills/visual/reaction-speed/go/no-go` | `ChromaSyncClient.js` | 2 | `inline JSX` | yes | static | ☐ |
| 60 | `/drills/visual/reaction-speed/light-reaction` | `StrobeLatencyClient.js` | 2 | `inline JSX` | yes | `penaltyEnabled` | ☐ |
| 61 | `/drills/visual/tracking-accuracy/moving-target` | `KineticInterceptClient.js` | 2 | `inline JSX` | yes | `penaltyEnabled` | ☐ |
| 62 | `/drills/visual/tracking-accuracy/multiple-targets` | `GhostLinkClient.js` | 2 | `inline JSX` | yes | static | ☐ |
| 63 | `/drills/visual/tracking-accuracy/pursuit-tracker` | `AutoPursuitClient.js` | 2 | `inline JSX` | yes | static | ☐ |
| 64 | `/drills/visual/visual-recognition/entropic-grid` | `EntropicGridClient.js` | 2 | `inline JSX` | yes | static | ☐ |
| 65 | `/drills/visual/visual-recognition/rhythm-anomaly` | `RhythmAnomalyClient.js` | 2 | `inline JSX` | yes | static | ☐ |
| 66 | `/drills/visual/visual-recognition/visual-search` | `VisualSearchClient.js` | 2 | `inline JSX` | yes | static | ☐ |

---

**66 drills — 65 with a rules prop, 66 with a stats prop, 34 with settings-conditional rule text.
Rules accordion source: 37 use `RULES_ITEMS`, 29 use inline JSX.**
