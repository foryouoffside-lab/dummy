import ReadingComprehensionClient from './ReadingComprehensionClient';

export const metadata = {
  title: 'RSVP Speed Reading Drill - Comprehension & WPM Training | SkillDrills',
  description: 'Master speed reading with RSVP method. Fresh passages, 3 difficulty levels, adjustable 100-600 WPM. Test comprehension with quizzes. No sign-up.',
  keywords: [
    'speed reading drill', 'RSVP reader', 'rapid serial visual presentation',
    'reading comprehension test', 'reading speed test', 'WPM training',
    'speed reading practice online', 'comprehension drill free', 'reading retention',
    'fast reading exercises', 'reading skills improvement', 'free speed reading test',
    'RSVP training', 'speed reader online',
    'words per minute test', 'reading fluency test', 'reading accuracy practice',
    'speed reading for students', 'speed reading for professionals',
    'IELTS reading practice', 'TOEFL reading practice', 'GRE reading comprehension',
    'GMAT verbal practice', 'LSAT reading comprehension', 'SAT reading test',
    'CAT reading practice', 'UPSC reading comprehension',
    'reading speed booster', 'comprehension skills training',
    'free online reading drill', 'reading practice with quiz',
    'how to read faster', 'improve reading speed',
    'speed reading for adults', 'beginner speed reading',
    'advanced speed reading', 'reading speed tracker',
    'skilldrills speed reading', 'skilldrills RSVP', 'skilldrills reading drill',
    'free reading comprehension practice', 'online reading trainer',
    'browser speed reading', 'no download speed reader',
  ],
  openGraph: {
    title: 'RSVP Speed Reading Drill - WPM Training | SkillDrills',
    description: 'Fresh passages every session. 3 difficulty levels. Adjustable 100-600 WPM. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/academic/comprehension/reading-comprehension',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'RSVP Speed Reading Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RSVP Speed Reading Drill | SkillDrills',
    description: 'Master speed reading. Fresh passages, 3 levels, 100-600 WPM. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/academic/comprehension/reading-comprehension',
  },
};

export default function ReadingComprehensionPage() {
  return (
    <>
      <noscript>
        <h1>RSVP Speed Reading Drill - Comprehension & WPM Training</h1>
        <p>Free interactive RSVP speed reading drill with fresh passages, 3 difficulty levels, and adjustable 100-600 WPM. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 3, "name": "Comprehension", "item": "https://skilldrills.online/drills/academic/comprehension" },
              { "@type": "ListItem", "position": 4, "name": "RSVP Speed Reading" }
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
            "name": "RSVP Speed Reading Drill",
            "url": "https://skilldrills.online/drills/academic/comprehension/reading-comprehension",
            "description": "Free interactive RSVP speed reading drill with fresh passages, 3 difficulty levels, adjustable 100-600 WPM, and comprehension quizzes.",
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
                "name": "What is the RSVP Speed Reading Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free interactive tool using Rapid Serial Visual Presentation to display words one at a time. Fresh passages every session across 3 difficulty levels with adjustable speed from 100 to 600 WPM. Comprehension quizzes after each passage."
                }
              },
              {
                "@type": "Question",
                "name": "How does RSVP speed reading work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "RSVP displays words one at a time in the same focal position, eliminating eye movements between words. This allows much faster text processing. Start at comfortable speeds and gradually increase WPM as your brain adapts."
                }
              },
              {
                "@type": "Question",
                "name": "What reading speeds are available?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Adjustable from 100 to 600 WPM. 100-200 WPM is beginner, 200-350 WPM is intermediate, 350-500 WPM is advanced, and 500-600 WPM is expert level. Speed can be changed anytime during the drill."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This RSVP speed reading drill is completely free and works instantly in your browser. Best scores save locally."
                }
              }
            ]
          })
        }}
      />

      <ReadingComprehensionClient />
    </>
  );
}