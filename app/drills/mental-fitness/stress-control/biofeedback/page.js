import CoherenceBreathingClient from './CoherenceBreathingClient';

export const metadata = {
  title: 'Coherence Breathing - HRV Biofeedback | SkillDrills',
  description: 'Optimize HRV with 5:6 ratio breathing. 5s inhale, 6s exhale with visual pacer and audio tones. 5-minute guided session. No sign-up.',
  keywords: [
    'coherence breathing', 'heart rate variability training', 'HRV biofeedback',
    '5:6 breathing ratio', 'vagal tone improvement', 'resonance frequency breathing',
    'cardiac coherence', 'heart brain coherence', 'stress reduction breathing',
    'HRV optimization', 'parasympathetic activation', 'free biofeedback app',
    'breathing pacer online', 'mindfulness breathing exercise', 'autonomic nervous system',
    'free breathing drill', 'coherence breathing technique', 'HRV training free',
    'breathing exercise for anxiety', 'calm breathing practice', 'vagus nerve stimulation',
    'deep breathing exercise', 'relaxation breathing', 'stress management breathing',
    'breathing for sleep', 'meditation breathing timer', 'guided breathing session',
    'visual breathing pacer', 'audio breathing guide', 'breathwork practice',
    'nervous system regulation', 'polyvagal theory exercise', 'heart coherence training',
    'skilldrills breathing', 'skilldrills biofeedback', 'free online breathwork',
    'resonance breathing', 'coherent breathing', 'slow breathing exercise',
    'HRV biofeedback training free', 'cardiac coherence training', 'breath pacing tool',
  ],
  openGraph: {
    title: 'Coherence Breathing - HRV Biofeedback | SkillDrills',
    description: 'Optimize HRV with 5:6 ratio breathing. 5s inhale, 6s exhale with visual pacer and audio tones. 5-minute guided session. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/mental-fitness/stress-control/biofeedback',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Coherence Breathing Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coherence Breathing - HRV Biofeedback | SkillDrills',
    description: 'Optimize HRV with 5:6 ratio breathing. 5s inhale, 6s exhale with visual pacer and audio tones. 5-minute guided session. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/mental-fitness/stress-control/biofeedback',
  },
};

export default function CoherenceBreathingPage() {
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
              { "@type": "ListItem", "position": 3, "name": "Stress Control", "item": "https://skilldrills.online/drills/mental-fitness/stress-control" },
              { "@type": "ListItem", "position": 4, "name": "Coherence Breathing" }
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
            "name": "Coherence Breathing Drill",
            "url": "https://skilldrills.online/drills/mental-fitness/stress-control/biofeedback",
            "description": "Free 5:6 ratio breathing drill for HRV optimization. Visual pacer and audio tones (523Hz/392Hz). 5-minute guided session for cardiac coherence.",
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
                "name": "What is coherence breathing?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A 5:6 breath ratio (5s inhale, 6s exhale) at ~5.5 breaths/min. Maximizes HRV through respiratory sinus arrhythmia. Visual pacer and audio tones guide you."
                }
              },
              {
                "@type": "Question",
                "name": "What are the benefits?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Optimized HRV, improved vagal tone, reduced cortisol, enhanced emotional regulation, better sleep, reduced anxiety, and lower blood pressure."
                }
              },
              {
                "@type": "Question",
                "name": "How long should I practice?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "5-10 minutes twice daily. This drill provides a 5-minute session. 4-6 weeks of regular practice shows significant improvements in resting HRV."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This coherence breathing drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <CoherenceBreathingClient />
    </>
  );
}