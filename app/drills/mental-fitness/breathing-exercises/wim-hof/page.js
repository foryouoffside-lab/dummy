import WimHofClient from './WimHofClient';

export const metadata = {
  title: 'Wim Hof Method - Oxygenation Drill | SkillDrills',
  description: 'Practice WHM power breathing with 30 rapid inhale-exhale cycles. Visual pacer guides each breath. Track combos and oxygen boost. No sign-up.',
  keywords: [
    'wim hof breathing', 'wim hof method', 'power breathing', 'whm breathing',
    'oxygenation exercise', 'breathwork drill', 'holotropic breathing',
    'energy breathing', 'wim hof technique', 'deep breathing exercise',
    'breathing meditation', 'free breathing app', 'breath training',
    'oxygen saturation', 'vitality breathing', 'stress relief breathing',
    'wim hof power breathing', 'whm power breathing', '30 breaths drill',
    'free breathwork online', 'interactive breathing exercise', 'guided breathing',
    'breathing for energy', 'breathing for immunity', 'breathing for focus',
    'cold exposure preparation', 'tummo breathing', 'pranayama practice',
    'breathing for anxiety', 'breathing for stress', 'mindful breathing',
    'skilldrills breathing', 'skilldrills wim hof', 'free whm practice',
    'breathing timer online', 'visual pacer breathing', 'breath counter',
    'daily breathing practice', 'morning breathing routine', 'wellness breathing',
    'holistic breathing', 'breathing for health', 'respiratory training',
  ],
  openGraph: {
    title: 'Wim Hof Method - Oxygenation Drill | SkillDrills',
    description: 'Practice WHM power breathing with 30 rapid inhale-exhale cycles. Visual pacer guides each breath. Track combos and oxygen boost. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/mental-fitness/breathing-exercises/wim-hof',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Wim Hof Method Breathing',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wim Hof Method - Oxygenation Drill | SkillDrills',
    description: 'Practice WHM power breathing with 30 rapid inhale-exhale cycles. Visual pacer guides each breath. Track combos and oxygen boost. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/mental-fitness/breathing-exercises/wim-hof',
  },
};

export default function WimHofPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Mental Fitness", "item": "https://skilldrills.online/drills/mental-fitness" },
              { "@type": "ListItem", "position": 3, "name": "Breathing Exercises", "item": "https://skilldrills.online/drills/mental-fitness/breathing-exercises" },
              { "@type": "ListItem", "position": 4, "name": "Wim Hof Method" }
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
            "name": "Wim Hof Method Breathing Drill",
            "url": "https://skilldrills.online/drills/mental-fitness/breathing-exercises/wim-hof",
            "description": "Free WHM power breathing drill with 30 rapid inhale-exhale cycles. Visual pacer, combo streaks, and oxygen boost tracking. Scientifically studied breathwork.",
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
                "name": "What is the Wim Hof Method breathing drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free interactive guide through 30 WHM power breaths. Visual pacer expands on inhale, contracts on exhale. 1 point per breath with combo streaks."
                }
              },
              {
                "@type": "Question",
                "name": "What are the benefits of WHM breathing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Increases oxygen saturation, boosts energy, strengthens immunity, reduces stress and anxiety, improves mental clarity, and enhances cold tolerance."
                }
              },
              {
                "@type": "Question",
                "name": "Is this breathing drill safe?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Practice sitting or lying down. Never while driving or swimming. Consult doctor if you have cardiovascular issues, epilepsy, high BP, or are pregnant."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This WHM breathing drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <WimHofClient />
    </>
  );
}