import KineticInterceptClient from '@/app/drills/visual/tracking-accuracy/moving-target/KineticInterceptClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "동체시력 테스트: 이동 표적 요격 훈련 | SkillDrills",
  description: "화면에서 가속 반사되는 이동 타깃을 예측 요격하는 무료 온라인 동체시력 테스트. 스무스 퍼슈트 안구운동과 리드샷 타이밍을 정밀 측정합니다.",
  keywords: [
    "동체시력 테스트",
    "동체시력 훈련",
    "동체시력 측정 사이트",
    "동체시력 게임",
    "이동 표적 요격",
    "스무스 퍼슈트",
    "리드샷 연습",
    "시각 추적 검사",
    "FPS 에임 트레이너 이동 타깃",
    "안구 운동성 테스트",
    "시각 운동 협응",
    "동체시력 높이는 법"
  ],
  openGraph: {
    title: "동체시력 테스트: 이동 표적 요격 훈련 | SkillDrills",
    description: "가속하는 이동 표적을 예측 요격하여 동체시력과 스무스 퍼슈트 안구운동 능력을 측정하는 무료 온라인 훈련.",
    type: 'article',
    url: 'https://skilldrills.online/ko/drills/visual/tracking-accuracy/moving-target',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "동체시력 테스트: 이동 표적 요격 훈련 | SkillDrills",
    description: "이동 표적 요격 정확도와 궤적 예측 속도를 정밀 진단하는 무료 온라인 동체시력 트레이너.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/visual/tracking-accuracy/moving-target',
    languages: getAlternateLanguages('/drills/visual/tracking-accuracy/moving-target'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://skilldrills.online/ko" },
    { "@type": "ListItem", "position": 2, "name": "훈련 카탈로그", "item": "https://skilldrills.online/ko/drills" },
    { "@type": "ListItem", "position": 3, "name": "시각 훈련", "item": "https://skilldrills.online/ko/drills/visual" },
    { "@type": "ListItem", "position": 4, "name": "추적 정확도", "item": "https://skilldrills.online/ko/drills/visual/tracking-accuracy" },
    { "@type": "ListItem", "position": 5, "name": "이동 표적 요격 검사", "item": "https://skilldrills.online/ko/drills/visual/tracking-accuracy/moving-target" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "동체시력 표적 요격 테스트",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/ko/drills/visual/tracking-accuracy/moving-target",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "KRW" },
  "description": "불규칙 가속 및 바운드 궤적을 지닌 2D 이동 구체를 예측 요격하여 동체시력 및 스무스 퍼슈트 안구운동 능력을 측정하는 과학적 도구.",
  "featureList": [
    "경계면 충돌 반사각 물리 엔진이 적용된 동적 이동 표적",
    "밀리초 정밀 타격 연대기 및 콤보 승수 점수 체계",
    "레벨 상승에 따른 표적 가속 및 히트박스 점진적 축소",
    "외부 서버 통신 없는 완전한 브라우저 로컬 데이터 보관"
  ],
  "dateModified": "2026-09-05"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "동체시력 표적 요격 테스트 — 시각 추적 훈련 | SkillDrills",
  "alternateName": "Moving Target Pro",
  "url": "https://skilldrills.online/ko/drills/visual/tracking-accuracy/moving-target",
  "dateModified": "2026-09-05",
  "description": "무료 온라인 동체시력 훈련. 2D 캔버스 내부를 빠르게 튕겨 다니는 이동 구체를 부드러운 안구 추적과 리드샷으로 정확히 요격하세요.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas를 지원하는 최신 웹 브라우저.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "KRW" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "스무스 퍼슈트 안구추적, 동체시력, 궤적 외삽 예측, 탄도학적 요격, 시각 운동 폐쇄 루프 보정"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "이동 표적 동체시력 요격 훈련",
  "url": "https://skilldrills.online/ko/drills/visual/tracking-accuracy/moving-target",
  "description": "이동하는 타깃을 추적하고 예측 요격하는 온라인 동체시력 향상 게임.",
  "genre": ["Action", "Aim Trainer", "Visual Tracking"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "KRW" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "동체시력 이동 표적 요격 훈련 방법",
  "dateModified": "2026-09-05",
  "description": "이동 표적 요격 프로토콜을 통해 동체시력과 스무스 퍼슈트 추적력을 극대화하는 4단계 가이드.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "생성된 이동 구체 중심와 시선 고정",
      "text": "화면에 나타난 이동 구체의 중심점에 시선의 중심와(Fovea)를 신속히 일치시켜 부드러운 안구 추적을 시작합니다.",
      "url": "https://skilldrills.online/ko/drills/visual/tracking-accuracy/moving-target#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "진행 궤적 및 벽면 반사각 예측",
      "text": "구체의 전진 속도와 벽면에 튕겨 나갈 반사각을 미리 계산하여 표적의 약간 앞쪽을 리드합니다.",
      "url": "https://skilldrills.online/ko/drills/visual/tracking-accuracy/moving-target#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "정확한 탄도학적 요격 클릭 실행",
      "text": "제한 시간이 소진되기 전에 구체를 정확히 클릭하여 격추합니다 (+150점 × 콤보 × 레벨 및 +0.6초 시간 연장).",
      "url": "https://skilldrills.online/ko/drills/visual/tracking-accuracy/moving-target#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "가속 구간에서 침착한 콤보 유지",
      "text": "레벨이 상승하여 속도가 빨라지고 구체 크기가 줄어들어도 침착하게 조준선을 일치시킨 뒤 클릭합니다.",
      "url": "https://skilldrills.online/ko/drills/visual/tracking-accuracy/moving-target#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-05",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "이동 표적 요격 검사(동체시력 테스트)란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "이동 표적 요격 검사는 동적 시각 환경에서 움직이는 물체를 눈으로 매끄럽게 쫓는 스무스 퍼슈트(활동성 안구운동), 궤적 예측력, 그리고 손-눈 협응 요격 정확도를 정밀 측정하고 훈련하는 신경물리학적 평가 도구입니다."
      }
    },
    {
      "@type": "Question",
      "name": "뇌는 움직이는 시각 표적을 어떻게 추적하고 요격하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "망막 신경절 세포가 포착한 움직임 신호는 중측두엽(MT/V5)으로 이동하여 방향과 속도 벡터로 계산됩니다. 전두안구영역(FEF)과 소뇌가 안구 근육을 조율하여 눈동자 속도를 물체 속도에 맞추며, 두정엽이 손의 탄도학적 요격 동작을 계획합니다."
      }
    },
    {
      "@type": "Question",
      "name": "스무스 퍼슈트(활동성 안구운동)와 사케이드(도약 안구운동)의 차이는?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "래시배스(Rashbass, 1961)에 따르면 두 안구운동은 별개의 제어 경로를 가집니다. 스무스 퍼슈트는 움직이는 물체를 중심와에 선명하게 유지하기 위해 서서히 미끄러지듯 쫓는 운동(초당 30~40도)이며, 사케이드는 시야를 급격히 건너뛰어 표적을 재포착하는 탄도학적 도약(초당 최대 900도)입니다."
      }
    },
    {
      "@type": "Question",
      "name": "이동하는 타깃을 맞출 때 왜 리드샷(앞쪽 조준)이 필수적인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "인간의 시각-운동 경로에는 필연적으로 150~220ms의 신경 잠복기가 존재합니다. 초당 500픽셀로 움직이는 타깃은 이 시간 동안 100픽셀 이상 이동하므로, 현재 위치가 아닌 미래의 도달 예측 지점을 조준해야 적중할 수 있습니다 (Land & McLeod, 2000)."
      }
    },
    {
      "@type": "Question",
      "name": "인간의 부드러운 안구 추적(스무스 퍼슈트) 속도 한계는 어느 정도인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "인간의 눈은 초당 약 30도 미만의 각속도에서 스무스 퍼슈트를 안정적으로 유지합니다 (Bahill et al., 1980; Krauzlis, 2004). 속도가 이를 초과하거나 방향이 급변하면 이득(Gain)이 1.0 미만으로 떨어져, 보정 사케이드(Catch-up Saccade)를 발생시켜 다시 시선을 정렬해야 합니다."
      }
    },
    {
      "@type": "Question",
      "name": "동체시력과 움직이는 표적 조준 능력은 훈련을 통해 향상되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네. 반복적인 추적 훈련은 뇌 MT/V5 영역의 시각 운동 처리 효율을 높이고 소뇌의 피드백 보정 속도를 단축시켜 동체시력과 리드샷 정확도를 극적으로 향상시킵니다."
      }
    },
    {
      "@type": "Question",
      "name": "모니터 주사율(60Hz vs 144Hz vs 240Hz)이 동체시력 측정에 미치는 영향은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "60Hz 화면은 16.7ms마다 위치가 갱신되어 표적이 뚝뚝 끊기는 모션 저더(Judder)가 발생합니다. 144Hz(6.9ms)와 240Hz(4.1ms) 고주사율 모니터는 매끄러운 궤적을 제공하여 눈의 추적 피로도를 낮추고 적중률을 크게 높입니다 (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "표적의 급가속 및 벽면 반사가 적중률에 미치는 영향은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "일정한 속도의 직선 운동은 높은 정확도로 예측됩니다. 그러나 벽면에 부딪혀 튕겨 나가는 순간 기존 궤적 모델이 무효화되며, 새로운 궤적을 계산하고 보정 사케이드를 실행하는 데 150~200ms의 재설정 지연이 요구됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "개루프(Open-loop)와 폐루프(Closed-loop) 시각 운동 제어의 차이는?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "움직이는 표적을 요격할 때 최초 ~100ms는 피드백 없이 초기 감각 정보에만 의존하는 '개루프(탄도학적 발사)' 단계입니다. 이후 목표물에 마우스가 도달하는 과정은 실시간 시각 피드백을 통해 오차를 수정하는 '폐루프' 단계로 전환됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "이 검사는 무료인가요? 내 점수와 훈련 데이터는 안전한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네. 스킬드릴의 동체시력 테스트는 100% 무료이며 회원가입이나 결제 없이 이용 가능합니다. 모든 측정 기록과 콤보 데이터는 브라우저 로컬 저장소에만 격리 보관됩니다."
      }
    }
  ]
};

