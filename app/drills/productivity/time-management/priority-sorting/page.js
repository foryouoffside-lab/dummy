import PrioritySortingClient from './PrioritySortingClient';

export const metadata = {
  title: 'Priority Sorting Drill - Task Prioritization Training | SkillDrills',
  description: 'Click RED, GREEN, BLUE targets matching the priority rule. Rules change every 3-4s. Shrinking items add urgency. 3 lives. No sign-up.',
  keywords: [
    'priority sorting', 'task prioritization', 'time management training',
    'decision making drill', 'priority training', 'task triage',
    'cognitive prioritization', 'eisenhower matrix practice', 'rapid decision making',
    'color sorting game', 'attention management', 'priority matrix training',
    'productivity drill', 'task management practice', 'free prioritization training',
    'priority sorting free', 'task prioritization drill free', 'priority rule drill',
    'dynamic priority training', 'shrinking target drill', 'cognitive flexibility game',
    'red green blue priority', 'decision speed training', 'task triage practice',
    'skilldrills priority sorting', 'skilldrills prioritization', 'skilldrills productivity',
    'rule switching drill', 'priority target practice', 'attention switching training',
    'color priority game', 'rapid prioritization drill', 'task sorting practice',
  ],
  openGraph: {
    title: 'Priority Sorting Drill - Task Prioritization | SkillDrills',
    description: 'RED GREEN BLUE targets with rules changing every 3-4s. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/productivity/time-management/priority-sorting',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Priority Sorting Drill',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Priority Sorting Drill | SkillDrills',
    description: 'Color-coded targets with dynamic rule changes. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/productivity/time-management/priority-sorting',
  },
};

export default function PrioritySortingPage() {
  return (
    <>
      <noscript>
        <h1>Priority Sorting Drill - Time Management & Task Prioritization Training</h1>
        <p>Free priority sorting drill with dynamic rule changes and shrinking targets. No sign-up required.</p>
      </noscript>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://skilldrills.online" },
              { "@type": "ListItem", "position": 2, "name": "Productivity Training", "item": "https://skilldrills.online/drills/productivity" },
              { "@type": "ListItem", "position": 3, "name": "Time Management", "item": "https://skilldrills.online/drills/productivity/time-management" },
              { "@type": "ListItem", "position": 4, "name": "Priority Sorting" }
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
            "name": "Priority Sorting Drill",
            "url": "https://skilldrills.online/drills/productivity/time-management/priority-sorting",
            "description": "Free task prioritization drill. Click RED, GREEN, BLUE targets matching priority rule. Rules change every 3-4s. Shrinking items. 3 lives.",
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
                "name": "What is the Priority Sorting Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free task prioritization exercise. Click RED, GREEN, BLUE targets matching current priority. Rules change every 3-4s. Shrinking items add urgency."
                }
              },
              {
                "@type": "Question",
                "name": "How does the priority rule system work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Priority color displayed at top changes every 3-4s. New priority item auto-spawns on change. Non-priority items cost lives when priorities exist."
                }
              },
              {
                "@type": "Question",
                "name": "What skills does this improve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Task prioritization, cognitive flexibility, decision-making speed, task triage, and attention management under dynamic rules."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This priority sorting drill is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <PrioritySortingClient />
    </>
  );
}