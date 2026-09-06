# Live Drill Previews on Category Cards — Execution Prompt

Paste **Sections 1–7** into Antigravity for the first run. For every follow-up run, paste
**Section 3 (Operating Rules)** plus **one row of Section 8**.

---

## 1. Objective

On every drill **category / hub page**, each drill is currently sold by a static card: an
icon, a name, a one-line tagline, chips and a "Launch Drill" link. A first-time visitor
cannot tell what "Anchor, then snap to the micro-target" actually looks like until they
commit to opening the drill.

Replace the static icon block with a **live, silent, non-interactive mini-demo of the drill
itself** — a looping animated preview that plays the drill's real mechanic in miniature
inside the card, so the visitor *sees* the drill before choosing it.

This is a **presentation-layer feature only**. It must not change any drill's gameplay,
scoring, difficulty curve, storage keys, routing or SEO metadata.

### Definition of done (one sentence)
A visitor scrolling `/drills/fps` sees each card playing a small, smooth, autonomous
animation of that drill's core action, the page stays at 60fps on a mid-range laptop and a
mid-range phone, Lighthouse performance does not regress, and users with
`prefers-reduced-motion` get a clean static frame instead.

---

## 2. Codebase facts you must know before writing code

Verified against the repository — do not re-derive, but do re-read the files named:

| Fact | Detail |
|---|---|
| Stack | Next.js 15 App Router, React 18, JS + partial TS, Tailwind 3.4 |
| Animation lib available | `framer-motion@11` (already a dependency — but see §4, canvas is preferred for the previews) |
| Icons | `lucide-react` |
| Hub clients (8) | `app/drills/DrillsDirectoryClient.js`, `app/drills/fps/FPSHubClient.js`, `app/drills/cognitive/CognitiveHubClient.js`, `app/drills/memory/MemoryClient.js`, `app/drills/motor/MotorDrillsClient.js`, `app/drills/physical/PhysicalDrillsClient.js`, `app/drills/visual/VisualDrillsClient.js`, `app/drills/reaction-speed/ReactionSpeedDrillsClient.tsx`, `app/drills/visual-tracking/VisualTrackingDrillsClient.tsx` |
| Reference card markup | `app/drills/fps/FPSHubClient.js` — the `<Link>` card inside the results grid (~line 470). Read it in full before changing anything. |
| Card-level data pattern to copy | `lib/drillCatalog.js` (`DRILL_TAGLINES`, `FEATURED_ORDER`) — a plain keyed-by-href map with a comment block explaining why it exists. Your preview registry follows exactly this shape and file style. |
| Drill source of truth | `lib/drillsRegistry.js` (81+ drills, keyed by href) |
| Localised hubs | `app/{de,es,ja,ko,pt}/drills/**/page.js` re-import the **same** hub clients. One change to a client ships in all six languages automatically — never fork a client per locale. |
| Design tokens | `surface-1`, `surface-2`, `hairline`, `ink-1`, `ink-2`, `ink-3`, plus per-hub accent (FPS = `red-500`/`orange-500`). Previews must use these tokens, never hardcoded hex. |
| Build command | `npx next build` — **NOT** `npm run build`, whose `postbuild` step pings the live IndexNow endpoints at Bing, Yandex and Seznam. |

---

## 3. Operating rules for the agent

1. **One phase per run.** Complete exactly one row of Section 8, report, then STOP. Do not
   start the next phase until the user replies "yes".
2. **Never edit** `lib/drillDifficulty.js`, `lib/drillsRegistry.js`, `components/drill/DrillResultCard.js`,
   or any drill client under `app/drills/**/[drill]/*Client.*`. This feature adds files and
   touches hub clients only. If a preview seems to need a change inside a real drill, stop
   and report instead.
3. **No new runtime dependencies.** No animation library, no sprite pipeline, no video files.
4. **No gameplay in the card.** The preview is `aria-hidden`, `pointer-events: none`, has no
   click handlers, no input listeners and no score. The whole card stays one `<Link>`.
5. **Never regress the tagline.** The preview is added *alongside* name + tagline, not in
   place of them — the text is what search engines read.
6. After each phase run `npx next build`, and report bundle-size delta for the affected routes
   from the build output.
7. Report what changed, the build result, measured FPS/CPU (see §6), and anything that did not
   match this spec.

---

## 4. Architecture — build exactly this

Four new pieces. Nothing else.

### 4.1 `lib/previewTicker.js` — one loop for the whole page
A module-level singleton in the same shape as the existing `lib/drillAudio.js` /
`lib/drillFlash.js` singletons.

