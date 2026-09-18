import StrobeLatencyClient from '@/app/drills/visual/reaction-speed/light-reaction/StrobeLatencyClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "빛 반응속도 테스트: 시각 반사신경 측정 | SkillDrills",
  description: "화면 중앙의 백색 섬광에 대한 단순 시각 반응 시간(SRT)을 밀리초 단위로 정밀 측정합니다. 광전기 변환부터 신경근 수축까지 잠복기를 진단하세요.",
  keywords: [
    "빛 반응 속도 검사",
    "빛 반응속도 테스트",
    "시각 반응속도 테스트",
    "순발력 테스트",
    "단순 반응 시간 SRT",
    "반사신경 테스트",
    "밀리초 반응속도 측정",
    "피에롱의 법칙 반응속도",
    "광학 반응 검사",
    "망막 광전기 변환 속도",
    "FPS 시각 반응 훈련",
    "온라인 반사신경 측정"
  ],
  openGraph: {
    title: "빛 반응속도 테스트: 시각 반사신경 측정 | SkillDrills",
    description: "백색 섬광에 반응하는 단순 시각 반응 시간(SRT)을 밀리초(ms) 단위로 정밀 측정하는 무료 온라인 반사신경 테스트.",
    type: 'article',
    url: 'https://skilldrills.online/ko/drills/visual/reaction-speed/light-reaction',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "빛 반응속도 테스트: 시각 반사신경 측정 | SkillDrills",
    description: "밀리초 정밀도로 시각 신경근 반사 속도를 측정하고 훈련하는 무료 온라인 빛 반응속도 검사.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/visual/reaction-speed/light-reaction',
    languages: getAlternateLanguages('/drills/visual/reaction-speed/light-reaction'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://skilldrills.online/ko" },
    { "@type": "ListItem", "position": 2, "name": "훈련 카탈로그", "item": "https://skilldrills.online/ko/drills" },
    { "@type": "ListItem", "position": 3, "name": "시각 훈련", "item": "https://skilldrills.online/ko/drills/visual" },
    { "@type": "ListItem", "position": 4, "name": "반응 속도", "item": "https://skilldrills.online/ko/drills/visual/reaction-speed" },
    { "@type": "ListItem", "position": 5, "name": "빛 반응속도 테스트", "item": "https://skilldrills.online/ko/drills/visual/reaction-speed/light-reaction" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "빛 반응속도 테스트 (시각 반사신경 검사)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/ko/drills/visual/reaction-speed/light-reaction",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "KRW" },
  "description": "광학 섬광 자극에 대한 단순 시각 반응 시간(SRT) 및 광전기-신경근 신호 전달 잠복기를 밀리초 단위로 측정하는 신경인지 도구.",
  "featureList": [
    "performance.now() 고해상도 API 기반 밀리초(ms) 정밀 시각 잠복기 측정",
    "300ms ~ 2,500ms 범위의 무작위 자극 간격 제시를 통한 선행 예측 차단",
    "예측 오클릭 및 스팸 클릭 방지 휴리스틱 시스템 탑재",
    "외부 서버 통신 없는 완전한 브라우저 로컬 데이터 보관"
  ],
  "dateModified": "2026-09-05"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "빛 반응속도 테스트 — 시각 반사신경 측정 | SkillDrills",
  "alternateName": "Light Reaction Pro",
  "url": "https://skilldrills.online/ko/drills/visual/reaction-speed/light-reaction",
  "dateModified": "2026-09-05",
  "description": "무료 온라인 시각 반사속도 검사. 화면 중앙의 목표가 백색으로 점멸하는 순간 지체 없이 클릭하여 순발력을 측정하세요.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas를 지원하는 최신 웹 브라우저.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "KRW" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "단순 시각 반응 시간, 광학-운동 잠복기, 신경근 반사 속도, 피에롱의 법칙, 시각 주의력"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "빛 반응속도 반사 훈련",
  "url": "https://skilldrills.online/ko/drills/visual/reaction-speed/light-reaction",
  "description": "빛의 섬광에 반응하여 순간 순발력과 반사신경을 극대화하는 온라인 반응 훈련 게임.",
  "genre": ["Action", "Reaction Speed", "Reflex Game"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "KRW" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "빛 반응속도 테스트 진행 방법",
  "dateModified": "2026-09-05",
  "description": "스트로브 발광 프로토콜을 통해 시각 반응 시간과 신경근 반사 잠복기를 측정하는 4단계 방법.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "중앙 타깃 원반에 시선 고정",
      "text": "캔버스 중앙의 어두운 원형 타깃에 시선을 편안히 집중하고 불필요한 근육 긴장을 풉니다.",
      "url": "https://skilldrills.online/ko/drills/visual/reaction-speed/light-reaction#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "예측할 수 없는 백색 섬광 대기",
      "text": "300ms에서 2,500ms 사이의 무작위 간격 동안 섣불리 누르지 않고 고도의 집중 상태를 유지합니다.",
      "url": "https://skilldrills.online/ko/drills/visual/reaction-speed/light-reaction#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "백색 섬광 점멸 즉시 타격 실행",
      "text": "타깃이 순백색으로 번쩍이는 찰나 마우스를 클릭하거나 스페이스바를 누릅니다 (+150점 × 콤보 × 레벨).",
      "url": "https://skilldrills.online/ko/drills/visual/reaction-speed/light-reaction#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "예측 스팸 클릭 지양",
      "text": "빛이 번쩍이기 전에 누르면 1.2초의 쿨다운 패널티가 발생하므로 진정한 신경 반사로 격발해야 합니다.",
      "url": "https://skilldrills.online/ko/drills/visual/reaction-speed/light-reaction#step-4"
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
      "name": "빛 반응속도 테스트란 무엇이며 무엇을 측정하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "빛 반응속도 검사는 단순 시각 반응 시간(Simple Reaction Time, SRT)을 측정하는 고정밀 심리물리학적 평가 프로토콜입니다. 화면 중앙의 시각 자극이 백색으로 번쩍이는 순간부터 손가락 운동이 개시되기까지의 밀리초(ms) 잠복기를 계측합니다."
      }
    },
    {
      "@type": "Question",
      "name": "건강한 성인의 평균 시각 반응 시간은 얼마인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "건강한 성인의 단순 시각 반응 시간은 통상 200ms에서 250ms 사이입니다. 고도로 훈련된 프로게이머, 육상 단거리 선수, 격투기 선수는 160ms~190ms 대의 경이로운 반응 속도를 기록합니다."
      }
    },
    {
      "@type": "Question",
      "name": "빛을 보고 클릭하기까지 뇌와 신경에서 어떤 과정이 일어나나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "시각 반응은 4단계를 거칩니다: (1) 망막 로돕신 활성화에 의한 광전기 변환(~20-40ms), (2) 시신경 및 외측슬상핵을 거쳐 시각피질 V1으로의 전달(~30-50ms), (3) 두정엽 및 운동 피질에서의 감각 인지 및 운동 계획(~50-80ms), (4) 피질척수로를 통한 손가락 근육으로의 운동 하달(~30-50ms)."
      }
    },
    {
      "@type": "Question",
      "name": "피에롱의 법칙(Piéron's Law)이란 무엇이며 밝기는 반응 시간에 어떤 영향을 주나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "피에롱의 법칙은 시각 자극의 광도(Luminance)가 배경 대비 증가할수록 반응 시간이 쌍곡선 형태로 단축된다는 정신물리학적 원리입니다. 어두운 배경에서 번쩍이는 순백색 섬광은 망막 신경절 세포를 최대로 활성화하여 감각 지연을 극소화합니다."
      }
    },
    {
      "@type": "Question",
      "name": "청각 반응이 시각 반응보다 더 빠른 이유는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "청각 반응 시간은 시각 반응보다 약 30~50ms 더 빠릅니다 (청각 140~160ms vs 시각 200~250ms). 달팽이관 유모세포의 기계적 신호 변환은 1~3ms에 불과하지만, 망막의 생화학적 광전기 변환은 20~40ms가 소요되기 때문입니다."
      }
    },
    {
      "@type": "Question",
      "name": "단순 시각 반응 속도는 지속적인 훈련으로 단축될 수 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네. 신경가소성 연구에 따르면 반복적인 훈련은 피질척수로의 흥분성을 높이고 공간적 주의 집중을 최적화하여 뇌의 신경 운동 처리 시간을 단축시킵니다 (Dye et al., 2009)."
      }
    },
    {
      "@type": "Question",
      "name": "모니터 주사율(60Hz, 144Hz, 240Hz)이 반응 테스트 점수에 미치는 영향은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "60Hz 모니터는 프레임 버퍼 지연이 최대 16.7ms 발생하지만, 240Hz 모니터는 4.1ms로 줄어듭니다. 1,000Hz 게이밍 마우스와 함께 사용할 때 하드웨어 지연을 최소화하여 실제 신체 반사 속도를 측정할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "빛이 나오기 전에 누르면 왜 쿨다운 페널티가 발생하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "자극이 나타나기 전에 누르거나 1초에 3회 이상 난타하는 행위는 안티 스팸 알고리즘에 의해 감지됩니다. 1.2초간 섬광이 정지되어 어림짐작이 아닌 순수한 신경근 반사 속도만 기록되도록 보호합니다."
      }
    },
    {
      "@type": "Question",
      "name": "수면, 카페인, 피로도가 밀리초 반응 시간에 어떤 영향을 미치나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "수면 부족과 뇌 피로는 전두엽 각성도를 저하시켜 반응 시간을 30~80ms 지연시킵니다. 반면 적정량의 카페인(100~200mg)은 아데노신을 억제하여 일시적으로 반응 시간을 10~20ms 단축시키는 효과가 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "이 검사는 무료인가요? 내 측정 기록은 안전하게 보호되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네. 스킬드릴의 빛 반응속도 테스트는 로그인이나 결제 없이 100% 무료로 제공됩니다. 모든 측정 기록과 통계는 브라우저 로컬 저장소에만 보관되며 외부 서버로 전송되지 않습니다."
      }
    }
  ]
};

