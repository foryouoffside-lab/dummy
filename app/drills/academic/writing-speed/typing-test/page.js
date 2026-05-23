import TypingTestClient from './TypingTestClient';

export const metadata = {
  title: 'Typing Speed Test - WPM Practice & Accuracy Training | SkillDrills',
  description: 'Test your typing speed with 30 unique quotes across Easy, Medium, and Hard levels. Real-time WPM, accuracy, and combo streaks. 60-second challenge. No sign-up.',
  keywords: [
    'typing speed test', 'typing practice', 'WPM test', 'typing accuracy',
    'free typing test', 'speed typing challenge', 'typing quotes practice',
    'keyboard typing speed', 'typing skills test', 'words per minute test',
    'typing trainer', 'online typing test', 'typing improvement',
    'typing speed drill', 'professional typing practice',
    'free online typing test', 'typing test with quotes', 'timed typing challenge',
    'keyboard practice test', 'typing speed checker', 'fast typing practice',
    'typing accuracy test', 'typing wpm calculator', 'typing performance test',
    'typing test for beginners', 'typing test for professionals',
    'typing test for adults', 'typing speed builder', 'keyboard skills test',
    'typing test no download', 'browser typing test', 'instant typing test',
    'typing test with feedback', 'real-time typing test', 'typing speed tracker',
    'typing test for jobs', 'typing test for interviews', 'data entry typing practice',
    'skilldrills typing test', 'skilldrills typing practice', 'free typing assessment',
    'improve typing speed online', 'type faster practice', 'keyboard speed drill',
    'touch typing practice', 'typing without looking', 'keyboard muscle memory',
  ],
  openGraph: {
    title: 'Typing Speed Test - WPM Practice | SkillDrills',
    description: '30 unique quotes, 3 difficulty levels. Track WPM and accuracy. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/academic/writing-speed/typing-test',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Typing Speed Test',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Typing Speed Test | SkillDrills',
    description: 'Test WPM with 30 quotes. Track accuracy and combos. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/academic/writing-speed/typing-test',
  },
};

export default function TypingTestPage() {
  return (
    <>
      <noscript>
        <h1>Typing Speed Test - WPM Practice & Accuracy Training</h1>
        <p>Free online typing test with 30 unique quotes across 3 difficulty levels. No sign-up required.</p>
      </noscript>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "Academic Drills", "item": "https://skilldrills.online/drills/academic" },
              { "@type": "ListItem", "position": 3, "name": "Writing Speed", "item": "https://skilldrills.online/drills/academic/writing-speed" },
              { "@type": "ListItem", "position": 4, "name": "Typing Speed Test" }
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
            "name": "Typing Speed Test",
            "url": "https://skilldrills.online/drills/academic/writing-speed/typing-test",
            "description": "Free online typing test with 30 unique quotes across 3 difficulty levels. Real-time WPM, accuracy, and combo streak tracking. 60-second challenge.",
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
                "name": "What is the Typing Speed Test?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free online tool measuring WPM and accuracy with 30 unique quotes across Easy, Medium, and Hard levels. 60-second timed challenge with real-time feedback."
                }
              },
              {
                "@type": "Question",
                "name": "How is WPM calculated?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Every 5 correctly typed characters count as one word, divided by time elapsed. Only correct characters count toward your WPM score."
                }
              },
              {
                "@type": "Question",
                "name": "Are there penalties for errors?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No penalties. Errors are tracked in results but don't deduct from your score. Focus on improving both speed and accuracy without pressure."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to create an account?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This typing test is completely free and works instantly in your browser. Best scores save locally."
                }
              }
            ]
          })
        }}
      />

      <TypingTestClient />
    </>
  );
}