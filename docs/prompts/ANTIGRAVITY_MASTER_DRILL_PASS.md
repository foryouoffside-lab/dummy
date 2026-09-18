# MASTER BRIEF — One Drill, End to End

**This is the only prompt. Give Antigravity this file plus ONE drill URL.**

It takes a single drill from keyword research through English optimisation,
through the decision of whether it deserves localized pages, through building
them, to verification. Then it **STOPS** for human review.

Do not start a second drill in the same pass.

**Repo:** `skilldrills` — Next.js 15 App Router, JS.
**Site:** https://skilldrills.online

---

## THE GOAL, stated once

Rank this site's pages in multiple countries, in those countries' own languages,
for terms that have **real measured search demand** and **competition this domain
can actually beat**.

Not: translate everything. Not: chase the biggest number. Not: publish more pages.

---

## THE WORKFLOW — six steps, in order

```
STEP 1  MEASURE      what people actually search, in EN + ko + ja + pt
STEP 2  OPTIMISE     the English page
STEP 3  DECIDE       does this drill earn a localized page? (hard gate)
STEP 4  LOCALIZE     only if Step 3 says yes
STEP 5  VERIFY       paste every command's output
STEP 6  REPORT       then STOP
```

---

## 0. GROUND RULES — every one exists because this repo already shipped the failure

1. **ONE drill per pass.** Never "apply the same change across the rest."
   Drills differ in state shape, `.js` vs `.tsx`, and which components they
   mount. A find-and-replace across drills produces broken files reviewed as one
   diff.

2. **NEVER invent a number, claim or statistic.** Not a volume, benchmark,
   percentile, user count or rating. This repo has shipped invented
   `aggregateRating` blocks and a "sub-millisecond precision" claim its own
   About page debunks. **If you cannot paste the command that produced a number,
   the number does not go on the page.**

3. **NEVER target a translated phrase.** A translation is a *hypothesis* to be
   measured and discarded if empty. Proven dead: French `test de réaction` **0**,
   Spanish `entrenador de puntería` **0**, Korean `키보드 속도 테스트` **0**.

4. **Verify in the RENDERED HTML, never the source.** This repo twice shipped
   content that looked right in the editor and was absent from the HTML — the
   `isClient` gates that left 82 of 91 URLs uncrawled, and `DrillGuide` silently
   dropping undeclared props.

5. **`npx next build`. NEVER `npm run build`** — postbuild fires a live IndexNow
   ping at Bing, Yandex and Seznam.

6. **Tailwind class strings written out in full.** A class built by string
   concatenation compiles to nothing.

7. **Install nothing.** No npm packages, no cloned repos. If you think you need
   one, stop and say why.

8. **If reality does not match this brief, STOP and report.** Do not improvise.

---

## 0.1 MISTAKES ALREADY MADE — do not repeat

From the review of the **concentration-stamina** pass (2026-09-11). That pass's
*research* was excellent — every figure reproduced on re-measurement, every
deletion was justified by a real zero. **All four defects were in the editing.**

**M1 — Duplicating what already exists.** It added a `broadbent1958` entry to
`lib/drillSources.js`; the key already existed further down the same file.
Duplicate keys in a JS object are legal and silent — the later wins, so the added
block was dead code.
```bash
grep -n "<key>" lib/drillSources.js lib/drillSeo.js lib/drillsRegistry.js
```

**M2 — Reintroducing what a previous pass removed.** It added `max-w-3xl` to the
intro paragraph. A pass on 2026-09-08 un-capped that exact paragraph across **27
files**. Afterwards this was the only capped intro in the whole tree.
```bash
grep -rln '<class or pattern>' app/drills/ | wc -l
```
**If your file would be the only one with it, that is a regression.**

**M3 — A precision claim the platform cannot support.** It wrote
"millisecond-accurate browser timing" on a drill that scores accuracy.
`app/about/page.js` states browser drills resolve roughly **5 ms and upward**.
Never write a timing or precision claim unless About already supports it in
those words.

**M4 — Renaming in some places but not all.** It retargeted `focus test` →
`attention span test`, updated the About body, and left the accordion heading
reading "About Focus Test". After any retarget:
```bash
grep -rn "<old term>" app/drills/<path-to-drill>/
```

