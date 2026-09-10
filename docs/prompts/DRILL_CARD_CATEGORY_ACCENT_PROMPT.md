# Drill Card Redesign — "Video Thumbnail" Card — Execution Prompt

Port the drill card from the sibling project
`C:\Users\sangmesh\Desktop\global-drill-system-nextjs - Copy - Copy` into this repo, then
**add a one-line subtitle** under the drill name (that project's card has no subtitle;
this one must keep it — search engines read it).

Pilot on **one hub (FPS)** only. Ship it, review it live, then replicate to the other
seven hubs in a later run (Section 8).

Paste **Sections 1–7** for the first run. For the rollout run, paste **Section 3** plus
**one row of Section 8**.

---

## 1. Objective

The hub drill card (`components/drill/DrillCarousel.js` → `DrillCard`) currently stacks:
preview → title → tagline → a hairline divider row with a clock/duration on the left and a
"PLAY" label on the right. Flat, no category colour except on `:hover`, and the divider row
is dead weight.

Replace it with the **video-thumbnail card** already shipped in the sibling project. That
card is two stacked parts:

```
┌───────────────────────────────┐
│ [DIFF]                        │   ← "thumb": preview full-bleed to the top corners
│                               │
│        · live preview ·       │
│                               │
│ (▶)                     45s   │   ← play disc bottom-LEFT, duration pill bottom-RIGHT
├───────────────────────────────┤     (thin accent hairline here)
│ (■) FLICK SHOT TRAINER        │   ← "body": accent-tinted shade band
│     One-tap flicks on a …     │     icon chip + NAME + one-line SUBTITLE
└───────────────────────────────┘
```

### Reference implementation — copy this exactly (from the sibling repo's `styles/globals.css`)

```css
.drill-card { display: flex; flex-direction: column; background: var(--card);
  border: 1px solid var(--line); border-radius: var(--r-card); overflow: hidden; }

.drill-card .thumb { position: relative; display: block; aspect-ratio: 16 / 9;
  background: #000; overflow: hidden; }

.drill-card .thumb .diff-pill { position: absolute; left: 6px; top: 6px; z-index: 2;
  background: rgba(0,0,0,.72); border-color: rgba(255,255,255,.14); color: #fff;
  backdrop-filter: blur(2px); }

.drill-card .thumb .dur { position: absolute; right: 6px; bottom: 7px;
  font-size: 9px; font-weight: 700; color: #fff;
  background: rgba(0,0,0,.72); padding: 2px 5px; border-radius: 4px; }

.drill-card .thumb .play { position: absolute; left: 6px; bottom: 7px;
  width: 21px; height: 21px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  background: rgba(0,0,0,.6); border: 1px solid rgba(255,255,255,.14); color: #fff; }

.drill-card .body { display: flex; align-items: center; gap: 8px;
  padding: 10px 10px 11px; min-height: 53px;
  background: linear-gradient(180deg,
    color-mix(in srgb, var(--a) 13%, var(--card-raised)),
    color-mix(in srgb, var(--a) 5%,  var(--card)));
  border-top: 1px solid color-mix(in srgb, var(--a) 20%, transparent); }

.drill-card .ic { width: 22px; height: 22px; border-radius: var(--r-control);
  flex-shrink: 0; display: flex; align-items: center; justify-content: center;
  background: color-mix(in srgb, var(--a) 18%, transparent); color: var(--a); }

.drill-card .info { flex: 1; min-width: 0; }

.drill-card .nm { font-weight: 400; font-size: 13px; line-height: 1.05;
  text-transform: uppercase; display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden; }
```

`var(--a)` is the per-card accent (this repo passes it as a Tailwind token name —
`red` for FPS). In this repo there is no `color-mix` + CSS-var path, so each accent gets
**literal Tailwind classes** in the existing `ACCENTS` map (Section 4.1).

### What changes vs the reference

1. **Add a subtitle.** `.info` holds the name **and**, under it, a one-line subtitle
   (this repo's `displayTagline`). `text-xs text-ink-3`, `line-clamp-1`. The reference has
   `.nm` only — do not follow it here.
2. **Keep this repo's fonts.** No Anton / condensed face. Name stays in the site's
   heading style (`text-[15px] font-bold tracking-tight text-ink-1`), title-case, not
   uppercase.
3. **Keep the icon chip in the thumb top-left too** — this repo's card already has a
   backdrop-blur icon badge at `top-2.5 left-2.5`; keep it. The `diff-pill` moves to the
   thumb's top-left as well? No — difficulty stays **top-right** (this repo's convention);
   only `play` and `dur` are new, and they go in the bottom corners.
