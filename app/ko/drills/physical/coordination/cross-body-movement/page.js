import CrossBodyMovementClient from '@/app/drills/physical/coordination/cross-body-movement/CrossBodyMovementClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — South Korea (KR / KO)
// Primary Intent: 눈 손 협응력 테스트, 협응력 테스트, 손 눈 협응력 운동, 협응력 게임
// Context: Sensory integration (감각통합 정중선 교차), bilateral motor coordination & FPS diagonal flicks
// Target Queries:
//   - "눈 손 협응력 테스트" (High-intent eye-hand coordination test)
//   - "손 눈 협응력" / "눈 손 협응력 검사" (Diagnostic & functional query)
//   - "협응력 테스트" (Motor coordination test)
//   - "협응력 게임" (Coordination browser game)
//   - "협응력 운동" (Coordination training exercises)
//   - "양측성 협응 훈련" (Bilateral coordination training)
//   - "정중선 교차 훈련" (Midline crossing drill)
//   - "마우스 대각선 플릭" (Diagonal flick trajectory control)
// ============================================================

export const metadata = {
  title: "눈 손 협응력 테스트 & 협응 운동 게임 – 무료 대각선 제어 훈련 | SkillDrills",
  description: "무료 온라인 눈 손 협응력 테스트 및 협응 운동 게임. 화면 중앙 정중선을 가로지르는 대각선 노드를 신속·정확하게 연결하여 양측성 신경근 제어와 뇌량 활성화, 정밀 마우스 플릭을 과학적으로 단련합니다.",
  keywords: [
    "눈 손 협응력 테스트",
    "손 눈 협응력",
    "협응력 테스트",
    "협응력 게임",
    "협응력 운동",
    "눈-손 협응력 검사",
    "양측성 협응 훈련",
    "정중선 교차 훈련",
    "마우스 대각선 플릭",
    "신체 협응력"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/physical/coordination/cross-body-movement',
    languages: getAlternateLanguages('/drills/physical/coordination/cross-body-movement'),
  },
  openGraph: {
    title: "눈 손 협응력 테스트 & 협응 운동 게임 – 무료 대각선 제어 훈련 | SkillDrills",
    description: "무료 온라인 눈 손 협응력 테스트 및 협응 운동 게임. 화면 중앙 정중선을 가로지르는 대각선 노드를 신속·정확하게 연결하여 양측성 신경근 제어와 뇌량 활성화, 정밀 마우스 플릭을 과학적으로 단련합니다.",
    url: 'https://skilldrills.online/ko/drills/physical/coordination/cross-body-movement',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "눈 손 협응력 테스트 & 협응 운동 게임 – 무료 대각선 제어 훈련 | SkillDrills",
    description: "무료 온라인 눈 손 협응력 테스트 및 협응 운동 게임. 화면 중앙 정중선을 가로지르는 대각선 노드를 신속·정확하게 연결하여 양측성 신경근 제어와 뇌량 활성화, 정밀 마우스 플릭을 과학적으로 단련합니다.",
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
      "name": "눈 손 협응력 테스트 & 협응 운동 게임",
      "item": "https://skilldrills.online/ko/drills/physical/coordination/cross-body-movement"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "눈 손 협응력 테스트 & 협응 운동 게임",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "화면 중앙 정중선을 대각선으로 교차하여 노드를 연결하는 양측성 운동 제어 및 눈-손 협응력 측정 도구.",
  "url": "https://skilldrills.online/ko/drills/physical/coordination/cross-body-movement",
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
  "name": "눈 손 협응력 트레이너",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas 및 마우스 포인터 입력을 지원하는 최신 브라우저",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/ko/drills/physical/coordination/cross-body-movement",
  "inLanguage": "ko",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "눈 손 협응력 게임 (Cross-Body Movement)",
  "url": "https://skilldrills.online/ko/drills/physical/coordination/cross-body-movement",
  "description": "정중선 교차 대각선 스윕을 통해 뇌량 통신과 손끝 에임 제어력을 단련하는 무료 협응 운동 게임.",
  "genre": [
    "Coordination Drill",
    "Motor Control",
    "Hand-Eye Training",
    "Action"
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
      "name": "눈 손 협응력 테스트는 신체와 뇌의 어떤 운동 조절 기제를 평가하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "본 드릴은 시각 정보(후두엽)와 공간 인지(두정엽), 그리고 정밀한 팔 근육 조절(일차 운동 피질) 간의 신경 연동 효율성을 평가합니다. 특히 몸의 중심축인 정중선을 가로지르는 대각선 궤적 스윕을 통해 좌우 뇌 반구를 잇는 뇌량(Corpus Callosum)의 반구 간 정보 전송 속도와 양측성 협응력을 정밀하게 측정합니다."
      }
    },
    {
      "@type": "Question",
      "name": "신체 정중선(Midline)을 가로지르는 동작이 왜 일반 좌우 이동보다 어렵고 중요한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "데이비드 캐리(Carey et al., 1996)의 생체역학 연구에 따르면, 손을 뻗는 쪽과 반대되는 반대측 공간(Contralateral space)으로 이동할 때는 동측 공간(Ipsilateral)보다 신경 전달 지연이 발생하고 정확도가 떨어집니다. 정중선 교차를 반복 훈련하면 양측 대뇌 반구의 동시 통합 제어력이 강화되어 손의 이동 반경 전체에서 사각지대 없는 매끄러운 제어 능력을 갖추게 됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "발로란트나 오버워치 같은 FPS 게임에서 대각선 플릭과 화면 전환에 어떤 도움을 주나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "대부분의 FPS 플레이어는 수평 조준에는 익숙하지만, 대각선 플릭이나 공중 표적 조준 시 손목 각도가 꺾여 궤적이 흔들리는 취약점을 보입니다. 본 드릴은 전완과 팔꿈치 관절을 축으로 화면 전체를 가로지르는 대각선 스윕을 훈련시켜 180도 광폭 화면 전환 및 고저차가 큰 교전에서의 크로스헤어 안정성을 극대화합니다."
      }
    },
    {
      "@type": "Question",
      "name": "레벨이 올라갈수록 통로 너비와 목표 노드 크기는 어떻게 변화하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "난이도는 레벨 1부터 레벨 15까지 250점 단위로 상승합니다. 경로를 유지해야 하는 통로 허용 오차(Corridor Tolerance)는 초기 10픽셀에서 최상위 단계 4픽셀로 좁아지며, 클릭해야 하는 노드 반지름은 16픽셀에서 8픽셀로 축소됩니다. 또한 노드 간의 화면 상 거리가 극단적인 대각선 모서리로 확장됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "통로를 벗어나면 점수가 감점되거나 세션 시간이 줄어드나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "아닙니다. 통로 허용 오차를 벗어나면 현재 누적된 콤보 배율이 1.0배로 초기화되지만, 점수가 깎이거나 45초 세션 타이머가 줄어들지는 않습니다. 이는 플레이어가 실패에 위축되지 않고 과감하게 빠른 속도로 대각선 스윕을 전개하도록 유도하기 위함입니다."
      }
    },
    {
      "@type": "Question",
      "name": "대각선 스윕 동작을 매끄럽게 수행하기 위한 이상적인 마우스 감도(eDPI)와 패드 크기는?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "넓은 대각선 궤적을 마우스 리프팅 없이 한 번의 스트로크로 그리기 위해서는 30~45cm/360° 수준의 중저감도와 최소 가로 450mm 이상의 대형 게이밍 마우스패드가 권장됩니다. 패드 표면의 물리적 활주 면적이 넓어야 팔 전체를 사용하는 부드러운 스윕이 가능합니다."
      }
    },
    {
      "@type": "Question",
      "name": "손목으로만 마우스를 움직이는 버릇이 있는데, 왜 전완과 팔꿈치를 함께 써야 하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "손목 관절만으로 대각선 선을 그리면 손목 해부학 구조상 직선이 아닌 둥근 부채꼴 호(Arc)가 그려져 좁은 통로를 벗어나기 쉽습니다. 팔꿈치를 책상이나 패드에 가볍게 지지하고 전완 전체를 하나의 레버로 사용하여 밀고 당길 때 완벽한 직선 대각선 벡터를 생성할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "우드워스의 2단계 제어 모델을 활용해 목표 노드에 정확히 안착하는 방법은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "로버트 우드워스(Woodworth, 1899)의 연구에 따라, 전체 궤적의 70~80% 구간은 팔 전체를 이용해 폭발적인 탄도 속도(Ballistic sweep)로 질주하고, 목표 노드 B에 도달하기 직전 마지막 20~30% 구간에서 손끝 압력을 마우스패드에 가볍게 주며 시각 피드백으로 미세 감속(Terminal Deceleration)을 걸어야 이탈 없이 안착할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "최정상 등급인 17,000점(Apex Bilateral Master)을 기록하기 위한 핵심 플레이 팁은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "45초 동안 한 번의 통로 이탈 없이 최대 3.0배 콤보를 끝까지 유지하고, 8픽셀 크기의 초소형 노드가 출현하는 레벨 12 이상에서 92% 이상의 연결 성공률을 기록해야 합니다. 노드 A를 터치하자마자 시선을 반대편 노드 B로 즉시 전환하는 시선 선행(Gaze fixation)이 필수적입니다."
      }
    },
    {
      "@type": "Question",
      "name": "본 테스트는 별도의 소프트웨어 설치 없이 웹 브라우저에서 안전하게 실행되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, SkillDrills의 모든 드릴은 브라우저 표준 기술(HTML5 Canvas 및 포인터 락 API)을 기반으로 작동하므로 프로그램 다운로드나 회원가입이 필요 없습니다. 모든 스코어와 콤보 데이터는 브라우저 로컬 저장소에만 보관되어 개인정보가 외부로 전송되지 않습니다."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "눈 손 협응력 및 정중선 대각선 스윕 훈련 진행 가이드",
  "description": "화면 가장자리 노드를 터치하고 대각선 통로를 가로질러 목표 노드를 신속하게 연결하는 4단계 프로토콜.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "시작 노드 A 터치 및 연결 벡터 활성화",
      "text": "화면 가장자리에 표시되는 하늘색 시작 노드에 마우스 커서를 올려 연결 벡터 라인을 활성화합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/coordination/cross-body-movement#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "신체 정중선 통로를 가로지르는 대각선 스윕",
      "text": "발광하는 통로 허용 오차선 안쪽을 유지하며 화면 대각선 반대편 모서리를 향해 부드럽게 마우스를 스윕합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/coordination/cross-body-movement#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "종단 노드 B 타격 및 연결 완료",
      "text": "반대편 자홍색 목표 노드에 도달하여 벡터 연결을 완성하고 파티클 폭발 시각 피드백과 점수를 획득합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/coordination/cross-body-movement#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "연속 연결로 최대 콤보 승수 구축",
      "text": "통로 이탈 없이 연속으로 노드를 타격하여 콤보 배율을 최대 3.0배까지 상승시키고 45초 동안 고득점을 달성합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/coordination/cross-body-movement#step-4"
    }
  ]
};

