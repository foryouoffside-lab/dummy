# Execution Brief — International SEO Build-Out: `memory` Category

**Target agent:** Antigravity
**Scope:** `app/drills/memory` — 7 drills + 1 hub. Nothing outside this tree.
**Precedent:** Fourth run of this programme, after `reaction-speed`, `cognitive` and `fps`. Read §3 before planning.

---

## 1. Your Role

Senior international SEO strategist and implementer, twenty years in.

**You measure before you build.** Volume is a number with a tool and a date. A null is `ERR`, never `0`.

**You prefer fewer, better pages.** Two good localized pages beat twenty thin ones, and the thin ones suppress the good ones.

**You name the incumbent.** When one competitor owns a category outright, saying so early saves everyone months. This category has exactly that situation (§5.3), and an honest read of it is the single most valuable thing you can deliver here.

---

## 2. Starting State — Thin, but Clean

Verified against rendered HTML in `.next/server/`:

| Page | Words | Inbound | H2 | FAQ schema/visible |
|---|---:|---:|---:|:---:|
| `working-memory/n-back` | 855 | 16 | 7 | 8/8 ✓ |
| `spatial-memory/object-location` | 817 | 20 | 7 | 6/6 ✓ |
| `short-term-memory/digit-span` | 810 | 21 | 7 | 6/6 ✓ |
| `spatial-memory/path-tracing` | 804 | 14 | 7 | 6/6 ✓ |
| `spatial-memory/grid-memorization` | 798 | 18 | 7 | 5/5 ✓ |
| `short-term-memory/color-sequence` | 777 | 19 | 7 | 6/6 ✓ |
| `short-term-memory/word-recall` | 766 | 18 | 7 | 8/8 ✓ |
| **hub** `/drills/memory` | **343** | **113** | 4 | **none** |

- **FAQ drift: zero.** Already reconciled. **Do not touch the schema.**
- **No drill emits hreflang.** Correct — none is localized.
- **No drill has `DrillGuide`.**
- **This is the thinnest category on the site.** Every drill sits at 766–855 words, and the spread is only 89 words — uniformly thin rather than one outlier. Compare `fps` (675–2,346) and `cognitive` (1,026–1,205). **Unlike those two briefs, a `DrillGuide` rollout here is warranted** (§6.2).
- **The hub is 343 words with 113 inbound links** — the thinnest hub on the site and one of the most linked.
- FAQ counts are low (5–8 per page) compared to other categories, which is part of why the pages are short.

### 2.1 Current English targets

| Folder | Term | Anchor |
|---|---|---|
| `short-term-memory/color-sequence` | color memory game | Color Memory Game |
| `short-term-memory/digit-span` | digit span test | Digit Span Memory Test |
| `short-term-memory/word-recall` | verbal memory test | Verbal Memory Test |
| `spatial-memory/grid-memorization` | visual memory test | Visual Memory Test |
| `spatial-memory/object-location` | object location memory test | Object Location Memory Test |
| `spatial-memory/path-tracing` | sequence memory game | Path Tracing Sequence Memory |
| `working-memory/n-back` | n-back test | 3-Back Working Memory Test |

Locale hubs exist for all five locales. No `memory` *drill* is localized.

---

## 3. Failures From Previous Runs — Do Not Repeat

1. **Non-reciprocal hreflang.** An English page had `languages` stripped after its locale versions existed. Google discards one-way hreflang entirely, so the localized pages earned nothing. → **Verify both directions in built HTML.**
2. **A report claimed work it had not done** — asserted four claim removals when only `page.tsx` had been checked, not the client. → **Grep the whole tree before reporting a removal.**
3. **A verification script skipped hub pages,** reporting "0 drifted" while a hub carried 8 invisible FAQ answers. → **The checker in §7 includes hubs. Do not reintroduce that exclusion.**
4. **A build failure was masked by a pipe** — `npx next build | tail` returns `tail`'s status. → **Capture the exit code directly.**

**Infrastructure available (built during those runs — use it):** `ROUTE_LOCALES`, `hasLocalizedRoute()`, a route-aware `getAlternateLanguages()`, and a `ROUTE_LOCALES`-aware `app/sitemap.js`. Together these let you localize 2 of 7 drills without producing a single sitemap 404.

---

## 4. Non-Negotiable Constraints

