import VisualTrackingSpeedTestWrapper from '@/app/drills/reaction-speed/visual-tracking-speed-test/VisualTrackingSpeedTestWrapperLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — ko-KR (reaction-speed / visual-tracking-speed-test)
// PRIMARY DOMESTIC: "동체시력 테스트" / "동체시력 측정" / "동체시력 훈련"
// SECONDARY / LSI:
//   "시각 반응속도" / "안구 추적 훈련" / "손눈 협응력"
//   "사케드 안구운동" / "원활추종" / "에임 반응속도"
// ============================================================

export const metadata = {
  title: '동체시력 테스트 – 온라인 시각 반응속도 & 안구 추적 | SkillDrills',
  description:
    '무료 온라인 동체시력 테스트. 고속 이동 표적을 시각으로 추적하고 순간 요격하여 동체시력과 시각 반응속도를 정밀 측정합니다. 손-눈 협응력 극대화.',
  keywords: [
    '동체시력 테스트',
    '동체시력',
    '동체시력 훈련',
    '동체시력 측정',
    '시각 반응속도',
    '안구 추적 훈련',
    '손눈 협응력',
    '사케드 안구운동',
    '원활추종',
    '에임 반응속도',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/reaction-speed/visual-tracking-speed-test',
    languages: getAlternateLanguages('/drills/reaction-speed/visual-tracking-speed-test'),
  },
  openGraph: {
    title: '동체시력 테스트 – 온라인 시각 반응속도 & 안구 추적 | SkillDrills',
    description:
      '무료 온라인 동체시력 테스트. 고속 이동 표적을 시각으로 추적하고 순간 요격하여 동체시력과 반응속도를 단련하세요.',
    url: 'https://skilldrills.online/ko/drills/reaction-speed/visual-tracking-speed-test',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '동체시력 테스트 – 온라인 시각 반응속도 & 안구 추적 | SkillDrills',
    description:
      '무료 온라인 동체시력 테스트. 원활추종 안구운동과 순간 요격 반응속도를 측정하세요.',
  },
  robots: { index: true, follow: true },
};

