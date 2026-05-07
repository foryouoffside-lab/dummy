import DualTargetFlowClient from './DualTargetFlowClient';

export const metadata = {
  title: 'Dual-Target Flow - Multi-Tasking & Divided Attention Training',
  description: 'Train divided attention by tracking and clicking matching shapes across two simultaneous streams. Left and right targets change every 30 seconds. 60-second challenge with 3 lives protection and combo streaks.',
  keywords: [
    'dual task training', 'multi-tasking drill', 'divided attention',
    'dual n-back visual', 'simultaneous tracking', 'attention splitting',
    'multi target tracking', 'visual attention training', 'dual task performance',
    'cognitive load training', 'parallel processing', 'attention allocation',
    'multitasking practice', 'divided focus', 'free attention training'
  ],
  openGraph: {
    title: 'Dual-Target Flow - Multi-Tasking & Divided Attention Training',
    description: 'Track two simultaneous shape streams with different targets. Left and right targets change every 30 seconds. 3 lives protection with combo streaks. 60-second challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/productivity/task-switching/multi-tasking',
  },
};

export default function DualTargetFlowPage() {
  return <DualTargetFlowClient />;
}