import AntiStrafeJitterClient from '@/app/drills/fps/anti-strafe-jitter-duel/AntiStrafeJitterClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
    title: "무빙 트래킹 에임 연습 – ADAD 지터 트래커 | SkillDrills",
  description: "브라우저에서 무료로 즐기는 무빙 트래킹 에임 연습. 예측 불가능한 고빈도 ADAD 좌우 무빙과 근거리 지터 교전에서 크로스헤어를 목표에 고정하는 리액티브 트래킹을 과학적으로 단련합니다.",
  keywords: [
    "무빙 트래킹 에임 연습",
    "ADAD 무빙 연습",
    "근거리 트래킹 에임",
    "트래킹 에임 연습",
    "지터 에임 연습",
    "에이펙스 무빙 트래킹",
    "오버워치 트래킹 에임",
    "발로란트 무빙샷 대처",
    "리액티브 트래킹 연습",
    "좌우 무빙 추적",
    "근접 교전 에임",
    "에임 트레이너 무료"
  ],
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/fps/anti-strafe-jitter-duel",
    languages: getAlternateLanguages('/drills/fps/anti-strafe-jitter-duel'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
      title: "무빙 트래킹 에임 연습 – ADAD 지터 트래커 | SkillDrills",
    description: "예측 불가능한 고빈도 ADAD 좌우 무빙을 놓치지 않고 추적하는 리액티브 트래킹 트레이너. 근거리 교전 트래킹 정확도 향상.",
    url: "https://skilldrills.online/ko/drills/fps/anti-strafe-jitter-duel",
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
      title: "무빙 트래킹 에임 연습 – ADAD 지터 트래커 | SkillDrills",
    description: "예측 불가능한 고빈도 ADAD 좌우 무빙을 놓치지 않고 추적하는 리액티브 트래킹 트레이너. 근거리 교전 트래킹 정확도 향상.",
  },
};

export default function AntiStrafeJitterKoPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ko" },
      { "@type": "ListItem", "position": 2, "name": "FPS 에임 트레이너", "item": "https://skilldrills.online/ko/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "무빙 트래킹 에임 연습", "item": "https://skilldrills.online/ko/drills/fps/anti-strafe-jitter-duel" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "무빙 트래킹 에임 연습",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "급격한 ADAD 좌우 방향 전환 무빙에 대한 리액티브 트래킹과 미세 보정 능력을 향상시키는 무료 브라우저 FPS 에임 트레이너.",
    "genre": "FPS Training / Anti-Strafe",
    "url": "https://skilldrills.online/ko/drills/fps/anti-strafe-jitter-duel",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "무빙 트래킹 에임 연습",
    "url": "https://skilldrills.online/ko/drills/fps/anti-strafe-jitter-duel",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "브라우저에서 실행되는 무료 무빙 트래킹 에임 연습. 근거리 ADAD 무빙에 대한 반응형 트래킹 능력을 단련합니다."
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "무빙 트래킹 에임 연습",
    "url": "https://skilldrills.online/ko/drills/fps/anti-strafe-jitter-duel",
    "description": "급격한 ADAD 좌우 방향 전환 무빙에 대한 리액티브 트래킹과 미세 보정 능력을 향상시키는 무료 브라우저 FPS 에임 트레이너.",
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
        "name": "FPS에서 리액티브 트래킹(반응형 추적)이란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "예측 불가능하게 이동 방향을 전환하는 적에 대해, 망막의 시각적 위치 오차를 실시간으로 감지하고 조준선을 즉각적으로 따라붙게 만드는 고난도 에임 기술입니다."
        }
      },
      {
        "@type": "Question",
        "name": "빠른 ADAD 좌우 무빙을 정확하게 따라가는 방법은?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "팔과 손목 근육의 긴장을 풀고, 조준선이 아닌 적 캐릭터의 중심(몸통)에 시선을 고정합니다. 거친 플릭으로 급하게 따라잡으려 하지 말고, 적의 이동 속도에 맞추어 부드러운 속도 동기화 미세 반전을 수행해야 합니다."
        }
      },
      {
        "@type": "Question",
        "name": "지터 무빙을 트래킹할 때 에임이 떨리는 이유는 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "마우스를 지나치게 강하게 쥐는 '데스 그립'과 길항근의 과도한 동시 수축 때문입니다. 전완근에 힘이 들어가면 방향 전환 시 근육끼리 충돌하여 매끄러운 활주가 아닌 뚝뚝 끊기는 떨림이 발생합니다."
        }
      },
      {
        "@type": "Question",
        "name": "스무스 퍼슈트(평활 추적)와 리액티브 트래킹의 차이는 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "스무스 퍼슈트는 일정한 궤적과 속도로 움직이는 예측 가능한 목표를 추적하는 반면, 리액티브 트래킹은 급격한 방향 반전으로 인해 뇌의 궤적 예측이 불가능하여 순수한 시각 피드백에 의해 보정됩니다."
        }
      },
      {
        "@type": "Question",
        "name": "에이펙스 레전드 프로 선수들은 리액티브 트래킹을 어떻게 연습하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "근거리 급격한 무빙 전환 훈련을 반복하며, 적 캐릭터의 골반 각도와 감속 프레임을 통해 완전한 방향 전환이 일어나기 찰나의 순간에 전환 궤적을 읽어내는 능력을 기릅니다."
        }
      },
      {
        "@type": "Question",
        "name": "무빙 트래킹에 가장 적합한 마우스 그립법은 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "손목과 손가락 관절의 유연성을 극대화할 수 있는 편안한 클로 그립(Claw)이나 핑거팁 그립(Fingertip)이 고빈도 미세 반전 처리에 가장 유리합니다."
        }
      },
      {
        "@type": "Question",
        "name": "오버워치2의 즉각적인 무빙 전환에는 어떻게 대처하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "오버워치2는 관성 가속 프레임 없이 즉시 전환되므로, 예측 샷을 피하고 시각적 인지 직후 부드럽게 감속 브레이크를 거는 반사신경 훈련을 집중적으로 진행해야 합니다."
        }
      },
      {
        "@type": "Question",
        "name": "마우스 폴링레이트가 트래킹에 영향을 주나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "네. 1000Hz 이상의 고폴링레이트는 1ms 단위로 좌표를 갱신하여 미세한 방향 전환 시 입력 지터를 없애고 매우 부드러운 궤적 피드백을 제공합니다."
        }
      },
      {
        "@type": "Question",
        "name": "인간의 뇌가 무빙 전환을 인지하고 에임을 돌리는 데 걸리는 시간은?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "시각 피질에서의 변화 인지에 약 160~210ms, 전완근 감속 및 역방향 출력에 약 80~130ms가 소요되어 예측 없는 반전에는 생리학적으로 약 240~340ms의 반응 지연이 발생합니다."
        }
      },
      {
        "@type": "Question",
        "name": "이 훈련이 근거리 샷건이나 SMG 교전에 도움이 되나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "매우 큰 도움이 됩니다. 근거리 전투는 화면 내 상대의 각속도가 가장 높으므로, 본 드릴을 통해 침착한 동체시력과 탈력 추적을 체화하면 근접전 승률이 급상승합니다."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "무빙 트래킹 및 ADAD 지터 에임 훈련 방법",
    "description": "고빈도 ADAD 무빙 목표물을 지속 추적하는 리액티브 트래킹 단계별 가이드.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "게임 감도 동기화",
        "text": "세션 설정에서 플레이 중인 게임 감도를 일치시켜 1:1 근육 기억 전이를 보장합니다."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "포인터 락 활성화",
        "text": "'훈련 시작'을 클릭하여 전체화면과 Pointer Lock을 켜고 운영체제 마우스 가속을 배제합니다."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "표적 구체 중심에 시선 앵커 고정",
        "text": "크로스헤어를 보지 말고, 빠르게 좌우로 지터 무빙하는 표적 자체에 시선을 깊게 고정합니다."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "손목과 손가락 탈력을 통한 미세 반전 추적",
        "text": "그립의 힘을 빼고 급격한 방향 전환 시 과도한 플릭을 자제하며 부드러운 속도 동기화로 조준선을 유지합니다."
      }
    ]
  };

  const antiStrafeGuide = {
    heading: "무빙 트래킹 에임 가이드 & 리액티브 추적 생체역학",
    intro: [
      "초근접전 교전에서 승패를 가르는 결정적 요인은 상대의 ADAD 좌우 무빙, 앉기 연타, 순간적인 속도 반전에 대한 트래킹 정확도입니다. 일정한 벡터를 따라 매끄럽게 움직이는 대상을 쫓는 스무스 퍼슈트(Krauzlis, 2004)와 달리, 리액티브 트래킹은 망막의 위치 오차를 지속해서 감지하고 신속하게 운동을 반전시키는 능력을 필요로 합니다 (Rashbass, 1961). 게이머는 뛰어난 시각 주의력과 동체시력을 보유하고 있지만 (Green & Bavelier, 2003), 예측 불가능한 방향 전환에는 필연적인 신경생리학적 지연이 따릅니다.",
      "목표가 급격히 방향을 바꿀 때 발생하는 '망막 슬립'을 인간의 뇌는 사전에 예측할 수 없으므로, 감속 인지, 피질 명령, 손의 제동 브레이크, 역방향 가속의 연쇄 과정을 거쳐야 합니다. 에이펙스 레전드나 오버워치 2처럼 TTK가 긴 하이퍼 FPS에서는 단발 사격보다 지속적인 조준선 유지 시간(Uptime)이 승률을 결정합니다.",
      "본 트레이너는 HTML5 Pointer Lock API 환경에서 1:1 하드웨어 좌표와 performance.now() 고해상도 시계를 통해 측정됩니다 (Woods et al., 2015). 마우스 폴링 지터와 보간 지연을 없애고, 힘을 뺀 길항근 제어와 전환 시의 오버슈팅 억제를 완벽하게 훈련합니다.",
      "측정 방식 안내: 모든 반응 시간은 브라우저의 performance.now() 고정밀 클록을 통해 기기 내부에서 로컬로 측정되며 서버로 전송되지 않습니다. 브라우저 보안 타이머 완화(Spectre 방지, 통상 약 1ms) 및 디스플레이 주사율(60Hz 기준 약 16.7ms, 144Hz 기준 약 6.9ms, 240Hz 기준 약 4.1ms)에 따른 오차가 존재하므로 5ms 미만의 차이는 측정 노이즈로 간주하고 동일 기기 내에서의 기록 향상 추이를 비교하는 것이 바람직합니다 (Woods et al., 2015)."
    ],
    benchmarks: {
      title: "리액티브 트래킹 & 방향 전환 반응 잠복기 등급",
      headers: ["처리 단계 / 지연 시간", "표준 레이턴시 범위", "신경 경로 & 생체역학적 기능", "실전 게임 적용 영향"],
      rows: [
        ["방향 전환 시각 감지 지연", "160 – 210 ms", "망막 슬립 신호가 일차 시각피질(V1) 및 MT/V5 시각영역에서 처리되는 시간", "적의 방향 전환을 시각적으로 인지하기까지의 지연"],
        ["운동 반전 출력 지연", "80 – 130 ms", "피질척수로를 거쳐 전완근 굴근·신근으로의 신호 전달 및 길항근 제동", "크로스헤어의 관성을 멈추고 마우스를 역방향으로 꺾는 물리 시간"],
        ["종단 미세 실시간 보정", "60 – 100 ms", "미세 중심와 정렬 및 역치하 정밀 위치 보정", "오버슈트를 제거하고 목표물 중심에 조준선을 완벽 안착시키는 단계"],
        ["총 무예측 재획득 창", "300 – 440 ms", "시각 감지, 운동 반전, 종단 보정을 합산한 총 누적 지연", "예측 불가능한 무빙에 노출되었을 때 발생하는 정상적인 인간 지연"],
        ["엘리트 탈력 반응형 추적", "210 – 290 ms", "힘을 뺀 길항근 억제와 예기적 감속을 통한 초고속 제동", "에이펙스 프레데터나 프로 경기 최상위권의 압도적인 근접 트래킹 수준"]
      ],
      note: "수치는 안구운동 과학 및 인지과학 연구 (Rashbass 1961; Krauzlis 2004; Green & Bavelier 2003; Woods et al. 2015)를 토대로 작성되었습니다."
    },
    techniques: {
      title: "무빙 트래킹 및 에임 흔들림 극복을 위한 실전 테크닉",
      items: [
        {
          name: "길항근 탈력 (데스 그립 제거)",
          desc: "방향 전환 시 가장 흔한 실수는 마우스를 꽉 쥐는 것입니다. 굴근과 신근이 동시에 긴장하면 손목이 굳어져 떨림이 발생하고 전환 시 크게 빗나가게 됩니다.",
          tips: "가볍게 얹는 느낌의 릴랙스 그립을 유지하고, 손가락 끝과 손목으로 고빈도 미세 진동을 흡수하세요."
        },
        {
          name: "목표물 중심 시선 앵커링",
          desc: "자신의 조준선을 쳐다보지 말고, 목표물의 중심 모델에 시선을 깊게 고정하세요. 망막의 움직임 감지 기능이 활성화되어 이동 벡터 변화를 무의식적으로 계산합니다.",
          tips: "에임이 뒤처진다고 느껴질 때 시선의 100%를 상대 캐릭터의 골반 쪽에 집중해 보세요."
        },
        {
          name: "부드러운 속도 동기화 (오버플릭 금지)",
          desc: "목표물이 좌에서 우로 반전할 때 급하게 우측으로 플릭샷을 날리면 필연적으로 오버슈팅이 발생합니다. 플릭하지 말고 부드럽게 감속하여 목표 속도에 자연스럽게 동기화하세요.",
          tips: "방향 전환을 '두 번의 플릭'이 아닌 '하나의 감속-가속 사이클'로 매끄럽게 연결하세요."
        },
        {
          name: "골반 벡터 및 감속 프레임 예기 리딩",
          desc: "에이펙스나 워존 등 관성이 있는 게임에서는 전환 직전 캐릭터 모델이 미세하게 감속하며 기울어집니다. 이 프레임을 읽어내면 반응 속도를 30~50ms 앞당길 수 있습니다.",
          tips: "상대 캐릭터 모델의 발과 기울기를 주시하며 전환 찰나를 포착하는 감각을 익히세요."
        }
      ]
    },
    steps: [
      "세션 설정에서 선호하는 게임 감도를 일치시켜 일관된 근육 기억을 형성합니다.",
      "'훈련 시작'을 클릭하여 전체화면과 Pointer Lock을 활성화합니다.",
      "격렬하게 좌우로 전환하는 지터 목표 구체에 시선을 집중합니다.",
      "힘을 뺀 손목과 손가락으로 미세 반전을 흡수하며 조준선 접촉 시간을 극대화합니다.",
      "종료 후 트래킹 정확도(%), 이탈 시간, 최대 콤보를 확인하여 탈력 제어 성과를 분석합니다."
    ],
    audience: "에이펙스 레전드, 오버워치 2, 워존, 더 파이널스 등 고속 근접전에서 ADAD 무빙을 놓치지 않고 제압하고 싶은 모든 FPS 게이머, 손목 에임의 떨림을 없애고 싶은 유저.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'krauzlis2004', 'green2003', 'rashbass1961'),
    related: [
      { href: "/drills/fps/vertical-air-track", label: "공중 수직 트래킹" },
      { href: "/drills/fps/pro-smooth-pursuit", label: "스무스 퍼슈트 에임 트레이너" },
      { href: "/drills/fps/flick-shot-training", label: "플릭 에임 연습" },
      { href: "/drills/fps/180-degree-awareness", label: "180도 플릭 에임 연습" },
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
      <AntiStrafeJitterClient
        copy={{
          h1Keyword: "무빙 트래킹 에임 연습",
          h1Suffix: " - ADAD 지터 트래커",
          statScore: "점수",
          statTime: "남은 시간",
          statAccuracy: "추적 정확도",
          statBestScore: "최고 점수",
          startTitle: "무빙 트래킹 에임 연습 (ADAD 지터)",
          startSubtitle: "적 무빙 궤적 반응형 리딩 • 무한 난이도 진행",
          getReady: "준비 완료",
          pausedTitle: "일시 정지됨",
          pausedSubtitle: "클릭하여 재개 — 커서 잠금이 다시 활성화됩니다",
          stageCaption: "급격하게 좌우로 방향을 전환하는 고빈도 ADAD 무빙 목표물 위에 조준선을 지속해서 유지하세요.",
          rulesTitle: "훈련 규칙 & 점수 체계",
          rulesItems: [
            { num: "1", text: "에임 안착 정렬", highlight: "+10점 / 0.25초", result: "목표물에 조준선을 계속 유지" },
            { num: "2", text: "연속 트래킹 유지", highlight: "+0.4초 / 초", result: "콤보 배수를 최대 3.0배까지 누적" },
            { num: "3", text: "난이도 레벨 진행", highlight: "1,400점당 +1레벨", result: "이동 속도와 방향 전환 빈도 지속 증가" },
            { num: "4", text: "에임 이탈 감점", highlight: "실패 패널티", result: "1.0초 이상 이탈 시 콤보 리셋 (설정 활성화 시 -0.6초)" }
          ],
          aboutTitle: "무빙 트래킹 에임 훈련 정보",
          aboutHeading: "리액티브 트래킹(무빙 추적)이란 무엇인가요?"
        }}
      />
      <DrillGuide guide={antiStrafeGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/anti-strafe-jitter-duel"
          locale="ko"
        />
      </div>
    </>
  );
}
