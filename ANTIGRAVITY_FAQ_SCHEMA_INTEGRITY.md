# Execution Brief — FAQPage Structured-Data Integrity Repair

**Target agent:** Antigravity
**Scope:** 15 drill pages across 5 categories. Sitewide in reach, small in size.
**Type:** Correctness / compliance repair. **Not** a content expansion project.
**Relationship to other briefs:** Run this **before** `ANTIGRAVITY_REACTION_SPEED_INTL_SEO.md`. Six of the fifteen bad pages are in `reaction-speed`; localizing them first would translate the defect into Korean and Japanese.

---

## 1. Your Role

You are a technical SEO engineer specializing in structured-data compliance. Your instinct on schema is conservative and well-earned: **structured data must describe the page, never embellish it.** Schema that promises content a user cannot find is the fastest route to losing rich results across an entire domain, because Google's enforcement is site-level, not page-level.

You are also disciplined about the difference between *fixing a mismatch* and *bulking up a page*. This brief is the former. Resist the urge to turn it into the latter.

---

## 2. The Defect

81 drill pages emit `FAQPage` JSON-LD. On 15 of them, the schema advertises questions that **appear nowhere in the rendered DOM**.

**138 Q&A pairs are currently advertised to Google and Bing that no visitor can see.**

Google's structured-data guidelines are explicit: FAQ content must be visible to the user on the page. Advertising invisible Q&As risks, in escalating order: loss of the FAQ rich result on that page, a site-wide structured-data manual action, and loss of rich results across all 81 drill pages including the 66 that are currently correct.

This site earns ~80 clicks/mo and has 82 of 91 URLs historically uncrawled. It cannot absorb a manual action. **The 66 correct pages are the asset you are protecting.**

### 2.1 Verified inventory

Measured against **rendered HTML** in `.next/server/app/drills/`, not source. Re-verify before you begin; do not trust this table blindly.

| Category | Drill | Schema Qs | Visible | Missing |
|---|---|---:|---:|---:|
| reaction-speed | `fps-tracking-trainer` | 15 | 0 | **15** |
| reaction-speed | `market-doors-pursuit` | 15 | 0 | **15** |
| reaction-speed | `reflex-training-drill` | 15 | 0 | **15** |
| reaction-speed | `saccadic-gallery` | 15 | 0 | **15** |
| reaction-speed | `visual-tracking-speed-test` | 15 | 0 | **15** |
| physical | `complex-pattern` | 10 | 0 | **10** |
| physical | `jump-sequence` | 10 | 0 | **10** |
| cognitive | `reaction-time` | 10 | 3 | 7 |
| fps | `target-switching-swarm` | 15 | 8 | 7 |
| reaction-speed | `barrier-sequence-pursuit` | 8 | 1 | 7 |
| fps | `strafe-tracking` | 15 | 9 | 6 |
| fps | `vertical-air-track` | 15 | 9 | 6 |
| physical | `cross-body-movement` | 4 | 0 | 4 |
| physical | `quick-dodge` | 10 | 6 | 4 |
| memory | `object-location` | 6 | 4 | 2 |

**Clean and not to be touched:** `motor` (8/8), `visual` (9/9), `visual-tracking` (15/15), plus 34 others. Total clean: 66 pages, 650 Q&As all verified visible.

### 2.2 Root cause

The schema lives in `page.tsx` as a hand-written `faqSchema` object. The visible FAQ lives separately — usually `<FAQItem>` elements inside a `DrillAccordion` in the drill's `*Client.tsx`. The two were authored independently and drifted. The schema copy was generally written to be longer and more keyword-rich than the page copy, which is precisely the pattern enforcement targets.

**This is a content mismatch, not a rendering bug.** Do not confuse it with the historic `{isOpen && children}` defect — that one is already fixed (see §3.1).

---

## 3. Load Before Acting

### 3.1 `DrillAccordion` is already correct — do not "fix" it

`components/drill/DrillAccordion.js` renders children into the DOM **unconditionally**, hidden via the `hidden` attribute when collapsed. Its own comment records why:

