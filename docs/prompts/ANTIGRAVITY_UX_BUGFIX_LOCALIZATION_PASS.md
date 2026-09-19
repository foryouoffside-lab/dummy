# UX Bug-Fix, Consistency & Localization Audit Pass

**Run this from `docs/prompts/ANTIGRAVITY_UX_BUGFIX_LOCALIZATION_PASS.md`.**
Repo: `global-drill-system-nextjs` (SkillDrills), Next.js 15 App Router, JS.

This brief bundles everything reported in one QA sweep (refresh flash, start-button
flashes, ESC exit, breadcrumb color, per-drill border/subtitle gaps, and localized
pages that are English-in-disguise) into **one backlog worked one item at a time**.
It does not replace the existing playbooks — it points at them and adds what they
don't yet cover.

**Read these first, do not re-derive what they already establish:**
- [`CLAUDE.md`](../../CLAUDE.md) — Debug2Fix, output discipline, "npx next build not npm run build."
- [`DRILL_STANDARDIZATION_PLAYBOOK.md`](./DRILL_STANDARDIZATION_PLAYBOOK.md) — page hierarchy (§4), the
  ESC/pointer-lock/fullscreen exit "Golden Solution" (§6), no-machine-translation mandate (§9).
- [`DRILL_STANDARDIZATION_TRACKER.md`](./DRILL_STANDARDIZATION_TRACKER.md) — R1–R8 checklist, 26/82 done, 56 pending.
- [`PERF_REFRESH_FOUC_DEBUG_PASS.md`](./PERF_REFRESH_FOUC_DEBUG_PASS.md) — the refresh/big-text-flash
  investigation already run once. Confirm whether it is still reproducing before treating it as new.
- [`ANTIGRAVITY_HEADER_WIDTH_PASS.md`](./ANTIGRAVITY_HEADER_WIDTH_PASS.md) — header-width sweep, in progress.
- [`ANTIGRAVITY_MASTER_DRILL_PASS.md`](./ANTIGRAVITY_MASTER_DRILL_PASS.md) — how keyword research and
  localization decisions are made (measure, don't guess or translate).

---

## 0. GROUND RULES — non-negotiable

1. **One item per pass.** One bug, or one drill, or one locale file. Fix it, verify
   it, report it, stop. Do not "apply the same fix everywhere" in one shot — the
   header-width and master-drill briefs both exist because batch edits across
   drills produced broken files reviewed as a single diff.
2. **Runtime symptoms need runtime evidence.** Anything described as a "flash for
   a second" (§1–§3 below) is a Debug2Fix case: delegate to the `debug-runtime`
   subagent per `CLAUDE.md` §3–§5 before editing. Do not guess at a CSS fix for a
   transition you haven't actually inspected frame-by-frame.
3. **Never `npm run build`.** It fires a live IndexNow ping. Use `npx next build`
   or `next dev`.
4. **Never invent a keyword, volume, or translation.** A localized phrase is only
   valid if it was researched natively for that market (see §7). Dictionary
   translation of the English copy is explicitly the defect this pass exists to
   find, not an acceptable fix for anything.
5. **Verify in rendered output** (browser / server HTML), not source-code
   inspection alone — this repo has twice shipped content that looked right in
   the editor and wasn't in the actual page.
6. **If a fix would touch more files than the one item you're on, stop and report
   the wider pattern instead of expanding scope mid-pass.**

---

## 1. BUG — refresh flash: drill text renders big/scattered for a moment

**Symptom (user report):** on a hard refresh of any drill page, headings/body
text briefly render oversized or with distorted spacing before snapping to the
final layout.

**This may already be the exact defect `PERF_REFRESH_FOUC_DEBUG_PASS.md` targeted.**

1. First: reproduce on the current `main`/branch HEAD and confirm whether that
   pass's fixes (`text-size-adjust`, `font-sans` on `<html>`, font `display`
   strategy) are actually present and still failing, or were never merged.
   `grep -n "text-size-adjust" styles/globals.css`, `grep -n "font-sans" app/layout.js`.
2. If the fixes are present but it still reproduces: it's a **new/regressed**
   instance — delegate to `debug-runtime` with the same question set as that
   brief (§ "DELEGATE TO debug-runtime"), on the specific drill route(s) you
   reproduced it on.
3. If the fixes were never applied: apply them per that brief's "FIX MENU", then
   verify per its "VERIFY" section.
4. Do not re-litigate root cause from scratch if the prior investigation's
   evidence still holds — extend it, don't restart it.

