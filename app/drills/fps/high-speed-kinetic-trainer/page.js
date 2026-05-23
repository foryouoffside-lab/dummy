import KineticTrainerClient from './KineticTrainerClient';

export const metadata = {
  title: 'High-Speed Kinetic - Bouncing Target | SkillDrills',
  description: 'Train FPS aim with bouncing teleporting targets. Raw mouse input, combo speed scaling up to 60px/s. No penalties. No sign-up.',
  keywords: [
    'kinetic trainer', 'bouncing target aim', 'moving target practice',
    'prediction aim drill', 'tracking speed trainer', 'FPS moving target',
    'kinetic aim training', 'bouncing ball aim', 'speed tracking drill',
    'target prediction FPS', 'free aim trainer kinetic', 'moving target clicker',
    'FPS tracking practice', 'combo speed aim', 'raw mouse input trainer',
    'pointer lock aim trainer', 'free FPS aim drill', 'online aim practice',
    'high speed target tracking', 'bouncing target FPS', 'teleport target drill',
    'Valorant aim trainer', 'CS2 aim practice', 'Overwatch tracking drill',
    'Apex Legends aim training', 'reaction speed FPS', 'mouse accuracy trainer',
    'skilldrills kinetic', 'skilldrills FPS drill', 'free aim training online',
    'browser aim trainer', 'no download aim practice', 'instant aim training',
  ],
  openGraph: {
    title: 'High-Speed Kinetic - Bouncing Target | SkillDrills',
    description: 'Train FPS aim with bouncing teleporting targets. Raw mouse input, combo speed scaling up to 60px/s. No penalties. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/high-speed-kinetic-trainer',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'High-Speed Kinetic Trainer',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'High-Speed Kinetic - Bouncing Target | SkillDrills',
    description: 'Train FPS aim with bouncing teleporting targets. Raw mouse input, combo speed scaling up to 60px/s. No penalties. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/high-speed-kinetic-trainer',
  },
};

export default function KineticTrainerPage() {
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
              { "@type": "ListItem", "position": 2, "name": "FPS Training", "item": "https://skilldrills.online/drills/fps" },
              { "@type": "ListItem", "position": 3, "name": "High-Speed Kinetic Trainer" }
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
            "name": "High-Speed Kinetic Trainer",
            "url": "https://skilldrills.online/drills/fps/high-speed-kinetic-trainer",
            "description": "Free FPS kinetic trainer with bouncing teleporting targets. Raw mouse input, combo speed scaling up to 60px/s. No penalties.",
            "applicationCategory": "GamingApplication",
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
                "name": "What is the High-Speed Kinetic Trainer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free FPS aim drill with bouncing teleporting green targets. Raw mouse input via Pointer Lock API. Target speed scales with combo streaks up to 60px/s."
                }
              },
              {
                "@type": "Question",
                "name": "Are there penalties for missing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No penalties. Pure aim practice without punishment. Misses break your combo but don't deduct points. Push your speed limits freely."
                }
              },
              {
                "@type": "Question",
                "name": "How does target speed increase?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Base speed starts at 14px/s. Increases with combo streaks. Every 5-hit combo triggers bonus. Max speed reaches 60px/s."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This kinetic trainer is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <KineticTrainerClient />
    </>
  );
}