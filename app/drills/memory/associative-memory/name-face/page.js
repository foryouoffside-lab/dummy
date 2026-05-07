import NameFaceClient from './NameFaceClient';

export const metadata = {
  title: 'Name-Face Memory Drill - Associative Face-Name Recall Training',
  description: 'Train face-name association memory with 30 unique profiles featuring emoji, names, and roles. Adaptive difficulty increases profiles from 3 to 8. 60-second timed challenge with scoring per correct recall.',
  keywords: [
    'name face memory', 'face name association', 'name recall training',
    'face memory drill', 'associative memory faces', 'remembering names',
    'name memory game', 'face recognition memory', 'name recall practice',
    'social memory training', 'person memory drill', 'name association',
    'free memory training', 'face name recall', 'cognitive memory drill'
  ],
  openGraph: {
    title: 'Name-Face Memory Drill - Associative Face-Name Recall',
    description: '30 unique profiles with emoji faces, names, and roles. 5-second memorization phase then recall the correct name. Adaptive difficulty increases from 3 to 8 profiles as you improve.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/associative-memory/name-face',
  },
};

export default function NameFacePage() {
  return <NameFaceClient />;
}