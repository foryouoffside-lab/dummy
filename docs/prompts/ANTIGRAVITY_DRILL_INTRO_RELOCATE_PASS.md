# Brief: Drill-Page Intro Relocation Pass

**Status:** not started.

**Goal:** on every individual drill page, the area **above** the game stage
becomes just the `<h1>` drill name. The long research/citation paragraph that
sits there today moves, **word for word**, into the page's "About" section. A
single short plain-language line is added **below** the game stage as a caption.

**Prime directive — nothing is lost.** Every sentence, every fact, every
citation that is on the page today is still on the page (in the server-rendered
HTML) after the change. This is a *move*, not a rewrite. If you delete or
paraphrase away a single citation, the change is wrong.

**Scope:** ~80 files matching `app/drills/**/*Client.{js,tsx}` (exclude the 8
hub clients and `DrillsDirectoryClient.js`). The pattern is an `<h1>` followed
directly by an intro `<p>` (sometimes with a `<span>` sub-label between them).

**Cadence:** ONE drill per pass. See §0.

---

## 0. Ground rules — read before anything else

1. **One drill per pass.** Do it, verify it in the rendered HTML, report it,
   STOP for approval. Never "apply to the remaining N files."
2. **The drill architectures differ.** `fps`, `physical`, `motor` and
   `reaction-speed` drills share the architecture keyed off
   `app/drills/fps/180-degree-awareness/AwarenessDrillClient.js`; `cognitive`
   and `visual` / `visual-tracking` do not. Do one drill from **each** family in
   your first few passes and get each approved before repeating within that
   family.
3. **No words deleted — only relocated.** Before you edit, copy the current
   intro `<p>` somewhere. After you edit, diff it sentence by sentence against
   the new "About" content. Every clause must be present. Citations
   (`(Fitts, 1954)`, `(Carey, Hargreaves & Goodale, 1996)`, etc.) are load-
   bearing — they are the E-E-A-T signal — and must survive verbatim.
4. **Never invent a number, a benchmark, or a claim.** The new one-line caption
   must be true and must come from text already on the page or the drill's
   `description` in `lib/drillsRegistry.js`. No "sub-millisecond", no
   `aggregateRating`, no made-up percentages — this repo has shipped fabricated
   stats more than once and they get grepped out every session.
5. **Everything stays in the server HTML.** No `{isOpen && children}`, no
   `isClient` gate, no rendering the caption only after mount. `DrillAccordion`
   already renders its children always (hidden with the `hidden` attribute when
   collapsed) — that is why the About section is crawlable. Keep it that way.
6. **Verify in the rendered HTML, not the source** (§4). The repo has twice
   shipped content that looked right in the browser and was absent from the
   HTML.
7. **Build with `npx next build`, never `npm run build`** (postbuild fires a
   live IndexNow ping).
8. **If a page's structure doesn't match this brief, stop and ask.** Do not
   improvise a per-page variant.

---

## 1. The target layout

Current (top of the returned JSX, inside `{!isFullscreen && (...)}`):

```jsx
<h1>Hand eye coordination game</h1>
<p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
  Crossing the midline means reaching to the side of space opposite the hand …
  (Carey, Hargreaves & Goodale, 1996). Each sweep here is also a Fitts's Law
  movement … (Fitts, 1954) … corridor narrows to 4 px …
</p>
[stat cards]
[game stage / <canvas>]
[results / accordions]
```

Target:

```jsx
<h1>Hand eye coordination game</h1>          {/* name only, above the stage */}
[stat cards]
[game stage / <canvas>]
<p className="…caption…">                     {/* NEW: one short line, below the stage */}
  Sweep the cursor across the screen to connect opposite-side nodes before the
  corridor narrows.
</p>
[results / accordions]
  └── DrillAccordion id="about"  ← the full original paragraph lands here,
      merged with what's already there, no clause dropped.
```

### The caption (new one-liner)

- One sentence, roughly 10–20 words. What the drill *is* / what you *do*.
- Plain language — no jargon, no citations, no numbers unless they're a core
  rule already stated on the page (e.g. "45 seconds").
