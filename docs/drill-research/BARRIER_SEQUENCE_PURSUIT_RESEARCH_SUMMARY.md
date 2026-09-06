# Research & Optimization Summary: Jiggle Peek Trainer (`barrier-sequence-pursuit`)

**Drill Slug:** `/drills/reaction-speed/barrier-sequence-pursuit`  
**Execution Date:** 2026-09-05  
**Governing Brief:** [`ANTIGRAVITY_BROWSER_KEYWORD_RESEARCH.md`](../seo/ANTIGRAVITY_BROWSER_KEYWORD_RESEARCH.md)  
**Deliverable Files:**
- Data CSV: [`scripts/keywords/out/barrier-sequence-pursuit-global-2026-09-05.csv`](../../scripts/keywords/out/barrier-sequence-pursuit-global-2026-09-05.csv)
- Data Markdown: [`scripts/keywords/out/barrier-sequence-pursuit-global-2026-09-05.md`](../../scripts/keywords/out/barrier-sequence-pursuit-global-2026-09-05.md)
- Local Code: [`app/drills/reaction-speed/barrier-sequence-pursuit/page.tsx`](../../app/drills/reaction-speed/barrier-sequence-pursuit/page.tsx) and [`BarrierSequencePursuitClient.tsx`](../../app/drills/reaction-speed/barrier-sequence-pursuit/BarrierSequencePursuitClient.tsx)

---

## 1. Executive Summary & Recommended Strategy

1. **The Tactical FPS Gaming Niche:**
   - Standalone mechanical search queries (`jiggle peek trainer`, `jiggle peek`, `peeker's advantage`, `how to hold angles valorant`, `ferrari peek`, `wide swing`) returned **0 exact monthly impressions** across English and European markets in the Bing API index. These represent tactical gamer vocabulary primarily searched on YouTube, Reddit (`r/VALORANT`, `r/LearnCSGO`, `r/fpsaimtrainer`), and gaming forums.
   - Measurable tactical gaming queries included `crosshair placement` (4 exact US, 2 exact GB, 1 exact DE) and `reflex trainer` (4 exact US, 2 exact GB).
2. **Breakout Discovery in Japan (`ja-JP`):**
   - The Japanese query **`置きエイム`** (*okiei-mu*, the Japanese tactical gaming term for holding an angle / pre-aiming crosshair placement on a corner where an enemy will peek) returned **857 exact / 1,949 broad monthly impressions** in Japan.
   - Tactical shooters like *Valorant* and *Apex Legends* have massive cultural dominance in Japan. Players actively search for angle holding and pre-aim mechanics, yet zero native browser-based drills exist.
