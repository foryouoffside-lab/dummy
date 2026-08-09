# SkillDrills — Design Implementation Plan
### Landing, All-Hubs directory, 8 category hubs, global chrome
*(Drill/gameplay screens are explicitly out of scope — this covers everything around them)*

---

## 0. Reconciling the two reviews

Both reviews land on the same root problem from different angles. Here's what each one caught that the other didn't, so nothing gets lost going forward:

| Caught by me, not the other review | Caught by the other review, not me |
|---|---|
| `Reveal` (the scroll-in component) is imported in all 8 hub files but only ever *used* in `/drills/page.js` — every hub snaps into view with zero motion | The exact "0 drills" bug on the Visual hub, and the `DRIL_CAPACITY` typo |
| Invalid Tailwind classes (`emerald-450`, `orange-455`, `slate-850/650/955`) silently kill the difficulty-tier colors on Visual Tracking and Reaction Speed | The directory needs goal-based choice, not just 8 equal cards |
| Motor hub renders `SiteFooter` nested inside another div, then bolts on a second, unstyled row of raw social icons underneath it | The explicit "start with what should I do now, not a calibrator" framing |
| Visual and Visual Tracking share the same cyan/blue identity, defeating the whole color-as-wayfinding idea | Physical reads as a mouse-trainer, not a body-training product |
| "SkillDrills **Pro**" branding contradicts "100% free, no card" messaging repeated everywhere | Cognitive's dashboard styling reads clinical/cold |
| Dead `toggleFullscreen()` call in Motor's widget | The sharper single-line thesis: *"a strong UI kit, not yet a genuinely excellent product design"* |

One more I want to add to the record because it explains *why* mobile feels worst, concretely, not just vibes: **253 uses of `hover:` across these files, zero uses of `active:`, zero `pointer: coarse` handling.** Every card lift, glow, arrow-shift and color change in this product is wired to a mouse-only pseudo-class. On a phone — which is most of your traffic — none of it fires. Mobile isn't under-designed by accident; it's structurally excluded from the interaction layer. That's finding #1 below.

**Adopted thesis for this plan:** *strong dark UI kit, not yet a genuinely excellent product design.* Four root causes, fixed in order:

1. **One file, nine palette swaps** — a template, not a system. Consistency became sameness.
2. **Atmosphere over legibility** — mono-caps everywhere, no typographic rest state, dim small text.
3. **Decoration before decision** — a 300–400px "calibrator" toy sits above the drill list on every hub.
4. **Numbers and links that don't add up** — conflicting counts, dead links, a bug showing "0 drills."

Everything below fixes these four, page by page, mobile included as a first-class target — not a squeeze-down of desktop.

---

## 1. Design Foundation — build this before touching any page

Nothing downstream matters if this layer stays ad hoc. Right now there are no tokens at all: `tailwind.config.js` defines a `primary` blue and a light-mode `gray` ramp that nothing in the dark UI even uses. Every hex value in every hub file is typed out by hand, which is exactly how you get `#050508` on the homepage and `#080d1a` on every hub — two different "black" canvases in one product, and how you get `slate-850` typo'd into existence with nobody noticing. Fix the source, not each symptom.

### 1.1 Color tokens

Add a real dark-mode palette to `tailwind.config.js` under `theme.extend.colors`, and **ban hand-typed hex/slate values in page files from this point on.**

```
canvas:      #06070B   (page background — one value, everywhere, replacing #050508 / #080d1a)
surface-1:   #0E121B   (resting card)
surface-2:   #141A26   (raised / active card, modal, popover)
hairline:    rgba(255,255,255,.08)   (default border)
hairline-2:  rgba(255,255,255,.16)   (hover/active border)
ink-1:       #F5F7FA   (headings, primary text — 15.8:1 on canvas)
ink-2:       #B4BCC9   (body copy — 7.6:1 on canvas, AA-safe at any size)
ink-3:       #7B8496   (captions/meta only, never body — 4.5:1, the floor, not the default)
```

`slate-500`/`slate-600` text on `slate-950` — the current default for every caption and card body — sits around 3.2–3.8:1. That's a fail against WCAG AA for anything smaller than 18px, and nearly everything using it is 10–12px. Replace every instance with `ink-2` for body, `ink-3` for true metadata only.

**Per-category identity pair.** This is also the fix for the Visual/Visual Tracking collision — every one of the 8 gets a hue nobody else is using, chosen for metaphor fit, not just "next color in the array":

| Category | Accent | Secondary | Why this hue |
|---|---|---|---|
| FPS | `#EF4444` red | `#F97316` ember | combat, alarm, precision — keep, it already works |
| Reaction Speed | `#F59E0B` amber | `#FBBF24` gold | lightning/urgency — your best-reviewed page, don't touch the mechanic, just the frame |
| Motor | `#10B981` emerald | `#34D399` mint | steady input, "green light" precision |
| Physical | `#FB7185` coral | `#FDBA74` copper | body warmth — deliberately *not* orange, so it stops reading as "FPS's little sibling" |
| Cognitive | `#A855F7` violet | `#C084FC` iris | neural, mind |
| Memory | `#6366F1` indigo | `#818CF8` periwinkle | archive/deep-storage, distinct from Cognitive by staying fully blue, never crossing into purple |
| Visual Tracking | `#22D3EE` cyan | `#38BDF8` sky | optics, radar, scanline — owns cyan outright now |
| Visual | `#E879F9` fuchsia | `#F472B6` pink | perception/spectrum — moved off cyan entirely so it can never again be confused with Visual Tracking |

