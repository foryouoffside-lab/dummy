import AngleHoldClient from './AngleHoldClient';

export const metadata = {
  title: 'Angle Hold & Peek Trainer - FPS Reflex | SkillDrills',
  description: 'Train reaction time and crosshair holding distance against cover-peeking targets. Supports CS2, Valorant, and Apex swing movement calibrations.',
  keywords: [
    'angle hold trainer', 'peek trainer FPS', 'reaction time game training',
    'holding angles aim practice', 'gaming reflex trainer', 'CS2 angle defense practice',
    'Valorant peek training', 'Apex swing tracking', 'Pointer Lock raw input'
  ],
  openGraph: {
    title: 'Angle Hold & Peek Trainer - FPS Reflex | SkillDrills',
    description: 'Train reaction time and crosshair holding distance against cover-peeking targets. Supports CS2, Valorant, and Apex swing movement calibrations.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/angle-hold-trainer',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Angle Hold Trainer',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Angle Hold & Peek Trainer - FPS Reflex | SkillDrills',
    description: 'Train reaction time and crosshair holding distance against cover-peeking targets. Supports CS2, Valorant, and Apex swing movement calibrations.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/angle-hold-trainer',
  },
};

export default function AngleHoldPage() {
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
              { "@type": "ListItem", "position": 2, "name": "FPS Sector", "item": "https://skilldrills.online/drills/fps" },
              { "@type": "ListItem", "position": 3, "name": "Angle Hold & Peek Trainer" }
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
            "name": "Angle Hold & Peek Trainer",
            "url": "https://skilldrills.online/drills/fps/angle-hold-trainer",
            "description": "Free FPS reaction trainer matching raw mouse pointer lock inputs. Play against covers swinging out in CS2/Valorant layouts.",
            "applicationCategory": "GamingApplication",
            "operatingSystem": "All",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "author": { "@type": "Organization", "name": "SkillDrills" },
            "isAccessibleForFree": true
          })
        }}
      />
      <AngleHoldClient />
    </>
  );
}
