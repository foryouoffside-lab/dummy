import MotorSequencingClient from '@/app/drills/physical/fitness/agility-ladder/MotorSequencingClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — South Korea (KR / KO)
// Primary Intent: 스텝레더 훈련, 민첩성 사다리운동, 순발력 민첩성 운동, 풋워크 훈련
// Korean Context: 축구/복싱/배드민턴 풋워크 스텝 사다리 훈련 & FPS 카운터 스트레이핑 리듬
// High-Demand, Low-Competition Target Keywords:
//   - "스텝레더 훈련" (High-intent athletic agility ladder search)
//   - "민첩성 사다리운동" (Core school/fitness agility ladder query)
//   - "순발력 민첩성 운동" (Explosiveness and nimbleness training)
//   - "풋워크 훈련" (Footwork training drill)
//   - "스텝레더 운동법" (Ladder exercise technique guide)
//   - "스피드 레더 훈련" (Speed ladder speed query)
//   - "풋워크 드릴" (Athletic coordination drills)
//   - "카운터 스트레이핑" (Counter-strafing rhythm transfer)
//   - "양측성 운동 협응" (Bilateral motor coordination)
//   - "사다리 스텝 훈련" (Ladder step workout)
// ============================================================

export const metadata = {
  title: "스텝레더 훈련 & 민첩성 사다리운동 – 무료 풋워크 시퀀싱 드릴 | SkillDrills",
  description: "무료 온라인 스텝레더 훈련 및 민첩성 사다리운동 드릴. 하강하는 4단 격자 스텝을 좌우 교대로 리드미컬하게 통과하며 양측성 운동 시퀀싱, 발놀림 풋워크 박자감, 카운터 스트레이핑 순발력을 과학적으로 단련합니다.",
  keywords: [
    "스텝레더 훈련",
    "민첩성 사다리운동",
    "순발력 민첩성 운동",
    "풋워크 훈련",
    "스텝레더 운동법",
    "스피드 레더 훈련",
    "풋워크 드릴",
    "카운터 스트레이핑",
    "양측성 운동 협응",
    "사다리 스텝 훈련"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/physical/fitness/agility-ladder',
    languages: getAlternateLanguages('/drills/physical/fitness/agility-ladder'),
  },
  openGraph: {
    title: "스텝레더 훈련 & 민첩성 사다리운동 – 무료 풋워크 시퀀싱 드릴 | SkillDrills",
    description: "무료 온라인 스텝레더 훈련 및 민첩성 사다리운동 드릴. 하강하는 4단 격자 스텝을 좌우 교대로 리드미컬하게 통과하며 양측성 운동 시퀀싱, 발놀림 풋워크 박자감, 카운터 스트레이핑 순발력을 과학적으로 단련합니다.",
    url: 'https://skilldrills.online/ko/drills/physical/fitness/agility-ladder',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "스텝레더 훈련 & 민첩성 사다리운동 – 무료 풋워크 시퀀싱 드릴 | SkillDrills",
    description: "무료 온라인 스텝레더 훈련 및 민첩성 사다리운동 드릴. 하강하는 4단 격자 스텝을 좌우 교대로 리드미컬하게 통과하며 양측성 운동 시퀀싱, 발놀림 풋워크 박자감, 카운터 스트레이핑 순발력을 과학적으로 단련합니다.",
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
      "name": "스텝레더 훈련 & 민첩성 사다리운동",
      "item": "https://skilldrills.online/ko/drills/physical/fitness/agility-ladder"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "스텝레더 훈련 & 민첩성 사다리운동 드릴",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "하강하는 격자 사다리 발판을 좌우 교대로 정확히 밟아 넘기는 양측성 운동 시퀀싱 및 풋워크 리듬 훈련 도구.",
  "url": "https://skilldrills.online/ko/drills/physical/fitness/agility-ladder",
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
  "name": "스텝레더 훈련 웹 애플리케이션",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas 및 마우스 포인터 락을 지원하는 최신 웹 브라우저",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/ko/drills/physical/fitness/agility-ladder",
  "inLanguage": "ko",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "민첩성 사다리 시퀀싱 게임 (Agility Ladder)",
  "url": "https://skilldrills.online/ko/drills/physical/fitness/agility-ladder",
  "description": "스크롤하는 사다리의 발판을 좌우로 교대 통과하며 순발력과 발놀림 리듬을 단련하는 무료 브라우저 트레이너.",
  "genre": [
    "Fitness Game",
    "Coordination",
    "Rhythm Game",
    "Agility"
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
      "name": "스텝레더 훈련(사다리운동)을 마우스 커서로 연습하는 것이 실제 풋워크 민첩성 향상에 도움이 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, 매우 큰 도움이 됩니다. 인간의 운동 제어 체계는 손과 발의 근육을 작동시킬 때 대뇌 피질, 기저핵, 소뇌로 구성된 동일한 신경 운동 회로를 활용합니다. 화면에서 하강하는 격자 발판을 좌우로 일정한 메트로놈 박자에 맞추어 가로지르는 훈련은 뇌의 시간적 리듬 동기화(Temporal Cadence) 능력을 강화하여 실제 지면에서의 순발력과 스텝 전환 반응을 직접적으로 개선합니다."
      }
    },
    {
      "@type": "Question",
      "name": "칼 래슐리(Karl Lashley, 1951)의 직렬 운동 순서화와 하위 동작 청킹 이론이란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "칼 래슐리는 초고속 연속 운동이 감각 피드백에 의해 단계별로 제어되는 것이 아니라, 운동 개시 전에 뇌에서 일괄 프로그램된 '운동 묶음(Motor Chunk)' 형태로 실행된다는 점을 증명했습니다. 사다리의 4개 발판(좌-우-좌-우)을 낱개의 스텝으로 반응하면 시각 지연으로 실패하지만, 4스텝 단일 궤적으로 뇌에 사전 프로그래밍하면 750 px/s의 초고속 구간에서도 무결점 통과가 가능해집니다."
      }
    },
    {
      "@type": "Question",
      "name": "리처드 슈미트(Schmidt, 1975)의 일반화 운동 프로그램(GMP)에서 상대적 타이밍 불변성이란?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "일반화 운동 프로그램(GMP) 이론에 따르면, 운동 기술의 숙련자는 전체 동작 속도가 150 px/s에서 750 px/s로 5배 빨라지더라도 각 발판을 터치하는 시간 간격의 비율(1:1:1:1)을 일정하게 유지합니다. 즉, 서두르며 불규칙하게 손을 떠는 대신 전체 출력 강도(Parameter)만 증폭시켜 고유한 리듬 구조를 불변으로 유지하는 것이 핵심입니다."
      }
    },
    {
      "@type": "Question",
      "name": "발로란트나 카운터스트라이크 2(CS2) 같은 FPS 게임의 카운터 스트레이핑에 어떻게 기여하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FPS 게임의 핵심 무빙 기술인 카운터 스트레이핑(A/D 키 전환)과 피킹은 정확한 정지 반동 제어와 좌우 박자 전환 능력을 요구합니다. 본 드릴에서 하강하는 발판을 좌우로 날카롭게 교대 요격하는 메커니즘은 교전 중 불규칙한 손목 흔들림을 없애고 헤드라인 앵글을 매끄럽게 클리어하는 메트로놈 박자 감각을 완성시킵니다."
      }
    },
    {
      "@type": "Question",
      "name": "레벨이 상승함에 따라 사다리 하강 속도와 발판 판정 범위는 어떻게 변화하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "매 250점을 획득할 때마다 레벨이 상승하여 최대 15레벨까지 진행됩니다. 사다리의 하강 속도는 초기 150 px/s에서 최고 750 px/s까지 가속되며, 발판의 접촉 허용 범위(히트박스)는 18px에서 10px로 점진 축소됩니다. 레벨 4 이상에서는 좌우 변위가 무작위로 추가되어 순발력 요격 난이도가 극대화됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "사다리 발판을 놓치거나 사다리가 화면 아래로 벗어나면 어떤 페널티를 받나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "발판을 건너뛰거나 사다리가 화면 아래로 빠져나가면 콤보 승수만 1.0배로 초기화되며 붉은 시각 플래시가 번쩍입니다. 이미 획득한 누적 점수나 45초 전체 세션 시간은 차감되지 않으므로, 실패에 대한 두려움 없이 과감하게 고속 플릭을 시도할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "본 스텝레더 훈련 시 추천하는 마우스 감도(eDPI)와 파지법은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "사다리의 좌우 폭(약 80px)을 빠르고 민첩하게 왕복해야 하므로, 손목 전체를 과도하게 흔들지 않고 손가락 관절과 손목 스냅으로 미세 전환이 가능한 클로 그립(Claw Grip)이나 핑거팁 그립(Fingertip Grip)이 가장 유리합니다. 감도는 마우스패드 중앙에서 가벼운 핑거 스냅으로 좌우 80px을 주파할 수 있는 중감도 설정을 권장합니다."
      }
    },
    {
      "@type": "Question",
      "name": "사다리 하강 속도가 매우 빠를 때 시선을 어디에 두어야 실패를 방지할 수 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "개별 발판을 눈동자로 일일이 따라가면 안구 도약(Saccade)에 30~50ms의 지각 지연이 발생합니다. 시선을 사다리가 내려오는 중앙 가상 중심선에 부드럽게 고정(Decentralized Gaze)하고, 주변시를 통해 양쪽 발판의 하강 위치를 한눈에 파악하면서 손을 기계적으로 반응시키는 것이 최선의 공략법입니다."
      }
    },
    {
      "@type": "Question",
      "name": "디스플레이 주사율(60Hz vs 144Hz/240Hz)이 요격 정확도에 어떤 영향을 미치나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "사다리가 750 px/s로 이동할 때 60Hz 모니터에서는 프레임당 약 12.5px의 위치 비약(텔레포트 현상)이 발생하여 10px 크기의 작은 발판을 스쳐 지나치기 쉽습니다. 반면 144Hz(5.2px)나 240Hz(3.1px) 게이밍 모니터는 매우 매끄러운 궤적을 렌더링하여 폴 피츠(Fitts, 1954)의 요격 법칙에 따른 정확한 타격을 가능하게 합니다."
      }
    },
    {
      "@type": "Question",
      "name": "본 드릴을 진행하는 동안 개인 기기의 조준 기록이나 운동 데이터가 외부로 수집되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "아닙니다. SkillDrills의 모든 연산, 프레임 보간, 콤보 계산은 사용자의 로컬 브라우저 내부에서 performance.now() API를 통해 100% 클라이언트 사이드로 실행됩니다. 사용자의 최고 점수와 콤보 기록은 브라우저의 localStorage에만 암호화 보관되며, 어떠한 움직임 데이터도 외부 서버로 전송되지 않습니다."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "스텝레더 훈련 및 민첩성 사다리운동 4단계 실전 프로토콜",
  "description": "하강하는 격자 사다리의 발판을 좌우 교대로 완벽히 밟아 넘기며 양측성 운동 시퀀싱과 리듬 순발력을 단련하는 체계적 방법.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "중앙 축선 시선 정렬 및 조준선 락",
      "text": "시작 버튼을 클릭하여 포인터 락을 켜고, 시선을 화면 중앙 수직 축선에 둔 채 첫 번째 사다리의 하강을 맞이합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/fitness/agility-ladder#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "1번 발판 요격 및 좌우 교대 진입",
      "text": "사다리 최상단 좌측 1번 발판으로 마우스를 날카롭게 스냅하여 통과한 뒤, 즉시 우측 2번 발판으로 방향을 전환합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/fitness/agility-ladder#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "4스텝 일괄 완성 및 탈출",
      "text": "3번(좌측), 4번(우측) 발판까지 단 한 번의 머뭇거림 없는 단일 리듬 청크로 통과하여 사다리 클리어 녹색 체크를 활성화합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/fitness/agility-ladder#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "3.0배 최대 콤보 누적 및 가속 돌파",
      "text": "연속 사다리 완성을 유지하여 콤보 배율을 3.0배까지 끌어올리고, 750 px/s 초고속 레벨 15 구간까지 45초 동안 생존합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/fitness/agility-ladder#step-4"
    }
  ]
};

