import ChromaSyncClient from './ChromaSyncClient';

export const metadata = {
  title: 'Go/No-Go Pro - Impulse Control & Reaction Speed Test | SkillDrills',
  description: 'Train impulse control with Go/No-Go reaction speed test. React to green Go targets and suppress response on red No-Go triggers, zero penalties, 45s session. Free.',
  keywords: [
    'go no go test online',
    'go no go test',
    'impulse control test',
    'go no go task',
    'response inhibition test',
    'reaction speed test',
    'trigger discipline drill',
    'executive function go nogo',
    'response inhibition drill',
    'skilldrills go nogo',
  ],
  openGraph: {
    title: 'Go/No-Go Pro - Impulse Control & Reaction Speed Test | SkillDrills',
    description: 'Train impulse control with Go/No-Go reaction speed test. React to green Go targets and suppress response on red No-Go triggers, zero penalties. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual/reaction-speed/go/no-go',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Go/No-Go Pro - Impulse Control & Reaction Speed Test | SkillDrills',
    description: 'Train impulse control with Go/No-Go reaction speed test. React to green Go targets and suppress response on red No-Go triggers, zero penalties. Free.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/reaction-speed/go/no-go',
  },
};

export default function ChromaSyncPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Visual Training", "item": "https://skilldrills.online/drills/visual" },
              { "@type": "ListItem", "position": 3, "name": "Reaction Speed", "item": "https://skilldrills.online/drills/visual/reaction-speed" },
              { "@type": "ListItem", "position": 4, "name": "Go/No-Go Pro" }
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
            "name": "Go/No-Go Pro Drill",
            "url": "https://skilldrills.online/drills/visual/reaction-speed/go/no-go",
            "description": "Free response inhibition task. React instantly to green GO targets while restraining response when red STOP targets appear, zero negative penalties, clean 45-second timer.",
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
                "name": "What is the Go/No-Go Pro Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free response inhibition task. React instantly to Green 'GO' targets while suppressing motor actions when Red 'STOP' targets spawn."
                }
              },
              {
                "@type": "Question",
                "name": "Why is Go/No-Go training effective?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "It builds prefrontal executive control and trigger discipline by strengthening motor response suppression under split-second time limits."
                }
              },
              {
                "@type": "Question",
                "name": "Are there negative score or time penalties?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Wrong clicks and missed signals never deduct score points or reduce remaining timer seconds — a wrong click on a red NO-GO signal instead costs 1 of your 5 lives."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This drill is completely free and works instantly in your browser."
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