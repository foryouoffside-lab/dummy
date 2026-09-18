import ComplexPatternClient from '@/app/drills/physical/coordination/complex-pattern/ComplexPatternClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';

// ============================================================
// SEO RESEARCH FINDINGS — South Korea (KR / KO)
// Primary Intent: 도형 순서 기억하기 게임, 순서 기억 게임, 패턴 기억력 테스트, 공간 기억력 테스트
// Context: Korean job-seeker cognitive tests (AI 역량검사 / 잡다 역검 도형 순서 기억) & FPS 반동 패턴 궤적 제어
// Target Queries:
//   - "도형 순서 기억하기 게임" (High-intent cognitive test query)
//   - "순서 기억 게임" / "위치 기억 게임" (Spatial memory test queries)
//   - "패턴 기억력 테스트" (Pattern memory test)
//   - "공간 기억력 테스트" (Spatial working memory test)
//   - "작업 기억력 훈련" (Working memory brain training)
//   - "시각 공간 기억력 게임" (Visuospatial memory drill)
//   - "마우스 궤적 기억 훈련" (Mouse trajectory motor coordination)
// ============================================================

export const metadata = {
  title: "도형 순서 기억 & 패턴 기억력 테스트 – 무료 공간 작업기억 훈련 | SkillDrills",
  description: "무료 온라인 도형 순서 및 패턴 기억력 테스트. 화면에 번쩍이는 기하학적 경로를 순간 암기하고 순서대로 연결하여 시각 공간 작업기억 용량과 마우스 운동 협응력을 과학적으로 단련합니다.",
  keywords: [
    "도형 순서 기억하기 게임",
    "순서 기억 게임",
    "패턴 기억력 테스트",
    "공간 기억력 테스트",
    "작업 기억력 훈련",
    "시각 공간 기억력 게임",
    "위치 기억 게임",
    "마우스 궤적 기억 훈련",
    "AI 역량검사 도형 기억",
    "패턴 기억 게임"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/physical/coordination/complex-pattern',
    languages: getAlternateLanguages('/drills/physical/coordination/complex-pattern'),
  },
  openGraph: {
    title: "도형 순서 기억 & 패턴 기억력 테스트 – 무료 공간 작업기억 훈련 | SkillDrills",
    description: "무료 온라인 도형 순서 및 패턴 기억력 테스트. 화면에 번쩍이는 기하학적 경로를 순간 암기하고 순서대로 연결하여 시각 공간 작업기억 용량과 마우스 운동 협응력을 과학적으로 단련합니다.",
    url: 'https://skilldrills.online/ko/drills/physical/coordination/complex-pattern',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "도형 순서 기억 & 패턴 기억력 테스트 – 무료 공간 작업기억 훈련 | SkillDrills",
    description: "무료 온라인 도형 순서 및 패턴 기억력 테스트. 화면에 번쩍이는 기하학적 경로를 순간 암기하고 순서대로 연결하여 시각 공간 작업기억 용량과 마우스 운동 협응력을 과학적으로 단련합니다.",
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
      "name": "도형 순서 기억 & 패턴 기억력 테스트",
      "item": "https://skilldrills.online/ko/drills/physical/coordination/complex-pattern"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "도형 순서 기억 & 패턴 기억력 테스트",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "점진적으로 복잡해지는 기하학적 경로를 순간 암기하고 정확하게 마우스로 재현하여 시각 공간 작업기억과 미세 운동 신경을 측정하는 무료 온라인 인지 훈련 도구.",
  "url": "https://skilldrills.online/ko/drills/physical/coordination/complex-pattern",
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
  "name": "도형 순서 기억 & 패턴 기억력 트레이너",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas 및 마우스 포인터 입력을 지원하는 최신 웹 브라우저",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/ko/drills/physical/coordination/complex-pattern",
  "inLanguage": "ko",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "도형 순서 기억 게임 (Pattern Memory Game)",
  "url": "https://skilldrills.online/ko/drills/physical/coordination/complex-pattern",
  "description": "짧은 시간 동안 표시되는 다각 경로를 기억하고 마우스 드래그로 완벽하게 복원하는 두뇌 트레이닝 및 협응력 게임.",
  "genre": [
    "Brain Training",
    "Memory Test",
    "Coordination Drill",
    "Cognitive Assessment"
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
      "name": "도형 순서 기억하기 게임은 뇌의 어떤 인지 기능과 운동 신경을 측정하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "본 드릴은 뇌 두정엽과 전전두엽에서 담당하는 시각 공간 작업기억(Visuospatial Working Memory) 용량과 일차 운동 피질의 연속적 궤적 재현(Motor Trajectory Reproduction) 능력을 동시에 측정합니다. 순간적으로 표시되는 복수의 공간 노드를 하나의 응집된 공간 표상으로 부호화하고 지체 없이 근육 신호로 전환하는 신경 처리 효율성을 평가합니다."
      }
    },
    {
      "@type": "Question",
      "name": "AI 역량검사(잡다 역검)의 도형 순서/위치 기억 게임과 어떤 연관성이 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "국내 대기업 및 공공기관 채용에서 널리 활용되는 AI 역량검사(역검)의 '도형 순서 기억하기', '도형 위치 기억' 게임과 동일한 신경 심리학적 메커니즘을 훈련합니다. 고난도 레벨에서 노드 개수가 8개까지 늘어나고 점멸 시간이 0.6초로 단축되므로, 실전 시험에서 요구되는 순간 직관 암기 및 공간 청킹 능력을 탁월하게 길러줍니다."
      }
    },
    {
      "@type": "Question",
      "name": "배들리의 시공간 스케치북과 코완의 4항목 용량 한계는 게임 난이도와 어떻게 연결되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "앨런 배들리(Baddeley, 1974)의 모델에 따르면 시공간 정보는 일시적 저장소인 '시공간 스케치북'에 보관됩니다. 넬슨 코완(Cowan, 2001)이 밝힌 인간 작업기억의 순수 용량 한계는 약 4개 항목입니다. 본 드릴의 1~4레벨은 기본 용량 내에서 처리되지만, 레벨 5 이상(노드 5~8개)에서는 개별 점을 암기하는 방식이 붕괴되므로 하위 기하학 도형으로 묶는 상위 청킹 전략이 필수적으로 요구됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "레벨이 올라갈수록 점멸 시간과 노드 수는 어떻게 변화하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "난이도는 레벨 1부터 레벨 15까지 점진적으로 심화됩니다. 연결해야 하는 노드 수는 3개에서 최대 8개로 증가하며, 경로가 화면에 노출되는 암기 시간은 초기 2.0초에서 최상위 단계 0.6초까지 단축됩니다. 또한 노드 간 각도가 예각(Hairpin turn)이나 교차 루프로 구성되어 높은 궤적 정밀도가 요구됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "드로잉 정확도(Accuracy %)는 수학적으로 어떻게 계산되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "플레이어가 마우스 드래그로 입력한 벡터 궤적과 원래의 목표 경로 사이의 공간적 충돌 검사 및 유클리드 좌표 편차(Euclidean Deviation)를 종합하여 0~100%로 산출됩니다. 지정된 순서대로 모든 노드를 정확히 통과하면 85% 이상의 높은 일치율을 달성하게 됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "발로란트나 배틀그라운드 같은 FPS 게임의 에임/반동 제어에 실제로 도움이 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "매우 직접적인 도움이 됩니다. 총기별 스프레이 반동 제어(Recoil Pattern Compensation)는 시각적 가이드 없이 기억된 2차원 마우스 이동 벡터를 손끝 근육으로 재현하는 작업입니다. 본 드릴은 뇌 속에 저장된 기하학적 궤적을 오차 없이 손등과 손가락 근육으로 출력하는 피드포워드 모터 프로그램을 강화합니다."
      }
    },
    {
      "@type": "Question",
      "name": "복잡한 지그재그나 루프 경로를 쉽게 기억하는 과학적인 청킹(묶기) 노하우는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "노드의 좌표를 하나씩 외우지 말고 전체 형태를 친숙한 기하학적 심볼(예: 'N자 형태', '삼각형', '화살표', '지그재그')로 묶어서 하나의 덩어리(Chunk)로 시각화하세요. 6개 이상의 노드도 '삼각형 1개 + 수평 직선 1개'처럼 2개의 청크로 분할하면 코완의 4항목 작업기억 한계 내에서 손쉽게 기억할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "패턴을 빠르게 그릴 때 마우스 감도(DPI)와 파지법(그립)은 어떻게 설정하는 것이 유리한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "급격한 방향 전환과 미세 궤적 수정을 동시에 수행하기 위해서는 25~35cm/360° 수준의 중간 감도가 이상적입니다. 손바닥을 패드에 완전히 밀착시키는 팜 그립보다는 손가락 끝과 관절의 자유도가 높은 클로(Claw) 또는 핑거팁(Fingertip) 그립을 사용할 때 예각 궤적을 오버슈트 없이 정밀하게 꺾을 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "최상위권 점수인 17,000점(Apex 등급)을 달성하기 위한 핵심 조건은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "45초 동안 한 번의 실수 없이 레벨 12 이상에 진입하고, 4.0배 최대 콤보 배율을 끊김 없이 유지하면서 평균 정확도 92% 이상을 기록해야 합니다. 이를 위해서는 암기 시간 동안 주저하지 않고 머릿속으로 경로를 미리 그려보는 피드포워드 사전 활성화가 완벽해야 합니다."
      }
    },
    {
      "@type": "Question",
      "name": "본 테스트는 별도의 설치나 회원가입 없이 무료로 이용할 수 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, SkillDrills의 모든 드릴은 100% 무료이며 별도의 회원가입이나 앱 설치 없이 웹 브라우저(HTML5 Canvas)에서 즉시 구동됩니다. 사용자의 최고 기록과 숙련도 데이터는 외부 서버로 전송되지 않고 본인의 브라우저 로컬 저장소에만 안전하게 보관됩니다."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "도형 순서 기억 및 경로 드로잉 훈련 진행 가이드",
  "description": "화면에 번쩍이는 기하학적 경로를 시각 공간 작업기억에 저장하고 마우스 드래그로 순차 복원하는 4단계 실전 프로토콜.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "점멸 궤적 포착 및 기하학적 청킹 부호화",
      "text": "라운드가 시작되면 녹색 벡터 선으로 표시되는 경로를 응시합니다. 개별 점 대신 삼각형, Z형 등 친숙한 도형 묶음으로 구조화하여 기억합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/coordination/complex-pattern#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "하늘색 시작 노드 클릭 및 드래그 개시",
      "text": "경로가 사라지고 그리기 단계가 시작되면 하늘색 시작 노드를 클릭한 상태로 마우스 드래그를 시작합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/coordination/complex-pattern#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "웨이포인트 순차 통과 및 자홍색 종료 노드 마감",
      "text": "암기한 순서대로 각 노드를 끊김 없이 통과한 뒤, 자홍색 종료 노드에서 마우스 클릭을 해제하여 궤적을 제출합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/coordination/complex-pattern#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "빠른 드로잉으로 콤보 승수 극대화",
      "text": "정확도를 유지하면서 신속하게 그릴수록 콤보 승수가 최대 4.0배까지 누적되어 45초 세션 동안 폭발적인 고득점을 달성할 수 있습니다.",
      "url": "https://skilldrills.online/ko/drills/physical/coordination/complex-pattern#step-4"
    }
  ]
};

