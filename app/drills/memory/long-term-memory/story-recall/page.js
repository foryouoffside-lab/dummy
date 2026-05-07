import StoryRecallClient from './StoryRecallClient';

export const metadata = {
  title: 'Story Recall Drill - Long-Term Memory & Narrative Comprehension Training',
  description: 'Train narrative memory by reading and recalling details from 5 unique stories. 15-second reading per story, then answer 4 questions. +1 per correct answer, -1 per wrong. Complete all 5 stories for mastery. 60-second timed challenge.',
  keywords: [
    'story recall', 'narrative memory', 'reading comprehension memory',
    'story memory drill', 'recall details practice', 'long term memory stories',
    'narrative recall training', 'story comprehension test', 'memory recall quiz',
    'reading memory drill', 'story detail recall', 'narrative memory test',
    'free memory training', 'story recall practice', 'reading retention drill'
  ],
  openGraph: {
    title: 'Story Recall Drill - Narrative Memory & Detail Recall',
    description: '5 unique stories with 4 questions each. 15-second reading time then recall key details. +1 for correct answers, -1 for wrong. Complete all stories for mastery achievement.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/memory/long-term-memory/story-recall',
  },
};

export default function StoryRecallPage() {
  return <StoryRecallClient />;
}