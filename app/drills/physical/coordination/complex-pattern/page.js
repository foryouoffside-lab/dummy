import ComplexPatternClient from './ComplexPatternClient';

export const metadata = {
  title: 'Pattern Memory Game - Free Coordination Training Online | SkillDrills',
  description: 'Free pattern memory game online. Memorize path patterns in 2 seconds then draw from memory — the best coordination training and spatial memory exercise. Adaptive complexity 2–8 waypoints. No sign-up.',
  keywords: [
    'pattern memory game', 'pattern memory game online', 'free pattern memory game',
    'memory game online', 'coordination training online', 'coordination exercises online',
    'free coordination game', 'coordination training game', 'motor coordination exercises',
    'spatial memory training', 'spatial memory game', 'visual memory game online',
    'pattern recognition game', 'pattern drawing game', 'shape memory challenge',
    'hand eye coordination game', 'hand eye coordination training', 'hand eye coordination drill',
    'motor control patterns', 'fine motor training', 'visual motor integration',
    'cognitive motor training', 'brain training game free', 'memory coordination drill',
    'adaptive pattern game', 'drawing accuracy test', 'path replication game',
    'pattern matching exercise', 'memory drawing challenge', 'coordination skill game',
    'FPS coordination training', 'gaming motor skills', 'esports coordination',
    'mouse precision pattern', 'cursor accuracy game', 'drawing skill online',
    'skilldrills pattern drill', 'skilldrills coordination', 'free motor skills game',
    'online coordination test', 'browser pattern game', 'no download memory game',
  ],
  openGraph: {
    title: 'Pattern Memory Game - Free Coordination Training Online | SkillDrills',
    description: 'Free pattern memory game and coordination training. Memorize path patterns in 2 seconds, draw from memory. Adaptive complexity. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/physical/coordination/complex-pattern',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Pattern Memory Game - Coordination Training',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pattern Memory Game - Free Coordination Training Online | SkillDrills',
    description: 'Free pattern memory game. Memorize path patterns in 2 seconds and draw from memory. Best coordination training game. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/coordination/complex-pattern',
  },
};

export default function ComplexPatternPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Physical Training", "item": "https://skilldrills.online/drills/physical" },
              { "@type": "ListItem", "position": 3, "name": "Coordination", "item": "https://skilldrills.online/drills/physical/coordination" },
              { "@type": "ListItem", "position": 4, "name": "Pattern Memory Game - Coordination Training" }
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
            "name": "Pattern Memory Game - Free Coordination Training",
            "url": "https://skilldrills.online/drills/physical/coordination/complex-pattern",
            "description": "Free pattern memory game and coordination training exercise. Memorize path patterns for 2 seconds, draw from memory. Shape-based scoring (60% path, 30% direction, 10% endpoints). Adaptive complexity 2-8 waypoints.",
            "applicationCategory": "HealthApplication",
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
                "name": "What is this pattern memory game?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free pattern memory game and coordination training exercise. Memorize a path pattern for 2 seconds, then draw it from memory. Shape-based scoring system rewards accuracy. Adaptive complexity scales from 2 to 8 waypoints."
                }
              },
              {
                "@type": "Question",
                "name": "How does pattern scoring work in this coordination training game?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Shape-based scoring: 60% path similarity, 30% direction accuracy, 10% start/end proximity. Scoring 60%+ is a success. Both patterns are resampled to 100 points for fair comparison. High accuracy earns bonus points."
                }
              },
              {
                "@type": "Question",
                "name": "What skills does this pattern memory game improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Spatial memory, fine motor coordination, visual-motor integration, pattern recognition, hand-eye coordination, and short-term working memory — all core coordination training skills."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up for this pattern memory game?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This free pattern memory game and coordination training drill works instantly in your browser — no downloads needed."
                }
              }
            ]
          })
        }}
      />

      <ComplexPatternClient />
    </>
  );
}