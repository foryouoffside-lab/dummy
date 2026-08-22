// app/sitemap.js
// Dynamic XML sitemap. Served at /sitemap.xml via the rewrite in next.config.js.
//
// Design rules this file follows:
//
//  1. One source of truth. Drill URLs come from DRILLS (lib/drillsRegistry.js),
//     the same list the hubs, the search page and scripts/notify-indexnow.js use,
//     so a renamed or deleted drill can never leave a 404 in the sitemap.
//  2. Only canonical, indexable, 200-status URLs. No trailing slashes (they 308
//     via next.config.js), no redirected legacy paths, and nothing marked
//     noindex — /search is deliberately absent because its metadata sets
//     index:false, and a noindex URL in a sitemap is a contradictory signal that
//     wastes crawl budget.
//  3. Honest lastModified. Dates are per-section and hand-maintained. They must
//     reflect when that section's content actually changed. Never derive them
//     from Date.now(): a sitemap where every page claims to have changed today
//     gets its freshness signal discounted entirely.
//  4. Differentiated priority. Google ignores this field, but Bing and Yandex
//     still read it, and a sitemap where 90 of 93 URLs share the same 0.85 tells
//     them nothing. The values below rank pages by the traffic they actually
//     earn or realistically can earn, measured in Search Console.

import { DRILLS } from '../lib/drillsRegistry';

const BASE_URL = 'https://skilldrills.online';

// Bump the entry for a section when that section's copy or drills genuinely change.
const UPDATED = {
  home: '2026-08-21',
  directory: '2026-08-21',
  // Every hub was rewritten in the 2026-08-21 crawlability pass (SSR restored,
  // H1s and titles rewritten).
  hub: '2026-08-21',
  // Drill bodies became visible to crawlers in the same pass (the accordion fix).
  drill: '2026-08-21',
  // visual-tracking additionally got per-drill long-form guides.
  'visual-tracking': '2026-08-21',
  legal: '2026-08-22',
};

// Ranked by measured Search Console performance, then by realistic potential.
// /drills/fps carries the most non-brand impressions of any page on the site;
// /drills is the strongest converting hub; memory and visual have real query
// demand sitting at page 3-5 and are the clearest upside.
const HUB_PRIORITY = {
  '/drills': 0.9,
  '/drills/fps': 0.9,
  '/drills/memory': 0.8,
  '/drills/visual': 0.8,
  '/drills/cognitive': 0.8,
  '/drills/motor': 0.7,
  '/drills/reaction-speed': 0.7,
  '/drills/physical': 0.7,
  '/drills/visual-tracking': 0.7,
};

// Drill-page priority by category, mirroring where the demand actually is.
const DRILL_PRIORITY = {
  fps: 0.8,
  motor: 0.7,
  memory: 0.7,
  cognitive: 0.6,
  'reaction-speed': 0.6,
  visual: 0.6,
  'visual-tracking': 0.5,
  physical: 0.5,
};

// A handful of drill pages already rank or have measured impressions; they get
// a lift above their category baseline.
const DRILL_PRIORITY_OVERRIDES = {
  '/drills/fps/flick-shot-training': 0.9,
};

const entry = (path, lastModified, changeFrequency, priority) => ({
  url: `${BASE_URL}${path}`,
  lastModified,
  changeFrequency,
  priority,
});

export default async function sitemap() {
  const staticEntries = [
    entry('/', UPDATED.home, 'weekly', 1.0),
    entry('/drills', UPDATED.directory, 'weekly', HUB_PRIORITY['/drills']),
    ...Object.keys(HUB_PRIORITY)
      .filter((path) => path !== '/drills')
      .map((path) =>
        entry(
          path,
          UPDATED[path.replace('/drills/', '')] ?? UPDATED.hub,
          'weekly',
          HUB_PRIORITY[path]
        )
      ),
    // Low priority but genuinely indexable, and a site with no reachable legal
    // pages reads as low-trust to both search engines and users.
    entry('/privacy', UPDATED.legal, 'yearly', 0.3),
    entry('/terms', UPDATED.legal, 'yearly', 0.3),
    // Google Play links this as the account-deletion URL, so it must stay
    // reachable and indexable even though it has no search value.
    entry('/delete-account', UPDATED.legal, 'yearly', 0.3),
  ];

  const drillEntries = DRILLS.map((drill) =>
    entry(
      drill.href,
      UPDATED[drill.category] ?? UPDATED.drill,
      'monthly',
      DRILL_PRIORITY_OVERRIDES[drill.href] ?? DRILL_PRIORITY[drill.category] ?? 0.5
    )
  );

  return [...staticEntries, ...drillEntries];
}
