import DynamicEvasionPursuitClient from '@/app/drills/visual-tracking/dynamic-evasion-pursuit/DynamicEvasionPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// KOREAN SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "회피 표적 추적 훈련" / "동적 회피 시선 추적" (Evasive target pursuit tracking)
// Secondary:    "에임 트래킹 반응속도", "반응형 안구 운동 훈련", "스트레이프 추적 에임"
// LSI / Domain:  "급선회 타깃 추적", "보정 사케드 훈련", "동체시력 순발력",
//               "중심와 재포착", "원활추종 게인 복구", "망막 슬립 제어", "FPS 반사신경 훈련"
// Authentic Domain Terms: 표적 회피 추적(Dynamic Evasion Pursuit), 보정 사케드(Catch-up Saccade), 원활추종 게인(Pursuit Gain), 망막 슬립(Retinal Slip), 전두안운동야(FEF), 상구(Superior Colliculus)
// ============================================================

export const metadata = {
  title: "회피 표적 추적 훈련・동체시력 에임 테스트 – 급선회 타깃 재포착 | SkillDrills",
  description: "직선 비행 중 돌발적으로 급선회하며 조준을 회피하는 타깃을 신속히 재포착하는 리액티브 안구 추적 및 동체시력 훈련. 망막 슬립 억제와 보정 사케드, 원활추종 게인 복원력을 극대화합니다. 무료 이용.",
  keywords: [
    "회피 표적 추적 훈련",
    "동적 회피 시선 추적",
    "에임 트래킹 반응속도",
    "반응형 안구 운동 훈련",
    "스트레이프 추적 에임",
    "급선회 타깃 추적",
    "보정 사케드 훈련",
    "동체시력 순발력",
    "중심와 재포착",
    "원활추종 게인 복구",
    "망막 슬립 제어",
    "FPS 반사신경 훈련"
  ],
  openGraph: {
    title: "회피 표적 추적 훈련・동체시력 에임 테스트 – 급선회 타깃 재포착 | SkillDrills",
    description: "직선 비행 중 돌발적으로 급선회하며 조준을 회피하는 타깃을 신속히 재포착하는 리액티브 안구 추적 및 동체시력 훈련. 망막 슬립 억제와 보정 사케드, 원활추종 게인 복원력을 극대화합니다.",
    type: "website",
    url: "https://skilldrills.online/ko/drills/visual-tracking/dynamic-evasion-pursuit",
    siteName: "SkillDrills",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "회피 표적 추적 훈련・동체시력 에임 테스트 – 급선회 타깃 재포착 | SkillDrills",
    description: "돌발적인 급선회로 조준을 피하는 회피 타깃을 안구로 즉시 재포착하는 무료 온라인 리액티브 동체시력 드릴.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/visual-tracking/dynamic-evasion-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/dynamic-evasion-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://skilldrills.online/ko" },
    { "@type": "ListItem", "position": 2, "name": "드릴 목록", "item": "https://skilldrills.online/ko/drills" },
    { "@type": "ListItem", "position": 3, "name": "시각 추적 및 안구 훈련", "item": "https://skilldrills.online/ko/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "회피 표적 추적 훈련 (다이내믹 회피 추적)", "item": "https://skilldrills.online/ko/drills/visual-tracking/dynamic-evasion-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "회피 표적 추적 훈련・동체시력 리액티브 에임 테스트 (Dynamic Evasion Pursuit)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/ko/drills/visual-tracking/dynamic-evasion-pursuit",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "직선 이동 중 예고 없이 고각 급선회하여 조준을 피하는 표적을 안구 운동으로 즉각 재포착하는 브라우저 기반 리액티브 동체시력 및 사케드 회복 측정 도구.",
  "featureList": [
    "직선 등속 순항과 불시의 고각 회피 브레이크를 결합한 실시간 회피 시뮬레이션",
    "0.5배속부터 9.0배속까지 정밀 속도 제어 및 밀리초 단위 시선 고정 타이머",
    "타깃 잔상 트레일, CRT 주사선, 발광(Glow) 효과 시각화 옵션",
    "외부 서버 통신 없는 완전한 클라이언트 단 로컬 데이터 저장"
  ],
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "회피 표적 추적 훈련 – 동체시력 리액티브 에임 온라인 트레이너 | SkillDrills",
  "alternateName": "Dynamic Evasion Pursuit Korea",
  "url": "https://skilldrills.online/ko/drills/visual-tracking/dynamic-evasion-pursuit",
  "dateModified": "2026-09-15",
  "description": "무료 온라인 동체시력・리액티브 안구 추적 트레이닝. 급격한 회피 꺾기에 맞서 즉각 보정 사케드를 발동하고 중심와 고정 및 원활추종 게인을 복원하는 반사신경 도구.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas를 지원하는 최신 웹 브라우저",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "회피 표적 추적, 보정 사케드, 원활추종 게인 복원, 망막 슬립 억제, 리액티브 에임"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "회피 표적 추적 훈련・동체시력 리액티브 에임 테스트 (Dynamic Evasion Pursuit)",
  "url": "https://skilldrills.online/ko/drills/visual-tracking/dynamic-evasion-pursuit",
  "description": "급선회 회피 기동을 반복하는 표적을 시선과 조준선으로 지속 포착하여 시각 반사 신경과 재포착 순발력을 기르는 무료 웹 게임.",
  "genre": ["Eye Tracking", "Visual Training", "Aim Trainer"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "회피 표적 추적 및 리액티브 시선 재포착 트레이닝 진행 방법",
  "dateModified": "2026-09-15",
  "description": "돌발적으로 급선회하는 회피 타깃에 맞서 시선을 신속히 재배치하고 추적 게인을 복구하기 위한 단계별 가이드.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "기준 속도 및 세션 시간 설정",
      "text": "급선회 꺾임 타이밍에 적응하기 위해 초기에는 1.0x 기준 속도와 60초 세션을 선택합니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/dynamic-evasion-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "두부 고정 및 직선 경로에서의 원활추종 안정화",
      "text": "모니터와 50~70cm 거리를 두고 머리를 완전히 고정한 채 표적이 직선 구간을 지날 때 부드럽게 시선을 유지합니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/dynamic-evasion-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "돌발 급선회 시 즉각적인 예리한 보정 사케드 발동",
      "text": "표적이 예고 없이 꺾이는 순간 무리하게 시선을 끌지 말고, 짧고 빠른 도약안구운동으로 타깃을 중심와 중앙으로 튕겨 올립니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/dynamic-evasion-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "착탄 즉시 신규 벡터 원활추종 게인 복원 유지",
      "text": "도약 착탄 직후 시선이 흔들리거나 멈추지 않도록 표적의 새로운 진행 속도와 각도에 즉시 동조하여 부드러운 추종을 재개합니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/dynamic-evasion-pursuit#step-4"
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
      "name": "회피 표적 추적 훈련(Dynamic Evasion Pursuit)이란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "이 훈련은 직선 경로로 이동하던 타깃이 돌발적으로 고각 급선회(회피 기동)를 일으킬 때 안구 운동만으로 신속하게 추적을 유지하는 신경 시각 드릴입니다. 연속적인 궤적 예측이 차단되므로 망막 슬립의 즉시 감지, 보정 사케드 발동, 그리고 신규 이동 벡터로의 원활추종 게인 복원 루프를 집중적으로 강화합니다(Rashbass, 1961; Bahill et al., 1980)."
      }
    },
    {
      "@type": "Question",
      "name": "사인파나 리사주 같은 일반적인 추종 훈련과 회피 추적의 결정적 차이는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "원운동이나 리사주 곡선 같은 주기적 운동에서는 소뇌가 내부 예측 모델을 형성하여 감각 지연을 거의 제로로 줄이는 '예측 추종'이 작동합니다(Robinson, 1965). 반면 회피 추적은 예고 없이 궤적이 꺾이므로 사전 예측이 파탄 나며, 순수한 실시간 감각 피드백 기반의 재포착 반사 신경만이 강제됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "회피 급선회 시 일어나는 '보정 사케드(Catch-up Saccade)'의 신경학적 기전은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "표적이 급각도로 방향을 꺾으면 원활추종 안구운동의 생리학적 한계 속도(약 30°/s)를 즉각 넘어서면서 상이 망막 중심와에서 벗어납니다. 이 오차 신호를 수신한 전두안운동야(FEF)와 상구는 약 150~200ms의 잠복기를 거쳐 표적 위치로 시선을 순간 도약시켜 중심와로 되돌려놓는 보정 사케드를 발사합니다(Krauzlis, 2004; Barnes, 2008)."
      }
    },
    {
      "@type": "Question",
      "name": "불규칙 안구 추적(Directional Chaos Pursuit)과 본 훈련의 차이점은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "불규칙 카오스 추적은 매 프레임마다 미세한 가속도가 무작위로 변동하는 연속 곡선 드리프트인 반면, 동적 회피 추적은 뚜렷한 직선 등속 구간과 주기적 불시 고각 급선회로 구성됩니다. 미세한 손떨림 보정보다는 격렬한 방향 전환에 대한 다이내믹한 시선 회복 속도에 특화되어 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "FPS 게임(에이펙스 레전드, 오버워치, 발로란트)의 스트레이프 대응에 왜 결정적인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "교전 중 적이 급격한 좌우 무빙(ADAD Strafe)이나 슬라이딩으로 조준선을 벗어나려 할 때 에임이 표적 뒤에 처지는 '반응 랙'을 대폭 단축시킵니다. 회피를 감지하고 보정 사케드로 에임을 끌어당기는 시간이 단축되어 적 히트박스에 지속적인 화력을 투사할 수 있습니다(Yang et al., 2025)."
      }
    },
    {
      "@type": "Question",
      "name": "축구, 농구, 테니스 등 실제 구기 스포츠 동체시력 향상에도 도움이 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "수비수의 불시 페인트 모션이나 불규칙하게 튀어 오르는 테니스 볼 등 돌발적인 궤적 변화에 맞서 찰나의 순간 시야 흔들림을 억제하고 대상을 재응시하는 시각 민첩성이 비약적으로 향상됩니다(Appelbaum & Erickson, 2018)."
      }
    },
    {
      "@type": "Question",
      "name": "머리를 움직이지 않고 눈동자만으로 추적해야 하는 이유는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "머리를 함께 움직이면 전정안구반사(VOR)가 개입하여 대뇌 피질과 상구의 독자적인 사케드 회로가 제대로 단련되지 않습니다(Leigh & Zee, 2015). 순수 외안근의 독립적인 순발력을 키우려면 두부를 정지시켜야 합니다."
      }
    },
    {
      "@type": "Question",
      "name": "하루 권장 훈련 시간과 세트 구성은 어떻게 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1세션당 60초 훈련 후 30초 휴식을 취하며, 하루 5~8세트(총 5~10분)가 권장됩니다. 돌발적인 재포착은 신경계 피로도가 매우 높으므로 무리한 장시간 연속 훈련보다는 매일 꾸준한 반복을 통해 신경 전달 경로를 최적화하는 것이 효과적입니다."
      }
    },
    {
      "@type": "Question",
      "name": "표적의 회피 선회가 너무 빨라 시야를 완전히 놓칠 때의 대처법은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "설정 패널에서 속도 배율을 0.6x~0.8x 수준으로 낮추고 표적 크기를 24px 이상으로 키우십시오. 회피 첫 프레임의 방향 벡터를 차분하게 읽을 수 있게 된 후 단계적으로 속도를 높여나가는 점진적 과부하 방식이 권장됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "모니터 주사율(Hz)과 마우스 폴링레이트는 훈련 정밀도에 어떤 영향을 미치나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "고주사율 환경은 급선회 감지에 극적인 차이를 만듭니다. 60Hz 모니터는 회피 첫 프레임이 최대 16.7ms 지연되지만 144Hz~240Hz 모니터는 4ms 안팎으로 표시되어 보정 사케드의 발동 타이밍을 물리적으로 앞당겨줍니다(Woods et al., 2015)."
      }
    }
  ]
};

