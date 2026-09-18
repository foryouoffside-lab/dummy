import RSVPReaderClient from '@/app/drills/cognitive/processing-speed/rsvp-reader/RSVPReaderClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "속독 연습 RSVP・읽기 속도 테스트 – 분당 단어수 WPM 측정 | SkillDrills",
  description: "무료 온라인 RSVP 속독 연습 및 독서 속도 검사. 안구 이동을 없애고 단어 최적 인식점(ORP)에 텍스트를 초고속 제시하여 최대 850 WPM의 정보 처리 능력을 평가합니다.",
  keywords: ["속독 연습 RSVP", "읽기 속도 테스트", "분당 단어수 WPM 측정", "속독 프로그램 무료", "시선 이동 없는 독서", "최적 인식점 ORP", "텍스트 정보처리 속도", "온라인 속독 훈련", "독서 속도 측정", "WPM 테스트",
    "RSVP 속독 훈련",
    "무료 속독 프로그램"],
  openGraph: {
    title: "속독 연습 RSVP・읽기 속도 테스트 – 분당 단어수 WPM 측정 | SkillDrills",
    description: "무료 온라인 RSVP 속독 연습 및 독서 속도 검사. 안구 이동을 없애고 단어 최적 인식점(ORP)에 텍스트를 초고속 제시하여 최대 850 WPM의 정보 처리 능력을 평가합니다.",
    type: 'article',
    url: 'https://skilldrills.online/ko/drills/cognitive/processing-speed/rsvp-reader',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "속독 연습 RSVP・읽기 속도 테스트 – 분당 단어수 WPM 측정 | SkillDrills",
    description: "무료 온라인 RSVP 속독 연습 및 독서 속도 검사. 안구 이동을 없애고 단어 최적 인식점(ORP)에 텍스트를 초고속 제시하여 최대 850 WPM의 정보 처리 능력을 평가합니다.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/cognitive/processing-speed/rsvp-reader',
    languages: getAlternateLanguages('/drills/cognitive/processing-speed/rsvp-reader'),
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
      "name": "RSVP 속독 테스트",
      "item": "https://skilldrills.online/ko/drills/cognitive/processing-speed/rsvp-reader"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "RSVP 속독 및 어휘 정보처리 속도 측정기",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "KRW"
  },
  "description": "무료 온라인 RSVP 속독 연습 및 독서 속도 검사. 안구 이동을 없애고 단어 최적 인식점(ORP)에 텍스트를 초고속 제시하여 최대 850 WPM의 정보 처리 능력을 평가합니다.",
  "url": "https://skilldrills.online/ko/drills/cognitive/processing-speed/rsvp-reader",
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
  "name": "속독 연습 RSVP・읽기 속도 테스트 – 분당 단어수 WPM 측정",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "KRW"
  },
  "url": "https://skilldrills.online/ko/drills/cognitive/processing-speed/rsvp-reader",
  "inLanguage": "ko-KR",
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "RSVP 속독 테스트 – 초고속 어휘 제시 및 표적어 검출 게임",
  "url": "https://skilldrills.online/ko/drills/cognitive/processing-speed/rsvp-reader",
  "description": "무료 온라인 RSVP 속독 연습 및 독서 속도 검사. 안구 이동을 없애고 단어 최적 인식점(ORP)에 텍스트를 초고속 제시하여 최대 850 WPM의 정보 처리 능력을 평가합니다.",
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
      "name": "RSVP(Rapid Serial Visual Presentation) 속독이란?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "화면의 단일 지점에 단어를 한 번에 하나씩 연속 점멸 표시하여 안구 이동 시간 낭비를 제거하는 최첨단 속독 기법입니다."
      }
    },
    {
      "@type": "Question",
      "name": "최적 인식점(Optimal Recognition Point: ORP)이란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "단어의 철자 중 인간의 시각 피질이 가장 효율적으로 단어 전체를 해독할 수 있는 기준 글자 위치(보통 중심보다 약간 좌측)입니다(Rayner, 1998)."
      }
    },
    {
      "@type": "Question",
      "name": "일반 독서 속도가 느린 근본적인 이유는?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "전체 독서 시간의 약 80%가 단어 사이를 뛰어넘는 안구 도약 운동(사카드)과 되돌아 읽기(회귀)에 소모되기 때문입니다(Rayner, 2016)."
      }
    },
    {
      "@type": "Question",
      "name": "성인의 평균 독서 속도(WPM)는?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "일반 성인의 평균 독서 속도는 200~250 WPM이며, 훈련된 속독가는 400~600 WPM에 달합니다."
      }
    },
    {
      "@type": "Question",
      "name": "이 드릴에서 제공하는 5단계 속도는?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1단계(250 WPM)부터 시작하여 2단계(350 WPM), 3단계(480 WPM), 4단계(650 WPM), 최고 5단계(850 WPM)까지 확장됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "표적 단어 검출 버튼이 존재하는 이유는?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "단어를 무의미하게 흘려보내는 것이 아니라 실제 대뇌에서 텍스트의 의미를 온전히 인지하고 있는지 확인하기 위함입니다."
      }
    },
    {
      "@type": "Question",
      "name": "RSVP 훈련이 대뇌 정보 처리에 주는 이점은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "시각 어휘 처리 영역(VWFA)의 활성도를 높이고 단기 작업기억 버퍼 용량을 비약적으로 증대시킵니다."
      }
    },
    {
      "@type": "Question",
      "name": "모니터 주사율의 중요성은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "144Hz 이상의 주사율은 초고속으로 단어가 바뀔 때 프레임 드랍 없이 깨끗한 가독성을 제공합니다(Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "어떤 사람에게 가장 유용한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "방대한 문서를 읽어야 하는 수험생, 연구원, 화면의 텍스트 브리핑을 신속히 파악해야 하는 게이머에게 탁월합니다."
      }
    },
    {
      "@type": "Question",
      "name": "별도 가입이나 프로그램 설치가 필요한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "아닙니다. SkillDrills는 웹 브라우저에서 100% 무료로 바로 작동합니다."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "속독 연습 RSVP・읽기 속도 테스트",
  "description": "무료 온라인 RSVP 속독 연습 및 독서 속도 검사. 안구 이동을 없애고 단어 최적 인식점(ORP)에 텍스트를 초고속 제시하여 최대 850 WPM의 정보 처리 능력을 평가합니다.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "도래할 목표 단어 숙지",
      "text": "상단 배너에 안내되는 '출현 예정 표적 단어'를 기억합니다.",
      "url": "https://skilldrills.online/ko/drills/cognitive/processing-speed/rsvp-reader#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "중앙 ORP 피벗 글자에 시선 고정",
      "text": "눈동자를 굴리지 말고 중앙의 붉은 피벗 문자에 시선을 가만히 고정합니다.",
      "url": "https://skilldrills.online/ko/drills/cognitive/processing-speed/rsvp-reader#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "초고속 텍스트 스트림 수용",
      "text": "중심와로 쏟아져 들어오는 텍스트 어휘를 읽어내며 의미를 이해합니다.",
      "url": "https://skilldrills.online/ko/drills/cognitive/processing-speed/rsvp-reader#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "표적 단어 등장 즉시 포착 탭",
      "text": "목표 단어가 깜빡이며 지나가는 찰나 'TARGET DETECTED'를 번개처럼 터치합니다.",
      "url": "https://skilldrills.online/ko/drills/cognitive/processing-speed/rsvp-reader#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('rayner1998', 'rayner2016', 'woods2015'),
  intro: {
    title: "속독 연습 RSVP・읽기 속도 테스트 – 분당 단어수 WPM 측정",
    paragraphs: [
      "무료 온라인 RSVP 속독 연습 및 독서 속도 검사. 안구 이동을 없애고 단어 최적 인식점(ORP)에 텍스트를 초고속 제시하여 최대 850 WPM의 정보 처리 능력을 평가합니다.",
      "단어의 철자 중 인간의 시각 피질이 가장 효율적으로 단어 전체를 해독할 수 있는 기준 글자 위치(보통 중심보다 약간 좌측)입니다(Rayner, 1998).",
      "전체 독서 시간의 약 80%가 단어 사이를 뛰어넘는 안구 도약 운동(사카드)과 되돌아 읽기(회귀)에 소모되기 때문입니다(Rayner, 2016).",
    ],
  },
  benchmarks: {
    title: '인지 수행 능력 표준 평가 벤치마크',
    headers: ['등급 (Tier)', '호칭 (Rank)', '평가 기준', '도달 수준', '정확도', '백분위'],
    rows: [
      { tier: 'Tier 1', rank: '그랜드마스터 / 초고속 정보처리 엘리트', stat: '상위 1%', level: '마스터리 (최상위)', accuracy: '98% 이상', percentile: '상위 1%' },
      { tier: 'Tier 2', rank: '상급 속독 인지자', stat: '상위 5%', level: '다이아몬드 (우수)', accuracy: '94–97%', percentile: '상위 5%' },
      { tier: 'Tier 3', rank: '숙련 정보 흡수자', stat: '상위 15%', level: '플래티넘 (숙련)', accuracy: '88–93%', percentile: '상위 15%' },
      { tier: 'Tier 4', rank: '일반 성인 표준', stat: '상위 50%', level: '골드 (표준)', accuracy: '78–87%', percentile: '상위 50%' },
      { tier: 'Tier 5', rank: '초보 / 입문 기준선', stat: '기준선 (기초)', level: '실버 (기초)', accuracy: '78% 미만', percentile: '기준선 (하위)' },
    ],
  },
  protocols: {
    title: '두뇌 처리 속도와 집중력을 극대화하는 4대 훈련 프로토콜',
    description: '최적 시각 인식점(ORP, Rayner, 1998) 고정과 안구 도약 운동(사카드) 낭비 제거에 기반한, 시각 어휘 처리 속도를 극대화하는 과학적 RSVP 속독 훈련 프로토콜입니다.',
    items: [
      { title: "도래할 목표 단어 숙지", description: "상단 배너에 안내되는 '출현 예정 표적 단어'를 기억합니다." },
      { title: "중앙 ORP 피벗 글자에 시선 고정", description: "눈동자를 굴리지 말고 중앙의 붉은 피벗 문자에 시선을 가만히 고정합니다." },
      { title: "초고속 텍스트 스트림 수용", description: "중심와로 쏟아져 들어오는 텍스트 어휘를 읽어내며 의미를 이해합니다." },
      { title: "표적 단어 등장 즉시 포착 탭", description: "목표 단어가 깜빡이며 지나가는 찰나 'TARGET DETECTED'를 번개처럼 터치합니다." },
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
      <RSVPReaderClient copy={{ title: "속독 연습 RSVP・읽기 속도 테스트 – 분당 단어수 WPM 측정" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/ko/drills/cognitive/processing-speed/rsvp-reader" />
      </div>
    </>
  );
}
