import GestureSpeedClient from './GestureSpeedClient';

export const metadata = {
  title: 'Gesture Speed - Flick & Return Drill | SkillDrills',
  description: 'Flick to click gates within 350ms, then return to center. Direction arrow, timer ring. 3-life system. No sign-up.',
  keywords: [
    'gesture speed', 'flick training', 'mouse gesture', 'rapid movement',
    'flick and return', 'motor speed drill', 'vector recoil', 'mouse speed test',
    'gesture precision', 'rapid mouse movement', 'movement speed training',
    'flick accuracy', 'free motor drill', 'reflex training', 'speed gesture',
    'gesture speed free', 'vector recoil drill free', 'flick and return training',
    'mouse gesture speed', 'rapid flick drill', 'gate clicking practice',
    'flick movement drill', 'gesture precision training', 'mouse speed practice',
    'skilldrills vector recoil', 'skilldrills motor drills', 'skilldrills speed',
    'flick return cycle', 'gesture accuracy drill', 'rapid mouse control',
    'motor speed practice', 'flick reflex training', 'gesture speed test free',
  ],
  openGraph: {
    title: 'Gesture Speed - Flick & Return Drill | SkillDrills',
    description: '350ms gate clicking with flick-and-return cycles. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/movement-speed/gesture-speed',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Vector Recoil Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gesture Speed - Flick & Return Drill | SkillDrills',
    description: '350ms gate clicking with flick-and-return. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/movement-speed/gesture-speed',
  },
};

export default function GestureSpeedPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Motor Training", "item": "https://skilldrills.online/drills/motor" },
              { "@type": "ListItem", "position": 3, "name": "Movement Speed", "item": "https://skilldrills.online/drills/motor/movement-speed" },
              { "@type": "ListItem", "position": 4, "name": "Vector Recoil" }
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
            "name": "Vector Recoil Drill",
            "url": "https://skilldrills.online/drills/motor/movement-speed/gesture-speed",
            "description": "Free flick-and-return gesture drill. 350ms gate windows. Direction arrow, timer ring (green/red). Flick to gate, return to center for +1pt.",
            "applicationCategory": "GameApplication",
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
                "name": "What is the Vector Recoil Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free flick-and-return gesture drill. Hover center to spawn gate, flick to click within 350ms, return to center. +1pt per complete cycle."
                }
              },
              {
                "@type": "Question",
                "name": "How does the timer system work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "350ms timer ring around gate. Green above ~100ms, red below. Direction arrow from center. CLICK indicator on gate hover."
                }
              },
              {
                "@type": "Question",
                "name": "What skills does this improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Flick speed, return accuracy, gesture precision, movement speed, and rapid motor control. Transfers to FPS flick shots."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This gesture speed drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <GestureSpeedClient />
    </>
  );
}