4. **Delete** the old divider footer row (`mt-4 pt-3 border-t border-hairline …` with the
   `Clock`+duration span and the "PLAY"+`Play` span). Duration → thumb bottom-right, play →
   thumb bottom-left, the rest → the shade band.

### Definition of done (one sentence)

`/drills/fps` cards show a full-bleed preview with a play disc bottom-left and a `45s`
pill bottom-right, a red-tinted shade band below carrying an icon chip + drill name + a
one-line subtitle, no divider row, CLS = 0, and the seven other hubs are unchanged until
their rollout row runs.

---

## 2. Codebase facts you must know before writing code

Verified against this repo — re-read the files named, do not re-derive.

| Fact | Detail |
|---|---|
| Stack | Next.js 15 App Router, React 18, JS + partial TS, Tailwind 3.4, `lucide-react` |
| The card | `components/drill/DrillCarousel.js`, function `DrillCard` (~line 126). One `<Link className="group flex flex-col justify-between rounded-2xl border border-hairline bg-surface-1 p-5 shadow-lg …">`. Read the whole file. |
| Card body today | inner `<div>`: preview block (`relative mb-3.5`, `<DrillPreview>` + top-left icon badge + top-right cluster of `drill.badge` "Lv." chip and `difficultyChip(drill.difficulty)`) → `<h3 …truncate>` name → `<p …truncate>` tagline. Sibling footer `<div className="mt-4 pt-3 border-t border-hairline flex items-center justify-between text-2xs font-mono text-ink-3">` with `Clock`+`drill.duration` and a "PLAY"+`Play` span. |
| Names/text | `getLocalizedDrill()` in the card resolves `displayName` / `displayTagline`. Use those, never the raw props. |
| Accent system | `ACCENTS` map (~line 32) — one object per token (`red`, `violet`, `indigo`, `emerald`, `rose`, `fuchsia`, `cyan`, `amber`, `purple`), each a set of **complete literal class strings** (`text`, `chip`, `hoverBorder`, `hoverText`, `focus`, `dot`). Tailwind scans source for whole strings — **new keys must be spelled out in full per accent, never built by interpolation.** |
| Difficulty chip | `DIFFICULTY_CHIP` + `difficultyChip()` (~line 107) — keep, stays top-right of the thumb. |
| Preview host | `components/drill/DrillPreview.js` — the `DedicatedPreview` branch (~line 416) and the canvas-fallback branch (~line 434) both render an `aspect-[16/9] rounded-xl overflow-hidden bg-surface-2 border border-hairline` wrapper. For the showcase card the wrapper must lose its own rounding/border on the sides+bottom and follow the card's top rounding. Add a `showcase` prop to `DrillPreview` that swaps those wrapper classes (`rounded-t-2xl`, no border) — cleaner than `!important` overrides from the card. |
| Hub wiring | `app/drills/fps/FPSHubClient.js` ~line 310: `<DrillCarousel accent="red" icon={Crosshair} drills={…}>`. Each drill object carries `{ href, name, tagline, difficulty, duration, icon, badge }`. |
| All 8 hubs | Every hub imports the **same** `DrillCarousel`. One file change reaches all of them — that is why this pass is gated behind a prop (Section 3). |
| Localised hubs | `app/{de,es,ja,ko,pt}/drills/**/page.js` re-import the same clients. One change ships in six languages — never fork per locale. |
| Design tokens | `surface-1`, `surface-2`, `hairline`, `ink-1`, `ink-2`, `ink-3`. New colour only via an `ACCENTS` entry — no raw hex in the card. |
| Build command | `npx next build` — **NOT** `npm run build` (its `postbuild` pings live IndexNow at Bing/Yandex/Seznam). |

---

## 3. Operating rules for the agent

1. **One phase per run.** Do exactly one row of Section 8, report, STOP. Wait for "yes".
2. **Gate the pilot.** `DrillCarousel` and `DrillCard` take a new opt-in prop
   `showcase={true}`. Only `FPSHubClient.js` passes it in this phase. With the prop absent
   or false the card renders **byte-identical** to today. Screenshot `/drills/cognitive`
   before and after — it must be unchanged before you report.
3. **The card stays one `<Link>`.** The play disc and duration pill are decorative
   `<span>`s — `aria-hidden`, no `onClick`, no `<button>`. No nested interactive elements.
4. **Never regress the subtitle.** The one-line tagline stays rendered in the DOM as real
   text. `line-clamp-1` is fine; removing it is not.
