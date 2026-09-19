import InstantResponseClient from '@/app/drills/fps/instant-response/InstantResponseClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';

export const metadata = {
  title: "FPS 반응속도 테스트 – 에임 반사신경·클릭 속도 | SkillDrills",
  description: "브라우저에서 무료로 측정하는 FPS 반응속도 테스트. 시각 자극 인지부터 클릭까지의 반사신경 잠복기(ms)를 밀리초 단위로 정밀 측정하고, 페인트 사격 억제와 앵글 홀드 반응을 극대화합니다.",
  keywords: [
    "FPS 반응속도 테스트",
    "에임 반응속도 측정",
    "반응속도 테스트 게임",
    "클릭 반응속도",
    "발로란트 반응속도 테스트",
    "카스2 반응속도",
    "FPS 반사신경 훈련",
    "에임 트레이너 무료",
    "트리거 반응속도",
    "인스턴트 에임 반응",
    "FPS 반사신경 측정",
    "앵글 홀드 반응속도"
  ],
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/fps/instant-response",
    languages: getAlternateLanguages('/drills/fps/instant-response'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "FPS 반응속도 테스트 – 에임 반사신경·클릭 속도 | SkillDrills",
    description: "시각 자극에 대한 클릭 반응 시간(ms)을 정밀 측정하고 페인트 사격을 억제하는 무료 브라우저 FPS 에임 반사신경 트레이너.",
    url: "https://skilldrills.online/ko/drills/fps/instant-response",
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "FPS 반응속도 테스트 – 에임 반사신경·클릭 속도 | SkillDrills",
    description: "시각 자극에 대한 클릭 반응 시간(ms)을 정밀 측정하고 페인트 사격을 억제하는 무료 브라우저 FPS 에임 반사신경 트레이너.",
  },
};