- Exposes `subscribe(fn) → unsubscribe`.
- Runs **one** `requestAnimationFrame` loop for the entire page, no matter how many cards
  are mounted. N cards must never mean N rAF loops.
- Calls each subscriber with `(elapsedMs)` — a shared monotonic clock, so animations are
  **time-based, never frame-count-based** (identical speed at 60Hz, 120Hz and 144Hz).
- Frame-caps to **30fps** (previews are decorative; 30fps halves the CPU cost and is visually
  indistinguishable at this size).
- Stops the loop entirely when the subscriber count hits 0, on `document.hidden`
  (`visibilitychange`), and when the tab loses focus.

### 4.2 `components/drill/previews/scenes.js` — the scene library
Each scene is a **pure draw function**, not a component:

```js
// { id, label, draw(ctx, { t, w, h, accent, dim, seed }) }
```

- `t` is elapsed ms from the shared ticker; `seed` makes motion deterministic per card so two
  cards of the same archetype are not in lockstep.
- Colours arrive as **resolved CSS custom-property values** read once from the card element —
  the scene never hardcodes a colour, so light/dark theme and per-hub accents both work.
- Every scene loops seamlessly over a **2.5–4s** period and reads as one clear idea. It is a
  *pictogram in motion*, not a playable game: 2–5 moving elements maximum.

Ship these archetypes (they cover the 81 drills):

| Scene id | Shows | Example drills |
|---|---|---|
| `flick` | Crosshair snaps target→target, brief hit flash | flick-shot-training, 180-degree-awareness, target-switching-swarm |
| `track` | Crosshair glued to a target on a looping curve | strafe-tracking, pro-smooth-pursuit, vertical-air-track |
| `recoil` | Spray pattern climbing, crosshair pulling down through it | recoil-control |
| `reflex` | Dot idles, flashes, gets tapped — with the wait beat visible | instant-response, reaction-time |
| `grid-recall` | Cells light in a pattern, blank, then re-light | grid-memorization, object-location |
| `sequence` | Colour/shape sequence plays, then repeats back | color-sequence, digit-span |
| `stroop` | Word in a conflicting ink colour, correct swatch chosen | distraction-fighter |
| `scan` | Eye/cursor sweeping a number grid in order | concentration-grid, schulte |
| `tap` | Rapid click bursts with a rising rate meter | rapid-tapping / CPS |
| `stream` | Words flashing one at a time in place | rsvp-reader |
| `periphery` | Fixation cross centre, target blooming at the edge | peripheral vision drills |
| `dual` | Two lanes demanding attention at once | divided-attention, multi-tasking |

Add archetypes only when a drill genuinely fits none of these — a wrong-but-pretty preview is
worse than the current icon.

### 4.3 `lib/drillPreviews.js` — the registry
Mirrors `lib/drillCatalog.js` in style, including a header comment explaining why the file
exists and how to add a row.

```js
export const DRILL_PREVIEWS = {
  '/drills/fps/flick-shot-training': { scene: 'flick',  speed: 1.0, density: 3 },
  '/drills/fps/strafe-tracking':     { scene: 'track',  speed: 0.9, amplitude: 0.6 },
  // ...
};
export function getDrillPreview(href) { /* returns null when unmapped */ }
```

**A missing entry must render the existing icon block unchanged.** That is the fallback for
every drill you have not mapped yet, and it is what keeps every phase shippable on its own.

### 4.4 `components/drill/DrillPreview.js` — the host component
Client component. Props: `href`, `accent` (Tailwind token name), `className`.

Behaviour, all of it required:

1. Renders a `<canvas>` in a wrapper with a **fixed aspect ratio** (`aspect-[16/9]`, rounded,
   `bg-surface-2`, `border-hairline`) so nothing shifts — **CLS must stay 0**.
2. Sizes the backing store to `clientWidth * min(devicePixelRatio, 2)`, re-measured with a
   `ResizeObserver`. Never let the canvas blur or over-allocate on a 3x phone.
3. Subscribes to the ticker **only while `IntersectionObserver` reports ≥25% visible**, and
   unsubscribes on exit. Off-screen cards cost zero.
4. On mount, and whenever paused, paints **one static "poster" frame** (`t = 0`) so a card is
   never blank.
5. `prefers-reduced-motion: reduce` → poster frame only, ticker never subscribed. Re-check the
   media query live; do not read it once at import time.
