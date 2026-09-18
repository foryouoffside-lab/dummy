import SineWavePursuitClient from '@/app/drills/visual-tracking/sine-wave-pursuit/SineWavePursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// KOREAN SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "사인파 안구 운동" (Sine wave eye tracking exercise) / "곡선 에임 연습"
// Secondary:    "정현파 원활추종", "위상 지연 극복", "상하 안구 추적", "방향 전환 에임"
// LSI / Domain:  "조화 진동 안구운동", "소뇌 내부 주기 모델", "반환점 감속 제어",
//               "제로 위상 지연", "추종 게인 1.0", "보정 사케드 억제", "동체시력 곡선"
// Authentic Domain Terms: 사인파 안구 운동(Sine Wave Pursuit), 정현파 원활추종(Sinusoidal Smooth Pursuit), 조화 진동(Harmonic Oscillation), 위상 지연(Phase Lag), 추종 이득(Pursuit Gain), 보정 사케드(Catch-up Saccade)
// ============================================================

export const metadata = {
  title: "사인파 안구 운동 훈련・곡선 추적 에임 – 정현파 원활추종 | SkillDrills",
  description: "수평 및 수직 정현파(사인파) 주기 진동을 따라 부드럽게 시선을 제어하는 무료 안구 훈련. 반환점 가감속 제어와 150ms 신경 전달 위상 지연(Lag)을 제로화하는 동체시력 강화. 무설치 웹 테스트.",
  keywords: [
    "사인파 안구 운동",
    "곡선 에임 연습",
    "정현파 원활추종",
    "위상 지연 극복",
    "상하 안구 추적",
    "방향 전환 에임",
    "조화 진동 안구운동",
    "소뇌 내부 주기 모델",
    "반환점 감속 제어",
    "제로 위상 지연",
    "추종 게인 1.0",
    "정현파 시각 추적 훈련"
  ],
  openGraph: {
    title: "사인파 안구 운동 훈련・곡선 추적 에임 – 정현파 원활추종 | SkillDrills",
    description: "사인파 곡선 궤적의 주기적 가감속에 시선을 동기화하여 위상 지연을 극복하는 무료 온라인 비전 트레이닝.",
    type: "website",
    url: "https://skilldrills.online/ko/drills/visual-tracking/sine-wave-pursuit",
    siteName: "SkillDrills",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "사인파 안구 운동 훈련・곡선 추적 에임 – 정현파 원활추종 | SkillDrills",
    description: "소뇌의 내부 주기 모델을 활성화하여 곡선 궤적의 신경 위상 지연을 제로로 단축하는 과학적 안구 추적 훈련.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/visual-tracking/sine-wave-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/sine-wave-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://skilldrills.online/ko" },
    { "@type": "ListItem", "position": 2, "name": "드릴 목록", "item": "https://skilldrills.online/ko/drills" },
    { "@type": "ListItem", "position": 3, "name": "시각 추적 및 안구 운동", "item": "https://skilldrills.online/ko/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "사인파 안구 운동 훈련・곡선 추적 에임 테스트", "item": "https://skilldrills.online/ko/drills/visual-tracking/sine-wave-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "사인파 안구 운동 훈련・곡선 추적 에임 테스트",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "정현파(사인파) 조화 진동 운동의 연속적인 가감속 곡선에 시선을 완벽하게 동기화하고 반환점에서의 보정 사케드를 억제하는 웹 기반 시각 트레이너.",
  "url": "https://skilldrills.online/ko/drills/visual-tracking/sine-wave-pursuit",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online/ko" },
  "inLanguage": "ko",
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "사인파 원활추종 트래커 (SkillDrills Sine Wave Pursuit)",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires HTML5 canvas and JavaScript ES6+",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "url": "https://skilldrills.online/ko/drills/visual-tracking/sine-wave-pursuit",
  "inLanguage": "ko",
  "dateModified": "2026-09-15"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "사인파 곡선 에임 훈련 (Sine Wave Pursuit)",
  "url": "https://skilldrills.online/ko/drills/visual-tracking/sine-wave-pursuit",
  "description": "파도치듯 상하좌우로 불규칙하게 진동하는 적의 움직임을 자석처럼 매끄럽게 물고 늘어지는 e스포츠 트래킹 에임 훈련 게임.",
  "genre": ["Aim Trainer", "Eye Tracking", "Vision Training", "Esports Drill"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "사인파 안구 운동 및 곡선 에임 훈련 방법",
  "description": "주기적 사인파 궤적에 소뇌의 내부 발진기를 동조시켜 위상 지연 없이 추종 게인을 1.0으로 유지하는 4단계 훈련 프로토콜.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "진동 주기와 진폭의 템포 파악",
      "text": "기본 속도 1.0x에서 표적이 좌우 또는 상하로 왕복하는 1주기의 시간과 진폭의 최대 한계선을 시선으로 파악합니다."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "중심 평형점 통과 시 최고 속도 동기화",
      "text": "사인파의 중심축(제로 크로싱 지점)을 지날 때 표적의 이동 속도가 최대화되므로 안구의 각속도를 순간 가속해 일치시킵니다."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "정점(반환점)에서의 완만한 감속 및 방향 전환",
      "text": "진폭의 최상단/최하단에 도달하여 속도가 0이 되는 순간을 선행 예측하여 눈동자가 튀어나가지 않도록 감속 쿠션을 형성합니다."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "추종 게인 유지 및 속도 증속",
      "text": "연속 90% 이상의 정확도를 달성하면 속도 배율을 점진적으로 높여 고주파 진동에서도 사케드 없는 추종을 유지합니다."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "사인파 안구 운동(Sine Wave Pursuit)이란 무엇이며 직선 추적과 무엇이 다른가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "등속 직선 운동은 일정한 속도로 이동하지만, 사인파(정현파) 운동은 단진동 물리 법칙에 따라 속도와 가속도가 연속적으로 바뀝니다. 중심 평형점을 통과할 때 속도가 최고조에 달하고, 양 끝 반환점에서는 순간적으로 멈춘 뒤 반대로 전환됩니다. 이 가감속 변화에 시선을 부드럽게 동기화하려면 고도의 소뇌 내부 주기 제어가 필요합니다 (Robinson, 1965)."
      }
    },
    {
      "@type": "Question",
      "name": "주기적으로 반복되는 움직임에 대해 사람의 눈은 왜 지연(위상 지연)을 0으로 줄일 수 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Stark 등(1962)의 선구적 연구에 따르면, 표적의 움직임이 예측 가능한 주기 파형일 때 인간의 뇌는 첫 1~2주기 내에 주파수와 주기를 소뇌에 학습합니다. 그 결과 약 130~150ms에 달하는 신경 생리학적 시각 지연을 상쇄하는 선행 신호를 외안근에 전달하여 '제로 위상 지연(Zero Phase Lag)' 추종을 달성하게 됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "반환점(곡선의 정점)에서 시선이 표적을 지나쳐 튕겨 나가는 이유는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "표적이 정점에 가까워지며 감속할 때 안구의 물리적 관성과 소뇌의 과잉 예측으로 인해 시선이 표적보다 앞서가는 '오버슈트(Overshoot)'가 발생하기 때문입니다. 튀어나간 시선을 제자리로 돌려놓기 위해 급격한 보정 사케드가 발생하므로, 정점 직전에 부드럽게 감속하는 브레이크 훈련이 필수적입니다 (Bahill et al., 1980)."
      }
    },
    {
      "@type": "Question",
      "name": "FPS 게임의 '곡선 트래킹(점프, 슬라이딩, 변칙 무빙 추적)'에 이 훈련이 어떻게 기여하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "에이펙스 레전드나 오버워치 등에서 적이 공중으로 점프하거나 좌우로 물결치듯 스트레이프할 때, 적의 머리는 가속과 감속이 반복되는 완만한 곡선을 그립니다. 본 드릴을 통해 정현파 궤적을 뇌에 프로그래밍하면 커서가 끊김 없이 표적에 밀착되어 명중률이 대폭 상승합니다."
      }
    },
    {
      "@type": "Question",
      "name": "추종 이득(Pursuit Gain)이란 정확히 무엇을 의미하는 수치인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "추종 이득은 '안구 회전 각속도 ÷ 표적 이동 각속도'의 비율을 뜻합니다. 완벽한 일치는 1.0입니다. 속도가 너무 빠르거나 예측이 빗나가 이득이 0.8 이하로 떨어지면 시선이 표적 뒤로 처지게 되어 잦은 보정 사케드가 유발됩니다 (Rashbass, 1961)."
      }
    },
    {
      "@type": "Question",
      "name": "좌우(수평) 방향보다 상하(수직) 사인파를 추적할 때 눈이 더 피로하고 어려운 생리학적 이유는?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "인간의 시각계는 수평 탐색에 주로 관여하는 내직근·외직근의 신경 경로가 고도로 발달해 있습니다. 반면 상하 운동을 담당하는 상직근·하직근과 사근군은 신경학적 대역폭이 좁아 고주파 수직 진동에서 추종 이득이 더 쉽게 저하됩니다. 따라서 수직 사인파를 꾸준히 훈련하는 것이 안구 밸런스에 매우 유익합니다."
      }
    },
    {
      "@type": "Question",
      "name": "야구, 배구, 테니스 등 현실 구기 스포츠의 궤적 추적에도 사인파 훈련이 도움되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, 매우 효과적입니다. 포물선을 그리며 떨어지는 플라이볼이나 바운드되는 공은 중력에 의해 수직 정현파와 유사한 가감속 역학을 따릅니다. 공이 최고점에 도달하거나 바운드되는 순간의 반환점을 흔들림 없이 추적하는 안구 근력이 타격과 포구의 정확도를 결정합니다."
      }
    },
    {
      "@type": "Question",
      "name": "모니터 주사율(Hz)이 사인파 추종 매끄러움에 미치는 영향은 어느 정도인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "사인파는 속도가 아날로그적으로 매 순간 달라지기 때문에 60Hz에서는 가속도 변화가 프레임 단위로 미세하게 끊겨 보입니다. 144Hz 이상의 고주사율 모니터에서는 변곡점 부근의 극미세 가속 변화가 망막에 부드럽게 입력되어 소뇌의 속도 예측 오차가 최소화됩니다 (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "하루 권장 훈련 시간과 세션 루틴은 어떻게 구성하는 것이 좋나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "외안근의 연속적인 긴장을 요하므로 60초 1세션을 3~5회(총 3~5분), 주 3~4회 수행하는 것이 이상적입니다. 눈에 충혈이 생기거나 초점이 흐려지면 즉시 중단하고 먼 산이나 벽을 바라보며 모양체근을 이완해야 합니다."
      }
    },
    {
      "@type": "Question",
      "name": "노화나 만성 시각 피로가 사인파 추종 능력에 미치는 영향과 훈련 효과는?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "수면 부족이나 시각 피로가 누적되면 소뇌의 주기 학습 루프가 지연되어 위상 지연이 발생하고 눈동자가 툭툭 튀는 사케드 간섭이 증가합니다. 정기적인 사인파 안구 운동은 노화로 인한 안구 기동력 감퇴를 방지하고 유연하고 매끄러운 시선 추적력을 유지해 줍니다."
      }
    }
  ]
};

