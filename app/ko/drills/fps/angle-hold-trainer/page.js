import AngleHoldClient from '@/app/drills/fps/angle-hold-trainer/AngleHoldClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
    title: "대기 에임 연습 – 각 쪼개기·피커스 어드밴티지 대처 | SkillDrills",
  description: "무료 브라우저 FPS 대기 에임(Angle Hold) 및 크로스헤어 플레이스먼트 연습 툴. 모퉁이 벽에서의 튀어나옴(피킹)에 대한 적정 대기폭과 격발 반응속도를 측정하고 피커스 어드밴티지를 무력화하는 방어 프리 에임을 단련하세요.",
  keywords: [
    "대기 에임 연습",
    "각 쪼개기 에임",
    "크로스헤어 플레이스먼트 연습",
    "피커스 어드밴티지 대처 훈련",
    "발로란트 대기 에임",
    "서든어택 대기 에임",
    "카스2 각 쪼개기",
    "에임 대기폭 조절",
    "반응속도 테스트 fps",
    "프리 에임 훈련",
    "모퉁이 대기 에임",
    "피킹 반응속도 훈련"
  ],
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/fps/angle-hold-trainer",
    languages: getAlternateLanguages('/drills/fps/angle-hold-trainer'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
      title: "대기 에임 연습 – 각 쪼개기·피커스 어드밴티지 대처 | SkillDrills",
    description: "무료 브라우저 FPS 대기 에임(Angle Hold) 및 크로스헤어 플레이스먼트 연습 툴. 모퉁이 벽에서의 튀어나옴(피킹)에 대한 적정 대기폭과 격발 반응속도를 측정하고 피커스 어드밴티지를 무력화하는 방어 프리 에임을 단련하세요.",
    url: "https://skilldrills.online/ko/drills/fps/angle-hold-trainer",
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
      title: "대기 에임 연습 – 각 쪼개기·피커스 어드밴티지 대처 | SkillDrills",
    description: "무료 브라우저 FPS 대기 에임(Angle Hold) 및 크로스헤어 플레이스먼트 연습 툴. 모퉁이 벽에서의 튀어나옴(피킹)에 대한 적정 대기폭과 격발 반응속도를 측정하고 피커스 어드밴티지를 무력화하는 방어 프리 에임을 단련하세요.",
  },
};

