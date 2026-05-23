import NumberRecallClient from './NumberRecallClient';

export const metadata = {
  title: 'Number Recall Drill - Digit Span & Working Memory | SkillDrills',
  description: 'Train digit span memory by recalling progressively longer number sequences from 4 to 49 digits across 5 levels. Audio tones for multi-sensory encoding. No sign-up.',
  keywords: [
    'number recall drill', 'digit span test', 'working memory training',
    'number memory game', 'digit recall practice', 'memory span test online',
    'numerical memory training', 'sequence memory drill', 'digit memory game free',
    'working memory exercise', 'number sequence training', 'digit span practice',
    'cognitive memory drill', 'free memory test online', 'digit span assessment',
    'working memory capacity', 'short term memory test', 'number recall test',
    'memory span training', 'digit retention practice', 'numerical recall drill',
    'cognitive assessment tool', 'brain training memory', 'memory improvement game',
    'skilldrills number recall', 'skilldrills memory drill', 'free cognitive test',
    'online memory exercise', 'browser memory game', 'no download memory test',
    'instant memory practice', 'digital memory trainer', 'web based memory drill',
  ],
  openGraph: {
    title: 'Number Recall Drill - Digit Span Training | SkillDrills',
    description: 'Memorize and recall digit sequences from 4 to 49 digits across 5 levels. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/cognitive/memory/number-recall',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Number Recall Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Number Recall Drill | SkillDrills',
    description: 'Train digit span memory. 4 to 49 digits, 5 levels. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/memory/number-recall',
  },
};

export default function NumberRecallPage() {
  return (
    <>
      <noscript>
        <h1>Number Recall Drill - Digit Span & Working Memory Training</h1>
        <p>Free digit span memory drill. Recall progressively longer number sequences from 4 to 49 digits. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 3, "name": "Memory", "item": "https://skilldrills.online/drills/cognitive/memory" },
              { "@type": "ListItem", "position": 4, "name": "Number Recall" }
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
            "name": "Number Recall Drill",
            "url": "https://skilldrills.online/drills/cognitive/memory/number-recall",
            "description": "Free number recall drill for digit span training. Memorize and recall sequences from 4 to 49 digits across 5 levels with audio tones. 60-second challenge.",
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
                "name": "What is the Number Recall Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free digit span working memory tool. Number sequences flash one digit at a time. Memorize and recall them correctly. Progress from 4 to 49 digits across 5 levels."
                }
              },
              {
                "@type": "Question",
                "name": "What is digit span?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A measure of working memory capacity - your ability to hold and manipulate information over short periods. Linked to problem-solving and reading comprehension."
                }
              },
              {
                "@type": "Question",
                "name": "How many levels are there?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "5 levels: Level 1 (4-9 digits), Level 2 (8-16), Level 3 (15-25), Level 4 (25-36), Level 5 (36-49). Complete all for Memory Master achievement."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This number recall drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <NumberRecallClient />
    </>
  );
}