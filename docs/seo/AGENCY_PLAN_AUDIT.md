# Audit — "Autonomous SEO/AEO/GEO Agency" master plan

**Date:** 2026-09-10
**Reviewer role:** red team
**Verdict:** **MODIFIED — the analysis is largely right and the build plan is wrong.**

---

## PART 1 — EXECUTIVE VERDICT

**MODIFIED.**

The plan's *principles* are unusually good. Its section on what not to do — doorway
pages, mass MT, Trends-is-not-volume, GEO-readiness-is-not-visibility, backlinks-are-
not-authority, rankings-are-not-business-value — is a better statement of SEO reality
than most paid consultants produce. Approve all of that without changes.

The plan's *build* is rejected. It proposes a 13-phase, 40-table, 3-AI, ~20-repository
platform for a site that earns roughly 80 clicks a month, and whose failure mode is
already diagnosed in this repo's own handoff doc as **domain authority**. None of the
13 phases builds authority. Phase 1 alone — monorepo, Supabase, worker framework, job
system, policy engine, CI — produces zero SEO output.

The core error is a **category mistake about where the bottleneck is**. The plan is an
opportunity-*discovery* system. This site does not have an opportunity-discovery
problem. It has one known, unexecuted opportunity (an original dataset that earns
citations) and one known, unfixable-by-tooling constraint (nobody links to the domain).
Building a discovery engine against an already-known answer is displacement activity.

Second-order concern, stated plainly: this is the third proposal in the project's
history to solve a distribution problem by building a system — after the
category-site split and the country-site split. Both were dropped once measured. The
pattern is worth naming because it costs months.

---

## PART 2 — ARCHITECTURE RED TEAM

### Correct assumptions — APPROVED

- Trends is a relative index, not volume. Correct, and rarely understood.
- GEO readiness ≠ AI visibility; every metric labelled MEASURED / ESTIMATED / INFERRED.
- Localized URLs + hreflang over IP-switching. Correct and matches Google guidance.
- "What should exist?" over "what keyword can we write about?"
- Repos are workers, not the agency.
- Autonomy must be earned; start at Level 0–2.
- URL-explosion hard limits.
- Original research over generic AI content.
- Content decay monitoring before new publishing.

### Incorrect assumptions — REJECTED

1. **That discovery is the constraint.** It is not. Execution and authority are.
   82 of 91 URLs were never crawled; the fix was two code bugs, found by fetching the
   page, not by an opportunity engine.
2. **That the site has a business-value function.** "Business value", "expected
   conversion" and "revenue/value where measurable" appear as scoring dimensions.
   There is no revenue model in this project. Every scoring formula that multiplies by
   business value currently multiplies by an undefined number, which means the
   Opportunity Engine cannot rank anything and will silently rank by volume — the exact
   failure the plan forbids.
3. **That international = more markets.** Measured demand says only Korean and
   Japanese justify translation. German, Spanish and Portuguese trees already ship
   without validated demand. The plan's own worked example (`/de/reaktionstest/`)
   targets an unvalidated market.
4. **That Google is the channel.** Bing is the larger channel here — 84 URLs earning
   impressions at positions 2–10, against Google's 11. The plan names Google Search
   Console ~15 times and Bing Webmaster Tools **zero** times. This is the single
   largest omission in the document.
5. **That approval gates will hold.** The operator is the sole approver and has
   recorded a standing preference for speed over ceremony. A 13-phase governance
   architecture with 15 approval classes will be bypassed within a fortnight. Gates
   that will not be honoured are worse than no gates, because they are cited as
   safety.

### Dangerous components — REJECT or HARD-GATE

1. **Autonomy Levels 4–5 over robots / canonical / hreflang / sitemap / redirects.**
   A bad robots.txt for two hours costs weeks of re-crawl on a domain Google already
   crawls reluctantly. `git revert` does not revert Google's index. These five surfaces
   must stay permanently manual regardless of how much trust the system earns.
2. **An autonomous content engine, given this repo's history.** Fabricated
   `aggregateRating` and "sub-millisecond" claims have recurred repeatedly *with a
   human in the loop*. Verified live today:
   - `app/drills/motor/page.js:123` — FAQPage schema asserting "sub-millisecond event
     timestamping" and "esports-grade measurement fidelity"
   - `app/about/page.js:168` — "Any site claiming sub-millisecond precision from a web
     browser is [misleading]"
   The site contradicts itself inside structured data, today. Automating generation
   before this class of error is mechanically prevented multiplies it.
