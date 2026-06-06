import CounterStrafeClient from './CounterStrafeClient';

export const metadata = {
  title: 'Esports Counter-Strafe Sync Trainer - FPS Aim Drill | SkillDrills',
  description: 'Train your A/D counter-strafing and shooting synchronization. Master the sub-millisecond stop window for perfect tactical accuracy. No sign-up.',
  keywords: [
    'counter-strafing trainer', 'A/D strafing FPS', 'movement accuracy aim trainer',
    'Valorant movement training', 'CS2 counter-strafe practice', 'stop shooting sync',
    'tactical shooter movement drill', 'raw mouse input aim trainer', 'esports movement coach',
    'run and gun penalty simulator', 'deceleration window aim trainer'
  ],
  openGraph: {
    title: 'Esports Counter-Strafe Sync Trainer - FPS Aim Drill | SkillDrills',
    description: 'Master the sub-millisecond stop window for perfect movement-to-aim synchronization.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/counter-strafe-trainer',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Counter-Strafe Sync Trainer',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Esports Counter-Strafe Sync Trainer - FPS Aim Drill | SkillDrills',
    description: 'Master the sub-millisecond stop window for perfect movement-to-aim synchronization.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/counter-strafe-trainer',
  },
};

export default function CounterStrafePage() {
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
              { "@type": "ListItem", "position": 2, "name": "FPS Training", "item": "https://skilldrills.online/drills/fps" },
              { "@type": "ListItem", "position": 3, "name": "Counter-Strafe Sync Trainer" }
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
            "name": "Esports Counter-Strafe Sync Trainer",
            "url": "https://skilldrills.online/drills/fps/counter-strafe-trainer",
            "description": "Master A/D counter-strafe mechanics with exact physics modeling of tactical shooters, raw mouse input, and movement penalty feedback.",
            "applicationCategory": "GamingApplication",
            "operatingSystem": "All",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "author": { "@type": "Organization", "name": "SkillDrills" },
            "isAccessibleForFree": true
          })
        }}
      />

      <CounterStrafeClient />
    </>
  );
}
