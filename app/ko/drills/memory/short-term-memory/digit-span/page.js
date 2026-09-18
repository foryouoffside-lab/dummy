import DigitSpanClient from '@/app/drills/memory/short-term-memory/digit-span/DigitSpanClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "숫자 기억력 테스트・디지트 스팬 – 작업기억 용량 측정 | SkillDrills",
  description: "무료 온라인 숫자 기억력 테스트 (디지트 스팬 / 숫자 외우기 검사). 점진적으로 확장되는 숫자 배열을 기억하고 입력하여 음운 루프와 작업기억 용량을 측정·훈련하세요.",
  keywords: [
    "숫자 기억력 테스트",
    "디지트 스팬",
    "숫자 기억 테스트",
    "음운 루프 테스트",
    "작업기억력 검사",
    "숫자 외우기 게임",
    "단기기억 측정",
    "청킹 기억법 훈련",
    "두뇌 기억력 테스트",
    "기억 폭 검사",
    "웩슬러 숫자 검사",
    "순차적 기억력 테스트"
  ],
  openGraph: {
    title: "숫자 기억력 테스트・디지트 스팬 – 작업기억 용량 측정 | SkillDrills",
    description: "무료 온라인 숫자 기억력 테스트 (디지트 스팬 / 숫자 외우기 검사). 점진적으로 확장되는 숫자 배열을 기억하고 입력하여 음운 루프와 작업기억 용량을 측정·훈련하세요.",
    type: 'website',
    url: 'https://skilldrills.online/ko/drills/memory/short-term-memory/digit-span',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "숫자 기억력 테스트・디지트 스팬 – 작업기억 용량 측정 | SkillDrills",
    description: "무료 온라인 숫자 기억력 테스트 (디지트 스팬 / 숫자 외우기 검사). 점진적으로 확장되는 숫자 배열을 기억하고 입력하여 음운 루프와 작업기억 용량을 측정·훈련하세요.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/memory/short-term-memory/digit-span',
    languages: getAlternateLanguages('/drills/memory/short-term-memory/digit-span'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://skilldrills.online/ko" },
    { "@type": "ListItem", "position": 2, "name": "기억력 훈련", "item": "https://skilldrills.online/ko/drills/memory" },
    { "@type": "ListItem", "position": 3, "name": "단기 기억력", "item": "https://skilldrills.online/ko/drills/memory/short-term-memory" },
    { "@type": "ListItem", "position": 4, "name": "숫자 기억력 테스트", "item": "https://skilldrills.online/ko/drills/memory/short-term-memory/digit-span" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "숫자 기억력 테스트 (디지트 스팬)",
  "url": "https://skilldrills.online/ko/drills/memory/short-term-memory/digit-span",
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
  "name": "숫자 기억력 테스트 (디지트 스팬)",
  "url": "https://skilldrills.online/ko/drills/memory/short-term-memory/digit-span",
  "description": "화면에 순차 점등되는 숫자 배열을 기억하고 정확한 순서대로 입력하여 음운 루프 용량과 숫자 단기기억 폭을 정밀 측정하는 무료 브라우저 도구.",
  "dateModified": "2026-09-11",
  "gamePlatform": "Web Browser",
  "genre": ["Memory Game", "Cognitive Training", "Brain Training", "Working Memory"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};


const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "숫자 기억력 테스트 (디지트 스팬)",
  "url": "https://skilldrills.online/ko/drills/memory/short-term-memory/digit-span",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "dateModified": "2026-09-11",
  "author": { "@type": "Organization", "name": "SkillDrills" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "숫자 기억력 테스트로 단기기억 용량을 늘리는 방법",
  "description": "음운 루프와 리듬 청킹 기법을 적용하여 숫자 기억 폭을 극대화하기 위한 4단계 인지 훈련 프로토콜.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/ko/drills/memory/short-term-memory/digit-span#step-1",
      
      "name": "화면 중앙 시선 집중",
      "text": "3초간의 제시 시간 동안 화면 정중앙에 집중하여 나타나는 숫자 배열을 정확하게 부호화합니다."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/ko/drills/memory/short-term-memory/digit-span#step-2",
      
      "name": "리듬 청킹(3자리 묶기)",
      "text": "전화번호처럼 숫자를 2~3자리 단위(예: '739-281')로 묶어 인지 부하를 줄입니다."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/ko/drills/memory/short-term-memory/digit-span#step-3",
      
      "name": "내적 시연(음운 루프) 반복",
      "text": "머릿속으로 소리 내어 숫자를 빠르게 되뇌어 1.5~2초 내에 사라지는 음향 잔상의 소멸을 막습니다."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/ko/drills/memory/short-term-memory/digit-span#step-4",
      
      "name": "신속한 키패드 입력",
      "text": "기억의 잔상이 흐려지기 전에 일정한 리듬으로 키패드를 두드려 숫자를 순서대로 입력합니다."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "숫자 기억력 테스트(디지트 스팬 검사)란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "언어적 단기기억, 작업기억 용량, 그리고 집중력을 측정하는 대표적인 신경심리학적 평가 도구입니다. 화면에 나타나는 임의의 숫자 배열을 기억한 후 처음부터 순서대로(정방향) 정확히 입력합니다."
      }
    },
    {
      "@type": "Question",
      "name": "숫자 기억력 검사의 성인 평균 점수는 얼마인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "일반 성인의 평균 정방향 숫자 기억 폭은 5~7자리입니다. 7자리는 조지 밀러의 유명한 '7±2' 법칙에 해당하며, 9자리 이상을 기억하는 상위권은 뛰어난 기호 청킹 전략을 활용합니다."
      }
    },
    {
      "@type": "Question",
      "name": "정방향(Forward)과 역방향(Backward) 검사의 차이는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "정방향은 수동적 단기 저장소와 음운 루프 용량을 평가합니다. 반면 역방향은 기억한 숫자를 머릿속에서 거꾸로 재배열하는 능동적 정신 조작이 요구되어 고차원적 작업기억(중앙집행기능)을 측정합니다."
      }
    },
    {
      "@type": "Question",
      "name": "웩슬러 성인 지능검사(WAIS)의 숫자 소검사란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "WAIS 지능검사의 핵심 소검사로, 작업기억지표(WMI)를 산출하는 데 사용됩니다. 순차적 정보 처리, 정신적 주의력 제어, 산만함 억제 능력을 종합적으로 평가합니다."
      }
    },
    {
      "@type": "Question",
      "name": "음운 루프(Phonological Loop)는 숫자 기억에 어떤 역할을 하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "배들리의 작업기억 모델에 따르면 숫자는 '음운 저장소'에 보관되고 머릿속 '내적 시연'을 통해 유지됩니다. 음향 잔상은 약 1.5~2초 내에 급격히 소멸하므로, 머릿속으로 빠르게 되뇌는 속도가 기억 폭을 좌우합니다."
      }
    },
    {
      "@type": "Question",
      "name": "밀러의 법칙과 마법의 숫자 7(7±2)이란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1956년 조지 밀러가 제안한 인지 이론으로 인간의 즉각적 단기기억 용량이 7±2개 항목으로 제한된다고 설명했습니다. 현대 인지과학(Cowan, 2001)에 따르면 순수 용량은 4개이며, 7자리 이상은 청킹을 통해 달성됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "청킹(Chunking)을 활용하면 왜 숫자 기억이 쉬워지나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "개별 숫자를 전화번호처럼 '839 - 241'과 같이 3자리 묶음으로 범주화하면 6개의 독립 정보를 2개의 정보 단위로 압축하여 4단위의 작업기억 병목 한계를 극복할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "오답 시 자릿수가 1개 줄어드는 이유는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "이 도구는 1-up / 1-down 적응형 계단식 측정법을 사용하여 피로도를 최소화하면서 사용자의 실제 단기기억 한계치를 통계적으로 정밀하게 찾아냅니다."
      }
    },
    {
      "@type": "Question",
      "name": "숫자 기억력 훈련이 일상과 학습에 도움이 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "지속적 주의 집중력을 강화하고 잡념을 줄여주며, 암산, 프로그래밍 코드 암기, 언어 습득 등 일상과 학업에서의 정보 처리 효율을 크게 향상시킵니다."
      }
    },
    {
      "@type": "Question",
      "name": "이 온라인 숫자 기억력 테스트는 무료인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, SkillDrills 숫자 기억력 테스트는 100% 무료이며 설치나 회원가입 없이 브라우저에서 밀리초 단위 정밀 타이머로 즉시 측정할 수 있습니다."
      }
    }
  ]
};

