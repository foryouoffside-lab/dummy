import ReactionSimulatorWrapper from '@/app/drills/reaction-speed/reaction-game/ReactionSimulatorWrapperLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';

// ============================================================
// SEO RESEARCH FINDINGS — ko-KR (reaction-speed / reaction-game)
// PRIMARY DOMESTIC: "반응속도 게임" — Gaming reflex query (High domestic winner)
//                   "순발력 게임" — Agility & reflex game search
// SECONDARY / LSI:  "반사신경 게임" — Reflex gaming search
//                   "낙하 타겟 반응속도" — Falling targets query
//                   "순발력 테스트" — Domestic physical query
// WINNER TITLE:     반응속도 게임 – 온라인 순발력 & 반사신경 측정 | SkillDrills
// ============================================================

export const metadata = {
  title: '반응속도 게임 – 온라인 순발력 & 반사신경 측정 | SkillDrills',
  description:
    '무료 온라인 반응속도 게임. 낙하하는 타겟을 정밀하게 요격하여 수직 시각 추적 능력과 손-눈 반사신경을 극대화하고 실시간 순발력 점수를 확인하세요.',
  keywords: [
    '반응속도 게임',
    '순발력 게임',
    '반사신경 게임',
    '반응속도 테스트',
    '순발력 테스트',
    'fps 반응속도',
    '에임 반응속도',
    '낙하 타겟 게임',
    '온라인 반응속도',
    '시각 추적 게임',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/reaction-speed/reaction-game',
    languages: getAlternateLanguages('/drills/reaction-speed/reaction-game'),
  },
  openGraph: {
    title: '반응속도 게임 – 온라인 순발력 & 반사신경 측정 | SkillDrills',
    description:
      '무료 온라인 반응속도 게임. 낙하하는 타겟을 정밀하게 요격하여 수직 시각 추적 능력과 손-눈 반사신경을 극대화하고 실시간 순발력 점수를 확인하세요.',
    url: 'https://skilldrills.online/ko/drills/reaction-speed/reaction-game',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '반응속도 게임 – 온라인 순발력 & 반사신경 측정 | SkillDrills',
    description:
      '무료 브라우저 반응속도 게임. 가속 낙하하는 타겟을 타격하여 순발력과 마우스 반응속도를 단련하세요.',
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
    { '@type': 'ListItem', position: 4, name: '반응속도 게임', item: 'https://skilldrills.online/ko/drills/reaction-speed/reaction-game' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '반응속도 게임 – 온라인 순발력 측정기',
  alternateName: ['반응속도 게임', '순발력 게임', '반사신경 게임', '낙하 타겟 에임 트레이너'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  description:
    '웹 브라우저에서 낙하하는 타겟을 요격하여 수직 시각 추적 능력과 손-눈 협응 순발력을 훈련하는 반응속도 게임.',
  browserRequirements: '자바스크립트를 지원하는 최신 브라우저 (Chrome, Whale, Edge, Safari)',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '반응속도 게임 — 온라인 순발력 측정 | SkillDrills',
  url: 'https://skilldrills.online/ko/drills/reaction-speed/reaction-game',
  description:
    '무료 온라인 반응속도 게임. 수직 낙하 타겟을 신속하게 요격하여 시각 추적과 반사신경을 측정합니다.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: '자바스크립트 지원 최신 브라우저 필요.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: '반응속도, 순발력, 수직 시각 추적, 손-눈 협응력, 운동 요격 타이밍',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: '반응속도 게임 - 가속 낙하 타겟 순발력 트레이닝',
  url: 'https://skilldrills.online/ko/drills/reaction-speed/reaction-game',
  description: '가속 낙하하는 구체를 요격하여 손-눈 협응력과 반응속도를 단련하는 브라우저 게임.',
  genre: ['Reflex Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: '반응속도 게임 플레이 방법',
  description: '낙하하는 타겟을 요격하고 수직 추적 반사신경을 단련하는 4단계 방법.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '게임 시작',
      text: '훈련 시작 버튼을 클릭하여 전체화면 반응속도 게임 경기장에 입장합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/reaction-game#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '낙하 타겟 시각 포착',
      text: '화면 상단 영역을 부드러운 시선으로 주시하며 원형 타겟이 출현하는 즉시 궤적을 인지합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/reaction-game#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '상단 영역 즉시 요격',
      text: '타겟이 가속하기 전 화면 상단 1/3 지점에서 빠르게 클릭하여 타임 보너스를 극대화합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/reaction-game#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: '콤보 배수 및 티어 달성',
      text: '놓치는 타겟 없이 연속 요격하여 3.0배수 콤보를 유지하고 최종 순발력 등급을 확인합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/reaction-game#step-4'
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
      name: '반응속도 게임이란 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '반응속도 게임은 동적으로 움직이는 시각 자극에 대해 두뇌의 인지와 신경근 운동 출력을 결합하여 순발력, 타깃 추적, 손-눈 협응력을 측정하고 단련하는 인터랙티브 훈련 도구입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '인간의 평균 반응시간은 어느 정도인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '단순 시각 자극에 대한 반응시간은 평균 200~250ms입니다(Kosinski, 2008). 여러 레인 중 타겟을 선별하여 반응해야 하는 선택 반응시간(Choice Reaction Time)은 힉의 법칙(Hick, 1952)에 따라 통상 250~350ms가 소요됩니다.',
      },
    },
    {
      '@type': 'Question',
      name: 'FPS 게임에서 수직 트래킹(Vertical Tracking)이 왜 중요한가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '에이펙스 레전드, 오버워치 2, 발로란트 등에서 상대가 고지대에서 뛰어내리거나 점프 패드로 공중에 뜰 때, 수직 Y축 추적이 흔들리지 않아야 안정적으로 에임을 유지하고 킬을 결정지을 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '반응속도 게임을 통해 실제 반사신경을 향상시킬 수 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네. 동적 타깃 요격 훈련을 정기적으로 수행하면 시각 피질의 정보 처리 효율이 개선되고 신경-근육 간 전달 경로가 최적화되어 반응 지연을 15~30ms 단축시킬 수 있습니다(Dye, Green, & Bavelier, 2009).',
      },
    },
    {
      '@type': 'Question',
      name: '단순 반응시간과 선택 반응시간의 차이는 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '단순 반응시간(SRT)은 하나의 정해진 신호에 즉각 반응하는 속도인 반면, 선택 반응시간(CRT)은 다중 선택지 중 타깃 위치를 식별하고 의사결정을 내려야 하므로 대뇌 피질 처리 시간이 추가됩니다.',
      },
    },
    {
      '@type': 'Question',
      name: '반응속도 게임에서 높은 점수를 얻으려면 어떻게 해야 하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '타겟이 화면 아래로 떨어질 때까지 기다리지 말고 상단 1/3 지점에서 나타나는 즉시 요격해야 높은 타임 보너스와 콤보 배수(최대 3.0x)를 유지할 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '프로게이머들의 반응속도는 어느 정도인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '발로란트, 카운터스트라이크 2, 오버워치 등의 탑 프로게이머들은 단순 반응시간 150~180ms, 선택 반응 환경에서도 200ms 안팎의 초고속 반사신경을 기록합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '반응속도가 날마다 차이 나는 이유는 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '수면 부족, 두뇌 피로도, 일주기 리듬, 카페인 섭취 상태, 그리고 모니터 주사율 및 마우스 폴링레이트 등 하드웨어 지연 시간에 영향을 받습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '모니터 주사율(144Hz, 240Hz)이 게임 결과에 미치는 영향은?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '60Hz 모니터는 프레임당 약 16.7ms의 화면 표시 버퍼 지연이 있지만, 144Hz(6.9ms)나 240Hz(4.1ms) 게이밍 모니터는 새로운 프레임을 10ms 이상 일찍 렌더링하여 실질적인 반응 기록을 향상시킵니다(Woods et al., 2015).',
      },
    },
    {
      '@type': 'Question',
      name: '모바일 스마트폰이나 태블릿에서도 원활히 플레이되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, 터치스크린 조작에 최적화된 반응형 캔버스로 설계되어 별도 앱 설치나 회원가입 없이 모바일 브라우저에서 즉시 플레이 가능합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '게임 내 동적 난이도(Adaptive Difficulty)는 어떻게 작동하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '점수와 콤보가 누적될수록 레벨이 상승하며, 타겟의 낙하 가속도 증가, 생성 간격 단축, 타겟 판정 영역 축소가 단계별로 적용됩니다.',
      },
    },
    {
      '@type': 'Question',
      name: '반응 훈련은 얼마나 자주 하는 것이 효과적인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '본격적인 랭크 게임 시작 전 5~10분 정도 워밍업으로 진행하면 손목에 무리 없이 시각적 각성도와 신경근 반응성을 최적화할 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '반응속도를 측정하는 게임에는 어떤 종류가 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '화면 색상 전환에 즉각 반응하는 단순 시각 반응속도 테스트(Simple Reaction Time), 낙하하는 동적 타깃을 요격하는 반사신경 게임, 빠른 템포의 리듬 게임, FPS 전용 에임 트레이너 등이 있으며, 각각 요구하는 신경 인지 및 정보 처리 단계가 다릅니다.',
      },
    },
    {
      '@type': 'Question',
      name: '손-눈 협응력(Hand-Eye Coordination)을 가장 효과적으로 향상시키는 게임은?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '수직 낙하 타깃 요격 게임, 리듬 액션 게임, 고속 타깃 트래킹 훈련이 대표적입니다. 시각적 주시점과 마우스 커서의 물리적 위치를 실시간으로 일치시키는 능력을 집중적으로 단련합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '이 반응속도 게임은 무료로 이용할 수 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, SkillDrills의 반응속도 게임은 100% 무료이며 회원가입, 프로그램 설치, 방해되는 팝업 광고 없이 웹 브라우저에서 즉시 실행할 수 있습니다.',
      },
    },
  ],
};

