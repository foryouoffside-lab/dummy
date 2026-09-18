# Brief: Homepage Redesign — Category Grid Removal & Content Cleanup

**Status:** not started.

**Repo:** `skilldrills` — Next.js 15 App Router, JS.
**File:** `app/HomePageClient.js` — a single client component.
**Renders at 6 routes**, not just one: `/`, `/ko`, `/ja`, `/pt`, `/es`, `/de` all
import this exact same component (`app/<locale>/page.js` is a thin wrapper that
only swaps `metadata`). **Any change here appears on all 6 routes.** This pass
does not touch per-locale body copy — see Out of Scope below.

---

## THE GOAL, stated once

Remove the category-selection grid, and confirm the Features / Target Audience
sections (which already exist) still make sense once the grid is gone. This is
a content and structure pass, not a visual overhaul — keep the existing
dark/gradient/glow chrome and component patterns.

**Explicitly rejected for this page — do not reintroduce:** a follower-count /
social-media stat band (Instagram/Facebook/YouTube followers, visitor counts).
Considered and dropped 2026-09-12: this site is a technical training tool, not
a personal or influencer brand, and follower badges read as an out-of-place
pattern next to "Scientific Browser-Native Training System" positioning. If
this gets proposed again, it needs a fresh explicit ask, not a revival of this
one.

---

## 0. GROUND RULES

1. **Never invent a number, claim, or statistic.** This repo has shipped
   fabricated `aggregateRating` blocks and a "sub-millisecond precision" claim
   its own About page contradicts (both since deleted). If you cannot point at
   the source that produced a number, the number does not go on the page —
   applies to the claim-audit in Step 2 same as everywhere else.
2. **Two checkpoints, not one big diff.** (1) Delete Categories section + dead
   code, (2) Features/Audience repositioning + claim audit. Report and pause
   between each.
3. **Verify in the rendered HTML, never the source.** This repo has twice
   shipped content that looked right in the editor and was absent from the
   HTML (`isClient` gates that left 82/91 URLs uncrawled; `DrillGuide` silently
   dropping undeclared props).
4. **`npx next build`. NEVER `npm run build`** — postbuild fires a live
   IndexNow ping at Bing/Yandex/Seznam.
5. **Tailwind class strings written out in full** — no concatenation.
6. **Install nothing.** No new npm packages for a deletion and a content tidy-up.
7. **If reality does not match this brief, STOP and report.**

### 0.1 Known gotchas already found in this file — don't rediscover them

- `categoryConfigs` (line ~15) has exactly **one** consumer outside its own
  definition: the Categories grid (line ~499). But `totalCategoriesCount =
  categoryConfigs.length` (line ~169) also reads it, and that count feeds
  hero copy (line ~282) and the sr-only SEO paragraph (line ~258). **Do not
  delete the array** — only the grid `<section>` and anything that becomes
  dead after that. Confirm with a grep, don't assume:
  ```bash
  grep -n "categoryConfigs\|handleCardMouseMove" app/HomePageClient.js
  ```
- `handleCardMouseMove` (line ~99) has exactly one caller, inside the grid
  being deleted — safe to remove once the grid is gone.
- Icon imports (`Crosshair, Eye, Dumbbell, Database, Zap, Activity, Shield,
  Users, ...`) are shared across `categoryConfigs`, `features`, and
  `audienceData`. **Check each symbol individually before removing an
  import** — several are still used by the sections you're keeping (e.g.
  `Crosshair` also appears in the hero's "FPS Aim Hub" button and in
  `audienceData`).
- **"Features" and "Target Audience" sections already exist** — §5 "Engine
  Diagnostics & Features" (line ~564) and §6, literally headed "Target
  Audience" (line ~601). This is a **revise**, not a **create**. Do not add a
  second, duplicate section with either name.
- Existing precision/telemetry claims worth auditing against
  `app/about/page.js`'s stated real capability before leaving them as-is
  (M3-class risk, fixed in Step 2):
  - Hero metric chip: **"0ms Server Delay"** (line ~313)
  - Mobile hero substitute: **"~140ms Avg Latency", "98.4% Precision", "240
    Hz Frame Target"** (lines ~326–336)
  - Proof band simulated preview: **"Target Snap: 42px", "Accuracy: 98.2%"**
    (lines ~385–388)
  - Features card: **"updated every millisecond"** (line ~109)

---

## STEP 1 — Delete the Categories section

Delete the `<section>` fenced by the `{/* 4. CATEGORIES SECTION (ALL 8
CATEGORIES) */}` comment (~lines 486–562) in full.

Then, per §0.1: remove `handleCardMouseMove`; keep `categoryConfigs` (still
feeds `totalCategoriesCount`); re-check every icon import against the
sections that remain before touching the `lucide-react` import line.

**This does not remove the only path into categories** — the hero's "Explore
All N Drills" / "FPS Aim Hub" links and the closing CTA's "Browse All N
Drills" link (both → `/drills` or `/drills/fps`) already exist independently
of this grid and are unaffected. Confirm this is still true after your edit,
don't just assume it.

**Renumber the trailing section comments** (`{/* 5. ... */}` →
`{/* 4. ... */}` etc.) so they match the new order — stale numbering in a
comment is exactly the kind of thing that confuses the next pass.

---

## STEP 2 — Features & Target Audience: revise, don't recreate

Both sections already exist and stay, in this new order after Step 1:
Hero → Methodology Proof Band → Diagnostic Profile (returning users only) →
Features → Target Audience → CTA.

