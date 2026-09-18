import GridMemorizationClient from '@/app/drills/memory/spatial-memory/grid-memorization/GridMemorizationClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "순간 기억 테스트・시각 기억력 검사 – 격자 패턴 기억 게임 | SkillDrills",
  description: "무료 온라인 순간 기억 테스트(시각 기억력 검사). 확장되는 격자 패턴을 1.5초 동안 기억하고 시각 캐시 용량과 공간 청킹 능력을 측정·훈련하세요.",
  keywords: ['순간 기억 테스트', '시각 기억 테스트', '공간 기억력 테스트', '시각 작업기억', '격자 패턴 기억 게임', '순간 기억력 검사', '단기 시각 기억력', '시각 캐시 테스트', '패턴 기억력 훈련', '작업기억 공간 검사', '코르시 블록 대체', '두뇌 기억력 게임'],
  openGraph: {
    title: "순간 기억 테스트 (시각 기억력 검사) - 무료 격자 패턴 기억력 게임 | SkillDrills",
    description: "무료 온라인 순간 기억 테스트 (시각 기억력 검사). 확장되는 4x4 ~ 5x5 격자 매트릭스 패턴을 1.5초 동안 기억하고 시각 캐시 용량과 공간 청킹 능력을 측정·훈련하세요. 로그인 없이 브라우저에서 즉시 플레이.",
    type: 'website',
    url: 'https://skilldrills.online/ko/drills/memory/spatial-memory/grid-memorization',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "순간 기억 테스트 (시각 기억력 검사) - 무료 격자 패턴 기억력 게임 | SkillDrills",
    description: "무료 온라인 순간 기억 테스트 (시각 기억력 검사). 확장되는 4x4 ~ 5x5 격자 매트릭스 패턴을 1.5초 동안 기억하고 시각 캐시 용량과 공간 청킹 능력을 측정·훈련하세요. 로그인 없이 브라우저에서 즉시 플레이.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/memory/spatial-memory/grid-memorization',
    languages: getAlternateLanguages('/drills/memory/spatial-memory/grid-memorization'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://skilldrills.online/ko" },
    { "@type": "ListItem", "position": 2, "name": "기억력 훈련", "item": "https://skilldrills.online/ko/drills/memory" },
    { "@type": "ListItem", "position": 3, "name": "공간 기억력", "item": "https://skilldrills.online/ko/drills/memory/spatial-memory" },
    { "@type": "ListItem", "position": 4, "name": "순간 기억 테스트", "item": "https://skilldrills.online/ko/drills/memory/spatial-memory/grid-memorization" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "순간 기억 테스트 (시각 기억력 검사)",
  "url": "https://skilldrills.online/ko/drills/memory/spatial-memory/grid-memorization",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "isAccessibleForFree": true,
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "순간 기억 테스트 (시각 기억력 검사)",
  "url": "https://skilldrills.online/ko/drills/memory/spatial-memory/grid-memorization",
  "description": "4x4부터 5x5까지 확장되는 격자 매트릭스에서 순간 점등되는 패턴을 기억하고 복원하여 시각 작업기억 용량과 공간 청킹 능력을 측정하는 무료 브라우저 신경인지 테스트.",
  "dateModified": "2026-09-11",
  "gamePlatform": "Web Browser",
  "genre": ["Memory Game", "Cognitive Training", "Brain Training", "Spatial Memory"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};


const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "순간 기억 테스트 (시각 기억력 검사)",
  "url": "https://skilldrills.online/ko/drills/memory/spatial-memory/grid-memorization",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "dateModified": "2026-09-11",
  "author": { "@type": "Organization", "name": "SkillDrills" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "순간 기억 테스트로 시각 작업기억을 향상시키는 방법",
  "description": "시각 작업기억의 용량 한계를 극복하고 순간 제시되는 격자 패턴을 체계적으로 기억·복원하기 위한 4단계 인지 프로토콜.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/ko/drills/memory/spatial-memory/grid-memorization#step-1",
      
      "name": "시선 중앙 고정",
      "text": "패턴이 켜지기 전 격자 정중앙에 시선을 고정하여 주변시를 활용해 매트릭스 전체의 공간 구조를 한눈에 파악합니다."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/ko/drills/memory/spatial-memory/grid-memorization#step-2",
      
      "name": "게슈탈트 형태 청킹 실행",
      "text": "개별 타일 좌표를 따로 외우지 않고, 인접한 점등 타일을 기하학적 형태(직선, L자, 사각형, 삼각형 등)로 묶어 기억합니다."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/ko/drills/memory/spatial-memory/grid-memorization#step-3",
      
      "name": "운동-공간 궤적 시각화",
      "text": "1.5초 노출 시간 동안 점등된 타일들을 하나의 선으로 연결하듯 마음속으로 경로를 추적하여 운동 피질의 기억을 활성화합니다."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/ko/drills/memory/spatial-memory/grid-memorization#step-4",
      
      "name": "체계적인 격자 복원",
      "text": "기억이 사라지기 전에 청킹으로 묶어둔 기하학적 덩어리를 먼저 클릭하고, 남은 개별 타일을 채워 넣습니다."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "순간 기억 테스트(시각 기억력 검사)란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "시공간 작업기억(Visuospatial Working Memory)을 평가하는 검사입니다. 언어적 음운 되뇌기에 의존하지 않고, 시각적 패턴과 공간적 배치를 순간적으로 지각, 부호화하여 단기적으로 유지하고 재생하는 뇌의 비언어적 시각 기억 용량을 측정합니다."
      }
    },
    {
      "@type": "Question",
      "name": "그리드 순간기억 훈련의 작동 방식은 어떻게 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "4x4 또는 5x5 격자판 위에 여러 타일이 1.5초 동안 백색으로 켜집니다. 불이 꺼진 후 방금 켜졌던 타일들을 정확히 클릭하여 복원합니다. 라운드를 통과할 때마다 패턴 난이도와 격자 크기가 단계적으로 올라갑니다."
      }
    },
    {
      "@type": "Question",
      "name": "시각 패턴 검사(Visual Patterns Test / VPT)란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1997년 Sergio Della Sala와 Robert H. Logie 등이 개발한 표준 신경심리학 검사로, 2차원 격자 매트릭스를 사용하여 연속적인 신체 움직임과 분리된 순수 정적 시각 단기기억 용량을 측정하는 골드 스탠다드입니다."
      }
    },
    {
      "@type": "Question",
      "name": "코르시 블록 검사(Corsi Block-Tapping Test)와의 차이점은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "코르시 블록 검사(Corsi, 1972)는 블록이 차례대로 두드려지는 동적인 시간적 순서를 기억하는 방식으로 '내적 서기(Inner Scribe)'를 활용합니다. 반면 본 그리드 테스트는 모든 타일이 동시에 켜져 정적 형태와 배치를 보관하는 '시각 캐시(Visual Cache)' 용량을 측정합니다."
      }
    },
    {
      "@type": "Question",
      "name": "매트릭스 기억력 검사의 성인 평균 점수는 얼마인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Della Sala 등의 연구(1997, 1999)에 따르면 일반 성인의 평균 시각 패턴 기억 폭은 4x4 ~ 5x5 격자에서 6 ~ 8개 타일입니다. 10 ~ 14개 이상을 기억하는 상위 1%는 고도의 공간 기하학적 청킹을 구사합니다."
      }
    },
    {
      "@type": "Question",
      "name": "공간 청킹(Chunking)을 활용하면 왜 기억력이 좋아지나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "인간의 시각 작업기억은 약 3~4개의 독립된 항목만 동시에 저장할 수 있는 생리학적 한계가 있습니다 (Luck & Vogel, 1997; Cowan, 2001). 인접한 타일들을 사각형이나 선 등의 친숙한 기하학적 덩어리로 묶으면 여러 칸을 하나의 인지 단위로 압축하여 한계를 극복할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "시각 캐시(Visual Cache)와 내적 서기(Inner Scribe)의 차이는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Logie(1995)의 시공간 작업기억 모델에서 '시각 캐시'는 형태, 색상, 정적 이미지를 수동적으로 보관하는 창고이며, '내적 서기'는 공간적 이동 경로를 능동적으로 되뇌고 업데이트하는 실행 메커니즘입니다."
      }
    },
    {
      "@type": "Question",
      "name": "왜 격자 패턴은 1.5초가 지나면 빠르게 잊혀지나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "망막 감각 영상 기억(Iconic Memory)은 250~500밀리초 내에 급격히 소멸합니다. 1.5초 노출 동안 공간 청킹이나 심상 추적을 통해 작업기억으로 능동 전이시키지 않으면 시각적 잔상은 새로운 입력에 덮어씌워집니다."
      }
    },
    {
      "@type": "Question",
      "name": "잘못된 타일을 클릭했을 때 점수 감점 페널티가 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "아닙니다. 잘못된 타일을 클릭해도 점수가 깎이거나 남은 훈련 시간이 줄어들지 않습니다. 현재 난이도 그대로 즉시 재도전할 수 있어 한계 능력치에 안전하게 도달할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "시각 기억력은 실제 일상이나 게임에서 어떻게 활용되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FPS 게임(발로란트, 카스2, 배틀그라운드)의 미니맵 적 위치 순간 파악, 체스 및 바둑 판세 인식, 건축 설계도 및 UI 레이아웃의 빠른 판독, 이공계 분야의 3차원 공간 회전 지각 능력과 직접적으로 직결됩니다."
      }
    }
  ]
};

