import EvasiveSlideTrackClient from './EvasiveSlideTrackClient';

export const metadata = {
  title: 'S+ Evasive Slide & Track - Elite FPS Aim Drill | SkillDrills',
  description: 'Practice high-velocity smooth tracking against targets executing sliding, jump-pad boosts, and crouch-cancels under simulated recoil viewport shake. Supports Apex, Overwatch, and CoD.',
  keywords: [
    'S+ grade smooth tracking', 'Apex Legends sliding aim trainer', 'high velocity target tracking drill',
    'Warzone tracking recoil shake practice', 'Overwatch evasive pursuit lab', 'free pointer lock aim tracker',
    'reactive tracking latency math', 'global elite tracking drills'
  ],
  openGraph: {
    title: 'S+ Evasive Slide & Track - Elite FPS Aim Drill | SkillDrills',
    description: 'Evasive tracking and recoil management training for elite tracking-shooter players. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/evasive-slide-track',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'S+ Evasive Slide & Track',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'S+ Evasive Slide & Track - Elite FPS Aim Drill | SkillDrills',
    description: 'Evasive tracking and recoil management training for elite tracking-shooter players. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/evasive-slide-track',
  },
};

export default function EvasiveSlideTrackPage() {
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
              { "@type": "ListItem", "position": 3, "name": "S+ Evasive Slide & Track" }
            ]
          })
        }}
      />
      <EvasiveSlideTrackClient />
    </>
  );
}
