import MarketDoorsPursuitClient from '@/app/drills/reaction-speed/market-doors-pursuit/MarketDoorsPursuitWrapperLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS – ko-KR (reaction-speed / market-doors-pursuit)
// PRIMARY DOMESTIC: "각 지우기 연습" / "코너 체킹 훈련"
// SECONDARY / LSI:
//   "파이 썰기 에임" / "클리어링 반응속도"
//   "도어웨이 색적 훈련" / "사각지대 탐색"
// ============================================================

export const metadata = {
  title: '각 지우기 연습 – 코너 체킹 클리어링 훈련 | SkillDrills',
  description: '무료 각 지우기(파이 썰기) 및 코너 체킹 에임 훈련. 출입문과 모퉁이에서 돌발 출현하는 적을 즉각 색적하고 타격하는 시각 반응을 단련합니다.',
  keywords: [
    '각 지우기 연습',
    '코너 체킹 훈련',
    '파이 썰기 에임',
    '클리어링 반응속도',
    '도어웨이 색적 훈련',
    '사각지대 탐색',
    '발로란트 각 지우기',
    '단속성 색적 반응',
    '프리 에임 연습',
    '택티컬 에임 트레이너',
    '동체시력 모퉁이 반응',
    '사케드 시선 도약 훈련',
  ],
  openGraph: {
    title: '각 지우기 연습 – 코너 체킹 클리어링 훈련 | SkillDrills',
    description: '무료 각 지우기(파이 썰기) 및 코너 체킹 에임 훈련. 출입문과 모퉁이에서 돌발 출현하는 적을 즉각 색적하고 타격하는 시각 반응을 단련합니다.',
    type: 'article',
    url: 'https://skilldrills.online/ko/drills/reaction-speed/market-doors-pursuit',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '각 지우기 연습 – 코너 체킹 클리어링 훈련 | SkillDrills',
    description: '무료 각 지우기(파이 썰기) 및 코너 체킹 에임 훈련. 출입문과 모퉁이에서 돌발 출현하는 적을 즉각 색적하고 타격하는 시각 반응을 단련합니다.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/reaction-speed/market-doors-pursuit',
    languages: getAlternateLanguages('/drills/reaction-speed/market-doors-pursuit'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills 홈', item: 'https://skilldrills.online/ko' },
    { '@type': 'ListItem', position: 2, name: '훈련 허브', item: 'https://skilldrills.online/ko/drills' },
    { '@type': 'ListItem', position: 3, name: '반응속도', item: 'https://skilldrills.online/ko/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: '각 지우기 연습', item: 'https://skilldrills.online/ko/drills/reaction-speed/market-doors-pursuit' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '각 지우기 연습 – 코너 체킹 및 클리어링 트레이너',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  description: '온라인 코너 체킹, 각 지우기(파이 썰기) 및 출입문 돌발 표적 색적 반응속도 단련 툴.',
  url: 'https://skilldrills.online/ko/drills/reaction-speed/market-doors-pursuit',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  inLanguage: 'ko-KR',
  dateModified: '2026-09-15',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '각 지우기 클리어링 트레이너',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'HTML5 Canvas, 포인터 락 지원 최신 웹 브라우저',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  url: 'https://skilldrills.online/ko/drills/reaction-speed/market-doors-pursuit',
  inLanguage: 'ko-KR',
  dateModified: '2026-09-15',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Corner Checking Trainer – 전술적 도어웨이 클리어링 및 색적 반응 게임',
  url: 'https://skilldrills.online/ko/drills/reaction-speed/market-doors-pursuit',
  description: 'FPS 출입문 통과 및 사각지대 탐색 시 시선 도약 속도와 사격 반응을 극대화하는 브라우저 게임.',
  genre: ['Action', '전술 훈련', '이스포츠 시각 훈련'],
  gamePlatform: ['Web Browser', 'Desktop'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '택티컬 슈팅 게임에서 각 지우기(코너 체킹)란 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '각 지우기는 복수의 위험 사선에 노출되지 않도록, 모퉁이를 돌 때 각도를 기하학적으로 미세하게 쪼개어 단 한 명의 적과만 1:1 교전을 성립시키는 전술적 클리어링 기법입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '파이 썰기(Slicing the Pie) 기법의 원리는 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '출입문이나 벽 모퉁이를 축으로 원호를 그리며 바깥쪽부터 한 조각씩 시야를 점진적으로 확보해 나가는 기술입니다. 적보다 사선 각도를 넓게 활용하여 우위를 확보합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '단속성 안구운동(사케드)이 코너 색적에 어떻게 기여하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '새로운 앵글이 드러날 때마다 안구는 20~40ms의 순간 도약(Rayner, 1998)을 실행하고 즉시 중심와 초점을 맞춰 위험 요소 유무를 검증합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '코너를 통과할 때 플레이어가 허무하게 잡히는 주된 원인은 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '각을 쪼개지 않고 한 번에 몸을 드러내어(오버 피킹) 여러 사선에 동시 노출되거나, 시야의 깊이를 탐색하지 않고 조준점만을 멍하니 응시하기 때문입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '프리 에임(Pre-aiming)과 각 지우기의 연관성은 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '벽 너머 적이 서 있을 헤드라인 높이에 조준선을 미리 거치해 두고 몸을 내미는 기술로, 적 발견 후 조준선을 끌어칠 필요가 없어 반응 시간을 물리적 한계치까지 단축합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '동적 도어웨이 색적 훈련은 어떤 방식으로 반응을 향상시키나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '연속 배치된 문틈에서 표적이 불규칙하게 튀어나오도록 설계되어, 시각적 각도 판별 속도와 조준선을 순간 정지시키는 제동력(Stopping Power)을 실전처럼 단련합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '돈더스(Donders, 1868)의 선택 반응 시간은 코너 클리어링과 어떤 관련이 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '단순 반응(약 200ms)과 달리, 여러 개의 문과 출구 중 어디서 적이 나타날지 모르는 상황은 뇌의 변별 및 선택 처리 과정이 추가되어 반응 지연이 길어지므로 집중적인 선택 반응 훈련이 필요합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '144Hz 이상의 고주사율 모니터가 각 지우기 반응에 미치는 영향은?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '144Hz~240Hz 디스플레이는 프레임 지연을 4~7ms 이내로 단축(Woods et al., 2015)하여, 문 모서리에서 적의 신체 실루엣이 나타나는 첫 프레임을 훨씬 빠르게 감지할 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '일일 권장 각 지우기 훈련 시간은 얼마나 되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '실제 랭크 매치 시작 전 10~15분 동안 진행하는 것이 가장 효과적입니다. 올바른 시각 탐색 습관이 뇌에 예열되어 무모한 돌진을 방지합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '이 훈련 도구는 완전 무료인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, SkillDrills의 모든 훈련 시스템은 별도의 다운로드나 회원가입, 결제 없이 웹 브라우저에서 100% 무료로 무제한 이용할 수 있습니다.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: '각 지우기 및 코너 체킹 훈련 방법',
  description: '모퉁이 클리어링, 파이 썰기 앵글 분할 및 도어웨이 색적 반응속도를 극대화하는 단계별 실천 가이드.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '도어웨이 기하학 분석 및 시선 도약 준비',
      text: '진입할 출입구와 벽 모서리의 위치 관계를 파악하고 순차적 탐색 사선의 우선순위를 설정합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/market-doors-pursuit#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '미세한 원호를 그리며 각 지우기(파이 썰기)',
      text: '모퉁이를 한 번에 돌지 않고, 미세한 조각 단위로 사선을 쪼개며 바깥쪽 시야부터 단계적으로 확보합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/market-doors-pursuit#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '문틈 돌발 표적 시각 포착',
      text: '출입문 안쪽에서 표적이 드러나는 즉시 머리를 흔들지 않고 시선 중심을 표적 실루엣에 신속히 고정합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/market-doors-pursuit#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: '결정적 중심 타격 및 에임 제동',
      text: '표적이 사선 영역을 벗어나기 전에 표적 중앙에 정확한 클릭 사격을 가하고 에임을 안정적으로 멈춥니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/market-doors-pursuit#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('rayner1998', 'donders1868', 'woods2015'),
  intro: {
    title: '각 지우기 연습 및 코너 체킹 클리어링 가이드',
    paragraphs: [
      '발로란트나 카운터스트라이크 같은 전술적 1인칭 슈터에서 승패를 가르는 가장 핵심적인 기량은 무모한 전진이 아닌 정교한 각 지우기(Angle Clearing)입니다. 각도를 쪼개지 않고 모퉁이를 통과하면 다수의 적 사선에 동시 노출되어 생존 확률이 급감합니다.',
      '파이 썰기(Slicing the Pie)는 엄폐물을 축으로 시야를 조각내어 진입하는 전술적 기본기입니다. 이때 시각계는 안구 도약(Rayner, 1998)과 중심와 안착을 초고속으로 반복하며 각 사선에 숨은 적의 유무를 판별합니다.',
      '신경심리학적으로 이는 표적의 유무와 위치를 판별하는 선택 반응 시간(Choice RT; Donders, 1868)의 영역입니다. 고주사율 디스플레이 환경(Woods et al., 2015)에서 지속적으로 연습하면 돌발 출현 표적에 대한 반사적 색적 및 정지 사격 능력이 극대화됩니다.',
    ],
  },
  benchmarks: {
    title: '각 지우기 및 코너 체킹 성능 기준표',
    headers: ['티어 단계', '랭크 분류', '각 식별 반응시간', '클리어링 정확도', '상위 백분위'],
    rows: [
      ['Tier 1', '신계・익스프레스 (Apex / Pro)', '< 160 ms', '98 %+', 'Top 1 %'],
      ['Tier 2', '엘리트 (Elite / Master)', '160 – 210 ms', '94 – 97 %', 'Top 5 %'],
      ['Tier 3', '프로 (Diamond / Platinum)', '211 – 270 ms', '88 – 93 %', 'Top 15 %'],
      ['Tier 4', '중급 (Gold / Silver)', '271 – 350 ms', '78 – 87 %', 'Top 50 %'],
      ['Tier 5', '초급 (Bronze / Novice)', '> 350 ms', '< 78 %', '기본'],
    ],
    note: '단속성 시각 탐색 및 선택 반응 문헌(Rayner, 1998; Donders, 1868)과 게이밍 하드웨어 입력 환경(Woods et al., 2015)에 근거한 기준치입니다.',
  },
  protocols: {
    title: '과학적 4단계 클리어링 훈련 프로토콜',
    description: '반복 가능한 전술적 탐색 습관 형성을 위한 체계적 지침.',
    items: [
      {
        title: '도어웨이 기하학 분석 및 시선 도약 준비',
        description: '진입할 출입구와 벽 모서리의 위치 관계를 파악하고 순차적 탐색 사선의 우선순위를 설정합니다.',
      },
      {
        title: '미세한 원호를 그리며 각 지우기(파이 썰기)',
        description: '모퉁이를 한 번에 돌지 않고, 미세한 조각 단위로 사선을 쪼개며 바깥쪽 시야부터 단계적으로 확보합니다.',
      },
      {
        title: '문틈 돌발 표적 시각 포착',
        description: '출입문 안쪽에서 표적이 드러나는 즉시 머리를 흔들지 않고 시선 중심을 표적 실루엣에 신속히 고정합니다.',
      },
      {
        title: '결정적 중심 타격 및 에임 제동',
        description: '표적이 사선 영역을 벗어나기 전에 표적 중앙에 정확한 클릭 사격을 가하고 에임을 안정적으로 멈춥니다.',
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

export default function KoreanMarketDoorsPursuitPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
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
      <MarketDoorsPursuitClient copy={{ title: '각 지우기 연습' }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="reaction-speed"
          currentHref="https://skilldrills.online/ko/drills/reaction-speed/market-doors-pursuit"
        />
      </div>
    </>
  );
}
