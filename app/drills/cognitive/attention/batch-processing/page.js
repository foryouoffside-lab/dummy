import BatchProcessingClient from './BatchProcessingClient';

export const metadata = {
  title: 'Batch Processing - Work Efficiency | SkillDrills',
  description: 'Process RED, BLUE, GREEN batches in 2-second windows. Progressive difficulty +2 items per level. 3 lives system. No sign-up.',
  keywords: [
    'batch processing', 'task grouping', 'work efficiency training',
    'batch task management', 'productivity drill', 'task batching',
    'cognitive efficiency', 'workflow optimization', 'batch processing game',
    'time management drill', 'processing speed', 'task organization',
    'efficiency training', 'free productivity game', 'work batching practice',
    'batch processing free', 'task batching drill free', 'color batch processing',
    'productivity training game', 'workflow efficiency drill', 'grouping tasks practice',
    'batch work simulation', 'processing speed test', 'task management drill',
    'skilldrills batch processing', 'skilldrills productivity', 'skilldrills efficiency',
    'red blue green batch', '2 second batch drill', 'progressive batch training',
    'work batching game', 'efficiency exercise', 'productivity skill drill',
  ],
  openGraph: {
    title: 'Batch Processing - Work Efficiency | SkillDrills',
    description: 'Process RED, BLUE, GREEN batches in 2-second windows. Progressive difficulty +2 items per level. 3 lives system. No sign-up.',
    type: 'article',
    url: 'https://skilldrills.online/drills/cognitive/attention/batch-processing',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Batch Processing Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Batch Processing - Work Efficiency | SkillDrills',
    description: 'Process RED, BLUE, GREEN batches in 2-second windows. Progressive difficulty +2 items per level. 3 lives system. No sign-up.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/cognitive/attention/batch-processing',
  },
};

export default function BatchProcessingPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Productivity Training", "item": "https://skilldrills.online/drills/cognitive" },
              { "@type": "ListItem", "position": 3, "name": "Work Efficiency", "item": "https://skilldrills.online/drills/cognitive/work-efficiency" },
              { "@type": "ListItem", "position": 4, "name": "Batch Processing" }
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
            "name": "Batch Processing Drill",
            "url": "https://skilldrills.online/drills/cognitive/attention/batch-processing",
            "description": "Free work efficiency drill. Process RED, BLUE, GREEN batches in 2-second windows. Progressive difficulty +2 items per level. 3 lives system.",
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
                "name": "What is the Batch Processing Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free work efficiency exercise. Process RED, BLUE, GREEN batches in 2-second windows. Progressive difficulty +2 items per 3 completed batches."
                }
              },
              {
                "@type": "Question",
                "name": "How does progressive difficulty work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Start at Level 1 with 4 items. Every 3 completed batches adds 2 more items. Same 2-second window. No upper limit."
                }
              },
              {
                "@type": "Question",
                "name": "What productivity skills improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Task batching efficiency, processing speed, task organization, workflow optimization, and time management awareness."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This batch processing drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <BatchProcessingClient />
    </>
  );
}