---

## 2. BUG — start-button click: drill box flashes white during 3-2-1 countdown

**Symptom (user report):** clicking "Start Drill," the box that will hold the
drill briefly shows a whitened/half-white flash while the countdown is running,
before settling to its normal dark background.

**Known-innocent code:** `components/drill/DrillCountdown.js` itself renders
`bg-black` at `inset-0 z-50` — the overlay it draws is not white. So the flash is
happening either (a) in the transition *before* that overlay mounts (the
fullscreen/canvas element painting its default background for one frame), or (b)
in whatever stacking context sits behind/above it during the state change from
`start` → `countdown`.

**Delegate to `debug-runtime`. Questions:**
- Set a breakpoint at the `setGameState('countdown')` (or equivalent) call site
  for one representative drill (start with `flick-shot-training`, the canonical
  reference). Screenshot-burst the transition frame-by-frame.
- Is the flash a `<canvas>` element's default white backing before its first
  `ctx.fillRect` clear call runs? Check the canvas's computed `background-color`
  and whether a clear-to-black happens on mount vs. on first RAF tick.
- Is it the native Fullscreen API transition itself (`element.requestFullscreen()`
  compositing a white frame during the OS-level transition) — check whether the
  flash still happens with fullscreen disabled/mocked.
- Which DOM node is white during the flash (inspect via the debugger's DOM
  snapshot at the flash frame), and what element/class is behind it before
  `DrillCountdown` mounts?

**Fix only after evidence identifies the actual node.** Likely candidates once
confirmed: set an explicit dark `background` on the canvas element/container
itself (not just the overlay), or clear the canvas to the drill's dark background
color synchronously on mount rather than waiting for the first animation frame.

**Verify:** screenshot burst of the same transition post-fix on the same drill,
then spot-check 2 more drills from different families (one motor, one reaction-speed).

---

## 3. BUG — drill box slides/jumps on entry (left-flash and right-flash before centering/fullscreen)

**Symptom (user report):** on desktop, some drills' box visibly starts positioned
to the left before snapping to fullscreen; other drills flash starting at the
right edge before centering. Both are the same class of bug — a layout/position
value that is correct at steady state but wrong for one paint before a
recalculation (container width read before fullscreen resize completes, a
flex/grid item without a stable width on first render, or a CSS transition
starting from a stale `transform`).

**Delegate to `debug-runtime`.** Pick one drill that reproduces the left-flash and
one that reproduces the right-flash (ask the user which specific drills if not
obvious from your own repro pass — do not assume they're the same root cause
without checking both).

- Breakpoint / step through the click handler for "START DRILL" → fullscreen
  request → first paint of the game stage. Snapshot computed `width`,
  `transform`, and `left`/`right` on the stage container across that sequence.
- Is the container reading `window.innerWidth`/`getBoundingClientRect()` *before*
  `requestFullscreen()`'s resize has actually landed, then re-reading it a frame
  later? That's the classic cause of a one-frame mispositioned box.
- Is there a CSS transition (`transition: transform`/`left`) with an explicit
  "from" state that differs from steady-state, causing a visible animate-in even
  though no animation was intended?

**Fix only what evidence shows** — likely a matter of reading layout dimensions
after fullscreen/resize settles (e.g. inside a `resize`/`fullscreenchange`
listener rather than synchronously on click), or removing an unintended
transition on the container. Apply to the one reproducing drill first, verify,
then check whether the same component is shared by other drills (it likely is —
grep for the shared stage/container component) before deciding whether this is a
one-file fix or a shared-component fix.

**Verify:** screenshot burst across the transition, both before/after, on both
the left-flash and right-flash drills.

---

## 4. BUG — ESC does not return to the actual start page; it only pauses inside the drill box

**Symptom (user report):** pressing ESC mid-drill currently keeps the user inside
the fullscreen drill box (paused), instead of fully exiting back to the drill
page's "START DRILL" card as described.

**This is a known-solved pattern that has regressed or was never rolled out
everywhere.** `DRILL_STANDARDIZATION_PLAYBOOK.md` §6 documents the exact "Golden
Solution" — `handleExitDrill()` wired to `keydown` (Escape), `pointerlockchange`,
and `fullscreenchange`, with **no pause overlay at all**. `DRILL_STANDARDIZATION_TRACKER.md`
lists this as rule **R6**, currently only guaranteed on the 26 "completed" drills.

