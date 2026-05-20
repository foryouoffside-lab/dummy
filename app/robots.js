

const BASE_URL = 'https://skilldrills.online';

export default function robots() {
  return {
    rules: [
   {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',           // API routes (no SEO value)
          '/_next/',         // Next.js internal build files
          '/node_modules/',  // Dependencies
          '/.vercel/',       // Vercel deployment files
          '/lib/',           // Utility functions
          '/styles/',        // CSS files
        ],
        crawlDelay: 0,      // Google prefers no delay
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/lib/', '/styles/', '/.vercel/', '/node_modules/'],
        crawlDelay: 1,      // 1 second between requests
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/lib/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
        disallow: ['/api/', '/_next/', '/lib/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'YandexBot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/lib/'],
        crawlDelay: 2,
      },
      {
        userAgent: 'Slurp', // Yahoo
        allow: '/',
        disallow: ['/api/', '/_next/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Applebot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
        crawlDelay: 0,
      },

      // ============================================
      // SOCIAL MEDIA CRAWLERS (FULL ACCESS)
      // ============================================
      {
        userAgent: 'Facebot',       // Facebook
        allow: '/',
        disallow: ['/api/', '/_next/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
        disallow: ['/api/', '/_next/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'Discordbot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'TelegramBot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'WhatsApp',
        allow: '/',
        disallow: ['/api/', '/_next/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Slackbot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
        crawlDelay: 0,
      },

      // ============================================
      // MOBILE & APP CRAWLERS
      // ============================================
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: ['/api/', '/_next/', '/lib/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Googlebot-Video',
        allow: '/',
        disallow: ['/api/', '/_next/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Googlebot-Mobile',
        allow: '/',
        disallow: ['/api/', '/_next/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'AdsBot-Google',
        allow: '/',
        disallow: ['/api/', '/_next/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Mediapartners-Google',
        allow: '/',
        disallow: ['/api/', '/_next/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Pinterestbot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'RedditBot',
        allow: '/',
        disallow: ['/api/', '/_next/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Tumblr',
        allow: '/',
        disallow: ['/api/', '/_next/'],
        crawlDelay: 1,
      },

      // ============================================
      // DEFAULT RULE FOR ALL OTHER LEGITIMATE BOTS
      // ============================================
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/node_modules/',
          '/.vercel/',
          '/lib/',
          '/styles/',
        ],
        crawlDelay: 2,
      },

      // ============================================
      // AI TRAINING BOTS - FULLY BLOCKED
      // Protects your content from being used to train AI models
      // ============================================
      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'ChatGPT-User', disallow: '/' },
      { userAgent: 'OAI-SearchBot', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },
      { userAgent: 'Google-Extended', disallow: '/' },
      { userAgent: 'GoogleOther', disallow: '/' },
      { userAgent: 'GoogleOther-Image', disallow: '/' },
      { userAgent: 'GoogleOther-Video', disallow: '/' },
      { userAgent: 'anthropic-ai', disallow: '/' },
      { userAgent: 'Claude-Web', disallow: '/' },
      { userAgent: 'ClaudeBot', disallow: '/' },
      { userAgent: 'Bytespider', disallow: '/' },
      { userAgent: 'Meta-ExternalAgent', disallow: '/' },
      { userAgent: 'Meta-ExternalFetcher', disallow: '/' },
      { userAgent: 'cohere-ai', disallow: '/' },
      { userAgent: 'PerplexityBot', disallow: '/' },
      { userAgent: 'YouBot', disallow: '/' },
      { userAgent: 'Amazonbot', disallow: '/' },
      { userAgent: 'Applebot-Extended', disallow: '/' },
      { userAgent: 'omgili', disallow: '/' },
      { userAgent: 'omgilibot', disallow: '/' },
      { userAgent: 'magpie-crawler', disallow: '/' },
      { userAgent: 'ImagesiftBot', disallow: '/' },
      { userAgent: 'Diffbot', disallow: '/' },
      { userAgent: 'peer39_crawler', disallow: '/' },

      // ============================================
      // SEO & MARKETING TOOLS - BLOCKED
      // These tools analyze your site to sell data to competitors
      // ============================================
      { userAgent: 'AhrefsBot', disallow: '/' },
      { userAgent: 'SemrushBot', disallow: '/' },
      { userAgent: 'SemrushBot-BA', disallow: '/' },
      { userAgent: 'SemrushBot-SI', disallow: '/' },
      { userAgent: 'SemrushBot-SWA', disallow: '/' },
      { userAgent: 'MJ12bot', disallow: '/' },
      { userAgent: 'DotBot', disallow: '/' },
      { userAgent: 'DataForSeoBot', disallow: '/' },
      { userAgent: 'SimilarWeb', disallow: '/' },
      { userAgent: 'Timpibot', disallow: '/' },
      { userAgent: 'ContentKing', disallow: '/' },
      { userAgent: 'PiplBot', disallow: '/' },
      { userAgent: 'BLEXBot', disallow: '/' },
      { userAgent: 'SeekportBot', disallow: '/' },
      { userAgent: 'Serpstatbot', disallow: '/' },
      { userAgent: 'MozDotbot', disallow: '/' },
      { userAgent: 'Rogerbot', disallow: '/' },
      { userAgent: 'Uptimebot', disallow: '/' },
      { userAgent: 'meanpathbot', disallow: '/' },
      { userAgent: 'GrapeshotCrawler', disallow: '/' },

      // ============================================
      // UNWANTED / AGGRESSIVE BOTS - BLOCKED
      // ============================================
      { userAgent: 'PetalBot', disallow: '/' },
      { userAgent: 'YisouSpider', disallow: '/' },
      { userAgent: 'Sogou', disallow: '/' },
      { userAgent: 'Linespider', disallow: '/' },
      { userAgent: 'UptimeRobot', disallow: '/' },
      { userAgent: 'Brandwatch', disallow: '/' },
      { userAgent: 'LinkWalker', disallow: '/' },
      { userAgent: 'ScoutJet', disallow: '/' },
      { userAgent: 'Nutch', disallow: '/' },
      { userAgent: 'Screaming Frog', disallow: '/' },
      { userAgent: 'Xenu Link Sleuth', disallow: '/' },
      { userAgent: 'MegaIndex', disallow: '/' },
      { userAgent: 'BUbiNG', disallow: '/' },
      { userAgent: 'ZoominfoBot', disallow: '/' },
      { userAgent: 'SEOkicks', disallow: '/' },
      { userAgent: 'Exabot', disallow: '/' },
      { userAgent: 'DomainCrawler', disallow: '/' },
      { userAgent: 'Mail.RU_Bot', disallow: '/' },
      { userAgent: 'LinkpadBot', disallow: '/' },
      { userAgent: 'NetcraftSurveyAgent', disallow: '/' },

      // ============================================
      // SCRAPERS & AUTOMATED TOOLS - BLOCKED
      // ============================================
      { userAgent: 'wget', disallow: '/' },
      { userAgent: 'curl', disallow: '/' },
      { userAgent: 'python-requests', disallow: '/' },
      { userAgent: 'python-urllib', disallow: '/' },
      { userAgent: 'Go-http-client', disallow: '/' },
      { userAgent: 'Java/', disallow: '/' },
      { userAgent: 'PHP/', disallow: '/' },
      { userAgent: 'HTTrack', disallow: '/' },
      { userAgent: 'WebCopier', disallow: '/' },
      { userAgent: 'SiteSucker', disallow: '/' },
      { userAgent: 'TeleportPro', disallow: '/' },
      { userAgent: 'GetRight', disallow: '/' },
      { userAgent: 'WebZIP', disallow: '/' },
      { userAgent: 'Offline Explorer', disallow: '/' },
      { userAgent: 'WebStripper', disallow: '/' },
      { userAgent: 'WebCopier', disallow: '/' },
      { userAgent: 'Website Downloader', disallow: '/' },
      { userAgent: 'InternetSeer', disallow: '/' },
    ],
    
    // ============================================
    // SITEMAP LOCATION
    // ============================================
    sitemap: `${BASE_URL}/sitemap.xml`,
    
    // ============================================
    // HOST DECLARATION
    // ============================================
    host: BASE_URL,
  };
}

// ============================================
// ROBOTS.TXT SUMMARY:
// ============================================
// 
// ALLOWED (Full crawl access):
// ✅ Google, Bing, DuckDuckGo, Baidu, Yandex, Yahoo
// ✅ Facebook, Twitter/X, LinkedIn, Discord, Telegram
// ✅ Google Images, Google Videos, Google Ads
// ✅ Pinterest, Reddit, Tumblr, Slack
// ✅ All major social media preview crawlers
//
// DISALLOWED (No crawl access):
// ❌ /api/ - API routes
// ❌ /_next/ - Build files
// ❌ /lib/ - Server utilities
// ❌ /styles/ - CSS files
// ❌ /node_modules/ - Dependencies
// ❌ /.vercel/ - Deployment files
//
// BLOCKED ENTIRELY:
// 🚫 25+ AI training bots (GPTBot, CCBot, Google-Extended, etc.)
// 🚫 20+ SEO/marketing tools (Ahrefs, Semrush, Moz, etc.)
// 🚫 15+ Scrapers & downloaders (wget, curl, HTTrack, etc.)
// 🚫 10+ Aggressive/unwanted bots
//
// ============================================