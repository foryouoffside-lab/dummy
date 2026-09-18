import QuickDodgeClient from '@/app/drills/physical/reflex-training/quick-dodge/QuickDodgeClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — South Korea (KR / KO)
// Primary Intent: 마우스 피하기 게임, 순발력 테스트 게임, 탄막 피하기 게임, 총알 피하기 게임
// Korean Gaming Context: 플래시 마우스 피하기 게임 계승 및 리그 오브 레전드/FPS 무빙 회피 훈련
// High-Demand, Low-Competition Target Keywords:
//   - "마우스 피하기 게임" (Core legendary Korean browser reflex query)
//   - "순발력 테스트 게임" (Agility & reaction speed test game)
//   - "탄막 피하기 게임" (Bullet hell dodge challenge query)
//   - "총알 피하기 게임" (Classic projectile evasion query)
//   - "마우스 컨트롤 게임" (Mouse precision handling game)
//   - "반응속도 피하기" (Reaction speed evasion query)
//   - "동체시력 피하기 게임" (Dynamic visual acuity dodge game)
//   - "마우스 무빙 연습" (Competitive gamer mouse movement drill)
//   - "투사체 회피 훈련" (Kinetic projectile dodge training)
//   - "에임 무빙 테스트" (Aim & evasion coordination test)
// ============================================================

