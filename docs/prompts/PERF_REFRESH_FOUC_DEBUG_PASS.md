# PERF + FOUC DEBUG PASS — slow dev refresh & big-text flash

## OBJECTIVE

Two runtime symptoms on the **local dev server** (`npm run dev`), reproduced on
desktop and mobile browsers:

1. **Slow refresh** — a full page reload / navigation takes several seconds
   before the page is usable.
2. **Big-text flash** — on the first frames after a reload, headings and body
   text render noticeably larger than final, then snap down to normal size
   (layout shift / FOUC).

Root-cause both, apply the smallest correct fix for each, verify.

## OPERATING RULES

- Follow `CLAUDE.md` (Debug2Fix, output discipline, code cleanliness).
- Runtime facts require runtime evidence. Delegate investigation to the
  `debug-runtime` subagent before editing source. Main agent applies fixes.
- Never run `next build` (postbuild pings live search engines). Use `next dev`.
- Do not enable Turbopack blindly as a "fix" — measure first, then decide.
- Smallest working diff. No new dependencies unless a blocker requires one.

## REPRODUCTION

1. Start the dev server with the inspector for the subagent:
   `NODE_OPTIONS='--inspect=9555' npm run dev`
2. Open `http://localhost:3000/` and a drill route, e.g.
   `http://localhost:3000/drills/fps/flick-shot-training`.
3. Hard-refresh (disable cache in DevTools). Observe:
   - time-to-interactive / time the reload spinner is visible
   - a screenshot burst over the first ~1500ms showing the text starting large
     then shrinking.

## DELEGATE TO `debug-runtime` — QUESTIONS TO ANSWER

Symptom 1 (slow refresh):
- Is the delay server compile time or client hydration? Capture dev-server
  compile durations per route (the `○ compiling ...` / `✓ Compiled` timings) for
  a cold refresh vs a warm one.
- Which modules dominate the compile/module graph for `/` and a drill route
  (framer-motion, recharts, lucide-react, date-fns, the 7.7k-line
  `styles/globals.css`)?
- On the client: measure `next/font` stylesheet + font-file load timing, and the
  time between first paint and the global stylesheet being applied.

Symptom 2 (big-text flash):
- At first paint, what is the computed `font-size` / `font-family` on an `<h1>`
  (e.g. `.text-display`) and on `<body>` BEFORE vs AFTER the global stylesheet
  and `next/font` resolve? Capture both states.
- Is the shrink caused by (a) Tailwind global CSS being injected after first
  paint in dev, (b) the `next/font` `display: 'swap'` fallback→Inter swap, (c)
  mobile text-inflation / missing `text-size-adjust`, or a combination? Attribute
  the pixel delta to each cause.
- Does `<html>` (which carries only `inter.variable`, not `font-sans`) render a
  different metric than `<body>` during the swap window?

Return: Runtime question, Direct answer, Evidence (numbers/screenshots),
Source location, Confidence.

## LIKELY ROOT CAUSES (confirm/refute with the subagent, do not assume)

- `package.json` `dev` script is plain `next dev` (webpack). Large route count +
  a single 7,732-line `styles/globals.css` recompiled on every change → slow
  refresh in dev.
- `styles/globals.css` is monolithic: hundreds of drill-specific
  `font-size: NNcqmin` blocks are shipped globally instead of scoped per drill.
- Dev-only FOUC: global CSS is JS-injected after first paint in `next dev`, so
  unstyled `<h1>` briefly uses the UA default (~2em) before `.text-display`
  clamps it.
- `next/font` `display: 'swap'` on `Inter` + `JetBrains_Mono` adds a second,
  smaller reflow on top of the CSS FOUC.
- No `text-size-adjust: 100%` in base CSS → mobile browsers font-boost on first
  layout, then correct.
- `app/layout.js`: `<html>` gets `inter.variable` but not `font-sans`; `<body>`
  gets `font-sans`.

## FIX MENU (apply only what evidence supports, smallest first)

Refresh speed:
- If compile time dominates: enable Turbopack for dev only —
  `"dev": "next dev --turbopack"` — and re-measure. Keep `build` unchanged.
- If a specific heavy package dominates the graph: add it to
  `experimental.optimizePackageImports` in `next.config.js` (currently only
  `lucide-react`, `@vercel/analytics`, `@vercel/speed-insights`).
- If `globals.css` is the cost: move drill-scoped rule blocks out of
  `styles/globals.css` into per-drill CSS modules / co-located files so the
  global sheet shrinks. Do this incrementally, one drill family at a time,
  verifying no visual regression.

Big-text flash:
- Add to `@layer base` in `styles/globals.css`:
  `html { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }`
- In `app/layout.js`, put `font-sans` on `<html>` as well so the pre-hydration
  metric matches `<body>`.
- Evaluate `display: 'optional'` (or `'fallback'`) instead of `'swap'` for the
  `next/font` faces to remove the swap reflow; keep `adjustFontFallback: true`.
- Confirm most of the flash is dev-only. If a production `next dev`-equivalent
  preview (`next start` on an already-built output is NOT allowed here) — instead
  reason from the subagent's attribution: if the CSS-injection delta is the bulk
  and it does not occur in a production `<link rel=stylesheet>` render, document
  that and only ship the `text-size-adjust` + font changes.

## VERIFY (delegate back to `debug-runtime`)

- Re-run the reproduction. Confirm:
  - reload / navigation time reduced (report before/after ms).
  - `<h1>` computed `font-size` at first paint is within a few px of final (no
    visible shrink); screenshot burst shows stable text size.
- Check regressions: home page, one FPS drill, one cognitive drill, one memory
  drill render correctly; fonts (sans + mono) still apply; no console errors;
  `next dev` still boots.

## COMPLETION

On verified success output:

`STATUS: SUCCESS | MILESTONE SECURED. END OF CORE CONVERSATION SYSTEM.`

Then list: critical files modified, verification performed (with numbers),
remaining known limitations (e.g. production-only measurement gap).
