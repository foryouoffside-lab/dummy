import ConceptLinkingClient from './ConceptLinkingClient';

export const metadata = {
  title: 'Concept Linking Drill - Associative Memory & Sequential Recall Training',
  description: 'Train associative memory by recalling concept chains step by step. 30 unique chains across 3 categories (common, scientific, abstract). Chains grow longer with perfect rounds. 60-second timed challenge with scoring per concept.',
  keywords: [
    'concept linking', 'associative memory', 'sequential recall', 'memory chain',
    'concept chain drill', 'associative learning', 'memory training', 'cognitive memory',
    'linking concepts', 'memory improvement', 'sequential memory', 'brain training',
    'free memory drill', 'associative recall', 'concept association'
  ],
  openGraph: {
    title: 'Concept Linking Drill - Associative Memory & Sequential Recall',
    description: '30 unique concept chains across common, scientific, and abstract categories. Memorize for 5 seconds then recall step by step. Chains get longer with perfect rounds. Track streaks and accuracy.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/associative-memory/concept-linking',
  },
};

export default function ConceptLinkingPage() {
  return <ConceptLinkingClient />;
}