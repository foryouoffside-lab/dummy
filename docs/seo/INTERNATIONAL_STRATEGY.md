# International ranking strategy — measured, 2026-09-10

All figures are **Bing Webmaster exact-match impressions per month**, pulled live
this session. Bing is roughly 3–4% of global search, so Google-scale demand is on
the order of 25–30x. Treat the numbers as *relative* signal.

Tools used (both free, both now in this repo, no third-party dependency):

```
scripts/keywords/autocomplete.py   # discovery  — live Google Suggest, per gl/hl
scripts/bing/bing.py keyword       # validation — measured volume, per country
scripts/bing/bing.py related       # expansion  — real queries, per market
scripts/keywords/native_discovery.py   # the three, wired together per market
```

Method: a native phrasing is a **hypothesis**. It gets measured and discarded if
it is empty. Nothing is targeted because it is the translation of something that
works in English.

---

## 1. The headline finding: the category is wrong, not the language

The plan assumed the job was to translate reaction-time pages into more
languages. Measured, that assumption collapses:

| Market | Best native reaction term | /mo | English `reaction time test` | /mo |
|---|---|---|---|---|
| FR | `test de réaction` | **0** | reaction time test | 282 |
| ES | `test de reflejos` | 19 | reaction time test | 63 |
| DE | `reaktionstest` | 476 | reaction time test | **634** |
| BR | `teste de reflexo` | 225 | reaction time test | 222 |
| JP | `反射神経テスト` | **2,526** | reaction time test | 107 |
| KR | `반응속도 테스트` | **10,333** | reaction time test | low |

Three things fall out of this:

1. **French reaction-time demand is zero.** Not small — zero across all three
   native phrasings. A `/fr/` tree would rank for nothing.
2. **In DE and ES the English term beats the native one.** The existing English
   page already serves those markets better than a translation would. The top
   German query in this space is `human benchmark` (863) — a competitor's brand.
3. **Only JP and KR have native demand that exceeds English**, and both already
   have locale trees in this repo.

**Two corrections to what currently ships**, both from this data:

- The Japanese pages target 反応速度 (reaction speed). Japanese users search
  **反射神経** (reflexes) — 2,526/mo against 1,811. The site is targeting the
  translated term instead of the native one. This is precisely the failure mode
  the goal is meant to avoid, live in the tree today.
- `de`, `es`, `pt` were built without validated demand and should be
  de-prioritised or removed. `ja` and `ko` were validated and should be deepened.

---

## 2. Where the demand actually is

Same markets, different category. This is the same site's competency — input
speed, motor precision, measurement — pointed at what people search for.

### Typing (JP / KR / BR)

| Market | Term | /mo |
|---|---|---|
| KR | `한컴타자연습` | **176,386** |
| JP | `タイピング練習` | **149,616** |
| JP | `タイピング` | **100,001** |
| KR | `타자연습` | **95,223** |
| JP | `イータイピング` | 23,233 |
| KR | `한컴타자` | 22,049 |
| JP | `タイピング練習 無料` | 16,535 |
| BR | `teste de digitação` | **14,810** |
| JP | `タイピングゲーム` | 11,651 |
| KR | `타자연습 게임` | 8,449 |
| KR | `한글타자연습하기` | 7,005 |

For scale: **`aim trainer` US = 9,821.** Japanese typing practice alone is 15x the
term this entire site is built around.

`docs/TYPING_PLAN.md` correctly concluded the **US** head term is unwinnable
(monkeytype, 10fastfingers, typing.com) and that the US addressable tail is only
~2,260/mo. That conclusion holds — but it measured English only. Internationally
the competitive set is **completely different**: the incumbents are e-typing,
Sushida, Hiyoko, MyTyping, Benesse (JP) and Hancom (KR). Hancom's 176k is a
word-processor vendor's bundled desktop tool, not a web-first competitor.

The winnable layer is the modifier tail, which is large and weakly served:

| JP | /mo | KR | /mo |
|---|---|---|---|
| `タイピング練習 無料` | 16,535 | `무료 타자 연습` | 1,467 |
| `ブラインドタッチ 練習 無料` | 3,334 | `무료 타자 연습기` | 1,399 |
| `タイピング練習 長文` | 2,738 | `무료 타자 연습 사이트` | 778 |
| `初心者向けタイピング練習` | 1,425 | `영 타자 연습` | 578 |
| `キーボード練習` | 1,315 | `타자연습 사이트` | 388 |
| `タッチタイピング` | 1,245 | `온라인 타자 연습` | 265 |
| `タイピング練習 小学生` | 296 | | |
| `ホームポジション タイピング練習` | 327 | | |

