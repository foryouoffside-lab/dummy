import ProFlickClient from './ProFlickClient';

export const metadata = {
  title: 'Flick Aim Trainer - Free Online FPS Aim Practice',
  description: 'Improve your FPS reflexes with our free Flick Aim Trainer. Practice rapid flick shots using raw mouse input to build accuracy for Valorant and CS2. No downloads.',
  keywords: [
    'flick aim trainer',
    'flick shot practice',
    'online aim trainer',
    'fps aim practice',
    'mouse accuracy test',
    'valorant aim training',
    'cs2 flick practice',
    'raw input aim trainer',
    'flick aiming game',
    'reflex aim test',
    'rapid target acquisition drill',
    'free aim trainer browser'
  ],
  openGraph: {
    title: 'Flick Aim Trainer - Free Online FPS Aim Practice',
    description: 'Improve your FPS reflexes with our free Flick Aim Trainer. Practice rapid flick shots using raw mouse input to build accuracy for Valorant and CS2. No downloads.',
    type: 'website',
    url: 'https://skilldrills.online/drills/fps/flick-shot-training',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [
      { 
        url: 'https://skilldrills.online/icons/icon-512x512.png', 
        width: 512, 
        height: 512, 
        alt: 'Flick Aim Trainer - Free Online FPS Aim Practice' 
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flick Aim Trainer - Free Online FPS Aim Practice',
    description: 'Improve your FPS reflexes with our free Flick Aim Trainer. Practice rapid flick shots using raw mouse input to build accuracy for Valorant and CS2. No downloads.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { 
    index: true, 
    follow: true 
  },
  alternates: { 
    canonical: 'https://skilldrills.online/drills/fps/flick-shot-training' 
  },
};

export default function FlickShotPage() {
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
                "name": "Flick Aim Trainer" 
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
            "name": "Flick Aim Trainer - Free Online FPS Aim Practice",
            "url": "https://skilldrills.online/drills/fps/flick-shot-training",
            "description": "A browser-based flick aim trainer utilizing 1:1 hardware raw input to help competitive FPS players improve rapid target acquisition and reflex speed.",
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
                "name": "How do I improve my flick aim in FPS games?",
                "acceptedAnswer": { 
                  "@type": "Answer", 
                  "text": "Improving your flick aim requires building consistent muscle memory. Use a flick aim trainer that forces you to quickly snap to randomly spawning targets under a strict time limit. Focus on the macro-flick with your arm, followed by a micro-adjustment with your wrist before clicking." 
                }
              },
              { 
                "@type": "Question", 
                "name": "Why is raw mouse input important for aim training?",
                "acceptedAnswer": { 
                  "@type": "Answer", 
                  "text": "Raw mouse input bypasses your operating system's cursor acceleration. This ensures that moving your mouse 5 inches always moves your crosshair the exact same distance in-game, which is mandatory for building reliable flick shot muscle memory." 
                }
              },
              { 
                "@type": "Question", 
                "name": "Can a browser aim trainer actually improve my rank?",
                "acceptedAnswer": { 
                  "@type": "Answer", 
                  "text": "Yes. Browser aim trainers that utilize the Pointer Lock API provide 1:1 tracking identical to desktop games. Practicing 10-15 minutes a day isolates your mechanical weaknesses, directly translating to better crosshair placement and reaction times in Valorant, CS2, and Apex Legends." 
                }
              }
            ]
          })
        }} 
      />
      
      <ProFlickClient />
    </>
  );
}