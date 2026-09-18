import PeripheralPingPursuitClient from '@/app/drills/visual-tracking/peripheral-ping-pursuit/PeripheralPingPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// KOREAN SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "주변시 훈련" (Peripheral vision training) / "중심시 주변시 동시 훈련"
// Secondary:    "시야각 넓히기", "주변시야 넓히는법", "동체시력 주변시 테스트"
// LSI / Domain:  "잠재적 공간 주의", "터널 비전 교정", "기능적 시야 UFOV",
//               "미니맵 맵리딩 훈련", "중심와 고정 주변 감지", "시각적 주의력 분배"
// Authentic Domain Terms: 주변시 훈련(Peripheral Vision Training), 잠재적 공간 주의(Covert Spatial Attention), 기능적 시야(Useful Field of View / UFOV), 중심와(Fovea centralis), 간상세포(Rods), 터널 비전(Tunnel Vision)
// ============================================================

export const metadata = {
  title: "주변시 핑 추적 훈련・중심시 주변시 통합 테스트 – 시야 확장・잠재적 주의력 | SkillDrills",
  description: "중심 표적을 시선으로 매끄럽게 추적하면서 주변 시야에서 순간적으로 번쩍이는 핑을 눈동자 이동 없이 감지하는 무료 시각 훈련. 잠재적 공간 주의력과 동체시야 확장. 무설치 웹 테스트.",
  keywords: [
    "주변시 훈련",
    "중심시 주변시 동시 훈련",
    "시야각 넓히기",
    "주변시야 넓히는법",
    "동체시력 주변시 테스트",
    "잠재적 공간 주의",
    "터널 비전 교정",
    "기능적 시야 UFOV",
    "미니맵 맵리딩 훈련",
    "중심와 고정 주변 감지",
    "시각적 주의력 분배",
    "동체시야 확장 훈련"
  ],
  openGraph: {
    title: "주변시 핑 추적 훈련・중심시 주변시 통합 테스트 – 시야 확장・잠재적 주의력 | SkillDrills",
    description: "중심 표적을 추적하며 주변 시야 핑을 감지하는 무료 온라인 주변시 훈련. 터널 비전 완화 및 시야각 확대.",
    type: "website",
    url: "https://skilldrills.online/ko/drills/visual-tracking/peripheral-ping-pursuit",
    siteName: "SkillDrills",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "주변시 핑 추적 훈련・중심시 주변시 통합 테스트 – 시야 확장・잠재적 주의력 | SkillDrills",
    description: "중심 표적에 시선을 고정한 채 주변 시야 변화를 탐지하는 과학적 주변시야 및 잠재적 주의력 트레이닝.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/visual-tracking/peripheral-ping-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/peripheral-ping-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://skilldrills.online/ko" },
    { "@type": "ListItem", "position": 2, "name": "드릴 목록", "item": "https://skilldrills.online/ko/drills" },
    { "@type": "ListItem", "position": 3, "name": "시각 추적 및 안구 운동", "item": "https://skilldrills.online/ko/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "주변시 핑 추적 훈련・중심시 주변시 통합 테스트", "item": "https://skilldrills.online/ko/drills/visual-tracking/peripheral-ping-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "주변시 핑 추적 훈련・중심시 주변시 통합 테스트",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Any (Web Browser)",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "중심 표적을 부드러운 안구 추적(Smooth Pursuit)으로 쫓으면서 주변 시야의 순간 광학 핑을 잠재적 주의력으로 탐지하는 브라우저 기반 시야각 확장 트레이너.",
  "url": "https://skilldrills.online/ko/drills/visual-tracking/peripheral-ping-pursuit",
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "주변시 핑 추적기 (SkillDrills Peripheral Ping Pursuit)",
  "url": "https://skilldrills.online/ko/drills/visual-tracking/peripheral-ping-pursuit",
  "browserRequirements": "Requires HTML5 canvas and JavaScript ES6+",
  "applicationCategory": "SportsApplication"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "주변시 핑 추적 훈련 (Peripheral Ping Pursuit)",
  "description": "중심 조준점을 유지한 상태에서 화면 외곽의 기습적 시각 자극을 식별하는 동체시력 및 공간 인지 게이밍 트레이닝 도구.",
  "genre": ["E-sports Trainer", "Vision Training", "Cognitive Drill"],
  "playMode": "SinglePlayer"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "주변시 및 중심시 동시 인지 훈련 수행 방법",
  "description": "중심와 고정을 풀지 않고 잠재적 공간 주의를 활용하여 주변 시야 핑을 탐지하는 표준 훈련 프로토콜.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "중심 표적에 시선 고정",
      "text": "화면 중앙에서 완만하게 움직이는 메인 타깃을 중심와(fovea) 시선으로 부드럽게 추적합니다."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "잠재적 공간 주의력 확장",
      "text": "시선은 계속 중앙 구체에 유지하되, 의식적인 시각적 주의의 범위를 화면 전체 외곽으로 넓힙니다."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "주변 핑 즉각 감지 및 스페이스바 입력",
      "text": "주변 시야 외곽에 순간적으로 빛나는 핑이 출현하면 눈동자를 돌리지 말고 즉시 스페이스바를 누릅니다."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "시야각 지수 및 반응 속도 피드백 확인",
      "text": "세션 완료 후 측정된 UFOV 감지율과 반응 지연 시간을 점검하여 터널 비전 개선도를 추적합니다."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "주변시 훈련이란 정확히 무엇이며 왜 중심 표적을 보면서 해야 하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "인간의 시각 체계는 고해상도 중심시(중심와, fovea)와 저해상도이지만 움직임과 광학 변화에 극도로 민감한 주변시(망막 외곽)로 분리되어 있습니다. 중심 표적을 보면서 주변 핑을 감지하도록 설계된 이유는 실제 경기(FPS, 구기종목, 모터스포츠)에서 조준선이나 주시 대상을 놓치지 않은 채 화면 구석의 적, 미니맵, 돌발 위험 요소를 동시 인지해야 하기 때문입니다."
      }
    },
    {
      "@type": "Question",
      "name": "눈동자를 주변 핑으로 돌려(사카드 도약) 확인하면 왜 훈련 효과가 떨어지나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "눈동자를 직접 돌려 대상을 중심와로 가져오는 것은 '현성 주의(Overt Attention)'입니다. 반면 본 드릴의 핵심 목적은 눈을 움직이지 않고 시각적 주의력만을 외곽으로 넓히는 '잠재적 공간 주의(Covert Spatial Attention)'를 강화하는 것입니다. 사카드 안구 도약이 일어나면 약 50~150ms 동안 일시적 시각 차단(사카드 억제)이 발생하여 중심 표적 추적이 끊어지게 됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "긴박한 상황에서 발생하는 '터널 비전(Tunnel Vision)'을 이 드릴로 교정할 수 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, 매우 효과적입니다. 높은 인지 부하나 스트레스 상태에서는 에릭센(Eriksen)의 줌렌즈 모델에 따라 시각적 주의의 초점이 좁아지며 주변 시야 자극을 인식하지 못하는 터널 비전이 유발됩니다. 본 훈련은 이중 과제(추적+감지)를 통해 전두-두정엽 주의 네트워크의 병렬 처리 역량을 강화함으로써 고압 상황에서도 시야를 넓게 유지하도록 훈련시킵니다."
      }
    },
    {
      "@type": "Question",
      "name": "FPS 게임이나 실전 e스포츠에서 주변시가 승률에 어떤 영향을 미치나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "조준선을 적 예상 경로에 배치한 상태(크로스헤어 플레이스먼트)에서, 눈동자를 미니맵이나 화면 구석으로 돌리지 않고도 주변시로 적의 픽셀 깜빡임이나 스킬 투사체를 감지할 수 있습니다. 이는 정보 획득 지연을 100ms 이상 줄여주어 기습 대처 능력과 생존율을 획기적으로 상승시킵니다."
      }
    },
    {
      "@type": "Question",
      "name": "잠재적 공간 주의(Covert Spatial Attention)와 일반 주의력의 차이는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "포스너(Posner, 1980)의 시각 공간 큐잉 연구에 따르면, 인간은 안구를 고정한 상태에서도 뇌의 주의력 스포트라이트(Attentional Spotlight)만을 공간의 특정 방향으로 이동시킬 수 있습니다. 잠재적 주의력은 눈의 물리적 근육 이동에 의존하지 않으므로 훨씬 민첩하며, 다방향 위험 감시의 핵심 신경 기제입니다."
      }
    },
    {
      "@type": "Question",
      "name": "망막의 원추세포와 간상세포는 주변시에서 각각 어떤 역할을 하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "중심와에는 색상과 세부 형태를 판별하는 원추세포(Cones)가 밀집해 있는 반면, 주변부 망막에는 빛과 미세한 움직임 변화를 초고속으로 감지하는 간상세포(Rods)와 마그노세포(Magnocellular) 경로가 지배적입니다. 따라서 주변 시야는 글자를 읽기에는 부적합하지만, 적의 출현이나 점멸하는 핑을 가장 빠르게 탐지하는 데 최적화되어 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "하루에 권장되는 주변시 훈련 시간과 세션 빈도는 어떻게 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "고도의 집중력을 요하는 이중 시각 인지 과제이므로, 1회 5~10분 세션, 주 3~5회가 이상적입니다. 뇌의 시각 피질과 주의력 피로가 누적되면 오히려 반응 속도가 둔화되므로 세션 사이에 1~2분의 눈 휴식(먼 곳 바라보기)을 취하는 것이 좋습니다."
      }
    },
    {
      "@type": "Question",
      "name": "모니터 크기와 시청 거리가 주변시 훈련 효과에 어떤 영향을 주나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "일반적으로 모니터 시청 거리는 화면 대각선 길이의 1.2~1.5배(약 50~70cm)가 적절합니다. 화면이 시야각(Field of View)의 약 30~45도를 차지할 때 중심시와 주변시 분리 자극이 가장 효과적으로 일어납니다. 너무 멀리 앉으면 모든 자극이 중심시 범위 내로 들어가 훈련 효과가 감소합니다."
      }
    },
    {
      "@type": "Question",
      "name": "주변 핑 감지 시 스페이스바 반응 속도가 늦게 측정되는 신경학적 원인은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "주변부 망막 신호는 대뇌의 배측 경로(Dorsal stream)와 두정엽을 거쳐 운동 피질로 전달됩니다. 초기 훈련 단계에서는 두 개의 과제(중심 추적 유지 + 외곽 감지 판단)가 작업 기억과 주의 자원을 경쟁적으로 점유하므로 인지 병목(Bottleneck) 현상이 발생하여 반응이 지연될 수 있으며, 훈련을 거듭할수록 자동화되어 반응 시간이 단축됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "일상생활(운전, 보행, 업무)에서도 이 주변시 훈련이 실질적인 도움을 주나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "그렇습니다. 기능적 시야(UFOV, Useful Field of View) 연구에 따르면, 주변시가 발달한 운전자는 교차로 돌발 보행자나 급제동 차량에 대한 사고율이 50% 이상 낮습니다. 또한 다중 모니터 작업자나 운동선수의 공간 인지 능력을 대폭 개선해 줍니다."
      }
    }
  ]
};

