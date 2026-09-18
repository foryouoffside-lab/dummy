import PeripheralThreatSweeperClient from '@/app/drills/physical/reflex-training/peripheral-threat-sweeper/PeripheralThreatSweeperClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — South Korea (KR / KO)
// Primary Intent: 동체시력 테스트 게임, 주변시야 훈련, 주변시야 테스트, 반응속도 훈련 게임
// Korean Context: FPS(발로란트, 오버워치, 배그) 터널 비전 방지 및 운동선수 주변시야각/유효시야(UFOV) 반응속도 훈련
// High-Demand, Low-Competition Target Keywords:
//   - "동체시력 테스트 게임" (Viral dynamic visual acuity gaming query)
//   - "동체시력 반응속도 테스트" (Core chronometry and dynamic vision query)
//   - "주변시야 훈련" (High-intent peripheral expansion drill query)
//   - "주변시야 테스트" (Field of view test query)
//   - "반응속도 훈련 게임" (Interactive reaction training game)
//   - "동체시력 테스트 사이트" (Online benchmark tool query)
//   - "터널 비전 교정" (Tunnel vision prevention in high-stress combat)
//   - "유효 시야(UFOV) 확장" (Useful field of view cognitive sports query)
//   - "시야각 반응속도" (Field of view reaction agility query)
//   - "주변시야 방어 요격" (Radial peripheral threat sweep drill)
// ============================================================

