import DistanceJudgmentClient from '@/app/drills/visual/depth-perception/distance-judgment/DistanceJudgmentClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';

// ============================================================
// SEO RESEARCH FINDINGS — distance-judgment (Korean: 원근감 테스트 / 입체시 검사)
// PRIMARY:  "원근감 테스트"                  — Core perceptual search query
//           "입체시 검사"                    — Clinical stereopsis term
// SECONDARY / LSI:
//           "심시력 검사"                    — Driver license / heavy machine test
//           "거리 감각 테스트"                — Distance judgment query
//           "거리 조절 능력 훈련"            — Vision training query
//           "시지각 공간 지각력"              — Spatial perception
//           "옵티컬 루밍 훈련"                — Optical looming
//           "하워드 돌먼 테스트"              — Howard-Dolman test
// ============================================================

export const metadata = {
  title: '원근감 테스트 – 무료 온라인 입체시 & 거리 감각 측정 검사',
  description: '접근하는 목표물의 거리를 정밀하게 포착하는 무료 온라인 원근감 테스트. 광학적 루밍 팽창률과 도달 시간(TTC)을 계산하여 거리 감각과 입체시를 측정합니다.',
  keywords: [
    '원근감 테스트',
    '입체시 검사',
    '심시력 검사',
    '거리 감각 테스트',
    '거리 조절 능력 훈련',
    '시지각 공간 지각력',
    '옵티컬 루밍 훈련',
    '하워드 돌먼 테스트',
    '동체 원근감 측정',
    '운전면허 심시력 연습',
    '눈 피로 거리 초점',
    '양안 시차 입체시',
  ],
  openGraph: {
    title: '원근감 테스트 – 무료 온라인 입체시 & 거리 감각 측정 검사 | SkillDrills',
    description: '접근하는 목표물의 거리를 정밀하게 포착하는 무료 온라인 원근감 테스트. 광학적 루밍 팽창률과 도달 시간(TTC)을 계산하여 거리 감각과 입체시를 측정합니다.',
    type: 'article',
    url: 'https://skilldrills.online/ko/drills/visual/depth-perception/distance-judgment',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '원근감 테스트 – 무료 온라인 입체시 & 거리 감각 측정 검사 | SkillDrills',
    description: '접근하는 목표물의 거리를 정밀하게 포착하는 무료 온라인 원근감 테스트. 광학적 루밍 팽창률과 도달 시간(TTC)을 계산하여 거리 감각과 입체시를 측정합니다.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/visual/depth-perception/distance-judgment',
    languages: getAlternateLanguages('/drills/visual/depth-perception/distance-judgment'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '홈', item: 'https://skilldrills.online/ko' },
    { '@type': 'ListItem', position: 2, name: '시각 훈련', item: 'https://skilldrills.online/ko/drills/visual' },
    { '@type': 'ListItem', position: 3, name: '깊이 지각', item: 'https://skilldrills.online/ko/drills/visual/depth-perception' },
    { '@type': 'ListItem', position: 4, name: '원근감 테스트', item: 'https://skilldrills.online/ko/drills/visual/depth-perception/distance-judgment' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '원근감 및 입체시 거리 감각 측정기',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  description: '접근하는 물체의 팽창률과 도달 시간(Time-to-Contact)을 정밀 계산하여 공간 거리 감각을 평가하는 온라인 원근감 테스트 프로그램.',
  url: 'https://skilldrills.online/ko/drills/visual/depth-perception/distance-judgment',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online/ko' },
  dateModified: '2026-09-05',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '원근감 입체시 시뮬레이터 온라인',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'HTML5 Canvas 및 고속 포인터 이벤트를 지원하는 최신 웹 브라우저',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  url: 'https://skilldrills.online/ko/drills/visual/depth-perception/distance-judgment',
  dateModified: '2026-09-05',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: '원근감 테스트 & 3D 공간 거리 측정 드릴',
  url: 'https://skilldrills.online/ko/drills/visual/depth-perception/distance-judgment',
  description: '접근하는 3D 타겟의 도달 시점을 정확히 가늠하여 거리 감각과 타이밍 능력을 향상시키는 훈련 게임.',
  genre: ['Precision Game', 'Visual Training', 'Esports'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: '원근감 및 입체시 거리 감각 훈련 방법',
  description: '다가오는 물체의 광학적 팽창을 포착하고 기준면 도달 타이밍을 일치시키는 단계별 프로토콜.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '기준 링과 소실점 주시',
      text: '가상 터널 중앙에 위치한 고정 기준 링에 시선을 고정합니다.',
      url: 'https://skilldrills.online/ko/drills/visual/depth-perception/distance-judgment#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '접근하는 구체의 크기 변화 관찰',
      text: '화면 깊은 곳에서 다가오며 망막 상에서 점점 확대되는 타겟을 주시합니다.',
      url: 'https://skilldrills.online/ko/drills/visual/depth-perception/distance-judgment#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '정확한 교차 순간에 클릭',
      text: '다가오는 구체의 외곽선이 기준 링과 완벽히 겹치는 순간 스페이스바 또는 마우스를 클릭합니다.',
      url: 'https://skilldrills.online/ko/drills/visual/depth-perception/distance-judgment#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: '거리 오차율 분석 및 난이도 상승 대응',
      text: '측정된 상대 오차율(%)을 확인하고, 속도가 빨라지는 다음 라운드에서 시간 예측 타이밍을 보정합니다.',
      url: 'https://skilldrills.online/ko/drills/visual/depth-perception/distance-judgment#step-4'
    }
  ]
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '원근감 테스트란 무엇이며 어떤 능력을 측정하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '원근감 테스트는 3차원 공간에서 물체의 위치, 거리 차이, 다가오는 속도를 정밀하게 인지하는 능력을 평가합니다. 망막에 투영되는 상의 팽창 속도(광학적 루밍)를 분석하여 충돌 시점(TTC)을 계산하는 신경 시각 능력을 측정합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '하워드-돌먼(Howard-Dolman) 테스트와는 어떻게 다른가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '하워드-돌먼 검사(1919)는 실물 막대 3개를 이용해 양안 시차에 의한 입체시를 측정합니다. 평면 2D 모니터에서는 양안 시차가 발생하지 않으므로, 본 테스트는 실제 주행과 구기 스포츠에서 가장 핵심적인 동적 광학 팽창률(Lee, 1976)을 활용합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '광학적 루밍(Optical Looming)과 도달 시간(TTC)이란 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '물체가 눈앞으로 다가올 때 망막상의 크기는 지수 함수적으로 급격히 커집니다. 데이비드 리(David Lee, 1976)는 뇌가 물체의 절대적 크기를 몰라도 이 팽창 비율(타우 변수)을 통해 충돌까지 남은 시간을 직접 계산한다고 규명했습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '운전면허나 중장비 자격증에서 심시력 검사가 왜 필수인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '대형 트럭, 버스, 지게차 등은 차간 거리와 회전 반경을 잘못 가늠할 경우 대형 사고로 이어집니다. 심시력(거리 감각)이 떨어지면 제동 타이밍과 추월 거리를 오판하기 쉽기 때문입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '평소 시력이 좋은 사람도 심시력 검사에서 떨어질 수 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네. 양안 시력이 1.0 이상이어도 양안 시력 균형이 깨져 있거나(부동시), 미세 사시, 잦은 스마트폰 사용으로 인한 조절 근육 피로가 있으면 공간 내 거리 오차가 크게 발생하여 불합격할 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '거리 감각과 원근감은 훈련으로 개선될 수 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '선천적 시각 이상은 안과 치료가 필요하지만, 다가오는 물체의 팽창 속도를 인지하고 타이밍을 맞추는 대뇌 시각 피질의 신경 처리 속도는 반복적인 인지 훈련으로 크게 향상될 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '테스트의 오차율(%)은 어떻게 계산되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '사용자가 클릭한 순간의 구체 지름과 기준 링 지름 사이의 상대적 백분율 오차로 계산됩니다. 오차가 5% 미만이면 완벽한 일치(퍼펙트)로 판정됩니다.',
      },
    },
    {
      '@type': 'Question',
      name: '야구, 테니스, 축구 등 스포츠 선수에게 원근감이 왜 중요한가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '시속 150km의 야구공이나 테니스 서브는 0.4초 만에 타자에게 도달합니다. 선수는 공의 팽창 속도를 읽고 배트나 라켓을 휘두르는 타이밍을 밀리초 단위로 결정해야 하기 때문입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '모니터 주사율(Hz)이 테스트 정확도에 영향을 주나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '144Hz나 240Hz 모니터는 프레임 지연을 4~7ms 수준으로 줄여주어 60Hz(16.7ms) 환경보다 구체의 윤곽이 기준면에 닿는 순간을 훨씬 선명하게 포착할 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '검사 결과와 점수가 외부 서버로 전송되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '아닙니다. SkillDrills의 모든 기록과 통계는 사용자의 브라우저 로컬 저장소(LocalStorage)에만 안전하게 보관되며 외부로 유출되지 않습니다.',
      },
    },
  ],
};

