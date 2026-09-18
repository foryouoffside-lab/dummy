import KeyboardRecognitionClient from '@/app/drills/motor/movement-speed/keyboard-recognition/KeyboardRecognitionClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: '키보드 반응속도 테스트 – 온라인 키 입력 속도 측정 | SkillDrills',
  description: '무료 온라인 키보드 반응속도 테스트 및 키 바인드 훈련기. 화면의 키 프롬프트를 보고 즉각 타건하여 선택 반응 시간(Choice RT)과 키보드 머슬 메모리를 측정하세요.',
  keywords: [
    '키보드 반응속도 테스트',
    '키보드 반응속도 측정',
    '키 입력 속도 테스트',
    '키 바인드 연습',
    '게이밍 키보드 반응속도',
    '키보드 타건 반응속도',
    '선택 반응 시간 테스트',
    '키보드 머슬 메모리',
    '키보드 억제 제어 훈련',
    '발로란트 키 바인드 연습',
    '롤 스킬 키 반응속도',
    '타자 반응속도 측정',
  ],
  openGraph: {
    title: '키보드 반응속도 테스트 – 온라인 키 입력 속도 측정 | SkillDrills',
    description: '무료 온라인 키보드 반응속도 테스트 및 키 바인드 훈련기. 화면의 키 프롬프트를 보고 즉각 타건하여 선택 반응 시간(Choice RT)과 키보드 머슬 메모리를 측정하세요.',
    type: 'article',
    url: 'https://skilldrills.online/ko/drills/motor/movement-speed/keyboard-recognition',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '키보드 반응속도 테스트 – 온라인 키 입력 속도 측정 | SkillDrills',
    description: '무료 온라인 키보드 반응속도 테스트 및 키 바인드 훈련기.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/motor/movement-speed/keyboard-recognition',
    languages: getAlternateLanguages('/drills/motor/movement-speed/keyboard-recognition'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills', item: 'https://skilldrills.online/ko' },
    { '@type': 'ListItem', position: 2, name: '운동 제어 훈련', item: 'https://skilldrills.online/ko/drills/motor' },
    { '@type': 'ListItem', position: 3, name: '동작 속도', item: 'https://skilldrills.online/ko/drills/motor/movement-speed' },
    { '@type': 'ListItem', position: 4, name: '키보드 반응속도 테스트', item: 'https://skilldrills.online/ko/drills/motor/movement-speed/keyboard-recognition' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '키보드 반응속도 테스트 – 키 바인드 훈련기',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  description: '브라우저 기반 무료 키보드 반응속도 측정기. 선택 반응 시간(Choice RT), 키보드 공간 인지, 함정 프롬프트 억제 제어 능력을 과학적으로 측정합니다.',
  url: 'https://skilldrills.online/ko/drills/motor/movement-speed/keyboard-recognition',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '키보드 반응속도 테스트',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'HTML5 Canvas 및 JavaScript 지원 필요',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  url: 'https://skilldrills.online/ko/drills/motor/movement-speed/keyboard-recognition',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: '키보드 반응속도 테스트 – 온라인 키 바인드 훈련기',
  url: 'https://skilldrills.online/ko/drills/motor/movement-speed/keyboard-recognition',
  description: "힉의 법칙(Hick's Law)에 기반하여 시각적 키 프롬프트에 대응하는 선택 반응 시간을 측정합니다.",
  genre: ['Keyboard Game', 'Action', 'Esports Training'],
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
      name: '키보드 반응속도 테스트란 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '화면에 특정 키 프롬프트가 나타났을 때 해당 키를 실제로 누르기까지 걸리는 시간(지연시간)을 밀리초(ms) 단위로 측정하는 도구입니다. 선택 반응 시간, 키보드 자판 위치 인지력, 뇌의 억제 제어 능력을 종합 평가합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '발로란트나 오버워치 등 FPS 게임에 어떤 효과가 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '긴박한 교전 상황에서 스킬이나 투척물을 사용할 때 키보드를 내려다보지 않고 즉각 발동할 수 있습니다. 운동 피질의 시각-운동 결합을 자동화하여 망설임과 키 오입력을 완전히 배제합니다.',
      },
    },
    {
      '@type': 'Question',
      name: "선택 반응 시간(Choice RT)과 힉의 법칙(Hick's Law)은 무엇인가요?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: '힉의 법칙(Hick 1952)에 따르면 선택할 수 있는 대안의 수가 늘어날수록 반응 시간이 대수적으로 증가합니다. 키 바인드 머슬 메모리가 형성되면 대안 탐색 단계가 생략되어 단순 반사 수준으로 단축됩니다.',
      },
    },
    {
      '@type': 'Question',
      name: '페이크 프롬프트(함정 키) 메커니즘은 왜 존재하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '로건(Logan 1984)의 정지 신호 패러다임(Stop-Signal Task)에 기반한 운동 억제 제어 훈련입니다. 잘못된 신호에 손가락이 반사적으로 나가지 않도록 뇌 전두엽의 브레이크 신경망을 강화합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '게이밍 키 바인드의 정상 반응속도는 얼마인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '일반 사용자는 380~480 ms를 기록하며, 숙련된 게이머는 240~300 ms 수준입니다. 상위 1% 프로급 선수는 240 ms 미만의 초고속 반응속도와 98% 이상의 함정 억제율을 달성합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '연속 시퀀스 타건 모드는 무엇을 측정하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '3~5개의 연속 키 입력을 요구하는 모드로, 작업 기억(스턴버그 모형)과 모터 청킹 능력을 평가합니다. 개별 키를 하나씩 생각하지 않고 한 묶음의 연속 동작으로 실행하는 능력을 기릅니다.',
      },
    },
    {
      '@type': 'Question',
      name: '어떤 키보드가 측정에 가장 적합한가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '리니어 기계식, 광축, 또는 자석축(래피드 트리거 지원) 스위치와 1000Hz 이상의 USB 폴링레이트를 갖춘 게이밍 키보드가 하드웨어 디바운스 지연 없이 가장 신뢰도 높은 데이터를 제공합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '하루에 얼마나 연습하는 것이 좋은가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '하루 10~15분 동안 3~4세트로 나누어 집중 훈련하는 것이 좋습니다. 신경 피로가 누적되면 손가락 억제 제어력이 떨어져 오입력이 발생하므로 짧고 굵은 연습이 효과적입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '롤(LoL)이나 도타 2 같은 MOBA 게임에도 도움이 되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네. 스킬 연계(Q-W-E-R-D-F)와 아이템 액티브 스킬을 순간적으로 정확히 누르는 순발력과 독립적인 손가락 조작 능력이 향상됩니다.',
      },
    },
    {
      '@type': 'Question',
      name: 'KPM과 정확도는 어떻게 산출되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'KPM은 분당 유효 타건 수를 의미하며, 정확도는 전체 시도 횟수(오타 및 함정 실패 포함) 대비 올바르게 입력된 정타의 백분율로 계산됩니다.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: '키보드 반응속도 및 키 바인드 머슬 메모리 훈련 방법',
  description: '키보드 선택 반응속도와 반사 신경을 극대화하기 위한 단계별 트레이닝 가이드.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '게이밍 기본 손 위치 안착',
      text: '왼손 손가락을 WASD 또는 평소 게임에서 사용하는 기본 키 바인드 위치에 가볍게 올려놓습니다.',
      url: 'https://skilldrills.online/ko/drills/motor/movement-speed/keyboard-recognition#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '시각적 키 프롬프트 인식',
      text: '키보드를 내려다보지 않고 모니터 중앙을 응시하며 화면에 나타난 타깃 키를 즉각 인지합니다.',
      url: 'https://skilldrills.online/ko/drills/motor/movement-speed/keyboard-recognition#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '신속 타건 또는 반사적 억제',
      text: '해당 키를 정확하고 민첩하게 누릅니다. 함정(Fake Prompt)이 나타난 경우 즉시 손가락 움직임을 정지합니다.',
      url: 'https://skilldrills.online/ko/drills/motor/movement-speed/keyboard-recognition#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: '반응 지연시간 및 KPM 분석',
      text: '세션 종료 후 결과 카드에서 단일 키 지연시간, 타건 속도, 억제율 데이터를 확인하여 부족한 부분을 보완합니다.',
      url: 'https://skilldrills.online/ko/drills/motor/movement-speed/keyboard-recognition#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('donders1868', 'hick1952', 'logan1984', 'sternberg1966', 'woods2015'),
  intro: {
    title: '키보드 반응속도 측정의 과학적 체계',
    paragraphs: [
      '키보드 반응속도는 돈더스(Donders, 1868)의 선택 반응 시간 모델과 힉(Hick, 1952)의 대수 법칙을 기반으로 측정됩니다. 시각 자극 수용에 약 200~250ms가 소요되며, 반복 훈련을 통해 뇌의 자극-반응 매핑 단계를 자동화함으로써 불필요한 결정 지연을 압축할 수 있습니다.',
      '브라우저 측정 환경 특성: performance.now() 고해상도 타이머와 모니터 주사율에 의해 미세한 오차가 발생할 수 있으므로, 항상 동일한 하드웨어 환경에서 기록의 향상 추이를 점검하는 것이 바람직합니다.',
    ],
  },
  benchmark: {
    title: '키보드 반응속도 & 키 바인드 종합 벤치마크',
    description: '단일 키 선택 반응 지연시간, 연속 타건 속도(KPM), 함정 억제율을 기반으로 구성된 표준 성취도 구간입니다.',
    columns: ['등급 (Tier)', '호칭 (Rank)', '단일 키 반응 지연', '시퀀스 속도 (KPM)', '함정 억제율', '신경운동 제어 평가'],
    rows: [
      {
        tier: 'Tier 1',
        rank: 'Apex Keybinder',
        stat: '240 ms 미만',
        level: '320+ KPM',
        accuracy: '98–100%',
        percentile: '상위 1% (프로급 머슬 메모리)',
      },
      {
        tier: 'Tier 2',
        rank: 'Master Tactician',
        stat: '240–300 ms',
        level: '260–319 KPM',
        accuracy: '95–97%',
        percentile: '상위 5% (상급 전술 오퍼레이터)',
      },
      {
        tier: 'Tier 3',
        rank: 'Proficient Operator',
        stat: '300–380 ms',
        level: '200–259 KPM',
        accuracy: '90–94%',
        percentile: '상위 20% (숙련 게이머)',
      },
      {
        tier: 'Tier 4',
        rank: 'Intermediate Typist',
        stat: '380–480 ms',
        level: '140–199 KPM',
        accuracy: '80–89%',
        percentile: '일반 기준선',
      },
      {
        tier: 'Tier 5',
        rank: 'Novice Keybinder',
        stat: '480 ms 초과',
        level: '140 KPM 미만',
        accuracy: '80% 미만',
        percentile: '입문 단계',
      },
    ],
  },
  protocols: {
    title: '키 바인드 반응속도 향상 프로토콜',
    description: '운동 피질의 전도 속도 개선과 반응 억제력 강화를 위한 과학적 훈련 절차.',
    items: [
      {
        title: '프로토콜 1: 시각-자판 차단 훈련 (Donders 1868)',
        description: '시선을 모니터 중앙에 고정하고 고유수용성 감각만으로 자판 위치를 찾아 타건하세요. 내려다보는 습관을 없애면 지연시간이 100ms 이상 단축됩니다.',
      },
      {
        title: '프로토콜 2: 기능별 구역화 모델 (Hick 1952)',
        description: '자판을 이동 구역(WASD), 유틸리티 구역(Q, E, C, X), 숫자열(1~4)로 뇌 속에 구획화하여 선택 엔트로피를 최소화하세요.',
      },
      {
        title: '프로토콜 3: 정지 신호 억제 제어 (Logan 1984)',
        description: '함정 프롬프트가 등장했을 때 손가락이 스위치 입력점에 닿기 전 멈추는 브레이크 신경을 집중적으로 활성화하세요.',
      },
      {
        title: '프로토콜 4: 연속 시퀀스 청킹 (Sternberg 1966)',
        description: '다중 키 시퀀스는 개별 키로 분리하지 말고 전체 패턴을 하나의 음절처럼 단숨에 타건하여 연계 반응 속도를 끌어올리세요.',
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

export default function KoreanKeyboardRecognitionPage() {
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
      <KeyboardRecognitionClient />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/drills/motor/movement-speed/keyboard-recognition" />
      </div>
    </>
  );
}
