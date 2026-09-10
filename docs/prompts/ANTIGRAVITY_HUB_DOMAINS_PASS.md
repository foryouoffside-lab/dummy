# Brief: Hub "Training Domains" Consolidation Pass

**Status:** not started.

**Goal:** every one of the 8 drill-category hubs organises its drills the same
way — a static, server-rendered **"Training Domains"** section: a heading per
sub-skill, and under each a real `<Link>` list of that sub-skill's drills. This
is the pattern already live on the Cognitive hub. Three hubs currently do
something different and worse (a client-side search + filter-tab UI); four do
nothing; one (Cognitive) is the template.

**Why:** the filter UI on FPS / Motor / Physical is `useState` + `useMemo` with
`<button onClick>` controls. Nothing it does is in the HTML, has a URL, or is
crawlable — zero SEO value, and it's heavy chrome above a one-at-a-time carousel
for ≤16 drills. The Domains section instead ships crawlable internal links with
descriptive anchor text (the actual ranking lever — see the `drill_crosslink_mesh`
project note), keyword-bearing `<h3>` headings, one consistent layout, and far
less code with no hydration cost.

**Cadence:** ONE hub per pass. See §0.

---

## 0. Ground rules — read before anything else

1. **One hub per pass.** Do FPS first (biggest change), in full, verify it,
   report it, STOP for approval. That approved file is the reference for the
   next two filter hubs. Then the four bare hubs. Nine passes, not one.
2. **Never batch "the same change across the rest."** The hubs differ in state
   shape, which shared components they mount, `.js` vs `.tsx`, and how their
   drills group. A find-and-replace produces broken files reviewed as one diff.
3. **Every drill link must be in the server HTML.** The Domains section is plain
   SSR'd `<Link>`s — no `{isOpen && children}`, no `isClient` gate, no rendering
   only visible items. This repo has twice shipped content that looked right in
   the browser and was absent from the HTML (82 of 91 URLs uncrawled once, and
   the `DrillGuide` / `FpsStartCard` silent prop drops). Verify in the rendered
   HTML, not the source — see §5.
4. **Never invent a number, a claim, or a statistic.** Drill names, counts, and
   groupings come from `lib/drillsRegistry.js` (the `DRILLS` array — each entry
   has `name`, `href`, `category`, `subcategory`, `difficulty`, `duration`,
   `description`). If a hub's drill has no usable `subcategory`, see §3 — do not
   make one up per drill.
5. **Tailwind class strings are written out in full.** No interpolation — a
   class built by string concatenation compiles to nothing. Copy the literal
   colour classes from the hub you're editing.
6. **Do not change any accent colour in this pass.** A separate palette change
   is pending (FPS→emerald, Motor→blue, Physical→orange, Visual-Tracking→rose).
   Use whatever accent the hub passes today. Keep them independent.
7. **Keep the one-at-a-time `DrillCarousel`** at the top of each hub as the
   "featured / browse" element. Domains goes below it as the full index.
8. **Keep** the `isClient` + `localStorage` personal-best lookup each hub runs —
   the carousel's `Lv.` badges depend on it. You're only removing filter state.
9. **Build with `npx next build`, never `npm run build`** (postbuild fires a live
   IndexNow ping at Bing / Yandex / Seznam).
10. **If reality does not match this brief, stop and ask.**

---

## 1. The template — Cognitive

`app/drills/cognitive/CognitiveHubClient.js`:

- **~lines 45–82** — `cognitiveCategories`: an array of `{ name, folderName,
  icon, textColor, description, drills }`, where `drills` is the category's
  drills filtered into that group and `.sort()`ed by
  `getDifficultyRank(a.difficulty) - getDifficultyRank(b.difficulty)`.
- **~lines 304–369** — the render: a `Reveal` wrapping a bordered card, an `h2`
  ("Cognitive Training Domains"), then a
  `grid grid-cols-1 md:grid-cols-3 gap-5` of per-group cards. Each card:
  icon + `h3` group name + `<count> Drill(s)` + one-line group `description`,
  then a `border-t` list of `<Link>`s — one per drill — each showing the drill
  name and its `duration` + a `ChevronRight`.

Reproduce that structure on every other hub. Same heading style, same card
grid, same link rows. Only the group list and the accent classes differ.

---

## 2. Hubs A/B/C — FPS, Motor, Physical (remove filter UI, add Domains)

`app/drills/fps/FPSHubClient.js`, `app/drills/motor/MotorDrillsClient.js`,
`app/drills/physical/PhysicalDrillsClient.js`.

**Delete:**
- the `DISCIPLINES` and `GAME_PRESETS` module consts;
- state: `selectedDiscipline`, `selectedGamePreset`, `searchQuery`;
- derived: `disciplineCounts`, `filteredDrills`, `hasActiveFilters`,
  `resetFilters`, and the "no drills match your filter" empty state;