export const metadata = {
  title: "마우스 피하기 게임 – 순발력 탄막 회피 테스트 | SkillDrills",
  description: "무료 온라인 마우스 피하기 게임 및 순발력 탄막 회피 테스트. 사방에서 날아오는 고속 투사체 벡터를 마우스 커서로 극한까지 회피하며 카와토 소뇌 내부 모델 기반 궤적 예측과 정밀 무빙 컨트롤을 훈련합니다.",
  keywords: [
    "마우스 피하기 게임",
    "순발력 테스트 게임",
    "탄막 피하기 게임",
    "총알 피하기 게임",
    "마우스 컨트롤 게임",
    "반응속도 피하기",
    "동체시력 피하기 게임",
    "마우스 무빙 연습",
    "투사체 회피 훈련",
    "에임 무빙 테스트"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/physical/reflex-training/quick-dodge',
    languages: getAlternateLanguages('/drills/physical/reflex-training/quick-dodge'),
  },
  openGraph: {
    title: "마우스 피하기 게임 – 순발력 탄막 회피 테스트 | SkillDrills",
    description: "무료 온라인 마우스 피하기 게임 및 순발력 탄막 회피 테스트. 사방에서 날아오는 고속 투사체 벡터를 마우스 커서로 극한까지 회피하며 카와토 소뇌 내부 모델 기반 궤적 예측과 정밀 무빙 컨트롤을 훈련합니다.",
    url: 'https://skilldrills.online/ko/drills/physical/reflex-training/quick-dodge',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "마우스 피하기 게임 – 순발력 탄막 회피 테스트 | SkillDrills",
    description: "무료 온라인 마우스 피하기 게임 및 순발력 탄막 회피 테스트. 사방에서 날아오는 고속 투사체 벡터를 마우스 커서로 극한까지 회피하며 카와토 소뇌 내부 모델 기반 궤적 예측과 정밀 무빙 컨트롤을 훈련합니다.",
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
      "name": "신체 훈련 센터",
      "item": "https://skilldrills.online/ko/drills/physical"
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
      "name": "마우스 피하기 게임 & 탄막 회피",
      "item": "https://skilldrills.online/ko/drills/physical/reflex-training/quick-dodge"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "마우스 피하기 게임 및 순발력 탄막 회피 시뮬레이터",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "마우스 피하기 및 소뇌 순방향 예측 회피 드릴",
  "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
  "genre": "Training, Reflex, Evasion, Esports"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Quick Dodge Kinetic Bullet Evasion Drill",
  "gamePlatform": "Web Browser",
  "applicationSubCategory": "Esports Psychomotor Evasion Simulator"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "마우스 피하기 훈련에서 반응속도보다 '예측(Prediction)'이 더 결정적인 이유는?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "투사체가 400~600 px/s의 고속으로 돌진할 때 시각 피드백 루프(100~150ms)에만 의존하면 이미 충돌이 일어난 뒤에 반응하게 됩니다. 카와토 미츠오(Kawato, 1999)의 연구처럼 소뇌 내부 순방향 모델을 통해 투사체의 입사각과 속도를 사전에 시뮬레이션하고 개루프(Open-loop) 탄도성 마우스 궤적을 선제적으로 실행해야 안전지대를 선점할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "투사체 밀도가 급증하는 후반 레벨에서 마우스 커서를 움직이는 최적의 전략은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "화면 구석이나 모서리로 도망치면 탈출 벡터가 90도로 차단되어 몰살당하기 쉽습니다. 화면 중앙 주변의 좁은 반경 내에서 미세한 마이크로 무빙(Micro-adjustments)으로 궤적을 흘려보내고, 투사체 간격이 벌어지는 빈 공간으로 순간적인 우드워스 플릭을 감행하는 것이 핵심입니다."
      }
    },
    {
      "@type": "Question",
      "name": "점수 산정 체계와 콤보 배율은 어떻게 누적되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "시간이 지남에 따라 매초 생존 점수가 누적되며, 투사체 스침 회피에 성공할 때마다 레벨과 콤보 배율(최대 3.0배)이 가산됩니다. 충돌 없이 45초 생존을 완주하고 높은 콤보를 유지해야 엘리트 등급인 24,000점 이상에 도달할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "충돌 판정(Hitbox)과 회피 판정의 정밀도는 어떻게 설계되어 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "마우스 커서의 피격 판정점은 중심 반경 4px의 정밀 코어 히트박스를 기준으로 연산됩니다. 투사체의 시각적 구체 반경(10~25px)과 커서 중심점 간의 유클리드 거리를 브라우저 고해상도 타이머(performance.now)를 통해 서브픽셀 단위로 측정합니다."
      }
    },
    {
      "@type": "Question",
      "name": "투사체 충돌 시 어떤 페널티가 부여되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "투사체에 피격되면 즉시 붉은 플래시 경고와 함께 누적 콤보 배율이 1.0배로 리셋되며, 세션 생존 생명력이 차감됩니다. 실수 없는 연속 회피만이 높은 콤보 가속도를 유지하는 유일한 길입니다."
      }
    },
    {
      "@type": "Question",
      "name": "롤(LoL)이나 발로란트 등 실전 게임 무빙 실력 향상에 직접적인 도움이 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, 매우 큰 도움이 됩니다. 리그 오브 레전드의 논타깃 스킬 회피 및 카이팅, 오버워치/에이펙스의 날아오는 투사체 회피 시 요구되는 '시각적 탄도 해석 및 손목 미세 제동' 신경 회로를 집중 단련하므로 실전 교전 생존력이 비약적으로 상승합니다."
      }
    },
    {
      "@type": "Question",
      "name": "마우스 파지법 중 회피에 가장 유리한 그립 방식은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "손바닥 전체를 밀착시키는 팜 그립보다, 손가락 끝으로 마우스를 기민하게 제어할 수 있는 핑거팁 그립(Fingertip)이나 클로 그립(Claw)이 유리합니다. 미세한 반경(5~15px) 회피 시 손목 전체를 흔들지 않고 손가락 마디 굴곡만으로 즉각적인 방향 전환이 가능하기 때문입니다."
      }
    },
    {
      "@type": "Question",
      "name": "144Hz 또는 240Hz 고주사율 모니터가 마우스 피하기에 미치는 영향은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "60Hz 모니터에서는 500 px/s로 비행하는 투사체가 프레임당 약 8.3px씩 순간이동하듯 잔상을 남깁니다. 240Hz 모니터는 프레임 간격을 4.1ms(약 2.1px 이동)로 좁혀 궤적의 연속성을 완벽히 재현하므로 0.1초 앞의 안전 경로를 훨씬 뚜렷하게 판독할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "손목 터널 증후군이나 근육 피로를 예방하는 올바른 자세는?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "마우스를 쥐는 손에 과도한 악력을 주지 말고 달걀을 쥐듯 가볍게 지지하십시오. 팔꿈치는 책상에 편안히 거치하고, 회피 3세트마다 손목을 좌우로 가볍게 털어주는 60초간의 이완 루틴을 권장합니다."
      }
    },
    {
      "@type": "Question",
      "name": "본 피하기 훈련의 회피 기록과 최고 점수는 외부에 전송되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "아닙니다. SkillDrills의 모든 물리 엔진 연산과 시간 계측(performance.now)은 사용자 기기 브라우저 내부에서만 완결됩니다. 최고 점수와 플레이 기록은 브라우저 localStorage에만 로컬 저장되어 완벽한 개인정보 보안을 유지합니다."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "마우스 피하기 및 탄막 궤적 회피 4단계 훈련 프로토콜",
  "description": "사방에서 쇄도하는 고속 투사체를 소뇌 순방향 예측과 마이크로 무빙으로 완전 회피하는 단계별 훈련법.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "중앙 기준 위치 정렬 및 핑거팁 파지 (Center Calibration)",
      "text": "마우스 커서를 경기장 중앙에 정렬하고 손가락 끝에 가볍게 탄성을 부여하여 전방위 탈출 준비 태세를 갖춥니다.",
      "url": "https://skilldrills.online/ko/drills/physical/reflex-training/quick-dodge#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "카와토 순방향 모델 입사각 예측 (Kawato Trajectory Prediction)",
      "text": "사방 가장자리에서 스폰되는 투사체의 속도와 각도를 주변 시야로 파악하고 교차 지점이 아닌 틈새 공간을 미리 선점합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/reflex-training/quick-dodge#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "초정밀 마이크로 스냅 및 잔류 회피 (Micro-Evasion Snapping)",
      "text": "큰 원을 그리지 말고 투사체 궤적을 5~10px 차이로 아슬아슬하게 스쳐 지나가는 절제된 미세 무빙으로 공간을 보존합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/reflex-training/quick-dodge#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "연속 생존 및 3.0배 콤보 유지 (Streak Heat Maintenance)",
      "text": "45초 동안 단 한 차례의 피격도 허용하지 않고 연속 회피를 성공시켜 3.0배 최대 콤보를 누적하고 24,000점 이상을 달성합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/reflex-training/quick-dodge#step-4"
    }
  ]
};

