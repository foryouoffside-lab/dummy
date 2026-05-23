import DeepWorkLabClient from './DeepWorkLabClient';

export const metadata = {
  title: 'Deep Work Lab - Focus Endurance & Attention Training | SkillDrills',
  description: 'Track a moving green ring with cursor. +1pt/sec inside, -1pt/sec outside. Real-time focus meter, peak tracking, visual feedback. No sign-up.',
  keywords: [
    'deep work training', 'focus endurance drill', 'sustained attention training',
    'concentration drill free', 'focus training online', 'attention span training',
    'deep focus exercise', 'productivity training', 'focus meter tool',
    'distraction resistance', 'flow state training', 'cognitive endurance',
    'focus stamina', 'attention control', 'free focus training',
    'deep work practice', 'focus improvement', 'concentration exercises',
    'sustained focus drill', 'attention building game', 'focus tracking',
    'flow state practice', 'deep concentration training', 'focus endurance test',
    'attention span exercise', 'cognitive focus drill', 'mental stamina training',
    'productivity skills', 'work focus training', 'study focus drill',
    'ADHD focus training', 'attention deficit exercise', 'mindfulness focus',
    'skilldrills deep work', 'skilldrills focus training', 'free concentration practice',
    'online focus trainer', 'browser focus drill', 'no download focus game',
    'focus training for work', 'focus training for students', 'focus training for programmers',
    'focus training for writers', 'focus training for professionals',
  ],
  openGraph: {
    title: 'Deep Work Lab - Focus Endurance Training | SkillDrills',
    description: 'Track a moving ring to train sustained attention. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/productivity/focus-endurance/deep-work',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Deep Work Lab',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deep Work Lab - Focus Training | SkillDrills',
    description: 'Train sustained attention by tracking a moving ring. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/productivity/focus-endurance/deep-work',
  },
};

export default function DeepWorkLabPage() {
  return (
    <>
      <noscript>
        <h1>Deep Work Lab - Focus Endurance & Sustained Attention Training</h1>
        <p>Free deep work drill. Track a moving ring to train sustained attention. No sign-up required.</p>
      </noscript>

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
              { "@type": "ListItem", "position": 4, "name": "Deep Work" }
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
            "name": "Deep Work Lab",
            "url": "https://skilldrills.online/drills/productivity/focus-endurance/deep-work",
            "description": "Free focus endurance drill. Track moving green ring with cursor. +1pt/sec inside, -1pt/sec outside. Real-time focus meter. 60-second challenge.",
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
                "name": "What is the Deep Work Lab drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free focus training exercise. Keep cursor inside moving green ring. +1pt/sec inside, -1pt/sec outside. Focus meter 0-100%. Red below 25%, green glow above 70%."
                }
              },
              {
                "@type": "Question",
                "name": "What do the ring colors mean?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Green glow = focus above 70% (deep work zone). Standard green = 25-70%. Red = below 25% (critical distraction)."
                }
              },
              {
                "@type": "Question",
                "name": "Who should use this drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Knowledge workers, students, programmers, writers, designers, and anyone wanting better sustained concentration and flow state entry."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This deep work drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <DeepWorkLabClient />
    </>
  );
}