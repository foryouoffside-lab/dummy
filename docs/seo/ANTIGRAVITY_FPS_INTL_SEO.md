# Execution Brief — International SEO Build-Out: `fps` Category

**Target agent:** Antigravity
**Scope:** `app/drills/fps` — 15 drills + 1 hub. Nothing outside this tree.
**Precedent:** Third run of this programme, after `reaction-speed` and `cognitive`. Read §3 before planning — it records failures from the previous runs, and repeating any of them fails this brief.

---

## 1. Your Role

Senior international SEO strategist and implementer, twenty years in.

**You measure before you build.** Volume is a number with a tool and a date on it. A null is `ERR`, never `0` — a rate-limit null recorded as zero has already sent one agent to rebuild a page that was correctly targeted.

**You prefer fewer, better pages.** This category will tempt you more than the others, because it has 15 drills and an obvious head term. Resist it. Fifteen thin Korean pages competing with each other rank worse than two good ones.

**You are honest about difficulty.** This is the category where the site faces its strongest competition, and saying so plainly is part of the job.

---

## 2. Starting State — `fps` is Structurally Healthy

Verified against rendered HTML in `.next/server/`:

| Page | Words | Inbound | H2 | FAQ schema/visible |
|---|---:|---:|---:|:---:|
| `flick-shot-training` | **2,346** | 33 | 8 | 17/17 ✓ |
| `micro-correction-precision` | 1,165 | 19 | 7 | 15/15 ✓ |
| `angle-hold-trainer` | 1,117 | 27 | 7 | 9/9 ✓ |
| `recoil-control` | 1,063 | 33 | 7 | 10/10 ✓ |
| `anti-zigzag-movement-trainer` | 1,061 | 11 | 7 | 15/15 ✓ |
| `target-prioritization` | 1,055 | 14 | 7 | 15/15 ✓ |
| `anti-strafe-jitter-duel` | 1,043 | 14 | 7 | 15/15 ✓ |
| `flow-state` | 1,003 | 14 | 7 | 15/15 ✓ |
| `instant-response` | 989 | 19 | 7 | 15/15 ✓ |
| `vertical-air-track` | 970 | 17 | 7 | 11/11 ✓ |
| `target-switching-swarm` | 955 | 18 | 7 | 12/12 ✓ |
| `180-degree-awareness` | 918 | 60 | 7 | 10/10 ✓ |
| `pro-smooth-pursuit` | 834 | 21 | 7 | 10/10 ✓ |
| `target-acquisition` | 822 | 21 | 6 | 8/8 ✓ |
| `strafe-tracking` | **675** | 31 | 6 | 10/10 ✓ |
| **hub** `/drills/fps` | **599** | **135** | 4 | **none** |

- **FAQ drift: zero across all 15.** Already reconciled. **Do not touch it.**
- **No drill emits hreflang.** Correct — none is localized.
- **Only `flick-shot-training` has `DrillGuide`.** The rest sit at 675–1,165 words, which is adequate. **Do not roll `DrillGuide` out across the category** — that was a fix for `reaction-speed`'s 800-word floor. The one exception is `strafe-tracking` (§6.2).
- Locale hubs exist for all five locales; no `fps` *drill* is localized.

### 2.1 Current English targets

| Folder | Term | Folder | Term |
|---|---|---|---|
| `flick-shot-training` | flick shot trainer | `recoil-control` | recoil control trainer |
| `180-degree-awareness` | 180 aim trainer | `strafe-tracking` | strafe tracking aim trainer |
| `angle-hold-trainer` | crosshair placement trainer | `target-acquisition` | target acquisition trainer |
| `anti-strafe-jitter-duel` | jitter aim trainer | `target-prioritization` | target prioritization trainer |
| `anti-zigzag-movement-trainer` | anti-zigzag aim trainer | `target-switching-swarm` | target switching trainer |
| `flow-state` | aim flow state trainer | `vertical-air-track` | vertical aim trainer |
| `instant-response` | fps reaction time test | `micro-correction-precision` | micro-correction aim trainer |
| `pro-smooth-pursuit` | smooth pursuit aim trainer | | |

