import WordRecallClient from '@/app/drills/memory/short-term-memory/word-recall/WordRecallClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "단어 기억력 테스트・자유 회상 검사 – 언어 기억력 측정 | SkillDrills",
  description: "무료 온라인 단어 기억력 테스트(자유 회상 검사). 제시되는 단어 목록을 외우고 계열 위치 효과와 의미적 청킹 기법으로 언어적 단기 기억력을 측정·훈련하세요.",
  keywords: [
    "단어 기억력 테스트",
    "단어 기억력",
    "단어 기억 게임",
    "언어성 기억력 검사",
    "자유 회상 테스트",
    "계열 위치 효과",
    "의미적 청킹 훈련",
    "언어 작업기억력",
    "단어 암기 테스트",
    "두뇌 단어 테스트",
    "단기 언어 기억",
    "단어 회상 훈련"
  ],
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/memory/short-term-memory/word-recall",
    languages: getAlternateLanguages('/drills/memory/short-term-memory/word-recall', 'ko'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "단어 기억력 테스트・자유 회상 검사 – 언어 기억력 측정 | SkillDrills",
    description: "무료 온라인 단어 기억력 테스트(자유 회상 검사). 제시되는 단어 목록을 외우고 계열 위치 효과와 의미적 청킹 기법으로 언어적 단기 기억력을 측정·훈련하세요.",
    url: "https://skilldrills.online/ko/drills/memory/short-term-memory/word-recall",
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "단어 기억력 테스트・자유 회상 검사 – 언어 기억력 측정 | SkillDrills",
    description: "무료 온라인 단어 기억력 테스트(자유 회상 검사). 제시되는 단어 목록을 외우고 계열 위치 효과와 의미적 청킹 기법으로 언어적 단기 기억력을 측정·훈련하세요.",
  },
};

export const dynamic = 'force-static';

