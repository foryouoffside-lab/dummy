# Execution Brief — UI & SEO Content Integration on Drill Pages

**Target agent:** Antigravity
**Type:** Design + information architecture. Run **before** the browser keyword research, so new content lands in a layout that can hold it.
**Scope:** Drill page presentation sitewide. Not the drill mechanics, not the game logic.

---

## 1. The Problem

SEO work has been added to these pages over time, and it shows. Content was appended where it fit rather than designed in, so the page now serves the crawler and the visitor in visibly separate layers.

**The clearest symptom, on 74 pages:**

```jsx
<h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
  CONCENTRATION STAMINA
  <span data-seo-kw="1" className="block text-sm font-semibold text-slate-400 mt-1 normal-case tracking-normal">
    Focus Test
  </span>
</h1>
```

The **internal codename** is the headline. The **term the visitor actually searched** is small grey subtext. Someone arriving from "focus test" is greeted by "CONCENTRATION STAMINA" and has to read the de-emphasized line to confirm they are in the right place.

That is a relevance mismatch at the highest-bounce moment on the page. It is also visible in the markup as `data-seo-kw="1"` — an attribute whose only purpose is to mark a line as being there for search engines.

**Your job:** make the SEO content and the interface one designed thing, so the page reads as written for people while remaining fully machine-readable.

---

## 2. Your Role

Senior product designer with strong technical SEO literacy — the combination that is rare and that this task needs.

You believe good SEO content and good UX are the *same content*, laid out properly. When they appear to conflict, the layout is wrong, not the content. You have seen enough tool pages ruined by a wall of text above the tool, and enough thin tool pages that rank for nothing, to know both failure modes.

You are also disciplined about not breaking working machinery in pursuit of a cleaner look. This codebase has specific, hard-won invariants (§4) that a naive redesign would destroy.

---

## 3. Design Principles for a Tool Page

Apply in this order when they conflict:

1. **The visitor came to use the drill.** It must be reachable without hunting. On mobile, the visitor should see the drill or its start control without scrolling past a paragraph.
2. **Confirm arrival in the first second.** The page must immediately show the thing they searched for. This is what the H1 currently fails at.
3. **One extractable answer sentence, early.** A single clear sentence — "Average human visual reaction time is 200–250 ms" — serves the visitor *and* is what AI assistants quote. One sentence, not a paragraph.
4. **Depth goes below the tool.** Guides, benchmark tables, technique explanations sit after the interaction, never before it.
5. **Progressive disclosure for reference material.** Accordions are correct for instructions and secondary FAQ — subject to §4.1.
6. **The existing visual direction stays.** The dark, gradient, glow aesthetic is deliberate and a minimalist strip-back has already been considered and rejected. **Fix hierarchy, spacing and wording — not the art direction.**

---

## 4. Invariants — Breaking Any of These Fails the Task

These are load-bearing. Each was fixed at real cost and a redesign can silently undo it.

### 4.1 Accordion content must stay in the server HTML

`components/drill/DrillAccordion.js` renders children **unconditionally**, hidden via the `hidden` attribute. Its own comment records why:

> Previously this was `{isOpen && ...}`, which kept every drill's instructions, About copy and FAQ out of the server HTML entirely — Googlebot saw ~160 words per drill page and the FAQPage JSON-LD referenced answers that appeared nowhere on the page.

This is the root cause of 82 of 91 URLs going uncrawled. **Never conditionally render content you want indexed.** If you build any new collapsible, tab, carousel or "read more", it must render into the DOM and hide with CSS or the `hidden` attribute — never with `{condition && children}`.

### 4.2 FAQ schema and visible FAQ must stay in parity

Every `FAQPage` question must appear in the rendered DOM. The site currently sits at **zero drift sitewide**; it took a dedicated pass to get there. Where a page maps its visible FAQ from the schema object, **keep that mapping** — do not hand-copy the questions into new markup.

### 4.3 Do not fabricate

No invented statistics, user counts, ratings, testimonials, or social proof. Scores never leave `localStorage`; the homepage testimonials array is **deliberately empty**. Do not add "trusted by N players", star ratings, or fake activity indicators to make the UI look busier.

### 4.4 Do not hide text for SEO

No `display:none` keyword blocks, off-screen text, `aria-hidden` keyword lists, or sr-only smuggling. The accordion's `hidden` on a user-toggleable region is the only sanctioned concealment, and it already exists — do not imitate it elsewhere.

### 4.5 Keep the drill working

Do not touch game loops, canvas rendering, scoring, timing, storage keys, or `lib/drillPreviews.js` lookup keys. Presentation only.

---

## 5. Workstreams

### WS-1 — Invert the H1 (74 pages)

The primary fix. The search term becomes the headline; the internal name becomes the supporting line.

**Current:**
```jsx
<h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
  CONCENTRATION STAMINA
  <span data-seo-kw="1" className="block text-sm font-semibold text-slate-400 mt-1 normal-case tracking-normal">
    Focus Test
  </span>
</h1>
```

**Target shape:**
```jsx
<h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
  Focus Test
  <span className="block text-sm font-semibold text-slate-400 mt-1 normal-case tracking-normal">
    Concentration Stamina drill
  </span>
</h1>
```

Requirements:
- The **primary term comes from `lib/drillSeo.js`** (`term` / `anchor`) — the same source that supplies internal anchor text. Do not hardcode a second copy that can drift.
- **Drop the `data-seo-kw` attribute.** Once the term *is* the headline, the marker has no purpose and reads as machine-authored.
- Keep the internal name as the subline where it aids recognition; **drop it entirely where it adds nothing.** "Reaction Time Test / Reaction Time Test" is redundant — show one.
- Reconsider the uppercase treatment. `font-black uppercase` on a long search phrase reads as shouting and hurts scannability. Sentence case usually reads better at headline weight.
- **The H1 must remain a single `<h1>`** containing both lines, so its text content still carries the term.

