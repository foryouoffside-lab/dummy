import './../styles/globals.css';
import { Inter } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import SiteHeader from '@/components/SiteHeader';
import ZoomGuard from '@/components/ZoomGuard';
import AutoLanguageDetector from '@/components/AutoLanguageDetector';
import SiteSchemas from '@/components/SiteSchemas';
import { DRILLS } from '@/lib/drillsRegistry';

const totalDrillsCount = DRILLS.length;

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
  variable: '--font-inter',
});

export const metadata = {
  title: {
    default: 'SkillDrills - Free FPS Aim Trainer & Cognitive Brain Training Platform',
    template: '%s',
  },
  description: `Master your mind and mechanics with ${totalDrillsCount} free online training drills. Improve FPS aim, reaction time, memory, focus, and cognitive skills. No sign-up required. Practice directly in your browser.`,
  keywords: [
    'free aim trainer', 'FPS aim trainer', 'aim trainer online', 'flick shot training',
    'tracking aim trainer', 'reaction time test', 'headshot trainer', 'mouse accuracy trainer',
    'Valorant aim trainer', 'CS2 aim practice', 'Apex aim training', 'gaming skills trainer',
    'esports training', 'free FPS drills', 'reflex test online',
    'brain training', 'cognitive training', 'brain games free', 'mental exercises',
    'memory games', 'focus training', 'attention span training', 'working memory exercises',
    'cognitive assessment', 'neuroplasticity training', 'brain fitness', 'mental agility',
    'memory improvement', 'short term memory test', 'spatial memory games',
    'memory recall practice', 'pattern recognition test', 'digit span test',
    'focus timer', 'deep work timer', 'flow state training',
    'concentration exercises', 'task switching practice',
    'hand eye coordination test', 'mouse precision trainer', 'visual tracking exercises',
    'peripheral vision test', 'depth perception test', 'reaction speed test',
    'free online drills', 'skill training platform', 'free brain training website',
    'cognitive skill development', 'online practice exercises', 'skilldrills',
  ],
  authors: [{ name: 'SkillDrills', url: 'https://skilldrills.online' }],
  creator: 'SkillDrills',
  publisher: 'SkillDrills',
  metadataBase: new URL('https://skilldrills.online'),
  verification: {
    google: 'bf3e19be4c41802b',
  },
  openGraph: {
    title: 'SkillDrills - Free FPS Aim Trainer & Cognitive Brain Training Platform',
    description: `Master your mind and mechanics. ${totalDrillsCount} free drills for FPS gaming, cognitive enhancement, memory, and reflex fitness. No sign-up, instant browser access.`,
    url: 'https://skilldrills.online',
    siteName: 'SkillDrills',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'SkillDrills - Free Brain Training & FPS Aim Platform',
    }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkillDrills - Free FPS Aim & Brain Training',
    description: `${totalDrillsCount} free drills. FPS aim trainer, brain games, memory exercises, reflex tests. No sign-up.`,
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://skilldrills.online',
  },
  appleWebApp: {
    capable: true,
    title: 'SkillDrills',
    statusBarStyle: 'black-translucent',
  },
  manifest: '/manifest.json',
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth font-sans ${inter.variable}`}>
      <head>
        {/* next/font/google self-hosts Inter at build time, so nothing is ever
            fetched from fonts.googleapis.com or fonts.gstatic.com at runtime.
            Preconnecting to them opened TLS connections that were never used
            and that the CSP would block anyway. Only the insights origin is
            genuinely contacted. */}
        <link rel="dns-prefetch" href="//cdn.vercel-insights.com" />
        <link rel="preconnect" href="https://cdn.vercel-insights.com" crossOrigin="anonymous" />
        
        {/* Favicon & Icons — the SVG is the crisp one browsers prefer; the PNG
            and .ico stay as the fallback for clients that ignore SVG icons. */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/icons/icon-192x192.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
        
        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="SkillDrills" />
        
        {/* Preload critical image */}
        <link rel="preload" href="/icons/icon-512x512.png" as="image" type="image/png" />
        
        {/* Google verification */}
        <meta name="google-site-verification" content="bf3e19be4c41802b" />
        
        {/* General meta */}
        <meta name="author" content="SkillDrills" />
        <meta name="language" content="English" />
        <meta name="rating" content="general" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ZoomGuard />
        <SiteHeader />
        <AutoLanguageDetector />
        <main id="main-content">
          {children}
        </main>
        
        <Analytics />
        <SpeedInsights />
        
        <SiteSchemas totalDrillsCount={totalDrillsCount} />
      </body>
    </html>
  );
}