export default function InstantResponseKoPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ko" },
      { "@type": "ListItem", "position": 2, "name": "FPS 에임 트레이너", "item": "https://skilldrills.online/ko/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "FPS 반응속도 테스트", "item": "https://skilldrills.online/ko/drills/fps/instant-response" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "FPS 반응속도 테스트",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "시각 자극 인지, 신경 전달 잠복기, 클릭 반사 속도를 밀리초 단위로 정밀 측정하고 훈련하는 무료 브라우저 FPS 반사신경 드릴.",
    "genre": "FPS Training / Reaction Speed",
    "url": "https://skilldrills.online/ko/drills/fps/instant-response",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "FPS 반응속도 테스트",
    "url": "https://skilldrills.online/ko/drills/fps/instant-response",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "브라우저에서 실행되는 정밀 FPS 반응속도 측정 테스트. 페인트 자극을 식별하고 최단 시간 클릭 격발을 훈련합니다."
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "FPS 반응속도 테스트",
    "url": "https://skilldrills.online/ko/drills/fps/instant-response",
    "description": "시각 자극 인지, 신경 전달 잠복기, 클릭 반사 속도를 밀리초 단위로 정밀 측정하고 훈련하는 무료 브라우저 FPS 반사신경 드릴.",
    "dateModified": "2026-09-05",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Reaction Trainer", "Aim Trainer"],
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
        "name": "FPS에서 반응속도(Reaction Time)란 무엇이며 어떻게 측정되나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "화면에 적 목표가 나타난 순간부터 마우스 클릭이 물리적으로 입력되기까지의 시간 간격(밀리초)입니다. 망막의 광수용, 시신경 전달, 대뇌 피질 처리, 척수로 신경 전달, 손가락 스위치 입력까지의 전 과정을 포함합니다."
        }
      },
      {
        "@type": "Question",
        "name": "프로게이머들의 평균 반응속도는 어느 정도인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "일반 성인의 단순 시각 반응속도가 220~260ms 수준인 데 반해, 고주사율 모니터(144Hz~360Hz) 환경에서 훈련된 FPS 프로 선수들은 165~195ms를 안정적으로 기록하며, 초집중 상태에서는 160ms 미만에 도달합니다."
        }
      },
      {
        "@type": "Question",
        "name": "반응속도는 의도적인 훈련으로 향상시킬 수 있나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "네. 신경 전도 속도 자체는 생물학적으로 제한적이지만, 시각 자극에 대한 뇌 시냅스 경로를 강화하고 망설임을 없애는 운동 준비 전위를 최적화함으로써 20~40ms의 반응 시간 단축이 가능합니다."
        }
      },
      {
        "@type": "Question",
        "name": "단순 반응 시간과 선택 반응 시간의 차이는 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "1868년 돈데르스가 정립한 개념으로, 단 하나의 자극에 대해 정해진 단일 동작을 수행하는 것이 단순 반응 시간(Type A)입니다. 여러 자극을 식별하고 판단하는 선택 반응 시간(Type B)은 힉의 법칙에 따라 인지 판단 지연이 추가됩니다."
        }
      },
      {
        "@type": "Question",
        "name": "인간의 시각 반응속도 생물학적 한계는 몇 밀리초인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "망막 광전환(30~50ms), 대뇌 시각피질 평가(50~70ms), 척수 신경 전달(20~30ms), 손가락 근육 전기기계적 지연(약 30ms)으로 인해 무예측 상태에서 인간의 생물학적 하한선은 약 130~150ms로 알려져 있습니다."
        }
      },
      {
        "@type": "Question",
        "name": "모니터 주사율과 마우스 폴링레이트가 반응속도에 영향을 주나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "매우 큰 영향을 미칩니다. 60Hz 모니터는 프레임 표시 지연이 최대 16.7ms에 달하지만, 240Hz 모니터는 4.16ms로 줄어들어 12.5ms의 하드웨어 이점을 제공합니다. 또한 1000Hz 마우스는 1ms 간격으로 좌표를 보고하여 입력 지터를 최소화합니다 (Woods et al., 2015)."
        }
      },
      {
        "@type": "Question",
        "name": "조기 격발(예측 클릭)은 왜 패널티를 받나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "시각적 확인 없이 타이밍 예측에만 의존해 사격하면 실전에서 상대의 페이크 무빙이나 피킹 타이밍 변화에 취약해집니다. 본 드릴은 무작위 대기 시간과 흐린 페인트를 배치하여 시각 확인 후 발사하는 엄격한 격발 규율을 훈련합니다."
        }
      },
      {
        "@type": "Question",
        "name": "수면 부족과 피로는 반응속도에 어떤 영향을 미치나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "수면 부족과 정신적 피로는 중추신경계 각성망을 둔화시켜 반응 잠복기를 40~80ms 이상 증가시킵니다. 이는 가벼운 음주 상태와 유사한 인지 저하 수준입니다."
        }
      },
      {
        "@type": "Question",
        "name": "발로란트나 카스2에서 각을 쨀 때(앵글 홀드) 반응속도를 극대화하는 법은?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "피커스 어드밴티지(Peeker's Advantage)로 인해 뛰어나오는 적이 시각적 우선권을 가지므로, 본인의 반응속도에 맞춰 크로스헤어를 벽 모서리에서 살짝 떼어 배치(오프셋)하는 것이 가장 효과적입니다."
        }
      },
      {
        "@type": "Question",
        "name": "경기 전 가장 효과적인 반사신경 워밍업 루틴은 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "손가락과 손목 스트레칭 3분, 본 드릴을 활용한 단순 반응 자극 훈련 5분, 실전 마이크로 플릭 에임 연습 2분으로 이어지는 10분 루틴이 신경계를 최적 상태로 활성화합니다."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "FPS 반응속도 정확한 측정 및 훈련 방법",
    "description": "시각 반응속도와 격발 반사신경을 정확히 측정하고 단련하는 단계별 가이드.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "감도 일치 및 포인터 락 활성화",
        "text": "세션 설정에서 주 게임 감도를 일치시킨 후 '훈련 시작'을 클릭하여 Pointer Lock을 고정합니다."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "중앙 조준선에 시선 고정 및 긴장 완화",
        "text": "전완근의 힘을 빼고 부드러운 집중 상태로 중앙 트리거 레티클에 시선을 둡니다."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "트리거 스위치 프리로드 준비",
        "text": "검지 손가락을 마우스 스위치 직전 지점에 가볍게 접촉시켜 물리적 이동 거리를 없앱니다."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "녹색 플래시 식별 시 즉각 클릭",
        "text": "무작위 지연 후 녹색 불빛이 점등되는 찰나에 즉각 격발하며, 흐린 페인트 자극에는 반응하지 않는 자제력을 유지합니다."
      }
    ]
  };

  const instantResponseGuide = {
    heading: "FPS 반응속도 테스트 가이드 & 멘탈 크로노메트리 벤치마크",
    intro: [
      "FPS 반응속도 테스트는 FPS 게이머의 순수 감각운동 반사 잠복기(Mental Chronometry)를 객관적으로 측정하고 훈련하기 위해 설계된 과학적 훈련 도구입니다. 발로란트나 카스2 같은 전술 슈팅 게임에서 앵글 홀드 교전의 승패는 찰나의 반응속도에 의해 결정됩니다.",
      "멘탈 크로노메트리의 학문적 기원은 네덜란드 안과의사 프란시스쿠스 돈데르스(1868)의 감산법에서 시작되었습니다. 단 하나의 자극에 대해 즉각 반응하는 '단순 반응 시간(Type A)'은 인간 대뇌 피질과 중추신경계의 순수한 정보 전달 능력을 보여줍니다.",
      "본 트레이너는 HTML5 Pointer Lock API 환경에서 브라우저의 performance.now() 고해상도 타임스탬프를 통해 밀리초 단위로 측정됩니다 (Woods et al., 2015). 조준선 이동 거리가 개입되는 플릭 훈련과 달리, 순수한 시각 감지부터 격발 명령까지의 신경 잠복기만을 정확히 분리 측정합니다.",
      "측정 방식 안내: 모든 반응 시간은 브라우저의 performance.now() 고정밀 클록을 통해 기기 내부에서 로컬로 측정되며 서버로 전송되지 않습니다. 브라우저 보안 타이머 완화(Spectre 방지, 통상 약 1ms) 및 디스플레이 주사율(60Hz 기준 약 16.7ms, 144Hz 기준 약 6.9ms, 240Hz 기준 약 4.1ms)에 따른 오차가 존재하므로 5ms 미만의 차이는 측정 노이즈로 간주하고 동일 기기 내에서의 기록 향상 추이를 비교하는 것이 바람직합니다 (Woods et al., 2015)."
    ],
    benchmarks: {
      title: "반응속도 & 감각운동 잠복기 등급 기준",
      headers: ["퍼포먼스 등급", "측정 반응속도 (ms)", "신경근 생체역학적 상태", "실전 게임 적용 영향"],
      rows: [
        ["티어 1 (정점의 반사신경)", "130 – 165 ms", "생물학적 한계 영역: 망막 광수용 최적화, 준비 전위 완성, 초저지연 하드웨어", "일반적인 50/50 모퉁이 앵글 홀드 교전에서 거의 100% 선제 타격 가능"],
        ["티어 2 (프로게이머 수준)", "165 – 195 ms", "고도의 각성 상태, 고주사율 모니터(240Hz+), 조건화된 무의식적 격발", "발로란트 레디언트, 카스2 Faceit 10레벨 상위권 게이머 기준"],
        ["티어 3 (상위권 FPS 유저)", "195 – 225 ms", "안정된 감각운동 조화, 표준 게이밍 장비(144Hz), 망설임 없는 클릭", "올바른 크로스헤어 배치와 결합 시 중원거리 방어선 유지 가능"],
        ["티어 4 (일반 게이머 평균)", "225 – 265 ms", "훈련되지 않은 일반 성인 기준치, 60Hz~144Hz 환경, 미세한 인지 지연", "공격자의 과감한 와이드 피킹에 대해 각을 좁히지 않으면 취약"],
        ["티어 5 (피로 누적 / 인풋랙)", "265 – 330+ ms", "누적된 피로, 수면 부족, 높은 하드웨어 입력 지연 또는 긴장 과다", "시각 인지 후 격발까지의 딜레이로 실전에서 지속적인 데스 발생"]
      ],
      note: "수치는 돈데르스의 단순 반응 시간 모델(1868)과 디지털 크로노메트리 기준(Woods et al., 2015)을 바탕으로 구성되었습니다."
    },
    techniques: {
      title: "트리거 반응속도를 극대화하는 실전 테크닉",
      items: [
        {
          name: "시선 집중 및 중심와 앵커링",
          desc: "화면 전체를 흐릿하게 보지 말고, 자극이 나타나는 중앙 레티클에 시선을 정확히 고정하세요. 포즈너의 연구(1990)에 따르면 공간적 주의를 집중시키면 시각 피질의 신호 처리가 15~25ms 단축됩니다.",
          tips: "눈에 과도한 힘을 주지 말고 편안하게 중심을 응시하는 집중력을 유지하세요."
        },
        {
          name: "검지 스위치 프리트래블 제거",
          desc: "클릭 직전에 검지 손가락을 마우스 스위치의 작동 지점 바로 앞까지 가볍게 밀착시켜 두세요. 물리적 허공 이동 거리를 없애면 20~35ms의 기계적 시간을 줄일 수 있습니다.",
          tips: "팔 전체에 힘이 들어가면 오히려 반사신경이 굳어지므로 손가락 끝만 가볍게 준비하세요."
        },
        {
          name: "하드웨어 지연의 최소화",
          desc: "고주사율 모니터(144Hz~360Hz)를 사용하고 마우스 폴링레이트를 1000Hz 이상으로 설정하며 수직동기화(V-Sync)를 해제하세요. 인게임 NVIDIA Reflex나 AMD Anti-Lag을 켜서 렌더링 지연을 제거합니다.",
          tips: "디스플레이 스케일링을 GPU가 아닌 디스플레이로 설정하여 추가 입력 지연을 방지할 수 있습니다."
        },
        {
          name: "호흡 조절을 통한 각성 수치 안정화",
          desc: "과도한 흥분은 페인트 자극에 낚이는 조기 격발을 부릅니다. 여키스-도슨 법칙에 따라 코로 천천히 복식호흡을 진행하여 최적의 각성 영역을 유지하세요.",
          tips: "불빛이 켜지기 전에 손가락이 멋대로 나간다면 호흡을 가다듬고 침착함을 되찾으세요."
        }
      ]
    },
    steps: [
      "세션 설정에서 선호하는 마우스 감도를 맞춰 입력 좌표를 일관되게 고정합니다.",
      "'훈련 시작'을 클릭하여 전체화면과 Pointer Lock을 활성화합니다.",
      "중앙 조준선에 시선을 두고 검지 손가락을 스위치 작동 지점에 가볍게 얹습니다.",
      "녹색 플래시가 번쩍이는 순간 번개처럼 클릭하며, 무작위 대기 시간 중 조기 격발을 억제합니다.",
      "훈련 종료 후 평균 반응시간(ms), 표준편차, 콤보 기록을 확인하여 최고 기록을 경신합니다."
    ],
    audience: "발로란트, 카스2 등에서 앵글 홀드 반응을 높이고자 하는 게이머, 자신의 반사신경을 정밀 측정하고 싶은 플레이어, 격발 찰나의 순발력을 기르고자 하는 모든 FPS 유저.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'posner1990', 'donders1969', 'hick1952'),
    related: [
      { href: "/drills/fps/angle-hold-trainer", label: "앵글 홀드 (크로스헤어 배치) 트레이너" },
      { href: "/drills/fps/flick-shot-training", label: "플릭 에임 연습" },
      { href: "/drills/fps/180-degree-awareness", label: "180도 플릭 에임 연습" },
      { href: "/drills/reaction-speed/reaction-time-test", label: "반응속도 테스트" },
      { href: "/drills/reaction-speed/reflex-training-drill", label: "반사신경 트레이닝" }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
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
      <InstantResponseClient
        copy={{
          h1Keyword: "FPS 반응속도 테스트",
          h1Suffix: " - 에임 반사신경·클릭 속도 측정",
          statScore: "점수",
          statTime: "남은 시간",
          statAccuracy: "명중률",
          statBestScore: "최고 점수",
          startTitle: "FPS 반응속도 테스트",
          startSubtitle: "시각 반응 잠복기 & 반사신경 • 무한 난이도 진행",
          getReady: "준비 완료",
          pausedTitle: "일시 정지됨",
          pausedSubtitle: "클릭하여 재개 — 커서 잠금이 다시 활성화됩니다",
          stageCaption: "중앙 목표가 녹색으로 번쩍이는 즉시 클릭하세요. 어두운 페인트 자극을 걸러내는 격발 규율이 필요합니다.",
          rulesTitle: "훈련 규칙 & 점수 체계",
          rulesItems: [
            { num: "1", text: "플래시 반응 명중", highlight: "+100 PTS (+0.6s)", result: "×콤보 배율" },
            { num: "2", text: "스피드 보너스 체계", highlight: "150ms 미만 적중", result: "최대 +150 PTS" },
            { num: "3", text: "레벨 난이도 진행", highlight: "+1 레벨 / 1400 PTS", result: "적응형 노출시간" },
            { num: "4", text: "조기 격발 / 빗맞힘", highlight: "실패 페널티", result: "콤보 리셋 (-0.8s)" }
          ],
          aboutTitle: "FPS 반응속도 테스트 정보",
          aboutHeading: "FPS 반응속도 훈련이란 무엇인가요?"
        }}
      />
      <DrillGuide guide={instantResponseGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/instant-response"
          locale="ko"
        />
      </div>
      <DrillFooter />
    </>
  );
}
