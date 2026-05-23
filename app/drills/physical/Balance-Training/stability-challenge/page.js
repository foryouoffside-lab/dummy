import StabilityChallengeClient from './StabilityChallengeClient';

export const metadata = {
  title: 'Stability Challenge - Kinetic Resistance | SkillDrills',
  description: 'Resist simulated wind forces to keep cursor centered. Adaptive difficulty, pure positive scoring. +1pt/0.5s stability. No sign-up.',
  keywords: [
    'gravitational stability drill', 'kinetic resistance training', 'balance challenge online',
    'stability drill free', 'wind resistance game', 'cursor control training',
    'motor control exercise', 'adaptive difficulty balance', 'stability test online',
    'hand-eye coordination training', 'force resistance training', 'free balance game',
    'stability metrics', 'motor skills challenge', 'anti-gravity training',
    'mouse control practice', 'cursor stability test', 'adaptive motor training',
    'fine motor control drill', 'precision movement practice', 'kinetic response training',
    'balance assessment free', 'motor coordination drill', 'stability tracking game',
    'physical training online', 'free motor skills test', 'browser balance game',
    'skilldrills stability', 'skilldrills balance training', 'free coordination practice',
    'adaptive challenge game', 'positive scoring drill', 'no penalty training',
    'gaming mouse control', 'esports motor training', 'competitive gaming practice',
  ],
  openGraph: {
    title: 'Stability Challenge - Kinetic Resistance | SkillDrills',
    description: 'Resist wind forces, keep cursor centered. Adaptive difficulty. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/physical/Balance-Training/stability-challenge',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Gravitational Stability Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stability Challenge - Kinetic Resistance | SkillDrills',
    description: 'Train motor control with adaptive wind resistance. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/Balance-Training/stability-challenge',
  },
};

export default function StabilityChallengePage() {
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
              { "@type": "ListItem", "position": 2, "name": "Physical Training", "item": "https://skilldrills.online/drills/physical" },
              { "@type": "ListItem", "position": 3, "name": "Balance Training", "item": "https://skilldrills.online/drills/physical/Balance-Training" },
              { "@type": "ListItem", "position": 4, "name": "Gravitational Stability" }
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
            "name": "Gravitational Stability Drill",
            "url": "https://skilldrills.online/drills/physical/Balance-Training/stability-challenge",
            "description": "Free stability drill. Resist wind forces pushing cursor from center. Adaptive difficulty increases with stability. Pure positive scoring, no penalties.",
            "applicationCategory": "HealthApplication",
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
                "name": "What is the Gravitational Stability Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free motor control exercise. Simulated wind forces push cursor from center. Resist and stay in ring for points. Adaptive difficulty, no penalties."
                }
              },
              {
                "@type": "Question",
                "name": "How does adaptive difficulty work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Starts at 1.0, increases 0.05/sec of stability. Higher difficulty = stronger, more aggressive wind. Resets to 1.0 if cursor drifts >300px."
                }
              },
              {
                "@type": "Question",
                "name": "How is scoring calculated?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Pure positive: +1pt/0.5s inside ring. No penalties, no lives, no deductions. Cursor resets if too far but points are kept."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This stability drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <StabilityChallengeClient />
    </>
  );
}