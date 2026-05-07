import SwitchCostIntegratorClient from './SwitchCostIntegratorClient';

export const metadata = {
  title: 'Switch-Cost Integrator - Task Switching Cost & Cognitive Flexibility Training',
  description: 'Train task switching with direct vs opposite mode orb tracking. TOP zone = click opposite shadow, BOTTOM zone = click same-side orb. Adaptive speed 1000-400ms. 60-second challenge with 3 lives protection.',
  keywords: [
    'switch cost training', 'task switching cost', 'cognitive switching',
    'switch cost integrator', 'task set reconfiguration', 'cognitive flexibility',
    'attention switching drill', 'mental set shifting', 'switch cost measurement',
    'executive control training', 'task switching performance', 'cognitive training',
    'free cognitive flexibility test', 'switch cost drill', 'attention control'
  ],
  openGraph: {
    title: 'Switch-Cost Integrator - Task Switching & Cognitive Flexibility',
    description: 'Alternate between direct and opposite mode orb tracking. Adaptive speed tightens with accuracy. 3 lives protect your score. 60-second cognitive flexibility challenge.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/productivity/task-switching/switch-cost',
  },
};

export default function SwitchCostIntegratorPage() {
  return <SwitchCostIntegratorClient />;
}