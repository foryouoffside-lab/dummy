import SteadyHandClient from '@/app/drills/motor/precision-control/steady-hand/SteadyHandClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — steady-hand (Korean: 전기충격 미로게임 / 손떨림 테스트)
// PRIMARY:  "전기충격 미로게임"              — Authentic Korean game intent
//           "손떨림 테스트"                  — High intent diagnostic query
// SECONDARY / LSI:
//           "마우스 정밀도 테스트"            — Precision benchmark query
//           "마우스 컨트롤 연습"              — Motor control practice
//           "에임 안정성 테스트"              — Esports stability search
//           "마우스 미로 통과 게임"          — Corridor navigation game
//           "미세 운동 신경 조절"            — Fine motor control query
//           "스티어링 법칙"                  — Accot-Zhai Steering Law
// ============================================================

export const metadata = {
  title: '전기충격 미로게임 – 무료 온라인 손떨림 & 마우스 정밀도 테스트',
  description: '벽에 닿지 않고 좁아지는 미로 통로를 탈출하는 무료 전기충격 미로게임. 생리적 손떨림 억제와 마우스 미세 운동 조절 능력을 정밀하게 측정합니다. 아콧-자이 스티어링 법칙 적용.',
  keywords: [
    '전기충격 미로게임',
    '손떨림 테스트',
    '마우스 정밀도 테스트',
    '마우스 컨트롤 연습',
    '에임 안정성 테스트',
    '마우스 미로 통과 게임',
    '손떨림 측정',
    '미세 운동 신경 조절',
    '스티어링 법칙',
    '정밀 마우스 제어',
    'FPS 미세 에임 연습',
    '손의 안정성 훈련',
  ],
  openGraph: {
    title: '전기충격 미로게임 – 무료 온라인 손떨림 & 마우스 정밀도 테스트 | SkillDrills',
    description: '벽에 닿지 않고 좁아지는 미로 통로를 탈출하는 무료 전기충격 미로게임. 생리적 손떨림 억제와 마우스 미세 운동 조절 능력을 정밀하게 측정합니다. 아콧-자이 스티어링 법칙 적용.',
    type: 'article',
    url: 'https://skilldrills.online/ko/drills/motor/precision-control/steady-hand',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '전기충격 미로게임 – 무료 온라인 손떨림 & 마우스 정밀도 테스트 | SkillDrills',
    description: '벽에 닿지 않고 좁아지는 미로 통로를 탈출하는 무료 전기충격 미로게임. 생리적 손떨림 억제와 마우스 미세 운동 조절 능력을 정밀하게 측정합니다. 아콧-자이 스티어링 법칙 적용.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/motor/precision-control/steady-hand',
    languages: getAlternateLanguages('/drills/motor/precision-control/steady-hand'),
  },
};

