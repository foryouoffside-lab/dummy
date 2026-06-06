import TargetPrioritizationClient from './TargetPrioritizationClient';

export const metadata = {
  title: 'Target Prioritization Swarm - FPS Focus | SkillDrills',
  description: 'Train visual selective attention and target prioritization in a swarm. Glow Red critical targets first and avoid Yellow decoy traps. Full raw mouse Pointer Lock calibration.',
  keywords: [
    'target prioritization aim trainer', 'aim prioritization drill', 'gaming focus swarm trainer',
    'selective attention aim trainer', 'Valorant click priority', 'CS2 target prioritizing',
    'Apex tracking swarm', 'FPS decoy traps aim practice', 'free online browser aim trainer'
  ],
  openGraph: {
    title: 'Target Prioritization Swarm - FPS Focus | SkillDrills',
    description: 'Train visual selective attention and target prioritization in a swarm. Glow Red critical targets first and avoid Yellow decoy traps. Full raw mouse Pointer Lock calibration.',
    type: 'article',
    url: 'https://skilldrills.online/drills/fps/target-prioritization',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Target Prioritization Swarm',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Target Prioritization Swarm - FPS Focus | SkillDrills',
    description: 'Train visual selective attention and target prioritization in a swarm. Glow Red critical targets first and avoid Yellow decoy traps. Full raw mouse Pointer Lock calibration.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/target-prioritization',
  },
};

export default function TargetPrioritizationPage() {
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
              { "@type": "ListItem", "position": 2, "name": "FPS Sector", "item": "https://skilldrills.online/drills/fps" },
              { "@type": "ListItem", "position": 3, "name": "Target Prioritization Swarm" }
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
            "name": "Target Prioritization Swarm",
            "url": "https://skilldrills.online/drills/fps/target-prioritization",
            "description": "Free cognitive aim trainer drill to practice rapid selective target acquisition. Hit Red fast decaying targets while filtering Yellow decoy traps.",
            "applicationCategory": "GamingApplication",
            "operatingSystem": "All",
            "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
            "author": { "@type": "Organization", "name": "SkillDrills" },
            "isAccessibleForFree": true
          })
        }}
      />
      <TargetPrioritizationClient />
    </>
  );
}
