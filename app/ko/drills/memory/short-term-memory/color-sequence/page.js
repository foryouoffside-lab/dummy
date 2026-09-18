import ColorSequenceClient from '@/app/drills/memory/short-term-memory/color-sequence/ColorSequenceClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';

// ============================================================
// SEO EMPIRICAL RESEARCH FINDINGS — ko-KR (color-sequence)
// PRIMARY DOMESTIC: "사이먼 게임 온라인" — Core classic Simon memory game search
//                   "색깔 기억 게임" — High-demand domestic brain training query
// SECONDARY / LSI:
//                   "순서 기억력 테스트" — Sequence memory capacity test
//                   "단기기억력 테스트" — Short-term memory assessment
//                   "작업기억력 훈련" — Working memory cognitive training
//                   "시각 기억력 게임" — Visual memory game
//                   "시공간 메모장 훈련" — Baddeley visuospatial sketchpad
//                   "청킹 암기법 훈련" — Memory chunking strategy
//                   "색상 패턴 기억" — Chromatic pattern retention
//                   "사이먼 세이즈 게임" — Simon says game synonym
// WINNER TITLE:     사이먼 게임 – 온라인 색깔 순서 기억력 테스트 | SkillDrills (36 chars)
// ============================================================

export const metadata = {
  title: '사이먼 게임 – 온라인 색깔 순서 기억력 테스트 | SkillDrills',
  description: '무료 온라인 사이먼 게임(Simon Game). 화면에서 점차 늘어나는 색상과 소리의 순서를 기억하고 재현하여 시각적 작업 기억력의 한계를 테스트하세요.',
  keywords: [
    '사이먼 게임 온라인',
    '색깔 기억 게임',
    '순서 기억력 테스트',
    '단기기억력 테스트',
    '작업기억력 훈련',
    '시각 기억력 게임',
    '시공간 메모장 훈련',
    '청킹 암기법 훈련',
    '색상 패턴 기억',
    '사이먼 세이즈 게임',
    '두뇌 기억력 테스트',
    '순차적 기억 측정',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/memory/short-term-memory/color-sequence',
    languages: getAlternateLanguages('/drills/memory/short-term-memory/color-sequence'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: '사이먼 게임 – 온라인 색깔 순서 기억력 테스트 | SkillDrills',
    description: '무료 온라인 사이먼 게임(Simon Game). 화면에서 점차 늘어나는 색상과 소리의 순서를 기억하고 재현하여 시각적 작업 기억력의 한계를 테스트하세요.',
    url: 'https://skilldrills.online/ko/drills/memory/short-term-memory/color-sequence',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '사이먼 게임 – 온라인 색깔 순서 기억력 테스트 | SkillDrills',
    description: '무료 온라인 사이먼 게임(Simon Game). 화면에서 점차 늘어나는 색상과 소리의 순서를 기억하고 재현하여 시각적 작업 기억력의 한계를 테스트하세요.',
  },
};

const copyKo = {
  title: '사이먼 게임',
  subtitle: '색깔 순서 기억력 & 시각 작업기억 테스트',
  caption: '점차 길어지는 색상 신호의 순서를 집중해서 관찰하고, 기억하여 동일한 순서대로 입력하세요.',
  statScore: '점수',
  statTime: '남은 시간',
  statLevel: '레벨',
  statBestScore: '최고 점수',
  rulesTitle: '훈련 규칙 & 채점 시스템',
  rule1Text: '순서 재현 타건',
  rule1Highlight: '+100 PTS',
  rule1Result: '깜빡인 색상 시퀀스를 정확한 순서대로 클릭하여 입력',
  rule2Text: '레벨 상승 보너스',
  rule2Highlight: '+10% PTS / 레벨',
  rule2Result: '시퀀스가 길어질수록 더 높은 배율의 점수 획득',
  rule3Text: '오답 / 시간 초과',
  rule3Highlight: '-1 레벨',
  rule3Result: '점수나 시간 차감 없이 해당 난이도 재도전',
  rule4Text: '적응형 난이도 엔진',
  rule4Highlight: '실시간 가변',
  rule4Result: '플레이어의 성공 여부에 따라 시퀀스 길이가 지능적으로 조절',
  aboutTitle: '사이먼 게임 & 시각 작업기억 정보',
  overviewTitle: '색깔 순서 기억 훈련(사이먼 게임)이란?',
  overviewLead: '인간의 시각 작업 기억은 한 번에 약 4개의 단순한 항목만을 유지할 수 있으며, 이 한계는 대상의 복잡성이 아닌 개수에 의해 결정됩니다 (Luck & Vogel, 1997; Cowan, 2001). 점진적으로 길어지는 색상 시퀀스는 이 인지적 한계를 직접 시험합니다.',
  aboutCards: [
    { title: '추천 대상', text: '학습 효율과 집중력을 높이고자 하는 학생, 두뇌 회전과 작업 기억 용량을 단련하려는 성인 및 게이머.' },
    { title: '단련되는 인지 능력', text: '단기 시각 기억력, 작업 기억 지속력, 시공간 메모장(Baddeley & Hitch, 1974) 순차 부호화, 순간 주의 집중력.' },
    { title: '청킹(Chunking) 암기 전략', text: '개별 색상을 2~3개씩 묶음(예: 빨강-파랑)으로 묶어 4개 용량 한계를 뛰어넘는 전략적 부호화 습득 (Miller, 1956).' },
  ],
};

export default function KoreanColorSequencePage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'SkillDrills 홈', item: 'https://skilldrills.online/ko' },
      { '@type': 'ListItem', position: 2, name: '기억력 훈련', item: 'https://skilldrills.online/ko/drills/memory' },
      { '@type': 'ListItem', position: 3, name: '단기 기억력', item: 'https://skilldrills.online/ko/drills/memory/short-term-memory' },
      { '@type': 'ListItem', position: 4, name: '사이먼 게임', item: 'https://skilldrills.online/ko/drills/memory/short-term-memory/color-sequence' },
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: '사이먼 게임 온라인 – 색깔 순서 기억력 테스트',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web Browser',
    dateModified: '2026-09-15',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
    description: '무료 온라인 사이먼 게임. 시각 작업기억 용량, 연속 패턴 부호화, 청킹 전략, 집중력 한계를 측정하고 훈련합니다.',
    genre: 'Cognitive Training / Visual Working Memory',
    url: 'https://skilldrills.online/ko/drills/memory/short-term-memory/color-sequence',
    publisher: {
      '@type': 'Organization',
      name: 'SkillDrills',
      url: 'https://skilldrills.online',
    },
  };

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: '사이먼 게임 온라인',
    url: 'https://skilldrills.online/ko/drills/memory/short-term-memory/color-sequence',
    description: '6가지 다채로운 색상과 사운드로 시각 작업기억과 순서 기억을 단련하는 무료 브라우저 사이먼 게임.',
    dateModified: '2026-09-15',
    applicationCategory: 'GameApplication',
    operatingSystem: 'All',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  };

  const videoGameSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: '사이먼 게임 – 색깔 순서 기억력 테스트',
    url: 'https://skilldrills.online/ko/drills/memory/short-term-memory/color-sequence',
    description: '빛과 소리의 순서를 기억하여 따라 누르는 클래식 전자 두뇌 기억력 게임.',
    genre: ['Memory Game', 'Brain Training', 'Puzzle'],
    gamePlatform: ['Web Browser', 'Mobile', 'Tablet', 'Desktop'],
    applicationCategory: 'Game',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '사이먼 게임(Simon Game)이란 무엇이며 어떻게 진행되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '사이먼 게임은 1978년 개발된 전설적인 전자 기억력 게임입니다. 시스템이 제시하는 색상과 소리의 신호 순서를 관찰한 뒤, 동일한 순서대로 버튼을 눌러 재현합니다. 매 라운드마다 시퀀스가 한 단계씩 길어지며 기억력의 한계에 도전합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '색상 순서를 기억할 때 뇌의 어떤 부위와 인지 기능이 활성화되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '배들리와 히치(Baddeley & Hitch, 1974)의 작업 기억 모델 중 시공간 메모장(Visuospatial Sketchpad)과 음운 루프(Phonological Loop)가 동시에 활성화됩니다. 또한 전두엽의 집행 제어 기능이 작동하여 연속 자극을 부호화하고 인출합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '러크와 보겔(1997)의 4개 항목 기억 한계란 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '스티븐 러크와 에드워드 보겔의 네이처(Nature) 논문에 따르면, 인간의 시각 작업 기억은 개별적 정보 단위 약 3~4개 수준에서 포화 상태에 도달합니다. 따라서 순서가 5개를 넘어가면 의식적인 암기 전략 없이는 오류율이 급격히 증가합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '청킹(Chunking) 암기법이란 무엇이며 게임에서 어떻게 활용하나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '청킹은 개별 정보를 의미 있는 덩어리로 묶는 기억 기술입니다 (Miller, 1956). 예를 들어 빨강, 파랑, 노랑, 초록을 개별적으로 기억하지 않고 "빨강-파랑" 한 묶음, "노랑-초록" 한 묶음으로 2개의 청크로 압축하면 기억 부하가 절반으로 줄어듭니다.',
        },
      },
      {
        '@type': 'Question',
        name: '클래식 4색 게임과 달리 6가지 색상을 사용하는 이유는 무엇인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '기존의 4가지 색상(빨강, 파랑, 초록, 노랑)에 보라색과 주황색을 추가하여 선택 엔트로피를 높였습니다. 이를 통해 숙련된 게이머와 성인 사용자에게 더 깊은 수준의 시각적 식별과 작업 기억 부하를 제공합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '순서를 틀리거나 시간이 초과되면 점수 페널티가 있나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '아니요, 점수나 시간 감소 페널티는 없습니다. 순서를 틀리면 적응형 시스템이 시퀀스 길이를 1단계 낮추어 재도전할 수 있게 하므로 스트레스 없이 지속적인 훈련이 가능합니다.',
        },
      },
      {
        '@type': 'Question',
        name: '어느 정도 레벨이나 점수를 달성해야 상위권인가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '레벨 5~7(5~7자리 순서 기억)은 일반적인 건강한 성인의 표준입니다. 레벨 8~10은 우수한 기억력, 레벨 11 이상(1,500점 이상)은 전략적 청킹과 고도의 집중력을 보유한 상위 1% 엘리트 수준입니다.',
        },
      },
      {
        '@type': 'Question',
        name: '이 훈련이 일상생활의 건망증 개선에도 도움이 되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 도움이 됩니다. 시각적 연속 정보를 신속하게 부호화하고 유지하는 훈련은 전화번호, 인증번호 암기, 길 찾기, 업무 절차 수행 등 일상적인 단기 기억력과 업무 처리 효율을 높여줍니다.',
        },
      },
      {
        '@type': 'Question',
        name: '모바일 스마트폰이나 태블릿에서도 원활하게 터치 플레이가 가능한가요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '네, 반응형 웹 터치 인터페이스에 완벽하게 최적화되어 있어 스마트폰, 태블릿, PC 브라우저 어디서나 지연 없이 즉각적인 터치와 클릭으로 플레이할 수 있습니다.',
        },
      },
      {
        '@type': 'Question',
        name: '이 사이먼 게임은 완전 무료인가요? 점수가 외부에 공개되나요?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '완전 무료이며 회원가입이나 앱 다운로드가 전혀 필요 없습니다. 최고 점수와 훈련 통계는 브라우저의 로컬 저장소(localStorage)에만 안전하게 저장됩니다.',
        },
      },
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: '사이먼 게임 색깔 순서 기억 훈련 가이드',
    description: '4단계를 거쳐 시각적 작업 기억력과 시퀀스 패턴 기억 능력을 극대화하는 훈련법.',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: '깜빡이는 색상 순서 집중 관찰',
        text: '세션을 시작하고 화면에서 순서대로 점등되는 색상과 신호음을 주의 깊게 응시합니다.',
        url: 'https://skilldrills.online/ko/drills/memory/short-term-memory/color-sequence#step-1',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: '색상 패턴을 2~3개 단위 청크로 묶기',
        text: '불빛의 순서를 머릿속으로 소리 내거나 도형 궤적으로 묶어 청크(Chunk)를 형성합니다.',
        url: 'https://skilldrills.online/ko/drills/memory/short-term-memory/color-sequence#step-2',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: '기억한 순서대로 정확하게 터치',
        text: '입력 신호가 켜지면 방금 본 순서 그대로 색상 버튼을 차례대로 누릅니다.',
        url: 'https://skilldrills.online/ko/drills/memory/short-term-memory/color-sequence#step-3',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: '레벨을 높여 최고 점수 갱신',
        text: '성공할 때마다 한 단계씩 길어지는 고난도 시퀀스를 돌파하며 최고 기록을 달성합니다.',
        url: 'https://skilldrills.online/ko/drills/memory/short-term-memory/color-sequence#step-4',
      },
    ],
  };

  const sequenceGuide = {
    heading: '사이먼 게임 색상 시퀀스 훈련 & 시각 작업기억 신경과학',
    intro: [
      '색상 순서를 기억하고 재현하는 과제는 인간의 시각적 및 연속적 작업 기억(Working Memory)을 측정하는 가장 검증된 인지 심리학적 도구 중 하나입니다. 1978년 랄프 베어(Ralph H. Baer)에 의해 개발된 전자식 사이먼 게임을 원형으로 하여, 감각 입력의 순간적인 부호화와 인출을 시험합니다.',
      '이 훈련의 핵심 신경 기전은 앨런 배들리(Baddeley & Hitch, 1974)의 시공간 메모장(Visuospatial Sketchpad)에 있습니다. 스티븐 러크 & 에드워드 보겔(Luck & Vogel, 1997)과 넬슨 코완(Cowan, 2001)의 기념비적 연구는 인간 작업 기억의 자연적 용량 한계가 약 3~4개의 정보 단위에 불과하다고 밝혔습니다.',
      '따라서 5단계 이상의 긴 시퀀스를 성공시키기 위해서는 조지 밀러(Miller, 1956)의 청킹(Chunking) 기술이 필수적입니다. 개별 자극을 2~3개의 복합 덩어리로 묶고 고유한 리듬이나 공간적 궤적으로 변환함으로써 한정된 두뇌 버퍼의 한계를 극복합니다.',
      'SkillDrills는 고해상도 performance.now() API를 통해 밀리초 단위 정밀 타이밍과 실시간 적응형 레벨링을 제공합니다 (Woods et al., 2015).'
    ],
    benchmarks: {
      title: '사이먼 게임 & 순서 기억력 종합 벤치마크 (45초 세션 기준)',
      headers: ['성능 등급', '달성 레벨', '기록 점수 (45s)', '암기 전략 및 인지 신경 평가'],
      rows: [
        ['Tier 1 (그랜드마스터 / 엘리트 기억력)', 'Level 11 이상', '1,500 PTS 초과', '탁월한 다중 모달 청킹; 시각과 리듬 음운 루프의 완벽한 결합'],
        ['Tier 2 (상급자 / 토너먼트 수준)', 'Level 8 – 10', '1,100 – 1,499 PTS', '코완의 4개 용량 한계를 완전히 극복; 안정적인 2~3개 단위 청킹 구사'],
        ['Tier 3 (중급 / 건강한 성인 표준)', 'Level 5 – 7', '700 – 1,099 PTS', '일반적인 건강한 단기 작업 기억력; 빠른 색상 전환 시 약간의 망설임'],
        ['Tier 4 (초급 / 기본 기억 용량)', 'Level 3 – 4', '350 – 699 PTS', '자연적 작업 기억 한계선 도달; 체계적 청킹 기법 미적용'],
        ['Tier 5 (입문자 / 높은 망각률)', 'Level 3 미만', '350 PTS 미만', '3개 이상 연속 체인 유지의 어려움; 시각적 잔상 혼선']
      ],
      note: '본 벤치마크는 6가지 다채로운 색상 체계와 45초 타이머 환경을 기준으로 도출된 표준 지표입니다 (Luck & Vogel, 1997; Cowan, 2001; Woods et al., 2015).'
    },
    techniques: {
      title: '긴 시퀀스를 기억하기 위한 4가지 과학적 기억 전략',
      items: [
        {
          name: '리듬 청킹 기법 (밀러의 정보 묶기)',
          desc: '색상을 낱개로 기억하지 말고 리듬감 있는 묶음으로 암기하세요. 머릿속으로 "빨강-파랑 ... 초록-노랑"과 같이 일정한 박자에 맞추어 호흡합니다.',
          tips: '시퀀스가 4개를 넘어가면 무조건 2개 또는 3개 단위로 묶어 처리하세요.'
        },
        {
          name: '기하학적 공간 궤적 시각화',
          desc: '불빛이 들어오는 위치를 머릿속에서 하나의 선으로 연결해 삼각형, 다이아몬드, 지그재그 등 하나의 기하학적 도형으로 형상화하세요.',
          tips: '두정엽의 공간 기억 회로는 추상적인 색상 이름보다 위치 궤적을 훨씬 오래 기억합니다.'
        },
        {
          name: '소리 음계의 청각 보조 채널 활용',
          desc: '각 색상 버튼은 고유한 신디사이저 음을 냅니다. 눈으로 보는 동시에 들리는 멜로디의 높낮이를 기억하면 청각 음운 루프가 보조 기억 장치로 작동합니다.',
          tips: '사운드를 켜고 플레이하여 시각과 청각의 이중 부호화(Dual Coding) 효과를 극대화하세요.'
        },
        {
          name: '시퀀스 끝자리에 주의 집중',
          desc: '앞선 색상들은 매 라운드 반복됩니다. 앞부분은 익숙한 패턴으로 굳히고, 주의 집중의 80%는 새로 추가되는 마지막 불빛에 쏟으세요.',
          tips: '이미 외운 앞부분에 불필요한 집중력을 낭비하지 않는 것이 핵심입니다.'
        }
      ]
    },
    steps: [
      '45초 세션을 시작하고 원형 색상 패널 중앙을 주시합니다.',
      '순서대로 점등되는 빛과 사운드 시퀀스를 집중해서 관찰합니다.',
      '머릿속에서 패턴을 리듬감 있는 2~3개 단위 청크로 재구성합니다.',
      '입력 차례가 오면 망설이지 않고 기억한 순서대로 색상을 클릭합니다.',
      '레벨을 계속 끌어올려 더 긴 체인을 완성하고 최고 점수를 갱신합니다.'
    ],
    audience: '시험 대비 기억력 향상이 필요한 학생, 시각적 순간 포착과 반응을 높이려는 게이머, 뇌 건강과 집중력을 강화하려는 성인.',
    faqs: faqSchema.mainEntity.map((q) => ({ q: q.name, a: q.acceptedAnswer.text })),
    sources: pickSources('cowan2001', 'luck1997', 'baddeley1974', 'miller1956', 'woods2015'),
    related: [
      { href: '/ko/drills/memory/working-memory/n-back', label: '듀얼 N-백 작업기억 훈련' },
      { href: '/ko/drills/memory/short-term-memory/digit-span', label: '디지트 스팬 숫자 기억 테스트' },
      { href: '/ko/drills/memory/spatial-memory/grid-memorization', label: '격자 공간 기억력 훈련' },
      { href: '/ko/drills/cognitive/focus/concentration-grid', label: '슐테 테이블 집중력 격자' },
      { href: '/ko/drills/cognitive/focus/distraction-fighter', label: '스트룹 검사 인지 억제 훈련' }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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
      <ColorSequenceClient copy={copyKo} />
      <DrillGuide guide={sequenceGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/short-term-memory/color-sequence"
          locale="ko"
        />
      </div>
    </>
  );
}
