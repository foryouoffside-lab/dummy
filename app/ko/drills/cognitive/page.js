import CognitiveHubClient from '@/app/drills/cognitive/CognitiveHubClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: '인지 제어 & 집중력 지속 훈련 도감 | SkillDrills',
  description: '주의 집중력 지속 시간, 규칙 전환 적응력, 멀티태스킹 처리 능력을 향상시키는 무료 인지 훈련.',
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/cognitive',
    languages: getAlternateLanguages('/ko/drills/cognitive'),
  },
  openGraph: {
    title: '인지 제어 & 집중력 지속 훈련 도감 | SkillDrills',
    description: '주의 집중력 지속 시간, 규칙 전환 적응력, 멀티태스킹 처리 능력을 향상시키는 무료 인지 훈련.',
    url: 'https://skilldrills.online/ko/drills/cognitive',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function LocalizedCognitiveHubClientPage() {
  return <CognitiveHubClient />;
}
