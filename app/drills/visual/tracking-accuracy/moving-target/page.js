import KineticInterceptClient from './KineticInterceptClient';

export const metadata = {
  title: 'Kinetic Intercept Drill - Moving Target Tracking | SkillDrills',
  description: 'Train hand-eye coordination with fast-moving targets from all 4 edges. Green cursor feedback on target. 3 lives, streak bonuses. No sign-up.',
  keywords: [
    'moving target training', 'target tracking drill', 'aim training',
    'hand-eye coordination', 'moving target clicking', 'tracking accuracy',
    'reflex aim training', 'target interception', 'mouse accuracy drill',
    'kinetic intercept', 'moving ball click', 'tracking speed test',
    'free aim trainer', 'coordination drill',
    'kinetic intercept free', 'moving target drill free', 'tracking aim practice',
    'visual pursuit training', 'cursor feedback drill', 'green cursor target',
    'edge spawn target', 'mouse precision training', 'target tracking game',
    'skilldrills kinetic intercept', 'skilldrills tracking', 'skilldrills visual',
    'intercept moving target', 'coordination aim drill', 'reflex tracking test',
    'visual motor training', 'predictive aiming drill', 'moving object click',
  ],
  openGraph: {
    title: 'Kinetic Intercept Drill - Moving Target Tracking | SkillDrills',
    description: 'Fast-moving targets from 4 edges. Green cursor feedback. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual/tracking-accuracy/moving-target',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Kinetic Intercept Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kinetic Intercept Drill | SkillDrills',
    description: 'Fast-moving targets from 4 edges. Green cursor. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/tracking-accuracy/moving-target',
  },
};

export default function KineticInterceptPage() {
  return (
    <>
      <noscript>
        <h1>Kinetic Intercept Drill - Moving Target Tracking & Aim Training</h1>
        <p>Free moving target drill with fast targets from all 4 edges and green cursor feedback. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 3, "name": "Tracking Accuracy", "item": "https://skilldrills.online/drills/visual/tracking-accuracy" },
              { "@type": "ListItem", "position": 4, "name": "Kinetic Intercept" }
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
            "name": "Kinetic Intercept Drill",
            "url": "https://skilldrills.online/drills/visual/tracking-accuracy/moving-target",
            "description": "Free moving target drill. Fast white targets spawn from 4 edges at 12-22 speed. Cursor turns green on target. 3 lives, 5-streak bonuses.",
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
                "name": "What is the Kinetic Intercept Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free hand-eye coordination drill. Fast white targets spawn from 4 edges at 12-22 speed. Cursor turns green on target. +1 per hit."
                }
              },
              {
                "@type": "Question",
                "name": "How does cursor feedback work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Crosshair is red normally. Turns green with green ring when hovering over the active target. Confirms target acquisition before clicking."
                }
              },
              {
                "@type": "Question",
                "name": "What skills does this improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Hand-eye coordination, moving target tracking, visual pursuit, predictive aiming, and mouse accuracy."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This kinetic intercept drill is completely free and works instantly in your browser."
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