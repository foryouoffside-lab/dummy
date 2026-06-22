import GestureSpeedClient from './GestureSpeedClient';

export const metadata = {
  title: 'Flick Training Online - Free Gesture Speed Drill | SkillDrills',
  description: 'Free flick training online. Flick to click gates within 350ms then return to center — the best flick shot training and gesture speed drill for FPS players. No sign-up required.',
  keywords: [
    'flick training', 'flick training online', 'free flick training',
    'flick shot training', 'flick shot practice', 'flick aim training',
    'gesture speed drill', 'mouse gesture game', 'gesture speed test',
    'flick and return drill', 'rapid mouse movement game', 'mouse speed drill',
    'mouse flick test', 'mouse speed test', 'click speed game',
    'FPS flick training', 'FPS aim training', 'Valorant flick training',
    'CS2 flick shot practice', 'Apex flick training', 'esports mouse speed',
    'hand eye coordination game', 'hand eye coordination training', 'reaction speed game',
    'reflex training online', 'motor speed training', 'movement speed drill',
    'vector recoil training', 'gate clicking game', 'rapid flick drill',
    'mouse reaction game', 'fast mouse movement test', 'precision flick game',
    'skilldrills flick training', 'skilldrills motor drills', 'free mouse speed game',
    'browser flick game', 'no download flick training', 'instant motor speed game',
    'flick accuracy training', 'gesture precision drill', 'rapid movement control',
  ],
  openGraph: {
    title: 'Flick Training Online - Free Gesture Speed Drill | SkillDrills',
    description: 'Free flick training online. Flick to click gates within 350ms — best flick shot training and gesture speed drill for FPS. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/movement-speed/gesture-speed',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Flick Training Online - Gesture Speed Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flick Training Online - Free Gesture Speed Drill | SkillDrills',
    description: 'Free flick training. Click gates within 350ms. Best flick shot training for FPS gamers. No sign-up.',
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
              { "@type": "ListItem", "position": 4, "name": "Flick Training Online - Gesture Speed Drill" }
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
            "name": "Flick Training Online - Free Gesture Speed Drill",
            "url": "https://skilldrills.online/drills/motor/movement-speed/gesture-speed",
            "description": "Free flick training online and gesture speed drill. Hover center to spawn a gate, flick to click it within 350ms, return to center. +1pt per complete cycle. Best FPS flick shot training game available.",
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
                "name": "What is this flick training game?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free flick training online and gesture speed drill. Hover center to spawn a gate, flick to click it within 350ms, then return to center for +1pt. Best free FPS flick shot training game available in browser."
                }
              },
              {
                "@type": "Question",
                "name": "How does the 350ms timer work in this flick training drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A timer ring around the gate depletes within 350ms. Green above ~100ms remaining, red below. Direction arrow from center shows where to flick. CLICK indicator appears when hovering gate."
                }
              },
              {
                "@type": "Question",
                "name": "Which FPS games does this flick training improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "This flick training drill directly improves flick shot speed and accuracy for Valorant, CS2, Overwatch 2, Apex Legends, and Rainbow Six Siege. The 350ms gate trains the exact reaction window needed for competitive play."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up for this flick training game?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This free flick training online works instantly in your browser — no downloads needed."
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