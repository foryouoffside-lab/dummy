import ChromaSyncClient from './ChromaSyncClient';

export const metadata = {
  title: 'Chroma-Sync Lab - Go/No-Go Impulse Control Drill | SkillDrills',
  description: 'Train impulse control with Go/No-Go paradigm. Click GREEN, avoid RED. Adaptive 80-400ms window, 3 lives, reaction tracking. No sign-up.',
  keywords: [
    'go no-go test', 'impulse control training', 'reaction time drill',
    'go no-go paradigm', 'inhibitory control', 'response inhibition',
    'cognitive control training', 'reaction speed test', 'green red test',
    'impulse control game', 'selective response training', 'brain training',
    'free go no-go test', 'chroma sync drill', 'go no-go free',
    'chroma sync lab free', 'response inhibition drill', 'adaptive go no-go',
    'click green avoid red', 'impulse management training', 'cognitive inhibition',
    'skilldrills chroma sync', 'skilldrills go no-go', 'skilldrills visual',
    'reaction time tracker', 'adaptive window drill', 'go no-go challenge',
    'inhibitory control test', 'stop signal training', 'selective attention drill',
    'cognitive flexibility test', 'impulse restraint practice', 'go no-go online',
    'free impulse control test', 'visual response inhibition', 'gamer cognitive training',
  ],
  openGraph: {
    title: 'Chroma-Sync Lab - Go/No-Go Impulse Control | SkillDrills',
    description: 'Click GREEN only. Adaptive 80-400ms window. 3 lives. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual/reaction-speed/go/no-go',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Chroma-Sync Lab',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chroma-Sync Lab | SkillDrills',
    description: 'Go/No-Go impulse control. Click GREEN, avoid RED. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/reaction-speed/go/no-go',
  },
};

export default function ChromaSyncPage() {
  return (
    <>
      <noscript>
        <h1>Chroma-Sync Lab - Go/No-Go Reaction Time & Impulse Control Training</h1>
        <p>Free Go/No-Go impulse control drill with adaptive 80-400ms window. No sign-up required.</p>
      </noscript>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "Visual Training", "item": "https://skilldrills.online/drills/visual" },
              { "@type": "ListItem", "position": 3, "name": "Response Speed", "item": "https://skilldrills.online/drills/visual/reaction-speed" },
              { "@type": "ListItem", "position": 4, "name": "Chroma-Sync Lab" }
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
            "name": "Chroma-Sync Lab",
            "url": "https://skilldrills.online/drills/visual/reaction-speed/go/no-go",
            "description": "Free Go/No-Go impulse control drill. Click GREEN balls, avoid RED. Adaptive 80-400ms window, 3 lives, millisecond reaction tracking.",
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
                "name": "What is the Chroma-Sync Lab?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free Go/No-Go impulse control drill. Click GREEN balls only. Resist clicking RED. Adaptive 80-400ms window with 3 lives and reaction tracking."
                }
              },
              {
                "@type": "Question",
                "name": "How does the adaptive window work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Starts at 250ms. Fast hits shrink window by 20ms (min 80ms). Slow reactions expand by 15ms (max 400ms). Personalized difficulty."
                }
              },
              {
                "@type": "Question",
                "name": "What happens when I click RED?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Costs 1 life (max 3). After lives depleted, -1 point per error. Window expands 40ms to help recover. Streak resets to zero."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This Go/No-Go drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <ChromaSyncClient />
    </>
  );
}