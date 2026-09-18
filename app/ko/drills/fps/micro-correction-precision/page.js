import MicroCorrectionClient from '@/app/drills/fps/micro-correction-precision/MicroCorrectionClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: "마이크로 플릭 연습 – 에임 미세조정 트레이너 | SkillDrills",
  description: "무료 브라우저 마이크로 플릭 에임 트레이너. 초기 플릭 후 목표 중심의 미세 오차를 번개처럼 보정하고 손끝 감속 제어 및 헤드샷 정밀도를 과학적으로 훈련합니다.",
  keywords: [
    "마이크로 플릭 연습",
    "에임 미세조정",
    "마이크로 플릭",
    "발로란트 에임 미세조정",
    "FPS 헤드샷 에임 연습",
    "마이크로 에임 트레이너",
    "CS2 마이크로 플릭",
    "무료 에임 연습",
    "헤드샷 미세조정",
    "에임 브레이킹 연습",
    "마우스 감속 제어",
    "초정밀 에임 훈련"
  ],
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/fps/micro-correction-precision",
    languages: getAlternateLanguages('/drills/fps/micro-correction-precision'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "마이크로 플릭 연습 – 에임 미세조정 트레이너 | SkillDrills",
    description: "초기 플릭 직후의 미세한 조준 오차를 정밀 보정하는 무료 브라우저 FPS 에임 트레이너. 발로란트와 CS2 헤드샷 적중률을 비약적으로 끌어올립니다.",
    url: "https://skilldrills.online/ko/drills/fps/micro-correction-precision",
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "마이크로 플릭 연습 – 에임 미세조정 트레이너 | SkillDrills",
    description: "초기 플릭 직후의 미세한 조준 오차를 정밀 보정하는 무료 브라우저 FPS 에임 트레이너. 발로란트와 CS2 헤드샷 적중률을 비약적으로 끌어올립니다.",
  },
};

