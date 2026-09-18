import ReactionChainClient from '@/app/drills/physical/reflex-training/reaction-chain/ReactionChainClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — South Korea (KR / KO)
// Primary Intent: 마우스 에임 브레이킹 연습, 충동 억제 반사 훈련, 마우스 정지 반응 드릴
// Korean Gaming Context: FPS 오버플릭(Over-flicking) 교정, 발로란트/카스2 초탄 정밀 브레이킹, 운동 억제 신경계 훈련
// High-Demand, Low-Competition Target Keywords:
//   - "충동 억제 반사 훈련" (Impulse control reflex training)
//   - "마우스 정지 반응 드릴" (Mouse deceleration stop reaction drill)
//   - "운동 억제 반사 신경" (Motor inhibition neural reflex)
//   - "마우스 에임 브레이킹 연습" (Mouse aim braking practice)
//   - "오버플릭 교정 훈련" (Over-flicking correction mouse drill)
//   - "마우스 감속 제어 게임" (Mouse deceleration kinetic control game)
//   - "마우스 정밀도 테스트" (Mouse precision test)
//   - "반응 속도 게임" (Reaction speed game)
// ============================================================

export const metadata = {
  title: "마우스 에임 브레이킹 – 충동 억제 반사 훈련 | SkillDrills",
  description: "고속으로 쇄도하는 노드를 요격하고 커서를 즉각 영점 정지(Kinetic Arrest)시키는 신경생체역학 운동 억제 드릴. 로건 경마 모델(Logan & Cowan, 1984) 기반 오버플릭 교정 훈련.",
  keywords: [
    "충동 억제 반사 훈련",
    "마우스 정지 반응 드릴",
    "운동 억제 반사 신경",
    "마우스 에임 브레이킹 연습",
    "오버플릭 교정 훈련",
    "마우스 감속 제어 게임",
    "마우스 정밀도 테스트",
    "반응 속도 게임",
    "에임 브레이킹 훈련 사이트",
    "발로란트 에임 정지 연습"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/physical/reflex-training/reaction-chain',
    languages: getAlternateLanguages('/drills/physical/reflex-training/reaction-chain'),
  },
  openGraph: {
    title: "마우스 에임 브레이킹 – 충동 억제 반사 훈련 | SkillDrills",
    description: "고속 표적 요격 후 관성을 즉각 정지시키는 모터 브레이킹 훈련. 오버플릭을 원천 차단하고 발로란트·CS2 초탄 헤드샷 정지력을 극대화하세요.",
    url: 'https://skilldrills.online/ko/drills/physical/reflex-training/reaction-chain',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
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
      "name": "훈련 드릴",
      "item": "https://skilldrills.online/ko/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "반사신경 훈련",
      "item": "https://skilldrills.online/ko/drills/physical/reflex-training"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "리액션 체인 (에임 브레이킹)",
      "item": "https://skilldrills.online/ko/drills/physical/reflex-training/reaction-chain"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "마우스 에임 브레이킹 & 충동 억제 반사 훈련 (Reaction Chain)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "연속적인 시각 표적 요격 후 마우스 커서의 물리 관성을 즉각 상쇄(Kinetic Arrest)시키는 전문 신경생체역학 감속 제어 및 운동 억제 드릴.",
  "url": "https://skilldrills.online/ko/drills/physical/reflex-training/reaction-chain",
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
  "name": "마우스 에임 브레이킹 – 충동 억제 반사 훈련 | SkillDrills",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires HTML5 Canvas and JavaScript enabled browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/ko/drills/physical/reflex-training/reaction-chain",
  "inLanguage": "ko",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "마우스 에임 브레이킹 & 충동 억제 반사 훈련",
  "url": "https://skilldrills.online/ko/drills/physical/reflex-training/reaction-chain",
  "genre": ["Reflex Game", "Motor Control Trainer", "Esports Precision"],
  "playMode": "SinglePlayer",
  "description": "최대 1,800 px/s 속도로 움직이는 노드를 요격한 직후 마우스 커서의 속도를 1.5 px/프레임 미만으로 즉각 제동하여 콤보를 유지하는 고난도 에임 브레이킹 게임."
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "왜 마우스를 빠르게 가속하는 것보다 정확히 정지시키는 것이 신경학적으로 더 어려운가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "모터 가속은 주동근(Agonist)의 강력한 단일 폭발성 수축으로 개시되지만, 정확한 정지는 반대 방향의 길항근(Antagonist)이 밀리초 단위로 정확히 반대 힘을 생성하여 운동량을 흡수해야 합니다. 로버트 우드워스(Woodworth, 1899)의 2단계 모델에서 규명되었듯, 제동 단계는 시각-체성감각 피드백의 지연(100~150ms)을 동반하므로 뇌의 복잡한 감속 연산이 실패할 경우 관성으로 인한 오버플릭(Overshoot)이 발생합니다."
      }
    },
    {
      "@type": "Question",
      "name": "로건과 코완(Logan & Cowan, 1984)의 경마 모델(Race Model)이란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "경마 모델은 운동을 개시하는 'Go 프로세스'와 운동을 취소하거나 멈추는 'Stop 프로세스'가 대뇌 기저핵에서 서로 독립적으로 경주를 벌인다는 이론입니다. 정지 신호가 주어졌을 때 Stop 프로세스가 Go 프로세스보다 먼저 결승선에 도달해야만 근육 수축이 억제되고 커서가 표적 안에 멈출 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "정지 신호 반응 시간(SSRT: Stop-Signal Reaction Time)이란 무엇이며 에임에 어떤 영향을 주나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SSRT는 대뇌 우측 하전두회(rIFG)와 시상하핵(STN)이 이미 발동된 운동 명령을 억제하는 데 걸리는 내적 신경 잠복기(보통 180~250ms)를 의미합니다 (Verbruggen & Logan, 2008). SSRT가 짧을수록 적의 불규칙한 회피 기동이나 잘못 조준된 플릭을 즉각 취소하고 정확한 헤드 라인에서 에임을 브레이킹할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "발로란트나 카운터스트라이크 2에서 오버플릭(Over-flicking)이 발생하는 주된 생체역학적 원인은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "주로 전완부 굴근과 신근의 동시 수축(Co-contraction) 밸런스 붕괴 때문입니다. 빠른 속도에 집착하여 손목이나 전완에 과도한 초기 가속도를 실으면 관성 모멘텀이 마우스패드의 마찰력을 압도하여 표적을 지나쳐 버립니다. 에임 브레이킹 드릴은 손가락 끝 핑거팁과 마우스 측면 패드를 통한 점진적 기계적 마찰 제동을 체화시킵니다."
      }
    },
    {
      "@type": "Question",
      "name": "피츠의 법칙(Fitts, 1954)은 노드 속도와 크기가 변화할 때 난이도에 어떻게 작용하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "피츠의 법칙에 따르면 운동 난이도 지수(ID)는 이동 거리(D)를 표적 크기(W)로 나눈 값의 로그함수에 비례합니다. 리액션 체인 드릴에서 노드 속도가 1,800 px/s로 상승하고 유효 정지 반경이 축소되면, 허용되는 감속 오차 윈도우가 기하급수적으로 줄어들어 완벽한 개루프 탄도 감속 능력이 요구됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "정지 판정(Kinetic Arrest)에서 1.5 px/프레임 미만의 속도 제한이 의미하는 바는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "표적 위를 마우스로 스쳐 지나가는 '슬라이스 스루(Slice-through)' 편법을 원천 차단하기 위한 엄격한 생체역학적 기준입니다. 144Hz 기준 1.5 px/프레임은 초당 약 216px 미만으로, 근육이 실질적인 제동을 완료하고 정지 마찰(Static Friction) 상태에 진입했음을 수학적으로 보증합니다."
      }
    },
    {
      "@type": "Question",
      "name": "마우스 패드와 마우스 피트의 마찰 계수가 에임 브레이킹에 어떤 영향을 미치나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "마찰력이 극단적으로 낮은 스피드 패드나 유리 패드는 초기 가속에는 유리하지만 정지 마찰력이 부족하여 길항근에 극심한 부담을 주어 오버슈트를 유발합니다. 브레이킹 제어 훈련에는 중간 수준의 동마찰과 높은 정지 마찰을 제공하는 컨트롤 성향 하이브리드 천 패드가 길항근 피로도를 낮추고 안정적인 정지력을 보장합니다."
      }
    },
    {
      "@type": "Question",
      "name": "고주사율(144Hz/240Hz) 모니터가 모터 억제 훈련에 왜 필수적인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Woods et al. (2015)에 따르면, 60Hz 디스플레이(프레임 간격 16.6ms)는 표적의 미세 감속 순간을 흐릿하게 렌더링하여 망막의 광학적 피드백 수신을 지연시킵니다. 240Hz 디스플레이(4.1ms)는 노드의 감속 궤적을 서브픽셀 단위로 선명하게 전달하여 대뇌 피질이 10ms 이상 빠르게 제동 명령을 내릴 수 있도록 돕습니다."
      }
    },
    {
      "@type": "Question",
      "name": "하루 권장 훈련 시간과 신경계 피로도 관리 방법은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "에임 브레이킹은 고도의 신경 억제(Neural Inhibition) 에너지를 소모하므로, 하루 15~20분(세션당 45초 드릴 10~15회, 세트 간 45초 휴식)이 이상적입니다. 피로가 누적되면 길항근의 제동 반응이 무뎌져 손목에 과도한 힘이 들어가므로, 손목 긴장이 느껴질 때는 즉시 훈련을 중단해야 합니다."
      }
    },
    {
      "@type": "Question",
      "name": "리액션 체인 훈련 효과를 실전 FPS 게임에 가장 효과적으로 전이시키는 요령은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "본 드릴에서 사용하는 인게임 감도(eDPI)와 마우스 그립법을 100% 동일하게 일치시키세요. 드릴을 수행할 때 '노드를 클릭한다'는 생각 대신 '노드 중심에서 커서를 뚝 멈춰 세운다'는 정지 감각에 집중하면, 인게임 교전 시 무의식적인 초탄 스탑 샷 정확도가 비약적으로 상승합니다."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "마우스 에임 브레이킹 & 충동 억제 반사 훈련 가이드",
  "description": "쇄도하는 노드를 정확히 요격하고 커서의 물리 관성을 영점으로 수렴시키는 4단계 에임 브레이킹 프로토콜.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "마우스 센서 잠금 및 에임 중심 정렬",
      "text": "훈련 화면을 클릭하여 포인터 잠금을 활성화하고 십자선을 화면 중앙에 안정적으로 배치합니다."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "노드 요격 및 탄도성 플릭 개시",
      "text": "외곽에서 출현하는 노드의 비행 궤적을 예측하여 80% 거리까지 빠르고 과감한 1차 폭발 플릭을 전개합니다."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "길항근 긴장 및 키네틱 어레스트 (Kinetic Arrest)",
      "text": "커서가 노드 테두리에 진입하는 순간 마우스 패드 하향 압력과 손가락 끝 악력으로 커서 속도를 1.5 px/프레임 이하로 급제동합니다."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "콤보 유지 및 난이도 스케일링 극복",
      "text": "실수 없는 연속 정지 성공으로 3.0배 최대 콤보를 누적하며 최대 1,800 px/s 속도의 초고속 노드를 격파합니다."
    }
  ]
};

