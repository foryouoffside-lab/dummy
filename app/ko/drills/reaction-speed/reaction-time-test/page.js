import ReactionTimeTestWrapper from '@/app/drills/reaction-speed/reaction-time-test/ReactionTimeTestWrapper';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';

export const metadata = {
  title: '반응속도 테스트 - 밀리초(ms) 시각 반응속도 측정기 | SkillDrills',
  description: '무료 온라인 반응속도 테스트. 화면이 바뀔 때 즉시 클릭하여 밀리초(ms) 단위 시각 반사 신경을 측정하고 게이머 벤치마크 등급을 확인하세요.',
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/reaction-speed/reaction-time-test',
    languages: getAlternateLanguages('/ko/drills/reaction-speed/reaction-time-test'),
  },
  openGraph: {
    title: '반응속도 테스트 - 밀리초(ms) 시각 반응속도 측정기 | SkillDrills',
    description: '무료 온라인 반응속도 테스트. 화면이 바뀔 때 즉시 클릭하여 밀리초(ms) 단위 시각 반사 신경을 측정하고 게이머 벤치마크 등급을 확인하세요.',
    url: 'https://skilldrills.online/ko/drills/reaction-speed/reaction-time-test',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '반응속도 테스트 - 밀리초(ms) 시각 반응속도 측정기 | SkillDrills',
    description: '무료 온라인 반응속도 테스트. 밀리초 단위로 시각 반사 신경을 측정하고 벤치마크를 확인하세요.',
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://skilldrills.online/ko" },
    { "@type": "ListItem", "position": 2, "name": "훈련 허브", "item": "https://skilldrills.online/ko/drills" },
    { "@type": "ListItem", "position": 3, "name": "반응 속도", "item": "https://skilldrills.online/ko/drills/reaction-speed" },
    { "@type": "ListItem", "position": 4, "name": "반응속도 테스트", "item": "https://skilldrills.online/ko/drills/reaction-speed/reaction-time-test" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "반응속도 테스트 — 밀리초(ms) 시각 반응속도 측정기 | SkillDrills",
  "url": "https://skilldrills.online/ko/drills/reaction-speed/reaction-time-test",
  "description": "무료 온라인 시각 반응속도 테스트 및 반사 신경 측정 도구. 밀리초 단위로 반응 지연 시간을 측정합니다.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "자바스크립트를 지원하는 최신 브라우저 필요.",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "KRW" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "반응속도, 반사신경, 시각 자극 인지 속도, 신경근 반응 시간"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "반응속도 테스트 측정 방법",
  "description": "간단한 클릭 기반의 온라인 도구를 사용하여 시각 반응 속도를 측정하는 방법.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "테스트 시작",
      "text": "훈련 시작 버튼을 클릭하여 반응속도 테스트 측정 화면을 활성화합니다."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "화면 집중",
      "text": "화면 캔버스 영역에 시선을 고정하고 시각 자극이 나타날 때까지 대기합니다."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "즉시 클릭",
      "text": "타깃이 나타나는 순간 최대한 빠르게 마우스를 클릭하거나 터치스크린을 탭합니다. 반응 시간이 밀리초 단위로 계산됩니다."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "인간의 평균 반응속도는 얼마인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "시각 자극에 대한 일반 성인의 평균 반응 속도는 약 200~250ms(밀리초)입니다. 200ms 미만은 매우 우수한 수준이며, 170ms 이하는 프로게이머급 최상위 1%에 해당합니다."
      }
    },
    {
      "@type": "Question",
      "name": "반속테스트(반응속도 테스트)는 어떻게 측정되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "화면에 시각적 자극(색상 변화 또는 타깃 점)이 나타나는 순간부터 마우스 클릭 또는 화면 터치 입력이 브라우저에 등록되는 순간까지의 지연 시간을 밀리초(1/1000초) 단위로 정밀하게 기록합니다."
      }
    },
    {
      "@type": "Question",
      "name": "반응속도를 훈련으로 향상시킬 수 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, 반응 훈련을 꾸준히 반복하면 시각 자극 인지 지연을 단축하고, 신경근 운동 반응 루프를 최적화하여 15~30ms 이상의 실질적인 반응 속도 개선 효과를 얻을 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "모니터 주사율이 반응속도 점수에 영향을 주나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "그렇습니다. 일반 60Hz 모니터는 프레임당 약 16.7ms의 화면 표시 지연이 발생하는 반면, 144Hz(6.9ms) 또는 240Hz(4.2ms) 게이밍 디스플레이는 하드웨어 지연을 최소화하여 더 정밀한 측정이 가능합니다."
      }
    }
  ]
};

