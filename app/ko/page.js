import HomePageClient from '../HomePageClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: '무료 FPS 에임 연습 및 두뇌 반응속도 훈련 | SkillDrills',
  description: '발로란트, CS2, 오버워치2를 위한 81개 이상의 무료 에임 연습 루틴, 1ms 단위 반응속도 측정, CPS 테스트 및 기억력 훈련.',
  keywords: ['에임 연습', '발로란트 에임 연습', '무료 에임 히어로', '반응속도 테스트', 'CPS 테스트', '기억력 게임', '손가락 연타', '반응속도 측정'],
  alternates: {
    canonical: 'https://skilldrills.online/ko',
    languages: getAlternateLanguages('/ko'),
  },
  openGraph: {
    title: '무료 FPS 에임 연습 및 두뇌 반응속도 훈련 | SkillDrills',
    description: '발로란트, CS2, 오버워치2를 위한 81개 이상의 무료 에임 연습 루틴, 1ms 단위 반응속도 측정, CPS 테스트 및 기억력 훈련.',
    url: 'https://skilldrills.online/ko',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function LocalizedHomePage() {
  return <HomePageClient />;
}
