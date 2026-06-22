import ReactiveSphereTrackingClient from './ReactiveSphereTrackingClient';

export const metadata = {
  title: 'Tracking Aim Trainer - Free Reactive Tracking Practice',
  description: 'Master smooth pursuit and reactive aim with our free Tracking Aim Trainer. Practice staying locked onto erratic, AD-strafing targets for Apex Legends and Overwatch 2.',
  keywords: [
    'tracking aim trainer',
    'reactive tracking practice',
    'fps tracking drill',
    'smooth pursuit aim trainer',
    'apex legends tracking practice',
    'overwatch aim trainer',
    'target tracking game',
    'raw input aim trainer',
    'browser aim trainer',
    'aim tracking test',
    'ad strafe tracking'
  ],
  openGraph: {
    title: 'Tracking Aim Trainer - Free Reactive Tracking Practice',
    description: 'Master smooth pursuit and reactive aim with our free Tracking Aim Trainer. Practice staying locked onto erratic, AD-strafing targets for Apex Legends and Overwatch 2.',
    type: 'website',
    url: 'https://skilldrills.online/drills/fps/reactive-sphere-tracking',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [
      { 
        url: 'https://skilldrills.online/icons/icon-512x512.png', 
        width: 512, 
        height: 512, 
        alt: 'Tracking Aim Trainer - Free Reactive Tracking Practice' 
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tracking Aim Trainer - Free Reactive Tracking Practice',
    description: 'Master smooth pursuit and reactive aim with our free Tracking Aim Trainer. Practice staying locked onto erratic, AD-strafing targets for Apex Legends and Overwatch 2.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { 
    index: true, 
    follow: true 
  },
  alternates: { 
    canonical: 'https://skilldrills.online/drills/fps/reactive-sphere-tracking' 
  },
};

export default function ReactiveSphereTrackingPage() {
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
                "name": "Tracking Aim Trainer" 
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
            "name": "Tracking Aim Trainer - Free Reactive Tracking Practice",
            "url": "https://skilldrills.online/drills/fps/reactive-sphere-tracking",
            "description": "A free browser-based tracking aim trainer utilizing 1:1 raw mouse input to help FPS players practice reactive tracking, smooth pursuit, and staying locked onto AD-strafing targets.",
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
                "name": "How do I improve my tracking aim in FPS games?",
                "acceptedAnswer": { 
                  "@type": "Answer", 
                  "text": "Improving tracking aim requires developing 'smooth pursuit' eye movements and fine motor control in your wrist and forearm. Using a tracking aim trainer that forces you to trace a moving target helps build the muscle memory required to keep your crosshair locked on enemies without over-adjusting." 
                }
              },
              { 
                "@type": "Question", 
                "name": "What is reactive tracking in aiming?",
                "acceptedAnswer": { 
                  "@type": "Answer", 
                  "text": "Reactive tracking is the specific skill of instantly re-adjusting your crosshair when a target abruptly changes direction. It is a critical mechanic for high-TTK games like Apex Legends, The Finals, and Overwatch 2 where enemies frequently AD-strafe to dodge bullets." 
                }
              },
              { 
                "@type": "Question", 
                "name": "Why is it so hard to track AD-strafing targets?",
                "acceptedAnswer": { 
                  "@type": "Answer", 
                  "text": "Tracking AD-strafers is difficult because human reaction time creates a natural delay (usually 150-250ms) between the target changing direction and your hand moving to follow it. A reactive tracking aim trainer reduces this gap by training you to anticipate vectors and react purely to visual shifts rather than predicting movement." 
                }
              }
            ]
          })
        }} 
      />
      
      <ReactiveSphereTrackingClient />
    </>
  );
}