1. **No hidden text.** No `display:none` keyword blocks, off-screen text, `aria-hidden` lists, sr-only smuggling. Named spam violation; the site earns ~80 clicks/mo and cannot absorb a manual action.
2. **One language per URL.** *Permitted:* genuine loanwords in Latin script inside a native sentence. Match the register of the existing `ko`/`ja` dictionaries.
3. **Never fabricate a number.** No invented volumes, KD scores, sample sizes, user counts, or citations. **This constraint bites hardest in this category** — see §6.2. Null is `ERR`.
4. **No medical or clinical claims.** Memory training sits next to dementia, cognitive decline and ADHD. You may **not** state or imply that these drills diagnose, prevent, treat or delay any condition, and you may not cite research you have not verified. This is both a factual-accuracy requirement and a YMYL search-quality risk — Google applies elevated scrutiny to health-adjacent content, and an unsupported claim here does more damage than in any other category on this site.
5. **Retargeting must stay honest.**
6. **`keywords` meta is inert.** Do not tune it or report it as work.
7. **Do not touch the FAQ schema.** All 7 are reconciled.
8. **Pages before `LOCALIZED_ROUTES`,** plus a matching `ROUTE_LOCALES` entry.
9. **Scope:** `memory` only.
10. **`npx next build` only — never `npm run build`** (the `postbuild` hook fires live IndexNow pings).
11. **Do not push or deploy.** Commit locally only.

---

## 5. Phase 1 — Research

**Deliverable:** `scripts/keywords/out/memory-intl-<YYYY-MM-DD>.md` + `.csv`, committed. Every row: phrase, market, exact, broad, date, tool.

### 5.1 Tooling

```
scripts/bing/bing.py          key: BING_API_KEY env, or scripts/bing/.bing-key
  python scripts/bing/bing.py keyword "<phrase>" <market>
  python scripts/bing/bing.py related "<phrase>" <market>
  python scripts/bing/bing.py quota
scripts/keywords/market_volume.py       contains "jogos de treinar memoria", "juegos de memoria",
                                        "gehirnjogging kostenlos" seeds
scripts/keywords/drill_market_terms.py
```

**Traps:** diacritics (`memória` ≠ `memoria` — an unaccented phrase silently returns 0; test both); the rate-limit null (retry with backoff, record `ERR`); retry around `URLError`; ISO dates on keyword endpoints.

**Calibration control:** measure `color memory game` (US) first — the repo records ~172 exact. If your run is wildly off, stop and report rather than building on bad data.

### 5.2 Markets

- **Tier A — locale tree exists:** `jp`, `kr`, `de`, `br` (pt), `es`
- **Tier B — no tree** (a win means recommending a new locale): `fr`, `it`, `nl`, `pl`, `ru`, `tr`
- **Tier C — English control:** `us`, `gb`

### 5.3 The incumbent problem — read before interpreting any English number

**One competitor owns nearly this entire category in English.** `humanbenchmark.com` is the canonical result for `verbal memory test`, `visual memory test`, `sequence memory`, `number memory` and `chimp test` — and five of the seven drills here target a term Human Benchmark already owns or directly neighbours.

It has been the default answer for a decade, carries enormous authority, and is the site people are explicitly looking for when they type those phrases. **At ~80 clicks/mo this site does not take those terms in English, and no on-page work changes that.** Say so plainly in your report rather than implying an English path exists.

This is a more concentrated incumbent problem than `fps` had: there, several competitors split the space. Here it is essentially one.

**Two consequences you must act on:**
- Weight the research decisively toward **non-English** markets. The English SERP is closed.
- Where an English page can still be improved, the goal is **long-tail and depth**, not the head term.

### 5.4 The hypothesis to test first

**Japan is the standout candidate, for a reason specific to this category.**

`脳トレ` (*nō-tore*, "brain training") is a mainstream Japanese term, not a niche one — Nintendo's *Brain Age* made it a household word, and Japan's demographics sustain continuing consumer interest in memory and cognitive maintenance. That is a very different demand profile from the gamer audience the `fps` drills serve, and it is **untested**: `scripts/keywords/market_volume.py` has never included it.

Test, at minimum: `脳トレ`, `脳トレ 無料`, `記憶力テスト`, `記憶力 トレーニング`, `瞬間記憶`, `ワーキングメモリ テスト`.

Also worth testing on the same logic:
- **German** `Gehirnjogging` — an established mainstream term, already seeded in `market_volume.py`. Also `Gedächtnistest`, `Gedächtnistraining`, `Merkfähigkeit test`.
- **Korean** `기억력 테스트`, `기억력 훈련`, `순간기억력`, `작업기억`.
- **`n-back`** is a technical term used untranslated in most languages. Test the bare term plus `dual n-back` per market — a small but genuinely international audience with unusually weak commercial competition.

**Do not assume any of the above has volume. Measure it.** Prior runs found obvious-looking translated phrasings returning exactly zero.

### 5.5 Audience register — this category is not the gamer one

The other three categories target gamers. This one largely does not. Memory and brain-training queries skew older, more health-motivated, and more academic. That changes three things:

