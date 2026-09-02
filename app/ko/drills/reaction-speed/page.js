import ReactionSpeedDrillsClient from '@/app/drills/reaction-speed/ReactionSpeedDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: '반응속도 테스트 - 밀리초 단위 온라인 반응속도 측정기',
  description: '시각 반응 시간과 반사 신경을 1ms 단위로 정밀 측정하세요. 프로게이머 벤치마크 및 등급표 제공.',
  keywords: ['반응속도 테스트', '반응속도 측정 사이트', '인간 반응속도 벤치마크', '반응속도 ms', '게이머 반응속도'],
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/reaction-speed',
    languages: getAlternateLanguages('/ko/drills/reaction-speed'),
  },
  openGraph: {
    title: '반응속도 테스트 - 밀리초 단위 온라인 반응속도 측정기',
    description: '시각 반응 시간과 반사 신경을 1ms 단위로 정밀 측정하세요. 프로게이머 벤치마크 및 등급표 제공.',
    url: 'https://skilldrills.online/ko/drills/reaction-speed',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function LocalizedReactionHubPage() {
  return <ReactionSpeedDrillsClient />;
}
