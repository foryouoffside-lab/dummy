import TargetSwitchingSwarmClient from '@/app/drills/fps/target-switching-swarm/TargetSwitchingSwarmClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — ko-KR (fps / target-switching-swarm)
// PRIMARY DOMESTIC: "타겟 스위칭 에임"          — Technical aim phrase
//                   "타겟 스위칭"              — #1 Google Suggest hit ('타겟 스위칭 디시')
//                   "에임 스위칭"              — Exact Google Suggest hit
//                   "다중 타겟 에임 연습"      — Descriptive high-intent phrase
//                   "타겟 스위칭 연습"         — Practice query
// SECONDARY / LSI:
//                   "FPS 타겟 전환"            — Tactical keyword
//                   "발로란트 타겟 스위칭"     — Game specific search
//                   "무료 에임 연습 사이트"    — Platform intent
// WINNER TITLE:     타겟 스위칭 에임 연습 – 브라우저 무료 FPS 다중 타겟 전환 트레이너 | SkillDrills
// ============================================================

export const metadata = {
  title: "타겟 스위칭 에임 연습 – 브라우저 무료 FPS 다중 타겟 전환 트레이너 | SkillDrills",
  description: "브라우저에서 설치 없이 무료로 즐기는 FPS 타겟 스위칭(타겟 전환) 에임 연습 사이트. 다중 스와름 타겟을 향한 지체 없는 연속 플릭, 킬 확인 딜레이 제거, 발로란트와 CS2 스프레이 전환 실전력을 극대화하세요.",
  keywords: [
    '타겟 스위칭 에임',
    '타겟 스위칭',
    '에임 스위칭',
    '다중 타겟 에임 연습',
    '타겟 스위칭 연습',
    'FPS 타겟 전환',
    '발로란트 타겟 스위칭',
    '무료 에임 연습 사이트',
    '스프레이 전환 에임',
    '에임 스와름 훈련',
    'FPS 에임 정확도',
    '배틀그라운드 에임 전환'
  ],
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/fps/target-switching-swarm",
    languages: getAlternateLanguages('/drills/fps/target-switching-swarm'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "타겟 스위칭 에임 연습 – 브라우저 무료 FPS 다중 타겟 전환 트레이너 | SkillDrills",
    description: "브라우저에서 설치 없이 무료로 즐기는 FPS 타겟 스위칭(타겟 전환) 에임 연습 사이트. 다중 스와름 타겟을 향한 지체 없는 연속 플릭, 킬 확인 딜레이 제거, 발로란트와 CS2 스프레이 전환 실전력을 극대화하세요.",
    url: "https://skilldrills.online/ko/drills/fps/target-switching-swarm",
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "타겟 스위칭 에임 연습 – 브라우저 무료 FPS 다중 타겟 전환 트레이너 | SkillDrills",
    description: "브라우저에서 설치 없이 무료로 즐기는 FPS 타겟 스위칭(타겟 전환) 에임 연습 사이트. 다중 스와름 타겟을 향한 지체 없는 연속 플릭, 킬 확인 딜레이 제거, 발로란트와 CS2 스프레이 전환 실전력을 극대화하세요.",
  },
};

