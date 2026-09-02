import PhysicalDrillsClient from '@/app/drills/physical/PhysicalDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: '신체 반사 & 순발력 훈련 도감 | SkillDrills',
  description: '손과 눈의 협응 반응, 동적 장애물 회피, 전신 순발력 측정 훈련.',
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/physical',
    languages: getAlternateLanguages('/ko/drills/physical'),
  },
  openGraph: {
    title: '신체 반사 & 순발력 훈련 도감 | SkillDrills',
    description: '손과 눈의 협응 반응, 동적 장애물 회피, 전신 순발력 측정 훈련.',
    url: 'https://skilldrills.online/ko/drills/physical',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function LocalizedPhysicalDrillsClientPage() {
  return <PhysicalDrillsClient />;
}
