import SpeedDrillClient from '@/app/drills/physical/fitness/speed-drill/SpeedDrillClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — South Korea (KR / KO)
// Primary Intent: 클릭 속도 측정, 광클 속도 테스트, 마우스 반응속도 테스트, 순발력 테스트 게임
// Korean Gaming/Athletic Context: FPS(발로란트, 배그, 오버워치) 플릭샷 조준 속도 및 단발 광클 연타 측정
// High-Demand, Low-Competition Target Keywords:
//   - "클릭 속도 측정" (Core high-intent click velocity query)
//   - "광클 속도 테스트" (Jitter/rapid clicking test query)
//   - "마우스 반응속도 테스트" (Essential hardware & motor chronometry query)
//   - "단발 광클 테스트" (Single-tap tactical clicking query)
//   - "순발력 테스트 게임" (Browser agility/reaction game query)
//   - "에임 속도 테스트" (Aim speed & target acquisition query)
//   - "에임 반응 속도 테스트" (Aim reaction speed test query)
//   - "마우스 클릭 속도 측정기" (Interactive click tool query)
//   - "타깃 조준 속도 훈련" (Ballistic flick training query)
//   - "수축 표적 요격 드릴" (Shrinking target boundary exercise)
// ============================================================

export const metadata = {
  title: "클릭 속도 측정 & 마우스 반응속도 테스트 – 무료 광클 에임 드릴 | SkillDrills",
  description: "무료 온라인 클릭 속도 측정 및 마우스 반응속도 테스트 드릴. 실시간으로 이동하며 수축하는 타깃을 신속하게 포착하고 고속 연타(광클)를 수행하여 밀리초 단위의 신경근 반응성과 탄도성 플릭 조준력을 단련합니다.",
  keywords: [
    "클릭 속도 측정",
    "광클 속도 테스트",
    "마우스 반응속도 테스트",
    "단발 광클 테스트",
    "순발력 테스트 게임",
    "에임 속도 테스트",
    "에임 반응 속도 테스트",
    "마우스 클릭 속도 측정기",
    "타깃 조준 속도 훈련",
    "수축 표적 요격 드릴"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/physical/fitness/speed-drill',
    languages: getAlternateLanguages('/drills/physical/fitness/speed-drill'),
  },
  openGraph: {
    title: "클릭 속도 측정 & 마우스 반응속도 테스트 – 무료 광클 에임 드릴 | SkillDrills",
    description: "무료 온라인 클릭 속도 측정 및 마우스 반응속도 테스트 드릴. 실시간으로 이동하며 수축하는 타깃을 신속하게 포착하고 고속 연타(광클)를 수행하여 밀리초 단위의 신경근 반응성과 탄도성 플릭 조준력을 단련합니다.",
    url: 'https://skilldrills.online/ko/drills/physical/fitness/speed-drill',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "클릭 속도 측정 & 마우스 반응속도 테스트 – 무료 광클 에임 드릴 | SkillDrills",
    description: "무료 온라인 클릭 속도 측정 및 마우스 반응속도 테스트 드릴. 실시간으로 이동하며 수축하는 타깃을 신속하게 포착하고 고속 연타(광클)를 수행하여 밀리초 단위의 신경근 반응성과 탄도성 플릭 조준력을 단련합니다.",
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
      "name": "클릭 속도 측정 및 광클 반응속도 드릴",
      "item": "https://skilldrills.online/ko/drills/physical/fitness/speed-drill"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "클릭 속도 측정 및 마우스 광클 반응속도 트레이너",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "실시간 수축 타깃을 요격하며 클릭 속도, 탄도성 플릭 반응속도, 연타 지속력을 측정하는 무료 브라우저 트레이너.",
  "url": "https://skilldrills.online/ko/drills/physical/fitness/speed-drill",
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
  "name": "스피드 드릴 조준 반응 웹 앱",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas 및 고속 포인터 입력을 지원하는 최신 브라우저",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/ko/drills/physical/fitness/speed-drill",
  "inLanguage": "ko",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "스피드 드릴: 수축 타깃 광클 에임 게임 (Speed Drill)",
  "url": "https://skilldrills.online/ko/drills/physical/fitness/speed-drill",
  "description": "연속적으로 가속하는 표적의 소멸을 막고 정밀하게 요격하는 반응속도 및 광클 액션 게임.",
  "genre": [
    "Action Game",
    "Aim Trainer",
    "Reflex Game",
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
      "name": "클릭 속도 측정 드릴에서 수축하는 표적 메커니즘이 신경 반응속도 향상에 어떻게 작용하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "표적이 생성된 순간부터 크기가 지속적으로 줄어드는(45px에서 12px) 구조는 피츠의 법칙(Fitts's Law, 1954)에 의해 난이도 지수(ID)가 지수함수적으로 증가합니다. 표적이 소멸하기 전에 타격해야 한다는 시간 압박은 뇌의 운동 피질(Motor Cortex)이 결정을 지체하는 감각 피드백 지연을 억제하고, 즉각적인 개루프(Open-Loop) 탄도성 운동 명령을 근육에 하달하도록 자극합니다."
      }
    },
    {
      "@type": "Question",
      "name": "우드워스(Woodworth, 1899)의 2단계 운동 제어 모델은 고속 플릭 조준에 어떻게 적용되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "로버트 우드워스의 모델에 따르면 빠른 조준 동작은 전체 이동 거리의 약 70~80%를 단숨에 도약하는 '초기 탄도 임펄스(Initial Ballistic Impulse)'와, 표적 경계에 도달하여 마우스를 멈추고 클릭을 수행하는 '종단 전류 제어(Current Control Deceleration)'의 2단계로 나뉩니다. 본 드릴은 상위 레벨에서 속도가 3.8배까지 빨라지므로 종단 감속 구간을 최소화하고 첫 플릭 탄도를 극도로 정밀하게 안착시키는 능력을 발달시킵니다."
      }
    },
    {
      "@type": "Question",
      "name": "트리즈먼(Treisman, 1980)의 시각적 현저성(Visual Saliency)과 암묵적 시선 유도란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "앤 트리즈먼의 특징 통합 이론에 따르면, 고대비로 움직이는 원형 표적은 인간 시각계의 상구(Superior Colliculus)와 두정엽에서 상향식(Bottom-up) 시각 팝아웃 효과를 일으킵니다. 주변 시야에서 표적의 위치를 포착하자마자 안구가 표적으로 이동하기 전에 뇌가 이미 커서의 도약 궤적을 준비하는 암묵적 지향(Covert Orienting)이 활성화되어 타깃 획득 시간을 단축합니다."
      }
    },
    {
      "@type": "Question",
      "name": "발로란트, 배틀그라운드, 오버워치 등 FPS 게임의 단발 광클 및 플릭 에임에 어떻게 전이되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FPS 게임의 돌발 교전에서는 적이 나타났을 때 머뭇거리지 않고 즉각 총구를 갖다 대는 초기 반응과 헤드라인 경계 안에서의 정밀한 격발 타이밍이 승패를 가릅니다. 본 훈련은 무작위 벡터로 튀어나오는 고속 표적에 대응하는 신경 전달 속도를 밀리초 단위로 단련하여, 실전에서의 찰나의 플릭샷과 점사 광클 성공률을 직접적으로 향상시킵니다."
      }
    },
    {
      "@type": "Question",
      "name": "레벨이 상승함에 따라 표적의 이동 속도, 크기 수축률, 난이도는 어떻게 변하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1,750점마다 레벨이 상승하며 최대 15레벨 이상 무제한으로 확장됩니다. 표적의 최대 반경은 45px에서 12px로 급격히 작아지고, 이동 속도는 기본 1.0배에서 최대 3.8배까지 가속하며, 수축 속도 배율 또한 0.6배에서 2.2배 이상으로 빨라집니다. 연속 성공 시 콤보 가열(Streak Heat) 시스템이 추가 적용되어 숙련자에게 극한의 도전을 제공합니다."
      }
    },
    {
      "@type": "Question",
      "name": "표적을 명중시켰을 때 부여되는 0.6초의 시간 연장 보너스는 왜 중요한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "본 훈련의 기본 타이머는 45초로 시작하지만, 표적을 격추할 때마다 남은 시간이 0.6초씩 연장됩니다. 이는 단순한 버티기 게임이 아니라, 빠른 타깃 획득과 3.0배 최대 콤보를 끊임없이 유지함으로써 60초, 90초 이상 세션을 지속시키고 누적 24,000점 이상의 엘리트 점수를 달성할 수 있도록 유도하는 핵심 동기부여 기제입니다."
      }
    },
    {
      "@type": "Question",
      "name": "타깃을 빗맞추거나 수축되어 소멸했을 때 발생하는 페널티는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "표적이 완전히 축소되어 사라지거나 빈 공간을 잘못 클릭하면 쌓아둔 콤보 배수가 즉시 1.0배로 초기화됩니다. 또한 설정에서 페널티를 활성화한 경우, 실수 1회당 0.8초의 시간이 즉각 차감되어 세션 종료 위험이 급격히 커지므로 속도와 정확도 사이의 엄격한 균형 감각을 요구합니다."
      }
    },
    {
      "@type": "Question",
      "name": "고속 광클과 미세 플릭 조준 시 권장되는 마우스 파지법(그립)과 DPI 설정은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "손바닥 전체를 밀착시키는 팜 그립보다는 손가락 끝의 관절 탄성을 활용하는 클로 그립(Claw Grip) 또는 핑거팁 그립(Fingertip Grip)이 권장됩니다. 마우스 감도는 800~1600 DPI 수준으로 설정하여 손목과 전완근이 유기적으로 연동되도록 조절하고, 클릭 시 마우스 센서가 흔들리지 않도록 하판 접지력을 단단히 유지해야 합니다."
      }
    },
    {
      "@type": "Question",
      "name": "모니터 주사율(60Hz vs 144Hz/240Hz)과 마우스 폴링레이트가 광클 측정에 미치는 영향은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "60Hz 모니터는 프레임당 약 16.6ms의 지연이 발생하는 반면, 240Hz 모니터는 4.16ms마다 화면을 갱신합니다. 수축 속도가 2.2배에 달하는 고레벨 표적을 요격할 때 높은 주사율은 표적의 축소 경계를 잔상 없이 선명하게 보여주며, 1,000Hz 이상의 마우스 폴링레이트는 1ms 단위로 격발 좌표를 등록하여 입력 손실을 원천 차단합니다 (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "본 스피드 드릴 훈련에서 수집되는 클릭 속도 및 반응 기록은 안전하게 관리되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "본 서비스는 사용자의 개인정보를 엄격히 보호합니다. 클릭 속도, 명중률, 반응 지연 시간, 최고 콤보 등의 훈련 지표는 외부 서버로 전송되지 않으며, 사용자 기기의 웹 브라우저 로컬 스토리지(LocalStorage)에만 안전하게 암호화 보관되므로 완벽한 프라이버시가 보장됩니다."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "클릭 속도 측정 및 고속 타깃 요격 4단계 과학적 훈련법",
  "description": "우드워스 2단계 플릭 모델과 피츠의 법칙 경계 제어를 활용해 클릭 속도와 마우스 반응속도를 극대화하는 단계별 프로토콜.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "주변 시야 사전 탐색 및 기준점 정렬 (Peripheral Orienting)",
      "text": "화면 중앙에 가볍게 시선을 두고 주변 시야를 개방하여, 표적이 스폰되는 즉시 트리즈먼 상향식 시각 팝아웃 자극을 감지합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/fitness/speed-drill#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "우드워스 1단계 폭발적 탄도 플릭 (Ballistic Initial Impulse)",
      "text": "타깃 위치를 파악하는 즉시 망설임 없이 커서를 표적 방향으로 약 75% 거리만큼 폭발적으로 내던집니다.",
      "url": "https://skilldrills.online/ko/drills/physical/fitness/speed-drill#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "피츠의 수축 경계 안착 및 광클 격발 (Boundary Interception & Click)",
      "text": "표적이 완전히 줄어들기 전 미세한 손가락 관절 감속으로 원형 경계 내부에 커서를 안착시키고 단호하게 클릭을 완료합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/fitness/speed-drill#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "시간 보너스 획득 및 콤보 가열 유지 (Bonus Time & Streak Heat)",
      "text": "명중 시 주어지는 +0.6초를 누적하며 콤보 배수를 3.0배까지 증폭시키고, 45초 기본 클록을 넘어 24,000점 엘리트 스코어를 달성합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/fitness/speed-drill#step-4"
    }
  ]
};