**The pattern:** every defect was a local edit made without checking the
surrounding codebase. Three greps would have caught all four.

---

## STEP 1 — MEASURE

Three tools, already in this repo, already authenticated, free. Use these, not a
third-party API.

```bash
# discover — live Google Suggest per country (NO volume; candidates only)
python scripts/keywords/autocomplete.py "<seed>" <gl> <hl> [--expand]

# validate — measured Bing exact-match impressions/month
python scripts/bing/bing.py keyword "<phrase>" <country>

# expand — real queries real users typed in that market (THE targets)
python scripts/bing/bing.py related "<phrase>" <country>
```

Markets: `us gb ca au in br pt es mx ar jp kr de at ch fr it nl pl ru tr id th vn se tw`

**Rules:**
- Bing is ~3–4% of search; Google scale is roughly 25–30×. Say "relative signal"
  in your report, never present it as absolute Google volume.
- **A null is UNKNOWN, not zero.** The API returns null on error *and* on rate
  limit. On `no data`, wait and retry before calling a term dead. Reporting a
  rate-limit null as zero demand is the worst error available here.
- **Terminology language is PER MARKET and PER TERM.** Measured 2026-09-11:

  | Concept | Native | /mo | English | /mo | Winner |
  |---|---|---|---|---|---|
  | aim (KR) | `에임 연습` | **229** | `aim trainer` | 183 | **native** |
  | CPS (KR) | `클릭 속도 테스트` | 240 | `cps test` | **769** | **English** |
  | keyboard speed (KR) | `키보드 속도 테스트` | **0** | — | — | dead |
  | mouse precision (KR) | `마우스 정확도` | **0** | — | — | dead |
  | aim (DE/ES/BR) | translations | 0–low | `aim trainer` | 917/174/370 | **English** |

  "Gaming terms stay English" holds for DE/ES/BR but **not Korean**, where the
  Konglish transliteration of "aim" outsells English. **There is no blanket
  rule. Measure every term in every market.**

### 1.1 COMPETITION — evidenced, never guessed

**There is no keyword-difficulty API here.** Bing returns volume only. Any "KD"
number is fabricated. Classify every target term:

- **A — PROVEN.** Site already ranks top-10. `python scripts/bing/bing.py queries 60`
  Measured 2026-09-10: **856 queries, 854 at position 1–10.** This domain wins
  top-10 for nearly everything it appears for at all. **Competition is rarely the
  wall here — coverage is.** Total impressions are only ~2,686.
- **B — PROVEN-ADJACENT.** Long-tail variant of an A term, same page. Safest new target.
- **C — SERP-SOFT.** Measured demand *and you looked* at the top 5 and found no
  dedicated incumbent. **Name the sites you saw.** "Looks low competition" is rejected.
- **D — HARD.** A dedicated incumbent owns top 5 — monkeytype, 10fastfingers,
  typing.com, keybr (typing EN); Hancom (KR typing); e-typing, Sushida, Hiyoko
  (JP typing); humanbenchmark (reaction, everywhere). **Take the modifier tail,
  never the head:** free, online, beginner, for kids, 1-minute, 無料, 초보, grátis.
- **E — DEAD. Never target at any volume: competitor brand terms.** These are
  often the *biggest* numbers in a market:

  | Term | Market | /mo | Owner |
  |---|---|---|---|
  | `한컴타자연습` | KR | 176,386 | Hancom |
  | `イータイピング` | JP | 23,233 | e-typing |
  | `ひよこタイピング` | JP | 12,757 | Hiyoko |
  | `human benchmark` | DE | 863 | competitor |

  **Strip brand terms BEFORE ranking a market by volume.**

### 1.2 What this page already earns — check BEFORE changing anything

```bash
python scripts/bing/bing.py pagequeries "<full URL>"
python scripts/gsc/gsc.py pages 28 20
```

**If the page already holds position 2–10 for a term, that term stays.** The most
common way to lose traffic here is retargeting away from something quietly working.

### 1.3 Priority order