5. **Do not touch** `lib/drillsRegistry.js`, `lib/drillDifficulty.js`,
   `components/drill/DrillResultCard.js`, `components/drill/FpsStartCard.js`, any
   `app/drills/**/[drill]/*Client.*`, any `page.js`, or any metadata / heading / link /
   rendered card text. Presentation only.
6. **No new dependencies, no new fonts.** Use the site's existing type.
7. **CLS = 0.** Fixed preview aspect + one-line clamps on name and subtitle keep every card
   identical height. Verify a long German tagline (`/de/drills/fps`) still clamps to one
   line and does not push card height.
8. **Accent classes are literal.** Every new class string appears in full inside `ACCENTS`.
   After the build, grep the emitted CSS for the new class names to prove Tailwind kept
   them.
9. Run `npx next build` and `npm run lint`. Report the `/drills/fps` route-size delta.

---

## 4. Architecture — build exactly this

Three edits.

### 4.1 `components/drill/DrillCarousel.js` — `ACCENTS` map

Add these keys to **every** accent object, as complete literal strings. Example for `red`
(FPS); repeat the same shape for violet, indigo, emerald, rose, fuchsia, cyan, amber,
purple:

```js
red: {
  …existing…
  bandWash: 'bg-gradient-to-b from-red-500/[0.13] to-red-500/[0.04]',
  bandEdge: 'border-t border-red-500/25',
  bandIcon: 'bg-red-500/[0.16] text-red-300',
},
```

`bandWash` + `bandEdge` reproduce the reference `.body` gradient and its accent top
hairline; `bandIcon` reproduces `.body .ic`. The band sits on the card's `bg-surface-1`,
so the low-alpha stops read the same as `color-mix(var(--a) 13% , --card-raised)`.

### 4.2 `components/drill/DrillCarousel.js` — `DrillCard`

Thread a new `showcase = false` prop from `DrillCarousel`'s own new `showcase` prop
(default false) into every `DrillCard` (carousel track **and** "view all" grid).

**`showcase` false → current markup, no diff.**

**`showcase` true → rebuild:**

- `<Link>`: drop `p-5`, add `relative overflow-hidden`. Keep rounding, border, `bg-surface-1`,
  shadow, hover, focus, `flex flex-col`.
- **Thumb** (was the preview block):
  - wrapper `relative` — no `mb-3.5`, no padding.
  - `<DrillPreview href={drill.href} accent={accent} icon={Icon} showcase className="w-full" />`
    (add the `showcase` prop to `DrillPreview` per Section 4.3).
  - keep the existing **top-left icon badge** (`absolute top-2.5 left-2.5`, backdrop-blur,
    `a.chip`).
  - keep the existing **top-right cluster** (`drill.badge` "Lv." chip + difficulty chip) at
    `absolute top-2.5 right-2.5`.
  - **play disc** — bottom-left, matches reference `.play`:
    ```jsx
    <span aria-hidden className="absolute bottom-[7px] left-[6px] z-10 inline-flex items-center justify-center w-[21px] h-[21px] rounded-full bg-black/60 border border-white/[0.14] text-white">
      <Play className="w-3 h-3 fill-current translate-x-[0.5px]" />
    </span>
    ```
  - **duration pill** — bottom-right, matches reference `.dur`:
    ```jsx
    {drill.duration && (
      <span aria-hidden className="absolute bottom-[7px] right-[6px] z-10 px-[5px] py-[2px] rounded text-[9px] font-bold text-white bg-black/[0.72]">
        {drill.duration}
      </span>
    )}
    ```
- **Body band** — replaces the old `<h3>`/`<p>` block **and** the whole divider footer:
  ```jsx
  <div className={`relative flex items-center gap-2 px-2.5 pt-2.5 pb-[11px] min-h-[53px] ${a.bandWash} ${a.bandEdge}`}>
    <span className={`shrink-0 inline-flex items-center justify-center w-[22px] h-[22px] rounded-lg ${a.bandIcon}`}>
      {Icon ? <Icon className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
    </span>
    <span className="flex-1 min-w-0">
      <span className={`block text-[15px] font-bold tracking-tight text-ink-1 truncate transition-colors ${a.hoverText}`}>
        {displayName}
      </span>
      <span className="block mt-0.5 text-xs text-ink-3 truncate">{displayTagline}</span>
    </span>
  </div>
  ```
- **Delete** the old footer `<div className="mt-4 pt-3 border-t border-hairline …">`. If the
  `Clock` import is now unused in the file, remove it; if still used elsewhere, leave it.

### 4.3 `components/drill/DrillPreview.js`

