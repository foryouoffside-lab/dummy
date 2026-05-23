import CalmUnderPressureClient from './CalmUnderPressureClient';

export const metadata = {
  title: 'Calm Under Pressure - Stress Inoculation Training | SkillDrills',
  description: 'Build cognitive resilience with dual-task breathing and cognitive load distractions. 3-minute challenge with 2x points under pressure. No sign-up.',
  keywords: [
    'stress inoculation training', 'calm under pressure drill', 'cognitive resilience training',
    'dual-task training', 'stress management drill free', 'coherence breathing under load',
    'cognitive load training', 'resilience building exercise', 'pressure performance training',
    'stress tolerance drill', 'mental toughness training', 'focus under distraction',
    'free stress training', 'biofeedback stress drill', 'vagal tone under pressure',
    'breathing exercise stress', 'anxiety management drill', 'stress resilience online',
    'performance under pressure', 'cognitive training stress', 'mindfulness stress drill',
    'skilldrills stress training', 'skilldrills calm pressure', 'free mental fitness',
    'stress inoculation for athletes', 'stress training for professionals', 'exam stress management',
    'first responder stress training', 'executive stress management', 'student stress relief',
    'online stress drill', 'browser stress training', 'no download stress drill',
  ],
  openGraph: {
    title: 'Calm Under Pressure - Stress Resilience | SkillDrills',
    description: 'Build stress resilience with dual-task breathing. 3-min challenge. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/mental-fitness/stress-control/calm-under-pressure',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Calm Under Pressure Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calm Under Pressure Drill | SkillDrills',
    description: 'Build stress resilience with dual-task breathing. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/mental-fitness/stress-control/calm-under-pressure',
  },
};

export default function CalmUnderPressurePage() {
  return (
    <>
      <noscript>
        <h1>Calm Under Pressure Drill - Stress Inoculation & Cognitive Resilience Training</h1>
        <p>Free dual-task stress inoculation drill with coherence breathing and cognitive load. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 3, "name": "Stress Control", "item": "https://skilldrills.online/drills/mental-fitness/stress-control" },
              { "@type": "ListItem", "position": 4, "name": "Calm Under Pressure" }
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
            "name": "Calm Under Pressure Drill",
            "url": "https://skilldrills.online/drills/mental-fitness/stress-control/calm-under-pressure",
            "description": "Free stress inoculation drill combining 5:6 coherence breathing with cognitive load. Random numbers flash during pressure phase. 2x points under load.",
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
                "name": "What is the Calm Under Pressure drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free dual-task stress inoculation exercise. Maintain 5:6 coherence breathing while random numbers flash as distractions. 2x points during cognitive load phase."
                }
              },
              {
                "@type": "Question",
                "name": "How does stress inoculation work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Like a vaccine for stress. Practice calming technique while exposed to mild stressors. Brain learns to maintain composure under pressure."
                }
              },
              {
                "@type": "Question",
                "name": "Who benefits from this training?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Athletes, first responders, executives, students, public speakers, performers, and anyone wanting better stress management in high-pressure situations."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This stress inoculation drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <CalmUnderPressureClient />
    </>
  );
}