1. **Top-10 with zero clicks** — highest return available. Measured: 6 terms at
   position 2–10 with **0 clicks across 532 impressions**, including
   `memory chart drill` at **position 3.0, zero clicks**. At position 3 with
   nobody clicking, more keyword work is wasted — **rewrite the title and
   description.**
2. **Coverage gaps** — measured demand where the site does not appear at all.
3. **Class B long tail.**
4. **Class C** — measured demand plus an observed soft SERP.

Never: Class E at any volume. Never: Class D head terms.

---

## STEP 2 — OPTIMISE THE ENGLISH PAGE

The site has **no blog and must not grow one.** Every term worth targeting is
*tool intent* — the searcher wants to do something, not read. Google ranks tools
for tool queries. The unit is **a working tool above the fold, a short honest
explainer below it** — the existing pattern on 82 drill pages.

### 2.1 Crawlability — the failure classes specific to this repo

- **No `if (!isClient) return <Loading/>`** around anything indexable. This
  emitted a spinner to Googlebot on 8 hub files; `/drills/fps` served 74 words
  and no `<h1>`.
- **No `{isOpen && children}`.** Render the body always, hide with the `hidden`
  attribute — `DrillAccordion` and `DrillGuide` already do this. Match them.
- **No content that only exists after `useEffect`.**

### 2.2 The page must carry

- One `<h1>` in the existing pattern:
  ```jsx
  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
    Drill Name
    <span data-seo-kw="1" className="block text-sm font-semibold text-slate-400 mt-1">
      Target Search Phrase
    </span>
  </h1>
  ```
- `metadata.title` front-loading the primary term, ≤60 chars.
- `metadata.description` written for **click-through, not keywords**.
- `alternates.canonical` — self-referencing, absolute.
- `alternates.languages: getAlternateLanguages('<english route>')` — never hand-written.
- Target phrase in the **first 100 words of visible text**.
- Descriptive internal anchor text. Anchor text is the lever; meta keywords are inert.

### 2.3 Structured data

- `BreadcrumbList` + `WebApplication` (+ `SoftwareApplication` where it fits).
- `FAQPage` **only if every answer is visible on the page.** Derive the visible
  FAQ from the schema so they cannot drift:
  ```js
  faqs: { title: '...', items: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })) }
  ```
- **Google withdrew FAQ and HowTo rich results for most sites.** Keep them for
  answer engines if genuinely useful; never add them expecting SERP stars.
- Zero fabricated fields:
  ```bash
  grep -rn "aggregateRating\|ratingCount\|reviewCount" app/ lib/ components/
  ```

### 2.4 Registry

Add or update the entry in `lib/drillsRegistry.js`. That one entry drives the hub
listing, sitemap, `llms.txt`, search and `RelatedDrills`. `subcategory` decides
which drills cross-link to this one — get it right.

---

## STEP 3 — DECIDE: does this drill earn a localized page?

**A hard gate. Most drills will not pass it, and that is the correct outcome.**

Localize into `ko`, `ja` or `pt` **only** when ALL of these hold:

1. A native term for this drill measures **≥ 150/mo** in that market, and
2. that term is **not Class D or E**, and
3. the drill genuinely serves that query, and
4. you can write the page in that language natively — not machine-translated.

**Only three markets qualify at all.** Do not add a fourth without measuring:

| Locale | Evidence | Verdict |
|---|---|---|
| **ko** | `타자연습` 95,223 · `키보드 테스트` 2,201 · `에임 연습` 229 | ELIGIBLE |
| **ja** | `タイピング練習` 149,616 · `タイピング` 100,001 · `反射神経テスト` 2,526 | ELIGIBLE |
| **pt** | `teste de digitação` 14,810 · `teste teclado` 6,494 | ELIGIBLE |
| de | best native 476 vs English `reaction time test` **634** | DO NOT EXPAND |
| es | native 11–19; `entrenador de puntería` **0** | DO NOT EXPAND |
| fr | all native reaction phrasings **0** | NEVER BUILD |

**If the gate fails, say so in the report and skip to Step 5.** A drill with an
excellent English page and no localized version is a complete, successful pass.

---

## STEP 4 — LOCALIZE (only if Step 3 passed)

Three things, in this order. Skipping any one of them ships a broken cluster.