3. **Scraping ChatGPT / Gemini / Perplexity / Copilot for citation tracking.** ToS
   risk, brittle, and the basis of GetCito's core loop.
4. **The original-research flywheel, if built carelessly.** Aggregating user
   reaction-time results is the best idea in the plan *and* the only one that touches
   personal data. Consent, anonymity, outlier handling and cheat resistance are
   prerequisites, not follow-ups. A dataset that can be poisoned by one user with a
   script is a liability, not an asset.

### Missing components

- **Bing Webmaster Tools.** Absent entirely. Largest gap.
- **A business-value function.** What is one click worth? Until answered, scoring is
  vanity.
- **A cost model.** DataForSEO is the hidden paid dependency under both CrawlSEO and
  OpenSEO. The plan presents them as free.
- **A mechanical fact-check gate.** Highest-value missing safety component; see the
  contradiction above.
- **Crawl-to-index latency.** Feedback loops of 2–8 weeks make most of the proposed
  hourly/6-hourly cadences noise.
- **An explicit "do nothing" outcome.** An opportunity engine that must always emit a
  next action will invent work.

### Outdated assumptions

- **FAQPage and HowTo rich results.** Google withdrew both for most sites. This repo
  ships 657 Question/Answer pairs and 65 HowTo blocks earning no SERP feature. Keep
  them for answer engines if desired, but not on the theory that they produce rich
  results.
- **"GPT-5.6 Sol"** — unverified from here. Do not hard-couple an architecture to a
  specific model name; define the *role* and let the model be swappable.

### Redundant components

Six overlapping site auditors among the candidates (CrawlSEO, OpenSEO,
seo-audit-skill, seo-auditor, seo-aeo-audit, seo-geo-audit). Pick one.

The proposed GSC WORKER, KEYWORD WORKER and TREND WORKER duplicate working code that
already exists here: `scripts/gsc/gsc.py`, `scripts/bing/bing.py`, and eight scripts
under `scripts/keywords/`. Rewriting them into a TypeScript monorepo is negative value.

---

## PART 3 — REPOSITORY AUDIT

All figures pulled from the GitHub API on 2026-09-10.