const digitSpanGuide = {
  intro: [
  "숫자 기억력 테스트(Digit Span Test / 디지트 스팬 검사)는 언어성 단기기억, 작업기억 용량, 그리고 음운 처리 능력을 정밀하게 측정하기 위해 1세기 이상 활용되어 온 신경심리학 표준 평가 도구입니다.",
  "이 검사의 학문적 토대는 조지 밀러(George A. Miller, 1956)의 '마법의 숫자 7±2' 연구에서 출발했습니다. 데이비드 웩슬러(David Wechsler, 1939, 1955, 2008)는 정방향, 역방향, 순차 숫자 외우기를 WAIS 지능검사에 탑재하여 임상 작업기억지표(WMI)의 표준으로 확립했습니다.",
  "앨런 배들리(Alan Baddeley, 1974, 2000)의 작업기억 모델에 따르면 숫자 배열은 '음운 루프'를 통해 유지됩니다. 음향 잔상은 약 1.5~2.0초 내에 사라지므로 머릿속 내적 시연이 필수적입니다. 또한 넬슨 코완(Nelson Cowan, 2001)의 연구에 따르면 미가공 순수 용량은 4개 안팎이므로, 높은 자릿수를 기억하려면 전략적인 리듬 청킹이 절대적입니다.",
  "본 도구는 디지털 정밀 시간 계측(Woods et al., 2015)을 적용하여 3초간의 표준화된 순간 제시와 적응형 계단 알고리즘을 통해 사용자의 정확한 단기기억 용량을 측정합니다.",
  "측정 원리: 모든 기록은 브라우저의 performance.now() 고해상도 타이머를 활용하여 기기 내부에서 밀리초 단위로 연산되며 서버에 전송되지 않습니다. 보안 조치로 브라우저 타이머는 약 1ms 단위로 정렬되며 디스플레이 재생 빈도(60Hz 기준 약 16.7ms)에 동기화됩니다(Woods et al., 2015). 타인과의 단순 비교보다는 동일 기기에서의 개인적 성장 추이를 추적하세요.",
  "데이터 투명성: SkillDrills는 사용자의 점수를 서버에 수집하지 않습니다. 모든 데이터는 브라우저 localStorage에만 저장되며 임의의 추정치는 사용하지 않습니다. 본 페이지의 기준값은 모두 공인된 학술 논문에 근거합니다.",
  "본 도구는 인지 기능 향상과 흥미를 위한 무료 브라우저 훈련 도구이며 의료 기기가 아닙니다. 인지 건강에 우려가 있는 경우 전문의와 상담하십시오."
],
  benchmarks: {
    title: "숫자 기억 폭 및 작업기억 표준 벤치마크",
    headers: ["성능 등급", "숫자 스팬 (자릿수)", "WAIS 평가점수 환산", "인지 저장소 및 처리 특성"],
    rows: [
  [
    "Tier 1 (상위 1% / 최상위권)",
    "9 〜 12+ 자리",
    "환산 점수 16 〜 19",
    "기억술의 달인 수준. 3~4자리 리듬 청킹을 즉각 구사. 음운 루프 유지가 완벽하며 키 입력 간격 350ms 미만."
  ],
  [
    "Tier 2 (상위 15%~5% / 우수)",
    "7 〜 8 자리",
    "환산 점수 12 〜 15",
    "밀러의 정상 기준(7자리) 달성. 안정적인 2~3자리 묶음 형성. 시간적 감쇠에 강하며 350~500ms 반응."
  ],
  [
    "Tier 3 (일반 성인 평균 / 50%)",
    "5 〜 6 자리",
    "환산 점수 8 〜 11",
    "일반 성인의 정상 표준치. 기본적인 쌍 묶기 처리 가능. 6자리를 넘어가면 음향 혼동 발생 시작. 500~700ms 간격."
  ],
  [
    "Tier 4 (평균 이하 / 용량 한계)",
    "4 자리",
    "환산 점수 5 〜 7",
    "코완의 가공되지 않은 용량 한계(4개) 부근에서 작동. 되뇌지 않으면 4자리 초과 시 탈락. 700~950ms 간격."
  ],
  [
    "Tier 5 (훈련 필요 / 저하)",
    "3 자리",
    "환산 점수 1 〜 4",
    "3자리의 순차 유지에도 어려움을 겪는 상태. 집중력 저하 및 즉각적 기억 소멸에 취약. 입력 간격 950ms 초과."
  ]
],
    note: "숫자 스팬은 오류 없이 완벽하게 복원한 최대 자릿수를 의미합니다. WAIS 평가점수 환산은 성인 표준화 데이터(Wechsler, 2008; Woods et al., 2015)에 근거합니다."
  },
  techniques: {
    title: "숫자 기억 폭을 비약적으로 넓히는 과학적 전략",
    items: [
  {
    "name": "음성 리듬과 3자리 청킹",
    "desc": "연속된 숫자를 전화번호처럼 3자리 단위(예: '739 - 281 - 405')로 묶어 분할합니다 (Miller, 1956). 9개의 독립된 숫자가 3개의 덩어리로 압축되어 코완의 4단위 제한 내에 쾌적하게 안착합니다.",
    "tips": "각 묶음의 첫 번째 숫자를 머릿속 억양으로 약간 높여 읽으면 경계선이 선명해집니다."
  },
  {
    "name": "내적 시연(음운 루프)의 초고속 반복",
    "desc": "숫자 묶음을 주문처럼 머릿속으로 빠르게 되뇌어 순환시킵니다 (Baddeley, 1986). 음운 저장소의 기억은 2초 내에 소멸하므로 빠른 속도로 되뇌는 것이 소멸을 막는 열쇠입니다.",
    "tips": "숫자를 하나씩 뚝뚝 끊어 읽지 말고 한 단어처럼 부드럽게 이어서 발음하세요."
  },
  {
    "name": "키패드 공간 궤적 시각화",
    "desc": "숫자 배열을 키패드(3×3 배열) 위의 손가락 이동 경로로 공간화합니다 (Logie, 1995). 청각적 루프에 더해 운동 피질의 공간 기억을 동원하여 이중 부호화를 형성합니다.",
    "tips": "숫자가 나타날 때 키패드 위를 지그재그로 가로지르는 선을 머릿속으로 그리세요."
  },
  {
    "name": "초두 효과와 최신 효과 활용",
    "desc": "계열 위치 효과로 인해 첫 부분은 선행 리허설(초두 효과)로 강해지고 끝 2자리는 귀의 잔향(최신 효과)으로 신선하게 남습니다. 의식적 되뇌기는 가운데 숫자에 집중하세요.",
    "tips": "앞 3자리를 먼저 확정 짓고, 마지막 2자리는 귀에 남은 잔향을 믿고 가운데 숫자를 붙잡으세요."
  }
]
  },
  steps: [
  "화면 중앙에 시선을 고정하고 3초간의 숫자 제시를 기다립니다.",
  "숫자가 나타나면 즉시 2~3자리 단위의 리드미컬한 그룹으로 나눕니다.",
  "머릿속으로 숫자 덩어리를 주문처럼 빠르게 되뇌며 음운 감쇠를 방지합니다.",
  "입력 단계가 시작되면 키패드를 사용하여 정확한 순서대로 입력합니다.",
  "적응형 계단식 알고리즘을 통해 자신의 단기기억 한계치를 지속적으로 갱신합니다."
],
  audience: "숫자 기억력과 집중력을 키우고 싶은 학생, 공무원 시험이나 적성 검사를 준비하는 수험생, 두뇌 훈련에 관심 있는 모든 사람.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('miller1956', 'cowan2001', 'baddeley1974', 'baddeley2000', 'logie1995', 'woods2015'),
  related: [
  {
    "href": "/drills/memory/working-memory/n-back",
    "label": "3-Back 작업기억 훈련"
  },
  {
    "href": "/drills/memory/spatial-memory/grid-memorization",
    "label": "순간 기억 테스트 (시각 기억력 검사)"
  },
  {
    "href": "/drills/cognitive/focus/concentration-grid",
    "label": "슐테 테이블 (집중력 격자)"
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

export default function LocalizedDigitSpanPage() {
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
      <DigitSpanClient copy={{
        "h1Keyword": "숫자 기억력 테스트",
        "h1Suffix": " – 무료 디지트 스팬 숫자 외우기 게임",
        "caption": "화면에 번갈아 나타나는 숫자 배열을 기억한 후, 올바른 순서대로 입력하세요.",
        "statScore": "점수",
        "statTime": "남은 시간",
        "statSpan": "스팬",
        "digitsUnit": "자리",
        "statBest": "최고 기록",
        "hudScore": "점수",
        "hudTime": "시간",
        "memorizeTitle": "숫자 배열 기억하기",
        "evaluating": "평가 중...",
        "startTitle": "디지트 스팬 Pro",
        "startSubtitle": "숫자 단기기억 • 순차적 회상 훈련",
        "countdownSubtitle": "준비하세요",
        "newBest": "최고 기록 갱신",
        "pointsLabel": "점수",
        "statAccuracy": "정확도",
        "statPeakSpan": "최대 스팬",
        "statPerfects": "완벽 성공",
        "btnPlayAgain": "다시 시작",
        "rulesTitle": "훈련 규칙 및 점수 산정 방식",
        "rulesItems": [
                {
                        "num": "1",
                        "text": "숫자 순차 회상",
                        "highlight": "+100 PTS",
                        "result": "화면에 제시된 숫자를 기억하고 키패드로 순서대로 입력"
                },
                {
                        "num": "2",
                        "text": "자릿수 보너스",
                        "highlight": "최대 +120% PTS",
                        "result": "자릿수가 길어질수록 타격당 획득 점수 상승"
                },
                {
                        "num": "3",
                        "text": "오답 / 타임아웃",
                        "highlight": "-1 자리",
                        "result": "점수 감점 없이 1단계 낮은 자릿수로 재도전"
                },
                {
                        "num": "4",
                        "text": "적응형 스팬 검사",
                        "highlight": "자동 조절",
                        "result": "사용자의 실제 단기기억 한계 용량으로 자동 수렴"
                }
        ]
}} />
      <DrillGuide guide={digitSpanGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/short-term-memory/digit-span"
          locale="ko"
        />
      </div>
    </>
  );
}
