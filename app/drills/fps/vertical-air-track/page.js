import VerticalAirTrackClient from './VerticalAirTrackClient';

export const metadata = {
  title: 'Vertical Air-Track - FPS Aim Drill | SkillDrills',
  description: 'Practice vertical and parabolic tracking for Apex Legends, Fortnite, and Overwatch. Train eye-hand coordination against gravity and launch pad flight physics. Free, raw input.',
  keywords: [
    'vertical air track', 'vertical tracking aim trainer', 'parabolic tracking drill',
    'Apex Legends aim practice', 'Fortnite launchpad tracker', 'Overwatch aerial aim',
    'raw mouse input tracking', 'esports vertical tracking', '3D vertical aim trainer'
  ],
  robots: { index: true, follow: true }
};

export default function VerticalAirTrackPage() {
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
              { "@type": "ListItem", "position": 3, "name": "Vertical Air-Track" }
            ]
          })
        }}
      />
      <VerticalAirTrackClient />
    </>
  );
}