export const metadata = {
  title: "주변 시야 테스트 – 동체시력 반응속도 훈련 게임 | SkillDrills",
  description: "무료 온라인 주변 시야 테스트 및 동체시력 반응속도 게임. 중심 코어를 주시한 채 360도 전방위 외곽에서 침투하는 위협 노드를 망막 주변부로 신속히 감지하고 요격하여 터널 비전을 예방하고 유효 시야(UFOV)를 극대화하십시오.",
  keywords: [
    "동체시력 테스트 게임",
    "동체시력 반응속도 테스트",
    "주변시야 훈련",
    "주변시야 테스트",
    "반응속도 훈련 게임",
    "동체시력 테스트 사이트",
    "터널 비전 교정",
    "유효 시야 UFOV 확장",
    "시야각 반응속도",
    "주변시야 방어 요격"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/physical/reflex-training/peripheral-threat-sweeper',
    languages: getAlternateLanguages('/drills/physical/reflex-training/peripheral-threat-sweeper'),
  },
  openGraph: {
    title: "주변 시야 테스트 – 동체시력 반응속도 훈련 게임 | SkillDrills",
    description: "무료 온라인 주변 시야 테스트 및 동체시력 반응속도 게임. 중심 코어를 주시한 채 360도 전방위 외곽에서 침투하는 위협 노드를 망막 주변부로 신속히 감지하고 요격하여 터널 비전을 예방하고 유효 시야(UFOV)를 극대화하십시오.",
    url: 'https://skilldrills.online/ko/drills/physical/reflex-training/peripheral-threat-sweeper',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "주변 시야 테스트 – 동체시력 반응속도 훈련 게임 | SkillDrills",
    description: "무료 온라인 주변 시야 테스트 및 동체시력 반응속도 게임. 중심 코어를 주시한 채 360도 전방위 외곽에서 침투하는 위협 노드를 망막 주변부로 신속히 감지하고 요격하여 터널 비전을 예방하고 유효 시야(UFOV)를 극대화하십시오.",
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "SkillDrills 홈",
      "item": "https://skilldrills.online/ko"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "신체 훈련 허브",
      "item": "https://skilldrills.online/ko/drills/physical"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "반사신경 및 순발력",
      "item": "https://skilldrills.online/ko/drills/physical/reflex-training"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "주변 시야 테스트 & 위협 스위퍼",
      "item": "https://skilldrills.online/ko/drills/physical/reflex-training/peripheral-threat-sweeper"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "주변 시야 테스트 및 위협 스위퍼 트레이너",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "망막 주변부 시각 자극 감지와 암묵적 주의 분배(Covert Orienting), 유효 시야(UFOV) 확장을 위해 설계된 과학적 방사형 시운동 통합 훈련 소프트웨어."
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "주변 시야 동체시력 훈련기 (Peripheral Threat Sweeper)",
  "url": "https://skilldrills.online/ko/drills/physical/reflex-training/peripheral-threat-sweeper",
  "description": "무료 온라인 주변 시야 및 동체시력 측정 도구. 중심 코어를 보호하면서 360도 방사형 위협을 신속히 제거하여 시야각을 넓히고 터널 비전을 해소합니다.",
  "applicationCategory": "SportsApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "주변 시야 위협 요격 게임 (Peripheral Threat Sweeper)",
  "url": "https://skilldrills.online/ko/drills/physical/reflex-training/peripheral-threat-sweeper",
  "description": "중심 코어를 사수하며 방사형으로 침공하는 적 노드를 요격하는 고속 주변 시야 아케이드 반응 게임.",
  "genre": ["Action", "Sports Game", "Reflex Game", "Visual Training"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "주변 시야 훈련(Peripheral Vision Training)이란 무엇이며 일반 시력과 어떻게 다른가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "일반 시력(중심와 시력)이 시선의 중심 1~2도 영역에서 텍스트나 사물의 세밀한 디테일을 분별하는 능력이라면, 주변 시야 훈련은 시선 중심을 벗어난 망막 주변부의 간상체(Rods)를 활성화하여 넓은 공간의 움직임, 대비 변화, 위협 요소를 감지하고 신속히 처리하는 유효 시야(UFOV, Useful Field of View)를 확장하는 훈련입니다."
      }
    },
    {
      "@type": "Question",
      "name": "주변 위협 스위퍼(Peripheral Threat Sweeper) 드릴의 핵심 메커니즘은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "화면 정중앙의 코어 방패를 응시(중심 주시 유지)하는 동안, 캔버스 외곽 360도 경계에서 무작위 각도로 침투하는 위협 노드가 생성되어 코어로 수렴합니다. 사용자는 중심에서 눈을 떼지 않고 주변 시야로 노드의 진입을 감지한 뒤, 즉각적인 마우스 플릭(Flick) 또는 터치로 타깃을 요격하여 코어 침공을 막아내야 합니다."
      }
    },
    {
      "@type": "Question",
      "name": "암묵적 주의 정렬(Covert Orienting)과 명시적 안구 운동(Overt Gaze)의 차이는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "마이클 포스너(Michael Posner, 1980)의 공간 주의 이론에 따르면, 명시적 정렬은 눈동자 자체를 사물로 회전시키는 안구 운동(Saccade)을 의미하며 최소 200ms 이상의 물리적 회전 시간이 소요됩니다. 반면 암묵적 주의 정렬은 안구 위치를 고정한 채 두뇌 속 '주의의 스포트라이트'만을 주변부로 신속하게 투사하여 사물을 감지하므로 100ms 안팎의 초고속 인지 처리가 가능합니다."
      }
    },
    {
      "@type": "Question",
      "name": "발로란트, 오버워치 2, 배틀그라운드 등 FPS 게임에서 주변 시야가 왜 결정적인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "교전 상황에서 크로스헤어를 적이 예상되는 통로에 고정한 채, 모니터 주변부의 미니맵, 스킬 쿨다운 UI, 좌우 화면 구석에서 기습하는 적의 실루엣을 놓치지 않아야 하기 때문입니다. 주변 시야 능력이 낮으면 특정 지점에 시야가 좁아지는 '터널 비전(Tunnel Vision)'에 빠져 측면 기습에 무방비로 당하게 됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "드릴 내 위협 노드의 행동 패턴과 속도 프로필은 어떻게 분류되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "위협 노드는 3가지 행동 유형으로 나뉩니다. 표준 위협(Standard)은 기본 속도로 코어를 향해 직선 궤적을 그리며, 고속 위협(Fast)은 1.6배 빠른 속도로 급습하여 순발력을 시험합니다. 회피형 위협(Evasive)은 좌우로 진동하는 비선형 궤적을 보여 망막의 궤적 예측 알고리즘을 극한으로 자극합니다."
      }
    },
    {
      "@type": "Question",
      "name": "레벨 상승에 따라 위협 속도와 생성 주기는 구체적으로 어떻게 가속되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "점수가 누적됨에 따라 레벨이 1단계에서 15단계 이상으로 연속 상승합니다. 노드의 이동 속도는 초기 80 px/s에서 최대 520 px/s까지 가속되며, 생성 간격은 1.4초에서 0.20초까지 급격히 압축되어 복수의 위협이 사방에서 동시에 쏟아지는 극한의 다중 처리 상황이 연출됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "중심 코어가 침공당했을 때(Core Breach) 어떤 페널티가 부여되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "위협 노드가 중심 코어 방패를 뚫고 침공하면 화면이 붉게 점멸하며 쌓여 있던 콤보 배율이 즉시 1.0배로 초기화됩니다. 또한 설정에서 '시간 페널티' 옵션을 활성화한 경우 세션 남은 시간에서 0.8초가 강제 차감되어 라운드 생존이 매우 위태로워집니다."
      }
    },
    {
      "@type": "Question",
      "name": "위협 요격 성공 시 주어지는 +0.6초 시간 연장 시스템은 어떻게 활용하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "표적을 정확히 요격할 때마다 기본 점수(+100점 × 콤보 배율)와 함께 +0.6초의 잔여 시간 보너스가 누적됩니다. 오클릭이나 코어 침공 없이 높은 정확도를 유지하면 초기 30초의 제한 시간을 초과하여 장기 세션을 유지하며 초고득점을 달성할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "주변 시야 스위퍼에서 상위 1% 엘리트(Tier 1) 등급 기준은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tier 1: 최상위 수호자(Apex Peripheral Guardian, Grade S)에 도달하려면 24,000점 이상의 누적 점수, 90% 이상의 요격 정확도, 그리고 450 px/s 이상의 초고속 위협 속도를 극복해야 합니다. 일반적인 숙련자는 Tier 3(11,000~16,999점) 구간에 분포합니다."
      }
    },
    {
      "@type": "Question",
      "name": "주변 시야 반응 훈련 시 가장 적절한 모니터 거리와 입력 장치 설정은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "모니터와 눈 사이의 거리는 50~70cm를 유지하여 화면 가장자리가 시야각(FOV) 40~50도 내외에 위치하도록 하는 것이 최적입니다. 144Hz 이상의 고주사율 디스플레이와 1000Hz 폴링레이트의 광학 게이밍 마우스를 사용하면 입력 지연과 시각적 잔상을 4ms 미만으로 억제하여 훈련 효율을 극대화할 수 있습니다 (Woods et al., 2015)."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "주변 시야 및 방사형 위협 요격 훈련 가이드",
  "description": "시선 고정과 암묵적 주의 분배를 통해 주변 시야 반응 속도를 극대화하는 4단계 과학적 훈련 절차.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "중심 코어 주시점 앵커링 (Central Anchor)",
      "text": "화면 중앙의 녹색 방패 중심에 시선을 안정적으로 고정하십시오. 사방에서 나타나는 노드를 눈동자로 직접 쫓으려 하지 말고 시선을 정면에 묶어둡니다.",
      "url": "https://skilldrills.online/ko/drills/physical/reflex-training/peripheral-threat-sweeper#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "망막 주변부 움직임 감지 (Parafoveal Detection)",
      "text": "망막 주변부의 높은 명암 대비 감도를 활용하여 외곽 테두리에서 중심으로 쇄도하는 붉은색 및 주황색 위협 노드의 침투 궤적을 직관적으로 감지합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/reflex-training/peripheral-threat-sweeper#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "방사형 탄도 플릭 요격 (Radial Ballistic Flick)",
      "text": "위협이 중심 코어에 닿기 전에 손목의 빠른 탄도적 플릭으로 커서를 목표 좌표로 튕겨 클릭합니다. 성공 시 +0.6초 보너스를 획득합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/reflex-training/peripheral-threat-sweeper#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "즉각적 커서 중심 복귀 및 콤보 유지 (Recentering & Streak)",
      "text": "타깃 요격 직후 커서를 지체 없이 중앙으로 복귀시켜 전방위 360도 스캐닝 상태를 재정비하고, 최대 3.0배 콤보를 끊김 없이 유지합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/reflex-training/peripheral-threat-sweeper#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('posner1980', 'treisman1980', 'woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: "주변 시야 감지 및 유효 시야(UFOV)의 측정 원리",
    paragraphs: [
      "인간의 시각 시스템에서 시선의 정중앙(중심와, Fovea)은 전체 시야의 1~2도에 불과하며, 세밀한 해상도와 색상 식별에 특화되어 있습니다. 반면 중심와를 둘러싼 광대한 망막 주변부는 해상도가 급격히 저하되지만, 명암 대비의 순간적 변화와 고속 움직임을 포착하는 간상체 세포가 조밀하게 분포되어 있습니다. 본 드릴은 중심 시선을 이동시키지 않고도 두뇌의 주의 자원을 망막 주변부로 유연하게 투사하는 '암묵적 공간 주의(Covert Spatial Attention)' 능력을 정밀하게 측정합니다 (Posner, 1980).",
      "주변 시야에서 발생하는 모든 요격 행위는 피츠의 법칙(Fitts's Law, 1954)과 우드워스(Woodworth, 1899)의 이단계 운동 제어 모델을 따릅니다. 목표물까지 도달하는 시간(Movement Time)은 중심으로부터의 방사형 거리와 노드의 물리적 크기 비율의 로그 함수에 비례합니다. 즉, 캔버스 최외곽에서 생성된 노드를 요격할 때 사용자는 동작 초기 85% 이상의 거리를 시각적 피드백 없이 순수 고유감각으로 내던지는 탄도적 플릭(Ballistic Snap)을 수행한 뒤, 최종 접촉 직전 미세한 시각 피드백 수정을 가하게 됩니다.",
      "칼린 볼(Ball et al., 1988)의 인지 연구에 따르면, 고난도 인지 작업이나 과도한 교전 스트레스 상황에서 시야각이 급격히 축소되는 현상을 '터널 비전(Tunnel Vision)'이라 부릅니다. 본 드릴은 1단계의 여유로운 1.4초 생성 주기에서 시작하여 점차 0.20초 간격으로 360도 전방위에서 다중 위협이 쏟아지도록 설계되었습니다. 이는 대뇌 두정엽 피질의 시공간 처리 대역폭(Useful Field of View, UFOV)을 강제로 확장하여 어떤 혼전 속에서도 측면 위협을 놓치지 않도록 신경망을 재구조화합니다.",
      "측정 신뢰도 및 하드웨어 한계: 반응 시간과 요격 정밀도는 웹 브라우저의 고정밀 시계인 performance.now() API를 통해 밀리초 단위로 캡처됩니다. 단, 스펙터(Spectre) 보안 완화 조치로 브라우저 타이머는 약 1ms 해상도로 제한되며, 60Hz 모니터는 약 16.7ms, 144Hz는 6.9ms, 240Hz는 4.1ms의 디스플레이 프레임 양자화 지연이 발생합니다 (Woods et al., 2015). 또한 125Hz 일반 마우스는 약 8ms, 1000Hz 게이밍 마우스는 1ms 미만의 폴링 오차를 추가합니다. 따라서 약 5ms 미만의 미세한 편차는 측정 노이즈로 간주되며, 타인과의 단순 비교보다는 동일 장비 환경에서의 본인 점수 추세를 추적하는 것이 과학적으로 타당합니다. SkillDrills는 모든 훈련 데이터를 브라우저 로컬 스토리지에만 저장하며 외부 서버로 전송하지 않습니다."
    ]
  },
  benchmarks: {
    title: "주변 시야 반응속도 및 위협 요격 표준 벤치마크",
    headers: ['등급 (Tier)', '칭호 및 숙련도', '목표 점수', '요격 정확도 & 생존 속도', '판정 등급', '수행 수준'],
    rows: [
      ['Tier 1', '최상위 주변 수호자 (Apex Peripheral Guardian)', '24,000점 이상', '정확도 90%+ / 450+ px/s', 'S 등급', '상위 1% (초인적 유효시야)'],
      ['Tier 2', '정밀 방사형 스위퍼 (Precision Radial Sweeper)', '17,000 ~ 23,999점', '정확도 82~89% / 350~449 px/s', 'A 등급', '상위 10% (프로 수준 반응)'],
      ['Tier 3', '숙련된 시야 방어자 (Skilled Field Defender)', '11,000 ~ 16,999점', '정확도 74~81% / 250~349 px/s', 'B 등급', '상위 30% (탄탄한 동체시력)'],
      ['Tier 4', '발달 단계 추적자 (Developing Parafoveal Tracker)', '6,000 ~ 10,999점', '정확도 65~73% / 160~249 px/s', 'C 등급', '평균치 (일반 게이머)'],
      ['Tier 5', '터널 비전 취약군 (Novice Tunnel Vision Vulnerable)', '6,000점 미만', '정확도 65% 미만 / 160 px/s 미만', 'D 등급', '초심자 (주변시야 확장 필요)'],
    ],
    note: "평가는 최종 획득 점수, 침공 허용 횟수, 최고 생존 노드 속도 및 최대 유지 콤보를 종합하여 자동으로 결정됩니다.",
  },
  protocols: {
    title: "주변 시야 확장 및 반응속도 극대화 4단계 훈련 프로토콜",
    description: "중심 시선 고정, 암묵적 주의 분배, 방사형 탄도 플릭 및 다중 위협 분할 처리를 체계적으로 단련하는 프로토콜입니다.",
    items: [
      {
        title: "프로토콜 1: 포스너 암묵적 주의 분배 및 중심 앵커링",
        description: "시선을 중앙 코어에 단단히 고정하고 눈동자를 굴리지 않는 훈련입니다. 눈동자 회전 없이 주의의 초점만을 4분면 외곽으로 의식적으로 확장하여 불필요한 안구 도약(Saccade) 시간을 제거합니다 (Posner 1980)."
      },
      {
        title: "프로토콜 2: 트라이스먼 병렬 특징 팝아웃 및 전방위 현저성 감지",
        description: "시야 외곽에서 발생하는 붉은색/주황색 노드의 광학적 고속 침투를 순차적 탐색 없이 한 번에 감지하는 망막 현저성 맵(Saliency Map) 처리 훈련입니다 (Treisman & Gelade 1980)."
      },
      {
        title: "프로토콜 3: 우드워스 방사형 탄도 플릭 요격 및 미세 감속 제어",
        description: "노드 출현 각도를 감지하자마자 손목과 전완근의 근신경계를 폭발적으로 동원해 목표 지점으로 커서를 던진 뒤, 코어 경계선 바깥에서 정확히 멈추는 탄도-감속 이단계 제어를 완성합니다 (Woodworth 1899)."
      },
      {
        title: "프로토콜 4: 유효 시야(UFOV) 고밀도 확장 및 동시 위협 분할 처리",
        description: "레벨 10 이상에서 0.20초 간격으로 동시다발 침투하는 다중 위협 상황에서 당황하지 않고, 코어와의 잔여 거리를 기준으로 위협 우선순위를 즉각 연산하여 연속 요격하는 분할 인지 훈련입니다 (Woods et al. 2015)."
      }
    ]
  },
  faqs: {
    title: "주변 시야 테스트 및 동체시력 훈련 자주 묻는 질문(FAQ)",
    items: faqSchema.mainEntity.map(q => ({
      q: q.name,
      a: q.acceptedAnswer.text
    }))
  }
};