- the JSX: the search `<input>`, the `FOCUS:` preset row, the "Discipline
  Navigation Tabs" block.

**Keep / rewire:**
- `DRILL_METADATA` — reuse its `disciplineName` as the group key for the Domains
  section (it already partitions every drill: FPS → Precision Clicking /
  Tracking & Smoothness / Recoil & Angles / Reflex & Reaction; Motor and
  Physical have their own). If you'd rather group by the registry `subcategory`
  field instead, that's fine too — pick one, note which, be consistent. Do not
  keep both taxonomies.
- feed `DrillCarousel` the full drill list (same interest/`sortByInterest`
  ordering the other hubs use), not a filtered slice. Drop the
  `key={...selectedDiscipline...}` remount hack.

**Add:** the Domains section (template §1), one group per `disciplineName`,
drills within a group sorted by difficulty rank.

FPS is ~30 lines of colour classes and the largest of the three — do it first
and get it approved before touching Motor / Physical.

---

## 3. Hubs D–G — Memory, Visual, Visual-Tracking, Reaction-Speed (add Domains only)

These have no filter UI to remove — just add the Domains section below the
carousel.

**Grouping source per hub (from `lib/drillsRegistry.js`):**

| Hub | `subcategory` values today | Action |
|---|---|---|
| **Memory** | `Short-Term Memory`, `Spatial Memory`, `Working Memory` | use as-is |
| **Visual** | `depth-perception`, `reaction-speed`, `tracking-accuracy`, `visual-recognition` | Title-Case for the heading (`Depth Perception`, `Reaction Speed`, `Tracking Accuracy`, `Visual Recognition`); keep the slug as the key |
| **Visual-Tracking** | all `visual-tracking` (15 drills, one flat group) | **STOP and ask.** Options: (a) one "All Pursuit Drills" group — simplest, still crawlable; (b) add real `subcategory` values to the 15 registry entries (e.g. *Smooth Pursuit*, *Predictive / Anticipatory*, *Evasion & Direction-Change*, *Peripheral & Split Attention*). Do not guess the split — surface the drill list and the proposed grouping for approval. |
| **Reaction-Speed** | all `reaction-speed` (8 drills, one flat group) | **STOP and ask** — same as above. Likely (a) one group is fine at 8 drills. |

For (b) cases, editing the registry is a separate, listed change in the same
pass — show the `subcategory` edits alongside the hub edit.

One-line group `description`s: write plain factual copy about what the group
trains. No benchmarks, no "sub-millisecond", no invented stats.

---

## 4. What is shared vs per-hub

| Concern | Lives in | Touch it here? |
|---|---|---|
| Carousel, card art, badges, step dots | `components/drill/DrillCarousel.js`, `DrillPreview.js` | **No** |
| `RelatedDrills`, cross-link mesh | `app/drills/layout.js`, `lib/drillSeo.js` | **No** |
| Neighbour-hub grid | `components/AdjacentHubs.js` | **No** |
| Filter UI, Domains section, intro copy, accent passed to shared comps | `app/drills/<cat>/<Name>Client.(js\|tsx)` | **Yes — per hub** |

The Domains section is per-hub JSX. If you find yourself wanting a
`<HubDomains>` shared component: propose it after FPS + one bare hub are done
and the shape has settled — not before.

---

## 5. Verifying (per hub)

```bash
npx next dev -p 3199 > dev.log 2>&1 &
until grep -q "Ready in" dev.log; do :; done
curl -s http://localhost:3199/drills/<cat> -o hub.html -w "%{http_code}\n"

# every drill in the category must appear as a link in the SSR HTML:
node -e 'const{DRILLS}=require("./lib/drillsRegistry.js");const h=require("fs").readFileSync("hub.html","utf8");const m=DRILLS.filter(d=>d.category==="<cat>");const miss=m.filter(d=>!h.includes(d.href));console.log(miss.length?"MISSING:\n"+miss.map(d=>d.href).join("\n"):"all "+m.length+" drill links present in SSR")'

# filter UI is gone (FPS/Motor/Physical):
grep -c -E 'Search drills by name|FOCUS:|Discipline Navigation' hub.html   # expect 0
```

Then load it in a browser at ≥1280px and at 375px: Domains cards read cleanly,
headings are real text, every drill is one tap away, no leftover empty filter
bar. Check one filter hub and one bare hub — different starting points.

Finish with `npx next build`.

---

## 6. Report format per pass

- Hub done, and which taxonomy you grouped by (`DRILL_METADATA` /
  `subcategory` / registry edit).
- Diff summary: lines/consts/state removed, section added.
- The SSR link-presence check output (§5).
- Any registry `subcategory` edits, listed drill-by-drill.
- Screenshots: hub at 1280px and 375px.
- `npx next build` result.
- Anything that didn't match this brief.
