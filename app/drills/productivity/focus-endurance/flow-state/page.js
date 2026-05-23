import FlowInductionClient from './FlowInductionClient';

export const metadata = {
  title: 'Flow State - Concentration Focus Drill | SkillDrills',
  description: 'Track a moving ring to achieve flow state. +1pt/0.5s inside, adaptive speed, flow meter 0-100%, double ring at 60%+. No sign-up.',
  keywords: [
    'flow state training', 'flow induction drill', 'deep concentration practice',
    'flow experience online', 'focus flow training', 'concentration flow exercise',
    'peak performance training', 'cognitive flow state', 'mental flow state drill',
    'zone training online', 'flow state practice free', 'attention flow training',
    'optimal experience exercise', 'flow psychology drill', 'free flow training',
    'deep work preparation', 'focus endurance training', 'concentration stamina',
    'productivity focus drill', 'cognitive enhancement flow', 'peak focus training',
    'sustained attention practice', 'hand eye coordination flow', 'distraction resistance',
    'flow state induction', 'deep focus training online', 'concentration game',
    'mindfulness focus drill', 'attention span training', 'flow state exercise',
    'skilldrills flow state', 'skilldrills focus training', 'free concentration drill',
    'online focus game', 'browser flow training', 'no download concentration practice',
    'flow state benefits', 'how to enter flow state', 'flow state psychology',
    'mihaly csikszentmihalyi flow', 'optimal state of consciousness', 'flow channel',
  ],
  openGraph: {
    title: 'Flow State - Concentration Focus Drill | SkillDrills',
    description: 'Track a moving ring to achieve flow state. +1pt/0.5s inside, adaptive speed, flow meter 0-100%, double ring at 60%+. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/productivity/focus-endurance/flow-state',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Flow State Training',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flow State - Concentration Focus Drill | SkillDrills',
    description: 'Track a moving ring to achieve flow state. +1pt/0.5s inside, adaptive speed, flow meter 0-100%, double ring at 60%+. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/productivity/focus-endurance/flow-state',
  },
};

export default function FlowInductionPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Productivity Training", "item": "https://skilldrills.online/drills/productivity" },
              { "@type": "ListItem", "position": 3, "name": "Focus Endurance", "item": "https://skilldrills.online/drills/productivity/focus-endurance" },
              { "@type": "ListItem", "position": 4, "name": "Flow State" }
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
            "name": "Flow State Training",
            "url": "https://skilldrills.online/drills/productivity/focus-endurance/flow-state",
            "description": "Free flow state drill. Track moving ring with cursor. +1pt/0.5s inside, adaptive speed. Flow meter 0-100%, double ring at 60%+. 60-second challenge.",
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
                "name": "What is flow state training?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free concentration exercise based on Csikszentmihalyi's flow psychology. Track moving ring. +1pt/0.5s inside. Flow meter, double ring at 60%+ deep flow."
                }
              },
              {
                "@type": "Question",
                "name": "What is the double ring indicator?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Appears at 60%+ flow level. Primary ring glows brighter with secondary ring. Represents deep flow zone where concentration peaks."
                }
              },
              {
                "@type": "Question",
                "name": "How does adaptive difficulty work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ring speed and jitter increase with streak. Every 50 streak points triggers speed increase. Always challenging at your level."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This flow state drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <FlowInductionClient />
    </>
  );
}