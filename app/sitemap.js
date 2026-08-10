// app/sitemap.js
// Dynamic XML Sitemap - Auto-generated
// Auto-submitted to Google Search Console for indexing

import { DRILLS } from '../lib/drillsRegistry';

const BASE_URL = 'https://skilldrills.online';

const categoryPages = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/drills/cognitive', priority: 0.9, changefreq: 'weekly' },
  { path: '/drills/fps', priority: 0.9, changefreq: 'weekly' },
  { path: '/drills/memory', priority: 0.9, changefreq: 'weekly' },
  { path: '/drills/motor', priority: 0.9, changefreq: 'weekly' },
  { path: '/drills/physical', priority: 0.9, changefreq: 'weekly' },
  { path: '/drills/visual', priority: 0.9, changefreq: 'weekly' },
  { path: '/drills/visual-tracking', priority: 0.9, changefreq: 'weekly' },
  { path: '/drills', priority: 0.9, changefreq: 'weekly' },
  { path: '/drills/reaction-speed', priority: 0.9, changefreq: 'weekly' },
];

// Drill URLs are derived from DRILLS (lib/drillsRegistry.js) — the single source
// of truth also used by the drill hubs and search — so a deleted or renamed drill
// can never leave a stale entry here again.
const CATEGORY_PRIORITY = {
  fps: 1,
  motor: 0.9,
  physical: 0.9,
  cognitive: 0.85,
  memory: 0.85,
  'reaction-speed': 0.85,
  visual: 0.85,
  'visual-tracking': 0.85,
};

// Bump this only when real site content actually changes (a drill added/edited,
// copy rewritten, etc). Do NOT compute this from the current date at build time —
// a lastModified that's always "today" gets discounted by search engines as a
// meaningless freshness signal.
const SITE_CONTENT_UPDATED = '2026-08-10';

export default async function sitemap() {
  const categoryEntries = categoryPages.map((page) => ({
    url: `${BASE_URL}${page.path}`,
    lastModified: SITE_CONTENT_UPDATED,
    changeFrequency: page.changefreq,
    priority: page.priority,
  }));

  const drillEntries = DRILLS.map((drill) => ({
    url: `${BASE_URL}${drill.href}`,
    lastModified: SITE_CONTENT_UPDATED,
    changeFrequency: 'weekly',
    priority: CATEGORY_PRIORITY[drill.category] ?? 0.85,
  }));

  return [...categoryEntries, ...drillEntries];
}
