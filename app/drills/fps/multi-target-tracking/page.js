import MultiTargetTrackingClient from './MultiTargetTrackingClient';

export const metadata = {
  title: 'Multi-Target Tracking - Visual Memory | SkillDrills',
  description: 'Train visual memory by tracking 3 of 9 bouncing balls. 2-second preview, 60-second tracking phase. +5 per correct target. No sign-up.',
  keywords: [
    'multi target tracking', 'ghost link tracking', 'visual memory drill',
    'object tracking FPS', 'multi object tracking', 'visual working memory',
    'target memorization drill', 'FPS awareness training', 'tracking memory test',
    'multiple ball tracking', 'visual cognition drill', 'free tracking trainer',
    'MOT task FPS', 'spatial memory training', 'visual attention drill',
    'peripheral tracking practice', 'bouncing ball tracking', 'target identification',
    'Valorant awareness training', 'CS2 multi target practice', 'Overwatch tracking',
    'Apex Legends awareness', 'competitive FPS training', 'esports visual drill',
    'working memory capacity test', 'visual short term memory', 'cognitive FPS drill',
    'skilldrills tracking', 'skilldrills ghost link', 'free FPS aim trainer',
    'online tracking game', 'browser tracking drill', 'no download MOT task',
  ],
  openGraph: {
    title: 'Multi-Target Tracking - Visual Memory | SkillDrills',
    description: 'Train visual memory by tracking 3 of 9 bouncing balls. 2-second preview, 60-second tracking phase. +5 per correct target. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/multi-target-tracking',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Multi-Target Tracking Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Multi-Target Tracking - Visual Memory | SkillDrills',
    description: 'Train visual memory by tracking 3 of 9 bouncing balls. 2-second preview, 60-second tracking phase. +5 per correct target. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/multi-target-tracking',
  },
};

export default function MultiTargetTrackingPage() {
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
              { "@type": "ListItem", "position": 2, "name": "FPS Training", "item": "https://skilldrills.online/drills/fps" },
              { "@type": "ListItem", "position": 3, "name": "Multi-Target Tracking" }
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
            "name": "Multi-Target Tracking Drill",
            "url": "https://skilldrills.online/drills/fps/multi-target-tracking",
            "description": "Free visual memory drill for FPS gaming. Memorize 3 green targets, track 9 balls for 60 seconds, identify correctly. Multi-object tracking training.",
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
                "name": "What is the Multi-Target Tracking Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free visual memory exercise. Memorize 3 green targets from 9 balls, track them for 60 seconds as they move, then identify your originals. +5 per correct target."
                }
              },
              {
                "@type": "Question",
                "name": "How does this help FPS gaming?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Trains ability to track multiple enemies simultaneously. Strengthens visual working memory and peripheral awareness for better threat assessment."
                }
              },
              {
                "@type": "Question",
                "name": "What skills does this improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Visual working memory, multi-object tracking, peripheral vision, sustained attention, target identification, and quick decision-making."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This tracking drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <MultiTargetTrackingClient />
    </>
  );
}