# SkillDrills SEO Campaign — Progress & Handoff

**Site:** https://skilldrills.online
**Started:** 2026-08-21
**Purpose:** Paste this file into a new chat to resume exactly where we stopped.

---

## Access already configured (do not redo)

| Service | Status | How |
|---|---|---|
| GitHub | Connected | `gh` CLI v2.97.0 at `C:\Program Files\GitHub CLI\gh.exe`, authed as `foryouoffside-lab`, token in Windows keyring, scopes `repo, workflow, read:org, gist` |
| Vercel | Connected | MCP connector. Team `team_SB2HDllUFgBY6bImvf4CuX6S`, project `global-drill-system` (`prj_ayThXKgdOFUYu6nhV3EpqyWh7S9w`) |
| Search Console | Connected | OAuth desktop client, project `claude-seo-506122`. Token at `C:\Users\sangmesh\Desktop\gsc-token.json`. Property `https://skilldrills.online/` (siteOwner) |

**GSC puller:** `scripts/gsc/gsc.py`
```
python scripts/gsc/gsc.py sites | queries [days] [limit] | pages | opportunities | pageopps | csv
```
Secrets are gitignored (`credentials.json`, `*-token.json`, `gsc-*.csv`).

Old GitHub PAT was removed from `.git/config`. ~~User still needs to revoke it.~~ **RESOLVED 2026-08-21 (session 3):** the user checked github.com/settings/tokens and there are no personal access tokens on the account at all. Fine-grained PATs carry a mandatory expiry, so it had almost certainly lapsed on its own. Verified independently: no token in `.git/config`, zero token matches across full git history, and `gh` authenticates with a `gho_` OAuth token in the Windows keyring (which lives under Settings > Applications, not under Personal access tokens). Nothing further to do — do not re-raise this item.

---

## Baseline metrics (90 days, pulled 2026-08-21)

**244 clicks / 3,250 impressions / 14 pages**

| Page | Clicks | Impr | CTR | Pos |
|---|---|---|---|---|
| `/` | 181 | 547 | 33.1% | 5.5 |
| `/drills` | 26 | 705 | 3.69% | 8.8 |
| `/drills/fps` | 8 | 622 | 1.29% | 32.5 |
| `/drills/visual` | 8 | 161 | 4.97% | 11.2 |
| `/drills/academic` | 6 | 185 | 3.24% | 9.7 |
| `/drills/fps/flick-shot-training` | 6 | 327 | 1.83% | 12.7 |
| `/drills/cognitive` | 3 | 182 | 1.65% | 7.6 |
| `/drills/motor` | 2 | 145 | 1.38% | 6.8 |
| `/drills/physical` | 2 | 156 | 1.28% | 18.3 |
| `/drills/productivity` | 2 | 39 | 5.13% | 17.2 |
| `/drills/memory` | 0 | 163 | 0% | 23.3 |
| `/drills/mental-fitness` | 0 | 8 | 0% | 6.5 |
| `/drills/visual-tracking` | 0 | 9 | 0% | 1.2 |

Competitive query positions (all essentially unranked):
`aim trainer online` 65.8 · `aim training online` 61.8 · `aim trainer free` 71.3 · `skill drills` 29.4

Note: query-dimension totals (56 clicks) are lower than page totals (244) because Google withholds low-volume queries. Trust page numbers.

---

## ROOT CAUSE (verified with live fetches, not guessed)

Two bugs compound into one fatal problem: **Google sees a loading skeleton on every category hub page.**

