import PeripheralReaderClient from './PeripheralReaderClient';

export const metadata = {
  title: 'Peripheral Vision Training - Extrafoveal Reading Speed | SkillDrills',
  description: 'Train peripheral vision and expand visual span for faster reading. Words flash left/right while fixating center. 3 modes, adjustable speed 100-1000ms. No sign-up.',
  keywords: [
    'peripheral vision training', 'extrafoveal processing', 'visual span expansion',
    'speed reading peripheral', 'peripheral reader drill', 'eye span training',
    'visual field training', 'reading speed improvement', 'peripheral awareness',
    'vision training drill', 'cognitive peripheral vision', 'visual processing speed',
    'peripheral word recognition', 'lateral vision practice', 'side vision training',
    'visual attention training', 'peripheral flash drill', 'extrafoveal reading',
    'visual span test', 'peripheral acuity training',
    'speed reading technique', 'visual processing exercise', 'eye training game',
    'peripheral vision test online', 'visual field expansion',
    'peripheral vision exercises', 'visual cognition drill',
    'skilldrills peripheral', 'skilldrills vision training', 'free vision drill',
    'visual perception training', 'peripheral awareness test',
    'reading speed booster', 'visual processing improvement',
    'fixation training', 'visual reading span',
    'speed reading for students', 'speed reading for professionals', 'reading efficiency',
    'IELTS reading speed', 'TOEFL reading practice', 'GRE reading comprehension',
    'cognitive training visual', 'brain training vision',
    'free online vision training', 'browser vision drill', 'no download vision practice',
  ],
  openGraph: {
    title: 'Peripheral Vision Training - Reading Speed Drill | SkillDrills',
    description: 'Train peripheral vision with flashing words. 3 modes, adjustable speed. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/academic/reading-speed/peripheral-reader',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Peripheral Vision Training',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peripheral Vision Training | SkillDrills',
    description: 'Expand visual span for faster reading. 3 modes. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/academic/reading-speed/peripheral-reader',
  },
};

export default function PeripheralReaderPage() {
  return (
    <>
      <noscript>
        <h1>Peripheral Vision Training - Extrafoveal Reading Speed Drill</h1>
        <p>Free peripheral vision training with flashing words. 3 modes, adjustable speed 100-1000ms. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 3, "name": "Reading Speed", "item": "https://skilldrills.online/drills/academic/reading-speed" },
              { "@type": "ListItem", "position": 4, "name": "Peripheral Vision" }
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
            "name": "Peripheral Vision Training",
            "url": "https://skilldrills.online/drills/academic/reading-speed/peripheral-reader",
            "description": "Free interactive peripheral vision drill for expanding visual span. Words flash left/right while fixating center. 3 modes with adjustable speed 100-1000ms.",
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
                "name": "What is peripheral vision training for reading?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Training that expands your visual span by flashing words in your peripheral vision while fixating on center. Reduces eye movements for faster reading."
                }
              },
              {
                "@type": "Question",
                "name": "What training modes are available?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Three modes: Left side only, Right side only, or Both sides alternating. Switch modes anytime between sessions."
                }
              },
              {
                "@type": "Question",
                "name": "How does peripheral vision improve reading speed?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "By expanding visual span, you see more words per fixation. Fewer eye movements per line means 30-50 percent faster reading speed."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This peripheral vision drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <PeripheralReaderClient />
    </>
  );
}