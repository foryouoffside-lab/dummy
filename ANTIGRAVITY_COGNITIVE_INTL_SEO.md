# Execution Brief — International SEO Build-Out: `cognitive` Category

**Target agent:** Antigravity
**Scope:** `app/drills/cognitive` — 8 drills + 1 hub. Nothing outside this tree.
**Precedent:** This repeats the `reaction-speed` programme. Read §3 before planning — it records what went wrong last time, and repeating any of it fails this brief.

---

## 1. Your Role

Senior international SEO strategist and implementer, twenty years in. Two habits define your work:

**You measure before you build.** Search volume is a number with a tool and a date attached, never an estimate. When the API returns null you write `ERR`, because a null recorded as `0` sends the next person to rebuild a page that was already correct.

**You prefer fewer, better pages.** You have watched sites bury themselves under machine-translated shells. 6 excellent localized pages outrank 200 thin ones, and the thin ones actively suppress the good ones. You will argue for a smaller build than asked for when the data says so.

---

## 2. Starting State — `cognitive` is Already Healthy

**This is not a rescue job.** The `reaction-speed` category needed content depth and truthfulness repair before it could be localized. `cognitive` does not. Verified against rendered HTML:

| Page | Words | Inbound links | H2 | FAQ schema/visible |
|---|---:|---:|---:|:---:|
| `focus/distraction-fighter` | 1,158 | 23 | 7 | 10/10 ✓ |
| `processing-speed/symbol-matching` | 1,205 | 13 | 7 | 10/10 ✓ |
| `attention/divided-attention` | 1,083 | 20 | 7 | 10/10 ✓ |
| `processing-speed/rsvp-reader` | 1,077 | 22 | 7 | 10/10 ✓ |
| `processing-speed/reaction-time` | 1,076 | 17 | 7 | 5/5 ✓ |
| `focus/concentration-grid` | 1,063 | 26 | 7 | 10/10 ✓ |
| `attention/multi-tasking` | 1,034 | 18 | 7 | 10/10 ✓ |
| `attention/concentration-stamina` | 1,026 | 21 | 7 | 10/10 ✓ |
| **hub** `/drills/cognitive` | **353** | 115 | 4 | none |

- **FAQ drift: zero.** Already reconciled. Do not "fix" it.
- **No drill page emits hreflang.** Correct — none is localized yet.
- **No drill page has `DrillGuide`.** Unlike `reaction-speed`, they do not need it: they are already at ~1,100 words. **Do not roll `DrillGuide` out here.** That was a fix for an 800-word problem this category does not have.
- **The hub is thin at 353 words** and carries no FAQ schema. It has 115 inbound links — by far the most-linked page in the category.

### 2.1 Current English targets

| Folder | Term | Anchor |
|---|---|---|
| `focus/distraction-fighter` | stroop test | Stroop Test Online |
| `focus/concentration-grid` | schulte table | Schulte Table Trainer |
| `processing-speed/rsvp-reader` | reading speed test | Reading Speed Test |
| `processing-speed/symbol-matching` | symbol digit modalities test | Symbol Digit Modalities Test |
| `processing-speed/reaction-time` | neuro speed test | Neuro Speed & Reflex Test |
| `attention/concentration-stamina` | focus test | Focus Test |
| `attention/divided-attention` | divided attention test | Divided Attention Test |
| `attention/multi-tasking` | multitasking test | Multitasking Test |

Locale hubs already exist for all five locales (`app/{ko,ja,pt,es,de}/drills/cognitive/page.js`). No cognitive *drill* is localized.

---

## 3. What Went Wrong on `reaction-speed` — Do Not Repeat

The previous programme was three briefs meant to run 1→2→3. They ran **3→2→1**. The work itself was good; the ordering caused real damage.

**1. Non-reciprocal hreflang.** The English-side brief stripped `languages` from two pages because they were not localized *at the time it was written*. By the time it ran, the i18n brief had localized them. Result: `/ko` and `/ja` pointed at English, English pointed nowhere back. **Google discards non-reciprocal hreflang entirely**, so the localized pages earned nothing until it was caught and fixed.

→ **Every hreflang annotation must be reciprocal. Verify both directions in built HTML, not source.**

**2. A report claimed work it had not done.** It stated all four unsupportable claims were stripped from a page. Three were — the fourth survived in the client component, because only `page.tsx` had been checked.

→ **Grep the whole tree for a claim before reporting it removed. Verify your own report's assertions before writing them.**

**3. A verification script had a blind spot.** The supplied checker skipped hub pages (`if name == cat: continue`), so it reported "0 drifted" while the `reaction-speed` hub carried 8 FAQ schema questions visible nowhere on the page.

