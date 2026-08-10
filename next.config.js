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
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          {
            key: 'Content-Security-Policy',
            // 'unsafe-eval' is only needed by next dev's HMR/react-refresh — the
            // production client bundle doesn't eval, so drop it outside dev.
            value: `default-src 'self'; script-src 'self' ${process.env.NODE_ENV === 'production' ? '' : "'unsafe-eval' "}'unsafe-inline' https://cdn.vercel-insights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://cdn.vercel-insights.com https://vitals.vercel-insights.com https://api.indexnow.org; media-src 'self';`
          },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        ],
      },
      {
        source: '/icons/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
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