### Keyboard tester — the strongest single opportunity found

A **different tool** from a typing test: a hardware diagnostic that shows which
keys register. People use it when a key stops working.

| Market | Term | /mo |
|---|---|---|
| US | **`keyboard tester`** | **13,729** |
| BR | `teste teclado` | 6,494 |
| BR | `teste de teclado online` | 3,517 |
| BR | `keyboard test` | 2,525 |
| KR | `키보드 테스트` | 2,201 |
| US | `keyboard test` | 2,130 |
| BR | `testar teclado online` | 1,350 |
| BR | `teclado teste` | 593 |
| JP | `キーボード テスト` | 540 |
| US | `key test` | 487 |
| US | `keyboard test online` | 429 |
| BR | `testador de teclado` | 430 |
| DE | `tastatur test` | 420 |
| **measured total** | | **~35,000** |

**`keyboard tester` alone (13,729) is larger than `aim trainer` (9,821).**

Why this is the best fit available to this site:

- **It is a tool, not content.** The site has no blog and does not need one —
  this intent wants a tool, not an article.
- **It is nearly language-independent.** The interface is a picture of a
  keyboard. Localising it is ~20 UI strings, not a content translation project.
  One build serves every market in the table above.
- **The incumbents are thin.** Single-page utility sites with no authority moat —
  unlike monkeytype or Hancom.
- **The code mostly exists.** `keydown`/`keyup` handling, canvas rendering, and
  the results/share pattern are already in the motor drills.
- **It is genuinely useful.** Someone with a broken key gets a real answer. That
  matters both for retention and for the authority gate — utilities get linked.

---

## 3. Why "no blog" is a strength, not a gap

Every term above is **tool intent**. `keyboard tester`, `타자연습`,
`タイピング練習`, `teste de teclado` — the searcher wants to do something, not
read about it. Google ranks tools for tool queries; an article would rank worse
and serve worse.

The correct content unit here is **a page with a working tool above the fold and
a short, honest explainer below it** — which is exactly the pattern this site
already ships on 81 drill pages. Do not build a blog. Build tools, and give each
one the one informational section its query set actually asks for
(`average typing speed`, `타자 속도 평균`, `平均タイピング速度`).

---

## 4. Recommended sequence

Ordered by measured return per hour, not by architectural tidiness.

| # | Action | Effort | Why |
|---|---|---|---|
| 1 | **Fix `app/drills/motor/page.js:123`** | 15 min | Ships a factual claim the About page debunks. Free, and it is a trust liability sitting in schema. |
| 2 | **Build the keyboard tester**, EN first | ~4h | 13,729/mo US, thin competition, tool intent, code largely exists. |
| 3 | **Localise it to pt-BR, ko, ja** | ~2h | ~21,000/mo more, ~20 strings each. Highest return per hour in this document. |
| 4 | **Retarget the JA pages to 反射神経** | ~1h | Currently targeting the translated term over the native one. |
| 5 | **Build the typing test**, then ja/ko | ~6h + 3h | Per `TYPING_PLAN.md`, but justified by JP/KR volume rather than US. |
| 6 | **Localise the locale slugs** | ~2h | `/ko/타자연습/` not `/ko/drills/reaction-speed/`. |
| 7 | **De-prioritise `de`, `es`, `pt` reaction trees** | — | Unvalidated demand; English serves DE and ES better. |
| 8 | ~~Publish `llms.txt`~~ | done | Already shipped at `app/llms.txt/route.js`, generated from the registry. New drills appear in it automatically. |

Items 1, 2 and 3 are the ones that matter. Everything else can wait for them to
be measured.

---

## 5. What this does *not* solve

The authority constraint is untouched by all of it. A keyboard tester with no
referring domains still starts at position 40. The difference is that a keyboard
tester is a **linkable utility** — people link to tools that fix their problem —
where a reaction drill is not. That makes it the first item in this plan that
serves the authority gate as well as the relevance one.

Expect tens of visits per month initially, not thousands. The reason to build it
is that it is a cheap test of whether this domain can gain traction in a category
with genuine demand and weak incumbents. If it fails, it fails in a week and
tells us the constraint is authority, not category — which is the most useful
thing this site could currently learn.
