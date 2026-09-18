import PrecisionFlickShotClient from '@/app/drills/motor/hand-eye-coordination/precision-flick-shot/PrecisionFlickShotClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: '플릭 에임 연습・마우스 정확도 테스트 – 순간 반응 에임 및 정밀도 측정 | SkillDrills',
  description: '브라우저에서 바로 즐기는 무료 플릭 에임 연습 및 마우스 정확도 테스트. 타깃을 향한 순간 스냅 이동, 중심 타격 정밀도, 플릭 반응 속도를 밀리초 단위로 진단하여 발로란트 및 오버워치 에임 능력을 극대화합니다.',
  keywords: [
    '플릭 에임 연습',
    '마우스 정확도 테스트',
    '플릭샷 연습',
    '에임 연습',
    '에임 트레이너',
    '발로란트 에임 연습',
    '플릭 에임',
    '마우스 반응속도',
    '에임 정밀도',
    'FPS 플릭 연습',
    '끌어치기 연습',
    '에임 브레이킹',
  ],
  openGraph: {
    title: '플릭 에임 연습・마우스 정확도 테스트 – 순간 반응 에임 및 정밀도 측정 | SkillDrills',
    description: '브라우저에서 바로 즐기는 무료 플릭 에임 연습 및 마우스 정확도 테스트. 타깃을 향한 순간 스냅 이동, 중심 타격 정밀도, 플릭 반응 속도를 밀리초 단위로 진단하여 발로란트 및 오버워치 에임 능력을 극대화합니다.',
    type: 'article',
    url: 'https://skilldrills.online/ko/drills/motor/hand-eye-coordination/precision-flick-shot',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '플릭 에임 연습・마우스 정확도 테스트 – 순간 반응 에임 및 정밀도 측정 | SkillDrills',
    description: '브라우저에서 바로 즐기는 무료 플릭 에임 연습 및 마우스 정확도 테스트. 타깃을 향한 순간 스냅 이동, 중심 타격 정밀도, 플릭 반응 속도를 밀리초 단위로 진단하여 발로란트 및 오버워치 에임 능력을 극대화합니다.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/motor/hand-eye-coordination/precision-flick-shot',
    languages: getAlternateLanguages('/drills/motor/hand-eye-coordination/precision-flick-shot'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'SkillDrills 홈',
      item: 'https://skilldrills.online/ko',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: '운동 신경 트레이닝',
      item: 'https://skilldrills.online/ko/drills/motor',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: '손과 눈의 협응력',
      item: 'https://skilldrills.online/ko/drills/motor/hand-eye-coordination',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: '정밀 플릭 샷',
      item: 'https://skilldrills.online/ko/drills/motor/hand-eye-coordination/precision-flick-shot',
    },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '플릭 에임 연습・마우스 정확도 테스트',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  description: '브라우저 기반 무료 플릭 에임 트레이너. 탄도학적 스냅 속도, 불스아이 중심 타격률, 감속 제어 능력을 측정합니다.',
  url: 'https://skilldrills.online/ko/drills/motor/hand-eye-coordination/precision-flick-shot',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-16',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '정밀 플릭 샷 트레이너',
  browserRequirements: 'HTML5 Canvas 및 자바스크립트 지원 최신 브라우저',
  url: 'https://skilldrills.online/ko/drills/motor/hand-eye-coordination/precision-flick-shot',
  applicationCategory: 'EducationalApplication',
  dateModified: '2026-09-16',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: '정밀 플릭 샷 마우스 정확도 게임',
  url: 'https://skilldrills.online/ko/drills/motor/hand-eye-coordination/precision-flick-shot',
  description: '순간적인 커서 스냅과 중심 타격을 훈련하는 FPS 정밀 에임 게임.',
  genre: ['슈팅 게임', '액션', 'e스포츠 트레이닝'],
  gamePlatform: ['Web Browser', 'Desktop'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-16',
  mainEntity: [
    {
      '@type': 'Question',
      name: '플릭 에임(Flick Aim)이란 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '목표가 시야에 나타났을 때 순간적인 탄도학적 근육 수축으로 커서를 목표물로 스냅 이동시키고 즉시 정지하여 발사하는 고속 조준 기술입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '마우스 정확도 측정의 이단계 운동 제어 모델이란?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Woodworth(1899)가 제시한 모델로, 초기 고속 개루프 탄도 이동(Primary Submovement)과 시각 피드백 기반의 미세 감속 수정(Secondary Submovement) 단계로 구성됩니다.',
      },
    },
    {
      '@type': 'Question',
      name: '불스아이(중심 명중) 비율을 높이는 비결은 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '타깃의 겉 테두리 전체가 아닌 중심 8픽셀 핵을 의도적으로 조준하면 신경근 노이즈가 억제되어 샷 분산도가 좁아지고 헤드샷 정확도가 크게 상승합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '에임 오버플릭(과도한 지나침)의 원인과 해결책은?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '손목 신근의 길항 브레이킹 실패가 주원인입니다. 고정 감도에서 목표 중심 직전에 멈추는 에임 브레이킹 연습을 반복하여 탄도 운동 프로그램을 보정해야 합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '화면에 2개의 타깃이 동시에 뜰 때 대처법은?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '주변시로 수명 링을 신속히 스캔하여 잔여 시간이 적은 타깃을 우선 격파한 후, 반동을 이용해 새로 스폰된 타깃으로 빠르게 화면을 가로질러 전환합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '발로란트나 CS2 실력 향상에 직접 도움이 되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네. 택티컬 슈터의 킬 결정력은 적 헤드를 향한 단일 임펄스 마이크로 플릭 속도에 의해 좌우되며, 불필요한 미세 떨림을 완전히 제거해 줍니다.',
      },
    },
    {
      '@type': 'Question',
      name: '플릭 훈련에 적합한 마우스 감도(DPI)는?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '800 DPI 기준 발로란트 0.35~0.50(360도 회전에 30~45cm) 범위가 팔 스윕의 신속성과 손목 마이크로 플릭의 정밀도를 균형 있게 유지하기에 최적입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '세션 등급과 점수는 어떻게 산출되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '총 타깃 적중률, 불스아이 명중 비율, 콤보 연계 기록 및 최고 도달 레벨을 종합 연산하여 D부터 S+까지 세분화된 랭크를 매깁니다.',
      },
    },
    {
      '@type': 'Question',
      name: '플릭 반응 속도를 극대화하는 하드웨어 세팅은?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '144Hz 이상 고주사율 모니터, 윈도우 포인터 정확도 향상 해제(원시 입력 보장), 65g 이하 초경량 마우스로 물리 관성을 줄이는 것이 이상적입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '하루에 얼마나 연습하는 것이 가장 효과적인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '경쟁전 플레이 전 10~15분 동안 4~6세션을 집중 수행하는 것이 손목 피로와 건염을 방지하면서 신경 시냅스 활성화를 극대화하는 황금 루틴입니다.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: '플릭 에임 및 마우스 정밀 타격 훈련 가이드',
  description: '탄도학적 마우스 스냅, 불스아이 중심 타격, 감속 브레이킹 완성 4단계 훈련.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '조준선 정렬 및 감도 세팅',
      text: '게임 내 실전 감도와 일치하도록 조절하고 캔버스 중앙 십자선에 시선을 고정합니다.',
      url: 'https://skilldrills.online/ko/drills/motor/hand-eye-coordination/precision-flick-shot#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '스폰 타깃 포착 및 우선순위 결정',
      text: '시야각 내에 나타난 타깃의 붕괴 링을 읽어 수명이 가장 급박한 타깃을 1순위로 선정합니다.',
      url: 'https://skilldrills.online/ko/drills/motor/hand-eye-coordination/precision-flick-shot#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '단일 임펄스 탄도 플릭 구동',
      text: '중간 정체나 머뭇거림 없이 한 번의 매끄러운 스냅 동작으로 커서를 목표 중심으로 쏘아 보냅니다.',
      url: 'https://skilldrills.online/ko/drills/motor/hand-eye-coordination/precision-flick-shot#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: '단호한 브레이킹 및 중심 클릭',
      text: '길항근으로 마우스 관성을 즉각 정지시키고 정확히 불스아이 핵 위에서 클릭을 등록합니다.',
      url: 'https://skilldrills.online/ko/drills/motor/hand-eye-coordination/precision-flick-shot#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('meyer1988', 'fitts1954', 'mackenzie1992', 'elliott2010', 'woodworth1899', 'woods2015'),
  intro: {
    title: '탄도학적 마이크로 플릭과 하위 운동 최적화의 생체역학',
    paragraphs: [
      '사격 스포츠와 HCI 인터랙션에서 플릭 샷(Flick Shot)은 극도의 시간 제약 하에서 구동되는 고속 이산 조준 운동입니다. Robert S. Woodworth(1899)는 목표 지향적 운동이 이단계 제어 구조를 취함을 밝혔습니다. 첫째는 사지를 목표로 가속하는 초기 탄도 임펄스이며, 둘째는 시각 피드백으로 미세 조정을 수행하는 현재 제어 단계입니다.',
      'David E. Meyer 등(1988)의 확률 최적화 하위운동 모델(Stochastic Optimized Submovement Model)에 따르면, 인간의 운동 출력은 운동 속도에 비례하는 신경 잡음을 동반합니다. 너무 빠르게 플릭하면 1차 운동의 종단 산포가 급증하며, 타깃 영역을 벗어날 경우 약 150~200ms가 소요되는 교정 하위운동이 강제되어 치명적인 시간 손실이 발생합니다.',
      '최상위권 플릭 스루풋(MacKenzie, 1992)에 도달하려면 1차 탄도 임펄스만으로 타깃 내에 정확히 안착하도록 속도를 정밀 보정해야 합니다. 불스아이 중심 타격에 보너스 점수를 부여하는 이 훈련은 종단 오차 분산을 압축하고 브레이킹을 정밀화하도록 신경계를 훈련시킵니다.',
      '플릭 뒤에 자리 잡은 거리-크기 교환 원리는 피츠의 법칙(Fitts, 1954)에 해당하며, 브레이킹 시 길항근 동원의 중요성은 Elliott et al.(2010)의 최신 연구에서 확립되었습니다.',
      '브라우저 측정 정밀도 및 한계: 시간 측정은 브라우저 performance.now() 시계를 기반으로 합니다. 디스플레이 재생률(60Hz 16.7ms, 144Hz 6.9ms)과 마우스 폴링레이트에 의한 양자화 간격이 존재하므로(Woods et al., 2015), 외부와의 절대 비교보다는 동일 시스템 내에서의 개인 성장 추이에 집중하세요.',
    ],
  },
  benchmarks: {
    title: '플릭 샷 및 마우스 정확도 표준 벤치마크',
    caption: 'Woodworth(1899) 및 Meyer et al.(1988)의 운동학 모델에 기초한 숙련도 지표. SkillDrills는 일체의 개인 데이터를 수집하지 않습니다.',
    headers: ['등급 (Tier)', '숙련도 분류', '도달 레벨 / 콤보', '평균 포착 소요시간', '클릭 정확도', '불스아이 비율', '신경운동 특성 프로필'],
    rows: [
      [
        'Tier 1',
        '에이펙스 플릭 마스터',
        'Lv. 15+ (콤보 > 20회)',
        '< 340 ms',
        '≥ 96.0%',
        '> 65%',
        '순수 단일 임펄스 탄도 궤적, 2차 수정 운동 전무, 10ms 미만의 완벽한 길항근 브레이킹.',
      ],
      [
        'Tier 2',
        '엘리트 건파이터',
        'Lv. 11–14 (콤보 14–19회)',
        '340–420 ms',
        '91.0%–95.9%',
        '45%–64%',
        '예리한 중심 시각 확인, 30ms 미만의 초미세 2차 교정, 궤적 흔들림 최소화.',
      ],
      [
        'Tier 3',
        '숙련 마크스맨',
        'Lv. 7–10 (콤보 8–13회)',
        '421–520 ms',
        '84.0%–90.9%',
        '25%–44%',
        '외곽 링 타격 빈번, 고속 타깃 전환 시 약간의 오버슈트 및 이중 클릭 관찰.',
      ],
      [
        'Tier 4',
        '발달 단계 프래거',
        'Lv. 4–6 (콤보 4–7회)',
        '521–660 ms',
        '74.0%–83.9%',
        '10%–24%',
        '다단계 덜컥거림 교정, 과가속으로 인한 분산도 증가, 발사 직전 주저함 발생.',
      ],
      [
        'Tier 5',
        '입문 / 초보자',
        'Lv. 1–3 (콤보 < 4회)',
        '> 660 ms',
        '< 74.0%',
        '< 10%',
        '거리 미달(언더플릭), 잦은 빗맞음, 느린 타깃 재포착 속도, 손목-팔 협응 미흡.',
      ],
    ],
  },
  protocols: {
    title: '마우스 플릭 정밀도를 극대화하는 4대 훈련 프로토콜',
    items: [
      {
        title: '프로토콜 1: 1차 탄도 임펄스 보정 (레벨 1–4)',
        description: '서두르기보다 끊김 없는 단일 플릭에 집중합니다. 도중 정지나 머뭇거림을 없애고 개루프 운동 기억을 신뢰하여 외곽 링 안에 확고하게 안착시키세요.',
      },
      {
        title: '프로토콜 2: 마이어 하위운동 분산 압축 (레벨 5–8)',
        description: '의도적으로 8픽셀 중심 불스아이 핵을 노립니다. 작은 가상 목표를 겨냥하면 운동 피질이 신경 잡음을 억제하여 탄착군을 극도로 좁힙니다.',
      },
      {
        title: '프로토콜 3: 다중 타깃 우선순위 시퀀싱 (레벨 9–12)',
        description: '2개 타깃이 동시 출현했을 때 주변시를 활용해 수명 타이머를 즉각 판독하고, 잔류 시간이 짧은 타깃을 먼저 타격한 뒤 신속하게 다음 목표로 스냅합니다.',
      },
      {
        title: '프로토콜 4: 길항근 감속 및 오버플릭 제동 (레벨 13–15)',
        description: '극한의 속도에서 손목 신근을 적극 동원해 마우스를 목표 중심축 위에서 즉각 멈춥니다. 표적 위에서 딱 멈추는 급제동 습관을 들이세요.',
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

export default function PrecisionFlickShotPage() {
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
      <PrecisionFlickShotClient copy={{ title: "정밀 플릭 샷 트레이너" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="https://skilldrills.online/ko/drills/motor/hand-eye-coordination/precision-flick-shot" />
      </div>
    </>
  );
}
