const BASE_URL = 'https://skilldrills.online';

// Only these paths are genuinely worth hiding. Everything else must be
// crawlable — including /_next/, which holds the JS and CSS Google needs to
// render the page. Blocking /_next/ is what kept the hub pages stuck around
// position 30: the crawler could not load the bundle, so it only ever saw the
// loading skeleton. See SEO_PROGRESS.md.
const PRIVATE_PATHS = ['/api/', '/.vercel/'];

// Search crawlers. Full access, no crawl delay for the ones that respect it —
// a delay only slows down discovery of new drills.
const SEARCH_BOTS = [
  'Googlebot',
  'Googlebot-Image',
  'Googlebot-Video',
  'Googlebot-Mobile',
  'AdsBot-Google',
  'Mediapartners-Google',
  'GoogleOther',
  'Bingbot',
  'DuckDuckBot',
  'Baiduspider',
  'YandexBot',
  'Slurp',
  'Applebot',
];

// AI answer engines. These are how the site gets recommended when someone asks
// an assistant for drill/aim-training practice, so they are deliberately
// allowed. Note the distinction: OAI-SearchBot, PerplexityBot and
// Claude-SearchBot build *search* indexes rather than training corpora, and
// Google-Extended governs AI Overviews. Blocking any of them removes the site
// from those answers entirely.
const AI_BOTS = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'Google-Extended',
  'Applebot-Extended',
  'cohere-ai',
  'YouBot',
  'Amazonbot',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'CCBot',
];

// Social preview crawlers — these generate link cards, so they need the page.
const SOCIAL_BOTS = [
  'facebookexternalhit',
  'Facebot',
  'Twitterbot',
  'LinkedInBot',
  'Discordbot',
  'TelegramBot',
  'WhatsApp',
  'Slackbot',
  'Pinterestbot',
  'RedditBot',
];

// Blocked: aggressive crawlers and content scrapers that cost bandwidth
// without sending traffic. None of this affects Google rankings either way.
//
// Ahrefs and Semrush are deliberately NOT blocked. Blocking them also blocked
// the site owner from auditing their own site and from seeing their own
// backlink profile, and link acquisition is the actual growth constraint here
// (every non-brand query sits at position 45-78). The tradeoff is that
// competitors can see the same data; that is worth less than the visibility.
const BLOCKED_BOTS = [
  'MJ12bot',
  'DotBot',
  'DataForSeoBot',
  'BLEXBot',
  'Serpstatbot',
  'SeekportBot',
  'MegaIndex',
  'SEOkicks',
  'LinkpadBot',
  'DomainCrawler',
  'ZoominfoBot',
  'PetalBot',
  'YisouSpider',
  'Bytespider',
  'ImagesiftBot',
  'Diffbot',
  'omgili',
  'omgilibot',
  'magpie-crawler',
  'HTTrack',
  'WebCopier',
  'WebZIP',
  'WebStripper',
  'TeleportPro',
  'SiteSucker',
  'Offline Explorer',
  'Website Downloader',
];

export default function robots() {
  const allow = (userAgent) => ({
    userAgent,
    allow: '/',
    disallow: PRIVATE_PATHS,
  });

  return {
    rules: [
      ...SEARCH_BOTS.map(allow),
      ...AI_BOTS.map(allow),
      ...SOCIAL_BOTS.map(allow),

      // Everything not named above still gets in — an unknown crawler is more
      // likely to be a new search engine than a threat.
      { userAgent: '*', allow: '/', disallow: PRIVATE_PATHS },

      ...BLOCKED_BOTS.map((userAgent) => ({ userAgent, disallow: '/' })),
    ],

    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
