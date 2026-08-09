# Cognitive Drills — Match Concentration Grid's Shell

**SUPERSEDES the previous version of this plan.** The previous version pulled these drills *toward* the 180-degree-awareness/Divided-Attention "StatCard shell." That direction is reversed: **Concentration Grid is now the canonical shell for every cognitive drill.** Bring all 7 other drills — including undoing the partial Pattern-A migration already applied to Concentration Stamina — to match Concentration Grid's current, live file (`app/drills/cognitive/focus/concentration-grid/ConcentrationGridClient.js`) exactly: header, title font, stat row, box container, start card, countdown, sound toggle, related drills. **Do not touch Concentration Grid itself** — it's the reference, already correct.

**Never touch game logic.** Every file keeps its own mechanic, state shape, scoring formula, and gameplay screen exactly as-is. Only the chrome around it changes: header/breadcrumb, title, stat row, box-container classing, start-card wrapper, countdown, sound-toggle placement, end-screen advice card, and Related Drills section.

## Files in scope

1. `app/drills/cognitive/attention/concentration-stamina/ConcentrationStaminaClient.js` — **already partially migrated to Pattern A** (breadcrumb nav, `StatCard` row, template-string box container, no countdown subtitle). This needs to be **reverted** to Concentration Grid's pattern, not just cleaned up. Its start card was never migrated and already matches Concentration Grid — leave that part alone.
2. `app/drills/cognitive/attention/multi-tasking/DualTargetFlowClient.js`
3. `app/drills/cognitive/attention/selective-attention/SelectiveAttentionClient.js`
4. `app/drills/cognitive/focus/distraction-fighter/DistractionFighterClient.js`
5. `app/drills/cognitive/processing-speed/reaction-time/EliteNeuroSwitchClient.js`
6. `app/drills/cognitive/processing-speed/rsvp-reader/RSVPReaderClient.js` — also has the bug in §7.
7. `app/drills/cognitive/processing-speed/symbol-matching/SymbolMatchingClient.js`

Files #2–7 currently share one template (`gameState` as the phase-state variable name, `uiScore`/`uiTimeLeft`/`bestScore`/`engine.current.level` as the stat values, `StatCard` subcomponent, modal-overlay start card, large-card Related Drills, a "Diagnostics Advice" end-screen card, and a `subtitle` on `DrillCountdown`). Keep each file's own state-variable names (`gameState`, `uiScore`, `uiTimeLeft`, `engine.current.level`, `uiWpm` for RSVP, etc.) — only the surrounding markup/classes change.

---

## 1. Header + breadcrumb (replaces the plain `<nav>` breadcrumb and, for #2–7, adds a header that doesn't exist yet)

Target (copy from Concentration Grid, swap `{TITLE}` for the drill's display name, `{ACCENT}` per §6's color table):

```jsx
<div className="min-h-screen bg-[#050508] text-white flex flex-col font-sans select-none">
  {/* ── HEADER / BREADCRUMB ── */}
  {!isFullscreen && (
  <header className="border-b border-white/5 bg-[#080811]/80 backdrop-blur-md sticky top-0 z-50">
    <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/drills/cognitive" className="hover:text-white transition-colors">Cognitive</Link>
        <span>/</span>
        <span className="text-{ACCENT}-400 font-medium">{TITLE}</span>
      </div>

      <button
        onClick={() => {
          const next = !soundEnabled;
          setSoundEnabled(next);
          drillAudio.setEnabled(next);
        }}
        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
        title={soundEnabled ? "Mute Sound" : "Unmute Sound"}
      >
        {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-400" />}
      </button>
    </div>
  </header>
  )}
```

This **adds an external pre-game sound toggle** to files #2–7 (they currently only have the in-box toggle during play) and drops the old `<nav><ol>` breadcrumb + standalone `<h1>` container in favor of the sticky header. `soundEnabled`/`setSoundEnabled`/`drillAudio.setEnabled` already exist in every file — just wire the button to them.

---

