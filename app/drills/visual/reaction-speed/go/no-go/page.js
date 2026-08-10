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
                  "text": "Every 900 points earned you level up, and signal flash windows accelerate from 600ms down to 350ms, challenging your impulse control boundaries."
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
                "name": "What happens if I run out of lives?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You start each run with 5 lives. Every wrong click on a red NO-GO signal costs 1 life; missing a green GO signal (timeout) costs no life at all. Reach 0 lives and the drill ends immediately, even if time remains."
                }
              },
              {
                "@type": "Question",
                "name": "Does difficulty decrease on mistakes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Your level only ever goes up — a mistake never takes you back down, so you can safely master your current level."
                }
              },
              {
                "@type": "Question",
                "name": "How long does each drill session last?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Each round is timed for exactly 45 seconds, or until your 5 lives run out — whichever comes first."
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