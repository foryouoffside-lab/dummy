
import AwarenessDrillClient from './AwarenessDrillClient';

export const metadata = {
  title: 'FPS Awareness Trainer - 180° Peripheral Vision Drill',
  description:
    'Train peripheral vision, situational awareness, and rapid target detection with this free FPS Awareness Trainer. Practice 180° target acquisition and reaction speed online.',
  keywords: [
    'fps awareness trainer',
    'peripheral vision training',
    'peripheral awareness test',
    '180 degree awareness drill',
    'situational awareness training',
    'peripheral reaction training',
    'fps awareness drill',
    'target detection training',
    'peripheral vision game',
    'fps reaction training',
    'peripheral vision exercise',
    '180 degree reaction training',
    'competitive fps awareness',
    'gaming awareness training',
    'fps target detection',
    'valorant awareness training',
    'cs2 awareness training',
    'apex legends awareness training',
    'peripheral vision test',
    'situational awareness game',
    'fps peripheral vision',
    'edge target reaction training',
    'wide angle awareness training',
    'free fps awareness trainer',
    'browser awareness trainer'
  ],
  openGraph: {
    title: 'FPS Awareness Trainer - 180° Peripheral Vision Drill',
    description:
      'Train peripheral vision, situational awareness, and rapid target detection with this free FPS Awareness Trainer. Improve 180° target acquisition and reaction speed.',
    type: 'website',
    url: 'https://skilldrills.online/drills/fps/180-degree-awareness',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [
      {
        url: 'https://skilldrills.online/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'FPS Awareness Trainer - 180 Degree Peripheral Vision Drill',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FPS Awareness Trainer - 180° Peripheral Vision Drill',
    description:
      'Train peripheral vision, situational awareness, and rapid target detection online with this free FPS Awareness Trainer.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/fps/180-degree-awareness',
  },
};

export default function AwarenessDrillPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://skilldrills.online',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'FPS Training',
                item: 'https://skilldrills.online/drills/fps',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'FPS Awareness Trainer',
              },
            ],
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'FPS Awareness Trainer - 180° Peripheral Vision Drill',
            url: 'https://skilldrills.online/drills/fps/180-degree-awareness',
            description:
              'A browser-based FPS awareness trainer designed to improve peripheral vision, situational awareness, target detection, and 180-degree reaction speed for competitive gamers.',
            applicationCategory: 'GameApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            author: {
              '@type': 'Organization',
              name: 'SkillDrills',
            },
            isAccessibleForFree: true,
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How do professional FPS players improve peripheral vision?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Professional players improve peripheral vision through awareness drills that force them to detect and react to targets appearing at extreme screen angles. Consistent practice improves visual scanning speed and situational awareness.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is peripheral awareness in FPS games?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Peripheral awareness is the ability to detect threats outside your direct focus. Strong peripheral awareness helps players react faster to flanks, side peeks, and unexpected enemy movements.',
                },
              },
              {
                '@type': 'Question',
                name: 'Can peripheral vision training improve reaction time?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Peripheral vision training improves how quickly players identify targets appearing outside their central vision, leading to faster target acquisition and better reaction speed.',
                },
              },
              {
                '@type': 'Question',
                name: 'How do I stop getting flanked in FPS games?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Improving situational awareness and peripheral target detection helps players notice enemy movement earlier, reducing surprise engagements and improving defensive reactions.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is 180 degree awareness training?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '180 degree awareness training develops the ability to quickly detect, locate, and react to targets appearing across a wide field of view, improving spatial awareness and reaction consistency.',
                },
              },
            ],
          }),
        }}
      />

      <AwarenessDrillClient />
    </>
  );
}
