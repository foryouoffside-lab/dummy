import JumpSequenceClient from '@/app/drills/physical/fitness/jump-sequence/JumpSequenceClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — South Korea (KR / KO)
// Primary Intent: 점프력 높이는 운동, 서전트 점프 훈련, 플라이오메트릭 운동, 점프 타이밍 훈련
// Korean Context: 배구/농구 서전트 점프력 강화 및 공중 조준 탄도 예측 (FPS 점프샷 / 체공 조준)
// High-Demand, Low-Competition Target Keywords:
//   - "점프력 높이는 운동" (High-demand vertical jump power query)
//   - "서전트 점프 훈련" (Core athletic vertical test query)
//   - "플라이오메트릭 운동" (Scientific jump conditioning query)
//   - "점프력 강화 운동" (Power & explosive leg workout)
//   - "플라이오메트릭 점프" (Plyometric jump exercise)
//   - "점프 타이밍 훈련" (Jump timing & cadence drill)
//   - "공중 탄도 제어" (Mid-air steering & trajectory control)
//   - "포물선 요격 훈련" (Parabolic flight interception)
//   - "서전트 점프 측정" (Vertical jump measurement test)
//   - "체공 시간 제어" (Hang time & aerial control)
// ============================================================

export const metadata = {
  title: "점프력 높이는 운동 & 서전트 점프 훈련 – 무료 플라이오메트릭 타이밍 드릴 | SkillDrills",
  description: "무료 온라인 점프력 및 서전트 점프 훈련 드릴. 수직 추진력 충전, 체공 포물선 궤적 연산, 공중 스티어링을 통해 신장-단축 주기(SSC) 탄성과 동적 표적 요격 타이밍을 과학적으로 단련합니다.",
  keywords: [
    "점프력 높이는 운동",
    "서전트 점프 훈련",
    "플라이오메트릭 운동",
    "점프력 강화 운동",
    "플라이오메트릭 점프",
    "점프 타이밍 훈련",
    "공중 탄도 제어",
    "포물선 요격 훈련",
    "서전트 점프 측정",
    "체공 시간 제어"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/physical/fitness/jump-sequence',
    languages: getAlternateLanguages('/drills/physical/fitness/jump-sequence'),
  },
  openGraph: {
    title: "점프력 높이는 운동 & 서전트 점프 훈련 – 무료 플라이오메트릭 타이밍 드릴 | SkillDrills",
    description: "무료 온라인 점프력 및 서전트 점프 훈련 드릴. 수직 추진력 충전, 체공 포물선 궤적 연산, 공중 스티어링을 통해 신장-단축 주기(SSC) 탄성과 동적 표적 요격 타이밍을 과학적으로 단련합니다.",
    url: 'https://skilldrills.online/ko/drills/physical/fitness/jump-sequence',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "점프력 높이는 운동 & 서전트 점프 훈련 – 무료 플라이오메트릭 타이밍 드릴 | SkillDrills",
    description: "무료 온라인 점프력 및 서전트 점프 훈련 드릴. 수직 추진력 충전, 체공 포물선 궤적 연산, 공중 스티어링을 통해 신장-단축 주기(SSC) 탄성과 동적 표적 요격 타이밍을 과학적으로 단련합니다.",
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
      "name": "피트니스 및 순발력",
      "item": "https://skilldrills.online/ko/drills/physical/fitness"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "점프력 운동 & 서전트 점프 훈련",
      "item": "https://skilldrills.online/ko/drills/physical/fitness/jump-sequence"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "점프력 운동 & 서전트 점프 시퀀스 트레이너",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "수직 도약 충전, 공중 포물선 궤적 연산 및 동적 표적 요격을 훈련하는 무료 온라인 생체역학 드릴.",
  "url": "https://skilldrills.online/ko/drills/physical/fitness/jump-sequence",
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
  "name": "점프 시퀀스 훈련 웹 앱",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas 및 포인터 입력을 지원하는 최신 브라우저",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/ko/drills/physical/fitness/jump-sequence",
  "inLanguage": "ko",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "점프 시퀀스 체공 요격 게임 (Jump Sequence)",
  "url": "https://skilldrills.online/ko/drills/physical/fitness/jump-sequence",
  "description": "수직 충전 도약과 공중 궤적 조향으로 고속 비행 타겟을 요격하는 무료 브라우저 트레이너.",
  "genre": [
    "Action Game",
    "Physics Game",
    "Timing Drill",
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
      "name": "점프 시퀀스 드릴의 클릭 충전과 공중 조향 메커니즘이 실제 점프력과 체공 제어에 어떻게 도움을 주나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "본 훈련은 파보 코미(Paavo V. Komi, 2000)의 신장-단축 주기(Stretch-Shortening Cycle, SSC) 이론을 모형화하여, 지면 접지 순간의 탄성 에너지를 측정하고 수직 가속도로 전환하는 뇌의 힘 생성률(Rate of Force Development) 조절 신경망을 자극합니다. 공중 비행 중 마우스로 포물선 궤적을 미세 조정하는 과정은 공중 공간 지각력과 체공 감각을 체득하게 합니다."
      }
    },
    {
      "@type": "Question",
      "name": "카와토 미츠오(Kawato, 1999)의 소뇌 내부 순방향 모델(Internal Forward Models)이란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "공중에 뜬 상태에서는 지면 반력을 사용할 수 없으므로 실시간 감각 피드백으로만 궤적을 수정하면 100ms 이상의 지연이 발생해 표적을 놓칩니다. 소뇌의 내부 순방향 모델은 도약 순간의 발사 벡터와 중력 가속도를 사전에 시뮬레이션하여 미래의 교차 좌표를 미리 예측하고, 감각 신호가 뇌에 도착하기 전에 선제적으로 미세 공중 스티어링 명령을 하달합니다."
      }
    },
    {
      "@type": "Question",
      "name": "데이비드 리(David N. Lee, 1976)의 광학적 타우(Optical Tau, τ) 이론과 접촉 시간(TTC) 계산법이란?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "움직이는 물체와 충돌할 때 인간은 물체까지의 거리나 절대 속도를 별도로 계산하지 않습니다. 망막에 맺히는 표적 상의 팽창 속도의 역수인 '광학적 타우(τ)'를 뇌가 직접 추출하여 접촉 시간(Time-to-Contact)을 직관적으로 판단합니다. 본 드릴에서 120 px/s에서 900 px/s로 가속하는 타겟을 요격할 때 바로 이 광학적 타우 연산 능력이 극대화됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "배구, 농구, 축구 등 구기 종목과 배틀로얄 FPS(에이펙스, 오버워치)의 점프샷에 어떻게 전이되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "배구의 스파이크 점프 타이밍, 농구의 리바운드 최고점 포착, 축구의 공중볼 헤더 경합은 모두 비행 궤적의 정점(Apex)과 볼의 궤적을 일치시키는 능력에 좌우됩니다. FPS 게임에서도 점프 패드 활강 중 공중 트래킹 및 발판 착지 직전 원탭 샷을 성공시키는 궤적 예측 신경 회로를 동일하게 단련합니다."
      }
    },
    {
      "@type": "Question",
      "name": "레벨이 상승함에 따라 타겟의 비행 속도와 크기, 점수 체계는 어떻게 변하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "난이도는 레벨 1부터 15까지 250점 단위로 상승합니다. 표적의 비행 속도는 기본 120 px/s에서 최대 900 px/s까지 급상승하며, 표적 구체의 반경은 35px에서 12px로 정밀하게 축소됩니다. 높은 레벨에서는 타겟이 벽면에 튕기며 비선형 궤적을 그리므로 정밀한 탄도 예측이 요구됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "표적을 맞추지 못하고 바닥에 떨어지면 점수가 깎이거나 시간이 줄어드나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "아닙니다. 표적 요격에 실패하여 바닥에 착지하면 콤보 배율만 1.0배로 초기화되며 붉은 플래시 경고가 발생할 뿐, 누적 점수 차감이나 45초 세션 시간 감점은 없습니다. 과감한 고속 충전과 적극적인 공중 플릭 도약을 유도하기 위한 페널티 면제 규칙입니다."
      }
    },
    {
      "@type": "Question",
      "name": "공중에서 좌우로 미세하게 마우스를 조향할 때 권장되는 마우스 감도(eDPI)와 파지법은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "도약 후 상승 곡선 상에서 100ms 이내에 표적과의 교차각을 보정해야 하므로, 손목 전체를 휘두르기보다 손가락 끝으로 미세한 곡선 제동을 걸 수 있는 핑거팁 그립(Fingertip Grip)이나 클로 그립(Claw Grip)이 유리합니다. 중저감도(eDPI 200~350) 세팅이 타겟 반경 12px의 초소형 구체 안착에 가장 적합합니다."
      }
    },
    {
      "@type": "Question",
      "name": "착지 직후 바로 다음 도약을 준비할 때 리듬을 잃지 않는 비결은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "바닥에 닿는 순간 시선이 조작점에 머물러 있으면 안 됩니다. 착지 예상 순간 이미 시선은 다음 생성될 표적의 이동 궤적을 선점하고 있어야 하며, 착지와 동시에 즉각 마우스 클릭 충전을 개시하는 '반동 재도약(Rebound Rhythm)'을 실천해야 3.0배 콤보를 온전히 유지할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "디스플레이 주사율(60Hz vs 144Hz/240Hz)이 공중 포물선 요격에 미치는 물리적 영향은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "표적이 900 px/s로 이동할 때 60Hz 모니터에서는 프레임당 약 15px의 도약 잔상이 생겨 12px 크기의 타겟 중심점을 빗나가기 쉽습니다. 240Hz 고주사율 디스플레이(4.1ms 프레임 시간)는 궤적 분해능을 3.75px 수준으로 미세화하여 피츠의 법칙(Fitts 1954)에 따른 완벽한 정밀 안착을 가능하게 합니다."
      }
    },
    {
      "@type": "Question",
      "name": "본 점프 시퀀스 훈련에서 수집되는 조준 데이터나 플레이 기록은 안전한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, 100% 안전합니다. SkillDrills는 일체의 원격 데이터 로깅을 수행하지 않으며, 모든 물리 엔진 연산과 시간 계측(performance.now)은 브라우저 내부에서만 완결됩니다. 최고 점수와 콤보 기록 또한 사용자 기기의 localStorage에만 로컬 보관됩니다."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "점프 시퀀스 체공 요격 4단계 과학적 훈련 프로토콜",
  "description": "수직 도약 충전, 포물선 궤적 연산, 공중 스티어링을 통해 고속 비행 타겟을 정밀 요격하는 단계별 훈련법.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "수직 추진력 에너지 축적 (Charge Vertical Impulse)",
      "text": "지면 베이스 도트 위에 커서를 올리고 클릭을 길게 유지하여, 비행 표적의 높이에 비례하는 적정 추진력을 충전 게이지로 조절합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/fitness/jump-sequence#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "탄도 도약 및 공중 조향 (Ballistic Liftoff & Steering)",
      "text": "클릭을 놓아 수직 탄도 상승을 개시하고, 체공 중 마우스를 좌우로 슬라이드하여 소뇌 순방향 모델 기반의 공중 조향 곡선을 형성합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/fitness/jump-sequence#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "광학적 타우 기반 정밀 요격 (Optical Tau Interception)",
      "text": "표적의 광학적 팽창률(τ)을 추적하며 하강 중력이 시작되기 직전 표적 중심 구체와 충돌 접점을 완벽히 일치시킵니다.",
      "url": "https://skilldrills.online/ko/drills/physical/fitness/jump-sequence#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "지면 착지 및 반동 케이던스 유지 (Touchdown & Rebound)",
      "text": "지면에 닿는 즉시 다음 표적 좌표로 시선을 이동하고 딜레이 없는 재충전을 실행하여 3.0배 최대 콤보를 45초 동안 지속합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/fitness/jump-sequence#step-4"
    }
  ]
};

