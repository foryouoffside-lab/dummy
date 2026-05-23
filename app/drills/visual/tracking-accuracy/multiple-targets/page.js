import GhostLinkClient from './GhostLinkClient';

export const metadata = {
  title: 'Ghost-Link Tracking - Multi-Object | SkillDrills',
  description: '2 green targets among 11 moving balls. 2-second preview, 60s tracking, then identify. 10pts per correct ball. MOT paradigm. No sign-up.',
  keywords: [
    'multi-object tracking', 'visual memory training', 'multiple target tracking',
    'ghost link tracking', 'visual working memory', 'object tracking drill',
    'MOT training', 'attention tracking', 'visual cognition test',
    'multiple ball tracking', 'memory and tracking', 'cognitive training',
    'free MOT test', 'visual attention drill',
    'ghost link free', 'multi-object tracking free', 'MOT paradigm drill',
    'visual tracking memory', 'divided attention training', 'target identification',
    'peripheral tracking practice', 'sustained visual attention', 'object memory test',
    'skilldrills ghost link', 'skilldrills multi target', 'skilldrills tracking',
    'bouncing ball tracking', 'visual working memory test', 'attention span drill',
    'cognitive psychology MOT', 'multiple object pursuit', 'visual cognition exercise',
  ],
  openGraph: {
    title: 'Ghost-Link Tracking - Multi-Object | SkillDrills',
    description: '2 green targets among 11 moving balls. 2-second preview, 60s tracking, then identify. 10pts per correct ball. MOT paradigm. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual/tracking-accuracy/multiple-targets',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Ghost-Link Tracking Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ghost-Link Tracking - Multi-Object | SkillDrills',
    description: '2 green targets among 11 moving balls. 2-second preview, 60s tracking, then identify. 10pts per correct ball. MOT paradigm. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/tracking-accuracy/multiple-targets',
  },
};

export default function GhostLinkPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Visual Training", "item": "https://skilldrills.online/drills/visual" },
              { "@type": "ListItem", "position": 3, "name": "Tracking Accuracy", "item": "https://skilldrills.online/drills/visual/tracking-accuracy" },
              { "@type": "ListItem", "position": 4, "name": "Ghost-Link Tracking" }
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
            "name": "Ghost-Link Tracking Drill",
            "url": "https://skilldrills.online/drills/visual/tracking-accuracy/multiple-targets",
            "description": "Free multi-object tracking drill. 2 green targets among 11 balls. 2-second preview, 60s tracking, identification phase. 10pts per correct target.",
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
                "name": "What is the Ghost-Link Tracking Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free multi-object tracking (MOT) exercise. 2 green targets among 11 balls. 2-second preview, 60s tracking, then identify. 10pts per correct ball."
                }
              },
              {
                "@type": "Question",
                "name": "What is Multi-Object Tracking (MOT)?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The cognitive ability to monitor multiple moving objects simultaneously. Predicts driving, sports, surveillance, and gaming performance."
                }
              },
              {
                "@type": "Question",
                "name": "What skills does this improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Multi-object tracking, visual working memory, divided attention, sustained attention, and target identification among distractors."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This ghost-link tracking drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <GhostLinkClient />
    </>
  );
}