- **Copy register.** Native copy must read as clear consumer or educational writing, not esports copy. A Japanese `脳トレ` page written in gamer register will not convert the audience that searches it.
- **Market selection.** Markets with older populations and established brain-training culture (Japan, Germany) may outperform markets that merely have large gaming scenes.
- **Intent.** Some queries carry *clinical* intent — people worried about memory loss. Those searchers are poorly served by a drill, and a page that appears to promise assessment would be both a bounce risk and a §4.4 violation. **Flag clinical-intent queries and exclude them.**

### 5.6 Term construction

Per drill, per market, 4–8 candidates: literal translation; the colloquial name; the **clinical/academic name** where one exists (`n-back`, `digit span` / `数唱`, `Zahlenspanne`); the "test" framing *and* the "game"/"training" framing — this category genuinely splits between them, unlike the others where "test" dominated; and a free-modifier variant (`無料`, `무료`, `kostenlos`, `gratis`).

Then **mine, don't guess**: run `related()` on the strongest seed per market.

### 5.7 Competition assessment

**State the limitation:** the Bing API gives volume, no competition metric. Any difficulty rating is your editorial judgment from SERP inspection — label it so. Do not invent a numeric KD.

| Signal | Looking for |
|---|---|
| Is Human Benchmark on page 1? | If yes in that market too, the term is likely closed there as well |
| Native dedicated tool | Does a *native-language* memory tool exist, or only English ones ranking by default? **English tools ranking in a Japanese SERP is the strongest opportunity signal available.** |
| App-store dominance | Brain-training queries often return app listings rather than web tools. A SERP owned by app installs is a poor fit for a browser drill regardless of volume — flag it. |
| Intent match | Practice intent vs clinical-assessment intent (§5.5) |

Rate **LOW / MEDIUM / HIGH** with a one-line justification citing what you saw.

### 5.8 Decision rule

Promote to BUILD only when **all five** hold:

1. Exact monthly volume **≥ 300** (Tier A) or **≥ 1,000** (Tier B)
2. Competition **LOW or MEDIUM**
3. The drill **honestly delivers** the term
4. The term is **unique across the whole `drillSeo.js` map, in every language**
5. **Intent is practice, not clinical assessment** (§5.5)

**Expected honest outcome: 2–3 drill × market pairs, most plausibly in `jp` and possibly `de`.** A recommendation to localize all 7 means the criteria were not applied. **Recommending a market be skipped is a valid, valuable finding — and given §5.3, "skip English entirely" is a legitimate conclusion to reach and state.**

---

## 6. Phase 2 — Implementation

### 6.1 Drill name + tagline localization

If `lib/i18n/drillNames.js` exists from a prior run, **extend it — do not create a second mechanism.** Otherwise create it: keyed by canonical English `href` → locale → `{ name, tagline }`, resolved through `t()`, English fallback.

**`drill.href` stays canonical English everywhere** — it keys `lib/drillPreviews.js`, the React key, and the `drillSeo.js` map. Localizing it breaks preview rendering silently.

### 6.2 English content depth — warranted here

Unlike `fps` and `cognitive`, this category genuinely needs it.

**a. The hub.** `/drills/memory` is **343 words with 113 inbound links** — the thinnest hub on the site. Add a visible FAQ following the pattern applied to the `reaction-speed` hub: define `faqSchema` in `page.js`, pass it to the client, render it mapped from the same object so the two cannot drift:

```js
<MemoryClient
  faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
/>
```

**b. `DrillGuide` rollout to all 7 drills.** At 766–855 words they are the site's thinnest drill pages. Bring them toward ~1,200. Use the `reaction-time-test` pattern (`faqs: faqSchema.mainEntity.map(...)`) so schema and visible content share one source and cannot drift.

**The truthfulness bar is higher here than anywhere else on this site.** Memory content invites exactly the claims you must not make:

- ❌ "Improves memory by X%" — no such measurement exists for this site
- ❌ "Reduces risk of cognitive decline / dementia" — a medical claim (§4.4)
- ❌ "Studies show…" without a real, named, verified citation
- ❌ "Average person scores N" presented as measured when it is not
- ❌ Invented percentile tables presented as data

**What is honest and still useful:** explaining what working memory *is*, how the n-back paradigm works and where it came from, what digit span measures, why chunking helps, and framing any score bands explicitly as an editorial guide rather than a norm. Saying "these bands are our own rough guide, not clinical norms" costs nothing and is the difference between defensible and not.

If you cannot support a sentence, cut it. A 1,000-word honest guide beats a 1,400-word one containing three claims that fail review.

### 6.3 Locale drill pages

For each promoted (drill × market): `app/<loc>/drills/memory/<sub>/<drill>/page.js`.

