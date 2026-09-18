import SymbolMatchingClient from '@/app/drills/cognitive/processing-speed/symbol-matching/SymbolMatchingClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "기호 숫자 매칭 인지속도・SDMT 인지 검사 – 정보처리속도 테스트 | SkillDrills",
  description: "무료 온라인 기호 숫자 매칭 인지 검사(SDMT). 고유 기호와 숫자의 매핑 관계를 신속히 대조하여 정보 처리 속도, 시각 탐색 효율성, 단기 연상 기억력을 정밀하게 측정합니다.",
  keywords: ["기호 숫자 매칭 인지속도", "SDMT 인지 검사", "정보처리속도 테스트", "기호 쓰기 검사 온라인", "DSST 테스트", "시각 탐색 검사", "단기 연상기억 훈련", "두뇌 인지속도 측정", "신경심리 검사 무료", "성인 뇌 반응속도",
    "기호숫자검사",
    "웨슬러 인지처리속도"],
  openGraph: {
    title: "기호 숫자 매칭 인지속도・SDMT 인지 검사 – 정보처리속도 테스트 | SkillDrills",
    description: "무료 온라인 기호 숫자 매칭 인지 검사(SDMT). 고유 기호와 숫자의 매핑 관계를 신속히 대조하여 정보 처리 속도, 시각 탐색 효율성, 단기 연상 기억력을 정밀하게 측정합니다.",
    type: 'article',
    url: 'https://skilldrills.online/ko/drills/cognitive/processing-speed/symbol-matching',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "기호 숫자 매칭 인지속도・SDMT 인지 검사 – 정보처리속도 테스트 | SkillDrills",
    description: "무료 온라인 기호 숫자 매칭 인지 검사(SDMT). 고유 기호와 숫자의 매핑 관계를 신속히 대조하여 정보 처리 속도, 시각 탐색 효율성, 단기 연상 기억력을 정밀하게 측정합니다.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/cognitive/processing-speed/symbol-matching',
    languages: getAlternateLanguages('/drills/cognitive/processing-speed/symbol-matching'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "SkillDrills 홈",
      "item": "https://skilldrills.online/ko"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "훈련 허브",
      "item": "https://skilldrills.online/ko/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "인지·집중력 훈련",
      "item": "https://skilldrills.online/ko/drills/cognitive"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "기호 숫자 매칭 (SDMT)",
      "item": "https://skilldrills.online/ko/drills/cognitive/processing-speed/symbol-matching"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "기호 숫자 매칭 SDMT 인지속도 측정기",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "KRW"
  },
  "description": "무료 온라인 기호 숫자 매칭 인지 검사(SDMT). 고유 기호와 숫자의 매핑 관계를 신속히 대조하여 정보 처리 속도, 시각 탐색 효율성, 단기 연상 기억력을 정밀하게 측정합니다.",
  "url": "https://skilldrills.online/ko/drills/cognitive/processing-speed/symbol-matching",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online"
  },
  "inLanguage": "ko-KR",
  "dateModified": "2026-09-11"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "기호 숫자 매칭 인지속도・SDMT 인지 검사 – 정보처리속도 테스트",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "KRW"
  },
  "url": "https://skilldrills.online/ko/drills/cognitive/processing-speed/symbol-matching",
  "inLanguage": "ko-KR",
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "기호 숫자 매칭 SDMT – 기호 숫자 고속 대조 게임",
  "url": "https://skilldrills.online/ko/drills/cognitive/processing-speed/symbol-matching",
  "description": "무료 온라인 기호 숫자 매칭 인지 검사(SDMT). 고유 기호와 숫자의 매핑 관계를 신속히 대조하여 정보 처리 속도, 시각 탐색 효율성, 단기 연상 기억력을 정밀하게 측정합니다.",
  "genre": [
    "Action",
    "Brain Game",
    "Cognitive Training"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop",
    "Mobile"
  ],
  "applicationCategory": "Game",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "KRW"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "기호 숫자 양식 검사(SDMT, Symbol Digit Modalities Test)란?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Aaron Smith(1973)가 개발한 표준 신경심리 평가로, 기호와 숫자의 대응표를 참조하여 신속하게 대조 입력하는 정보 처리 속도 검사입니다."
      }
    },
    {
      "@type": "Question",
      "name": "DSST 검사와의 차이점은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DSST는 숫자를 보고 복잡한 기호를 직접 그려야 하지만, SDMT는 기호를 보고 친숙한 숫자를 입력하므로 순수한 대뇌 인지 속도를 정밀하게 분리해 냅니다."
      }
    },
    {
      "@type": "Question",
      "name": "어떤 두뇌 능력을 집중 측정하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "(1) 중추 정보 처리 속도, (2) 시각 탐색 기민성, (3) 단기 연상 기억 형성력, (4) 지속적 집행 주의력입니다."
      }
    },
    {
      "@type": "Question",
      "name": "정상 성인의 평균 수행 기준은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "20~34세 정상 성인의 경우 90초 동안 대략 65~75개의 정답을 입력하는 것이 표준 임상 기준치입니다(Smith, 1973; Der & Deary, 2006)."
      }
    },
    {
      "@type": "Question",
      "name": "공식적인 의료 진단 검사인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "아닙니다. 본 훈련은 동일한 인지 패러다임을 차용한 무료 두뇌 트레이닝 도구이며 질환의 진단 목적으로 사용할 수 없습니다."
      }
    },
    {
      "@type": "Question",
      "name": "대응표 암기가 속도에 미치는 영향은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "기호와 숫자의 짝을 작업기억에 초반에 각인시키면 상단 표로 시선이 오가는 불필요한 안구 이동을 제거하여 속도가 급상승합니다."
      }
    },
    {
      "@type": "Question",
      "name": "점수를 극대화하는 핵심 전략은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "상단 표와 중앙 영역 사이의 시선 이동 반경을 최소화하고, 기호를 2~3개씩 묶어서(Chunking) 처리하는 것입니다."
      }
    },
    {
      "@type": "Question",
      "name": "나이가 들면 정보 처리 속도가 저하되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, 자연스러운 노화에 따라 처리 속도가 다소 느려지지만 꾸준한 인지 운동과 유산소 활동으로 예방할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "권장 훈련 주기는 어떻게 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "하루 10분 정도의 반복 플레이가 시각 스캔 속도와 즉각 연상 기억력을 끌어올리는 데 가장 좋습니다."
      }
    },
    {
      "@type": "Question",
      "name": "모바일 터치 환경에서도 정밀한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, 모바일 화면 하단에 1~6 숫자 키패드가 최적 크기로 배치되어 있어 편리하게 검사할 수 있습니다."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "기호 숫자 매칭 인지속도・SDMT 인지 검사",
  "description": "무료 온라인 기호 숫자 매칭 인지 검사(SDMT). 고유 기호와 숫자의 매핑 관계를 신속히 대조하여 정보 처리 속도, 시각 탐색 효율성, 단기 연상 기억력을 정밀하게 측정합니다.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "상단 기호-숫자 매칭 표 확인",
      "text": "상단 헤더에 나열된 6개 기호와 1~6번 숫자의 연결 관계를 파악합니다.",
      "url": "https://skilldrills.online/ko/drills/cognitive/processing-speed/symbol-matching#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "중앙 제시 기호 순간 식별",
      "text": "중앙 박스에 출현하는 타깃 기호를 눈으로 즉시 포착합니다.",
      "url": "https://skilldrills.online/ko/drills/cognitive/processing-speed/symbol-matching#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "일치하는 숫자 키 즉각 입력",
      "text": "작업기억 또는 신속한 표 스캔을 통해 해당하는 숫자 키패드를 탭합니다.",
      "url": "https://skilldrills.online/ko/drills/cognitive/processing-speed/symbol-matching#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "연속적인 연상 리듬 유지",
      "text": "기호와 숫자의 연합을 자동화하여 끊김 없는 고속 스트릭을 달성합니다.",
      "url": "https://skilldrills.online/ko/drills/cognitive/processing-speed/symbol-matching#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('smith1973', 'der2006', 'woods2015'),
  intro: {
    title: "기호 숫자 매칭 인지속도・SDMT 인지 검사 – 정보처리속도 테스트",
    paragraphs: [
      "무료 온라인 기호 숫자 매칭 인지 검사(SDMT). 고유 기호와 숫자의 매핑 관계를 신속히 대조하여 정보 처리 속도, 시각 탐색 효율성, 단기 연상 기억력을 정밀하게 측정합니다.",
      "DSST는 숫자를 보고 복잡한 기호를 직접 그려야 하지만, SDMT는 기호를 보고 친숙한 숫자를 입력하므로 순수한 대뇌 인지 속도를 정밀하게 분리해 냅니다.",
      "(1) 중추 정보 처리 속도, (2) 시각 탐색 기민성, (3) 단기 연상 기억 형성력, (4) 지속적 집행 주의력입니다.",
    ],
  },
  benchmarks: {
    title: '인지 수행 능력 표준 평가 벤치마크',
    headers: ['등급 (Tier)', '호칭 (Rank)', '평가 기준', '도달 수준', '정확도', '백분위'],
    rows: [
      { tier: 'Tier 1', rank: '그랜드마스터 / 초고속 연상기호 엘리트', stat: '상위 1%', level: '마스터리 (최상위)', accuracy: '98% 이상', percentile: '상위 1%' },
      { tier: 'Tier 2', rank: '상급 기호 연합 인지자', stat: '상위 5%', level: '다이아몬드 (우수)', accuracy: '94–97%', percentile: '상위 5%' },
      { tier: 'Tier 3', rank: '숙련 시각 탐색자', stat: '상위 15%', level: '플래티넘 (숙련)', accuracy: '88–93%', percentile: '상위 15%' },
      { tier: 'Tier 4', rank: '일반 성인 표준', stat: '상위 50%', level: '골드 (표준)', accuracy: '78–87%', percentile: '상위 50%' },
      { tier: 'Tier 5', rank: '초보 / 입문 기준선', stat: '기준선 (기초)', level: '실버 (기초)', accuracy: '78% 미만', percentile: '기준선 (하위)' },
    ],
  },
  protocols: {
    title: '두뇌 처리 속도와 집중력을 극대화하는 4대 훈련 프로토콜',
    description: '스미스 기호 숫자 양식 검사(SDMT, Smith, 1973) 및 신경인지 처리 속도 규준에 기반한, 시각-기호 즉각 연합과 작업기억 전환을 극대화하는 과학적 인지 훈련 프로토콜입니다.',
    items: [
      { title: "상단 기호-숫자 매칭 표 확인", description: "상단 헤더에 나열된 6개 기호와 1~6번 숫자의 연결 관계를 파악합니다." },
      { title: "중앙 제시 기호 순간 식별", description: "중앙 박스에 출현하는 타깃 기호를 눈으로 즉시 포착합니다." },
      { title: "일치하는 숫자 키 즉각 입력", description: "작업기억 또는 신속한 표 스캔을 통해 해당하는 숫자 키패드를 탭합니다." },
      { title: "연속적인 연상 리듬 유지", description: "기호와 숫자의 연합을 자동화하여 끊김 없는 고속 스트릭을 달성합니다." },
    ],
  },
  faqs: {
    title: '자주 묻는 질문 (FAQ)',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function LocalizedCognitivePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
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
      <SymbolMatchingClient copy={{ title: "기호 숫자 매칭 인지속도・SDMT 인지 검사 – 정보처리속도 테스트" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/ko/drills/cognitive/processing-speed/symbol-matching" />
      </div>
    </>
  );
}
