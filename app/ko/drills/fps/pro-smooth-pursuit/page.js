import ProSmoothPursuitClient from '@/app/drills/fps/pro-smooth-pursuit/ProSmoothPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: "스무스 트래킹 에임 연습 – 활창 추적 안구 운동 | SkillDrills",
  description: "웹 브라우저에서 무료로 즐기는 스무스 트래킹(활창 추적 안구 운동) 에임 연습. 에이펙스 레전드, 오버워치 2의 유려한 곡선 궤적과 고기동 공중 타겟을 흔들림 없이 매끄럽게 추적하세요.",
  keywords: [
    "스무스 트래킹 에임 연습",
    "활창 추적 안구 운동 훈련",
    "스무스 퍼슈트 에임",
    "트래킹 에임 연습",
    "에이펙스 트래킹 연습",
    "오버워치2 에임 연습",
    "에임 떨림 교정",
    "에임 트레이너 무료",
    "곡선 궤적 트래킹",
    "부드러운 에임 추종",
    "에임 유연성 훈련",
    "안구 추적 에임 연습"
  ],
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/fps/pro-smooth-pursuit",
    languages: getAlternateLanguages('/drills/fps/pro-smooth-pursuit'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "스무스 트래킹 에임 연습 – 활창 추적 안구 운동 | SkillDrills",
    description: "리사주 곡선 궤적을 부드럽게 추종하는 스무스 퍼슈트 에임 훈련: 불필요한 떨림을 억제하고 목표물에 조준선을 밀착시키는 고정밀 트래킹 트레이너.",
    url: "https://skilldrills.online/ko/drills/fps/pro-smooth-pursuit",
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "스무스 트래킹 에임 연습 – 활창 추적 안구 운동 | SkillDrills",
    description: "리사주 곡선 궤적을 부드럽게 추종하는 스무스 퍼슈트 에임 훈련: 불필요한 떨림을 억제하고 목표물에 조준선을 밀착시키는 고정밀 트래킹 트레이너.",
  },
};

export default function ProSmoothPursuitKoPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ko" },
      { "@type": "ListItem", "position": 2, "name": "FPS 에임 훈련", "item": "https://skilldrills.online/ko/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "스무스 트래킹 에임 연습", "item": "https://skilldrills.online/ko/drills/fps/pro-smooth-pursuit" }
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "스무스 트래킹 에임 연습",
    "url": "https://skilldrills.online/ko/drills/fps/pro-smooth-pursuit",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "웹 브라우저에서 실행되는 무료 스무스 트래킹 연습. 리사주 곡선을 활용한 활창 추적 안구 운동 및 전완근 안정화 훈련."
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "스무스 트래킹 에임 연습",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "연속적인 비선형 곡선 이동에 조준선을 매끄럽게 일치시키는 무료 브라우저 FPS 스무스 트래킹 에임 훈련 도구.",
    "genre": "FPS Training / Smooth Pursuit Aim",
    "url": "https://skilldrills.online/ko/drills/fps/pro-smooth-pursuit",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "스무스 트래킹 에임 연습",
    "url": "https://skilldrills.online/ko/drills/fps/pro-smooth-pursuit",
    "description": "연속적인 비선형 곡선 이동에 조준선을 매끄럽게 일치시키는 무료 브라우저 FPS 스무스 트래킹 에임 훈련 도구.",
    "dateModified": "2026-09-05",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Smooth Pursuit"],
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
        "name": "FPS 게임에서 스무스 퍼슈트(활창 추적 안구 운동) 훈련이란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "스무스 퍼슈트 훈련은 불규칙한 플릭이나 떨림 없이 부드럽게 이동하는 표적의 궤적과 속도를 조준선과 완벽하게 동기화시키는 신경근육 훈련입니다."
        }
      },
      {
        "@type": "Question",
        "name": "활창 추적(Smooth Pursuit)과 단속 운동(Saccade)의 신경학적 차이는?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rashbass(1961)의 연구에 따르면 두 운동은 서로 완전히 독립된 신경 경로를 거칩니다. 단속 운동은 위치 오차에 반응하는 개방 루프 도약이지만, 활창 추적은 MT/V5 영역을 통한 망막 속도 오차에 의해 실시간 폐루프 피드백으로 제어됩니다(Krauzlis, 2004)."
        }
      },
      {
        "@type": "Question",
        "name": "곡선 트래킹을 할 때 에임이 덜컹거리며 떨리는 이유는?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "전완근이나 손목의 과도한 경직, 패드의 높은 초기 마찰력, 그리고 '조준선 점을 쳐다보는 습관' 때문입니다. 표적이 아닌 조준선을 보면 뇌가 과도한 미세 교정 신호를 발생시켜 손 떨림이 유발됩니다."
        }
      },
      {
        "@type": "Question",
        "name": "중심와 시선 선행(Foveal Gaze Leading)이란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Land & McLeod(2000)가 밝혀낸 바와 같이, 정상급 플레이어는 현재 조준선 위치가 아니라 움직이는 표적의 진행 방향 2~5픽셀 앞쪽에 시선을 고정합니다. 이를 통해 운동 피질이 다가오는 변곡점을 예측합니다."
        }
      },
      {
        "@type": "Question",
        "name": "에이펙스 레전드나 오버워치 2 같은 하이 TTK 게임에서 왜 필수적인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "적을 처치하기까지 수초간 지속 대미지를 넣어야 하는 게임에서는 한 발의 플릭보다 연속적인 '대미지 가동 시간(Uptime)'이 승패를 결정합니다. 공중 기동이나 슬라이딩 중에도 빔을 유지해야 교전에서 승리할 수 있습니다."
        }
      },
      {
        "@type": "Question",
        "name": "훈련에 리사주 곡선(Lissajous curve)을 사용하는 이유는?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "리사주 곡선은 수직과 수평의 조화 진동이 합성된 비선형 궤적입니다. 직선 이동과 달리 꼭짓점에서의 감속과 중심 관통 시의 가속이 끊임없이 교차하여 진정한 실시간 속도 적응력을 시험합니다."
        }
      },
      {
        "@type": "Question",
        "name": "모니터 주사율과 마우스 폴링레이트가 트래킹에 영향을 주나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "매우 결정적입니다. 144Hz~360Hz의 고주사율은 잔상을 제거하여 완벽한 망막 움직임 정보를 제공하며, 1000Hz 이상의 폴링레이트는 좌표 계단 현상 없이 매끄러운 입력을 보장합니다(Woods et al., 2015)."
        }
      },
      {
        "@type": "Question",
        "name": "매끄러운 트래킹을 위한 최적의 마우스 그립법은?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "손바닥 뒷부분을 마우스 엉덩이에 안정적으로 지지하고 손가락에 힘을 뺀 릴랙스드 클로 또는 팜클로 그립이 좋습니다. 손목만 꺾지 말고 팔꿈치를 회전축으로 삼아 팔 전체로 부드럽게 유영하듯 조작합니다."
        }
      },
      {
        "@type": "Question",
        "name": "스무스 트래킹 훈련은 얼마나 자주 해야 하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "실제 경쟁전을 플레이하기 전 매일 10~15분 정도 루틴으로 진행하는 것이 가장 효과적입니다. 전완근 신근 피로를 방지하기 위해 30분 이상의 연속 훈련은 지양해야 합니다."
        }
      },
      {
        "@type": "Question",
        "name": "타겟에서 벗어나면 콤보가 초기화되는 이유는?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "끊김 없는 밀착 조준(빔 유지력)에 강력한 동기를 부여하기 위함입니다. 옵션에서 시간 페널티를 켜면 벗어난 시간에 비례해 라운드 타이머까지 줄어들어 실전 압박감을 훈련할 수 있습니다."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "스무스 트래킹(활창 추적) 훈련 방법",
    "description": "리사주 곡선 궤적을 부드럽게 추종하며 조준선을 밀착시키는 단계별 연습법.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "인게임 마우스 감도 설정",
        "text": "세션 설정에서 플레이하는 게임의 감도와 DPI를 동일하게 맞춰 1:1 근육 기억을 확립합니다.",
        "url": "https://skilldrills.online/ko/drills/fps/pro-smooth-pursuit#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "전체화면 RAW 포인터 락 모드 진입",
        "text": "시작하기를 눌러 윈도우 가속이 없는 1:1 하드웨어 좌표 입력 환경을 구축합니다.",
        "url": "https://skilldrills.online/ko/drills/fps/pro-smooth-pursuit#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "표적의 진행 방향 앞단에 시선 고정",
        "text": "조준선을 직접 보지 않고 이동하는 표적 모델의 앞쪽 가장자리에 시각을 집중합니다.",
        "url": "https://skilldrills.online/ko/drills/fps/pro-smooth-pursuit#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "팔꿈치 축으로 유영하듯 속도 동기화",
        "text": "손목에 힘을 빼고 팔꿈치를 축으로 삼아 곡선의 가감속에 맞춰 매끄럽게 조준선을 유지합니다.",
        "url": "https://skilldrills.online/ko/drills/fps/pro-smooth-pursuit#step-4"
      }
    ]
  };

  const copy = {
    h1Keyword: "스무스 트래킹 에임 연습",
    h1Suffix: " - 활창 추적 안구 운동 에임 트레이너",
    statScore: "점수",
    statTime: "남은 시간",
    statAccuracy: "트래킹 정확도",
    statBestScore: "최고 점수",
    startTitle: "스무스 트래킹 에임 연습",
    startSubtitle: "리사주 곡선 추종 • 활창 추적 안구 운동 • 무한 난이도",
    getReady: "준비",
    pausedTitle: "일시 정지됨",
    pausedSubtitle: "클릭하여 계속하기 (마우스 포인터 락이 다시 켜집니다)",
    stageCaption: "화면 위를 부드러운 곡선으로 진동 회주하는 타겟에 조준선을 계속 밀착시키세요.",
    rulesTitle: "훈련 규칙 및 점수 체계",
    rulesItems: [
      { title: "연속 추적 보너스", text: "타겟 위에 조준선을 유지하면 1초당 점수가 가산되며, 콤보 배수가 최대 3.0배까지 누적됩니다." },
      { title: "이탈 페널티", text: "타겟에서 조준선이 벗어나면 콤보가 즉시 리셋됩니다. 옵션 활성화 시 라운드 시간도 차감됩니다." },
      { title: "리사주 곡선 궤적", text: "수직과 수평의 조화 진동이 결합된 연속 비선형 궤적으로 진정한 속도 동기화 능력을 훈련합니다." },
      { title: "레벨 상승 체계", text: "1400점 획득 시마다 다음 레벨로 도약하며, 타겟의 이동 속도와 진폭 복잡도가 상승합니다." }
    ],
    aboutTitle: "스무스 트래킹 및 활창 추적 안구 운동 정보",
  };

  const koGuide = {
    heading: "스무스 트래킹 훈련의 생체역학 가이드 및 성능 벤치마크",
    intro: [
      "스무스 트래킹(Smooth Pursuit) 에임 트레이너는 리사주 곡선 형태의 비선형 조화 진동 궤적을 추종하여, 불필요한 손 떨림을 제거하고 안구의 활창 추적 기능과 전완근의 미세 조절력을 극대화하는 전문 FPS 드릴입니다. 에이펙스 레전드, 오버워치 2, 더 파이널스 등의 교전에서는 몇 초 동안 공중과 지상을 오가는 적에게 끊김 없이 탄환을 꽂아 넣는 지속 딜 능력이 필수적입니다.",
      "안구의 활창 추적 운동은 Krauzlis(2004)의 연구에서 밝혀졌듯 중간상측두영역(MST), 전두안구영역(FEF), 시각운동피질(MT/V5)로 이루어진 신경망이 표적의 속도 벡터를 실시간 연산하여 눈을 움직입니다. Cyril Rashbass(1961)는 도약 안구 운동(Saccade)과 활창 안구 운동이 분리된 체계임을 규명했습니다. 손에 힘을 주고 플릭하듯 조준하려 하면 불필요한 단속 운동이 개입되어 화면이 떨리고 에임이 튀게 됩니다.",
      "본 드릴은 중심와 시선 선행 이론(Land & McLeod, 2000), 주의집중 시각 확장(Green & Bavelier, 2003), 디지털 정밀 크로노메트리(Woods et al., 2015)를 결합하여 손목 긴장을 풀고 부드럽게 활주하는 최고 수준의 트래킹 감각을 완성시켜 줍니다."
    ],
    benchmarks: {
      title: "트래킹 유지율(Uptime) 및 성능 벤치마크 티어",
      headers: ["성능 티어", "목표 조준 유지율(%)", "신경근육 및 안구 운동 상태", "인게임 실전 전투력"],
      rows: [
        ["티어 1 (에이펙스 빔 수준)", "85% – 95%+", "완벽한 중심와 고정: 리사주 변곡점에서도 단속 운동 없이 완벽한 속도 동기화 유지", "에이펙스 프레데터 및 오버워치 탑 500 수준의 치명적인 레이저 트래킹 빔 구사"],
        ["티어 2 (경쟁전 프로)", "72% – 85%", "유연한 전완근 제어: 표적이 궤적 꼭짓점에서 감속할 때 즉각적인 감속 보정 실행", "슬라이딩 및 회피 기동을 구사하는 상대를 상대로 압도적인 교전 지속 대미지 업타임 달성"],
        ["티어 3 (상급 게이머)", "58% – 72%", "견고한 선형 트래킹: 급격한 비선형 궤적 반전 시 10~15%의 일시적인 조준선 이탈 발생", "경쟁력 있는 트래킹 실력이지만 그래플이나 대시 같은 고난도 입체 기동 상대 시 에임 흔들림"],
        ["티어 4 (중급자)", "42% – 58%", "글라이딩 대신 끊어 치는 경향: 전완근 긴장으로 인해 주기적인 조준선 오버런 및 떨림", "기동성이 좋은 캐릭터에 자주 농락당하며 단발성 사격 외에 연발 지속 딜을 넣지 못함"],
        ["티어 5 (입문 / 에임 떨림)", "42% 미만", "높은 시각 반응 지연: 조준선이 항상 표적 뒤를 쫓아가며 거친 보정 플릭을 반복함", "대부분의 트래킹 샷을 놓치며 손목 경직으로 인해 마우스가 매끄럽게 움직이지 못함"]
      ],
      note: "유지율 백분율은 총 세션 시간 대비 타겟 히트박스 내부 접촉 시간을 performance.now()로 정밀 계산한 수치입니다(Woods et al., 2015)."
    },
    techniques: {
      title: "완벽한 스무스 트래킹을 위한 4대 실전 프로토콜",
      items: [
        {
          name: "중심와 시선 선행 고정 (Foveal Gaze Leading)",
          desc: "조준선 십자선을 쳐다보지 마세요. 표적의 앞쪽 윤곽선 2~5픽셀 전방에 시선을 고정하면(Land & McLeod, 2000) 뇌가 속도를 훨씬 정확히 예측합니다.",
          tips: "에임이 덜컥거리면 즉시 호흡을 내쉬고 타겟 표면 중심에 시선을 집중하세요."
        },
        {
          name: "전완근 미세 긴장 완화 및 팔꿈치 관절 분리",
          desc: "손목만 비틀어 조준하면 근육 충돌로 인해 떨림이 발생합니다. 전완근을 패드에 살짝 얹고 팔꿈치를 축으로 넓은 곡선을 그리세요.",
          tips: "마우스 그립 강도는 최대 악력의 30~40% 수준으로 가볍게 유지하세요."
        },
        {
          name: "리사주 곡선 감속 리듬 예측",
          desc: "곡선 운동은 양 끝단 꼭짓점에서 속도가 0에 가깝게 줄어들고 중심부를 지나갈 때 최대 속도가 됩니다(Krauzlis, 2004).",
          tips: "움직임의 조화 리듬을 체득하여 꼭짓점에 도달하기 직전 자연스럽게 감속하세요."
        },
        {
          name: "보정 단속 운동 억제 (패닉 플릭 금지)",
          desc: "조준선이 표적에서 살짝 벗어났을 때 갑자기 마우스를 휘두르면 20~50ms 동안 시각 정보 처리가 마비됩니다(Rashbass, 1961).",
          tips: "얼음판 위에서 차를 조향하듯 부드럽게 가속하여 표적 윤곽선을 자연스럽게 재포착하세요."
        }
      ]
    },
    steps: [
      "세션 설정에서 게임 감도와 DPI를 맞춘 뒤 포인터 락으로 RAW 입력을 활성화합니다.",
      "화면 위에서 부드러운 리사주 곡선을 그리기 시작하는 타겟에 시선을 맞춥니다.",
      "팔꿈치를 축으로 힘을 빼고 마우스를 미끄러뜨리며 표적 속도와 부드럽게 동조합니다.",
      "연속 추적 시간을 늘려 콤보 배수를 최대 3.0배까지 누적하고 1400점마다 레벨을 올립니다.",
      "세션 종료 후 트래킹 정확도와 이탈 시간을 분석하여 취약한 궤적 구간을 확인합니다."
    ],
    audience: "에이펙스 레전드, 오버워치 2, 더 파이널스, 콜 오브 듀티 워존 등에서 적을 추적할 때 손이 떨리거나 탄이 새는 모든 FPS 게이머.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'krauzlis2004', 'green2003', 'rashbass1961', 'land2000'),
    related: [
      { href: "/ko/drills/fps/anti-zigzag-movement-trainer", label: "지그재그 무빙 트래킹 (슬라이딩 추적)" },
      { href: "/ko/drills/fps/anti-strafe-jitter-duel", label: "무빙 트래킹 에임 연습 (ADAD 지터)" },
      { href: "/ko/drills/fps/flick-shot-training", label: "플릭 에임 연습 (Flick Shot)" },
      { href: "/ko/drills/fps/micro-correction-precision", label: "마이크로 플릭 에임 연습" },
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
      <ProSmoothPursuitClient copy={copy} />
      <div className="max-w-6xl mx-auto px-4 w-full">
        <RelatedDrills currentCategory="fps" currentHref="/drills/fps/pro-smooth-pursuit" locale="ko" />
      </div>
      <DrillGuide guide={koGuide} />
    </>
  );
}
