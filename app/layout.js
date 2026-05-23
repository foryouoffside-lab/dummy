import './../styles/globals.css';
import { Inter } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: true,
});

export const metadata = {
  title: {
    default: 'SkillDrills - Free FPS Aim Trainer & Cognitive Brain Training Platform',
    template: '%s',
  },
  description: 'Master your mind and mechanics with 90+ free online training drills. Improve FPS aim, reaction time, memory, focus, typing speed, and cognitive skills. No sign-up required. Practice directly in your browser.',
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
    'typing speed test', 'free typing test online', 'speed reading practice',
    'reading comprehension drills', 'mental math practice', 'math speed test',
    'free LSAT practice', 'GMAT verbal practice', 'critical reasoning practice',
    'logic puzzles online', 'free sudoku', 'problem solving exercises',
    'logical reasoning test', 'critical thinking exercises', 'analytical reasoning',
    'focus timer', 'deep work timer', 'pomodoro timer free', 'productivity tools',
    'concentration exercises', 'flow state training', 'task switching practice',
    'hand eye coordination test', 'mouse precision trainer', 'visual tracking exercises',
    'peripheral vision test', 'depth perception test', 'reaction speed test',
    'breathing exercises online', 'stress management tools', 'box breathing timer',
    'mental fitness training', 'biofeedback training free',
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
    description: 'Master your mind and mechanics. 90+ free drills for FPS gaming, cognitive enhancement, memory, typing speed, and mental fitness. No sign-up, instant browser access.',
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
    description: '90+ free drills. FPS aim trainer, brain games, memory exercises, typing tests. No sign-up.',
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
    <html lang="en" className="scroll-smooth">
      <head>
        {/* DNS Prefetch for faster connections */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//cdn.vercel-insights.com" />
        
        {/* Preconnect for critical origins */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.vercel-insights.com" crossOrigin="anonymous" />
        
        {/* Favicon & Icons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.svg" />
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
      <body className={`${inter.className} antialiased`}>
        <main id="main-content">
          {children}
        </main>
        <Analytics />
        <SpeedInsights />
        
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SkillDrills",
              "url": "https://skilldrills.online",
              "logo": "https://skilldrills.online/icons/icon-512x512.png",
              "description": "Free online platform with 90+ training drills for FPS gaming skills, cognitive enhancement, brain training, memory improvement, typing speed, and mental fitness.",
              "email": "support@skilldrills.online",
              "foundingDate": "2026",
              "slogan": "Master Your Mind & Mechanics",
              "areaServed": { "@type": "World", "name": "Worldwide" },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://skilldrills.online/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "SkillDrills",
              "url": "https://skilldrills.online",
              "inLanguage": "en",
              "isAccessibleForFree": true,
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://skilldrills.online/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />

        {/* SiteNavigationElement Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SiteNavigationElement",
              "name": "SkillDrills Main Navigation",
              "url": "https://skilldrills.online",
              "hasPart": [
                { "@type": "SiteNavigationElement", "position": 1, "name": "FPS Training", "url": "https://skilldrills.online/drills/fps" },
                { "@type": "SiteNavigationElement", "position": 2, "name": "Cognitive Training", "url": "https://skilldrills.online/drills/cognitive" },
                { "@type": "SiteNavigationElement", "position": 3, "name": "Academic Drills", "url": "https://skilldrills.online/drills/academic" },
                { "@type": "SiteNavigationElement", "position": 4, "name": "Memory Games", "url": "https://skilldrills.online/drills/memory" },
                { "@type": "SiteNavigationElement", "position": 5, "name": "Visual Training", "url": "https://skilldrills.online/drills/visual" },
                { "@type": "SiteNavigationElement", "position": 6, "name": "Motor Skills", "url": "https://skilldrills.online/drills/motor" },
                { "@type": "SiteNavigationElement", "position": 7, "name": "Productivity", "url": "https://skilldrills.online/drills/productivity" },
                { "@type": "SiteNavigationElement", "position": 8, "name": "Mental Fitness", "url": "https://skilldrills.online/drills/mental-fitness" },
                { "@type": "SiteNavigationElement", "position": 9, "name": "Physical Training", "url": "https://skilldrills.online/drills/physical" }
              ]
            })
          }}
        />
      </body>
    </html>
  );
}