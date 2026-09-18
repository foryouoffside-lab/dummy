import TargetAcquisitionClient from '@/app/drills/fps/target-acquisition/TargetAcquisitionClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: "타겟 획득 에임 연습 – 초탄 정확도 트레이너 | SkillDrills",
  description: "무료 브라우저 타겟 획득 에임 트레이너. 시야 내 위협 대상을 즉각 식별하고, 목표 구별 능력 및 긴장감 속에서의 초탄 플릭 정확도를 과학적으로 향상시킵니다.",
  keywords: [
    "타겟 획득 에임",
    "타겟 포착 에임",
    "초탄 에임 연습",
    "타겟 획득 에임 연습",
    "초탄 정확도 연습",
    "타겟 셀렉션",
    "FPS 적 포착 연습",
    "발로란트 초탄 헤드샷",
    "CS2 샷 정확도",
    "무료 에임 트레이너",
    "초탄 에임 속도",
    "타겟 식별 훈련"
  ],
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/fps/target-acquisition",
    languages: getAlternateLanguages('/drills/fps/target-acquisition'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "타겟 획득 에임 연습 – 초탄 정확도 트레이너 | SkillDrills",
    description: "시각적 타겟 포착 속도, 특징 대비 식별 능력, 정밀한 초탄 플릭 에임을 훈련하는 무료 브라우저 FPS 에임 트레이너.",
    url: "https://skilldrills.online/ko/drills/fps/target-acquisition",
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "타겟 획득 에임 연습 – 초탄 정확도 트레이너 | SkillDrills",
    description: "시각적 타겟 포착 속도, 특징 대비 식별 능력, 정밀한 초탄 플릭 에임을 훈련하는 무료 브라우저 FPS 에임 트레이너.",
  },
};

