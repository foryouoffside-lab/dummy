/** @type {import('next').NextConfig} */

const nextConfig = {
  // ============================================
  // CORE CONFIG
  // ============================================
  
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  
  // ============================================
  // COMPILER OPTIMIZATIONS
  // ============================================
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // ============================================
  // SECURITY HEADERS
  // ============================================
  
  async headers() {
    const isProd = process.env.NODE_ENV === 'production';

    // 'unsafe-inline' stays in script-src: Next.js emits inline bootstrap and
    // flight-data scripts on every page and there is no nonce plumbing here.
    // 'unsafe-eval' is only needed by next dev's HMR/react-refresh.
    const csp = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isProd ? '' : " 'unsafe-eval'"} https://cdn.vercel-insights.com`,
      "style-src 'self' 'unsafe-inline'",
      // All imagery is first-party or a build-time OG image; data: covers the
      // inline SVG icons. No remote host needs to be allowed.
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self' https://cdn.vercel-insights.com https://vitals.vercel-insights.com",
      "media-src 'self'",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
      // Nothing on the site embeds or is embedded.
      "frame-src 'none'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      // Stops an injected <base> from re-pointing every relative URL, and stops
      // an injected form from posting somewhere else.
      "base-uri 'self'",
      "form-action 'self'",
      'upgrade-insecure-requests',
    ].join('; ');

    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          // Explicitly 0, not 1. The legacy XSS auditor is removed from modern
          // browsers and its filter was itself exploitable; CSP frame-ancestors
          // and object-src above are the real protection.
          { key: 'X-XSS-Protection', value: '0' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'accelerometer=(), autoplay=(self), camera=(), display-capture=(), encrypted-media=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), usb=(), xr-spatial-tracking=(), interest-cohort=()',
          },
          { key: 'Content-Security-Policy', value: csp },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
      {
        // The site currently ships no API routes at all — the IndexNow relay was
        // deleted once it turned out `scripts/notify-indexnow.js` (postbuild)
        // covered every real use. This rule is kept deliberately so that any
        // route added later is no-store and noindex by default rather than by
        // someone remembering to set it.
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
      {
        source: '/icons/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'Cross-Origin-Resource-Policy', value: 'cross-origin' },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
  
  // ============================================
  // SEO REDIRECTS & REWRITES
  // ============================================
  
  async redirects() {
    return [
      // ------------------------------------------------------------------
      // Retired sections. These URLs were deleted from the app but are still
      // indexed and still earning impressions (measured in Search Console
      // 2026-08-21: /drills/academic 185 impr @ pos 9.7, /drills/productivity
      // 39 impr, inference-drill 11 impr, /drills/mental-fitness 8 impr --
      // 243 impressions and 8 clicks landing on 404s). 301 them to the nearest
      // live equivalent so the ranking equity transfers instead of decaying.
      // Most specific first: Next matches redirects in array order.
      // ------------------------------------------------------------------
      {
        source: '/drills/academic/reading-speed/rsvp-reader',
        destination: '/drills/cognitive/processing-speed/rsvp-reader',
        permanent: true,
      },
      { source: '/drills/academic', destination: '/drills/cognitive', permanent: true },
      { source: '/drills/academic/:path*', destination: '/drills/cognitive', permanent: true },
      { source: '/drills/productivity', destination: '/drills/cognitive', permanent: true },
      { source: '/drills/productivity/:path*', destination: '/drills/cognitive', permanent: true },
      { source: '/drills/mental-fitness', destination: '/drills', permanent: true },
      { source: '/drills/mental-fitness/:path*', destination: '/drills', permanent: true },

      // ------------------------------------------------------------------
      // Retired individual drills. Found 2026-08-25 by cross-checking every
      // URL Bing Webmaster Tools reports impressions for against the route
      // tree on disk, then confirming each one live: 27 URLs returning 404
      // while still carrying 95 Bing impressions and 7 clicks. They are also
      // a standing crawl-budget leak -- Bing logged 638 4xx responses and
      // 1,891 crawl errors over 103 days. Each goes to the nearest live drill
      // rather than a hub where a real equivalent exists, so the redirect
      // still answers the query the visitor typed.
      // ------------------------------------------------------------------
      { source: '/drills/cognitive/attention/sustained-attention', destination: '/drills/cognitive/attention/concentration-stamina', permanent: true },
      { source: '/drills/cognitive/attention/switch-cost', destination: '/drills/cognitive/attention/multi-tasking', permanent: true },
      { source: '/drills/cognitive/focus/focus-timer', destination: '/drills/cognitive/attention/concentration-stamina', permanent: true },
      { source: '/drills/cognitive/memory/number-recall', destination: '/drills/memory/short-term-memory/digit-span', permanent: true },
      { source: '/drills/cognitive/memory/card-matching', destination: '/drills/memory/spatial-memory/object-location', permanent: true },
      { source: '/drills/cognitive/memory/pattern-recognition', destination: '/drills/memory', permanent: true },
      { source: '/drills/motor/hand-eye-coordination/click-accuracy', destination: '/drills/motor/hand-eye-coordination/aim-trainer', permanent: true },
      { source: '/drills/motor/precision-control/fine-motor', destination: '/drills/motor/precision-control/steady-hand', permanent: true },
      { source: '/drills/motor/movement-speed/gesture-speed', destination: '/drills/motor/movement-speed/finger-sequencing', permanent: true },
      { source: '/drills/motor/timing-accuracy/rhythm-tap', destination: '/drills/visual/visual-recognition/rhythm-anomaly', permanent: true },
      { source: '/drills/motor/timing-accuracy/synchronization', destination: '/drills/visual/visual-recognition/rhythm-anomaly', permanent: true },
      { source: '/drills/motor/timing-accuracy/stopwatch-click', destination: '/drills/motor/movement-speed/rapid-tapping', permanent: true },
      { source: '/drills/memory/working-memory/sentence-span', destination: '/drills/memory/short-term-memory/word-recall', permanent: true },
      { source: '/drills/memory/working-memory/mental-arithmetic', destination: '/drills/memory/working-memory/n-back', permanent: true },
      { source: '/drills/memory/long-term-memory/image-association', destination: '/drills/memory/spatial-memory/object-location', permanent: true },
      { source: '/drills/memory/associative-memory/name-face', destination: '/drills/memory/spatial-memory/object-location', permanent: true },
      { source: '/drills/memory/associative-memory/sound-pattern', destination: '/drills/memory/short-term-memory/color-sequence', permanent: true },
      { source: '/drills/memory/associative-memory/concept-linking', destination: '/drills/memory', permanent: true },
      { source: '/drills/physical/balance-training/dynamic-balance', destination: '/drills/physical/balance-training/stability-challenge', permanent: true },
      { source: '/drills/visual/peripheral-vision/peripheral-flash', destination: '/drills/visual-tracking/peripheral-ping-pursuit', permanent: true },
      { source: '/drills/visual-tracking/stop-and-go-dash', destination: '/drills/visual-tracking/dynamic-evasion-pursuit', permanent: true },
      { source: '/drills/fps/240fps-click-test', destination: '/drills/motor/movement-speed/rapid-tapping', permanent: true },
      { source: '/drills/fps/reactive-sphere-tracking', destination: '/drills/fps/strafe-tracking', permanent: true },
      { source: '/drills/fps/reactive-tracking', destination: '/drills/fps/strafe-tracking', permanent: true },
      { source: '/drills/cognitive/problem-solving/logic-puzzles', destination: '/drills/cognitive', permanent: true },

      // Whole subtrees that no longer exist. These sit after the specific
      // rules above because Next matches redirects in array order.
      { source: '/drills/motor/timing-accuracy/:path*', destination: '/drills/motor', permanent: true },
      { source: '/drills/memory/associative-memory/:path*', destination: '/drills/memory', permanent: true },
      { source: '/drills/memory/long-term-memory/:path*', destination: '/drills/memory', permanent: true },
      { source: '/drills/cognitive/memory/:path*', destination: '/drills/memory', permanent: true },
      { source: '/drills/cognitive/problem-solving/:path*', destination: '/drills/cognitive', permanent: true },
      { source: '/drills/visual/peripheral-vision/:path*', destination: '/drills/visual', permanent: true },

      // NOTE: do not try to fix mixed-case 404s here. Bing crawled
      // /drills/physical/Reflex-Training/quick-dodge (2 impressions) and got a
      // 404 because Next's *route* matching is case-sensitive. The obvious fix
      // -- a redirect from the mixed-case path to the lower-case one -- is a
      // trap: Next matches *redirect* sources case-INSENSITIVELY, so that rule
      // also matches the real lower-case URL and 308s it to itself forever.
      // Verified against a production build: it put a live drill page into an
      // infinite redirect loop. If mixed-case URLs ever matter enough to fix,
      // do it in middleware where the incoming casing can actually be tested.

      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
      {
        source: '/drills/:category*/',
        destination: '/drills/:category*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.skilldrills.online' }],
        destination: 'https://skilldrills.online/:path*',
        permanent: true,
      },
    ];
  },
  
  async rewrites() {
    return [
      { source: '/sitemap.xml', destination: '/sitemap' },
      { source: '/robots.txt', destination: '/robots' },
    ];
  },
  
  // ============================================
  // IMAGE OPTIMIZATION
  // ============================================
  
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'skilldrills.online' },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // ============================================
  // EXPERIMENTAL (Next.js 15 compatible)
  // ============================================
  
  experimental: {
    optimizeCss: false,
    optimizePackageImports: [
      'lucide-react', 
      '@vercel/analytics',
      '@vercel/speed-insights',
    ],
  },
  
  // ============================================
  // WEBPACK SPLIT CHUNKS (Reduces TBT)
  // ============================================
  
  webpack: (config, { isServer, dev }) => {
    return config;
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  // ============================================
  // OUTPUT
  // ============================================
  
  output: 'standalone',
  outputFileTracingRoot: __dirname,
};

module.exports = nextConfig;