## 2. Main wrapper + title + tagline

```jsx
  {/* ── MAIN CONTENT AREA ── */}
  <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col gap-6">
    {/* Title */}
    {!isFullscreen && (
    <div className="text-center">
      <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-{ACCENT}-400 bg-clip-text text-transparent">
        {TITLE_ALL_CAPS}
      </h1>
      <p className="text-xs text-slate-400 mt-1">
        {ONE_LINE_TAGLINE}
      </p>
    </div>
    )}
```

`{TITLE_ALL_CAPS}` — the drill's name in caps (e.g. `MULTI-TASKING`, `SELECTIVE ATTENTION`, `DISTRACTION FIGHTER`, `REACTION TIME`, `RSVP SPEED READER`, `SYMBOL MATCHING`, `CONCENTRATION STAMINA`).
`{ONE_LINE_TAGLINE}` — write a short descriptive line matching Concentration Grid's tone (e.g. its own is "Visual Search & Sequential Target Scanning Under Speed Constraints"). None of these files currently have one since Pattern A's title has no tagline — invent one consistent with each drill's mechanic/copy already in its `ABOUT_TEXT`/rules.

This replaces the current plain `<h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-sans">{Title Case}</h1>` entirely — gradient + all-caps + tagline, not title-case plain white.

---

## 3. Stat row — plain divs, not `StatCard`

```jsx
    {/* Live Stat Cards */}
    {!isFullscreen && (
    <div className="grid grid-cols-4 gap-2.5 max-w-2xl mx-auto w-full">
      <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
        <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Score</div>
        <div className="text-lg sm:text-xl font-black text-{ACCENT}-400 tabular-nums">{uiScore}</div>
      </div>
      <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
        <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Time</div>
        <div className={`text-lg sm:text-xl font-black tabular-nums ${uiTimeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
          {uiTimeLeft}s
        </div>
      </div>
      <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
        <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">{THIRD_LABEL}</div>
        <div className="text-lg sm:text-xl font-black text-indigo-400 tabular-nums">{THIRD_VALUE}</div>
      </div>
      <div className="bg-[#0d0d18] border border-white/5 rounded-xl p-2.5 text-center">
        <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Best Score</div>
        <div className="text-lg sm:text-xl font-black text-amber-400 tabular-nums">{bestScore}</div>
      </div>
    </div>
    )}
```

Delete the `<StatCard icon={...} .../>` calls and the `Trophy`/`Timer`/`Compass`/`Award` icon usage that goes with them (check whether those `lucide-react` imports are still used elsewhere in the file before removing them — probably not, since they were only for this row). Color convention, matching Concentration Grid exactly: Score value = drill's own accent color; Time = white, red-pulse under 10s; third stat = fixed `indigo-400`; Best Score = fixed `amber-400`.

Per-file `{THIRD_LABEL}` / `{THIRD_VALUE}` (unchanged from what's already shown, just re-hosted as plain text instead of an icon card):

| File | Third stat |
|---|---|
| multi-tasking, selective-attention, distraction-fighter, reaction-time, symbol-matching | `Level` / `` `L${engine.current.level}` `` |
| rsvp-reader | `Speed` / `` `${uiWpm} WPM` `` |
| concentration-stamina | `Level` / `` `L${level}` `` (this file uses plain `level` state, not `engine.current.level`) |

---

## 4. Drill box container

```jsx
    {/* Game Stage Container */}
    <div
      ref={containerRef}
      className={
        isFullscreen
          ? 'fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#050508] flex flex-col items-center justify-center'
          : isMobile
            ? (isPortrait
                ? 'w-full rounded-2xl aspect-[3/4] min-h-[420px] max-h-[76vh] bg-[#080811] border border-white/10 relative overflow-hidden flex flex-col'
                : 'w-full rounded-2xl aspect-video min-h-[340px] max-h-[85vh] bg-[#080811] border border-white/10 relative overflow-hidden flex flex-col')
            : 'w-full rounded-2xl aspect-video min-h-[460px] sm:min-h-[500px] max-h-[88vh] bg-[#080811] border border-white/10 relative overflow-hidden flex flex-col'
      }
    >
