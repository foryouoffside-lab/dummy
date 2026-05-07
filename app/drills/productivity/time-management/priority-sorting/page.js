import PrioritySortingClient from './PrioritySortingClient';

export const metadata = {
  title: 'Priority Sorting - Time Management & Task Prioritization Training',
  description: 'Train rapid task prioritization by clicking color-coded targets under changing rules. Rule switches every 3-4 seconds. 60-second challenge with 3 lives protection. Improve decision-making speed and task triage skills.',
  keywords: [
    'priority sorting', 'task prioritization', 'time management training',
    'decision making drill', 'priority training', 'task triage',
    'cognitive prioritization', 'eisenhower matrix practice', 'rapid decision making',
    'color sorting game', 'attention management', 'priority matrix training',
    'productivity drill', 'task management practice', 'free prioritization training'
  ],
  openGraph: {
    title: 'Priority Sorting - Task Prioritization & Decision Making Training',
    description: 'Click color-coded targets matching the current priority rule. Rules change every 3-4 seconds. 60-second challenge with 3 lives and priority bonus scoring system.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/productivity/time-management/priority-sorting',
  },
};

export default function PrioritySortingPage() {
  return <PrioritySortingClient />;
}