const dodgeGuide = {
  heading: "마우스 탄막 피하기 게임 및 동체시력 신경생체역학 가이드",
  intro: {
    title: "소뇌 순방향 모델(Forward Models)과 탄도성 회피 무빙의 생체역학",
    paragraphs: [
      "마우스 피하기 훈련(Quick Dodge Drill)은 사방에서 마우스 커서를 향해 쇄도하는 고속 투사체 무리를 밀리초 단위의 판단력과 초정밀 커서 무빙으로 회피하는 최상위 지각-운동 통합 드릴입니다. 단순히 날아오는 물체를 보고 피하는 수동적 반응을 넘어, 복수의 물리 벡터가 교차하는 혼돈의 전장에서 안전 공간을 선제적으로 연산하는 능동적 공간 지각력을 요구합니다.",
      "세계적인 신경과학자 카와토 미츠오(Kawato, 1999)의 '소뇌 내부 순방향 모델(Cerebellar Internal Forward Models)' 이론에 따르면, 시각 피드백의 신경 전도 지연(100~150ms)으로 인해 고속 투사체 회피는 실시간 시각 수정만으로는 불가능합니다. 뇌는 투사체의 초기 가속도와 비행 각도를 포착하는 즉시 소뇌에서 다음 200ms 동안의 궤적을 시뮬레이션하고, 이에 대응하는 모터 탈출 명령(개루프 탄도 제어)을 선제적으로 방출해야만 생존할 수 있습니다.",
      "로버트 우드워스(Woodworth, 1899)의 2단계 운동 제어 모델에서 규명되었듯, 인간의 빠른 움직임은 초기 폭발적 임펄스와 종단 미세 제동으로 완결됩니다. 투사체 속도가 500 px/s를 상회하는 고난도 국면에서는 피츠의 법칙(Fitts, 1954)에 의해 공간 여유가 극도로 수축되므로, 불필요한 대형 선회를 배제하고 10px 이내의 최소 궤적으로 스쳐 지나가는 절제된 핑거팁 마이크로 무빙이 엘리트 스코어의 핵심입니다.",
      "본 훈련 모듈은 브라우저의 performance.now() 고해상도 타이머를 활용하여 클라이언트 기기 내부에서 오차 없는 밀리초 단위 충전 및 서브픽셀 충돌 연산을 수행합니다. 144Hz/240Hz 고주사율 모니터와 1000Hz 폴링레이트 마우스를 활용하면 프레임 지연을 4ms 미만으로 압축하여 최적의 신경 반응성을 유지할 수 있습니다 (Woods et al., 2015). 모든 플레이 기록은 로컬 브라우저에만 안전하게 보관됩니다."
    ]
  },
  benchmarks: {
    title: "마우스 피하기 및 탄막 회피 5단계 공식 벤치마크",
    headers: ["티어 및 등급", "칭호 (Rank Title)", "점수 기준치", "생존 정확도 및 피크 속도", "종합 등급", "신경생체역학 운동 프로필"],
    rows: [
      ["Tier 1: 궁극의 탄막 회피 마스터", "Apex Kinetic Evader", "24,000점 이상", "95% 이상 / 500+ px/s", "Grade S", "상위 0.1% 수준의 초인적 소뇌 순방향 예측력, 50개 이상의 고속 투사체 속에서 무결점 마이크로 무빙 달성 (Kawato 1999; Woodworth 1899)"],
      ["Tier 2: 정밀 궤적 스트라이커", "Precision Trajectory Striker", "17,000 – 23,999점", "90 – 94% / 400 – 499 px/s", "Grade A", "상위 3% 수준의 프로게이머급 공간 인지력, 혼란스러운 투사체 다발 속에서도 침착한 중앙 반경 유지"],
      ["Tier 3: 숙련된 기동 회피자", "Skilled Evasion Pilot", "11,000 – 16,999점", "82 – 89% / 300 – 399 px/s", "Grade B", "상위 15% 경쟁전 유저 수준, 안정적인 손목 탄도 제어와 우수한 초기 스폰 위험 예측"],
      ["Tier 4: 발전하는 무빙 학습생", "Developing Dodger", "6,000 – 10,999점", "70 – 81% / 200 – 299 px/s", "Grade C", "일반 성인 평균치. 속도가 빨라지면 모서리로 몰려 피격당하는 경향이 있으며 중앙 회귀 무빙 훈련 요망"],
      ["Tier 5: 입문 회피 훈련생", "Novice Evasion Trainee", "6,000점 미만", "< 70% / < 200 px/s", "Grade D", "시각 반응 지연으로 인한 잦은 피격, 과도한 손목 힘빼기 및 시선 주변부 확장 연습 필요"]
    ],
    note: "카와토 소뇌 예측 이론(1999), 우드워스 2단계 운동 모델(1899), 피츠의 난이도 법칙(1954)에 기반한 표준 척도입니다."
  },
  techniques: {
    title: "마우스 탄막 회피 실전 테크닉 & 프로토콜",
    items: [
      {
        name: "카와토 소뇌 순방향 예측 회피 (Kawato Cerebellar Anticipation)",
        desc: "투사체가 이미 근접한 뒤에 반응하려 하지 마세요. 화면 모서리에서 스폰되는 순간 비행 각도를 포착하고, 투사체들이 교차하며 생기는 빈 공간으로 커서를 선제 배치하세요.",
        tips: "투사체 자체를 보지 말고, 투사체 사이의 빈 틈(음각 공간)을 바라보세요."
      },
      {
        name: "우드워스 마이크로 스냅 제어 (Woodworth Micro-Snap Steering)",
        desc: "화면 전체를 가로지르는 큰 원을 그리지 마세요. 10~20px의 좁은 반경 내에서 손가락 관절로 짧게 끊어 치듯 궤적을 튕겨내며 공간 낭비를 최소화하세요.",
        tips: "마우스 센서를 책상에 단단히 밀착시키고 손가락 끝 악력으로 미세 제동을 가하세요."
      },
      {
        name: "중앙 앵커링 및 구석 탈출 (Central Anchoring Discipline)",
        desc: "벽이나 모서리로 도망치면 퇴로가 90도로 갇혀 사망합니다. 회피 직후에는 반드시 경기장 중앙 30% 영역으로 복귀하여 360도 탈출로를 상시 확보하세요.",
        tips: "회피 후 즉각 중앙으로 마우스를 되돌리는 버릇을 무조건 습관화하세요."
      },
      {
        name: "주변 시야 탄막 군집 스캐닝 (Peripheral Cluster Scanning)",
        desc: "커서에만 시선을 고정하면 외곽에서 고속으로 날아오는 투사체를 놓칩니다. 시선은 화면 전체에 부드럽게 두고, 커서의 위치는 고유수용감각(Proprioception)으로 감지하세요.",
        tips: "모니터 중심을 멍하니 바라보듯 시야를 넓히면 투사체의 흐름이 한눈에 읽힙니다."
      }
    ]
  },
  steps: [
    "자세를 바로잡고 커서를 경기장 중앙에 정렬합니다.",
    "외곽에서 스폰되는 투사체의 궤적을 예측하고 안전한 빈 공간으로 마우스를 미세 이동합니다.",
    "모서리로 몰리지 않도록 회피 즉시 중앙 영역으로 커서를 재배치합니다.",
    "45초 동안 충돌 없이 콤보를 누적하여 최고 점수 24,000점 돌파를 달성합니다."
  ],
  audience: "리그 오브 레전드, 배틀그라운드, 오버워치, 에이펙스 등 고난도 무빙과 논타깃 투사체 회피 능력을 극대화하려는 게이머 및 동체시력과 순발력을 기르고자 하는 모든 사용자.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('kawato1999', 'woodworth1899', 'fitts1954', 'woods2015')
};

