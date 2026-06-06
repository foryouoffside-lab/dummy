import RecoilControlClient from './RecoilControlClient';

export const metadata = {
  title: 'Esports Recoil Spray Control Lab - FPS Aim Drill | SkillDrills',
  description: 'Train weapon recoil spray control. Master the CS2 AK-47 and Valorant Vandal spray profiles with sub-pixel drag calculations. No sign-up.',
  keywords: [
    'recoil control trainer', 'weapon spray control', 'AK47 recoil simulator',
    'CS2 spray pattern trainer', 'Valorant recoil control', 'spray tracking FPS',
    'tactical shooting lab', 'raw mouse input aim trainer', 'esports spray control'
  ],
  openGraph: {
    title: 'Esports Recoil Spray Control Lab - FPS Aim Drill | SkillDrills',
    description: 'Master CS2 and Valorant spray patterns with interactive drag feedback and recoil plots.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/recoil-control',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Recoil Control Lab',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Esports Recoil Spray Control Lab - FPS Aim Drill | SkillDrills',
    description: 'Master CS2 and Valorant spray patterns with interactive drag feedback and recoil plots.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/recoil-control',
  },
};

export default function RecoilControlPage() {
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
              { "@type": "ListItem", "position": 3, "name": "Recoil Spray Control Lab" }
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
            "name": "Esports Recoil Spray Control Lab",
            "url": "https://skilldrills.online/drills/fps/recoil-control",
            "description": "Master automatic weapon recoil spray patterns with high-precision input, live feedback graphs, and CS2/Valorant pattern profiles.",
            "applicationCategory": "GamingApplication",
            "operatingSystem": "All",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "author": { "@type": "Organization", "name": "SkillDrills" },
            "isAccessibleForFree": true
          })
        }}
      />

      <RecoilControlClient />
    </>
  );
}
