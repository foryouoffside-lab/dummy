import MicroFlickBurstClient from './MicroFlickBurstClient';

export const metadata = {
  title: 'S+ Micro-Flick Speed Burst - Elite FPS Aim Drill | SkillDrills',
  description: 'Pure reaction snapping visual reflexes threshold training. Targets appear for 180ms to 250ms at headshot scale. Matched mouse sensitivity for CS2, Valorant, Overwatch, Apex, and Fortnite.',
  keywords: [
    'S+ grade aim trainer', 'esports reaction aim drill', 'visual reaction threshold training',
    'Valorant headshot snapping practice', 'CS2 micro snap aim trainer', 'free elite aim trainer pointer lock',
    '180ms reaction aim challenge', 'muscle memory micro flicks burst', 'global esports aims training'
  ],
  openGraph: {
    title: 'S+ Micro-Flick Speed Burst - Elite FPS Aim Drill | SkillDrills',
    description: 'Aim training at the visual reaction threshold (180ms - 250ms). Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/micro-flick-burst',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'S+ Micro-Flick Speed Burst',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'S+ Micro-Flick Speed Burst - Elite FPS Aim Drill | SkillDrills',
    description: 'Aim training at the visual reaction threshold (180ms - 250ms). Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/micro-flick-burst',
  },
};

export default function MicroFlickBurstPage() {
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
              { "@type": "ListItem", "position": 3, "name": "S+ Micro-Flick Speed Burst" }
            ]
          })
        }}
      />
      <MicroFlickBurstClient />
    </>
  );
}
