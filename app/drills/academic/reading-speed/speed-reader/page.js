import SpeedReaderClient from './SpeedReaderClient';

export const metadata = {
  title: 'Column Scanner - Speed Reading Drill | SkillDrills',
  description: 'Train columnar reading with 10 rotating text columns. Adjustable 100-800 WPM speed and 200-500px column width. 60-second challenge. No sign-up.',
  keywords: [
    'column scanner', 'speed reading columns', 'columnar reading practice',
    'peripheral vision reading', 'reading stamina training', 'speed reading drill online',
    'column reading practice', 'visual span training', 'subvocalization elimination',
    'fast reading practice free', 'reading efficiency training', 'WPM training online',
    'timed reading challenge', 'free speed reading tool', 'column reader online',
    'multi column reading', 'peripheral reading span', 'eye movement reduction',
    'reading speed booster', 'visual reading practice', 'text scanning drill',
    'speed reading technique', 'rapid reading method', 'reading fluency training',
    'speed reading for students', 'speed reading for professionals', 'exam reading prep',
    'IELTS reading practice', 'TOEFL reading speed', 'GRE verbal practice',
    'GMAT reading comprehension', 'SAT reading improvement',
    'speed reading for adults', 'beginner speed reading', 'advanced speed reading',
    'reading speed tracker', 'WPM calculator', 'words per minute test',
    'skilldrills speed reader', 'skilldrills column scanner', 'skilldrills reading drill',
    'free online reading tool', 'browser speed reader', 'no download speed reading',
  ],
  openGraph: {
    title: 'Column Scanner - Speed Reading Drill | SkillDrills',
    description: '10 rotating text columns. Adjustable 100-800 WPM. 60s challenge. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/academic/reading-speed/speed-reader',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Column Scanner Speed Reader',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Column Scanner - Speed Reading Drill | SkillDrills',
    description: 'Train columnar reading with 10 rotating columns. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/academic/reading-speed/speed-reader',
  },
};

export default function SpeedReaderPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Academic Drills", "item": "https://skilldrills.online/drills/academic" },
              { "@type": "ListItem", "position": 3, "name": "Reading Speed", "item": "https://skilldrills.online/drills/academic/reading-speed" },
              { "@type": "ListItem", "position": 4, "name": "Column Scanner" }
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
            "name": "Column Scanner Speed Reader",
            "url": "https://skilldrills.online/drills/academic/reading-speed/speed-reader",
            "description": "Free interactive column scanner with 10 rotating text columns. Adjustable speed 100-800 WPM and column width 200-500px. 60-second timed challenge.",
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
                "name": "What is the Column Scanner speed reading drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free drill displaying text in 10 narrow rotating columns. This format reduces horizontal eye movement enabling faster reading. Adjustable speed 100-800 WPM and column width 200-500px."
                }
              },
              {
                "@type": "Question",
                "name": "How does columnar reading improve speed?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Narrow columns reduce horizontal eye movement distance. This trains peripheral vision and helps eliminate subvocalization, the habit of mentally pronouncing each word."
                }
              },
              {
                "@type": "Question",
                "name": "What settings can I adjust?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Reading speed from 100-800 WPM and column width from 200-500px. Narrower columns train peripheral vision while wider columns build reading stamina."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This column scanner is completely free and works instantly in your browser. Best WPM scores save locally."
                }
              }
            ]
          })
        }}
      />

      <SpeedReaderClient />
    </>
  );
}