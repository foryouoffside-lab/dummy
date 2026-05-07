const BASE_URL = 'https://skilldrills.online';

export default function robots() {
  return {
    rules: [
      // ========== MAIN SEARCH CRAWLERS ==========
      { 
        userAgent: 'Googlebot', 
        allow: '/', 
        disallow: ['/api/', '/_next/', '/lib/', '/styles/', '/.vercel/', '/node_modules/'], 
        crawlDelay: 0 
      },
      { 
        userAgent: 'Bingbot', 
        allow: '/', 
        disallow: ['/api/', '/_next/', '/lib/', '/styles/', '/.vercel/'], 
        crawlDelay: 1 
      },
      { 
        userAgent: 'DuckDuckBot', 
        allow: '/', 
        disallow: ['/api/', '/_next/'], 
        crawlDelay: 0 
      },
      { 
        userAgent: 'Baiduspider', 
        allow: '/', 
        disallow: ['/api/', '/_next/', '/lib/'], 
        crawlDelay: 1 
      },
      { 
        userAgent: 'YandexBot', 
        allow: '/', 
        disallow: ['/api/', '/_next/'], 
        crawlDelay: 2 
      },
      { 
        userAgent: 'Slurp', // Yahoo
        allow: '/', 
        disallow: ['/api/', '/_next/'], 
        crawlDelay: 1 
      },
      { 
        userAgent: 'Applebot', 
        allow: '/', 
        disallow: ['/api/', '/_next/'], 
        crawlDelay: 0 
      },
      { 
        userAgent: 'Facebot', // Facebook
        allow: '/', 
        disallow: ['/api/', '/_next/'], 
        crawlDelay: 1 
      },
      { 
        userAgent: 'Twitterbot', 
        allow: '/', 
        disallow: ['/api/', '/_next/'], 
        crawlDelay: 1 
      },

      // ========== DEFAULT RULE FOR ALL OTHER BOTS ==========
      { 
        userAgent: '*', 
        allow: '/', 
        disallow: ['/api/', '/_next/', '/node_modules/', '/.vercel/', '/lib/', '/styles/'], 
        crawlDelay: 2 
      },

      // ========== AI TRAINING BOTS - FULLY BLOCKED ==========
      { userAgent: 'GPTBot', disallow: '/' },
      { userAgent: 'ChatGPT-User', disallow: '/' },
      { userAgent: 'OAI-SearchBot', disallow: '/' },
      { userAgent: 'CCBot', disallow: '/' },
      { userAgent: 'Google-Extended', disallow: '/' },
      { userAgent: 'GoogleOther', disallow: '/' },
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

      // ========== SEO/MARKETING CRAWLERS - BLOCKED ==========
      { userAgent: 'DataForSeoBot', disallow: '/' },
      { userAgent: 'SimilarWeb', disallow: '/' },
      { userAgent: 'AhrefsBot', disallow: '/' },
      { userAgent: 'SemrushBot', disallow: '/' },
      { userAgent: 'MJ12bot', disallow: '/' },
      { userAgent: 'DotBot', disallow: '/' },
      { userAgent: 'Timpibot', disallow: '/' },
      { userAgent: 'ContentKing', disallow: '/' },
      { userAgent: 'PiplBot', disallow: '/' },
      { userAgent: 'BLEXBot', disallow: '/' },
      { userAgent: 'SeekportBot', disallow: '/' },

      // ========== ADDITIONAL UNWANTED BOTS ==========
      { userAgent: 'PetalBot', disallow: '/' },
      { userAgent: 'YisouSpider', disallow: '/' },
      { userAgent: 'Sogou', disallow: '/' },
      { userAgent: 'Linespider', disallow: '/' },
      { userAgent: 'UptimeRobot', disallow: '/' },
      { userAgent: 'Brandwatch', disallow: '/' },
      { userAgent: 'LinkWalker', disallow: '/' },
      { userAgent: 'ScoutJet', disallow: '/' },
      { userAgent: 'wget', disallow: '/' },
      { userAgent: 'curl', disallow: '/' },
      { userAgent: 'python-requests', disallow: '/' },
      { userAgent: 'Go-http-client', disallow: '/' },
      { userAgent: 'HTTrack', disallow: '/' },
      { userAgent: 'WebCopier', disallow: '/' },
      { userAgent: 'SiteSucker', disallow: '/' },
      { userAgent: 'TeleportPro', disallow: '/' },
      { userAgent: 'GetRight', disallow: '/' },
      { userAgent: 'WebZIP', disallow: '/' },
      { userAgent: 'Offline Explorer', disallow: '/' },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}