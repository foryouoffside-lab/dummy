import TargetPrioritizationClient from './TargetPrioritizationClient';

export const metadata = {
  title: 'Cognitive Aim Trainer - Free FPS Target Selection Practice',
  description: 'Improve your target selection with our free Cognitive Aim Trainer. Practice filtering visual distractors and identifying high-threat targets for Valorant and CS2.',
  keywords: [
    'cognitive aim trainer',
    'target selection aim drill',
    'fps cognitive training',
    'visual filtering aim trainer',
    'distractor suppression drill',
    'valorant target selection',
    'fps decision making training',
    'browser aim trainer',
    'raw input aim trainer',
    'target selection practice'
  ],
  openGraph: {
    title: 'Cognitive Aim Trainer - Free FPS Target Selection Practice',
    description: 'Improve your target selection with our free Cognitive Aim Trainer. Practice filtering visual distractors and identifying high-threat targets for Valorant and CS2.',
    type: 'website',
    url: 'https://skilldrills.online/drills/fps/target-prioritization',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [
      { 
        url: 'https://skilldrills.online/icons/icon-512x512.png', 
        width: 512, 
        height: 512, 
        alt: 'Cognitive Aim Trainer - FPS Target Selection Practice' 
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cognitive Aim Trainer - Free FPS Target Selection Practice',
    description: 'Improve your target selection with our free Cognitive Aim Trainer. Practice filtering visual distractors and identifying high-threat targets for Valorant and CS2.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { 
    index: true, 
    follow: true 
  },
  alternates: { 
    canonical: 'https://skilldrills.online/drills/fps/target-prioritization' 
  },
};

export default function TargetPrioritizationPage() {
  return (
    <>
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ 
          __html: JSON.stringify({
            "@context": "https://schema.org", 
            "@type": "BreadcrumbList",
            "itemListElement": [
              { 
                "@type": "ListItem", 
                "position": 1, 
                "name": "Home", 
                "item": "https://skilldrills.online" 
              },
              { 
                "@type": "ListItem", 
                "position": 2, 
                "name": "FPS Training", 
                "item": "https://skilldrills.online/drills/fps" 
              },
              { 
                "@type": "ListItem", 
                "position": 3, 
                "name": "Cognitive Aim Trainer" 
              }
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
            "name": "Cognitive Aim Trainer - Free FPS Target Selection Practice",
            "url": "https://skilldrills.online/drills/fps/target-prioritization",
            "description": "A free browser-based cognitive aim trainer utilizing 1:1 raw mouse input to help FPS players practice target selection, visual filtering, and distractor suppression.",
            "applicationCategory": "GameApplication", 
            "operatingSystem": "Any",
            "offers": { 
              "@type": "Offer", 
              "price": "0", 
              "priceCurrency": "USD" 
            },
            "author": { 
              "@type": "Organization", 
              "name": "SkillDrills" 
            }, 
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
                "name": "What is cognitive aim training in FPS games?",
                "acceptedAnswer": { 
                  "@type": "Answer", 
                  "text": "Cognitive aim training is a specialized form of practice that tests your brain's ability to filter visual noise, suppress distractions, and make correct split-second decisions before relying on raw physical flicking speed." 
                }
              },
              { 
                "@type": "Question", 
                "name": "How does target selection practice improve my gameplay?",
                "acceptedAnswer": { 
                  "@type": "Answer", 
                  "text": "In chaotic games like Valorant or Overwatch 2, encountering multiple enemies or abilities at once often causes players to panic and shoot the wrong target. Target selection practice trains your brain to remain calm, identify the highest threat instantly, and ignore visual decoys." 
                }
              },
              { 
                "@type": "Question", 
                "name": "Can a cognitive aim trainer stop me from panic firing?",
                "acceptedAnswer": { 
                  "@type": "Answer", 
                  "text": "Yes. By repeatedly practicing drills that actively punish you for shooting the wrong target (distractor suppression), you build the impulse control necessary to confirm your target before clicking, which significantly reduces panic firing in actual matches." 
                }
              }
            ]
          })
        }} 
      />
      
      <TargetPrioritizationClient />
    </>
  );
}