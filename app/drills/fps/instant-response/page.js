import InstantResponseClient from './InstantResponseClient';

export const metadata = {
  title: 'Reaction Time Test FPS - Free Raw Reflex Drill | SkillDrills',
  description: 'Free reaction time test for FPS gaming. Train pure reaction speed with raw mouse input. Adaptive 80–1200ms response window, millisecond tracking, 3 lives. Valorant, CS2, Apex compatible. No sign-up.',
  keywords: [
    'reaction time test fps', 'fps reaction time test', 'reaction time test online',
    'free reaction time test', 'reflex test fps', 'fps reflex training',
    'reaction speed test', 'raw reflex drill', 'pure reaction training',
    'fps aim training', 'fps training online', 'free fps training',
    'instant response drill', 'click reaction test', 'mouse reaction test',
    'Valorant reaction time', 'CS2 reaction test', 'Apex reflex training',
    'esports reaction time', 'competitive fps reflex', 'gaming reaction test',
    'millisecond reaction test', 'sub-100ms reaction', 'pro reaction training',
    'raw mouse input reaction', 'pointer lock reflex', 'adaptive reflex game',
    'aim trainer reaction', 'free aim trainer', 'reaction aim training',
    'skilldrills instant response', 'skilldrills fps', 'free reaction drill',
    'browser reaction test', 'no download reflex test', 'instant reaction game',
    'fastest reaction time', 'human reaction time test', 'reflex improvement test',
  ],
  openGraph: {
    title: 'Reaction Time Test FPS - Free Raw Reflex Drill | SkillDrills',
    description: 'Free reaction time test for FPS gaming. Raw mouse input, adaptive 80-1200ms window, millisecond tracking. Valorant, CS2, Apex. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/instant-response',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'Reaction Time Test FPS - Raw Reflex Drill' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reaction Time Test FPS - Free Raw Reflex Drill | SkillDrills',
    description: 'Free reaction time test for FPS. Raw mouse input, adaptive window. Valorant, CS2, Apex. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://skilldrills.online/drills/fps/instant-response' },
};

export default function InstantResponsePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
          { "@type": "ListItem", "position": 2, "name": "FPS Training", "item": "https://skilldrills.online/drills/fps" },
          { "@type": "ListItem", "position": 3, "name": "Reaction Time Test FPS - Raw Reflex Drill" }
        ]
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        "name": "Reaction Time Test FPS - Free Raw Reflex Drill",
        "url": "https://skilldrills.online/drills/fps/instant-response",
        "description": "Free reaction time test for FPS gaming. Train pure reaction speed with raw mouse input via Pointer Lock. Adaptive 80-1200ms response window, millisecond accuracy tracking, 3 lives. Best FPS reaction time test online.",
        "applicationCategory": "GameApplication", "operatingSystem": "All",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "author": { "@type": "Organization", "name": "SkillDrills" }, "isAccessibleForFree": true
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What is this FPS reaction time test?",
            "acceptedAnswer": { "@type": "Answer", "text": "A free reaction time test designed for FPS gaming. Trains pure raw reflex speed using Pointer Lock raw mouse input. Adaptive 80-1200ms response window, millisecond tracking. Best FPS reaction time test for Valorant, CS2, and Apex Legends players." }},
          { "@type": "Question", "name": "How does adaptive difficulty work in this reaction time test?",
            "acceptedAnswer": { "@type": "Answer", "text": "Response window starts wide (1200ms) and narrows adaptively as you improve. Tests reaction at 80ms minimum — sub-human-average territory. Millisecond precision tracking shows your exact reaction time after each click." }},
          { "@type": "Question", "name": "Do I need to sign up for this FPS reaction time test?",
            "acceptedAnswer": { "@type": "Answer", "text": "No registration required. This free FPS reaction time test and raw reflex drill works instantly in your browser — no downloads needed." }}
        ]
      })}} />
      <InstantResponseClient />
    </>
  );
}