Accept `showcase = false`. When true, the shared wrapper className becomes:

```
relative w-full aspect-[16/9] rounded-t-2xl overflow-hidden bg-black pointer-events-none
opacity-90 group-hover:opacity-100 transition-opacity duration-200
```

i.e. drop `rounded-xl` (→ `rounded-t-2xl`), drop `border border-hairline`, `bg-surface-2`
→ `bg-black` to match the reference `.thumb { background:#000 }`. When false, unchanged.

### 4.4 `app/drills/fps/FPSHubClient.js`

```jsx
<DrillCarousel
  headingId="fps-drills"
  heading={t('hubs.fps.drillsHeading', 'FPS aim drills')}
  accent="red"
  icon={Crosshair}
  showcase
  allLabel={t('ui.viewAll', 'View all')}
  drills={…}
/>
```

No other hub client changes this phase.

---

## 5. Non-negotiable constraints

- **Zero visual change** to any hub not passing `showcase`. Screenshot `/drills/cognitive`
  and `/drills/memory` before/after — must match `main` pixel-for-pixel.
- **CLS = 0** on `/drills/fps`. Fixed 16:9 thumb + `min-h-[53px]` band + one-line clamps →
  uniform card height. Confirm across the carousel track and the "view all" grid.
- **Accessibility:** play disc + duration pill are `aria-hidden`; nothing new focusable;
  the card's accessible name is still `displayName` + `displayTagline` in the link. Check
  `ink-3` subtitle over `bandWash` on `surface-1` stays ≥ 4.5:1 (wash is ~13% accent).
- **No motion added** — disc and pill are static; the preview animation is unchanged.
- **i18n:** no new strings, no new keys, neutral glyphs only. `line-clamp-1` on name and
  subtitle must hold for German.
- **Bundle:** three literal classes × 9 accents + markup. Report CSS delta — expect < 1KB
  gzipped. No JS beyond the two `showcase` props.

---

## 6. Verification required before reporting the phase complete

1. `npx next build` passes; report `/drills/fps` and `/drills/cognitive` route-size delta.
2. `npm run lint` clean.
3. Grep built CSS (`.next/static/css/*.css`) for `from-red-500\/\[0.13\]` and
   `border-red-500\/25` — both present.
4. `/drills/fps`: thumb full-bleed to the top corners on black; play disc bottom-left;
   `45s` pill bottom-right; icon badge top-left and difficulty chip top-right still there;
   red-tinted band below with icon chip + drill name + one-line subtitle; **no divider row**.
5. `/drills/cognitive` + `/drills/memory`: pixel-identical to `main`.
6. Lighthouse on `/drills/fps`: CLS = 0, performance not regressed.
7. `/de/drills/fps`: name and subtitle each clamp to one line, no card-height jitter in the
   track or the grid.
8. Reduced-motion emulation: preview freezes on the poster frame; overlays unaffected.

Report all eight. "Looks good" is not a result.

---

## 7. Explicitly out of scope

- No category *name* label in the band — accent wash + icon chip carry the category; the
  band shows the drill's own name + subtitle.
- No real button / click target inside the card — it stays one `<Link>`.
- No new font (the reference's Anton/condensed name style is not ported).
- No change to preview scenes, the ticker, `lib/drillPreviews.js`, or `FpsStartCard.js`.
- No change to drill mechanics, scoring, difficulty, storage keys, routing, metadata,
  headings, or the rendered words of name/subtitle.
- No redesign of the hub page around the card (heading row, arrows, dots, "view all"
  toggle all stay).
- No new accent tokens; if a hub passes an accent absent from `ACCENTS`, report it, don't
  fix it here.

---

## 8. Phase plan — one row per run

| # | Phase | Scope | Ships alone? |
|---|---|---|---|
| A | **Pilot (FPS)** | Sections 4.1–4.4. `showcase` props, `ACCENTS` keys, card + preview rebuild, wire FPS only. | Yes |
| B | **Rollout** | Pass `showcase` from the other 6 category hub clients (cognitive, memory, motor, physical, visual, visual-tracking, reaction-speed). No component change — prop only. Screenshot each. | Yes |
| C | **Localised sweep** | Verify all 5 locale hub trees (`/de /es /ja /ko /pt`): name + subtitle clamp, no height jitter. Fix only an overflowing tagline — in the tagline source, not the card. | Yes |
| D | **Directory** | `/drills` (`DrillsDirectoryClient.js`): decide whether its cross-category cards adopt `showcase` or keep their denser treatment. Re-measure the perf budget on this densest page. | Yes |

Start with Phase A. Report, then stop.
