// app/drills/academic/comprehension/inference-drill/page.js
import InferenceDrillClient from './InferenceDrillClient';

export const metadata = {
  title: 'Inference Analytics Drill - Critical Reasoning & Comprehension Training',
  description: 'Sharpen your logical reasoning with 12 unique critical thinking passages. Practice inference, logical flaws, causal analysis, and argument evaluation. 60-second timed challenge with detailed rationales.',
  keywords: [
    'inference drill', 'critical reasoning', 'logical reasoning practice',
    'comprehension training', 'LSAT practice', 'GMAT critical reasoning',
    'logical flaws', 'argument analysis', 'reading comprehension',
    'critical thinking exercises', 'inference practice test', 'reasoning skills'
  ],
  openGraph: {
    title: 'Inference Analytics Drill - Critical Reasoning Training | SkillDrills',
    description: '12 unique passages covering logical flaws, causal analysis, paradox resolution, and argument evaluation. Timed 60-second challenge with detailed answer rationales.',
    type: 'article',
    url: 'https://skilldrills.online/drills/academic/comprehension/inference-drill',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inference Analytics Drill | SkillDrills',
    description: 'Sharpen critical reasoning with 12 passages. Timed challenge with rationales.',
  },
  alternates: {
    canonical: 'https://skilldrills.online/drills/academic/comprehension/inference-drill',
  },
};

export default function InferenceDrillPage() {
  return <InferenceDrillClient />;
}