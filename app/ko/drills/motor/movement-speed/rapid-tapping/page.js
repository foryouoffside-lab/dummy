import RapidTappingClient from '@/app/drills/motor/movement-speed/rapid-tapping/RapidTappingClient';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: 'CPS 테스트 - 초당 클릭 속도 및 마우스 연타 테스트',
  description: '무료 온라인 CPS 테스트. 초당 클릭 수(CPS)를 측정하고 지터 클릭, 버터플라이 클릭 및 손가락 근지구력을 훈련하세요.',
  keywords: ['CPS 테스트', '클릭 속도 테스트', '초당 클릭수', '마우스 연타 속도', '마인크래프트 CPS'],
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/motor/movement-speed/rapid-tapping',
    languages: getAlternateLanguages('/ko/drills/motor/movement-speed/rapid-tapping'),
  },
  openGraph: {
    title: 'CPS 테스트 - 초당 클릭 속도 및 마우스 연타 테스트',
    description: '무료 온라인 CPS 테스트. 초당 클릭 수(CPS)를 측정하고 지터 클릭, 버터플라이 클릭 및 손가락 근지구력을 훈련하세요.',
    url: 'https://skilldrills.online/ko/drills/motor/movement-speed/rapid-tapping',
    locale: 'ko_KR',
    type: 'website',
  },
};

export default function LocalizedRapidTappingPage() {
  const guide = {
    heading: 'CPS 테스트 가이드 & 공식 등급표',
    intro: [
      'CPS(Clicks Per Second, 초당 클릭수) 테스트는 마우스 클릭 속도, 손가락 민첩성 및 신경근 지구력을 측정합니다. 마인크래프트 PvP 및 발로란트, CS2 권총 라운드에서 에임 흔들림 없이 빠른 연사를 유지하는 데 필수적입니다.',
      'SkillDrills 45초 테스트는 초기 스프린트 클릭 속도와 시간 경과에 따른 근지구력을 동시에 평가합니다.'
    ],
    benchmarks: {
      title: 'Benchmark & Percentile Tier Table',
      tiers: [
        { range: '14+ CPS', tier: 'Ascendant / God Tier', percentile: 'Top 1%', desc: 'Elite jitter/butterfly clicker' },
        { range: '10 - 13 CPS', tier: 'Diamond / Pro', percentile: 'Top 10%', desc: 'Fast burst clicking with rhythm control' },
        { range: '7 - 9 CPS', tier: 'Gold / Average', percentile: 'Top 50%', desc: 'Standard single-finger click cadence' },
        { range: '< 6 CPS', tier: 'Silver / Novice', percentile: 'Bottom 40%', desc: 'Room for finger mobility & grip improvement' },
      ]
    },
    tips: [
      'Experiment with jitter clicking (forearm vibration) vs butterfly clicking (alternating two fingers).',
      'Maintain a light claw grip to reduce finger fatigue across the 45-second duration.',
      'Calibrate mouse debounce time in hardware settings to prevent missed clicks.'
    ]
  };

  return (
    <>
      <RapidTappingClient />
      <DrillGuide
        heading={guide.heading}
        intro={guide.intro}
        benchmarks={guide.benchmarks}
        tips={guide.tips}
        faq={[
          { q: 'What is a good CPS score for gaming?', a: '6.5 to 8 CPS is average. Competitive Minecraft PvP and tactical shooter players typically achieve 10 to 14+ CPS using specialized clicking techniques.' },
          { q: 'How does SkillDrills calculate CPS?', a: 'CPS is calculated using high-precision requestAnimationFrame and Performance.now() timers to track valid clicks over time without input buffer delay.' }
        ]}
      />
    </>
  );
}
