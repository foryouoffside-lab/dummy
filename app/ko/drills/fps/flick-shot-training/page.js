import ProFlickClient from '@/app/drills/fps/flick-shot-training/ProFlickClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: "플릭 에임 연습 – 끌어치기·스냅샷 트레이너 | SkillDrills",
  description: "브라우저에서 무료로 즐기는 플릭 에임 연습 사이트. 무작위 타겟을 향한 번개 같은 끌어치기, 스냅샷, 마우스패드 마찰 제동력을 훈련하여 발로란트와 카스2 헤드샷 적중률을 극대화하세요.",
  keywords: [
    "플릭 에임 연습",
    "플릭샷 연습",
    "끌어치기 연습",
    "에임 브레이킹",
    "발로란트 플릭샷 연습",
    "카스2 끌어치기",
    "스냅샷 에임 훈련",
    "무료 에임 트레이너",
    "초탄 헤드샷 연습",
    "마우스 제동력 훈련",
    "반응속도 에임 연습",
    "오버플릭 교정"
  ],
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/fps/flick-shot-training",
    languages: getAlternateLanguages('/drills/fps/flick-shot-training'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "플릭 에임 연습 – 끌어치기·스냅샷 트레이너 | SkillDrills",
    description: "브라우저에서 무료로 즐기는 플릭 에임 연습 사이트. 무작위 타겟을 향한 번개 같은 끌어치기, 스냅샷, 마우스패드 마찰 제동력을 훈련하여 발로란트와 카스2 헤드샷 적중률을 극대화하세요.",
    url: "https://skilldrills.online/ko/drills/fps/flick-shot-training",
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "플릭 에임 연습 – 끌어치기·스냅샷 트레이너 | SkillDrills",
    description: "브라우저에서 무료로 즐기는 플릭 에임 연습 사이트. 무작위 타겟을 향한 번개 같은 끌어치기, 스냅샷, 마우스패드 마찰 제동력을 훈련하여 발로란트와 카스2 헤드샷 적중률을 극대화하세요.",
  },
};

