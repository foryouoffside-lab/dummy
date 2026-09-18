import ChromaSyncClient from '@/app/drills/visual/reaction-speed/go/no-go/ChromaSyncClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Go/No-Go 검사: 반응 억제 & 충동 제어 테스트 | SkillDrills",
  description: "녹색 Go 신호에는 최속 반응하고 적색 No-Go 신호는 정지하는 무료 고노고 과제. 우하전두피질의 운동 브레이크, 충동 제어, 트리거 디시플린을 과학적으로 측정합니다.",
  keywords: [
    "고노고 과제",
    "Go/No-Go 검사",
    "반응 억제 테스트",
    "충동 억제 검사",
    "전두엽 억제 제어",
    "트리거 디시플린",
    "정지 신호 과제",
    "커미션 에러",
    "운동 억제 훈련",
    "FPS 반응속도 제어",
    "집중력 충동 조절 훈련",
    "지속적 수행 검사"
  ],
  openGraph: {
    title: "Go/No-Go 검사: 반응 억제 & 충동 제어 테스트 | SkillDrills",
    description: "녹색에 반응하고 적색에 멈춘다! 전두엽 운동 브레이크 및 반응 억제력을 정밀 측정하는 무료 온라인 고노고 과제.",
    type: 'article',
    url: 'https://skilldrills.online/ko/drills/visual/reaction-speed/go/no-go',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Go/No-Go 검사: 반응 억제 & 충동 제어 테스트 | SkillDrills",
    description: "충동 제어와 트리거 디시플린 강화를 위한 무료 온라인 Go/No-Go 신경인지 반응 훈련.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/visual/reaction-speed/go/no-go',
    languages: getAlternateLanguages('/drills/visual/reaction-speed/go/no-go'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://skilldrills.online/ko" },
    { "@type": "ListItem", "position": 2, "name": "훈련 카탈로그", "item": "https://skilldrills.online/ko/drills" },
    { "@type": "ListItem", "position": 3, "name": "시각 훈련", "item": "https://skilldrills.online/ko/drills/visual" },
    { "@type": "ListItem", "position": 4, "name": "반응 속도", "item": "https://skilldrills.online/ko/drills/visual/reaction-speed" },
    { "@type": "ListItem", "position": 5, "name": "Go/No-Go 충동 제어 검사", "item": "https://skilldrills.online/ko/drills/visual/reaction-speed/go/no-go" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "고노고(Go/No-Go) 반응 억제 테스트",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/ko/drills/visual/reaction-speed/go/no-go",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "KRW" },
  "description": "전두엽 우하전두피질(rIFC)의 운동 제동 반응과 충동 억제력을 측정하는 과학적 고노고(Go/No-Go) 신경인지 테스트 도구.",
  "featureList": [
    "performance.now() API를 통한 밀리초(ms) 정밀 반응 잠복기 계측",
    "점진적 난이도 상승에 따른 자극 노출 시간 자동 압축",
    "커미션 에러(오반응) 및 오미션 에러(탈락) 실시간 정밀 분리",
    "외부 서버 전송 없는 완벽한 브라우저 로컬 데이터 격리"
  ],
  "dateModified": "2026-09-05"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "고노고(Go/No-Go) 반응 억제 테스트 | SkillDrills",
  "alternateName": "Go/No-Go Pro",
  "url": "https://skilldrills.online/ko/drills/visual/reaction-speed/go/no-go",
  "dateModified": "2026-09-05",
  "description": "무료 온라인 Go/No-Go 충동 제어 검사. 녹색 Go 신호에 반응하고 적색 No-Go 신호에서 손가락을 제어하는 반응 억제 훈련.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas를 지원하는 최신 웹 브라우저.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "KRW" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "반응 억제, 행동 제동, 충동 제어, 운동 정지 잠복기, 트리거 디시플린"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "Go/No-Go 반응 억제 훈련",
  "url": "https://skilldrills.online/ko/drills/visual/reaction-speed/go/no-go",
  "description": "신경인지 반응 억제 및 트리거 조절을 연마하는 온라인 트레이닝 게임.",
  "genre": ["Action", "Brain Game", "Reaction Speed"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "KRW" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Go/No-Go 반응 억제 검사 진행 방법",
  "dateModified": "2026-09-05",
  "description": "Go/No-Go 프로토콜을 통해 운동 억제력과 충동 조절 능력을 정밀 측정하고 훈련하는 4단계 가이드.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "중앙 조준 레티클에 시선 고정",
      "text": "자극 원반이 출현하는 캔버스 중앙의 십자선에 시선을 안정적으로 고정하고 긴장을 풉니다.",
      "url": "https://skilldrills.online/ko/drills/visual/reaction-speed/go/no-go#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "녹색 Go 자극 출현 시 최속 클릭 실행",
      "text": "에메랄드 녹색 원반이 점멸하면 지체 없이 마우스를 클릭하거나 스페이스바를 누릅니다 (+150점 × 콤보).",
      "url": "https://skilldrills.online/ko/drills/visual/reaction-speed/go/no-go#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "적색 No-Go 자극 출현 시 손가락 운동 억제",
      "text": "루비 적색 원반이 점멸하면 뻗어나가려는 손가락을 완전히 멈추고 입력을 참아냅니다 (+100점).",
      "url": "https://skilldrills.online/ko/drills/visual/reaction-speed/go/no-go#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "점진적 가속 구간에서 트리거 디시플린 유지",
      "text": "콤보가 쌓일수록 자극 제시 시간이 100ms 수준까지 압축되므로 고도의 전두엽 제동력을 유지해야 합니다.",
      "url": "https://skilldrills.online/ko/drills/visual/reaction-speed/go/no-go#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-05",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Go/No-Go 검사(고노고 과제)란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "고노고 과제(Go/No-Go Task)는 빈번하게 나타나는 Go 자극에는 즉각적으로 반응하고, 드물게 나타나는 No-Go 자극에는 준비된 행동을 긴급 차단하는 대표적인 신경인지 반응 억제 평가 프로토콜입니다."
      }
    },
    {
      "@type": "Question",
      "name": "커미션 에러(오반응)와 오미션 에러(탈락)는 어떤 차이가 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "커미션 에러(Commission Error)는 적색 No-Go 자극에서 참지 못하고 클릭해버리는 '충동 억제 실패'를 뜻하며, 오미션 에러(Omission Error)는 녹색 Go 자극을 제시간에 누르지 못하는 '주의 집중력 결여'를 의미합니다."
      }
    },
    {
      "@type": "Question",
      "name": "반응 억제의 '경마 모델(Horse-Race Model)'이란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "로건(Logan, 1984)이 제창한 경마 모델은 행동 개시를 촉발하는 Go 프로세스와 행동을 차단하는 Stop 프로세스가 신경계 내부에서 경쟁한다는 이론입니다. Stop 프로세스가 먼저 결승선에 도달해야 행동이 성공적으로 억제됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "빨간색인 것을 보았는데도 왜 반사적으로 손가락이 클릭해버리나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Go 자극에 반복 노출되면서 운동 피질이 '선행 발화(Prepotent Priming)' 상태에 들어가기 때문입니다. 시각 피질에서 색상 정보가 완전히 분석되기 전에 광도와 형태 변화에 손가락이 먼저 반응하는 현상입니다."
      }
    },
    {
      "@type": "Question",
      "name": "발로란트, 카운터스트라이크 2 등 FPS 게임에서의 '트리거 디시플린'과의 연관성은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "적을 발견하자마자 성급하게 사격하면 연막이나 엄폐물 뒤의 적을 놓치거나 위치를 노출당합니다. 고노고 훈련은 시각적 자극 인지와 기계적 발포 충동을 분리하는 엄격한 사격 통제력을 완성합니다."
      }
    },
    {
      "@type": "Question",
      "name": "뇌의 어떤 영역이 이 긴급 운동 브레이크를 제어하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "인간의 우하전두피질(rIFC), 전보조운동영역(preSMA), 그리고 기저핵의 시상하핵(STN)으로 이어지는 '초고속 직통로(Hyperdirect Pathway)'가 전신 근육에 하달되는 운동 신호를 긴급 차단합니다 (Aron et al., 2014)."
      }
    },
    {
      "@type": "Question",
      "name": "반응 억제력과 충동 제어 능력은 지속적인 훈련을 통해 향상될 수 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네. 신경가소성 연구에 따르면 정기적인 억제 과제 훈련은 전두엽-기저핵 신경 연결망을 조밀하게 강화하여 정지 신호 반응 시간(SSRT)을 유의미하게 단축시킵니다."
      }
    },
    {
      "@type": "Question",
      "name": "모니터 주사율과 마우스 폴링레이트가 고노고 테스트 점수에 영향을 미치나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "직접적인 영향을 줍니다. 60Hz 모니터는 프레임 지연이 최대 16.7ms에 달하지만, 240Hz 모니터는 4.1ms로 줄어듭니다. 1,000Hz 마우스와 결합하면 색상 식별 여유 시간이 늘어나 오반응률이 감소합니다."
      }
    },
    {
      "@type": "Question",
      "name": "전두엽 억제 회로를 최적화하기 위한 하루 권장 훈련 루틴은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "하루 1~2회, 1회당 3~5분의 집중 세션이 가장 이상적입니다. 과도하게 반복하면 전두엽 피로로 인해 오히려 오반응률이 높아집니다."
      }
    },
    {
      "@type": "Question",
      "name": "검사 중 측정된 반응 잠복기와 클릭 데이터는 외부에 저장되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "아닙니다. 모든 클릭 타임스탬프와 오류 통계는 사용자의 브라우저 로컬 저장소에만 보관되며 외부 서버로 절대 전송되지 않습니다."
      }
    }
  ]
};

