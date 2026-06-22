import AimTrainerClient from './AimTrainerClient';

export const metadata = {
  title: 'Free Aim Trainer Online - Mouse Accuracy Drill | SkillDrills',
  description: 'Free aim trainer online. Click shrinking targets from 20px to 8px — the best aim training game for FPS players. Reaction time tracking, streak progression, 3-life system. No sign-up required.',
  keywords: [
    'free aim trainer', 'aim trainer online', 'aim trainer free', 'best aim trainer',
    'aim training game', 'aim training online', 'fps aim trainer', 'mouse aim trainer',
    'mouse accuracy test', 'mouse accuracy drill', 'mouse accuracy training',
    'click accuracy game', 'click accuracy test', 'click accuracy drill',
    'aim practice online', 'free aim practice', 'aim drill free',
    'hand eye coordination game', 'hand eye coordination training', 'hand eye coordination drill',
    'reaction time test', 'reaction time training', 'reflex training game',
    'Valorant aim trainer', 'CS2 aim training', 'Apex Legends aim trainer',
    'Overwatch aim practice', 'FPS gaming training', 'esports aim trainer',
    'shrinking target game', 'target clicking game', 'precision clicking drill',
    'mouse precision test', 'cursor accuracy training', 'mouse control training',
    'gaming aim practice', 'aim improvement game', 'click speed game',
    'skilldrills aim trainer', 'skilldrills motor drills', 'no download aim trainer',
    'browser aim trainer', 'online aim practice', 'instant aim training',
  ],
  openGraph: {
    title: 'Free Aim Trainer Online - Best Mouse Accuracy Drill | SkillDrills',
    description: 'Free aim trainer online. Click shrinking targets — best aim training game for FPS players. Reaction tracking, streak progression. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/hand-eye-coordination/aim-trainer',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Free Aim Trainer Online - Mouse Accuracy Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Aim Trainer Online - Best Mouse Accuracy Drill | SkillDrills',
    description: 'Free aim trainer. Click shrinking targets. Best online aim training for FPS gamers. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/hand-eye-coordination/aim-trainer',
  },
};

export default function AimTrainerPage() {
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
              { "@type": "ListItem", "position": 3, "name": "Hand-Eye Coordination", "item": "https://skilldrills.online/drills/motor/hand-eye-coordination" },
              { "@type": "ListItem", "position": 4, "name": "Free Aim Trainer Online" }
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
            "name": "Free Aim Trainer Online - Mouse Accuracy Drill",
            "url": "https://skilldrills.online/drills/motor/hand-eye-coordination/aim-trainer",
            "description": "Free aim trainer online and mouse accuracy drill. Targets shrink from 20px to 8px with streak. 3-life system, millisecond reaction tracking. Best free aim training game for Valorant, CS2, Apex Legends.",
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
                "name": "What is this free aim trainer online?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free aim trainer online and mouse accuracy drill. Targets shrink from 20px to 8px with streak progression. 3-life system: misclicks cost lives. Millisecond reaction time tracked. Best free aim training game available."
                }
              },
              {
                "@type": "Question",
                "name": "Is this aim trainer good for FPS games?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. This free aim trainer directly improves click accuracy, target acquisition speed, and mouse precision — all critical for Valorant, CS2, Apex Legends, Overwatch 2, and Call of Duty."
                }
              },
              {
                "@type": "Question",
                "name": "How does the shrinking target system work in this aim trainer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Targets shrink 0.15px per streak count (minimum 8px). Colors: white (0-7 streak), green (8-14), cyan (15+). Target lifespan decreases with streak. 10x streak bonuses. Increasingly difficult as you improve."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up for this aim trainer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This free aim trainer online works instantly in your browser — no downloads, no sign-up needed."
                }
              }
            ]
          })
        }}
      />
      <AimTrainerClient />
    </>
  );
}