export default function FlickShotKoPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ko" },
      { "@type": "ListItem", "position": 2, "name": "FPS 에임 훈련", "item": "https://skilldrills.online/ko/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "플릭 에임", "item": "https://skilldrills.online/ko/drills/fps/flick-shot-training" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "플릭 에임 연습",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "스냅 에임, 탄도 운동 기억, 마우스패드 제동력을 훈련하는 무료 브라우저 FPS 에임 트레이너.",
    "genre": "FPS Training / Flick Shot",
    "url": "https://skilldrills.online/ko/drills/fps/flick-shot-training",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "플릭 에임 연습",
    "url": "https://skilldrills.online/ko/drills/fps/flick-shot-training",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "스냅 에임, 탄도 운동 기억, 마우스패드 제동력을 훈련하는 무료 브라우저 FPS 에임 트레이너."
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "플릭 에임 연습",
    "url": "https://skilldrills.online/ko/drills/fps/flick-shot-training",
    "description": "스냅 에임, 탄도 운동 기억, 마우스패드 제동력을 훈련하는 무료 브라우저 FPS 에임 트레이너.",
    "dateModified": "2026-09-05",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Flick Shot"],
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
        "name": "플릭 에임(스냅 에임)이란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "플릭 에임은 시야에 들어온 적의 중심을 향해 손목이나 팔을 한 번에 빠르게 탄도 이동시켜 초탄을 명중시키는 FPS의 핵심 에임 기술입니다."
        }
      },
      {
        "@type": "Question",
        "name": "FPS 게임에서 플릭샷 정확도를 높이는 핵심 방법은 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "초기 가속도뿐만 아니라 목표 지점 직전의 '종단 감속 제동(브레이킹)'을 마스터하는 것입니다. 마우스패드의 마찰력과 손끝의 하향 압력을 조화시켜 오버슈트(지나침)를 완전히 없애야 합니다."
        }
      },
      {
        "@type": "Question",
        "name": "트래킹 에임과 플릭 에임의 차이는 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "트래킹 에임은 움직이는 대상을 지속적으로 추적하는 폐루프 시각 제어 운동인 반면, 플릭 에임은 단숨에 목표 위치로 도약하는 개루프 탄도 운동 후 원탭을 날리는 방식입니다."
        }
      },
      {
        "@type": "Question",
        "name": "플릭할 때 자꾸 오버슈트나 언더슈트가 발생하는 이유는 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "현재 감도(eDPI)와 근육 기억의 불일치, 또는 브레이킹 시 길항근 감속 타이밍의 미숙 때문입니다. 감도를 고정하고 일정한 힘으로 마우스를 멈추는 감속 훈련을 반복해야 합니다."
        }
      },
      {
        "@type": "Question",
        "name": "발로란트나 카운터스트라이크 2 같은 전술 FPS에서 플릭 훈련이 도움이 되나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "매우 큰 도움이 됩니다. 미리 조준한 각도에서 벗어난 적이나 예상치 못한 피킹 상황에서 단번에 헤드샷을 꽂아 넣는 복구 능력을 비약적으로 끌어올립니다."
        }
      },
      {
        "@type": "Question",
        "name": "플릭 시 손목 에임과 팔 에임 중 어느 것을 사용해야 하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "각도가 큰 대형 플릭(45도 이상)은 팔 전체로 빠르게 이동하고, 타겟 착탄 직전의 미세 보정(마이크로 어드저스트먼트)은 손목과 손가락 관절로 수행하는 하이브리드 제어가 가장 이상적입니다."
        }
      },
      {
        "@type": "Question",
        "name": "피츠의 법칙(Fitts's Law)은 플릭 에임에 어떻게 적용되나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "목표 거리가 멀고 타겟 크기가 작을수록 난이도 지수(ID)가 로그 함수 형태로 증가합니다(Fitts, 1954). 고수들은 전체 거리의 80~90%를 초기 탄도 비행으로 한 번에 메우고 나머지 미세 거리를 찰나에 보정합니다."
        }
      },
      {
        "@type": "Question",
        "name": "모니터 주사율과 마우스 폴링레이트가 플릭 정확도에 영향을 주나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "결정적인 영향을 줍니다. 고주사율(144Hz/240Hz) 모니터와 1000Hz 이상의 폴링레이트는 시각 지연과 입력 왜곡을 최소화하여 정밀한 감속 브레이킹을 가능케 합니다."
        }
      },
      {
        "@type": "Question",
        "name": "플릭 에임 훈련은 매일 얼마나 하는 것이 좋나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "집중력이 유지되는 15~20분간의 밀도 높은 훈련이 가장 이상적입니다. 손목 피로가 쌓이기 전 맑은 상태에서 매일 꾸준히 반복하는 것이 신경 가소성을 높입니다."
        }
      },
      {
        "@type": "Question",
        "name": "점수가 높아지면 훈련 난이도가 자동으로 상승하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "네, 매 1,400점마다 레벨이 상승하며, 타겟의 유지 시간(타이머 링)이 축소되고 크기가 작아지며 동적으로 난이도가 심화됩니다."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "플릭 에임 4단계 실전 훈련 가이드",
    "description": "스냅 에임 가속과 마우스패드 브레이킹을 마스터하기 위한 과학적 훈련 절차.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "하드웨어 감도 일치 및 중앙 정렬",
        "text": "실제 플레이하는 게임의 eDPI와 정확히 일치시키고 조준선을 화면 중앙에 위치시킵니다."
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "소프트 포커스 및 타겟 즉시 탐지",
        "text": "중앙에 시선을 편안히 두고, 주변시 전체로 무작위 생성되는 타겟의 출현을 순간적으로 포착합니다."
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "탄도 플릭 가속 및 원탭 클릭",
        "text": "단일 가속 곡선으로 조준선을 타겟 중심으로 날카롭게 이동시키고 타이머 링이 닫히기 전 클릭합니다."
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "패드 마찰력을 이용한 종단 브레이킹",
        "text": "착탄 순간 손바닥 하단과 손끝 압력으로 마우스패드에 마찰을 가해 오버슈트 없이 조준선을 정확히 멈춥니다."
      }
    ]
  };

  const flickGuide = {
    heading: "플릭 에임 실전 가이드 & 생체역학 벤치마크",
    subtitle: "스냅 에임 초기 가속, 근육 운동 기억, 그리고 조준선을 목표 위에 즉각 멈추는 마찰 제동력을 완성하는 과학적 방법론",
    intro: [
      "플릭 에임(Flick Aim)은 시선이 포착한 목표 좌표를 향해 조준선을 번개처럼 날려 보내最短 시간 내에 초탄을 적중시키는 FPS의 가장 대표적인 기본 기술입니다. 발로란트, CS2, 에이펙스 레전드에서 돌발적인 피킹 교전을 제압하기 위해서는 한 치의 오차 없는 플릭 능력이 필수적입니다.",
      "생체운동학에서 인간의 목표 지향적 조준 운동은 '2단계 모델'(Elliott et al., 2010)을 따릅니다. 초기 개루프(Open-loop) 탄도 운동을 통해 전체 거리의 80~90%를 단숨에 주파한 뒤, 착탄 직전 폐루프(Closed-loop) 시각 피드백을 통해 미세한 종단 수렴 보정을 완수합니다.",
      "Paul M. Fitts(1954)의 운동 법칙(Fitts's Law)에 따라 이동 거리가 멀고 타겟 크기가 작을수록 운동 난이도 지수(ID)가 가파르게 상승합니다. 본 드릴은 Richard A. Schmidt 등(1979)의 주동근·길항근 펄스 제어 이론과 고해상도 디지털 시간 측정(Woods et al., 2015)을 결합하여 오버슈트 없는 기계적 브레이킹 감각을 완성합니다.",
      "측정 정확도 안내: 본 드릴은 브라우저의 performance.now() 고해상도 타이머를 활용하여 기기 내부에서 밀리초 단위로 정확히 실행됩니다. 디스플레이 주사율(60Hz/144Hz/240Hz)에 따른 프레임 지연이 발생하므로 5ms 미만의 미세 편차는 하드웨어 측정 노이즈로 간주하시기 바랍니다."
    ],
    benchmarks: {
      title: "목표 포착 및 운동 시간(Movement Time) 벤치마크 기준",
      headers: ["동작 단계 / 측정 항목", "표준 레이턴시", "운동 제어 메커니즘", "숙련도 단계 및 평가"],
      rows: [
        ["초기 도약 안구 운동 (사카드)", "180 – 220 ms", "중심와 포착 및 시각 피질 반응", "물리적 동작 개시 전의 자극 감지 (Woods et al., 2015)"],
        ["탄도학적 주 운동 (초기 펄스)", "120 – 180 ms", "주동근-길항근 폭발적 근육 출력", "목표 거리의 80~90%를 주파하는 탄도 비행 (Elliott et al., 2010)"],
        ["종단 미세 보정 (호밍 브레이킹)", "60 – 120 ms", "시각 피드백 및 패드 마찰 감속", "난이도 지수를 해결하는 폐루프 제어 (Fitts, 1954)"],
        ["총 타겟 획득 시간 (일반 유저)", "360 – 520 ms", "지각-운동 루프 전체 합산 시간", "일반적인 경쟁전 랭크의 표준 기준치"],
        ["엘리트급 무의식 포착 (프로 수준)", "240 – 320 ms", "미세 수정을 극소화한 자동화 운동 시너지", "완벽히 튜닝된 eDPI 제동력을 갖춘 최상위권 프로"]
      ],
      note: "스포츠 심리학 및 운동 제어 문헌(Fitts 1954; Schmidt et al. 1979; Elliott et al. 2010; Woods et al. 2015)에 기반한 통합 벤치마크입니다."
    },
    techniques: {
      title: "게임별 최적 eDPI 감도 세팅 가이드",
      items: [
        {
          name: "발로란트 (Valorant) 감도 캘리브레이션",
          desc: "권장 eDPI 범위: 200 - 320 (예: 800 DPI × 0.25 - 0.4). 정밀한 미세 조준과 안정적인 헤드라인 유지를 최우선시.",
          tips: "90도 이상의 큰 각도는 팔 전체를 이용하고, 헤드샷 미세 보정은 손목과 손가락으로 분담합니다."
        },
        {
          name: "카운터스트라이크 2 (CS2) 감도 캘리브레이션",
          desc: "권장 eDPI 범위: 600 - 1000 (예: 800 DPI × 0.8 - 1.25). 반동 제어와 날카로운 앵글 홀딩의 균형점 확보.",
          tips: "플릭 시 조준선 높이를 지면과 평행하게 유지하며 수평으로 이동하는 감각을 익히세요."
        },
        {
          name: "에이펙스 레전드 & 하이퍼 FPS",
          desc: "권장 eDPI 범위: 1000 - 1600. 광각 시야 확보와 근거리 격렬한 무빙전에 대응하는 중고감도 세팅.",
          tips: "마찰이 적은 슬라이딩 패드를 권장하며, 플릭 훈련과 트래킹 훈련을 병행해야 합니다."
        },
        {
          name: "오버워치 2 (Overwatch 2) 영웅별 감도",
          desc: "히트스캔 (캐서디, 위도우): 3200 - 4800 eDPI. 트래킹/근접 (트레이서, 겐지): 4800 - 7200 eDPI.",
          tips: "클릭 타이밍 중심 영웅과 지속 추적형 영웅의 머슬 메모리를 분리하여 관리하세요."
        }
      ]
    },
    steps: [
      "인게임 감도와 DPI를 정확히 맞추고 포인터 락을 활성화하여 훈련을 시작합니다.",
      "화면 중앙 조준선에 시선을 편안히 둡니다.",
      "타겟이 생성되는 순간 목표 중심점으로 마우스를 빠르고 예리하게 플릭하여 클릭합니다.",
      "느리게 조준선을 옮기지 말고 빠른 가속과 정확한 정지 브레이킹에 집중하세요.",
      "결과 카드에서 정확도, 평균 플릭 반응 시간, 랭크 티어를 확인하고 반복 훈련하세요."
    ],
    audience: "발로란트, 카운터스트라이크 2, 에이펙스 레전드, 오버워치 2에서 즉각적인 초탄 헤드샷과 스냅 에임을 극대화하고자 하는 모든 FPS 게이머.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'elliott2010', 'fitts1954', 'schmidt1979'),
    related: [
      { href: "/ko/drills/fps/target-acquisition", label: "타겟 획득 에임 연습" },
      { href: "/ko/drills/fps/target-prioritization", label: "타겟 우선순위 에임 연습" },
      { href: "/ko/drills/fps/target-switching-swarm", label: "타겟 스위칭 에임 연습" },
      { href: "/ko/drills/fps/vertical-air-track", label: "수직 에임 트래킹 연습" }
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
      <ProFlickClient
        copy={{
          h1Keyword: "플릭 에임 연습",
          h1Suffix: " - 플릭샷 & 스냅 에임 트레이너",
          statScore: "점수",
          statTime: "남은 시간",
          statAccuracy: "정확도",
          statBestScore: "최고 점수",
          statAvgFlick: "평균 플릭",
          statMaxCombo: "최대 콤보",
          statPeakLevel: "최고 레벨",
          startTitle: "Pro 플릭 트레이너",
          startSubtitle: "매크로 플릭 & 타겟 포착 • 무한 레벨 난이도 진행",
          getReady: "준비",
          toggleFlash: "미스 플래시 켜기/끄기",
          toggleSound: "효과음 켜기/끄기",
          pausedTitle: "일시 정지됨",
          pausedSubtitle: "클릭하여 계속하기 — 마우스 커서 락이 다시 활성화됩니다.",
          stageCaption: "화면 무작위 위치에 나타나는 목표물로 신속히 플릭하여 타이머 링이 줄어들기 전에 사격하세요.",
          rulesTitle: "훈련 규칙 및 점수 산정 방식",
          rulesItems: [
            { num: "1", text: "타겟 명중", highlight: "+100점 / +0.4초", result: "빠른 플릭일수록 높은 점수" },
            { num: "2", text: "시간 보너스", highlight: "+0.4초 추가", result: "연속 타격 시 제한 시간 연장" },
            { num: "3", text: "시간 초과 / 빗나간 클릭", highlight: "미스 페널티", result: "콤보 즉시 초기화" },
            { num: "4", text: "레벨 상승", highlight: "매 1,400점마다 +1 레벨", result: "타겟 크기 축소 및 수명 단축" }
          ],
          aboutTitle: "Pro 플릭 트레이너 소개",
          aboutHeading: "플릭 에임(Flick Aim)이란?",
          aboutText: "플릭 에임은 시선이 닿은 목표 지점으로 마우스를 탄도학적으로 단숨에 이동시켜 초탄을 명중시키는 FPS의 핵심 조준 기술입니다. 동작 시간은 이동 거리와 타겟 크기에 비례하며(Fitts, 1954), 숙련된 플릭은 종단 단계에서의 마찰 제동 및 미세 보정(Elliott et al., 2010)을 통해 완성됩니다."
        }}
      />
      <DrillGuide guide={flickGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/flick-shot-training"
          locale="ko"
        />
      </div>
    </>
  );
}