| Repository | Role | Stars | Last push | Contrib | License | Verdict | Reason |
|---|---|---|---|---|---|---|---|
| `seo-skills/seo-audit-skill` | Tech SEO audit | 423 | 2026-09-05 | 2 | MIT | **CORE** | 332 rules, CWV via Playwright, raw-vs-rendered DOM diff, npm + Claude skill, no API key, no infra. Directly detects this repo's known failure class. Bus factor 2; vendor funnel to seomator.com. |
| `Auriti-Labs/geo-optimizer-skill` | AEO/GEO diagnostics | 785 | 2026-09-05 | 4 | MIT | **OPTIONAL** | 1,788 tests, PyPI, MCP, cites real research. Use for llms.txt/bot-access/JSON-LD diagnostics only. Its 0–100 score is **not** AI visibility. |
| `flack0x/trendspyg` | Trends | 49 | 2026-09-10 | 3 | MIT | **OPTIONAL** | Genuinely maintained pytrends replacement, MCP included. Low stars but active today. Caveat: this niche's terms sit below Trends' volume floor, so it will mostly return noise. |
| `crawlseo/crawlseo` | Crawler + GSC dashboard | 583 | 2026-09-05 | 7 | MIT | **DEFER** | Good project, wrong shape: full self-hosted Docker + Postgres dashboard duplicating `gsc.py`. Keyword/backlink features need DataForSEO (paid). |
| `every-app/open-seo` | SEO suite + MCP | 18,239 | 2026-09-03 | 18 | MIT | **DEFER** | Highest stars in the list, but stars are the weakest signal here — it is a $10/mo hosted product whose data layer is your own DataForSEO key. The MCP is the interesting half. |
| `ai-search-guru/getcito-...` | AI visibility | 410 | 2026-09-07 | 3 | **NOASSERTION** | **REJECT** | README shows an MIT badge; GitHub cannot resolve the actual licence. Unclear licence + AI-engine scraping + bus factor 3. |
| `SEObserver/crawlobserver` | Crawler | 15 | 2026-08-01 | – | **AGPL-3.0** | **REJECT** | AGPL. Fine as an isolated binary, viral if any of it reaches the Next app. Not worth the care. |
| `puneetindersingh/open-seo-crawler` | Crawler | 40 | 2026-08-04 | – | MIT | REJECT | Redundant with the CORE pick. |
| `chukhraiartur/seo-keyword-research-tool` | Keywords | 164 | **2023-05-10** | – | MIT | REJECT | Abandoned 3+ years. |
| `sundios/Keyword-generator-SEO` | Keywords | 67 | **2023-06-27** | – | **none** | REJECT | Abandoned and unlicensed — unlicensed means no right to use. |
| `serpapi/seo-agent` | Agent | 10 | 2025-09-10 | – | MIT | REJECT | A year stale; vendor demo. |
| `HamzaCutuna/seo-keyword-scraper` | Keywords | 1 | 2026-02-04 | – | MIT | REJECT | Trivial. |
| `ravigupta0210/seo-auditor` | Audit | 2 | 2026-08-26 | – | **none** | REJECT | Unlicensed, trivial. |
| `openairlabs/seo-aeo-audit` | AEO audit | 2 | 2026-07-19 | – | MIT | REJECT | Trivial, redundant. |
| `lireking/seo-geo-audit` | GEO audit | 2 | 2026-07-02 | – | MIT | REJECT | Trivial, redundant. |
| `pangolinfoapi/google-trends-tracker` | Trends | 1 | 2026-07-28 | – | MIT | REJECT | Vendor lead-gen. |
| `madeburo/GEO-AI` | GEO | 11 | 2026-03-21 | – | MIT | REJECT | Stale, redundant. |
| `surfacedby/ai-visibility-optimizer-for-claude` | AI visibility | 4 | 2026-07-01 | – | MIT | REJECT | Trivial. |
| `cuongquachc88/open-seo-checker` | – | – | – | – | – | **DOES NOT EXIST** | GitHub API returns 404. This candidate was hallucinated into the plan. |
| `citelens`, `geo-aeo-tracker`, `indie-keyword-finder`, `trendsmcp-ai/...` | – | – | – | – | – | **UNRESOLVABLE** | Listed without an owner; no unambiguous match. (`danishashko/geo-aeo-tracker`, 254★ MIT, is the likely intent and is better than several listed candidates.) |

**Net: adopt two repositories, trial one, reject sixteen.**

That one candidate in the list does not exist, and four cannot be resolved to a real
project, is itself the finding: the repository section was assembled without
verification. Applying the plan's own rule — *do not recommend a repository because it
sounds relevant* — to the plan.

### Build ourselves

Opportunity logic, evidence layer, scoring, the fact-check gate, the dataset. And
nothing else until the dataset exists.

---

## PART 4 — CORRECTED ARCHITECTURE

Replace 13 phases with three tiers. Do not start Tier 2 before Tier 0 has produced a
measurable result.

### TIER 0 — the work that actually moves the number (weeks, no new infrastructure)

1. **Build the reaction-time dataset.** Aggregate anonymous results already being
   produced. Publish with a methodology page, honest error bars, and the timing-
   precision caveat the About page already states correctly. This is the only asset in
   the entire plan that can create referring domains, and it doubles as the AEO
   citation asset. It needs no monorepo, no Supabase, no worker framework.
2. **Ship the fact-check gate.** A pre-commit grep for `aggregateRating`, precision
   claims, invented counts and testimonial seeding. Fix `app/drills/motor/page.js:123`
   now. This is a two-hour job that removes the plan's largest automation risk.
3. **Work Bing first.** It is where the site holds positions 2–10 with 0% CTR. Fixing
   descriptions there is the highest-yield on-page work available, and it is measurable
   in weeks rather than quarters.
4. ~~Publish `llms.txt`.~~ **Already shipped** — `app/llms.txt/route.js` generates it
   from the registry, demand-ordered. Corrected 2026-09-10; the earlier finding
   checked only `public/llms.txt` and missed the app route.
5. **Localize the five existing locale slugs**, or delete the three unvalidated trees.
   Either is defensible. Shipping `/de/drills/reaction-speed/` is not.

### TIER 1 — a thin data spine (only after Tier 0 ships)

One Python package extending what already works. One SQLite file. One nightly job.

