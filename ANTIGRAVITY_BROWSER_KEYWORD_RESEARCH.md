# Execution Brief — Browser-Driven Global Keyword Research, AEO & Content Production

**Target agent:** Antigravity, **with Chrome / browser access**
**Type:** Research → content → layout. The research decides what to write; §8b decides how the page looks.
**Scope:** One drill at a time. The operator names the drill. Do not batch the site.

---

## 1. Why This Brief Exists

Every previous research pass used the Bing Webmaster API, which returns **search volume and nothing else** — no competition metric, no difficulty, no SERP composition, no long-tail discovery. So every prior brief had to concede: *"competition assessment is your editorial judgment."*

**Browser access closes that gap.** You can now see the actual result page: who ranks, how strong they are, whether an AI Overview already answers the query, what autocomplete suggests, what questions people actually ask.

**Your mandate:** find terms with **real volume and weak competition**, in any country, that this site can honestly win — then write the content that wins them. Explicitly **do not** chase high-volume head terms that entrenched competitors own.

---

## 2. Your Role

Senior international SEO researcher and content strategist, twenty years in.

**You hunt weakness, not size.** A 400/month term whose page 1 is forum posts is worth more to this site than a 90,000/month term owned by Wikipedia and a funded competitor. Your instinct is to find the query the incumbents forgot.

**You measure, then you look.** Volume from the API. Competition from your eyes on the SERP. Neither substitutes for the other.

**You report zeros honestly.** Prior runs measured ~300 queries across 11 markets; most returned zero. That is the normal outcome.

---

## 3. Ground Truth — Read Before Interpreting Anything

| Fact | Consequence |
|---|---|
| ~80 clicks/month total | Low authority. Never recommend a term whose page 1 holds established domains. |
| 82 of 91 URLs historically never crawled | New pages are not auto-discovered. Internal links matter as much as keywords. |
| Bing ranks the site page 1 at ~0% CTR | Impressions already exist and are not converting. Title work may beat new pages. |
| Google has indexed hubs, not most drill pages | Depth pages need links before keywords. |
| ~300 prior queries, mostly zero | Largest non-English term found: `반응속도 테스트`, 6,693/mo. Everything else under 400. |

**Calibrate on this:** if your research returns a long list of high-volume low-competition terms, your method is wrong. Verify before reporting.

---

## 4. Absolute Constraints

1. **Never fabricate a number.** No invented volumes, KD scores, traffic estimates, statistics, user counts, ratings, testimonials, or citations. Unavailable data is `unmeasured`, never `0`. **A rate-limit null recorded as zero has already caused a wrong decision on this project.**
2. **Bing rate limits are per user account, not per key** (`ThrottleUser`). A new key on the same account shares the quota. If throttled: wait for the rolling window, or use a key from a different account. Never work around it by estimating.
3. **The site has no aggregate user data.** Scores are stored in `localStorage` only and never collected; the homepage testimonials array is **deliberately empty**. You may **not** write "10,000 players tested", "average user scores X", star ratings, or any social proof. This is a standing rule on this project, not a preference.
4. **No hidden text, cloaking, or keyword stuffing.**
5. **One language per URL.** Never mix languages in a page body.
6. **Honesty gate on retargeting.** Point a page at how people phrase a search; never at a term the drill does not deliver.
7. **No medical or clinical claims** for memory/cognitive drills — no diagnosis, prevention, treatment, or dementia language.
8. **`keywords` meta is inert.** Do not tune it or report it as work.
9. **`npx next build` only — never `npm run build`** (the `postbuild` hook fires live IndexNow pings).
10. **Do not push or deploy.** Commit locally only.
11. **One drill per run.** Finish and report before starting another.

---

## 5. Phase 1 — Volume (API)

```
scripts/bing/bing.py            key: BING_API_KEY env, or scripts/bing/.bing-key
  python scripts/bing/bing.py quota                           # ALWAYS first
  python scripts/bing/bing.py keyword "<phrase>" <market>
  python scripts/bing/bing.py related "<phrase>" <market>
```

**Order, to survive the throttle:** run `quota` first and stop if low; build the full candidate list **before** querying so you spend quota once; batch with delays; retry with backoff on null and `URLError`; record `unmeasured` on failure.

**Markets:** existing trees `us gb kr jp de br es`; no tree (higher bar) `fr it pl tr ru id vi th nl`.