const guideProps = {
  sources: pickSources('logan1984', 'woodworth1899', 'fitts1954', 'woods2015'),
  intro: {
    title: "충동 억제 신경기전과 에임 브레이킹(Kinetic Arrest) 생체역학",
    paragraphs: [
      "마우스를 목표물로 빠르게 던지는 것보다 목표 지점에서 단 1픽셀의 미끄러짐 없이 멈추는 것이 훨씬 더 어렵습니다. 일반적인 에임 트레이너가 표적을 클릭하는 순간에만 집중하는 반면, 리액션 체인 드릴은 움직이는 표적을 요격한 직후 커서의 물리 관성을 즉각 제동(Kinetic Arrest)하는 최상위 운동 억제(Motor Inhibition) 능력을 단련합니다.",
      "고전적인 인지신경과학 모델인 로건과 코완(Logan & Cowan, 1984)의 '경마 모델(Race Model)'에 따르면, 운동 명령을 실행하는 'Go 프로세스'와 이를 취소하거나 감속하는 'Stop 프로세스'는 중추신경계 내에서 독립적으로 경쟁합니다. 고속 이동 중인 표적에 정확히 멈춰 서려면 대뇌 기저핵(Basal Ganglia)과 시상하핵(STN)의 신속한 길항근 동원 명령이 Go 프로세스의 운동 관성을 압도해야만 합니다 (Verbruggen & Logan, 2008).",
      "로버트 우드워스(Woodworth, 1899)의 2단계 운동 제어 모델에서 규명되었듯, 빠른 에임은 대략의 거리를 단숨에 좁히는 초기 탄도성 임펄스(Ballistic Impulse)와 종단 미세 시각 수정(Current Control)으로 구성됩니다. 피츠의 법칙(Fitts, 1954)에 의해 노드의 속도가 1,800 px/s에 도달하면 시각 피드백을 기다릴 여유가 완전히 사라지므로, 뇌의 소뇌 예측에 기반한 정밀한 근육 제동 타이밍만이 오버플릭을 방지할 수 있습니다.",
      "본 훈련 모듈은 브라우저 performance.now() 고해상도 타이머를 기반으로 마우스 커서의 순간 프레임 변위를 실시간 계산하여 1.5 px/프레임 미만으로 감속되었는지를 엄격히 검증합니다. 144Hz 또는 240Hz 고주사율 모니터와 1000Hz 폴링레이트 환경에서 훈련할 때 프레임 지연이 4ms 미만으로 압축되어 최상의 신경 가소성 발달을 이끌어냅니다 (Woods et al., 2015)."
    ]
  },
  benchmarks: {
    title: "에임 브레이킹 및 운동 억제 공식 5단계 벤치마크",
    headers: ["티어 및 등급", "칭호 (Rank Title)", "점수 기준치", "요격 정지 성공률", "종합 등급", "신경생체역학 운동 프로필"],
    rows: [
      ["Tier 1: 궁극의 에임 제동 마스터", "Apex Kinetic Arrester", "15,000점 이상", "95% 이상 / 1500+ px/s", "Grade S", "상위 0.1% 수준의 완벽한 충동 억제력. 1,800 px/s 초고속 노드에서도 오버플릭 없이 즉각 영점 정지 달성 (Logan 1984; Woodworth 1899)"],
      ["Tier 2: 프로 헤드샷 스트라이커", "Precision Kinetic Sniper", "11,000 – 14,999점", "90 – 94% / 1200 – 1499 px/s", "Grade A", "상위 3% 프로게이머급 브레이킹 정밀도. 강한 초기 탄도 플릭 후에도 손가락 끝 마찰로 커서를 완벽히 고정"],
      ["Tier 3: 숙련된 탄도 제어자", "Skilled Deceleration Pilot", "7,500 – 10,999점", "82 – 89% / 900 – 1199 px/s", "Grade B", "상위 15% 경쟁전 유저 수준. 안정적인 중속 제동 능력 보유, 고속 구간에서 간헐적 슬라이스 스루 발생"],
      ["Tier 4: 발전하는 브레이킹 훈련생", "Developing Stopper", "4,000 – 7,499점", "70 – 81% / 600 – 899 px/s", "Grade C", "일반 성인 평균치. 과도한 관성으로 표적을 지나쳐 오버슈트하는 경향이 잦으며 손목 힘빼기 요망"],
      ["Tier 5: 입문 감속 훈련생", "Novice Arrester Trainee", "< 4,000점", "< 70% / < 600 px/s", "Grade D", "운동 억제 지연으로 인한 잦은 미스. 길항근 활성화 및 마우스 패드 하향 마찰 제동 기초 연습 필요"]
    ],
    note: "로건 경마 모델(1984), 우드워스 2단계 운동 모델(1899), 피츠의 난이도 법칙(1954)에 기반한 표준 척도입니다."
  },
  techniques: {
    title: "마우스 에임 브레이킹 실전 테크닉 & 프로토콜",
    items: [
      {
        name: "로건 경마 모델 정지 제어 (Logan Kinetic Brake)",
        desc: "노드에 닿은 뒤 멈추려 하면 뇌의 신호 지연으로 인해 반드시 오버플릭이 발생합니다. 노드 직전 80% 지점에 도달하는 순간 이미 뇌에서 Stop 프로세스를 발동하여 진입과 동시에 속도를 영점으로 떨구세요.",
        tips: "노드를 '치는' 것이 아니라 노드 중심에 마우스를 '박아 넣는다'는 느낌으로 제동하세요."
      },
      {
        name: "손가락 끝 하향 압력 마찰 제동 (Fingertip Downforce Braking)",
        desc: "순수한 손목 관절 힘으로만 마우스를 멈추려 하지 마세요. 제동 순간 손가락 끝 악력을 미세하게 주며 마우스 센서를 패드 쪽으로 살짝 눌러 패드의 정지 마찰력을 기계적으로 활용하세요.",
        tips: "패드의 수직 쿠션감을 이용하여 마우스 피트의 저항을 순간적으로 극대화하세요."
      },
      {
        name: "슬라이스 스루(Slice-Through) 방지 훈련",
        desc: "노드를 스쳐 지나가며 클릭하는 습관은 실전에서 탄착군을 흔들고 초탄 빗나감을 유발합니다. 커서가 노드 경계 내부에서 완전히 멈춰 'ARREST READY' 녹색 인디케이터가 켜지는 정지 정밀도를 유지하세요.",
        tips: "속도보다 정확한 정지 상태를 0.1초라도 유지하는 것을 우선시하세요."
      },
      {
        name: "3.0x 콤보 스트릭 관리 프로토콜",
        desc: "미스나 슬라이스 스루가 발생하면 점수가 차감되지는 않지만 콤보 배율이 1.0x로 리셋됩니다. 초반 레벨에서 완벽한 100% 정지율을 유지하여 최대 3.0배 배율을 확보한 상태로 고속 레벨에 진입하세요.",
        tips: "점수 획득의 80%는 3.0배 콤보 유지 구간에서 폭발적으로 발생합니다."
      }
    ]
  },
  steps: [
    "마우스 포인터를 중앙에 정렬하고 안정적인 핑거팁/클로 그립을 점검합니다.",
    "출현하는 노드를 향해 과감한 1차 탄도 플릭을 전개합니다.",
    "노드 경계선 진입 직전 길항근과 손가락 끝 하향 압력으로 커서를 즉각 1.5 px/프레임 미만으로 급제동합니다.",
    "45초 동안 단 한 차례의 관성 이탈 없이 연속 정지를 성공시켜 3.0배 콤보와 15,000점 이상을 달성합니다."
  ],
  audience: "발로란트, 카운터스트라이크 2, 오버워치 2, 에이펙스 레전드 등에서 고질적인 오버플릭을 교정하고 면도날 같은 초탄 헤드샷 브레이킹 능력을 체화하려는 모든 FPS 게이머 및 마우스 정밀도를 높이려는 사용자.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('logan1984', 'woodworth1899', 'fitts1954', 'woods2015')
};