> Previously this was `{isOpen && ...}`, which kept every drill's instructions, About copy and FAQ out of the server HTML entirely — Googlebot saw ~160 words per drill page and the FAQPage JSON-LD referenced answers that appeared nowhere on the page.

Content inside a collapsed accordion **is** in the server HTML, **is** crawlable, and **is** legitimate — a user can reveal it by clicking. That is the sanctioned pattern for tabs and accordions. Adding Q&As here is a valid fix.

**Do not** convert accordions to always-open. **Do not** change this component.

### 3.2 The two reference patterns — copy one, do not invent a third

**Pattern A — schema appends the guide's Q&As** (`app/drills/visual-tracking/constant-slow-pursuit/page.tsx`):

```js
// The guide block below renders extra Q&As; append them to the FAQPage
// schema so the structured data matches what is actually on the page.
const guide = GUIDES['constant-slow-pursuit'];
faqSchema.mainEntity = faqSchema.mainEntity.concat(
  (guide?.faqs || []).map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  }))
);
```

**Pattern B — guide derives its Q&As from the schema** (`app/drills/reaction-speed/reaction-time-test/page.tsx`):

```js
faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
```

Both make one object the single source of truth so the two can never drift again. **Prefer Pattern B** where the page has a `DrillGuide`: it is the stronger guarantee, because the visible content is generated from the schema rather than merely concatenated alongside it.

### 3.3 Where things live

```
app/drills/<cat>/<drill>/page.tsx        faqSchema + other JSON-LD
app/drills/<cat>/<drill>/*Client.tsx     visible FAQ (<FAQItem> in DrillAccordion)
components/drill/DrillAccordion.js       DO NOT MODIFY
components/drill/DrillGuide.js           renders guide.faqs when a guide is passed
```

---

## 4. The Fix — Decide Per Question, Not Per Page

For every missing Q&A, choose **one** of two resolutions. Judge each on its merits; do not apply one blanket rule to a whole page.

### Option 1 — Add it to the visible page *(default choice)*

Choose this when the Q&A is genuinely useful to a visitor. It is the better outcome: it resolves the mismatch **and** adds real body copy, which these thin drill pages need anyway.

Add as `<FAQItem q="…" a="…" />` inside the existing FAQ `DrillAccordion` in the drill's client, matching the surrounding markup exactly.

**The question and answer text must match the schema character-for-character.** A paraphrase re-creates the mismatch.

### Option 2 — Remove it from the schema

Choose this when the Q&A is filler, redundant with an existing question, or keyword padding that would degrade the page if shown. Some of these 138 exist only to stuff terms — those should be deleted, not published.

**Deleting a bad Q&A is a good outcome. Do not preserve a weak question merely to keep the count high.** A page with 6 honest Q&As beats one with 15 padded ones.

### 4.1 Applying judgment

Read every missing Q&A before deciding. Expect a mix. As a guide:

- **Keep and display:** answers a real user question about how the drill works, what a score means, hardware effects, or who it is for.
- **Delete:** near-duplicates of another question; answers that only restate the title; questions that exist to place a keyword ("Is this Target Switching Aim Trainer free?" when a "free" question already exists); anything making a claim the page cannot support.

### 4.2 Truthfulness gate — applies to every answer you keep

While you are in these files, any answer you retain must be **factually defensible**. Delete or rewrite any that are not. Known offenders of this type exist in this codebase, e.g.:

- "sub-millisecond precision" — browser timers are coarsened to ~1ms for Spectre mitigation
- "zero input lag" — not achievable
- "Benchmarks calibrated across millions of visual reaction trials" — the site has ~80 clicks/mo
- "Official … Benchmarks" — official per whom?

If you would not defend the sentence to a search-quality reviewer, it does not go in the schema **or** on the page. Never invent a statistic, user count, or benchmark to fill an answer.

---

## 5. Absolute Prohibitions

Violating any of these fails the task outright.

