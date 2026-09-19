import AwarenessDrillClient from '@/app/drills/fps/180-degree-awareness/AwarenessDrillClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';

export const metadata = {
    title: "180도 플릭 에임 연습 – 180도 화면전환 트레이너 | SkillDrills",
  description: "브라우저에서 무료로 즐기는 180도 플릭 에임 트레이너. 화면 가장자리와 후방의 표적을 주변시야로 포착하고, 팔 전체를 활용한 대각도 화면전환과 제동력을 과학적으로 훈련합니다.",
  keywords: [
    "180도 플릭",
    "180도 에임",
    "180도 화면전환",
    "180도 끌어치기",
    "FPS 180도 연습",
    "주변시야 에임 연습",
    "발로란트 180도 플릭",
    "카스2 180도 회전",
    "에임 트레이너 무료",
    "섬광탄 회피 연습",
    "180도 턴 에임",
    "마우스 패드 공간 활용"
  ],
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/fps/180-degree-awareness",
    languages: getAlternateLanguages('/drills/fps/180-degree-awareness'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
      title: "180도 플릭 에임 연습 – 180도 화면전환 트레이너 | SkillDrills",
    description: "화면 가장자리와 후방의 적을 번개처럼 포착하는 180도 화면전환 플릭 트레이너. 주변시야 반응과 급격한 시야 회전 정확도 향상.",
    url: "https://skilldrills.online/ko/drills/fps/180-degree-awareness",
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
      title: "180도 플릭 에임 연습 – 180도 화면전환 트레이너 | SkillDrills",
    description: "화면 가장자리와 후방의 적을 번개처럼 포착하는 180도 화면전환 플릭 트레이너. 주변시야 반응과 급격한 시야 회전 정확도 향상.",
  },
};

