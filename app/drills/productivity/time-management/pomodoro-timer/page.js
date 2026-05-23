import PomodoroSyncClient from './PomodoroSyncClient';

export const metadata = {
  title: 'Pomodoro Sync - Focus Timer & Productivity Tracker | SkillDrills',
  description: '25-minute focus sessions with 5-minute breaks. Earn 1 point per minute. Canvas progress ring. Track pomodoros, streaks, and focus time. No sign-up.',
  keywords: [
    'pomodoro timer', 'focus timer', 'productivity timer', 'pomodoro technique',
    '25 minute timer', 'focus session', 'work timer', 'study timer',
    'time management tool', 'productivity tracker', 'pomodoro tracker',
    'focus tracking', 'break timer', 'online pomodoro', 'free pomodoro timer',
    'pomodoro sync free', 'focus timer free', 'pomodoro technique timer',
    'deep work timer', 'productivity pomodoro', 'focus scoring timer',
    'canvas pomodoro', 'visual progress timer', 'streak pomodoro',
    'skilldrills pomodoro', 'skilldrills focus', 'skilldrills productivity',
    '25 5 timer', 'focus break cycle', 'study session timer',
    'work session timer', 'productivity habit tracker', 'focus minute tracker',
  ],
  openGraph: {
    title: 'Pomodoro Sync - Focus Timer | SkillDrills',
    description: '25-min focus + 5-min break cycles. Earn points per minute. Free.',
    type: 'article',
    url: 'https://skilldrills.online/drills/productivity/time-management/pomodoro-timer',
    siteName: 'SkillDrills',
    locale: 'en_US',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'Pomodoro Sync Timer',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pomodoro Sync Timer | SkillDrills',
    description: '25-min focus + 5-min break. Canvas progress ring. Free.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/drills/productivity/time-management/pomodoro-timer',
  },
};

export default function PomodoroSyncPage() {
  return (
    <>
      <noscript>
        <h1>Pomodoro Sync - Focus Timer & Productivity Tracker</h1>
        <p>Free Pomodoro Technique timer with 25-min focus and 5-min break cycles. No sign-up required.</p>
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
              { "@type": "ListItem", "position": 4, "name": "Pomodoro Sync" }
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
            "name": "Pomodoro Sync Timer",
            "url": "https://skilldrills.online/drills/productivity/time-management/pomodoro-timer",
            "description": "Free Pomodoro timer. 25-min focus + 5-min break cycles. Earn 1pt/min. Canvas progress ring (green=focus, blue=break). Track pomodoros and streaks.",
            "applicationCategory": "ProductivityApplication",
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
                "name": "What is the Pomodoro Sync Timer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "A free Pomodoro Technique timer. 25-min focus sessions + 5-min breaks. Earn 1pt/min. Canvas ring: green=focus, blue=break. Play/Pause/Reset."
                }
              },
              {
                "@type": "Question",
                "name": "How do focus/break cycles work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Auto-cycles between 25-min focus and 5-min break. Completed focus = 1 pomodoro. Streak builds with consecutive completions."
                }
              },
              {
                "@type": "Question",
                "name": "What skills does this develop?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Time management, focus stamina, Pomodoro Technique methodology, productivity habits, and deep work capacity."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to sign up?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No registration required. This Pomodoro timer is completely free and works instantly in your browser."
                }
              }
            ]
          })
        }}
      />

      <PomodoroSyncClient />
    </>
  );
}