export default function TargetSwitchingSwarmPageKo() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://skilldrills.online/ko" },
      { "@type": "ListItem", "position": 2, "name": "FPS 드릴", "item": "https://skilldrills.online/ko/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "타겟 스위칭 에임 연습", "item": "https://skilldrills.online/ko/drills/fps/target-switching-swarm" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "타겟 스위칭 에임 연습 (Target Switching Swarm)",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-11",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "설치 없이 웹 브라우저에서 실행되는 무료 FPS 타겟 스위칭 에임 트레이너. 동적으로 생성되는 다중 타겟을 신속하게 연속 전환 격추합니다.",
    "genre": "FPS Training / Target Switching",
    "url": "https://skilldrills.online/ko/drills/fps/target-switching-swarm",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "타겟 스위칭 에임 연습 (Target Switching Swarm)",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-11",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "browserRequirements": "Pointer Lock API, JavaScript, HTML5 Canvas 지원 브라우저",
    "description": "설치 없이 웹 브라우저에서 실행되는 무료 FPS 타겟 스위칭 에임 트레이너. 동적으로 생성되는 다중 타겟을 신속하게 연속 전환 격추합니다.",
    "url": "https://skilldrills.online/ko/drills/fps/target-switching-swarm"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "타겟 스위칭 에임 연습 (Target Switching Swarm)",
    "url": "https://skilldrills.online/ko/drills/fps/target-switching-swarm",
    "description": "설치 없이 웹 브라우저에서 실행되는 무료 FPS 타겟 스위칭 에임 트레이너. 동적으로 생성되는 다중 타겟을 신속하게 연속 전환 격추합니다.",
    "dateModified": "2026-09-11",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Target Switching"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-11",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "FPS에서 '타겟 스위칭(Target Switching)'이란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "타겟 스위칭은 여러 개의 서로 다른 표적 사이를 조준선의 멈춤이나 망설임 없이 신속하게 연속 전환하여, 각 대상을 빠른 플릭과 사격으로 제압하는 운동 역학적 에임 기술입니다."
        }
      },
      {
        "@type": "Question",
        "name": "일반 플릭 훈련과 타겟 스위칭의 차이점은 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "일반 플릭 훈련은 단일 표적을 쏜 뒤 조준선을 중앙으로 복귀시키는 경우가 많지만, 타겟 스위칭은 화면에 동시에 혹은 연속 생성되는 다중 표적 무리를 물 흐르듯 연속 사격하므로 시각적 사전 인덱싱과 궤적 최적화 능력이 요구됩니다."
        }
      },
      {
        "@type": "Question",
        "name": "스와름(군집) 형태의 연습이 멀티킬에 어떻게 도움이 되나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "하나의 적을 사격하는 도중 주변 시야로 다음 타겟의 위치를 미리 계산하는 감각 신경망을 활성화하여, 실전 사이트 방어나 난전 상황에서 딜레이 없는 연속 킬 캐치 능력을 극대화합니다."
        }
      },
      {
        "@type": "Question",
        "name": "적을 처치한 후 다음 표적으로의 전환이 지체되는 이유는 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "적이 죽었는지를 눈이나 귀로 확인하는 '킬 확인 딜레이(확신 망설임)' 때문입니다. 본 드릴을 반복하면 클릭 완료와 동시에 시선과 마우스를 다음 표적으로 즉시 넘기는 본능적 조준 습관이 형성됩니다."
        }
      },
      {
        "@type": "Question",
        "name": "발로란트나 CS2 스프레이 전환(Spray Transfer)에도 적용되나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "네. 연사 도중 옆에 있는 적으로 조준선을 정확하게 이동시켜 정지시키는 감속 제동력이 직접적으로 훈련되므로 다자간 교전 시 스프레이 전환 성공률이 대폭 상승합니다."
        }
      },
      {
        "@type": "Question",
        "name": "타겟 스위칭이 특히 중요한 게임은 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "발로란트, 카운터 스트라이크 2, 에이펙스 레전드, 오버워치 2 등 다수의 적이 동시에 진입하는 사이트 교전에서 연속적인 헤드샷 격추가 필수적인 모든 전술 슈터입니다."
        }
      },
      {
        "@type": "Question",
        "name": "빠른 타겟 전환에 가장 적합한 마우스 그립법은 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "클로 그립(Claw Grip)이나 핑거팁 그립(Fingertip Grip)이 유리합니다. 손목과 손가락 관절의 독립적인 미세 조절이 가능하여 급격한 플릭 정지 시 발생하는 흔들림을 효과적으로 흡수할 수 있습니다."
        }
      },
      {
        "@type": "Question",
        "name": "피츠의 법칙(Fitts' Law)과 탄도 운동은 어떻게 연관되나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "피츠의 법칙에 따르면 이동 시간은 거리와 표적 크기에 비례합니다. 타겟 스위칭은 거리의 90%를 초고속 탄도 운동으로 단번에 좁힌 뒤 미세 교정하는 2단계 최적화 모델(Meyer et al., 1988)을 따릅니다."
        }
      },
      {
        "@type": "Question",
        "name": "타겟 스위칭 에임 연습은 얼마나 자주 해야 하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "회당 10~15분씩 주 3~4회, 혹은 본 게임 시작 전 웜업 루틴으로 수행하면 킬 후 확인 딜레이가 사라지고 에임 전환 템포가 비약적으로 빨라집니다."
        }
      },
      {
        "@type": "Question",
        "name": "이 타겟 스위칭 에임 트레이너는 무료로 이용할 수 있나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "네, 별도 설치나 회원가입 없이 PC 브라우저에서 하드웨어 RAW 마우스 포인터 락으로 100% 무료 실행됩니다."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "타겟 스위칭 에임 훈련법",
    "description": "다중 스와름 타겟을 향한 초고속 플릭 전환과 무지체 연속 격추 4단계.",
        "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "감도 일치 및 포인터 락 활성화",
        "text": "평소 사용하는 주력 FPS 게임의 감도와 DPI를 설정에서 맞춘 뒤, 화면을 클릭하여 마우스 포인터를 잠급니다.",
        "url": "https://skilldrills.online/ko/drills/fps/target-switching-swarm#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "가장 가까운 스와름 타겟 신속 포착",
        "text": "생성된 시안색 타겟 중 각도 거리가 가장 짧은 대상에게 빠르게 플릭하여 클릭 파괴하고 보너스 시간을 획득합니다.",
        "url": "https://skilldrills.online/ko/drills/fps/target-switching-swarm#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "킬 확인 멈춤 없이 즉각적인 다음 플릭 전환",
        "text": "파괴 모션을 기다려 확인하지 않고, 클릭과 동시에 다음 인접 표적을 향해 지체 없이 탄도 플릭을 발사합니다.",
        "url": "https://skilldrills.online/ko/drills/fps/target-switching-swarm#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "탈력된 플로우 리듬으로 연속 스트릭 유지",
        "text": "손목 긴장을 풀고 부드러운 운동 연쇄를 유지하며, 타이머 링이 사라지기 전에 연속 격추하여 고난도 스와름에 도달합니다.",
        "url": "https://skilldrills.online/ko/drills/fps/target-switching-swarm#step-4"
      }
    ]
  };

  const targetSwitchingGuide = {
    heading: "타겟 스위칭 에임 가이드 & 다중 타겟 운동역학",
    intro: [
      "타겟 스위칭 스와름(Target Switching Swarm)은 여러 개의 적대적 타겟 사이를 한 치의 망설임 없이 초고속으로 연속 전환하는 능력을 극대화하기 위해 설계된 고급 FPS 모터 컨트롤 드릴입니다. 카운터 스트라이크 2, 발로란트의 사이트 수비 및 에이펙스 레전드의 난전에서는 1대1 교전만으로 클러치를 이길 수 없습니다. 첫 번째 적을 제거한 순간, 뇌가 킬을 인지하고 멈추는 포즈 없이 즉각 2선 침투 적에게 크로스헤어를 안착시키는 스위칭 민첩성이 핵심입니다.",
      "타겟 스위칭의 정신물리학은 피츠의 법칙(Fitts, 1954)과 David E. Meyer 등(1988)의 확률적 최적 하위운동 모델을 기반으로 합니다. 조준 운동은 전체 궤적의 약 90%를 폭발적으로 좁히는 초기 탄도 운동(Primary Submovement)과 시각 피드백으로 미세 조정하는 2차 수정 운동으로 나뉩니다. 초심자는 매 킬마다 100~250ms 동안 '적이 죽었는지' 확인하느라 멈칫거리지만, 프로 게이머는 클릭 완료와 동시에 시선 사케드를 다음 타겟으로 즉시 이동시킵니다.",
      "복잡한 스와름 타겟군 속에서의 공간 인덱싱은 특징 통합 이론과 사전주의적 시각 탐색 메커니즘(Treisman & Gelade, 1980; Wolfe, 2007)을 따릅니다. 인간의 시각 피질은 '시각 인덱스(FINST 이론)'를 통해 복수의 표적 좌표를 병렬 추적할 수 있으므로, 최소 각거리로 묶인 클러스터 최적 경로를 본능적으로 설계할 수 있습니다.",
      "측정 정확도 안내: 모든 이벤트는 브라우저의 performance.now() 고정밀 클록을 사용해 사용자 기기 내에서 밀리초 단위로 안전하게 처리됩니다. 브라우저 보안 완화책으로 타이머는 약 1ms 단위로 반올림되며, 디스플레이 주사율(60Hz 기준 약 16.7ms, 144Hz 기준 약 6.9ms, 240Hz 기준 약 4.1ms)에 따른 양자화가 발생합니다. 5ms 미만의 차이는 측정 편차로 간주하고 다른 사람의 PC 환경과 단순 비교하기보다는 동일한 기기 환경에서의 개인 성취도 향상 지표로 활용하시기 바랍니다."
    ],
    benchmarks: {
      title: "타겟 스위칭 및 연속 전환 벤치마크 기준",
      headers: ["퍼포먼스 티어", "타겟 간 전환 소요시간", "분당 타겟 격추수", "인게임 실전 경쟁력"],
      rows: [
        ["Tier 1 (레디언트 / 페이스잇 10레벨 / 프로)", "210 ms 미만", "분당 110개 이상", "무결점 스프레이 전환. 킬 확인 딜레이 제로. 1v3 사이트 진입 단독 분쇄 및 역전 클러치"],
        ["Tier 2 (불멸 / 페이스잇 8-9레벨 / 마스터)", "210 – 260 ms", "분당 92 – 110개", "매우 날카로운 타겟 연계. 넓은 각도 전환 시 미세한 떨림이 있으나 확실한 멀티킬 회수"],
        ["Tier 3 (초월자 / 다이아몬드 상위권)", "260 – 320 ms", "분당 74 – 92개", "밀집된 타겟 무리는 능숙하게 처리함. 화면 반대편으로의 와이드 스위칭 시 진입이 지연됨"],
        ["Tier 4 (플래티넘 / 골드 구간)", "320 – 400 ms", "분당 56 – 74개", "킬 후 100ms 이상의 확신 망설임 발생. 다음 타겟을 향해 과도하게 마우스를 꺾어 지나치는 오버슈트 빈발"],
        ["Tier 5 (실버 / 브론즈 / 비기너)", "400 ms 이상", "분당 56개 미만", "표적을 쏠 때마다 마우스가 완전히 정지. 손목 긴장으로 인해 연속적인 플릭 흐름이 단절됨"]
      ],
      note: "전환 소요시간은 이전 타겟 파괴 시점부터 다음 타겟 중심에 조준선이 도착하기까지의 밀리초 간격이며, 분당 격추수는 세션 동안 유지된 지속 파괴 처리량입니다 (Woods et al., 2015)."
    },
    techniques: {
      title: "타겟 스위칭을 완성하는 과학적 에임 프로토콜",
      items: [
        {
          name: "사케드 사전 루팅과 시각 인덱싱",
          desc: "첫 번째 타겟에 대한 최종 미세 조정이 끝나기 직전, 시선(중심시)을 먼저 다음 타겟으로 도약시킵니다 (Treisman & Gelade, 1980; Wolfe, 2007). 안구 운동은 손의 운동보다 50~80ms 먼저 일어납니다.",
          tips: "클릭한 타겟을 계속 보지 마세요. 주변 시야로 파괴를 확인하고 중심시는 이미 다음 적에 꽂혀 있어야 합니다."
        },
        {
          name: "종말 제동력과 탄도 하위운동 최적화",
          desc: "플릭 궤적의 마지막 10% 구간에서 길항근의 반대 방향 텐션을 단단히 주어 타겟 중심에 조준선을 칼같이 세웁니다 (Meyer et al., 1988).",
          tips: "마우스에 유압식 브레이크가 달렸다고 상상하세요. 출발은 폭발적으로, 도착은 흔들림 없이 정지해야 합니다."
        },
        {
          name: "최단 각거리 기반 클러스터 소탕",
          desc: "화면을 무작정 횡단하지 말고 각도 거리가 가장 가까운 타겟 쌍부터 순서대로 정리해 나갑니다 (Fitts, 1954).",
          tips: "멀리 떨어진 단독 타겟으로 무리하게 날아가지 말고, 가까운 군집부터 빠르게 쓸어 담으세요."
        },
        {
          name: "그립 탈력 유지 및 미세 조절력 보존",
          desc: "마우스 그립 압력을 10점 만점에 3점 정도로 가볍게 유지하여, 초고속 플릭 직후에도 손가락 끝으로 미세한 수정 조준이 가능하게 합니다.",
          tips: "긴 연속 교전에서 손에 쥐가 나거나 조준선이 튄다면 엄지와 새끼손가락의 쥐는 힘을 의도적으로 풀어주세요."
        }
      ]
    },
    steps: [
      "인게임 감도와 마우스 DPI를 평소 플레이 환경과 일치시키고 클릭하여 포인터 락 활성화.",
      "화면에 스폰된 스와름 전체를 시야에 담고 각도 차이가 작은 타겟 클러스터를 신속 식별.",
      "가장 가까운 타겟으로 빠르게 플릭하여 격추하고 점수 및 세션 시간 보너스 획득.",
      "킬 확인 멈춤을 배제하고 즉시 다음 인접 타겟으로 마우스 탄도 운동을 부드럽게 연계.",
      "손목에 무리한 힘을 주지 않고 연속 콤보를 누적하여 최고 난도의 스와름 밀도에 도전."
    ],
    audience: "발로란트, 카운터 스트라이크 2, 에이펙스 레전드, 오버워치 2 등에서 다수 교전 및 스프레이 전환 민첩성을 강화하여 승률을 높이고자 하는 FPS 게이머.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'meyer1988', 'treisman1980', 'wolfe2007'),
    related: [
      { href: "/ko/drills/fps/vertical-air-track", label: "수직 에임 연습 (공중 타겟 트래킹)" },
      { href: "/ko/drills/fps/strafe-tracking", label: "에임 트래킹 연습 (무빙 추적)" },
      { href: "/ko/drills/motor/hand-eye-coordination/aim-trainer", label: "에임 트레이너 (플릭 샷)" },
      { href: "/ko/drills/reaction-speed/reaction-game", label: "반응속도 테스트 게임" },
      { href: "/ko/drills/reaction-speed/visual-tracking-speed-test", label: "시각 추적 속도 테스트" }
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
      <TargetSwitchingSwarmClient
        copy={{
          h1Keyword: "타겟 스위칭 에임",
          h1Suffix: " – 브라우저 무료 FPS 다중 타겟 전환 연습",
          subtitle: "지체 없는 연속 플릭 전환과 스프레이 전환, 다중 타겟 시각적 인덱싱을 훈련하세요.",
          statScore: "점수",
          statTime: "남은 시간",
          statAccuracy: "적중률",
          statBestScore: "최고 점수",
          statTargetsDestroyed: "파괴 타겟",
          statMaxCombo: "최대 콤보",
          statPeakLevel: "최고 레벨",
          startTitle: "Target Switching Swarm",
          startSubtitle: "초정밀 RAW 마우스 입력 • 무한 난이도 진행",
          stageCaption: "타이머가 만료되기 전에 화면 곳곳에 생성되는 타겟을 빠른 플릭으로 연속 격추하세요.",
          rulesTitle: "드릴 조작법 & 점수 획득 규칙",
          aboutTitle: "타겟 스위칭(Target Switching)에 대하여",
          rulesItems: [
            { num: "1", text: "타겟 즉시 격추", highlight: "시안색 타겟 (+100점 / +0.35초)", result: "+100점 / +0.35초" },
            { num: "2", text: "동적 스와름 전환", highlight: "즉각 리스폰", result: "지속 스와름" },
            { num: "3", text: "실패 페널티", highlight: "빗나감 / 타이머 초과", result: "콤보 초기화" },
            { num: "4", text: "레벨 난이도 상승", highlight: "+1 레벨 / 2100점", result: "소형화 & 가속" }
          ]
        }}
      />
      <DrillGuide guide={targetSwitchingGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/target-switching-swarm"
          locale="ko"
        />
      </div>
      <DrillFooter />
    </>
  );
}
