import MemoryClient from '@/app/drills/memory/MemoryClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: '작업 기억력 & 공간 인지 훈련 게임 | SkillDrills',
  description: '작업 기억력(Working Memory), 숫자 역순 암기, 격자 시각 패턴 기억 훈련.',
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/memory',
    languages: getAlternateLanguages('/ko/drills/memory'),
  },
  openGraph: {
    title: '작업 기억력 & 공간 인지 훈련 게임 | SkillDrills',
    description: '작업 기억력(Working Memory), 숫자 역순 암기, 격자 시각 패턴 기억 훈련.',
    url: 'https://skilldrills.online/ko/drills/memory',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function LocalizedMemoryClientPage() {
  return <MemoryClient />;
}
