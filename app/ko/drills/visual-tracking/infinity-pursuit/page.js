import InfinityPursuitClient from '@/app/drills/visual-tracking/infinity-pursuit/InfinityPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// KOREAN SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "8자 안구 운동" (Figure-8 eye exercise) / "8자 눈 운동"
// Secondary:    "양안 협응 운동", "정중선 교차 안구 훈련", "비전트레이닝 8자 운동"
// LSI / Domain:  "원활추종 8자 검사", "외안근 복합 훈련", "동체시력 8자 트레이닝",
//               "사선 시선 이동 훈련", "베르누이 렘니스케이트 추적", "시선 떨림 교정", "눈 피로 8자 운동"
// Authentic Domain Terms: 8자 안구 운동（Figure-8 Eye Movement）, 베르누이 렘니스케이트（Lemniscate of Bernoulli）, 정중선 교차（Midline Crossing）, 양안 협응 운동（Binocular Coordination）, 원활추종 안구운동（Smooth Pursuit）, 보정 사케드 억제（Catch-up Saccade Suppression）
// ============================================================

export const metadata = {
  title: "8자 안구 운동 훈련・인피니티 시각 추적 – 정중선 교차 원활추종 | SkillDrills",
  description: "베르누이 렘니스케이트(8자 무한 궤적)를 따라 시선을 매끄럽게 회전시켜 6개 외안근의 복합 연동과 정중선 교차 시 양안 협응력을 극대화하는 비전트레이닝. 무료・무설치.",
  keywords: [
    "8자 안구 운동",
    "8자 눈 운동",
    "양안 협응 운동",
    "정중선 교차 안구 훈련",
    "비전트레이닝 8자 운동",
    "원활추종 8자 검사",
    "외안근 복합 훈련",
    "동체시력 8자 트레이닝",
    "사선 시선 이동 훈련",
    "베르누이 렘니스케이트 추적",
    "시선 떨림 교정",
    "눈 피로 8자 운동"
  ],
  openGraph: {
    title: "8자 안구 운동 훈련・인피니티 시각 추적 – 정중선 교차 원활추종 | SkillDrills",
    description: "베르누이 렘니스케이트(8자 무한 궤적)를 따라 시선을 매끄럽게 회전시켜 6개 외안근의 복합 연동과 정중선 교차 시 양안 협응력을 극대화하는 비전트레이닝.",
    type: "website",
    url: "https://skilldrills.online/ko/drills/visual-tracking/infinity-pursuit",
    siteName: "SkillDrills",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "8자 안구 운동 훈련・인피니티 시각 추적 – 정중선 교차 원활추종 | SkillDrills",
    description: "8자 무한 궤적을 매끄럽게 추적하며 정중선 교차 시 시선 튐을 억제하고 양안 협응성을 단련하는 무료 온라인 안구 훈련.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/visual-tracking/infinity-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/infinity-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://skilldrills.online/ko" },
    { "@type": "ListItem", "position": 2, "name": "훈련 목록", "item": "https://skilldrills.online/ko/drills" },
    { "@type": "ListItem", "position": 3, "name": "시각 추적・아이 트래킹", "item": "https://skilldrills.online/ko/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "8자 안구 운동 훈련・인피니티 시각 추적 테스트", "item": "https://skilldrills.online/ko/drills/visual-tracking/infinity-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "8자 안구 운동 훈련・인피니티 시각 추적 테스트",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "베르누이 렘니스케이트(8자 무한 궤적)를 따라 6개 외안근을 복합 연동시키며 정중선 교차와 양안 협응성을 극대화하는 무료 비전트레이닝 도구.",
  "url": "https://skilldrills.online/ko/drills/visual-tracking/infinity-pursuit",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online/ko" },
  "inLanguage": "ko",
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "8자 안구 운동 훈련・인피니티 시각 추적 테스트 – 양안 협응 & 정중선 교차 원활추종 | SkillDrills",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas 지원 브라우저 (Chrome, Edge, Firefox, Safari)",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "url": "https://skilldrills.online/ko/drills/visual-tracking/infinity-pursuit",
  "inLanguage": "ko",
  "dateModified": "2026-09-15"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "8자 안구 운동 훈련・인피니티 시각 추적 테스트",
  "url": "https://skilldrills.online/ko/drills/visual-tracking/infinity-pursuit",
  "description": "8자 렘니스케이트 궤도 위를 연속 이동하는 표적을 중심와로 포착하여 원활추종 안구운동과 정중선 교차 능력을 측정하고 강화하는 아이 트래킹 게임.",
  "genre": ["Action", "Brain Game", "Eye Tracking", "Vision Training"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "8자 안구 운동 훈련 측정 및 실천 4단계 가이드",
  "description": "베르누이 렘니스케이트 궤적을 활용하여 양안 협응력과 정중선 교차 추적 능력을 체계적으로 향상시키는 훈련 절차.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "시거리 확보 및 두부 고정",
      "text": "모니터와 약 50~70cm 거리를 유지하고 턱을 당겨 머리를 완전히 고정합니다. 고개를 돌리지 않고 순수하게 안구만으로 표적을 추적할 준비를 합니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/infinity-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "세션 시간 및 속도 배율 선택",
      "text": "훈련 목적에 맞춰 30초~120초 세션 시간과 0.5x~9.0x 속도 배율을 설정합니다. 초심자는 1.0x 기본 속도에서 원활추종이 끊기지 않는지 확인합니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/infinity-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "중심와 고정 및 정중선 교차 연속 추적",
      "text": "시작 신호와 함께 8자 궤도를 순환하는 타깃의 정중앙을 시선 중심와로 물샐틈없이 추종합니다. 중앙 교차점(신체 정중선)을 지날 때 시선이 튀지 않도록 매끄럽게 유지합니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/infinity-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "추종 정확도 확인 및 점진적 부하 증강",
      "text": "세션 완료 후 시선 유지율과 정중선 통과 시의 안정성을 평가합니다. 시선 도약이 발생하지 않고 완벽히 추종되면 속도 단계를 0.2x씩 점진적으로 끌어올립니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/infinity-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "8자 안구 운동(인피니티 퍼슈트)이란 어떤 훈련인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "수학적인 베르누이 렘니스케이트(가로로 누운 8자・무한대 기호 ∞) 곡선 궤적을 따라 이동하는 표적을 고개를 고정한 채 오직 안구(시선 중심와)만으로 매끄럽게 추종하는 비전트레이닝입니다. 수평·수직·사선 방향의 시선 이동이 끊김 없이 복합적으로 이어지기 때문에 안구를 둘러싼 6개 외안근을 고르게 자극하고 시각 추적 유연성을 극대화합니다."
      }
    },
    {
      "@type": "Question",
      "name": "단순한 직선이나 원형 추적보다 왜 8자(렘니스케이트) 궤적이 더 효과적인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "직선 운동은 끝점에서 속도가 0이 되는 정지점이 생기고, 단순 원형 운동은 회전 방향이 일정하여 특정 근육군에 편향되기 쉽습니다. 반면 8자 궤적은 곡률 반경이 연속적으로 변화하며 시계 방향과 반시계 방향이 번갈아 교차하고, 신체 좌우를 가르는 '정중선(중심축)'을 대각선으로 통과합니다. 이러한 가속도 변화와 궤도 반전의 조합이 소뇌의 예측적 운동 제어와 양안 협응력을 가장 균형 있게 단련합니다."
      }
    },
    {
      "@type": "Question",
      "name": "'정중선 교차(Midline Crossing)' 시 시선이 튀거나 불안정해지는 이유는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "시선이 시야 중앙(신체 정중선)을 가로지를 때, 망막 신호를 담당하는 대뇌 반구의 주도권이 좌반구에서 우반구(또는 반대)로 전환됩니다. 뇌량(Corpus Callosum)을 통한 양측 반구 간 정보 교환에 미세한 지연이나 병목이 발생하면 부드러운 원활추종(Smooth Pursuit)이 순간 단절되고, 뒤처진 시선을 급격히 당겨오려는 무의식적 도약 안구운동(보정 사케드)이 발생합니다. 이 정중선을 부드럽게 통과하도록 훈련하는 것이 본 운동의 핵심입니다."
      }
    },
    {
      "@type": "Question",
      "name": "8자 궤적 추적에 관여하는 눈 근육(외안근)은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "내직근·외직근(좌우 수평 운동), 상직근·하직근(상하 수직 운동), 그리고 상사근·하사근(안구 회전 및 대각선 상하 운동)의 총 6쌍의 외안근이 긴밀하게 협력합니다. 특히 8자 루프의 완만한 외곽 선회부와 대각선 교차 통과 구간에서는 사근과 직근이 복합적으로 동시 수축해야 하므로 전반적인 안구 근육 밸런스를 잡는 데 탁월합니다."
      }
    },
    {
      "@type": "Question",
      "name": "FPS 게임의 에임 트래킹과 반동 제어에 구체적으로 어떤 도움이 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FPS 게임에서 적이 대각선으로 점프하거나 슬라이딩하며 불규칙한 호를 그릴 때, 시선이 부드럽게 따라가지 못하고 사케드로 뚝뚝 끊기면 화면이 흔들려 정밀한 에임 조준선 보정이 불가능해집니다. 8자 안구 운동을 통해 추종 게인(Gain)을 1.0에 가깝게 끌어올리면 곡선 기동을 펼치는 타깃에도 조준선이 안정적으로 밀착되며, 오버슈팅이나 손목의 불필요한 경직을 획기적으로 줄일 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "독서 속도, 집중력, 학습 능력 향상에도 실질적인 효과가 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "그렇습니다. 독서 시 줄을 바꿔 읽거나 긴 문장을 스캔할 때, 그리고 공 구기 종목에서 날아오는 공의 입체 궤적을 쫓을 때 중심 시야를 가로지르는 양안 협응력이 필수적입니다. 8자 운동으로 정중선 교차가 매끄러워지면 줄 건너뜀, 읽기 피로, 시선 걸림 현상이 사라져 시각 정보의 흡수 및 뇌내 처리 속도가 뚜렷하게 향상됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "머리가 타깃을 따라 함께 움직이는 것을 어떻게 방지하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "머리가 움직이는 것은 눈 근육의 부담을 줄이기 위해 경추 회전과 전정안반사(VOR)를 동원하려는 뇌의 본능적인 보상 기전입니다. 턱밑에 가볍게 손가락을 대어 머리가 전혀 움직이지 않음을 촉각으로 인지하거나, 모니터 하단에 턱을 가볍게 받치고 목 근육을 완전히 이완시킨 채 오직 안구만을 독립적으로 굴리는 '순수 안구 운동 격리' 연습을 의식적으로 진행해야 합니다."
      }
    },
    {
      "@type": "Question",
      "name": "하루 권장 훈련 시간과 적정 세션 반복 횟수는 어떻게 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1회 60초~90초 세션을 하루 2~3회 수행하는 것이 가장 이상적입니다. 지나치게 오랜 시간 연속으로 화면을 응시하면 외안근 피로와 조절성 눈 피로(조절경련)가 발생하여 오히려 추종 정밀도가 떨어지므로, 세션 사이에 20초 이상 먼 곳(6미터 이상)을 바라보는 '20-20-20 규칙'을 지키며 휴식을 병행해야 합니다."
      }
    },
    {
      "@type": "Question",
      "name": "모니터와의 권장 거리 및 화면 크기 세팅은 어떻게 설정하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "모니터 화면과 50cm~70cm 거리를 유지하며, 화면 상단 모서리가 눈높이와 수평이 되도록 의자 높이를 조절합니다. 시야각 기준 좌우 약 30~40도 범위에서 타깃이 이동하도록 브라우저 창 크기를 조절하면 외안근의 가동 범위를 최대한으로 활용하는 최적의 운동 환경이 조성됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "훈련 중 눈이 뻑뻑하거나 가벼운 어지러움이 느껴질 때는 어떻게 대처하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "평소 사용 빈도가 낮은 안구 사근군과 정중선 교차 신경망에 새로운 자극이 전달되면 일시적으로 가벼운 어지럼증이나 눈 피로감이 들 수 있습니다. 이러한 증상이 나타나면 즉시 훈련을 멈추고 눈을 감은 채 심호흡을 하거나 먼 창밖을 응시하세요. 다음 세션에서는 속도를 0.8x나 0.5x로 낮춰 적응 기간을 거친 뒤 서서히 단계를 높이는 것이 안전합니다."
      }
    }
  ]
};

