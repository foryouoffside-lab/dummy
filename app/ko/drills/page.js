import DrillsDirectoryClient from '@/app/drills/DrillsDirectoryClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: '81개 전체 에임 연습 및 두뇌 훈련 도감 | SkillDrills',
  description: '8대 핵심 분야 81개 이상의 무료 인터랙티브 훈련. 발로란트 에임 연습, 반응속도 테스트, 기억력 게임, CPS 테스트.',
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills',
    languages: getAlternateLanguages('/ko/drills'),
  },
  openGraph: {
    title: '81개 전체 에임 연습 및 두뇌 훈련 도감 | SkillDrills',
    description: '8대 핵심 분야 81개 이상의 무료 인터랙티브 훈련. 발로란트 에임 연습, 반응속도 테스트, 기억력 게임, CPS 테스트.',
    url: 'https://skilldrills.online/ko/drills',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function LocalizedDirectoryPage() {
  return <DrillsDirectoryClient />;
}