export default function KoreanAngleHoldPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "FPS 훈련", "item": "https://skilldrills.online/ko/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "대기 에임 연습", "item": "https://skilldrills.online/ko/drills/fps/angle-hold-trainer" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "대기 에임 연습 (Angle Hold Pro)",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "모퉁이 벽에서의 적 튀어나옴(피킹)에 대한 크로스헤어 플레이스먼트, 적정 대기폭, 방어 앵글 유지 반응속도를 훈련하는 무료 웹 브라우저 FPS 에임 트레이너.",
    "genre": "FPS Training / Crosshair Placement",
    "url": "https://skilldrills.online/ko/drills/fps/angle-hold-trainer",
    "dateModified": "2026-09-11",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "대기 에임 연습 (Angle Hold Trainer)",
    "url": "https://skilldrills.online/ko/drills/fps/angle-hold-trainer",
    "description": "모퉁이 벽에서의 적 튀어나옴(피킹)에 대한 크로스헤어 플레이스먼트, 적정 대기폭, 방어 앵글 유지 반응속도를 훈련하는 무료 웹 브라우저 FPS 에임 트레이너.",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "browserRequirements": "Requires HTML5 Canvas and Pointer Lock API support",
    "dateModified": "2026-09-11"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "대기 에임 연습 (Angle Hold Pro)",
    "url": "https://skilldrills.online/ko/drills/fps/angle-hold-trainer",
    "description": "모퉁이 벽에서의 적 튀어나옴(피킹)에 대한 크로스헤어 플레이스먼트, 적정 대기폭, 방어 앵글 유지 반응속도를 훈련하는 무료 웹 브라우저 FPS 에임 트레이너.",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-11"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-11",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "대기 에임(각 쪼개기・크로스헤어 플레이스먼트)이란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "대기 에임(Angle Hold)이란 적이 튀어나올 것으로 예상되는 모퉁이 벽이나 초크포인트의 헤드라인(머리 높이)에 미리 조준선을 거치해 두고 대기하는 방어 기본기입니다. 적이 나타난 후 마우스를 끌어 치는 플릭 에임과 달리 조준 소요 시간을 0으로 줄여 순수한 반응 격발만으로 적을 처치합니다."
        }
      },
      {
        "@type": "Question",
        "name": "FPS에서 피커스 어드밴티지(Peeker's Advantage, 튀어나오는 자의 이점)란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "피커스 어드밴티지는 온라인 게임의 클라이언트-서버 통신 지연(핑 및 보간 버퍼)으로 인해 발생합니다. 벽에서 튀어나오는 공격자의 움직임이 서버를 거쳐 방어자의 화면에 렌더링되기까지 약 40~90ms의 시간차가 발생하여, 움직이는 공격자가 가만히 서 있는 방어자를 먼저 보게 됩니다."
        }
      },
      {
        "@type": "Question",
        "name": "발로란트나 카스2에서 모퉁이를 지킬 때 조준선을 벽에서 얼마나 떼어놓아야 하나요(대기폭)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "적정 대기폭은 자신의 시각 반응속도와 적의 피킹 속도(와이드 스윙인지 숄더 피킹인지)에 비례합니다. 벽 모서리에 조준선을 딱 붙이면 인간의 생리적 시각 지연(약 180~220ms)으로 인해 적의 머리가 조준선을 지나치므로, 적이 스스로 조준선 안으로 달려와 걸리도록 캐릭터 몇 걸음 정도 바깥쪽 공간에 대기폭을 둡니다."
        }
      },
      {
        "@type": "Question",
        "name": "대기 에임 중 상대의 페이크 피크(숄더 피크)에 낚여 성급하게 격발하는 원인은 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "성급한 조기 격발은 인지적 긴장감 및 Go/No-Go 판단 실패로 인해 발생합니다. 완전히 몸이 드러난 유효 표적과 살짝 낚시성으로 찌르는 숄더 피크를 시각적으로 구별하는 트리거 디시플린(격발 절제력) 훈련을 반복하여 뇌의 충동 억제 회로를 단련해야 합니다."
        }
      },
      {
        "@type": "Question",
        "name": "대기 에임과 프리 에임(각 지우기/클리어링)의 차이점은 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "대기 에임은 방어자가 유리한 위치를 선점하고 적이 진입하기를 기다리는 수동적 방어 기술인 반면, 프리 에임은 공격자가 모퉁이를 돌면서 적이 숨어 있을 법한 각을 하나씩 조준선으로 지워나가는(각 쪼개기) 능동적 진입 기술입니다."
        }
      },
      {
        "@type": "Question",
        "name": "넷코드상 피커스 어드밴티지의 지연 시간 계산 공식은?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "피커스 어드밴티지 지연 시간 공식은 대체로 'T_advantage = (RTT_peeker / 2) + (RTT_holder / 2) + T_interp'로 정의됩니다. 양 플레이어의 편도 핑 합계에 서버 보간 지연을 더한 값이 정지해 있는 방어자가 겪게 되는 순수 시각 지연 결손폭입니다."
        }
      },
      {
        "@type": "Question",
        "name": "모니터 주사율(Hz)이 대기 에임 반응속도에 미치는 영향은?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "모니터 주사율은 시각 프레임 지연을 직접 단축합니다. 60Hz 모니터의 프레임 간격은 약 16.67ms인 반면 240Hz는 4.17ms, 360Hz는 2.78ms에 불과하여, 적이 모퉁이에서 튀어나오는 첫 번째 프레임이 망막에 도달하는 물리적 시간을 10ms 이상 앞당겨 줍니다."
        }
      },
      {
        "@type": "Question",
        "name": "오프 앵글(비정석 포지션)을 활용하는 이유는 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "정석적인 모퉁이 대기 위치는 공격자에게 프리파이어(예측 샷)를 당할 위험이 큽니다. 일반적인 각에서 반 보 벗어난 오프 앵글에 서면 적의 사전 조준선이 빗나가게 되어 공격자에게 미세 조준(마이크로 플릭)을 강제함으로써 교전 우위를 점할 수 있습니다."
        }
      },
      {
        "@type": "Question",
        "name": "대기 에임 훈련은 하루에 얼마나 수행해야 하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "랭크 게임 시작 전 10~15분 동안 짧고 강도 높은 대기 에임 드릴을 진행하는 것이 신경계 피로를 방지하면서 순발력과 격발 절제력을 최상의 상태로 예열하는 데 가장 이상적입니다."
        }
      },
      {
        "@type": "Question",
        "name": "이 도구는 브라우저에서 하드웨어 마우스 로우 인풋을 지원하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "네. HTML5 Pointer Lock API를 통해 운영체제 및 브라우저의 마우스 가속을 배제한 1:1 하드웨어 입력을 제공합니다. 모든 클릭 시간은 performance.now() 고해상도 타이머로 정밀 측정됩니다. 보안상 브라우저 타이머는 약 1ms로 반올림되며 디스플레이 주사율 오차를 감안할 때 5ms 미만의 차이는 측정 노이즈로 간주됩니다."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "대기 에임(각 쪼개기) 및 피킹 대처 연습 방법",
    "description": "모퉁이 벽에서의 적 튀어나옴에 맞춘 헤드라인 정렬, 대기폭 설정, 단발 격발 훈련의 단계별 가이드.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "대기폭(벽 이격 거리) 설정",
        "text": "모퉁이 벽 끝에 조준선을 딱 붙이지 말고, 자신의 시각 반응속도에 맞춰 적절한 간격(대기폭)을 두고 거치합니다.",
        "url": "https://skilldrills.online/ko/drills/fps/angle-hold-trainer#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "헤드라인 수평 고정",
        "text": "맵 상의 상자 모서리나 벽면 구조물을 기준으로 적 머리 높이에 조준선 높이를 수평으로 완벽하게 고정합니다.",
        "url": "https://skilldrills.online/ko/drills/fps/angle-hold-trainer#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "상대 피킹 속도 예측",
        "text": "적의 이동 속도(달려 나오는 와이드 스윙인지 천천히 엿보는 숄더 피킹인지)를 감안하여 대기폭을 미세 조정합니다.",
        "url": "https://skilldrills.online/ko/drills/fps/angle-hold-trainer#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "조준선 진입 즉시 단발 격발",
        "text": "적 표적이 조준선 중앙에 진입하는 순간 마우스를 흔들지 말고 침착하게 원클릭으로 격발하여 불필요한 보정 지연을 제거합니다.",
        "url": "https://skilldrills.online/ko/drills/fps/angle-hold-trainer#step-4"
      }
    ]
  };

  const angleHoldGuideKo = {
    heading: "대기 에임(각 쪼개기) 완벽 가이드 — 반응 지연, 넷코드 및 기하학 분석",
    intro: [
      "방어적 대기 에임(Angle Holding)은 프란시스쿠스 돈더스의 단순 반응 시간(Donders, 1868)과 Go/No-Go 선택적 억제 기전에 지배받는 전술 FPS의 핵심 기본기입니다. 표적 탐색과 손목 급가속을 수반하는 플릭 사격(Woodworth, 1899; Meyer et al., 1988)과 달리, 조준선을 미리 적 머리 이동선상에 고정함으로써 2차원 공간 조준 과정을 '순수한 1차원 시간 격발'로 단순화합니다.",
      "발로란트나 카스2와 같은 온라인 멀티플레이어 환경에서는 네트워크 패킷 왕복 지연으로 인해 모퉁이를 돌아 나오는 공격자가 정지해 있는 방어자를 먼저 보게 되는 '피커스 어드밴티지(Peeker's Advantage)'가 필연적으로 발생합니다(T_advantage = RTT_peeker/2 + RTT_holder/2 + T_interp). 이러한 불리함을 상쇄하려면 벽 모서리에 조준선을 붙이지 않고 D_offset = v_peeker × T_reaction 공식에 따라 일정 간격(대기폭)을 띄워 두어야 합니다.",
      "본 훈련 도구는 1000Hz 마우스 폴링과 디스플레이 주사율 동기화, performance.now() 고해상도 크로노메트리를 기반으로 작동합니다. 이를 통해 입출력 양자화 노이즈를 최소화(Woods et al., 2015)하여 페이크 피크 구별 능력과 순수 격발 반응속도를 정밀하게 측정합니다(Fitts, 1954; Hick, 1952).",
      "측정 방식 안내: 모든 이벤트는 브라우저의 performance.now() 고해상도 시계를 통해 사용자 기기 내에서 100% 로컬로 측정됩니다. 브라우저 보안 규정(Spectre 방지)상 타이머는 약 1ms 단위로 처리되며 화면 갱신 주사율(60Hz 약 16.7ms, 144Hz 약 6.9ms, 240Hz 약 4.1ms)에 따른 오차가 존재하므로, 약 5ms 미만의 차이는 측정 환경 노이즈로 간주하고 동일 환경에서의 점진적 기록 향상에 집중하는 것이 바람직합니다."
    ],
    benchmarks: {
      title: "대기 에임 방어 반응속도 및 넷코드 기준 지표 (ms)",
      headers: ["교전 단계 / 지표", "평균 레이텐시 (ms)", "신경생리학 및 넷코드 요인", "퍼포먼스 등급 분류"],
      rows: [
        ["단순 시각 자극 격발 반응속도", "150 – 190 ms", "망막 중심와 수용 및 운동 피질 발화", "예상된 자극에 대한 무의식적 격발 반응 (Donders, 1868)"],
        ["선택적 식별 반응 지연 (페이크/숄더 피크)", "210 – 280 ms", "Go/No-Go 인지적 실표적 식별", "낚시성 움직임에 대한 조기 격발 자제력 (Hick, 1952)"],
        ["피커스 어드밴티지 지연 결손폭", "40 – 90 ms", "클라이언트-서버 RTT 왕복 지연 + 보간 버퍼", "이동 중인 공격자에게 생기는 넷코드상 시각 선행권"],
        ["실질적 방어 유효 반응 윈도우", "250 – 340 ms", "생체 시각 반응 시간 + 넷코드 결손폭 합산", "전술 FPS 경쟁전 방어자의 표준 임계선"],
        ["최상위권 프리 에임 고정 정밀도", "170 – 220 ms", "적의 튀어나오는 속도와 완벽히 동기화된 대기폭", "발로란트 레디언트 / 카스2 페이스잇 10레벨 방어 정점"]
      ],
      note: "수치는 인지 반응 크로노메트리 문헌(Donders, 1868; Hick, 1952; Woods et al., 2015)과 FPS 넷코드 아키텍처 분석을 토대로 산출되었습니다. 개인별 반응속도는 모니터 주사율과 마우스 폴링률, 컨디션에 따라 달라집니다."
    },
    techniques: {
      title: "전술적 크로스헤어 플레이스먼트 & 대기폭 기하학 원칙",
      items: [
        {
          name: "벽 모서리 이격 거리(대기폭)의 엄격한 교정",
          desc: "조준선을 모퉁이 벽면에 딱 붙여놓는 것은 가장 흔한 실수입니다. 자신의 시각 반응속도(약 200ms)와 상대방의 피킹 속도를 계산하여 적이 스스로 조준선에 걸려들도록 통과 예상 지점에 여유 공간을 둡니다.",
          tips: "적의 머리가 조준선을 지나쳐서 격발된다면 대기폭을 15~20% 더 넓히세요."
        },
        {
          name: "환경 기준점을 활용한 헤드라인 유지",
          desc: "맵 내 상자의 이음새, 문 손잡이, 벽면 텍스처 띠 등 머리 높이에 일치하는 배경 요소를 가이드라인 삼아 조준선 수평 높이를 고정합니다.",
          tips: "수동적으로 대기할 때 조준선이 바닥 쪽으로 슬그머니 처지는 '바닥 에임' 습관을 원천 차단하세요."
        },
        {
          name: "'쫓아가지 않고 걸리면 쏜다'의 원칙",
          desc: "대기 에임의 핵심은 적이 나타났을 때 마우스를 움직여 맞추려 하지 않고, 조준선 안으로 적의 머리가 들어오는 순간 클릭하는 것입니다. 마우스를 흔들면 80~120ms의 운동 보정 지연이 발생합니다.",
          tips: "자신이 배치한 조준선을 신뢰하고, 조준선 약간 앞쪽 공간에 시각적 초점을 두고 기다리세요."
        },
        {
          name: "오프 앵글(비정석 위치) 활용",
          desc: "누구나 알고 있는 정석적인 모퉁이 위치는 상대방에게 프리파이어를 당하기 쉽습니다. 일반적인 각에서 반 걸음 벗어난 변칙 위치에 서서 상대의 사전 조준을 무력화하세요.",
          tips: "오프 앵글을 잡을 때는 첫 교전 후 안전하게 숨거나 퇴각할 수 있는 엄폐 동선을 반드시 확보하세요."
        }
      ]
    },
    steps: [
      "'훈련 시작'을 클릭하여 전체화면으로 전환하고 마우스 커서를 고정합니다.",
      "적이 나타날 초크포인트를 바라보고 헤드라인에 조준선을 정렬한 뒤 적정 대기폭을 둡니다.",
      "손목에 불필요한 힘을 빼고 차분하게 모퉁이 틈을 주시합니다.",
      "표적이 조준선 면을 가르는 즉시 마우스를 흔들지 말고 단발로 신속히 클릭합니다.",
      "페이크 피크에 흔들리지 않는 자제력을 유지하며 평균 반응속도(ms)와 적중률을 분석합니다."
    ],
    audience: "발로란트, 카스2, 레인보우 식스 시즈 등 택티컬 FPS 플레이어, 사이트 방어 앵커 포지션, 정밀한 크로스헤어 플레이스먼트와 격발 절제력을 기르고자 하는 모든 게이머.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'meyer1988', 'woodworth1899'),
    related: [
      { href: "/drills/fps/flick-shot-training", label: "프로 플릭샷 트레이너" },
      { href: "/drills/fps/180-degree-awareness", label: "180도 화면전환 인식 훈련" },
      { href: "/drills/fps/micro-correction-precision", label: "마이크로 에임 미세보정" },
      { href: "/drills/reaction-speed/reaction-time-test", label: "반응속도 테스트" }
    ]
  };

  const copyKo = {
    h1Prefix: null,
    h1Keyword: "대기 에임 연습",
    h1Suffix: null,
    subtitle: "각 쪼개기 & 피커스 어드밴티지 대처 트레이너",
    caption: "모퉁이 벽에서의 적 튀어나옴(피킹)에 대처하여 적정 대기폭을 유지하고 즉각 사격하는 대기 에임 훈련 도구. F.C. 돈더스의 단순 반응 시간(Donders, 1868)과 앵글 기하학을 바탕으로 피커스 어드밴티지를 제압하는 방어형 프리 에임을 단련합니다.",
    startTitle: "대기 에임 연습 (Angle Hold Pro)",
    startSubtitle: "각 쪼개기・피킹 반응・트리거 디시플린 • 무한 난이도 진행",
    statScore: "점수",
    statTime: "남은 시간",
    statAccuracy: "정확도",
    statBestScore: "최고 점수",
    statAvgReaction: "평균 반응속도",
    statMaxCombo: "최대 콤보",
    statPeakLevel: "도달 레벨",
    getReady: "조준선을 거치하세요",
    bottomCaption: "벽 모서리에서 적정 대기폭을 두고 조준선을 고정한 뒤, 표적이 튀어나오는 순간 즉시 클릭하세요.",
    accordionRulesTitle: "훈련 규칙 및 점수 산정 방식",
    accordionAboutTitle: "대기 에임 연습 (Angle Hold Pro) 상세 안내",
    overviewTitle: "대기 에임과 크로스헤어 플레이스먼트의 원리",
    overviewLead: "대기 에임이란 적이 출현할 위치에 미리 조준선을 대기시켜 두고, 적이 겹쳐지는 순간 사격하는 방어 기술입니다. 인간의 단순 시각 반응 시간은 약 200~250ms이지만, 적의 행동을 구별하는 인지 판단이 개입되면 선택지 수에 따라 반응 시간이 지수적으로 증가합니다(Donders, 1868; Hick, 1952).",
    rulesItems: [
      { num: "1", text: "표적 명중", highlight: "+100 PTS (+0.6초)", result: "× 콤보 × 레벨 배율" },
      { num: "2", text: "콤보 시스템", highlight: "최대 3.0배 점수", result: "연속 적중 시 더욱 빠르고 가혹한 피킹 발생" },
      { num: "3", text: "레벨 진행", highlight: "+1 레벨 / 1400 PTS", result: "노출 시간 단축 및 적응형 표적 축소" },
      { num: "4", text: "놓침・오발・조기 격발", highlight: "실패 페널티", result: "콤보 리셋 (시간 페널티 활성 시 -0.8초)" }
    ],
    aboutCards: [
      { iconBg: "bg-blue-600", title: "추천 대상 플레이어", text: "발로란트에서 사이트를 홀딩하는 앵커, 카스2에서 초크포인트를 수비하는 디펜더, 정밀한 프리 에임 반응을 극한으로 끌어올리고 싶은 게이머." },
      { iconBg: "bg-orange-600", title: "향상되는 핵심 역량", text: "벽과의 적정 대기폭 조절 능력, 트리거 디시플린(성급한 격발 자제), 튀어나옴 반응속도, 고저차 헤드라인 유지력." },
      { iconBg: "bg-purple-600", title: "페이크 피크 대처", text: "고난도 구간에서는 표적이 낚시성 페이크 스윙을 시도합니다. 불완전한 노출에서의 조기 격발을 억제하고 온전한 실노출을 확인한 뒤 쏘는 판단력을 기릅니다." }
    ],
    aboutSections: [
      {
        title: "벽에서 얼마나 떼어놓고 대기해야 하는가 (대기폭의 중요성)",
        paragraphs: [
          "모퉁이 대기 시 가장 치명적인 실수는 조준선을 벽 모서리에 딱 붙여놓고 기다리는 것입니다. 인간의 시각 정보 처리와 신경 전달에는 물리적 지연(약 180~220ms)이 존재하므로, 벽에 붙여두면 상대의 빠른 피킹 속도를 따라잡지 못해 머리가 지나간 뒤 허공을 쏘게 됩니다.",
          "자신의 반응속도와 상대의 이동 속도(와이드 스윙인지 천천히 각을 쪼개는지)를 계산하여 미리 통과 예상 지점에 여유 공간을 확보해 두면 상대가 자발적으로 조준선 안으로 뛰어드는 형태를 만들 수 있습니다."
        ]
      },
      {
        title: "점진적 난이도 에스컬레이션",
        paragraphs: [
          "점수가 상승함에 따라 레벨이 올라가며 표적의 노출 시간(노출 윈도우)이 지속적으로 단축되고 피킹 간격이 조밀해집니다. 실제 경쟁전의 1대 다 클러치 상황에서 마주하는 극도의 긴장감을 재현합니다."
        ]
      },
      {
        title: "기록 및 분석되는 핵심 지표",
        paragraphs: [
          "평균 반응속도(ms)는 표적이 출현한 시점부터 클릭을 완료하기까지의 순수 응답 시간을 측정합니다. 최대 콤보 수는 조기 격발이나 놓침 없이 얼마나 견고한 방어 절제력을 유지했는지를 증명합니다."
        ]
      }
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

      <AngleHoldClient copy={copyKo} />

      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="fps" currentHref="/drills/fps/angle-hold-trainer" locale="ko" />
      </div>

      <DrillGuide guide={angleHoldGuideKo} />
    </>
  );
}