const reactionGuide = {
  heading: "반응속도 테스트 가이드 & 벤치마크 등급표",
  intro: [
    "반응속도 테스트(일명 반속테스트)는 눈이 시각 자극을 감지한 후 뇌를 거쳐 손가락 근육으로 클릭 신호를 전달하는 총 반응 지연 시간을 밀리초(ms) 단위로 측정합니다.",
    "발로란트, 오버워치, 리그 오브 레전드, 배틀그라운드 등 e스포츠 FPS 및 MOBA 장르에서 상대방의 피킹에 즉각 대처하고 교전 승률을 높이는 핵심 지표입니다."
  ],
  benchmarks: {
    title: "반응속도 벤치마크 및 게이머 티어 등급표",
    headers: ["반응 시간(ms)", "티어 등급", "백분위수", "인게임 환산 티어", "신경 반응 분석"],
    rows: [
      ["150 – 190 ms", "최상위 프로 (Elite)", "상위 5%", "불멸 / 레디언트 (Immortal+)", "초고속 시각 정보 처리 및 신경 시냅스 선제 활성화"],
      ["190 – 240 ms", "고급 게이머 (Advanced)", "상위 25%", "다이아몬드 / 초월자", "우수한 자극 식별 및 즉각적인 조준선 발사 반응"],
      ["240 – 280 ms", "일반 성인 평균 (Average)", "중위 50%", "골드 / 플래티넘", "표준적인 신체 반응 속도 및 일반적인 사무 환경"],
      ["> 300 ms", "입문 / 라이트 (Developing)", "하위 20%", "실버 / 브론즈", "신경 피로, 수면 부족 또는 하드웨어/모니터 입력 지연"]
    ],
    note: "표준 60Hz 디스플레이는 약 16.6ms의 화면 표시 버퍼 지연이 추가됩니다. 144Hz 또는 240Hz 모니터에서는 더 낮은 지연 시간이 측정됩니다."
  },
  techniques: {
    title: "감각 자극별 반응 속도 한계와 과학적 원리",
    items: [
      {
        name: "시각 자극 반응 지연 (~200–250ms)",
        desc: "빛이 망막 광수용체에 도달하여 전기 신호로 변환된 후 시신경을 거쳐 1차 시각 피질(V1)에 도달하고, 운동 피질로 전달되어 클릭 명령을 내리는 전 과정에 소요되는 시간입니다.",
        tips: "눈에 과도하게 힘을 주기보다 주변 시야의 간상세포가 자극 변화를 빠르게 감지하도록 편안한 시선을 유지하세요."
      },
      {
        name: "청각 자극 반응 우위 (~140–170ms)",
        desc: "소리 신호는 뇌간과 청각 피질에 도달하는 경로가 시각 경로보다 짧기 때문에, 청각 자극 반응이 시각 반응보다 통상 40~80ms 더 빠릅니다.",
        tips: "FPS 게임에서는 상대방이 시야에 보이기 전에 발소리 등 사운드 플레이에 즉각 반응하는 것이 유리합니다."
      },
      {
        name: "하드웨어 및 입력 지연 최소화",
        desc: "60Hz 모니터는 프레임당 16.7ms의 대기 시간이 발생하지만, 240Hz e스포츠 모니터는 4.1ms에 불과합니다.",
        tips: "1000Hz 폴링레이트 게이밍 마우스 사용 및 V-Sync(수직동기화) 해제를 권장합니다."
      }
    ]
  },
  steps: [
    "훈련 시작 버튼을 눌러 전체화면 반응 속도 측정 영역을 엽니다.",
    "화면 캔버스에 시선을 집중하고 시각 자극이 나타날 때까지 대기합니다.",
    "타깃이 나타나는 즉시 마우스를 클릭하거나 화면을 탭합니다.",
    "여러 라운드를 반복하여 평균값과 표준 편차를 확인합니다."
  ],
  audience: "FPS 및 MOBA e스포츠 선수, 리듬 게임 플레이어, 모터스포츠 레이서 및 뇌 반응 속도를 향상시키고자 하는 모든 사용자.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  related: [
    { href: "/ko/drills/reaction-speed", label: "반응속도 훈련 허브" },
    { href: "/ko/drills/motor/movement-speed/rapid-tapping", label: "CPS 클릭 속도 테스트" }
  ]
};

export default function KoreanReactionTimeTestPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ReactionTimeTestWrapper />
      <DrillGuide guide={reactionGuide} />
    </>
  );
}
