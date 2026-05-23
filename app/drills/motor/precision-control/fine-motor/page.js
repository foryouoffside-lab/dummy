import FineMotorClient from './FineMotorClient';

export const metadata = {
  title: 'Fine Motor Control - Precision Path Tracking Drill | SkillDrills',
  description: 'Track a scrolling wave path with your cursor. +1pt/sec on path, no penalties. Dynamic and Extreme phases with adaptive speed. No sign-up.',
  keywords: [
    'fine motor control drill', 'path tracking training', 'mouse precision practice',
    'steady hand training', 'precision tracking drill', 'motor accuracy training',
    'hand steadiness exercise', 'cursor control practice', 'wave tracking drill',
    'fine motor skills training', 'mouse control practice free', 'smooth movement drill',
    'free motor drill', 'precision motor training', 'hand-eye tracking online',
    'cursor precision test', 'mouse accuracy drill', 'motor control exercise',
    'fine motor skills for gamers', 'precision control training', 'mouse steadiness test',
    'free online motor drill', 'precision path following', 'adaptive motor training',
    'skilldrills fine motor', 'skilldrills motor control', 'free precision training',
    'hand coordination drill', 'dexterity training online', 'motor skill development',
    'fine motor precision test', 'cursor tracking practice', 'mouse movement control',
    'precision hand training', 'fine motor skills for artists', 'motor accuracy online',
  ],
  openGraph: {
    title: 'Fine Motor Control - Precision Path Tracking | SkillDrills',
    description: 'Track scrolling wave path with cursor. +1/sec on path. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/precision-control/fine-motor',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Fine Motor Control Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fine Motor Control Drill | SkillDrills',
    description: 'Track scrolling wave path. +1/sec on path. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/precision-control/fine-motor',
  },
};

export default function FineMotorPage() {
  return (
    <>
      <noscript>
        <h1>Fine Motor Control Drill - Precision Path Tracking & Steady Hand Training</h1>
        <p>Free fine motor control drill with scrolling wave path. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 3, "name": "Precision Control", "item": "https://skilldrills.online/drills/motor/precision-control" },
              { "@type": "ListItem", "position": 4, "name": "Fine Motor Control" }
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
            "name": "Fine Motor Control Drill",
            "url": "https://skilldrills.online/drills/motor/precision-control/fine-motor",
            "description": "Free precision tracking drill. Follow scrolling wave path with cursor. +1pt/sec on path, no penalties. Dynamic (0-30s) and Extreme (30-60s) phases.",
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
                "name": "What is the Fine Motor Control drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free precision tracking exercise. Follow a scrolling wave path with cursor. +1pt/sec on path, no penalties. Adaptive scroll speed."
                }
              },
              {
                "@type": "Question",
                "name": "What are the Dynamic and Extreme phases?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Dynamic (0-30s): moderate waves (200-260px). Extreme (30-60s): amplified waves (280-360px) with higher frequency."
                }
              },
              {
                "@type": "Question",
                "name": "Who benefits from this training?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Gamers, digital artists, surgeons, and anyone wanting better cursor precision and steady hand control."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This fine motor control drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <FineMotorClient />
    </>
  );
}