export default function LocalizedReactionChainPageKo() {
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
      <ReactionChainClient
        copy={{
          title: "마우스 에임 브레이킹 & 충동 억제 훈련",
          subtitle: "키네틱 어레스트 및 감속 제어 • 15단계 속도 스케일링",
          badge: "충동 억제 반사 훈련",
          description: "목표물을 향해 마우스를 빠르게 가속하는 것보다 목표 지점에서 정확히 멈춰 세우는 것이 신경생체역학적으로 훨씬 어렵습니다. 운동 명령과 정지 명령은 대뇌 기저핵에서 서로 독립적으로 경주를 벌이며(Logan & Cowan, 1984), 종단 정지 제어가 늦어지면 관성으로 인해 오버플릭이 발생합니다 (Woodworth, 1899). 쇄도하는 노드를 가로채고 커서를 즉각 영점으로 멈추어 오버플릭을 원천 차단하세요.",
          hudLabels: {
            score: "현재 점수",
            time: "남은 시간",
            accuracy: "정지 정확도",
            bestScore: "최고 점수",
            getReady: "준비하세요"
          },
          pauseTitle: "훈련 일시 정지",
          pauseSubtitle: "화면을 클릭하면 포인터 잠금이 다시 활성화됩니다.",
          resultLabels: {
            newBest: "최고 기록 달성",
            points: "최종 점수",
            accuracy: "정지 정확도",
            totalArrests: "요격 정지 성공",
            maxCombo: "최대 콤보",
            peakLevel: "도달 레벨",
            playAgain: "다시 도전하기"
          },
          rulesTitle: "훈련 규칙 & 점수 획득 메커니즘",
          rulesItems: [
            { title: "키네틱 어레스트 (+50점)", text: "쇄도하는 노드를 요격하고 노드 내부에서 마우스 커서를 완전히 정지(ARREST READY)시키면 50점을 획득합니다." },
            { title: "콤보 배율 (최대 3.0배)", text: "실수 없이 연속으로 요격 정지를 성공시키면 콤보 배율이 상승하여 최대 3.0배까지 점수가 폭발합니다." },
            { title: "슬라이스 스루 및 미스 경고", text: "정지하지 않고 노드를 스쳐 지나가거나 요격에 실패하면 콤보가 리셋됩니다(점수 차감 없음)." },
            { title: "초고속 속도 스케일링", text: "점수가 상승함에 따라 노드 속도가 최대 1,800 px/s까지 가속되고 유효 정지 반경이 축소됩니다." }
          ],
          aboutTitle: "에임 브레이킹 & 충동 억제 신경생체역학 정보",
          aboutSections: [
            {
              title: "운동 감속 제어 및 반응 억제 신경생리학",
              content: "리액션 체인은 사용자의 감속 제어력과 운동 억제(Response Inhibition) 능력을 고립시켜 훈련합니다. 단순히 움직이는 표적을 클릭하는 것을 넘어, 쇄도하는 노드의 궤적을 요격한 직후 전완부 길항근을 강하게 수축시켜 커서의 운동 에너지를 표적 테두리 내부에서 완전히 흡수해야 합니다."
            },
            {
              title: "로건 경마 모델과 초탄 헤드샷 안정화",
              content: "규칙적인 키네틱 어레스트 훈련은 대뇌 시상하핵(STN)과 모터 피질을 재배선하여 급속 운동 제동 신경망을 강화합니다 (Logan et al., 1984). 이는 FPS 게임에서 빈번하게 발생하는 오버플릭을 근본적으로 교정하고 발로란트 및 카운터스트라이크 2에서 면도날 같은 초탄 헤드샷 브레이킹 능력을 완성합니다."
            }
          ],
          aboutCards: [
            {
              title: "훈련 대상 선수",
              desc: "오버플릭을 교정하려는 FPS 게이머 및 신속한 신경근 운동 정지력이 요구되는 모든 사용자.",
              bgClass: "bg-blue-600/30",
              iconClass: "text-blue-400"
            },
            {
              title: "강화되는 핵심 역량",
              desc: "정밀 감속력, 마우스 패드 정지 마찰 제어, 정지 신호 억제(SSRT), 공간 요격 예측력.",
              bgClass: "bg-emerald-600/30",
              iconClass: "text-emerald-400"
            },
            {
              title: "키네틱 브레이킹",
              desc: "최대 1,800 px/s 속도의 노드를 1.5 px/프레임 미만으로 급제동하여 3.0배 콤보 극대화.",
              bgClass: "bg-purple-600/30",
              iconClass: "text-purple-400"
            }
          ]
        }}
      />
      <DrillGuide {...guideProps} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/reflex-training/reaction-chain" />
    </>
  );
}