### 4.1 The localized NAME — `lib/i18n/drillNames.js`

Per-locale display name and tagline, keyed by English href. Already exists,
currently covers 5 of 82 drills.

```js
'/drills/<path>': {
  ko: { name: '<measured Korean term>', tagline: '<native tagline>' },
},
```

**Only add a locale whose term you measured in Step 1.** A name whose native
term is 0/mo stays English — see the `키보드 속도 테스트` = 0 case above.

### 4.2 The localized URL — the structural part

**Three systems construct locale URLs. Miss one and you put 404s in your own
hreflang cluster**, and a non-reciprocal annotation is ignored wholesale, taking
the cluster with it.

`grep -rn "'/' + loc\|'/' + locale" lib/ app/ components/` returns 8 hits.
**Only 3 build a URL; the other 5 parse one and must be left alone:**

| File:line | Kind | Action |
|---|---|---|
| `lib/i18n/locales.js` `prefix` in `localizedPath` | CONSTRUCT | → `localeUrl()` |
| `lib/i18n/locales.js` `locPath` in `getAlternateLanguages` | CONSTRUCT | → `localeUrl()` |
| `app/sitemap.js` `localizedEntries` | CONSTRUCT | → `localeUrl()` |
| `lib/i18n/locales.js` `stripLocale` | STRIP | reverse lookup, see below |
| `lib/i18n/locales.js` input normalisation | STRIP | leave |
| `lib/i18n/useTranslation.js` | STRIP | leave |
| `components/AutoLanguageDetector.js` | STRIP | leave |
| `components/LanguageSwitcher.js` | STRIP | leave |

The machinery already exists — `LOCALIZED_SLUGS`, `localeUrl()` and
`SLUG_TO_ROUTE` are in `lib/i18n/locales.js`. **Add your entry to the map; do not
invent a second mechanism.**

```js
export const LOCALIZED_SLUGS = {
  '/drills/motor/keyboard-tester': { pt: '/teste-de-teclado' },
  // add yours here
};
```

Then register the route in `LOCALIZED_ROUTES`, and add a `ROUTE_LOCALES` entry
naming only locales that actually have a `page.js`. **A route in
`LOCALIZED_ROUTES` without a page becomes a 404 in the sitemap** — that file says
so itself.

**Slug format:** native script (`/ko/키보드-테스트`, `/pt/teste-de-teclado`).
Browsers percent-encode non-ASCII; that is normal and Google handles it.
Hyphenate multi-word. The slug **must be the measured term**, not a paraphrase.

**Do NOT retrofit native slugs onto existing locale routes.** Those URLs are
live; changing them is URL churn — redirects, lost signal, re-crawl delay — for
a minor ranking factor. **New routes get native slugs. Existing ones keep what
they have.**

### 4.3 The localized PAGE

`app/<locale>/<native-slug>/page.js` — the directory name **is** the slug.
Canonical is the native URL; `languages` comes from
`getAlternateLanguages('<english route>')`, never hand-written.

- `<h1>`, `data-seo-kw` span, intro, FAQ and schema `name`/`description` all in
  the target language, **natively written**.
- **No machine translation.** Translated pages with no added local value are
  explicitly low-value to Google and obvious to a native reader.
- **No claim may get stronger in translation** — see M3.
- Mount `RelatedDrills` and pass the locale. It is the only consumer that reads
  `lib/drillSeo.js` → `locales`, and **no page under `app/ko`, `app/ja` or
  `app/de` currently mounts it**, so every localized anchor entry there is inert.
  Without it the locale tree dead-ends into English and strands its authority.

---

## STEP 5 — VERIFY. Paste all of it.

A pass without this section is rejected unread.

