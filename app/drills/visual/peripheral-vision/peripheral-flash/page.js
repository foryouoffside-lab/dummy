import PeripheralFlashClient from './PeripheralFlashClient';

export const metadata = {
  title: 'Peripheral Flash - Vision Training & Awareness Drill | SkillDrills',
  description: 'Train peripheral vision with 5-6 shape sequences at 300ms. Keep eyes on center, detect shapes in peripheral field. +1 correct, -1 wrong. No sign-up.',
  keywords: [
    'peripheral flash', 'peripheral vision training', 'reaction time test',
    'visual field training', 'peripheral detection', 'flash detection drill',
    'vision training game', 'peripheral awareness', 'visual reaction speed',
    'eye training drill', 'peripheral vision exercise', 'visual processing',
    'free vision training', 'reaction speed drill',
    'peripheral flash free', 'peripheral vision drill free', 'shape detection training',
    'visual awareness drill', 'peripheral field training', 'flash sequence practice',
    'center fixation drill', 'peripheral shape recognition', 'visual attention training',
    'skilldrills peripheral flash', 'skilldrills visual drills', 'skilldrills vision',
    '300ms flash training', 'peripheral detection test', 'vision improvement drill',
    'wide field awareness', 'shape flash sequence', 'peripheral processing speed',
  ],
  openGraph: {
    title: 'Peripheral Flash - Vision Training | SkillDrills',
    description: '5-6 shape sequences at 300ms in peripheral field. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual/peripheral-vision/peripheral-flash',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Peripheral Flash Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peripheral Flash Drill | SkillDrills',
    description: '5-6 shape sequences at 300ms. Free vision training.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/peripheral-vision/peripheral-flash',
  },
};

export default function PeripheralFlashPage() {
  return (
    <>
      <noscript>
        <h1>Peripheral Flash - Vision Training & Peripheral Awareness Drill</h1>
        <p>Free peripheral vision drill with 5-6 shape sequences at 300ms intervals. No sign-up required.</p>
      </noscript>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "Visual Training", "item": "https://skilldrills.online/drills/visual" },
              { "@type": "ListItem", "position": 3, "name": "Peripheral Vision", "item": "https://skilldrills.online/drills/visual/peripheral-vision" },
              { "@type": "ListItem", "position": 4, "name": "Peripheral Flash" }
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
            "name": "Peripheral Flash Drill",
            "url": "https://skilldrills.online/drills/visual/peripheral-vision/peripheral-flash",
            "description": "Free peripheral vision training with 5-6 shape sequences at 300ms. Center fixation with peripheral shape detection. +1 correct, -1 wrong, skip option.",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "All",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "author": { "@type": "Organization", "name": "SkillDrills" },
            "isAccessibleForFree": true
          })
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is the Peripheral Flash Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free peripheral vision exercise. 5-6 shapes flash at 300ms in peripheral field. Keep eyes on center, identify the last shape from 4 options."
                }
              },
              {
                "@type": "Question",
                "name": "How does scoring work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "+1 correct, -1 wrong (minimum 0). Skip option for 0 points. Strategic: skip when uncertain, answer when confident."
                }
              },
              {
                "@type": "Question",
                "name": "Who should use this drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Athletes (court vision), drivers (hazard detection), gamers (screen-wide processing), pilots, and anyone wanting better peripheral awareness."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This peripheral flash drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <PeripheralFlashClient />
    </>
  );
}