### Bug 1 — SSR is disabled by a client-only gate
`if (!isClient) { return <DrillLoading />; }` — e.g. [app/drills/fps/FPSHubClient.js:169](app/drills/fps/FPSHubClient.js#L169)

`isClient` is false during server rendering, so the server emits a loading spinner instead of content.

Affects 8 hub files:
- `app/drills/fps/FPSHubClient.js`
- `app/drills/cognitive/CognitiveHubClient.js`
- `app/drills/memory/MemoryClient.js`
- `app/drills/motor/MotorDrillsClient.js`
- `app/drills/physical/PhysicalDrillsClient.js`
- `app/drills/visual/VisualDrillsClient.js`
- `app/drills/reaction-speed/ReactionSpeedDrillsClient.tsx`
- `app/drills/visual-tracking/VisualTrackingDrillsClient.tsx`

### Bug 2 — the JS that would fix it is blocked
[app/robots.js](app/robots.js) disallows `/_next/` for Googlebot and every other crawler. Google cannot load the JS bundle, so it can never render past the skeleton.

### Proof (live fetch as Googlebot, 2026-08-21)
| URL | Visible words in HTML | H1 |
|---|---|---|
| `/drills/fps` | **74** | **none** |
| `/drills/fps/flick-shot-training` | 234 | present |
| `/` | 629 (includes "Loading…") | present |

`/drills/fps` has 622 impressions and sits at position 32.5 — because Google literally sees 74 words and no heading.

### Bug 3 — every AI search crawler is blocked
[app/robots.js](app/robots.js) has `disallow: '/'` for: `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Claude-Web`, `anthropic-ai`, `Google-Extended`, `GPTBot`, `CCBot`, `YouBot`, `cohere-ai`, `Meta-ExternalAgent`, `GoogleOther`.

This directly defeats the stated goal of "AI should suggest my website." Critically:
- `OAI-SearchBot` = ChatGPT Search index (not training)
- `PerplexityBot` = Perplexity
- `Google-Extended` = AI Overviews / Gemini grounding
These are *search* crawlers, not training scrapers. Blocking them removes the site from AI answers entirely.

---

## Verdict on ChatGPT's suggestions

| Claim | Verdict |
|---|---|
| Remove `/_next/` from robots | **Correct and critical** |
| Unblock OAI-SearchBot / PerplexityBot | **Correct**, and understated — 13 AI bots blocked |
| Server-render main content | **Correct**, but root cause is the `isClient` gate, not "use client" itself |
| Submit sitemap / request indexing | Correct, standard |
| Focus on FPS positioning | Reasonable strategy, debatable priority |
| Add analytics events | Fine, low priority vs. the crawl bug |
| Translations + hreflang | Premature — do after indexing is fixed |
| "Verify as domain property" | Optional; URL-prefix property already works |

ChatGPT was directionally right on the top items but had no data. The `isClient` gate — the actual root cause — was not identified.

---

## PLAN

### Phase 1 — Unblock crawling  ✅ DONE (code; not yet deployed)
- [x] 1.1 Removed `/_next/` from all disallow lists in `app/robots.js`
- [x] 1.2 Removed `/styles/` and `/lib/` disallows
- [x] 1.3 Unblocked AI search crawlers (17 allowed incl. OAI-SearchBot, PerplexityBot, Google-Extended, Claude-SearchBot)
- [x] 1.4 Removed `curl`/`python-requests`/`wget` blocks
- Backup of the original at `app/robots.js.bak`
- Validated: 73 rules, Googlebot disallow is now only `['/api/','/.vercel/']`, `_next` appears nowhere

### Phase 2 — Fix SSR  ✅ DONE (code; not yet deployed)
- [x] 2.1 Removed `if (!isClient) return <DrillLoading />` from all 8 hub clients
      - Safe because `drillLevels` initialises to `{}` on both server and client, so the
        first client render matches the server HTML; localStorage is only read inside
        `useEffect`, which runs after hydration. The gate was never needed.
- [x] 2.2 Removed the 8 now-orphaned `DrillLoading` imports. `app/loading.js` and
      `app/drills/loading.js` still use it correctly as Suspense fallbacks — left alone.
- [x] 2.3 Removed duplicate `<noscript><h1>` blocks from `app/page.js` and
      `app/drills/motor/page.js` (they were a workaround for the broken SSR and were
      creating two H1s per page). Every page now has exactly one H1.
- [x] 2.4 Verified against the prerendered HTML in `.next/server/app/`

**Result — server-rendered words per page, before -> after:**

| Page | Before | After | H1 |
|---|---|---|---|
| `/drills/fps` | 74 | **710** | added |
| `/drills/cognitive` | (skeleton) | 459 | ok |
| `/drills/memory` | (skeleton) | 419 | ok |
| `/drills/motor` | (skeleton) | 471 | ok |
| `/drills/physical` | (skeleton) | 551 | ok |
| `/drills/visual` | (skeleton) | 591 | ok |
| `/drills/reaction-speed` | (skeleton) | 376 | ok |
| `/drills/visual-tracking` | (skeleton) | 502 | ok |
| `/drills` | - | 439 | ok |
| `/` | 629 | 604 | 1 (was 2) |

Build: `npx next build` -> compiled successfully, no errors.

### Phase 3 — Server-rendered content depth
- [ ] 3.1 Move hero H1 + intro prose into the server `page.js` for each hub
- [ ] 3.2 Add unique 300–600 word server-rendered body to each of the top drill pages
- [ ] 3.3 Add FAQ blocks (server-rendered, matching existing FAQPage schema)

### Phase 4 — Re-index
- [ ] 4.1 Deploy, verify live robots.txt
- [ ] 4.2 Resubmit sitemap in GSC
- [ ] 4.3 URL-inspect + request indexing for `/drills/fps`, `/drills/memory`, `/drills`, top 10 drills
- [ ] 4.4 Bing Webmaster Tools

### Phase 5 — Growth
- [ ] 5.1 Titles/descriptions for `/drills/motor` + `/drills/cognitive` (only real CTR gaps)
- [ ] 5.2 Internal linking between related drills
- [ ] 5.3 Distribution (communities, video, shareable score cards)
- [ ] 5.4 Translations — only after country data justifies it

---

## STATUS LOG

**2026-08-21**
- Connected GitHub, Vercel, Search Console
- Built `scripts/gsc/gsc.py`; fixed two of my own bugs in it (escaped-newline breakage, and an invented CTR decay curve replaced with real position-CTR data)
- Pulled 90-day baseline (above)
- Diagnosed root cause with live Googlebot fetches
- Phase 1 complete: `app/robots.js` rewritten (180+ rules -> 73, `/_next/` unblocked, AI bots allowed)
- Phase 2 complete: SSR restored on all 8 hubs, orphaned imports and duplicate H1s cleaned
- Phase 3 complete: 8 hub H1s rewritten, 50 page titles shortened below the truncation limit
- Final build: `npx next build` -> compiled successfully. All 10 key pages verified:
  exactly 1 H1 each, 377-708 server-rendered words each, no loading skeleton.
- **User is handling deploy themselves after testing. Nothing committed or pushed.**
- **NEXT AFTER DEPLOY: Phase 4 re-indexing in GSC**

### Phase 3 — On-page signals  ✅ DONE (code; not yet deployed)
- [x] 3.1 Rewrote all 8 hub H1s to lead with the actual search term:

| Page | Before | After |
|---|---|---|
| `/drills/fps` | FPS Aim & Reflex | **Free FPS Aim Trainer** |
| `/drills/cognitive` | Decision & Priority Speed | Brain Training & Decision Speed |
| `/drills/memory` | Memory Span & Sequence Recall | Memory Training & Recall |
| `/drills/motor` | Motor Sector | Mouse Precision & Motor Drills |
| `/drills/physical` | Physical Sector | Reflex & Coordination Training |
| `/drills/visual` | Visual Training System | Visual Training & Recognition |
| `/drills/reaction-speed` | Reaction Speed Drills | Reaction Time Test & Drills |
| `/drills/visual-tracking` | Visual Tracking Systems | Visual Tracking Training |

  **Homepage H1 deliberately left as "Master Your Mind & Mechanics"** — it is at
  position 5.5 with 33% CTR and 181 of the site's 244 clicks. It works. Changing
  it risks brand for no measurable gain.

- [x] 3.2 Title-length pass. 37 of 68 titles were over 60 chars and truncating
      in search results. Hub titles rewritten by hand; 43 drill titles had the
      ` | SkillDrills` suffix dropped (keywords matter more than a trailing brand
      Google often appends anyway).
      Longest title now **69 chars, was 88**. Median 57.

  Notable: `/drills/motor` (77 -> 55) and `/drills/cognitive` (87 -> 53) were the
  two pages measured as genuine CTR underperformers. Truncated titles are a
  plausible cause — worth re-checking in GSC after 3-4 weeks.

- [ ] 3.3 Unique 300-600 word server-rendered body per top drill page (not started)
- [ ] 3.4 Server-rendered FAQ blocks matching existing FAQPage schema (not started)

### Superseded — weak H1 text (resolved in Phase 3.1)
SSR now works, but the visible H1s are brand copy with no search value:
- `/` -> "Master Your Mind & Mechanics"
- `/drills/motor` -> "Motor Sector"
- `/drills/fps` -> "FPS Aim & Reflex"

The keyword-rich strings that used to sit in the deleted `<noscript>` blocks
(e.g. "Free Aim Trainer & Motor Skills Drills - Mouse Precision, Click Speed &
Hand Eye Coordination") are better SEO copy. Rewriting the visible H1s is a
design/branding decision — **needs the user's call before changing.**

### Uncommitted files as of this entry (~64 files)
`app/robots.js`, `.gitignore`, the 8 hub clients, 50 `page.js`/`page.tsx` metadata
edits, `app/page.js`, `app/drills/motor/page.js`.
New: `SEO_PROGRESS.md`, `scripts/gsc/`, `app/robots.js.bak`.

**Nothing committed, pushed, or deployed.** User deploys after their own testing.

### Smoke test to run after deploying
1. Load 2-3 hub pages, check browser console for React hydration warnings.
   Removing the `isClient` gate is the change most likely to surface one.
   Reasoning says it's safe (`drillLevels` starts `{}` on both sides, localStorage
   only read in `useEffect`) but this has not been runtime-tested.
2. `curl -s https://skilldrills.online/robots.txt | grep _next` -> must return nothing.
3. Fetch `/drills/fps` as Googlebot -> expect ~700 words, H1 "Free FPS Aim Trainer".
4. Rollback if needed: `app/robots.js.bak`, or `git revert`.

> Use `npx next build` for compile checks. `npm run build` fires a live IndexNow
> ping to Bing/Yandex/Seznam via postbuild — only run it when you actually intend that.

---

## Re-measure command
```
python scripts/gsc/gsc.py pages 28 20
python scripts/gsc/gsc.py pageopps 90 15
```
Compare against baseline table. Ranking changes take 2–6 weeks post-fix.

---

# SESSION 2 — 2026-08-21 (later)

## The single most important fact

**Session 1's work was never deployed.** Live `robots.txt` still contained
`Disallow: /_next/` and the live hubs still served a loading skeleton when this
session started. Everything below is *also* undeployed. Nothing ships until the
user deploys.

Measured live as Googlebot at the start of this session:

| URL | Live words | H1 |
|---|---|---|
| `/drills/fps` | 61 | none |
| `/drills/memory` | 61 | none |
| `/drills/fps/flick-shot-training` | 220 | 1 |
| `/drills/visual-tracking/triangular-pursuit` | 237 | 1 |

## Hard indexing data (GSC URL Inspection API, all 91 sitemap URLs)

| Coverage state | Count |
|---|---|
| Submitted and indexed | **9** |
| Discovered - currently not indexed | **76** |
| URL is unknown to Google | **6** |

**82 of 91 URLs have never been crawled by Google. Not once.**

Referring-URL breakdown for those 82:

| Source | Count |
|---|---|
| No referrer at all | 64 |
| Only `sitemap.xml` | 20 |
| A real internal link | 7 |

That is the answer to "why are ~80 pages not indexed": the hub pages rendered as
skeletons, so **Google never saw a single link to any drill page**. The drills
were orphans, discoverable only via the sitemap, and Google declines to spend
crawl budget on sitemap-only URLs from a low-authority site.

Puller script: `scratchpad/gsc_index.py`. Do NOT name it `inspect.py` — that
shadows the stdlib `inspect` module and breaks the google-auth import chain.

## Root causes found and fixed this session

### 1. All 81 drill pages were thin — content was never in the HTML

`components/drill/DrillAccordion.js` rendered `{isOpen && <div>{children}</div>}`.
`openAccordion` initialises to `null`, so on the server *and* on first client
render **every accordion body was absent from the DOM**: drill instructions, the
whole About section, and every FAQ answer. Drill pages carried ~160 rendered
words while their `FAQPage` JSON-LD advertised up to 14 Q&As that appeared
nowhere on the page — a schema/content mismatch as well as a thin-content problem.

Fixed by always rendering children and collapsing with the `hidden` attribute
(the correct ARIA pattern for an `aria-controls` region; Tailwind preflight
supplies the `[hidden] { display: none }` rule). The open animation is preserved
by applying `fx-fade-up` only while open, so re-adding the class restarts it.

**Median drill page: 163 -> 686 rendered words from this one change.**

### 2. One drill still had the Session-1 `isClient` bug

`app/drills/visual/tracking-accuracy/multiple-targets/GhostLinkClient.js:649`
had a `loading || !isClient` early return to a spinner. Session 1 fixed the 8
hubs but never scanned the drill clients. This page rendered **46 words**. The
gate and its now-dead `loading`/`isClient` state were removed; it now renders
533 words. A repo-wide scan confirms no other file has this pattern.

### 3. Four dead URLs were still earning impressions

Deleted sections still ranking and returning 404:

| URL | Clicks | Impr | Pos |
|---|---|---|---|
| `/drills/academic` | 6 | 185 | 9.7 |
| `/drills/productivity` | 2 | 39 | 17.2 |
| `/drills/academic/comprehension/inference-drill` | 0 | 11 | 10.9 |
| `/drills/mental-fitness` | 0 | 8 | 6.5 |

243 impressions — 7.5% of all site impressions — landing on 404s. 301s added in
`next.config.js` to the nearest live equivalent, with the old
`/drills/academic/reading-speed/rsvp-reader` pointed at the surviving
`/drills/cognitive/processing-speed/rsvp-reader`.

### 4. The 15 visual-tracking pages were near-duplicates

All 15 shared the identical title suffix "Visual Tracking & Gaze Calibration
Drill" and measured **0.77 mean pairwise text similarity** (peaks of 0.93). Every
one was unindexed. No other category exceeds 0.45.

- All 15 titles rewritten to target a distinct real search term. Drill names like
  "Triangular Pursuit" have no search volume, so each title now pairs the name
  with a term people actually search. Longest is now 53 chars.
- New `app/drills/visual-tracking/guides.js` plus
  `components/drill/DrillGuide.js`: a server-rendered long-form block with
  per-drill prose, training steps, audience and extra FAQs. The extra FAQs are
  concatenated into each page's existing `FAQPage` schema so the structured data
  matches the visible page.

**visual-tracking similarity: 0.77 -> 0.48.** Median drill words: 686 -> 786.

### 5. Metadata hygiene

- 32 titles were over 60 chars, so they truncated in SERPs. **Now 0.**
- 28 meta descriptions were over 160 chars. **Now 0.**
- 0 duplicate titles across the whole site.
- `/search` was `index, follow` while rendering 23 words with no H1 — an
  indexable near-empty page. Now `noindex, follow`.
- The 404 description still advertised "typing tests, and mental fitness tools",
  both deleted from the site. Rewritten.

**Watch out:** a naive regex over the `description:` field breaks on descriptions
containing an escaped apostrophe (`peeker\'s`, `\'slicing the pie\'`). It
silently truncates at the escaped quote and corrupts the file. Two files in
`app/drills/reaction-speed/` contain these. One was corrupted and repaired.

## Verification (local production build plus `next start`)

| Check | Result |
|---|---|
| `npx next build` | compiled successfully, 180 static pages |
| Drill pages: rendered words | min 367 / median 786 / mean 752 / max 1235 |
| Pages with exactly one H1 | all checked pages |
| Titles over 60 chars | 0 |
| Descriptions over 160 chars | 0 |
| Duplicate titles | 0 |
| Orphan drill routes | 0 (was 64 with no referrer at all) |
| Built `robots.txt` | 73 rules, no `_next` block, AI search bots allowed |
| Redirect smoke test | `/drills/academic`, `/drills/productivity` return 308 |
| FAQ schema vs page | 7 questions in schema, all 7 visible in HTML |

Before and after on the pages that matter:

| URL | Live now | After deploy |
|---|---|---|
| `/drills/fps` | 61 | 698 |
| `/drills/memory` | 61 | 410 |
| `/drills/fps/flick-shot-training` | 220 | 1240 |
| `/drills/visual-tracking/triangular-pursuit` | 237 | 817 |
| `/drills/visual/tracking-accuracy/multiple-targets` | spinner | 533 |

## Honest read on the 100k/month goal

Current: ~3,250 impressions and 244 clicks per **90 days**, which is roughly
**80 clicks/month**. 100,000 visitors/month is about a 1,250x increase.

Query data says why. Of 56 clicks on the query dimension, **~48 are brand**
("skilldrills", "skill drills", "drill your skill"). Every non-brand commercial
term sits at position 45-78, which is page 5 to 8 — invisible:

`aim trainer online` 65.8 · `aim training online` 61.8 · `aim trainer free` 71.3

Those head terms are held by Aimlabs, Kovaak's, aimtrainer.io and
3daimtrainer.com. On-page work does not move a site from position 65 to page 1
on terms like that; domain authority does, and that means links and distribution.

What the fixes above realistically unlock: 82 pages going from *never crawled* to
indexed, each targeting long-tail terms with little competition. That is the
difference between ~900 impressions/month and something in the low tens of
thousands, over 2-3 months. **100k/month is a 12-24 month goal that needs
off-site work, not another on-page pass.**

## NEXT — in order

1. **Deploy.** Nothing above is live. Everything else is blocked on this.
2. Verify live: `curl -s https://skilldrills.online/robots.txt | grep _next`
   must return nothing, and `/drills/fps` must serve ~700 words and an H1.
3. Browser-check 2-3 hub pages and one visual-tracking page for React hydration
   warnings. Reasoning says the accordion change is safe — `openAccordion` is
   `null` on both sides, so `hidden` matches — and the static build proves no
   browser API is touched during render, but it has not been runtime-tested in a
   real browser.
4. GSC: resubmit the sitemap, then URL-inspect and Request Indexing for
   `/drills/fps`, `/drills/memory`, `/drills`, and the top 10 drill pages.
   Re-run `scratchpad/gsc_index.py` after ~3 weeks to watch
   "Discovered - currently not indexed" drain.
5. Bing Webmaster Tools — the site is not registered there.
6. **Consider rebuilding the academic section.** It was deleted but still ranks
   at position 9.7 with 185 impressions. "typing test", "speed reading" and
   "mental math" are far higher-volume and far less contested than "aim trainer".
   Right now those impressions are being redirected away.
7. Off-site work: this is the actual constraint. Communities, video, shareable
   score cards, links.

### Open question for the user

`AhrefsBot` and `SemrushBot` are among the 32 fully-blocked user agents. That
also blocks the user from auditing their own site with those tools and hides
their own backlink profile from them. Unblock or keep? `PetalBot` (Huawei
search) and `Bytespider` (ByteDance search) are also blocked; both are minor.

---

# SESSION 3 — 2026-08-21 (security review + sitemap + keyword SEO)

Session 2's work **was** committed this time (`9be849b`). This session's changes
sit on top of it and are again uncommitted and undeployed.

## Security review

Scope: dependencies, the one API route, response headers, secret exposure (working
tree and full git history), and the reflected-input surface.

### Fixed

| # | Issue | Severity | Fix |
|---|---|---|---|
| 1 | `POST /api/indexnow` was effectively unauthenticated | **High** | Split the two keys apart |
| 2 | 4 Next.js CVEs, 2 PostCSS, nanoid, js-yaml, brace-expansion | **High** | `npm audit fix` |
| 3 | 4 libvips CVEs via sharp 0.34.5 | High (not reachable here) | Forced `sharp@^0.35.3` via `overrides` |
| 4 | CSP had no `frame-ancestors`, `base-uri`, `form-action` or `object-src` | Medium | Added |
| 5 | `X-XSS-Protection: 1; mode=block` | Low | Set to `0` |
| 6 | No `security.txt` at the RFC 9116 path | Low | Added `/.well-known/security.txt` |
| 7 | API responses were cacheable and indexable | Low | `no-store` + `X-Robots-Tag: noindex` |

**#1 in detail.** `app/api/indexnow/route.js` authorised POST by comparing the
caller's key against `INDEXNOW_KEY` — a value the IndexNow protocol *requires* to
be published at `/indexnow-key.txt`, and which the same route's own GET handler
returned to anyone who asked. So anyone could read the key and then drive the
endpoint, which fires POSTs to Bing, Yandex, Seznam and Naver under our host
identity, 100 URLs at a time, unthrottled. That is an abuse amplifier and a good
way to get the site's IndexNow key rate-limited or the host flagged.

Now:
- `INDEXNOW_KEY` stays the public protocol key. It never gates a write.
- `INDEXNOW_ADMIN_KEY` is a new env-only secret with no fallback. Unset means the
  route refuses every POST with 503 rather than failing open.
- Constant-time key comparison, `Authorization: Bearer` accepted, 5 submissions
  per hour per instance, `new URL(u, BASE)` origin validation, and the URL list is
  no longer echoed into the logs.

**Set `INDEXNOW_ADMIN_KEY` in the Vercel project env vars** or the route stays
off. Nothing in the app calls it — `scripts/notify-indexnow.js` (postbuild) talks
to the engines directly — so leaving it unset breaks nothing.

Verified against a local `next start`:

```
POST with the public key   -> 401 Unauthorized        (no relay fired)
POST off-origin URL        -> 400 Invalid URL origin  (no relay fired)
POST 101 URLs              -> 400 Too many URLs
POST with ADMIN key unset  -> 503 Endpoint disabled
GET                        -> still serves the public key (the protocol needs it)
```

`npm audit`: **6 high → 0**.

### Checked and clean

- No secrets in the working tree or in any commit across full git history. The
  only credential-shaped string is the IndexNow key, which is public by protocol.
- `.env` holds one non-secret (`GEMINI_MODEL`) and is gitignored; never committed.
- `.git/config` carries no token.
- All 358 `dangerouslySetInnerHTML` uses are JSON-LD built from static author
  copy. No user input reaches any of them.
- `/search` reflects `?q=` as a JSX text node, so React escapes it. No XSS.
- GSC credentials live outside the repo and are gitignored.

### Not fixed, deliberately

- `script-src` keeps `'unsafe-inline'`. Next.js emits inline bootstrap and flight
  scripts on every page; removing it needs nonce plumbing through the whole app.
  Worth doing, but it is a project, not a patch.
- sharp's libvips CVEs need attacker-supplied images. The only image path is
  `next/image` with `remotePatterns` limited to our own host, and the site has no
  upload anywhere. Patched anyway, since it turned out to be free.
- ~~The old GitHub PAT still needs revoking.~~ **Closed.** The user checked their
  token list and it is empty — the token no longer exists. See the resolution note
  at the top of this file. This had been carried as an open item since session 1
  purely on the strength of a note, never on a verified check.

## Sitemap

Rewritten. 91 → **93 URLs**, no duplicates, no malformed entries, and every URL
cross-checked against the real route tree on disk (0 sitemap URLs without a page,
0 indexable pages missing from the sitemap).

- Added `/privacy` and `/terms`. Both were indexable but absent.
- `/search` stays out: its metadata is `index: false`, and a noindex URL in a
  sitemap is a contradictory signal that wastes crawl budget.
- `lastModified` moved from one global constant to a per-section map, and the
  stale `2026-08-10` bumped to `2026-08-21` to match the content rewrites.
- `priority` was 0.9 or 0.85 on 90 of 91 URLs, which tells Bing and Yandex
  nothing. Now spread 1.0 / 0.9 / 0.8 / 0.7 / 0.6 / 0.5 / 0.3, ranked by measured
  GSC performance.

## Keyword SEO for drill pages

### The real gap was internal links, not meta keywords

Every drill page already had a `keywords` array (median 14 terms) and a
keyword-researched title. The `keywords` meta tag has been ignored by Google since
2009 and is a spam hint to Bing, so editing those arrays would have changed
nothing at all.

What was actually missing: **no drill page linked to any other drill page.** The
GSC URL Inspection API had shown 64 of 81 drill URLs with no referring URL at all.
Session 2 fixed the hubs, which gives each drill exactly one inbound link — still
a hub-and-spoke graph, with no keyword-bearing anchor text anywhere in it.

### What was built

**`lib/drillSeo.js`** — one curated entry per drill (81/81), each with:

- `term` — the primary search phrase, taken from the page's own researched title
- `anchor` — link text used when other pages link here, **unique across all 81**
- `also` — secondary phrases, used for relatedness scoring

Aligned to the measured 180-day GSC clusters: fps training 48 · fps practice 28 ·
fps trainer 16 · flick trainer 19 · flick training 17 · memory drill 19 · online
memory training 14 · drills online 42 · online drills 40 — plus long-tail with no
page targeting it yet (`fps warm up`, `cs2 jitter`, `apex legends jitter aim`,
`gridshot 3x3 online`).

**`lib/relatedDrills.js`** — deterministic selection: 2 same-subcategory, then 2
same-category, then a registry-order coverage slot, then cross-category by term
overlap. The coverage slot lays a cycle across all 81 drills so no drill can end
up with zero inbound drill links, however its terms happen to score.

**`components/drill/RelatedDrills.js`** — mounted once in `app/drills/layout.js`
and self-gating on the pathname, so hub pages are untouched. It is a client
component only to read `usePathname()`; everything it renders derives from the
static registry, so the markup is identical on server and client and the links
are in the initial HTML.

Anchor text is the target search phrase, not the product name. "Ghost-Link
Tracking" and "Triangular Pursuit" have no search volume; "Multiple Object
Tracking Test" and "Eye Tracking Accuracy Drill" do.

### Link graph, measured

| | Before | After |
|---|---|---|
| drill → drill links | 0 | **486** |
| inbound drill links per drill | 0 | min 1, median 5, max 16 |
| drills with zero inbound drill links | 81 | **0** |
| cross-category share of links | — | 38.1% |
| unique `/drills/*` links in a drill page's HTML | ~2 | min 8, median 11, max 23 |
| median rendered words per drill page | 786 | **921** |

### Hub titles — each change justified by GSC

| Page | Before | After | Why |
|---|---|---|---|
| `/drills` | All Training Drills - 81 Free Browser Drills | Free Online Drills - 81 Skill Training Drills | "online drills" 29 impr pos 14.7, "drills online" 23 pos 10.6 — phrase absent from title |
| `/drills/fps` | Free FPS Aim Trainer - Online Aim Training | Free FPS Aim Trainer - FPS Training & Aim Practice | "fps training" 48 impr pos 28.8, "fps practice" 28, "fps trainer" 16 |
| `/drills/memory` | Memory Training - 7 Free Drills | Online Memory Training - 7 Free Memory Drills | "online memory training" 14 pos 43.6, "memory training online" 11 pos 49.5 |
| `/drills/cognitive` | Free Brain Training - Focus & Attention | Free Brain Training Online - Focus, Attention & Speed | "train your brain online" pos 70.5 |
| `/drills/physical` | Free Reflex, Balance & Coordination Drills | Free Physical Drills - Reflex, Balance & Coordination | "physical drills" pos 9.0, "physical fitness drills" pos 50 |

Untouched on purpose: `/` (pos 5.5, 33% CTR, 181 of the site's 244 clicks — do
not touch it), plus `/drills/motor`, `/drills/visual`, `/drills/visual-tracking`
and `/drills/reaction-speed`, which already lead with their demand terms.

Also removed "typing speed test" from `app/drills/layout.js` keywords — that
section was deleted from the site.

## Verification

| Check | Result |
|---|---|
| `npx next build` | compiled successfully, 180 static pages |
| `npm audit` | 0 vulnerabilities (was 6 high) |
| Security headers, live via `next start` | all present; `'unsafe-eval'` absent in prod |
| `POST /api/indexnow` abuse paths | 401 / 400 / 400 / 503, no relay fired |
| Sitemap | 93 URLs, 0 dupes, 0 dead, `/search` excluded |
| Related block in prerendered HTML | present on all 81 drill pages, absent on all 8 hubs |
| Drill link graph | 0 orphans |
| Anchor text uniqueness | 81/81 unique |

## NEXT

1. **Deploy.** Set `INDEXNOW_ADMIN_KEY` in Vercel env first, or leave the route
   disabled — which is safe.
2. Browser-check one drill page for hydration warnings. `RelatedDrills` is a pure
   function of the static registry so a mismatch is not possible in principle, but
   it has not been opened in a real browser.
3. GSC: resubmit the sitemap, then URL-inspect + Request Indexing for
   `/drills/fps`, `/drills/memory`, `/drills` and the top 10 drills.
4. Re-run `scratchpad/gsc_index.py` in ~3 weeks. The number to watch is
   "Discovered - currently not indexed" draining from 76.
5. Off-site work is still the actual constraint. Nothing on-page moves
   "aim trainer online" from position 65.
