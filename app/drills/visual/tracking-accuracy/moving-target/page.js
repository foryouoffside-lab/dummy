import KineticInterceptClient from './KineticInterceptClient';

export const metadata = {
  title: 'Moving Target Pro - Visual Tracking & Intercept Click Test',
  description: 'Train visual pursuit tracking speed and hand-eye coordination with kinetic moving target click test. Intercept targets with dynamic level scaling, 45s+ session. Free.',
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
    description: 'Train visual pursuit tracking speed and hand-eye coordination with kinetic moving target click test. Intercept targets with dynamic level scaling. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual/tracking-accuracy/moving-target',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moving Target Pro - Visual Tracking & Intercept Click Test | SkillDrills',
    description: 'Train visual pursuit tracking speed and hand-eye coordination with kinetic moving target click test. Intercept targets with dynamic level scaling. Free.',
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
            "description": "Free kinetic visual tracking drill. Intercept bouncing target spheres traveling across a 2D bounding viewport, dynamic level scaling, clean timer.",
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
                  "text": "As your score and combo climb, target movement velocity accelerates and hitboxes shrink continuously."
                }
              },
              {
                "@type": "Question",
                "name": "Are there negative score or time penalties?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "By default, misclicks or timeouts only reset your combo multiplier. An opt-in time penalty (-0.8s per error) is available in session settings for hard-mode training."
                }
              },
              {
                "@type": "Question",
                "name": "Does difficulty decrease on mistakes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Your level progression is monotonic — a mistake never takes you back down, allowing you to master your current level."
                }
              },
              {
                "@type": "Question",
                "name": "How long does each drill session last?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Each round starts with 45 seconds on the clock, and successful intercepts add +0.6s to extend your run."
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