**Diacritics trap:** unaccented phrases silently return 0. `puntería`≠`punteria`, `memória`≠`memoria`, `reação`≠`reacao`. Test and report both.

---

## 6. Phase 2 — Competition (Browser) — The Core

For every candidate with volume **≥ 200**, open the real SERP in the correct locale: `google.<tld>/search?q=<term>&gl=<country>&hl=<lang>`. Repeat on Bing — it is this site's larger channel *and* the retrieval layer behind ChatGPT search and Copilot.

### 6.1 Record per term

| Signal | Capture |
|---|---|
| **Top 10 domains** | List them by name |
| **Authority read** | Wikipedia / major media / funded competitor / university → HIGH. Forums, Reddit, blogspam, YouTube, small tools → LOW |
| **Result type** | Interactive tool, or article *about* the topic? An article-dominated SERP for a tool query is an opening |
| **Native-language tools** | A purpose-built tool **in that language**, or only English ones ranking by default? |
| **App-store dominance** | Page 1 of app listings → browser drill fits poorly. Flag and usually skip |
| **AI Overview** | Present? **Which sources does it cite?** That is your AEO target list |
| **SERP features** | Featured snippet, PAA, video carousel — and who owns the snippet |
| **Intent** | Use a tool / read an explanation / get a diagnosis. Mismatch = skip |

### 6.2 The strongest single signal

**An English-language tool ranking on page 1 of a non-English SERP.** Demand exists; nobody has served it natively. Flag it loudly.

### 6.3 Long-tail discovery — browser only

Where the winnable terms actually live. The API cannot do any of this.

1. **Autocomplete** — Google and Bing, target locale. Record all suggestions, then repeat with `a`–`z` appended and with question prefixes (`how`, `what`, `best`, `free`, `online`, `why`).
2. **People Also Ask** — expand every box, then the ones that appear after. **Harvest every question verbatim.** These feed both keyword targets and the content in Phase 8.
3. **Related searches** at the SERP bottom.
4. **Google Trends** — relative demand, rising terms, regional breakdown. **Never a volume source** — it has no absolute numbers.
5. **Competitor gap** — open the top 3 pages. What subtopics do they cover? What do they **miss** that this drill genuinely does?

Feed anything promising back through Phase 1 for a real volume number.

### 6.4 Scoring

```
OPPORTUNITY = volume (exact/mo)
            × competition   LOW 1.0 · MEDIUM 0.4 · HIGH 0.05
            × intent        exact 1.0 · adjacent 0.5 · mismatch 0
            × locale cost   existing tree 1.0 · new locale 0.5
```

The HIGH multiplier is deliberately brutal. **That is the point.** 90,000/mo at HIGH scores 4,500; 400/mo at LOW scores 400 — but the first is unwinnable at this authority and the second is winnable this quarter. **When they conflict, recommend the winnable one and say why.**

**State plainly in the report:** competition rating is editorial judgment from SERP inspection, not a measured metric.

### 6.5 Promotion rule — all must hold

1. Exact volume **≥ 200/mo** (existing locale) or **≥ 1,000/mo** (new locale)
2. Competition **LOW**, or MEDIUM with a stated specific reason this site can compete
3. **No entrenched incumbent owns it** — if `humanbenchmark.com` owns memory terms, Aimlabs/KovaaK's own aim terms, or Wikipedia owns the definition, **skip regardless of volume**
4. Intent is *use a tool*
5. The drill honestly delivers it
6. Unique across `lib/drillSeo.js` **in every language**

---

## 7. Phase 3 — AI / Answer-Engine Optimization

A separate channel with its own rules. Treat it as a first-class deliverable, not an afterthought.

### 7.1 How AI systems actually select sources

Two paths, and only one is influenceable:

- **Training corpus** — slow, indirect, not actionable on a quarterly horizon.
- **Live retrieval (RAG)** — ChatGPT search, Perplexity, Copilot and AI Overviews fetch at query time. **ChatGPT search and Copilot retrieve largely through Bing.**

**This site already ranks page 1 on Bing.** So it is likely already *reachable* by those systems and simply not *quotable*. Diagnose which — that distinction drives everything in this phase.

### 7.2 Infrastructure already built — do not rebuild

- `app/robots.js` allows `OAI-SearchBot`, `ChatGPT-User`, `GPTBot`, `PerplexityBot`, `Perplexity-User`, `ClaudeBot`, `Claude-User`, `Claude-SearchBot`, `Google-Extended`, `Applebot-Extended` and more, with the search-index vs training-corpus distinction already reasoned out.
- `app/llms.txt/route.js` serves an llmstxt.org-format index generated from `DRILLS` and `DRILL_SEO`, so it cannot drift.