const jumpGuide = {
  heading: "서전트 점프 타이밍 및 체공 궤적 요격 생체역학 가이드",
  subtitle: "코미 신장-단축 주기(SSC), 카와토 소뇌 순방향 모델, 리 광학 타우 이론에 기반한 공중 제어 훈련론",
  intro: [
    "점프 시퀀스 훈련(Jump Sequence Training)은 배구 스파이크, 농구 리바운드, 축구 헤더 경합 등 공중전이 승패를 가르는 스포츠에서 요구되는 '체공 중 정밀 요격 순발력'을 모사한 인터랙티브 생체역학 드릴입니다. 단순히 높이 뛰는 것에 그치지 않고, 지면에서 축적한 수직 추진력으로 형성된 포물선 궤적 상에서 날아오는 동적 표적을 정확히 교차시키는 고차원 지각-운동 통합 능력을 훈련합니다.",
    "세계적인 근신경 생체역학 권위자 파보 코미(Paavo V. Komi, 2000)의 '신장-단축 주기(Stretch-Shortening Cycle, SSC)' 이론에 따르면, 인체는 편심성 신장과 동심성 단축이 신속하게 연결될 때 근건 복합체의 탄성 에너지를 폭발적으로 방출합니다. 본 드릴의 차지-앤-릴리스(Charge-and-Launch) 인터페이스는 이 SSC 탄성 조절 과정을 시각화하여, 표적 높이에 부합하는 정확한 발사 운동 에너지(Impulse)를 직관적으로 계측하는 신경 조절력을 기릅니다.",
    "체공 중 궤적 수정은 카와토 미츠오(Kawato, 1999)의 '소뇌 내부 순방향 모델(Cerebellar Forward Models)'에 의해 통제됩니다. 공중에 뜬 플레이어는 지면 반력의 지지를 받지 못하므로, 시각 피드백의 지연(100~150ms)을 기다리지 않고 소뇌의 사전 시뮬레이션을 통해 포물선 궤적과 표적 벡터의 교점을 계산하여 마우스를 선제적으로 조향해야 합니다. 여기에 데이비드 리(Lee, 1976)의 광학적 타우(Optical Tau, τ) 이론이 결합되어 표적의 충돌 잔여 시간(TTC)을 오차 없이 포착합니다.",
    "측정 정밀도 및 하드웨어 안내: 본 드릴은 브라우저의 performance.now() 고해상도 타이머를 활용하여 클라이언트 기기 내부에서 밀리초 단위로 연산됩니다. 디스플레이 주사율(60Hz 16.7ms / 144Hz 6.9ms / 240Hz 4.1ms) 및 마우스 폴링레이트(125Hz vs 1000Hz)에 따라 물리적 지연 차이가 발생할 수 있으므로, 5ms 미만의 오차는 측정 노이즈로 감안하시기 바랍니다. 모든 기록은 브라우저에만 안전하게 저장됩니다."
  ],
  benchmarks: {
    title: "서전트 점프 시퀀스 및 궤적 요격 5단계 표준 벤치마크",
    headers: ["티어 및 등급", "칭호 (Rank Title)", "점수 기준치", "표적 속도 및 정확도", "종합 등급", "신경생체역학 운동 프로필"],
    rows: [
      ["Tier 1: 최정상 궤적 마스터", "Apex Trajectory Master", "17,000점 이상", "92% 이상 / 800 – 900 px/s", "Grade S", "상위 0.1% 수준의 초인적 SSC 추진력 연산 및 900 px/s 극한 비행 표적과의 무결점 광학 타우 요격 (Komi 2000; Kawato 1999; Lee 1976)"],
      ["Tier 2: 정밀 공중 타격자", "Precision Aerial Striker", "12,000 – 16,999점", "84 – 91% / 650 – 799 px/s", "Grade A", "상위 3% 수준의 뛰어난 소뇌 공중 조향 능력, 축소된 15~18px 구체 표적에 대한 안정적인 포물선 수렴 곡선 구현"],
      ["Tier 3: 숙련된 점프 인터셉터", "Skilled Jump Interceptor", "7,500 – 11,999점", "75 – 83% / 500 – 649 px/s", "Grade B", "경쟁전 상위권 게이머 및 운동선수 수준, 우수한 도약 추진력 제어와 안정적인 접지 반동 연계 타이밍"],
      ["Tier 4: 포물선 항법 학습자", "Developing Parabola Navigator", "4,000 – 7,499점", "65 – 74% / 350 – 499 px/s", "Grade C", "일반 성인의 평균 체공 지각 수준, 표적 속도 500 px/s 초과 시 궤적 예측 오차로 인한 바닥 착지 빈발"],
      ["Tier 5: 입문 도약 훈련생", "Novice Liftoff Trainee", "4,000점 미만", "< 65% / < 350 px/s", "Grade D", "도약 추진력 과부하 및 공중 조향 미숙으로 잦은 콤보 리셋, 충전 게이지 비례 감각 및 예측 조향 훈련 요망"]
    ],
    note: "신장-단축 주기 운동학(Komi 2000), 소뇌 순방향 모델(Kawato 1999), 광학 타우 시간 예측 이론(Lee 1976)에 기반한 표준 평가 지표입니다."
  },
  techniques: {
    title: "서전트 점프 체공 제어 및 궤적 요격 실전 프로토콜",
    items: [
      {
        name: "코미 SSC 추진력 비례 충전 (Komi Impulse Potentiation)",
        desc: "게이지를 무조건 100% 채우려 하지 마세요. 표적의 현재 수직 고도와 하강 각도를 포착하고, 포물선의 정점이 표적의 진행선과 일치할 만큼만 추진력을 짧고 간결하게 끊어 충전하세요.",
        tips: "도약 버튼을 누르고 떼는 동작을 '근육의 탄성 고무줄을 튕기는 감각'으로 가볍고 빠르게 제어하세요."
      },
      {
        name: "카와토 소뇌 순방향 모델 공중 조향 (Cerebellar Parabolic Steering)",
        desc: "공중에 뜬 순간부터는 커서를 보지 말고 교차 예상 지점을 겨냥하세요. 소뇌의 내부 모델을 활용해 도약선의 정점이 타겟의 수평 이동 궤적과 부딪히도록 마우스를 부드럽게 좌우로 미끄러뜨리세요.",
        tips: "타겟의 뒤를 쫓아가지 말고, 타겟이 앞으로 지나갈 공간에 내 몸체를 미리 던져두는 선행 스티어링을 구사하세요."
      },
      {
        name: "리 광학 타우 종단 요격 미세 조종 (Optical Tau Final Interception)",
        desc: "표적 구체와 접촉하기 직전 마지막 100ms 구간에서는 시각적 표적 팽창 속도(τ)에 온 신경을 집중하세요. 미세한 손가락 스냅으로 오차를 최종 수렴시켜 적중 판정을 따냅니다.",
        tips: "표적의 가장자리보다 정중앙 핵을 뚫고 지나간다는 느낌으로 중심점을 관통하세요."
      },
      {
        name: "900 px/s 초고속 접지 반발 케이던스 (Rebound Cadence Maintenance)",
        desc: "착지하는 순간 멈칫거리지 마세요. 바닥에 닿는 순간 즉시 다음 표적을 향한 2차 도약 충전을 개시하여 메트로놈 같은 일정한 템포를 유지하세요.",
        tips: "착지와 동시에 다음 표적의 반대편으로 마우스를 재배치하는 예비 동작을 습관화하세요."
      }
    ]
  },
  steps: [
    "시선과 자세를 바르게 잡고 하단 베이스 도트에 커서를 정렬합니다.",
    "표적의 높이와 속도를 파악하고 마우스 클릭을 유지해 추진력을 충전한 뒤 릴리스합니다.",
    "체공 중 마우스를 좌우로 조향하여 표적의 이동 궤적을 향해 포물선을 수렴시킵니다.",
    "착지 직후 즉각 다음 도약을 연계하여 3.0배 콤보를 유지하며 45초 최고 득점을 달성합니다."
  ],
  audience: "배구, 농구, 축구, 배드민턴 등 점프력과 공중 타이밍을 극대화하려는 운동선수 및 에이펙스, 오버워치 등 공중전이 치열한 하이퍼 FPS 게이머.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('komi2000', 'kawato1999', 'lee1976', 'woodworth1899', 'fitts1954', 'woods2015')
};

