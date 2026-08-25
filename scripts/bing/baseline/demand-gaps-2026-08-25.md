# Demand gaps — measured 2026-08-25

Bing Webmaster keyword API, exact-match impressions per month, US, en-US.
Bing is roughly 3–4% of search volume, so Google demand is on the order of
25–30x these figures. Treat the numbers as *relative* signal, not absolute.

For scale, the term this entire site is built around:

| Term | Bing exact/mo |
|---|---|
| `aim trainer` | 9,821 |

---

## 1. Typing — deleted from this site, and 18x bigger than aim training

| Term | Bing exact/mo |
|---|---|
| **`typing test`** | **179,006** |
| `typing practice` | 36,340 |
| `typing speed test` | 12,624 |
| `free typing test` | 9,123 |
| `wpm test` | 6,170 |
| `words per minute test` | 4,279 |
| **cluster total** | **~247,000** |

The site had an academic/typing section. It was deleted. Search Console
measured `/drills/academic` at **position 9.7 with 185 impressions** — page one.
Compare that with the aim cluster, where every commercial term sits at position
45–78. This site's best organic position was in the section that got removed.

`/drills/academic` currently 301s to `/drills/cognitive` (next.config.js), so the
equity is being funnelled rather than lost outright, but nothing on the receiving
end answers a typing query.

**The honest counter-argument:** `typing test` is owned by monkeytype,
10fastfingers, typing.com and keybr — ranking for the head term is not realistic
from this domain. The case rests on the long tail and on the fact that this site
*already held page one* in the space, which it never has for aim.

## 2. Spacebar speed — no drill exists, and one nearly does

| Term | Bing exact/mo |
|---|---|
| `spacebar clicker` | 4,476 |
| `spacebar counter` | 213 |
| `spacebar speed test` | 80 |
| `space bar test` | 40 |

`/drills/motor/movement-speed/rapid-tapping` is already a clicks-per-second
drill and now targets `cps test` (26,858). A spacebar input mode is a small
change to an existing drill rather than a new one, and `spacebar clicker` is
nearly half the volume of `aim trainer`.

## 3. Mental math — also deleted

| Term | Bing exact/mo |
|---|---|
| `math games` | 14,999 |
| `mental math` | 175 |
| `mental math practice` | 132 |

`math games` is large but broad and largely kids-education intent, which does not
match this site's positioning. Weaker case than typing.

## 4. Competitor brands people search generically

| Term | Bing exact/mo |
|---|---|
| `human benchmark` | 8,194 |
| `aimlabs` | 5,645 |
| `kovaaks` | 2,276 |
| `3d aim trainer` | 1,584 |

Not targetable directly — these are other people's trademarks. Relevant only as
comparison context, and `/drills/reaction-speed/reaction-time-test` already says
"compare your average against benchmarks", which is the honest version.

---

## Query-intent segmentation — why the headline CTR reads low

Top 60 Bing queries, 1,117 impressions, split by what the searcher actually wanted:

| Bucket | Clicks | Impressions | CTR |
|---|---|---|---|
| Our brand (`skilldrills`) | 36 | 143 | **25.17%** |
| **Someone else's brand** (`drill your skill`) | 3 | 353 | **0.85%** |
| Generic / commercial | 25 | 621 | 4.03% |

**32% of Bing impressions are for "drill your skill" and its variants** — a
different entity whose name is confusingly close to ours. We rank position 2–7
for it because of the name collision; those users want someone else and bounce.
`drill your skill` alone is 270 impressions at position 6.8 with **0 clicks**.

Two consequences:

1. The site-wide 6.65% CTR is depressed by impressions that can never convert.
   The number that matters for the retarget is the **generic bucket: 4.03%**.
2. When comparing in 3–4 weeks, **exclude the `drill your skill` family** or the
   comparison will be misleading in both directions.

## A caution about how much titles can do

`steady hand game` sits at position 7.0 with 27 impressions and **0 clicks** —
and that page's title has been an exact match (`Steady Hand Game - Free Mouse
Path Tracing Drill`) the whole time. Exact-match titles do not guarantee clicks
at position 7; below-the-fold placement caps what any title can achieve. Expect
the retarget to help most where we rank 1–5, less where we rank 6–10.