**Before starting, list all 74 pages and the term each will adopt.** Some `drillSeo` terms will read poorly as a visible headline (`micro-correction aim trainer`). Where the search term is awkward as a headline, use a natural human form that still contains the term, and note the deviation.

### WS-2 — Above-the-fold audit

For a representative sample across categories, measure at 390×844 (iPhone), 768×1024 (tablet) and 1440×900:

- How many vertical pixels before the drill or its start control is visible?
- How many words does the visitor read before they can act?

Then fix what fails. Likely candidates: breadcrumb taking a full row, oversized H1 block, settings/toggles above the canvas, excess vertical padding.

**Target: the drill or its start control visible without scrolling on a 390px-wide phone.** Report before/after numbers.

### WS-3 — Place the extractable answer sentence

Each drill page needs one short factual sentence that both orients the visitor and gives AI assistants something clean to quote.

- **One or two sentences maximum.** A paragraph here pushes the drill down and defeats the purpose.
- Position it directly under the H1, above or beside the drill — visually light (`text-sm`, muted), not a content block.
- It must be **factually defensible** and self-contained. "Average human visual reaction time is 200–250 ms." Not "the ultimate reaction experience."
- Where a drill's page already opens with such a sentence in its guide, **promote that sentence** rather than writing a second one.

### WS-4 — Integrate `DrillGuide` visually

`components/drill/DrillGuide.js` currently renders as a single large bordered card below the drill. Review whether it reads as part of the page or as an appended block.

- Check the emoji in section headings (`📊`) against the rest of the site's visual language — the site uses a Lucide icon set elsewhere. Consistency, not decoration.
- Ensure the benchmark table is genuinely readable on mobile; it must scroll inside its own container rather than making the page scroll sideways.
- Confirm heading hierarchy is correct and sequential — one `h1`, then `h2`, then `h3`. No skipped levels.
- **Any benchmark table must be labelled as an editorial guide, not measured norms** (§4.3).

### WS-5 — Post-drill moment

When a run ends, the visitor is at peak engagement and the page usually does least with it. Review what appears after a result:

- Is retrying obvious?
- Are related drills offered with meaningful, keyword-first anchor text?
- Is there a path deeper into the site rather than back to search?

This is where internal-link value and engagement signals are won. Improve it without adding fabricated social proof.

### WS-6 — Consistency sweep

74 pages accumulated independently. Verify a single system for: H1 treatment, spacing rhythm above the canvas, accordion order and labels, guide placement, and mobile breakpoints. Where a page deviates without reason, bring it into line.

---

## 6. Verification

- [ ] `npx next build` exits 0 — **capture the exit code directly, not through a pipe** (a pipe returns `tail`'s status and has already masked a failure here)
- [ ] `npx tsc --noEmit` — no new errors above baseline
- [ ] **Every FAQ schema question still present in rendered HTML** (`.next/server/`), **hub pages included**. Must be zero drift — run the check before and after and show both.
- [ ] Every drill page's target term present in **server-rendered** HTML, inside the `<h1>`
- [ ] Accordion content still in the server HTML when collapsed — grep the built output for a string that only appears inside a closed accordion
- [ ] Word count per page not materially reduced — this is a layout change, not a content cut. Show before/after.
- [ ] Drill previews still render (`lib/drillPreviews.js` keys untouched)
- [ ] Every drill still starts, scores and saves — spot-check at least one per category
- [ ] No horizontal page scroll at 390px on any drill page
- [ ] Above-the-fold measurements reported for the WS-2 sample, before and after
- [ ] `data-seo-kw` gone from the codebase
- [ ] Zero fabricated stats, ratings, or social proof added
- [ ] Nothing pushed, nothing deployed

---

## 7. Deliverables

1. Code changes per §5.
2. `UI_SEO_INTEGRATION_REPORT.md`:
   - The 74-page H1 table: page → old headline → new headline → source of term
   - **Pages where the `drillSeo` term read poorly as a headline, and the wording used instead**
   - Above-the-fold before/after at three widths
   - FAQ-drift check output, before and after
   - Word-count before/after
   - Screenshots of two or three representative pages, before and after
   - Anything deliberately left alone, and why
3. One commit per workstream, conventional format. Local only.

---

## 8. Automatic Rejection

- `{isOpen && children}` or any conditional render of indexable content (§4.1)
- FAQ schema/visible drift reintroduced anywhere, hubs included
- Hidden text for SEO purposes
- Fabricated statistics, ratings, testimonials, or activity indicators
- Changes to game logic, scoring, timing, storage keys, or preview lookup keys
- The site's dark/gradient visual direction replaced with a minimalist restyle
- Content deleted to make the layout tidier — this is a placement task, not a trim
- More than one `<h1>` on a page, or skipped heading levels
- `npm run build` during development
- Pushing or deploying

---

## 9. Judgment Clause

The measure of success is that a visitor arriving from a search sees, immediately, the thing they searched for — and that a crawler still finds every word it found before.

If those two ever appear to conflict, the layout is wrong. Do not solve it by removing content, and do not solve it by hiding content. Solve it by ordering the page correctly: confirm arrival, let them play, then go deep.

A redesign that looks cleaner but drops the page's word count, breaks accordion indexing, or reintroduces FAQ drift is a net loss — however much better it looks in a screenshot.
