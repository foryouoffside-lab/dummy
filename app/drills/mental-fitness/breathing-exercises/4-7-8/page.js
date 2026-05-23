import VagalBrakeClient from './VagalBrakeClient';

export const metadata = {
  title: '4-7-8 Breathing Exercise - Vagal Brake Relaxation | SkillDrills',
  description: 'Master the 4-7-8 breathing technique with guided visual pacer. Inhale 4s, hold 7s, exhale 8s. Activates vagus nerve for deep calm. No sign-up.',
  keywords: [
    '4-7-8 breathing', 'vagal brake', 'breathing exercise', 'relaxation technique',
    'vagus nerve stimulation', 'stress relief breathing', 'anxiety breathing',
    'deep breathing exercise', 'guided breathing', 'breathing pacer',
    'calm breathing', 'meditation breathing', 'free breathing app',
    'relaxation drill', 'parasympathetic activation', 'sleep breathing',
    'Dr Andrew Weil breathing', '4-7-8 technique', 'breathing for anxiety',
    'free relaxation exercise', 'online breathing drill', 'breathing visualizer',
    'stress management tool', 'mindfulness breathing', 'calm down breathing',
    'breathing exercise for sleep', 'vagal tone improvement', 'HRV breathing',
    'skilldrills breathing', 'skilldrills relaxation', 'free meditation drill',
    'guided breathwork', 'breathing cycle tracker', 'relaxation score',
    'no sign up breathing exercise', 'browser breathing app', 'instant relaxation',
  ],
  openGraph: {
    title: '4-7-8 Breathing Exercise - Vagal Brake Relaxation | SkillDrills',
    description: 'Guided 4-7-8 breathing with visual pacer. Activate vagus nerve. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/mental-fitness/breathing-exercises/4-7-8',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: '4-7-8 Breathing Exercise',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '4-7-8 Breathing Exercise | SkillDrills',
    description: 'Activate vagus nerve with guided 4-7-8 breathing. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/mental-fitness/breathing-exercises/4-7-8',
  },
};

export default function VagalBrakePage() {
  return (
    <>
      <noscript>
        <h1>4-7-8 Breathing Exercise - Vagal Brake Relaxation for Stress Relief & Sleep</h1>
        <p>Free guided 4-7-8 breathing drill with visual pacer. Activate vagus nerve for deep calm. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 4, "name": "4-7-8 Breathing" }
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
            "name": "4-7-8 Breathing Exercise",
            "url": "https://skilldrills.online/drills/mental-fitness/breathing-exercises/4-7-8",
            "description": "Free guided 4-7-8 breathing drill with visual pacer and audio cues. Inhale 4s, hold 7s, exhale 8s. Activate vagus nerve for deep relaxation.",
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
                "name": "What is the 4-7-8 breathing technique?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A relaxation method by Dr. Andrew Weil. Inhale 4s, hold 7s, exhale 8s. Activates vagus nerve and parasympathetic nervous system for deep calm."
                }
              },
              {
                "@type": "Question",
                "name": "What are the benefits?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Reduced stress and anxiety, improved sleep, lower blood pressure, increased HRV, reduced cortisol, and improved emotional regulation."
                }
              },
              {
                "@type": "Question",
                "name": "Can this help with sleep?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The extended exhale activates the vagal brake, slowing heart rate. Many fall asleep within a few cycles when practiced in bed."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This breathing drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <VagalBrakeClient />
    </>
  );
}