→ **The checker in §7 includes hubs. Do not reintroduce that exclusion.**

**What went right, and is now available to you:**
- `ROUTE_LOCALES` in `lib/i18n/locales.js` maps a route to the subset of locales that actually have a `page.js`
- `hasLocalizedRoute(locale, path)` consults it — exact match, no ancestor fallback
- `getAlternateLanguages()` consults it too, so it emits only locales that exist
- `app/sitemap.js` consults it, so partial localization no longer produces sitemap 404s

**Use these. They are why you can localize 2 of 8 drills without breaking anything.**

---

## 4. Non-Negotiable Constraints

1. **No hidden text.** No `display:none` keyword blocks, off-screen text, `aria-hidden` lists, sr-only smuggling. Named spam violation in Google's and Bing's guidelines. This site earns ~80 clicks/mo and cannot absorb a manual action.
2. **One language per URL.** English pages stay 100% English; a Korean page is 100% Korean. Never both. *Permitted:* brand names and genuine loanwords in Latin script inside a native sentence (`FPS 에임`, `CS2`). The existing `ko` dictionary sets the register — match it.
3. **Never fabricate a number.** No invented volumes, KD scores, sample sizes, user counts, citations, or testimonials. A null is `ERR`, never `0`.
4. **Retargeting must stay honest.** The page must deliver what its title promises.
5. **`keywords` meta is inert** — dropped by Google in 2009, a spam hint to Bing. Do not tune it and do not report doing so as SEO work.
6. **Do not regress the English pages.** They are healthy (§2). Structure, copy and canonicals stay unless a change is explicitly justified.
7. **Pages before `LOCALIZED_ROUTES`.** Never register a route without a real `page.js`. Register it in `ROUTE_LOCALES` too if only some locales have it.
8. **Do not roll out `DrillGuide` here** (§2).
9. **Scope:** `cognitive` only. Findings elsewhere go in the report, not in a commit.
10. **`npx next build` only — never `npm run build`.** The `postbuild` hook fires live IndexNow pings to Bing/Yandex/Seznam.
11. **Do not deploy or push.** Commit locally only. Deployment is the owner's decision.

---

## 5. Phase 1 — Research

**Deliverable:** `scripts/keywords/out/cognitive-intl-<YYYY-MM-DD>.md` + `.csv`, committed. Every row: phrase, market, exact, broad, date, tool.

### 5.1 Tooling

```
scripts/bing/bing.py              key: BING_API_KEY env, or scripts/bing/.bing-key
  python scripts/bing/bing.py keyword "<phrase>" <market>
  python scripts/bing/bing.py related "<phrase>" <market>    # term discovery
  python scripts/bing/bing.py quota                          # check before batching
scripts/keywords/drill_market_terms.py    drill-level demand per market
scripts/keywords/category_market_matrix.py
```

**Traps that will silently corrupt the dataset:**
- **Diacritics.** An unaccented phrase returns 0. `atención dividida` ≠ `atencion dividida`. Test both, report both.
- **The rate-limit null.** Retry with backoff; record `ERR`. Also retry around `URLError`.
- **ISO dates** required on keyword endpoints.
- **Calibration control.** Measure `stroop test` (US) first. The repo records ~427 exact. If your run is wildly off, stop and report — do not build on bad data.

### 5.2 Markets

- **Tier A — locale tree exists** (cheapest): `kr`, `jp`, `de`, `br` (pt), `es`
- **Tier B — no tree yet** (a win means recommending a new locale, a larger commit): `ru`, `fr`, `pl`, `it`, `tr`, `id`, `vi`, `nl`
- **Tier C — English control:** `us`, `gb`

### 5.3 A specific hypothesis to test first

**`cognitive` is unusual: several of its drills are internationally-named clinical or academic instruments, not gaming terms.** That changes where the demand lives, and it is the most promising lead in this brief.

- **`schulte table` — test `ru` before anything else.** The Schulte table (`таблица Шульте`) is a Soviet/Russian psychological instrument and is far better known in Russian than in English. English volume is ~149. Russian volume is plausibly an order of magnitude higher with much weaker competition. **Russia is Tier B — there is no `ru` locale tree — so a positive result here is the single most consequential finding available.** Test `таблица шульте`, `таблицы шульте`, `таблица шульте онлайн`.
- **`stroop test`** exists in every language and is a standard neuropsych instrument: `test de stroop`, `ストループ効果 テスト`, `스트룹 검사`, `Stroop-Test`, `teste de stroop`.
- **`symbol digit modalities test` (SDMT)** is a clinical instrument used in MS assessment. Test the clinical name and the acronym per market.
- **`reading speed test`** is universal: `벨로시메트리`/`읽기 속도 테스트`, `速読 テスト`, `Lesegeschwindigkeit test`, `teste de velocidade de leitura`, `test de velocidad de lectura`.