**What is missing is content extractability and entity strength.**

### 7.3 Baseline test — what do assistants say today

For the drill's target terms, ask ChatGPT (search mode), Perplexity, Bing Copilot, and check Google's AI Overview, with natural questions: *"what's a good free reaction time test?"*, *"how do I test working memory online?"*, and the native-language equivalents for target markets.

Record: which sites get cited; whether this site appears at all; **what the cited pages have that this one lacks**. Screenshot or quote the answers.

### 7.4 What makes a page quotable

1. **Answer in the first two sentences.** "Average human visual reaction time is 200–250 ms." Not build-up.
2. **Explicit numbers with units.** "under 180 ms", never "very fast".
3. **Question-shaped H2/H3** matching real PAA phrasing from §6.3.
4. **Tables.** The most reliably extracted format on the web.
5. **Self-contained sections.** A chunk lifted alone must still make sense — no "as mentioned above", no orphan pronouns.
6. **Plain entity statements.** What the tool is, who it is for, that it is free, needs no signup, runs in-browser.
7. **Definitional ownership.** Define the term cleanly and early. Assistants preferentially quote the clearest definition.
8. **Short paragraphs.** Long blocks chunk badly for retrieval.

### 7.5 E-E-A-T and entity strength — the part most sites miss

AI systems and Google both weight *who is saying this*. This site is currently an anonymous domain, which caps how often it gets cited.

Audit and recommend (implement only what is honest):

- **`Organization` schema** with a real `name`, `url`, `logo`, and `sameAs` pointing to genuine profiles the site actually controls. **Do not invent social profiles.**
- **`WebSite` schema with `SearchAction`** so the site's own search is machine-discoverable.
- **A real About page** stating who builds this and why, and a contact route. Anonymous tool sites get cited less.
- **Author or methodology attribution** on drill pages — *how* a measurement is taken (`performance.now()`, refresh-rate caveats, what is and is not controlled). Method transparency is a genuine trust signal and it is free.
- **`dateModified`** in schema, kept accurate.
- **Honest limitations.** Stating "browser timers are coarsened to ~1 ms, so treat sub-5 ms differences as noise" builds more trust than claiming precision. This site has previously shipped the opposite claim; do not reintroduce it.

### 7.6 Where AI citations actually come from

Worth reporting on even though most is outside the codebase:

- **Reddit, forums, and community threads are heavily cited** by current AI systems. A genuine mention in a relevant subreddit or gaming forum can influence AI answers faster than on-page work.
- **"Best free X" listicles and comparison pages** are disproportionately retrieved. Being *included* in someone else's roundup matters.
- **Unlinked brand mentions** contribute to entity recognition.
- **Wikipedia/Wikidata grounding** anchors entities — relevant only if the site ever becomes notable enough, which it is not yet. Note it, do not chase it.

**Report these as findings and recommendations for the operator. Do not attempt outreach, posting, or account creation yourself.**

### 7.7 Content types AI cites disproportionately

If research supports one, propose it — but only where it can be written honestly:

- **Comparison pages** — "X vs Y", "free alternatives to Z"
- **Definition/explainer pages** for the term the drill measures
- **Methodology pages** — how the measurement works and its limits
- **Benchmark reference tables** — *provided they are labelled as an editorial guide, not measured norms*, since this site collects no aggregate data (§4.3)

---

## 7b. GEO — What the Research Actually Measured

AEO (§7) is about being *retrievable*. GEO is about being *quoted once retrieved*. Unlike most SEO advice, this part has a controlled study behind it, and you should follow the evidence rather than blog consensus.

**Source:** Aggarwal et al., *GEO: Generative Engine Optimization*, KDD 2024 (Princeton / IIT Delhi). 9 content tactics tested across a 10,000-query benchmark spanning 8 domains, run against a Bing-Chat-like system and validated on Perplexity. Metrics introduced: **Position Adjusted Word Count** (how much of your text survives into the answer, weighted by position) and **Subjective Impression**.

### 7b.1 What worked, and what did not