export default function TargetAcquisitionKoPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ko" },
      { "@type": "ListItem", "position": 2, "name": "FPS 에임 훈련", "item": "https://skilldrills.online/ko/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "타겟 획득", "item": "https://skilldrills.online/ko/drills/fps/target-acquisition" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "타겟 획득 에임 연습",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "시각적 타겟 식별 속도, 위협 우선순위 판단, 초탄 헤드샷 정확도를 극대화하는 무료 브라우저 FPS 에임 트레이너.",
    "genre": "FPS Training / Target Acquisition",
    "url": "https://skilldrills.online/ko/drills/fps/target-acquisition",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "타겟 획득 에임 연습",
    "url": "https://skilldrills.online/ko/drills/fps/target-acquisition",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "시각적 타겟 식별 속도, 위협 우선순위 판단, 초탄 헤드샷 정확도를 극대화하는 무료 브라우저 FPS 에임 트레이너."
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "타겟 획득 에임 연습",
    "url": "https://skilldrills.online/ko/drills/fps/target-acquisition",
    "description": "시각적 타겟 식별 속도, 위협 우선순위 판단, 초탄 헤드샷 정확도를 극대화하는 무료 브라우저 FPS 에임 트레이너.",
    "dateModified": "2026-09-05",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Target Acquisition"],
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
        "name": "경쟁전 FPS 게임에서 '타겟 획득(Target Acquisition)'이란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "타겟 획득은 시야 내 복잡한 지형지물 사이에서 적을 시각적으로 탐지하고, 아군 및 주변 사물과 즉각 구별한 뒤 운동 궤적을 형성하여 초탄을 정확히 적중시키는 인지 및 운동 제어 과정입니다."
        }
      },
      {
        "@type": "Question",
        "name": "타겟 획득은 단순 반응속도와 어떻게 다른가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "단순 반응속도는 하나의 예측 가능한 자극에 대한 단순 클릭 지연 시간만을 측정합니다. 반면 타겟 획득은 시각 탐색, 선택적 공간 주의, 명도/실루엣 대비 식별, 시간 압박 하에서의 정밀 포인팅을 복합적으로 요구합니다."
        }
      },
      {
        "@type": "Question",
        "name": "타겟 식별에 관한 '특징 통합 이론(Feature-Integration Theory)'은 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Anne Treisman과 Garry Gelade(1980)가 제창한 이론으로, 밝기, 색상, 방향 같은 기본 시각적 특징은 시야 전체에서 무의식적이고 병렬적으로 먼저 처리되며, 이후 공간적 주의가 결합되어 개별 목표물로 인식됩니다."
        }
      },
      {
        "@type": "Question",
        "name": "프로 선수들이 일반 유저보다 훨씬 빠르게 적을 포착하고 사격하는 비결은 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "프로들은 안내 탐색 모델(Wolfe, 2007)과 주변시 대비 감도를 극대화하여, 화면을 하나씩 훑어보는 직렬 스캔 없이 가장 위험한 위협 대상으로 단번에 도약 안구 운동(사카드)과 플릭을 연결하기 때문입니다."
        }
      },
      {
        "@type": "Question",
        "name": "발로란트나 카운터스트라이크 2 같은 전술 FPS에서 초탄 정확도가 왜 결정적인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "TTK가 극히 짧은 게임에서는 초탄 헤드샷이 교전 승패를 90% 이상 좌우합니다. 초탄 포착이 늦거나 빗나가면 상대방에게 반격 기회를 주거나 반동 제어 중 역으로 제압당할 확률이 급증합니다."
        }
      },
      {
        "@type": "Question",
        "name": "적의 위치를 찾을 때 중심시와 주변시 중 무엇에 집중해야 하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "초기 적 발견에는 넓은 시야를 감지하는 주변시(소프트 포커스)를 활용하고, 대상 위치가 포착되는 순간 중심와(Fovea)로 시선을 도약시켜 정밀한 미세 조준을 마무리하는 방식이 가장 이상적입니다."
        }
      },
      {
        "@type": "Question",
        "name": "시야 내의 오브젝트 밀도와 시각적 혼란 요소는 포착 속도에 어떤 영향을 주나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "시각적 혼란 요소가 많아지면 자동 팝아웃 효과가 방해받아 뇌가 순차적 직렬 스캔을 강요받게 되며, 목표 식별까지의 인지 지연 시간이 100~200ms 이상 증가합니다."
        }
      },
      {
        "@type": "Question",
        "name": "신속한 다중 타겟 포착에 가장 적합한 마우스 그립법은 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "클로 그립(Claw Grip)이나 핑거팁 그립(Fingertip Grip)이 유리합니다. 손가락과 손목 관절의 가동 범위가 넓어 급격한 초탄 플릭과 패드 마찰력을 활용한 감속 제동을 정밀하게 수행할 수 있습니다."
        }
      },
      {
        "@type": "Question",
        "name": "윈도우 마우스 가속 끄기(원시 입력)가 타겟 획득 일관성에 어떤 도움을 주나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "마우스 가속을 제거하고 1:1 원시 입력을 유지하면 손의 이동 거리와 조준선의 이동량이 완벽히 비례하므로, 근육 기억(머슬 메모리)에 기반한 직관적인 초탄 플릭이 완성됩니다."
        }
      },
      {
        "@type": "Question",
        "name": "타겟 획득 훈련은 매일 얼마나 연습하는 것이 좋은가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "매일 15~20분 정도의 고집중 세션이 가장 효과적입니다. 시각적 피로가 쌓이기 전 맑은 정신 상태에서 집중 훈련하는 것이 시각 피질과 운동 신경계의 시냅스 강화를 가장 빠르게 촉진합니다."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "타겟 획득 에임 트레이닝 효율적 연습 단계",
    "description": "시각적 식별 속도와 초탄 플릭 정확도를 극대화하기 위한 4단계 과학적 가이드.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "원시 입력 감도 캘리브레이션",
        "text": "실제 플레이하는 게임의 DPI 및 인게임 감도를 동일하게 설정하고, 포인터 락을 활성화하여 1:1 하드웨어 입력을 맞춥니다."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "소프트 포커스(중앙 시선 이완) 유지",
        "text": "화면 중앙에 편안하게 시선을 두고, 주변시 전체로 고대비 타겟의 팝아웃 출현을 대기합니다."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "최우선 타겟 대비 식별",
        "text": "타겟 군집이 나타나면 병렬 시각 필터를 작동시켜 가장 밝고 선명한 최고 우선순위 목표를 즉각 판별합니다."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "탄도 플릭 및 패드 브레이킹 사격",
        "text": "목표 중심점으로 단번에 플릭한 뒤, 마우스패드 마찰력과 손끝 제동으로 조준선을 정확히 멈추고 클릭합니다."
      }
    ]
  };

  const targetAcquisitionGuide = {
    title: "타겟 획득 에임 트레이너 실전 가이드",
    subtitle: "시각적 식별 속도, 특징 대비 판별력, 그리고 빗나가지 않는 초탄 헤드샷 정확도를 완성하는 과학적 방법론",
    intro: [
      "타겟 획득(Target Acquisition)은 시야에 들어오는 복잡한 게임 환경 속에서 적의 위치를 가장 빠르게 포착하고, 단숨에 조준선을 이동시켜 초탄을 적중시키는 FPS의 핵심 기본기입니다. Anne Treisman과 Garry Gelade(1980)의 특징 통합 이론에 따르면 밝기, 색상, 실루엣과 같은 기본 특징들은 의식적인 탐색 없이도 시야 전체에서 병렬적으로 우선 처리됩니다.",
      "또한 Jeremy M. Wolfe(1994, 2007)의 안내 탐색(Guided Search) 모델은 하향식 인지 기대와 상향식 감각 두드러짐이 결합하여 주의의 우선순위를 결정한다고 설명합니다. 본 드릴에서 명도 차이 식별을 반복 훈련하면 시각 피질이 불필요한 배경 잡음을 즉시 걸러내어, 적 출현부터 사격 개시까지의 잠재 지연 시간을 비약적으로 단축시킵니다.",
      "Paul M. Fitts(1954)의 운동 법칙, David E. Meyer 등(1988)의 확률 최적화 하위운동 이론, 그리고 고정밀 디지털 시간 측정(Woods et al., 2015)을 바탕으로 설계되어, 실전 교전 압박 속에서도 한 치의 망설임 없는 초탄 사격을 구현합니다.",
      "측정 정확도 안내: 본 드릴은 브라우저의 performance.now() 고해상도 타이머를 활용하여 전적으로 사용자 기기 내부에서 동작합니다. 디스플레이의 주사율(60Hz 기준 약 16.7ms, 144Hz 기준 약 6.9ms, 240Hz 기준 약 4.1ms)에 따른 지연이 발생하므로, 5ms 미만의 미세한 편차는 하드웨어 측정 노이즈로 간주하고 동일 환경에서의 기록 변화를 분석하시기 바랍니다."
    ],
    benchmarks: {
      title: "타겟 획득 및 식별 레이턴시 벤치마크 기준",
      headers: ["스킬 티어", "포착 레이턴시", "초탄 정확도", "실전 인게임 교전 결과"],
      rows: [
        ["Tier 1 (레디언트 / 프로 레벨)", "260 ms 미만", "95% – 99%+", "무의식적인 즉각 위협 감지; 망설임 없는 100% 초탄 원탭 헤드샷 실현"],
        ["Tier 2 (불멸 / 마스터급)", "260 – 320 ms", "88% – 95%", "탁월한 적 포착 속도; 시각 노이즈 속에서도 우선순위 타겟을 단숨에 사격"],
        ["Tier 3 (다이아 / 초월자급)", "320 – 400 ms", "80% – 88%", "안정적인 초탄 정확도; 다중 타겟 군집 출현 시 50~80ms 수준의 미세한 판단 지연"],
        ["Tier 4 (골드 / 플래티넘급)", "400 – 500 ms", "70% – 80%", "순차적 시선 탐색 의존; 우선순위가 낮은 대상을 오클릭하거나 오버플릭 발생"],
        ["Tier 5 (실버 이하 초심자)", "500 ms 이상", "70% 미만", "시각적 혼란으로 인한 반응 지연; 피킹 싸움 시 선제 사격 허용 빈도 높음"]
      ],
      note: "포착 레이턴시는 타겟 클러스터 생성 순간부터 최우선 타겟에 유효 클릭이 들어갈 때까지의 시간입니다(Woods et al., 2015)."
    },
    techniques: {
      title: "타겟 획득력을 극대화하는 실전 테크닉",
      items: [
        {
          name: "주변시를 활용한 병렬 스캐닝 (소프트 포커스)",
          desc: "화면 영역을 하나하나 눈으로 쫓는 직렬 주시를 피하고, 화면 중앙에 시선을 편안히 둔 채 주변시를 통해 최고 명도 타겟의 팝아웃을 감지합니다(Treisman & Gelade, 1980).",
          tips: "시선을 특정 지점에 과도하게 고정하지 말고 시야 전체를 감싸듯 이완하여 자동 시각 반응을 유도하세요."
        },
        {
          name: "도약 안구-운동 신경 커플링을 통한 초탄 스냅",
          desc: "눈과 손의 움직임을 정밀 결합합니다. 먼저 도약 안구 운동(사카드)으로 타겟 중심점을 확보하고, 그 시선 벡터를 따라 마우스를 신속하게 플릭합니다.",
          tips: "조준선이 도착하기 30~50ms 전에 시선이 목표 중심에 먼저 도달해 있어야 합니다."
        },
        {
          name: "명도 대비 식별 임계값 제어",
          desc: "어두운 방해 요소(낮은 위협)에 흔들리지 않고 가장 밝은 고위협 대상을 선별하는 인지 필터를 확립합니다.",
          tips: "최고 밝기의 목표물이 완전히 제거될 때까지는 주변의 다른 타겟을 시야에서 철저히 무시하세요."
        },
        {
          name: "패드 마찰력을 이용한 종단 브레이킹",
          desc: "빠른 속도로 출발한 탄도 플릭을 목표 지점 직전에서 마우스패드 마찰력과 손끝 미세 압력으로 정확히 정지시킵니다(Meyer et al., 1988).",
          tips: "플릭이 멈추는 순간 손바닥 하단이나 새끼손가락에 미세한 하향 압력을 주어 오버슈트를 차단하세요."
        }
      ]
    },
    steps: [
      "세션 설정에서 사용하는 DPI와 인게임 감도를 동일하게 맞추고 포인터 락을 활성화합니다.",
      "화면 중앙에 편안히 시선을 유지한 채 타겟 클러스터의 출현을 기다립니다.",
      "병렬 시각 필터를 활용하여 가장 밝은 최우선 타겟을 순간적으로 판별합니다.",
      "목표 중심점으로 날카롭게 플릭하고 클릭하여 +100점(+0.4초 추가 시간)을 획득합니다.",
      "남은 타겟들을 명도 순서대로 빠르게 처리하여 +400점 × 레벨 보너스를 챙기세요."
    ],
    audience: "발로란트, 오버워치 2, 카운터스트라이크 2, 에이펙스 레전드에서 적 포착 반응속도와 초탄 헤드샷 적중률을 획기적으로 개선하고자 하는 FPS 게이머.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'fitts1954', 'meyer1988', 'treisman1980', 'wolfe2007'),
    related: [
      { href: "/ko/drills/fps/target-switching-swarm", label: "타겟 스위칭 에임 연습" },
      { href: "/ko/drills/fps/vertical-air-track", label: "수직 에임 트래킹 연습" },
      { href: "/ko/drills/fps/strafe-tracking", label: "스트레이프 트래킹 연습" }
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
      <TargetAcquisitionClient
        copy={{
          h1Keyword: "타겟 획득 에임 연습",
          h1Suffix: " - 초탄 정확도 & 적 포착 트레이너",
          statScore: "점수",
          statTime: "남은 시간",
          statAccuracy: "정확도",
          statBestScore: "최고 점수",
          statSetsCleared: "클리어 세트",
          statMaxCombo: "최대 콤보",
          statPeakLevel: "최고 레벨",
          startTitle: "타겟 획득 Pro",
          startSubtitle: "시각적 식별 속도 • 무한 레벨 난이도 진행",
          getReady: "준비",
          toggleFlash: "미스 플래시 켜기/끄기",
          toggleSound: "효과음 켜기/끄기",
          pausedTitle: "일시 정지됨",
          pausedSubtitle: "클릭하여 계속하기 — 마우스 커서 락이 다시 활성화됩니다.",
          stageCaption: "각 타겟 클러스터에서 가장 밝은(불투명도가 높은) 목표를 가장 빠르고 정확하게 찾아 클릭하세요.",
          rulesTitle: "훈련 규칙 및 점수 산정 방식",
          rulesItems: [
            { title: "정확한 타겟 타격 (+100점 / +0.4초)", text: "가장 밝은 타겟을 먼저 클릭하세요. 콤보 배율과 레벨 보너스가 적용됩니다." },
            { title: "세트 클리어 보너스 (+400점 × 레벨)", text: "한 세트의 모든 타겟을 순서대로 격추하면 다음 클러스터가 즉시 생성됩니다." },
            { title: "레벨 상승 (매 1,400점마다)", text: "타겟 밀도 증가, 크기 축소, 더욱 미세한 명도 차이로 난이도가 단계적으로 심화됩니다." },
            { title: "오클릭 / 미스 페널티", text: "잘못된 타겟 클릭이나 빗나간 사격 시 콤보가 즉시 0으로 초기화됩니다." }
          ],
          aboutTitle: "타겟 획득 에임 트레이너 소개",
          aboutHeading: "타겟 획득(Target Acquisition)이란?",
          aboutText: "타겟 획득은 시야 내 수많은 시각 정보 속에서 적을 즉각 식별하고 초탄 조준을 완료하는 인지-운동 과정입니다. 색상과 명도 같은 시각 특성은 병렬적으로 처리되므로(Treisman & Gelade, 1980), 명도 차 식별 훈련을 통해 실전에서 망설임 없는 번개 같은 초탄 사격이 가능해집니다."
        }}
      />
      <DrillGuide guide={targetAcquisitionGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/target-acquisition"
          locale="ko"
        />
      </div>
    </>
  );
}
