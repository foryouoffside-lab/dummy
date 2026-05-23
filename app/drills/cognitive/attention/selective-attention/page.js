import SelectiveAttentionClient from './SelectiveAttentionClient';

export const metadata = {
  title: 'Selective Attention - Visual Search | SkillDrills',
  description: 'Train selective attention with visual search. Find items matching color and shape among distractors. Adaptive speed 900-2000ms. 60-second challenge. No sign-up.',
  keywords: [
    'selective attention drill', 'visual search training', 'target identification test',
    'cognitive training free', 'attention drill online', 'visual discrimination practice',
    'color shape matching game', 'focus training online', 'concentration drill free',
    'visual scanning test', 'attention test free', 'cognitive assessment online',
    'brain training game free', 'distractor filtering practice', 'selective focus training',
    'visual attention drill', 'target detection test', 'cognitive control training',
    'attention span exercise', 'visual processing speed', 'pattern recognition drill',
    'cognitive flexibility test', 'attention to detail training', 'visual cognition drill',
    'free attention training', 'online focus drill', 'browser cognitive test',
    'skilldrills selective attention', 'skilldrills cognitive drill', 'free brain training',
    'visual search and attention', 'adaptive difficulty attention',
    'concentration training free', 'mental focus exercise', 'distraction filtering drill',
  ],
  openGraph: {
    title: 'Selective Attention - Visual Search | SkillDrills',
    description: 'Find matching color and shape among distractors. Adaptive speed. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/cognitive/attention/selective-attention',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Selective Attention Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Selective Attention - Visual Search | SkillDrills',
    description: 'Train visual search skills. Find matching color and shape. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/attention/selective-attention',
  },
};

export default function SelectiveAttentionPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Cognitive Drills", "item": "https://skilldrills.online/drills/cognitive" },
              { "@type": "ListItem", "position": 3, "name": "Attention", "item": "https://skilldrills.online/drills/cognitive/attention" },
              { "@type": "ListItem", "position": 4, "name": "Selective Attention" }
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
            "name": "Selective Attention Drill",
            "url": "https://skilldrills.online/drills/cognitive/attention/selective-attention",
            "description": "Free visual search drill training selective attention. Find items matching color and shape among distractors with adaptive speed. 60-second challenge.",
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
                "name": "What is the Selective Attention Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free visual search exercise training your ability to focus on relevant information. Find items matching BOTH color and shape among distractors with adaptive speed."
                }
              },
              {
                "@type": "Question",
                "name": "How does adaptive difficulty work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Correct answers tighten the response window from 2000ms down to 900ms. Wrong answers loosen it. This keeps you at your optimal training level."
                }
              },
              {
                "@type": "Question",
                "name": "Who benefits from this drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Students improving concentration, professionals filtering distractions, gamers spotting enemies, and anyone wanting better focus."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This selective attention drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <SelectiveAttentionClient />
    </>
  );
}