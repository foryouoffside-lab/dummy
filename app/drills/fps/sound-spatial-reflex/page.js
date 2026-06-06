import SoundSpatialReflexClient from './SoundSpatialReflexClient';

export const metadata = {
  title: '3D Audio-Spatial Reflex - FPS Aim Drill | SkillDrills',
  description: 'Train spatial sound localization and 180-degree flick reflex. Uses Web Audio API stereo panning. Fast-twitch response to auditory cues. Free, browser-based, raw input.',
  keywords: [
    '3D audio aim trainer', 'spatial sound reflex drill', 'Valorant sound trainer',
    'CS2 audio cues practice', '180 degree audio flick', 'pointer lock audio trainer'
  ],
  robots: { index: true, follow: true }
};

export default function SoundSpatialReflexPage() {
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
              { "@type": "ListItem", "position": 3, "name": "3D Audio-Spatial Reflex" }
            ]
          })
        }}
      />
      <SoundSpatialReflexClient />
    </>
  );
}
