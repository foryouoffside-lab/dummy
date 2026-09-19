import ReflexTrainingDrillWrapper from '@/app/drills/reaction-speed/reflex-training-drill/ReflexTrainingDrillWrapperLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — ko-KR (reaction-speed / reflex-training-drill)
// PRIMARY DOMESTIC: "순발력 테스트" — 195 exact / 230 broad searches/mo (Domestic #1 winner)
//                    "반속 테스트 발로란트" — 255 searches/mo
// SECONDARY / LSI:
//                    "반사신경 게임" — High-intent gaming query
//                    "반응속도 게임" — 850+ searches/mo
//                    "순발력 게임"   — Reflex agility query
//                    "분할 주의력"   — Divided attention query
// WINNER TITLE:      순발력 테스트・반사신경 게임 – 멀티 타깃 반속 측정기 | SkillDrills
// ============================================================

export const metadata = {
  title: '순발력 테스트・반사신경 게임 – 멀티 타깃 반속 측정기 | SkillDrills',
  description:
    '무료 온라인 순발력 테스트 및 반사신경 게임. 화면에 동시에 출현하는 다중 타깃을 즉각 판별하고 연속 클릭하여 분할 주의력과 동체시력을 극대화하세요. 발로란트, 롤 반응속도 훈련.',
  keywords: [
    '순발력 테스트',
    '반사신경 게임',
    '반사신경 테스트',
    '반속 테스트 발로란트',
    '반응속도 게임',
    '순발력 게임',
    '에임 반응속도',
    '분할주의력',
    '동체시력 테스트',
    '발로란트 반속',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/reaction-speed/reflex-training-drill',
    languages: getAlternateLanguages('/drills/reaction-speed/reflex-training-drill'),
  },
  openGraph: {
    title: '순발력 테스트・반사신경 게임 – 멀티 타깃 반속 측정기 | SkillDrills',
    description:
      '무료 온라인 순발력 테스트 및 반사신경 게임. 화면에 동시에 출현하는 다중 타깃을 빠르게 클릭하여 순발력과 분할 주의력을 단련하세요.',
    url: 'https://skilldrills.online/ko/drills/reaction-speed/reflex-training-drill',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '순발력 테스트・반사신경 게임 – 멀티 타깃 반속 측정기 | SkillDrills',
    description:
      '무료 온라인 순발력 테스트. 멀티 타깃 버스트를 클리어하며 반사 신경을 극대화하세요.',
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
    { '@type': 'ListItem', position: 4, name: '순발력 테스트・반사신경 게임', item: 'https://skilldrills.online/ko/drills/reaction-speed/reflex-training-drill' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '순발력 테스트・반사신경 게임 – 멀티 타깃 반속 측정 도구',
  alternateName: ['순발력 테스트', '반사신경 게임', '순발력 게임', '멀티타깃 에임 훈련'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  description:
    '웹 브라우저에서 동시 출현하는 다중 타깃을 빠르게 식별하고 격파하는 실전형 순발력 및 반사신경 훈련 도구.',
  browserRequirements: '자바스크립트를 지원하는 최신 브라우저 (Chrome, Whale, Edge, Safari)',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '순발력 테스트・반사신경 게임 — 멀티 타깃 반속 측정기 | SkillDrills',
  url: 'https://skilldrills.online/ko/drills/reaction-speed/reflex-training-drill',
  description:
    '무료 온라인 순발력 테스트 및 반사신경 게임. 화면에 나타나는 다중 타깃을 신속하게 타격하여 반응 능력을 향상시킵니다.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: '자바스크립트를 지원하는 최신 브라우저 필요.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: '순발력, 반사신경, 분할 주의력, 동체시력, 사케드 안구도약운동',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: '순발력 테스트 - 멀티 타깃 버스트 반사신경 게임',
  url: 'https://skilldrills.online/ko/drills/reaction-speed/reflex-training-drill',
  description: '순발력 테스트 - 멀티 타깃 버스트 반사신경 게임',
  genre: ['Reflex Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: '순발력 테스트・반사신경 게임 훈련 방법',
  description: '브라우저에서 다중 타깃을 격파하여 순발력을 단련하는 절차.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '훈련 시작',
      text: '「훈련 시작」 버튼을 클릭하여 전체화면 측정 화면을 실행합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/reflex-training-drill#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '타깃 버스트 시각 인지',
      text: '시야를 넓혀 화면 전체에 동시에 출현하는 타깃들과 타이머 링을 확인합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/reflex-training-drill#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '우선순위 격파',
      text: '사라지기 직전인 타깃을 우선적으로 조준하여 정확하게 클릭하거나 탭합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/reflex-training-drill#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: '연속 콤보 및 티어 확인',
      text: '미스 없이 연속 타격하여 레벨을 올리고 본인의 순발력 등급을 확인합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/reflex-training-drill#step-4'
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-11',
  mainEntity: [
    {
      '@type': 'Question',
      name: '순발력 테스트(반사신경 게임)는 어떤 훈련인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '화면에 불규칙하게 동시에 나타나는 여러 타깃을 시각적으로 빠르게 스캔하고 제한 시간 내에 순차적으로 타격하는 실전형 인지・반응 도구입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '순발력과 반사신경은 훈련으로 개선될 수 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, 생체 신경전도 속도 자체는 선천적이지만, 시각 정보의 공간적 식별과 다중 자극 간 운동 선택 지연(선택 반응 시간)은 체계적인 훈련을 통해 20~30% 이상 대폭 단축할 수 있습니다(Donders, 1868).',
      },
    },
    {
      '@type': 'Question',
      name: '단순 반응속도와 선택 반응속도의 차이는 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '단순 반응(약 180~220ms)은 한 가지 예측된 자극에 정해진 동작을 하는 반면, 선택 반응은 여러 대안 중 무엇을 먼저 타격할지 두뇌에서 판단하고 조준하는 인지 과정이 추가되어 50~150ms가 더 소요됩니다.',
      },
    },
    {
      '@type': 'Question',
      name: '힉의 법칙(Hick\'s Law)이 순발력에 미치는 영향은?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '힉의 법칙(Hick, 1952)에 따르면 선택해야 할 자극의 수가 증가할수록 반응 시간은 로그 함수에 비례하여 늘어납니다. 반복 훈련을 통해 타깃들을 하나의 기하학적 덩어리(청크)로 묶어 인지하면 판단 지연을 최소화할 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '게임에서 분할 주의력(Divided Attention)이란?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '시야가 좁아지는 터널 비전을 방지하고, 넓은 화면에서 동시에 일어나는 다발적 상황을 시야각 전체로 파악하는 인지 능력입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '발로란트나 오버워치 같은 FPS 난전에서 어떻게 도움이 되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '교전 중 2명 이상의 적이 동시에 시야에 들어왔을 때 당황하지 않고, 생존 위험도가 높은 적부터 차례로 표적을 전환(타깃 스위칭)하는 에임 피지컬에 직결됩니다.',
      },
    },
    {
      '@type': 'Question',
      name: '모니터 주사율이 순발력 테스트 점수에 영향을 주나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '그렇습니다. 60Hz 화면보다 144Hz나 240Hz 게이밍 모니터는 타깃 등장 프레임을 10ms 이상 앞당겨 표시하므로 반응 지연을 줄일 수 있습니다(Woods et al., 2015).',
      },
    },
    {
      '@type': 'Question',
      name: '하루에 얼마나 연습하는 것이 이상적인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '하루 10~15분 정도 짧고 집중도 높은 세션이 중추신경계 적응에 가장 유리합니다. 손목 피로가 쌓이지 않도록 무리한 장시간 연습은 지양하세요.',
      },
    },
    {
      '@type': 'Question',
      name: '모바일 스마트폰에서도 이용 가능한가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, 별도의 설치나 가입 없이 모바일 터치스크린에서도 완벽하게 작동합니다. 가로 모드로 회전하면 더 넓은 시야에서 플레이할 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '단순 반응시간(SRT)과 선택 반응시간(CRT)의 차이는 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '단순 반응시간은 신호 하나에 즉시 반응(약 200~250ms)하는 것이며, 선택 반응시간은 여러 목표 중 올바른 대상을 선별하여 반응하는 과정에서 인지 결정 지연이 추가로 발생합니다(Donders, 1868; Hick, 1952).',
      },
    },
  ],
};
const reflexDrillGuide = {
  heading: '순발력 테스트・반사신경 게임 가이드: 분할 주의력과 동체시력 단련',
  intro: [
    '순발력 테스트(반사신경 게임)는 단순히 불빛 하나에 반응하는 단순 반응을 넘어, 여러 자극이 난무하는 복잡한 환경에서 가장 위급한 목표를 골라내는 선택 반응 능력을 훈련합니다.',
    '발로란트, CS2, 오버워치 2, 에이펙스 레전드 등 실전 FPS 교전에서는 항상 둘 이상의 위험 요소가 동시에 시야에 들어옵니다. 빠른 안구 도약과 결단력 있는 타격이 교전 승패를 가릅니다.',
    '학술적 원리: Donders (1868)의 인지 시간 측정론에 따르면 선택 반응(Type B)은 자극 변별과 운동 선택이라는 고차원적 인지 과정을 거칩니다. 또한 힉의 법칙(Hick, 1952)에 따라 대안이 늘어날수록 결정 지연이 발생하며, 본 훈련은 이러한 병목 현상을 효율적으로 압축합니다.',
    '정밀 측정 방식: HTML5 Canvas와 requestAnimationFrame 루프를 통해 브라우저 performance.now() API로 1밀리초 미만 단위로 지연 시간을 기록합니다(Woods et al., 2015).',
  ],
  benchmarks: {
    title: '멀티 타깃 반응 처리 속도 기준표',
    headers: ['목표당 평균 처리 시간', '티어 등급', '선택 지연 특성', '인지 프로필', '추천 훈련 중점'],
    rows: [
      ['< 250 ms / 타깃', '신계・에이펙스 프로 (Apex / Pro)', '선택 지연 극소화', '즉각적인 공간 클러스터 인식과 유려한 사케드', '최고 레벨에서의 밀집 버스트 유지'],
      ['250 – 320 ms / 타깃', '엘리트 (Elite)', '압축된 결정 지연', '신속한 우선순위 판별 및 흔들림 없는 시선 이동', '클릭 간 체류 시간(Dwell Time) 최소화'],
      ['321 – 400 ms / 타깃', '고급 게이머 (Advanced)', '표준적인 다지선택 반응', '안정적인 초탄과 외곽 타깃에 대한 경미한 망설임', '주변 시야를 활용한 외곽 노드 조기 포착'],
      ['401 – 500 ms / 타깃', '중급자 (Intermediate)', '인지 부하 발생', '단일 타깃에는 강하나 밀집 출현 시 일시적 정지', '만료 링이 좁은 타깃부터 처리하는 습관화'],
      ['> 500 ms / 타깃', '입문・성장 (Developing)', '높은 결정 지연', '심리적 불응기(PRP) 및 시각 탐색 망설임', '무리한 속도보다 최단 기하학적 이동 경로 연습'],
    ],
    note: '본 기준표는 인체 크로노메트리(선택 반응시간 연구) 문헌(Donders, 1868; Hick, 1952)을 기반으로 작성되었습니다.',
  },
  techniques: {
    title: '멀티 타깃 순발력 극대화 테크닉',
    items: [
      {
        name: '우선순위 선별과 최단 경로 동선',
        desc: '버스트 타깃이 나타났을 때 마우스를 무작위로 휘젓지 않고, 만료가 임박한 타깃부터 부드러운 곡선이나 직선 경로로 이어가며 타격합니다.',
        tips: '점을 하나하나 따로 보지 말고 전체 타깃 배치를 하나의 기하학적 도형으로 파악하세요.',
      },
      {
        name: '주변 시야를 통한 차기 타깃 등록',
        desc: '현재 클릭하는 타깃은 중심 시야로 정밀 조준하되, 다음 타깃의 위치는 주변 시야의 간상세포로 미리 인지합니다.',
        tips: '커서만 눈으로 쫓지 말고, 시선의 중심을 타깃 무리의 중앙 부근에 유지하세요.',
      },
      {
        name: '결단력 있는 스트ッピング(Stopping Power)',
        desc: '타깃을 지나쳤다가 되돌아오는 오버슈팅은 50~100ms의 큰 낭비를 부릅니다. 타깃 중심에서 즉각 감속하는 제동력이 핵심입니다.',
        tips: '마우스가 너무 미끄러진다면 브레이킹 성향의 마우스패드를 활용해 보세요.',
      },
      {
        name: '신경계 각성과 웜업 루틴',
        desc: '반응 속도는 수면 상태와 신체 체온에 직결됩니다. 본 경기 전 5~10분의 버스트 훈련은 신경계를 최적 상태로 활성화합니다.',
        tips: '손이 차가우면 신경 전도 속도가 떨어지므로 손을 따뜻하게 유지한 후 플레이하세요.',
      },
    ],
  },
  steps: [
    '「훈련 시작」을 눌러 전체화면 모드를 실행합니다.',
    '화면 중앙에 시선을 편안하게 둡니다.',
    '타깃들이 출현하면 전체 구도를 빠르게 스캔하고 타격 순서를 결정합니다.',
    '각 타깃의 시간 링이 닫히기 전에 중심을 정확히 클릭하거나 탭합니다.',
  ],
  audience: '발로란트, 롤, 오버워치 2, 에이펙스 등 e스포츠 게이머, 동체시력과 순발력을 기르고자 하는 모든 사용자.',
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('woods2015', 'kosinski2008', 'dye2009', 'shelton2010', 'jain2015'),
  related: [
    { href: '/ko/drills/reaction-speed', label: '반응속도 훈련 허브' },
    { href: '/ko/drills/reaction-speed/reaction-time-test', label: '반응속도 테스트' },
    { href: '/ko/drills/motor/movement-speed/rapid-tapping', label: 'CPS 클릭 속도 테스트' },
    { href: '/ko/drills/reaction-speed/fps-tracking-trainer', label: 'FPS 트래킹 에임 트레이너' },
    { href: '/ko/drills/fps/flick-shot-training', label: '플릭샷 훈련' },
  ],
};

export default function KoreanReflexTrainingDrillPage() {
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
      <ReflexTrainingDrillWrapper copy={{ title: '순발력 테스트・반사신경 게임' }} />
      <DrillGuide guide={reflexDrillGuide} />
      <DrillFooter />
    </>
  );
}
