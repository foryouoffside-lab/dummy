import RecoilControlClient from './RecoilControlClient';

export const metadata = {
  title: 'Recoil Control Training - Free CS2 & Valorant Spray Pattern Drill | SkillDrills',
  description: 'Free recoil control training online. Master CS2 AK-47 and Valorant Vandal spray patterns with sub-pixel correction. The best recoil spray control drill. Raw mouse input. No sign-up required.',
  keywords: [
    'recoil control training', 'recoil control game', 'recoil control practice',
    'spray control training', 'spray pattern practice', 'spray control game',
    'CS2 recoil control', 'CS2 spray pattern', 'CS2 AK47 spray',
    'Valorant recoil control', 'Valorant Vandal spray', 'Valorant spray pattern',
    'recoil compensation training', 'recoil mastery game', 'gun recoil game',
    'fps aim training', 'fps training online', 'free fps training',
    'aim trainer online', 'free aim trainer', 'weapon spray practice',
    'recoil control drill free', 'spray control drill', 'recoil pattern game',
    'Valorant aim trainer', 'CS2 aim training', 'esports recoil training',
    'sub-pixel recoil control', 'weapon mastery fps', 'gun control game',
    'competitive fps training', 'pro aim technique', 'raw mouse recoil',
    'skilldrills recoil control', 'skilldrills fps', 'free spray control online',
    'browser recoil game', 'no download spray training', 'instant recoil drill',
    'recoil pattern memorization', 'muscle memory recoil', 'aim spray training',
  ],
  openGraph: {
    title: 'Recoil Control Training - Free CS2 & Valorant Spray Pattern Drill | SkillDrills',
    description: 'Free recoil control training. Master CS2 AK-47 and Valorant Vandal spray patterns. Sub-pixel correction. Raw mouse input. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/recoil-control',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Recoil Control Training - CS2 & Valorant Spray Drill' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recoil Control Training - Free CS2 & Valorant Spray Pattern Drill | SkillDrills',
    description: 'Free recoil control training. Master CS2 and Valorant spray patterns. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://skilldrills.online/drills/fps/recoil-control' },
};

export default function RecoilControlPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
          { "@type": "ListItem", "position": 2, "name": "FPS Training", "item": "https://skilldrills.online/drills/fps" },
          { "@type": "ListItem", "position": 3, "name": "Recoil Control Training - CS2 & Valorant Spray Drill" }
        ]
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        "name": "Recoil Control Training - Free CS2 & Valorant Spray Pattern Drill",
        "url": "https://skilldrills.online/drills/fps/recoil-control",
        "description": "Free recoil control training and spray pattern drill. Master CS2 AK-47 and Valorant Vandal recoil spray profiles with sub-pixel correction. Raw mouse input via Pointer Lock. Best recoil control game online.",
        "applicationCategory": "GameApplication", "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "author": { "@type": "Organization", "name": "SkillDrills" }, "isAccessibleForFree": true
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What is this recoil control training drill?",
            "acceptedAnswer": { "@type": "Answer", "text": "A free recoil control training and spray pattern drill. Master the CS2 AK-47 and Valorant Vandal spray profiles with sub-pixel correction feedback. Raw mouse input via Pointer Lock. Best recoil control game for competitive FPS players." }},
          { "@type": "Question", "name": "Does this recoil control training work for CS2 and Valorant?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. This recoil control training is specifically built around CS2 AK-47 spray patterns and Valorant Vandal recoil profiles. Practice the exact muscle memory compensation needed for full-spray recoil control in both games." }},
          { "@type": "Question", "name": "Do I need to sign up for this recoil control training?",
            "acceptedAnswer": { "@type": "Answer", "text": "No registration required. This free recoil control training and spray pattern drill works instantly in your browser — no downloads needed." }}
        ]
      })}} />
      <RecoilControlClient />
    </>
  );
}
