import PrefireCornerClearerClient from './PrefireCornerClearerClient';

export const metadata = {
  title: 'Prefire Corner Clearer - FPS Aim Drill | SkillDrills',
  description: 'Train pre-aiming and cover peeking for CS2 and Valorant. Master angle clearing and movement sync utilizing A/D keys for counter-strafing. Free, browser-based, raw input.',
  keywords: [
    'prefire corner trainer', 'pre-aim training', 'Valorant prefire maps',
    'CS2 angle clearing drill', 'counter strafe prefire', 'pointer lock prefire'
  ],
  robots: { index: true, follow: true }
};

export default function PrefireCornerClearerPage() {
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
              { "@type": "ListItem", "position": 3, "name": "Prefire Corner Clearer" }
            ]
          })
        }}
      />
      <PrefireCornerClearerClient />
    </>
  );
}
