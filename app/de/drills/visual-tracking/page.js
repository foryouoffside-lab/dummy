import VisualTrackingDrillsClient from '@/app/drills/visual-tracking/VisualTrackingDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'Visuelles Tracking & Zielverfolgung für FPS | SkillDrills',
  description: 'Flüssige Augenfolgebewegungen, Flugbahnvorhersage und kontinuierliche Zielverfolgung.',
  alternates: {
    canonical: 'https://skilldrills.online/de/drills/visual-tracking',
    languages: getAlternateLanguages('/de/drills/visual-tracking'),
  },
  openGraph: {
    title: 'Visuelles Tracking & Zielverfolgung für FPS | SkillDrills',
    description: 'Flüssige Augenfolgebewegungen, Flugbahnvorhersage und kontinuierliche Zielverfolgung.',
    url: 'https://skilldrills.online/de/drills/visual-tracking',
    locale: 'de_DE',
    type: 'website',
  },
};

export default function LocalizedVisualTrackingDrillsClientPage() {
  return <VisualTrackingDrillsClient />;
}