```

Replaces the template-string version (`` `relative overflow-hidden flex flex-col transition-all duration-150 ... shadow-[0_0_40px_rgba(0,0,0,0.9)] bg-[#050508] ...` ``) with this ternary, exact background (`#080811` for the box, `#050508` for fullscreen), no drop-shadow, no `transition-all duration-150`. `isMobile`/`isPortrait` state already exists in every file (all of them already resize-listen for it) — just reuse it.

---

## 5. Start card — leave alone, except where it was migrated

Concentration Grid's start card wrapper is:
```jsx
{gameState === 'start' && (
  <div className="relative h-full flex flex-col items-center justify-center p-5 z-40 pointer-events-auto my-auto">
    <div className="relative w-full max-w-[340px] rounded-[20px] border border-white/10 bg-[#0d0d18]/95 backdrop-blur-xl p-5 text-center shadow-[0_16px_40px_rgba(0,0,0,.6)]">
      {/* each file's own icon badge / h2 / rule rows / mini-stats grid / start button / reassurance line — unchanged */}
    </div>
  </div>
)}
```
Files #2–7 currently use a **different** wrapper: `<div className="absolute inset-0 flex items-center justify-center z-40 bg-black/90 backdrop-blur-md overflow-y-auto" onPointerDown={e => e.stopPropagation()}>` around a card styled `bg-[#0d0d18] px-5 pt-4 pb-4 ... flex flex-col gap-2.5` (no `backdrop-blur-xl`, no `/95` opacity, spacing via `gap-2.5` instead of per-child margins). Swap only these two wrapper/card `className` strings to Concentration Grid's version above — **keep every child inside** (icon badge, `<h2>`, rule rows, mini-stat grid, start button, reassurance paragraph) exactly as each file already has it; those don't need `gap-2.5` anymore since the target style uses ad-hoc `mb-3`/`mb-4` on individual children instead — check each child for a `className` that needs an `mb-*` added now that the parent isn't auto-spacing them with `gap-2.5` (compare against Concentration Grid's own start card for the exact spacing values, e.g. icon badge gets `mb-3`, tagline gets `mb-0.5 mb-3`, rule-row block gets `mb-4`, mini-stat grid gets `mb-4`, reassurance line gets `mt-2`).

**Concentration Stamina is the one file where this is already correct** — its start card already uses Concentration Grid's wrapper (confirmed: `relative h-full flex flex-col items-center justify-center p-5 z-40 pointer-events-auto my-auto` / `bg-[#0d0d18]/95 backdrop-blur-xl`). Don't touch it.

---

## 6. Accent colors (drives §1, §2, §3's `{ACCENT}` and §7's Related Drills hover color)

| File | Accent |
|---|---|
| concentration-stamina | `indigo` |
| multi-tasking | `blue` |
| selective-attention | `emerald` |
| distraction-fighter | `rose` |
| reaction-time | `red` |
| rsvp-reader | `amber` |
| symbol-matching | `cyan` |

(Same colors each file already uses for its grade-panel radial-gradient and Related Drills hover — carry them through, don't invent new ones.)

---

## 7. Countdown — add the "GET READY" subtitle

Concentration Grid passes a subtitle; files #2–7 currently pass one too but with drill-specific text (e.g. `"PREPARE DUAL-STREAM TRACKING"`). Standardize all of them — including Concentration Stamina, which currently has none — to match Concentration Grid exactly:
```jsx
<DrillCountdown value={countdownValue} subtitle="GET READY" accent="#{HEX}" />
```
Keep each file's own `accent` hex (already set correctly per drill), just set `subtitle="GET READY"` verbatim and drop any more specific text.

---

## 8. End screen — no advice card (unchanged from before, still correct)

This part of the previous plan is untouched by the direction reversal — Concentration Grid's end screen already has no advice card, and files #2–7 (plus Concentration Stamina) should match that. If not already done:
- Remove the "Diagnostics Advice" (or "Coach Notes") card block, the `getCoachAdvice` helper, the `advice`/`coachAdvice` field, and the now-dead `Sparkles` import (check first if anything else in the file still uses `Sparkles`).
- The centered 36%/64% result-card layout itself (`justify-center gap-3 px-6 py-4`) is already correct in every file and matches Concentration Grid — don't change that structure, only remove the advice card from inside it.

---

## 9. Related Drills — compact style + dead-link fix (unchanged from before, still correct)

Also untouched by the direction reversal. Convert the large-card section to Concentration Grid's compact style, and fix the dead `batch-processing`/`sustained-attention`/`switch-cost` links at the same time:

```jsx
<section className="mt-4">
  <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
    Related Cognitive Drills
  </h2>
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
    {RELATED_DRILLS.map((drill) => (
      <Link
        key={drill.id}
        href={drill.href}
        className="group bg-[#0c0c16] border border-white/5 hover:border-{ACCENT}-500/40 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
      >
        <div>
          <div className="text-[10px] font-bold text-{ACCENT}-400 uppercase tracking-wider mb-1">{drill.cat}</div>
          <div className="text-xs font-bold text-white group-hover:text-{ACCENT}-300 transition-colors">{drill.name}</div>
          <div className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{drill.desc}</div>
        </div>
        <div className="text-[10px] font-bold text-slate-500 group-hover:text-{ACCENT}-400 mt-3 flex items-center gap-1 transition-colors">
          Train Drill <span>→</span>
        </div>
      </Link>
    ))}
  </div>
</section>
```

Real drills that exist (for replacing dead entries): `concentration-stamina`, `divided-attention`, `multi-tasking`, `selective-attention`, `concentration-grid`, `distraction-fighter`, `reaction-time`, `rsvp-reader`, `symbol-matching`. Canonical `name`/`cat`/`desc`/`href` for each (reuse verbatim for new entries):

| id | name | cat | desc | href |
|---|---|---|---|---|
| concentration-stamina | Concentration Stamina | Attention | Sustain continuous visual focus through prolonged high-density sequences. | /drills/cognitive/attention/concentration-stamina |
| divided-attention | Divided Attention | Attention | Track and react to multiple independent target streams simultaneously. | /drills/cognitive/attention/divided-attention |
| multi-tasking | Multi-Tasking | Attention | Track dual independent target streams under speed pressure. | /drills/cognitive/attention/multi-tasking |
| selective-attention | Selective Attention | Attention | Filter out high-salience visual distractors to hit target stimuli. | /drills/cognitive/attention/selective-attention |
| concentration-grid | Concentration Grid | Focus | Scan and tap sequential numbers on expanding grid matrices. | /drills/cognitive/focus/concentration-grid |
| distraction-fighter | Distraction Fighter | Focus | Filter out high-interference Stroop visual distractors. | /drills/cognitive/focus/distraction-fighter |
| reaction-time | Reaction Time | Processing Speed | Train choice reaction speed and visual reflex latency. | /drills/cognitive/processing-speed/reaction-time |
| rsvp-reader | RSVP Speed Reader | Processing Speed | Process rapid serial visual presentation text streams. | /drills/cognitive/processing-speed/rsvp-reader |
| symbol-matching | Symbol Matching | Processing Speed | Match rapid symbol pairs under strict time pressure. | /drills/cognitive/processing-speed/symbol-matching |

Final 6-entry list per file (self excluded, zero dead links):

| File (self) | Final `RELATED_DRILLS` |
|---|---|
| concentration-stamina | concentration-grid, selective-attention, divided-attention, multi-tasking, distraction-fighter, reaction-time |
| multi-tasking | divided-attention, selective-attention, concentration-stamina, distraction-fighter, reaction-time, concentration-grid |
| selective-attention | distraction-fighter, divided-attention, multi-tasking, concentration-grid, reaction-time, concentration-stamina |
| distraction-fighter | concentration-stamina, concentration-grid, selective-attention, divided-attention, multi-tasking, symbol-matching |
| reaction-time | symbol-matching, rsvp-reader, selective-attention, distraction-fighter, multi-tasking, concentration-stamina |
| rsvp-reader | symbol-matching, reaction-time, selective-attention, distraction-fighter, concentration-grid, divided-attention |
| symbol-matching | reaction-time, rsvp-reader, selective-attention, distraction-fighter, concentration-grid, multi-tasking |

(Divided Attention has the same dead-link issue and its own plan file already covers the fix — see `plans/divided-attention-optimization-plan.md`. Concentration Grid also still has dead links in its own `RELATED_DRILLS` but stays untouched per instruction.)

---

## 10. Bug fix — RSVP Reader fullscreen typo

In `enterDrill`:
```js
if (containerRef.current && !documentfullscreenElement) {
```
is a `ReferenceError` (missing `.`) silently swallowed by the surrounding `try {} catch (e) {}` — fullscreen never actually engages. Fix:
```js
if (containerRef.current && !document.fullscreenElement) {
```

---

## 11. Lives system — assessed per drill, recommendation: don't add one to any of them

You asked me to judge whether each drill needs a lives system like Concentration Grid's. Here's why Concentration Grid has one and why none of these 7 need the same treatment:

Concentration Grid's clock **refills every time a grid is cleared** — a clean run can extend indefinitely, so without lives there would be no way to end a bad-but-not-losing session; the 3-hearts system is the actual failure condition that bounds the game. None of the other 7 drills have that "success refills the clock" design — every one of them runs on a plain fixed 45-second timer that ends the session regardless of performance. That's already a hard bound, so a lives system would be redundant with the existing end condition rather than serving the same structural purpose it serves in Concentration Grid — it would just make the session end *early* in a way none of these drills were designed around (their scoring, combo, and difficulty-ramp math all assume a full 45s of attempts).

**Recommendation: leave all 7 as they are (combo-reset + accuracy tracking, no lives).** If you want lives added to a specific one anyway, say which and I'll fold it into a revised plan — it's a real gameplay change (not just a shell change) so it deserves its own pass rather than being bundled silently into this cleanup.

---

## 12. Explicitly out of scope

- Concentration Grid itself — reference only, don't edit.
- Difficulty-scaling parity with 180-degree-awareness (level-multiplier scoring, `MAX_LEVEL` cap) — not part of this pass.
- Any gameplay/scoring/mechanic change beyond the RSVP typo fix in §10.
- Adding a lives system anywhere (see §11) unless you tell me otherwise.

---

## 13. Verification checklist (per file)

- [ ] Sticky header with breadcrumb + external sound-toggle button, not a plain `<nav>`.
- [ ] Title is the gradient, all-caps `<h1>` with a tagline line underneath — not the plain white title-case version.
- [ ] Stat row is 4 plain `bg-[#0d0d18]` divs, no `StatCard`/icons.
- [ ] Drill box background is `#080811` (not `#050508`), no drop-shadow, no `transition-all duration-150`.
- [ ] Start card wrapper matches Concentration Grid's (`bg-[#0d0d18]/95 backdrop-blur-xl`, centered-in-box, no dark overlay behind it) — already true for Concentration Stamina, needs the swap for #2–7.
- [ ] Countdown subtitle reads exactly "GET READY".
- [ ] No "Diagnostics Advice"/"Coach Notes" card on the end screen; layout stays centered.
- [ ] Related Drills is the compact 2/3-column style with correct accent color, and every link resolves to a real route.
- [ ] RSVP Reader: fullscreen actually engages on drill start (test in a real browser).
- [ ] No lives/hearts UI added anywhere.
- [ ] `npx next build` (not `npm run build`) compiles cleanly, no unused-import warnings (`StatCard`-only icons, `Sparkles`, `getCoachAdvice`, etc. per file).
