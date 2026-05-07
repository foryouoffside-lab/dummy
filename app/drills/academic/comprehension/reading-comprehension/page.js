import ReadingComprehensionClient from './ReadingComprehensionClient';

export const metadata = {
  title: 'RSVP Speed Reading Drill - Reading Comprehension & Retention Training',
  description: 'Master speed reading with the RSVP (Rapid Serial Visual Presentation) method. Fresh passages every session across 3 difficulty levels. Test comprehension with scored quizzes. Adjustable 100-600 WPM speed.',
  keywords: [
    'speed reading', 'RSVP reader', 'rapid serial visual presentation',
    'reading comprehension', 'reading speed test', 'WPM training',
    'speed reading practice', 'comprehension drill', 'reading retention',
    'fast reading', 'reading skills', 'free speed reading test',
    'reading speed improver', 'RSVP training'
  ],
  openGraph: {
    title: 'RSVP Speed Reading Drill - Comprehension & Retention Training',
    description: 'Dynamic speed reading with fresh passages every session. 3 difficulty levels from beginner to advanced. Test your comprehension after each passage. Adjustable 100-600 WPM.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/academic/comprehension/reading-comprehension',
  },
};

export default function ReadingComprehensionPage() {
  return <ReadingComprehensionClient />;
}