const speedGuide = {
  heading: "클릭 속도 측정 및 고속 타깃 요격 신경생체역학 가이드",
  intro: {
    title: "신경근 반응 속도와 탄도성 플릭 조준 역학의 과학적 원리",
    paragraphs: [
      "스피드 드릴(Speed Drill)은 실시간으로 이동하며 급격히 축소되는 원형 표적을 신속히 포착하고 정확하게 격발하는 고강도 신경근 반응속도 측정 및 훈련 시스템입니다. 빠른 마우스 조준은 로버트 우드워스(Woodworth, 1899)의 2단계 운동 제어 모델을 기반으로 작동합니다. 첫 번째 국면인 개루프(Open-loop) 탄도성 임펄스가 전체 도약 거리의 대부분을 순식간에 커버한 후, 두 번째 국면인 폐루프(Closed-loop) 미세 수정 감속을 통해 표적의 경계면에 정확히 안착합니다.",
      "표적이 생성된 직후부터 크기가 계속해서 수축하는 동적 메커니즘은 피츠의 법칙(Fitts's Law, 1954)이 규정하는 난이도 지수(Index of Difficulty)를 실시간으로 폭발시킵니다. 표적 직경이 45px일 때 격발하는 것과 12px 극소 직경으로 줄어들었을 때 격발하는 것은 뇌가 요구하는 공간적 오차 허용 범위에서 수 배 이상의 차이를 만듭니다. 따라서 시각적 탐색 직후 머뭇거림 없이 즉각 플릭을 개시하는 결단력이 요구됩니다.",
      "표적의 무작위 스폰은 앤 트리즈먼(Treisman & Gelade, 1980)의 특징 통합 이론에 따른 상향식(Bottom-up) 시각 현저성(Visual Saliency)을 자극합니다. 고대비 원형 자극은 망막 주변부에서 뇌의 상구와 두정엽 경로로 전달되어 시선이 도달하기 전에 이미 운동 피질의 발화 준비를 마치는 암묵적 지향(Covert Orienting)을 활성화하며, 데이비드 리(Lee, 1976)의 광학적 타우(τ) 연산을 통해 표적의 소멸 임계 시점을 직관적으로 판별하게 합니다.",
      "밀리초 단위의 초정밀 시간 계측을 위해 본 시스템은 브라우저 performance.now() 고해상도 타이머를 활용합니다. 144Hz 또는 240Hz 고주사율 디스플레이와 1,000Hz 폴링레이트 하드웨어 환경은 프레임 양자화 지연을 4ms 이하로 억제하여 신경 반응의 즉각적인 피드백을 제공합니다 (Woods et al., 2015). 모든 클릭 속도 데이터와 세션 기록은 개인 프라이버시 보호를 위해 전적으로 기기 내에만 보관됩니다."
    ]
  },
  benchmarks: {
    title: "클릭 속도 및 타깃 요격 반응속도 5단계 등급 기준표",
    headers: ["티어 및 등급", "칭호 (Rank Title)", "기준 점수", "명중률 및 반응시간", "종합 랭크", "신경생체역학적 특성"],
    rows: [
      ["Tier 1: 최정상 저격수", "Apex Velocity Sniper", "24,000점 이상", "95% 이상 / < 160ms", "Grade S", "상위 0.1% 프로게이머 수준. 완벽한 우드워스 1단계 탄도 플릭 구사와 수축 12px 표적에 대한 전광석화 같은 요격 능력 (Woodworth 1899; Fitts 1954)"],
      ["Tier 2: 정밀 스트라이커", "Precision Reflex Striker", "17,000 – 23,999점", "90 – 94% / 160 – 190ms", "Grade A", "상위 3% 준프로급 수준. 우수한 암묵적 시선 유도 및 고속 이동 표적(3.0x 이상)에 대한 안정적인 콤보 연타 유지"],
      ["Tier 3: 숙련 인터셉터", "Rapid Target Interceptor", "11,000 – 16,999점", "82 – 89% / 191 – 230ms", "Grade B", "상위 15% 상위권 게이머 수준. 확고한 광클 연타 리듬과 0.6초 시간 연장 보너스를 활용한 장기 세션 생존력 보유"],
      ["Tier 4: 발전형 연타 훈련생", "Developing Tapping Trainee", "6,000 – 10,999점", "70 – 81% / 231 – 280ms", "Grade C", "일반 성인 평균 수준. 표적 속도 2.0x 이상 가속 시 종단 감속 지연으로 인한 외곽 빗맞힘 및 콤보 끊김 발생"],
      ["Tier 5: 초급 조준 입문자", "Novice Target Pointer", "6,000점 미만", "< 70% / > 280ms", "Grade D", "조준 입문자 baseline. 표적 소멸 직전 당황한 헛클릭 빈발. 시선 중심을 화면 중앙에 두고 주변 시야를 넓히는 훈련 권장"]
    ],
    note: "우드워스 운동 분해 모델(Woodworth 1899), 피츠의 난이도 법칙(Fitts 1954), 트리즈먼 시각 현저성 이론(Treisman 1980)에 기반한 객관적 신경근 성능 벤치마크입니다."
  },
  techniques: {
    title: "클릭 속도 및 마우스 플릭 반응속도 극대화 4대 실전 프로토콜",
    items: [
      {
        name: "우드워스 1단계 폭발적 탄도 플릭 (Woodworth Ballistic Snap)",
        desc: "표적이 시야에 들어오는 즉시 머뭇거리며 천천히 커서를 끌어당기지 마십시오. 전체 도약 거리의 75%를 번개처럼 빠르게 낚아채듯 던지고, 표적 반경에 들어서는 찰나에만 손가락 끝으로 미세 감속을 가하십시오.",
        tips: "마우스 패드 위에서 손목을 축으로 가볍게 스냅을 튀기며 첫 움직임의 탄속을 극대화하세요."
      },
      {
        name: "피츠의 법칙 수축 경계 선제 격발 (Fitts Boundary Pre-Interception)",
        desc: "표적이 작아질 때까지 기다릴수록 명중 난이도(ID)는 기하급수적으로 치솟습니다. 표적이 가장 크게 팽창해 있는 스폰 후 150ms 이내에 과감하게 클릭을 실행하여 시간 손실과 조준 부담을 줄이십시오.",
        tips: "표적 중심부만을 완벽하게 맞추려 하지 말고, 수축하기 전 넉넉한 외곽 경계면을 신속히 선점하세요."
      },
      {
        name: "트리즈먼 주변 시야 암묵적 지향 (Treisman Covert Peripheral Awareness)",
        desc: "시선을 특정 한 지점에 고정하면 반대편에 생성된 타깃을 놓치게 됩니다. 모니터 정중앙에 초점을 부드럽게 풀고 주변 시야의 움직임 감지 센서를 개방하여, 팝아웃 자극에 무의식적으로 손이 반응하게 만드십시오.",
        tips: "안구를 먼저 돌린 뒤 마우스를 움직이는 것이 아니라, 눈과 마우스가 거의 동시에 튀어나가는 감각을 훈련하세요."
      },
      {
        name: "클로 그립 기반 고주파 단발 광클 (Claw-Grip High-Frequency Tapping)",
        desc: "손바닥을 패드에 완전히 얹으면 고속 연타 시 관절 간섭이 발생합니다. 손가락을 아치형으로 세운 클로 그립이나 핑거팁 그립을 유지하고, 스위치 복귀 반발력을 이용해 프리 트래블을 최소화한 연타를 수행하십시오.",
        tips: "클릭할 때 손목 전체에 불필요한 힘을 주지 말고 검지 둘째 마디의 탄성만을 스프링처럼 튕기세요."
      }
    ]
  },
  steps: [
    "바른 자세로 착석하고 마우스 커서를 화면 중앙에 가볍게 대기시킵니다.",
    "화면 어디선가 표적이 스폰되는 즉시 폭발적인 플릭으로 표적 경계 내로 이동합니다.",
    "표적이 축소 소멸하기 전에 정밀하게 클릭하여 점수와 +0.6초 보너스를 획득합니다.",
    "연속 성공으로 콤보를 3.0배까지 누적하고 최고 점수 24,000점 이상에 도전합니다."
  ],
  audience: "발로란트, 배그, 에이펙스, 오버워치 등에서 플릭샷과 광클 연타 속도를 극대화하려는 게이머 및 손-눈 협응 순발력을 단련하려는 모든 분.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('woodworth1899', 'fitts1954', 'treisman1980', 'lee1976', 'woods2015')
};

