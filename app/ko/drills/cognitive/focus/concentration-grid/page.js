import ConcentrationGridClient from '@/app/drills/cognitive/focus/concentration-grid/ConcentrationGridClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — ko-KR (concentration-grid / schulte-table)
// PRIMARY:  "슐테 테이블"                 — Top Korean cognitive search term
//           "슐테 표"                     — Common clinical and educational variant
// SECONDARY / LSI:
//           "슐테 테이블 온라인"          — High conversion web tool query
//           "집중력 격자"                 — Direct translation of concentration grid
//           "주변 시야 훈련"              — Core cognitive capability
//           "속독 훈련 숫자"              — Speed reading association
//           "시각 탐색 속도"              — Neuro-cognitive mechanism query
//           "시야각 확장 훈련"            — Visual field expansion phrase
// WINNER TITLE: 슐테 테이블 – 무료 온라인 주변시야 집중력 격자 | SkillDrills
// ============================================================

export const metadata = {
  title: "슐테 테이블 – 무료 온라인 주변시야 집중력 격자 | SkillDrills",
  description: "무료 온라인 슐테 테이블(Schulte Table) 훈련 사이트. 확장되는 숫자 격자를 순서대로 터치하여 주변 시야 확장, 시각 탐색 속도 및 속독 집중력을 단련하세요.",
  keywords: [
    "슐테 테이블",
    "슐테 표",
    "슐테 테이블 온라인",
    "집중력 격자",
    "주변 시야 훈련",
    "속독 훈련 숫자",
    "시각 탐색 속도",
    "시야각 확장 훈련",
    "사케드 안구 운동",
    "무료 뇌 인지 훈련",
    "슐테 테이블 5x5 연습",
    "온라인 집중력 테스트 무료"
  ],
  openGraph: {
    title: "슐테 테이블 – 무료 온라인 주변시야 집중력 격자 | SkillDrills",
    description: "무료 온라인 슐테 테이블(Schulte Table) 훈련 사이트. 확장되는 숫자 격자를 순서대로 터치하여 주변 시야 확장, 시각 탐색 속도 및 속독 집중력을 단련하세요.",
    type: "website",
    url: "https://skilldrills.online/ko/drills/cognitive/focus/concentration-grid",
    siteName: "SkillDrills",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "슐테 테이블 – 무료 온라인 주변시야 집중력 격자 | SkillDrills",
    description: "무료 온라인 슐테 테이블(Schulte Table) 훈련 사이트. 확장되는 숫자 격자를 순서대로 터치하여 주변 시야 확장, 시각 탐색 속도 및 속독 집중력을 단련하세요.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/cognitive/focus/concentration-grid",
    languages: getAlternateLanguages('/drills/cognitive/focus/concentration-grid'),
  },
};