1. Reproduce on the specific drill(s) the user hit this on. Confirm via
   `debug-runtime` (or by reading the drill's client component) whether it:
   - has no ESC handler at all (falls through to default browser fullscreen-exit
     behavior, which just drops fullscreen and leaves game state stuck), or
   - has an ESC handler that sets a "paused" state instead of calling something
     equivalent to `handleExitDrill()`, or
   - calls `handleExitDrill()` but that function doesn't fully reset
     `gameState` to `'start'` (leaving the box shown but inert).
2. Fix per §6's reference implementation — copy the pattern exactly (ESC +
   pointerlockchange + fullscreenchange all calling one exit handler that drops
   fullscreen, releases pointer lock, cancels RAF/timeouts, and resets
   `gameState` to `'start'`).
3. Do this **one drill at a time**, per §8's "Rollout Checklist." Update
   `DRILL_STANDARDIZATION_TRACKER.md` (mark R6 for that drill) as you go so the
   tracker stays true — do not let this pass diverge from the tracker's bookkeeping.

**Verify:** on the fixed drill, mid-drill ESC returns to the exact "START DRILL"
card (not a paused overlay, not a blank box), stats reset, and a fresh Start
begins cleanly (no stale RAF/timeout leaking from the aborted run).

---

## 5. FIX — breadcrumb red accent → neutral

**File:** `components/drill/DrillBreadcrumb.js`. Exact lines:

- Line 27: `hover:text-red-400` → `hover:text-white`
- Line 33: `hover:text-red-400` → `hover:text-white`
- Line 36: `hover:text-red-400` → `hover:text-white`
- Line 41: `text-red-400 font-bold` → `text-white font-bold` (the current-page crumb)

This is the only breadcrumb component for leaf drill pages (hub pages hand-roll
their own — leave those alone unless they separately use `red-400`, which is out
of scope here unless you find it). One-line diff per hit. Grep first to confirm
no other file duplicates this component's markup:
```
grep -rn "text-red-400" components/drill/DrillBreadcrumb.js
```
**Verify:** load one drill page, breadcrumb renders in white/gray tones, no red
anywhere in the trail including the active/current crumb.

---

## 6. CONSISTENCY — drill-box border + one-line keyword subtitle, every drill, every locale

Add two rules to the standardization checklist (append to
`DRILL_STANDARDIZATION_TRACKER.md`'s rule list as **R9** and **R10**; track
compliance per-drill the same way R1–R8 are tracked):

- **R9 — Visible drill-box border.** The interactive stage container must have a
  visible border (match the existing bordered drills' token, e.g.
  `border border-white/10`, for consistency — do not invent a new border style).
  If a drill's stage has no border class at all, add it.
- **R10 — One-line keyword subtitle.** Every drill's `<h1>` must be followed by
  exactly one line of subtitle text that functions as the SEO keyword line (the
  existing `data-seo-kw` span pattern — see
  `ANTIGRAVITY_MASTER_DRILL_PASS.md` §2.2 for the canonical markup). If a drill
  has none, add one (real target keyword, not filler — check `lib/drillSeo.js`
  for what that drill is already supposed to target before inventing new copy).
  If a drill's subtitle wraps to more than one line, shorten it to fit one line
  at both mobile and desktop widths — do not solve this by widening the
  container; move any content that doesn't fit down into the body copy below the
  stage.

**Page hierarchy stays exactly what §4 of the playbook already specifies:**
H1 + one-line subtitle → stat cards → interactive stage (bordered) → caption →
accordions → related drills → footer. Do not reorder it. The user's ask for
"same content arrangement across every drill and every language" is this
existing hierarchy — the job here is finding where it's violated, not
redesigning it.

**Finding offenders:**
```
# Drills whose stage container has no border token:
rg -n -U '(canvas|GameStage|stage)[\s\S]{0,200}className="[^"]*"' app/drills --type js | grep -v border

# H1s with no data-seo-kw span immediately after:
rg -n -A3 '<h1' app/drills --type js | grep -B3 -L 'data-seo-kw'
```
Treat these as heuristics, not ground truth — confirm each hit by opening the
file and checking the rendered page before editing.

**Roll this into the existing tracker's per-drill workflow.** One drill per
pass, exactly like R1–R8. Do not create a second, competing checklist file.

---

## 7. AUDIT — localized pages that are English content translated, not natively researched

The user asked explicitly: **produce a list of every localized page that is a
straight translation of the English page** (not built from native keyword
research), per `DRILL_STANDARDIZATION_PLAYBOOK.md` §9 and
`ANTIGRAVITY_MASTER_DRILL_PASS.md`'s "never target a translated phrase" rule.