| Tactic | Measured effect |
|---|---|
| **Statistics Addition** — concrete figures with units | **≈ +41%** |
| **Cite Sources** — reference credible external work | strong (30–41% band) |
| **Quotation Addition** — quote a named authority | **≈ +28%** |
| **Fluency Optimization** — clean, readable prose | in the 30–41% band |
| **Authoritative Voice** — confident, declarative phrasing | in the 30–41% band |
| Easy-to-Understand simplification | no benefit |
| Content Padding | no benefit |
| **Keyword Stuffing** | **weakest — can actively reduce visibility** |

Five of nine tactics moved the needle 30–41%. **Keyword stuffing was not merely useless; it measured worse than doing nothing.** That is a measured result, not an opinion, and it settles the question for this project permanently.

### 7b.2 The trap this creates on THIS site — read carefully

"Statistics Addition, +41%" is the single most dangerous line in this brief, because the obvious way to exploit it is to invent numbers. **You must not.** This site collects no aggregate data — scores never leave `localStorage`, the testimonials array is empty by design (§4.3). "Our 12,000 users average 214 ms" would be fabrication, and fabrication in a health/performance-adjacent claim is the worst failure available here.

**The honest and equally effective route is external evidence.** Reaction time, working memory, saccadic movement and the Stroop effect are genuinely researched fields with real published figures. So:

- ✅ Cite real, verifiable, published findings, named and linked
- ✅ Quote a named researcher or a real study
- ✅ State real hardware facts with units — display refresh intervals, `performance.now()` resolution and its Spectre-era coarsening
- ✅ Describe your own methodology precisely — what is measured, what is not controlled
- ❌ Invent a study, a citation, a sample size, or a percentile table
- ❌ Present editorial score bands as measured norms
- ❌ Attribute any statistic to this site's own users

**Verify every citation you add actually exists and says what you claim.** A fabricated citation is worse than no citation: it is the exact failure mode AI systems are increasingly cross-checking for, and it destroys the trust signal you are trying to build.

### 7b.3 Per-engine behaviour

The engines do not agree with each other, so optimise for the mechanism rather than a single platform:

| Engine | What it favours | Implication |
|---|---|---|
| **Google AI Overviews** | Pages already ranking in the organic top 10 | Classic SEO is the gate. No ranking, no citation. |
| **ChatGPT (search)** | Authoritative long-form | Depth and named expertise. Retrieves largely **through Bing** — where this site already ranks page 1. |
| **Perplexity** | Fresh, well-cited articles | Citations and recency matter most here. |

Citations concentrate on a small set of outlets and cross-engine agreement is low, so **measure each engine separately** rather than assuming one result generalises.

### 7b.4 Multilingual GEO — the part most relevant to this project

Directly contradicts the intuition that a strong English site lifts its translations:

- **English authority does not transfer** into Japanese, Korean or other market languages. Each language page earns its own authority.
- **Translation-only sites reportedly under-perform their potential by 40–60%** in non-English markets; content translated for keywords without cultural adaptation shows materially lower engagement. This is the measured case for the "native copy, never machine translation" rule in §8.
- **hreflang must be reciprocal.** Where page A points to B and B does not point back, engines may treat the annotation as misconfigured and **ignore hreflang on both pages**. This exact defect existed on this site and was fixed; do not reintroduce it.
- **Critical nuance:** hreflang influences which URL is *served to a user*. It does **not** control which URL an AI engine *retrieves for synthesis*. Whichever page gives the clearest answer to the semantic query gets pulled in, regardless of language annotations. **So a Korean page must independently be the best answer to the Korean question — it inherits nothing from the English one.**
- Mainstream tools do **not** run native-language prompt sets in Japanese or Korean. If you want to know what an assistant says in Korean, **you must ask it in Korean yourself** (§7.3).

Entity consistency matters across languages: if the site describes the same drill differently in English, Korean and Japanese, engines can produce conflicting or incomplete answers. Keep the definition of each drill semantically identical across locales even as the wording is localised.

### 7b.5 Tools — what to use, and what this project already owns

**Already available, use these first:**

| Tool | Use |
|---|---|
| `scripts/bing/bing.py` | Volume, related terms, and this site's own Bing impressions/clicks/queries |
| Google Search Console | What already ranks, and which URLs are uncrawled |
| **Chrome** | SERP inspection, autocomplete, People Also Ask, AI Overview capture, competitor pages |
| **The assistants themselves** | Free and authoritative: ask ChatGPT, Perplexity, Copilot and Gemini your target questions, in the target language, and record who they cite |
| Google Trends | Relative demand and rising terms only — never a volume source |
| Rich Results Test / Schema validator | Confirm structured data parses |

