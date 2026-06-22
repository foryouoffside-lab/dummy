import QuickDodgeClient from './QuickDodgeClient';

export const metadata = {
  title: 'Dodge Game Online - Free Reflex Evasion Training | SkillDrills',
  description: 'Free dodge game online. Evade homing red obstacles with your cursor — the best reflex evasion and reaction training game. Adaptive speed with streak bonuses. Fullscreen mode. No sign-up required.',
  keywords: [
    'dodge game online', 'free dodge game online', 'online dodge game',
    'dodge game free', 'evasion game online', 'obstacle dodge game',
    'reflex game online', 'free reflex game online', 'online reflex game',
    'reflex training game', 'free reflex training', 'reflex training online',
    'reaction time game', 'reaction game online', 'free reaction game',
    'quick dodge game', 'cursor dodge game', 'mouse dodge game',
    'homing obstacle game', 'evasion reflex drill', 'spatial awareness game',
    'dodge obstacles online', 'obstacle avoidance game', 'evasion skill game',
    'hand eye coordination game', 'hand eye coordination training', 'coordination dodge game',
    'FPS evasion training', 'gaming reflex game', 'esports dodge training',
    'Valorant movement training', 'strafe training game', 'evasive movement drill',
    'adaptive speed dodge', 'streak bonus game', 'reflex challenge online',
    'skilldrills dodge', 'skilldrills reflex', 'free physical training game',
    'browser dodge game', 'no download dodge game', 'instant reflex dodge',
    'fullscreen dodge challenge', 'reaction evasion test', 'spatial reflex training',
  ],
  openGraph: {
    title: 'Dodge Game Online - Free Reflex Evasion Training | SkillDrills',
    description: 'Free dodge game online. Evade homing red obstacles — best reflex evasion training game. Adaptive speed, fullscreen mode. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/physical/reflex-training/quick-dodge',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Dodge Game Online - Reflex Evasion Training',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dodge Game Online - Free Reflex Evasion Training | SkillDrills',
    description: 'Free dodge game online. Evade homing obstacles. Best reflex evasion training game with adaptive speed. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/reflex-training/quick-dodge',
  },
};

export default function QuickDodgePage() {
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
              { "@type": "ListItem", "position": 3, "name": "Reflex Training", "item": "https://skilldrills.online/drills/physical/reflex-training" },
              { "@type": "ListItem", "position": 4, "name": "Dodge Game Online - Quick Dodge" }
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
            "name": "Dodge Game Online - Free Reflex Evasion Training",
            "url": "https://skilldrills.online/drills/physical/reflex-training/quick-dodge",
            "description": "Free dodge game online and reflex evasion training. Red homing obstacles track your cursor — dodge them for +1pt each. Getting hit costs -5pts. Adaptive speed scales with streak. Fullscreen mode adds 50% more obstacles.",
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
                "name": "What is this free dodge game online?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free dodge game online and reflex evasion training drill. Red homing obstacles track your cursor position — dodge them for +1pt each. Getting hit costs -5pts. Adaptive speed scales with your dodge streak."
                }
              },
              {
                "@type": "Question",
                "name": "How does adaptive speed work in this dodge game?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Obstacle speed in this dodge game online increases with your streak. The longer you survive without being hit, the faster and more aggressive the obstacles become — always pushing your evasion reflex limits."
                }
              },
              {
                "@type": "Question",
                "name": "What does Fullscreen mode do in this reflex game?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Fullscreen mode in this dodge game online adds 50% more homing obstacles to the field, dramatically increasing the evasion challenge. Recommended for advanced players looking for maximum reflex training difficulty."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up for this dodge game?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This free dodge game online and reflex evasion training works instantly in your browser — no downloads needed."
                }
              }
            ]
          })
        }}
      />

      <QuickDodgeClient />
    </>
  );
}