**Do not assume any of the above has volume. Measure it.** The prior programme found that obvious-looking translated phrasings frequently return exactly zero.

### 5.4 Term construction

Per drill, per market, build 4–8 candidates. Machine-translating the English term and stopping is the classic failure — the previous run measured the obvious `Treinador/Entrenador de X` forms at **zero** across the board.

Include: the literal translation; the colloquial name a real person uses; the **clinical/academic name** (unusually important in this category); the English loanword form, often dominant in `kr`/`jp`/`de`; the "test" framing (demand is overwhelmingly phrased as tests, not training); and a free-modifier variant (`무료`, `無料`, `kostenlos`, `gratis`, `бесплатно`).

Then **mine, don't guess**: run `related()` on the strongest seed per market and harvest real phrasing.

### 5.5 Competition assessment

**State this limitation in the report:** the Bing API returns volume but **no competition metric**. Any difficulty rating is your editorial judgment from SERP inspection — label it as such. Do not invent a numeric KD and present it as data.

For each candidate above the volume floor, inspect the live SERP in that market and record:

| Signal | Looking for |
|---|---|
| Page-1 composition | Interactive tools, or generic articles? Articles = soft SERP = opportunity |
| Domain strength | Wikipedia/major media/clinical sites, or thin content? |
| Native dedicated tool | Does a *native-language* purpose-built tool exist, or only English ones ranking by default? **An English tool ranking in a Russian or Korean SERP is the strongest opportunity signal available.** |
| Intent match | Would that searcher actually want this drill? Clinical-instrument queries often carry *diagnostic* intent, not *practice* intent — a real mismatch risk in this category. Flag it. |

Rate **LOW / MEDIUM / HIGH** with a one-line justification citing what you saw.

### 5.6 Decision rule

Promote to BUILD only when **all four** hold:

1. Exact monthly volume **≥ 300** (Tier A) or **≥ 1,000** (Tier B — higher bar, higher cost)
2. Competition **LOW or MEDIUM**
3. The drill **honestly delivers** what the term promises
4. The term is **unique across the whole `drillSeo.js` map, in every language** — two pages sharing a target contradict each other

**Calibrate expectations.** `cognitive` has weaker measured English demand than `reaction-speed` (`stroop test` ~427 vs `reaction time test` ~8,223). The likely honest outcome is **2–4 drill/market pairs**, quite possibly concentrated in one or two markets. A recommendation to build 40 pages means the criteria were not applied.

**Recommending a market be skipped entirely is a valid and valuable finding.**

---

## 6. Phase 2 — Implementation

Build only what Phase 1 justified.

### 6.1 Drill name + tagline localization

`lib/drillsRegistry.js` (names) and `lib/drillCatalog.js` (`DRILL_TAGLINES`) are flat English. If a `lib/i18n/drillNames.js` layer already exists from the `reaction-speed` run, **extend it — do not create a second mechanism.** Otherwise create it: keyed by canonical English `href` → locale → `{ name, tagline }`, resolved through `t()`, English fallback.

**`drill.href` stays canonical English everywhere.** It is the lookup key for `lib/drillPreviews.js`, the React key, and the `drillSeo.js` map key. Localizing it breaks preview rendering silently.

This is the highest-leverage change: the localized drill name becomes the card title, the H1, and the internal anchor text simultaneously.

### 6.2 Hub depth — do this regardless of what Phase 1 finds

The `/drills/cognitive` hub is **353 words with 115 inbound links** — the most-linked, thinnest page in the category, and hubs are among the few URLs Google has actually indexed on this site.

Add a visible FAQ section, following the pattern just applied to the `reaction-speed` hub: define the `FAQPage` schema in `page.js`, then pass it into the client and render it, mapped from the same object so the two cannot drift.

```js
<CognitiveHubClient
  faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
/>
```

Write 6–8 genuine questions about cognitive training. **Every answer must be factually defensible** — no invented statistics, no "studies show" without a real citation, no fabricated user counts. If you cannot support a claim, cut the question.

### 6.3 Locale drill pages

For each promoted (drill × market): `app/<loc>/drills/cognitive/<sub>/<drill>/page.js`.

Follow the existing pattern exactly (`app/ko/drills/cognitive/page.js`): a thin metadata wrapper re-exporting the shared English client, which localizes itself via `useTranslation`.

Each page carries: native `title` leading with the target term; native `description` written for click-through; self-referential locale-prefixed `canonical`; `alternates.languages` via `getAlternateLanguages()`; `openGraph` with the right `locale` (`ko_KR`, `ja_JP`, `ru_RU`…). **No `keywords` array** (§4.5).

