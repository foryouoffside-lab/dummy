import BatchProcessingClient from './BatchProcessingClient';

export const metadata = {
  title: 'Batch Processing - Work Efficiency & Task Grouping Training',
  description: 'Train efficient task grouping by processing color-coded batches under time pressure. 2 seconds per batch with progressive difficulty (4-10+ items). 60-second challenge with 3 lives, levels, and combo streaks.',
  keywords: [
    'batch processing', 'task grouping', 'work efficiency training',
    'batch task management', 'productivity drill', 'task batching',
    'cognitive efficiency', 'workflow optimization', 'batch processing game',
    'time management drill', 'processing speed', 'task organization',
    'efficiency training', 'free productivity game', 'work batching practice'
  ],
  openGraph: {
    title: 'Batch Processing - Work Efficiency & Task Grouping Training',
    description: 'Process color-coded batches in 2-second windows. Level up every 3 batches with increasing items. 3 lives protection with combo streaks. 60-second efficiency challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/productivity/work-efficiency/batch-processing',
  },
};

export default function BatchProcessingPage() {
  return <BatchProcessingClient />;
}