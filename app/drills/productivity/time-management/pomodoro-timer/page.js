import PomodoroSyncClient from './PomodoroSyncClient';

export const metadata = {
  title: 'Pomodoro Sync - Focus Timer & Productivity Tracker',
  description: 'Boost productivity with the Pomodoro technique. 25-minute focus sessions with 5-minute breaks. Earn 1 point per minute of focus. Track completed pomodoros, streaks, and total focus time. Free online Pomodoro timer.',
  keywords: [
    'pomodoro timer', 'focus timer', 'productivity timer', 'pomodoro technique',
    '25 minute timer', 'focus session', 'work timer', 'study timer',
    'time management tool', 'productivity tracker', 'pomodoro tracker',
    'focus tracking', 'break timer', 'online pomodoro', 'free pomodoro timer'
  ],
  openGraph: {
    title: 'Pomodoro Sync - Focus Timer & Productivity Tracker',
    description: '25-minute focus sessions with 5-minute breaks. Earn focus points, track pomodoro streaks, and build productive habits. Canvas-based timer with progress ring.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/productivity/time-management/pomodoro-timer',
  },
};

export default function PomodoroSyncPage() {
  return <PomodoroSyncClient />;
}