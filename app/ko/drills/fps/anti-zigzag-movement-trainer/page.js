import AntiZigzagClient from '@/app/drills/fps/anti-zigzag-movement-trainer/AntiZigzagClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: "지그재그 무빙 트래킹 – 슬라이딩 에임 연습 | SkillDrills",
  description: "웹 브라우저에서 무료로 즐기는 지그재그 무빙 트래킹 에임 연습. 에이펙스 레전드와 워존의 불규칙한 회피 기동, 슬라이딩 캔슬을 침착하게 추적하고 크로스헤어 오버슈팅을 완벽하게 교정하세요.",
  keywords: [
    "지그재그 무빙 트래킹",
    "지그재그 에임 연습",
    "슬라이딩 캔슬 트래킹",
    "에이펙스 슬라이딩 에임",
    "워존 무빙 트래킹",
    "리액티브 트래킹",
    "FPS 무빙 조준 연습",
    "회피 무빙 대응 연습",
    "상대 무빙 추적",
    "크로스헤어 오버슈팅 방지",
    "에임 트레이너 무료",
    "근거리 무빙 트래킹"
  ],
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/fps/anti-zigzag-movement-trainer",
    languages: getAlternateLanguages('/drills/fps/anti-zigzag-movement-trainer'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "지그재그 무빙 트래킹 – 슬라이딩 에임 연습 | SkillDrills",
    description: "웹 브라우저에서 무료로 즐기는 지그재그 무빙 트래킹 에임 연습. 에이펙스 레전드와 워존의 불규칙한 회피 기동, 슬라이딩 캔슬을 침착하게 추적하고 크로스헤어 오버슈팅을 완벽하게 교정하세요.",
    url: "https://skilldrills.online/ko/drills/fps/anti-zigzag-movement-trainer",
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "지그재그 무빙 트래킹 – 슬라이딩 에임 연습 | SkillDrills",
    description: "웹 브라우저에서 무료로 즐기는 지그재그 무빙 트래킹 에임 연습. 에이펙스 레전드와 워존의 불규칙한 회피 기동, 슬라이딩 캔슬을 침착하게 추적하고 크로스헤어 오버슈팅을 완벽하게 교정하세요.",
  },
};

