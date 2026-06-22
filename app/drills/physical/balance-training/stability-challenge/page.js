import StabilityChallengeClient from './StabilityChallengeClient';

export const metadata = {
  title: 'Balance Test Online - Free Cursor Stability Challenge | SkillDrills',
  description: 'Take a free balance test online. Resist simulated wind forces to keep your cursor centered — the best cursor stability challenge for motor control and balance training. Adaptive difficulty. No sign-up.',
  keywords: [
    'balance test online', 'free balance test', 'online balance test',
    'balance test game', 'balance training game', 'free balance game online',
    'cursor stability test', 'stability challenge game', 'stability drill free',
    'balance training online', 'balance exercises online', 'motor control balance test',
    'wind resistance game', 'cursor control training', 'mouse control practice',
    'hand eye coordination training', 'coordination balance test', 'fine motor control drill',
    'adaptive difficulty balance', 'stability metrics online', 'stability training game',
    'kinetic resistance training', 'force resistance exercise', 'anti-gravity training game',
    'physical balance assessment', 'motor assessment online', 'balance coordination exercise',
    'FPS mouse control training', 'gaming mouse practice', 'esports motor training',
    'competitive gaming balance', 'reaction balance game', 'precision movement practice',
    'skilldrills stability', 'skilldrills balance training', 'free motor skills test',
    'browser balance game', 'no download stability test', 'instant balance challenge',
    'no penalty balance training', 'positive scoring drill', 'adaptive balance game',
  ],
  openGraph: {
    title: 'Balance Test Online - Free Cursor Stability Challenge | SkillDrills',
    description: 'Free online balance test. Resist wind forces to keep cursor centered. Adaptive difficulty stability challenge. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/physical/balance-training/stability-challenge',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Balance Test Online - Cursor Stability Challenge',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Balance Test Online - Free Cursor Stability Challenge | SkillDrills',
    description: 'Free online balance test. Resist wind forces. Adaptive difficulty. The best cursor stability training game. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/balance-training/stability-challenge',
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
              { "@type": "ListItem", "position": 3, "name": "Balance Training", "item": "https://skilldrills.online/drills/physical/balance-training" },
              { "@type": "ListItem", "position": 4, "name": "Balance Test Online - Stability Challenge" }
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
            "name": "Balance Test Online - Cursor Stability Challenge",
            "url": "https://skilldrills.online/drills/physical/balance-training/stability-challenge",
            "description": "Free online balance test and cursor stability training game. Resist wind forces pushing cursor from center. Adaptive difficulty increases with stability. Pure positive scoring, no penalties. Best balance test in your browser.",
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
                "name": "What is this online balance test?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free digital balance test and cursor stability challenge. Simulated wind forces push your cursor from the center. Resist and stay in the ring for points. Adaptive difficulty, no penalties. The best free balance test available online."
                }
              },
              {
                "@type": "Question",
                "name": "How does adaptive difficulty work in this balance training game?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Starts at difficulty 1.0, increases 0.05 per second of stability. Higher difficulty = stronger, more aggressive wind. Resets to 1.0 if cursor drifts beyond 300px. Always a balanced challenge."
                }
              },
              {
                "@type": "Question",
                "name": "How is the balance test scored?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Pure positive scoring: +1pt every 0.5s inside the ring. No penalties, no lives, no deductions. Cursor resets if too far but points are kept. Tracks your peak difficulty reached."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up for this balance test?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This free online balance test and stability challenge works instantly in your browser — no downloads needed."
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