const lightReactionGuide = {
  heading: "시각 반사 연대학 및 단순 반응 시간(SRT) 표준 가이드",
  intro: [
    "단순 시각 반응 시간(Simple Reaction Time, SRT)은 단일 시각 자극이 돌발적으로 출현한 순간부터 무조건적인 운동 반응이 일어날 때까지의 기초 정신운동 잠복기를 의미합니다. 육상 단거리 스타트, 모터스포츠, 격투기, 그리고 고속 FPS e스포츠에서는 수 밀리초의 반사 속도 차이가 승패를 결정합니다.",
    "빛 자극에 대한 신경근 연쇄 반응은 네 단계의 생리학적 경로를 거칩니다: (1) 망막 로돕신 이성질화에 따른 광전기 변환(~20–40 ms), (2) 외측슬상핵(LGN)을 거쳐 1차 시각피질 V1으로 향하는 구심성 신경 전달(~30–50 ms), (3) 후두정엽 및 보조운동영역에서의 지각 및 운동 계획 수립(~50–80 ms), (4) 피질척수로(Pyramidal tract)를 따라 손가락 굴근을 수축시키는 원심성 신호 하달(~30–50 ms)을 거치며, 건강한 일반인의 정상 반응 시간은 약 200–250 ms로 형성됩니다 (Kosinski, 2008; Jain et al., 2015; Shelton & Kumar, 2010).",
    "피에롱의 법칙(Piéron, 1952; Pins & Bonnet, 1996)에 따르면, 자극의 휘도가 배경 대비 높을수록 반응 잠복기는 쌍곡선 함수 형태로 단축됩니다. 본 훈련은 칠흑 같은 암실 배경에 초고대비 순백색 섬광을 투사하여 망막 신경절 세포의 탈분극 속도를 극대화하도록 설계되었습니다. 또한 포스너(Posner, 1980)의 공간 주의 집중 모델과 바벨리어(Dye et al., 2009)의 연구는 집중 훈련을 통해 대뇌 운동 계획 시간을 유의미하게 압축할 수 있음을 증명합니다.",
    "측정 기준 및 하드웨어 정밀 보정: 모든 자극 점멸과 사용자 입력은 performance.now() 고정밀 API를 통해 밀리초 단위로 수집됩니다. 디스플레이 재생률과 마우스 USB 폴링 주기에 따른 하드웨어 양자화 지연(Woods et al., 2015)을 고려하여 분석되며, 모든 데이터는 로컬 환경에만 안전하게 격리됩니다."
  ],
  benchmarks: {
    title: "단순 시각 반응 시간(SRT) 밀리초 퍼포먼스 벤치마크 기준",
    headers: ["숙련도 티어", "평균 반응 잠복기 (ms)", "달성 점수・콤보 기준", "신경근 전달 및 생리학적 반사 프로필"],
    rows: [
      ["티어 1: 최정상급 신경 반사 (Apex Neural)", "< 180 ms", "15,000점 이상 | 콤보 28x+", "운동 피질의 극대화된 흥분성과 최적화된 피질척수로 전도. 프로 e스포츠 선수나 올림픽 스프린터에게 나타나는 최상위 신경계 수준."],
      ["티어 2: 우수 시각 반사 (Superior Reflex)", "180 – 219 ms", "10,500 – 14,999점 | 콤보 18x+", "신속한 광학 운동 연계. 220ms 미만의 반응 속도를 세션 내내 균일하게 유지하는 순발력 특화 엘리트 레벨."],
      ["티어 3: 건장한 성인 기준 (Solid Baseline)", "220 – 259 ms", "6,000 – 10,499점 | 콤보 10x+", "건강한 성인의 표준 시각 반응 속도. 정상적인 신경 전달 경로를 보유하며 피로도에 따라 경미한 편차가 발생."],
      ["티어 4: 중등도 지연 (Moderate Latency)", "260 – 319 ms", "2,500 – 5,999점 | 콤보 5x+", "감각 및 운동 정보 처리 지연. 디스플레이 주사율 지연, 안구 피로, 혹은 주의력 저하의 영향을 받는 단계."],
      ["티어 5: 기초 발달 단계 (Developing)", "> 320 ms", "< 2,500점 | 콤보 < 5x", "상당한 감각 지연 발생. 60Hz 화면 지연, 극심한 신체 피로, 또는 부적절한 입력 장치 환경이 원인일 수 있음."]
    ],
    note: "본 기준표는 인간 정신 연대학 및 시각 반응 물리심리학 문헌(Kosinski, 2008; Woods et al., 2015; Pins & Bonnet, 1996; Jain et al., 2015)에 근거한 가이드라인입니다. 일주기 생체 리듬, 카페인 섭취 및 모니터 환경에 따라 결과가 달라질 수 있습니다."
  },
  techniques: {
    title: "시각 반응속도 단축을 위한 실전 테크닉",
    items: [
      {
        name: "중심와 사전 활성화 및 시선 고정",
        desc: "시야의 중심와(Fovea)를 중앙 목표점에 고정하면 주의 이동에 소모되는 20~30ms의 지연을 제거할 수 있습니다 (Posner, 1980).",
        tips: "어두운 중앙 타깃에 시선을 못박아 두세요. 섬광을 기다리는 동안 점수판이나 타이머로 시선이 흔들려서는 안 됩니다."
      },
      {
        name: "피에롱 대비 극대화 및 광수용체 프라이밍",
        desc: "최고 수준의 휘도 대비는 망막 신경절 발화 주파수를 높여 감각 변환 시간을 단축시킵니다 (Pins & Bonnet, 1996).",
        tips: "실내 조명을 살짝 어둡게 조절하여 동공을 미세하게 확장시키면 백색 섬광의 대비 체감과 신경 전달 속도가 극대화됩니다."
      },
      {
        name: "등척성 손가락 예비 장력 유지",
        desc: "손가락이 공중에 떠 있으면 키 이동 거리와 스위치 디바운스로 인해 불필요한 기계적 지연이 추가됩니다 (Woods et al., 2015).",
        tips: "손가락 끝을 마우스 버튼이나 화면에 가볍게 접촉시킨 채로 부드러운 예비 장력을 유지하여 무유격 격발을 준비하십시오."
      },
      {
        name: "고주사율 하드웨어 최적화",
        desc: "60Hz 모니터는 최대 16.7ms의 화면 지연을 추가하지만 240Hz 모니터는 이를 4.1ms로 압축합니다 (Woods et al., 2015).",
        tips: "144Hz 이상의 고주사율 모니터와 1,000Hz 폴링레이트 마우스를 사용하여 신체 본연의 반사 신경을 온전히 기록하십시오."
      }
    ]
  },
  steps: [
    "훈련 시작 버튼을 클릭하여 45초 세션을 활성화합니다.",
    "캔버스 중앙의 어두운 원형 타깃에 시선을 조용히 고정합니다.",
    "300ms에서 2,500ms 사이의 불규칙한 대기 시간 동안 침착하게 대기합니다.",
    "타깃이 순백색으로 번쩍이는 순간 지체 없이 마우스를 클릭합니다 (+150점 × 배율).",
    "세션 종료 후 평균 반응 시간, 최고 레벨, 정확도 평가 등급을 확인합니다."
  ],
  audience: "FPS e스포츠 게이머, 격투기 선수, 육상 단거리 선수, 모터스포츠 레이서, 비행 조종사 및 시각 운동 반사 신경을 극대화하고자 하는 모든 사용자.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('woods2015', 'kosinski2008', 'pins1996', 'posner1980', 'jain2015', 'dye2009'),
  related: [
    { href: "/ko/drills/visual/reaction-speed/go/no-go", label: "Go / No-Go 충동 제어 검사" },
    { href: "/ko/drills/visual/depth-perception/distance-judgment", label: "거리 판별 심시력 검사" },
    { href: "/ko/drills/visual/tracking-accuracy/moving-target", label: "이동 표적 요격 훈련" },
    { href: "/ko/drills/visual/tracking-accuracy/multiple-targets", label: "다중 객체 추적 검사" },
    { href: "/ko/drills/visual/tracking-accuracy/pursuit-tracker", label: "스무스 퍼슈트 추적기" },
    { href: "/ko/drills/visual/visual-recognition/entropic-grid", label: "엔트로피 그리드 탐색 훈련" }
  ]
};

export default function StrobeLatencyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <StrobeLatencyClient copy={{ title: "빛 반응속도 테스트: 시각 반사신경 측정" }} />
      <DrillGuide guide={lightReactionGuide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/ko/drills/visual/reaction-speed/light-reaction" />
      </div>
    </>
  );
}
