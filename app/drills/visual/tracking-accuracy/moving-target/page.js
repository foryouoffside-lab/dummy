import KineticInterceptClient from './KineticInterceptClient';

export const metadata = {
  title: 'Moving Target Pro - Visual Tracking & Intercept Click Test',
  description: 'Train visual pursuit tracking speed and hand-eye coordination with kinetic moving target click test. Intercept targets with zero penalties, 45s session. Free.',
  keywords: [
    'moving target training',
    'target tracking drill',
    'moving target click test',
    'kinetic visual tracking game',
    'hand-eye coordination test',
    'smooth pursuit drill',
    'esports aiming drill',
    'skilldrills moving target',
  ],
  openGraph: {
    title: 'Moving Target Pro - Visual Tracking & Intercept Click Test | SkillDrills',
    description: 'Train visual pursuit tracking speed and hand-eye coordination with kinetic moving target click test. Intercept targets with zero penalties. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual/tracking-accuracy/moving-target',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moving Target Pro - Visual Tracking & Intercept Click Test | SkillDrills',
    description: 'Train visual pursuit tracking speed and hand-eye coordination with kinetic moving target click test. Intercept targets with zero penalties. Free.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/tracking-accuracy/moving-target',
  },
};

export default function KineticInterceptPage() {
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
              { "@type": "ListItem", "position": 3, "name": "Tracking Accuracy", "item": "https://skilldrills.online/drills/visual/tracking-accuracy" },
              { "@type": "ListItem", "position": 4, "name": "Moving Target Pro" }
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
            "name": "Moving Target Pro Drill",
            "url": "https://skilldrills.online/drills/visual/tracking-accuracy/moving-target",
            "description": "Free kinetic visual tracking drill. Intercept bouncing target spheres traveling across a 2D bounding viewport, zero negative penalties, clean 45-second timer.",
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
                "name": "What is the Moving Target Pro Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free visual tracking exercise. Intercept bouncing target spheres traveling across a 2D bounding viewport."
                }
              },
              {
                "@type": "Question",
                "name": "What skills does this drill improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Smooth pursuit tracking, hand-eye coordination, velocity prediction, and motor interception accuracy under dynamic time limits."
                }
              },
              {
                "@type": "Question",
                "name": "How does progressive difficulty work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "As your streak increases, target movement velocity accelerates and hitboxes shrink slightly."
                }
              },
              {
                "@type": "Question",
                "name": "Are there negative score or time penalties?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Misclicks never deduct score points or reduce remaining timer seconds — the screen just flashes red and the target keeps moving."
                }
              },
              {
                "@type": "Question",
                "name": "Does difficulty decrease on mistakes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. The level remains unchanged when a mistake is made, allowing you to master your current level."
                }
              },
              {
                "@type": "Question",
                "name": "How long does each drill session last?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Each round is timed for exactly 45 seconds of continuous focus."
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

      <KineticInterceptClient />
    </>
  );
}