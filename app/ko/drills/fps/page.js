import FPSHubClient from '@/app/drills/fps/FPSHubClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: '무료 FPS 에임 연습 - 발로란트 & CS2 에임 트레이너',
  description: '발로란트, CS2, 에이펙스 레전드 에임 연습. 브라우저에서 플릭샷, 부드러운 트래킹, 180도 상황 인지 능력을 무료로 훈련하세요.',
  keywords: ['발로란트 에임 연습', 'FPS 에임 연습', '무료 에임 트레이너', '플릭샷 연습', '에임 조준선 연습', 'CS2 에임 연습'],
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/fps',
    languages: getAlternateLanguages('/ko/drills/fps'),
  },
  openGraph: {
    title: '무료 FPS 에임 연습 - 발로란트 & CS2 에임 트레이너',
    description: '발로란트, CS2, 에이펙스 레전드 에임 연습. 브라우저에서 플릭샷, 부드러운 트래킹, 180도 상황 인지 능력을 무료로 훈련하세요.',
    url: 'https://skilldrills.online/ko/drills/fps',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function LocalizedFPSHubPage() {
  return <FPSHubClient />;
}