const guideProps = {
  heading: "사인파 안구 운동 훈련의 과학적 기전과 곡선 에임 실전 가이드",
  intro: [
    "인간의 안구 운동계에서 원활추종(Smooth Pursuit)의 진정한 기량은 등속으로 움직이는 단순한 표적보다, 물리 법칙에 따라 연속적으로 가속과 감속을 반복하는 조화 운동(Harmonic Motion)을 추적할 때 명확히 드러납니다. 수학적 정현파(Sine Wave)를 따르는 궤적에서는 표적의 위치와 속도가 매 밀리초마다 변합니다. 중심 평형점을 지날 때 속도는 최고치에 달하며, 양극단의 정점(반환점)으로 향할수록 급격히 감속하여 순간적으로 정지한 뒤 반대 방향으로 가속합니다.",
    "시각 신경생리학의 거두 로렌스 스타크(Stark et al., 1962)와 데이비드 로빈슨(Robinson, 1965)의 고전적 연구에 따르면, 인간이 무작위 궤적을 쫓을 때는 약 130~150ms의 감각운동 전달 지연(위상 지연 / Phase Lag)이 필연적으로 발생합니다. 그러나 표적이 일정한 주기를 갖는 정현파를 그릴 경우, 소뇌(Cerebellum)의 편엽(Flocculus)은 불과 1~2회 왕복 내에 주기와 주파수를 학습하여 전두안구야로 선행 구동 신호를 보냅니다. 이를 통해 신경 지연 시간을 완전히 상쇄하여 위상차가 0이 되는 '제로 위상 지연(Zero Phase Lag)'의 완전 동기화가 실현됩니다.",
    "하지만 진동 속도가 빨라지거나 시각 피로가 누적되면 반환점에서 감속 타이밍을 놓쳐 표적을 지나치는 '오버슈트(Overshoot)'가 발생하고, 중앙 통과 시의 최고 속도를 따라잡지 못해 뒤처지는 '언더슈트'가 나타납니다. 라슈바스(Rashbass, 1961)와 바힐(Bahill et al., 1980)의 분석처럼, 추종 이득(Velocity Gain)이 무너지면 뇌는 시선을 표적으로 강제 견인하기 위해 보정 사케드(Catch-up Saccade)를 난발하게 되며, 도약이 일어나는 순간마다 사케드 억제로 인해 시각 정보 전달이 끊기게 됩니다.",
    "본 드릴(Sine Wave Pursuit)은 수평 및 수직 방향의 정현파 진동을 통해, 소뇌의 주기성 동조 회로와 외안근의 미세 가감속 출력 제어를 극대화하도록 설계되었습니다. 반환점에서의 부드러운 완충 제어와 중심 통과 시의 폭발적 추종을 완성하여, FPS 게임의 변칙적인 곡선 무빙 격추 및 구기 스포츠에서의 포물선 탄도 장악력을 완벽하게 구축하십시오."
  ],
  benchmarks: {
    title: "정현파 추종 이득 및 조화 진동 정밀도 표준 벤치마크 (Sinusoidal Pursuit Gain)",
    headers: ["숙련도 등급", "추종 이득 (Velocity Gain)", "위상 지연 (Phase Lag)", "주기당 보정 사케드 횟수", "종합 추적 판정"],
    rows: [
      ["엘리트 (Elite)", "0.96 ~ 1.02", "15ms 미만 (완벽 동기화)", "0 ~ 1 회 (완전 무결 추종)", "완벽한 소뇌 주기 모델 및 제로 위상 지연"],
      ["마스터 (Master)", "0.90 ~ 0.95", "15ms ~ 30ms", "2 ~ 3 회", "매우 정밀한 가감속 및 반환점 안정성"],
      ["다이아몬드 (Diamond)", "0.82 ~ 0.89", "31ms ~ 50ms", "4 ~ 5 회", "양호한 파형 추종, 고속 전환 시 미세 흔들림"],
      ["골드 (Gold)", "0.70 ~ 0.81", "51ms ~ 80ms", "6 ~ 8 회", "반환점 오버슈트 및 잦은 보정 사케드"],
      ["비기너 (Beginner)", "0.70 미만", "80ms 초과", "9 회 이상", "주기 예측 실패, 툭툭 끊어지는 도약형 추적"]
    ],
    note: "※ 본 기준은 1080p 해상도, 표준 속도 1.0x~1.5x 사인파 환경에서 측정된 실측 데이터 기준입니다. 안구 회전 각속도와 표적 각속도의 일치율(Gain) 및 사케드 간섭 빈도를 종합 평가합니다."
  },
  techniques: {
    title: "곡선 파형 궤적을 제압하는 4대 핵심 원활추종 기술",
    items: [
      {
        name: "소뇌 조화 발진기 위상 락킹 (Harmonic Phase Locking)",
        desc: "표적이 1~2회 왕복하는 동안 리듬감을 신체 감각으로 체화하고, 메트로놈에 맞추듯 소뇌의 내부 발진 주기를 표적 주파수에 동조시킵니다. 시각적 피드백을 수동적으로 기다리지 말고 리듬에 맞춰 시선을 선행 구동합니다.",
        tips: "눈으로만 보려 하지 말고 머릿속으로 일정한 카운트(하나, 둘, 하나, 둘)를 세며 호흡을 리듬에 일치시키세요."
      },
      {
        name: "반환점 소프트 쿠션 감속 (Apex Deceleration Cushioning)",
        desc: "표적이 파형의 최상단이나 최하단 정점에 도달하기 직전, 시선에 부드러운 감속 브레이크를 걸어 방향 반전 시 눈동자가 튀어 나가는 오버슈트를 원천 차단합니다.",
        tips: "그네가 최고점에 도달했을 때 무중력처럼 부드럽게 멈춘 뒤 반대로 내려가는 물리적 감각을 연상하세요."
      },
      {
        name: "중심 제로 크로싱 가속 돌파 (Zero-Crossing Boost)",
        desc: "사인파의 중심 평형선을 통과하는 찰나는 표적의 속도가 이론상 최대치에 도달합니다. 이 구간에서 시선 추진력을 한 단계 끌어올려 중심와 고정이 뒤처지지 않도록 만듭니다.",
        tips: "파도의 중심을 가를 때 의식적으로 마우스와 안구의 속도를 한 템포 과감하게 밀어붙이세요."
      },
      {
        name: "추종 보정 사케드의 의도적 억제 (Suppression of Catch-up Saccades)",
        desc: "표적과 시선 사이에 미세한 거리가 벌어지더라도 반사적으로 눈을 깜빡이듯 튀기는 도약(사케드)을 참고, 원활추종의 각속도를 점진적으로 높여 부드럽게 간격을 좁힙니다.",
        tips: "시선이 툭툭 끊기지 않고 고무줄처럼 매끄럽게 표적 핵으로 다시 수렴되는 연속성을 의식하십시오."
      }
    ]
  },
  steps: [
    "장비 및 자세 세팅: 화면 중앙과 시선 높이를 수평으로 맞추고 모니터와의 거리를 55~65cm로 유지하여 안정된 시각 축을 만듭니다.",
    "기본 속도 적응: 1.0x 기본 속도로 드릴을 시작하여 사인파의 진폭 높낮이와 1왕복 왕복 주기를 시각적으로 파악합니다.",
    "주기 리듬 동기화: 첫 2~3회 왕복 동안 표적이 중심을 통과하는 순간과 정점에서 반전하는 타이밍에 시선 리듬을 맞춥니다.",
    "60초 연속 무결 추종: 60초 세션 동안 한 번의 보정 사케드 없이 매끄러운 곡선 추적을 유지하는 것을 목표로 집중합니다.",
    "세션 지표 분석: 세션 종료 후 도출된 추종 정확도(Accuracy)와 안정성 지표를 점검하여 소뇌 주기 동조 회로의 발전도를 기록합니다."
  ],
  audience: "에이펙스, 오버워치 등에서 적의 현란한 슬라이딩과 점프 무빙에 에임을 자석처럼 붙이고 싶은 게이머, 야구·배구 등에서 포물선 궤적의 낙하지점을 정확히 간파하고 싶은 운동선수, 부드러운 시선 이동 능력을 강화하려는 모든 사용자.",
  faqs: faqSchema.mainEntity.map(item => ({
    q: item.name,
    a: item.acceptedAnswer.text
  })),
  sources: pickSources('stark1962', 'robinson1965', 'rashbass1961', 'bahill1980', 'barnes2008', 'woods2015'),
  related: [
    { href: "/ko/drills/visual-tracking/constant-slow-pursuit", label: "저속 안구 운동 훈련 (Constant Slow)" },
    { href: "/ko/drills/visual-tracking/directional-chaos-pursuit", label: "카오스 방향 전환 추적 (Directional Chaos)" },
    { href: "/ko/drills/visual-tracking/dynamic-evasion-pursuit", label: "회피 표적 추적 훈련 (Dynamic Evasion)" },
    { href: "/ko/drills/visual-tracking/ghosting-suppress-pursuit", label: "잔상 억제 시선 고정 훈련 (Ghosting Suppress)" },
    { href: "/ko/drills/visual-tracking/infinity-pursuit", label: "8자 안구 운동 훈련 (Infinity)" },
    { href: "/ko/drills/visual-tracking/predictive-pursuit", label: "가림 궤적 예측 추적 (Predictive Pursuit)" }
  ]
};

export default function KoreanSineWavePursuitPage() {
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

      <SineWavePursuitClient
        copy={{
          title: "사인파 안구 운동 훈련・곡선 추적 에임 테스트: 조화 진동과 제로 위상 지연",
          subtitle: "정현파의 연속적인 가감속과 주기적 방향 반전에 소뇌를 동기화하는 원활추종 훈련",
          description: "수평 및 수직 정현파(사인파) 주기 진동을 따라 부드럽게 시선을 제어하는 무료 안구 훈련. 중심 평형점의 최고 속도와 양 끝 반환점의 감속 변곡점을 완벽 동조시켜, 130~150ms의 생리학적 위상 지연(Lag)을 제로화합니다. 등록 불필요・웹에서 즉시 측정 가능."
        }}
      />

      <DrillGuide guide={guideProps} />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/ko/drills/visual-tracking/sine-wave-pursuit" />
      </div>
    </>
  );
}