const ladderGuide = {
  heading: "스텝레더 훈련 및 직렬 운동 시퀀싱 생체역학 가이드",
  subtitle: "래슐리 직렬 운동 순서화, 슈미트 일반화 운동 프로그램(GMP), 피츠 요격 법칙에 기반한 풋워크 순발력 훈련론",
  intro: [
    "스텝레더 훈련(Agility Ladder Drill)은 육상, 축구, 복싱 등 최고 수준의 엘리트 스포츠 현장에서 민첩성과 발놀림(풋워크) 순발력을 극대화하기 위해 활용되는 대표적인 협응 훈련 기법입니다. 본 디지털 트레이너는 지면의 사다리를 화면 속 수직 스크롤 매트릭스로 재해석하여, 하강하는 4단 격자 발판을 좌우 교대로 번개처럼 왕복 통과하는 양측성 운동 시퀀싱(Bilateral Motor Sequencing) 신경계를 정밀 훈련합니다.",
    "인지생체역학의 선구자 칼 래슐리(Karl Lashley, 1951)의 '직렬 순서화 이론(The Problem of Serial Order in Behavior)'에 따르면, 빠르게 연속되는 운동은 매 동작마다 감각 피드백을 수신하여 반응하는 것이 불가능합니다. 플레이어의 운동 피질은 사다리의 4개 스텝(좌-우-좌-우)을 개별 자극이 아닌 하나의 통합된 '하위 운동 청크(Sub-Movement Chunk)'로 사전 프로그래밍하여 단숨에 방출해야만 속도 지연을 극복할 수 있습니다.",
    "리처드 슈미트(Richard A. Schmidt, 1975)의 '일반화 운동 프로그램(GMP)' 연구는 숙련된 운동 기술자가 속도 변화 속에서도 상대적 시간 불변성(Invariant Relative Timing)을 유지한다는 점을 밝혔습니다. 사다리 스크롤 속도가 150 px/s에서 750 px/s로 급상승하더라도, 좌우 왕복 비율(1:1:1:1)을 흐트러뜨리지 않고 일정한 박자(Cadence)를 유지하는 능력이 바로 순발력과 스트레이핑 안정성을 가르는 핵심 기준입니다.",
    "측정 정밀도 및 하드웨어 안내: 본 드릴은 브라우저의 performance.now() 고해상도 타이머를 활용하여 클라이언트 기기 내부에서 밀리초 단위로 연산됩니다. 디스플레이 주사율(60Hz 16.7ms / 144Hz 6.9ms / 240Hz 4.1ms) 및 마우스 폴링레이트(125Hz vs 1000Hz)에 따라 물리적 지연 차이가 발생할 수 있으므로, 5ms 미만의 오차는 측정 노이즈로 감안하시기 바랍니다. 모든 기록은 브라우저에만 안전하게 저장됩니다."
  ],
  benchmarks: {
    title: "스텝레더 및 양측성 모터 시퀀싱 5단계 표준 벤치마크",
    headers: ["티어 및 등급", "칭호 (Rank Title)", "점수 기준치", "도달 레벨", "최고 스크롤 속도", "신경생체역학 운동 프로필"],
    rows: [
      ["Tier 1: 최정상 레더 마스터", "Apex Ladder Master", "17,000점 이상", "Level 12 – 15", "600 – 750 px/s", "상위 0.1% 수준의 완벽한 래슐리 4스텝 청킹 및 750 px/s 초고속 무결점 메트로놈 박자 유지 (Lashley 1951; Schmidt 1975)"],
      ["Tier 2: 엘리트 리듬 스프린터", "Elite Rhythm Sprinter", "13,000 – 16,999점", "Level 9 – 11", "480 – 599 px/s", "상위 3% 수준의 뛰어난 양측성 교대 속도, 10~12px 축소 발판에서의 안정적인 피츠 요격 감속 궤적 구현"],
      ["Tier 3: 숙련된 스텝 시퀀서", "Proficient Step Sequencer", "9,500 – 12,999점", "Level 6 – 8", "350 – 479 px/s", "경쟁전 상위권 게이머 및 운동선수 수준, 우수한 좌우 왕복 풋워크 리듬과 안정적인 손목 스냅 제어"],
      ["Tier 4: 중간 케이던스 습득자", "Intermediate Cadence Learner", "6,000 – 9,499점", "Level 3 – 5", "230 – 349 px/s", "일반 성인의 평균 반응 수준, 스크롤 속도 350 px/s 초과 시 시각 피드백 병목으로 인한 발판 스킵 빈발"],
      ["Tier 5: 입문 사다리 도전자", "Novice Rung Climber", "6,000점 미만", "Level 1 – 2", "< 230 px/s", "단계별 반응으로 인한 리듬 단절 및 발판 히트박스 오버슈트 빈발, 중앙 축 고정 및 청킹 훈련 요망"]
    ],
    note: "직렬 운동 순서화 이론(Lashley 1951), 일반화 운동 프로그램(Schmidt 1975), 피츠 요격 모델(Fitts 1954)에 기반한 표준 척도입니다."
  },
  techniques: {
    title: "스텝레더 순발력 및 모터 시퀀싱 실전 프로토콜",
    items: [
      {
        name: "래슐리 4스텝 원모터 청킹 (Lashley Serial Chunking)",
        desc: "사다리의 4개 발판을 1개씩 보고 반응하려 하지 마세요. '좌-우-좌-우' 4번의 횡단 운동을 하나의 완성된 춤 동작처럼 뇌에 통째로 장전한 뒤, 1번 발판 터치와 동시에 연속 스윙으로 방출하세요.",
        tips: "발판 사이마다 멈칫거리는 감각 피드백 검사를 과감히 생략하고, 하나의 연속된 '지그재그 곡선'으로 커서를 흘려보내세요."
      },
      {
        name: "슈미트 상대적 박자 불변성 제어 (GMP Invariant Rhythm)",
        desc: "사다리 하강 속도가 올라간다고 해서 박자를 쪼개거나 당황하지 마세요. 각 발판을 두드리는 상대적 시간 간격은 1:1:1:1로 고정하고, 손목의 전체 진폭 힘만 균등하게 높이세요.",
        tips: "마음속으로 '하나-둘-셋-넷' 메트로놈 카운트를 일정한 비트로 유지하며 스윙 속도만 동기화하세요."
      },
      {
        name: "피츠 하향 변위 보정 요격 궤적 (Moving Target Interception)",
        desc: "사다리가 아래로 스크롤하므로 발판의 현재 위치를 노리면 조준선이 허공을 가릅니다. 이동 시간 동안 발판이 내려앉을 예상 지점을 향해 약간 아래쪽 사선 각도로 요격 커브를 그리세요.",
        tips: "발판의 정중앙보다 2~3px 아래쪽 경계면을 겨냥하고 진입하면 하강 속도에 의해 정확히 중앙에 안착합니다."
      },
      {
        name: "750 px/s 초고속 구간 중앙 축선 탈초점 페이싱 (Metronomic Fixation)",
        desc: "레벨 10 이상 550 px/s를 넘어서면 커서나 발판을 눈으로 쫓는 순간 시각 처리가 마비됩니다. 시선을 중앙 수직선에 두고 시야를 부드럽게 개방하세요.",
        tips: "좌우 발판의 번쩍임을 주변시로 느끼며 손목의 주기적 진동 운동만으로 사다리를 통과시키세요."
      }
    ]
  },
  steps: [
    "시선과 자세를 바르게 잡고 커서를 3x3 격자 중앙 축선에 위치시킵니다.",
    "첫 번째 사다리가 하강하면 최상단 1번 발판(좌측)을 향해 첫 탄도 스냅을 시도합니다.",
    "2번(우), 3번(좌), 4번(우) 발판을 하나의 리듬 청크로 빠르게 교대 관통합니다.",
    "연속 사다리 클리어로 3.0배 콤보를 유지하며 45초 동안 최고 득점을 기록합니다."
  ],
  audience: "축구, 농구, 배드민턴, 복싱 풋워크 순발력을 높이고자 하는 운동선수 및 발로란트/CS2 카운터 스트레이핑과 정밀 헤드라인 무빙을 완성하고자 하는 FPS 게이머.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('lashley1951', 'schmidt1975', 'fitts1954', 'woodworth1899', 'woods2015')
};

