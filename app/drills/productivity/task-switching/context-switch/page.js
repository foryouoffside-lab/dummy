import ContextSwitchClient from './ContextSwitchClient';

export const metadata = {
  title: 'Context Switch Lab - Task Switching Speed Drill | SkillDrills',
  description: 'Dual-rule switching: TOP=Even/Odd, BOTTOM=less5/greater5. Numbers 1-9 appear randomly. 1.5s per question. 3 lives, reaction tracking. No sign-up.',
  keywords: [
    'context switching', 'task switching training', 'cognitive flexibility',
    'task switching test', 'mental flexibility drill', 'attention switching',
    'cognitive control', 'executive function training', 'multitasking practice',
    'rule switching', 'context switch speed', 'adaptive thinking',
    'cognitive switching', 'task set reconfiguration', 'free task switching drill',
    'context switch lab free', 'task switching drill free', 'dual rule switching',
    'parity magnitude switch', 'even odd less greater drill', 'cognitive agility game',
    'mental switching practice', 'attention flexibility test', 'executive function drill',
    'skilldrills context switch', 'skilldrills cognitive flexibility', 'skilldrills switching',
    'rapid rule switching', 'context switching speed test', 'mental set shifting',
    'cognitive control training', 'task switching paradigm', 'switching cost drill',
  ],
  openGraph: {
    title: 'Context Switch Lab - Task Switching Speed | SkillDrills',
    description: 'Dual-rule switching between parity and magnitude. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/productivity/task-switching/context-switch',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Context Switch Lab',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Context Switch Lab | SkillDrills',
    description: 'Dual-rule task switching. Parity vs Magnitude. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/productivity/task-switching/context-switch',
  },
};

export default function ContextSwitchPage() {
  return (
    <>
      <noscript>
        <h1>Context Switch Lab - Task Switching Speed & Cognitive Flexibility Training</h1>
        <p>Free dual-rule task switching drill. TOP=Even/Odd, BOTTOM=less5/greater5. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 3, "name": "Task Switching", "item": "https://skilldrills.online/drills/productivity/task-switching" },
              { "@type": "ListItem", "position": 4, "name": "Context Switch" }
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
            "name": "Context Switch Lab",
            "url": "https://skilldrills.online/drills/productivity/task-switching/context-switch",
            "description": "Free task switching drill. TOP zone: Even=Left, Odd=Right. BOTTOM zone: less5=Left, greater5=Right. 1.5s per question. 3 lives.",
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
                "name": "What is the Context Switch Lab?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free task switching exercise. TOP zone: Even=Left, Odd=Right. BOTTOM zone: less than 5=Left, greater than 5=Right. Numbers 1-9 (excluding 5) appear randomly."
                }
              },
              {
                "@type": "Question",
                "name": "What is task switching and why does it matter?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The cognitive ability to shift between tasks or mental sets. Core executive function. Switching cost impacts productivity. Training reduces this cost."
                }
              },
              {
                "@type": "Question",
                "name": "What skills does this improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Cognitive flexibility, task switching speed, executive function, mental set shifting, and reaction time under changing rules."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This context switch drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <ContextSwitchClient />
    </>
  );
}