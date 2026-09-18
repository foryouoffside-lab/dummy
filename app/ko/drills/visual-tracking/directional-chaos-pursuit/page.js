import DirectionalChaosPursuitClient from '@/app/drills/visual-tracking/directional-chaos-pursuit/DirectionalChaosPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// KOREAN SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "불규칙 안구 추적 훈련" / "카오스 방향 전환 테스트" (Erratic ocular motor tracking)
// Secondary:    "사케드 회복", "에임 트래킹 불규칙", "돌발 시각 반응"
// LSI / Domain:  "안구 운동 훈련", "동체시력 테스트", "무작위 궤적 추적",
//               "망막 슬립", "스트레이프 대응 에임", "중심와 재포착", "반사적 안구 운동"
// Authentic Domain Terms: 도약안구운동(Saccade), 보정 사케드(Catch-up Saccade), 원활추종안구운동(Smooth Pursuit), 망막 슬립(Retinal Slip), 중심와 포착(Foveal Capture), 실시간 시각 피드백(Reactive Feedback)
// ============================================================

export const metadata = {
  title: "불규칙 안구 추적 훈련・카오스 방향 전환 테스트 – 사케드 회복 & 반응형 동체시력 | SkillDrills",
  description: "예측 불가능하게 급선회하는 표적을 안구 운동으로 신속히 재포착하는 보정 사케드 회복 및 반응형 동체시력 트레이닝. 뇌의 예측 모델을 배제하고 실시간 시각 반사 신경을 극대화합니다. 무료 이용.",
  keywords: [
    "불규칙 안구 추적 훈련",
    "카오스 방향 전환 테스트",
    "사케드 회복",
    "에임 트래킹 불규칙",
    "돌발 시각 반응",
    "안구 운동 훈련",
    "동체시력 테스트",
    "무작위 궤적 추적",
    "망막 슬립",
    "스트레이프 대응 에임",
    "중심와 재포착",
    "반사적 안구 운동"
  ],
  openGraph: {
    title: "불규칙 안구 추적 훈련・카오스 방향 전환 테스트 – 사케드 회복 & 반응형 동체시력 | SkillDrills",
    description: "예측 불가능하게 급선회하는 표적을 안구 운동으로 신속히 재포착하는 보정 사케드 회복 및 반응형 동체시력 트레이닝. 뇌의 예측 모델을 배제하고 실시간 시각 반사 신경을 극대화합니다.",
    type: "website",
    url: "https://skilldrills.online/ko/drills/visual-tracking/directional-chaos-pursuit",
    siteName: "SkillDrills",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "불규칙 안구 추적 훈련・카오스 방향 전환 테스트 – 사케드 회복 & 반응형 동체시력 | SkillDrills",
    description: "무작위로 방향을 꺾는 표적에 대한 사케드 회복과 반응형 시선 추적을 훈련하는 무료 웹 기반 신경 시각 드릴.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/visual-tracking/directional-chaos-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/directional-chaos-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://skilldrills.online/ko" },
    { "@type": "ListItem", "position": 2, "name": "드릴 목록", "item": "https://skilldrills.online/ko/drills" },
    { "@type": "ListItem", "position": 3, "name": "시각 추적 및 안구 훈련", "item": "https://skilldrills.online/ko/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "불규칙 안구 추적 훈련 (카오스 추적)", "item": "https://skilldrills.online/ko/drills/visual-tracking/directional-chaos-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "불규칙 안구 추적 훈련・카오스 방향 전환 테스트 (Directional Chaos Pursuit)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/ko/drills/visual-tracking/directional-chaos-pursuit",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "예측할 수 없이 불규칙하게 방향과 속도를 전환하는 표적을 안구 운동으로 즉각 재포착하는 브라우저 기반 사케드 회복 및 반사적 동체시력 측정 도구.",
  "featureList": [
    "확률적 알고리즘 기반의 완전 비예측 다방향 카오스 운동 시뮬레이션",
    "0.5배속부터 9.0배속까지 정밀 속도 제어 및 무작위 가속도 변이 기능",
    "시선 잔상 트레일, CRT 주사선, 발광(Glow) 효과 시각화 옵션",
    "외부 서버 통신 없는 완전한 클라이언트 단 로컬 데이터 저장"
  ],
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "불규칙 안구 추적 훈련 – 사케드 회복 온라인 트레이너 | SkillDrills",
  "alternateName": "Directional Chaos Pursuit Korea",
  "url": "https://skilldrills.online/ko/drills/visual-tracking/directional-chaos-pursuit",
  "dateModified": "2026-09-15",
  "description": "예측이 불가능한 카오스 움직임에 대해 실시간 시각 피드백과 보정 사케드를 구사하여 표적을 중심와에 고정하는 무료 온라인 신경 동체시력 훈련 도구.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas를 지원하는 최신 웹 브라우저",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "불규칙 추종안구운동, 보정 사케드, 실시간 시각 피드백, 망막 슬립 억제, 동체시력 민첩성"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "불규칙 안구 추적 훈련・카오스 방향 전환 테스트 (Directional Chaos Pursuit)",
  "url": "https://skilldrills.online/ko/drills/visual-tracking/directional-chaos-pursuit",
  "description": "무작위로 급선회하는 표적을 시선으로 놓치지 않고 추적하며 시각 반사 신경과 안구 근육의 반응력을 단련하는 무료 웹 게임.",
  "genre": ["Eye Tracking", "Visual Training", "Reaction Speed"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "불규칙 카오스 안구 추적 및 사케드 회복 트레이닝 진행 방법",
  "dateModified": "2026-09-15",
  "description": "돌발적인 표적의 방향 전환에 맞서 시선을 즉각 끌어당겨 추적 게인을 회복하기 위한 단계별 훈련 가이드.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "기본 속도 및 훈련 시간 설정",
      "text": "예측 불가능한 무작위 움직임에 적응하기 위해 초기에는 1.0x 기준 속도와 60초 세션을 선택합니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/directional-chaos-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "머리 고정 및 안구 독립 주시 자세 확보",
      "text": "머리를 일체 움직이지 않고 양쪽 안구의 외안근만으로 추적할 수 있도록 모니터와 50~70cm 거리를 두고 정자세를 유지합니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/directional-chaos-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "돌발 방향 전환 시 즉각적인 보정 사케드 발동",
      "text": "표적이 급격히 궤적을 꺾어 중심와를 벗어나는 즉시, 짧고 빠른 도약안구운동으로 표적을 시야 중앙으로 재인출합니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/directional-chaos-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "재포착 즉시 원활추종 게인 복원 유지",
      "text": "도약으로 표적을 포착한 직후 시선을 멈추지 않고, 즉각 부드러운 원활추종 상태로 전환하여 새로운 이동 궤적을 락온합니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/directional-chaos-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-15",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "불규칙 안구 추적 훈련(Directional Chaos Pursuit)이란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "이 훈련은 이동 방향과 속도가 확률적 알고리즘에 의해 무작위로 급변하는 표적을 안구만으로 지속 추적하는 신경 시각 트레이닝입니다. 규칙적인 궤적과 달리 사전 예측이 원천 차단되므로, 망막 슬립을 실시간으로 감지하고 신속한 보정 사케드를 통해 원활추종 상태로 복귀하는 신경 회로의 즉각 반응성을 단련합니다(Bahill et al., 1980)."
      }
    },
    {
      "@type": "Question",
      "name": "사케드 회복(Catch-up Saccade)이란 어떤 신경학적 기전인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "표적이 급격한 방향 전환을 일으키면 안구 원활추종의 물리적 한계 속도(약 30°/s)를 초과하여 표적 상이 중심와에서 탈락합니다. 이때 뇌의 시각 피질과 상구, 전두안운동야(FEF)가 즉각 위치 오차를 연산하여 약 150~200ms 지연 후 표적 위치로 시선을 순간 도약시켜 중심와에 재일치시키는 보정 반사가 바로 사케드 회복입니다(Krauzlis, 2004; Barnes, 2008)."
      }
    },
    {
      "@type": "Question",
      "name": "규칙적인 안구 운동(사인파, 리사주)과 불규칙 카오스 추적의 차이는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "사인파나 리사주 같은 규칙적 운동에서는 소뇌의 내부 예측 모델이 작동하여 감각 지연을 상쇄하는 '예측 추종'이 가능합니다. 반면 본 드릴과 같은 카오스 운동에서는 과거 궤적으로 미래를 예측할 수 없으므로, 실제 감각 입력에 실시간으로 즉각 반응하는 '순수 반사형 피드백 제어'만이 작동합니다(Robinson, 1965)."
      }
    },
    {
      "@type": "Question",
      "name": "FPS 게임(에이펙스 레전드, 오버워치 등)의 스트레이프 대응에 왜 필수적인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "교전 중 적이 좌우로 불규칙하게 꺾는 무빙(ADAD Strafe)을 구사할 때, 적의 급반전에 에임이 멈칫하거나 늦어지는 반응 랙을 획기적으로 줄여줍니다. 사케드 회복 능력이 발달하면 적이 방향을 꺾는 즉시 최소한의 오차로 조준선을 다시 타깃 위에 고정할 수 있습니다(Yang et al., 2025)."
      }
    },
    {
      "@type": "Question",
      "name": "머리를 고정하고 눈동자만 움직여야 하는 이유는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "머리를 함께 움직이면 전정안구반사(VOR)가 개입하여 대뇌 피질과 소뇌의 순수 안구 운동 제어 시스템에 충분한 부하가 걸리지 않습니다(Leigh & Zee, 2015). 외안근 자체의 순발력과 독립적인 신경 협응력을 키우기 위해서는 두부를 완전히 고정해야 합니다."
      }
    },
    {
      "@type": "Question",
      "name": "하루 권장 훈련 시간과 세트 구성은 어떻게 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1세션당 60초 훈련 후 30초 휴식을 취하는 방식으로, 하루 3~5세트(총 5~8분)가 가장 권장됩니다. 돌발적인 방향 전환 추적은 신경 피로도가 매우 높으므로 무리하게 오래 지속하기보다는 매일 꾸준한 반복을 통해 신경 전달 속도를 최적화하는 것이 이상적입니다."
      }
    },
    {
      "@type": "Question",
      "name": "표적을 완전히 놓쳐 눈이 길을 잃을 때는 어떻게 해야 하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "화면 설정에서 속도 배율(Speed Multiplier)을 0.5x~0.8x 수준으로 낮추고, 표적 크기(Target Size)를 24px 이상으로 키워 시각적 포착 난이도를 낮추십시오. 궤적 전환에 안정적으로 반응할 수 있게 되면 단계적으로 속도를 높여나가시기 바랍니다."
      }
    },
    {
      "@type": "Question",
      "name": "모니터 주사율(Hz)이 카오스 추적 정확도에 어떤 영향을 미치나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "무작위 급선회 자극에서는 주사율이 결정적인 역할을 합니다. 60Hz 모니터는 프레임 갱신 간격이 약 16.7ms로 길어 궤적 변곡점이 끊겨 보이지만, 144Hz~240Hz 모니터는 4ms 안팎으로 첫 방향 전환 프레임을 즉시 전달하여 시선의 재포착 반응을 훨씬 빠르게 유도합니다(Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "실제 구기 스포츠(축구, 테니스, 농구) 민첩성 향상에도 도움이 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네. 불규칙하게 바운드되는 공이나 상대 선수의 페이크 동작, 돌발적인 방향 전환에 찰나의 순간 시야를 다시 고정하는 시각 민첩성은 엘리트 운동선수의 경기력을 좌우하는 필수 기초 능력입니다(Appelbaum & Erickson, 2018)."
      }
    },
    {
      "@type": "Question",
      "name": "이 불규칙 안구 추적 테스트는 무료로 이용할 수 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, SkillDrills의 모든 시각 훈련 도구와 마찬가지로 완전 무료이며 별도의 회원가입이나 프로그램 설치가 필요 없습니다. 모든 훈련 기록과 설정은 사용자의 브라우저 로컬 저장소에만 안전하게 보관됩니다."
      }
    }
  ]
};