**Note the pattern: 12 of 15 are `<modifier> aim trainer`.** They are unique strings, which satisfies the `drillSeo.js` uniqueness rule, but they are all variants of one head term. This matters enormously once you localize — see §5.5.

---

## 3. Failures From Previous Runs — Do Not Repeat

**1. Non-reciprocal hreflang.** Briefs ran out of order; an English page had its `languages` stripped after its locale versions were built. `/ko` pointed at English, English pointed nowhere back. **Google discards non-reciprocal hreflang entirely** — the localized pages earned nothing until caught.
→ **Verify both directions in built HTML.**

**2. A report claimed work it had not done.** It said four unsupportable claims were stripped; three were. Only `page.tsx` had been checked, not the client component.
→ **Grep the whole tree before reporting a removal.**

**3. A verification script skipped hub pages,** so it reported "0 drifted" while a hub carried 8 invisible FAQ answers.
→ **The checker in §7 includes hubs. Do not reintroduce that exclusion.**

**4. A build failure was masked by a pipe.** `npx next build | tail` returns `tail`'s exit code.
→ **Capture the build's exit code directly.**

**Infrastructure now available (built during those runs — use it):**
- `ROUTE_LOCALES` in `lib/i18n/locales.js` — maps a route to the subset of locales that actually have a `page.js`
- `hasLocalizedRoute(locale, path)` — exact match, no ancestor fallback
- `getAlternateLanguages()` — consults `ROUTE_LOCALES`, emits only locales that exist
- `app/sitemap.js` — consults it too, so partial localization produces no sitemap 404s

This is why you can localize 2 of 15 drills safely.

---

## 4. Non-Negotiable Constraints

1. **No hidden text.** No `display:none` keyword blocks, off-screen text, `aria-hidden` lists, sr-only smuggling. Named spam violation in Google's and Bing's guidelines. The site earns ~80 clicks/mo and cannot absorb a manual action.
2. **One language per URL.** *Permitted:* game titles and genuine loanwords in Latin script inside a native sentence — `발로란트`, `CS2`, `에임`, `エイム`, `Apex`. This is how those markets actually write, and the existing `ko`/`ja` dictionaries already do it. Match their register.
3. **Never fabricate a number.** No invented volumes, KD scores, player counts, rankings, or testimonials. Null is `ERR`.
4. **Retargeting must stay honest.** The drill must deliver what the title promises.
5. **`keywords` meta is inert.** Do not tune it; do not report doing so as SEO work.
6. **Do not regress the English pages.** They are healthy. No structural or copy changes beyond §6.2 and the added `alternates.languages`.
7. **Pages before `LOCALIZED_ROUTES`,** plus a matching `ROUTE_LOCALES` entry when only some locales have the page.
8. **Do not roll out `DrillGuide`** except `strafe-tracking` (§6.2).
9. **Do not touch the FAQ schema.** All 15 are reconciled.
10. **Scope:** `fps` only.
11. **`npx next build` only — never `npm run build`** (the `postbuild` hook fires live IndexNow pings).
12. **Do not push or deploy.** Commit locally only.

---

## 5. Phase 1 — Research

**Deliverable:** `scripts/keywords/out/fps-intl-<YYYY-MM-DD>.md` + `.csv`, committed. Every row: phrase, market, exact, broad, date, tool.

### 5.1 Tooling

```
scripts/bing/bing.py            key: BING_API_KEY env, or scripts/bing/.bing-key
  python scripts/bing/bing.py keyword "<phrase>" <market>
  python scripts/bing/bing.py related "<phrase>" <market>
  python scripts/bing/bing.py quota
scripts/keywords/market_volume.py         already contains fps seed terms per market
scripts/keywords/drill_market_terms.py
```

**`scripts/keywords/market_volume.py` already holds seeds for this exact category** — `エイム練習`, `エイム練習 ブラウザ`, `エイム練習サイト`, `에임 연습`, `에임 훈련`, `treino de mira`, `mira valorant`, `entrenar puntería`, `mejorar puntería valorant`, `aim training kostenlos`. Start there; those were chosen deliberately.

