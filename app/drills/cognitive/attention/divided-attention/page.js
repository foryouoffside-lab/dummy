import DividedAttentionClient from './DividedAttentionClient';

export const metadata = {
  title: 'Divided Attention Drill - Dual Task Cognitive Training | SkillDrills',
  description: 'Train multitasking with this free dual task drill. Track moving balls while matching even numbers in a 60-second challenge. No sign-up required.',
  keywords: [
    'divided attention drill', 'dual task training', 'multitasking drill online',
    'cognitive training free', 'attention splitting test', 'visual tracking practice',
    'number matching game', 'cognitive flexibility training', 'attention span drill',
    'brain training game free', 'multitasking test online', 'divided focus practice',
    'dual task cognitive test', 'attention training free', 'multitasking skills test',
    'cognitive assessment free', 'divided attention test', 'dual processing drill',
    'simultaneous task training', 'cognitive multitasking', 'attention control drill',
    'visual attention training', 'cognitive performance test', 'brain multitasking',
    'skilldrills divided attention', 'skilldrills cognitive drill', 'free brain training',
    'online cognitive exercise', 'attention management training', 'task switching practice',
    'cognitive load training', 'executive function drill', 'mental flexibility test',
    'free attention test', 'browser brain training', 'no download cognitive drill',
  ],
  openGraph: {
    title: 'Divided Attention Drill - Dual Task Training | SkillDrills',
    description: 'Master multitasking with visual tracking and number matching. Free 60s challenge.',
    type: 'article',
    url: 'https://skilldrills.online/drills/cognitive/attention/divided-attention',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Divided Attention Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Divided Attention Drill | SkillDrills',
    description: 'Train multitasking with dual task cognitive drill. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/attention/divided-attention',
  },
};

export default function DividedAttentionPage() {
  return (
    <>
      <noscript>
        <h1>Divided Attention Drill - Dual Task Cognitive Training</h1>
        <p>Free dual task drill combining visual tracking with number matching. 60-second challenge. No sign-up required.</p>
      </noscript>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "Cognitive Drills", "item": "https://skilldrills.online/drills/cognitive" },
              { "@type": "ListItem", "position": 3, "name": "Attention", "item": "https://skilldrills.online/drills/cognitive/attention" },
              { "@type": "ListItem", "position": 4, "name": "Divided Attention" }
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
            "name": "Divided Attention Drill",
            "url": "https://skilldrills.online/drills/cognitive/attention/divided-attention",
            "description": "Free dual task drill combining visual tracking and number matching. 60-second challenge with 5 lives, combo streaks, and dual scoring.",
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
                "name": "What is the Divided Attention Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free dual task exercise where you click moving balls while monitoring a number stream for even numbers. 60-second challenge with 5 lives and combo streaks."
                }
              },
              {
                "@type": "Question",
                "name": "How does dual task training improve cognitive skills?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Forces your brain to split attention between visual tracking and number recognition. Strengthens neural pathways for better real-world multitasking."
                }
              },
              {
                "@type": "Question",
                "name": "Who benefits from this drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Gamers, professionals handling multiple tasks, students taking notes while listening, and anyone wanting better multitasking skills."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This divided attention drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <DividedAttentionClient />
    </>
  );
}