const gridGuide = {
  intro: [
  "순간 기억 테스트(Visual Memory Test / 그리드 기억력 검사)는 시공간 작업기억, 순간 패턴 부호화 역량, 그리고 정적 매트릭스 단기 회상력을 측정하기 위한 인터랙티브 신경인지 훈련 도구입니다. 음운적 시연에 의존하는 언어 기억력 검사와 달리, 뇌의 순수한 비언어적 시각 기억 시스템만을 정밀하게 분리하여 측정합니다.",
  "시공간 기억 폭에 대한 임상 연구는 Pietro Corsi(1972)의 코르시 블록 검사로 시작되었으며, 시공간 기억이 언어적 숫자 기억과 해부학적·기능적으로 구분된 독립 신경망에서 작동함이 증명되었습니다(Milner, 1971). 이후 1997년 Sergio Della Sala와 Robert H. Logie 등은 순차적 신체 움직임에서 순수 정적 매트릭스 패턴 보존을 분리하는 '시각 패턴 검사(Visual Patterns Test / VPT)'를 표준화했습니다.",
  "현대 인지신경과학에서 Robert H. Logie(1995)와 Alan Baddeley(2000)는 시공간 메모장을 '시각 캐시(형태·색상·정적 배치를 담는 수동 저장고)'와 '내적 서기(공간 이동 및 리허설을 담당하는 능동 기전)'로 세분화했습니다. 나아가 Steven J. Luck & Edward K. Vogel(1997)과 Nelson Cowan(2001)의 연구에 따르면 가공되지 않은 순수 시각 작업기억 용량은 3~4개 항목으로 엄격히 제한됩니다. 이 한계를 넘어 매트릭스 기억 폭을 넓히려면 점등 타일을 의미 있는 도형으로 묶는 '공간 청킹(Spatial Chunking)'이 필수적입니다.",
  "본 훈련 도구는 디지털 정밀 시간 계측(Woods et al., 2015)을 기반으로 제작되어, 1.5초의 표준화된 순간 노출과 적응형 난이도 확장을 통해 고속 환경에서 사용자의 시공간 기억 한계치를 정확히 측정합니다.",
  "측정 방식: 모든 이벤트는 브라우저의 performance.now() 고해상도 타이머를 사용하여 사용자의 기기 내부에서 밀리초 단위로 연산되며 서버로 전송되지 않습니다. 브라우저 타이머는 보안 조치로 약 1ms 단위로 정렬되며, 디스플레이 재생 빈도(60Hz 기준 약 16.7ms)에 맞춰 렌더링됩니다(Woods et al., 2015). 5ms 미만의 미세한 차이는 기기 오차로 간주하고, 타인과의 비교보다는 동일한 기기에서의 개인적 성장 추세를 관찰하는 것이 바람직합니다.",
  "데이터 투명성: SkillDrills는 사용자의 점수 데이터를 서버에 수집하지 않습니다. 모든 수치는 브라우저 localStorage에만 안전하게 보관됩니다. 본 페이지에 인용된 모든 기준치는 하단 참고문헌에 등재된 학술 논문에 근거합니다.",
  "본 도구는 인지 기능 이해와 자기 훈련을 위한 무료 브라우저 게임이며, 의료 기기나 의학적 진단 도구가 아닙니다. 인지 건강에 우려가 있다면 전문 의료진과 상담하십시오."
],
  benchmarks: {
    title: "시공간 패턴 기억 폭 표준 벤치마크",
    headers: ["성능 등급", "패턴 스팬 (타일 수)", "훈련 점수", "인지 저장소 및 청킹 특성"],
    rows: [
  [
    "Tier 1 (상위 1% / 최상위권)",
    "10 ~ 14+ 개 타일",
    "1,150+ 점",
    "탁월한 시공간 작업기억. 복잡한 패턴을 2~3개의 기하학적 게슈탈트 덩어리로 즉각 분해. 시각 캐시 보존이 완벽하며 450ms 미만의 클릭 간격을 유지."
  ],
  [
    "Tier 2 (상위 15%~5% / 우수)",
    "8 ~ 9 개 타일",
    "850 ~ 1,149 점",
    "일반 성인 기준치를 상회. L자, 직선, 삼각 등 신속한 형태 청킹 구사. 시각적 간섭에 강하며 450~650ms 반응 속도."
  ],
  [
    "Tier 3 (일반 성인 평균 / 50%)",
    "6 ~ 7 개 타일",
    "550 ~ 849 점",
    "일반 성인 정상 기준치 (Della Sala et al., 1997). 단순한 쌍 형태를 처리 가능. 5x5 격자에서 주변부 타일을 놓치기 시작. 650~900ms 간격."
  ],
  [
    "Tier 4 (평균 이하 / 용량 한계)",
    "5 개 타일",
    "350 ~ 549 점",
    "청킹 없는 순수 용량 한계선 부근에서 작동 (Cowan, 2001). 형태화하지 않고 타일을 낱개로 외우려는 경향. 900~1,200ms 간격."
  ],
  [
    "Tier 5 (훈련 필요 / 저하)",
    "5 개 미만",
    "350 점 미만",
    "시각 잔상 감쇠가 매우 빠름. 시각적 노이즈에 취약하며 1.5초 지연 동안 4개 초과 패턴을 유지하기 어려움. 클릭 간격 1,200ms 초과."
  ]
],
    note: "패턴 스팬은 45초 세션 동안 완전히 클리어한 최대 타일 구성을 나타냅니다. 백분위 기준은 시각 패턴 검사(VPT) 표준화 연구(Della Sala et al., 1997; Luck & Vogel, 1997)에 근거합니다."
  },
  techniques: {
    title: "매트릭스 시각 기억력을 확장하는 과학적 전략",
    items: [
  {
    "name": "게슈탈트 공간 형태 청킹",
    "desc": "인접한 점등 타일을 삼각형, 직선, 사각형, 알파벳 글자 등의 친숙한 기하학적 도형으로 묶어 인식합니다 (Wertheimer, 1923; Della Sala et al., 1999). 7개의 개별 좌표를 2개의 도형으로 묶으면 인지 부하를 60% 이상 절감할 수 있습니다.",
    "tips": "개별 타일을 낱개로 세지 말고, 연결된 모서리나 직선 블록을 가장 먼저 탐색하세요."
  },
  {
    "name": "네거티브 스페이스(여백) 기억법",
    "desc": "특정 영역에 타일이 빽빽하게 켜져 있다면, 켜지지 않은 '빈칸'을 기억합니다. 6개 구역 중 4개의 불빛을 외우는 것보다 꺼져 있는 2개의 빈칸 위치를 외우는 것이 기억 효율이 훨씬 높습니다.",
    "tips": "타일이 밀집된 곳에서는 어두운 빈 공간의 위치만 의식적으로 포착하세요."
  },
  {
    "name": "운동감각적 서기(Inner Scribe) 궤적 추적",
    "desc": "1.5초 노출 동안 점등된 타일들을 하나의 연속된 선으로 연결하듯 마음속으로 경로를 그리며 내적 서기(Logie, 1995)를 활성화합니다. 운동 피질의 경로 계획이 수동적 시각 캐시의 파지를 보강합니다.",
    "tips": "좌상단에서 우하단 등 일관된 방향으로 선을 그리면 패턴에 방향성이 생겨 회상이 쉬워집니다."
  },
  {
    "name": "중앙 시선 고정과 주변시 스냅샷",
    "desc": "라운드 시작 시 격자의 정중앙에 시선을 고정합니다. 타일 하나하나로 눈을 빠르게 굴리면(단속성 운동) 잔상이 흐려지므로, 주변시를 통해 전체 공간 토폴로지를 한 장의 사진처럼 담아냅니다.",
    "tips": "초점을 약간 부드럽게 풀고 패턴 전체를 하나의 실루엣으로 포착하는 느낌을 유지하세요."
  }
]
  },
  steps: [
  "격자 중앙에 시선을 고정하고 패턴이 켜지기를 기다립니다.",
  "1.5초 동안 점등된 타일들을 즉시 2~3개의 기하학적 도형(청크)으로 묶습니다.",
  "밀집된 구역에서는 켜지지 않은 빈칸(네거티브 스페이스)을 찾아 정보량을 줄입니다.",
  "불이 꺼지면 기억해둔 기하학적 덩어리를 격자판 위에 신속하게 탭하여 복원합니다.",
  "4x4에서 5x5로 확장되는 격자판에서 자신의 시각 작업기억 한계치를 지속적으로 갱신합니다."
],
  audience: "미니맵 상황 파악 능력을 높이고 싶은 FPS 게이머, 기하학 및 입체 공간을 다루는 이공계 학생, 방사선과 의사, 바둑 및 체스 플레이어, 비언어적 시각 기억력을 극대화하고 싶은 모든 사람.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('cowan2001', 'baddeley2000', 'logie1995', 'corsi1972', 'luck1997', 'milner1971', 'woods2015'),
  related: [
  {
    "href": "/drills/memory/working-memory/n-back",
    "label": "3-Back 작업기억 훈련"
  },
  {
    "href": "/drills/cognitive/focus/concentration-grid",
    "label": "슐테 테이블 (집중력 격자)"
  },
  {
    "href": "/drills/memory/short-term-memory/digit-span",
    "label": "숫자 기억 폭 테스트"
  },
  {
    "href": "/drills/reaction-speed/reaction-time-test",
    "label": "반응속도 테스트"
  },
  {
    "href": "/drills/reaction-speed/reflex-training-drill",
    "label": "순발력 테스트 (반사신경 게임)"
  }
]
};

export default function LocalizedGridMemorizationPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GridMemorizationClient copy={{
        "h1Keyword": "순간 기억 테스트",
        "h1Suffix": " – 무료 시각 패턴 기억력 검사",
        "caption": "시각 작업기억은 한 번에 약 4개의 독립된 대상을 저장할 수 있으며, 이 한계는 대상의 복잡도가 아닌 개수에 의해 결정됩니다 (Luck & Vogel, 1997). 정적 격자 매트릭스 패턴은 뇌의 형태·위치 수동 보관소인 시각 캐시(Visual Cache)를 직접 측정합니다 (Logie, 1995).",
        "statScore": "점수",
        "statTime": "남은 시간",
        "statGridSize": "격자 크기",
        "statBest": "최고 기록",
        "hudScore": "점수",
        "hudTime": "시간",
        "startTitle": "그리드 순간기억 Pro",
        "startSubtitle": "공간 단기기억 • 시각 패턴 재인 훈련",
        "countdownSubtitle": "준비하세요",
        "newBest": "최고 기록 갱신",
        "pointsLabel": "점수",
        "statAccuracy": "정확도",
        "cellsUnit": "칸",
        "statPeakPattern": "최대 패턴",
        "statPerfects": "완벽 성공",
        "btnPlayAgain": "다시 시작",
        "rulesTitle": "규칙 및 점수 계산 방식",
        "rulesItems": [
                {
                        "num": "1",
                        "text": "패턴 기억",
                        "highlight": "+150 PTS",
                        "result": "점등된 타일 위치를 기억하고 탭하여 복원"
                },
                {
                        "num": "2",
                        "text": "난이도 상승",
                        "highlight": "4x4 → 5x5",
                        "result": "정답 시 매트릭스와 점등 칸 수가 점진적 확장"
                },
                {
                        "num": "3",
                        "text": "오답 / 타임아웃",
                        "highlight": "감점 없음",
                        "result": "오답 시에도 점수나 시간 차감 페널티 없음"
                },
                {
                        "num": "4",
                        "text": "레벨 유지",
                        "highlight": "현재 레벨 유지",
                        "result": "실패 시 레벨 강등 없이 현재 단계 재도전"
                }
        ]
}} />
      <DrillGuide guide={gridGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/spatial-memory/grid-memorization"
          locale="ko"
        />
      </div>
    </>
  );
}