6. **No-JS / SSR** → the poster frame is absent, so the wrapper must still look intentional
   (token background + the drill's lucide icon centred behind the canvas). Keep the icon in
   the DOM under the canvas as the permanent floor.
7. `aria-hidden="true"`, `pointer-events-none`, `tabIndex={-1}`. Screen readers and keyboard
   users get name + tagline exactly as today.
8. Wrap in `React.memo`; the component must not re-render on parent filter/search state
   changes — the ticker drives pixels, React drives nothing per frame. **Zero React state
   updates per frame.**

### 4.5 Card layout change (hub clients)
In the card, above the discipline eyebrow, insert the preview and demote the icon:

```jsx
<DrillPreview href={drill.href} accent="red" className="mb-3" />
```

- The 9×9 icon tile moves **into** the preview's top-left corner as a small overlay badge, so
  the card keeps its identity anchor and the difficulty/level badges stay where they are.
- Hover: preview brightens (`opacity-90 → 100`) and the existing red top-line still animates in.
  No layout change on hover.
- Mobile (`< 640px`): previews still render but at 30fps and the grid is one column — verify
  the card does not become taller than ~2.2 viewport-thirds, or the grid stops feeling scannable.

---

## 5. Non-negotiable constraints

- **Performance budget:** with 15 cards visible, total main-thread time for previews < 4ms per
  frame at 30fps on a 4-year-old laptop; no long tasks > 50ms introduced; steady-state
  allocation ~0 (no per-frame object/array creation, no `ctx.createLinearGradient` inside the
  draw loop — cache gradients per size).
- **Accessibility:** reduced-motion honoured; contrast of card text unchanged; nothing
  focusable added; no flashing faster than 3Hz anywhere (photosensitivity — this matters, the
  `reflex` and `stroop` scenes are the risky ones).
- **SEO:** no change to any `page.js`, metadata, headings, link structure, or the rendered
  text of a card. Canvas content is invisible to crawlers by design; the tagline still carries
  the meaning.
- **i18n:** previews are language-free by construction. If a scene needs a glyph (`stroop`,
  `stream`), use neutral letters/shapes, never translated copy — do not add i18n keys.
- **Bundle:** scenes must be tree-shakeable and the whole preview system (ticker + host +
  scenes + registry) must add **< 12KB gzipped** to a hub route. `DrillPreview` is loaded with
  `next/dynamic` + `{ ssr: false }` from the hub clients if that is what keeps the route budget.

---

## 6. Verification required before you report a phase complete

1. `npx next build` passes; report the route-size delta for `/drills` and the touched hub.
2. `npm run lint` clean.
3. DevTools Performance: 20s recording while scrolling the hub — report average FPS and
   scripting time, and confirm one rAF loop (not N).
4. Toggle "Emulate prefers-reduced-motion" → all previews frozen on the poster frame.
5. Throttle to 4x CPU slowdown → page still scrolls without visible jank.
6. Confirm CLS = 0 for the hub route in the Lighthouse run.
7. Check one localised hub (e.g. `/de/drills/fps`) renders identically.
8. Confirm an unmapped drill still shows the old icon card, untouched.

Report all eight results. "It looks fine" is not a result.

---

## 7. Explicitly out of scope

- No sound, ever.
- No playable/interactive card, no click-to-try, no hover-to-start-the-real-drill.
- No video, GIF, Lottie or sprite assets.
- No change to drill mechanics, scoring, difficulty, storage keys or `bestScore`.
- No redesign of the hub page beyond the card's internal layout.
- No preview on the drill page itself — the drill is there.

---

## 8. Phase plan — one row per Antigravity run

| # | Phase | Scope | Ships on its own? |
|---|---|---|---|
| 1 | **Engine** | `lib/previewTicker.js`, `components/drill/DrillPreview.js`, `lib/drillPreviews.js` (empty registry), `scenes.js` with `flick` only. Wire into `FPSHubClient.js`, map **one** drill (`/drills/fps/flick-shot-training`). Everything else falls back to the icon. | Yes |
| 2 | **FPS scenes** | Add `track`, `recoil`, `reflex`. Map all 15 FPS drills. | Yes |
| 3 | **Memory + cognitive** | Add `grid-recall`, `sequence`, `stroop`, `scan`, `dual`. Map `MemoryClient.js` and `CognitiveHubClient.js`. | Yes |
| 4 | **Motor + reaction** | Add `tap`. Map `MotorDrillsClient.js`, `ReactionSpeedDrillsClient.tsx`. | Yes |
| 5 | **Visual + physical** | Add `periphery`, `stream`. Map `VisualDrillsClient.js`, `VisualTrackingDrillsClient.tsx`, `PhysicalDrillsClient.js`. | Yes |
| 6 | **Directory + polish** | Wire `DrillsDirectoryClient.js` (all 81 cards, densest page — re-measure the perf budget here), audit every unmapped drill, final Lighthouse pass on `/drills` and `/de/drills`. | Yes |

Start with Phase 1. Report, then stop.