```bash
# --- BEFORE editing: the three anti-regression greps (§0.1) ---
grep -n "<key>" lib/drillSources.js lib/drillSeo.js lib/drillsRegistry.js   # M1
grep -rln '<class or pattern>' app/drills/ | wc -l                          # M2
grep -rn "<old term>" app/drills/<path>/                                    # M4

# --- 1. Build (NEVER npm run build) ---
npx next build

# --- 2. Content is in the SERVER HTML ---
python - <<'EOF'
import re, io
p = '.next/server/app/<your/path>.html'
h = io.open(p, encoding='utf-8', errors='replace').read()
b = re.sub(r'(?is)<script.*?</script>|<style.*?</style>', '', h)
t = re.sub(r'\s+', ' ', re.sub(r'(?s)<[^>]+>', ' ', b))
print('visible words:', len(t.split()))
print('has h1:', '<h1' in h)
print('target phrase present:', '<YOUR TARGET PHRASE>' in t)
EOF

# --- 3. No fabricated claims ---
grep -rn "aggregateRating\|ratingCount\|sub-millisecond" app/ lib/ components/

# --- 4. Keyword evidence: re-run and paste ---
python scripts/bing/bing.py keyword "<primary term>" <country>
```

**If Step 4 ran, also:**

```bash
# --- 5. THE ROUND TRIP MUST CLOSE ---
cat > rt.test.mjs <<'EOF'
import { localeUrl, stripLocale, getAlternateLanguages } from './lib/i18n/locales.js';
const r='<english route>', loc='<locale>';
const url=localeUrl(loc,r), back=stripLocale(url);
console.log(url, '->', back, back===r ? 'OK' : 'BROKEN');
console.log(JSON.stringify(getAlternateLanguages(r)));
EOF
node rt.test.mjs; rm rt.test.mjs

# --- 6. Every hreflang alternate has a real prerendered page ---
ls .next/server/app/<locale>/<slug>.html

# --- 7. Exactly 3 construction sites; the 5 strip sites untouched ---
grep -rn "'/' + loc\|'/' + locale" lib/ app/ components/
```

**Fail conditions:** visible words under ~600 · round trip not closing · any
hreflang alternate without a prerendered page · word count falling after your
change · a fourth URL-construction site.

---

## STEP 6 — REPORT, then STOP

```
## DRILL: <name> — <url>

### Keywords targeted
| Term | Market | Bing exact/mo | Command that proves it | Class A-E | Evidence for class |
(Class C rows must NAME the top-5 sites you saw. No command = row rejected.)

### Brand terms excluded (Class E)
(If empty for a non-English market, you did not look.)

### What the page already earned (before)
(pagequeries / gsc output, or "no measured queries")

### Step 3 decision
LOCALIZED into <locales> — or — ENGLISH ONLY, gate failed because <reason>

### Changes made
- file:line — what and why

### Verification
(raw output of every Step 5 command)

### What I could NOT verify
(empty here is itself suspicious)

### Risks / regressions
(cannibalisation with which sibling, any live URL that changed shape)
```

---

## STOP CONDITIONS

Stop immediately and report, without editing further, if:

- all candidate terms measure zero, or you cannot measure them;
- the page already ranks 2–10 for a term your change would abandon;
- a live, indexed URL would change shape (that needs a redirect decision, which
  is not yours);
- any hreflang alternate would point at a page that does not exist;
- rendered-HTML word count falls after your change;
- you find a fourth place building locale URLs by hand;
- the target market is not `ko`, `ja` or `pt`;
- you find a factual claim you cannot substantiate — **report it, do not quietly
  delete it**, it may be load-bearing elsewhere.

---

## SUGGESTED ORDER — feed the drills in this sequence

Highest measured demand first. One per pass.

| # | Drill | Why |
|---|---|---|
| 1 | `/drills/motor/keyboard-tester` | `keyboard tester` 13,729 US. EN + pt done — needs **ko** (`키보드 테스트` 2,201) and **ja** |
| 2 | `/drills/motor/movement-speed/rapid-tapping` | `cps test` 26,858 US, 769 KR (English term wins in KR) |
| 3 | `/drills/reaction-speed/reaction-time-test` | 8,503 US; strong ko/ja, already partly localized |
| 4 | `/drills/motor/movement-speed/keyboard-recognition` | `타자 속도 테스트` KR 160 — measure before localizing |
| 5 | `/drills/fps/*` | `에임 연습` KR 229 beats English there; DE/ES/BR keep English |

**Do not work the cognitive tree yet.** `attention span test` is 33/mo — the
category has very little demand, and motor/typing terms are 100–1,000× larger.
