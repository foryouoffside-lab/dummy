import VisualTrackingDrillsClient from '@/app/drills/visual-tracking/VisualTrackingDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: '부드러운 시각 추적 & 탄도 예측 에임 훈련 | SkillDrills',
  description: '부드러운 안구 추종(Smooth Pursuit), 탄도 궤적 예측, 동적 목표물 락온 능력 강화.',
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/visual-tracking',
    languages: getAlternateLanguages('/ko/drills/visual-tracking'),
  },
  openGraph: {
    title: '부드러운 시각 추적 & 탄도 예측 에임 훈련 | SkillDrills',
    description: '부드러운 안구 추종(Smooth Pursuit), 탄도 궤적 예측, 동적 목표물 락온 능력 강화.',
    url: 'https://skilldrills.online/ko/drills/visual-tracking',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function LocalizedVisualTrackingDrillsClientPage() {
  return <VisualTrackingDrillsClient />;
}
