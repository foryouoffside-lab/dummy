# Hub Visual Pass — reusable prompt

Paste the block below, filling in `<CATEGORY>` and what you want changed.
Read the two sections under it first — they are why the prompt is short.

---

## The prompt

> Do a visual pass on the `<CATEGORY>` drill hub (`/drills/<CATEGORY>`).
>
> What I want changed: `<describe it, or attach a reference screenshot>`
>
> Before you write anything: work out whether the thing I am pointing at is
> owned by a shared component or by this one hub. If it is shared, change it in
> the shared component and tell me every hub that just changed with it — do not
> copy the fix per category. If it is genuinely local to this hub, say so and
> why before you edit.
>
> Honour the invariants in HUB_VISUAL_PASS_PROMPT.md. Verify with a dev server
> on a spare port, not `npm run build`. Do not commit.

---

## What is shared vs. what is per-hub

Check this before assuming a change needs repeating. Getting it wrong is how the
same fix ends up pasted eight times and then drifts.

**Shared — change once, every hub gets it**

| Concern | Lives in |
|---|---|
| Card art: floor, bloom, vignette, accent colours | `components/drill/DrillPreview.js` |
| Per-drill animation (what the card actually shows) | `components/drill/previews/scenes.js` |
| Which drill maps to which scene, and its speed | `lib/drillPreviews.js` |
| Carousel: card layout, badges, step dots, arrows | `components/drill/DrillCarousel.js` |

`DrillPreview` is used by **all eight** categories. `DrillCarousel` is used by
five — cognitive, memory, visual, visual-tracking, reaction-speed. The other
three (fps, motor, physical) render their own grid inline and deliberately have
no carousel; they still get every `DrillPreview` change for free.

**Per-hub — really does need doing one at a time**

The hero block, the intro copy, the metrics panel, the FAQ, the drill ordering,
and the accent colour passed into the shared components. These live in
`app/drills/<category>/<Name>Client.js`.

## Invariants — breaking one of these is a regression, not a style choice

1. **Every drill link stays in the server HTML.** No `{isOpen && children}`, no
   rendering only the visible card. This is what left 82 of 91 URLs uncrawled
   once already; the carousel scrolls the DOM rather than re-rendering for
   exactly this reason. If your change hides cards, it is wrong.
2. **Tailwind class strings are written out in full.** `ACCENTS` in
   `DrillCarousel.js` spells every colour variant literally because Tailwind
   scans source text. A class built by interpolation compiles to nothing.
3. **Canvas work stays on the shared 30fps ticker**, keeps the
   `IntersectionObserver` gate, and keeps the `prefers-reduced-motion` poster
   frame. Do not add a per-card `requestAnimationFrame`.
4. **No full-size `ctx.filter` blur per frame.** The bloom is a quarter-scale
   downscale-then-upscale for this reason; a real blur will not hold 30fps with
   several cards on screen.
5. **Interactive controls are real `<button>`s** with an `aria-label`. The step
   dots are tappable navigation, not decoration.

## Verifying

`npm run build` fires a live IndexNow ping at Bing/Yandex/Seznam via postbuild.
For a look-and-feel check use a dev server instead:

```bash
npx next dev -p 3199 > dev.log 2>&1 &
until grep -q "Ready in" dev.log; do :; done
curl -s -o cog.html -w "%{http_code}\n" http://localhost:3199/drills/<CATEGORY>
grep -c 'aria-label="Go to drill' cog.html   # dots present in SSR output
```

Hit at least one carousel hub and one grid hub (fps, motor or physical) — they
take different paths through the shared components.

## Tuning knobs

Card art intensity is three numbers in `DrillPreview.js`: `BLOOM_SCALE` (smaller
= wider, softer halo), the bloom `globalAlpha`, and the vignette's outer stop.
Accent tint for the lit floor is the `glow` / `faint` pair in `ACCENT_COLORS`.