Every hub's border-hover-glow, icon tint, badge, gradient rule, and CTA color pulls from exactly two tokens: its accent and secondary. No hub invents a third color.

### 1.2 Type system — give the page a voice, not just a volume

Right now every heading, label, badge, and button uses the same register: `font-mono`, uppercase, wide tracking. It reads confident in a screenshot and exhausting in a five-minute session, because nothing is ever allowed to be quiet. Define four registers and enforce which content each one is allowed to touch:

| Register | Use | Mobile | Desktop | Weight | Case |
|---|---|---|---|---|---|
| **Display** | Page H1 only | 2.25rem/1.15 | 3.5rem/1.05 | 800 | Sentence case |
| **Heading** | Section H2/H3 | 1.375rem | 2rem | 700 | Sentence case |
| **Body** | Descriptions, paragraphs | 0.9375rem/1.6 | 1rem/1.6 | 400 | Sentence case |
| **Data** (mono) | Durations, counts, difficulty tags, telemetry only | 0.6875–0.75rem | same | 600–700 | UPPERCASE (this is the *only* register allowed to shout) |

Rule of thumb an art director would enforce in review: **if you removed every Data-register element from a screen, the page should still read as a complete, well-organized page of Headings and Body text.** Currently it wouldn't — the mono-caps *is* the hierarchy. That's the tell that it's decoration standing in for design.

### 1.3 Space, radius, elevation

- Spacing scale: stick to the 4px base Tailwind already gives you, but standardize card padding to `p-5` mobile / `p-6` desktop everywhere (currently varies file to file for no reason).
- Radius: `rounded-xl` (12px) for cards, `rounded-2xl` (16px) for hero/panel containers, `rounded-full` for pills/badges only. Stop mixing `rounded-lg/xl/2xl` arbitrarily on siblings.
- Elevation — replace hand-tuned glow shadows (`shadow-[0_0_20px_rgba(...)]` typed fresh in every file) with three fixed steps used everywhere, category accent swapped in via CSS variable:
  - **e0 resting:** `border: 1px solid hairline`, no shadow.
  - **e1 hover/focus:** `border-color: hairline-2`, `translateY(-2px)`, `box-shadow: 0 8px 24px -8px {accent}/25`.
  - **e2 active/pressed:** `translateY(0)`, `box-shadow: 0 2px 8px -2px {accent}/35`, 80ms — the "click" feedback.

### 1.4 Motion — fix what's already broken before adding anything new

Two dead systems are already in the codebase:

- `styles/globals.css` line 45–47 says it outright: *"this repo has no tailwindcss-animate plugin installed, so the `animate-in fade-in zoom-in-*` utility soup seen elsewhere in the codebase is a silent no-op."* Anywhere that class combo appears, delete it — it's doing nothing and misleading the next person who reads the file into thinking motion is handled.
- `<Reveal>` ([components/Reveal.js](components/Reveal.js)) is a real, working, IntersectionObserver-based fade/slide-up component. It's imported into every hub file and used in exactly one page. **Wrap it around the hero, the "Start Here" band, and each drill-grid section on every hub**, staggered 60ms per sibling, 350ms duration, 16px y-offset — matching what the homepage already does. This single change makes every hub *feel* like part of the same product as the homepage, for the cost of adding a tag around content that already exists.

New rules going forward:
- Entrance: 300–450ms ease-out, translateY(12–16px) → 0 + opacity, staggered ~70ms.
- Hover (pointer devices only): 150ms ease.
- Press/active (all devices): 80–100ms, slightly snappier than the release — presses should feel instant, releases can ease.
- Respect `prefers-reduced-motion`: drop the transform, keep opacity only.

### 1.5 Touch and hover parity — the actual mobile fix

This is the highest-leverage change in the whole plan. Every interactive card in this product currently defines its feedback as `hover:border-*`, `hover:-translate-y-1`, `group-hover:translate-x-1`, `group-hover:text-*`. On a touch screen, `:hover` either never fires or fires-and-sticks after a tap (the classic mobile Safari "stuck hover" bug — a card stays lit until the user taps somewhere else). Net effect: on phones, every card in this product is either dead or subtly glitchy.

