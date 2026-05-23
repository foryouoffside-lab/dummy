import ListeningComprehensionClient from './ListeningComprehensionClient';

export const metadata = {
  title: 'Listening Comprehension - Audio Memory | SkillDrills',
  description: 'Train listening skills with 9 audio passages and 18 questions across Easy, Medium, and Hard levels. Male and female voices. No sign-up.',
  keywords: [
    'listening comprehension drill', 'listening comprehension practice', 'listening comprehension test',
    'audio memory training', 'auditory processing test', 'auditory learning exercise',
    'listening skills test free', 'English listening practice', 'ESL listening practice',
    'IELTS listening preparation', 'TOEFL listening practice', 'language comprehension test',
    'audio quiz online', 'memory recall training', 'listening test free',
    'auditory memory exercise', 'active listening training', 'verbal comprehension test',
    'listening exercise online', 'audio passage practice',
    'free listening drill', 'online listening test',
    'spoken English practice', 'audio learning tool', 'auditory cognition test',
    'listening accuracy training', 'sound memory game',
    'skilldrills listening', 'skilldrills audio drill', 'free comprehension practice',
    'listening skills improvement', 'audio cognition assessment',
    'listening practice for exams', 'audio reasoning test',
    'free listening exercises', 'online audio quiz',
    'cognitive listening skills', 'brain listening training',
    'listening comprehension for beginners', 'advanced listening practice',
    'listening for competitive exams', 'IELTS listening test practice',
  ],
  openGraph: {
    title: 'Listening Comprehension - Audio Memory | SkillDrills',
    description: 'Train listening skills with 9 audio passages and 18 questions across Easy, Medium, and Hard levels. Male and female voices. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/academic/comprehension/listening-comprehension',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Listening Comprehension Drill - Audio Memory Training',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Listening Comprehension - Audio Memory | SkillDrills',
    description: 'Train listening skills with 9 audio passages and 18 questions across Easy, Medium, and Hard levels. Male and female voices. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/academic/comprehension/listening-comprehension',
  },
};

export default function ListeningComprehensionPage() {
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
              { "@type": "ListItem", "position": 3, "name": "Comprehension", "item": "https://skilldrills.online/drills/academic/comprehension" },
              { "@type": "ListItem", "position": 4, "name": "Listening Comprehension" }
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
            "name": "Listening Comprehension Drill",
            "url": "https://skilldrills.online/drills/academic/comprehension/listening-comprehension",
            "description": "Free interactive listening drill with 9 audio passages and 18 questions across 3 difficulty levels. Male and female voices. 60-second timed challenge.",
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
                "name": "What is the Listening Comprehension Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free interactive audio training exercise with 9 passages and 18 questions across Easy, Medium, and Hard levels. Male and female voices available. 60-second timed challenge with score tracking."
                }
              },
              {
                "@type": "Question",
                "name": "Is this helpful for IELTS and TOEFL preparation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. This drill practices the same skills tested: understanding main ideas, recalling details, processing different voices, and answering under time pressure."
                }
              },
              {
                "@type": "Question",
                "name": "Can ESL learners use this drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely. Easy level uses simpler vocabulary and slower speech. Medium and Hard levels increase complexity. Male and female voices expose learners to different speaking patterns."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This listening comprehension drill is completely free and works instantly in your browser. Best scores save locally."
                }
              }
            ]
          })
        }}
      />

      <ListeningComprehensionClient />
    </>
  );
}