- Style it to read as a caption under the stage: reuse the muted text class the
  page already uses for small print (`text-xs`/`text-[13px] text-slate-400/500
  leading-relaxed`), with a small top margin. Match the page, don't invent a
  new token.
- Keep it inside a `!isFullscreen` guard (or the existing stage wrapper) so it
  disappears in fullscreen like the rest of the chrome.
- Place it immediately after the game-stage container's closing tag, before the
  results panel / accordions.

### The About destination

- Find the existing home for dense prose: a `DrillAccordion` with `id="about"`
  (title usually "About <Drill Name>"), or a `DrillGuide` (4 pages use that).
  76 of ~80 drills already have one.
- Paste the original intro paragraph in as the **first** paragraph of that
  section's body. Then read what's already there: if a sentence in the old
  intro duplicates one already in About, keep the better-written single copy —
  but never drop a **unique** fact or citation. When in doubt, keep both.
- **If the drill has no About section** (≈5 visual-tracking drills —
  `split-screen-tracking`, `staircase-step`, `strobe-prediction-pursuit`,
  `triangular-pursuit`, `zig-zag-path-pursuit`): add a `DrillAccordion
  id="about"` that matches the pattern used by the sibling pursuit drills in
  `app/drills/visual-tracking/` that *do* have one (same imports, same
  `openAccordion` state hook, same title format). Do not gate it behind
  `{isOpen && …}`.

---

## 2. Why this is SEO-neutral (context, not a task)

- Search engines render the whole DOM; text below the stage or inside a
  `hidden` accordion is crawled and weighted essentially the same as text up
  top. The About accordion is already indexed today.
- The one measurable thing given up is `<h1>` → first-paragraph adjacency,
  which slightly helps result snippets. The user has accepted that trade for a
  cleaner page. Do not try to "compensate" by keeping a second hidden copy of
  the paragraph up top — one copy, in About.
- Net indexable text on the page must be **unchanged** (caption is additive).
  That is the whole point of the "no words deleted" rule.

---

## 3. What not to touch

- The `{!isFullscreen && (...)}` gating logic, the stat-cards row, the stage
  container, pointer-lock, results/share code.
- The `<h1>` text itself.
- Accent colours (a separate palette change is pending).
- The header `<p>`'s width — it was un-capped last pass; the replacement
  caption is short so width is moot, and the About prose follows the About
  section's own width.
- Any other drill's file.

---

## 4. Verifying (per drill)

```bash
npx next dev -p 3199 > dev.log 2>&1 &
until grep -q "Ready in" dev.log; do :; done
curl -s http://localhost:3199/drills/<path-to-drill> -o d.html -w "%{http_code}\n"

# 1. every distinctive phrase from the OLD intro paragraph is still in the HTML:
grep -c "Carey, Hargreaves" d.html        # citation survived  → expect ≥1
grep -c "Fitts" d.html                    # citation survived  → expect ≥1
grep -c "corridor narrows to 4" d.html    # mechanic survived  → expect ≥1

# 2. the new caption is present in SSR output (not injected on mount):
grep -c "<distinctive words from your caption>" d.html   # expect ≥1

# 3. nothing is JS-gated: the About body text is in the raw HTML even though
#    the accordion renders collapsed:
grep -c "<a distinctive About-section sentence>" d.html  # expect ≥1
```

Then load it in a browser: above the stage is just the title; the caption reads
cleanly below the stage; the About section opens and contains the full research
text. Check desktop and mobile width, and toggle fullscreen (caption + title
chrome should hide).

Finish with `npx next build`.

---

## 5. Report format per pass

- Drill done + its architecture family.
- The exact caption text you wrote and where it came from (registry
  `description` / condensed from the old intro).
- Sentence-by-sentence diff of the old intro `<p>` → new location, showing every
  clause/citation is accounted for.
- The grep verification output from §4.
- Whether an About section had to be created.
- Screenshots: desktop + mobile.
- `npx next build` result.
