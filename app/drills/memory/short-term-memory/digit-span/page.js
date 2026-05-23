import DigitSpanClient from './DigitSpanClient';

export const metadata = {
  title: 'Digit Span Drill - Number Sequence Memory Training | SkillDrills',
  description: 'Train numerical memory with infinite progressive digit sequences. 3-second memorization, then type the exact sequence. Auto-adjusting font size. No sign-up.',
  keywords: [
    'digit span', 'number memory', 'digit sequence recall', 'short term memory numbers',
    'digit span test', 'numerical memory training', 'number sequence memory',
    'digit recall drill', 'working memory digits', 'memory span test',
    'number memory game', 'digit span practice', 'free memory drill',
    'numerical short term memory', 'digit sequence test',
    'digit span free', 'number sequence drill free', 'working memory test',
    'digit memory span', 'numerical recall training', 'digit span assessment',
    'number recall practice', 'digit sequence memory test', 'working memory training',
    'skilldrills digit span', 'skilldrills number memory', 'skilldrills short term',
    'progressive digit span', 'cognitive digit test', 'memory span exercise',
    'digit retention drill', 'number sequence practice', 'working memory capacity',
  ],
  openGraph: {
    title: 'Digit Span Drill - Number Memory Training | SkillDrills',
    description: 'Infinite progressive digit sequences. 3-second memorization, type recall. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/memory/short-term-memory/digit-span',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Digit Span Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digit Span Drill | SkillDrills',
    description: 'Infinite progressive digit sequences. Type recall. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/short-term-memory/digit-span',
  },
};

export default function DigitSpanPage() {
  return (
    <>
      <noscript>
        <h1>Digit Span Drill - Short-Term Memory & Number Sequence Training</h1>
        <p>Free digit span drill with infinite progressive levels. 3-second memorization, type recall. No sign-up required.</p>
      </noscript>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "Memory Training", "item": "https://skilldrills.online/drills/memory" },
              { "@type": "ListItem", "position": 3, "name": "Short-Term Memory", "item": "https://skilldrills.online/drills/memory/short-term-memory" },
              { "@type": "ListItem", "position": 4, "name": "Digit Span" }
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
            "name": "Digit Span Drill",
            "url": "https://skilldrills.online/drills/memory/short-term-memory/digit-span",
            "description": "Free digit span memory drill with infinite progressive levels. 3-second memorization of random digit sequences, type recall. Auto-adjusting font size.",
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
                "name": "What is the Digit Span Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free working memory exercise based on the scientifically-validated digit span test. 3-second memorization of random digit sequences, then type the exact order."
                }
              },
              {
                "@type": "Question",
                "name": "How does progressive difficulty work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sequence length = level + 2. Level 1 has 3 digits, infinite progression. Font auto-adjusts from 56px down to 22px for longer sequences."
                }
              },
              {
                "@type": "Question",
                "name": "Why is digit span important?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A core measure of working memory used in WAIS intelligence tests. Average adult span is 7±2 digits. Regular practice improves working memory capacity."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This digit span drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <DigitSpanClient />
    </>
  );
}