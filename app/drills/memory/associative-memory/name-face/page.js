import NameFaceClient from './NameFaceClient';

export const metadata = {
  title: 'Name-Face Memory Drill - Associative Face-Name Recall | SkillDrills',
  description: 'Train face-name association with 30 unique emoji profiles. Memorize for 5 seconds, then pick the correct name from 3 options. Adaptive 3-8 profiles. No sign-up.',
  keywords: [
    'name face memory', 'face name association', 'name recall training',
    'face memory drill', 'associative memory faces', 'remembering names',
    'name memory game', 'face recognition memory', 'name recall practice',
    'social memory training', 'person memory drill', 'name association',
    'free memory training', 'face name recall', 'cognitive memory drill',
    'name face free', 'face name memory drill', 'name recall drill free',
    'social recognition training', 'name memory practice', 'face association game',
    'networking memory aid', 'professional name recall', 'meeting memory drill',
    'skilldrills name face', 'skilldrills memory', 'skilldrills associative',
    'emoji memory drill', 'profile memory game', 'adaptive name recall',
    'multiple choice memory', 'visual verbal association', 'working memory names',
  ],
  openGraph: {
    title: 'Name-Face Memory Drill - Face-Name Recall | SkillDrills',
    description: '30 unique emoji profiles. Memorize names with faces. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/memory/associative-memory/name-face',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Name-Face Memory Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Name-Face Memory Drill | SkillDrills',
    description: '30 unique emoji profiles. Memorize names then recall. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/associative-memory/name-face',
  },
};

export default function NameFacePage() {
  return (
    <>
      <noscript>
        <h1>Name-Face Memory Drill - Associative Face-Name Recall Training</h1>
        <p>Free name-face memory drill with 30 unique emoji profiles. Adaptive difficulty 3-8 profiles. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 3, "name": "Associative Memory", "item": "https://skilldrills.online/drills/memory/associative-memory" },
              { "@type": "ListItem", "position": 4, "name": "Name-Face Memory" }
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
            "name": "Name-Face Memory Drill",
            "url": "https://skilldrills.online/drills/memory/associative-memory/name-face",
            "description": "Free face-name memory drill. 30 unique emoji profiles with names and roles. 5-second memorization, multiple choice recall. Adaptive 3-8 profiles.",
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
                "name": "What is the Name-Face Memory Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free associative memory exercise with 30 emoji profiles. Memorize names and faces for 5 seconds, then pick the correct name from 3 options."
                }
              },
              {
                "@type": "Question",
                "name": "How does adaptive difficulty work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Start at 3 profiles. Profile count increases as you answer correctly, up to 8 maximum. Always challenged at your current memory level."
                }
              },
              {
                "@type": "Question",
                "name": "Who should use this drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Networking professionals, teachers, sales representatives, healthcare workers, and anyone who struggles with remembering names."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This name-face drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <NameFaceClient />
    </>
  );
}