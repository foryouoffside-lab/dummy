import ProSmoothPursuitClient from './ProSmoothPursuitClient';

export const metadata = {
  title: 'Tracking Aim Trainer - Free FPS Smooth Pursuit Practice',
  description: 'Master your continuous aim with our free Tracking Aim Trainer. Practice smooth pursuit and dynamic target tracking for Apex Legends, Overwatch, and CS2.',
  keywords: [
    'tracking aim trainer',
    'smooth pursuit training',
    'target tracking aim drill',
    'apex legends tracking trainer',
    'overwatch tracking practice',
    'fps smooth tracking',
    'continuous aim trainer',
    'browser aim trainer',
    'raw input tracking practice',
    'dynamic target tracking'
  ],
  openGraph: {
    title: 'Tracking Aim Trainer - Free FPS Smooth Pursuit Practice',
    description: 'Master your continuous aim with our free Tracking Aim Trainer. Practice smooth pursuit and dynamic target tracking for Apex Legends, Overwatch, and CS2.',
    type: 'website',
    url: 'https://skilldrills.online/drills/fps/pro-smooth-pursuit',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [
      { 
        url: 'https://skilldrills.online/icons/icon-512x512.png', 
        width: 512, 
        height: 512, 
        alt: 'Tracking Aim Trainer - Free FPS Smooth Pursuit Practice' 
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tracking Aim Trainer - Free FPS Smooth Pursuit Practice',
    description: 'Master your continuous aim with our free Tracking Aim Trainer. Practice smooth pursuit and dynamic target tracking for Apex Legends, Overwatch, and CS2.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { 
    index: true, 
    follow: true 
  },
  alternates: { 
    canonical: 'https://skilldrills.online/drills/fps/pro-smooth-pursuit' 
  },
};

export default function ProSmoothPursuitPage() {
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
            "name": "Tracking Aim Trainer - Free FPS Smooth Pursuit Practice",
            "url": "https://skilldrills.online/drills/fps/pro-smooth-pursuit",
            "description": "A browser-based tracking aim trainer utilizing 1:1 hardware raw input to help competitive FPS players improve smooth pursuit, wrist stability, and dynamic target tracking.",
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
                "name": "What is smooth pursuit in aim training?",
                "acceptedAnswer": { 
                  "@type": "Answer", 
                  "text": "Smooth pursuit is the visual and mechanical ability to continuously track a moving target without your crosshair stuttering or lagging behind. It relies on predicting the target's trajectory rather than reacting to its current position." 
                }
              },
              { 
                "@type": "Question", 
                "name": "How do I improve my tracking aim in Apex Legends or Overwatch?",
                "acceptedAnswer": { 
                  "@type": "Answer", 
                  "text": "Games with high time-to-kill (TTK) require excellent tracking aim. To improve, use a tracking aim trainer that forces you to trace complex movement curves (like Lissajous curves) without lifting your mouse, building wrist and arm stability over long durations." 
                }
              },
              { 
                "@type": "Question", 
                "name": "Why does this tracking aim trainer punish me for losing the target?",
                "acceptedAnswer": { 
                  "@type": "Answer", 
                  "text": "Unlike casual aim games, this drill actively punishes you for losing the target to simulate in-game consequences. If you fall off the target for too long, you lose points and time, forcing you to develop fast recovery micro-adjustments to get back on target immediately." 
                }
              }
            ]
          })
        }} 
      />
      
      <ProSmoothPursuitClient />
    </>
  );
}