**Features** (currently §5, "Engine Diagnostics & Features", 6 cards):
- Keep the section and its 6 cards. Fix only the specific precision claims
  listed in §0.1 that overstate what `app/about/page.js` actually supports —
  read that file first, match its language, don't soften into vagueness
  either. This is the same discipline already applied sitewide (see the
  `sub-millisecond` removal precedent) — verify with:
  ```bash
  grep -rn "aggregateRating\|ratingCount\|sub-millisecond\|every millisecond" app/ lib/ components/
  ```
- Do not add new feature claims beyond what's already true of the shipped
  product. No new cards unless the operator names a real feature to add.

**Target Audience** (currently §6, headed "Target Audience", 3 cards —
Competitive Gamers / Cognitive Performers / Daily Training Enthusiasts):
- Keep as-is. Content is accurate and not a fabrication risk. Reposition only
  — it now sits directly before the CTA instead of after Features-then-CTA
  with Categories in between; confirm the visual rhythm (spacing, alternating
  `bg-surface-1/40` bands) still reads cleanly with one fewer section between
  Diagnostic Profile and CTA.

---

## STEP 3 — Verify

```bash
# --- Before/after content check on all 6 routes this file renders at ---
npx next dev -p 3199 > dev.log 2>&1 &
until grep -q "Ready in" dev.log; do :; done
for r in / /ko /ja /pt /es /de; do
  echo "=== $r ==="
  curl -s "http://localhost:3199$r" -o "route.html" -w "%{http_code}\n"
  grep -c "Training Categories" route.html   # expect 0 — the deleted heading
done

# --- No fabricated stats introduced ---
grep -rn "aggregateRating\|ratingCount\|sub-millisecond" app/ lib/ components/

# --- Build (never npm run build) ---
npx next build
```

Load `/` in a browser at ≥1280px and at 375px: no leftover empty space where
Categories was, Features and Target Audience still make sense in the new
order, CTA still closes the page.

---

## STEP 4 — Report, then STOP

```
### Checkpoint 1 — Categories removed
- Confirm `categoryConfigs` kept, `handleCardMouseMove` removed, which icon
  imports (if any) were removed and the grep proving they're unused elsewhere.
- Confirm /drills and /drills/fps are still reachable from this page.

### Checkpoint 2 — Features / Target Audience
- Exact copy changed in Features (before/after per claim from §0.1).
- Confirm Target Audience content unchanged, only repositioned.

### Verification
(raw output of every Step 3 command, all 6 routes)

### What I could NOT verify
(empty here is itself suspicious)
```

---

## OUT OF SCOPE for this pass

- **The 5 locale routes' body copy.** `/ko /ja /pt /es /de` currently show
  the *same English body* as `/` — only `<metadata>` is translated. Whether
  any of them earn real localized body copy is a separate, measurement-gated
  decision — see Step 5 below. Do not machine-translate this page's content
  into those routes as part of this pass.
- **Global site navigation/header.** If category links live in a shared
  header/footer component, that's untouched here — this brief is about the
  homepage's own dedicated grid only.
- **A visual redesign.** Dark/gradient/glow chrome, typography rules (only
  `h1` black/uppercase, `h2` sentence-case bold) stay exactly as they are.

---

## STEP 5 (separate deliverable) — Homepage-level keyword research, multi-market

Not gated on Steps 1–2; can run independently. Reuses the exact measurement
tools and discipline already defined in
[ANTIGRAVITY_MASTER_DRILL_PASS.md](ANTIGRAVITY_MASTER_DRILL_PASS.md) §1 — read
that section first, do not re-derive the rules (null-is-unknown-not-zero,
Bing-is-not-Google, brand terms are Class E and get stripped, etc.). This step
only supplies new **seed terms** at the homepage/brand level, since the master
brief's existing data is drill-specific.

**Seed terms** (homepage-level, not a specific drill):
`aim trainer`, `free aim trainer`, `brain training`, `brain training games`,
`cognitive training app`, `reaction time test`, `online training games`,
`esports training app`, `skilldrills` (brand — measure but this is about
tracking branded demand, never used as a targeting decision).

**Markets:** the same list already established —
`us gb ca au in br pt es mx ar jp kr de at ch fr it nl pl ru tr id th vn se tw`

**Tools — no new scripts:**
```bash
python scripts/keywords/autocomplete.py "<seed>" <gl> <hl> [--expand]
python scripts/bing/bing.py keyword "<phrase>" <country>
python scripts/bing/bing.py related "<phrase>" <country>
```

**What this feeds:** whether **ko** or **ja** (the only two locales that
cleared the drill-level demand gate in the master brief) also clear it at the
*homepage* level — i.e. whether a homepage-level native term measures ≥150/mo,
isn't Class D/E, and genuinely matches what this page (a multi-category
platform index, not a single tool) would satisfy. If yes for a locale: that
locale's `app/<loc>/page.js` is a candidate for a real translated body, not
just translated metadata — a separate future pass, not built here. If no:
report that explicitly — "English body stays on all 6 routes, gate failed
because X" is a complete, correct outcome, same as any drill pass.

**Output:** same table format as the master brief §Step 6 report
(Term | Market | Bing exact/mo | Command that proves it | Class A–E | note),
plus the explicit per-locale gate verdict (ELIGIBLE / DO NOT EXPAND / NEVER
BUILD) in the same style as the master brief's §3 table.