// --- Structured Data ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '홈', item: 'https://skilldrills.online/ko' },
    { '@type': 'ListItem', position: 2, name: '운동 훈련', item: 'https://skilldrills.online/ko/drills/motor' },
    { '@type': 'ListItem', position: 3, name: '정밀 제어', item: 'https://skilldrills.online/ko/drills/motor/precision-control' },
    { '@type': 'ListItem', position: 4, name: '전기충격 미로게임', item: 'https://skilldrills.online/ko/drills/motor/precision-control/steady-hand' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '전기충격 미로게임 – 마우스 정밀도 및 손떨림 측정기',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  description: '브라우저에서 바로 즐기는 무료 온라인 전기충격 미로게임. 좁아지는 통로를 벽에 닿지 않고 통과하여 생리적 손떨림 억제력과 마우스 미세 운동 정밀도를 측정합니다.',
  url: 'https://skilldrills.online/ko/drills/motor/precision-control/steady-hand',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online/ko' },
  dateModified: '2026-09-05',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '전기충격 미로게임 온라인',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'HTML5 Canvas 및 고속 포인터 이벤트를 지원하는 최신 웹 브라우저',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  url: 'https://skilldrills.online/ko/drills/motor/precision-control/steady-hand',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: '전기충격 미로게임 & 마우스 정밀 제어 드릴',
  url: 'https://skilldrills.online/ko/drills/motor/precision-control/steady-hand',
  description: '벽에 닿지 않고 커서를 통과시키는 온라인 미로 게임. 미세 운동 조절력과 손떨림 저항성을 측정 및 단련합니다.',
  genre: ['Precision Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' }
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '전기충격 미로게임이란 무엇이며 어떤 운동 능력을 측정하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '전기충격 미로게임(Steady Hand Game)은 구불구불한 좁은 통로의 벽에 닿지 않고 커서를 골인 지점까지 조작하는 신경 운동 정밀도 테스트입니다. 단순 반사 신경이 아닌, 시각 피드포워드 제어, 8~12Hz 생리적 손떨림 억제력, 통로 협소화에 따른 미세 궤적 유지력을 측정합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '좁은 통로를 통과할 때 마우스 이동을 지배하는 과학적 법칙은 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '경계로 제한된 좁은 통로를 통과하는 운동 시간은 조니 아콧과 슈민 자이(Accot & Zhai, 1997)의 스티어링 법칙(Steering Law)에 의해 지배됩니다. 통과 시간은 경로 길이를 통로 폭으로 적분한 값에 비례하므로, 통로 폭이 좁아질수록 벽 충돌을 피하기 위해 물리적으로 속도를 줄여야 합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '통로 벽에 닿으면 커서가 왜 시작 지점으로 즉시 리셋되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '엔진은 포인터 좌표와 통로 중심선 사이의 유클리드 거리를 밀리초 단위로 계산합니다. 허용 반폭을 벗어나는 즉시 경계 충돌로 판정되어 시작점으로 강제 초기화되며, 이를 통해 타협 없는 제로 톨러런스 미세 제어 능력을 훈련합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '랩을 클리어할수록 난이도와 통로 폭은 어떻게 변화하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '1단계는 50픽셀의 여유로운 통로 폭으로 시작하지만, 매 랩을 완주할 때마다 통로 폭이 점진적으로 좁아져 레벨 12 이상에서는 12픽셀의 극도로 좁은 슬릿 통로로 압축됩니다. 굴곡의 각도 또한 급격해집니다.',
      },
    },
    {
      '@type': 'Question',
      name: '마우스 조작 중 손떨림이 발생하는 원인은 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '정상적인 사람이라도 운동 단위의 동기 발화와 사지의 기계적 공진으로 인해 8~12Hz 주기의 생리적 진전(손떨림)이 발생합니다. 마우스를 너무 세게 쥐거나(길항근 과긴장), 심리적 긴장 또는 카페인 섭취 시 진전 진폭이 증폭되어 벽 충돌을 유발합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '전기충격 미로게임에 가장 적합한 마우스 그립법과 DPI 설정은 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '팔 전체의 부드러운 글라이딩과 손가락 끝의 미세 제어가 조화되는 핑거팁 또는 클로 그립이 추천됩니다. DPI는 400~800 DPI 범위의 저감도로 설정하여 미세 떨림으로 인한 커서 요동을 물리적으로 흡수하는 것이 유리합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '우드워스의 2요소 운동 모델(1899)은 이 게임에 어떻게 적용되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '로버트 우드워스는 목표를 향한 손 움직임이 초기 탄도성 추진과 후속 피드백 기반 현재 제어(Current Control)로 나뉜다고 규명했습니다. 미로 통로 주행은 시각 피드백으로 벽과의 거리를 실시간 계산하여 미세 보정하는 폐루프 현재 제어가 연속적으로 작동합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '손떨림 억제 훈련이 게이머, 일러스트레이터, 의사에게 실질적인 도움이 되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '그렇습니다. FPS 게임의 미세 트래킹 에임, 디지털 펜 드로잉의 깔끔한 선화 작업, 복강경 및 미세 수술 집도 등 미세한 손떨림을 억제하고 좁은 궤적을 유지해야 하는 모든 정밀 작업에 직접적인 신경 가소성 향상을 제공합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '장시간 연습 시 손목 통증과 근육 경련을 방지하는 팁이 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '팔꿈치를 90도로 받치고 마우스 피트를 책상에 과도하게 내리누르지 않아야 합니다. 급커브에 진입하기 전 의식적으로 숨을 내쉬어 어깨와 전완근의 힘을 빼고, 1세트마다 손목 스트레칭을 병행하세요.',
      },
    },
    {
      '@type': 'Question',
      name: '트랙볼 마우스나 타블렛 펜(스타일러스)으로도 진행할 수 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네. W3C 포인터 이벤트 표준을 완벽히 지원하므로 고정밀 광학 마우스는 물론 트랙볼, 액정 타블렛 펜으로도 직접 조작하여 디바이스별 손떨림 안정성을 테스트할 수 있습니다.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: '전기충격 미로게임으로 마우스 정밀도와 손떨림을 훈련하는 방법',
  description: '좁아지는 코스를 벽 접촉 없이 완주하고 스티어링 효율을 극대화하는 단계별 프로토콜.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      url: 'https://skilldrills.online/ko/drills/motor/precision-control/steady-hand#step-1',
      name: '시작 존에 커서 위치',
      text: '「훈련 시작」을 누른 뒤 좌측의 녹색 출발 영역에 마우스 포인터를 올려 45초 타이머와 발광 통로를 활성화합니다.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      url: 'https://skilldrills.online/ko/drills/motor/precision-control/steady-hand#step-2',
      name: '등속의 매끄러운 궤적으로 전진',
      text: '발광하는 청색 통로를 따라 커서를 부드럽게 미끄러뜨립니다. 제한 시간과 벽 충돌 위험 사이의 균형을 유지합니다.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      url: 'https://skilldrills.online/ko/drills/motor/precision-control/steady-hand#step-3',
      name: '급커브 진입 전 감속 및 시선 선행',
      text: '헤어핀 곡선에 진입하기 전 속도를 약 40% 줄이고, 커서의 20~30픽셀 전방을 주시하여 시각 피드백 보정을 선제적으로 수행합니다.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      url: 'https://skilldrills.online/ko/drills/motor/precision-control/steady-hand#step-4',
      name: '골인 존 도달로 폭 협소화 단계 진입',
      text: '우측 녹색 골인 영역에 도달하면 랩이 완료되고 타이머가 리셋되며, 통로 폭이 12픽셀까지 축소되는 고난도 스테이지로 전환됩니다.',
    },
  ],
};

