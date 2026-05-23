import BoxBreathingClient from './BoxBreathingClient';

export const metadata = {
  title: 'Box Breathing Drill - 4-4-4-4 Tactical Breathing | SkillDrills',
  description: 'Master box breathing with square visual pacer. 4s inhale, hold, exhale, hold. Used by Navy SEALs. Track focus score. No sign-up.',
  keywords: [
    'box breathing', 'tactical breathing', '4-4-4-4 breathing', 'square breathing',
    'Navy SEAL breathing', 'stress relief breathing', 'focus breathing',
    'breathing exercise', 'calm breathing', 'meditation breathing',
    'breathing pacer', 'anxiety breathing technique', 'free breathing app',
    'relaxation drill', 'parasympathetic activation', 'mental clarity breathing',
    'breathing for anxiety', 'breathing for focus', 'breathing for sleep',
    'mindfulness breathing', 'yoga breathing', 'pranayama breathing',
    'tactical breathing military', 'first responder breathing', 'stress management breathing',
    'breathing timer', 'visual breathing guide', 'breathing biofeedback',
    'free breathing exercises', 'online breathing drill', 'browser breathing practice',
    'breathing for PTSD', 'breathing for panic attacks', 'calming breathing technique',
    'skilldrills breathing', 'skilldrills box breathing', 'free meditation tool',
    'deep breathing exercise', 'diaphragmatic breathing', 'belly breathing practice',
    'breathing for performance', 'pre-game breathing', 'athlete breathing drill',
  ],
  openGraph: {
    title: 'Box Breathing Drill - Tactical Breathing | SkillDrills',
    description: 'Square breathing with visual pacer. 4s inhale, hold, exhale, hold. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/mental-fitness/breathing-exercises/box-breathing',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Box Breathing Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Box Breathing Drill | SkillDrills',
    description: 'Navy SEAL 4-4-4-4 breathing with visual pacer. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/mental-fitness/breathing-exercises/box-breathing',
  },
};

export default function BoxBreathingPage() {
  return (
    <>
      <noscript>
        <h1>Box Breathing Drill - 4-4-4-4 Tactical Breathing Exercise for Stress Relief & Focus</h1>
        <p>Free box breathing drill with square visual pacer. Used by Navy SEALs. No sign-up required.</p>
      </noscript>

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
              { "@type": "ListItem", "position": 4, "name": "Box Breathing" }
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
            "name": "Box Breathing Drill",
            "url": "https://skilldrills.online/drills/mental-fitness/breathing-exercises/box-breathing",
            "description": "Free box breathing drill with 4-4-4-4 pattern. Square visual pacer guides inhale, hold, exhale, hold phases. Track focus score and combo streaks.",
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
                "name": "What is box breathing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Tactical 4-4-4-4 breathing used by Navy SEALs. Inhale 4s, hold 4s, exhale 4s, hold 4s. Activates parasympathetic nervous system for calm and focus."
                }
              },
              {
                "@type": "Question",
                "name": "What are the benefits?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Reduces cortisol and stress, lowers heart rate, improves focus, helps manage anxiety and panic attacks, improves sleep, and builds mental resilience."
                }
              },
              {
                "@type": "Question",
                "name": "Who uses box breathing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Navy SEALs, first responders, athletes, CEOs, therapists, and anyone seeking better stress management and mental clarity."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This box breathing drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <BoxBreathingClient />
    </>
  );
}