const patternGuide = {
  heading: "시공간 작업기억 및 기하학 경로 재현 인지공학 가이드",
  subtitle: "배들리 시공간 스케치북, 코완의 용량 한계, 래슐리 운동 청킹에 기초한 공간 협응 훈련론",
  intro: [
    "도형 순서 기억 게임(Complex Pattern Drill)은 찰나의 순간 동안 점멸하는 복잡한 기하학적 벡터 경로를 두뇌 속에 시각적 표상으로 각인하고, 가이드라인이 사라진 빈 캔버스 위에서 손끝의 마우스 움직임만으로 정확히 재현하는 고차 인지-운동 통합 훈련입니다. 단순한 반응 속도 테스트와 달리, 45초 동안 점진적으로 복잡해지는 공간 좌표를 단기 기억에 유지하며 지체 없이 정밀한 운동 프로그램으로 출력해야 합니다.",
    "인지심리학의 거두 앨런 배들리와 그레이엄 히치(Baddeley & Hitch, 1974)의 다요소 작업기억 모델에 따르면, 시각 정보와 공간 정보는 뇌의 '시공간 스케치북(Visuospatial Sketchpad)'에서 처리 및 유지됩니다. 넬슨 코완(Cowan, 2001)은 성인의 순수 작업기억 저장 한계가 약 3~4개의 독립 항목(Items)이라고 규명했습니다. 본 드릴에서 노드가 5개 이상으로 늘어나는 상위 레벨을 돌파하기 위해서는 개별 점들을 독립적으로 외우는 대신 다각형, 문자 형태 등으로 묶어 처리하는 시각적 청킹(Visual Chunking) 전략이 뇌 신경망 내에서 자동화되어야 합니다.",
    "칼 래슐리(Lashley, 1951)의 연속 운동 행위 구문론(Serial Order in Behavior)에 따르면, 빠른 속도로 수행되는 연속적인 손동작은 매 순간의 감각 피드백에 의존할 수 없으며 하나의 통합된 묶음인 '모터 청크(Motor Chunk)'로 묶여 실행됩니다. 또한 로버트 우드워스(Woodworth, 1899)의 2단계 모델이 설명하듯, 시작 노드에서 목표 노드로 향하는 초기 탄도 운동(Ballistic phase)과 정점에서의 미세 감속 제어(Current-control deceleration)가 조화를 이룰 때 비로소 오차 없는 완벽한 궤적 복원이 완성됩니다.",
    "측정 정밀도 및 하드웨어 안내: 본 드릴은 브라우저의 performance.now() 고해상도 타이머를 활용하여 클라이언트 기기 내부에서 밀리초 단위로 연산됩니다. 디스플레이 주사율(60Hz 16.7ms / 144Hz 6.9ms / 240Hz 4.1ms) 및 마우스 폴링레이트(125Hz vs 1000Hz)에 따라 물리적 지연 차이가 발생할 수 있으므로, 5ms 미만의 오차는 측정 노이즈로 감안하시기 바랍니다. 모든 기록은 브라우저에만 안전하게 저장됩니다."
  ],
  benchmarks: {
    title: "도형 순서 기억 및 공간 작업기억 5단계 표준 벤치마크",
    headers: ["티어 및 등급", "칭호 (Rank Title)", "점수 기준치", "도달 레벨", "경로 일치 정확도", "신경인지 및 운동 협응 프로필"],
    rows: [
      ["Tier 1: 최정상 패턴 마스터", "Apex Pattern Master", "17,000점 이상", "Level 12 – 15", "92% 이상 유지", "상위 0.1% 수준의 초고속 시공간 청킹 및 전완근-손가락 복합 궤적 제어 완성 (Cowan 2001; Lashley 1951)"],
      ["Tier 2: 엘리트 시퀀스 트레이서", "Elite Sequence Tracer", "13,000 – 16,999점", "Level 9 – 11", "85 – 91% 유지", "복합 6~7개 노드 예각 궤적의 안정적 재현 및 탁월한 피드포워드 근육 기억 (Baddeley 1974)"],
      ["Tier 3: 숙련된 공간 내비게이터", "Advanced Spatial Navigator", "9,500 – 12,999점", "Level 6 – 8", "76 – 84% 유지", "경쟁전 랭크 상위권 수준의 준수한 공간 인지력 및 매끄러운 2차원 드로잉 제어력"],
      ["Tier 4: 중간 경로 기억자", "Intermediate Waypoint Recaller", "6,000 – 9,499점", "Level 3 – 5", "65 – 75% 유지", "일반 평균 성인의 작업기억 한계선, 5개 이상 노드에서 회상 지연 및 궤적 왜곡 발생"],
      ["Tier 5: 입문 및 경로 학습자", "Novice Trajectory Learner", "6,000점 미만", "Level 1 – 2", "65% 미만 유지", "순간 암기 부호화 불안정 및 급격한 방향 전환 시 커서 오버슈트 빈발, 기초 청킹 훈련 권장"]
    ],
    note: "시공간 작업기억 모델(Baddeley & Hitch 1974; Cowan 2001)과 연속 운동 제어 연구(Lashley 1951; Woodworth 1899)를 기반으로 도출된 인지-운동 표준 지표입니다."
  },
  techniques: {
    title: "도형 순서 기억력 극대화 및 마우스 궤적 드로잉 실전 프로토콜",
    items: [
      {
        name: "기하학적 하위 묶음 청킹 (Baddeley Visuospatial Chunking)",
        desc: "배들리와 코완의 연구에 따르면 뇌의 작업기억은 4개 이상의 비구조화된 정보를 동시에 처리하지 못합니다. 5개 이상의 노드가 표시될 때는 독립된 점으로 보지 말고 삼각형, 사각형, 'Z' 형태 등 친숙한 도형으로 쪼개어 암기하세요.",
        tips: "노드가 7개라면 '삼각형 1개(3점) + 사각형 1개(4점)'처럼 2개의 직관적 청크로 결합하여 기억 부하를 획기적으로 낮추세요."
      },
      {
        name: "래슐리 순차 피드포워드 모터 프로그램 사전 활성화 (Feedforward Motor Chaining)",
        desc: "칼 래슐리(1951)가 입증한 바와 같이, 빠른 드로잉은 마우스를 움직이는 도중에 생각하는 것이 아니라 출발 전에 전체 궤적이 뇌의 운동 피질에 하나의 묶음으로 컴파일되어 있어야 합니다.",
        tips: "점멸이 끝나는 마지막 0.2초 동안 마우스의 이동 궤적을 머릿속으로 먼저 고속 시뮬레이션한 뒤, 망설임 없이 하나의 부드러운 스트로크로 입력하세요."
      },
      {
        name: "우드워스 전류 제어 및 정점 감속 제동 (Vertex Terminal Deceleration)",
        desc: "로버트 우드워스(1899)의 모델에 따라, 직선 구간에서는 폭발적인 속도로 마우스를 가속하고 각 노드의 정점(Vertex)을 통과하는 순간 손끝 압력을 가해 감속해야 오버슈트를 막을 수 있습니다.",
        tips: "예각으로 꺾이는 구간에서는 손바닥 뒤꿈치와 약지/소지에 순간적인 하향 마찰력을 주어 마우스 패드 접지력으로 정확한 각도를 형성하세요."
      },
      {
        name: "시선 중심 앵커링을 통한 무언(Non-verbal) 영상 기억술 (Iconic Centroid Anchoring)",
        desc: "상위 레벨에서 노출 시간이 0.6초로 급감할 때 마음속으로 숫자를 세거나 언어로 변환하려 하면 처리 병목이 발생합니다. 언어화 과정을 완전히 배제하고 순수 시각 잔상(Iconic memory)을 활용해야 합니다.",
        tips: "화면의 개별 노드를 따라 눈동자를 움직이지 말고, 전체 도형의 무게중심(Centroid)에 시선을 고정한 채 주변시(Peripheral vision)로 전체 윤곽을 한 번에 흡수하세요."
      }
    ]
  },
  steps: [
    "자신의 실전 마우스 감도(eDPI)를 확인하고 편안한 좌석 자세를 취합니다.",
    "라운드 시작 카운트다운 후 녹색 선으로 나타나는 경로를 주시합니다.",
    "선이 사라진 후 하늘색 시작 노드를 클릭하고 드래그를 시작합니다.",
    "암기한 순서대로 각 노드를 통과한 뒤 자홍색 종료 노드에서 마우스를 놓습니다."
  ]
};

