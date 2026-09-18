import DualTargetFlowClient from '@/app/drills/cognitive/attention/multi-tasking/DualTargetFlowClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "멀티태스킹 테스트・이중 표적 추적 훈련 – 병렬 인지 속도 측정 | SkillDrills",
  description: "무료 멀티태스킹 테스트. 반대 방향으로 흐르는 두 개의 도형 스트림을 동시에 추적하여 대뇌 반구 협응력과 과제 전환 비용을 정밀하게 진단합니다.",
  keywords: ["멀티태스킹 테스트", "이중 표적 추적 훈련", "멀티태스킹 게임", "병렬 처리 검사", "과제 전환 비용 측정", "주의 전환 훈련", "대뇌 반구 협응 검사", "인지 유연성 테스트", "두뇌 멀티태스킹", "시각 스트림 추적", "분할주의 집중력", "집중력 분할 검사"],
  openGraph: {
    title: "멀티태스킹 테스트・이중 표적 추적 훈련 – 병렬 인지 속도 측정 | SkillDrills",
    description: "무료 멀티태스킹 테스트. 반대 방향으로 흐르는 두 개의 도형 스트림을 동시에 추적하여 대뇌 반구 협응력과 과제 전환 비용을 정밀하게 진단합니다.",
    type: 'article',
    url: 'https://skilldrills.online/ko/drills/cognitive/attention/multi-tasking',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "멀티태스킹 테스트・이중 표적 추적 훈련 – 병렬 인지 속도 측정 | SkillDrills",
    description: "무료 멀티태스킹 테스트. 반대 방향으로 흐르는 두 개의 도형 스트림을 동시에 추적하여 대뇌 반구 협응력과 과제 전환 비용을 정밀하게 진단합니다.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/cognitive/attention/multi-tasking',
    languages: getAlternateLanguages('/drills/cognitive/attention/multi-tasking'),
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
      "name": "멀티태스킹 테스트",
      "item": "https://skilldrills.online/ko/drills/cognitive/attention/multi-tasking"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "멀티태스킹 이중 표적 추적 트레이너",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "KRW"
  },
  "description": "무료 멀티태스킹 테스트. 반대 방향으로 흐르는 두 개의 도형 스트림을 동시에 추적하여 대뇌 반구 협응력과 과제 전환 비용을 정밀하게 진단합니다.",
  "url": "https://skilldrills.online/ko/drills/cognitive/attention/multi-tasking",
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
  "name": "멀티태스킹 테스트・이중 표적 추적 훈련 – 병렬 인지 속도 측정",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "KRW"
  },
  "url": "https://skilldrills.online/ko/drills/cognitive/attention/multi-tasking",
  "inLanguage": "ko-KR",
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "멀티태스킹 테스트 – 대향 스트림 동시 추적 게임",
  "url": "https://skilldrills.online/ko/drills/cognitive/attention/multi-tasking",
  "description": "무료 멀티태스킹 테스트. 반대 방향으로 흐르는 두 개의 도형 스트림을 동시에 추적하여 대뇌 반구 협응력과 과제 전환 비용을 정밀하게 진단합니다.",
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
      "name": "멀티태스킹 테스트(Dual-Target Flow)란?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "서로 반대 방향으로 이동하는 두 개의 시각적 스트림을 주변 시야로 동시에 관찰하며 일치하는 표적만 선별하는 인지 능력 테스트입니다."
      }
    },
    {
      "@type": "Question",
      "name": "과제 전환 비용(Switch Cost, Rogers & Monsell 1995)이란?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "서로 다른 규칙을 교대로 처리할 때 뇌의 작업 기억 재구성으로 인해 반응 속도가 지연되는 현상입니다."
      }
    },
    {
      "@type": "Question",
      "name": "인간의 뇌는 진정한 멀티태스킹이 가능한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "복잡한 결정이 필요한 과제에서 뇌는 완전한 병렬 처리가 아닌 극도로 빠른 시분할 교대 처리를 수행합니다(Pashler, 1994)."
      }
    },
    {
      "@type": "Question",
      "name": "미디어 멀티태스킹의 부작용(Ophir et al., 2009)은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "주의가 산만해지고 관련 없는 시각 자극을 차단하는 억제 기능이 약화될 수 있다는 연구 결과가 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "양측 반구 시각 훈련의 뇌과학적 효과는?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "좌우 시야를 동시에 처리함으로써 뇌량을 통한 좌우 반구 간 정보 교환 속도를 단련합니다."
      }
    },
    {
      "@type": "Question",
      "name": "높은 점수를 얻기 위한 시선 처리 비법은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "한쪽 스트림에 시선을 고정하지 말고 두 흐름의 중간 지점을 멍하니 바라보며 넓은 주변시를 활용하는 것입니다."
      }
    },
    {
      "@type": "Question",
      "name": "난이도 상승에 따른 변화는?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "스트림 이동 속도가 빨라지고 도형이 다양해져 더욱 빠른 판단력이 요구됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "모니터 주사율이 멀티태스킹에 미치는 영향은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "144Hz 이상 환경은 고속 이동 중인 도형의 경계선을 잔상 없이 보여주어 오인율을 낮춥니다(Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "적정 훈련 빈도는?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "매일 10~15분 동안 집중해서 플레이하는 것이 인지적 탈진을 예방하며 뇌를 자극하는 길입니다."
      }
    },
    {
      "@type": "Question",
      "name": "모바일 기기에서도 원활한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, 모바일 세로 모드(상하 흐름)와 가로 모드(좌우 흐름) 모두 완벽히 지원합니다."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "멀티태스킹 테스트・이중 표적 추적 훈련",
  "description": "무료 멀티태스킹 테스트. 반대 방향으로 흐르는 두 개의 도형 스트림을 동시에 추적하여 대뇌 반구 협응력과 과제 전환 비용을 정밀하게 진단합니다.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "스트림 중심 지점 소프트 포커스",
      "text": "두 갈래 흐름의 정중앙에 시선을 두고 양쪽 화면을 균등하게 감시합니다.",
      "url": "https://skilldrills.online/ko/drills/cognitive/attention/multi-tasking#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "목표 형상 템플릿 인지",
      "text": "상단 헤더에 지정된 기준 표적 모양을 눈에 익힙니다.",
      "url": "https://skilldrills.online/ko/drills/cognitive/attention/multi-tasking#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "유효 표적 순간 타격",
      "text": "흘러가는 도형 중 목표와 정확히 일치하는 개체만 골라 빠르게 터치합니다.",
      "url": "https://skilldrills.online/ko/drills/cognitive/attention/multi-tasking#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "가속 구간 리듬 유지",
      "text": "속도가 점진적으로 빨라져도 호흡을 가다듬고 일정한 타격 리듬을 사수합니다.",
      "url": "https://skilldrills.online/ko/drills/cognitive/attention/multi-tasking#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('rogers1995', 'monsell2003', 'pashler1994', 'wickens2002', 'ophir2009', 'woods2015'),
  intro: {
    title: "멀티태스킹 테스트・이중 표적 추적 훈련 – 병렬 인지 속도 측정",
    paragraphs: [
      "무료 멀티태스킹 테스트. 반대 방향으로 흐르는 두 개의 도형 스트림을 동시에 추적하여 대뇌 반구 협응력과 과제 전환 비용을 정밀하게 진단합니다.",
      "서로 다른 규칙을 교대로 처리할 때 뇌의 작업 기억 재구성으로 인해 반응 속도가 지연되는 현상입니다.",
      "복잡한 결정이 필요한 과제에서 뇌는 완전한 병렬 처리가 아닌 극도로 빠른 시분할 교대 처리를 수행합니다(Pashler, 1994).",
    ],
  },
  benchmarks: {
    title: '인지 수행 능력 표준 평가 벤치마크',
    headers: ['등급 (Tier)', '호칭 (Rank)', '평가 기준', '도달 수준', '정확도', '백분위'],
    rows: [
      { tier: 'Tier 1', rank: '그랜드마스터 / 멀티태스킹 엘리트', stat: '상위 1%', level: '마스터리 (최상위)', accuracy: '98% 이상', percentile: '상위 1%' },
      { tier: 'Tier 2', rank: '고급 병렬 처리자', stat: '상위 5%', level: '다이아몬드 (우수)', accuracy: '94–97%', percentile: '상위 5%' },
      { tier: 'Tier 3', rank: '숙련 조작자', stat: '상위 15%', level: '플래티넘 (숙련)', accuracy: '88–93%', percentile: '상위 15%' },
      { tier: 'Tier 4', rank: '일반 성인 표준', stat: '상위 50%', level: '골드 (표준)', accuracy: '78–87%', percentile: '상위 50%' },
      { tier: 'Tier 5', rank: '초보 / 입문 기준선', stat: '기준선 (기초)', level: '실버 (기초)', accuracy: '78% 미만', percentile: '기준선 (하위)' },
    ],
  },
  protocols: {
    title: '두뇌 처리 속도와 집중력을 극대화하는 4대 훈련 프로토콜',
    description: '과제 전환 비용(Rogers & Monsell, 1995) 최소화와 대뇌 반구 간 정보 통합 능력을 극대화하는 과학적 멀티태스킹 훈련 프로토콜입니다.',
    items: [
      { title: "스트림 중심 지점 소프트 포커스", description: "두 갈래 흐름의 정중앙에 시선을 두고 양쪽 화면을 균등하게 감시합니다." },
      { title: "목표 형상 템플릿 인지", description: "상단 헤더에 지정된 기준 표적 모양을 눈에 익힙니다." },
      { title: "유효 표적 순간 타격", description: "흘러가는 도형 중 목표와 정확히 일치하는 개체만 골라 빠르게 터치합니다." },
      { title: "가속 구간 리듬 유지", description: "속도가 점진적으로 빨라져도 호흡을 가다듬고 일정한 타격 리듬을 사수합니다." },
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
      <DualTargetFlowClient copy={{ title: "멀티태스킹 테스트・이중 표적 추적 훈련 – 병렬 인지 속도 측정" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/ko/drills/cognitive/attention/multi-tasking" />
      </div>
    </>
  );
}
