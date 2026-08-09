import ColorSequenceClient from './ColorSequenceClient';

export const metadata = {
  title: 'Color Sequence - Short-Term Memory | SkillDrills',
  description: 'Train visual memory with 6 vibrant colors and progressive sequences. Watch patterns play, then tap colors in order. No sign-up.',
  keywords: [
    'color sequence memory', 'visual memory drill', 'short term memory colors',
    'color pattern recall', 'sequence memory game', 'visual pattern memory',
    'color memory test', 'short term memory training', 'pattern recall drill',
    'visual sequence memory', 'color sequence game', 'memory sequence colors',
    'free memory drill', 'visual short term memory', 'color recall training',
    'color sequence free', 'visual sequence drill', 'color pattern memory free',
    'color order memory', 'progressive memory game', 'visual working memory',
    'color recall game', 'pattern sequence training', 'visual memory exercise',
    'skilldrills color sequence', 'skilldrills visual memory', 'skilldrills short term',
    'color tap sequence', 'memory level progression', 'visual pattern training',
    'sequential color recall', 'color order practice', 'visual memory improvement',
  ],
  openGraph: {
    title: 'Color Sequence - Short-Term Memory | SkillDrills',
    description: 'Train visual memory with 6 vibrant colors and progressive sequences. Watch patterns play, then tap colors in order. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/memory/short-term-memory/color-sequence',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Color Sequence - Short-Term Memory | SkillDrills',
    description: 'Train visual memory with 6 vibrant colors and progressive sequences. Watch patterns play, then tap colors in order. No sign-up.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/short-term-memory/color-sequence',
  },
};

export default function ColorSequencePage() {
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
              { "@type": "ListItem", "position": 2, "name": "Memory Training", "item": "https://skilldrills.online/drills/memory" },
              { "@type": "ListItem", "position": 3, "name": "Short-Term Memory", "item": "https://skilldrills.online/drills/memory/short-term-memory" },
              { "@type": "ListItem", "position": 4, "name": "Color Sequence" }
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
            "name": "Color Sequence Drill",
            "url": "https://skilldrills.online/drills/memory/short-term-memory/color-sequence",
            "description": "Free visual memory drill with 6 vibrant colors. Watch color sequences play, then tap in order. Progressive sequence length = level + 2.",
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
                "name": "What is the Color Sequence Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free visual memory exercise with 6 vibrant colors. Watch sequences play, then tap colors in exact order."
                }
              },
              {
                "@type": "Question",
                "name": "How does progressive difficulty work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sequence length = level + 2. Level 1 has 3 colors, Level 2 has 4, and so on as you complete rounds."
                }
              },
              {
                "@type": "Question",
                "name": "Are there negative score or time penalties?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Incorrect taps or timeouts never deduct score points or reduce remaining timer seconds — they only drop your difficulty level by 1 (this drill adapts to your skill, so that's intentional, not a penalty)."
                }
              },
              {
                "@type": "Question",
                "name": "Who should use this drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Students developing memory skills, adults maintaining cognitive function, and gamers training visual recall speed."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This drill runs directly in your browser with instant response."
                }
              },
              {
                "@type": "Question",
                "name": "How long does each drill session last?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Each round is timed for exactly 45 seconds of continuous focus."
                }
              }
            ]
          })
        }}
      />

      <ColorSequenceClient />
    </>
  );
}