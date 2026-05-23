import DifferenceSpotterClient from './DifferenceSpotterClient';

export const metadata = {
  title: 'Difference Spotter Drill - Visual Change Detection | SkillDrills',
  description: 'Train change detection with 5 objects. Spot which one changed position or color after a blink. Adaptive 2-5s study time. 3 lives. No sign-up.',
  keywords: [
    'difference spotter', 'change detection', 'visual recognition training',
    'spot the difference', 'change blindness test', 'visual memory drill',
    'object change detection', 'visual comparison game', 'attention to detail',
    'visual discrimination', 'pattern change detection', 'cognitive training',
    'free visual recognition test', 'change spotting drill',
    'difference spotter free', 'change detection drill free', 'visual comparison drill',
    'spot what changed', 'object position change', 'color change detection',
    'visual discrimination test', 'attention to detail training', 'quality control drill',
    'skilldrills difference spotter', 'skilldrills visual recognition', 'skilldrills change',
    'blink change detection', 'visual inspection drill', 'comparison memory game',
    'adaptive study time drill', 'change blindness exercise', 'visual attention test',
  ],
  openGraph: {
    title: 'Difference Spotter Drill - Change Detection | SkillDrills',
    description: '5 objects change position or color after blink. Adaptive study time. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/visual/visual-recognition/difference-spotter',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Difference Spotter Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Difference Spotter Drill | SkillDrills',
    description: 'Spot what changed after a blink. Adaptive study time. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/visual/visual-recognition/difference-spotter',
  },
};

export default function DifferenceSpotterPage() {
  return (
    <>
      <noscript>
        <h1>Difference Spotter Drill - Visual Change Detection & Recognition Training</h1>
        <p>Free change detection drill with 5 objects. Spot position or color changes after a blink. No sign-up required.</p>
      </noscript>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "Visual Training", "item": "https://skilldrills.online/drills/visual" },
              { "@type": "ListItem", "position": 3, "name": "Visual Recognition", "item": "https://skilldrills.online/drills/visual/visual-recognition" },
              { "@type": "ListItem", "position": 4, "name": "Difference Spotter" }
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
            "name": "Difference Spotter Drill",
            "url": "https://skilldrills.online/drills/visual/visual-recognition/difference-spotter",
            "description": "Free change detection drill. 5 objects change position (80px) or color (white/red) after blink. Adaptive 2-5s study time. 3 lives, reaction tracking.",
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
                "name": "What is the Difference Spotter Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free change detection exercise. Study 5 objects, then spot which one changed (position 80px or color white/red) after a brief blink."
                }
              },
              {
                "@type": "Question",
                "name": "How does adaptive study time work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Starts at 5s. Fast detections (<800ms) shorten by 0.2s (min 2s). Slow/wrong lengthen by 0.1-0.3s (max 5s). Always at your level."
                }
              },
              {
                "@type": "Question",
                "name": "What skills does this improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Change detection, visual comparison, attention to detail, visual working memory, and rapid visual discrimination."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This difference spotter drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <DifferenceSpotterClient />
    </>
  );
}