export default function PeripheralThreatSweeperKoPage() {
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
      <PeripheralThreatSweeperClient
        copy={{
          title: "주변 시야 테스트 & 위협 스위퍼",
          subtitle: "유효 시야(UFOV) 방어 & 동체시력 반응속도 • 15단계 연속 스케일링",
          hudLabels: {
            score: "현재 점수",
            time: "남은 시간",
            bestScore: "최고 점수",
            bestCombo: "최대 콤보",
            accuracy: "요격 정확도",
            sweeps: "요격 횟수",
            breaches: "코어 침공",
            peakLevel: "도달 레벨",
            getReady: "준비"
          },
          rulesTitle: "주변 시야 드릴 규칙 및 채점 체계",
          rulesItems: [
            { title: "위협 노드 요격 & 시간 보너스", text: "외곽에서 침투하는 위협 노드를 클릭하여 100점(콤보 및 레벨 배율 적용)을 획득하고 시간을 +0.6초 연장하십시오." },
            { title: "콤보 시스템 증폭", text: "실수 없이 연속으로 위협을 요격하면 콤보 배율이 최대 3.0배까지 지속 상승합니다." },
            { title: "연속 난이도 가속", text: "점수가 상승함에 따라 위협 이동 속도(최대 520 px/s)와 생성 주기(최소 0.20s)가 점진적으로 가속됩니다." },
            { title: "코어 침공 및 빗맞힘 페널티", text: "위협이 중심 코어를 돌파하거나 허공을 클릭하면 콤보가 초기화되며(설정에 따라 0.8초 차감), 위기에 몰립니다." }
          ],
          aboutTitle: "주변 시야 및 시야각 반응속도 생체역학",
          aboutSections: [
            {
              title: "암묵적 주의 분배 & 주변부 스캐닝",
              subtitle: "포스너(Posner 1980) 시선 고정 상태에서의 공간적 주의 투사",
              content: "중심 코어에 눈동자를 고정한 채 시야 360도 전방위로 주의 자원을 배분합니다. 불필요한 안구 회전(도약) 시간을 생략하여 반응 시간을 비약적으로 단축합니다."
            },
            {
              title: "병렬적 특징 통합 & 현저성 맵 연산",
              subtitle: "트라이스먼(Treisman 1980) 방사형 고대비 팝아웃 감지",
              content: "외곽에서 중심으로 쇄도하는 고대비 붉은색 노드는 망막 주변부 간상체의 움직임 감지기를 직접 자극하여, 의식적 탐색 없이 즉각적인 요격 좌표를 연산해냅니다."
            },
            {
              title: "우드워스 이단계 탄도 플릭 & 코어 방어",
              subtitle: "우드워스(1899) 및 피츠(1954) 개루프 탄도 도약 및 접촉 감속",
              content: "초기 85% 이상의 거리를 손목 탄도 플릭으로 빠르게 도약한 뒤, 코어 경계 직전 미세한 제동력으로 노드 중심에 정확히 착지합니다."
            },
            {
              title: "유효 시야(UFOV) 확장 & 다중 위협 처리",
              subtitle: "볼(Ball et al., 1988) 고밀도 스폰 환경에서의 터널 비전 억제",
              content: "속도가 빨라지고 생성 주기가 압축됨에 따라 대뇌 피질의 시공간 처리 대역폭이 강제로 넓어지며, 실전 교전에서 시야가 좁아지는 터널 비전을 완벽히 차단합니다."
            }
          ]
        }}
      />
      <DrillGuide {...guideProps} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/reflex-training/peripheral-threat-sweeper" />
    </>
  );
}