export default function AgilityLadderPageKo() {
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
      <MotorSequencingClient
        copy={{
          title: "스텝레더 훈련 & 민첩성 사다리운동",
          subtitle: "양측성 모터 시퀀싱 & 리듬 풋워크 트레이너 • 15레벨",
          rulesTitle: "스텝레더 훈련 규칙 및 점수 체계",
          rules: [
            { title: "4단 발판 순차 통과", text: "하강하는 사다리의 발판을 좌우 교대 순서(1→2→3→4)에 맞추어 정확히 가로지릅니다." },
            { title: "콤보 승수 누적", text: "사다리를 연속으로 클리어하면 콤보 배율이 최대 3.0배까지 누적되어 폭발적인 점수를 획득합니다." },
            { title: "속도 가속 및 판정 축소", text: "매 250점마다 레벨이 상승하며 사다리 스크롤 속도가 빨라지고 발판 히트박스가 좁아집니다." },
            { title: "미스 발생 시 콤보 리셋", text: "발판을 건너뛰거나 사다리를 놓치면 콤보가 1.0배로 초기화되지만 세션 시간은 줄어들지 않습니다." }
          ],
          aboutTitle: "스텝레더 훈련 소개",
          aboutHeading: "양측성 모터 시퀀싱과 리듬 제어 신경생체역학",
          aboutText: "스텝레더 훈련(Motor Sequencing)은 신체 민첩성, 양측성 협응력, 그리고 리드미컬한 운동 패턴 실행 능력을 단련하는 과학적 드릴입니다. 칼 래슐리(1951)의 직렬 순서화 원리와 리처드 슈미트(1975)의 일반화 운동 프로그램(GMP)을 토대로 개발되었으며, 스크롤 속도가 150 px/s에서 750 px/s로 가속되는 환경 속에서 완벽한 시간적 박자 불변성을 유지하도록 신경계를 훈련합니다. 발로란트 및 카운터스트라이크 2(CS2) 카운터 스트레이핑 무빙 밸런스를 획기적으로 개선합니다."
        }}
      />
      <DrillGuide guide={ladderGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/fitness/agility-ladder"
          locale="ko"
        />
      </div>
    </>
  );
}
