import VerticalAirPursuitClient from './VerticalAirPursuitClient';

export const metadata = {
  title: 'S+ Vertical Air-Pursuit - Elite FPS Aim Drill | SkillDrills',
  description: 'Train vertical air-glide pursuit tracking. Variable horizontal drafts cause sudden wind drifts, and firing triggers recoil viewport shake. Voice assistant coach integrated.',
  keywords: [
    'S+ grade tracking trainer', 'vertical air tracking practice', 'glide trajectory tracking drill',
    'Apex flying target tracker', 'Overwatch Genji dash tracker', 'free pointer lock smooth pursuit',
    'recoil shake compensation tracking', 'global elite aim coach voice'
  ],
  openGraph: {
    title: 'S+ Vertical Air-Pursuit - Elite FPS Aim Drill | SkillDrills',
    description: 'High altitude vertical air-glide tracking and recoil management training for pro competitive gamers. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/vertical-air-pursuit',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'S+ Vertical Air-Pursuit',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'S+ Vertical Air-Pursuit - Elite FPS Aim Drill | SkillDrills',
    description: 'High altitude vertical air-glide tracking and recoil management training for pro competitive gamers. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/vertical-air-pursuit',
  },
};

export default function VerticalAirPursuitPage() {
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
              { "@type": "ListItem", "position": 3, "name": "S+ Vertical Air-Pursuit" }
            ]
          })
        }}
      />
      <VerticalAirPursuitClient />
    </>
  );
}
