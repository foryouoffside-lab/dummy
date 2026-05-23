import ComplexPatternClient from './ComplexPatternClient';

export const metadata = {
  title: 'Complex Pattern Elite - Pattern Memory & Coordination | SkillDrills',
  description: 'Memorize path patterns in 2 seconds, then draw from memory. Shape-based scoring. Adaptive complexity 2-8 waypoints. 60-second challenge. No sign-up.',
  keywords: [
    'complex pattern training', 'pattern memory drill', 'motor coordination exercise',
    'shape drawing practice', 'pattern replication game', 'hand-eye coordination',
    'spatial memory training', 'motor control patterns', 'drawing accuracy test',
    'visual memory drill', 'coordination challenge', 'free pattern game',
    'adaptive difficulty patterns', 'motor skills assessment', 'path drawing practice',
    'fine motor control training', 'visual motor integration', 'pattern recognition test',
    'spatial reasoning practice', 'mouse control drill', 'precision drawing exercise',
    'cognitive motor training', 'brain body coordination', 'visual spatial memory',
    'skilldrills pattern drill', 'skilldrills coordination', 'free motor skills game',
    'online coordination test', 'browser pattern game', 'no download coordination drill',
  ],
  openGraph: {
    title: 'Complex Pattern Elite - Pattern Memory | SkillDrills',
    description: 'Memorize path patterns in 2 seconds, then draw from memory. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/physical/Coordination/complex-pattern',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Complex Pattern Elite',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Complex Pattern Drill | SkillDrills',
    description: 'Train pattern memory and motor coordination. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/physical/Coordination/complex-pattern',
  },
};

export default function ComplexPatternPage() {
  return (
    <>
      <noscript>
        <h1>Complex Pattern Elite - Pattern Memory & Motor Coordination Training</h1>
        <p>Free pattern memory drill. Memorize paths, draw from memory. No sign-up required.</p>
      </noscript>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "Physical Training", "item": "https://skilldrills.online/drills/physical" },
              { "@type": "ListItem", "position": 3, "name": "Coordination", "item": "https://skilldrills.online/drills/physical/Coordination" },
              { "@type": "ListItem", "position": 4, "name": "Complex Pattern" }
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
            "name": "Complex Pattern Elite",
            "url": "https://skilldrills.online/drills/physical/Coordination/complex-pattern",
            "description": "Free coordination drill. Memorize path patterns in 2s, draw from memory. Shape-based scoring (60% shape, 30% direction, 10% endpoints). Adaptive 2-8 waypoints.",
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
                "name": "What is the Complex Pattern Elite drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free coordination exercise. Memorize path patterns for 2s, draw from memory. Shape-based scoring. Adaptive complexity 2-8 waypoints."
                }
              },
              {
                "@type": "Question",
                "name": "How does pattern scoring work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Shape-based: 60% path similarity, 30% direction accuracy, 10% start/end proximity. 60%+ score = success. Both paths resampled to 100 points."
                }
              },
              {
                "@type": "Question",
                "name": "What skills does this improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Spatial memory, fine motor control, visual-motor integration, pattern recognition, and hand-eye coordination."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This pattern drill is completely free and works instantly in your browser."
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