import ConcentrationStaminaClient from './ConcentrationStaminaClient';

export const metadata = {
  title: 'Concentration Stamina - Attention Drill | SkillDrills',
  description: 'Alternating VOWELS and PRIMES rule sets every 10 seconds. Adaptive 800-400ms speed. 3 lives, combo streaks. No sign-up.',
  keywords: [
    'sustained attention drill', 'concentration training', 'focus endurance practice',
    'cognitive flexibility test', 'attention drill online', 'constant prime drill',
    'task switching training', 'selective attention exercise', 'mental stamina training',
    'focus training free', 'attention span improvement', 'cognitive control practice',
    'brain training attention', 'concentration exercise online', 'adaptive speed drill',
    'vowels and primes drill', 'rule switching attention', 'sustained focus training',
    'productivity focus drill', 'deep work preparation', 'attention stamina test',
    'free concentration game', 'online focus trainer', 'browser attention drill',
    'skilldrills concentration', 'skilldrills focus training', 'free cognitive drill',
    'attention endurance practice', 'mental focus exercise', 'concentration span test',
    'sustained attention test online', 'cognitive flexibility drill free',
    'focus endurance challenge', 'attention training for adults', 'concentration practice',
    'brain focus exercise', 'mental concentration game', 'attention booster drill',
    'free online focus training', 'no sign up concentration drill', 'instant focus practice',
  ],
  openGraph: {
    title: 'Concentration Stamina - Attention Drill | SkillDrills',
    description: 'Alternating VOWELS and PRIMES rule sets every 10 seconds. Adaptive 800-400ms speed. 3 lives, combo streaks. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/productivity/focus-endurance/concentration-stamina',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Concentration Stamina Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Concentration Stamina - Attention Drill | SkillDrills',
    description: 'Alternating VOWELS and PRIMES rule sets every 10 seconds. Adaptive 800-400ms speed. 3 lives, combo streaks. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/productivity/focus-endurance/concentration-stamina',
  },
};

export default function ConcentrationStaminaPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Productivity Training", "item": "https://skilldrills.online/drills/productivity" },
              { "@type": "ListItem", "position": 3, "name": "Focus Endurance", "item": "https://skilldrills.online/drills/productivity/focus-endurance" },
              { "@type": "ListItem", "position": 4, "name": "Concentration Stamina" }
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
            "name": "Concentration Stamina Drill",
            "url": "https://skilldrills.online/drills/productivity/focus-endurance/concentration-stamina",
            "description": "Free sustained attention drill. Alternating VOWELS and PRIMES rules every 10s. Adaptive 800-400ms speed. 3 lives, combo streaks.",
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
                "name": "What is the Concentration Stamina Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free sustained attention exercise. Rule A: identify vowels (A,E,I,O,U). Rule B: identify primes (2,3,5,7). Rules switch every 10s. Adaptive 800-400ms speed."
                }
              },
              {
                "@type": "Question",
                "name": "How does adaptive speed work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Starts at 800ms. 80%+ accuracy increases speed by 50ms (min 400ms). Below 50% accuracy decreases by 50ms (max 800ms)."
                }
              },
              {
                "@type": "Question",
                "name": "What skills does this improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sustained attention, cognitive flexibility, selective attention, processing speed, and task-switching ability."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This concentration drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <ConcentrationStaminaClient />
    </>
  );
}