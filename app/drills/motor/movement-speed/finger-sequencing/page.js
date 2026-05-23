import FingerSequencingClient from './FingerSequencingClient';

export const metadata = {
  title: 'Fractal Link - Finger Sequencing Speed Drill | SkillDrills',
  description: 'Click 3 nodes largest to smallest within 2 seconds. Pulsing green nodes, timer ring, dashed guide lines. 3-life system. No sign-up.',
  keywords: [
    'finger sequencing', 'motor sequencing', 'rapid clicking', 'finger speed training',
    'sequence training', 'motor control drill', 'click order practice', 'precision sequencing',
    'finger dexterity', 'chain clicking', 'motor learning', 'sequencing speed',
    'free motor drill', 'finger coordination', 'rapid targeting',
    'finger sequencing free', 'fractal link drill free', 'motor sequencing practice',
    'ordered clicking drill', 'size order clicking', 'node chain training',
    'finger speed practice', 'rapid motor planning', 'sequential motor control',
    'skilldrills finger sequencing', 'skilldrills motor drills', 'skilldrills speed',
    'chain clicking drill', 'motor dexterity training', 'finger precision practice',
    'ordered motor execution', 'clicking sequence game', 'finger control training free',
  ],
  openGraph: {
    title: 'Fractal Link - Finger Sequencing Speed | SkillDrills',
    description: 'Click 3 nodes largest to smallest within 2 seconds. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/movement-speed/finger-sequencing',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Fractal Link Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fractal Link Drill | SkillDrills',
    description: 'Click 3 nodes largest to smallest. Timer ring. Free.',
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
      <noscript>
        <h1>Fractal Link - Finger Sequencing Speed & Precision Motor Training</h1>
        <p>Free finger sequencing drill with 3-node chains. Click largest to smallest. No sign-up required.</p>
      </noscript>

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
              { "@type": "ListItem", "position": 4, "name": "Fractal Link" }
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
            "name": "Fractal Link Drill",
            "url": "https://skilldrills.online/drills/motor/movement-speed/finger-sequencing",
            "description": "Free finger sequencing drill. Click 3 nodes largest to smallest within 2 seconds. Pulsing green nodes, timer ring, dashed guide lines.",
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
                "name": "What is the Fractal Link Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free finger sequencing exercise. Click 3 nodes largest to smallest within 2s. Pulsing green target, timer ring turns red under 0.6s."
                }
              },
              {
                "@type": "Question",
                "name": "How does the node chain work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "3 nodes: large (22px), medium (18px), small (14px). Dashed guide lines show sequence. Timer ring depletes clockwise. Timeout = life lost."
                }
              },
              {
                "@type": "Question",
                "name": "What skills does this improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sequencing speed, motor planning, visual processing for size discrimination, rapid finger control, and ordered motor execution."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This finger sequencing drill is completely free and works instantly in your browser."
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