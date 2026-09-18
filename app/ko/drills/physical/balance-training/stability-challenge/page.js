import StabilityChallengeClient from '@/app/drills/physical/balance-training/stability-challenge/StabilityChallengeClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — South Korea (KR / KO)
// Primary Intent: 마우스 흔들림 보정, 에임 흔들림 방지, 마우스 손떨림 및 균형감각 테스트
// Target Queries:
//   - "마우스 흔들림 보정" (High-intent mouse shake/jitter correction)
//   - "에임 흔들림" / "발로란트 에임 흔들림" (Aim jitter & recoil displacement)
//   - "마우스 커서 흔들림" (Cursor tremor & steadiness)
//   - "온라인 균형감각 테스트" (Online balance & equilibrium test)
//   - "마우스 에임 제동력 훈련" (Mouse braking & counter-resistance training)
// ============================================================

export const metadata = {
  title: "마우스 흔들림 보정 & 에임 안정성 테스트 – 무료 균형 감각 훈련 | SkillDrills",
  description: "무료 온라인 마우스 흔들림 보정 및 에임 안정성 테스트. 무작위 외력과 바람 저항 벡터에 맞서 크로스헤어를 안전 구역 중앙에 유지하며 신경근 제동력과 자세 평형 감각을 과학적으로 단련합니다.",
  keywords: [
    "마우스 흔들림 보정",
    "에임 흔들림",
    "마우스 커서 흔들림",
    "온라인 균형감각 테스트",
    "마우스 에임 안정성",
    "마우스 제동력 훈련",
    "발로란트 에임 흔들림",
    "반동 제어 훈련",
    "마우스 손떨림 보정",
    "외력 저항 에임 훈련"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/physical/balance-training/stability-challenge',
    languages: getAlternateLanguages('/drills/physical/balance-training/stability-challenge'),
  },
  openGraph: {
    title: "마우스 흔들림 보정 & 에임 안정성 테스트 – 무료 균형 감각 훈련 | SkillDrills",
    description: "무료 온라인 마우스 흔들림 보정 및 에임 안정성 테스트. 무작위 외력과 바람 저항 벡터에 맞서 크로스헤어를 안전 구역 중앙에 유지하며 신경근 제동력과 자세 평형 감각을 과학적으로 단련합니다.",
    url: 'https://skilldrills.online/ko/drills/physical/balance-training/stability-challenge',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "마우스 흔들림 보정 & 에임 안정성 테스트 – 무료 균형 감각 훈련 | SkillDrills",
    description: "무료 온라인 마우스 흔들림 보정 및 에임 안정성 테스트. 무작위 외력과 바람 저항 벡터에 맞서 크로스헤어를 안전 구역 중앙에 유지하며 신경근 제동력과 자세 평형 감각을 과학적으로 단련합니다.",
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
      "name": "균형 감각 훈련",
      "item": "https://skilldrills.online/ko/drills/physical/balance-training"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "마우스 흔들림 보정 & 에임 안정성 테스트",
      "item": "https://skilldrills.online/ko/drills/physical/balance-training/stability-challenge"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "마우스 흔들림 보정 & 에임 안정성 테스트",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "무작위 외력 벡터와 바람 저항에 맞서 크로스헤어를 정밀하게 유지하는 무료 온라인 마우스 안정성 및 신체 균형 감각 측정 도구.",
  "url": "https://skilldrills.online/ko/drills/physical/balance-training/stability-challenge",
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
  "name": "마우스 흔들림 보정 & 에임 안정성 트레이너",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires HTML5 Canvas and JavaScript enabled browser with Pointer Lock support",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/ko/drills/physical/balance-training/stability-challenge",
  "inLanguage": "ko",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "안정성 챌린지 - 마우스 흔들림 보정 훈련",
  "url": "https://skilldrills.online/ko/drills/physical/balance-training/stability-challenge",
  "description": "무작위 외력 벡터와 바람 저항에 맞서 조준선을 중앙 원에 유지하는 마우스 정밀 제어 및 FPS 반동 억제 게임.",
  "genre": [
    "Action",
    "Precision Drill",
    "Balance Training",
    "Motor Control"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop"
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
      "name": "마우스 흔들림 보정 테스트는 어떤 신경근 능력을 평가하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "외력에 대항하여 커서를 일정 구역 내에 고정시키는 자세 평형 제어력(Postural Equilibrium)과 길항근 동시 수축(Antagonist Co-contraction), 그리고 150~200ms 주기로 발생하는 고주파 시각 피드백 미세 보정 능력을 정밀하게 평가합니다."
      }
    },
    {
      "@type": "Question",
      "name": "동적 외력(바람 저항) 벡터는 게임 내에서 어떻게 작동하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "훈련이 진행되는 동안 무작위 크기와 각도를 가진 물리적 가속도 벡터가 조준선을 중심에서 지속적으로 밀어냅니다. 플레이어는 이 힘을 상쇄하기 위해 반대 방향으로 부드럽고 일정한 힘의 역보정 마우스 입력을 유지해야 합니다."
      }
    },
    {
      "@type": "Question",
      "name": "자세 평형 감각과 외력 저항의 생체역학적 원리는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "내쉬너와 맥콜럼(Nashner & McCollum, 1985)의 자세 시너지 모델과 데이비드 윈터(Winter, 1995)의 균형 제어 이론에 기반합니다. 신경계는 예상치 못한 섭동(외력)이 발생할 때 관절 토크를 신속히 조절하여 질량 중심이 지지 기반 밖으로 이탈하는 것을 차단합니다."
      }
    },
    {
      "@type": "Question",
      "name": "15단계 난이도 상승에 따라 안전 구역과 외력 강도는 어떻게 변화하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "매 250점마다 난이도 레벨이 상승합니다. 중앙 안전 구역의 반경은 초기 45픽셀에서 20픽셀까지 좁아지며, 외력의 밀어내는 힘은 250단위에서 최대 850단위까지 가속되어 극도의 마이크로 에임 제어를 요구합니다."
      }
    },
    {
      "@type": "Question",
      "name": "크로스헤어가 안전 구역을 벗어나면 어떤 페널티가 발생하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "안전 구역 밖으로 이탈하면 화면 테두리에 붉은색 경고 플래시가 점멸하며 활성화된 콤보 배율이 즉시 1.0배로 초기화됩니다. 다만 누적 점수나 세션 제한 시간(45초)은 깎이지 않아 즉각적인 궤도 재진입이 가능합니다."
      }
    },
    {
      "@type": "Question",
      "name": "우드워스의 폐루프 제어 모델은 연속적인 에임 유지에 어떻게 적용되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "로버트 우드워스(Woodworth, 1899)는 표적 지향 운동이 초기 탄도 충동 후 연속적인 전류 피드백 제어로 완성된다고 규명했습니다. 본 드릴에서는 실시간 시각 피드백을 통해 찰나의 순간마다 미세 오차를 수정하는 폐루프 제어력이 발휘됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "이 훈련이 발로란트, CS2, 에이펙스의 반동 제어(리코일 컨트롤)에 어떤 도움을 주나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FPS 게임의 총기 반동 패턴은 조준선을 일정한 벡터로 밀어올립니다. 지속적인 외력에 저항하며 하향 및 대각선으로 마우스를 통제하는 훈련은 총기 스프레이를 억제하고 탄착군을 좁히는 필수 머슬 메모리를 만듭니다."
      }
    },
    {
      "@type": "Question",
      "name": "외력 저항에 가장 유리한 마우스 감도(eDPI)와 파지법은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "400~800 DPI 기준의 중저감도(30~45cm/360°)가 권장됩니다. 저감도는 외력 급변 시 발생하는 손떨림이나 과보정(오버슈트)을 물리적으로 흡수하며, 손목에만 의존하지 않고 전완 전체를 안정적으로 접촉시키는 팜그립/클로그립이 적합합니다."
      }
    },
    {
      "@type": "Question",
      "name": "고강도 외력 저항 시 손목 피로와 근육 긴장을 예방하는 방법은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "마우스를 과도하게 쥐어짜지 말고, 전완근의 굴근과 신근에 가벼운 균형 장력만 유지해야 합니다. 손목 관절을 꺾지 않고 패드 위에서 부드럽게 글라이딩하며 마우스패드의 마찰력을 활용해 정지 제동을 거는 습관이 중요합니다."
      }
    },
    {
      "@type": "Question",
      "name": "본 테스트는 완전 무료이며 개인 데이터가 안전하게 보호되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네. 본 훈련은 회원가입이나 결제 없이 100% 무료로 브라우저에서 실행됩니다. 모든 반응 시간과 안정성 점수는 사용자 브라우저의 localStorage에만 저장되며 외부 서버로 절대 수집되지 않습니다."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "마우스 안정성 및 외력 저항 4단계 실전 훈련 가이드",
  "description": "동적 외력 벡터를 상쇄하고 안전 구역 내에서 콤보를 극대화하는 과학적 에임 안정화 단계.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "포인터 락 활성화 및 크로스헤어 중앙 정렬",
      "text": "시작 버튼을 클릭하여 마우스 포인터 락을 활성화하고 조준선을 녹색 중앙 안전 구역 안에 위치시킵니다.",
      "url": "https://skilldrills.online/ko/drills/physical/balance-training/stability-challenge#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "외력 벡터 감지 및 반대 방향 역보정 글라이딩",
      "text": "바람 저항이 조준선을 밀어내는 방향과 세기를 시각적으로 포착하고, 정반대 방향으로 부드럽게 마우스를 움직여 중심을 사수합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/balance-training/stability-challenge#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "지속적 중앙 유지로 3.0배 콤보 배율 구축",
      "text": "이탈 없이 안전 원 안에 크로스헤어를 오래 머무르게 할수록 콤보 배율이 최대 3.0배까지 상승하여 고득점을 기록합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/balance-training/stability-challenge#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "원 축소 및 강풍 가속에 대응하는 마이크로 브레이킹",
      "text": "후반부 레벨 12 이상에서 원이 20픽셀로 좁아지고 외력이 850단위로 폭증할 때 손끝 미세 마찰 압력으로 오버슈트를 제어합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/balance-training/stability-challenge#step-4"
    }
  ]
};

