import VerticalAirTrackClient from './VerticalAirTrackClient';

export const metadata = {
  title: 'Vertical Aim Trainer - Free Vertical Tracking Practice',
  description: 'Improve your aerial tracking with our free Vertical Aim Trainer. Practice hitting airborne targets in parabolic arcs to dominate in Apex Legends and Overwatch.',
  keywords: [
    'vertical aim trainer',
    'vertical tracking aim',
    'aerial aim practice',
    'popcorn aim drill',
    'airborne target tracking',
    'fps vertical aim',
    'apex legends aim trainer',
    'overwatch tracking practice',
    'y-axis aim training',
    'parabolic tracking drill',
    'browser aim trainer',
    'raw input aim trainer'
  ],
  openGraph: {
    title: 'Vertical Aim Trainer - Free Vertical Tracking Practice',
    description: 'Improve your aerial tracking with our free Vertical Aim Trainer. Practice hitting airborne targets in parabolic arcs to dominate in Apex Legends and Overwatch.',
    type: 'website',
    url: 'https://skilldrills.online/drills/fps/vertical-air-track',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [
      { 
        url: 'https://skilldrills.online/icons/icon-512x512.png', 
        width: 512, 
        height: 512, 
        alt: 'Vertical Aim Trainer - Free Vertical Tracking Practice' 
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vertical Aim Trainer - Free Vertical Tracking Practice',
    description: 'Improve your aerial tracking with our free Vertical Aim Trainer. Practice hitting airborne targets in parabolic arcs to dominate in Apex Legends and Overwatch.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { 
    index: true, 
    follow: true 
  },
  alternates: { 
    canonical: 'https://skilldrills.online/drills/fps/vertical-air-track' 
  },
};

export default function VerticalAirTrackPage() {
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
                "name": "Vertical Aim Trainer" 
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
            "name": "Vertical Aim Trainer - Free Vertical Tracking Practice",
            "url": "https://skilldrills.online/drills/fps/vertical-air-track",
            "description": "A browser-based vertical aim trainer utilizing 1:1 hardware raw input to help FPS players practice y-axis tracking, aerial targets, and parabolic path prediction.",
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
                "name": "How can I improve my vertical aim in FPS games?",
                "acceptedAnswer": { 
                  "@type": "Answer", 
                  "text": "To improve your vertical aim, use a vertical aim trainer that simulates parabolic arcs and gravity. Practicing hitting targets as they launch into the air and fall back down builds the y-axis muscle memory necessary for tracking airborne enemies." 
                }
              },
              { 
                "@type": "Question", 
                "name": "Why is vertical tracking harder than horizontal aim?",
                "acceptedAnswer": { 
                  "@type": "Answer", 
                  "text": "Most FPS gameplay consists of horizontal movement (strafing left and right), so players naturally develop strong x-axis muscle memory. The y-axis is rarely trained, making it incredibly difficult to track vertical abilities in games like Apex Legends, Overwatch, and Valorant without isolated practice." 
                }
              },
              { 
                "@type": "Question", 
                "name": "Is this vertical aim trainer free to use?",
                "acceptedAnswer": { 
                  "@type": "Answer", 
                  "text": "Yes, this vertical aim trainer is completely free. It runs directly in your web browser utilizing 1:1 raw mouse input with no downloads or sign-ups required." 
                }
              }
            ]
          })
        }} 
      />
      
      <VerticalAirTrackClient />
    </>
  );
}