export default function LocalizedQuickDodgePageKo() {
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
      <QuickDodgeClient
        copy={{
          title: "마우스 피하기 게임 & 순발력 탄막 회피 테스트",
          subtitle: "소뇌 순방향 예측 무빙 및 키네틱 투사체 회피 • 15단계 난이도 스케일링",
          description: "날아오는 투사체를 피하는 것은 반응의 문제가 아닌 예측의 문제입니다. 시각 피드백이 움직임에 개입하는 데는 100~150ms가 걸리므로(Woodworth, 1899), 고속 투사체 회피는 소뇌의 사전 궤적 시뮬레이션(Kawato, 1999)을 통해 미리 계획된 탄도 제어로 완결됩니다. 속도가 빨라질수록 수정할 수 있는 시간 창은 사라지고 순수한 예측만이 남습니다.",
          badge: "순발력 탄막 테스트",
          hudLabels: {
            score: "현재 점수",
            time: "남은 시간",
            bestScore: "최고 점수",
            bestCombo: "최대 콤보",
            getReady: "준비하세요"
          },
          resultLabels: {
            newBest: "최고 기록 달성",
            points: "최종 점수",
            accuracy: "회피 성공률",
            dodges: "회피 횟수",
            peakSpeed: "최고 속도",
            peakLevel: "도달 레벨",
            playAgain: "다시 도전하기"
          },
          rulesTitle: "드릴 규칙 및 점수 산정 방식",
          rulesItems: [
            { title: "투사체 회피 및 생존 점수", text: "사방에서 쇄도하는 붉은색 투사체와의 충돌을 피하십시오. 매 1초 생존할 때마다 점수가 누적됩니다." },
            { title: "아슬아슬한 스침 회피 (Close Shave)", text: "투사체 근접 스침 회피 시 추가 보너스 점수와 함께 콤보 배율이 상승합니다." },
            { title: "점진적 난이도 극대화", text: "점수가 올라갈수록 투사체 속도가 최대 500 px/s까지 가속되고 스폰 주기가 가팔라집니다." },
            { title: "피격 페널티", text: "투사체와 충돌하면 콤보 배율이 1.0배로 초기화되며 붉은 경고 플래시가 발생합니다." }
          ],
          aboutTitle: "마우스 탄막 피하기 게임 및 궤적 예측 생체역학",
          aboutSections: [
            {
              title: "키네틱 충돌 회피와 소뇌 순방향 궤적 예측",
              subtitle: "카와토(Kawato, 1999) 소뇌 내부 모델을 통한 선제적 탄도 무빙",
              content: "고속 투사체 회피는 시각 정보 전도 지연(100~150ms)을 극복하기 위해 소뇌의 사전 시뮬레이션에 의존합니다. 투사체 입사각을 즉각 파악하여 안전 공간으로 마우스를 선제 안착시킵니다."
            },
            {
              title: "우드워스 2단계 운동 제어와 종단 제동",
              subtitle: "개루프 탄도성 스냅과 초정밀 마이크로 무빙의 조화",
              content: "회피 동작은 초기 폭발적 임펄스와 종단 감속으로 구성됩니다(Woodworth, 1899). 최소 반경 내에서 손가락 관절로 절제된 제동을 거는 것이 공간 보존의 핵심입니다."
            },
            {
              title: "피츠의 법칙과 한계 공간 수축",
              subtitle: "밀집 탄막 속 허용 오차 축소에 따른 난이도 지수 상승",
              content: "투사체 수가 늘어날수록 안전 회피 구역의 폭(W)이 좁아져 난이도(ID)가 기하급수적으로 폭증합니다(Fitts, 1954). 대형 선회를 자제하고 틈새를 뚫어야 합니다."
            },
            {
              title: "밀리초 타이밍과 고주사율 디스플레이 최적화",
              subtitle: "하드웨어 레이턴시 압축을 통한 4.1ms 궤적 분해능 구현",
              content: "240Hz 고주사율 디스플레이와 1000Hz 마우스 환경은 초당 500px 투사체의 궤적 잔상을 지우고 정확한 프레임 정보를 뇌에 공급합니다(Woods et al., 2015)."
            }
          ]
        }}
      />
      <DrillGuide {...dodgeGuide} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/reflex-training/quick-dodge" />
    </>
  );
}