const reactionGameGuideKo = {
  heading: '반응속도 게임 가이드: 수직 트래킹과 운동 요격 역학',
  intro: [
    '반응속도 게임은 동적으로 움직이는 시각 자극에 대해 두뇌의 인지와 신경근 운동 출력을 결합하여 순발력, 타깃 추적, 손-눈 협응력을 측정하고 단련하는 인터랙티브 훈련 도구입니다.',
    '단순한 빨간불-초록불 클릭 측정과 달리, 다중 레인에서 불시에 가속 낙하하는 타겟을 타격하는 본 게임은 힉의 법칙(Hick, 1952)이 지배하는 선택 반응시간(Choice Reaction Time)을 시험합니다. 두뇌는 중력 가속도 궤적을 실시간으로 예측하고 원활추종 안구운동(Smooth Pursuit)과 단속적 안구운동(Saccades)을 결합하여 요격을 완료해야 합니다 (Carpenter, 1988).',
    '정밀 측정 매커니즘: 본 도구는 브라우저 내장 performance.now() 고해상도 타이머를 활용하여 네트워크 핑(지연 시간)의 간섭 없이 순수한 로컬 입력 반응을 기록합니다. 60Hz 모니터는 약 16.7ms의 화면 지연이 발생하지만, 144Hz 및 240Hz 게이밍 모니터는 프레임 지연을 4~6ms로 최소화합니다 (Woods et al., 2015).',
    '측정 정밀도 및 하드웨어 지연 변수: 모든 반응 이벤트는 브라우저 고해상도 시계 performance.now()를 사용하여 사용자의 기기 내부에서 직접 기록되며 외부 서버로 점수가 전송되지 않습니다. 브라우저 타이머는 보안 조치로 약 1ms 단위로 양자화되며, 모니터 주사율에 따라 시각 자극이 프레임 단위로 표시됩니다 (60Hz 약 16.7ms, 144Hz 약 6.9ms, 240Hz 약 4.1ms; Woods et al., 2015). 또한 마우스 폴링레이트에 따라 125Hz에서 약 8ms, 1000Hz에서 약 1ms의 지연 차이가 발생합니다. 5ms 미만의 미세한 편차는 측정 오차로 간주하시고, 이전 기록과의 비교는 반드시 동일한 하드웨어 환경에서 진행하시기 바랍니다.',
  ],
  benchmarks: {
    title: '반응속도 게임 성취도 등급 및 점수 벤치마크 (45초 세션)',
    headers: ['점수 구간', '난이도 등급', '게이머 피지컬 프로필', '신경 제어 및 훈련 권장사항'],
    rows: [
      ['15,000점 이상', '그랜드마스터 / 프로', '즉각적인 중심와 포착 및 밀리초 단위 초고속 격발', '다중 타겟 동시 낙하 상황에서도 콤보 유지 집중'],
      ['10,000 – 14,999점', '최상위 엘리트', '우수한 궤적 사전 예측 및 미스 클릭 최소화', '상단 영역에서 요격하여 추가 타임 보너스 확보'],
      ['6,000 – 9,999점', '숙련 게이머', '안정적인 반사신경을 보유하며 가속 구간 적응 우수', '개별 타겟 집중보다 주변 시야 감지력 활용 권장'],
      ['2,500 – 5,999점', '중급 / 일반 성인', '단일 타겟 요격은 원활하나 복합 레인에서 미스 발생', '마우스 이동 반경을 줄이고 중앙 복귀 습관화'],
      ['2,500점 미만', '입문 / 초보자', '사후 반응형 클릭으로 인한 시간 지연 및 당황', '속도보다 정확도를 우선하여 클릭 리듬감 체득'],
    ],
    note: '본 벤치마크 등급표는 인체 크로노메트리 및 운동 요격 역학 연구(Hick, 1952; Carpenter, 1988; Woods et al., 2015)를 토대로 설정되었습니다. 60Hz 모니터는 약 16.7ms의 화면 지연이 발생합니다.',
  },
  techniques: {
    title: '운동 요격 역학 및 반응 최적화 테크닉',
    items: [
      {
        name: '화면 상단 선제 요격 (High-Screen Interception)',
        desc: '타겟이 떨어지기 전 상단 1/3 지점에서 즉각 타격하면 타임 보너스가 극대화되고 타겟이 최고 속도에 도달하기 전에 안전하게 처리할 수 있습니다.',
        tips: '마우스 커서를 화면 중앙보다 약간 높은 위치에 유지하여 스폰 즉시 반응하세요.',
      },
      {
        name: '궤적 예측 및 선제 클릭 (Trajectory Projection)',
        desc: '떨어지는 공을 사후적으로 쫓아가기보다 100~150ms 후 도달할 예상 지점에 커서를 미리 위치시키는 예측 조준을 활용하세요 (Carpenter, 1988).',
        tips: '대뇌 운동 피질의 선행 계획을 활성화하면 마우스의 불필요한 과보정 오차를 줄일 수 있습니다.',
      },
      {
        name: '주변 시야를 활용한 출현 감지',
        desc: '한 레인에 시선을 과도하게 집중하면 인접 레인 스폰을 놓칩니다. 시선을 넓게 분산시켜 망막 주변부 간상세포의 빠른 움직임 감지력을 활용하세요.',
        tips: '초점을 수평 중앙에 부드럽게 고정하면 좌우 스폰을 동시에 포착할 수 있습니다.',
      },
      {
        name: '하드웨어 입력 지연 최소화',
        desc: '60Hz 모니터는 프레임당 약 16.7ms의 화면 표시 버퍼 지연이 발생하지만, 240Hz e스포츠 모니터는 4.1ms에 불과합니다 (Woods et al., 2015).',
        tips: '1000Hz 폴링레이트 게이밍 마우스를 사용하고 브라우저 수직동기화(V-Sync)를 비활성화하세요.',
      },
    ],
  },
  steps: [
    '훈련 시작 버튼을 눌러 전체화면 게임 경기장을 활성화합니다.',
    '마우스 커서를 경기장 상단 중앙에 가볍게 위치시킵니다.',
    '부드러운 시선으로 스폰 라인을 주시하여 타겟 출현을 즉각 감지합니다.',
    '타겟이 가속하기 전 상단 영역에서 신속하고 정확하게 클릭합니다.',
    '연속 요격으로 콤보 배수를 유지하고 최종 점수와 등급 판정을 확인합니다.',
  ],
  audience: '에이펙스 레전드, 오버워치, 포트나이트 등 수직 교전이 잦은 FPS 게이머, 순발력과 체감 반응속도를 단련하고자 하는 스포츠 선수 및 일반 사용자.',
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('hick1952', 'carpenter1988', 'woods2015', 'kosinski2008'),
  related: [
    { href: '/ko/drills/reaction-speed/reaction-time-test', label: '반응속도 테스트' },
    { href: '/ko/drills/reaction-speed/reflex-training-drill', label: '반사신경 훈련' },
    { href: '/ko/drills/reaction-speed/fps-tracking-trainer', label: 'FPS 트래킹 에임 트레이너' },
    { href: '/ko/drills/motor/movement-speed/rapid-tapping', label: 'CPS 클릭 속도 테스트' },
  ],
};

export default function KoreanReactionGamePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <ReactionSimulatorWrapper copy={{ title: '반응속도 게임' }} />
      <DrillGuide guide={reactionGameGuideKo} />
      <DrillFooter />
    </>
  );
}