export default function JumpSequencePageKo() {
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
      <JumpSequenceClient
        copy={{
          title: "점프 시퀀스 체공 요격 훈련",
          subtitle: "수직 도약 탄도 충전 & 공중 조향 트레이너 • 15레벨",
          rulesTitle: "점프 시퀀스 훈련 규칙 및 점수 체계",
          rules: [
            { title: "도약 충전 및 수직 발사", text: "플레이어 도트 위에서 마우스 클릭을 유지하여 추진력을 충전하고 릴리스하여 발사합니다." },
            { title: "체공 중 공중 궤적 조향", text: "공중에 뜬 상태에서 마우스를 좌우로 움직여 날아오는 동적 표적을 향해 궤적을 조향합니다." },
            { title: "연속 요격 콤보 누적", text: "바닥에 떨어지기 전 표적을 적중시키면 콤보 배율이 최대 3.0배까지 누적되어 고득점을 획득합니다." },
            { title: "착지 미스 시 콤보 리셋", text: "표적을 맞추지 못하고 지면에 착지하면 콤보가 1.0배로 초기화되지만 누적 점수는 보존됩니다." }
          ],
          aboutTitle: "점프 시퀀스 훈련 소개",
          aboutHeading: "신장-단축 주기(SSC)와 체공 포물선 궤적 제어 신경생체역학",
          aboutText: "점프 시퀀스 훈련(Jump Sequence)은 수직 도약 충전, 공중 포물선 궤적 연산, 그리고 비행 표적과의 충돌 시점 예측 능력을 단련하는 과학적 드릴입니다. 파보 코미(2000)의 신장-단축 주기(SSC) 탄성 메커니즘과 카와토 미츠오(1999)의 소뇌 내부 순방향 모델을 기반으로 설계되었으며, 120 px/s에서 900 px/s로 가속되는 표적을 데이비드 리(1976)의 광학 타우 법칙으로 요격하도록 신경계를 적응시킵니다. 농구, 배구의 수직 점프 타이밍과 하이퍼 FPS의 공중 점프샷 정밀도를 비약적으로 향상시킵니다."
        }}
      />
      <DrillGuide guide={jumpGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/fitness/jump-sequence"
          locale="ko"
        />
      </div>
    </>
  );
}
