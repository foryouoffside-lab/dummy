import ConcentrationStaminaClient from '@/app/drills/cognitive/attention/concentration-stamina/ConcentrationStaminaClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "집중력 테스트・지속 주의력 검사 – 주의력 스태미나 측정 | SkillDrills",
  description: "무료 온라인 집중력 테스트(CPT 지속수행검사). 연속으로 점멸하는 자극 속에서 주의력 저하, 충동 억제 제어력, 규칙 전환 지구력을 정밀 평가하여 두뇌 집중 상태를 진단합니다.",
  keywords: ["집중력 테스트", "지속 주의력 검사", "CPT 지속수행검사", "주의력 결핍 테스트", "집중력 측정 무료", "뇌 지구력 테스트", "억제 제어력 검사", "성인 집중력 테스트", "주의력 훈련 게임", "두뇌 집중력",
    "지속주의력테스트",
    "성인adhd집중력검사"],
  openGraph: {
    title: "집중력 테스트・지속 주의력 검사 – 주의력 스태미나 측정 | SkillDrills",
    description: "무료 온라인 집중력 테스트(CPT 지속수행검사). 연속으로 점멸하는 자극 속에서 주의력 저하, 충동 억제 제어력, 규칙 전환 지구력을 정밀 평가하여 두뇌 집중 상태를 진단합니다.",
    type: 'article',
    url: 'https://skilldrills.online/ko/drills/cognitive/attention/concentration-stamina',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "집중력 테스트・지속 주의력 검사 – 주의력 스태미나 측정 | SkillDrills",
    description: "무료 온라인 집중력 테스트(CPT 지속수행검사). 연속으로 점멸하는 자극 속에서 주의력 저하, 충동 억제 제어력, 규칙 전환 지구력을 정밀 평가하여 두뇌 집중 상태를 진단합니다.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/cognitive/attention/concentration-stamina',
    languages: getAlternateLanguages('/drills/cognitive/attention/concentration-stamina'),
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
      "name": "집중력 테스트",
      "item": "https://skilldrills.online/ko/drills/cognitive/attention/concentration-stamina"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "집중력 지속수행평가(CPT) 트레이너",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "KRW"
  },
  "description": "무료 온라인 집중력 테스트(CPT 지속수행검사). 연속으로 점멸하는 자극 속에서 주의력 저하, 충동 억제 제어력, 규칙 전환 지구력을 정밀 평가하여 두뇌 집중 상태를 진단합니다.",
  "url": "https://skilldrills.online/ko/drills/cognitive/attention/concentration-stamina",
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
  "name": "집중력 테스트・지속 주의력 검사 – 주의력 스태미나 측정",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires a modern web browser with JavaScript support",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "KRW"
  },
  "url": "https://skilldrills.online/ko/drills/cognitive/attention/concentration-stamina",
  "inLanguage": "ko-KR",
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "집중력 테스트 – 지속 주의력 및 충동 억제 게임",
  "url": "https://skilldrills.online/ko/drills/cognitive/attention/concentration-stamina",
  "description": "무료 온라인 집중력 테스트(CPT 지속수행검사). 연속으로 점멸하는 자극 속에서 주의력 저하, 충동 억제 제어력, 규칙 전환 지구력을 정밀 평가하여 두뇌 집중 상태를 진단합니다.",
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
      "name": "지속수행검사(CPT, Continuous Performance Test)란?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "연속적으로 제시되는 시각 자극 중에서 목표 자극에만 반응하고 방해 자극은 억제하는 능력을 장시간 측정하는 표준 신경심리 검사입니다."
      }
    },
    {
      "@type": "Question",
      "name": "맥워스의 각성 저하 법칙(Mackworth, 1948)이란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "레이더 감시 연구에서 유래한 이론으로, 인간의 주의 집중 효율은 지속적 과제 수행 20~30분 후 급격히 저하된다는 사실을 입증했습니다."
      }
    },
    {
      "@type": "Question",
      "name": "모음과 소수 규칙 교대가 의미하는 바는?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "10초마다 판별 기준이 뒤바뀌므로 전두엽의 작업기억 갱신과 과제 전환 능력(Monsell, 2003)을 극한으로 시험합니다."
      }
    },
    {
      "@type": "Question",
      "name": "선택적 주의와 지속적 주의의 차이점은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "선택적 주의가 특정 순간 유해 자극을 걸러내는 필터라면(Broadbent, 1958), 지속적 주의는 집중을 끝까지 유지하는 인지적 지구력입니다."
      }
    },
    {
      "@type": "Question",
      "name": "오답 클릭(False Alarm)이 잦은 이유는?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "목표물이 아닌 자극을 보고 충동적으로 손가락이 나가는 현상으로, 전두엽의 반응 억제 조절력이 흔들릴 때 나타납니다(Robertson et al., 1997)."
      }
    },
    {
      "@type": "Question",
      "name": "훈련을 통해 집중 지속 시간을 늘릴 수 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, 점진적으로 난이도를 높이는 지속 주의력 과제를 반복하면 뇌의 각성 유지 회로가 강화됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "유산소 운동이 주의력 유지에 미치는 효과는?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "가벼운 운동은 대뇌 혈류량을 늘리고 도파민 분비를 촉진하여 지속 주의력 피로 저항성을 높여줍니다."
      }
    },
    {
      "@type": "Question",
      "name": "모니터 주사율이 검사에 미치는 영향은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "144Hz 이상의 디스플레이는 자극 출현 타이밍의 오차를 5ms 이내로 줄여주어(Woods et al., 2015) 정밀한 측정을 보장합니다."
      }
    },
    {
      "@type": "Question",
      "name": "추천하는 일일 훈련 방식은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "공부나 업무 시작 전 10분간 진행하면 뇌의 기본모드신경망(DMN)을 억제하고 집중에 최적화된 상태를 만듭니다."
      }
    },
    {
      "@type": "Question",
      "name": "검사 비용은 무료인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, SkillDrills의 모든 인지 검사는 회원가입 없이 100% 무료로 브라우저에서 실행됩니다."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "집중력 테스트・지속 주의력 검사",
  "description": "무료 온라인 집중력 테스트(CPT 지속수행검사). 연속으로 점멸하는 자극 속에서 주의력 저하, 충동 억제 제어력, 규칙 전환 지구력을 정밀 평가하여 두뇌 집중 상태를 진단합니다.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "화면 중앙 응시 및 기준 규칙 확인",
      "text": "시선을 중앙 박스에 고정하고 상단에 표시된 현재의 규칙(모음 또는 소수)을 파악합니다.",
      "url": "https://skilldrills.online/ko/drills/cognitive/attention/concentration-stamina#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "순간적 표적 자극 식별",
      "text": "빠르게 깜빡이는 문자·숫자 중 현재 규칙에 일치하는 대상이 나타나는지 집중 감시합니다.",
      "url": "https://skilldrills.online/ko/drills/cognitive/attention/concentration-stamina#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "정밀 격발 및 오반응 억제",
      "text": "일치하는 표적이 떴을 때만 스페이스바나 화면을 탭하고, 비표적은 단호히 억제합니다.",
      "url": "https://skilldrills.online/ko/drills/cognitive/attention/concentration-stamina#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "10초 주기 규칙 반전에 신속 적응",
      "text": "규칙이 반전되는 순간 즉시 머릿속 기준을 교체하여 무결점 연속 스트릭을 유지합니다.",
      "url": "https://skilldrills.online/ko/drills/cognitive/attention/concentration-stamina#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('mackworth1948', 'parasuraman1979', 'robertson1997', 'monsell2003', 'broadbent1958', 'woods2015'),
  intro: {
    title: "집중력 테스트・지속 주의력 검사 – 주의력 스태미나 측정",
    paragraphs: [
      "무료 온라인 집중력 테스트(CPT 지속수행검사). 연속으로 점멸하는 자극 속에서 주의력 저하, 충동 억제 제어력, 규칙 전환 지구력을 정밀 평가하여 두뇌 집중 상태를 진단합니다.",
      "레이더 감시 연구에서 유래한 이론으로, 인간의 주의 집중 효율은 지속적 과제 수행 20~30분 후 급격히 저하된다는 사실을 입증했습니다.",
      "10초마다 판별 기준이 뒤바뀌므로 전두엽의 작업기억 갱신과 과제 전환 능력(Monsell, 2003)을 극한으로 시험합니다.",
    ],
  },
  benchmarks: {
    title: '인지 수행 능력 표준 평가 벤치마크',
    headers: ['등급 (Tier)', '호칭 (Rank)', '평가 기준', '도달 수준', '정확도', '백분위'],
    rows: [
      { tier: 'Tier 1', rank: '그랜드마스터 / 최상위 엘리트', stat: '상위 1%', level: '마스터리 (최상위)', accuracy: '98% 이상', percentile: '상위 1%' },
      { tier: 'Tier 2', rank: '고급 지속 집중자', stat: '상위 5%', level: '다이아몬드 (우수)', accuracy: '94–97%', percentile: '상위 5%' },
      { tier: 'Tier 3', rank: '숙련 조작자', stat: '상위 15%', level: '플래티넘 (숙련)', accuracy: '88–93%', percentile: '상위 15%' },
      { tier: 'Tier 4', rank: '일반 성인 표준', stat: '상위 50%', level: '골드 (표준)', accuracy: '78–87%', percentile: '상위 50%' },
      { tier: 'Tier 5', rank: '초보 / 입문 기준선', stat: '기준선 (기초)', level: '실버 (기초)', accuracy: '78% 미만', percentile: '기준선 (하위)' },
    ],
  },
  protocols: {
    title: '두뇌 처리 속도와 집중력을 극대화하는 4대 훈련 프로토콜',
    description: '신경인지 심리학 및 지속수행평가(CPT) 연구에 기반한 과학적 두뇌 집중력 강화 훈련 프로토콜입니다.',
    items: [
      { title: "화면 중앙 응시 및 기준 규칙 확인", description: "시선을 중앙 박스에 고정하고 상단에 표시된 현재의 규칙(모음 또는 소수)을 파악합니다." },
      { title: "순간적 표적 자극 식별", description: "빠르게 깜빡이는 문자·숫자 중 현재 규칙에 일치하는 대상이 나타나는지 집중 감시합니다." },
      { title: "정밀 격발 및 오반응 억제", description: "일치하는 표적이 떴을 때만 스페이스바나 화면을 탭하고, 비표적은 단호히 억제합니다." },
      { title: "10초 주기 규칙 반전에 신속 적응", description: "규칙이 반전되는 순간 즉시 머릿속 기준을 교체하여 무결점 연속 스트릭을 유지합니다." },
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
      <ConcentrationStaminaClient copy={{ title: "집중력 테스트・지속 주의력 검사 – 주의력 스태미나 측정" }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="cognitive" currentHref="https://skilldrills.online/ko/drills/cognitive/attention/concentration-stamina" />
      </div>
    </>
  );
}