**Traps:**
- **Diacritics.** `puntería` ≠ `punteria`; `mirá`/`mira`. An unaccented phrase silently returns 0. Test both, report both.
- **The rate-limit null.** Retry with backoff, record `ERR`. Retry around `URLError`.
- **Calibration control:** measure `aim trainer` (US) first. The repo records ~9,821. If your run is wildly off, stop and report.

### 5.2 Markets

- **Tier A — locale tree exists:** `kr`, `jp`, `de`, `br` (pt), `es`
- **Tier B — no tree** (a win means recommending a new locale): `pl`, `tr`, `fr`, `id`, `vi`, `th`, `ru`
- **Tier C — English control:** `us`, `gb`

Tier B matters here more than in other categories: Poland, Turkey, Indonesia and Vietnam are large CS2/Valorant markets with comparatively little native-language tooling.

### 5.3 The strategic situation — read before interpreting any number

**In English, this is the hardest SERP the site faces.** `aim trainer` (~9,821) is contested by Aimlabs, KovaaK's, aimtrainer.io and 3daimtrainer.com — established products with real domain authority, budget, and in two cases a Steam install base. At ~80 clicks/mo this site does not win that term, and no amount of on-page work changes it.

**Internationally the picture may invert, and that is the entire thesis of this brief.** In `kr` and `jp` the page-1 results for aim-practice queries are frequently *English-language* tools ranking by default, because few native-language purpose-built trainers exist. **An English tool ranking in a Korean SERP is the strongest opportunity signal available in international SEO.**

So: `fps` is plausibly the site's *worst* English opportunity and its *best* international one. Test that hypothesis explicitly and report on it directly — it is the finding the owner most needs.

**One caution against over-reading it:** a prior category × market study found CPS, not FPS, was the site's #1 demand category overall. Do not assume FPS demand is large in a market just because gaming is. Measure.

### 5.4 Term construction

Per drill, per market, 4–8 candidates. Machine-translating and stopping is the classic failure — the previous run measured the obvious `Treinador/Entrenador de X` forms at **zero**.

Include: literal translation; the colloquial gamer phrasing; **the English loanword form**, which is often dominant in `kr`/`jp`/`de` (`aim trainer`, `エイム`, `에임`); the "practice"/"training" framing *and* the "test" framing; a free-modifier variant (`무료`, `無料`, `kostenlos`, `gratis`, `darmowy`); and **game-name-qualified forms** — `발로란트 에임 연습`, `バロラント エイム練習`, `mira valorant`, `cs2 aim trainer`. Game-qualified queries are a real and distinctive pattern in this category and are frequently lower-competition than the bare head term.

Then **mine, don't guess**: run `related()` on the strongest seed per market.

### 5.5 Cannibalization — the constraint specific to this category

12 of 15 English terms are `<modifier> aim trainer`. In English they are differentiated enough to coexist. **In a second language they very likely collapse into the same phrase.** "Smooth pursuit aim trainer", "strafe tracking aim trainer" and "target switching trainer" may all translate to something a Korean speaker would simply call 에임 연습.

If you localize many drills in one market, they compete with each other for one query, split their own signal, and none ranks.

**Therefore: cap localization at 2–3 drills per market**, chosen because each maps to a *genuinely distinct* native query. Verify distinctness by measuring each candidate separately, not by assuming the English distinction survives translation. **Document which drills you excluded for this reason** — that reasoning is a deliverable, not a footnote.

### 5.6 Competition assessment

**State the limitation:** the Bing API returns volume but **no competition metric**. Any difficulty rating is your editorial judgment from SERP inspection — label it so. Do not invent a numeric KD.

Per candidate above the floor, inspect the live SERP in that market and record:

| Signal | Looking for |
|---|---|
| Page-1 composition | Aimlabs/KovaaK's/aimtrainer.io present, or softer results? |
| Native dedicated tool | Does a *native-language* browser trainer exist, or only English ones ranking by default? |
| Language of results | **English tools ranking in a native SERP = strongest opportunity signal** |
| Intent match | Does that searcher want a browser drill, or a downloadable product? A query dominated by Steam/download intent is a poor fit regardless of volume |