**Commercial AI-visibility trackers** (Otterly, Peec AI, Profound, Scrunch, SE Ranking's AI toolkit, Semrush) monitor citations and share-of-voice across engines. Tiers run roughly $29 / $139 / $499 per month.

**Recommendation for this site: do not buy one yet.** At ~80 clicks/month the manual §7.3 check across four assistants costs nothing and answers the same question. Report what a tracker *would* add and let the operator decide. **Never sign up for a paid service, create an account, or spend money on the operator's behalf.**

### 7b.6 How to measure GEO here

Rankings are the wrong metric. Track instead:

- **Citation rate** — of N target questions asked across engines, how many answers cite this site
- **Share of voice** — this site's mentions vs named competitors for the same questions
- **Which competitor gets cited instead**, and what their page has that this one lacks

Run the same fixed question set before and after your changes, in English **and** in the target language, and report both. A before/after on ten questions is real evidence; a claim that the page is "now AI-optimised" is not.

---

## 8. Phase 4 — Content Production

Research is worthless until it becomes a page. Write for the promoted term(s) only.

### 8.1 Write a content brief first, then the content

For each page, produce and include in the report:

| Field | Content |
|---|---|
| Primary term | one, exactly |
| Secondary terms | 3–5 from §6.3, to appear naturally |
| PAA questions | verbatim, to become H2s or FAQs |
| Search intent | what the visitor wants in one sentence |
| Competitor gaps | what page 1 fails to cover (§6.3.5) |
| Target length | justified by what ranks, not a round number |
| Answer sentence | the exact sentence you want an AI to quote |

### 8.2 Page structure

```
<title>            primary term first, ≤60 chars, written for the click
H1                 primary term, readable — not a keyword stuffed into a headline
Opening 2 sentences  the direct answer. Extractable standalone.
[the drill itself]   the interactive tool — this is what the searcher came for
H2 What is <term>?   clean definition, own the entity
H2 How to <do it>    concrete steps
H2 <benchmark table> labelled as an editorial guide, never as measured norms
H2 <PAA question>    verbatim from §6.3
H2 <PAA question>
FAQ                  remaining PAA questions, mapped from the schema object
Related drills       internal links with keyword-first anchor text
```

### 8.3 Quality bar

- **Write for a person; structure for a machine.** Both, not either.
- **Every factual claim defensible.** No invented statistics, no "studies show" without a real verifiable citation, no fabricated percentiles, no social proof (§4.3).
- **Cover what competitors miss.** That gap is the reason this page deserves to rank; if there is no gap, say so and reconsider building.
- **Density is not a factor.** Use the term naturally in the five slots that matter — slug, title, H1, first paragraph, inbound anchor text — and then stop.
- **Native, not translated**, for any localized page. If you cannot write native-quality copy in the target language and register, **stop and flag for human review** rather than shipping translationese.
- **Match the audience.** Gamer register for `fps`; clear consumer/educational register for `memory` and `cognitive`, whose searchers skew older and health-motivated.

### 8.4 Wiring it in

- **Retarget** `lib/drillSeo.js` `term`/`anchor`, unique across all locales.
- **Align the five slots.** If re-slugging, `drill.href` keys `lib/drillsRegistry.js`, `lib/drillCatalog.js`, `lib/drillPreviews.js`, `lib/drillSeo.js`, and the hub ItemList schema — update all five, add a 301 in `next.config.js`, and **verify the destination returns 200 and does not resolve to itself.**
- **Rewrite title and description for click-through.** With page-1 Bing impressions at ~0% CTR this may outperform everything else in this brief. Title ≤60, description ≤155.
- **FAQ from harvested PAA**, with schema and visible content mapped from one object so they cannot drift.
- **Localize** only where §6.5 passed. Register in `LOCALIZED_ROUTES` **and** `ROUTE_LOCALES`; add `alternates.languages` to **both** English and localized pages — hreflang must be reciprocal or Google discards it entirely.

---

## 8b. Page Design — How the Page Should Actually Look

Content that ranks still has to be readable. This is the house style for a drill page, derived from a reference implementation already built on `reaction-speed/reaction-time-test`. **Open that page and copy its structure rather than inventing a new one.**

### 8b.1 Layout order

```
Breadcrumb                      thin, muted, one line
H1                              LEFT-aligned, sentence case, directly above the drill box
One-sentence answer             text-[13px], muted — the extractable fact (§7.4)
Stat row                        4 tiles, FULL WIDTH, edges flush with the drill box below
[ DRILL BOX ]                   the thing the visitor came for
Instructions  (collapsible)
About         (collapsible)
Guide intro   (always visible)  the definition — never behind a click
Benchmarks    (collapsible)
Technique     (collapsible)
How to train  (collapsible)
FAQ           (collapsible)
Related drills                  keyword-first anchor text
```

**Rules that produced this:**
- The H1 is **left-aligned, not centred**. A centred stack reads as a splash screen; left-aligned reads as a document and puts the drill name at the natural first-fixation point.
- **Sentence case, not ALL CAPS.** `font-black uppercase` is fine on "REACTION TIME TEST" and unreadable on "micro-correction aim trainer".
- The stat row spans the **full container width** so its edges align with the drill box. A narrower centred row floats free of the thing it describes.
- **Depth goes below the drill.** Never put a paragraph between the visitor and the tool.
- The guide's **intro stays visible**; everything else collapses. The definition is what a reader needs first and what an assistant quotes.

### 8b.2 Visual weight — the most common mistake here

Panels must read as **hairlines on the page background**, not cards on a sheet. The old style used `border border-gray-800 bg-black` on a `#050508` page — the panel was *darker* than the background, which is exactly what made it look pasted on.

Use, consistently, on every panel:

```
container      border border-white/[0.07] bg-white/[0.012] rounded-xl
hover          hover:border-white/[0.11]
divider        border-white/[0.06]
header         px-5 py-4, text-[15px] font-bold
body           px-5 pb-5 pt-4, text-[13px] leading-relaxed text-slate-300
label/eyebrow  text-[9.5px] uppercase tracking-[0.12em] text-slate-500
```

The type scale runs roughly `9.5 → 11 → 12 → 13 → 15 → 2xl/3xl`. Do not introduce sizes outside that ladder.

**No emoji in headings.** The guide previously used `📊 ⚡ 🎯 👥 ❓` while the rest of the site uses Lucide icons. Pick one system — Lucide — and drop the emoji.

### 8b.3 Colour

The site is deliberately dark with gradient and glow accents. **That direction stays** — a minimalist restyle has already been proposed and rejected. Fix hierarchy, spacing and wording, not the art direction.

Within that: one accent carries the action (this page's cyan start button). Everything else stays grey until it earns colour. A stat row in blue, purple, gold and white is four colours meaning nothing.

### 8b.4 Invariants a redesign must not break

Each was expensive to fix and a naive cleanup silently undoes it.

1. **Never `{isOpen && children}`.** `components/drill/DrillAccordion.js` renders children unconditionally and hides them with the `hidden` attribute. Conditional rendering is what kept 82 of 91 URLs uncrawled and left the FAQPage JSON-LD describing answers that appeared nowhere. Any new collapsible, tab or "read more" must render into the DOM and hide with CSS or `hidden`.
2. **FAQ schema and visible FAQ stay in parity**, hub pages included. The site is at zero drift sitewide; keep it there. Where a page maps its visible FAQ from the schema object, keep that mapping instead of hand-copying questions.
3. **No fabricated social proof.** Scores never leave `localStorage`; the testimonials array is empty by design. No "trusted by N players", star ratings, or activity indicators to fill space.
4. **No hidden text for SEO.** The accordion's `hidden` on a user-toggleable region is the only sanctioned concealment, and it already exists.
5. **Do not touch** game loops, canvas rendering, scoring, timing, storage-key string literals, or `lib/drillPreviews.js` lookup keys.
6. **One `<h1>` per page**, headings sequential, no skipped levels.

### 8b.5 Do not cut content to tidy the layout

If layout and content appear to conflict, the layout is wrong. Do not solve it by deleting or hiding words. Reorder instead: confirm arrival, let them play, then go deep. A redesign that looks cleaner but drops the page's word count or breaks accordion indexing is a net loss.

The one legitimate deletion is genuine duplication — this page carried two separate FAQ blocks, a hand-written five-question one and the fifteen-question schema-derived one. Removing the duplicate is correct; trimming unique content is not.

### 8b.6 Previewing your work — read before trying to run the site

`next.config.js` sets `output: 'standalone'`. **`npx next start` does not work with it** — it serves the HTML but returns 400 for every CSS and JS file, so the page renders as unstyled HTML with the screen-reader-only blocks visible. This has already been misdiagnosed twice and cost real time.

Run it this way:

```bash
npx next build          # never `npm run build` — postbuild pings live IndexNow
cp -r .next/static  .next/standalone/.next/static
cp -r public        .next/standalone/public
HOSTNAME=0.0.0.0 PORT=3210 node .next/standalone/server.js
```

Two screenshot traps:
- **Chrome on Windows clamps a headless window to ~500px wide.** Requesting 390px lays out at ~500 and crops the image, which looks exactly like horizontal overflow but is not. Confirm any suspected mobile bug on a real device or in DevTools device mode before reporting it.
- The drill client root is `min-h-screen`, so a very tall capture window inflates it and pushes everything below the drill off-frame. Capture at a realistic viewport height.

---

## 9. Verification

- [ ] `npx next build` exits 0 — **capture the exit code directly, not through a pipe** (a pipe returns `tail`'s status and has already masked a failure here)
- [ ] `npx tsc --noEmit` — no new errors above baseline
- [ ] All FAQ schema questions present in **rendered** HTML (`.next/server/`), **hub pages included**
- [ ] hreflang reciprocal both directions; zero alternates pointing at a 404
- [ ] Any re-slug: old 301s to new, new returns 200, no self-redirect, zero internal links to the old slug
- [ ] Drill preview still renders (a stale `drillPreviews.js` key **fails silently**)
- [ ] Target term present in **server-rendered** HTML
- [ ] The §8.1 answer sentence is present, standalone, and in the first two sentences
- [ ] Every claim defensible; zero fabricated stats or social proof
- [ ] Nothing pushed, nothing deployed

---

## 10. Deliverables

1. `scripts/keywords/out/<drill>-global-<YYYY-MM-DD>.md` + `.csv` — every term tested with market, exact volume, date, tool, competition rating **plus the SERP evidence behind it**, opportunity score, BUILD/SKIP.
2. The content brief (§8.1) for each page written.
3. Code and content changes per Phase 4.
4. `<DRILL>_RESEARCH_SUMMARY.md`:
   - **The recommended target and the specific SERP weakness that makes it winnable**
   - **Terms rejected as too competitive, naming who owns them** — as important as the recommendations
   - **Any English tool ranking in a non-English SERP** (§6.2)
   - **AI visibility baseline** (§7.3) — who is cited today, and why not this site
   - **E-E-A-T gaps found** (§7.5) and what was implemented vs left for the operator
   - Pasted verification output, including failures
   - Honest next step

---

## 11. Automatic Rejection

- Any invented volume, competition score, statistic, rating, user count, or citation
- Any social proof — this site has no aggregate data (§4.3)
- A rate-limit null recorded as `0`
- Recommending a term owned by an entrenched incumbent
- Presenting an editorial competition rating as a measured metric
- Hidden text, cloaking, or keyword stuffing
- Machine-translated body copy shipped as native
- Fabricated social profiles in `sameAs`
- Non-reciprocal hreflang, or an alternate pointing at a 404
- A route in `LOCALIZED_ROUTES` without a real `page.js`
- Outreach, posting, or account creation on the operator's behalf
- Batching multiple drills in one run
- **Any fabricated statistic, citation, quotation or study** — including one invented to chase the +41% Statistics lift (§7b.2)
- **A citation that does not exist or does not say what you claim**
- **Signing up for, or spending money on, any paid tool** (§7b.5)
- **Claiming a page is "AI-optimised" without a before/after citation-rate measurement** (§7b.6)
- **`{isOpen && children}`, or any conditional render of indexable content** (§8b.4)
- **Deleting unique content to tidy a layout** (§8b.5)
- **Reporting a mobile overflow bug measured only in a clamped headless window** (§8b.6)
- `npm run build` during development
- Pushing or deploying

---

## 12. Judgment Clause

**The goal is not the biggest term. It is the term this site can actually win.**

Prior measurement suggests the honest outcome for most drills is: *no market has meaningful demand for this; here is the evidence; do not build.* That is a complete and successful result — it saves the operator from pages that would never rank.

A report recommending an assault on a 90,000/month head term owned by a funded competitor is a failure of this brief, however thorough it looks. So is one where every candidate conveniently scores well.

If exactly one long-tail term in one country clears the bar: recommend it, write the best page on the internet for it, explain the specific SERP weakness that makes it winnable, and stop.
