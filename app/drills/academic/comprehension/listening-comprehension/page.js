import ListeningComprehensionClient from './ListeningComprehensionClient';

export const metadata = {
  title: 'Listening Comprehension Drill - Audio Memory & Understanding Training',
  description: 'Train your listening comprehension with 9 audio passages and 18 questions covering 3 difficulty levels. Male and female voices. 60-second timed challenge to improve auditory processing and memory recall.',
  keywords: [
    'listening comprehension', 'audio memory training', 'auditory processing',
    'listening skills test', 'English listening practice', 'comprehension drill',
    'audio quiz', 'memory recall training', 'listening test',
    'auditory learning', 'language comprehension', 'listening exercise'
  ],
  openGraph: {
    title: 'Listening Comprehension Drill - Audio Memory Training',
    description: '9 audio passages with 18 questions across Easy, Medium, and Hard levels. Improve your auditory processing and memory recall with male and female voice options.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/academic/comprehension/listening-comprehension',
  },
};

export default function ListeningComprehensionPage() {
  return <ListeningComprehensionClient />;
}