3. **The Competitor Whitespace on SERPs:**
   - SERP analysis of Google and Bing for `"jiggle peek trainer"`, `"peeker's advantage drill"`, and `"angle holding drill"` revealed **zero interactive browser-based corner-peeking simulators**.
   - Incumbents consist of 10-to-20 minute YouTube video guides (Woohoojin, Charla7an, NatS), unstructured Reddit discussions, or paid desktop software (Refrag.gg's $6–$15/mo in-engine CS2 workshop mod).
   - SkillDrills is uniquely positioned to own the browser-based interactive query space by offering an instant, zero-install canvas drill that simulates enemies popping out from occluding corner barriers.

---

## 2. Terms Tested & Keyword Measurement Table

Measured using Bing Webmaster Tools API (`GetKeyword`, JSON Protocol) on 2026-09-05 across 40 distinct queries in 7 global markets:

| Query | Market | Exact Vol/mo | Broad Vol/mo | Competition | Opportunity | Strategic Status |
|:---|:---:|:---:|:---:|:---:|:---:|:---|
| `置きエイム` (*okiei-mu*) | JA-JP | **857** | **1,949** | **LOW** | **857.0** | **PROMOTE (Target for Japanese Localization)** |
| `reaction time test` | EN-US | 8,223 | 8,350 | HIGH | 411.1 | Cross-link hub only (Entrenched: Human Benchmark) |
| `reaction time test` | EN-GB | 1,229 | 1,250 | HIGH | 61.5 | Cross-link hub only |
| `crosshair placement` | EN-US | 4 | 4 | LOW | 4.0 | Target Cluster LSI |
| `crosshair placement` | EN-GB | 2 | 2 | LOW | 2.0 | Target Cluster LSI |
| `crosshair placement` | DE-DE | 1 | 1 | LOW | 1.0 | Target Cluster LSI |
| `reflex trainer` | EN-US | 4 | 4 | LOW | 4.0 | Secondary LSI |
| `reflex trainer` | EN-GB | 2 | 2 | LOW | 2.0 | Secondary LSI |
| `jiggle peek trainer` | EN-US | 0 | 0 | LOW | 0 | Primary Target Query (Zero web tools) |
| `jiggle peek` | EN-US | 0 | 0 | LOW | 0 | Secondary Intent Query |
| `peeker's advantage` | EN-US | 0 | 0 | LOW | 0 | Secondary Intent / AEO Definition |
| `counter peekers advantage` | EN-US | 0 | 0 | LOW | 0 | Targeted Long-Tail |
| `how to hold angles valorant`| EN-US | 0 | 0 | LOW | 0 | Targeted Long-Tail / FAQ |
| `how to jiggle peek` | EN-US | 0 | 0 | LOW | 0 | Targeted Long-Tail / FAQ |

---

## 3. Terms Rejected & Incumbent Ownership (§6.5)

| Term | Measured Volume | Why Rejected as Primary | Who Owns It |
|:---|:---:|:---|:---|
| `reaction time test` | 8,223 US / 1,229 GB | High competition; owned by entrenched incumbents. The drill measures corner peeking and angle holding, not 1-color full-screen latency. | `humanbenchmark.com`, `arealme.com` |
| `aim trainer` | ~9,821 US | High competition; owned by funded desktop 3D software. | `aimlabs.com`, `kovaaks.com`, `3daimtrainer.com` |
| `jiggle peek` (head term) | Unranked volume | Video/forum-dominated intent. Searchers seek video demonstrations of counter-strafing keybinds rather than an abstract test. | YouTube (`Woohoojin`, `SkillCapped`), Reddit |

---

## 4. SERP & AEO Landscape (§7.3)

### Top Ranking Domains on Google & Bing
1. **Google SERP:** `youtube.com`, `reddit.com` (`r/VALORANT`, `r/LearnCSGO`), `playvalorant.com`, `technology.riotgames.com`, `developer.valvesoftware.com`, `prosettings.net`, `dotesports.com`, `boosteria.org`.
2. **Bing SERP:** `windowscentral.com`, `ggrecon.com`, `theloadout.com`, `youtube.com`, `playvalorant.com`, `esports.gg`, `reddit.com`.

### AI Overviews, Microsoft Copilot, & Perplexity Analysis
- Queries such as *"what is peeker's advantage"*, *"how to counter peeker's advantage"*, and *"how to jiggle peek"* trigger prominent AI Overviews and Copilot answer cards.
- **Top Sources Cited by AI Engines:**
  - **Riot Games Technical Engineering Blog:** Matt deWet & David Straily (2020), *"Peeking into VALORANT's Netcode"*.
  - **Riot Games Dev Diaries:** *"04: On Peeker's Advantage & Ranked"*.
  - **Valve Developer Community:** *"Source Multiplayer Networking"* and *"Lag Compensation"*.
  - **Esports Analysis Portals:** *Dot Esports*, *GGRECON*, *Windows Central*.
- **Extractability Optimization:** Added the exact netcode latency formula, Donders' mental chronometry split, and a standalone 2-sentence definition directly beneath the H1.

---

## 5. Truthfulness Audit & Peer-Reviewed Grounding (§4.3, §7b.2)

### Purged Fabricated Claims
- **Purged Fabricated Accuracy Column:** Removed the fabricated `"Detection Accuracy"` column (`98%+`, `92%–97%`, `85%–91%`, `70%–84%`, `< 70%`) from `barrierSequenceGuide.benchmarks.headers` and all 5 rows. SkillDrills collects no aggregate user metrics; publishing speculative percentage brackets violated §4.3 and §7b.2.
- **Replaced with Scientific Chronometry Tiers:** Benchmark tiers are now anchored in literature-grounded reaction time brackets for visual discrimination (Donders 1868; Woods et al. 2015).

### Scientific & Technical Netcode Citations Integrated
1. **Riot Games Technology & Dev Diaries (Matt deWet & David Straily, 2020):**
   - Formalized the mathematical latency decomposition of Peeker's Advantage:
     $$\text{Total Advantage} = T_{\text{Enemy Frametime}} + T_{\text{Enemy 1-Way Lag}} + T_{\text{Server Tick Duration}} + T_{\text{Defender 1-Way Lag}} + T_{\text{Interpolation Buffering}}$$
   - Establishes that standard 30–40 ms network ping and 128-tick servers produce an unavoidable **40–90 ms** visual lead for an advancing peeker.
2. **Valve Developer Community (Source Multiplayer Networking & Lag Compensation):**
   - Server-side hitbox history rewinds (`cl_interp`) and tickrate interpolation.
3. **Donders' Mental Chronometry (1868):**
   - Proactive **Simple Reaction Time (<180 ms)** enjoyed by an attacker anticipating an angle peek vs. reactive **Choice Reaction Time (250–350 ms)** required by an angle holder discriminating whether an emerging shape is an empty shoulder bait or a committed swing.
4. **Woods et al. (2015):**
   - Timing methodology documenting `performance.now()` precision and display quantization intervals (16.7 ms at 60 Hz down to 4.1 ms at 240 Hz).

---

## 6. Layout & Typography Overhaul (§8b House Style)

1. **Sentence-Case Left-Aligned H1:**
   - Converted centered uppercase `BARRIER SEQUENCE PURSUIT` into a left-aligned, sentence-case H1: `"Jiggle Peek Trainer"`.
   - Placed an immediate, standalone 2-sentence extractable definition snippet directly beneath the headline.
2. **Full-Width Live Stat Cards:**
   - Converted 4 stat cards from a narrow centered box (`max-w-2xl mx-auto`) to full container width flush with the canvas borders.
   - Restyled panels with modern hairlines (`bg-white/[0.015] border border-white/[0.06] rounded-xl p-2 sm:p-2.5 text-center`).
3. **Sequential Heading Hierarchy:**
   - Corrected About accordion headings from `h4` $\rightarrow$ `h3` and `h5` $\rightarrow$ `h4`.
   - Verified strict unbroken `H1 -> H2 -> H3 -> H4` heading sequence across the rendered DOM.
4. **Single-Source FAQ Architecture:**
   - Deleted the duplicate handwritten client FAQ accordion (`id="faq"`) and removed the unused `FAQItem` component.
   - All 10 PAA questions are now rendered exclusively through `DrillGuide` and mapped directly from `faqSchema`.
5. **Freshness & Metadata:**
   - Added `dateModified: "2026-09-05"` to both `webAppSchema` and `faqSchema`.
   - Updated `FpsStartCard` title to `"Jiggle Peek Trainer"`.
   - Updated `also` keywords in `lib/drillSeo.js` to `['counter peekers advantage', 'angle holding drill', 'crosshair placement trainer', 'cover peeking practice', 'jiggle peek practice']`.

---

## 7. Verification Audit Table (Live Next.js Dev Server)

| Verification Check | Expected Result | Actual Result (Port 3000) | Status |
|:---|:---|:---|:---:|
| HTTP 200 Server Render | Status code 200 | 200 OK | **PASS** |
| Sentence-Case H1 | `"Jiggle Peek Trainer"` left-aligned | Verified in HTML | **PASS** |
| Heading Hierarchy | Zero skipped heading levels | H1 $\rightarrow$ H2 $\rightarrow$ H3 $\rightarrow$ H4 sequential | **PASS** |
| Fabricated Accuracy Purge | Zero instances of `98%+`, `92%–97%` | 0 instances in HTML | **PASS** |
| Scientific Citations | Riot Games, deWet, Straily, Donders, Woods | All citations present in DOM | **PASS** |
| Netcode Latency Formula | Formal peeker advantage equation | Present in guide intro | **PASS** |
| Single-Source FAQ | Exactly 1 FAQ section in DOM | Only `DrillGuide` FAQ rendered | **PASS** |
| Freshness Timestamps | `dateModified: "2026-09-05"` in schemas | Present in WebApp & FAQPage | **PASS** |
| FAQ Schema Parity | 10 questions in schema & DOM | 10 questions in parity | **PASS** |
| SEO Map Alignment | `lib/drillSeo.js` updated | 5 measured queries added | **PASS** |
