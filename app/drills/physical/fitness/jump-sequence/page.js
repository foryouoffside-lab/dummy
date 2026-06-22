import JumpSequenceClient from './JumpSequenceClient';

export const metadata = {
  title: 'Reaction Time Training - Free Jump Sequence Precision Drill | SkillDrills',
  description: 'Free reaction time training game. Charge-and-launch with mid-air steering, land on targets — the best trajectory control and reaction training drill. Combo streaks every 5 hits. 60-second challenge. No sign-up.',
  keywords: [
    'reaction time training', 'reaction training game', 'free reaction time training',
    'reaction time drill', 'reaction training online', 'reaction speed training',
    'trajectory control game', 'trajectory training online', 'precision jumping game',
    'jump sequence drill', 'charge and launch game', 'projectile control practice',
    'aim training reaction', 'free aim trainer game', 'online aim training',
    'hand eye coordination jump', 'hand eye coordination game', 'coordination training game',
    'precision motor training', 'mouse control training', 'cursor trajectory game',
    'mid air steering game', 'physics game online free', 'jumping accuracy drill',
    'target landing game', 'landing precision training', 'timing accuracy training',
    'combo streak game', 'gaming reaction training', 'FPS reaction drill',
    'Valorant reaction training', 'CS2 reaction drill', 'esports reaction game',
    'competitive gaming reaction', 'motor skills reaction', 'quick decision training',
    'skilldrills jump sequence', 'skilldrills reaction', 'free physical training online',
    'browser reaction game', 'no download reaction test', 'instant reaction training',
    'projectile aim game', 'trajectory prediction training', 'physics skill game',
  ],
  openGraph: {
    title: 'Reaction Time Training - Free Jump Sequence Precision Drill | SkillDrills',
    description: 'Free reaction time training. Charge-and-launch with mid-air steering — best trajectory control and reaction training drill. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/physical/fitness/jump-sequence',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Reaction Time Training - Jump Sequence Precision Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reaction Time Training - Free Jump Sequence Precision Drill | SkillDrills',
    description: 'Free reaction time training and trajectory control drill. Best reaction training game for gamers and athletes. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/fitness/jump-sequence',
  },
};

export default function JumpSequencePage() {
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
              { "@type": "ListItem", "position": 3, "name": "Fitness", "item": "https://skilldrills.online/drills/physical/fitness" },
              { "@type": "ListItem", "position": 4, "name": "Reaction Time Training - Jump Sequence" }
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
            "name": "Reaction Time Training - Jump Sequence Precision Drill",
            "url": "https://skilldrills.online/drills/physical/fitness/jump-sequence",
            "description": "Free reaction time training and trajectory control drill. Charge-and-launch mechanic with mid-air mouse steering. Land on green targets for points. Combo streaks every 5 hits. Best reaction training drill for gamers and athletes.",
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
                "name": "What is this reaction time training drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free reaction time training and trajectory control game. Click-hold to charge, release to launch, steer mid-air with mouse. Land on green targets for points. Combo streaks every 5 hits in this 60-second reaction training challenge."
                }
              },
              {
                "@type": "Question",
                "name": "How do charge-and-launch mechanics work in this reaction training game?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Hold mouse on the ball to charge (cyan progress bar). Longer hold = higher jump. Release to launch. Move mouse mid-air to steer left or right and land on the target. Reaction time and precision both matter."
                }
              },
              {
                "@type": "Question",
                "name": "What skills does this reaction time training improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Reaction time, trajectory control, mouse precision, hand-eye coordination, timing accuracy, and quick decision-making for projectile aim — all critical skills in FPS games like Valorant, CS2, and Apex Legends."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up for this reaction time training?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This free reaction time training game works instantly in your browser — no downloads needed."
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