### 7.1 Why this matters here specifically

The current git status shows a large batch of `app/de/drills/**/page.js` files
modified but **uncommitted**. Before touching anything else, find out what that
in-progress change actually is — it may already be a translation-only edit,
which would itself be the exact defect being audited for:
```
git diff --stat -- app/de/
git diff app/de/drills/fps/flick-shot-training/page.js
```
If those diffs show English copy translated 1:1 into German without new German
keyword research behind it, that's Finding #1 before you even start auditing
the rest of the tree.

### 7.2 How to tell "translated" from "natively researched"

A page is a translation-only defect if **any** of:
- The `<h1>` subtitle / `data-seo-kw` phrase in the locale file is a dictionary
  translation of the English target term, with no Bing measurement behind it in
  that market (per §1.3 / §3 of the master-drill brief — "Never target a
  translated phrase" — proven-dead examples already on record: French
  `test de réaction` 0/mo, Spanish `entrenador de puntería` 0/mo).
- FAQ questions/answers, About-drill prose, or benchmark table copy read as a
  literal sentence-by-sentence translation of the English version rather than
  being written natively for that market's phrasing and search intent.
- The locale file's `metadata.title`/`description` are the English strings with
  no re-targeting to a locale-specific measured term at all.

A page is **not** a defect if its native phrase was actually measured (cite the
`python scripts/bing/bing.py keyword "<phrase>" <country>` output) and the copy
was written natively around it, even if the concept/structure mirrors the
English page (structure mirroring is fine and expected — see §4/§9 of the
playbook; word-for-word sentence translation is the problem).

### 7.3 What to produce

For **every** locale currently in the tree (`de`, `es`, `fr`, `ja`, `ko`, `pt` —
confirm the actual set with `ls app | grep -E '^(de|es|fr|ja|ko|pt)$'`), walk
every `page.js` under `app/<locale>/drills/**` and classify it. Output a table:

```
| Locale | Route | Verdict | Evidence |
|---|---|---|---|
| de | /de/drills/fps/flick-shot-training | TRANSLATED (defect) | h1 subtitle is literal DE translation of EN target phrase; no bing.py measurement found for it |
| ko | /ko/... | NATIVE (ok) | subtitle matches measured term from <cite the research doc/commit> |
```

**Do not fix any TRANSLATED page in this same pass.** Producing the list is the
deliverable for step 7. Fixing each one is real content work — keyword
measurement + native rewrite — and per the one-drill-at-a-time rule and the
playbook's "One Drill at a Time" mandate (§9.5), each fix is its own subsequent
pass, sequenced by the demand data already on record in the
`docs/prompts/DRILL_KEYWORD_TARGETS` / country-language-demand memory (Korean +
Japanese are the only markets with proven translation-resistant demand;
`de`/`es`/`fr` mostly measure at or near zero for translated phrasings — a
TRANSLATED `de`/`es`/`fr` page is likely to end in "revert to English fallback,"
not "localize properly," per that prior measurement work).

**Verify the audit itself** by spot-checking 3 pages you marked NATIVE against
their actual git history / a fresh Bing measurement — don't let false negatives
through by trusting file names or comments alone.

---

## SUGGESTED ORDER

1. §5 (breadcrumb) — trivial, 4-line fix, do it first to clear it off the list.
2. §1 (refresh flash) — check if already fixed before assuming it's new.
3. §4 (ESC exit) — known pattern, just needs rollout auditing per-drill.
4. §2 and §3 (white flash / position flash) — genuine Debug2Fix runtime bugs,
   need the subagent, budget real investigation time.
5. §7 (translation audit) — produce the list; do not start fixing pages yet.
6. §6 (border/subtitle) — ongoing consistency sweep, same cadence as the
   existing R1–R8 tracker rollout.

## REPORT FORMAT PER ITEM

```
## ITEM: <section #> — <one line>
### Reproduction
### Debug-runtime evidence (if applicable): Question / Answer / Evidence / Location / Confidence
### Fix applied: file:line — what and why
### Verification: (screenshots / grep output / build result)
### Tracker updated: yes/no + which rule
```

## COMPLETION

Only after an item is verified, output for that item:

`STATUS: SUCCESS | MILESTONE SECURED. END OF CORE CONVERSATION SYSTEM.`

then: critical files modified, verification performed, remaining known
limitations — per `CLAUDE.md` §8. Do not emit this line for the whole backlog at
once; each item earns its own.
