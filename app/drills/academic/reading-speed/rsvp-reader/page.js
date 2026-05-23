import RSVPReaderClient from './RSVPReaderClient';

export const metadata = {
  title: 'RSVP Speed Reader - Visual Training | SkillDrills',
  description: 'Master speed reading with RSVP technology. Words flash at Optimal Recognition Point. Adjustable 100-1000 WPM. Fresh passages. No sign-up.',
  keywords: [
    'RSVP reader', 'speed reading tool', 'rapid serial visual presentation',
    'optimal recognition point training', 'reading speed training', 'WPM improvement',
    'speed reading practice', 'visual reading drill', 'fast reading practice online',
    'RSVP training', 'reading comprehension speed', 'cognitive reading',
    'free speed reading app', 'online RSVP reader',
    'word flashing reader', 'single point reading', 'fixation reading',
    'eye movement reduction', 'reading speed booster',
    'speed reading technique', 'rapid reading method', 'visual word recognition',
    'reading fluency training', 'text processing speed', 'reading efficiency',
    'speed reading for students', 'speed reading for professionals', 'exam reading prep',
    'IELTS reading practice', 'TOEFL reading speed', 'GRE verbal practice',
    'GMAT reading comprehension', 'SAT reading improvement',
    'speed reading for adults', 'beginner speed reading',
    'advanced speed reading', 'reading speed tracker', 'WPM calculator',
    'words per minute test', 'reading pace trainer', 'speed reading online free',
    'skilldrills RSVP', 'skilldrills speed reader', 'skilldrills reading drill',
    'free online reading tool', 'browser speed reader', 'no download RSVP',
  ],
  openGraph: {
    title: 'RSVP Speed Reader - Visual Training | SkillDrills',
    description: 'Master speed reading with RSVP technology. Words flash at Optimal Recognition Point. Adjustable 100-1000 WPM. Fresh passages. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/academic/reading-speed/rsvp-reader',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'RSVP Speed Reader',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RSVP Speed Reader - Visual Training | SkillDrills',
    description: 'Master speed reading with RSVP technology. Words flash at Optimal Recognition Point. Adjustable 100-1000 WPM. Fresh passages. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/academic/reading-speed/rsvp-reader',
  },
};

export default function RSVPReaderPage() {
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
              { "@type": "ListItem", "position": 4, "name": "RSVP Speed Reader" }
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
            "name": "RSVP Speed Reader",
            "url": "https://skilldrills.online/drills/academic/reading-speed/rsvp-reader",
            "description": "Free interactive RSVP speed reader that flashes words at the Optimal Recognition Point. Adjustable speed 100-1000 WPM with fresh passages every session.",
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
                "name": "What is an RSVP speed reader?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "RSVP displays words one at a time at a single focal point, eliminating eye movements. Words flash at the Optimal Recognition Point for maximum comprehension at speeds from 100 to 1000 WPM."
                }
              },
              {
                "@type": "Question",
                "name": "What is the Optimal Recognition Point?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The ORP is the position within a word where the eye can most efficiently recognize it. Aligning each word at its ORP maximizes recognition speed and comprehension."
                }
              },
              {
                "@type": "Question",
                "name": "How fast can I read with RSVP training?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most users achieve 2-4x faster reading. Beginners start at 200-300 WPM and progress to 500-600 WPM within weeks. Advanced users reach 800-1000 WPM."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This RSVP speed reader is completely free and works instantly in your browser. Fresh passages each session."
                }
              }
            ]
          })
        }}
      />

      <RSVPReaderClient />
    </>
  );
}