// --- Structured Data Schemas ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills 홈', item: 'https://skilldrills.online/ko' },
    { '@type': 'ListItem', position: 2, name: '훈련 허브', item: 'https://skilldrills.online/ko/drills' },
    { '@type': 'ListItem', position: 3, name: '반응 속도', item: 'https://skilldrills.online/ko/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: '동체시력 테스트', item: 'https://skilldrills.online/ko/drills/reaction-speed/visual-tracking-speed-test' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '동체시력 테스트 – 온라인 시각 반응속도 측정 도구',
  alternateName: ['동체시력 측정기', '시각 추적 테스트', '안구 운동 반응 훈련'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  description:
    '웹 브라우저에서 동적 표적을 눈으로 추적하고 급격한 궤적 변경에 즉각 반응하는 동체시력 및 시각 반응속도 측정 도구.',
  browserRequirements: '자바스크립트를 지원하는 최신 브라우저 (Chrome, Whale, Edge, Safari)',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '동체시력 테스트 — 온라인 시각 반응속도 & 안구 추적 | SkillDrills',
  url: 'https://skilldrills.online/ko/drills/reaction-speed/visual-tracking-speed-test',
  description:
    '무료 온라인 동체시력 테스트. 이동하는 표적을 부드럽게 추적하고 순간적인 궤적 변화를 포착하여 시각 반응속도를 측정합니다.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: '자바스크립트를 지원하는 최신 브라우저 필요.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: '동체시력, 원활추종 안구운동, 사케드 도약운동, 시각 반응속도, 손-눈 협응력',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: '동체시력 테스트 - 시각 추적 & 안구 반응 훈련',
  url: 'https://skilldrills.online/ko/drills/reaction-speed/visual-tracking-speed-test',
  description: '웹 브라우저 기반 동체시력 측정 및 시각 추적 속도 훈련 게임.',
  genre: ['Reflex Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: '동체시력 및 시각 추적 반응속도 훈련 방법',
  description: '동적 표적 추적 능력과 보상성 사케드 안구도약 반응속도를 극대화하는 단계별 지침.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '훈련 시작하기',
      text: '«훈련 시작» 버튼을 클릭하여 전체화면 동체시력 캔버스를 활성화합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/visual-tracking-speed-test#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '이동 표적 주시',
      text: '시야 중심 와(fovea)를 이동하는 구체에 고정하고 부드럽게 시선을 유지합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/visual-tracking-speed-test#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '순간 궤적 변화 포착 및 클릭',
      text: '표적이 급격히 가속하거나 반사각으로 꺾이는 순간 즉각적인 보상성 사케드를 발동하여 커서를 정중앙에 맞춥니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/visual-tracking-speed-test#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: '재포착 지연 시간 확인',
      text: '평균 재포착 지연 시간(ms)과 추적 안정도 점수를 확인하여 시각 기능 변화를 점검합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/visual-tracking-speed-test#step-4',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-15',
  mainEntity: [
    {
      '@type': 'Question',
      name: '동체시력 테스트는 구체적으로 무엇을 측정하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '움직이는 표적을 안구가 얼마나 부드럽고 정확하게 추적하는지(원활추종)와 표적이 갑자기 방향이나 속도를 바꿀 때 안구와 손이 다시 표적을 포착하는 재포착 지연 시간(ms)을 측정합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '원활추종(Smooth Pursuit)과 사케드(Saccade)의 차이는 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '원활추종은 시속 30°–60°/s 이내로 부드럽게 움직이는 물체를 중심와에 지속적으로 맺히게 하는 연속적 안구운동입니다(Krauzlis, 2004). 반면 사케드는 표적이 급가속하거나 튕길 때 200°–700°/s의 초고속 탄도성 점프로 시선을 즉각 재정렬하는 안구도약운동입니다(Rashbass, 1961).',
      },
    },
    {
      '@type': 'Question',
      name: '일반 안과 시력검사(1.0/2.0)로 동체시력을 알 수 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '알 수 없습니다. 일반 시력검사는 정지된 시표를 식별하는 정적 시력(Static Acuity)만 측정합니다. 움직이는 물체를 처리하는 동적 시각(Dynamic Visual Acuity)과 안구근육 협응 반응은 별도의 동적 측정 훈련을 거쳐야 합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '동체시력이 저하되는 주된 원인은 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '과도한 스마트폰 및 모니터 응시로 인한 안구 외안근 피로, 안구 건조, 수면 부족, 그리고 중추신경계의 정보 처리 피로가 시각 추적 지연을 유발합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '동체시력이 FPS 게임 및 구기 스포츠에 미치는 영향은 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '야구, 테니스, 레이싱 및 발로란트, 에이펙스 레전드와 같은 고속 교전 게임에서 상대방의 불규칙한 회피 기동을 인지하고 조준선을 일치시키는 핵심 속도를 좌우합니다(Land & McLeod, 2000).',
      },
    },
    {
      '@type': 'Question',
      name: '동체시력과 시각 반응속도는 훈련을 통해 향상될 수 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네. 반복적인 동적 추적 훈련은 대뇌 중측두엽 시각영역(MT/V5)과 전두안야(FEF), 소뇌 사이의 신경 전달 경로를 강화하여 사케드 지연 시간을 줄이고 조준 정확도를 높입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '보상성 사케드(Catch-up Saccade)란 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '표적이 원활추종 한계를 넘어 급가속할 때 망막 중심와에서 표적 상이 벗어나게 됩니다. 이때 뇌가 오차를 보정하기 위해 순식간에 시선을 도약시켜 표적을 다시 중앙에 맞추는 무조건적 반사 운동입니다(Rashbass, 1961).',
      },
    },
    {
      '@type': 'Question',
      name: '모니터 주사율(Hz)이 동체시력 훈련에 어떤 영향을 주나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '60Hz 모니터는 프레임 간격이 16.7ms인 반면, 144Hz는 6.9ms, 240Hz는 4.1ms로 단축됩니다(Woods et al., 2015). 주사율이 높을수록 모션 블러가 제거되어 안구가 궤적 변화를 훨씬 선명하고 일찍 감지할 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '동체시력 훈련은 하루에 얼마나 하는 것이 좋나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '하루 3~5분 정도의 짧고 집중도 높은 훈련이 이상적입니다. 안구 모양체근 피로를 방지하면서 신경계의 기민함을 최적 상태로 유지할 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '이 동체시력 측정 도구는 무료인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네. SkillDrills의 동체시력 테스트는 100% 무료이며 설치나 로그인 없이 브라우저의 High Resolution Time API(performance.now())로 초정밀 밀리초 측정을 지원합니다.',
      },
    },
  ],
};

