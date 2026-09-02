import VisualDrillsClient from '@/app/drills/visual/VisualDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: '시각 인지 & 공간 지각 트레이너 | SkillDrills',
  description: '원근 깊이 판단, 주변 시야 이상 감지, 초고속 시각 탐색 훈련.',
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/visual',
    languages: getAlternateLanguages('/ko/drills/visual'),
  },
  openGraph: {
    title: '시각 인지 & 공간 지각 트레이너 | SkillDrills',
    description: '원근 깊이 판단, 주변 시야 이상 감지, 초고속 시각 탐색 훈련.',
    url: 'https://skilldrills.online/ko/drills/visual',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function LocalizedVisualDrillsClientPage() {
  return <VisualDrillsClient />;
}