const goNoGoGuide = {
  heading: "신경인지 반응 억제 및 운동 제어 표준 가이드",
  intro: [
    "반응 억제(Response Inhibition)는 더 이상 적절하지 않거나 불리한 행동을 순간적으로 취소, 지연 또는 보류하는 인간 뇌의 핵심 실행 기능입니다. 격투 스포츠, 정밀 e스포츠, 고속 운전 등 극한의 상황에서는 빠른 동작 속도보다 잘못된 동작을 '멈추는 능력'이 승패를 좌우합니다.",
    "고노고 과제의 기원은 1868년 네덜란드의 생리학자 프란시스쿠스 돈더스(Franciscus Cornelis Donders)의 'C-반응' 감산법 연구로 거슬러 올라갑니다. 그는 두 개의 상이한 자극 중 하나에만 반응하도록 요구할 때, 단순 반응보다 추가적인 인지적 식별 및 선택적 억제 시간이 요구됨을 증명했습니다.",
    "1984년 로건(Logan) 연구진은 반응 억제를 흥분성 Go 프로세스와 억제성 Stop 프로세스 간의 신경학적 경합으로 규명한 '경마 모델'을 수립했습니다. 최신 기능적 뇌영상 연구(Aron et al., 2014)에 따르면 이 브레이크 신호는 우하전두피질(rIFC)과 시상하핵(STN)을 잇는 직통로를 통해 실행됩니다.",
    "측정 기준 및 하드웨어 보정: 자극 노출과 클릭 이벤트는 브라우저 고해상도 performance.now() API로 수집됩니다. 디스플레이 주사율과 USB 폴링 간격에 따른 하드웨어 양자화 지연을 고려하여 분석되며 (Woods et al., 2015), 모든 결과는 로컬에 안전하게 저장됩니다."
  ],
  benchmarks: {
    title: "반응 억제력 평가 기준 (신경인지 기준표)",
    headers: ["평가 등급 / 티어", "오반응률 (CER)", "목표 점수 & 콤보", "신경근육 및 전두엽 억제 프로파일"],
    rows: [
      ["Tier 1: 최상위 프로 브레이크", "< 2.0% CER", "16,000점+ | 콤보 30회+", "완벽한 rIFC-STN 초고속 운동 억제; 시각적 번쩍임과 손가락 반사 신경의 완전한 탈동조화 달성."],
      ["Tier 2: 상급 억제 통제", "2.0% – 4.9% CER", "11,000 – 15,999점 | 콤보 20회+", "탁월한 트리거 디시플린; 색상 전환에 대한 신속한 회복력과 최소화된 선행 예측 오차."],
      ["Tier 3: 건전한 성인 표준", "5.0% – 9.9% CER", "6,500 – 10,999점 | 콤보 12회+", "신뢰할 수 있는 Go 목표 타격; 고속 템포 상황에서 간헐적인 No-Go 오반응 발생."],
      ["Tier 4: 경미한 충동성 노출", "10.0% – 18.0% CER", "3,000 – 6,499점 | 콤보 6회+", "선행 운동 프라이밍 지배적; 색상 확인 전에 시각적 변화에 손가락이 반사적으로 움직임."],
      ["Tier 5: 선행 프라이밍 우세 (기초)", "> 18.0% CER", "< 3,000점 | 콤보 < 6회", "상당한 행동 충동성; 적색 No-Go 신호가 점멸할 때 관성적 타격을 멈추지 못함."]
    ],
    note: "본 기준표는 반응 억제 및 정신 연대학 문헌(Donders, 1868; Logan et al., 1984; Robertson et al., 1997; Aron et al., 2014)에 근거한 가이드입니다. 일주기 생체리듬, 피로도 및 디스플레이 주사율에 따라 변동될 수 있습니다."
  },
  techniques: {
    title: "반응 억제력 강화를 위한 훈련 원칙",
    items: [
      {
        name: "운동 준비 전 색상 식별 우선 원칙",
        desc: "광도와 형태 변화 신호는 색상 분석 경로보다 1차 시각 피질에 더 일찍 도달합니다 (Donders, 1868).",
        tips: "단순히 화면이 번쩍였다고 손가락에 힘을 주지 마세요. 에메랄드 녹색이 망막에서 확인되는 찰나를 기다린 뒤 발포해야 합니다."
      },
      {
        name: "경마 모델 억제 리셋 테크닉",
        desc: "Go 신호가 활동 전위 임계치에 도달하기 전에 Stop 신호가 전달되면 척수에서 근육 수축이 차단됩니다 (Logan et al., 1984).",
        tips: "마우스 위에서 손가락을 팽팽하게 긴장시키지 말고 가볍게 띄운 중립 상태를 유지하십시오."
      },
      {
        name: "반복 자극의 자동화 리듬 타파",
        desc: "Go 자극이 반복되면 뇌는 무의식적 박자에 맞춰 기계적으로 타격하는 오토파일럿 상태에 빠집니다 (Robertson et al., 1997).",
        tips: "모든 시행을 완전히 독립된 새로운 시각 자극으로 인식하고, 점멸 사이에는 중앙 레티클에만 의식을 집중하십시오."
      },
      {
        name: "고주사율 하드웨어 최적화",
        desc: "160ms 수준의 긴박한 제시 시간에서는 60Hz 모니터의 16.7ms 지연이 치명적인 오반응을 유발합니다 (Woods et al., 2015).",
        tips: "144Hz 이상의 고주사율 모니터와 1,000Hz 마우스를 활용하여 시각적 지연을 극소화하십시오."
      }
    ]
  },
  steps: [
    "훈련 시작 버튼을 클릭하여 45초 세션을 활성화합니다.",
    "자극 디스크가 점멸하는 캔버스 중앙 레티클에 시선을 고정합니다.",
    "녹색 Go 디스크가 나타나면 즉각 클릭하여 득점과 콤보를 누적합니다.",
    "적색 No-Go 디스크가 나타나면 완벽히 정지하여 억제 성공 포인트를 획득합니다.",
    "세션 종료 후 오반응률, 평균 반응 속도, 종합 평가 등급을 확인합니다."
  ],
  audience: "발로란트, 배틀그라운드, CS2 등 전술 FPS 유저, 모터스포츠 드라이버, 무술 격투가, 충동 조절 및 전두엽 실행 기능 강화를 원하는 학습자.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('donders1868', 'logan1984', 'robertson1997', 'aron2014', 'woods2015'),
  related: [
    { href: "/ko/drills/visual/reaction-speed/light-reaction", label: "순간 발광 반응 테스트" },
    { href: "/ko/drills/visual/depth-perception/distance-judgment", label: "거리 판별 심시력 검사" },
    { href: "/ko/drills/visual/tracking-accuracy/moving-target", label: "이동 표적 요격 훈련" },
    { href: "/ko/drills/visual/tracking-accuracy/multiple-targets", label: "다중 객체 추적 검사" },
    { href: "/ko/drills/visual/tracking-accuracy/pursuit-tracker", label: "스무스 퍼슈트 추적기" },
    { href: "/ko/drills/visual/visual-recognition/entropic-grid", label: "엔트로피 그리드 탐색 훈련" }
  ]
};

export default function ChromaSyncPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <ChromaSyncClient copy={{ title: "Go/No-Go 충동 제어 및 반응 억제 검사" }} />
      <DrillGuide guide={goNoGoGuide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/ko/drills/visual/reaction-speed/go/no-go" />
      </div>
    </>
  );
}