const stabilityGuide = {
  heading: "마우스 에임 안정성 & 외력 저항 생체역학 가이드",
  subtitle: "자세 평형 시너지, 폐루프 미세 역보정, 그리고 손떨림을 억제하는 과학적 길항근 제동 방법론",
  intro: [
    "마우스 안정성 챌린지(Stability Challenge)는 화면 중심에서 조준선을 지속적으로 밀어내려는 동적 섭동(외력 벡터)에 맞서 크로스헤어를 정밀하게 고정하는 지속 피드백 교정 운동입니다. 단순한 1회성 플릭 조준과 달리, 45초 동안 끊임없이 변화하는 힘의 방향과 크기를 뇌의 시각-운동 피질에서 실시간으로 상쇄해야 합니다.",
    "생체운동학에서 인간의 목표 지향적 균형 유지는 로버트 우드워스(Woodworth, 1899)의 '2단계 모델'을 따릅니다. 초기 개루프 충동 이후, 150~200ms 주기의 폐루프(Closed-loop) 시각 피드백을 통해 미세 오차를 수정합니다. 내쉬너와 맥콜럼(Nashner & McCollum, 1985)의 자세 시너지 이론과 데이비드 윈터(Winter, 1995)의 관절 토크 조절 역학에 따르면, 불규칙한 외력에 흔들리지 않기 위해서는 주동근과 길항근의 균형 잡힌 동시 수축(Co-contraction)이 필수적입니다.",
    "폴 피츠(Fitts, 1954)의 운동 난이도 법칙(Fitts's Law)에 따라 목표 구역의 직경이 절반으로 줄어들면 요구되는 신경근 제어 난이도는 로그 함수적으로 치솟습니다. 본 드릴은 레벨이 오를수록 안전 구역을 45픽셀에서 20픽셀까지 점진적으로 압축하고 밀어내는 힘을 250에서 850단위까지 가속시켜, FPS 프로급의 미세 제동력과 탄탄한 반동 억제 머슬 메모리를 구축하도록 설계되었습니다.",
    "측정 정밀도 및 하드웨어 안내: 본 드릴은 브라우저의 performance.now() 고해상도 타이머를 활용하여 클라이언트 기기 내부에서 밀리초 단위로 연산됩니다. 디스플레이 주사율(60Hz 16.7ms / 144Hz 6.9ms / 240Hz 4.1ms) 및 마우스 폴링레이트(125Hz vs 1000Hz)에 따라 물리적 지연 차이가 발생할 수 있으므로, 5ms 미만의 오차는 측정 노이즈로 감안하시기 바랍니다. 모든 기록은 브라우저에만 안전하게 저장됩니다."
  ],
  benchmarks: {
    title: "신체 균형 감각 및 에임 안정성 5단계 벤치마크 기준",
    headers: ["티어 및 등급", "칭호 (Rank)", "점수 기준치", "도달 레벨", "안전 구역 유지율", "신경근 안정성 프로필"],
    rows: [
      ["Tier 1: 최정상 앵커", "Apex Stabilizer", "15,300점 이상", "Level 12 – 15", "94% 이상 유지", "프로급 길항근 동시 수축 및 마이크로 브레이킹 완성 (Nashner & McCollum, 1985)"],
      ["Tier 2: 마스터 앵커", "Master Anchor", "12,000 – 15,299점", "Level 9 – 11", "86 – 93% 유지", "우수한 외력 상쇄 반응 속도 및 흔들림 없는 중심 조준선 유지 (Winter, 1995)"],
      ["Tier 3: 숙련된 저항 제어", "Proficient Counterer", "9,500 – 11,999점", "Level 6 – 8", "75 – 85% 유지", "일반 경쟁전 랭크 상위권 수준의 준수한 균형 감각 및 빠른 궤도 복구력"],
      ["Tier 4: 중간 코어", "Intermediate Core", "6,000 – 9,499점", "Level 3 – 5", "60 – 74% 유지", "외력 급변 시 일시적인 조준선 이탈 발생, 전완근 브레이킹 훈련 필요"],
      ["Tier 5: 입문 및 불안정", "Novice Perturbed", "6,000점 미만", "Level 1 – 2", "60% 미만 유지", "손목 근육 과긴장 및 과보정(오버슈트) 빈발, 기초 감도 세팅 점검 권장"]
    ],
    note: "자세 섭동 역학(Nashner & McCollum 1985; Winter 1995) 및 폐루프 운동 제어 연구(Woodworth 1899; Woods et al. 2015)를 결합한 통합 에임 안정성 표준입니다."
  },
  techniques: {
    title: "에임 흔들림 방지 및 마우스 제동력 극대화 실전 프로토콜",
    items: [
      {
        name: "전완근 길항근 동시 수축 (Antagonist Co-contraction)",
        desc: "내쉬너와 맥콜럼(1985)의 시너지 모델에 따르면, 불규칙한 외력을 상쇄하기 위해서는 전완의 굴근(안쪽)과 신근(바깥쪽)에 동시에 가벼운 장력을 주어 관절 강도를 높여야 합니다.",
        tips: "마우스를 쥐었을 때 손가락 힘만 쓰지 말고 팔뚝 전체에 약 20~30%의 가벼운 긴장감을 유지하여 섭동 충격을 흡수하세요."
      },
      {
        name: "폐루프 시각 연속 피드백 (Closed-loop Visual Current Control)",
        desc: "우드워스(1899)가 규명한 바와 같이, 조준선을 멈추는 것은 1회성 판단이 아닌 150~200ms 주기의 연속적인 오차 수정 과정입니다.",
        tips: "조준선 자체만 보지 말고 중앙 원과 조준선 사이의 '간격 거리'를 시야 중심에 두어 미세한 밀려남을 찰나에 감지하세요."
      },
      {
        name: "중저감도(eDPI) 세팅을 통한 물리적 안정성 확보",
        desc: "고감도는 미세한 근육 떨림(Tremor)까지 화면에 증폭시켜 외력 저항 시 심각한 오버슈트를 초래합니다.",
        tips: "400~800 DPI 기준 30~45cm/360° 범위를 권장하며, 패드와 전완의 접촉 면적을 넓혀 마찰 안정성을 확보하세요."
      },
      {
        name: "마우스패드 수직 하향 마찰 제동 (Vertical Downward Braking)",
        desc: "외력이 급격히 강해지는 후반부 레벨에서는 손목 힘만으로 멈출 수 없습니다.",
        tips: "방향 전환 시 손바닥 뒤꿈치와 손끝으로 마우스패드를 가볍게 아래로 누르는 하향 압력을 주어 마찰력으로 즉시 정지하세요."
      }
    ]
  },
  steps: [
    "인게임 감도와 동일한 감도 환경을 맞추고 포인터 락을 켭니다.",
    "화면 중앙의 녹색 안전 링 안에 조준선을 편안히 위치시킵니다.",
    "바람 저항이 조준선을 밀어내는 순간, 밀려나는 정반대 방향으로 부드럽게 마우스를 당겨 상쇄합니다.",
    "안전 구역 내에서 크로스헤어를 안정적으로 유지하여 콤보 배율을 최대 3.0배까지 끌어올립니다.",
    "레벨이 올라가며 원이 축소되고 외력이 강해질 때, 하향 패드 마찰력을 활용해 이탈을 방지하세요."
  ],
  audience: "발로란트, 카운터스트라이크 2, 에이펙스 레전드에서 총기 반동 제어가 어렵거나 에임 흔들림/손떨림으로 초탄 탄착군이 벌어지는 게이머 및 신체 평형 감각을 단련하고자 하는 모든 사용자.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('nashner1985', 'winter1995', 'woodworth1899', 'fitts1954', 'woods2015'),
  related: [
    { href: "/ko/drills/physical/coordination/complex-pattern", label: "복합 패턴 신체 협응 훈련" },
    { href: "/ko/drills/physical/coordination/cross-body-movement", label: "교차 신체 운동 협응 훈련" },
    { href: "/ko/drills/physical/reflex-training/reaction-chain", label: "연쇄 반사신경 정지 훈련" },
    { href: "/ko/drills/physical/reflex-training/quick-dodge", label: "순간 회피 반응속도 훈련" }
  ]
};