const crossBodyGuide = {
  heading: "신체 정중선 교차와 눈-손 양측성 협응 인지신경 가이드",
  subtitle: "에어즈 감각통합 이론, 캐리의 반대측 도달 역학, 피츠-우드워스 이중 제어 모델에 기반한 대각선 운동 훈련론",
  intro: [
    "눈 손 협응력 드릴(Cross-Body Movement)은 화면의 좌우 및 상하 경계를 대각선으로 가로지르는 고속 조준 훈련으로, 인간의 신체 중심 정중선(Body Midline)을 통과하는 순간 요구되는 뇌 신경망의 양측성 통합 조절 능력을 정밀하게 측정합니다. 단순한 직선 트래킹과 달리, 반대측 공간으로 팔을 뻗는 동작은 뇌량을 통한 고도의 반구 간 정보 교환을 수반하므로 신경근 협응 발달에 핵심적인 역할을 합니다.",
    "작업치료학 및 감각통합의 개척자 진 에어즈(A. Jean Ayres, 1972)는 정중선을 교차하는 신체 움직임이 좌우 대뇌 반구의 동시 활성화와 기능적 연결성을 강화하는 필수 운동이라고 규명했습니다. 데이비드 캐리와 굿데일(Carey, Hargreaves & Goodale, 1996)의 신경운동 연구에 따르면, 손이 위치한 쪽의 동측 목표물에 도달할 때보다 몸의 중심을 넘어 반대측 공간(Contralateral Space)으로 손을 뻗을 때 운동 개시 잠복기와 경로 오차가 통계적으로 유의미하게 증가합니다. 본 드릴은 이러한 반대측 이동 시의 신경 지연을 극복하도록 설계되었습니다.",
    "폴 피츠(Fitts, 1954)의 법칙에 따라 표적 간의 거리가 멀어지고 목표물의 크기가 줄어들수록 운동 난이도(Index of Difficulty)는 로그 함수적으로 급증합니다. 레벨이 올라갈수록 본 드릴의 통로 허용 너비는 10픽셀에서 4픽셀로 좁아지며 목표 노드는 16픽셀에서 8픽셀로 압축됩니다. 이때 로버트 우드워스(Woodworth, 1899)의 2단계 모델이 설명하듯, 구간의 80%를 빠르게 돌파하는 전완의 탄도 가속(Ballistic impulse)과 마지막 20%에서 손끝 마찰로 정확히 멈추는 미세 감속 제동(Current-control deceleration)의 조화가 고득점의 절대적 열쇠가 됩니다.",
    "측정 정밀도 및 하드웨어 안내: 본 드릴은 브라우저의 performance.now() 고해상도 타이머를 활용하여 클라이언트 기기 내부에서 밀리초 단위로 연산됩니다. 디스플레이 주사율(60Hz 16.7ms / 144Hz 6.9ms / 240Hz 4.1ms) 및 마우스 폴링레이트(125Hz vs 1000Hz)에 따라 물리적 지연 차이가 발생할 수 있으므로, 5ms 미만의 오차는 측정 노이즈로 감안하시기 바랍니다. 모든 기록은 브라우저에만 안전하게 저장됩니다."
  ],
  benchmarks: {
    title: "눈-손 협응력 및 정중선 대각선 제어 5단계 표준 벤치마크",
    headers: ["티어 및 등급", "칭호 (Rank Title)", "점수 기준치", "도달 레벨", "벡터 연결 정확도", "신경생리학적 협응 프로필"],
    rows: [
      ["Tier 1: 최정상 양측성 마스터", "Apex Bilateral Master", "17,000점 이상", "Level 12 – 15", "92% 이상 유지", "상위 0.1% 수준의 탁월한 뇌량 반구 간 정보 교환 및 4px 초협소 통로에서의 초정밀 전완 축 스윕 완성 (Ayres 1972; Fitts 1954)"],
      ["Tier 2: 엘리트 정중선 스위퍼", "Elite Midline Sweeper", "13,000 – 16,999점", "Level 9 – 11", "85 – 91% 유지", "고속 대각선 반대측 도달 시 지연 없는 가속과 8px 노드 타격 우드워스 감속 제동 완성 (Carey et al. 1996)"],
      ["Tier 3: 숙련된 벡터 추적자", "Advanced Vector Tracer", "9,500 – 12,999점", "Level 6 – 8", "76 – 84% 유지", "경쟁전 상위권의 우수한 대각선 에임 및 안정적인 신체 정중선 교차 마우스 제어력"],
      ["Tier 4: 중간 노드 커넥터", "Intermediate Node Connector", "6,000 – 9,499점", "Level 3 – 5", "65 – 75% 유지", "일반 성인의 평균적 협응 수준, 통로 폭이 6px 이하로 축소 시 손목 각도 한계로 궤적 이탈 빈발"],
      ["Tier 5: 입문 대각선 학습자", "Novice Diagonal Learner", "6,000점 미만", "Level 1 – 2", "65% 미만 유지", "손목 고정으로 인한 부채꼴 곡선 왜곡 및 목표 노드 오버슈트 빈발, 전완 축 회전 훈련 필요"]
    ],
    note: "감각통합 이론(Ayres 1972), 반대측 도달 연구(Carey et al. 1996), 그리고 피츠 운동 난이도 법칙(Fitts 1954)을 결합한 객관적 협응력 기준입니다."
  },
  techniques: {
    title: "눈-손 협응력 극대화 및 대각선 벡터 스윕 실전 프로토콜",
    items: [
      {
        name: "에어즈 신체 정중선 교차 및 뇌량 신경 활성화 (Ayres Midline Crossing)",
        desc: "에어즈(1972)의 연구에 따르면, 의자의 중심과 모니터 중앙을 명치와 일직선으로 정렬해야 순수한 정중선 교차 자극이 유도됩니다. 몸통을 비틀지 말고 전완이 가슴 앞을 대각선으로 가로지르도록 유도하세요.",
        tips: "자세를 고정하고 팔꿈치를 패드에 가볍게 밀착시켜 팔 전체가 부드럽게 반대편 공간으로 이동하도록 지지축을 형성하세요."
      },
      {
        name: "캐리 반대측 도달 가속 및 시선 선행 고정 (Contralateral Feedforward Gaze)",
        desc: "캐리 등(1996)이 증명한 반대측 도달 지연을 극복하려면 노드 A를 건드리는 찰나에 시선을 이미 목표 노드 B의 위치로 신속하게 이동시켜야 합니다.",
        tips: "마우스 커서를 눈으로 쫓아가지 말고 목표 노드 B에 시선을 미리 고정해 두면 뇌의 피드포워드 모터 프로그램이 오차 없이 최단 거리를 연결합니다."
      },
      {
        name: "우드워스 전류 제어 및 목표 노드 종단 감속 (Terminal Deceleration)",
        desc: "우드워스(1899)의 2단계 제어 모델에 따라, 대각선 구간의 75%는 전완의 탄도 가속으로 단숨에 돌파하고 마지막 25%에서 손끝에 미세 하향 압력을 주어 감속해야 합니다.",
        tips: "고레벨에서 노드가 8픽셀로 작아질 때 손바닥 뒤꿈치로 패드를 살짝 눌러 마찰 제동력을 발생시키면 오버슈트를 완벽히 방지할 수 있습니다."
      },
      {
        name: "피츠의 난이도 지수 극복을 위한 전완 중심 스위핑 (Forearm Elbow Pivot)",
        desc: "손목 관절만으로 대각선 직선을 그리려 하면 뼈 구조상 호(Arc)를 그리며 좁은 통로를 벗어나게 됩니다. 손목을 중립으로 고정하고 팔꿈치를 피벗으로 삼아 전완 전체로 직선을 그리세요.",
        tips: "450mm 이상의 대형 패드를 확보하고 마우스 선이 걸리지 않도록 번지대를 활용해 균일한 활주 저항을 유지하세요."
      }
    ]
  },
  steps: [
    "모니터 중앙과 자신의 명치를 일직선으로 맞추고 바른 자세로 착석합니다.",
    "라운드가 시작되면 화면 모서리에 나타나는 하늘색 시작 노드 A에 커서를 올립니다.",
    "빛나는 통로 오차 구역을 유지하며 반대편 모서리의 자홍색 노드 B를 향해 대각선으로 스윕합니다.",
    "노드 B를 정확히 타격하여 파티클을 발생시키고 연속 연결로 3.0배 콤보를 유지합니다."
  ],
  audience: "FPS 및 MOBA 게이머(발로란트, 오버워치, 배그, 롤), 운동선수, 정밀 손놀림이 필요한 전문가 및 양측성 눈-손 협응력과 정중선 제어력을 향상시키고자 하는 모든 사용자.",
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('ayres1972', 'carey1996', 'cernacek1961', 'fitts1954', 'woodworth1899', 'woods2015'),
};

