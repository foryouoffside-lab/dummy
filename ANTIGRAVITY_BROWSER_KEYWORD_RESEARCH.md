# Execution Brief — Browser-Driven Global Keyword Research, AEO & Content Production

**Target agent:** Antigravity, **with Chrome / browser access**
**Type:** Research → content. The research decides what gets written; the content is what ranks.
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
- `npm run build` during development
- Pushing or deploying

---

## 12. Judgment Clause

**The goal is not the biggest term. It is the term this site can actually win.**

Prior measurement suggests the honest outcome for most drills is: *no market has meaningful demand for this; here is the evidence; do not build.* That is a complete and successful result — it saves the operator from pages that would never rank.

A report recommending an assault on a 90,000/month head term owned by a funded competitor is a failure of this brief, however thorough it looks. So is one where every candidate conveniently scores well.

If exactly one long-tail term in one country clears the bar: recommend it, write the best page on the internet for it, explain the specific SERP weakness that makes it winnable, and stop.
