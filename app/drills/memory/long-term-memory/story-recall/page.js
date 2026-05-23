import StoryRecallClient from './StoryRecallClient';

export const metadata = {
  title: 'Story Recall Drill - Narrative Memory & Comprehension | SkillDrills',
  description: 'Train narrative memory with 5 unique stories, 4 questions each. 15-second reading, then recall names, numbers, colors, and events. Mastery achievement. No sign-up.',
  keywords: [
    'story recall', 'narrative memory', 'reading comprehension memory',
    'story memory drill', 'recall details practice', 'long term memory stories',
    'narrative recall training', 'story comprehension test', 'memory recall quiz',
    'reading memory drill', 'story detail recall', 'narrative memory test',
    'free memory training', 'story recall practice', 'reading retention drill',
    'story recall free', 'narrative memory drill', 'reading comprehension drill free',
    'story detail memory', 'passage recall practice', 'story reading memory',
    'narrative comprehension practice', 'reading recall test', 'story question drill',
    'skilldrills story recall', 'skilldrills narrative memory', 'skilldrills reading',
    'story memory quiz', 'reading retention practice', 'narrative detail drill',
    'comprehension memory test', 'story understanding practice', 'recall reading drill',
  ],
  openGraph: {
    title: 'Story Recall Drill - Narrative Memory | SkillDrills',
    description: '5 unique stories with 4 questions each. Read then recall details. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/memory/long-term-memory/story-recall',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Story Recall Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Story Recall Drill | SkillDrills',
    description: '5 stories with 4 questions each. Read then recall. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/long-term-memory/story-recall',
  },
};

export default function StoryRecallPage() {
  return (
    <>
      <noscript>
        <h1>Story Recall Drill - Long-Term Memory & Narrative Comprehension Training</h1>
        <p>Free story recall drill with 5 unique stories and 4 questions each. No sign-up required.</p>
      </noscript>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "Memory Training", "item": "https://skilldrills.online/drills/memory" },
              { "@type": "ListItem", "position": 3, "name": "Long-Term Memory", "item": "https://skilldrills.online/drills/memory/long-term-memory" },
              { "@type": "ListItem", "position": 4, "name": "Story Recall" }
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
            "name": "Story Recall Drill",
            "url": "https://skilldrills.online/drills/memory/long-term-memory/story-recall",
            "description": "Free narrative memory drill with 5 unique stories and 4 questions each. 15-second reading, recall key details. Green/red feedback. Mastery achievement.",
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
                "name": "What is the Story Recall Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free narrative memory exercise with 5 unique stories. 15-second reading, then 4 questions testing names, numbers, colors, places, and events."
                }
              },
              {
                "@type": "Question",
                "name": "What stories are included?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Sarah's Market Trip, Dr. Martinez Library Visit, Emma's Aquarium Adventure, Professor Williams Country Life, and Town Carnival."
                }
              },
              {
                "@type": "Question",
                "name": "What is the mastery achievement?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Complete all 5 stories within 60 seconds. Earns a special mastery celebration screen with final score and best streak."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This story recall drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <StoryRecallClient />
    </>
  );
}