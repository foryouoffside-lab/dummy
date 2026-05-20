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
          // Security
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          
          // CSP (fixes "Ensure CSP is effective against XSS" audit)
          { 
            key: 'Content-Security-Policy', 
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.vercel-insights.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; media-src 'self';" 
          },
          
          // HSTS (fixes "Use strong HSTS policy" audit)
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          
          // Cross-Origin isolation (fixes COOP audit)
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          
          // Remove HTML caching header from main pages (it was blocking fresh content)
        ],
      },
      // Static assets: long cache
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
  // EXPERIMENTAL OPTIMIZATIONS
  // ============================================
  
  experimental: {
    optimizeCss: true,
    legacyBrowsers: false,          // 🔥 Skips legacy JS for modern browsers
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
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        chunks: 'all',
        cacheGroups: {
          // Separate lucide-react (huge icon library)
          icons: {
            test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
            name: 'icons',
            chunks: 'all',
            priority: 20,
            reuseExistingChunk: true,
          },
          // Other vendor libraries
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
          },
          // Common shared code
          common: {
            name: 'common',
            minChunks: 3,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      };
      // Enable tree shaking
      config.optimization.usedExports = true;
      config.optimization.sideEffects = true;
    }
    return config;
  },
  
  // ============================================
  // OUTPUT
  // ============================================
  
  output: 'standalone',
  swcMinify: true,
};

module.exports = nextConfig;