Fix, applied globally, not per-page:
- Every `hover:` state gets a matching `active:` state using the **e2** elevation step above (scale/translate down slightly + accent glow flash), so a tap gives immediate physical feedback.
- Wrap hover-only affordances in `@media (hover: hover) and (pointer: fine)` at the token/component level so touch devices never inherit a "hover" that can get stuck.
- Minimum tap target: 44×44px for any icon-only control (the social icons in the footer and Motor's orphaned row currently look closer to 32px). Text links inside cards get at least 8px of padding on all sides as a tap buffer.
- No information may exist *only* in a `:hover` tooltip or reveal. If a mouse user needs to hover to learn something, a phone user needs another way to learn the same thing (visible by default, or on tap).

### 1.6 Accessibility floor

- Contrast: every text/background pair ≥ 4.5:1 (body) or 3:1 (large text ≥ 24px/19px-bold). The `ink-2`/`ink-3` tokens above are pre-checked against `canvas`/`surface-1`/`surface-2` — use them and this is solved by construction, not by auditing after the fact.
- Every card/link gets a visible `focus-visible` ring (2px, category accent, 2px offset) — currently only a handful of elements define `focus:ring-*` and most don't.
- Every icon-only button gets an `aria-label` (footer social icons currently have `title` but not all have `aria-label`; be consistent).
- `prefers-reduced-motion` respected everywhere motion is added per 1.4.

### 1.7 Responsive authoring rule

Stop treating mobile as "whatever's left after `lg:` add-ons stop applying." Author base (unprefixed) classes *for the phone viewport first*, then use `sm:`/`md:`/`lg:` to progressively enhance for more room — which is what Tailwind is built for, but isn't how these files are written today (several hero widgets are `hidden` below `lg`, meaning phones **and tablets** — anything under 1024px — get the stripped-down version). Two concrete changes:

- Anything currently gated `hidden lg:block` for "extra" hero content gets a real mobile-appropriate substitute, not just a hidden div. See each page spec below.
- Hub pages get a **mobile-only sticky bottom action bar**: a slim, `backdrop-blur` bar pinned to the viewport bottom (safe-area-inset aware) with the single primary CTA ("Start Recommended Drill →") always within thumb reach, so a user three screens deep in a drill grid never has to scroll back up to act. Desktop doesn't need this — the CTA is already in view in the hero/Start Here band.

---

## 2. Category Personality System

The tension in both reviews — "consistency" vs. "sameness" — has one correct resolution: **keep the skeleton identical, change the skin.** Same information architecture, same spacing rhythm, same accessibility floor, same card anatomy *shape* across all 8 hubs (that consistency is good — it's why the site doesn't feel like eight different products glued together). What must stop being identical is color, motif, the diagnostic widget's actual mechanic, and the copy voice. Right now all four of those are cloned too, which is the actual complaint.

| Category | Motif (visual metaphor) | Distinct diagnostic mechanic (replaces the shared "hit the dot" widget) | Voice adjustment |
|---|---|---|---|
| FPS | Crosshair, HUD, reticle — the one hub allowed to look like a game | Micro-flick accuracy: short-distance target snap, ms + px error | Keep the tactical voice — it's earned here |
| Reaction Speed | Single stimulus, stopwatch | Classic single-stimulus reaction time (already correct — keep) | Short, urgent, plain: "How fast are you, right now" |
| Motor | Cursor trail, fine-grain grid | Click-accuracy sprint (already correct — keep) | Precise, mechanical, calm |
| Physical | Compass/directional dial, body silhouette — **not** a crosshair, **not** `cursor-crosshair` | Arrow-key/WASD directional reflex (mechanic already correct — restyle only, drop the aim-trainer skin) | Plain-body language: "reaction," "balance," "coordination" — retire "Engage Reflex Check" |
| Cognitive | Neural node/synapse lines (keep the particle canvas — it's genuinely nice) | Single-stimulus latency test (keep) | Plain-language outcomes: "how long you take to notice and respond," not "neural synaptic latency calibrator" |
| Memory | Stacked cards/sequence chips | Digit-span recall (already correct, genuinely on-brand — a real validated psych paradigm — keep) | Keep it concrete: "how many digits can you hold and repeat" |
| Visual Tracking | Scanline/radar, continuous motion path | **New:** continuous pursuit — track a smoothly moving dot with the cursor, score = average tracking error over the run | "How well you follow motion," continuous framing |
| Visual | Spectrum/aperture, discrete flash points | **Keep** discrete saccade-to-target click test (this is what Visual Tracking currently clones — leave it here, give Tracking the new continuous mechanic above) | "How fast you find and fix on something new" |

That one swap — Visual keeps the discrete click test, Visual Tracking gets a genuinely continuous pursuit test — fixes "too similar to Visual" at the mechanic level, not just the color level. It's also a more honest name match: *tracking* should test tracking, not another snap-to-target click.

---

## 3. Confirmed defect ledger

Fix these regardless of anything else — they're bugs, not opinions, and no page can be a 10 while any of its numbers or links are visibly wrong.

| # | File | Issue | Fix |
|---|---|---|---|
| 1 | `app/HomePageClient.js` `categories` array | Reaction Speed hub is missing from the homepage grid entirely (7 shown, hero claims 9) | Add the 8th card; source the count from `DRILLS`, not a hardcoded number |
| 2 | `app/drills/visual/VisualDrillsClient.js:169` | `drills.filter(d => d.enabled).length` — `DRILLS` entries have no `enabled` field, so this is always `0`, shown live as "DRIL_CAPACITY: 0" | Replace with `drills.length` |
| 3 | `.../VisualDrillsClient.js:266`, `.../MotorDrillsClient.js:331`, `.../PhysicalDrillsClient.js:334` | "DRIL_CAPACITY" / "DRIL_CHANNELS" / "DRILS_LINKED" — typo'd label, missing an L, in three separate files | Fix the string in all three, and see §1.2 — this whole label register should be used sparingly anyway |
| 4 | `app/drills/cognitive/CognitiveHubClient.js` related-links array | "Productivity" card links to `/drills/cognitive` — the page the user is already on | Point it somewhere real or remove the card |
| 5 | `app/drills/physical/PhysicalDrillsClient.js` related-links array | Two cards ("Cognitive Sector" and "Productivity") both link to `/drills/cognitive` | De-duplicate; link to 4 genuinely different hubs |
| 6 | `app/drills/memory/MemoryClient.js` related-links array | Grid is authored for 4 columns but only 2 items supplied — visible empty gap on desktop | Supply 4 related hubs like every sibling page |
| 7 | `app/drills/visual-tracking/VisualTrackingDrillsClient.tsx:395–449`, `app/drills/reaction-speed/ReactionSpeedDrillsClient.tsx:235,327` | `text-emerald-450`, `text-amber-450`, `text-orange-455`, `text-slate-850`, `text-slate-650`, `via-slate-955` are not real Tailwind shades (scale stops at 950) — these compile to nothing | Replace with real tokens from §1.1; this is why the tier labels aren't showing the color they were designed to |
| 8 | `app/drills/motor/MotorDrillsClient.js:497–531` | `<SiteFooter />` is rendered *inside* the "Explore Adjacent Sectors" wrapper div, then a second, unstyled raw-SVG social-icon row is rendered after it — the only hub with a visibly broken footer | Move `<SiteFooter />` back outside as its own top-level element, matching every other hub; delete the duplicate icon row (SiteFooter has no such row, so this was never meant to ship twice) |
| 9 | `app/drills/motor/MotorDrillsClient.js:~109` | Calls `toggleFullscreen()`, a function never defined or imported in this file | Delete the dead call |
| 10 | `app/layout.js`, `app/HomePageClient.js`, `app/drills/page.js`, and each hub's JSON-LD | Drill/category counts independently claim 113+, 115+, 120, and 135+ drills, and 8, 9, and 10 categories | One source of truth: `DRILLS.length` and `DRILLS.filter(d => d.category === x).length`, imported everywhere a count is displayed or written into structured data. Never hand-type a count again. |
| 11 | `components/SiteHeader.js` | Brand reads "SkillDrills**Pro**" while every CTA on the site says free/no card required | Drop "Pro," or repurpose it later for an actual paid tier — don't let it sit there implying one that doesn't exist |
| 12 | Sitewide | 253× `hover:`, 0× `active:`, 0× `pointer: coarse` | See §1.5 — apply the active-state pass everywhere before calling any page done |

---

## 4. Page-by-page specifications

Each page below assumes the foundation in §1–2 is already in place, and lists what's specific to that page on top of it.

### 4.1 Global chrome — Header & Footer (currently 7/10)

**Header** ([components/SiteHeader.js](components/SiteHeader.js)):
- Add an active-state indicator to `navCategories` links — compare `usePathname()` and give the current section its category accent color permanently, not just on hover. Right now there is no way to tell which hub you're in from the header.
- Mobile: the search bar currently sits between the logo and the hamburger at all sizes, competing for a cramped top bar under ~380px width. Below `sm`, collapse to logo + search-icon-only (expands to full-width overlay on tap) + hamburger — three elements, not a squeezed input field.
- Resolve item #11 above (drop or re-earn "Pro").

**Footer** ([components/SiteFooter.js](components/SiteFooter.js)):
- Already the most honest, best-structured piece of chrome on the site — keep its bones. Pull `count` per category from `DRILLS.filter(...).length` instead of the hardcoded strings at the top of the file (lines 5–12), so it can never drift from reality again.
- Apply the active/tap-state pass from §1.5 to the category tiles — they're currently `hover:` only like everything else.

**10/10 checklist:** active nav state present · search doesn't crowd the header under 380px · footer counts are computed, not typed · "Pro" resolved · every tile has a real `:active` state.

---

### 4.2 Homepage (current: 6.8 / 6.5 blended — target 10)

**What to keep:** the radial-grid canvas treatment, the gradient headline, the "Diagnostic Profile" returning-user panel — genuinely good instincts, keep all three.

**IA reorder** (this is the main structural change): Hero → **Proof band (new)** → Categories → Features → Audience → CTA → Footer. Proof moves up because right now the page asks for trust before earning any.

**Proof band — the fix for "no evidence," the sharpest miss in the first pass.** Add a section directly under the hero with three honest, non-fabricated elements:
1. A small browser-chrome-framed card with a genuinely looping, muted, auto-playing preview of one real flagship drill (Flick Shot or the Digit Span calibrator) — 4–6 seconds, looped, actual product, not a mockup.
2. An example progress curve — clearly labeled **"Example progress curve"** in the caption, not presented as a live user's real data (don't fabricate a testimonial or a stat you don't have — that's a line worth holding; the moment this site invents a "94% of users improved" number, it becomes exactly as untrustworthy as its current count mismatches, just in a new place).
3. A one-line methodology strip naming the *actual, real, well-established* paradigms the drills are modeled on — digit span, N-back, simple/choice reaction time, task-switching cost. These are genuinely real, citable, decades-old cognitive-psychology instruments; naming them plainly is honest credibility, not decoration. Do not invent a study, a citation, or a percentage you can't back up.

**Hero, mobile-specific (this is the actual fix for "flat on mobile," not just hiding the widget):** the radar/telemetry widget is `hidden lg:block` — that's not just phones, that's every tablet and small laptop under 1024px losing the page's best visual moment. Replace the binary hide with a real mobile variant: a compact horizontal stat strip (the three metrics already in the desktop widget — latency, aim match, stability — collapsed into a single-row card under the headline) so phones get a lighter *version* of the same idea, not nothing.

**Categories section:** fix defect #1 (add Reaction Speed) and pull every count live from `DRILLS`.

**10/10 checklist:** proof band present with no fabricated numbers · all 8 categories shown · every stat traced to `DRILLS.length` · mobile hero has a real (not hidden) secondary visual · `<Reveal>` stagger already present, keep it.

---

### 4.3 All Training Hubs — `/drills` (current: 6.0 — target 10)

The cleanest page in the product structurally, and the one both reviews agree fails at its actual job: helping someone choose.

**Add a goal-picker row above the grid**, pure client-side filter/scroll-to, no backend needed:
`New here` · `Improve my aim` · `React faster` · `Remember more` · `Just 5 minutes`
Tapping a pill re-sorts the same 8 cards (goal-matched categories float to the top) rather than hiding any — nobody should hit a dead end. Default state (no pill selected) shows today's neutral order.

**Card upgrade:** each card currently states a count and a two-line description. Add one concrete line of *what you'll actually be doing* in plain language (e.g., under FPS: "Track and flick-click moving targets") — the missing "what happens if I click this" signal that makes 8 equally-weighted cards feel like a directory instead of a decision aid.

**Mobile:** single column already works structurally; add the goal-picker as a horizontally scrollable pill row (not a wrapped grid) so it doesn't push the actual hub cards below the fold on a 375px-wide screen.

**10/10 checklist:** goal-picker present and functional · every card states a concrete action, not just a category label · single-column mobile layout keeps goal-picker to one scrollable row.

---

### 4.4 FPS Hub (current: 6.4 — target 10)

- Apply §1.2: the header stat block ("DRILLS_CONNECTED," "Esports Portals Loaded") is pure Data-register text with nothing else on the page to contrast it against — that's the "empty space and fake system language dominate" complaint. Cut the stat panel from a full-width standalone card down to a small inline chip beside the H1; spend the freed vertical space on the **Start Here** band below.
- Add the **Start Here** band (see §1 IA principle): 3 cards — "New to aim training," "Warm-up," "Full session" — each linking straight to a specific drill, above the full grid.
- Demote the flick-accuracy calibrator to a small optional card (max ~180px tall) inside the Start Here row, not its own full-width hero section.
- Keep the crosshair/HUD motif — this is the one hub it's earned in.
- Mobile: sticky bottom bar per §1.7 with the single top recommended drill.

**10/10 checklist:** stat block is a chip, not a hero panel · Start Here band exists above the full grid · calibrator is small and optional · sticky mobile CTA present · `<Reveal>` wraps each section.

---

### 4.5 Cognitive Hub (current: 6.5 — target 10)

- This is the "clinical/cold dashboard" complaint. The neural-particle canvas background is a genuine asset — keep it — but every foreground panel is a bordered box with mono-caps labels, which is what reads cold. Let the Benefits grid and the subcategory intro copy drop to Body register (sentence case, 400 weight, no border-box) so the page has somewhere to breathe between data panels.
- Rewrite: "Neural Synaptic Latency Calibrator" → "Reaction Time Check." "COGNITIVE_NODES" → drop, or fold into a plain sentence ("42 drills across 5 focus areas"). "SYNAPTIC CORE IMPROVEMENT METRICS" → "What this improves."
- Start Here band: "Never done cognitive training," "5-minute focus reset," "Full circuit."
- Mobile: the particle canvas is already lightweight (canvas 2D, low particle count) — safe to keep running on mobile, but confirm it pauses via `visibilitychange` so it doesn't burn battery in a backgrounded tab (not currently handled).

**10/10 checklist:** at least one full section per screen uses plain Body register, no border-box · jargon labels rewritten per above · Start Here band added · canvas animation pauses when tab is hidden.

---

### 4.6 Memory Hub (current: 6.3 — target 10)

- Currently a near-clone of Cognitive with a different color — give it its own card anatomy, not just its own hue: memory cards get a small "sequence chip" strip (dots representing span length) in the card header instead of Cognitive's plain icon-in-box, so the two are visually distinguishable from across the room, not just up close.
- Fix defect #6 (related-links grid).
- The Digit Span calibrator mechanic is genuinely good and on-brand — keep it, just shrink it into the Start Here band rather than a full hero row.
- Rewrite "MEMORY STACK CONTROLLER" / "RAM_STK" / "N_BACK" badge chips → plain: "Working memory," "Spatial recall," "Sequence recall."

**10/10 checklist:** card anatomy visibly distinct from Cognitive's · related-links grid full · calibrator demoted to Start Here · badge chips in plain language.

---

### 4.7 Motor Hub (current: 6.5 / 4.5 blended — target 10)

This is currently the weakest page on the site by implementation, not concept — fix the confirmed bugs first (defects #3, #8, #9), then apply the same template upgrades as every other hub. Its card anatomy (icon + category) is actually one of the clearer ones per the second review — preserve that, don't over-rebuild it.

**10/10 checklist:** footer renders once, correctly, as its own element · no duplicate social-icon row · no dead `toggleFullscreen()` call · typo fixed · Start Here band added · mobile sticky CTA present.

---

### 4.8 Physical Hub (current: 6.3 — target 10)

The identity-confusion page. The arrow-key/WASD widget mechanic is *already correct* — genuinely distinct from every mouse-precision widget elsewhere on the site — but the surrounding visual and verbal skin (`cursor-crosshair` styling references, "Engage Reflex Check," gaming-HUD badge chips like "REFLEX_MS") all still borrow FPS's aim-trainer language, so the mechanic's good instinct gets buried under a mismatched costume.

- Replace any crosshair-styled cursor/button treatment in this hub with the compass/directional-dial motif from §2 — the arrow buttons already form a dial layout; lean into that shape (circular dial frame, N/S/E/W arrangement) instead of the square 3×3 grid button layout currently used.
- Rewrite: "Engage Reflex Check" → "Start Reflex Test." "KINETIC REFLEX HQ" → drop. "REFLEX_MS" / "AGILITY" badges → keep as small Data-register chips, that's a legitimate use of the register, just don't surround them with more of the same.
- Fix defect #5 (duplicate related-links).
- Category icon: swap the generic `Dumbbell` for something that reads as movement/reflex rather than gym equipment, given the drills here are reflex/balance/coordination, not strength training.

**10/10 checklist:** no crosshair-cursor or aim-trainer visual language remains · dial-shaped widget frame · copy rewritten · related-links de-duplicated.

---

### 4.9 Visual Hub (current: 7.0 / 5.5 blended — target 10)

Best-composed of the "second template family" per one review, generic-feeling per the other — both true, because its structure is solid but its identity currently overlaps with Visual Tracking. Once §1.1's fuchsia/pink identity and §2's mechanic split are applied (Visual keeps the discrete saccade-click test), this page's existing structure genuinely doesn't need much more:
- Re-skin to fuchsia/pink per §1.1.
- Rewrite "Cognitive Hub" badge chip in the hero (a leftover copy-paste — this is the *Visual* hub, not Cognitive) — small thing, but it's exactly the kind of copy-paste residue that tells a careful visitor this page was cloned from another one.
- Start Here band: "New to visual training," "Peripheral awareness reset," "Full circuit."

**10/10 checklist:** fuchsia/pink identity applied and no longer shares cyan with Tracking · "Cognitive Hub" badge copy-paste fixed · Start Here band added.

---

### 4.10 Visual Tracking Hub (current: 7.0 / 5.0 blended — target 10)

Fix defect #7 (invalid Tailwind shades — the difficulty-tier labels on this exact page aren't rendering their intended color right now) and implement the continuous-pursuit widget from §2 to genuinely differentiate it from Visual, rather than relying on copy alone ("Ocular Lab" vs. "Cognitive Hub" badge) to do the differentiation work.

- New widget: cursor-follow pursuit — a dot moves in a smooth path (sine or lissajous curve) for 8–10 seconds; score = average pixel deviation between cursor and target over the run, shown as "Tracking Accuracy: N%" — mechanically distinct from every discrete "click the dot" widget elsewhere on the site.
- Own cyan/sky identity outright per §1.1 now that Visual has moved to fuchsia.

**10/10 checklist:** tier-color bug fixed and visibly correct on render · new continuous-pursuit widget replaces the cloned saccade-click test · cyan identity no longer shared with any other hub.

---

### 4.11 Reaction Speed Hub (current: 7.1 / 5.0 blended — target 10)

Reviewed as the strongest hierarchy/CTA clarity on the site by one pass — protect that, don't over-rebuild it. Apply the shared fixes without disturbing what's already working: real Tailwind shades (defect #7 also touches this file), Start Here band, `<Reveal>` stagger, mobile sticky CTA, active/tap states. Its "orange accent works well" note in the second review — keep amber/gold exactly as specified in §1.1, don't let the category-personality pass accidentally reassign it.

**10/10 checklist:** shared foundation fixes applied · existing CTA clarity and hierarchy untouched · amber/gold identity preserved.

---

## 5. Execution roadmap for Antigravity

Work in this order — each phase is a prerequisite for the next one actually landing correctly, not a priority guess.

**Phase 0 — Foundation (do first, touch no page content yet)**
Add the color tokens, type scale, elevation steps, and motion rules from §1 to `tailwind.config.js` and a shared CSS layer. Add the `active:`/`pointer: coarse` handling as a reusable pattern (a small set of component classes or a Tailwind plugin — not per-file repetition).

**Phase 1 — Kill the credibility bugs**
Everything in §3, the defect ledger. All file:line, all mechanical, no design judgment required, and every one of them is currently visible to a real user today.

**Phase 2 — Information architecture reorder**
Apply the Hero → Start Here → Grid → (small) Diagnostic → Benefits → Related → Footer order to every hub, and Hero → Proof → Categories → ... to the homepage. This is a reorder of existing content plus the new Start Here/Proof bands — not a rewrite of the drill grids themselves.

**Phase 3 — Category personality pass**
Apply §2's table: recolor per the new 8-way palette, swap Visual Tracking's widget mechanic, restyle Physical off the aim-trainer skin, fix the Cognitive/Memory/Visual copy-paste residue.

**Phase 4 — Mobile-specific pass**
Sticky bottom CTA bars, the homepage hero's mobile stat-strip substitute, header collapse under 380px, tap-target audit (44px floor), safe-area-inset checks on the sticky bar.

**Phase 5 — Motion and polish**
Wrap sections in `<Reveal>` sitewide, delete every dead `animate-in` class, apply the elevation e0/e1/e2 recipe everywhere a card currently hand-rolls its own shadow.

**Phase 6 — QA against the rubric below**
Walk every page against §6 before calling anything done.

---

## 6. Definition of Done — the 10/10 rubric

A page doesn't count as finished until every line here is true, checked at both a 375px and a 1440px viewport:

- [ ] Every count, stat, and total on the page traces to `DRILLS` — no hand-typed numbers.
- [ ] Every link on the page goes somewhere real and distinct — no dead self-references, no duplicates.
- [ ] Body text is `ink-2` or lighter — nothing smaller than 15px carries more than a caption's worth of meaning.
- [ ] At least one section per page reads in plain Body register with no border-box around it.
- [ ] The page's category accent appears nowhere else in the other 7 hubs.
- [ ] Every hover-driven affordance has a matching `:active` state, verified by tapping on an actual phone, not resizing a browser.
- [ ] The primary CTA is reachable by thumb without scrolling, on a phone, at all times (sticky bar or in-viewport).
- [ ] Every section enters via `<Reveal>` or an equivalent real transition — nothing snaps into place.
- [ ] Nothing on the page states a claim (a stat, a percentage, a "trusted by") that isn't either computed live or explicitly labeled as an example.
- [ ] A first-time visitor can answer "what do I click first" within one screen's worth of scrolling, without reading a calibrator widget's instructions first.

---

## 7. Mobile Category Gating — FPS / Physical / Motor

**Product decision (confirmed):** FPS, Physical, and Motor are laptop/desktop-only products — mouse and keyboard dependent. On mobile devices, they are removed from every browsing/discovery surface (homepage, `/drills` directory, header, footer, and the "Explore Adjacent Hubs" sections of every other category page). Confirmed against the actual drill code before scoping this: FPS is 13/17 drills mouse-only, Physical is 15/17, Motor is genuinely mixed (5/15 already have touch handlers — `drag-and-drop`, `click-accuracy`, `aim-trainer`, `finger-sequencing`, `velocity-matcher`) — the whole-category decision was made anyway, deliberately, over the more granular per-drill alternative. Noted for the record, not re-litigated.

**The one rule that makes this safe: hide with CSS, never with JavaScript conditional rendering, and never with user-agent sniffing.**

- Google indexes and ranks pages using the **mobile render** by default (mobile-first indexing). Content that's in the DOM but hidden with `display: none` (Tailwind's `hidden` / `lg:hidden` utilities) is still crawled and indexed normally — Google has stated this explicitly for tabs, accordions, and responsive nav for years. Content that a client-side conditional (`{!isMobile && <Card />}`) never renders into the DOM at all is invisible to a mobile-rendering crawler too, because it never existed for it to see.
- User-agent sniffing is the wrong tool regardless — UA strings are spoofable, drift constantly, and doing it server-side while the client re-evaluates on hydration is exactly how you get React hydration-mismatch errors.
- So: every "hide this on mobile" instruction below means **`hidden lg:flex`** (or `lg:block`/`lg:grid`, matching whatever `display` the element already uses at `lg+`) — a pure breakpoint media query, resolved by the browser, identical markup shipped to every device and every crawler. `lg` (1024px) matches the breakpoint already used everywhere else on this site for the mobile/desktop split (`StickyMobileCta`, `SiteHeader`'s nav/hamburger swap) — stay consistent with it, don't introduce a second breakpoint for the same concept.

**Explicit boundary — read this before touching anything:** this only changes what mobile visitors get *steered toward*. It does not touch:
- `app/sitemap.js` — leave FPS/Physical/Motor and all their drill URLs in it, unchanged.
- The FPS/Physical/Motor hub pages and every individual drill page under them — they stay fully functional and reachable by direct URL (a shared link, a bookmark, a search result). Do not add a redirect, a block screen, or a viewport check that prevents rendering on these pages themselves. Gating a page's own content based on the visiting device is what actually damages that page's own mobile indexing — that's a materially worse SEO outcome than losing one internal nav link, which is why the fix here is scoped to *discovery surfaces only*.

### 7.1 Shared source of truth

Add one constant, once, to `lib/drillsRegistry.js` (it's already the single source of truth for everything else category-related):

```js
// Mouse/keyboard-dependent categories — hidden from mobile discovery surfaces only.
// CSS-hidden (not conditionally rendered), so routing/sitemap/SEO are unaffected.
export const DESKTOP_ONLY_CATEGORIES = ['fps', 'physical', 'motor'];
```

Every file below imports this array and checks `DESKTOP_ONLY_CATEGORIES.includes(categoryId)` — never re-hardcode the three IDs a second time anywhere. If this list ever changes, it changes in one place.

### 7.2 Surface-by-surface checklist

| File | What's there today | Change |
|---|---|---|
| `app/HomePageClient.js` | Categories grid maps all 8 `categoryConfigs` | On each card's `<Reveal>` wrapper, add `hidden lg:block` when `DESKTOP_ONLY_CATEGORIES.includes(cat.id)` is true. The `<Link>` inside keeps its existing `flex flex-col justify-between` — those classes stay inert until `lg:block`'s sibling display kicks in, so no restructuring needed, just the conditional class on the wrapper. |
| `app/drills/DrillsDirectoryClient.js` | Grid maps `sortedCategories` (8 cards) + goal-picker pills | Same per-card `hidden lg:block` treatment keyed off `DESKTOP_ONLY_CATEGORIES`. Leave the goal-picker pills as-is — "Improve My Aim" still surfaces Visual Tracking on mobile even with FPS/Motor hidden, it's not a dead end. |
| `components/SiteHeader.js` | Mobile hamburger dropdown maps `navCategories` (all 8) | This block is already gated behind `{mobileMenuOpen && (...)}` — it doesn't render until a mobile user taps the hamburger, so it isn't a crawl-relevant surface either way. Just `.filter(cat => !DESKTOP_ONLY_CATEGORIES.includes(cat.key))` on the array before mapping — a plain array filter is correct and simpler here, no CSS-hiding needed. The desktop nav (`hidden lg:flex`) already excludes itself from mobile wholesale, so nothing to change there. |
| `components/SiteFooter.js` | Category grid maps all 8 `categoryConfigs` | Same `hidden lg:block` per card (or `hidden lg:flex` — match whatever display the card div already uses), keyed off `DESKTOP_ONLY_CATEGORIES`. |
| `app/drills/cognitive/CognitiveHubClient.js` | "Explore Adjacent Hubs" — 4 hand-authored `<Link>` cards: Memory, Reaction Speed, Visual Tracking, **Motor** | Add `hidden lg:block` to the Motor card only. |
| `app/drills/memory/MemoryClient.js` | Related hubs — Cognitive, Visual Tracking, Reaction Speed, **FPS** | Add `hidden lg:block` to the FPS ("Tactical Aim") card only. |
| `app/drills/visual/VisualDrillsClient.js` | Related hubs — **FPS**, **Motor**, Cognitive, Memory | Add `hidden lg:block` to both the FPS and Motor cards. |

Visual Tracking's and Reaction Speed's hub pages don't have an "Explore Adjacent" section referencing these three — nothing to change there. The FPS/Physical/Motor hubs' own "Explore Adjacent" sections (which cross-link each other and the safe five) are left untouched per the boundary above — a visitor who reached one of these three hubs directly has already opted into desktop-oriented content, so those internal links don't need gating.

### 7.3 "Desktop Only" labeling — required, both ends

These three hubs stay directly reachable (shared links, search results, a desktop user texting a link to someone), so label the decision clearly wherever it's visible, on both ends of the experience:

**On the category cards themselves** (Homepage, `/drills` directory, footer — visible at `lg+`, where FPS/Physical/Motor show up as normal): add a small badge reading **"Desktop Only"** to each of the three cards, next to or below the existing drill-count chip, styled consistently with each hub's own accent color (red for FPS, coral for Physical, emerald for Motor) so it reads as an attribute of the card, not an error state.

**On the hub pages themselves** (`/drills/fps`, `/drills/physical`, `/drills/motor` — shown only below `lg`, inverted `lg:hidden`, since desktop visitors don't need to be told): a non-blocking banner at the top of the page, title **"Only Desktop Supported"**, body: *"This category uses precise mouse and keyboard input and isn't built for touch. You can still browse and read about the drills here, but for the real experience, switch to a laptop or desktop."* No redirect, no gate on the content below it — the drills grid still renders in full underneath, exactly as it does today.

### 7.4 Acceptance checklist

- [ ] `DESKTOP_ONLY_CATEGORIES` exists once in `lib/drillsRegistry.js`; no file hardcodes `['fps', 'physical', 'motor']` a second time.
- [ ] At a viewport under 1024px: Homepage, `/drills`, footer, and the header's mobile menu show exactly 5 categories (Cognitive, Memory, Visual, Visual Tracking, Reaction Speed) — FPS/Physical/Motor cards are absent from view.
- [ ] At 1024px and above, all 8 categories are back, unchanged from today.
- [ ] View source / inspect the DOM at a mobile viewport width: the FPS/Physical/Motor `<a href>` tags for the CSS-hidden surfaces are still present in the markup (`display:none`, not absent) — confirms this is crawlable-safe, not conditionally omitted.
- [ ] `/drills/fps`, `/drills/physical`, `/drills/motor` and every drill page beneath them still load normally and fully when visited directly at a mobile viewport width.
- [ ] `app/sitemap.js` is untouched — still lists all three hubs and every drill under them.
- [ ] Cognitive's, Memory's, and Visual's "Explore Adjacent Hubs" sections each show one fewer (or two fewer, for Visual) card below `lg`, with no leftover gap/misalignment in the grid.
- [ ] At `lg+`, the FPS, Physical, and Motor cards on Homepage/`/drills`/footer each carry a visible "Desktop Only" badge.
- [ ] Below `lg`, visiting `/drills/fps`, `/drills/physical`, or `/drills/motor` directly shows the "Only Desktop Supported" banner at the top, with the full drills grid still rendering normally beneath it.