export default function StabilityChallengeKoPage() {
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
      <StabilityChallengeClient
        copy={{
          title: "마우스 흔들림 보정 & 에임 안정성 테스트",
          subtitle: "외력 저항 벡터 상쇄 및 크로스헤어 미세 제동력 훈련",
          rules: [
            { title: "중앙 안전 구역 사수", text: "동적으로 밀려오는 외력(바람 저항)에 맞서 조준선을 중앙 원 안에 안정적으로 유지하세요." },
            { title: "콤보 가속 배율 시스템", text: "안전 구역 내에서 흔들림 없이 유지할수록 콤보 배율이 최대 3.0배까지 상승하여 점수가 폭발합니다." },
            { title: "실시간 난이도 심화", text: "매 250점마다 레벨이 상승하며, 안전 원 반경이 축소되고 외력의 밀어내는 힘이 급격히 강해집니다." },
            { title: "이탈 시 콤보 초기화", text: "안전 구역 밖으로 밀려나면 콤보가 즉시 1.0배로 리셋되지만 시간이나 점수 차감은 없습니다." }
          ],
          aboutTitle: "안정성 챌린지 훈련 소개",
          aboutHeading: "마우스 에임 흔들림 보정과 자세 평형 제어",
          aboutText: "본 드릴은 화면 중심을 벗어나려는 무작위 외력 벡터를 실시간으로 인지하고 반대 방향으로 마우스를 부드럽게 역보정하여 크로스헤어를 유지하는 신경근 제어 훈련입니다. 발로란트, CS2, 배틀그라운드 등 FPS 게임에서의 반동 스프레이 억제력과 손떨림을 효과적으로 개선합니다."
        }}
      />
      <DrillGuide guide={stabilityGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="physical"
          currentHref="/drills/physical/balance-training/stability-challenge"
          locale="ko"
        />
      </div>
    </>
  );
}
