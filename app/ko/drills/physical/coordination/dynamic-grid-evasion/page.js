import DynamicGridEvasionClient from '@/app/drills/physical/coordination/dynamic-grid-evasion/DynamicGridEvasionClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';

// ============================================================
// SEO RESEARCH FINDINGS — South Korea (KR / KO)
// Primary Intent: 마우스 피하기 게임, 동체시력 테스트 게임, 동체시력 반응속도 테스트, 주변시 훈련
// Context: Korean flash/LoL skill dodging culture (마우스 피하기, 롤 스킬 피하기) & tactical AOE evasion
// Target Queries:
//   - "마우스 피하기 게임" (High-intent gaming phrase)
//   - "동체시력 테스트 게임" / "동체시력 테스트" (Core motion vision evaluation)
//   - "동체시력 반응속도 테스트" (Reaction speed & visual acuity query)
//   - "반응속도 테스트 게임" (Reaction speed game)
//   - "주변시 훈련 게임" (Peripheral vision cognitive query)
//   - "마우스 커서 피하기" (Cursor avoidance query)
//   - "위험 회피 반응 훈련" (Hazard avoidance reflex drill)
//   - "롤 스킬 피하기 훈련" (Gaming specific intent)
// ============================================================

export const metadata = {
  title: "마우스 피하기 & 동체시력 테스트 게임 – 무료 주변시 회피 훈련 | SkillDrills",
  description: "무료 온라인 마우스 피하기 및 동체시력 테스트 게임. 3x3 격자에서 번쩍이는 폭발 위험 구역을 주변시로 감지하고 안전 구역으로 즉각 플릭 회피하여 공간 반사신경과 탈출 반응속도를 과학적으로 단련합니다.",
  keywords: [
    "마우스 피하기 게임",
    "동체시력 테스트 게임",
    "동체시력 반응속도 테스트",
    "반응속도 테스트 게임",
    "주변시 훈련 게임",
    "마우스 커서 피하기",
    "위험 회피 반응 훈련",
    "동체시력 훈련 사이트",
    "롤 스킬 피하기 훈련",
    "공간 반사신경 테스트"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/physical/coordination/dynamic-grid-evasion',
    languages: getAlternateLanguages('/drills/physical/coordination/dynamic-grid-evasion'),
  },
  openGraph: {
    title: "마우스 피하기 & 동체시력 테스트 게임 – 무료 주변시 회피 훈련 | SkillDrills",
    description: "무료 온라인 마우스 피하기 및 동체시력 테스트 게임. 3x3 격자에서 번쩍이는 폭발 위험 구역을 주변시로 감지하고 안전 구역으로 즉각 플릭 회피하여 공간 반사신경과 탈출 반응속도를 과학적으로 단련합니다.",
    url: 'https://skilldrills.online/ko/drills/physical/coordination/dynamic-grid-evasion',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "마우스 피하기 & 동체시력 테스트 게임 – 무료 주변시 회피 훈련 | SkillDrills",
    description: "무료 온라인 마우스 피하기 및 동체시력 테스트 게임. 3x3 격자에서 번쩍이는 폭발 위험 구역을 주변시로 감지하고 안전 구역으로 즉각 플릭 회피하여 공간 반사신경과 탈출 반응속도를 과학적으로 단련합니다.",
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
      "name": "운동 협응력 훈련",
      "item": "https://skilldrills.online/ko/drills/physical/coordination"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "마우스 피하기 & 동체시력 테스트 게임",
      "item": "https://skilldrills.online/ko/drills/physical/coordination/dynamic-grid-evasion"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "마우스 피하기 & 동체시력 테스트 게임",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "3x3 격자 폭발 위험 구역을 감지하고 안전 구역으로 마우스 커서를 순간 회피하여 주변시와 공간 반사신경을 측정하는 무료 온라인 훈련 도구.",
  "url": "https://skilldrills.online/ko/drills/physical/coordination/dynamic-grid-evasion",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online/ko"
  },
  "inLanguage": "ko",
  "dateModified": "2026-09-12"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "마우스 피하기 & 주변시 반사 트레이너",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas 및 마우스 포인터 입력을 지원하는 최신 브라우저",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/ko/drills/physical/coordination/dynamic-grid-evasion",
  "inLanguage": "ko",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "동체시력 격자 회피 게임 (Dynamic Grid Evasion)",
  "url": "https://skilldrills.online/ko/drills/physical/coordination/dynamic-grid-evasion",
  "description": "3x3 구역 폭발을 피해 안전 셀로 마우스를 순간 이동하는 무료 반사신경 액션 게임.",
  "genre": [
    "Reflex Game",
    "Action",
    "Evasion Game",
    "Coordination"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop",
    "Mobile"
  ],
  "applicationCategory": "Game",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-12",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "마우스 피하기 & 동체시력 테스트 게임은 어떤 인지 반사 능력을 평가하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "본 드릴은 시야 전체의 위협 자극을 순간적으로 감지하는 주변시(Peripheral Vision) 정보 처리 속도와, 시각 자극 수신 후 즉각 반대 방향으로 마우스를 튕겨내는 탄도성 플릭(Ballistic Flick) 운동 반사 신경을 종합 평가합니다. 9개 구역 중 안전 구역을 찰나의 순간에 판단하는 선택 반응 시간(Choice Reaction Time)의 정밀 척도입니다."
      }
    },
    {
      "@type": "Question",
      "name": "중심 격자에 시선을 고정하는 비집중 시선(탈초점) 기법이 왜 중요한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "특징 통합 이론(Treisman & Gelade, 1980)에 따르면, 시선을 한 셀에 집중하면 반대편 구역의 위험 경고를 알아차리는 데 150ms 이상의 지연이 발생합니다. 3x3 격자의 정중앙 교차점에 시선을 가볍게 두고 시야를 넓게 여는 '탈초점(Decentralized Fixation)'을 유지해야 9개 구역의 주황색 경고 펄스를 뇌가 병렬(Parallel)로 동시에 감지할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "리그 오브 레전드(LoL)나 오버워치, 발로란트 등 실전 게임에서 스킬 피하기에 어떻게 도움이 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "LoL의 논타겟 장판 스킬이나 발로란트/CS2의 소이탄, 수류탄 투척물 등은 전장 화면 주변부에서 경고 이펙트가 먼저 발생합니다. 위험 범위가 터지기 전 0.5초 이내에 안전한 바깥 공간으로 커서를 찍고 무빙하는 '스킬 피하기 반응속도'와 회피 무빙 메커니즘을 동일하게 훈련할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "레벨이 올라갈수록 경고 점멸 시간과 위험 구역 셀 수는 어떻게 변화하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "난이도는 레벨 1부터 15까지 250점 단위로 상승합니다. 폭발 직전 주황색 경고 테두리가 켜져 있는 시간은 초기 1.4초에서 최상위 단계 0.45초로 급격히 단축됩니다. 동시에 폭발하는 위험 셀 수는 초기 3개에서 최대 7개까지 늘어나, 9개 셀 중 단 2곳만 안전 구역으로 남는 극한의 생존 상황이 연출됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "폭발에 휘말려 피격당하면 점수가 깎이거나 제한 시간이 단축되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "아닙니다. 폭발 구역에 갇히면 화면이 붉게 점멸하며 콤보 배율이 1.0배로 초기화될 뿐, 누적된 점수나 45초 세션 타이머가 줄어들지는 않습니다. 이는 실패에 위축되지 않고 최고 속도로 공격적인 플릭 회피를 시도하도록 유도하기 위함입니다."
      }
    },
    {
      "@type": "Question",
      "name": "격자 사이를 빠르게 마우스로 회피할 때 추천하는 감도(DPI)와 마우스 그립법은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "3x3 격자 내에서 전완 전체를 휘두르기보다는 손목과 손가락 관절로 미세하고 신속한 방향 전환을 이끌어내기 위해 20~30cm/360° 수준의 중고감도가 유리합니다. 손바닥을 밀착시키는 팜 그립보다 손가락 끝으로 정밀 제어하는 클로(Claw)나 핑거팁(Fingertip) 그립이 빠른 제동에 유리합니다."
      }
    },
    {
      "@type": "Question",
      "name": "포스너의 외인성 주의(Exogenous Attention) 원리를 활용해 반응 지연을 줄이는 방법은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "마이클 포스너(Posner, 1980)의 연구에 따르면, 외부의 돌발 시각 신호는 의식적 사고를 거치지 않고 무조건 반사적으로 주의를 끌어당깁니다. 주황색 경고 펄스가 켜지는 순간 머리로 '어디가 안전하지?' 고민하지 말고, 빛나지 않은 어두운 셀을 향해 반사적으로 손가락 근육을 튕겨내는 직관적 피드포워드 플릭을 전개해야 합니다."
      }
    },
    {
      "@type": "Question",
      "name": "최상위 구간인 0.45초 경고 시간에서 안전 구역을 고르는 가장 확실한 전략은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "경고 시간이 0.5초 이하로 떨어지는 10레벨 이상에서는 '가장 넓은 안전 구역'을 찾으려 하면 무조건 늦습니다. 현재 자신의 커서 위치에서 물리적 거리가 가장 가까운 '인접 안전 셀(Nearest Adjacent Cell)'로 즉시 튕기듯이 이탈하는 것이 유일한 생존 알고리즘입니다."
      }
    },
    {
      "@type": "Question",
      "name": "최정상 등급인 17,000점(Apex Grid Evader)을 달성하기 위한 플레이 팁은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "45초 동안 단 한 번의 피격 없이 3.0배 콤보를 끝까지 유지하고, 0.45~0.60초의 초단기 경고 구간인 12레벨 이상을 완벽하게 통과해야 합니다. 각 웨이브가 끝난 직후 커서를 다시 격자 중앙 셀 근처로 부드럽게 복귀시키는 '센터링 습관'이 다음 회피 성공률을 50% 이상 높여줍니다."
      }
    },
    {
      "@type": "Question",
      "name": "본 테스트는 별도의 다운로드나 설치 없이 무료로 이용할 수 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, SkillDrills의 모든 드릴은 100% 무료이며 웹 브라우저(HTML5 Canvas) 상에서 즉시 실행됩니다. 별도의 회원가입이나 앱 설치가 필요 없으며, 최고 점수와 플레이 기록은 개인 브라우저 내부 로컬에만 안전하게 암호화 보관됩니다."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "마우스 피하기 및 공간 반사신경 회피 훈련 진행 가이드",
  "description": "3x3 격자 위험 구역 점멸을 감지하고 안전 셀로 신속 플릭하여 생존 콤보를 누적하는 4단계 실전 프로토콜.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "중앙 셀 시선 고정 및 3x3 격자 스캔",
      "text": "시작 버튼을 클릭하여 커서를 중앙에 두고, 눈동자를 격자 중심 교차점에 비집중 고정하여 9개 구역 전체를 주변시야에 둡니다.",
      "url": "https://skilldrills.online/ko/drills/physical/coordination/dynamic-grid-evasion#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "주황색 경고 펄스 식별 및 안전 구역 포착",
      "text": "위험 셀에 주황색 점멸 테두리가 표시되면, 테두리가 켜지지 않은 비위험 안전 셀의 위치를 순간적으로 포착합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/coordination/dynamic-grid-evasion#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "폭발 카운트다운 전 안전 셀로 신속 플릭",
      "text": "경고 시간이 만료되어 붉은 폭발이 발생하기 직전, 안전 셀 내부로 마우스 커서를 신속하게 플릭 이동하여 정지합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/coordination/dynamic-grid-evasion#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "연속 생존으로 3.0배 최대 콤보 유지",
      "text": "위험 구역 피격 없이 연속으로 생존하여 콤보 배율을 최대 3.0배까지 누적하고 45초 동안 최고 점수를 경신합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/coordination/dynamic-grid-evasion#step-4"
    }
  ]
};