**Body copy must be genuinely native, not machine-translated.** If you cannot produce native-quality copy for a market, stop and flag it for human review rather than shipping translationese.

### 6.4 Register routes, then wire hreflang

Only **after** pages exist:
- Add routes to `LOCALIZED_ROUTES`
- Add a `ROUTE_LOCALES` entry naming exactly the locales that have a `page.js`
- **Add `alternates.languages` to the English counterpart too.** This is the §3.1 failure. `getAlternateLanguages()` is route-aware, so it emits only real locales — but it must be present on **both** sides or Google discards the annotation.
- Confirm `x-default` present and correct
- Confirm `app/sitemap.js` emits the new URLs and no 404s

### 6.5 Internal linking

Pages unreachable by internal link join the 82 historically-uncrawled URLs.

- `DrillCarousel` already emits locale hrefs for registered routes automatically — **confirm, do not modify**
- Keep `RelatedDrills` cross-links within locale
- Extend `lib/drillSeo.js` with per-locale `term`/`anchor` so localized anchor text is native. **Uniqueness applies across all locales.**

---

## 7. Verification — Rendered HTML Is Ground Truth

Source inspection has already produced a wrong answer twice on this codebase. Run `npx next build`, then verify against `.next/server/`.

**This checker includes hub pages. Do not reintroduce the exclusion (§3.3).** It must print `0`.

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

**hreflang reciprocity — both directions, from built HTML:**

```python
import io, re, os
def alts(f):
    return re.findall(r'hrefLang="([^"]+)"',
                      io.open(f, encoding='utf-8', errors='replace').read()) \
           if os.path.exists(f) else None
# For every localized route: the EN page must list each locale,
# and each locale page must list 'en'. Any asymmetry is a failure.
```

Also confirm every hreflang `href` resolves to a real `page.js` — zero 404 targets sitewide.

Checklist:
- [ ] `npx next build` exits 0 — **capture the exit code directly, not through a pipe** (`| tail` returns `tail`'s status and has already masked a failure here)
- [ ] `npx tsc --noEmit` — no new errors above the existing 14-error baseline
- [ ] FAQ checker prints `0`, hubs included
- [ ] hreflang reciprocal both ways; zero 404 targets
- [ ] `LOCALIZED_ROUTES` + `ROUTE_LOCALES` match what exists on disk
- [ ] Sitemap emits no URL lacking a `page.js`
- [ ] Target term present in **server-rendered** HTML for each new page
- [ ] Every new page reachable by internal link from its locale hub
- [ ] Hub word count materially above 353, with the number shown
- [ ] Every claim you report as removed, verified absent by grepping the **whole tree** (§3.2)
- [ ] English pages unchanged apart from the added `alternates.languages`
- [ ] `git diff --stat` confined to `cognitive` + the shared i18n/registry files
- [ ] Nothing pushed, nothing deployed

---

## 8. Deliverables

1. `scripts/keywords/out/cognitive-intl-<date>.md` + `.csv`
2. Code changes per §6
3. `COGNITIVE_INTL_SUMMARY.md` at repo root:
   - Every term measured, with date and tool; calibration control result
   - **The `ru` / `таблица Шульте` finding specifically** (§5.3) — it decides whether a new locale is worth opening
   - Build/skip decision per drill × market, traceable to §5.6
   - **What you deliberately did not build, and why** — as important as the rest
   - Pasted verification output, including failures
   - A go/no-go on extending this to the next category
4. One commit per workstream, conventional format. Local only.

---

## 9. Automatic Rejection

- Hidden, cloaked, or visually suppressed keyword text
- Any invented volume, KD score, statistic, citation, or user count
- A rate-limit null recorded as `0`
- Machine-translated body copy shipped as native
- A route in `LOCALIZED_ROUTES` without a `page.js`, or a missing `ROUTE_LOCALES` entry
- Non-reciprocal hreflang, or any alternate pointing at a 404
- A FAQ checker that excludes hub pages
- Reporting a claim removed without grepping the whole tree
- `DrillGuide` rolled out here
- Changes outside `cognitive`
- `npm run build` during development
- Pushing or deploying

---

## 10. Judgment Clause

`cognitive` starts healthy. The English pages do not need rescuing, so the entire value of this brief is in **research quality and restraint**.

The most likely correct outcome is a **small** build — perhaps two drills in one or two markets — plus the hub FAQ, plus a clear recommendation on whether `таблица Шульте` justifies opening a Russian locale.

A large build assembled by relaxing the §5.6 criteria is the failure mode. If the honest finding is "only `schulte table` in `ru` clears the bar, and here is what a `ru` tree would cost," that is a complete and successful result. Write it that way.
