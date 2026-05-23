import NBackClient from './NBackClient';

export const metadata = {
  title: '3-Back Training Drill - Working Memory & N-Back Exercise | SkillDrills',
  description: 'Train working memory with the classic N-Back task at 3-back level. Letters every second, compare to 3 steps back. ~23 matches per round. No sign-up.',
  keywords: [
    'n-back training', '3-back task', 'working memory exercise',
    'dual n-back', 'cognitive training n-back', 'working memory test',
    'n-back brain training', 'memory update drill', 'fluid intelligence training',
    'cognitive enhancement n-back', 'working memory span', 'n-back game',
    'free n-back training', 'brain working memory', 'cognitive n-back drill',
    '3-back free', 'n-back working memory free', 'cognitive control training',
    'sustained attention drill', 'executive function training', 'information updating',
    'n-back task online', 'working memory improvement', 'cognitive assessment n-back',
    'skilldrills n-back', 'skilldrills working memory', 'skilldrills cognitive',
    'brain training n-back', 'memory sequence task', 'cognitive performance drill',
    'mental agility training', 'attention memory drill', 'n-back practice free',
  ],
  openGraph: {
    title: '3-Back Training - Working Memory N-Back | SkillDrills',
    description: 'Classic N-Back at 3-back level. 60 letters per round. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/memory/working-memory/n-back',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: '3-Back Training Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '3-Back Training Drill | SkillDrills',
    description: 'Classic N-Back at 3-back with 60 letters. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/working-memory/n-back',
  },
};

export default function NBackPage() {
  return (
    <>
      <noscript>
        <h1>3-Back Training Drill - Working Memory & N-Back Cognitive Exercise</h1>
        <p>Free N-Back working memory task at 3-back difficulty level. Scientifically-validated cognitive training. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 3, "name": "Working Memory", "item": "https://skilldrills.online/drills/memory/working-memory" },
              { "@type": "ListItem", "position": 4, "name": "3-Back Training" }
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
            "name": "3-Back Training Drill",
            "url": "https://skilldrills.online/drills/memory/working-memory/n-back",
            "description": "Free N-Back working memory task at 3-back level. Letters every second with ~23 matches per round. +1 correct, -5 wrong. Gold standard cognitive training.",
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
                "name": "What is the 3-Back Training Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free N-Back working memory task at 3-back level. Letters appear every second. Compare current letter to the one from 3 steps back. ~23 matches per round."
                }
              },
              {
                "@type": "Question",
                "name": "Why is N-Back the gold standard?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most researched cognitive training paradigm. Requires continuous working memory updating. Research shows improvements in working memory and fluid intelligence."
                }
              },
              {
                "@type": "Question",
                "name": "How does scoring work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "+1 for correct judgment, -5 for wrong. Heavy penalty discourages guessing. 1-second timeout per letter. Streak bonuses every 5 correct."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This N-Back drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <NBackClient />
    </>
  );
}