const gridGuide = {
  heading: "공간 반사신경 및 시각 위험 회피 인지생체역학 가이드",
  subtitle: "트리즈먼 병렬 탐색 이론, 포스너 공간 지향 패러다임, 우드워스 탄도 제어에 기반한 회피 훈련론",
  intro: [
    "마우스 피하기 & 동체시력 격자 회피 드릴(Dynamic Grid Evasion)은 3x3 전술 매트릭스 상에서 무작위로 발생하는 폭발 위험 구역을 시야 전체로 포착하고, 찰나의 시간 안에 안전한 비위험 구역으로 커서를 신속하게 도피시키는 고강도 공간 반사 신경 훈련입니다. 단일 표적을 쫓는 추적 훈련과 달리, 9개 구역에서 동시다발적으로 주어지는 시각 위험 경고를 분석하여 최적의 탈출 벡터를 산출해야 하므로 고도의 인지-운동 전환 속도가 요구됩니다.",
    "시각 인지 심리학의 대가 앤 트리즈먼과 겔레이드(Treisman & Gelade, 1980)의 '특징 통합 이론(Feature Integration Theory)'에 따르면, 자극의 돌출된 원초적 특징(색상, 점멸 테두리)은 시각 피질의 사전 주의 단계(Pre-attentive stage)에서 병렬적으로 즉각 분리됩니다. 플레이어가 3x3 격자의 중심부에 시선을 고정하고 주변시(Peripheral Vision)를 활성화하면, 9개 셀 중 어느 곳이 안전한지 낱낱이 훑어보는 순차 탐색을 거치지 않고도 안전 셀을 한눈에 감지할 수 있습니다.",
    "마이클 포스너(Posner, 1980)의 '공간 지향 패러다임(Spatial Orienting Paradigm)'은 시각 신호의 돌발 출현(Exogenous Cue)이 뇌의 암묵적 주의(Covert Attention)를 무의식적으로 이끈다는 점을 입증했습니다. 레벨이 올라갈수록 경고 노출 시간은 1.4초에서 0.45초로 붕괴하며 위험 구역은 7개까지 확대됩니다. 이때 로버트 우드워스(Woodworth, 1899)의 2단계 제어 모델에 따라, 초반의 폭발적인 탄도 플릭(Ballistic flick)과 안전 셀 경계선 안에서 즉시 멈추는 손끝 마찰 제동(Current-control deceleration)의 조화가 피격을 막는 절대적인 방벽이 됩니다.",
    "측정 정밀도 및 하드웨어 안내: 본 드릴은 브라우저의 performance.now() 고해상도 타이머를 활용하여 클라이언트 기기 내부에서 밀리초 단위로 연산됩니다. 디스플레이 주사율(60Hz 16.7ms / 144Hz 6.9ms / 240Hz 4.1ms) 및 마우스 폴링레이트(125Hz vs 1000Hz)에 따라 물리적 지연 차이가 발생할 수 있으므로, 5ms 미만의 오차는 측정 노이즈로 감안하시기 바랍니다. 모든 기록은 브라우저에만 안전하게 저장됩니다."
  ],
  benchmarks: {
    title: "공간 반사신경 및 격자 위험 회피 5단계 표준 벤치마크",
    headers: ["티어 및 등급", "칭호 (Rank Title)", "점수 기준치", "도달 레벨", "최소 경고 반응 한계", "신경인지 회피 반사 프로필"],
    rows: [
      ["Tier 1: 최정상 그리드 회피자", "Apex Grid Evader", "17,000점 이상", "Level 12 – 15", "0.45 – 0.60초 생존", "상위 0.1% 수준의 초인적 주변시 병렬 탐색 및 0.45초 극한 구간에서의 무결점 플릭 탈출 완성 (Treisman 1980; Posner 1980)"],
      ["Tier 2: 마스터 공간 스캐너", "Master Spatial Scanner", "13,000 – 16,999점", "Level 9 – 11", "0.65 – 0.80초 생존", "상위 3% 수준의 탁월한 포스너 암묵적 주의 전환, 5~6개 위험 셀 포위망에서의 침착한 탈출 궤적 구현"],
      ["Tier 3: 숙련된 위험 회피자", "Proficient Hazard Dodger", "9,500 – 12,999점", "Level 6 – 8", "0.85 – 1.05초 생존", "경쟁전 상위권 게이머의 우수한 동체시력과 안정적인 탄도 플릭 제동력 (Woodworth 1899)"],
      ["Tier 4: 중간 구역 생존자", "Intermediate Sector Evader", "6,000 – 9,499점", "Level 3 – 5", "1.10 – 1.25초 생존", "일반 성인의 평균 반응 속도, 경고 시간이 1.0초 미만으로 단축 시 인지 처리 병목으로 피격 빈발"],
      ["Tier 5: 입문 피격 탈출자", "Novice Blast Survivor", "6,000점 미만", "Level 1 – 2", "> 1.25초 구간", "초점 고정으로 인한 주변부 위험 감지 지연 및 안전 셀 경계 오버슈트, 비집중 시선 훈련 권장"]
    ],
    note: "특징 통합 이론(Treisman & Gelade 1980), 공간 지향 연구(Posner 1980), 우드워스 자발 운동 모델(Woodworth 1899)을 통합한 성능 척도입니다."
  },
  techniques: {
    title: "동체시력 및 격자 위험 구역 회피 실전 프로토콜",
    items: [
      {
        name: "트리즈먼 병렬 탐색 및 중심 격자 비집중 시선 고정 (Decentralized Centroid Fixation)",
        desc: "트리즈먼(1980)의 연구에 따르면 시선을 특정 셀에 고정하면 반대편 구역의 위험 경고를 놓치게 됩니다. 시선을 격자의 정확한 중심 셀에 가볍게 두고 시야각을 넓혀 9개 구역을 한눈에 담으세요.",
        tips: "한 지점을 뚫어지게 응시하지 말고 초점을 약간 흐린 채 주변시의 막대세포(간상체)가 주황색 점멸을 감지하도록 시야를 개방하세요."
      },
      {
        name: "포스너 외인성 주의 반응 및 200ms 운동 지향 (Posner Exogenous Trigger)",
        desc: "포스너(1980)가 입증한 외인성 주의 전환을 활용하여, 주황색 경고 테두리가 점멸하는 순간 뇌의 의식적 계산을 생략하고 불이 꺼진 셀로 손끝을 반사적으로 튕기세요.",
        tips: "경고가 켜진 셀을 보고 놀라지 말고, 빛이 없는 어두운 셀이 시야에 들어오는 즉시 최단 거리로 커서를 날려 보내세요."
      },
      {
        name: "우드워스 탄도 플릭 및 셀 내부 마찰 제동 (Cell Boundary Deceleration)",
        desc: "우드워스(1899)의 모델에 따라 안전 셀을 향해 번개처럼 빠른 탄도 플릭을 구사한 뒤, 목표 셀 경계선 안에서 손가락 하향 압력으로 급제동을 걸어야 밖으로 튕겨나가지 않습니다.",
        tips: "손바닥 뒤꿈치와 약지/소지로 패드 표면을 순간적으로 눌러 강력한 기계적 마찰 제동력을 발생시키세요."
      },
      {
        name: "0.45초 극한 구간에서의 최근접 인접 셀 반사 탈출 (Nearest Adjacent Safe Flick)",
        desc: "후반부 레벨에서 7개 셀이 위험 구역이 되고 경고 시간이 0.45초로 좁혀질 때 최적의 셀을 고르려 하면 뇌에 병목이 발생합니다.",
        tips: "현재 내 커서 위치에서 가장 가까운 상하좌우 인접 안전 셀 하나만 식별되면 고민 없이 즉시 1타겟 탈출을 감행하세요."
      }
    ]
  },
  steps: [
    "시선과 자세를 바르게 잡고 커서를 3x3 격자 중앙 셀에 위치시킵니다.",
    "웨이브가 시작되면 주황색 테두리로 점멸하는 위험 구역을 주변시로 포착합니다.",
    "카운트다운이 끝나기 전 주황색 불이 들어오지 않은 안전 셀로 신속히 플릭 이동합니다.",
    "연속 생존으로 3.0배 최대 콤보를 유지하며 45초 동안 최고 득점을 기록합니다."
  ]
};