const distanceGuideKo = {
  heading: '원근감 및 공간 입체시 평가 기준',
  intro: [
    '원근감(깊이 지각)은 세상을 3차원으로 인식하고 물체의 거리와 공간적 위치 관계를 판단하는 시지각 능력입니다. 모터스포츠, 비행 조종, 운전, 구기 스포츠에서 찰나의 거리 판단은 성공적인 인터셉트와 충돌의 갈림길이 됩니다.',
    '본 드릴은 하워드-돌먼(Howard, 1919) 검사와 생태학적 시각 팽창 이론(Lee, 1976; Regan & Beverley, 1978)을 온라인 환경에 맞게 재구성했습니다. 가상 터널을 따라 다가오는 타겟의 루밍 속도와 도달 시간(TTC)을 계산하는 시각 피질 훈련을 제공합니다.',
    '측정 방식: performance.now() API를 통해 밀리초 단위로 입력을 포착하며, 기준 링과 타겟의 상대적 지름 오차율을 계산하여 정밀도를 판정합니다.',
  ],
  benchmarks: {
    title: '원근감 판정 기준표 (자체 평가 가이드)',
    headers: ['등급', '평균 오차율', '점수 및 레벨', '시각 운동 신경 프로필'],
    rows: [
      ['Tier 1: 최상위 입체시 마스터', '5.0% 미만 오차', '1,500점 이상 | 레벨 7+', '탁월한 루밍 감지력, 오차 없는 완벽한 타이밍 추출.'],
      ['Tier 2: 우수한 공간 거리 감각', '5.0% – 9.9% 오차', '1,100 – 1,499점 | 레벨 5–6', '뛰어난 공간 예측력, 고속 접근 타겟에 대한 원활한 적응.'],
      ['Tier 3: 안정적 표준 수준', '10.0% – 15.9% 오차', '750 – 1,099점 | 레벨 3–4', '건강한 성인 평균, 최고 속도 구간에서 약간의 지연 발생.'],
      ['Tier 4: 보통 수준의 민감도', '16.0% – 25.0% 오차', '450 – 749점 | 레벨 2', '기준면에 도달하기 전 성급하게 조기 클릭하는 경향.'],
      ['Tier 5: 훈련 시작 단계', '25.0% 초과 오차', '450점 미만 | 레벨 1', '상당한 시점 추정 오차, 반복적인 타이밍 보정 훈련 필요.'],
    ],
  },
  protocols: {
    title: '원근감과 거리 판정 능력을 향상시키는 훈련 수칙',
    items: [
      {
        title: '수칙 1: 광학적 팽창률(루밍)과 도달 시점 계산 집중',
        description: '구체의 중앙점보다 외곽선의 팽창 가속도를 주시하여 기준 링과 겹치는 찰나를 계산하세요.',
      },
      {
        title: '수칙 2: 조기 클릭 충동 억제',
        description: '속도가 빨라질 때 긴장감으로 인해 너무 일찍 클릭하는 실수를 줄이고 완전한 겹침을 기다리세요.',
      },
      {
        title: '수칙 3: 목표 기준 링에 시선 닻 내리기',
        description: '다가오는 공을 따라 시선이 흔들리지 않도록 고정된 기준 링 평면에 초점을 유지하세요.',
      },
      {
        title: '수칙 4: 호흡 조절 및 안구 피로 완화',
        description: '눈을 깜빡이지 않고 무리하게 부릅뜨면 눈물이 말라 거리감이 왜곡됩니다. 세트 간 가볍게 눈을 쉬어주세요.',
      },
    ],
  },
  faqs: {
    title: '원근감 및 거리 측정에 관한 자주 묻는 질문(FAQ)',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

const copyKo = {
  title: '원근감 테스트',
  subtitle: '3D 공간 거리 판정 & 시지각 인터셉트 훈련',
  caption: '원근감은 물체가 얼마나 멀리 있는지, 앞뒤 관계를 판단하는 시각 기능입니다. 평면 모니터에서는 망막상의 크기 팽창 속도(Lee, 1976; Regan & Beverley, 1978)를 통해 물체의 실제 크기나 거리를 몰라도 도달 시간(TTC)을 정확히 계산하는 능력을 측정합니다.',
  statScore: '점수',
  statTime: '남은 시간',
  statLevel: '레벨',
  statBestScore: '최고 기록',
  startTitle: '원근감 측정 프로',
  startSubtitle: '3D 공간 거리 판정 • 동체 원근감 측정 드릴',
  startBtn: '테스트 시작',
  getReady: '준비하세요',
  newBest: '신기록 달성',
  statPoints: '점수',
  statAccuracy: '정확도',
  statPeakLevel: '최고 레벨',
  statIntercepts: '퍼펙트 일치',
  playAgain: '다시 하기',
  shareScore: '점수 공유',
  returnOptions: '종료',
  rulesTitle: '테스트 규칙 및 점수 산정',
  rule1Text: '완벽한 거리 일치',
  rule1Highlight: '+150점',
  rule1Result: '깊이 오차 5% 미만',
  rule2Text: '근접 거리 일치',
  rule2Highlight: '+100점',
  rule2Result: '깊이 오차 12% 미만',
  rule3Text: '단계별 속도 가속',
  rule3Highlight: '고속 접근',
  rule3Result: '레벨 상승 시 구체 속도 증가',
  rule4Text: '시간 초과 / 빗나감',
  rule4Highlight: '감점 없음',
  rule4Result: '점수 없이 다음 타겟 즉시 출현',
  aboutTitle: '원근감 테스트 정보',
  overviewTitle: '이 테스트가 측정하는 핵심 능력',
  overviewLead: '원근감은 다가오는 물체의 속도와 거리를 파악하여 완벽한 타이밍에 행동하도록 이끄는 능력입니다.',
  overviewBody: '광학적 팽창률(Looming)을 기반으로 한 본 시뮬레이터는 야구, 테니스, 축구 등의 스포츠 선수와 정밀 운전을 요하는 운전자에게 탁월한 시각 반응성 훈련을 제공합니다.',
  aboutCards: [
    { iconBg: 'bg-blue-600', title: '추천 대상', text: '운전자, 구기 종목 선수, 레이싱/FPS 게이머 및 공간 감각을 기르고 싶은 모든 분.' },
    { iconBg: 'bg-cyan-600', title: '훈련 효과', text: '동체 원근감, 충돌 도달 시간(TTC) 계산력, 눈과 손의 협응 타이밍.' },
    { iconBg: 'bg-purple-600', title: '합격 팁', text: '다가오는 공보다 고정된 기준 링의 경계면에 시선을 두고 일치 순간에 클릭하세요.' }
  ]
};

export default function KoreanDistanceJudgmentPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DistanceJudgmentClient copy={copyKo} />
      <DrillGuide guide={distanceGuideKo} />
      <RelatedDrills currentCategory="visual" currentHref="/drills/visual/depth-perception/distance-judgment" locale="ko" />
    </>
  );
}