const guideProps = {
  heading: "표적 회피 운동 추적과 사케드 회복의 신경 운동 과학 기준",
  intro: [
    "동적 표적 회피 추적(Dynamic Evasion Pursuit)은 직선 경로를 이동하는 표적이 불시에 고각 급선회(Directional Break)를 일으켜 조준을 벗어날 때, 시각 운동계가 실시간으로 대응하여 시선을 재일치시키는 고난도 동체시력 과제입니다. 직선이나 원운동처럼 경로가 예측 가능한 자극과 달리, 소뇌의 예측 모델(Feedforward Model)을 차단하고 오직 감각 피드백에만 의존하는 반사적 재포착 능력을 한계까지 연마합니다(Bahill, Iandolo, & Troost, 1980; Robinson, 1965).",
    "망막 슬립의 발생과 보정 사케드・원활추종 게인의 이중 운동 제어: 표적이 예기치 않게 회피 각도로 꺾이는 순간, 부드러운 안구 추종(원활추종)의 물리적 한계 속도(약 30°/s)를 즉각 넘어서며 표적 상이 중심와에서 탈락합니다(망막 슬립). 이 위치 및 속도 오차 신호를 수신한 전두안운동야(FEF)와 상구는 약 150~200ms의 잠복기를 거쳐 표적 위치로 시선을 순간 도약시키는 '보정 사케드(Catch-up Saccade)'를 강제 방출합니다(Rashbass, 1961; Krauzlis, 2004). 도약 착탄 직후 시선 흔들림을 억제하고 즉각 새로운 방향의 원활추종 게인(Gain = 안구속도 / 표적속도)을 복원하는 능력이 전체 동체시력의 민첩성을 결정합니다(Barnes, 2008).",
    "e스포츠 및 대인 구기 스포츠에서의 실전 전이 가치: FPS 게임에서 적의 고속 좌우 무빙(ADAD Strafe)이나 슬라이딩, 축구·테니스·농구 등 대인 종목에서 불시의 페인트 동작이나 굴절 바운드에 직면했을 때 시야의 탈락 시간을 밀리초 단위로 단축하는 능력은 경기력을 좌우합니다(Yang et al., 2025; Appelbaum & Erickson, 2018). 본 드릴은 고각 급선회를 지속적으로 노출하여 외안근의 반사적 협응력과 시각 피질의 정보 처리 효율을 극대화합니다.",
    "하드웨어 정밀도 및 두부 고정 환경의 표준화: 급선회 감지에서 디스플레이의 프레임 갱신 주기는 결정적입니다. 일반 60Hz 모니터는 프레임 간격이 16.7ms로 길어 급선회의 첫 순간이 흐려지지만, 144Hz 이상의 고주사율 환경에서는 4ms 안팎으로 첫 회피 프레임을 선명히 전달하여 반응 잠복기를 앞당깁니다(Woods et al., 2015). 또한 머리를 고정하여 전정안구반사(VOR)를 억제함으로써 외안근 고유의 순발력을 훈련할 수 있습니다(Leigh & Zee, 2015). 모든 훈련 데이터는 브라우저 로컬 저장소에 안전하게 유지됩니다."
  ],
  benchmarks: {
    title: "회피 표적 추적 및 리액티브 시선 재포착 평가 기준 (에디토리얼 가이드)",
    headers: ["숙련도 등급", "목표 속도 배율 (Speed Multiplier)", "회피 급선회 시 사케드 회복 특성", "신경 반응 및 동체시력 프로필"],
    rows: [
      ["티어 1: 최상위 프로 리액티브 (Apex Reactive)", "2.0x 이상의 초고속 영역", "급선회 직후 최단 잠복기(150ms 미만)로 보정 사케드가 착탄하며 오버슈트 없이 즉각 원활추종 복귀.", "최고 수준의 시각 피질-상구 정보 전달력. 프로 e스포츠 선수 및 최상위 구기 선수 수준."],
      ["티어 2: 우수 시선 회복 (Superior Agility)", "1.4x – 1.9x 고속 영역", "급격한 회피 꺾기에도 1~2프레임 내에 시선을 되돌리며 매끄럽게 추적 상태 유지 가능.", "우수한 외안근 순발력과 망막 슬립 감지력. 고티어 FPS 교전 스트레이프에 완벽 대응."],
      ["티어 3: 표준 성인 기준 (Solid Baseline)", "1.0x – 1.3x 표준 영역", "표준 속도의 회피 기동을 안정적으로 추적하나 급선회 시 순간적인 타깃 놓침과 지연 발생.", "건강한 성인의 표준적인 시각 운동 반응 수준. 일상적인 스포츠 및 캐주얼 게임에 적합."],
      ["티어 4: 회복 지연・요연습 (Developing Recovery)", "0.7x – 0.9x 저속 영역", "표적이 회피 턴을 돌 때마다 시야에서 완전히 놓치며 여러 번의 사케드를 거쳐 늦게 회복.", "돌발 방향 전환에 대한 신경 전달 지연. 저속 영역에서 신속히 시선을 튕겨내는 반복 연습 필요."],
      ["티어 5: 추적 불안정 초심자 (High Latency)", "0.7x 미만", "표적의 급선회를 쫓아가지 못하고 이전 직선 경로 위에 시선이 그대로 멈춰 서 있는 상태.", "머리를 완전히 고정하고 저속 급선회 표적을 안구만으로 쫓는 기초 훈련부터 시작 필요."]
    ],
    note: "본 기준은 회피 운동 자극 하에서의 안구 역학 및 사케드 회복 제어 연구(Bahill et al., 1980; Rashbass, 1961; Krauzlis, 2004; Barnes, 2008)를 바탕으로 설정된 편집 기준입니다."
  },
  techniques: {
    title: "회피 표적의 재포착 정밀도와 추종 게인을 높이는 4대 기술",
    items: [
      {
        name: "두부 완전 고정 및 VOR 억제를 통한 외안근 독립 제어",
        desc: "Leigh & Zee(2015)의 연구처럼 급선회에 놀라 머리를 움직이면 전정안구반사(VOR)가 개입하여 순수 대뇌 사케드 제어 회로의 발달이 저해됩니다.",
        tips: "턱을 당기고 목을 완전히 고정한 채, 안구 자체의 순수한 회전력만으로 급선회 벡터를 요격하십시오."
      },
      {
        name: "회피 첫 변곡점 망막 슬립 감지와 최단 보정 사케드 발동",
        desc: "Krauzlis(2004)가 규명했듯, 급변 시 무리하게 추종을 이어가려 하지 말고 짧은 도약 사케드로 즉시 위치 오차를 리셋하는 것이 정답입니다.",
        tips: "표적이 꺾이는 순간 지체 없이 눈동자를 날카롭게 튕겨 신규 궤적의 중심에 순간 착탄시키십시오."
      },
      {
        name: "착탄 직후 원활추종 게인 즉각 복원 (오버슈트 진동 억제)",
        desc: "Rashbass(1961)와 Barnes(2008)에 따르면 사케드 착탄 후 시선이 목표를 지나치지 않고 표적 속도에 즉시 동조하는 것이 핵심입니다.",
        tips: "도약 직후 시선을 멈춰 세우지 말고 표적의 새로운 이동 속도 위로 매끄럽게 갈아타는 느낌을 유지하십시오."
      },
      {
        name: "144Hz+ 고주사율 모니터 환경을 통한 시각 지연 최소화",
        desc: "Woods et al.(2015)의 분석처럼 144Hz 이상의 디스플레이는 방향 전환 첫 프레임을 매끄럽게 전달하여 뇌의 인지 반응을 앞당깁니다.",
        tips: "게이밍 모니터를 활용하고 주변 조명을 적절히 조절하여 외안근의 피로도를 관리하십시오."
      }
    ]
  },
  steps: [
    "속도 배율(0.5x~2.0x)과 훈련 시간(60초)을 설정하고 드릴을 시작합니다.",
    "화면과 약 50~70cm 거리를 유지하고 머리를 완전히 고정한 정자세를 취합니다.",
    "직선 경로를 따라 이동하는 표적을 부드러운 안구 추종으로 응시합니다.",
    "표적이 급선회 회피 기동을 일으키는 순간 즉각 보정 사케드를 발사하여 시야 중심에 되돌려놓습니다.",
    "세션 종료 후 회피 선회에 대한 반응성과 시선 고정 안정도를 확인하고 다음 훈련에 반영합니다."
  ],
  audience: "경쟁형 FPS(에이펙스 레전드, 오버워치, 발로란트) 게이머, 격투 게임 플레이어, 구기 종목 선수(축구, 테니스, 농구, 탁구), 돌발 회피 상황에서의 동체시력과 반응형 에임을 극대화하고자 하는 모든 수련자.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('bahill1980', 'rashbass1961', 'krauzlis2004', 'robinson1965', 'barnes2008', 'woods2015'),
  related: [
    { href: "/ko/drills/visual-tracking/constant-slow-pursuit", label: "정속 저속 추종 안구 훈련 (Constant Slow)" },
    { href: "/ko/drills/visual-tracking/directional-chaos-pursuit", label: "카오스 방향 추적 훈련 (Directional Chaos)" },
    { href: "/ko/drills/visual-tracking/sine-wave-pursuit", label: "사인파 추종 훈련 (Sine Wave)" },
    { href: "/ko/drills/visual-tracking/infinity-pursuit", label: "8자 루프 안구 추적 훈련 (Infinity)" },
    { href: "/ko/drills/visual-tracking/predictive-pursuit", label: "예측 시선 추적 (Predictive)" },
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
      <DynamicEvasionPursuitClient
        copy={{
          title: "회피 표적 추적 훈련・동체시력 리액티브 에임 테스트",
          subtitle: "급선회 타깃 재포착 & 반사적 안구운동 훈련",
          description: "능동적으로 회피 급선회하는 표적을 추적할 때는 직선 구간의 원활추종과 급격한 방향 브레이크 시점의 보정 사케드(Catch-up Saccade) 간의 신속한 전환이 핵심입니다(Rashbass, 1961). 표적이 조준을 벗어나는 찰나, 약 150~200ms의 감각운동 신경 지연을 최소화하여 즉시 중심와에 재일치시키고 추종 게인을 복원합니다(Krauzlis, 2004; Barnes, 2008)."
        }}
      />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/ko/drills/visual-tracking/dynamic-evasion-pursuit" />
      </div>
    </>
  );
}
