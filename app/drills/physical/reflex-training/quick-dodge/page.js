import QuickDodgeClient from './QuickDodgeClient';

export const metadata = {
  title: 'Quick Dodge - Evasion Reflex Drill | SkillDrills',
  description: 'Dodge red homing obstacles tracking your cursor. +1pt per dodge, -5 on hit. Adaptive speed with streaks. Fullscreen mode available. No sign-up.',
  keywords: [
    'quick dodge game', 'evasion reflex training', 'spatial awareness drill',
    'dodge obstacles game', 'cursor evasion practice', 'reflex dodge training',
    'homing obstacle dodger', 'reaction evasion test', 'free dodge game online',
    'hand-eye coordination dodge', 'spatial avoidance training', 'reflex challenge',
    'dodge master game', 'obstacle avoidance drill', 'fullscreen dodge challenge',
    'reflex training for gamers', 'evasion skills game', 'reaction time dodge',
    'mouse cursor dodge', 'free reflex test', 'online dodge trainer',
    'skilldrills dodge', 'skilldrills reflex', 'free physical training drill',
  ],
  openGraph: {
    title: 'Quick Dodge - Evasion Reflex Drill | SkillDrills',
    description: 'Dodge red homing obstacles tracking your cursor. +1pt per dodge, -5 on hit. Adaptive speed with streaks. Fullscreen mode available. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/physical/reflex-training/quick-dodge',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Quick Dodge Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quick Dodge - Evasion Reflex Drill | SkillDrills',
    description: 'Dodge red homing obstacles tracking your cursor. +1pt per dodge, -5 on hit. Adaptive speed with streaks. Fullscreen mode available. No sign-up.',
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
              { "@type": "ListItem", "position": 4, "name": "Quick Dodge" }
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
            "name": "Quick Dodge Drill",
            "url": "https://skilldrills.online/drills/physical/reflex-training/quick-dodge",
            "description": "Free evasion reflex drill. Dodge red homing obstacles tracking cursor. +1pt/dodge, -5 on hit. Adaptive speed. Fullscreen mode adds 50% more obstacles.",
            "applicationCategory": "HealthApplication",
            "operatingSystem": "All",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "author": { "@type": "Organization", "name": "SkillDrills" },
            "isAccessibleForFree": true
          })
        }}
      />

      <QuickDodgeClient />
    </>
  );
}