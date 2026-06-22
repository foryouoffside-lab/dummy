import FineMotorClient from './FineMotorClient';

export const metadata = {
  title: 'Fine Motor Skills Training - Free Precision Path Tracking | SkillDrills',
  description: 'Free fine motor skills training online. Track a scrolling wave path with your cursor — the best fine motor control and mouse precision exercise for gamers, artists, and therapists. No sign-up.',
  keywords: [
    'fine motor skills', 'fine motor skills training', 'fine motor skills exercises',
    'fine motor control', 'fine motor skills game', 'fine motor training online',
    'fine motor exercises online', 'fine motor skills for adults', 'fine motor development',
    'mouse precision training', 'mouse precision game', 'cursor precision test',
    'path tracking game', 'wave tracking drill', 'cursor tracking exercise',
    'hand steadiness training', 'steady cursor drill', 'smooth movement practice',
    'hand eye coordination drill', 'hand eye coordination training', 'hand eye coordination game',
    'motor control exercise', 'precision motor training', 'motor skill development',
    'fine motor skills for gamers', 'gaming mouse precision', 'aim smoothing drill',
    'fine motor skills for artists', 'digital art mouse training', 'graphic design precision',
    'fine motor rehabilitation', 'occupational therapy online', 'hand tremor training',
    'adaptive motor training', 'precision path following', 'scrolling wave game',
    'skilldrills fine motor', 'skilldrills motor control', 'free precision training',
    'browser motor drill', 'no download motor training', 'instant precision game',
  ],
  openGraph: {
    title: 'Fine Motor Skills Training - Free Precision Path Tracking | SkillDrills',
    description: 'Free fine motor skills training. Track a scrolling wave path — best fine motor control exercise for gamers, artists, and rehabilitation. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/precision-control/fine-motor',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Fine Motor Skills Training - Precision Path Tracking',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fine Motor Skills Training - Free Precision Path Tracking | SkillDrills',
    description: 'Free fine motor skills training. Track a scrolling wave path. Best fine motor control exercise. No sign-up.',
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
              { "@type": "ListItem", "position": 4, "name": "Fine Motor Skills Training - Precision Path Tracking" }
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
            "name": "Fine Motor Skills Training - Free Precision Path Tracking",
            "url": "https://skilldrills.online/drills/motor/precision-control/fine-motor",
            "description": "Free fine motor skills training and precision path tracking drill. Follow a scrolling wave path with cursor. +1pt/sec on path, no penalties. Dynamic (0-30s) and Extreme (30-60s) phases with adaptive speed.",
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
                "name": "What is this fine motor skills training drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free fine motor skills training and precision cursor tracking exercise. Follow a scrolling wave path with your cursor. +1pt/sec on path, no penalties. Adaptive scroll speed with two phases: Dynamic (moderate waves, 0-30s) and Extreme (amplified waves, 30-60s)."
                }
              },
              {
                "@type": "Question",
                "name": "Who benefits from this fine motor skills training?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Gamers wanting smoother aim, digital artists and graphic designers needing cursor precision, occupational therapy patients improving fine motor skills, and anyone wanting better hand steadiness and mouse control."
                }
              },
              {
                "@type": "Question",
                "name": "What are the Dynamic and Extreme phases in this fine motor drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Dynamic phase (0-30s): moderate waves 200-260px amplitude. Extreme phase (30-60s): amplified waves 280-360px with higher frequency. Fine motor skills are tested progressively harder throughout the session."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up for this fine motor skills training?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This free fine motor skills training exercise works instantly in your browser — no downloads needed."
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