Rate **LOW / MEDIUM / HIGH** with a one-line justification citing what you actually saw.

### 5.7 Decision rule

Promote to BUILD only when **all five** hold:

1. Exact monthly volume **≥ 300** (Tier A) or **≥ 1,000** (Tier B)
2. Competition **LOW or MEDIUM**
3. The drill **honestly delivers** the term
4. The term is **unique across the whole `drillSeo.js` map, in every language**
5. **It is distinct from the other localized drills in that same market** (§5.5)

**Expected honest outcome: 2–4 drill × market pairs, likely concentrated in `kr` and `jp`.** A recommendation to localize 15 drills means the criteria were not applied. **Recommending a market be skipped is a valid, valuable finding.**

---

## 6. Phase 2 — Implementation

### 6.1 Drill name + tagline localization

If `lib/i18n/drillNames.js` exists from a prior run, **extend it — do not create a second mechanism.** Otherwise create it: keyed by canonical English `href` → locale → `{ name, tagline }`, resolved through `t()`, English fallback.

**`drill.href` stays canonical English everywhere** — it keys `lib/drillPreviews.js`, the React key, and the `drillSeo.js` map. Localizing it breaks preview rendering silently.

### 6.2 English fixes — the only two permitted

**a. The hub.** `/drills/fps` is **599 words with 135 inbound links** — the most-linked page on the entire site, and thin. It carries no FAQ schema.

Add a visible FAQ, following the pattern already applied to the `reaction-speed` hub: define `faqSchema` in `page.js`, pass it into the client, render it mapped from the same object so the two cannot drift:

```js
<FPSHubClient
  faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
/>
```

6–8 genuine questions about aim training. **Every answer factually defensible** — no invented statistics, no "pros improve X%", no fabricated user counts.

**b. `strafe-tracking` at 675 words** is the thinnest drill page in the category while carrying 31 inbound links. Bring it in line with its neighbours (~1,000 words) with genuinely useful content. This is the one `DrillGuide` rollout permitted here.

**Nothing else in English changes.**

### 6.3 Locale drill pages

For each promoted (drill × market): `app/<loc>/drills/fps/<drill>/page.js`.

Follow the existing pattern (`app/ko/drills/fps/page.js`): a thin metadata wrapper re-exporting the shared English client, which localizes itself via `useTranslation`.

Each carries: native `title` leading with the target term; native `description` written for click-through; self-referential locale-prefixed `canonical`; `alternates.languages` via `getAlternateLanguages()`; `openGraph` with the right `locale`. **No `keywords` array.**

**Body copy must be genuinely native.** Gaming copy is register-sensitive — a stiff literal translation reads as machine output to exactly the audience you are targeting and will not earn links or return visits. If you cannot produce native-quality gaming copy for a market, **stop and flag it for human review.**

### 6.4 Register routes, then wire hreflang both ways

Only after pages exist:
- Add routes to `LOCALIZED_ROUTES`
- Add a `ROUTE_LOCALES` entry naming exactly the locales with a `page.js`
- **Add `alternates.languages` to the English counterpart as well** — this is the §3.1 failure; both sides or Google discards it
- Confirm `x-default` present and correct
- Confirm the sitemap emits the new URLs and no 404s

### 6.5 Internal linking

- `DrillCarousel` emits locale hrefs for registered routes automatically — **confirm, do not modify**
- Keep `RelatedDrills` cross-links within locale
- Extend `lib/drillSeo.js` with per-locale `term`/`anchor`. **Uniqueness applies across all locales** — and given §5.5, check the localized anchors against each other with particular care.

---

## 7. Verification — Rendered HTML Is Ground Truth

Run `npx next build`, then verify against `.next/server/`.

**This checker includes hubs. Do not reintroduce the exclusion (§3.3).** It must print `0`.

