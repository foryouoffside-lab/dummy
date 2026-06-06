import MicroFlickPrecisionClient from './MicroFlickPrecisionClient';

export const metadata = {
  title: 'Micro-Flick Precision - FPS Aim Drill | SkillDrills',
  description: 'Master micro-flick snaps on extremely compact, fast-respawning targets. Sensitivity matched for Valorant, CS2, Overwatch, Apex, and Fortnite. No sign-up.',
  keywords: [
    'micro-flick precision aim trainer', 'micro flicking aim drill', 'Valorant micro adjustment aim trainer',
    'CS2 precision clicking aim practice', 'free aim trainer', 'Pointer Lock mouse input aim practice',
    'muscle memory micro snaps trainer', 'aim trainer headshot click precision', 'professional esports aiming training'
  ],
  openGraph: {
    title: 'Micro-Flick Precision - FPS Aim Drill | SkillDrills',
    description: 'Master micro-flick snaps on extremely compact, fast-respawning targets. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/micro-flick-precision',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Micro-Flick Precision Training',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Micro-Flick Precision - FPS Aim Drill | SkillDrills',
    description: 'Master micro-flick snaps on extremely compact, fast-respawning targets. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/micro-flick-precision',
  },
};

export default function MicroFlickPrecisionPage() {
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
              { "@type": "ListItem", "position": 3, "name": "Micro-Flick Precision" }
            ]
          })
        }}
      />
      <MicroFlickPrecisionClient />
    </>
  );
}
