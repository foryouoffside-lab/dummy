import DragAndDropClient from './DragAndDropClient';

export const metadata = {
  title: 'Drag and Drop Game - Free Mouse Precision Training | SkillDrills',
  description: 'Free drag and drop game online. Drag a ball into a shrinking target ring — the best mouse precision training and fine motor control drill. Streak-based difficulty. 3-life system. No sign-up.',
  keywords: [
    'drag and drop game', 'drag and drop game online', 'free drag and drop game',
    'drag and drop training', 'drag and drop practice', 'drag and drop precision',
    'mouse precision training', 'mouse precision test', 'mouse precision game',
    'fine motor skills', 'fine motor skills training', 'fine motor control game',
    'mouse control training', 'mouse dexterity game', 'mouse dragging practice',
    'hand eye coordination game', 'hand eye coordination training', 'hand eye coordination drill',
    'precision motor drill', 'motor control exercise', 'precision movement game',
    'convergence training', 'ball and ring game', 'target dropping game',
    'mouse accuracy game', 'cursor precision game', 'drag accuracy test',
    'FPS mouse control', 'graphic design mouse training', 'digital art mouse practice',
    'shrinking target drag', 'teleport drag game', 'precision drag drill',
    'skilldrills drag and drop', 'skilldrills motor drills', 'free motor precision game',
    'browser drag game', 'no download mouse training', 'instant precision drill',
    'fine motor skill development', 'dexterity training online', 'motor learning game',
  ],
  openGraph: {
    title: 'Drag and Drop Game - Free Mouse Precision Training | SkillDrills',
    description: 'Free drag and drop game. Drag ball into shrinking ring — best mouse precision training and fine motor control drill. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/motor/hand-eye-coordination/drag-and-drop',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Drag and Drop Game - Mouse Precision Training',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Drag and Drop Game - Free Mouse Precision Training | SkillDrills',
    description: 'Free drag and drop game. Drag ball into shrinking ring. Best mouse precision and fine motor training. No sign-up.',
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
              { "@type": "ListItem", "position": 4, "name": "Drag and Drop Game - Mouse Precision Training" }
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
            "name": "Drag and Drop Game - Free Mouse Precision Training",
            "url": "https://skilldrills.online/drills/motor/hand-eye-coordination/drag-and-drop",
            "description": "Free drag and drop game and mouse precision training drill. Drag the ball into the shrinking target ring within 3 seconds. Ring margin shrinks 10px to 1px with streak. 3-life system. Best fine motor skills training online.",
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
                "name": "What is this drag and drop game?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free drag and drop game and mouse precision training drill. Drag the green ball into the target ring within 3 seconds. Ring margin shrinks from 10px to near pixel-perfect 1px with streak. Best fine motor skills training game online."
                }
              },
              {
                "@type": "Question",
                "name": "How does the shrinking ring work in this mouse precision game?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Ring margin starts at 10px. Shrinks 0.4px per streak hit to minimum 1px — near pixel-perfect precision required. Missing resets to 10px. Positions teleport every 3 seconds. Mouse precision training escalates naturally."
                }
              },
              {
                "@type": "Question",
                "name": "Who benefits from this drag and drop precision game?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Gamers needing mouse drag control, digital artists, graphic designers, video editors, and anyone wanting better fine motor skills and mouse precision training in their browser."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up for this drag and drop game?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This free drag and drop game and mouse precision training drill works instantly in your browser — no downloads needed."
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