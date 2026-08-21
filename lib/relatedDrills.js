// lib/relatedDrills.js
// Picks the drills to cross-link from any given drill page.
//
// The point of this is crawl reachability, not decoration. The GSC URL
// Inspection API showed 64 of 81 drill URLs with no referring URL at all — the
// hubs were the only thing that ever linked to a drill, and they were rendering
// a loading skeleton. Even with the hubs fixed, a hub-and-spoke graph gives
// every drill exactly one inbound link. Cross-linking drills to each other turns
// that into a mesh, so a crawler that lands on any one drill can reach the rest,
// and each link carries the keyword-bearing anchor text from lib/drillSeo.js.
//
// Selection is deliberately mixed rather than purely "most similar": a slice of
// same-subcategory neighbours (closest topical match), then same-category, then
// cross-category by term overlap. A pure similarity ranking collapses into
// category silos, which is exactly the shape that left the orphans unreachable.
//
// Output is a pure function of the registry, so it is identical on the server
// and the client and cannot cause a hydration mismatch.

import { DRILLS } from './drillsRegistry';
import { DRILL_SEO } from './drillSeo';

const STOP = new Set([
  'a', 'an', 'and', 'for', 'free', 'game', 'games', 'in', 'ms', 'of', 'online',
  'the', 'to', 'your',
]);

function tokens(href) {
  const seo = DRILL_SEO[href];
  if (!seo) return new Set();
  return new Set(
    [seo.term, ...(seo.also || [])]
      .join(' ')
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length > 2 && !STOP.has(w))
  );
}

// Precomputed once per process; the registry never changes at runtime.
const TOKENS = new Map(DRILLS.map((d) => [d.href, tokens(d.href)]));

function overlap(a, b) {
  let n = 0;
  for (const t of a) if (b.has(t)) n++;
  return n;
}

/**
 * @param {string} href  the current drill's href
 * @param {number} limit how many related drills to return
 * @returns {Array<{href, name, category, categoryLabel, anchor, term, relation}>}
 */
export function getRelatedDrills(href, limit = 6) {
  const self = DRILLS.find((d) => d.href === href);
  if (!self) return [];

  const selfTokens = TOKENS.get(href) || new Set();
  const scored = DRILLS.filter((d) => d.href !== href).map((d) => ({
    drill: d,
    sameSub: d.category === self.category && d.subcategory === self.subcategory,
    sameCat: d.category === self.category,
    score: overlap(selfTokens, TOKENS.get(d.href) || new Set()),
  }));

  // Ties break on href so the order is stable across renders and deploys.
  const rank = (pool) =>
    pool.sort((a, b) => b.score - a.score || a.drill.href.localeCompare(b.drill.href));

  const picked = [];
  const taken = new Set();
  const take = (pool, n, relation) => {
    for (const item of rank(pool)) {
      if (picked.length >= limit || n <= 0) break;
      if (taken.has(item.drill.href)) continue;
      taken.add(item.drill.href);
      picked.push({ ...item, relation });
      n--;
    }
  };

  take(scored.filter((s) => s.sameSub), 2, 'same-subcategory');
  take(scored.filter((s) => s.sameCat && !s.sameSub), 2, 'same-category');

  // Coverage slot, claimed before the relevance fill can spend it.
  //
  // Relevance ranking alone leaves a couple of drills with no inbound link from
  // any other drill — they fall back to a single link from their hub, which is
  // the exact shape that stranded 64 pages in "Discovered - currently not
  // indexed". Linking every drill to its successor in registry order lays a
  // cycle across the whole set, so each drill is guaranteed at least one inbound
  // drill link however its terms happen to score. The successor is skipped only
  // if it was already picked above, in which case the guarantee already holds.
  const selfIndex = DRILLS.findIndex((d) => d.href === href);
  const successor = DRILLS[(selfIndex + 1) % DRILLS.length];
  if (successor && successor.href !== href && !taken.has(successor.href)) {
    taken.add(successor.href);
    picked.push({ drill: successor, relation: 'more-drills' });
  }

  // Cross-category links are the ones that actually break the silos, so they
  // only qualify on genuine term overlap rather than filling with anything.
  take(scored.filter((s) => !s.sameCat && s.score > 0), limit, 'related-topic');
  // Backfill so every page always ships a full set of links, even a drill in a
  // one-item subcategory whose terms overlap nothing else.
  take(scored, limit, 'more-drills');

  return picked.slice(0, limit).map(({ drill, relation }) => ({
    href: drill.href,
    name: drill.name,
    category: drill.category,
    categoryLabel: drill.categoryLabel,
    difficulty: drill.difficulty,
    duration: drill.duration,
    anchor: DRILL_SEO[drill.href]?.anchor || drill.name,
    term: DRILL_SEO[drill.href]?.term || '',
    relation,
  }));
}
