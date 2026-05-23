import DualTargetFlowClient from './DualTargetFlowClient';

export const metadata = {
  title: 'Dual-Target Flow Drill - Multi-Tasking & Divided Attention | SkillDrills',
  description: 'Two shape streams with different targets from 8 types. 35% targets, 65% distractors. Targets change every 30s. 3 lives. No sign-up.',
  keywords: [
    'dual task training', 'multi-tasking drill', 'divided attention',
    'dual n-back visual', 'simultaneous tracking', 'attention splitting',
    'multi target tracking', 'visual attention training', 'dual task performance',
    'cognitive load training', 'parallel processing', 'attention allocation',
    'multitasking practice', 'divided focus', 'free attention training',
    'dual target flow free', 'multitasking drill free', 'dual stream training',
    'left right target drill', 'shape tracking drill', 'divided attention game',
    'simultaneous shape streams', '30 second target rotation', 'visual multitasking',
    'skilldrills dual target', 'skilldrills multitasking', 'skilldrills divided attention',
    'two target tracking', 'parallel visual processing', 'attention splitting drill',
    'dual shape identification', 'multitask performance test', 'divided focus practice',
  ],
  openGraph: {
    title: 'Dual-Target Flow Drill - Multi-Tasking | SkillDrills',
    description: 'Two shape streams with different targets. Free divided attention.',
    type: 'article',
    url: 'https://skilldrills.online/drills/productivity/task-switching/multi-tasking',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Dual-Target Flow Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dual-Target Flow Drill | SkillDrills',
    description: 'Two shape streams. Different targets each side. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/productivity/task-switching/multi-tasking',
  },
};

export default function DualTargetFlowPage() {
  return (
    <>
      <noscript>
        <h1>Dual-Target Flow Drill - Multi-Tasking & Divided Attention Training</h1>
        <p>Free dual-target flow drill with two simultaneous shape streams. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 4, "name": "Dual-Target Flow" }
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
            "name": "Dual-Target Flow Drill",
            "url": "https://skilldrills.online/drills/productivity/task-switching/multi-tasking",
            "description": "Free divided attention drill. Two shape streams from 8 types. 35% targets, 65% distractors. Targets change every 30s. 3 lives.",
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
                "name": "What is the Dual-Target Flow Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free divided attention exercise. Two shape streams flow from center. Each side has unique target. 8 types. 35% targets. Targets change every 30s."
                }
              },
              {
                "@type": "Question",
                "name": "How does the dual-stream system work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Shapes spawn every 600ms from center. Left stream flows left, right stream flows right. 35% chance target, 65% distractor. Click only targets."
                }
              },
              {
                "@type": "Question",
                "name": "What skills does this improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Divided attention, multi-target tracking, visual discrimination, parallel processing, and sustained attention across two simultaneous streams."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This dual-target flow drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <DualTargetFlowClient />
    </>
  );
}