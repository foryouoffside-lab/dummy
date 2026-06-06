import DeadzoneJiggleSnapClient from './DeadzoneJiggleSnapClient';

export const metadata = {
  title: 'S+ Deadzone Jiggle & Snap - Elite FPS Aim Drill | SkillDrills',
  description: 'Master movement-to-aim counter-strafe deadzone click synchronization. Bullet spread penalty applied while moving. Custom sensitivity matching for CS2 and Valorant.',
  keywords: [
    'S+ grade counter-strafing trainer', 'CS2 movement deadzone practice', 'Valorant jiggle peek headshot drill',
    'tactical shooting stop aim sync', 'Wooting rapid trigger aim trainer', 'free pointer lock counter-strafe',
    'zero velocity shot synchronization', 'global elite esports drills'
  ],
  openGraph: {
    title: 'S+ Deadzone Jiggle & Snap - Elite FPS Aim Drill | SkillDrills',
    description: 'Aim and movement synchronization training for elite tactical shooter players. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/deadzone-jiggle-snap',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'S+ Deadzone Jiggle & Snap',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'S+ Deadzone Jiggle & Snap - Elite FPS Aim Drill | SkillDrills',
    description: 'Aim and movement synchronization training for elite tactical shooter players. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/deadzone-jiggle-snap',
  },
};

export default function DeadzoneJiggleSnapPage() {
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
              { "@type": "ListItem", "position": 3, "name": "S+ Deadzone Jiggle & Snap" }
            ]
          })
        }}
      />
      <DeadzoneJiggleSnapClient />
    </>
  );
}
