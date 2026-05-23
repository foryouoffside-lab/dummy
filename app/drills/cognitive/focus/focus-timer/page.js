import FocusTimerClient from './FocusTimerClient';

export const metadata = {
  title: 'Focus Timer - 5-Minute Concentration Training | SkillDrills',
  description: 'Train sustained focus with a visual meditation timer. Fix gaze on center while expanding ripples test peripheral awareness. 5-minute session. No sign-up.',
  keywords: [
    'focus timer', 'concentration training', 'sustained attention drill',
    'flow state practice', 'focus endurance training', 'attention span training',
    'visual meditation focus', 'deep work training', 'focus meditation online',
    'concentration stamina builder', 'mindfulness focus exercise', 'attention exercise free',
    'focus ripple meditation', '5 minute focus timer', 'free concentration practice',
    'focus training online', 'attention building drill', 'cognitive focus exercise',
    'sustained focus practice', 'peripheral awareness training', 'visual focus drill',
    'deep work preparation', 'flow state entry practice', 'meditation timer focus',
    'productivity focus tool', 'study focus timer', 'work concentration training',
    'skilldrills focus timer', 'skilldrills concentration', 'free focus training',
    'online focus exercise', 'browser focus drill', 'no download focus timer',
  ],
  openGraph: {
    title: 'Focus Timer - Concentration Training | SkillDrills',
    description: 'Build concentration stamina with visual ripple meditation. Free 5-minute drill.',
    type: 'article',
    url: 'https://skilldrills.online/drills/cognitive/focus/focus-timer',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Focus Timer',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Focus Timer | SkillDrills',
    description: 'Train sustained focus with visual meditation. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/focus/focus-timer',
  },
};

export default function FocusTimerPage() {
  return (
    <>
      <noscript>
        <h1>Focus Timer - 5-Minute Sustained Attention & Concentration Training</h1>
        <p>Free 5-minute visual meditation focus timer. Build concentration stamina for deep work. No sign-up required.</p>
      </noscript>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "Cognitive Drills", "item": "https://skilldrills.online/drills/cognitive" },
              { "@type": "ListItem", "position": 3, "name": "Focus", "item": "https://skilldrills.online/drills/cognitive/focus" },
              { "@type": "ListItem", "position": 4, "name": "Focus Timer" }
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
            "name": "Focus Timer",
            "url": "https://skilldrills.online/drills/cognitive/focus/focus-timer",
            "description": "Free 5-minute focus timer with expanding ripple visual meditation. Fix gaze on center while ripples test peripheral awareness. Build concentration stamina.",
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
                "name": "What is the Focus Timer drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free 5-minute visual meditation that trains sustained attention. Fix gaze on a center point while expanding ripples test peripheral awareness."
                }
              },
              {
                "@type": "Question",
                "name": "How does it improve concentration?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Trains your brain to maintain focus on a single point while being peripherally aware of distractions. Builds deep work and flow state capacity."
                }
              },
              {
                "@type": "Question",
                "name": "Is this helpful for deep work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. The 5-minute session serves as a warm-up before deep work, calming the mind and priming concentration."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This focus timer is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <FocusTimerClient />
    </>
  );
}