1. **Never satisfy the visibility requirement by hiding text.** No `display:none`, `visibility:hidden`, zero-height/opacity containers, off-screen positioning, `aria-hidden` text, or sr-only wrappers used to smuggle Q&As into the DOM. That converts a mismatch problem into a cloaking violation — strictly worse. The accordion's `hidden` attribute on a user-toggleable region is the **only** sanctioned form of concealment here, and it already exists; do not imitate it elsewhere to game the check.
2. **Never paraphrase.** Schema text and visible text must be identical strings.
3. **Do not touch the 66 clean pages.** Verify a page is in the §2.1 list before editing it.
4. **Do not modify `DrillAccordion.js`.**
5. **Do not expand scope** into copywriting, redesign, or i18n. Reconcile and stop.
6. **Do not fabricate** any statistic, benchmark, testimonial, or user count.
7. **`npx next build` only — never `npm run build`.** The `postbuild` hook fires live IndexNow pings to Bing/Yandex/Seznam.

---

## 6. Verification — Ground Truth Is Rendered HTML

Source inspection is not sufficient and has already produced a wrong answer once on this exact question. A source-regex audit reported 60 bad pages; the rendered-HTML audit found 15. **Verify against the built output.**

Run `npx next build`, then this check. It must report **zero** drifted pages before you are done:

```python
import io, re, glob, os, html

rows = []
for f in glob.glob('.next/server/app/drills/**/*.html', recursive=True):
    parts = f.replace(os.sep, '/').split('/')
    if len(parts) <= 5:
        continue
    cat, name = parts[4], parts[-1][:-5]
    if name == cat:
        continue
    s = io.open(f, encoding='utf-8', errors='replace').read()
    qs = re.findall(r'"@type":"Question","name":"(.*?)","acceptedAnswer"', s)
    if not qs:
        continue
    body = html.unescape(re.sub(r'<script\b[^>]*>.*?</script>', '', s, flags=re.S | re.I))
    missing = [q for q in qs
               if html.unescape(q.replace('\\"', '"')) not in body]
    if missing:
        rows.append((cat, name, len(qs), len(missing), missing))

for cat, name, total, n, miss in sorted(rows, key=lambda r: -r[3]):
    print(f'{cat:18} {name:32} {total:3} schema, {n:3} MISSING')
    for q in miss:
        print(f'      x {q}')
print('\ndrifted pages:', len(rows))
```

Also confirm:

- [ ] `npx next build` exits 0
- [ ] Total schema Q&A count went **down or stayed flat** — if it rose, you added questions instead of reconciling
- [ ] The 66 previously-clean pages are still clean (run the check across everything, not just the 15)
- [ ] `git diff --stat` touches only the 15 pages and their clients
- [ ] Every retained answer passes §4.2
- [ ] No new CSS or attribute is being used to conceal text

Validate two or three representative pages in Google's Rich Results Test and paste the output.

---

## 7. Deliverables

1. The code changes.
2. `FAQ_SCHEMA_INTEGRITY_REPORT.md` at repo root:
   - Before/after table for all 15 pages
   - **A per-question decision log**: every one of the 138 missing Q&As, with `ADDED` or `REMOVED` and a one-line reason. This is the core deliverable — it is how a human audits your judgment without re-reading every file.
   - Any answers deleted or rewritten under §4.2, quoted, with why
   - Pasted verification output, including the zero-drift run
   - Anything you found but deliberately did not fix, and why
3. One commit per category, conventional format. Do not squash.

---

## 8. Definition of Done

- [ ] Rendered-HTML check reports **0** drifted pages across all 81
- [ ] Every kept Q&A byte-identical between schema and DOM
- [ ] Every kept answer factually defensible
- [ ] Zero hidden-text techniques introduced
- [ ] 66 clean pages untouched and still clean
- [ ] `DrillAccordion.js` unmodified
- [ ] Build exits 0
- [ ] Decision log complete for all 138

---

## 9. Judgment Clause

The likely correct outcome is a **net reduction** in advertised Q&As. Much of this 138 is keyword padding that was never fit to publish. A report reading "added 40, removed 98" is a success.

A report reading "added all 138 to the pages" means you did not exercise judgment — you bulk-published filler to satisfy a checker. That is the failure mode of this brief, and it is worse than the defect you were sent to fix.
