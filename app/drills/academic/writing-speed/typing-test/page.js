import TypingTestClient from './TypingTestClient';

export const metadata = {
  title: 'Velocity Command - Typing Speed Test & Accuracy Training',
  description: 'Test and improve your typing speed with 30 unique quotes across Easy, Medium, and Hard difficulty levels. 60-second timed challenge with WPM, accuracy, and combo tracking. No penalties - just pure typing practice.',
  keywords: [
    'typing speed test', 'typing practice', 'WPM test', 'typing accuracy',
    'free typing test', 'speed typing challenge', 'typing quotes practice',
    'keyboard typing speed', 'typing skills test', 'words per minute test',
    'typing trainer', 'online typing test', 'typing improvement',
    'typing speed drill', 'professional typing practice'
  ],
  openGraph: {
    title: 'Velocity Command - Typing Speed Test & Accuracy Training',
    description: '30 unique quotes across 3 difficulty levels. 60-second timed typing test with WPM, accuracy, error count, and combo streak tracking. No penalties - pure typing practice.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/academic/writing-speed/typing-test',
  },
};

export default function TypingTestPage() {
  return <TypingTestClient />;
}