import SustainedAttentionClient from './SustainedAttentionClient';

export const metadata = {
  title: 'Sustained Attention - Vigilance Drill | SkillDrills',
  description: 'Train sustained attention with target detection. Memorize a number and click when it appears among flashing digits. Adaptive 300-500ms. No sign-up.',
  keywords: [
    'sustained attention drill', 'vigilance training', 'target detection test',
    'attention span training', 'focus endurance drill', 'concentration practice',
    'continuous performance test', 'CPT training online', 'attention maintenance',
    'cognitive vigilance test', 'response inhibition training', 'sustained focus drill',
    'brain training game', 'attention assessment free', 'vigilance test online',
    'sustained attention test', 'focus stamina training', 'attention endurance',
    'target monitoring drill', 'signal detection practice', 'attention span test',
    'cognitive training attention', 'free brain games focus', 'concentration stamina',
    'attention training online', 'vigilance exercise', 'focus maintenance drill',
    'skilldrills sustained attention', 'skilldrills vigilance', 'free cognitive drill',
    'online attention test', 'browser focus game', 'no download attention training',
  ],
  openGraph: {
    title: 'Sustained Attention - Vigilance Drill | SkillDrills',
    description: 'Train sustained attention with target detection. Memorize a number and click when it appears among flashing digits. Adaptive 300-500ms. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/cognitive/attention/sustained-attention',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Sustained Attention Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sustained Attention - Vigilance Drill | SkillDrills',
    description: 'Train sustained attention with target detection. Memorize a number and click when it appears among flashing digits. Adaptive 300-500ms. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/attention/sustained-attention',
  },
};

export default function SustainedAttentionPage() {
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
              { "@type": "ListItem", "position": 3, "name": "Attention", "item": "https://skilldrills.online/drills/cognitive/attention" },
              { "@type": "ListItem", "position": 4, "name": "Sustained Attention" }
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
            "name": "Sustained Attention Drill",
            "url": "https://skilldrills.online/drills/cognitive/attention/sustained-attention",
            "description": "Free sustained attention drill for vigilance training. Memorize a target number and click when it appears among flashing digits. Adaptive 300-500ms speed.",
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
                "name": "What is the Sustained Attention Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free CPT-style exercise where you memorize a target number and click only when it appears among rapidly flashing digits. Trains vigilance and focus maintenance."
                }
              },
              {
                "@type": "Question",
                "name": "How does the adaptive speed work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Starts at 500ms per flash. Correct responses decrease duration by 10ms down to 300ms minimum. Wrong responses reset to 500ms."
                }
              },
              {
                "@type": "Question",
                "name": "Is this helpful for ADHD and focus issues?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. CPT-style drills train the ability to maintain focus and resist impulsive responses. A training tool, not a diagnostic instrument."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This sustained attention drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <SustainedAttentionClient />
    </>
  );
}