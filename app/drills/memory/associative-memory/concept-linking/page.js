import ConceptLinkingClient from './ConceptLinkingClient';

export const metadata = {
  title: 'Concept Linking - Associative Memory | SkillDrills',
  description: 'Train associative memory by memorizing concept chains for 5 seconds then recalling step by step. 30 unique chains, 3 categories. Chains grow up to 8 concepts. No sign-up.',
  keywords: [
    'concept linking', 'associative memory', 'sequential recall', 'memory chain drill',
    'concept chain practice', 'associative learning', 'memory training', 'cognitive memory',
    'linking concepts', 'memory improvement', 'sequential memory', 'brain training',
    'free memory drill', 'associative recall', 'concept association', 'memory chain recall',
    'concept linking free', 'associative memory training', 'sequential recall practice',
    'memory chain trainer', 'concept association drill', 'cognitive training free',
    'working memory practice', 'memory improvement drill', 'brain exercise free',
    'study memory aid', 'exam preparation memory', 'information retention practice',
    'skilldrills concept linking', 'skilldrills memory', 'skilldrills associative',
    'concept recall test', 'memory sequence practice', 'associative thinking drill',
  ],
  openGraph: {
    title: 'Concept Linking - Associative Memory | SkillDrills',
    description: '30 unique concept chains. Memorize for 5 seconds then recall. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/memory/associative-memory/concept-linking',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Concept Linking Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Concept Linking - Associative Memory | SkillDrills',
    description: '30 unique concept chains. Memorize then recall. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/associative-memory/concept-linking',
  },
};

export default function ConceptLinkingPage() {
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
              { "@type": "ListItem", "position": 4, "name": "Concept Linking" }
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
            "name": "Concept Linking Drill",
            "url": "https://skilldrills.online/drills/memory/associative-memory/concept-linking",
            "description": "Free associative memory drill. 30 unique concept chains across 3 categories. 5-second memorization, step-by-step recall. Chains grow up to 8 concepts.",
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
                "name": "What is the Concept Linking Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free associative memory exercise. Memorize concept chains of 5-8 items in 5 seconds, then recall step by step. 30 unique chains across common, scientific, and abstract categories."
                }
              },
              {
                "@type": "Question",
                "name": "How does chain progression work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Start at 5 concepts. Every 3 perfect rounds increases chain length by 1, up to 8 maximum. Mistakes reset streak but keep current level."
                }
              },
              {
                "@type": "Question",
                "name": "What memory skills does this improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Associative memory, sequential recall, rapid information encoding, pattern recognition, and working memory capacity."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This concept linking drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <ConceptLinkingClient />
    </>
  );
}