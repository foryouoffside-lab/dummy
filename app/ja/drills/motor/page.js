import MotorDrillsClient from '@/app/drills/motor/MotorDrillsClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: '指先連打速度＆CPSテスト・手眼協調ドリル | SkillDrills',
  description: '秒間クリック数（CPS）、連打スピード、指の微小運動協調性テスト。',
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/motor',
    languages: getAlternateLanguages('/ja/drills/motor'),
  },
  openGraph: {
    title: '指先連打速度＆CPSテスト・手眼協調ドリル | SkillDrills',
    description: '秒間クリック数（CPS）、連打スピード、指の微小運動協調性テスト。',
    url: 'https://skilldrills.online/ja/drills/motor',
    locale: 'ja_JP',
    type: 'website',
  },
};

export default function LocalizedMotorDrillsClientPage() {
  return <MotorDrillsClient />;
}