```python
import io, re, glob, os, html

bad = 0
for f in glob.glob('.next/server/app/**/*.html', recursive=True):
    s = io.open(f, encoding='utf-8', errors='replace').read()
    qs = re.findall(r'"@type":"Question","name":"(.*?)","acceptedAnswer"', s)
    if not qs:
        continue
    body = html.unescape(re.sub(r'<script\b[^>]*>.*?</script>', '', s, flags=re.S | re.I))
    missing = [q for q in qs
               if html.unescape(q.replace('\\"', '"')) not in body]
    if missing:
        bad += 1
        print('DRIFTED', f.replace(os.sep, '/'), len(missing), 'missing')
        for q in missing:
            print('    x', q)
print('drifted pages sitewide:', bad)
```

**hreflang reciprocity, both directions, from built HTML** — for every localized route the EN page must list each locale, and each locale page must list `en`. Any asymmetry is a failure. Also confirm every hreflang `href` resolves to a real `page.js`: zero 404 targets sitewide.

Checklist:
- [ ] `npx next build` exits 0 — **capture the exit code directly, not through a pipe** (§3.4)
- [ ] `npx tsc --noEmit` — no new errors above the existing 14-error baseline
- [ ] FAQ checker prints `0`, hubs included
- [ ] hreflang reciprocal both ways; zero 404 targets
- [ ] `LOCALIZED_ROUTES` + `ROUTE_LOCALES` match disk exactly
- [ ] Sitemap emits no URL lacking a `page.js`
- [ ] Target term present in **server-rendered** HTML for each new page
- [ ] Every new page reachable by internal link from its locale hub
- [ ] Hub word count materially above 599; `strafe-tracking` materially above 675 — show both numbers
- [ ] The other 14 English drill pages **byte-identical** apart from added `alternates.languages`
- [ ] Anything you report as removed, verified absent by grepping the **whole tree** (§3.2)
- [ ] `git diff --stat` confined to `fps` + shared i18n/registry files
- [ ] Nothing pushed, nothing deployed

---

## 8. Deliverables

1. `scripts/keywords/out/fps-intl-<date>.md` + `.csv`
2. Code changes per §6
3. `FPS_INTL_SUMMARY.md` at repo root:
   - Every term measured, with date and tool; calibration control result
   - **A direct verdict on the §5.3 hypothesis** — is `fps` the site's worst English opportunity and best international one? Cite the SERP evidence either way.
   - **The §5.5 cannibalization analysis** — which drills collapse into the same native query, and which you excluded because of it
   - Build/skip decision per drill × market, traceable to §5.7
   - **What you deliberately did not build, and why**
   - Pasted verification output, including failures
   - A go/no-go on the next category
4. One commit per workstream, conventional format. Local only.

---

## 9. Automatic Rejection

- Hidden, cloaked, or visually suppressed keyword text
- Any invented volume, KD score, statistic, player count, or citation
- A rate-limit null recorded as `0`
- Machine-translated body copy shipped as native
- Localizing more than 3 drills in one market without per-term evidence of distinct demand (§5.5)
- A route in `LOCALIZED_ROUTES` without a `page.js`, or a missing `ROUTE_LOCALES` entry
- Non-reciprocal hreflang, or any alternate pointing at a 404
- A FAQ checker that excludes hub pages
- Touching the reconciled FAQ schema on the 15 drill pages
- `DrillGuide` rolled out beyond `strafe-tracking`
- Reporting a removal without grepping the whole tree
- Reading a build exit code through a pipe
- Changes outside `fps`
- `npm run build` during development
- Pushing or deploying

---

## 10. Judgment Clause

`fps` has the most drills, the biggest head term, and the strongest incumbents. Those three facts pull in opposite directions, and holding them together is the whole job.

The most likely correct outcome is a **small** build — two or three drills in `kr` and `jp` — plus the hub FAQ and the `strafe-tracking` fix, plus a clear-eyed verdict on whether international `fps` is genuinely the opening it appears to be.

Localizing all 15 drills into a market is the failure mode of this brief. It would look like the most work and produce the least result, because those pages would compete with each other for one query and none would rank. If the honest finding is "only `flick shot trainer` and one other clear the bar in `kr`, and here is the SERP evidence," that is a complete and successful result. Write it that way.