const guideProps = {
  heading: "주변시 핑 추적 훈련의 과학적 원리와 시야각 확장 가이드",
  intro: [
    "인간의 시각 체계는 해부학적으로 중심와(Fovea centralis)를 통한 고해상도 초점 시각과, 망막 외곽의 간상세포(Rods) 및 마그노세포(Magnocellular pathway)를 통한 고감도 주변 시각으로 이원화되어 작동합니다. 일반적인 시선 추적 훈련이 중심시의 정밀도에 초점을 맞추는 반면, 본 주변시 핑 추적 훈련(Peripheral Ping Pursuit)은 시선을 중앙 표적에 고정 유지한 상태에서 시야 외곽의 돌발 광학 자극을 인지하는 잠재적 공간 주의(Covert Spatial Attention)를 극대화하도록 설계되었습니다.",
    "인지심리학의 거두 마이클 포스너(Michael Posner, 1980)의 공간 큐잉 이론에 따르면, 인간은 눈동자를 직접 회전시키는 현성 주의(Overt Attention)뿐만 아니라, 안구를 완전히 고정한 채 내적 주의력 스포트라이트만을 확장·이동시키는 잠재적 주의 능력을 지니고 있습니다. 안구 도약(Saccade)을 일으키면 약 100ms 동안 시각 정보 전달이 차단되는 사카드 억제 현상이 발생하지만, 잠재적 주의를 활용하면 시선의 흔들림 없이 전방위 시각 공간을 실시간으로 감시할 수 있습니다.",
    "치열한 전투 환경이나 고속 스포츠 경기에서 인간은 흔히 '터널 비전(Tunnel Vision)'에 빠집니다. 에릭센(Eriksen, 1986)의 줌렌즈 모델(Zoom-lens Model)이 설명하듯, 인지적 부하와 스트레스가 급증하면 뇌는 시각적 주의 반경을 강제로 좁혀 중심부 이외의 모든 정보 처리를 배제합니다. 본 드릴은 중심부의 연속 부드러운 안구 운동(Smooth Pursuit)과 외곽부의 비주기적 핑 감지를 동시에 요구하는 엄격한 이중 과제(Dual-task) 패러다임을 부과하여, 고압 환경에서도 기능적 시야(Useful Field of View / UFOV)가 축소되지 않도록 훈련합니다.",
    "본 훈련을 꾸준히 수행하면 e스포츠에서의 미니맵 확인 지연 감소, FPS 기습 대처, 그리고 축구·농구 등 구기 종목에서의 오픈 패스 경로 탐색 능력이 유의미하게 향상됩니다. 중심와 앵커를 흔들지 않고 주변부 시각 피질의 정보 처리 효율을 극대화하여 시야 전체를 통제하는 진정한 공간 인지 지배력을 완성하십시오."
  ],
  benchmarks: {
    title: "주변시 인지율 및 반응 지연 표준 벤치마크 (UFOV & Reaction Time)",
    headers: ["숙련도 등급", "기능적 시야 감지율 (UFOV %)", "주변 핑 평균 반응 속도", "추적 안정성 유지율", "종합 인지 판정"],
    rows: [
      ["엘리트 (Elite)", "93% 이상", "280ms 미만", "96% 이상", "초광각 잠재 주의 및 완벽한 중심와 독립성"],
      ["마스터 (Master)", "85% ~ 92%", "280ms ~ 340ms", "90% ~ 95%", "뛰어난 이중 과제 분할 처리 및 신속 대처"],
      ["다이아몬드 (Diamond)", "75% ~ 84%", "341ms ~ 410ms", "82% ~ 89%", "평균 이상의 시야각 인지 및 양호한 추적"],
      ["골드 (Gold)", "60% ~ 74%", "411ms ~ 500ms", "70% ~ 81%", "간헐적 터널 비전 발생 및 반응 지연"],
      ["비기너 (Beginner)", "60% 미만", "500ms 초과", "70% 미만", "중심 표적 고착 및 외곽 자극 누락"]
    ],
    note: "※ 본 벤치마크는 1080p 해상도, 시청 거리 60cm 표준 환경에서 수집된 실측 데이터 기준입니다. 눈동자가 주변 핑으로 튀지 않고 중심 표적을 유지한 상태에서 측정된 값입니다."
  },
  techniques: {
    title: "시야각 확대 및 잠재적 주의력 강화를 위한 4단계 핵심 기법",
    items: [
      {
        name: "중심와 앵커링 기법 (Foveal Anchoring)",
        desc: "중심 표적에 시선의 물리적 초점을 완벽히 고정하고, 주변 핑이 번쩍이더라도 눈동자를 핑 방향으로 튀기지 않는 자기 통제 훈련입니다. 눈동자가 움직이는 순간 중심 표적 추적 점수가 깎이고 사카드 억제로 인해 시야가 단절됩니다.",
        tips: "초점은 메인 타깃의 중심핵에 못 박아두고, 화면 외곽은 '느끼는' 감각으로 넓게 바라보는 소프트 포커스를 유지하세요."
      },
      {
        name: "잠재적 주의력 방사 전개 (Covert Attention Radiation)",
        desc: "포스너의 주의력 스포트라이트를 단일 지점이 아닌 도넛 형태의 방사형으로 확장시키는 훈련입니다. 의식의 안테나를 모니터의 상하좌우 모서리 전체로 펼쳐두면, 핑이 발생한 즉시 망막의 간상세포가 트리거됩니다.",
        tips: "주변 핑의 정확한 형태나 색상을 확인하려 하지 말고, 단지 '밝기 변화'가 감지되는 즉시 스페이스바를 누르세요."
      },
      {
        name: "배측 시각 경로 병렬 활성화 (Dorsal Stream Activation)",
        desc: "시각 정보는 '무엇인가(Ventral)'를 판별하는 경로와 '어디서 움직이는가(Dorsal)'를 처리하는 경로로 나뉩니다. 주변시는 배측 경로에 의해 지배되므로, 세부 해상도 분석을 포기하고 공간 위치 변화에만 본능적으로 반응하도록 신경 회로를 최적화해야 합니다.",
        tips: "핑의 세부 디테일을 보려 하지 말고, 화면 구석의 픽셀 점멸 느낌에 반사적으로 반응하는 리듬을 만드세요."
      },
      {
        name: "호흡 조절을 통한 교감신경 이완 (Parasympathetic Breath Control)",
        desc: "과도한 긴장과 교감신경 흥분은 동공을 수축시키고 시각 피질의 억제성 뉴런을 활성화하여 필연적으로 터널 비전을 유발합니다. 일정한 복식 호흡을 유지하여 자율신경계 균형을 잡으면 자연스럽게 인지 시야가 넓어집니다.",
        tips: "드릴 시작 전 코로 4초간 들이마시고 6초간 내쉬며 어깨와 미간의 긴장을 완전히 푼 상태로 시작하세요."
      }
    ]
  },
  steps: [
    "장비와 자세 세팅: 모니터 정중앙과 시선 높이를 수평으로 맞추고, 화면과의 거리를 약 55~65cm로 유지합니다.",
    "중심 표적 추적 개시: [드릴 시작] 버튼을 누른 후, 화면 중앙에서 움직이는 녹색 메인 구체를 시선으로 부드럽게 추적합니다.",
    "주변 핑 감지 및 입력: 중심 표적을 주시한 상태를 유지하면서, 주변 시야에 보라색/백색 핑이 순간 점멸하면 지체 없이 스페이스바를 누릅니다.",
    "시선 이탈 방지: 눈동자가 핑 쪽으로 튀어 중심 표적을 놓치지 않도록 철저히 주의합니다.",
    "결과 분석 및 취약 구역 파악: 종료 후 제공되는 방위별(상, 하, 좌, 우 외곽) 감지율을 분석하여 주의력이 결핍된 사각지대를 집중 보완합니다."
  ],
  audience: "배틀로얄 및 전술 FPS에서 미니맵과 측면 기습을 놓치지 않으려는 게이머, 넓은 시야와 동료 선수의 오픈 찬스를 읽어내야 하는 구기 종목 선수, 교차로 돌발 위험을 조기에 감지하려는 운전자.",
  faqs: faqSchema.mainEntity.map(q => ({
    q: q.name,
    a: q.acceptedAnswer.text
  })),
  sources: pickSources('posner1980', 'eriksen1986', 'wolfe1994', 'findlay1999', 'leigh2015', 'woods2015'),
  related: [
    { href: "/ko/drills/visual-tracking/constant-slow-pursuit", label: "저속 안구 운동 훈련 (Constant Slow)" },
    { href: "/ko/drills/visual-tracking/directional-chaos-pursuit", label: "카오스 방향 전환 추적 (Directional Chaos)" },
    { href: "/ko/drills/visual-tracking/dynamic-evasion-pursuit", label: "회피 표적 추적 훈련 (Dynamic Evasion)" },
    { href: "/ko/drills/visual-tracking/ghosting-suppress-pursuit", label: "잔상 억제 시선 고정 훈련 (Ghosting Suppress)" },
    { href: "/ko/drills/visual-tracking/infinity-pursuit", label: "8자 안구 운동 훈련 (Infinity)" },
    { href: "/ko/drills/visual-tracking/momentum-teleport-pursuit", label: "순간이동 에임 연습 (Momentum Teleport)" }
  ]
};

export default function KoPeripheralPingPursuitPage() {
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

      <PeripheralPingPursuitClient
        copy={{
          title: "주변시 핑 추적 훈련: 중심시・주변시 통합 및 잠재적 공간 주의력 테스트",
          subtitle: "중심 표적 추적을 유지한 채 시야 외곽 핑을 감지하는 기능적 시야(UFOV) 확대 트레이너",
          description: "중심 표적을 시선으로 매끄럽게 추적하면서 주변 시야에서 순간적으로 번쩍이는 핑을 눈동자 이동 없이 감지하는 이중 과제 시각 훈련. 포스너(Posner) 패러다임에 기반하여 잠재적 공간 주의력(Covert Spatial Attention)과 기능적 시야(UFOV)를 극대화하고 터널 비전을 개선합니다. 무료 무설치 웹 테스트."
        }}
      />

      <DrillGuide guide={guideProps} />

      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/ko/drills/visual-tracking/peripheral-ping-pursuit" />
      </div>
    </>
  );
}