const guideProps = {
  sources: pickSources('accot1997', 'woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: '손떨림과 미세 제어 능력의 측정 원리와 한계',
    paragraphs: [
      '측정 정밀도와 하드웨어적 한계: 본 드릴의 시간 측정은 브라우저의 performance.now() API(스펙터 완화책으로 약 1ms 해상도로 양자화)를 사용합니다. 시각적 렌더링은 모니터 주사율에 의해 60Hz에서 약 16.7ms, 144Hz에서 약 6.9ms, 240Hz에서 약 4.1ms 주기로 갱신됩니다(Woods et al., 2015). 마우스 폴링레이트는 125Hz에서 약 8ms, 1000Hz에서 약 1ms의 딜레이를 유발합니다. 5ms 미만의 차이는 측정 노이즈로 간주하고 타인의 장비와 비교하기보다 동일 환경에서 자신의 기록 추세를 비교 분석하십시오. SkillDrills는 모든 점수를 브라우저 로컬 저장소에만 안전하게 기록하며 외부 서버로 수집하지 않습니다.',
    ],
  },
  benchmark: {
    title: '전기충격 미로게임 스티어링 기준치',
    description: '자신의 결과를 객관적으로 분석하기 위한 기준표입니다. 인구 통계 데이터가 아닌 Accot & Zhai(1997)의 스티어링 모델에 근거한 기준입니다. 클리어 레벨, 통로 폭, 중심선 평균 편차를 바탕으로 손의 안정성을 등급화합니다.',
    columns: ['티어', '칭호', '클리어 레벨', '통로 폭', '평균 편차', '판정 구간'],
    rows: [
      {
        tier: 'Tier 1',
        rank: '신경외과 전문의 (Apex Surgeon)',
        stat: '레벨 12+',
        level: '12–15 px',
        accuracy: '2.5 px 미만',
        percentile: '초인적 정밀도 (상위 1%)',
      },
      {
        tier: 'Tier 2',
        rank: '마스터 내비게이터',
        stat: '레벨 9–11',
        level: '16–22 px',
        accuracy: '4.0 px 미만',
        percentile: '프로급 안정성 (상위 5%)',
      },
      {
        tier: 'Tier 3',
        rank: '숙련된 조타수',
        stat: '레벨 6–8',
        level: '23–32 px',
        accuracy: '6.5 px 미만',
        percentile: '우수한 제어력 (상위 25%)',
      },
      {
        tier: 'Tier 4',
        rank: '일반 커서 조작',
        stat: '레벨 3–5',
        level: '33–42 px',
        accuracy: '9.0 px 미만',
        percentile: '평균 수준',
      },
      {
        tier: 'Tier 5',
        rank: '초보 및 진전 감지',
        stat: '레벨 1–2',
        level: '43–50 px',
        accuracy: '9.0 px 초과',
        percentile: '훈련 시작 단계',
      },
    ],
  },
  protocols: {
    title: '손떨림 억제 및 미세 조타 훈련 프로토콜',
    description: '생리적 진전을 억제하고 좁은 통로에서 속도와 정확성을 극대화하기 위한 전문 지침입니다.',
    items: [
      {
        title: '프로토콜 1: 아콧-자이 스티어링 법칙 속도 조절 (통로 폭 페이싱)',
        description: 'Accot-Zhai(1997) 법칙에 따르면 제한된 터널 주행 속도는 통로 폭에 반비례해야 합니다. 넓은 구간에서는 신속히 이동하여 시간을 비축하고, 좁은 헤어핀 구간 진입 시 속도를 40% 이상 감속하여 벽 충돌을 방지하세요.',
      },
      {
        title: '프로토콜 2: 우드워스 시선 선행 피드포워드 추종',
        description: 'Robert S. Woodworth(1899)의 현재 제어 모델에 근거하여, 커서 위치가 아닌 커서 전방 20~30픽셀 앞을 시선으로 리드합니다. 이 선행 추종을 통해 시각 피질이 약 150ms의 지연을 극복하고 벽에 부딪히기 전 미세 궤도 수정을 완수합니다.',
      },
      {
        title: '프로토콜 3: 생리적 진전(8~12Hz) 억제와 관절 분리',
        description: '완만한 곡선은 팔꿈치와 전완근의 글라이딩으로 그리고, 손가락은 중심선 미세 보정에만 국한합니다. 마우스를 너무 꽉 쥐면 주동근과 길항근이 동시 수축하여 8~12Hz 생리적 진전이 증폭되므로 의식적으로 힘을 빼야 합니다.',
      },
      {
        title: '프로토콜 4: 협소 구간 에이펙스(인코스) 코너링',
        description: '레벨 6 이후(통로 폭 30px 미만)에서는 속도보다 기하학적 중심 유지가 최우선입니다. 코너 회전 시 살짝 인코스 안쪽 정점(Apex)을 타면 급회전 시 커서가 원심력으로 바깥쪽 벽에 부딪히는 현상을 완벽히 방어할 수 있습니다.',
      },
    ],
  },
  faqs: {
    title: '전기충격 미로게임 및 손떨림 측정에 관한 자주 묻는 질문(FAQ)',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

const koCopy = {
  h1Keyword: '전기충격 미로게임',
  h1Suffix: ' (손떨림 & 마우스 정밀도 테스트)',
  caption: '전기충격 미로게임은 벽에 단 한 번도 닿지 않고 좁아지는 발광 통로를 따라 커서를 골인 지점까지 인도하여 마우스 미세 운동 조절력과 손떨림 안정성을 측정합니다. 아콧-자이 스티어링 법칙(1997)과 우드워스 폐루프 피드백 모델(1899)에 기반합니다.',
  statLaps: '클리어 랩',
  statTime: '남은 시간',
  statStreak: '연속 통과',
  statBest: '최고 기록',
  pausedTitle: '일시 중지됨',
  pausedPrompt: '화면을 클릭하여 커서를 고정하고 게임을 재개하세요.',
  startTitle: '전기충격 미로게임',
  startSubtitle: '마우스 미세 운동 정밀도 & 통로 협소화 • 45초 제한',
  startBtn: '훈련 시작',
  countdownSubtitle: '집중하세요',
  newBest: '신기록 달성',
  errorsLabel: '벽 충돌 횟수',
  maxStreakLabel: '최대 연속 랩',
  difficultyLabel: '도달 레벨',
  trainAgain: '다시 도전',
  shareTitle: '점수 공유',
  exitTitle: '종료 및 복귀',
  rulesTitle: '조작 방법 및 스코어 판정',
  rulesItems: [
    { num: '1', text: '발광하는 에메랄드', highlight: '미로 통로를 정확히 추종', result: '골인 도달 시 45초로 시간 리셋' },
    { num: '2', text: '랩 클리어', highlight: '무한 난이도 상승', result: '통로 폭 축소 및 급커브 증가' },
    { num: '3', text: '벽 접촉 시', highlight: '시작 지점 즉시 리셋', result: '랩 무효화 및 에러 카운트 증가' },
    { num: '4', text: '정밀 마우스 조작', highlight: 'PC 환경 권장', result: '1:1 원본 마우스 입력 반영' },
  ],
  rule1Text: '발광하는 에메랄드',
  rule1Highlight: '미로 통로를 정확히 추종',
  rule1Result: '골인 도달 시 45초로 시간 리셋',
  rule2Text: '랩 클리어',
  rule2Highlight: '무한 난이도 상승',
  rule2Result: '통로 폭 축소 및 급커브 증가',
  rule3Text: '벽 접촉 시',
  rule3Highlight: '시작 지점 즉시 리셋',
  rule3Result: '랩 무효화 및 에러 카운트 증가',
  rule4Text: '정밀 마우스 조작',
  rule4Highlight: 'PC 환경 권장',
  rule4Result: '1:1 원본 마우스 입력 반영',
  aboutTitle: '전기충격 미로게임(Steady Hand Drill) 정보',
  aboutHeading: '연속 궤적 추종 정밀도와 생리적 손떨림 억제',
  aboutP1: '전기충격 미로게임은 눈과 손의 협응력, 손가락의 정밀한 미세 운동 제어, 부드러운 포인터 트래킹 안정성을 극대화하는 전문 트레이닝 툴입니다. 좁아지는 미로 통로를 벽 접촉 없이 통과함으로써 마우스 에이밍에 핵심적인 전완근과 손목의 미세 안정화 근육을 강화합니다.',
  aboutP2: 'Johnny Accot & Shumin Zhai(1997)의 스티어링 법칙에 따르면 터널 통과 시간은 경로 길이를 폭으로 나눈 적분값에 비례합니다. 50px에서 12px까지 좁아지는 통로에서 실시간 시각 피드백(Woodworth, 1899)과 손떨림 억제 능력을 극한까지 시험하세요.',
  aboutCard1Title: '추천 대상',
  aboutCard1Text: 'FPS/MOBA 게이머, 디지털 일러스트레이터, 외과의사 및 마우스 에임 시 손떨림과 커서 떨림을 교정하고 싶은 모든 분.',
  aboutCard2Title: '훈련 효과',
  aboutCard2Text: '미세 운동 협응력 향상, 손 떨림 억제, 코너 구간 속도 제어 및 불필요한 근육 긴장 완화.',
  aboutCard3Title: '동적 협소화 시스템',
  aboutCard3Text: '랩을 완료할 때마다 통로 폭이 밀리미터 단위로 축소되며 급격한 굴곡이 추가되어 한계 수준의 마우스 정밀도를 요구합니다.',
  gradeLabels: {
    'S+': '신의 손 안정성 (Grandmaster)',
    'S': '달인급 조타력 (Master)',
    'A': '정밀 에임 마스터 (Diamond)',
    'B': '안정적 컨트롤 (Platinum)',
    'C': '기초 완주 (Gold)',
  },
  shareDrillName: '전기충격 미로게임',
  shareUrl: 'https://skilldrills.online/ko/drills/motor/precision-control/steady-hand',
  shareTextTemplate: '🖐️ {drillName}에서 {laps}랩 완주 (정밀도: {acc}) 달성! 마우스 손떨림 측정과 미세 정밀도 테스트를 skilldrills.online에서 무료로 진단해보세요!',
  copiedAlert: '점수 카드가 클립보드에 복사되었습니다!',
};

export default function KoreanSteadyHandPage() {
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
      <SteadyHandClient copy={koCopy} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/drills/motor/precision-control/steady-hand" locale="ko" />
      </div>
      <DrillFooter />
    </>
  );
}
