import DragAndDropClient from './DragAndDropClient';

export const metadata = {
  title: 'Extreme Convergence - Drag & Drop Precision Drill | SkillDrills',
  description: 'Drag ball into shrinking ring within 3 seconds. Positions teleport every 3s. Margin shrinks 10px to 1px with streak. 3-life system. No sign-up.',
  keywords: [
    'drag and drop precision', 'mouse control training', 'hand-eye coordination',
    'precision dragging', 'motor control drill', 'mouse accuracy game',
    'drag accuracy', 'fine motor skills', 'convergence training',
    'precision mouse movement', 'target dropping', 'coordination exercise',
    'free motor drill', 'mouse dexterity', 'drag training',
    'drag and drop free', 'precision drag drill free', 'mouse dragging practice',
    'shrinking margin drill', 'teleport target drag', 'fine motor control training',
    'drag precision test', 'mouse movement accuracy', 'drag coordination game',
    'skilldrills drag and drop', 'skilldrills motor drills', 'skilldrills precision',
    'convergence drill', 'ball and ring training', 'drag accuracy practice',
    'mouse dexterity exercise', 'precision movement drill', 'drag training free',
  ],
  openGraph: {
    title: 'Extreme Convergence - Drag & Drop Precision | SkillDrills',
    description: 'Drag ball into shrinking ring. Teleports every 3s. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/hand-eye-coordination/drag-and-drop',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Extreme Convergence Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Extreme Convergence Drill | SkillDrills',
    description: 'Drag ball into shrinking ring. Teleports. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/motor/hand-eye-coordination/drag-and-drop',
  },
};

export default function DragAndDropPage() {
  return (
    <>
      <noscript>
        <h1>Extreme Convergence - Drag & Drop Precision & Hand-Eye Coordination</h1>
        <p>Free drag and drop precision drill with shrinking target ring. No sign-up required.</p>
      </noscript>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "Motor Training", "item": "https://skilldrills.online/drills/motor" },
              { "@type": "ListItem", "position": 3, "name": "Hand-Eye Coordination", "item": "https://skilldrills.online/drills/motor/hand-eye-coordination" },
              { "@type": "ListItem", "position": 4, "name": "Drag & Drop" }
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
            "name": "Extreme Convergence Drill",
            "url": "https://skilldrills.online/drills/motor/hand-eye-coordination/drag-and-drop",
            "description": "Free drag and drop precision drill. Drag ball into shrinking ring. Margin shrinks 10px to 1px with streak. 3-second timeout, 3-life system.",
            "applicationCategory": "GameApplication",
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
                "name": "What is the Extreme Convergence Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free drag and drop precision drill. Drag green ball into target ring within 3s. Positions teleport every 3s. Margin shrinks 10px to 1px with streak."
                }
              },
              {
                "@type": "Question",
                "name": "How does the shrinking margin work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Starts at 10px. Shrinks 0.4px per streak to minimum 1px. At 1px, near pixel-perfect precision required. Miss resets to 10px."
                }
              },
              {
                "@type": "Question",
                "name": "What skills does this improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Mouse dragging precision, fine motor control, spatial awareness, speed-accuracy balance, and hand-eye coordination."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This drag and drop drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <DragAndDropClient />
    </>
  );
}