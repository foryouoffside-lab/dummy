import StrobeLatencyClient from './StrobeLatencyClient';

export const metadata = {
  title: 'Light Reaction - Speed Drill | SkillDrills',
  description: 'Click when ball flashes white. Adaptive 100-200ms window, raw mouse input, random 1-3s intervals. Millisecond reaction tracking. No sign-up.',
  keywords: [
    'light reaction test', 'visual reaction speed', 'reaction time drill',
    'light reaction speed', 'reflex training', 'visual stimulus reaction',
    'reaction speed game', 'light flash test', 'simple reaction time',
    'visual reflex training', 'reaction window training', 'speed test',
    'free reaction time test', 'light reaction lab', 'light reaction free',
    'reaction speed drill free', 'adaptive reaction window', 'flash detection test',
    'millisecond reaction tracking', 'raw input reaction', 'pointer lock reaction',
    'skilldrills light reaction', 'skilldrills reaction', 'skilldrills visual',
    'click flash test', 'white flash reaction', 'random interval reaction',
    'reflex speed game', 'visual detection speed', 'strobe reflex training',
    'esports reaction training', 'gaming reflex drill', 'competitive reaction test',
  ],
  openGraph: {
    title: 'Light Reaction - Speed Drill | SkillDrills',
    description: 'Click when ball flashes white. Adaptive 100-200ms window, raw mouse input, random 1-3s intervals. Millisecond reaction tracking. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual/reaction-speed/light-reaction',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Light Reaction Speed Lab',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Light Reaction - Speed Drill | SkillDrills',
    description: 'Click when ball flashes white. Adaptive 100-200ms window, raw mouse input, random 1-3s intervals. Millisecond reaction tracking. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/reaction-speed/light-reaction',
  },
};

export default function StrobeLatencyPage() {
  return (
    <>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "Visual Training", "item": "https://skilldrills.online/drills/visual" },
              { "@type": "ListItem", "position": 3, "name": "Reaction Speed", "item": "https://skilldrills.online/drills/visual/reaction-speed" },
              { "@type": "ListItem", "position": 4, "name": "Light Reaction Speed" }
            ]
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Strobe-Latency Lab",
            "url": "https://skilldrills.online/drills/visual/reaction-speed/light-reaction",
            "description": "Free strobe reaction drill. Click when ball flashes white. Adaptive 100-200ms window, raw mouse input, random 1-3s intervals. Millisecond tracking.",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "All",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "author": { "@type": "Organization", "name": "SkillDrills" },
            "isAccessibleForFree": true
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is the Strobe-Latency Lab?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free visual reaction speed drill. Click when ball flashes white. Adaptive 100-200ms window, raw mouse input, random 1-3s intervals prevent anticipation."
                }
              },
              {
                "@type": "Question",
                "name": "How does the adaptive window work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Starts at 200ms. Successful hits shrink by 5ms (min 100ms). Errors expand by 10ms (max 200ms). Always at your current reaction level."
                }
              },
              {
                "@type": "Question",
                "name": "What reaction times should I aim for?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Average: 200-250ms. With practice: 180-200ms. Elite: 150-170ms. Best reaction time tracked in milliseconds."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This reaction speed drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <StrobeLatencyClient />
    </>
  );
}