export default function AntiZigzagKoPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ko" },
      { "@type": "ListItem", "position": 2, "name": "FPS 에임 훈련", "item": "https://skilldrills.online/ko/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "지그재그 무빙 트래킹", "item": "https://skilldrills.online/ko/drills/fps/anti-zigzag-movement-trainer" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "지그재그 무빙 트래킹",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "급격한 지그재그 방향 전환 및 슬라이딩 회피 타겟에 조준선을 고정하는 무료 브라우저 FPS 리액티브 트래킹 에임 드릴.",
    "genre": "FPS Training / Anti-Zigzag",
    "url": "https://skilldrills.online/ko/drills/fps/anti-zigzag-movement-trainer",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "지그재그 무빙 트래킹",
    "url": "https://skilldrills.online/ko/drills/fps/anti-zigzag-movement-trainer",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "웹 브라우저에서 실행되는 무료 지그재그 에임 연습. 대각선 급격한 방향 전환과 슬라이딩 캔슬 무빙에 대한 정밀 추적 훈련."
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "지그재그 무빙 트래킹",
    "url": "https://skilldrills.online/ko/drills/fps/anti-zigzag-movement-trainer",
    "description": "급격한 지그재그 방향 전환 및 슬라이딩 회피 타겟에 조준선을 고정하는 무료 브라우저 FPS 리액티브 트래킹 에임 드릴.",
    "dateModified": "2026-09-05",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Reactive Tracking"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-05",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "FPS 게임에서 상대방이 지그재그 무빙을 구사하는 이유는 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "지그재그 및 슬라이딩 무빙은 상대방의 조준선 정렬을 강제로 무너뜨리고, 인간의 시각 반응 한계(약 160~220ms)를 초과하는 방향 전환을 유발하여 탄환을 빗나가게 만들기 때문입니다. 또한 고속 이동 시 네트워크 디싱크(히트박스 불일치)를 유발할 수 있습니다."
        }
      },
      {
        "@type": "Question",
        "name": "에이펙스나 워존의 격렬한 지그재그 무빙을 트래킹하는 비결은 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "상대방이 방향을 바꾸는 외곽 끝점을 억지로 쫓아가지 않고, 스트레이프 궤적 중심부인 'V자 교차 회랑'에 조준의 중심을 두는 것입니다. 타겟은 반대편으로 가기 위해 반드시 중앙을 지나치므로, 불필요한 과도한 플릭을 없앨 수 있습니다."
        }
      },
      {
        "@type": "Question",
        "name": "V자 교차 회랑(V-Crossover) 트래킹 기술이란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "적의 지그재그 경로 중앙축에 조준선을 고정하고, 적이 중앙을 관통하며 지나갈 때 매끄럽게 속도를 동기화시키는 기술입니다. 외곽으로 마우스를 크게 휘두르다 발생하는 오버슈트(Over-flicking)를 원천적으로 방지합니다."
        }
      },
      {
        "@type": "Question",
        "name": "슬라이딩 캔슬을 섞는 적을 상대할 때의 조준 방법은?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "슬라이딩 캔슬은 급격한 수평 가속과 앉기 모션에 의한 수직 높이 하강이 결합됩니다. 미리 예측해서 바닥을 쏘지 말고, 슬라이딩 자세가 시작되는 프레임을 확인한 뒤 가슴 높이로 부드럽게 마우스를 미세 조정해야 합니다."
        }
      },
      {
        "@type": "Question",
        "name": "적이 방향을 바꿀 때 에임이 바깥으로 튕겨 나가는(오버에이밍) 이유는?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "손목과 전완근의 과도한 긴장(데스그립)과 섣부른 예측 플릭 때문입니다. 근육이 경직되어 있으면 마우스의 관성을 급제동하지 못하고 목표를 지나쳐 버립니다. 가벼운 그립을 유지하여 감속 능력을 높여야 합니다."
        }
      },
      {
        "@type": "Question",
        "name": "지그재그 회피 추적에 가장 적합한 마우스 감도는?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "360도 회전 기준 28cm ~ 42cm 범위의 중감도가 가장 이상적입니다. 근거리 대각선 스윕을 마우스 패드 이탈 없이 커버하면서도, 방향 전환 시의 미세한 떨림을 억제할 수 있습니다."
        }
      },
      {
        "@type": "Question",
        "name": "고주사율 모니터(144Hz, 240Hz)가 지그재그 에임에 실제로 도움이 되나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "매우 큰 도움이 됩니다. 60Hz(프레임 간격 16.7ms) 대비 240Hz(4.1ms)는 화면 잔상을 획기적으로 줄여주며, 적이 방향을 전환하기 위해 감속하는 찰나의 프레임을 몇 밀리초 더 일찍 시각 피질에 전달합니다."
        }
      },
      {
        "@type": "Question",
        "name": "온라인 멀티플레이 핑과 지그재그 무빙의 관계는?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "클라이언트 보간 netcode 환경에서는 적이 급격한 방향 반전을 시도할 때 렌더링 모델과 서버 히트박스 사이에 짧은 괴리가 발생합니다. 적의 중심 흉부를 조준선 중앙에 두는 것이 유효 판정률을 극대화합니다."
        }
      },
      {
        "@type": "Question",
        "name": "타겟에 에임을 머무르게 하는(드웰) 능력을 키우려면?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "조준선 점에 집착하지 말고 적 캐릭터의 몸통 중앙에 시선을 100% 고정해야 합니다. 인간의 시각 운동 시스템은 타겟 망막 신호를 직접 파악할 때 가장 매끄러운 추적 안구 운동을 발생시킵니다."
        }
      },
      {
        "@type": "Question",
        "name": "이 훈련이 근거리 SMG 및 샷건 교전에 도움이 되나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "네. 근접 교전은 화면상 타겟의 각속도가 가장 빠른 상황입니다. 격렬한 지그재그 회피를 패닉 없이 추적하는 신경 근육 제어력을 확립하면, 난전 속에서도 일정한 딜 타임을 뽑아낼 수 있습니다."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "지그재그 무빙 및 슬라이딩 트래킹 훈련 방법",
    "description": "급격한 방향 전환과 슬라이딩 회피 타겟을 놓치지 않고 추적하는 단계별 연습법.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "마우스 감도 동기화",
        "text": "감도 변환기를 통해 실제 플레이하는 게임의 감도와 FOV를 일치시켜 1:1 근육 기억을 유지합니다.",
        "url": "https://skilldrills.online/ko/drills/fps/anti-zigzag-movement-trainer#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "전체화면 및 포인터 락 활성화",
        "text": "시작 버튼을 클릭하여 브라우저 가속이 배제된 RAW 하드웨어 좌표 입력 모드로 진입합니다.",
        "url": "https://skilldrills.online/ko/drills/fps/anti-zigzag-movement-trainer#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "중앙 V자 교차 축을 중심으로 추적",
        "text": "타겟의 외곽 전환점을 무리하게 쫓지 않고, 중심축을 통과하는 타이밍에 맞춰 속도를 동기화합니다.",
        "url": "https://skilldrills.online/ko/drills/fps/anti-zigzag-movement-trainer#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "지속 조준으로 체력 소진 및 레벨 상승",
        "text": "타겟이 소멸하기 전까지 조준선을 유지하여 체력을 깎고, 콤보 배수를 획득하며 다음 난이도로 나아갑니다.",
        "url": "https://skilldrills.online/ko/drills/fps/anti-zigzag-movement-trainer#step-4"
      }
    ]
  };

  const copy = {
    h1Keyword: "지그재그 무빙 트래킹",
    h1Suffix: " - 슬라이딩 추적 에임 트레이너",
    statScore: "점수",
    statTime: "남은 시간",
    statAccuracy: "트래킹 정확도",
    statBestScore: "최고 점수",
    startTitle: "지그재그 무빙 트래킹",
    startSubtitle: "급격한 방향 전환 반응 • 슬라이딩 캔슬 추적 • 무한 난이도",
    getReady: "준비",
    pausedTitle: "일시 정지됨",
    pausedSubtitle: "클릭하여 계속하기 (마우스 포인터 락이 다시 켜집니다)",
    stageCaption: "불규칙한 지그재그 스트레이프, 슬라이딩, 점프를 구사하는 회피 타겟에 조준선을 고정하세요.",
    rulesTitle: "훈련 규칙 및 점수 체계",
    rulesItems: [
      { num: "1", text: "중앙 V자 교차 축에 조준을 두고,", highlight: "외곽 오버플릭을 억제", result: "에임 안정화" },
      { num: "2", text: "타겟 이동 속도와", highlight: "조준선 속도를 정확히 동기화", result: "+100 PTS / 초" },
      { num: "3", text: "1.0초 연속 추적 시", highlight: "콤보 수 1 증가", result: "점수 배수 적용" },
      { num: "4", text: "타겟 수명이 끝나기 전에", highlight: "체력을 모두 소진시켜 파괴", result: "레벨 상승" }
    ],
    aboutTitle: "지그재그 무빙 및 슬라이딩 회피 추적 정보",
  };

  const koGuide = {
    heading: "지그재그 회피 무빙 트래킹의 과학과 벤치마크 가이드",
    intro: [
      "에이펙스 레전드, 콜 오브 듀티 워존, 오버워치 2와 같은 동적 기동 중심의 하이퍼 FPS에서는 적들이 선형으로 달리지 않고 대각선 지그재그 스텝, 슬라이딩 캔슬, 앉기 연타를 조합하여 조준을 교란합니다. 인간의 부드러운 안구 추종(Smooth Pursuit) 속도 한계는 대략 30°/s이며(Krauzlis, 2004), 이를 초과하는 급격한 벡터 반전은 심각한 망막 슬립을 유발하여 100~130ms의 교정 단속성 안구 운동(Catch-up Saccade)을 강제합니다(Rashbass, 1961).",
      "초보 트래커들이 가장 자주 범하는 실수는 적의 지그재그 회피 끝점(Apex)을 억지로 플릭하여 쫓아가는 것입니다. V자 회피의 끝에서 적의 속도는 순간적으로 0이 된 후 즉시 반대편 중앙을 향해 가속합니다. 이를 무리하게 쫓아가면 손목 근육이 충돌하여 심각한 오버슈트가 발생합니다. 엘리트 에이머들은 중앙 'V자 교차 회랑'에 조준의 중심축을 두고, 적이 회랑을 관통할 때 매끄럽게 속도를 동기화시킵니다(Fitts, 1954; Accot & Zhai, 1997).",
      "본 트레이너는 HTML5 Pointer Lock API를 통해 마우스 가속 없는 1:1 하드웨어 좌표 매핑과 performance.now() 고해상도 타이머를 제공합니다. 브라우저 보안 타이머 양자화(약 1ms)와 디스플레이 주사율(60Hz=16.7ms, 144Hz=6.9ms, 240Hz=4.1ms)로 인해 5ms 미만의 차이는 측정 오차로 간주되지만(Woods et al., 2015), 일관된 환경에서 자신의 동체 시력과 리액티브 트래킹 한계를 극복하는 최고의 기준점을 제공합니다."
    ],
    benchmarks: {
      title: "지그재그 방향 전환 반응 및 트래킹 지연 단계",
      headers: ["추적 단계 / 운동 제어 구간", "일반적인 지연 시간", "신경 전달 경로 및 생체역학", "실전 교전 영향"],
      rows: [
        ["대각선 벡터 반전 시각 감지", "160 – 210 ms", "망막 수용체에서 1차 시각 피질(V1) 및 MT/V5 운동 시각 영역으로 신호 전달", "적이 방향을 꺾기 시작했음을 뇌가 인지하기까지의 절대 지연"],
        ["길항근 제동 및 반대 가속", "85 – 135 ms", "피질척수로를 통한 전완 굴근 및 손바닥 근육 활성화: 마우스 관성 정지 및 역추진", "마우스의 가속을 멈추고 반대 방향으로 밀어내기 시작하는 물리 시간"],
        ["중심와 재정렬 및 회랑 조준", "65 – 105 ms", "교정용 미세 단속 운동과 손목 미세 관절 조작으로 조준점 재접촉", "히트박스에 조준선을 다시 일치시켜 대미지 틱 재가동"],
        ["비예측 지그재그 총 재포착 시간", "310 – 450 ms", "불규칙 회피 시작부터 조준선 복귀까지의 총 턴어라운드 인터벌", "일반 유저들이 상대 무빙에 농락당하며 탄을 흘리는 무방비 구간"],
        ["프로급 사전 동조 트래킹", "215 – 295 ms", "V자 교차 축에서의 감속 예측 및 릴랙스된 손목 제어로 즉각적인 속도 동조", "에이펙스 프레데터 및 프로들이 실현하는 압도적인 지속 대미지 업타임"]
      ],
      note: "안구 운동 역학(Rashbass, 1961; Krauzlis, 2004) 및 지속 조작 제어 법칙(Fitts, 1954; Accot & Zhai, 1997; Woods et al., 2015)을 기반으로 종합된 벤치마크입니다."
    },
    techniques: {
      title: "실전 지그재그 회피 무빙 트래킹 테크닉",
      items: [
        {
          name: "중앙 V자 교차 회랑 앵커링 (Center-Line Anchoring)",
          desc: "적이 방향을 꺾는 외곽 극단까지 조준선을 억지로 흔들지 않고, 적이 계속해서 통과해야만 하는 중앙 통로에 조준선을 유지합니다.",
          tips: "적이 중심축으로 되돌아오는 타이밍에 맞춰 부드럽게 속도를 동기화하여 탄환 낭비를 막으세요."
        },
        {
          name: "전완근 긴장 억제 및 이완 그립 (Relaxed Grip)",
          desc: "급격한 방향 전환에 당황하여 마우스를 강하게 쥐면(데스그립), 반작용 근육들이 충돌하여 마우스가 덜컹거리게 됩니다.",
          tips: "가벼운 핑거팁 또는 이완된 클로 그립을 유지하여 손목과 손가락이 고빈도 방향 전환을 유연하게 흡수하게 하세요."
        },
        {
          name: "타겟 중심 시각 고정 (Target-Centric Focus)",
          desc: "조준선 십자선을 쳐다보지 말고, 적 모델의 가슴과 골반 중심에 시선을 강력하게 고정합니다.",
          tips: "뇌의 등쪽 시각 경로가 적의 망막 속도와 방향 정보를 자연스럽게 읽어내어 손의 움직임을 이끕니다."
        },
        {
          name: "감속 프레임 및 캐릭터 기울임 식별",
          desc: "가속 관성이 있는 FPS 게임에서는 적이 방향을 반전하기 직전 캐릭터 모델이 기울어지며 찰나의 감속 프레임이 나타납니다.",
          tips: "방향이 바뀌기 30~50ms 전 나타나는 모델 틸트 모션을 캐치하는 훈련을 반복하세요."
        }
      ]
    },
    steps: [
      "감도 변환기에서 본인이 사용하는 인게임 감도를 설정하여 1:1 근육 기억을 확립합니다.",
      "‘시작하기’를 눌러 마우스 가속이 차단된 전체화면 RAW 포인터 락 모드를 활성화합니다.",
      "불규칙한 대각선 지그재그 스텝을 밟는 타겟의 중앙 몸통에 시선을 집중합니다.",
      "중앙 V자 회랑을 의식하며 타겟 히트박스 안에 조준선을 지속 유지합니다.",
      "제한 시간 내에 체력을 모두 깎아 콤보 배수를 누적하고 다음 레벨로 도약하세요."
    ],
    audience: "에이펙스 레전드, 워존, 오버워치 2, 더 파이널스, 발로란트 등에서 적의 화려한 무빙과 슬라이딩 회피에 에임이 흔들리는 모든 FPS 게이머.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'krauzlis2004', 'fitts1954', 'green2003', 'rashbass1961', 'accotZhai1997'),
    related: [
      { href: "/ko/drills/fps/anti-strafe-jitter-duel", label: "무빙 트래킹 에임 연습 (ADAD 지터)" },
      { href: "/ko/drills/fps/flick-shot-training", label: "플릭 에임 연습 (Flick Shot)" },
      { href: "/ko/drills/fps/180-degree-awareness", label: "180도 플릭 에임 연습" },
      { href: "/ko/drills/fps/instant-response", label: "FPS 반응속도 테스트" },
      { href: "/ko/drills/reaction-speed/reaction-time-test", label: "반응속도 테스트" }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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
      <AntiZigzagClient copy={copy} />
      <div className="max-w-6xl mx-auto px-4 w-full">
        <RelatedDrills currentCategory="fps" currentHref="/drills/fps/anti-zigzag-movement-trainer" locale="ko" />
      </div>
      <DrillGuide guide={koGuide} />
    </>
  );
}