export default function MicroCorrectionKoPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ko" },
      { "@type": "ListItem", "position": 2, "name": "FPS 에임 훈련", "item": "https://skilldrills.online/ko/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "마이크로 플릭", "item": "https://skilldrills.online/ko/drills/fps/micro-correction-precision" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "마이크로 플릭 연습",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "초기 플릭 후 목표 중심의 미세 오차 보정, 손끝 감속 제동, 헤드샷 정확도를 극대화하는 무료 브라우저 FPS 에임 트레이너.",
    "genre": "FPS Training / Micro-Correction",
    "url": "https://skilldrills.online/ko/drills/fps/micro-correction-precision",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "마이크로 플릭 연습",
    "url": "https://skilldrills.online/ko/drills/fps/micro-correction-precision",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "초기 플릭 후 목표 중심의 미세 오차 보정, 손끝 감속 제동, 헤드샷 정확도를 극대화하는 무료 브라우저 FPS 에임 트레이너."
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "마이크로 플릭 연습",
    "url": "https://skilldrills.online/ko/drills/fps/micro-correction-precision",
    "description": "초기 플릭 후 목표 중심의 미세 오차 보정, 손끝 감속 제동, 헤드샷 정확도를 극대화하는 무료 브라우저 FPS 에임 트레이너.",
    "dateModified": "2026-09-05",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Micro Correction"],
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
        "name": "FPS 에임에서 '마우스 감속 제어(Deceleration Control)'란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "마우스 감속 제어는 빠른 초기 플릭 후 마우스패드의 마찰력과 손끝의 미세 하향 압력을 활용하여, 조준선이 목표를 지나치지 않고(오버슈트 없이) 헤드라인 위에 정확히 멈추도록 통제하는 운동 기술입니다."
        }
      },
      {
        "@type": "Question",
        "name": "전술 슈팅 게임에서 목표를 자꾸 지나치는(오버플릭) 주요 원인은 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "초기 가속도에 비해 손목과 손가락의 길항근 브레이킹이 늦거나, 현재 사용하는 eDPI가 너무 높기 때문입니다. 목표 지점 직전에서 의도적으로 마우스를 멈추는 감속 브레이킹 훈련이 필수적입니다."
        }
      },
      {
        "@type": "Question",
        "name": "2단계 조준 모델(Two-Component Aiming Model)은 에임 미세조정을 어떻게 설명하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Woodworth(1899)와 Meyer 등(1988)이 정립한 이론으로, 인간의 목표 조준은 '거리의 대부분을 단숨에 이동하는 초기 탄도 운동'과 '착탄 직전 시각 피드백을 통한 미세 보정'의 2단계로 진행됩니다."
        }
      },
      {
        "@type": "Question",
        "name": "발로란트와 CS2 프로 선수들은 마이크로 플릭을 어떻게 훈련하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "프로들은 프리조준 상태에서 발생하는 수 픽셀 단위의 미세 오차를 손가락 관절(핑거팁/클로 그립)만으로 찰나에 보정하는 고밀도 마이크로 어드저스트먼트 훈련을 일상적으로 수행합니다."
        }
      },
      {
        "@type": "Question",
        "name": "사격 전 '타겟 확인(Target Confirmation)'이란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "조준선이 적의 머리 중심에 완벽히 정렬된 것을 시각적으로 확인한 후 방아쇠를 당기는 과정입니다. 확인 없는 무조건적 속사는 헛사격과 반동 낭비의 원인이 됩니다."
        }
      },
      {
        "@type": "Question",
        "name": "마이크로 플릭 훈련이 헤드샷 적중률을 실질적으로 높여주나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "매우 크게 높여줍니다. 실전 교전에서 초탄 플릭이 적 머리에서 살짝 빗나갔을 때, 0.1초 만에 조준을 헤드로 당겨와 원탭을 성공시키는 복구 능력이 비약적으로 상승합니다."
        }
      },
      {
        "@type": "Question",
        "name": "모니터 주사율과 마우스 폴링레이트가 미세조정에 영향을 미치나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "결정적인 영향을 미칩니다. 고주사율(144Hz/240Hz)과 1000Hz 이상의 폴링레이트는 시각 지연과 입력 끊김을 극소화하여 밀리미터 단위의 정밀한 손끝 미세조정을 정확히 화면에 반영합니다."
        }
      },
      {
        "@type": "Question",
        "name": "마이크로 플릭 훈련은 얼마나 자주 하는 것이 좋나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "매일 15~20분 정도, 플릭 및 트래킹 훈련과 병행하는 것이 이상적입니다. 손가락 관절 피로가 쌓이기 전 맑은 상태에서 고집중 훈련을 수행해야 신경 가소성이 극대화됩니다."
        }
      },
      {
        "@type": "Question",
        "name": "마우스 그립법이 손끝 미세조정에 어떤 영향을 주나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "팜 그립(Palm Grip)은 손가락 관절이 마우스에 밀착되어 미세조정이 제한적입니다. 반면 클로(Claw)나 핑거팁(Fingertip) 그립은 손가락 관절이 자유로워 미세한 조준 오차를 가장 빠르게 수정할 수 있습니다."
        }
      },
      {
        "@type": "Question",
        "name": "이 드릴에서 빗나가거나 시간 초과 시 콤보가 리셋되는 이유는 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "단순한 속도 경쟁을 넘어 극도의 정확성을 강제하기 위함입니다. 페널티를 부여함으로써 실전의 팽팽한 긴장감 속에서도 침착하게 조준을 확인하는 사격 규율을 확립합니다."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "에임 미세조정 및 마이크로 플릭 4단계 실전 훈련법",
    "description": "초기 플릭 감속과 손끝을 이용한 고정밀 위치 보정을 체득하기 위한 단계별 가이드.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "인게임 감도 캘리브레이션",
        "text": "실제 플레이하는 게임의 감도와 DPI를 세션 설정에서 동일하게 맞추고 1:1 원시 입력을 확보합니다."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "앵커 타겟으로의 1차 탄도 플릭",
        "text": "화면에 크게 나타난 앵커 타겟으로 빠르게 플릭하여 클릭하고 2차 마이크로 타겟을 출현시킵니다."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "패드 마찰력을 이용한 급감속 브레이킹",
        "text": "앵커 주변에서 손바닥 하단과 손끝 하향 압력으로 마우스패드 마찰력을 가해 조준선을 단번에 급정지시킵니다."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "손끝 미세조정 및 착탄 확인 사격",
        "text": "손가락 관절을 미세하게 굴려 조준선을 마이크로 타겟 중심으로 빨아들이듯 밀어 넣고 정확히 클릭합니다."
      }
    ]
  };

  const microCorrectionGuide = {
    heading: "마이크로 플릭 연습 실전 가이드",
    subtitle: "초기 플릭 직후의 미세 조준 보정, 종단 마찰 감속 제동, 그리고 빗나가지 않는 헤드샷 정밀도를 완성하는 과학적 방법론",
    intro: [
      "마이크로 플릭(Micro-Correction Aiming)은 빠른 첫 플릭이 적 머리에서 불과 수 픽셀 옆에 멈췄을 때, 찰나의 순간에 오차를 보정하여 정확히 헤드샷을 꽂아 넣는 FPS의 최후 승부처 기술입니다. 발로란트와 카운터스트라이크 2 같은 전술 슈팅 게임에서는 최초 플릭 속도 이상으로, 빗나간 조준을 얼마나 빠르고 침착하게 재정렬하느냐가 승패를 가릅니다.",
      "Robert S. Woodworth(1899)와 David E. Meyer 등(1988)의 목표 지향 운동 이론에 따르면, 인간의 에임 운동은 거리를 단숨에 좁히는 '개루프 탄도 인파이어'와 타겟 근처에서의 '폐루프 시각 피드백 미세 보정'으로 명확히 구분됩니다. 나아가 Susana Martinez-Conde 등(2004)과 Martin Rolfs(2009)의 미세 도약 안구운동 연구는 뇌가 초점을 확정하기 직전의 감속 제어 메커니즘을 규명합니다.",
      "Paul M. Fitts(1954)의 운동 법칙에 따르면 극소형 타겟을 타격하는 작업은 난이도 지수(ID)가 기하급수적으로 치솟습니다. 본 드릴은 앵커 타겟과 마이크로 타겟의 연속 타격을 통해 관성을 급제동하는 패드 브레이킹과 손끝 관절의 정밀 독립 제어를 빈틈없이 단련합니다.",
      "측정 정확도 안내: 본 드릴은 브라우저의 performance.now() 고해상도 타이머를 활용하여 기기 내부에서 밀리초 단위로 정확히 실행됩니다. 디스플레이 주사율(60Hz/144Hz/240Hz)에 따른 프레임 지연이 발생하므로 5ms 미만의 미세 편차는 하드웨어 측정 노이즈로 간주하시기 바랍니다."
    ],
    benchmarks: {
      title: "마이크로 보정 레이턴시 & 정밀도 벤치마크 기준",
      headers: ["스킬 티어", "평균 미세보정 시간", "마이크로 적중률", "실전 인게임 교전 영향"],
      rows: [
        ["Tier 1 (프로 / 레디언트급)", "140 ms 미만", "95% – 99%+", "플릭과 미세조정이 하나로 연결된 무의식적 보정; 헤드샷 전환율 극대화"],
        ["Tier 2 (불멸 / 마스터급)", "140 – 190 ms", "88% – 95%", "탁월한 감속 제어력; 빗나간 초탄을 번개처럼 리커버리하여 교전 승리"],
        ["Tier 3 (다이아 / 초월자급)", "190 – 250 ms", "80% – 88%", "안정적인 미세조정; 손목의 불필요한 긴장으로 종종 오버슈트 발생"],
        ["Tier 4 (골드 / 플래티넘급)", "250 – 340 ms", "70% – 80%", "감속이 미숙하여 목표를 지나친 후 다시 되돌리는 '이중 보정'으로 반응 패배"],
        ["Tier 5 (실버 이하 초심자)", "340 ms 이상", "70% 미만", "손가락 관절을 쓰지 못하고 팔 전체로만 미세 조정을 시도하여 타겟 빗나감"]
      ],
      note: "평균 미세보정 시간은 앵커 타겟 적중 순간부터 2차 마이크로 타겟 유효 사격까지의 시간입니다(Woods et al., 2015)."
    },
    techniques: {
      title: "마이크로 플릭 정확도를 극대화하는 생체역학 테크닉",
      items: [
        {
          name: "손가락 관절을 이용한 미세 스트로크 (핑거팁 제어)",
          desc: "수 픽셀의 오차를 팔이나 손목으로 무리하게 맞추지 않고, 마우스를 쥔 엄지·약지·새끼손가락의 관절 굴신으로 마우스를 미세하게 슬라이딩합니다.",
          tips: "손바닥 하단을 마우스패드에 가볍게 접촉시켜 기준점을 만들고 손끝을 자유롭게 가동하세요."
        },
        {
          name: "마우스패드 마찰력을 활용한 능동적 브레이킹",
          desc: "앵커 타겟 착탄 직전 손바닥이나 새끼손가락 쪽에 순간적인 하향 압력을 주어 마우스 피트와 패드의 마찰력을 극대화하여 관성을 단숨에 차단합니다.",
          tips: "과도하게 힘을 주면 다음 미세조정 시 손이 굳으므로 0.1초만 순간적으로 제동하고 힘을 빼세요."
        },
        {
          name: "착탄 직전 시각적 확신 (타겟 컨퍼메이션)",
          desc: "조준선이 마이크로 타겟 중심에 확실히 들어간 것을 시각적으로 인지한 후 클릭하는 사격 규율을 체득합니다(Rolfs, 2009).",
          tips: "도착하기도 전에 반사적으로 클릭하는 조급한 습관을 의식적으로 교정하세요."
        },
        {
          name: "앵커-마이크로 간의 일정한 리듬 확립",
          desc: "'탁-탁' 하는 두 박자의 리듬을 몸에 각인시켜 극한의 교전 긴장 속에서도 근육 동결(프리즈)을 방지합니다.",
          tips: "일정한 박자감을 유지할 때 근육 기억이 가장 효율적으로 활성화됩니다."
        }
      ]
    },
    steps: [
      "인게임 감도와 DPI를 맞추고 포인터 락을 활성화하여 훈련을 시작합니다.",
      "화면에 크게 나타나는 앵커 타겟으로 빠르게 플릭하여 클릭합니다.",
      "앵커 격파와 동시에 마우스를 급감속시키고, 바로 옆에 나타나는 작은 마이크로 타겟으로 손끝을 미세하게 조정합니다.",
      "중심점에 정확히 정렬된 것을 확인한 후 클릭하여 고득점 보너스를 챙기세요.",
      "미스로 인한 콤보 단절을 주의하며 레벨 상승에 따른 극소형 타겟 정복에 도전하세요."
    ],
    audience: "발로란트, 카운터스트라이크 2, 레인보우 식스 시즈, 에이펙스 레전드에서 헤드샷 적중률을 극적으로 높이고자 하는 모든 FPS 게이머.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'meyer1988', 'martinezConde2004', 'rolfs2009', 'woodworth1899'),
    related: [
      { href: "/ko/drills/fps/flick-shot-training", label: "플릭 에임 연습" },
      { href: "/ko/drills/fps/target-acquisition", label: "타겟 획득 에임 연습" },
      { href: "/ko/drills/fps/target-prioritization", label: "타겟 우선순위 에임 연습" },
      { href: "/ko/drills/fps/target-switching-swarm", label: "타겟 스위칭 에임 연습" }
    ]
  };

  return (
    <>
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />

      {/* VideoGame Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <MicroCorrectionClient
        copy={{
          h1Keyword: "마이크로 플릭 연습",
          h1Suffix: " - 에임 미세조정 & 헤드샷 정밀도 트레이너",
          statScore: "점수",
          statTime: "남은 시간",
          statAccuracy: "정확도",
          statBestScore: "최고 점수",
          statAvgCorrection: "평균 미세보정",
          statMaxCombo: "최대 콤보",
          statPeakLevel: "최고 레벨",
          startTitle: "마이크로 플릭 연습",
          startSubtitle: "원시 입력 캘리브레이션 • 무한 레벨 난이도 진행",
          getReady: "준비",
          toggleFlash: "미스 플래시 켜기/끄기",
          toggleSound: "효과음 켜기/끄기",
          pausedTitle: "일시 정지됨",
          pausedSubtitle: "클릭하여 계속하기 — 마우스 커서 락이 다시 활성화됩니다.",
          stageCaption: "앵커 타겟을 클릭한 후 즉시 조준선을 미세 조정하여 작은 마이크로 타겟을 정밀 타격하세요.",
          rulesTitle: "훈련 규칙 및 점수 산정 방식",
          rulesItems: [
            { num: "1", text: "앵커 타겟 명중", highlight: "+10점 (+0.2초)", result: "인접 마이크로 타겟 잠금 해제" },
            { num: "2", text: "마이크로 타겟 명중", highlight: "최대 +585점 (+0.2초)", result: "정밀도 및 콤보 배율 비례 점수 획득" },
            { num: "3", text: "레벨 상승", highlight: "매 1,400점마다 +1 레벨", result: "타겟 크기 지속 축소 및 고난도화" },
            { num: "4", text: "미스 / 시간 초과", highlight: "페널티", result: "콤보 즉시 초기화" }
          ],
          aboutTitle: "마이크로 플릭 에임 트레이너 소개",
          aboutHeading: "마이크로 플릭(에임 미세조정)이란?",
          aboutText: "대부분의 조준 운동은 하나의 동작이 아닌 두 단계로 이루어집니다. 빠른 탄도학적 초기 플릭과 착탄 직전의 감속 및 미세 위치 보정입니다(Woodworth, 1899; Meyer et al., 1988). 이 드릴은 실제 헤드샷 승패를 판가름하는 두 번째 단계, 즉 미세조정 능력을 극대화합니다."
        }}
      />

      <DrillGuide guide={microCorrectionGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/micro-correction-precision"
          locale="ko"
        />
      </div>
    </>
  );
}