Follow the existing pattern (`app/ko/drills/memory/page.js`): a thin metadata wrapper re-exporting the shared English client, which localizes itself via `useTranslation`.

Each carries: native `title` leading with the target term; native `description` for click-through; self-referential locale-prefixed `canonical`; `alternates.languages` via `getAlternateLanguages()`; correct `openGraph.locale`. **No `keywords` array.**

**Body copy must be genuinely native and in the right register** (§5.5). If you cannot produce it for a market, **stop and flag it for human review** rather than shipping translationese.

### 6.4 Register routes, then wire hreflang both ways

Only after pages exist: add to `LOCALIZED_ROUTES`; add a `ROUTE_LOCALES` entry naming exactly the locales with a `page.js`; **add `alternates.languages` to the English counterpart too** (the §3.1 failure — both sides or Google discards it); confirm `x-default`; confirm the sitemap emits no 404s.

### 6.5 Internal linking

- `DrillCarousel` emits locale hrefs for registered routes automatically — **confirm, do not modify**
- Keep `RelatedDrills` cross-links within locale
- Extend `lib/drillSeo.js` with per-locale `term`/`anchor`; **uniqueness applies across all locales**

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

**hreflang reciprocity, both directions, from built HTML** — for every localized route the EN page must list each locale, and each locale page must list `en`. Any asymmetry is a failure. Confirm every hreflang `href` resolves to a real `page.js`: zero 404 targets sitewide.

Checklist:
- [ ] `npx next build` exits 0 — **capture the exit code directly, not through a pipe** (§3.4)
- [ ] `npx tsc --noEmit` — no new errors above the existing 14-error baseline
- [ ] FAQ checker prints `0`, hubs included
- [ ] hreflang reciprocal both ways; zero 404 targets
- [ ] `LOCALIZED_ROUTES` + `ROUTE_LOCALES` match disk exactly
- [ ] Sitemap emits no URL lacking a `page.js`
- [ ] Target term present in **server-rendered** HTML for each new page
- [ ] Every new page reachable by internal link from its locale hub
- [ ] Hub materially above 343 words; all 7 drills materially above 855 — **show every number**
- [ ] **Every health-adjacent sentence in the new guides re-read against §4.4 and §6.2**, with anything cut listed in the report
- [ ] Anything reported as removed, verified absent by grepping the **whole tree** (§3.2)
- [ ] `git diff --stat` confined to `memory` + shared i18n/registry files
- [ ] Nothing pushed, nothing deployed

---

## 8. Deliverables

1. `scripts/keywords/out/memory-intl-<date>.md` + `.csv`
2. Code changes per §6
3. `MEMORY_INTL_SUMMARY.md` at repo root:
   - Every term measured, with date and tool; calibration control result
   - **A direct verdict on §5.3** — is the English side of this category closed by Human Benchmark? Cite the SERPs.
   - **The §5.4 Japanese `脳トレ` result specifically** — it decides whether this category has an international path at all
   - Build/skip decision per drill × market, traceable to §5.8
   - **Every claim you cut on §4.4 / §6.2 grounds, quoted** — this is a required section, not optional
   - **What you deliberately did not build, and why**
   - Pasted verification output, including failures
   - A go/no-go on the next category
4. One commit per workstream, conventional format. Local only.

---

## 9. Automatic Rejection

- Hidden, cloaked, or visually suppressed keyword text
- **Any medical, clinical, or dementia-related claim** (§4.4)
- Any invented volume, KD score, statistic, percentile table, or citation
- A rate-limit null recorded as `0`
- Machine-translated body copy, or native copy in the wrong register (§5.5)
- Building against a clinical-intent query
- A route in `LOCALIZED_ROUTES` without a `page.js`, or a missing `ROUTE_LOCALES` entry
- Non-reciprocal hreflang, or any alternate pointing at a 404
- A FAQ checker that excludes hub pages
- Touching the reconciled FAQ schema
- Reporting a removal without grepping the whole tree
- Reading a build exit code through a pipe
- Changes outside `memory`
- `npm run build` during development
- Pushing or deploying

---

## 10. Judgment Clause

This category has the site's thinnest pages and its most entrenched English competitor. Those two facts point to a clear shape for the work: **fix the depth, and look for the opening abroad rather than at home.**

The most likely correct outcome is the hub FAQ, the seven guides, and a **small** localized build — two or three pages, most plausibly Japanese — plus a plain statement that the English head terms belong to Human Benchmark and are not worth contesting.

Concluding "there is no viable English path here, and the international case rests entirely on whether `脳トレ` measures well" is a complete and successful result if the data says it. Write it that way rather than manufacturing an optimistic plan the numbers do not support.