export default function ComplexPatternPageKo() {
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
      <ComplexPatternClient
        copy={{
          title: "도형 순서 기억 & 패턴 기억력 테스트",
          subtitle: "시각 공간 작업기억(배들리 모델) 및 경로 궤적 재현 협응 훈련 • 15레벨",
          rulesTitle: "도형 순서 기억 훈련 규칙 및 점수 체계",
          rules: [
            { title: "기하학 경로 순간 암기", text: "화면에 번쩍이는 다각형 벡터 경로를 사라지기 전 집중하여 머릿속에 각인합니다." },
            { title: "순차적 마우스 드래그 연결", text: "하늘색 시작 노드를 클릭한 채 모든 웨이포인트를 올바른 순서로 지나 자홍색 종료 노드까지 연결합니다." },
            { title: "정확도 판정 및 콤보 누적", text: "목표 궤적과의 일치율 기준을 통과하면 연속 성공 콤보 배율이 최대 4.0배까지 상승하여 폭발적인 점수를 획득합니다." },
            { title: "오류 시 콤보 리셋", text: "경로 오차가 기준치를 초과하면 콤보는 1.0배로 초기화되지만, 45초 제한 시간 차감은 없습니다." }
          ],
          aboutTitle: "도형 순서 기억 훈련 소개",
          aboutHeading: "시공간 작업기억 및 연속 운동 청킹 역학",
          aboutText: "본 드릴은 앨런 배들리(Baddeley, 1974)의 시공간 스케치북 모델과 넬슨 코완(Cowan, 2001)의 작업기억 용량 한계 이론에 기반하여 설계되었습니다. 순간적으로 점멸하는 기하학적 궤적을 뇌 속에 단기 파지하고, 칼 래슐리(Lashley, 1951)의 운동 청킹 메커니즘을 통해 연속적인 마우스 드래그 동작으로 재현함으로써 시각 공간 인지력과 손끝의 미세 운동 협응력을 극대화합니다."
        }}
      />
      <DrillGuide guide={patternGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/coordination/complex-pattern"
          locale="ko"
        />
      </div>
    </>
  );
}
