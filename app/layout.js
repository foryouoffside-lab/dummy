// app/layout.js
import './../styles/globals.css';
import { Inter } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Optimized font loading - subset to Latin only, swap for no FOIT
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',           // Show fallback font immediately
  preload: true,              // Preload font files
  fallback: ['system-ui', 'arial'], // Fallback chain
  adjustFontFallback: true,   // Auto-adjust fallback to reduce CLS
});

export const metadata = {
  title: {
    default: 'SkillDrills - FPS Gaming & Cognitive Brain Training Platform',
    template: '%s | SkillDrills'
  },
  description: 'Free scientific brain training platform with 90+ drills. Improve FPS aim, reaction time, memory, focus, cognitive skills, typing speed, and mental fitness. Track your progress online.',
  keywords: [
    'brain training', 'cognitive training', 'FPS aim trainer', 'reaction time test',
    'memory games', 'focus training', 'typing speed test', 'mental fitness',
    'aim trainer online', 'speed reading', 'comprehension drills', 'problem solving',
    'working memory', 'visual tracking', 'reflex training', 'productivity tools',
    'free brain games', 'cognitive assessment', 'gaming skills trainer',
    'skill drills', 'skilldrills'
  ],
  authors: [{ name: 'SkillDrills' }],
  creator: 'SkillDrills',
  publisher: 'SkillDrills',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://skilldrills.online'),
  openGraph: {
    title: 'SkillDrills - FPS Gaming & Cognitive Brain Training',
    description: 'Master your mind and mechanics. 90+ free drills for FPS gaming skills, cognitive enhancement, memory, typing speed, and mental fitness.',
    url: 'https://skilldrills.online',
    siteName: 'SkillDrills',
    images: [
      {
        url: '/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'SkillDrills Logo',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkillDrills - FPS & Cognitive Training Platform',
    description: 'Master your mind and mechanics. Free brain training platform with 90+ drills.',
    images: ['/icons/icon-512x512.png'],
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
  // Performance hints for browsers
  other: {
    'format-detection': 'telephone=no',
    'msapplication-TileColor': '#000000',
  },
};

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to external origins for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* PWA & Icons */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Performance: Preload critical assets */}
        <link rel="preload" href="/icons/icon-512x512.png" as="image" />
        
        {/* Meta */}
        <meta name="author" content="SkillDrills" />
        <meta name="language" content="English" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}