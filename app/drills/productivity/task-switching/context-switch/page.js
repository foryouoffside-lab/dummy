import ContextSwitchClient from './ContextSwitchClient';

export const metadata = {
  title: 'Context Switch Lab - Task Switching Speed & Cognitive Flexibility Training',
  description: 'Train rapid task switching between parity (Even/Odd) and magnitude (<5/>5) rules. 1.5 seconds per question with 3 lives protection. 60-second challenge tracking reaction time, accuracy, and streaks.',
  keywords: [
    'context switching', 'task switching training', 'cognitive flexibility',
    'task switching test', 'mental flexibility drill', 'attention switching',
    'cognitive control', 'executive function training', 'multitasking practice',
    'rule switching', 'context switch speed', 'adaptive thinking',
    'cognitive switching', 'task set reconfiguration', 'free task switching drill'
  ],
  openGraph: {
    title: 'Context Switch Lab - Task Switching & Cognitive Flexibility',
    description: 'Alternate between parity and magnitude rules under time pressure. 1.5s per question with 3 lives. Train cognitive flexibility and rapid context switching. 60-second challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/productivity/task-switching/context-switch',
  },
};

export default function ContextSwitchPage() {
  return <ContextSwitchClient />;
}