```
scripts/seo/
  sources/   gsc.py · bing.py · trends.py     # two already exist
  store.py                                    # SQLite; ~8 tables, not 40
  checks.py                                   # wraps seo-audit-skill
  report.py                                   # writes into docs/SEO_PROGRESS.md
```

Not a monorepo. Not Supabase. Not a worker registry. The existing scripts are already
the data layer; give them a shared store and a schedule.

### TIER 2 — decision support (only if Tier 0 produced referring domains)

Add scoring and an opportunity table *at that point*, informed by which Tier 0 actions
actually worked. Design it against real outcome data instead of in advance.

---

## PART 5 — DATABASE

The proposed ~40 entities are rejected as premature. Eight tables carry Tier 1:

```
pages(url, market, first_seen, last_crawl, indexed, canonical, title, desc, words)
keywords(term, market, lang, volume, source, measured_at)
metrics(url, term, engine, date, clicks, impressions, ctr, position)   -- engine: google|bing
checks(url, check_id, status, detail, run_at)
assets(id, kind, url, methodology_url, published_at)                   -- the dataset
links(source_domain, target_url, first_seen, kind, live)               -- referring domains
actions(id, url, kind, baseline_json, applied_at, remeasure_on, outcome, note)
runs(id, job, started, finished, ok, error)
```

`actions` is the learning loop, and it is one table. `engine` on `metrics` is what
makes Bing a first-class citizen instead of an afterthought.

---

## PART 6 — WORKERS

Four, not twelve:

1. **collect** — GSC + Bing + (optionally) Trends into `metrics` / `keywords`
2. **audit** — `seo-audit-skill` over the sitemap into `checks`
3. **verify** — fact-check gate + rendered-HTML word count (this repo's two recurring
   failure classes)
4. **report** — diff versus last run, append to `SEO_PROGRESS.md`

No crawler worker (audit covers it), no SERP worker (no budget and no need at this
scale), no backlink worker (nothing to track until Tier 0 produces links), no
competitor worker (weekly manual review is cheaper and better at 6 competitors).

---

## PART 7 — THE THREE-AI MODEL

**MODIFY — the roles are right, the protocol is fiction.**

Three AIs that cannot call each other do not form a pipeline; the human becomes the
message bus, hand-carrying JSON packets between three chat windows. That is not
orchestration, it is manual labour with extra ceremony, and it will be abandoned.

What already works in this repo is the honest version of the same idea:
`docs/prompts/ANTIGRAVITY_*.md` — a written brief with goal, rationale, ground rules,
verification steps and a stop-for-approval cadence. That *is* the task packet, it is
already in use, and it is better than the proposed schema because it carries the *why*.

Corrected model:

| Worker | Role | Decision rights |
|---|---|---|
| **Claude Code** (here) | Strategy, red team, briefs, QA of returned work. Has the repo, the scripts, git, and subagents. | Decides what and whether. Never mass-edits without a brief. |
| **Deep-analysis model** (Sol, or whichever is current) | Bounded analytical questions: statistical validity of the dataset, SERP/market reads, scoring critique. | Advises. Publishes nothing. Named by role, not model. |
| **Antigravity** | Executes a written brief across many files. Already proven on 10 passes. | Implements only what the brief specifies. Stops on mismatch. |

Keep the brief format that exists. Do not replace it with a JSON envelope.

---

## PART 8 — FIRST CLOSED LOOP

The plan's proposed test (GSC low-CTR → title change) is **the wrong first loop**: it
runs against the weaker channel and the slower feedback signal.

Run it on Bing instead, where the site already holds positions 2–10:

1. Baseline: `concentration grids` — 88 impressions @ 8.7, **0 clicks**.
2. Hypothesis: the description, not the title, is suppressing CTR.
3. Change one page's description. One page.
4. Record in `actions` with a remeasure date 21 days out.
5. Re-measure. If CTR is still zero, the SERP snippet was never the constraint —
   and that finding is worth more than the click.

One page, one variable, one recorded outcome. That is the whole architecture, proven
or falsified, before anything is built.

---

## Bottom line

Keep the principles — they are genuinely good and hard-won.
Delete the platform.
Build the dataset.

The plan asks how to construct an autonomous agency. The honest answer is that this
site does not yet have enough traffic to feed one, and the thing standing between it
and that traffic is a dataset no competitor has, which one person can build in a few
weeks without any of the infrastructure above.

Revisit Tier 2 when there is a reason to.
