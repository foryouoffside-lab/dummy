import NBackClient from './NBackClient';

export const metadata = {
  title: '3-Back Training Pro - Working Memory Test & Drill',
  description: 'Train working memory with classic N-Back task at 3-back level. Compare letters to 3 steps back, zero negative penalties, 45-second session. Free online tool.',
  keywords: [
    'n-back training', '3-back task', 'working memory exercise',
    'dual n-back', 'cognitive training n-back', 'working memory test',
    'n-back brain training', 'memory update drill', 'fluid intelligence training',
    'cognitive enhancement n-back', 'working memory span', 'n-back game',
    'free n-back training', 'brain working memory', 'cognitive n-back drill',
    '3-back free', 'n-back working memory free', 'cognitive control training',
    'sustained attention drill', 'executive function training', 'information updating',
    'n-back task online', 'working memory improvement', 'cognitive assessment n-back',
    'skilldrills n-back', 'skilldrills working memory', 'skilldrills cognitive',
    'brain training n-back', 'memory sequence task', 'cognitive performance drill',
    'mental agility training', 'attention memory drill', 'n-back practice free',
  ],
  openGraph: {
    title: '3-Back Training Pro - Working Memory Test & Drill',
    description: 'Train working memory with classic N-Back task at 3-back level. Compare letters to 3 steps back, zero penalties. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/memory/working-memory/n-back',
    siteName: 'SkillDrills',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: '3-Back Training Pro - Working Memory Test & Drill',
    description: 'Train working memory with classic N-Back task at 3-back level. Compare letters to 3 steps back, zero penalties. Free.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/working-memory/n-back',
  },
};

export default function NBackPage() {
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
              { "@type": "ListItem", "position": 2, "name": "Memory Training", "item": "https://skilldrills.online/drills/memory" },
              { "@type": "ListItem", "position": 3, "name": "Working Memory", "item": "https://skilldrills.online/drills/memory/working-memory" },
              { "@type": "ListItem", "position": 4, "name": "3-Back Training Pro" }
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
            "name": "3-Back Training Pro Drill",
            "url": "https://skilldrills.online/drills/memory/working-memory/n-back",
            "description": "Free N-Back working memory task at 3-back level. Compare current letter to 3 steps back, zero negative penalties, clean 45-second timer.",
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
                "name": "What is the 3-Back Training Pro Drill?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free N-Back working memory task. Letters appear every 2 seconds. Compare current letter to the one from 3 steps back."
                }
              },
              {
                "@type": "Question",
                "name": "Why is N-Back considered the gold standard?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "It requires continuous working memory updating and executive control. Neuroscientific research shows improvements in working memory capacity and fluid intelligence."
                }
              },
              {
                "@type": "Question",
                "name": "How does progressive difficulty work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Starts at 3-Back. Every 1200 points earned (roughly 8 correct judgments) automatically increments the N-Back level to 4-Back and beyond, and the letter display speeds up."
                }
              },
              {
                "@type": "Question",
                "name": "Are there negative score or time penalties?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No incorrect judgment ever deducts score points or reduces remaining timer seconds. A timed-out (unanswered) letter costs nothing at all. A wrong Match/No Match click costs 1 of your 5 lives instead."
                }
              },
              {
                "@type": "Question",
                "name": "What are the hearts / lives for?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You start each run with 5 lives. A wrong Match/No Match judgment costs 1 life (a timeout costs none); if you run out, the drill ends immediately and shows your results."
                }
              },
              {
                "@type": "Question",
                "name": "Does difficulty decrease on mistakes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Your N-Back level only ever goes up — a mistake never takes you back down, so you can safely master your current level."
                }
              },
              {
                "@type": "Question",
                "name": "How long does each drill session last?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Each round is timed for exactly 45 seconds of continuous focus."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This drill runs directly in your browser with instant response."
                }
              }
            ]
          })
        }}
      />

      <NBackClient />
    </>
  );
}