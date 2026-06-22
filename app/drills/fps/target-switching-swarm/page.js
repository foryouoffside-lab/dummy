import TargetSwitchingSwarmClient from './TargetSwitchingSwarmClient';

export const metadata = {
  title: 'Target Switching Aim Trainer - Free Multi-Target Practice',
  description: 'Master multi-target gunfights with our free Target Switching Aim Trainer. Improve your flick transitions and target pathing for Valorant and CS2.',
  keywords: [
    'target switching aim trainer',
    'multi target aim trainer',
    'target switching practice',
    'fps target switching',
    'flick switching aim drill',
    'multi kill aim practice',
    'valorant target switching',
    'browser aim trainer',
    'raw input aim trainer',
    'high speed aim drill'
  ],
  openGraph: {
    title: 'Target Switching Aim Trainer - Free Multi-Target Practice',
    description: 'Master multi-target gunfights with our free Target Switching Aim Trainer. Improve your flick transitions and target pathing for Valorant and CS2.',
    type: 'website',
    url: 'https://skilldrills.online/drills/fps/target-switching-swarm',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [
      { 
        url: 'https://skilldrills.online/icons/icon-512x512.png', 
        width: 512, 
        height: 512, 
        alt: 'Target Switching Aim Trainer - Multi-Target Practice' 
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Target Switching Aim Trainer - Free Multi-Target Practice',
    description: 'Master multi-target gunfights with our free Target Switching Aim Trainer. Improve your flick transitions and target pathing for Valorant and CS2.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { 
    index: true, 
    follow: true 
  },
  alternates: { 
    canonical: 'https://skilldrills.online/drills/fps/target-switching-swarm' 
  },
};

export default function TargetSwitchingSwarmPage() {
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
                "name": "Target Switching Aim Trainer" 
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
            "name": "Target Switching Aim Trainer - Free Multi-Target Practice",
            "url": "https://skilldrills.online/drills/fps/target-switching-swarm",
            "description": "A free browser-based target switching aim trainer utilizing 1:1 raw mouse input to help FPS players practice high-speed transitions, flick accuracy, and multi-target pathing.",
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
                "name": "What is target switching in FPS games?",
                "acceptedAnswer": { 
                  "@type": "Answer", 
                  "text": "Target switching is the mechanical skill of instantly moving your crosshair from one defeated opponent to a new active threat without hesitating or losing accuracy." 
                }
              },
              { 
                "@type": "Question", 
                "name": "How does multi-target aim practice help?",
                "acceptedAnswer": { 
                  "@type": "Answer", 
                  "text": "In tactical shooters like Valorant, CS2, or Apex Legends, players often panic when multiple enemies push at once. Multi-target aim trainers force you to stay calm, execute a precise flick, and transition smoothly between targets, significantly improving your multi-kill potential." 
                }
              },
              { 
                "@type": "Question", 
                "name": "How do I improve my target switching speed?",
                "acceptedAnswer": { 
                  "@type": "Answer", 
                  "text": "Focus on the visual transition. Before your crosshair even lands on the first target, your eyes should already be moving to the second. This prevents you from 'over-confirming' hits and allows for seamless, continuous mechanical sweeping." 
                }
              }
            ]
          })
        }} 
      />
      
      <TargetSwitchingSwarmClient />
    </>
  );
}