export default function LocalizedWordRecallPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://skilldrills.online/ko" },
      { "@type": "ListItem", "position": 2, "name": "기억력 훈련", "item": "https://skilldrills.online/ko/drills/memory" },
      { "@type": "ListItem", "position": 3, "name": "단기 기억", "item": "https://skilldrills.online/ko/drills/memory/short-term-memory" },
      { "@type": "ListItem", "position": 4, "name": "단어 기억력 테스트", "item": "https://skilldrills.online/ko/drills/memory/short-term-memory/word-recall" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "단어 기억력 테스트 (Verbal Memory Test)",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "화면에 제시되는 단어 목록을 기억하고 자유 회상 방식으로 입력하여 언어적 단기 기억력, 작업기억 용량 및 의미적 처리 능력을 평가하는 무료 인지 훈련 도구.",
    "genre": "Cognitive Assessment / Verbal Memory",
    "url": "https://skilldrills.online/ko/drills/memory/short-term-memory/word-recall",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "단어 기억력 테스트 (Verbal Memory Test)",
    "url": "https://skilldrills.online/ko/drills/memory/short-term-memory/word-recall",
    "description": "화면에 제시되는 단어 목록을 기억하고 자유 회상 방식으로 입력하여 언어적 단기 기억력, 작업기억 용량 및 의미적 처리 능력을 평가하는 무료 인지 훈련 도구.",
    "dateModified": "2026-09-05",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "isAccessibleForFree": true,
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "단어 기억력 테스트 (Verbal Memory Test)",
    "description": "화면에 제시되는 단어 목록을 기억하고 자유 회상 방식으로 입력하여 언어적 단기 기억력, 작업기억 용량 및 의미적 처리 능력을 평가하는 무료 인지 훈련 도구.",
    "url": "https://skilldrills.online/ko/drills/memory/short-term-memory/word-recall",
    "genre": ["Memory Game", "Cognitive Training", "Brain Game"],
    "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
    "applicationCategory": "Game",
    "operatingSystem": "Any",
    "numberOfPlayers": {
      "@type": "QuantitativeValue",
      "value": 1
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-05",
    "mainEntity": [
    {
        "@type": "Question",
        "name": "단어 기억력 테스트(Verbal Memory Test)란 무엇인가요?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "언어적 단기 기억력, 작업기억(Working Memory) 용량, 그리고 즉각적인 자유 회상 능력을 평가하는 대표적인 신경심리학적 인지 평가입니다. 제시된 단어 목록을 기억한 뒤 순서에 구애받지 않고 기억나는 단어를 자유롭게 입력합니다."
        }
    },
    {
        "@type": "Question",
        "name": "자유 회상(Free Recall)과 재인 기억(Recognition)의 차이는 무엇인가요?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "재인은 주어진 단어를 보고 본 적이 있는지 판별하는 수동적 과정입니다. 반면 자유 회상은 단서 없이 뇌 속 저장된 기억 흔적을 능동적으로 인출해야 하므로 인지적 요구량이 훨씬 높고 진정한 기억 용량을 반영합니다."
        }
    },
    {
        "@type": "Question",
        "name": "일반 성인의 단어 회상 평균 점수는 얼마인가요?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "표준 임상 단어 목록 평가(RAVLT 등)에서 건강한 성인은 낯선 단어 목록의 첫 번째 시행에서 평균 약 4~6개의 단어를 즉각 회상합니다. 본 검사는 브라우저 기반 연습용 도구이므로 의학적 진단 결과와는 차이가 있습니다."
        }
    },
    {
        "@type": "Question",
        "name": "레이 청각 언어 학습 검사(RAVLT)란 무엇인가요?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "1958년 스위스 심리학자 앙드레 레이(André Rey)가 개발한 임상 언어 기억 평가 도구로, 즉각적 기억 범위, 순행·역행 간섭, 반복 학습 곡선 및 지연 회상 능력을 표준화하여 측정합니다."
        }
    },
    {
        "@type": "Question",
        "name": "단어 목록의 계열 위치 효과(Serial Position Effect)란 무엇인가요?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "베넷 머독(1962)이 수학적으로 정립한 현상으로, 목록의 맨 앞 단어(초두 효과: 장기 기억 전이)와 맨 끝 단어(최신 효과: 감각 잔상 보존)의 회상률이 높고 중간 단어가 가장 많이 망각되는 U자형 곡선을 의미합니다."
        }
    },
    {
        "@type": "Question",
        "name": "왜 중간에 나온 단어를 가장 쉽게 잊어버리나요?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "목록 중간의 단어는 앞서 나온 단어들로 인한 '순행 간섭'과 뒤이어 나타나는 단어들로 인한 '역행 간섭'을 동시에 받아 작업기억 내에서 심각한 정보 병목 현상이 발생하기 때문입니다."
        }
    },
    {
        "@type": "Question",
        "name": "스토리 연결 기법(내러티브 청킹)이 회상률을 높이는 이유는 무엇인가요?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "크레이크와 록하트(1972)의 처리 수준 모형에 따르면, 단순한 기계적 반복보다 깊은 의미론적 처리를 거칠 때 여러 독립된 단어가 하나의 응집력 있는 일화 기억 스키마로 합성되어 인출 확률이 극대화됩니다."
        }
    },
    {
        "@type": "Question",
        "name": "자유 회상 검사에서 단어를 입력하는 순서가 중요한가요?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "아닙니다. 자유 회상 방식에서는 순서에 상관없이 생각나는 대로 입력하면 됩니다. 순서 제약이 없기 때문에 순차 추적 부담 없이 순수한 저장 용량과 인출 처리량을 측정할 수 있습니다."
        }
    },
    {
        "@type": "Question",
        "name": "단어 기억 훈련이 일상생활의 기억력을 전반적으로 향상시키나요?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "이 훈련을 통해 습득한 연상 스토리텔링이나 범주화 같은 기억 전략은 다른 목록 암기에도 전이될 수 있습니다. 다만 전반적인 뇌 기능 향상에 대한 과도한 주장은 피해야 하며, 이는 의학적 치료나 진단 도구가 아닙니다."
        }
    },
    {
        "@type": "Question",
        "name": "이 온라인 단어 기억력 테스트는 무료인가요?",
        "acceptedAnswer": {
            "@type": "Answer",
            "text": "네, SkillDrills의 단어 기억력 테스트는 100% 무료입니다. 다운로드나 회원가입 없이 웹 브라우저에서 즉시 실행되며, 밀리초 정밀 타이밍과 적응형 난이도 조절을 제공합니다."
        }
    }
]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "단어 기억력 검사에서 자유 회상 능력을 향상시키는 방법",
    "description": "스토리 연결 기법(내러티브 청킹)과 최신 효과 단어 선제 배출을 결합하여 단어 기억 스팬을 극대화하는 4단계 실전 프로토콜.",
    "step": [
    {
        "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/ko/drills/memory/short-term-memory/word-recall#step-1",
        "name": "단어 시각적 지각 및 내적 음운화",
        "text": "암기 단계에서 제시되는 단어를 주시하며 마음속으로 명확히 발음하고 대상의 생생한 이미지를 뇌리에 떠올립니다."
    },
    {
        "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/ko/drills/memory/short-term-memory/word-recall#step-2",
        "name": "연상 스토리(내러티브) 구성",
        "text": "서로 연관 없는 단어들을 하나의 기발하고 생생한 미니 이야기로 엮어(예: '기사가 산에서 황금 랜턴을 들었다') 정보 단위를 압축합니다."
    },
    {
        "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/ko/drills/memory/short-term-memory/word-recall#step-3",
        "name": "최신성 단어(Recency) 즉각 배출",
        "text": "입력 창이 열리면 기억 흔적이 3~5초 내에 사라지는 마지막 2~3개 단어를 머릿속 메아리에서 최우선으로 즉시 타이핑합니다."
    },
    {
        "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/ko/drills/memory/short-term-memory/word-recall#step-4",
        "name": "스토리 전개 및 완성 제출",
        "text": "최신 단어를 비워낸 뒤, 처음부터 구성했던 연상 스토리를 풀어내어 앞부분 단어들을 순서대로 적고 Enter 키를 눌러 제출합니다."
    }
]
  };

  const wordRecallGuide = {
    heading: "단어 기억력 테스트 가이드 & 언어성 자유 회상의 과학",
    intro: [
      "단어 기억력 테스트(Verbal Memory Test)는 언어성 단기 기억, 의미론적 연상 부호화, 즉각적 자유 회상 능력을 측정하고 단련하기 위해 설계된 인지 훈련입니다. 외부 단서 없이 뇌 속 정보를 스스로 인출하는 자유 회상은 인간 인지 구조에서 가장 까다로운 벤치마크 중 하나입니다.",
      "언어 기억의 과학적 탐구는 헤르만 에빙하우스(1885)의 망각 곡선과 계열 학습 연구에서 출발했습니다. 1958년 앙드레 레이는 레이 청각 언어 학습 검사(RAVLT)를 발표하여 언어 학습 속도와 간섭 저항력을 임상적으로 정량화했습니다.",
      "1962년 베넷 머독은 자유 회상에서의 계열 위치 효과를 수학적으로 증명하며 초두 효과와 최신 효과의 작용을 밝혔습니다. 이후 퍼거스 크레이크와 로버트 록하트(1972)의 '처리 수준' 연구는 깊은 의미론적 연결(스토리텔링)이 단순 반복 암기를 압도한다는 사실을 입증했습니다.",
      "본 훈련은 브라우저의 고해상도 타이머(performance.now())를 기반으로 작동하며, 적응형 계단식 프로토콜을 통해 당신의 진정한 언어성 기억 스팬을 정밀하게 탐색합니다. 모든 데이터는 당신의 브라우저 로컬에만 저장되며 외부로 전송되지 않습니다."
],
    benchmarks: {
      title: "언어성 자유 회상 및 단어 스팬 규준 벤치마크",
      headers: ["성능 등급", "단어 스팬 (개수)", "자유 회상 점수", "인지 저장 및 인출 프로필"],
      rows: [
        [
                "Tier 1 (최우수 / 상위 1% 수준)",
                "8 ~ 11+ 단어",
                "1,100+ 포인트",
                "기억술 마스터. 즉각적인 의미적 스토리 연계를 구축하고 역행 간섭을 극복. 단어당 800ms 미만의 초고속 인출 실현"
        ],
        [
                "Tier 2 (우수 평균 / 상위 15% 수준)",
                "6 ~ 7 단어",
                "850 ~ 1,099 포인트",
                "성인 기준치를 상회. 단어를 2~3개 묶음으로 범주화하여 시간 압박 속에서도 안정적인 자유 회상 유지"
        ],
        [
                "Tier 3 (일반 성인 기준 / 평균 50% 수준)",
                "4 ~ 5 단어",
                "550 ~ 849 포인트",
                "새로운 목록 첫 시행의 정상 인구 평균. 전형적인 계열 위치 효과를 보이며 중간 단어 탈락 발생"
        ],
        [
                "Tier 4 (하위 평균 / 언어 기억 병목)",
                "3 단어",
                "350 ~ 549 포인트",
                "의미적 부호화 없이 음운 잔향에만 의존. 즉각적인 최신성 버퍼를 넘어서는 단어 유지에 한계"
        ],
        [
                "Tier 5 (스팬 저하 수준)",
                "3 단어 미만",
                "350 포인트 미만",
                "기억 흔적의 감쇠가 빠르고 강한 순행 간섭 발생. 외부 단서 없이는 회상 어려움"
        ]
],
      note: "단어 스팬은 적응형 절차에서 오류 없이 달성한 최대 목록 길이입니다. 규준 점수는 성인 1회차 자유 회상 기준(Rey, 1964; Murdock, 1962; Woods et al., 2015)을 반영합니다."
    },
    techniques: {
      title: "언어성 자유 회상 기억 용량을 확장하는 실증 프로토콜",
      items: [
        {
                "name": "연상 내러티브 스토리텔링 (이야기 연결법)",
                "desc": "무관한 단어들을 하나의 기괴하고 선명한 심상 이야기로 엮습니다(Craik & Lockhart, 1972). '독수리', '성곽', '랜턴'을 '랜턴을 든 독수리가 성곽 지붕에 앉았다'로 결합하면 3개의 독립 항목이 하나의 일화 기억으로 묶입니다.",
                "tips": "이야기가 과장되고 생동감 넘치며 물리적으로 불가능할수록 뇌의 기억 흔적은 강렬해집니다."
        },
        {
                "name": "이중 부호화 기법 (시각 심상 + 청각적 메아리)",
                "desc": "앨런 파이비오의 이중 부호화 이론을 적용하여, 단어를 발음하면서 동시에 그 사물의 시각적 외형과 질감을 머릿속에 그립니다. 시각과 청각 경로를 동시에 활성화하면 인출 성공률이 배가됩니다.",
                "tips": "단어를 속으로 발음할 때 0.5초 동안 대상의 색상과 질감을 구체적으로 시각화하세요."
        },
        {
                "name": "범주화 및 의미적 클러스터링",
                "desc": "제시된 단어들을 순서와 상관없이 개념적 범주(자연, 건축, 보석, 도구 등)로 머릿속에서 재분류합니다(Tulving, 1962). 하나의 범주 구성원이 다른 단어들의 인출 단서가 됩니다.",
                "tips": "'성곽, 신전 = 건물', '다이아몬드, 금 = 보물'과 같이 공통 속성 태그를 부여하세요."
        },
        {
                "name": "최신성 단어 선제 배출 전략",
                "desc": "입력 창이 열리자마자 마지막에 본 2~3개 단어를 최우선으로 입력합니다(Murdock, 1962). 이 단어들은 3~5초 내에 사라지는 취약한 단기 감각 기억에 머물러 있으므로 먼저 비워내야 앞부분 스토리에 집중할 수 있습니다.",
                "tips": "마지막 단어들을 먼저 빠르게 입력한 뒤, 차분하게 첫 이야기 덩어리를 풀어내세요."
        }
]
    },
    steps: [
      "화면 중앙의 단어 표시 영역에 시선을 고정하고 암기 단계에 집중합니다.",
      "단어가 나타나면 즉시 다음 단어와 연결하여 생생한 심상 스토리를 구축합니다.",
      "각 단어의 시각적 형태를 구체화하여 시각-청각 이중 부호화 기억을 형성합니다.",
      "입력창이 활성화되면 마지막 단어들을 즉시 타이핑한 뒤 이야기를 전개합니다.",
      "적응형 난이도 시스템을 통해 당신의 언어성 기억 한계를 점진적으로 넓혀갑니다."
],
    audience: "학습 효율과 어휘 기억력을 높이려는 학생, 언어적 인출 순발력을 유지하려는 직장인, 그리고 작업기억 향상을 추구하는 모든 사용자.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('craik1972', 'murdock1962', 'tulving1962', 'woods2015'),
    related: [
      { href: "/drills/memory/short-term-memory/digit-span", label: "Digit Span Memory Test" },
      { href: "/drills/memory/short-term-memory/color-sequence", label: "Color Memory Game" },
      { href: "/drills/memory/spatial-memory/grid-memorization", label: "Visual Memory Test" },
      { href: "/drills/memory/spatial-memory/object-location", label: "Object Location Memory Test" },
      { href: "/drills/memory/working-memory/n-back", label: "3-Back Working Memory Test" }
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
      <WordRecallClient copy={{
          "h1Keyword": "단어 기억력 테스트",
          "h1Suffix": " – 무료 언어 기억 회상 게임",
          "subtitle": "단어 목록의 자유 회상은 고르지 않습니다. 처음과 마지막 단어는 선명히 기억되고 중간 단어는 쉽게 잊히는 계열 위치 효과(Murdock, 1962)가 발생합니다. 단순 응시 시간보다 깊은 의미론적 부호화(Craik & Lockhart, 1972)가 기억 유지를 결정합니다.",
          "statScore": "점수",
          "statTime": "남은 시간",
          "statWords": "단어 수",
          "wordsUnit": "단어",
          "statBestScore": "최고 점수",
          "memorizePhase": "단어를 기억하세요",
          "btnSkip": "건너뛰기",
          "inputPhase": "기억한 단어 입력",
          "inputPlaceholder": "기억나는 단어들을 띄어쓰기로 구분하여 입력...",
          "btnSubmit": "단어 제출",
          "inputHint": "Enter 키를 눌러 제출할 수 있습니다",
          "feedbackPhase": "회상 결과 판정",
          "extraWordsLabel": "추가 또는 잘못 입력된 단어:",
          "startTitle": "단어 기억 Pro",
          "startSubtitle": "언어성 단기 기억력 • 단어 자유 회상 검사",
          "countdownSubtitle": "준비하세요",
          "newBest": "신기록",
          "pointsLabel": "포인트",
          "statAccuracy": "정확도",
          "statPeakWords": "최대 단어수",
          "statPerfects": "퍼펙트",
          "btnPlayAgain": "다시 도전",
          "rulesTitle": "훈련 규칙 및 점수 계산 체계",
          "aboutTitle": "단어 기억력 검사(Verbal Memory)에 대하여",
          "rulesItems": [
                    {
                              "num": "1",
                              "text": "단어 목록 자유 회상",
                              "highlight": "+150 PTS",
                              "result": "암기 단계에서 단어를 외우고 입력 단계에서 정확하게 입력"
                    },
                    {
                              "num": "2",
                              "text": "스팬 레벨 보너스",
                              "highlight": "최대 +135% PTS",
                              "result": "제시되는 단어 수가 늘어날수록 문제당 획득 점수가 대폭 증가"
                    },
                    {
                              "num": "3",
                              "text": "오답 및 시간 초과",
                              "highlight": "-1 단어",
                              "result": "점수나 시간 차감 없이 단어 수가 1단계 줄어들어 적응형 재도전"
                    },
                    {
                              "num": "4",
                              "text": "적응형 기억 스팬 측정",
                              "highlight": "자동 조절",
                              "result": "정답률에 따라 당신의 진정한 언어성 기억 용량 임계값으로 수렴"
                    }
          ],
          "wordBank": [
                    "사과",
                    "성곽",
                    "다리",
                    "다이아몬드",
                    "독수리",
                    "숲",
                    "정원",
                    "망치",
                    "섬",
                    "정글",
                    "기사",
                    "랜턴",
                    "산",
                    "바늘",
                    "바다",
                    "궁전",
                    "여왕",
                    "로켓",
                    "노을",
                    "신전",
                    "우산",
                    "계곡",
                    "창문",
                    "얼룩말",
                    "양초",
                    "용",
                    "깃털",
                    "은",
                    "금",
                    "대리석",
                    "수정",
                    "청동",
                    "그림자",
                    "영혼",
                    "지혜",
                    "명예",
                    "영광",
                    "꿈",
                    "폭풍",
                    "강",
                    "구름",
                    "불꽃",
                    "돌",
                    "천둥",
                    "무지개",
                    "불사조",
                    "시계",
                    "거울",
                    "모자"
          ]
}} />
      <DrillGuide guide={wordRecallGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/short-term-memory/word-recall"
          locale="ko"
        />
      </div>
    </>
  );
}
