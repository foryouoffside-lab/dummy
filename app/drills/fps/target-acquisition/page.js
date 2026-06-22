import TargetAcquisitionClient from './TargetAcquisitionClient';

export const metadata = {
  title: 'Target Switching Aim Trainer - Multi-Target Practice',
  description: 'Master multi-target gunfights with our free Target Switching Aim Trainer. Improve your target selection, pathing, and switching speed directly in your browser.',
  keywords: [
    'target switching aim trainer',
    'multi target aim trainer',
    'target switching practice',
    'fps target switching',
    'target selection aim drill',
    'multi enemy aim practice',
    'target switching game',
    'browser aim trainer',
    'raw input aim trainer',
    'aim switching practice'
  ],
  openGraph: {
    title: 'Target Switching Aim Trainer - Multi-Target Practice',
    description: 'Master multi-target gunfights with our free Target Switching Aim Trainer. Improve your target selection, pathing, and switching speed directly in your browser.',
    type: 'website',
    url: 'https://skilldrills.online/drills/fps/target-acquisition',
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
    title: 'Target Switching Aim Trainer - Multi-Target Practice',
    description: 'Master multi-target gunfights with our free Target Switching Aim Trainer. Improve your target selection, pathing, and switching speed directly in your browser.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { 
    index: true, 
    follow: true 
  },
  alternates: { 
    canonical: 'https://skilldrills.online/drills/fps/target-acquisition' 
  },
};

export default function TargetAcquisitionPage() {
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
            "name": "Target Switching Aim Trainer - Multi-Target Practice",
            "url": "https://skilldrills.online/drills/fps/target-acquisition",
            "description": "A browser-based target switching aim trainer designed to help competitive FPS players improve multi-target pathing, selection speed, and cognitive sorting under pressure.",
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
                "name": "How can I improve my target switching in FPS games?",
                "acceptedAnswer": { 
                  "@type": "Answer", 
                  "text": "Improving your target switching requires practicing your visual pathing. Use a target switching aim trainer that places multiple targets on screen and forces you to quickly identify and move between them efficiently. The key is stopping your crosshair perfectly on the first target before moving your eyes to the next." 
                }
              },
              { 
                "@type": "Question", 
                "name": "Why is multi-target practice important for Valorant and CS2?",
                "acceptedAnswer": { 
                  "@type": "Answer", 
                  "text": "In tactical shooters, encountering multiple enemies at once often causes players to panic and shoot between targets rather than confirming a kill. Multi-target aim practice trains your brain to remain calm, select one target, eliminate it, and seamlessly switch to the next." 
                }
              },
              { 
                "@type": "Question", 
                "name": "Is this target switching aim trainer free?",
                "acceptedAnswer": { 
                  "@type": "Answer", 
                  "text": "Yes, this target switching aim trainer is completely free, requires no downloads, and uses 1:1 hardware raw mouse input directly in your web browser." 
                }
              }
            ]
          })
        }} 
      />
      
      <TargetAcquisitionClient />
    </>
  );
}