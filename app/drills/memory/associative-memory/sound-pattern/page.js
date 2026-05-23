import SoundPatternClient from './SoundPatternClient';

export const metadata = {
  title: 'Sound Pattern - Auditory Memory Drill | SkillDrills',
  description: 'Train auditory memory with 30 unique rhythmic beat sequences. Listen to patterns, then reproduce using Tap and Rest buttons. No sign-up.',
  keywords: [
    'sound pattern memory', 'auditory memory training', 'rhythm recall',
    'beat pattern drill', 'sound sequence memory', 'auditory processing',
    'rhythm memory game', 'sound pattern recognition', 'auditory recall',
    'musical memory training', 'beat sequence drill', 'pattern reproduction',
    'free auditory memory test', 'rhythm training', 'sound memory drill',
    'sound pattern free', 'auditory pattern drill', 'rhythm memory free',
    'beat recall training', 'sound sequence practice', 'auditory cognition',
    'musical rhythm drill', 'temporal processing training', 'listening memory',
    'skilldrills sound pattern', 'skilldrills auditory', 'skilldrills memory',
    'audio pattern game', 'beat pattern memory', 'rhythm reproduction test',
    'sound memory improvement', 'auditory working memory', 'pattern recall drill',
  ],
  openGraph: {
    title: 'Sound Pattern - Auditory Memory Drill | SkillDrills',
    description: 'Train auditory memory with 30 unique rhythmic beat sequences. Listen to patterns, then reproduce using Tap and Rest buttons. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/memory/associative-memory/sound-pattern',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Sound Pattern Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sound Pattern - Auditory Memory Drill | SkillDrills',
    description: 'Train auditory memory with 30 unique rhythmic beat sequences. Listen to patterns, then reproduce using Tap and Rest buttons. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/associative-memory/sound-pattern',
  },
};

export default function SoundPatternPage() {
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
              { "@type": "ListItem", "position": 3, "name": "Associative Memory", "item": "https://skilldrills.online/drills/memory/associative-memory" },
              { "@type": "ListItem", "position": 4, "name": "Sound Pattern" }
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
            "name": "Sound Pattern Drill",
            "url": "https://skilldrills.online/drills/memory/associative-memory/sound-pattern",
            "description": "Free auditory memory drill with 30 unique beat patterns. Listen to rhythms then reproduce using Tap and Rest buttons. Adaptive 8-12 beats.",
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
                "name": "What is the Sound Pattern Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free auditory memory exercise with 30 unique rhythmic patterns. Listen to beat sequences then reproduce them using Tap and Rest buttons. Adaptive 8-12 beats."
                }
              },
              {
                "@type": "Question",
                "name": "How does adaptive difficulty work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Start at 8-beat patterns. 3 perfect scores advance to 10 beats, then 12. Wrong answers reset streak but keep current level."
                }
              },
              {
                "@type": "Question",
                "name": "Who should use this drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Musicians, language learners, students, audio professionals, and anyone wanting to improve auditory working memory and rhythm recognition."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This sound pattern drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <SoundPatternClient />
    </>
  );
}