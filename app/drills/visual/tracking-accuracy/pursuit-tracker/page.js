import AutoPursuitClient from './AutoPursuitClient';

export const metadata = {
  title: 'Auto-Pursuit - Smooth Tracking Drill | SkillDrills',
  description: 'Keep cursor on randomly moving target with directional jitter. +1pt/0.5s continuous tracking. Green glow feedback. No penalties. No sign-up.',
  keywords: [
    'pursuit tracking', 'smooth pursuit training', 'eye tracking drill',
    'cursor tracking practice', 'hand-eye coordination', 'continuous tracking',
    'moving target follow', 'tracking accuracy test', 'visual pursuit',
    'smooth pursuit drill', 'target following practice', 'coordination training',
    'free pursuit tracker', 'visual motor training',
    'auto pursuit free', 'smooth pursuit drill free', 'continuous tracking practice',
    'cursor on target drill', 'predictive tracking training', 'motor endurance drill',
    'visual motor integration', 'tracking streak drill', 'sustained attention practice',
    'skilldrills auto pursuit', 'skilldrills pursuit', 'skilldrills tracking',
    'green target tracking', 'jitter tracking drill', 'continuous aim training',
    'smooth motor control', 'tracking accuracy practice', 'pursuit aim drill',
  ],
  openGraph: {
    title: 'Auto-Pursuit - Smooth Tracking Drill | SkillDrills',
    description: 'Keep cursor on randomly moving target with directional jitter. +1pt/0.5s continuous tracking. Green glow feedback. No penalties. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual/tracking-accuracy/pursuit-tracker',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Auto-Pursuit Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auto-Pursuit - Smooth Tracking Drill | SkillDrills',
    description: 'Keep cursor on randomly moving target with directional jitter. +1pt/0.5s continuous tracking. Green glow feedback. No penalties. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/tracking-accuracy/pursuit-tracker',
  },
};

export default function AutoPursuitPage() {
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
              { "@type": "ListItem", "position": 4, "name": "Auto-Pursuit" }
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
            "name": "Auto-Pursuit Drill",
            "url": "https://skilldrills.online/drills/visual/tracking-accuracy/pursuit-tracker",
            "description": "Free smooth pursuit drill. Track randomly moving target with directional jitter. +1pt/0.5s continuous tracking. Green glow feedback. No penalties.",
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
                "name": "What is the Auto-Pursuit Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free smooth pursuit tracking exercise. Keep cursor on randomly moving target with directional jitter. +1pt/0.5s. Green glow feedback. No penalties."
                }
              },
              {
                "@type": "Question",
                "name": "How does the jitter system work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "~3% chance per frame of directional jitter up to 8px. Speed capped at 12px. Unpredictable movement requires active predictive tracking."
                }
              },
              {
                "@type": "Question",
                "name": "What skills does this improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Smooth pursuit tracking, hand-eye coordination, predictive tracking, motor precision, and sustained motor control endurance."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This pursuit tracking drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <AutoPursuitClient />
    </>
  );
}