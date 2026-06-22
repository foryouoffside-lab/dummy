import StrafeTrackingClient from './StrafeTrackingClient';

export const metadata = {
  title: 'Tracking Aim Trainer - Free FPS Strafe Tracking Practice',
  description: 'Improve your reactive aim with our free Tracking Aim Trainer. Practice unpredictable strafe tracking and crosshair smoothness for Apex Legends and Overwatch.',
  keywords: [
    'tracking aim trainer',
    'strafe aim trainer',
    'reactive tracking practice',
    'fps tracking aim drill',
    'apex legends aim trainer',
    'overwatch tracking practice',
    'smoothness aim training',
    'browser aim trainer',
    'raw input aim trainer',
    'target tracking game'
  ],
  openGraph: {
    title: 'Tracking Aim Trainer - Free FPS Strafe Tracking Practice',
    description: 'Improve your reactive aim with our free Tracking Aim Trainer. Practice unpredictable strafe tracking and crosshair smoothness for Apex Legends and Overwatch.',
    type: 'website',
    url: 'https://skilldrills.online/drills/fps/strafe-tracking',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [
      { 
        url: 'https://skilldrills.online/icons/icon-512x512.png', 
        width: 512, 
        height: 512, 
        alt: 'Tracking Aim Trainer - FPS Strafe Tracking Practice' 
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tracking Aim Trainer - Free FPS Strafe Tracking Practice',
    description: 'Improve your reactive aim with our free Tracking Aim Trainer. Practice unpredictable strafe tracking and crosshair smoothness for Apex Legends and Overwatch.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { 
    index: true, 
    follow: true 
  },
  alternates: { 
    canonical: 'https://skilldrills.online/drills/fps/strafe-tracking' 
  },
};

export default function StrafeTrackingPage() {
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
            "name": "Tracking Aim Trainer - Free FPS Strafe Tracking Practice",
            "url": "https://skilldrills.online/drills/fps/strafe-tracking",
            "description": "A free browser-based tracking aim trainer designed to help FPS players improve reactive tracking, crosshair smoothness, and counter-strafe prediction using 1:1 raw mouse input.",
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
                "name": "What is reactive tracking in FPS games?",
                "acceptedAnswer": { 
                  "@type": "Answer", 
                  "text": "Reactive tracking is the mechanical ability to keep your crosshair perfectly locked onto an enemy that is rapidly and unpredictably changing direction, such as counter-strafing or jumping in fast-paced shooters." 
                }
              },
              { 
                "@type": "Question", 
                "name": "How do I improve my tracking aim?",
                "acceptedAnswer": { 
                  "@type": "Answer", 
                  "text": "Improving tracking aim requires practicing continuous mouse movement without tensing your wrist. Use a tracking aim trainer to follow unpredictably moving targets, focusing on crosshair smoothness and reacting instantly to sudden direction changes without over-flicking." 
                }
              },
              { 
                "@type": "Question", 
                "name": "Is this browser aim trainer good for Apex Legends and Overwatch?",
                "acceptedAnswer": { 
                  "@type": "Answer", 
                  "text": "Yes. This aim trainer specifically simulates the high-velocity dodging, vertical jumps, and sudden counter-strafing movements found in Apex Legends and Overwatch 2, using raw mouse input to build highly transferable muscle memory." 
                }
              }
            ]
          })
        }} 
      />
      
      <StrafeTrackingClient />
    </>
  );
}