import HeadshotReflexClient from './HeadshotReflexClient';

export const metadata = {
  title: 'S+ Headshot Reflex & Micro-Adjust - Elite FPS Aim Drill | SkillDrills',
  description: 'Practice instant 180° visual snaps to extreme-edge targets with an exposure window of 180ms. Evaluates raw trigger speed, snap accuracy, and overshoots. Voice assistant integrated.',
  keywords: [
    'S+ grade reflex aim trainer', '180 snap reflex aim trainer', 'headshot micro adjustments drill',
    'tactical shooter reflex click trainer', 'free pointer lock raw mouse input', 'AI coach voice guidance aim',
    '180ms visual reaction snap', 'global elite esports training'
  ],
  openGraph: {
    title: 'S+ Headshot Reflex & Micro-Adjust - Elite FPS Aim Drill | SkillDrills',
    description: 'Instant edge-snap reflex and micro-adjust aim training for pro competitive gamers. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/headshot-micro-adjust',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'S+ Headshot Reflex & Micro-Adjust',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'S+ Headshot Reflex & Micro-Adjust - Elite FPS Aim Drill | SkillDrills',
    description: 'Instant edge-snap reflex and micro-adjust aim training for pro competitive gamers. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/headshot-micro-adjust',
  },
};

export default function HeadshotReflexPage() {
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
              { "@type": "ListItem", "position": 3, "name": "S+ Headshot Reflex & Micro-Adjust" }
            ]
          })
        }}
      />
      <HeadshotReflexClient />
    </>
  );
}