export default function AwarenessDrillKoPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ko" },
      { "@type": "ListItem", "position": 2, "name": "FPS 에임 트레이너", "item": "https://skilldrills.online/ko/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "180도 플릭 에임 연습", "item": "https://skilldrills.online/ko/drills/fps/180-degree-awareness" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "180도 플릭 에임 연습",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "대각도 시야 반전 에임, 주변시야 자극에 대한 즉각적 반응, 고속 감속 제동력을 단련하는 무료 브라우저 FPS 에임 트레이너.",
    "genre": "FPS Training / Situational Awareness",
    "url": "https://skilldrills.online/ko/drills/fps/180-degree-awareness",
    "dateModified": "2026-09-05",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "180도 플릭 에임 연습",
    "url": "https://skilldrills.online/ko/drills/fps/180-degree-awareness",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "브라우저에서 실행되는 무료 180도 플릭 에임 연습. 주변시야 인식과 대각도 회전 초탄 정확도를 강화합니다."
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "180도 플릭 에임 연습",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "url": "https://skilldrills.online/ko/drills/fps/180-degree-awareness",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "dateModified": "2026-09-05"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-05",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "FPS에서 180도 플릭 에임 훈련이란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "중심 시야를 벗어난 주변 시야나 후방에서 나타난 적을 인지하고, 번개처럼 시야를 180도 회전시켜 목표에 정밀하게 조준선을 안착시키는 감각운동 훈련입니다."
        }
      },
      {
        "@type": "Question",
        "name": "프로게이머들은 공간 인지력과 180도 회전 속도를 어떻게 기르나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "e스포츠 선수들은 마우스패드의 실제 물리적 이동 거리(cm/360°)를 신체에 완벽하게 각인시키고, 팔 전체(팔꿈치와 어깨)를 축으로 한 스와이프와 손가락 미세보정을 결합하여 회전 동작을 자동화합니다."
        }
      },
      {
        "@type": "Question",
        "name": "주변 시야 훈련이 FPS 게임 플레이에 어떤 도움을 주나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "인간의 중심 시야는 약 2도 안팎의 좁은 영역만 정밀하게 보지만, 주변 시야(간상세포)는 최대 180도에 걸쳐 움직임과 명암 변화를 초고속으로 감지합니다. 주변 시야를 단련하면 전방 앵글을 유지하면서도 측면 기습에 즉각 대처할 수 있습니다."
        }
      },
      {
        "@type": "Question",
        "name": "180도 턴을 할 때 손목과 팔 중 무엇을 사용해야 하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "90도를 초과하는 광각 회전은 손목 관절 손상을 방지하고 넓은 각도를 커버하기 위해 팔꿈치와 어깨(전완 전체)를 주 축으로 움직여야 하며, 안착 직전의 미세 보정에서만 손목과 손가락을 사용해야 합니다."
        }
      },
      {
        "@type": "Question",
        "name": "뒤치기나 측면 기습에 취약할 때 어떻게 극복하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "입체 음향 사운드 플레이와 동시에, 마우스패드 중앙에서 끝까지 일정한 속도로 스와이프하는 근육 기억을 구축해야 합니다. 본 드릴을 통해 회전 후 조준선 흔들림을 최소화할 수 있습니다."
        }
      },
      {
        "@type": "Question",
        "name": "발로란트나 카스2의 섬광 회피에도 도움이 되나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "네. 플래시뱅이 터지는 찰나의 순간에 180도 뒤를 돌아보고, 섬광이 터진 직후 즉각 원래 사선으로 에임을 복귀시키는 민첩성과 제동 스트로크 능력이 향상됩니다."
        }
      },
      {
        "@type": "Question",
        "name": "180도 에임 훈련은 얼마나 자주 해야 하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "랭크 경기 전 5~10분 정도 워밍업으로 진행하면 마우스패드 위 공간 좌표 감각을 예리하게 유지할 수 있으며, 팔 피로 누적 없이 중추신경계를 활성화할 수 있습니다."
        }
      },
      {
        "@type": "Question",
        "name": "마우스 감도(센시)와 패드 크기는 어떻게 맞춰야 하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "저감도~중감도 기준, 마우스패드 중앙에서 한쪽 끝까지 움직였을 때 정확히 180도 회전이 가능한 패드 너비(40cm~50cm 권장)를 확보하는 것이 가장 이상적인 기준점입니다."
        }
      },
      {
        "@type": "Question",
        "name": "이 트레이너는 로우 마우스 입력(Pointer Lock)을 지원하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "네. 브라우저 Pointer Lock API를 기반으로 운영체제의 마우스 가속을 완전히 배제한 1:1 무가속 하드웨어 입력으로 측정됩니다."
        }
      },
      {
        "@type": "Question",
        "name": "사격 실패나 시간 초과 시 콤보가 초기화되는 이유는 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "과도한 관성으로 목표를 지나치는 오버슈팅을 억제하고, 속도뿐 아니라 정확한 조준 확인 후 사격하는 격발 규율을 훈련하기 위해 실패 시 콤보 배수가 리셋되도록 설계되었습니다."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "180도 플릭 에임 및 주변시야 연습 방법",
    "description": "초고속 180도 화면전환 플릭과 주변시야 목표 포착을 훈련하는 단계별 가이드.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "게임 감도 설정 및 마우스 중앙 정렬",
        "text": "훈련 시작을 클릭하여 포인터를 잠그고, 물리적 마우스를 마우스패드의 정중앙에 위치시킵니다."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "주변시야를 통한 화면 가장자리 표적 감지",
        "text": "중앙 시선을 안정적으로 유지하면서, 화면 좌우 끝에 생성되는 목표의 움직임을 주변시야로 즉각 감지합니다."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "팔꿈치와 어깨를 활용한 폭발적 스와이프",
        "text": "손목에만 의존하지 않고 팔 전체를 신속하게 회전시켜 180도 회전 궤적을 단번에 주파합니다."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "길항근 감속 제동 및 정확한 격발",
        "text": "목표 테두리에서 근육 제동력을 발휘하여 조준선을 목표 중심에 정확히 일치시키고 클릭하여 격발합니다."
      }
    ]
  };

  const awarenessGuide = {
    heading: "180도 플릭 에임 가이드 & 공간 반응 생체역학",
    intro: [
      "180도 스냅 타게팅은 주변 시야의 자극 감지, 안구 도약 운동(Saccade), 그리고 사지의 탄도 운동 역학이 정교하게 결합된 고차원 감각운동 과제입니다. 인간의 시각 시스템에서 망막 주변부 간상세포는 중심 시선에서 90도 이상 벗어난 광각의 휘도 변화와 움직임을 민감하게 포착하여 상구를 통해 신속한 정위 안구 도약을 유발합니다 (Rayner, 1998; Leigh & Zee, 2015).",
      "주변 시야에서 감지된 정보를 180도 가상 공간 회전으로 전환하기 위해 인간의 운동 제어는 2성분 모델(Two-Component Model)을 구동합니다 (Elliott et al., 2010). 어깨와 팔꿈치가 생성하는 개루프 탄도 스와이프가 회전각의 80~90%를 주파하고, 직후 길항근의 제동 작용을 통해 조준선이 목표를 지나치는 오버슈팅을 억제합니다 (Schmidt et al., 1979). 피츠의 법칙 (Fitts, 1954)에 따르면 이동 거리(D)가 클수록 난이도 지수(Index of Difficulty)가 급증하므로, 정밀한 제동력과 패드 공간의 일치가 핵심입니다.",
      "본 트레이너의 시간 측정은 HTML5 Pointer Lock API 환경에서 브라우저의 performance.now() 고해상도 시계를 통해 수행됩니다 (Woods et al., 2015). 1000Hz 이상의 마우스 폴링레이트와 고주사율 디스플레이를 활용하여 입력 왜곡과 가속을 배제한 객관적인 공간 반응 데이터를 측정할 수 있습니다.",
      "측정 방식 안내: 모든 반응 시간은 브라우저의 performance.now() 고정밀 클록을 통해 기기 내부에서 로컬로 측정되며 서버로 전송되지 않습니다. 브라우저 보안 타이머 완화(Spectre 방지, 통상 약 1ms) 및 디스플레이 주사율(60Hz 기준 약 16.7ms, 144Hz 기준 약 6.9ms, 240Hz 기준 약 4.1ms)에 따른 오차가 존재하므로 5ms 미만의 차이는 측정 노이즈로 간주하고 동일 기기 내에서의 기록 향상 추이를 비교하는 것이 바람직합니다 (Woods et al., 2015)."
    ],
    benchmarks: {
      title: "180도 회전 & 표적 재획득 레이턴시 벤치마크",
      headers: ["회전 단계 / 측정 지표", "평균 레이턴시 (ms)", "생체역학적 운동 메커니즘", "감각운동 분류"],
      rows: [
        ["주변시야 감지 & 도약 안구운동 시작", "140 – 190 ms", "망막 간상세포 휘도 감지 및 상구에 의한 안구 정위", "전주의적 시각 정위 (Rayner 1998)"],
        ["대각도 탄도 스와이프 (180° 회전)", "180 – 260 ms", "어깨-팔꿈치 축을 활용한 전완 추진 회전 아크", "개루프 운동학적 가속 (Elliott et al. 2010)"],
        ["종단 감속 & 조준선 제동 브레이크", "60 – 110 ms", "길항근 제동력 (스토핑 파워)", "임펄스 감속 댐핑 (Schmidt et al. 1979)"],
        ["착탄 미세보정 & 클릭 격발", "70 – 130 ms", "중심와 시각 피드백 기반 미세 보정 및 격발", "피츠의 법칙 호밍 단계 (Fitts 1954)"],
        ["총 180도 표적 재획득 소요 시간", "450 – 690 ms", "감지부터 격발 완료까지의 다감각 전 과정", "초보~중급 플레이어 표준 평균 수치"],
        ["엘리트 무의식 180도 완벽 주파", "320 – 420 ms", "체화된 감도 근육 기억과 일체화된 단일 스와이프", "프로 경기 클러치 상황의 최상위 수치"]
      ],
      note: "수치는 센서모터 및 시각과학 문헌 (Rayner 1998; Fitts 1954; Schmidt et al. 1979; Elliott et al. 2010; Woods et al. 2015)을 기반으로 산출되었습니다."
    },
    techniques: {
      title: "대각도 회전 및 공간 인지력 향상을 위한 실전 테크닉",
      items: [
        {
          name: "팔 스와이프의 기하학적 피벗",
          desc: "손목만 꺾어 회전하지 말고, 팔꿈치와 어깨를 주 피벗으로 삼아 큰 회전을 수행하세요. 전완을 책상과 수평으로 유지하면 마찰 저항 없이 매끄러운 궤적이 형성됩니다.",
          tips: "마우스를 들어 올리지 않고 한 번의 스트로크로 180도를 완벽히 회전할 수 있는 충분한 패드 공간을 확보하세요."
        },
        {
          name: "cm/360° 감도 고정 및 공간 각인",
          desc: "발로란트나 카스2 프로 선수들은 360도 회전에 35cm~55cm(180도 회전에 약 18cm~28cm)를 필요로 하는 감도를 주로 사용합니다. 패드 중앙에서 끝까지의 거리를 신체에 각인시키세요.",
          tips: "DPI나 인게임 감도를 수시로 바꾸면 공간 좌표의 근육 기억이 파괴되므로 고정된 설정을 유지하세요."
        },
        {
          name: "플래시뱅 회피 및 사선 복귀",
          desc: "날아오는 섬광탄에 즉각 뒤로 180도 돌고, 폭발 직후 신속히 원래 헤드라인 사선으로 에임을 복귀시키는 기술입니다. 신속한 회피와 정확한 원위치 복귀를 함께 연마하세요.",
          tips: "섬광을 피한 직후 적이 진입할 예상 길목에 크로스헤어를 미리 배치하는 연습을 병행하세요."
        },
        {
          name: "마우스 신속 중앙 리셋",
          desc: "180도 회전 후 교전을 마쳤다면, 이동 중이거나 재장전하는 찰나의 틈에 마우스를 살짝 들어 패드 중앙으로 즉시 리셋하는 습관을 들이세요.",
          tips: "마우스가 패드 가장자리에 머무는 시간을 최소화해야 연속 교전에서 패드 탈출을 막을 수 있습니다."
        }
      ]
    },
    steps: [
      "훈련 시작을 클릭하여 전체화면과 하드웨어 로우 인풋(Pointer Lock)을 활성화합니다.",
      "물리적 마우스를 패드 중앙에 두고, 시선을 중앙에 유지한 채 시야를 넓게 엽니다.",
      "화면의 좌우 극단 가장자리에 표적이 생성되면, 전완을 신속하게 스와이프하여 조준선을 날립니다.",
      "표적 직전에서 근육 브레이크를 걸고, 조준선이 중심을 포착하는 즉시 정확하게 클릭합니다.",
      "종료 후 평균 반응시간, 명중률, 최대 콤보를 확인하여 오버슈팅 경향을 분석합니다."
    ],
    audience: "발로란트, 카스2, 에이펙스 레전드, 오버워치 등 전술 FPS 및 하이퍼 FPS에서 후방 기습 대처 능력과 광각 시야 회전 정밀도를 높이고자 하는 모든 게이머.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'elliott2010', 'fitts1954', 'schmidt1979', 'leigh2015', 'rayner1998'),
    related: [
      { href: "/drills/fps/flick-shot-training", label: "플릭 에임 연습" },
      { href: "/drills/fps/angle-hold-trainer", label: "앵글 홀드 (크로스헤어 배치) 트레이너" },
      { href: "/drills/fps/micro-correction-precision", label: "마이크로 플릭 연습" },
      { href: "/drills/reaction-speed/reaction-time-test", label: "반응속도 테스트" }
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

      <AwarenessDrillClient
        copy={{
          h1Keyword: "180도 플릭 에임 연습",
          h1Suffix: " - 180도 화면전환·주변시야 트레이너",
          subtitle: "주변시야를 통한 신속한 적 탐지와 대각도 플릭 전환, 180도 화면전환 제동력을 훈련하세요.",
          statScore: "점수",
          statTime: "남은 시간",
          statAccuracy: "명중률",
          statBestScore: "최고 점수",
          startTitle: "180도 플릭 에임 연습",
          startSubtitle: "하드웨어 로우 인풋 • 무한 난이도 진행",
          stageCaption: "화면 가장자리에 생성되는 목표를 주변시야로 포착하고, 타이머가 만료되기 전에 180도 플릭으로 격추하세요.",
          rulesTitle: "훈련 규칙 & 점수 체계",
          rulesItems: [
            { num: "1", text: "가장자리 표적 격추", highlight: "대각도 표적 (+100점 / +0.6초)", result: "×콤보 배수" },
            { num: "2", text: "180° 주변부 생성", highlight: "극단적 주변시야", result: "소형화 & 가속" },
            { num: "3", text: "레벨 난이도 상승", highlight: "+1 레벨 / 1750점", result: "적응형 스케일링" },
            { num: "4", text: "미스 / 시간 초과", highlight: "실패 페널티", result: "콤보 리셋 (-0.8초)" }
          ],
          aboutTitle: "180도 플릭 에임 훈련 정보",
          aboutHeading: "180도 플릭 훈련이란 무엇인가요?",
          aboutText1: "180도 회전은 슈팅 게임에서 가장 이동 거리가 긴 마우스 조작입니다. 피츠의 법칙(Fitts, 1954)에 따르면 이동 시간이 이동 거리와 목표 크기에 의해 결정되므로, 회전 자체보다도 회전 직후 에임을 즉각 정지시켜 재조준하는 능력이 승패를 결정합니다.",
          aboutText2: "180도 플릭 에임 연습은 중심 시야 바깥의 시각 정보를 신속하게 처리하는 능력을 집중적으로 단련합니다. 미세 조정을 주로 하는 일반적인 에임 연습과 달리, 공간 좌표를 크게 횡단하는 대각도 플릭을 요구합니다.",
          aboutText3: "지속적인 공간 인지 훈련을 통해 마우스패드 위의 물리적 공간과 게임 내 가상 공간이 완벽하게 일치하게 되며, 블라인드 플릭과 기습 대처 속도가 획기적으로 향상됩니다."
        }}
      />
      <DrillGuide guide={awarenessGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/180-degree-awareness"
          locale="ko"
        />
      </div>
      <DrillFooter />
    </>
  );
}