const guideProps = {
  heading: "8자 안구 운동・인피니티 시각 추적의 신경안과학 기준",
  intro: [
    "스위스의 수학자 야코프 베르누이가 고안한 렘니스케이트(Lemniscate) 곡선은 단일 평면상에서 곡률과 회전 방향이 끊김 없이 매끄럽게 교차하는 무한 루프(∞) 궤적을 이룹니다. 인간의 시각 운동 체계에서 이 8자 경로를 두부 회전 없이 순수 안구운동만으로 완벽하게 추종하는 행위는, 내직근·외직근(수평 회전), 상직근·하직근(수직 승강), 상사근·하사근(외회선 및 내회선) 등 총 6쌍의 외안근이 각도에 따라 미세하게 장력을 배분하는 극도로 정교한 신경근 협응을 요구합니다(Robinson, 1965). 대뇌 측두두정후두엽(MT/MST 영역)에서 추출된 표적의 순간 벡터 신호는 전두안야(FEF) 및 소뇌 편엽·방편엽으로 즉각 전송되어, 망막 중심와에 맺히는 상의 미끄러짐(Retinal Slip)을 0으로 수렴시키는 원활추종(Smooth Pursuit) 안구운동을 실시간으로 발현시킵니다.",
    "8자 궤도 추종의 핵심적인 신경학적 관문은 좌우 타원형 루프가 교차하는 '신체 중심선(Visual Midline)'을 관통하는 찰나에 발생합니다. 시선이 좌측 시야에서 우측 시야로(또는 그 반대로) 이동할 때, 망막 수용기에서 신호를 전달받는 주요 대뇌 피질 반구가 반대편으로 급격하게 교대됩니다(Leigh & Zee, 2015). 양측 대뇌 반구를 잇는 뇌량(Corpus Callosum)을 통한 신경 정보 전이에 미세한 지연이나 잡음이 개입되면 매끄럽던 원활추종이 끊어지며, 목표물을 놓치지 않으려는 무의식적 급속 안구운동인 '보정 사케드(Catch-up Saccade)'가 혼입됩니다. 본 드릴을 통해 정중선 통과 시의 추종 게인을 유지하는 반복 훈련을 지속하면 뇌량의 정보 교환 효율이 강화되어 중심 시야에서의 불필요한 시선 떨림과 읽기 단절 현상이 근본적으로 교정됩니다.",
    "단순한 등속 원운동과 달리 8자 렘니스케이트 궤적은 외곽의 완만한 선회부에서 중앙 교차점으로 진입함에 따라 동경 벡터와 곡률 반경이 급격하게 축소되며 가속도를 동반합니다. 이와 같은 변동 궤적을 뚝뚝 끊김 없이 부드럽게 추종하려면, 뇌의 소뇌 내부 물리 모델이 표적의 물리적 운동 방정식을 사전에 연산하여 안구 회전 속도를 선제적으로 가감속시키는 '예측적 추종 게인 제어(Predictive Pursuit Control)'가 필수적입니다(Barnes, 2008). 표적의 현재 위치에만 사후 반응하는 폐루프 피드백 제어는 100~130밀리초에 달하는 신경계 전달 지연으로 인해 반드시 시선 이탈을 초래하지만, 8자 궤적을 반복 순환하면서 소뇌의 전방 예측 모델(Forward Internal Model)이 완성되면 지연 없는 완전한 중심와 밀착이 가능해집니다(Krauzlis, 2004).",
    "8자 안구 운동은 신경안과학 및 비전트레이닝 분야에서 양안시 이상, 사시 교정 후 기능 회복, 난독증 치료에 오랜 세월 검증되어 온 핵심 훈련 프로토콜입니다. 최근에는 에이펙스 레전드, 오버워치 등 하이퍼 FPS 게임의 최상위 프로게이머들이 대각선 점프나 슬라이딩 기동을 펼치는 적을 놓치지 않고 조준선을 밀착시키는 '트래킹 에임 기초 훈련'으로 광범위하게 활용하고 있습니다. 또한 하루 종일 고정된 화면과 텍스트를 응시하는 현대 직장인들에게 8자 궤적의 전방위 안구 회전은 굳어진 외안근의 혈류 순환을 촉진하고 조절성 긴장을 해소하여 모니터 증후군(VDT)에 수반되는 눈 시림과 두통을 경감시키는 탁월한 회복 운동 역할을 수행합니다(Woods et al., 2015)."
  ],
  benchmarks: {
    title: "8자 안구 운동・인피니티 추적 성능 지표 (Lemniscate Pursuit Benchmarks)",
    headers: ["숙련도 등급", "추종 게인 (Pursuit Gain)", "정중선 사케드 침범률", "궤적 추종 효율 (Trajectory Efficiency)", "신경생리학적 도달 수준"],
    rows: [
      ["엘리트 (프로 선수급)", "0.96 ～ 1.02", "2% 미만 (완전 평활)", "98% 이상", "전체 외안근의 완벽한 협응. 정중선 교차 시에도 사케드 간섭이 전혀 없으며 소뇌 내부 예측 모델이 완전 동기화"],
      ["상급 (랭커 게이머급)", "0.90 ～ 0.95", "2% ～ 5%", "92% ～ 97%", "우수한 원활추종 안정성. 급격한 곡률 변화 구간에서 미세한 위상 지연만 관측되며 중심와 고정 유지"],
      ["표준 실용급 (건강한 성인)", "0.80 ～ 0.89", "6% ～ 12%", "82% ～ 91%", "일상적 시각 추적에 충분한 수준. 정중선 통과 및 외곽 루프 정점에서 간헐적인 보정 사케드 발생"],
      ["훈련 요망 (발달 과정・경미 피로)", "0.68 ～ 0.79", "13% ～ 22%", "70% ～ 81%", "추종 지연이 현저함. 잦은 시선 도약이 발생하며, 외안근 경직 및 좌우 반구 간 협응 지연이 관찰됨"],
      ["초심자 (협응 결손・심한 피로)", "0.68 미만", "22% 초과", "70% 미만", "원활추종 지속 불가. 고개가 함께 돌아가는 보상 작용이 빈번하며 외안근 유연성 및 양안 협응 기초 훈련 필요"]
    ],
    note: "※ 본 기준표는 시거리 50~70cm 조건에서 속도 1.0x~2.0x로 60초간 연속 8자 렘니스케이트 추적을 수행한 안구 운동 계측 분석에 기반합니다. 추종 게인은 '안구 각속도 ÷ 표적 각속도'로 산출되며 1.0은 완전 일치를 의미합니다."
  },
  techniques: {
    title: "8자 무한 궤적 추종 게인과 정중선 교차를 극대화하는 4대 테크닉",
    items: [
      {
        name: "두부 고정 및 순수 안구 회전 격리 (Cervical Stabilization & Ocular Isolation)",
        desc: "턱밑에 손가락을 가볍게 받쳐 머리가 미세하게도 회전하지 않음을 확인하며 오직 안구 근육만으로 시선을 움직이세요. 경추 회전을 완벽히 차단해야 전정안반사(VOR)의 개입 없이 순수 대뇌-소뇌-외안근 신경 회로만 집중 단련됩니다.",
        tips: "목덜미와 어깨의 긴장을 풀고 모니터 중앙과 코끝을 잇는 가상의 중심축을 단단히 고정하세요."
      },
      {
        name: "중앙 교차 노드(정중선) 진입 전 선제적 속도 적응 (Anticipatory Speed Modulation)",
        desc: "8자의 중앙 교차점에 다다를 때 표적은 가속도를 동반하여 진입합니다. 표적이 중심점에 도달하기 약 50밀리초 전부터 시선을 교차점의 수 픽셀 앞쪽으로 부드럽게 흘려보내는 느낌을 유지하여 뇌량 전이 지연을 선제적으로 상쇄하세요.",
        tips: "중심을 지나는 순간 '응시'하려 힘주지 말고 시선이 자연스럽게 미끄러지도록 유도하면 사케드가 사라집니다."
      },
      {
        name: "외측 루프 정점에서의 최대 반경 주파 (Full Radial Extension at Loop Apices)",
        desc: "바깥쪽 선회 구간에서는 진행 방향이 180도 역전되므로 시선이 지름길을 찾아 안쪽으로 가로지르려는 유혹에 빠지기 쉽습니다. 표적의 바깥쪽 외곽선까지 시선 중심와를 끝까지 밀착시키며 상사근과 하사근이 최대 가동 반경까지 늘어나는 감각을 유지하세요.",
        tips: "선회부 끝점에서 시선이 먼저 질러가지 않도록 타깃의 중심핵에 끝까지 시선을 묶어두세요."
      },
      {
        name: "속도 사다리 점증법 및 20-20-20 휴식 관리 (Velocity Ladder & Recovery Protocol)",
        desc: "처음부터 고속(3.0x 이상)으로 훈련하면 안구가 표적을 놓쳐 사케드로 점프하게 되고, 잘못된 신경 습관이 고착됩니다. 1.0x 속도에서 60초간 시선 단절이 0회인 세션을 먼저 완성한 뒤 0.2x씩 속도를 올리세요. 세션 후에는 먼 곳을 20초간 바라보며 외안근의 긴장을 푸세요.",
        tips: "눈이 뻑뻑해지면 무리하게 참지 말고 의식적으로 깜빡여 각막 표면의 눈물층을 유지하세요."
      }
    ]
  },
  steps: [
    "모니터와 약 50~70cm 거리를 유지하고 턱을 당겨 머리를 완전히 고정합니다.",
    "훈련 목적에 맞춰 30초~120초 세션 시간과 0.5x~9.0x 속도 배율을 설정합니다.",
    "시작 신호와 함께 8자 궤도를 순환하는 타깃의 정중앙을 시선 중심와로 물샐틈없이 추종합니다.",
    "중앙 교차점(신체 정중선)을 지날 때 시선이 튀지 않도록 매끄럽게 유지합니다.",
    "세션 완료 후 시선 유지율을 확인하고, 안정적으로 추종되면 속도 단계를 점진적으로 끌어올립니다."
  ],
  audience: "FPS(Apex Legends, Overwatch, VALORANT) 게이머, 동체시력과 시각 반응성을 높이고 싶은 운동선수, 독서 시 시선 걸림 및 모니터 장시간 응시로 인한 안구 피로를 해소하고 싶은 모든 사용자.",
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('robinson1965', 'leigh2015', 'barnes2008', 'krauzlis2004', 'woods2015'),
  related: [
    { href: "/ko/drills/visual-tracking/constant-slow-pursuit", label: "저속 안구 운동 훈련 (Constant Slow)" },
    { href: "/ko/drills/visual-tracking/directional-chaos-pursuit", label: "카오스 방향 전환 추적 (Directional Chaos)" },
    { href: "/ko/drills/visual-tracking/dynamic-evasion-pursuit", label: "회피 표적 추적 훈련 (Dynamic Evasion)" },
    { href: "/ko/drills/visual-tracking/ghosting-suppress-pursuit", label: "잔상 억제 시선 고정 훈련 (Ghosting Suppress)" },
    { href: "/ko/drills/visual-tracking/sine-wave-pursuit", label: "사인파 안구 추적 훈련 (Sine Wave)" },
    { href: "/ko/drills/visual-tracking/predictive-pursuit", label: "가림 구간 예측 추적 (Predictive)" }
  ]
};

export default function KoreanInfinityPursuitPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <InfinityPursuitClient
        copy={{
          title: "8자 안구 운동 훈련: 양안 협응과 정중선 교차 인피니티 시각 추적",
          subtitle: "베르누이 렘니스케이트 궤적 기반 원활추종 안구운동 및 시지각 통합 비전트레이닝",
          description: "베르누이 렘니스케이트(8자 무한 궤적)를 따라 시선을 매끄럽게 회전시켜 6개 외안근의 복합 연동과 정중선 교차 시 양안 협응력을 극대화하는 비전트레이닝. 수평·수직·사선 방향의 시선 이동에서 도약 안구운동(사케드) 오류를 최소화하고 중심와 고정력을 완성합니다(Robinson, 1965; Leigh & Zee, 2015). 무료・무설치."
        }}
      />

      <DrillGuide guide={guideProps} />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/ko/drills/visual-tracking/infinity-pursuit" />
      </div>
    </>
  );
}