const movingTargetGuide = {
  heading: "키네틱 시각 추적 및 궤적 요격 과학 표준 가이드",
  intro: [
    "동적 표적 요격은 고속 구기 스포츠, 모터스포츠, 무술 격투, 항공 조종, 그리고 경쟁형 e스포츠 전반에 걸친 핵심 시각-운동 역량입니다. 가속하며 불규칙하게 반사되는 물체를 정확히 타격하기 위해서는 스무스 퍼슈트(Smooth Pursuit) 안구운동, 미래 궤적에 대한 외삽 예측, 그리고 정밀한 폐루프(Closed-loop) 운동 타이밍이 동시에 조화되어야 합니다.",
    "시각 운동 추적의 신경생리학적 기전은 중측두엽(MT/V5) 및 내측상측두엽(MST)의 방향 선택성 뉴런에서 출발합니다. 이 피질 영역들은 표적의 속도와 방향 벡터를 계산하여 전두안구영역(FEF)과 뇌교핵으로 순방향 신호를 전송하며, 이는 다시 소뇌 푸르키니에 세포를 통해 안구 추적 이득을 유지하도록 작용합니다 (Krauzlis, 2004).",
    "래시배스(Rashbass, 1961)의 기념비적 연구에 따르면, 스무스 퍼슈트와 사케이드는 독립적인 제어 시스템에 의해 구동됩니다. 퍼슈트는 망막 미끄러짐 속도 오차에 의해 조절되는 반면, 사케이드는 위치 변위를 교정합니다. 표적이 초당 30~40도 이상으로 가속하거나 벽면에 부딪혀 급격히 꺾이면 퍼슈트 이득이 저하되어 급격한 보정 사케이드가 개입하게 됩니다 (Bahill et al., 1980).",
    "또한 랜드와 맥클라우드(Land & McLeod, 2000)의 연구에 따르면, 뛰어난 운동선수들은 물체의 전체 궤적을 멍하니 쫓지 않고 미래의 바운드 지점과 타격 윈도우로 시선을 미리 선행 도약(Anticipatory Saccade)시키는 고도의 공간 예측 기법을 구사합니다. 본 훈련은 이러한 예측적 공간 감각을 실전 밀리초 환경에서 단련하도록 설계되었습니다."
  ],
  benchmarks: {
    title: "동체시력 및 궤적 요격 퍼포먼스 벤치마크 기준",
    headers: ["평가 등급 / 티어", "페이싱 시간 윈도우", "점수 & 콤보 기준", "시각 추적 및 요격 프로파일"],
    rows: [
      ["Tier 1: 최상위 키네틱 요격가 (Apex)", "< 0.25초 페이싱", "16,000점+ | 콤보 25회+", "프로급 스무스 퍼슈트; 보정 사케이드 지연이 전혀 없는 완벽한 속도 벡터 외삽. 탑티어 FPS 프로 및 전투기 조종사 수준."],
      ["Tier 2: 상급 동적 추적자 (Advanced)", "0.25 – 0.45초 페이싱", "10,500 – 15,999점 | 콤보 16회+", "매끄러운 안구 추종; 가속하는 표적에 대해 조준점 오버슈트 없이 신속한 폐루프 운동 보정을 수행하는 엘리트."],
      ["Tier 3: 건전한 시각 추종 (Competent)", "0.46 – 0.70초 페이싱", "6,000 – 10,499점 | 콤보 9회+", "신뢰할 수 있는 추적 기준; 직선 궤적 요격은 안정적이나 급격한 벽면 반사 시 일시적인 궤적 재설정 지연 발생."],
      ["Tier 4: 발전 단계 추적자 (Developing)", "0.71 – 1.00초 페이싱", "2,500 – 5,999점 | 콤보 4회+", "예측적 퍼슈트보다 반응형 도약 사케이드에 크게 의존; 고속 가속 구간에서 시선 추적의 뚜렷한 머뭇거림 발생."],
      ["Tier 5: 추적 떨림 빈발 (Baseline)", "> 1.00초 페이싱", "< 2,500점 | 콤보 < 4회", "조준점 오버슈트 극심; 움직이는 물체에 시선의 중심와를 지속적으로 밀착시키는 기초 안구 안정화 훈련 필요."]
    ],
    note: "본 기준표는 스무스 퍼슈트 정신물리학 및 동적 요격 연대학 문헌(Rashbass, 1961; Krauzlis, 2004; Land & McLeod, 2000; Bahill et al., 1980; Woods et al., 2015)에 근거합니다. 모니터 주사율과 마우스 환경에 따라 변동될 수 있습니다."
  },
  techniques: {
    title: "동체시력 요격 정확도를 높이는 실전 훈련 원칙",
    items: [
      {
        name: "예측적 벡터 리딩 (래시배스 속도 정합)",
        desc: "인간의 감각-운동 잠복기는 150~220ms이므로 현재 표적 위치를 바로 클릭하면 뒤따라가며 빗나가게 됩니다 (Rashbass, 1961).",
        tips: "구체의 속도 벡터를 외삽하여 구체가 진행하는 방향의 5~15픽셀 앞쪽 공간을 리드하여 클릭하십시오."
      },
      {
        name: "경계면 반사 안구 선행 고정 (랜드 & 맥클라우드 사케이드)",
        desc: "엘리트 운동선수들은 물체가 벽에 닿을 때까지 기다리지 않고 예상 반사 지점으로 시선을 미리 이동시킵니다 (Land & McLeod, 2000).",
        tips: "표적이 벽면에 가까워지면 벽으로 마우스를 쫓아가지 말고, 반사되어 튕겨 나올 각도에 조준선을 미리 대기시키십시오."
      },
      {
        name: "망막 미끄러짐 안정화 (크라우즐리스 퍼슈트 루프)",
        desc: "선명한 시야를 유지하려면 눈동자가 표적 속도와 동일하게 미끄러져 망막 상의 상을 중심와에 묶어두어야 합니다 (Krauzlis, 2004).",
        tips: "마우스 커서를 정지시켜 놓고 표적이 지나가길 기다리지 말고, 눈과 커서가 표적과 함께 부드럽게 활주하도록 조작하십시오."
      },
      {
        name: "리듬 탈피 및 격발 디시플린 유지",
        desc: "예측할 수 없는 궤적 변화는 보정 사케이드를 유발하므로 무지성 연타는 콤보를 끊고 감점 패널티를 초래합니다 (Bahill et al., 1980).",
        tips: "기계적인 박자로 클릭하지 마세요. 조준선과 히트박스의 공간적 중첩이 망막에서 확인된 순간에만 침착하게 격발하십시오."
      }
    ]
  },
  steps: [
    "훈련 시작 버튼을 클릭하여 45초 세션을 활성화합니다.",
    "화면에 출현한 이동 구체를 눈으로 포착하고 부드러운 안구 추적을 형성합니다.",
    "궤적의 진행 방향과 벽면 반사각을 예측하여 약간 앞쪽 공간을 리드합니다.",
    "시간 제한이 끝나기 전에 구체를 정확히 클릭하여 격추합니다 (+150점 × 배율 및 +0.6초 시간 연장).",
    "세션 종료 후 총 요격 성공 수, 최고 콤보 및 동체시력 평가 등급을 확인합니다."
  ],
  audience: "발로란트, 오버워치, 배틀그라운드 등 전술 FPS 유저, 야구 및 테니스 등 구기 운동선수, 격투기 선수, 레이서, 비행 조종사 및 동체시력을 극대화하고자 하는 모든 사용자.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('rashbass1961', 'krauzlis2004', 'land2000', 'bahill1980', 'woods2015'),
  related: [
    { href: "/ko/drills/visual/tracking-accuracy/multiple-targets", label: "다중 객체 추적 검사" },
    { href: "/ko/drills/visual/tracking-accuracy/pursuit-tracker", label: "스무스 퍼슈트 추적기" },
    { href: "/ko/drills/visual/reaction-speed/light-reaction", label: "순간 발광 반응 테스트" },
    { href: "/ko/drills/visual/reaction-speed/go/no-go", label: "Go / No-Go 충동 제어 검사" },
    { href: "/ko/drills/visual/depth-perception/distance-judgment", label: "거리 판별 심시력 검사" },
    { href: "/ko/drills/visual/visual-recognition/entropic-grid", label: "엔트로피 그리드 탐색 훈련" }
  ]
};

export default function KineticInterceptPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <KineticInterceptClient copy={{ title: "동체시력 테스트: 이동 표적 요격 훈련" }} />
      <DrillGuide guide={movingTargetGuide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/ko/drills/visual/tracking-accuracy/moving-target" />
      </div>
    </>
  );
}
