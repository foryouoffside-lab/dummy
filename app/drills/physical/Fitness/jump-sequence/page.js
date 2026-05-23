import JumpSequenceClient from './JumpSequenceClient';

export const metadata = {
  title: 'Jump Sequence Drill - Precision Jumping & Trajectory | SkillDrills',
  description: 'Charge-and-launch with mid-air steering. Land on green targets for points. Combo streaks every 5 hits. 60-second challenge. No sign-up.',
  keywords: [
    'jump sequence drill', 'precision jumping game', 'trajectory control training',
    'charge and launch drill', 'motor control jumping', 'aim training game free',
    'projectile control practice', 'jump accuracy test', 'free jumping drill online',
    'hand-eye coordination jump', 'charged jump practice', 'trajectory aiming game',
    'precision motor skills training', 'jump timing training', 'ball launching game',
    'mid-air steering practice', 'mouse control jumping', 'target landing drill',
    'physics jumping game', 'skill-based jumping', 'coordination training online',
    'free motor skills drill', 'jump sequence practice', 'trajectory prediction training',
    'online jumping challenge', 'precision landing game', 'charge mechanic training',
    'skilldrills jump sequence', 'skilldrills physical drill', 'free coordination game',
    'gaming motor skills', 'esports coordination training', 'mouse precision practice',
    'timing accuracy drill', 'reaction jumping test', 'physics trajectory game',
    'free online coordination test', 'hand-eye training game', 'precision aim practice',
    'competitive gaming skills', 'reflex jumping drill', 'movement prediction training',
  ],
  openGraph: {
    title: 'Jump Sequence Drill - Precision Jumping | SkillDrills',
    description: 'Charge-and-launch with mid-air steering. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/physical/Fitness/jump-sequence',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Jump Sequence Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jump Sequence Drill | SkillDrills',
    description: 'Charge, launch, and steer to land on targets. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/Fitness/jump-sequence',
  },
};

export default function JumpSequencePage() {
  return (
    <>
      <noscript>
        <h1>Jump Sequence Drill - Precision Jumping & Trajectory Control Training</h1>
        <p>Free charge-and-launch drill with mid-air steering. No sign-up required.</p>
      </noscript>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "Physical Training", "item": "https://skilldrills.online/drills/physical" },
              { "@type": "ListItem", "position": 3, "name": "Fitness", "item": "https://skilldrills.online/drills/physical/Fitness" },
              { "@type": "ListItem", "position": 4, "name": "Jump Sequence" }
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
            "name": "Jump Sequence Drill",
            "url": "https://skilldrills.online/drills/physical/Fitness/jump-sequence",
            "description": "Free trajectory control drill. Charge-and-launch with mid-air steering. Land on green targets. Combo streaks every 5 hits. 60s challenge.",
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
                "name": "What is the Jump Sequence Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free coordination game. Click-hold to charge, release to launch, steer mid-air with mouse. Land on green targets. Combo streaks every 5 hits."
                }
              },
              {
                "@type": "Question",
                "name": "How do charge-and-launch mechanics work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Hold mouse on ball to charge (cyan bar). Longer hold = higher jump. Release to launch. Move mouse mid-air to steer left/right."
                }
              },
              {
                "@type": "Question",
                "name": "What skills does this improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Trajectory control, mouse precision, hand-eye coordination, timing accuracy, and quick decision-making for projectile aim."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This jump sequence drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <JumpSequenceClient />
    </>
  );
}