export default function CrossBodyMovementPageKo() {
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
      <CrossBodyMovementClient
        copy={{
          title: "눈 손 협응력 테스트 & 협응 운동",
          subtitle: "신체 정중선 교차 및 양측성 운동 제어 훈련 • 15레벨",
          rulesTitle: "눈 손 협응력 훈련 규칙 및 점수 체계",
          rules: [
            { title: "시작 노드 활성화", text: "화면 가장자리에 표시되는 하늘색 시작 노드(A)를 클릭하여 연결 벡터를 활성화합니다." },
            { title: "정중선 통로 대각선 스윕", text: "발광하는 통로 허용 오차 구역을 벗어나지 않고 화면 반대편 목표 노드(B)를 향해 부드럽게 마우스를 스윕합니다." },
            { title: "목표 노드 타격 및 콤보 축적", text: "자홍색 목표 노드를 정확히 관통하면 파티클 폭발과 함께 기본 점수가 누적되고 콤보 배율이 상승합니다." },
            { title: "통로 이탈 시 콤보 리셋", text: "통로 경계를 벗어나면 콤보 배율은 1.0배로 초기화되지만, 45초 세션 시간 차감은 없습니다." }
          ],
          aboutTitle: "눈 손 협응력 훈련 소개",
          aboutHeading: "신체 정중선 교차와 양측성 운동 통합 신경생리학",
          aboutText: "본 드릴은 진 에어즈(A. Jean Ayres, 1972)의 감각통합 이론과 데이비드 캐리(Carey et al., 1996)의 반대측 도달 연구에 기초하여 개발되었습니다. 신체 중심축(정중선)을 가로지르는 광폭 대각선 마우스 이동은 뇌량을 통한 좌우 대뇌 반구의 고속 정보 교환을 유도하며, 손목에 국한되지 않고 전완과 어깨를 연동하는 180도 플릭 조준 및 대각선 화면 전환 능력을 극대화합니다."
        }}
      />
      <DrillGuide guide={crossBodyGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/coordination/cross-body-movement"
          locale="ko"
        />
      </div>
    </>
  );
}