const guideProps = {
  heading: "불규칙 안구 추적과 사케드 회복의 신경 운동 제어 과학",
  intro: [
    "불규칙 안구 추적(Directional Chaos Pursuit)은 이동 속도 벡터와 진행 각도가 확률적으로 급격히 변동하는 동적 자극에 시각 운동계가 실시간으로 대응하는 고난도 동체시력 과제입니다. 직선이나 원운동처럼 이동 경로를 사전에 예측할 수 있는 자극과 달리, 소뇌의 예측 모델(Feedforward Internal Model) 작동을 배제하고 오직 감각 입력에 기반한 실시간 시각 피드백 반응 능력을 한계까지 시험합니다(Bahill, Iandolo, & Troost, 1980).",
    "사케드 회복과 원활추종 게인의 이중 운동 제어: 표적이 예기치 않게 급선회하는 순간, 부드러운 안구 추종(원활추종)의 물리적 한계 속도(약 30°/s)를 초과하면서 표적 상이 망막의 중심와에서 이탈합니다. 이때 망막 슬립 신호를 수신한 전두안운동야(FEF)와 상구(Superior Colliculus)는 약 150~200ms의 잠복기를 거쳐 표적 위치로 시선을 순간 도약시키는 '보정 사케드(Catch-up Saccade)'를 강제 방출합니다(Rashbass, 1961; Krauzlis, 2004). 도약 직후 시선을 흔들림 없이 정지시키고 즉각 새로운 벡터의 원활추종으로 전환하는 능력이 전체 동체시력의 민첩성을 좌우합니다.",
    "e스포츠 및 대인 스포츠에서의 실전 전이 가치: FPS 게임에서 적의 고속 좌우 스트레이프 무빙(ADAD 무빙)에 대응할 때나 농구·테니스 등 대인 구기 종목에서 불규칙한 방향 전환에 직면했을 때, 시각적 진동을 억제하고 시선을 즉각 재포착하는 능력은 교전 승률을 결정합니다(Yang et al., 2025; Appelbaum & Erickson, 2018). 본 드릴은 무작위 벡터 변환을 지속적으로 안구에 노출하여 외안근의 반사적 협응력과 시각 피질의 정보 처리 효율을 극대화합니다.",
    "측정 정밀도 및 하드웨어 디스플레이의 영향: 본 드릴은 무작위 움직임에 대한 시선 유지력과 방향 전환 시점의 즉각적인 재포착 능력을 평가합니다. 일반적인 60Hz 모니터는 프레임 간격이 길어 급선회의 첫 순간이 잔상과 지연으로 가려질 수 있습니다. 급격한 벡터 변화를 정확히 감지하고 신속한 도약안구를 발동하기 위해서는 144Hz 이상의 고주사율 게이밍 모니터 환경에서 훈련하는 것이 권장됩니다(Woods et al., 2015). 모든 설정 및 결과는 로컬 브라우저에 안전하게 보존됩니다."
  ],
  benchmarks: {
    title: "불규칙 안구 추적 및 사케드 회복 성능 평가 기준 (에디토리얼 가이드)",
    headers: ["숙련도 등급", "목표 속도 배율 (Speed Multiplier)", "사케드 회복 속도 및 시선 유지 특성", "신경 반응 및 안구 제어 프로필"],
    rows: [
      ["티어 1: 최상위 반사형 추적 (Apex Reactive)", "2.0x 이상의 초고속 영역", "방향 전환 직후 즉각적인 보정 사케드가 착탄하며 흔들림 없이 신규 벡터에 밀착.", "극도로 단련된 시각 피질-상구 전달 속도. 프로 e스포츠 선수 및 최상위 구기 선수 수준."],
      ["티어 2: 우수 사케드 회복 (Superior Recovery)", "1.4x – 1.9x 고속 영역", "급격한 반전에도 신속하게 시선을 재포착하며 원활추종으로의 복귀가 매끄러움.", "뛰어난 외안근 순발력과 망막 슬립 감지력. 고티어 FPS 교전 스트레이프에 완벽 대응 가능."],
      ["티어 3: 표준 성인 기준 (Solid Baseline)", "1.0x – 1.3x 표준 영역", "표준 속도의 불규칙 움직임을 무난히 추적하나 급선회 시 찰나의 시선 지연 발생.", "건강한 성인의 표준적인 시각 반사 수준. 일상적인 스포츠 및 캐주얼 게임에 적합."],
      ["티어 4: 지연 및 재적응 필요 (Developing Reflex)", "0.7x – 0.9x 저속 영역", "방향이 바뀔 때마다 표적을 완전히 놓치며 여러 번의 도약 후에야 추적을 회복.", "돌발 자극에 대한 신경 반응 지연. 저속 영역에서 신속히 시선을 복구하는 반복 연습 요망."],
      ["티어 5: 추적 불안정 초심자 (High Latency)", "0.7x 미만", "표적의 무작위 움직임을 따라가지 못하고 시선이 화면 전체를 무질서하게 방황.", "머리를 고정하고 눈동자만으로 저속 방향 전환을 쫓는 기초 시선 훈련부터 시작 필요."]
    ],
    note: "본 기준은 불규칙 운동 환경에서의 안구 역학 및 사케드 반응 제어 연구(Bahill et al., 1980; Barnes, 2008; Krauzlis, 2004; Robinson, 1965)를 토대로 수립된 편집 기준입니다."
  },
  techniques: {
    title: "불규칙 카오스 안구 추적의 재포착 정밀도를 높이는 4대 기술",
    items: [
      {
        name: "두부 완전 고정 및 외안근의 독립적 제어",
        desc: "Leigh & Zee(2015)의 연구처럼 돌발 움직임에 놀라 머리를 흔들면 전정안구반사(VOR)가 개입하여 대뇌 사케드 제어 시스템이 발달하지 못합니다.",
        tips: "턱을 당기고 목을 완전히 고정한 채, 안구 자체의 순수한 회전력만으로 급선회를 포착하십시오."
      },
      {
        name: "급선회 시 첫 방향 벡터 감지와 짧은 보정 사케드",
        desc: "Krauzlis(2004)가 규명했듯, 급변 시 무리하게 추종을 끌고 가지 말고 짧은 도약안구운동으로 즉시 오차를 영(0)으로 만드는 것이 핵심입니다.",
        tips: "표적이 꺾이는 순간 지체하지 말고, 날카롭게 눈동자를 튕겨 표적 중심에 순간 착탄시키는 감각을 익히십시오."
      },
      {
        name: "예측 본능 배제 및 실시간 시각 피드백 몰입",
        desc: "Bahill et al.(1980)이 증명했듯, 무작위 궤적에서 예측을 시도하면 반대 방향으로 시선이 튀어 치명적인 지연이 발생합니다.",
        tips: "'다음 방향이 어디일까' 추측하지 말고, 표적이 실제로 움직인 순간의 시각 신호에만 반사적으로 반응하십시오."
      },
      {
        name: "144Hz+ 고주사율 디스플레이를 활용한 시각 지연 최소화",
        desc: "Woods et al.(2015)에 따르면 고주사율 모니터는 방향 전환 첫 프레임을 매끄럽게 표시하여 뇌의 시각 지각 반응을 물리적으로 앞당깁니다.",
        tips: "게이밍 모니터를 활용하고 주변 조명을 적절히 유지하여 안구의 긴장과 피로를 관리하십시오."
      }
    ]
  },
  steps: [
    "속도 배율(0.5x~2.0x)과 훈련 시간(60초)을 설정하고 훈련을 시작합니다.",
    "화면과 약 50~70cm 거리를 두고 두부를 완전히 고정한 정자세를 취합니다.",
    "화면 전역을 불규칙하고 역동적으로 급선회하는 표적에 시선을 고정합니다.",
    "표적이 방향을 꺾을 때마다 즉각적인 짧은 보정 사케드로 시선을 회복하고 원활추종으로 복귀합니다.",
    "세션 종료 후 표적 유지 안정도를 점검하고, 다음 훈련에서 단계적으로 난이도를 조절합니다."
  ],
  audience: "경쟁형 FPS(에이펙스 레전드, 오버워치, 발로란트) 게이머, 격투 게임 플레이어, 구기 종목 운동선수(축구, 테니스, 탁구), 돌발적인 동체시력과 시각 반사 신경을 극대화하고자 하는 모든 수련자.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('bahill1980', 'barnes2008', 'krauzlis2004', 'robinson1965', 'rashbass1961', 'woods2015'),
  related: [
    { href: "/ko/drills/visual-tracking/constant-slow-pursuit", label: "정속 저속 추종 안구 훈련 (Constant Slow)" },
    { href: "/ko/drills/visual-tracking/sine-wave-pursuit", label: "사인파 추종 훈련 (Sine Wave)" },
    { href: "/ko/drills/visual-tracking/infinity-pursuit", label: "8자 루프 안구 추적 훈련 (Infinity)" },
    { href: "/ko/drills/visual-tracking/predictive-pursuit", label: "예측 시선 추적 (Predictive)" },
    { href: "/ko/drills/visual-tracking/dynamic-evasion-pursuit", label: "동적 회피 시선 추적 (Dynamic Evasion)" },
    { href: "/ko/drills/visual-tracking/ghosting-suppress-pursuit", label: "시선 고정 안정성 훈련 (Ghosting Suppress)" }
  ]
};

export default function LocalizedPage() {
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
      <DirectionalChaosPursuitClient
        copy={{
          title: "불규칙 안구 추적 훈련・카오스 방향 전환 테스트",
          subtitle: "사케드 회복 및 반응형 동체시력 시선 추적 트레이닝",
          description: "불규칙하게 방향과 속도를 전환하는 카오스 궤적의 표적을 추적할 때는 뇌의 예측 모델이 차단되고 실시간 시각 피드백 제어가 강제됩니다(Bahill et al., 1980). 표적이 시야 중심을 벗어나는 즉시 신속한 보정 사케드(Catch-up Saccade)를 발동해 시선을 재포착하고 원활추종 게인을 복원하는 훈련입니다(Barnes, 2008; Krauzlis, 2004)."
        }}
      />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/ko/drills/visual-tracking/directional-chaos-pursuit" />
      </div>
    </>
  );
}
