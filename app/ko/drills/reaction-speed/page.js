import ReactionSpeedDrillsClient from '@/app/drills/reaction-speed/ReactionSpeedDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: '반응속도 훈련 및 테스트 - 반사신경 종합 트레이닝 허브 | SkillDrills',
  description: '단순 반응 시간부터 다중 타깃 반사 신경, 동체 추적까지 8가지 온라인 반응속도 훈련 프로그램을 무료로 시작하세요.',
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/reaction-speed',
    languages: getAlternateLanguages('/ko/drills/reaction-speed'),
  },
  openGraph: {
    title: '반응속도 훈련 및 테스트 - 반사신경 종합 트레이닝 허브 | SkillDrills',
    description: '단순 반응 시간부터 다중 타깃 반사 신경, 동체 추적까지 8가지 온라인 반응속도 훈련 프로그램을 무료로 시작하세요.',
    url: 'https://skilldrills.online/ko/drills/reaction-speed',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function LocalizedReactionHubPage() {
  return <ReactionSpeedDrillsClient />;
}