export default function LocalizedSpeedDrillPageKo() {
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
      <SpeedDrillClient
        copy={{
          title: "클릭 속도 측정 & 마우스 반응속도 테스트",
          subtitle: "수축하는 표적 요격 및 탄도성 플릭 광클 • 15단계 난이도 스케일링",
          hudLabels: {
            score: "현재 점수",
            time: "남은 시간",
            bestScore: "최고 점수",
            bestCombo: "최대 콤보"
          },
          rulesTitle: "드릴 진행 규칙 및 점수 산정 체계",
          rulesItems: [
            { title: "타깃 요격 및 시간 연장", text: "표적이 완전히 축소되어 사라지기 전에 클릭하여 요격하십시오. 성공 시마다 100점(콤보 및 레벨 배수 적용)과 0.6초의 추가 시간이 주어집니다." },
            { title: "콤보 승수 증폭", text: "실수 없이 표적을 연속 격추하면 콤보 배율이 최대 3.0배까지 가파르게 상승합니다." },
            { title: "점진적 난이도 상향", text: "1,750점 획득마다 레벨이 상승하며, 표적의 비행 속도와 축소 가속도가 지속적으로 극대화됩니다." },
            { title: "표적 소멸 및 빗맞힘 페널티", text: "표적이 사라지거나 허공을 클릭하면 콤보가 즉시 초기화되며, 페널티 활성화 시 0.8초의 시간이 차감됩니다." }
          ],
          aboutTitle: "스피드 드릴 및 신경근 반응속도 생체역학",
          aboutSections: [
            {
              title: "탄도성 모터 플릭과 밀리초 타깃 획득",
              subtitle: "우드워스(Woodworth, 1899) 2단계 운동 제어 모델의 극한 속도 구현",
              content: "신속한 타깃 획득은 초기 폭발적 개루프 임펄스와 종단 미세 수정 감속으로 구성됩니다. 레벨이 올라갈수록 감속 구간이 극도로 압축되어 본능적인 플릭 능력이 요구됩니다."
            },
            {
              title: "수축하는 공간 경계와 피츠의 법칙(Fitts's Law)",
              subtitle: "표적 축소에 따른 난이도 지수(ID)의 지수함수적 상승",
              content: "표적 직경이 45px에서 12px로 줄어들수록 공간 허용 오차가 극도로 좁아집니다. 초기에 신속히 격발하는 결단력이 엘리트 점수의 핵심입니다."
            },
            {
              title: "시각적 현저성과 주변 시야 상향식 감지",
              subtitle: "트리즈먼(Treisman, 1980) 특징 통합 이론 기반 암묵적 지향",
              content: "고대비 이동 자극은 망막 주변부에서 뇌의 상구 경로를 자극하여, 시선이 표적에 닿기 전에 커서의 도약 준비를 마치는 빠른 반응을 유도합니다."
            },
            {
              title: "광학적 타우(τ)와 표적 소멸 접촉 여유 시간",
              subtitle: "데이비드 리(Lee, 1976) 망막 팽창 및 수축 역학 연산",
              content: "뇌는 표적 경계면의 수축 속도 역수(τ)를 직관적으로 감지하여 소멸 잔여 시간을 계산합니다. 섣부른 조급함이나 치명적 지체를 방지하는 기초가 됩니다."
            }
          ]
        }}
      />
      <DrillGuide {...speedGuide} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/fitness/speed-drill" />
    </>
  );
}
