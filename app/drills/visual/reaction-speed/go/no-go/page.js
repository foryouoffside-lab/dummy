import ChromaSyncClient from './ChromaSyncClient';

export const metadata = {
  title: 'Go/No-Go Pro - Impulse Control & Reaction Speed Test',
  description: 'Train impulse control with Go/No-Go reaction speed test. React to green Go targets and suppress response on red No-Go triggers, dynamic level scaling, 45s+ session.',
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
    description: 'Train impulse control with Go/No-Go reaction speed test. React to green Go targets and suppress response on red No-Go triggers, dynamic level scaling. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual/reaction-speed/go/no-go',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Go/No-Go Pro - Impulse Control & Reaction Speed Test | SkillDrills',
    description: 'Train impulse control with Go/No-Go reaction speed test. React to green Go targets and suppress response on red No-Go triggers, dynamic level scaling. Free.',
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
            "description": "Free response inhibition task. React instantly to green GO targets while restraining response when red STOP targets appear, dynamic level scaling, clean timer.",
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
                "name": "What is the Go/No-Go Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free response inhibition task. React instantly to Green 'GO' targets while suppressing motor actions when Red 'STOP' targets spawn."
                }
              },
              {
                "@type": "Question",
                "name": "How does progressive difficulty work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "As your score and combo climb, signal display windows tighten continuously, challenging your impulse control boundaries."
                }
              },
              {
                "@type": "Question",
                "name": "Are there negative score or time penalties?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "By default, wrong clicks on red NO-GO signals cost 1 life without deducting time. An opt-in time penalty (-0.8s per error) is available in session settings for hard-mode training."
                }
              },
              {
                "@type": "Question",
                "name": "Can a bad run end early?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. A wrong click on a red NO-GO signal resets your combo (and deducts time if penalties are on), but nothing cuts the session short — every run plays until the clock reaches zero."
                }
              },
              {
                "@type": "Question",
                "name": "Does difficulty decrease on mistakes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Your level progression is monotonic — a mistake never takes you back down, so you can safely master your current level."
                }
              },
              {
                "@type": "Question",
                "name": "How long does each drill session last?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Each round starts with 45 seconds on the clock, extendable by hitting GO targets and holding NO-GOs. The clock is the only thing that ends a run."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This drill runs directly in your browser with instant response."
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