const visualTrackingGuide = {
  heading: '동체시력 테스트 가이드: 시각 추적 속도와 안구 재포착 메커니즘',
  intro: [
    '동체시력(Dynamic Visual Acuity)은 시야 내에서 고속으로 이동하는 대상을 안구와 뇌가 얼마나 정밀하게 추적하고, 불규칙한 궤적 변화를 감지하여 시선을 재정렬할 수 있는지를 나타내는 신경운동 지표입니다(Krauzlis, 2004; Land & McLeod, 2000).',
    '본 동체시력 테스트는 표적이 예측 불가능하게 튀거나 급가속할 때 발생하는 시각-운동 반응 지연을 측정합니다. 표적이 부드럽게 움직일 때는 원활추종(Smooth Pursuit)으로 따라가지만, 급격한 방향 전환 시에는 원활추종이 붕괴하고 보상성 사케드(Catch-up Saccade)가 유발됩니다(Rashbass, 1961). 본 시스템은 performance.now() 고해상도 시계를 통해 재포착 인터벌을 마이크로초 단위로 기록합니다.',
    '측정 정밀도 및 하드웨어 안내: 모든 연산은 사용자의 로컬 브라우저에서 수행됩니다. 보안 목적으로 브라우저 타이머는 약 1ms 단위로 양자화되며, 모니터 주사율에 따른 프레임 지연(60Hz 기준 약 16.7ms, 240Hz 기준 약 4.1ms; Woods et al., 2015)과 마우스 폴링레이트가 반영됩니다. 5ms 미만의 차이는 측정 노이즈로 간주하십시오.',
    '본인 기기 환경에서 꾸준히 누적 측정하여 실질적인 동체시력과 시각 반사 반응의 향상 추이를 비교하는 것이 가장 정확합니다.',
  ],
  benchmarks: {
    title: '동체시력 재포착 반응속도 기준표',
    headers: ['재포착 반응 지연', '안구운동 분류', '추종 및 사케드 특성', '실전 적용 분야', '추천 훈련 중점'],
    rows: [
      ['< 180 ms', '초고속 예측 재포착 (Apex / Pro)', '즉각적인 중심와 재정렬; 궤적 예측 일치율 극대화', '프로 레이서 / 전투기 조종사 / 프로 e스포츠 (Land & McLeod, 2000)', '장시간 교전 시 시선 긴장 완화 유지'],
      ['180 – 230 ms', '고속 동적 추종 (Elite)', '사케드 지연 최소화 및 신속한 표적 가속 동조', '상위권 구기 선수 / 하이랭커 게이머 (Krauzlis, 2004)', '주변시를 활용한 이탈 오버슈트 방지'],
      ['231 – 290 ms', '표준 정상 추적 (Advanced)', '건강한 성인의 전형적인 시각 재포착 반응시간', '일반 성인 건강 기준선', '외안근 피로 저감 및 방향 전환 유연성 훈련'],
      ['291 – 360 ms', '지연 / 시각 피로 (Intermediate)', '사케드 발동 지연 발생; 표적을 뒤늦게 쫓아가는 현상', '장시간 화면 응시, 안구 건조, 저대비 환경', '20-20-20 안구 휴식 적용 및 모니터 설정 점검'],
      ['> 360 ms', '안구 추적 조절 필요 (Developing)', '표적을 다시 맞추기 위해 다수의 미세 사케드 발생', '비훈련 안구운동 또는 시각적 분산 요인', '속도보다 부드러운 궤적 일치 연습 우선'],
    ],
    note: '본 기준표는 신경학적 안구운동 문헌(Rashbass, 1961; Krauzlis, 2004; Land & McLeod, 2000)을 바탕으로 작성되었으며, 웹 환경 디스플레이 지연(Woods et al., 2015)을 고려한 실전 지표입니다.',
  },
  techniques: {
    title: '동체시력 및 시각 반응속도 극대화 테크닉',
    items: [
      {
        name: '원활추종과 보상성 사케드의 조화',
        desc: '표적이 완만하게 움직일 때는 원활추종으로 부드럽게 시선을 유지하고, 급격한 방향 전환 시에만 정확한 사케드를 가동합니다.',
        tips: '표적보다 미리 앞서서 시선을 튀지 말고 표적의 궤적을 침착하게 따라가세요.',
      },
      {
        name: '예측 주시선 유지 (Anticipatory Gaze)',
        desc: '표적의 뒤꽁무니를 쫓아가지 말고, 표적의 진행 방향 살짝 앞쪽 벡터에 시선 윈도우를 형성하여 요격 타이밍을 잡습니다.',
        tips: '벽에 부딪히는 각도를 임의로 예단하지 말고 반사 직후 벡터를 확인하세요.',
      },
      {
        name: '손목과 전완근 긴장 해제',
        desc: '손목을 지나치게 꽉 쥐면 미세 조정 근육이 경직되어 급격한 방향 전환에 즉각 대처하기 어렵습니다.',
        tips: '세트 사이에 손목을 털어주고 호흡을 가다듬어 근육 이완을 유지하세요.',
      },
      {
        name: '동적 시각 환경 최적화',
        desc: '주변 조명을 적절히 유지하여 망막의 동체 인식 콘트라스트를 극대화하고 눈부심을 차단합니다.',
        tips: '모니터 주사율을 최고 설정(144Hz 이상)으로 활성화해 모션 블러를 최소화하세요.',
      },
    ],
  },
  steps: [
    '모니터에서 약 팔 한 쪽 길이(50~70cm) 정도 편안한 거리를 유지합니다.',
    '«훈련 시작»을 누르고 움직이는 표적에 시선을 부드럽게 고정합니다.',
    '표적이 일정한 속도로 이동하는 동안 궤적을 안정적으로 추적합니다.',
    '표적이 급격히 가속하거나 튕겨 나가는 즉시 신속하게 커서를 표적 중심에 재정렬합니다.',
    '세트 종료 후 평균 재포착 지연 시간과 추적 정확도를 확인합니다.',
  ],
  audience: 'FPS 게이머(발로란트, 오버워치, 에이펙스), 구기 종목 운동선수(야구, 테니스, 축구), 레이싱 드라이버 및 동체시력 강화를 원하는 모든 사용자.',
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('krauzlis2004', 'rashbass1961', 'land2000', 'woods2015'),
  related: [
    { href: '/ko/drills/reaction-speed', label: '반응 속도 허브' },
    { href: '/ko/drills/reaction-speed/reaction-time-test', label: '반응속도 테스트' },
    { href: '/ko/drills/reaction-speed/reflex-training-drill', label: '순발력 테스트 (반사신경 게임)' },
    { href: '/ko/drills/reaction-speed/reaction-game', label: '반응속도 게임' },
  ],
};

export default function KoreanVisualTrackingSpeedTestPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <VisualTrackingSpeedTestWrapper copy={{ title: '동체시력 테스트' }} />
      <DrillGuide guide={visualTrackingGuide} />
    </>
  );
}
