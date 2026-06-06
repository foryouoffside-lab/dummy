import TargetSwitchingSwarmClient from './TargetSwitchingSwarmClient';

export const metadata = {
  title: 'Target Switching Swarm - FPS Aim Drill | SkillDrills',
  description: 'Train high-speed target switching and flick accuracy. Click static target groups as fast as they spawn. Simulates KovaaKs Gridshot and 1wall6targets. Free, browser-based, raw input.',
  keywords: [
    'target switching swarm', 'Gridshot aim trainer', '1wall6targets free online',
    'speed flick switching drill', 'pointer lock gridshot'
  ],
  robots: { index: true, follow: true }
};

export default function TargetSwitchingSwarmPage() {
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
              { "@type": "ListItem", "position": 3, "name": "Target Switching Swarm" }
            ]
          })
        }}
      />
      <TargetSwitchingSwarmClient />
    </>
  );
}
