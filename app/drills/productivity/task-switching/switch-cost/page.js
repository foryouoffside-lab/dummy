import SwitchCostIntegratorClient from './SwitchCostIntegratorClient';

export const metadata = {
  title: 'Switch Cost - Task Switching Drill | SkillDrills',
  description: 'Alternate between direct and opposite mode orb tracking. Adaptive 1000-400ms speed. 3 lives, combo streaks. No sign-up.',
  keywords: [
    'switch cost training', 'task switching cost drill', 'cognitive switching practice',
    'switch cost integrator', 'task set reconfiguration', 'cognitive flexibility training',
    'attention switching drill', 'mental set shifting', 'switch cost measurement',
    'executive control training', 'task switching performance', 'cognitive training online',
    'free cognitive flexibility test', 'switch cost drill free', 'attention control practice',
    'task switching paradigm', 'cognitive adaptability training', 'brain flexibility exercise',
    'mental switching drill', 'executive function training', 'cognitive control practice',
    'productivity switching drill', 'focus switching training', 'attention flexibility',
    'cognitive shifting test', 'mental agility drill', 'brain training switching',
    'skilldrills switch cost', 'skilldrills task switching', 'free cognitive drill',
    'online brain training', 'browser cognitive exercise', 'no download brain game',
    'switch cost reduction', 'improve task switching', 'cognitive flexibility exercises',
    'ADHD focus training', 'executive dysfunction help', 'cognitive remediation',
    'attention training task switching', 'dual task performance', 'multitasking brain training',
  ],
  openGraph: {
    title: 'Switch Cost - Task Switching Drill | SkillDrills',
    description: 'Alternate between direct and opposite mode orb tracking. Adaptive 1000-400ms speed. 3 lives, combo streaks. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/productivity/task-switching/switch-cost',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Switch Cost Training',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Switch Cost - Task Switching Drill | SkillDrills',
    description: 'Alternate between direct and opposite mode orb tracking. Adaptive 1000-400ms speed. 3 lives, combo streaks. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/productivity/task-switching/switch-cost',
  },
};

export default function SwitchCostIntegratorPage() {
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
              { "@type": "ListItem", "position": 3, "name": "Task Switching", "item": "https://skilldrills.online/drills/productivity/task-switching" },
              { "@type": "ListItem", "position": 4, "name": "Switch Cost" }
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
            "name": "Switch Cost Training",
            "url": "https://skilldrills.online/drills/productivity/task-switching/switch-cost",
            "description": "Free task switching drill. Alternate direct (BOTTOM: same shadow) and opposite (TOP: opposite shadow) orb tracking. Adaptive 1000-400ms speed.",
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
                "name": "What is switch cost training?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Trains the mental effort to switch between tasks. TOP zone: click opposite shadow. BOTTOM zone: click same shadow. Adaptive 1000-400ms speed."
                }
              },
              {
                "@type": "Question",
                "name": "What are the two switching modes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Direct (BOTTOM): click matching shadow. Opposite (TOP): click opposite shadow. Alternating requires task set reconfiguration."
                }
              },
              {
                "@type": "Question",
                "name": "What skills does this improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Cognitive flexibility, executive control, task set reconfiguration, attention switching, and inhibition of automatic responses."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This switch cost drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <SwitchCostIntegratorClient />
    </>
  );
}