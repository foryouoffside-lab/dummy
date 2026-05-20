import QuickDodgeClient from './QuickDodgeClient';

export const metadata = {
  title: 'Free Quick Dodge Drill - Evasion Reflex & Spatial Awareness Training | SkillDrills',
  description: 'Train your evasion reflexes with this free quick dodge game. Dodge red homing obstacles that track your cursor. Earn +1 point per successful dodge and -5 on hit. Adaptive speed increases with streaks. Fullscreen mode adds 50% more obstacles for extra challenge. 60-second timed reflex challenge. No sign-up required.',
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
    title: 'Free Quick Dodge Drill - Evasion Reflex & Spatial Awareness Training | SkillDrills',
    description: 'Dodge red homing obstacles tracking your cursor. +1 per dodge, -5 on hit. Adaptive speed with streaks. Fullscreen mode for 50% more chaos. 60-second challenge.',
    type: 'article',
    url: 'https://skilldrills.online/drills/physical/Reflex-Training/quick-dodge',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'Quick Dodge Reflex Training Drill',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Quick Dodge Reflex Drill | SkillDrills',
    description: 'Dodge homing obstacles. Adaptive speed, fullscreen mode. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': 320,
    },
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/Reflex-Training/quick-dodge',
    languages: {
      'en': 'https://skilldrills.online/drills/physical/Reflex-Training/quick-dodge',
      'en-US': 'https://skilldrills.online/drills/physical/Reflex-Training/quick-dodge',
      'x-default': 'https://skilldrills.online/drills/physical/Reflex-Training/quick-dodge',
    },
  },
  verification: {
    google: 'bf3e19be4c41802b',
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
              { "@type": "ListItem", "position": 2, "name": "Physical Drills", "item": "https://skilldrills.online/drills/physical" },
              { "@type": "ListItem", "position": 3, "name": "Reflex Training", "item": "https://skilldrills.online/drills/physical/Reflex-Training" },
              { "@type": "ListItem", "position": 4, "name": "Quick Dodge Drill" }
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
            "name": "Quick Dodge - Evasion Reflex Training",
            "url": "https://skilldrills.online/drills/physical/Reflex-Training/quick-dodge",
            "description": "Free interactive quick dodge drill for evasion reflex and spatial awareness training. Dodge red homing obstacles with adaptive speed and fullscreen mode.",
            "applicationCategory": "HealthApplication",
            "operatingSystem": "All",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/OnlineOnly" },
            "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
            "publisher": { "@type": "Organization", "name": "SkillDrills" },
            "educationalUse": ["Evasion Reflex", "Spatial Awareness", "Reaction Training", "Hand-Eye Coordination"],
            "learningResourceType": ["Interactive Exercise", "Reflex Drill", "Game"],
            "timeRequired": "PT60S",
            "interactivityType": "active",
            "inLanguage": "en-US",
            "teaches": ["Spatial Evasion", "Reflex Speed", "Obstacle Avoidance", "Adaptive Response"],
            "datePublished": "2026-05-20",
            "dateModified": new Date().toISOString().split('T')[0],
            "isAccessibleForFree": true
          })
        }}
      />
      <QuickDodgeClient />
    </>
  );
}