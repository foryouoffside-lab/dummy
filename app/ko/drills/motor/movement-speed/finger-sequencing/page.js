import FingerSequencingClient from '@/app/drills/motor/movement-speed/finger-sequencing/FingerSequencingClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: '시퀀스 에임 연습・순서 클릭 테스트 – 시각 순서 인지 및 마우스 조작 속도 | SkillDrills',
  description: '번호가 지정된 타깃을 순서대로 빠르게 클릭하는 연속 시퀀스 에임 트레이너. 시각 탐색, 궤적 계획 및 연속 클릭 제어 반응 속도를 밀리초 단위로 측정합니다.',
  keywords: [
    '시퀀스 에임 연습',
    '순서대로 클릭 테스트',
    '연속 타깃 에임 트레이너',
    '숫자 순서 클릭',
    '타깃 스위칭 연습',
    '손가락 속도 측정',
    '마우스 연속 조작 훈련',
    '에임 순서 제어',
    'FPS 타깃 전환 연습',
    '마우스 클릭 반응속도',
    '오버워치 발로란트 에임 연습',
    '소근육 운동 제어',
  ],
  openGraph: {
    title: '시퀀스 에임 연습・순서 클릭 테스트 – 시각 순서 인지 및 마우스 조작 속도 | SkillDrills',
    description: '번호가 지정된 타깃을 순서대로 빠르게 클릭하는 연속 시퀀스 에임 트레이너. 시각 탐색, 궤적 계획 및 연속 클릭 제어 반응 속도를 밀리초 단위로 측정합니다.',
    type: 'article',
    url: 'https://skilldrills.online/ko/drills/motor/movement-speed/finger-sequencing',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '시퀀스 에임 연습・순서 클릭 테스트 – 시각 순서 인지 및 마우스 조작 속도 | SkillDrills',
    description: '번호가 지정된 타깃을 순서대로 빠르게 클릭하는 연속 시퀀스 에임 트레이너.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/motor/movement-speed/finger-sequencing',
    languages: getAlternateLanguages('/drills/motor/movement-speed/finger-sequencing'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills', item: 'https://skilldrills.online/ko' },
    { '@type': 'ListItem', position: 2, name: '운동 제어 훈련', item: 'https://skilldrills.online/ko/drills/motor' },
    { '@type': 'ListItem', position: 3, name: '동작 속도', item: 'https://skilldrills.online/ko/drills/motor/movement-speed' },
    { '@type': 'ListItem', position: 4, name: '시퀀스 에임 연습', item: 'https://skilldrills.online/ko/drills/motor/movement-speed/finger-sequencing' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '시퀀스 에임 연습・순서 클릭 테스트',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  description: '브라우저 기반 무료 시퀀스 에임 트레이너 및 연속 클릭 속도 테스트. 순서에 따른 타깃 전환, 궤적 최적화, 정밀 클릭 조작 측정.',
  url: 'https://skilldrills.online/ko/drills/motor/movement-speed/finger-sequencing',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '시퀀스 에임 트레이너',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'HTML5 Canvas 및 JavaScript 지원 필요',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  url: 'https://skilldrills.online/ko/drills/motor/movement-speed/finger-sequencing',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: '시퀀스 에임 트레이너 – 손가락 스피드 테스트',
  url: 'https://skilldrills.online/ko/drills/motor/movement-speed/finger-sequencing',
  description: '연속 운동 프로그램 이론에 기반하여 정해진 순서대로 타깃을 전환하는 속도를 측정합니다.',
  genre: ['Aim Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '시퀀스 에임 트레이너란 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '화면에 나타난 여러 개의 타깃을 번호나 크기 순서(큰 것에서 작은 것 순서)대로 신속하게 클릭하는 운동 제어 훈련 도구입니다. 탄도성 마우스 플릭과 시각적 사전 탐색 능력을 강화합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '발로란트나 오버워치 등의 FPS 게임 실력 향상에 어떤 도움이 되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '난전 상황에서는 여러 적의 위치를 신속히 파악하고 우선순위에 따라 에임을 전환해야 합니다. 시퀀스 훈련은 뇌의 운동 피질이 움직임 덩어리(래슐리의 모터 청킹 이론)를 미리 계획하도록 유도하여 타깃 간 주저함과 에임 오버슈팅을 없애줍니다.',
      },
    },
    {
      '@type': 'Question',
      name: '단순 클릭 속도(CPS) 측정과 시퀀스 훈련의 차이점은 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '일반 CPS 테스트는 한자리에서 마우스 버튼을 연타하는 속도만 측정합니다. 반면 시퀀스 에임은 공간적인 마우스 이동, 피츠의 법칙(Fitts’s Law)에 따른 제동 제어, 정확한 클릭 타이밍이 통합된 복합 운동입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '체인 내에서 타깃 크기가 점차 작아지는 이유는 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '실제 FPS 사격 메커니즘을 반영하기 위함입니다. 처음에는 넓은 타깃(적의 몸통)으로 빠르게 플릭하고, 이어지는 타깃에서는 작은 부위(헤드샷 히트박스)를 정밀 조준하도록 미세 감속 및 폐루프(Closed-loop) 제어를 훈련합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '시퀀스 에임 훈련에 이상적인 마우스 감도는 얼마인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '실제 주력 게임에서 사용하는 실전 감도(360도 회전당 25~45cm 범위 권장)를 그대로 유지하세요. 동일한 감도 환경에서 훈련해야 뇌의 운동 피질에 축적된 근육 기억이 실전 게임으로 100% 전이됩니다.',
      },
    },
    {
      '@type': 'Question',
      name: '운동 청킹(Motor Chunking)이란 무엇이며 왜 중요한가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '연속적인 여러 동작을 뇌에서 하나의 일괄 실행 프로그램으로 묶어 처리하는 신경학적 과정입니다(Lashley 1951). 각 타깃마다 반응하는 것이 아니라 하나의 연속된 궤적으로 처리하여 전환 반응 시간을 50% 이상 단축합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '하루에 몇 분 정도 훈련하는 것이 가장 효과적인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '하루 10~15분 동안 높은 집중력을 유지하며 세션당 60초 휴식을 포함해 3~4세트로 나누어 훈련하는 것을 권장합니다. 손목이나 전완근에 피로가 쌓인 상태에서 무리하게 진행하면 미세 제어 능력이 저하될 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '오스(osu!) 같은 리듬 게임에도 훈련 효과가 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, 매우 효과적입니다. 순서대로 나타나는 노트를 시각적으로 미리 읽고 정확한 타이밍과 위치에 마우스를 이동시키는 능력이 직결되므로 비트맵 판정력과 싱글탭 일관성이 향상됩니다.',
      },
    },
    {
      '@type': 'Question',
      name: '가장 정확한 측정을 위한 최적의 하드웨어 세팅은 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '144Hz 이상의 고주사율 모니터, 1000Hz 이상의 폴링레이트를 지원하는 게이밍 마우스, 윈도우 마우스 설정에서 "포인터 정확도 향상(마우스 가속)"을 해제하여 1:1 선형 센서 추적을 보장하세요.',
      },
    },
    {
      '@type': 'Question',
      name: '정확도(Accuracy)는 어떻게 계산되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '전체 클릭 횟수 대비 순서에 맞게 정확히 적중한 타깃 수의 백분율로 산출됩니다. 빈 화면을 헛클릭하거나 순서를 건너뛰면 감점되며, 고난도 레벨에서 95% 이상의 정확도를 유지하는 것이 마스터의 기준입니다.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: '시퀀스 에임 및 손가락 조작 속도 훈련 방법',
  description: '순서에 따른 다중 타깃 전환 및 연속 클릭 속도 극대화를 위한 단계별 가이드.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '타깃 배치 시각적 스캔',
      text: '화면에 나타난 번호 순서와 타깃 배치를 한눈에 파악하여 최적의 이동 동선을 계획합니다.',
      url: 'https://skilldrills.online/ko/drills/motor/movement-speed/finger-sequencing#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '1번 타깃 신속 적중',
      text: '가장 큰 1번 타깃을 향해 즉각적인 플릭을 실행하고 첫 번째 클릭으로 체인을 활성화합니다.',
      url: 'https://skilldrills.online/ko/drills/motor/movement-speed/finger-sequencing#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '순서대로 매끄러운 연계 타격',
      text: '불필요한 망설임 없이 1번부터 끝 번호까지 일정한 리듬을 유지하며 정확하게 연속 클릭합니다.',
      url: 'https://skilldrills.online/ko/drills/motor/movement-speed/finger-sequencing#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: '결과 지표 분석 및 피드백',
      text: '타깃 간 전환 레이턴시, 체인 클리어 속도, 궤적 효율성 데이터를 확인하고 취약점을 보완합니다.',
      url: 'https://skilldrills.online/ko/drills/motor/movement-speed/finger-sequencing#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('lashley1951', 'keele1968', 'fitts1954', 'mackenzie1992', 'woods2015'),
  intro: {
    title: '시퀀스 에임 측정의 과학적 원리',
    paragraphs: [
      '연속 타깃 시퀀싱은 단순히 가장 가까운 타깃을 쏘는 것이 아니라 정해진 순서 체인을 정확하게 수행하는 고차원 운동 제어입니다. 타깃 간의 이동 시간은 거리와 크기의 비율로 결정되는 피츠의 법칙(Fitts, 1954)을 따르며, 순서 자체는 사전 프로그래밍된 운동 단위로 실행됩니다(Lashley, 1951).',
      '브라우저 측정 환경: 브라우저 내부의 performance.now() 타이머와 모니터 주사율(60Hz=16.7ms, 240Hz=4.1ms)의 영향을 받습니다. 5ms 미만의 오차는 측정 노이즈로 간주하고 동일한 기기 환경에서 점진적인 향상 추세를 비교하는 것이 바람직합니다.',
    ],
  },
  benchmark: {
    title: '운동 제어 능력 표준 평가 벤치마크',
    description: '타깃 간 전환 반응 시간(Inter-Tap Latency), 도달 레벨, 시퀀스 적중 정확도에 따른 성취도 구간 기준표입니다.',
    columns: ['등급 (Tier)', '호칭 (Rank)', '타깃 간 지연시간', '도달 레벨', '체인 정확도', '평가 기준'],
    rows: [
      {
        tier: 'Tier 1',
        rank: '최상위 시퀀서 (Apex Sequencer)',
        stat: '180 ms 미만',
        level: '레벨 12+',
        accuracy: '98–100%',
        percentile: '상위 1% (최상위권)',
      },
      {
        tier: 'Tier 2',
        rank: '마스터 전술가 (Master Tactician)',
        stat: '180–230 ms',
        level: '레벨 9–11',
        accuracy: '95–97%',
        percentile: '상위 5% (마스터)',
      },
      {
        tier: 'Tier 3',
        rank: '숙련 조작자 (Proficient Operator)',
        stat: '230–300 ms',
        level: '레벨 6–8',
        accuracy: '90–94%',
        percentile: '상위 20% (숙련자)',
      },
      {
        tier: 'Tier 4',
        rank: '중급 클릭커 (Intermediate Clicker)',
        stat: '300–400 ms',
        level: '레벨 3–5',
        accuracy: '82–89%',
        percentile: '일반 기준선',
      },
      {
        tier: 'Tier 5',
        rank: '초보 기준선 (Novice Baseline)',
        stat: '400 ms 초과',
        level: '레벨 1–2',
        accuracy: '82% 미만',
        percentile: '입문/초보 단계',
      },
    ],
  },
  protocols: {
    title: '단계별 에임 개선 훈련 프로토콜',
    description: '신경근 적응과 동작 효율 극대화를 위한 과학적 연습 절차.',
    items: [
      {
        title: '프로토콜 1: 계층적 모터 청킹 (Lashley 1951)',
        description: '첫 클릭 전에 모든 노드의 배치를 눈으로 스캔하고 머릿속에서 하나의 연속된 선으로 묶어 기억하세요. 각 타깃마다 멈칫하는 지연 시간을 제거합니다.',
      },
      {
        title: '프로토콜 2: 탄도성 개루프 이동 (Keele 1968)',
        description: '거리가 먼 타깃으로 이동할 때는 중간 궤적 수정 없이 팔과 손목의 탄도성 속도로 경계면까지 단숨에 진입한 후 종단 감속을 적용하세요.',
      },
      {
        title: '프로토콜 3: 감경 타깃 미세 제동 제어',
        description: '타깃 반경이 점차 작아질 때 제동력을 섬세하게 조절하세요. 초기 큰 타깃은 빠른 팔 움직임, 마지막 정밀 타깃은 손가락과 손목의 미세 교정을 활용합니다.',
      },
      {
        title: '프로토콜 4: 콤보 템포 동기화 유지',
        description: '일정한 비트의 메트로놈처럼 클릭 리듬을 유지하세요. 조급하게 서두르면 미스 클릭이 발생해 시간 페널티가 누적되므로 안정된 페이스 유지가 핵심입니다.',
      },
    ],
  },
  faqs: {
    title: '자주 묻는 질문 (FAQ)',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function KoreanFingerSequencingPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <FingerSequencingClient copy={{ title: '시퀀스 에임 연습' }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/drills/motor/movement-speed/finger-sequencing" />
      </div>
    </>
  );
}
