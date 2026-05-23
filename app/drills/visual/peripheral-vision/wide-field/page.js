import WideFieldClient from './WideFieldClient';

export const metadata = {
  title: 'Wide Field - Peripheral Vision Drill | SkillDrills',
  description: 'Train peripheral vision with characters flashing 400ms in 4 corners. Fixate center, recall 1-3 characters in order. Perfect recall 10pts/char. No sign-up.',
  keywords: [
    'wide field awareness', 'peripheral vision training', 'character recall',
    'visual field test', 'peripheral character detection', 'vision span training',
    'visual memory drill', 'peripheral awareness test', 'eye training',
    'visual attention training', 'field of view training', 'vision exercise',
    'free peripheral vision test', 'visual cognition drill',
    'wide field awareness free', 'peripheral character recall free', 'corner flash training',
    'visual memory practice', 'peripheral detection drill', 'center fixation training',
    'character recognition peripheral', 'vision span exercise', 'wide field drill',
    'skilldrills wide field', 'skilldrills visual drills', 'skilldrills peripheral',
    '400ms character flash', 'recall quiz peripheral', 'visual attention span',
    'peripheral vision exercise', 'wide awareness training', 'visual field awareness',
  ],
  openGraph: {
    title: 'Wide Field - Peripheral Vision Drill | SkillDrills',
    description: 'Characters flash 400ms in 4 corners. Center fixation, recall quiz. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual/peripheral-vision/wide-field',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Wide Field Awareness Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wide Field - Peripheral Vision Drill | SkillDrills',
    description: 'Characters flash in 4 corners. Recall quiz. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/peripheral-vision/wide-field',
  },
};

export default function WideFieldPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Visual Training", "item": "https://skilldrills.online/drills/visual" },
              { "@type": "ListItem", "position": 3, "name": "Peripheral Vision", "item": "https://skilldrills.online/drills/visual/peripheral-vision" },
              { "@type": "ListItem", "position": 4, "name": "Wide Field Awareness" }
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
            "name": "Wide Field Awareness Drill",
            "url": "https://skilldrills.online/drills/visual/peripheral-vision/wide-field",
            "description": "Free peripheral vision drill. Characters flash 400ms in 4 corners while fixating center. Recall quizzes test 1-3 characters. 10pts perfect, 5pts partial.",
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
                "name": "What is the Wide Field Awareness Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free peripheral vision exercise. Characters flash 400ms in 4 corners. Fixate center cross. Recall 1-3 characters in order. 10pts perfect, 5pts partial."
                }
              },
              {
                "@type": "Question",
                "name": "How does the recall quiz system work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "After 3+ flashes, 12% chance per cycle of a recall quiz. Type last 1-3 characters in order. Results show correct (green) and incorrect (red)."
                }
              },
              {
                "@type": "Question",
                "name": "Who should use this drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Athletes (court vision), drivers (hazard detection), gamers (screen-wide processing), and anyone wanting better peripheral awareness."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This wide field awareness drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <WideFieldClient />
    </>
  );
}