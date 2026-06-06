import ParabolicAirTrackClient from './ParabolicAirTrackClient';

export const metadata = {
  title: 'S+ Elite Parabolic Air-Track - Elite FPS Aim Drill | SkillDrills',
  description: 'Train vertical aim tracking with gravity and dynamic air drift updates. Sensitivity matched for Valorant, CS2, Overwatch, Apex, and Fortnite. Esports-grade aim practice.',
  keywords: [
    'S+ grade vertical tracking aim trainer', 'parabolic tracking aim drill', 'Apex Legends Genji blade tracking practice',
    'CS2 vertical aim practice', 'Pointer Lock mouse input vertical aim trainer', 'wind drift tracking practice',
    'muscle memory parabolic tracking sweeps', 'esports vertical tracking trainer online'
  ],
  openGraph: {
    title: 'S+ Elite Parabolic Air-Track - Elite FPS Aim Drill | SkillDrills',
    description: 'Aim tracking on gravity-affected parabolic paths with active wind-drifts. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/parabolic-air-track',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'S+ Elite Parabolic Air-Track',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'S+ Elite Parabolic Air-Track - Elite FPS Aim Drill | SkillDrills',
    description: 'Aim tracking on gravity-affected parabolic paths with active wind-drifts. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/parabolic-air-track',
  },
};

export default function ParabolicAirTrackPage() {
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
              { "@type": "ListItem", "position": 3, "name": "S+ Elite Parabolic Air-Track" }
            ]
          })
        }}
      />
      <ParabolicAirTrackClient />
    </>
  );
}
