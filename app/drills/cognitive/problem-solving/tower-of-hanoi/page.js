import TowerOfHanoiClient from './TowerOfHanoiClient';

export const metadata = {
  title: 'Tower of Hanoi - Recursive Puzzle | SkillDrills',
  description: 'Master the classic Tower of Hanoi with progressive 3-8 disk levels. Perfect move celebrations, efficiency tracking, no penalties. No sign-up.',
  keywords: [
    'tower of hanoi', 'recursive puzzle', 'problem solving game online',
    'strategic planning drill', 'logical thinking practice', 'brain teaser online',
    'cognitive puzzle free', 'hanoi tower game', 'disk stacking puzzle',
    'algorithmic thinking training', 'puzzle training', 'brain training game',
    'classic puzzle online', 'free puzzle game', 'recursive thinking practice',
    'programming interview prep', 'recursion practice', 'algorithm practice',
    'computer science puzzle', 'coding interview preparation', 'problem solving skills',
    'tower of hanoi solver', 'tower of hanoi online', 'tower of hanoi game free',
    'cognitive training puzzle', 'mental exercise game', 'brain exercise puzzle',
    'skilldrills puzzle', 'skilldrills hanoi', 'free brain puzzle',
    'logical deduction game', 'planning skills training', 'strategy game online',
    'puzzle for programmers', 'tech interview puzzle', 'recursive algorithm game',
    'tower of hanoi 8 disks', 'tower of hanoi challenge', 'mathematical puzzle',
    'problem solving for kids', 'problem solving for adults', 'cognitive development tool',
  ],
  openGraph: {
    title: 'Tower of Hanoi - Recursive Puzzle | SkillDrills',
    description: 'Classic recursive puzzle with 3-8 disk levels. Perfect move celebrations. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/cognitive/problem-solving/tower-of-hanoi',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Tower of Hanoi Puzzle',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tower of Hanoi - Recursive Puzzle | SkillDrills',
    description: 'Master recursive problem solving. 3-8 disk levels. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/problem-solving/tower-of-hanoi',
  },
};

export default function TowerOfHanoiPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Cognitive Drills", "item": "https://skilldrills.online/drills/cognitive" },
              { "@type": "ListItem", "position": 3, "name": "Problem Solving", "item": "https://skilldrills.online/drills/cognitive/problem-solving" },
              { "@type": "ListItem", "position": 4, "name": "Tower of Hanoi" }
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
            "name": "Tower of Hanoi",
            "url": "https://skilldrills.online/drills/cognitive/problem-solving/tower-of-hanoi",
            "description": "Free Tower of Hanoi puzzle with progressive 3-8 disk levels. Perfect move celebrations, efficiency scoring, no penalties. 60-second challenge.",
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
                "name": "What is the Tower of Hanoi puzzle?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A classic mathematical puzzle with three rods and disks of different sizes. Move the entire stack following two rules: one disk at a time, no larger disk on a smaller one."
                }
              },
              {
                "@type": "Question",
                "name": "What are the minimum moves?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "2^n - 1 where n is disk count. 3 disks = 7 moves, 4 = 15, 5 = 31, 6 = 63, 7 = 127, 8 = 255. Perfect solutions earn celebration sounds."
                }
              },
              {
                "@type": "Question",
                "name": "Is this good for programming interviews?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Tower of Hanoi is the most famous recursion example in computer science. Understanding it is a common interview question at Google, Amazon, and Microsoft."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This Tower of Hanoi puzzle is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <TowerOfHanoiClient />
    </>
  );
}