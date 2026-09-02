import MotorDrillsClient from '@/app/drills/motor/MotorDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: '소근육 정밀도 & CPS 테스트 허브 | SkillDrills',
  description: '초당 클릭 속도(CPS), 손가락 연타 속도 및 미세 마우스 조작 협응력 테스트.',
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/motor',
    languages: getAlternateLanguages('/ko/drills/motor'),
  },
  openGraph: {
    title: '소근육 정밀도 & CPS 테스트 허브 | SkillDrills',
    description: '초당 클릭 속도(CPS), 손가락 연타 속도 및 미세 마우스 조작 협응력 테스트.',
    url: 'https://skilldrills.online/ko/drills/motor',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function LocalizedMotorDrillsClientPage() {
  return <MotorDrillsClient />;
}