export default function ConcentrationGridPageKo() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://skilldrills.online/ko" },
      { "@type": "ListItem", "position": 2, "name": "인지 드릴", "item": "https://skilldrills.online/ko/drills/cognitive" },
      { "@type": "ListItem", "position": 3, "name": "슐테 테이블", "item": "https://skilldrills.online/ko/drills/cognitive/focus/concentration-grid" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "슐테 테이블 온라인 (집중력 격자)",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-15",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "설치 없이 웹 브라우저에서 실행되는 무료 슐테 테이블(Schulte Table) 및 집중력 격자 훈련 도구.",
    "genre": "인지 훈련 / 주변 시야 / 집중력",
    "url": "https://skilldrills.online/ko/drills/cognitive/focus/concentration-grid",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "슐테 테이블 온라인 (집중력 격자)",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-15",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "browserRequirements": "HTML5 Canvas, JavaScript 지원 웹 브라우저",
    "description": "설치 없이 웹 브라우저에서 실행되는 무료 슐테 테이블(Schulte Table) 및 집중력 격자 훈련 도구.",
    "url": "https://skilldrills.online/ko/drills/cognitive/focus/concentration-grid"
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "슐테 테이블 온라인 (집중력 격자)",
    "url": "https://skilldrills.online/ko/drills/cognitive/focus/concentration-grid",
    "description": "무작위로 배치된 숫자를 순서대로 터치하여 주변 시야와 시각 탐색 속도를 강화하는 인지 훈련 게임.",
    "dateModified": "2026-09-15",
    "gamePlatform": "Web Browser",
    "genre": ["인지 훈련", "주변 시야", "슐테 테이블", "집중력 격자"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-15",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "슐테 테이블(Schulte Table)이란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "독일의 정신과 의사 발터 슐테(Walter Schulte)가 1962년에 개발한 심리 진단 도구입니다. 무작위로 흩어져 있는 숫자들을 1부터 순서대로 빠르게 찾아내는 방식으로, 주의 집중력과 시각 탐색 속도를 정밀하게 측정합니다."
        }
      },
      {
        "@type": "Question",
        "name": "슐테 테이블 훈련이 주변 시야 확장에 어떻게 도움이 되나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "시선을 격자의 중심에 고정한 채 눈동자를 직접 굴리지 않고 주변 시야(Parafoveal vision)만으로 외곽 숫자를 인지하도록 유도하므로, 중심 시야 너머의 유효 시각 범위를 넓혀줍니다."
        }
      },
      {
        "@type": "Question",
        "name": "속독(Speed Reading)을 배우는 사람들에게 슐테 표가 필수적인 이유는 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "글자를 한 자씩 짚으며 읽는 습관을 버리고 여러 단어를 한눈에 덩어리로 인식하는 시각 폭을 길러주기 때문입니다. 시선의 불필요한 도약(사케드)과 역행 횟수가 현저히 줄어듭니다."
        }
      },
      {
        "@type": "Question",
        "name": "중앙 고정 주시(Central Fixation) 원칙이란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "격자의 정중앙을 편안하게 응시한 상태에서 시선을 고정하고, 숫자를 찾을 때 눈을 좌우상하로 격렬하게 움직이지 않는 올바른 훈련법입니다."
        }
      },
      {
        "@type": "Question",
        "name": "시각적 밀집 현상(Crowding)이란 무엇이며 난이도에 어떤 영향을 주나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "격자 크기가 3x3에서 5x5, 6x6, 8x8로 확장될수록 주변 방해 숫자들의 밀도가 높아집니다. 이 밀집 현상을 극복하면서 뇌의 선택적 주의 집중 필터링 능력이 단련됩니다."
        }
      },
      {
        "@type": "Question",
        "name": "표준 5x5 슐테 표(1~25)에서 우수한 기준 시간은 얼마인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "일반적으로 30초 이내면 우수한 수준이며, 속독 전문가나 고도로 훈련된 운동선수의 경우 20초 안팎에 주파합니다."
        }
      },
      {
        "@type": "Question",
        "name": "FPS 게이머나 프로게이머에게도 실질적인 효과가 있나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "매우 큽니다. 화면 중앙의 조준선(크로스헤어)에 시선을 둔 채 화면 구석의 미니맵, 스킬 쿨다운, 적의 기습 무빙을 주변 시야로 즉각 감지하는 능력이 비약적으로 향상됩니다."
        }
      },
      {
        "@type": "Question",
        "name": "하루에 몇 번씩 연습하는 것이 가장 효과적인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "눈의 피로를 방지하기 위해 1회 10분 내외(하루 5~10회 세션)로 매일 꾸준히 반복하는 것이 시각 피질의 신경가소성을 촉진하는 최적의 루틴입니다."
        }
      },
      {
        "@type": "Question",
        "name": "숫자를 잘못 클릭하면 페널티가 부여되나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "잘못된 숫자를 누르면 화면에 경고 깜빡임이 발생하고 정확도 통계가 차감되지만, 45초의 제한 시간 동안 게임이 강제 종료되지는 않습니다."
        }
      },
      {
        "@type": "Question",
        "name": "이 슐테 테이블 훈련 도구는 무료인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "네, 완전 무료이며 별도의 가입이나 앱 다운로드 없이 PC와 모바일 브라우저에서 즉시 실행할 수 있습니다."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "슐테 테이블로 주변 시야와 집중력을 단련하는 4단계",
    "description": "시각 탐색 속도와 주변 시야 확장을 완성하는 체계적인 4단계 훈련 프로토콜.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "격자의 정중앙에 시선 고정",
        "text": "눈동자를 개별 칸마다 움직이지 말고, 격자 한가운데를 부드럽게 바라보며 전체 판을 시야에 담습니다.",
        "url": "https://skilldrills.online/ko/drills/cognitive/focus/concentration-grid#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "주변 시야로 숫자 1 탐색 및 터치",
        "text": "중앙 고정 상태에서 외곽 시야를 활성화하여 시작 숫자 1을 포착하고 즉시 터치합니다.",
        "url": "https://skilldrills.online/ko/drills/cognitive/focus/concentration-grid#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "연속 숫자를 오름차순으로 순차 터치",
        "text": "현재 숫자를 누르면서 다음 숫자의 위치를 미리 시야에 담아두는 선행 탐색을 적용하여 연속으로 터치합니다.",
        "url": "https://skilldrills.online/ko/drills/cognitive/focus/concentration-grid#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "격자 완료 후 상위 차원으로 확장",
        "text": "45초 타이머 내에 격자를 완성하면 더 큰 매트릭스(4x4, 5x5, 6x6)로 확장되며 시야 한계에 도전합니다.",
        "url": "https://skilldrills.online/ko/drills/cognitive/focus/concentration-grid#step-4"
      }
    ]
  };

  const concentrationGridGuide = {
    heading: "슐테 테이블 가이드 & 주변 시야 인지 과학",
    intro: [
      "슐테 테이블(Schulte Table)은 1962년 독일 튀빙겐 대학의 정신과 의사 발터 슐테(Walter Schulte)가 고안한 고전적인 심리 진단 및 시지각 훈련 도구입니다. 원래 주의력의 안정성과 작업 능력을 평가하기 위해 만들어졌으며, 5x5 격자에 무작위로 분산된 1부터 25까지의 숫자를 시선을 중심에 둔 채 오름차순으로 신속하게 찾아내는 표준 프로토콜을 사용합니다.",
      "응용 스포츠 심리학에서는 '집중력 격자(Concentration Grid)'(Harris & Harris, 1984)라는 이름으로 발전하여 테니스, 모터스포츠, 야구 선수들이 시간 압박 속에서 시각 탐색 속도와 주의 집중력을 단련하는 핵심 도구로 채택되었습니다. 8~11세 아동을 대상으로 한 사건관련전위(ERP) 뇌파 연구에 따르면, 연속적인 순차 탐색은 단일 탐색에 비해 훨씬 높은 인지 자원을 소모하며 색상 간섭 자극이 추가될 때 뇌파 잠복기가 뚜렷하게 지연됨이 입증되었습니다 (Lu et al., 2022).",
      "SkillDrills 슐테 테이블 트레이너는 이 고전적 검사를 현대적인 지속 수행 과제(Continuous Performance Task)로 재구성했습니다. 고정된 단일 판이 아닌 3x3에서 8x8까지 격자가 동적으로 확장되며, 5x5 단계부터는 숫자에 미세한 회전 노이즈가 가미되어 45초라는 엄격한 시간 제한 속에서 시야각의 한계와 중심와-주변 시야 협응력을 극대화합니다 (Treisman & Gelade, 1980; Wolfe, 2007).",
      "정밀 측정 크로노메트리: 모든 터치 및 클릭 반응은 브라우저의 고해상도 performance.now() API를 통해 클라이언트 로컬에서 1밀리초(ms) 단위로 측정됩니다. 브라우저의 Spectre 보안 완화 조치(~1ms) 및 디스플레이 주사율(60Hz 기준 프레임당 약 16.7ms, Woods et al., 2015)을 고려하여 동일 기기 환경에서의 추세 변화를 기준으로 측정하는 것을 권장합니다.",
      "데이터 프라이버시: SkillDrills는 사용자의 어떠한 세션 기록이나 개인 점수도 외부 서버로 수집·전송하지 않습니다. 모든 훈련 기록과 설정값은 브라우저 로컬 저장소(localStorage)에만 안전하게 보관됩니다.",
      "본 훈련 도구는 스포츠 및 학업 능력 향상을 위한 무료 인지 훈련 게임입니다. ADHD, 난독증 또는 시각 인지 질환을 판정하거나 치료하기 위한 임상 진단 도구가 아니므로, 주의력이나 신경 인지적 이상 징후가 있을 경우 전문 의료기관을 방문하십시오."
    ],
    benchmarks: {
      title: "슐테 테이블 & 집중력 격자 성능 벤치마크 (45초 세션)",
      headers: ["퍼포먼스 등급", "세션 획득 점수", "최대 돌파 격자", "목표당 탐색 지연", "신경 인지 평가"],
      rows: [
        ["S+ (엘리트)", "8,000점 이상", "7x7 이상 (49칸+)", "300ms 미만 / 개", "세계적 수준의 시각 스캔 속도, 독보적인 주변 시야각 및 즉각적인 회전 불변성 보유."],
        ["S (마스터)", "6,000 – 7,999점", "6x6 (36칸)", "300 – 450ms / 개", "최상급 시각 탐색 효율; 매끄러운 부중심와 선행 캐싱(Lookahead)과 극소화된 고시 정지."],
        ["A (상급)", "4,500 – 5,999점", "5x5 (25칸)", "450 – 600ms / 개", "우수한 시야 정보 처리 능력; 중간 밀도 매트릭스에서 지속적인 쌍 단위 청킹 유지."],
        ["B (숙련자)", "3,000 – 4,499점", "4x4 (16칸)", "600 – 800ms / 개", "평균 이상의 탐색 규율; 격자가 확장될 때 중앙 재고정으로 인한 일시적 지연 발생."],
        ["C (중급)", "1,800 – 2,999점", "3x3 (9칸)", "800 – 1,100ms / 개", "표준적 기본 탐색력; 눈동자를 연속으로 크게 굴리는 중심와 사케드에 주로 의존."],
        ["D (기초/입문)", "1,800점 미만", "3x3 (일부 미달)", "1,100ms 초과 / 개", "시각적 혼잡(Crowding) 간섭; 잦은 안구 도약과 지체되는 숫자 변별력."]
      ],
      note: "이 벤치마크는 시각 탐색 및 주의력 인지 심리학 문헌(Lu et al., 2022; Treisman & Gelade, 1980; Rayner, 1998; Wolfe, 2007)에 기초한 지표입니다. 개인별 점수는 화면 주사율, 입력 장치 및 시각 피로도에 따라 달라질 수 있습니다."
    },
    techniques: {
      title: "슐테 테이블 기록 단축을 위한 4가지 신경 인지 기술",
      items: [
        {
          name: "중앙 고정점(Central Fixation) 유지",
          desc: "시선을 판의 정중앙에 고정하고 판 전체를 하나의 풍경 사진처럼 부드럽게 바라보세요. 눈동자가 숫자를 쫓아다니면 완료 시간이 2배 이상 길어집니다.",
          tips: "화면 중심점을 가볍게 응시하며 시야의 시야각을 좌우로 넓게 펼치세요."
        },
        {
          name: "다음 목표 숫자의 선행 버퍼링 (Parafoveal Pre-caching)",
          desc: "현재 숫자(예: 3번)를 누르는 찰나에 주변 시야로는 이미 4번과 5번의 대략적인 위치를 포착해 두어야 합니다 (Rayner, 1998).",
          tips: "클릭 직후 찾기를 시작하지 말고 항상 1~2개 앞선 숫자를 눈의 가장자리에 담아두세요."
        },
        {
          name: "속발음(Subvocalization) 억제",
          desc: "숫자를 찾으면서 머릿속으로 '하나, 둘, 셋...' 하고 소리 내어 읽으면 언어 뇌의 속도 한계(초당 3~4단어)에 갇히게 됩니다.",
          tips: "숫자의 이름을 소리로 읽지 말고 기하학적 형상(패턴)으로 즉각 인식하세요."
        },
        {
          name: "시야 긴장 완화와 호흡 조절",
          desc: "긴장으로 안면 근육이나 어깨가 굳으면 시야가 좁아지는 터널 비전(Tunnel Vision)이 발생합니다. 부드럽게 숨을 내쉬며 넓은 시야를 유지하세요.",
          tips: "눈에 힘을 풀고 멍하니 보듯 판 전체를 시야에 품으세요."
        }
      ]
    },
    steps: [
      "45초 세션을 시작하고 시선을 화면 정중앙에 편안하게 고정합니다.",
      "주변 시야를 활용해 숫자 1을 포착하고 즉시 터치합니다.",
      "흐름을 끊지 않고 오름차순으로 순차적인 숫자들을 연속 터치합니다.",
      "제한 시간 내에 격자를 클리어하여 더 큰 크기(4x4, 5x5, 6x6)로 확장합니다.",
      "세션 종료 후 최종 점수, 클리어한 격자 수, 정확도 통계를 점검합니다."
    ],
    audience: "속독 능력을 기르고자 하는 수험생, 독서가, 시각 탐색 속도와 주변 시야 반응을 극대화하고자 하는 게이머 및 스포츠 선수.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('lu2022', 'treisman1980', 'rayner1998', 'rayner2016', 'wolfe2007', 'woods2015'),
    related: [
      { href: "/ko/drills/cognitive/processing-speed/symbol-matching", label: "기호 일치 속도 테스트" },
      { href: "/ko/drills/cognitive/attention/concentration-stamina", label: "집중력 지구력 테스트" },
      { href: "/ko/drills/cognitive/processing-speed/rsvp-reader", label: "RSVP 속독 훈련기" },
      { href: "/ko/drills/reaction-speed/visual-tracking-speed-test", label: "시각 추적 속도 테스트" },
      { href: "/ko/drills/reaction-speed/reaction-game", label: "반응속도 테스트 게임" }
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
      <ConcentrationGridClient
        copy={{
          h1Keyword: "슐테 테이블",
          h1Suffix: " – 무료 온라인 주변시야 집중력 격자",
          caption: "확장되는 슐테 테이블 격자에서 숫자를 순서대로 터치하세요. 주변 시야 확장, 시야각 및 시각 탐색 속도를 체계적으로 훈련합니다.",
          statScore: "점수",
          statTime: "남은 시간",
          statGridSize: "격자 크기",
          statBest: "최고 점수",
          hudTarget: "목표 숫자:",
          statPoints: "획득 점수",
          statAccuracy: "적중 정확도",
          statGridsCleared: "완료 격자",
          statPeakGrid: "최대 격자",
          playAgainText: "다시 도전",
          shareText: "결과 공유",
          exitText: "나가기",
          stageCaption: "확장되는 슐테 격자 매트릭스에서 제한 시간 동안 숫자를 순서대로 빠르게 찾아 터치하세요.",
          rulesTitle: "훈련 규칙 & 점수 체계",
          aboutTitle: "슐테 테이블 & 집중력 격자 상세 안내",
          aboutLead: "슐테 테이블은 순차 탐색 과정에서 유효 주변 시야를 넓히고 안구 고정 지연 시간을 단축하기 위해 개발된 과학적 인지 도구입니다 (Lu et al., 2022; Rayner, 1998).",
          aboutText: "집중력 격자는 점진적인 시각 밀집(Visual Crowding) 환경에서 빠른 안구 도약(Saccades)과 선택적 주의 집중을 훈련합니다 (Treisman & Gelade, 1980; Wolfe, 2007).\n\n규칙적인 훈련은 미세 사케드 효율성을 높이고 시각 산만을 억제하여 고도의 집중력을 형성합니다.\n\n45초 고정 세션으로 진행되므로 운에 기댄 난타보다 지속적인 침착성과 정확도가 높은 점수를 결정합니다.",
          aboutCards: [
            { title: "누구에게 필요한가요?", text: "속독 능력을 기르고자 하는 학습자, 광범위한 정보 처리가 필요한 엘리트 운동선수 및 E-스포츠 플레이어.", color: "bg-blue-600" },
            { title: "훈련되는 인지 역량", text: "시각 탐색 속도, 미세 사케드 안구 운동 효율성, 공간 스캐닝 규율, 지속적 주의 집중력.", color: "bg-emerald-600" },
            { title: "주변 시야 확장", text: "격자가 커질수록 시선을 중앙에 둔 채 눈을 굴리지 않고 더 넓은 영역의 숫자를 인지해야 합니다.", color: "bg-purple-600" }
          ],
          rulesItems: [
            { title: "순차 탐색", text: "격자 위의 1번부터 시작하여 가장 높은 숫자까지 오름차순으로 빠짐없이 터치합니다." },
            { title: "확장 격자", text: "한 격자를 모두 클리어하면 다음 크기(3x3 → 4x4 → 5x5...)로 확장되어 더 넓은 시야를 시험합니다." },
            { title: "45초 단일 세션", text: "세션은 정확히 45초 동안 지속됩니다. 판을 클리어해도 타이머는 늘어나지 않습니다." },
            { title: "정확도 관리", text: "잘못 터치하면 시각 경고가 발생하며 정확도가 하락합니다. 신중하게 스캔한 뒤 터치하세요." }
          ]
        }}
      />
      <DrillGuide guide={concentrationGridGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="cognitive"
          currentHref="/drills/cognitive/focus/concentration-grid"
          locale="ko"
        />
      </div>
    </>
  );
}
