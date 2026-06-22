import FingerSequencingClient from './FingerSequencingClient';

export const metadata = {
  title: 'Finger Speed Test - Free Finger Sequencing Drill | SkillDrills',
  description: 'Free finger speed test online. Click 3 nodes from largest to smallest within 2 seconds — the best finger sequencing and motor speed drill. 3-life system. No sign-up required.',
  keywords: [
    'finger speed test', 'free finger speed test', 'online finger speed test',
    'finger sequencing drill', 'finger sequencing game', 'motor sequencing drill',
    'finger dexterity test', 'finger dexterity training', 'finger dexterity game',
    'click speed drill', 'clicking speed test', 'rapid clicking game',
    'finger coordination training', 'hand finger coordination', 'finger motor control',
    'sequential clicking game', 'ordered clicking drill', 'click sequence game',
    'hand eye coordination game', 'hand eye coordination training', 'hand eye coordination test',
    'motor planning exercise', 'motor control drill', 'motor speed training',
    'FPS finger training', 'gaming finger speed', 'esports finger coordination',
    'chain clicking drill', 'node sequence game', 'size order clicking',
    'reaction sequence training', 'rapid targeting drill', 'finger precision practice',
    'skilldrills finger sequencing', 'skilldrills motor drills', 'free speed drill online',
    'browser finger test', 'no download finger training', 'instant motor drill',
    'finger speed improvement', 'fast finger game', 'finger control training',
  ],
  openGraph: {
    title: 'Finger Speed Test - Free Finger Sequencing Drill | SkillDrills',
    description: 'Free finger speed test. Click 3 nodes largest to smallest in 2 seconds — best finger sequencing and motor speed drill. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/movement-speed/finger-sequencing',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Finger Speed Test - Finger Sequencing Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finger Speed Test - Free Finger Sequencing Drill | SkillDrills',
    description: 'Free finger speed test. Click nodes largest to smallest in 2 seconds. Best sequencing drill online. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/movement-speed/finger-sequencing',
  },
};

export default function FingerSequencingPage() {
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
              { "@type": "ListItem", "position": 4, "name": "Finger Speed Test - Finger Sequencing" }
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
            "name": "Finger Speed Test - Free Finger Sequencing Drill",
            "url": "https://skilldrills.online/drills/motor/movement-speed/finger-sequencing",
            "description": "Free finger speed test and finger sequencing drill. Click 3 nodes from largest to smallest within 2 seconds. Pulsing green nodes, timer ring, dashed guide lines. Best online finger dexterity test.",
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
                "name": "What is this finger speed test?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free finger speed test and finger sequencing drill. Click 3 pulsing nodes from largest to smallest within 2 seconds. Timer ring depletes clockwise — turns red under 0.6s. Best online test for finger dexterity and motor sequencing."
                }
              },
              {
                "@type": "Question",
                "name": "How does the node chain work in this finger sequencing drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "3 nodes of different sizes: large (22px), medium (18px), small (14px). Dashed guide lines show sequence order. Click them largest to smallest within the 2-second window. Timeout costs a life in this finger speed test."
                }
              },
              {
                "@type": "Question",
                "name": "What skills does this finger speed test improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Finger sequencing speed, motor planning, visual size discrimination, rapid hand-eye coordination, and ordered motor execution — all essential for gaming, typing speed, and musical instrument play."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up for this finger speed test?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This free finger speed test and sequencing drill works instantly in your browser — no downloads needed."
                }
              }
            ]
          })
        }}
      />
      <FingerSequencingClient />
    </>
  );
}