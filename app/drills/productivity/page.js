import ProductivityDrillsClient from './ProductivityDrillsClient';

export const metadata = {
  title: 'Productivity Drills - Task Switching, Time Management & Focus Training',
  description: '10 free productivity drills for task switching, time management, focus endurance, and work efficiency. Improve context switching speed, deep work stamina, batch processing, and Pomodoro technique. No login required.',
  keywords: [
    'productivity drills', 'task switching training', 'time management practice',
    'focus endurance', 'work efficiency training', 'pomodoro timer',
    'deep work training', 'batch processing', 'context switching',
    'priority sorting', 'time estimation', 'flow state training',
    'concentration stamina', 'multitasking practice', 'free productivity tools'
  ],
  openGraph: {
    title: 'Productivity Drills - Free Task Switching, Time Management & Focus Training',
    description: '10 free drills across Task Switching, Time Management, Focus Endurance, and Work Efficiency. Boost productivity with science-based training. No login required.',
    type: 'website',
    url: 'https://skilldrills.online/drills/productivity',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/productivity',
  },
};

export default function ProductivityDrillsPage() {
  return <ProductivityDrillsClient />;
}