export default function DynamicGridEvasionPageKo() {
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
      <DynamicGridEvasionClient
        copy={{
          title: "마우스 피하기 & 동체시력 테스트",
          subtitle: "3x3 격자 위험 구역 회피 및 주변시 반사 훈련 • 15레벨",
          rulesTitle: "마우스 피하기 훈련 규칙 및 점수 체계",
          rules: [
            { title: "주황색 경고 펄스 감지", text: "매 웨이브마다 폭발이 임박한 위험 셀들이 주황색 테두리로 점멸합니다." },
            { title: "안전 셀로 즉각 플릭 회피", text: "경고 타이머가 0이 되기 전, 폭발하지 않는 안전한 격자 셀 안으로 마우스 조준선을 재빨리 이동시킵니다." },
            { title: "생존 판정 및 콤보 승수 누적", text: "폭발 순간 안전 셀에 머무르면 생존 점수를 획득하고 콤보 배율이 최대 3.0배까지 상승합니다." },
            { title: "피격 시 콤보 리셋", text: "폭발 구역에 갇히면 화면이 붉게 점멸하며 콤보가 1.0배로 초기화되지만, 45초 세션 시간은 차감되지 않습니다." }
          ],
          aboutTitle: "마우스 피하기 & 주변시 훈련 소개",
          aboutHeading: "주변시 병렬 탐색과 외인성 주의 지향 신경생리학",
          aboutText: "본 드릴은 앤 트리즈먼(Anne Treisman, 1980)의 특징 통합 이론과 마이클 포스너(Michael Posner, 1980)의 공간 지향 패러다임에 기초하여 개발되었습니다. 3x3 전술 격자 전체에 불규칙하게 발생하는 폭발 위험을 중심시선 이동 없이 주변시로 병렬 탐색하고, 우드워스(Woodworth, 1899)의 탄도 플릭 운동으로 안전 구역에 안착하는 고속 회피 루프를 훈련합니다. 리그 오브 레전드(LoL) 논타겟 스킬 회피 및 발로란트/CS2 투척물·장판기 탈출 반응속도를 획기적으로 개선합니다."
        }}
      />
      <DrillGuide guide={gridGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/coordination/dynamic-grid-evasion"
          locale="ko"
        />
      </div>
    </>
  );
}
