import MemoryClient from '@/app/drills/memory/MemoryClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const memoryDrills = DRILLS.filter((d) => d.category === 'memory');

export const metadata = {
  title: '기억력 테스트 & 작업 기억력 훈련 – 무료 두뇌 게임 | SkillDrills',
  description: '온라인 무료 기억력 테스트 및 두뇌 훈련 도감. 단기 기억력, 작업 기억력(N-Back), 숫자 암기(Digit Span), 공간 격자 기억 등 7가지 과학적 메모리 드릴.',
  keywords: [
    '기억력 테스트 무료', '기억력 좋아지는 법 훈련', '작업 기억력 훈련',
    '단기 기억력 테스트', '숫자 기억력 테스트', '엔백 훈련 무료',
    '공간 기억력 테스트', '뇌 기억력 게임', '시각 기억력 훈련',
    '격자 기억력 테스트', '단어 암기력 테스트', '성인 건망증 기억력 훈련',
    '수험생 집중력 기억력 향상', '치매 예방 기억력 게임', 'e스포츠 맵 리딩 공간 기억력'
  ],
  openGraph: {
    title: '기억력 테스트 & 작업 기억력 훈련 – 무료 두뇌 게임 | SkillDrills',
    description: '온라인 무료 기억력 테스트 및 두뇌 훈련 도감. 단기 기억력, 작업 기억력(N-Back), 숫자 암기(Digit Span), 공간 격자 기억 등 7가지 과학적 메모리 드릴.',
    type: 'website',
    url: 'https://skilldrills.online/ko/drills/memory',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: '기억력 테스트 및 작업 기억력 훈련 도감' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '기억력 테스트 & 작업 기억력 훈련 – 무료 두뇌 게임 | SkillDrills',
    description: '단기 기억력, 작업 기억력(N-Back), 숫자 암기, 공간 격자 기억: 7가지 과학적 두뇌 메모리 드릴을 무료로 훈련하세요.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/memory',
    languages: getAlternateLanguages('/ko/drills/memory'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ko" },
    { "@type": "ListItem", "position": 2, "name": "전체 훈련 도감", "item": "https://skilldrills.online/ko/drills" },
    { "@type": "ListItem", "position": 3, "name": "기억력 & 작업 기억 훈련", "item": "https://skilldrills.online/ko/drills/memory" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "작업 기억력 & 공간 기억 훈련 (7가지 드릴)",
  "url": "https://skilldrills.online/ko/drills/memory",
  "description": "단기 기억력, 작업 기억력(N-Back), 숫자 역순 암기, 공간 격자 및 경로 추적을 포괄하는 7가지 과학적 메모리 트레이닝.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": memoryDrills.map((drill) => {
    const loc = getLocalizedDrill(drill.href, 'ko', drill.name);
    return {
      "@type": "WebApplication",
      "name": loc.name,
      "url": `https://skilldrills.online/ko${drill.href}`,
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5 Canvas.",
      "description": loc.tagline || drill.description,
    };
  })
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "단기 기억력과 작업 기억력(Working Memory)의 차이점은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "단기 기억력(Short-term Memory)은 정보를 단순히 15~30초 동안 수동적으로 유지하는 임시 저장소입니다. 반면 작업 기억력(Working Memory)은 전두엽 피질의 통제를 받아 정보를 머릿속에 일시 보관하면서 동시에 조작, 재가공, 업데이트하여 문제 해결이나 의사결정에 능동적으로 활용하는 고차원 인지 작업 공간입니다. 예를 들어 상대방의 전화번호를 그대로 받아적는 것은 단기 기억력이고, 암산이나 복잡한 게임 상황에서 적의 스킬 쿨다운을 계산하는 것은 작업 기억력입니다."
      }
    },
    {
      "@type": "Question",
      "name": "엔백(N-Back) 훈련이 실제로 지능과 작업 기억력을 향상시키나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, 수많은 인지신경과학 연구에 따르면 N-Back 및 듀얼 N-Back 훈련은 뇌의 전두-두정엽 인지 제어 네트워크를 활성화합니다. 지속적으로 과거 N번째 자극을 업데이트하고 이전의 불필요한 자극을 억제하는 과정에서 작업 기억 용량이 확장되며, 이는 새로운 문제를 논리적으로 해결하는 유동 지능(Fluid Intelligence) 및 주의 집중력 향상에 긍정적인 전이 효과를 나타냅니다."
      }
    },
    {
      "@type": "Question",
      "name": "일반 성인의 정상 숫자 기억 폭(Digit Span) 기준과 향상 방법은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "밀러의 법칙(Miller's Law)에 따르면 성인의 평균 순방향 숫자 기억 폭은 7 ± 2개이며, 인지적 부하가 높은 역순(Backward) 기억 폭은 5 ± 1개 수준입니다. 현대 인지심리학 모델에서는 가공되지 않은 순수 기억 용량을 약 4개 항목으로 봅니다. 점수를 비약적으로 높이려면 숫자를 3~4개 단위로 묶어 리듬감 있게 부호화하는 '청킹(Chunking)' 기법과 음운 루프(Phonological Loop) 시연 전략을 사용하는 것이 효과적입니다."
      }
    },
    {
      "@type": "Question",
      "name": "공간 기억력(격자 암기 및 경로 추적) 훈련은 일상과 게임에 어떻게 도움이 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "공간 기억력 훈련은 해마와 두정엽, 시공간 잡기장(Visuospatial Sketchpad)을 집중적으로 자극합니다. 화면 속 점멸하는 타일 위치를 기억하거나 이동 경로를 역추적하는 드릴은 일상생활의 길 찾기, 복잡한 UI 및 도면 인식뿐만 아니라, FPS 및 MOBA 게임에서 미니맵의 동선 파악, 적의 위치 예측, 3D 전장 감각을 극대화하는 데 결정적인 도움을 줍니다."
      }
    },
    {
      "@type": "Question",
      "name": "청킹(Chunking, 덩이짓기) 기법이란 무엇이며 기억력을 어떻게 늘리나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "청킹은 무작위의 개별 정보들을 의미 있는 묶음이나 패턴, 범주로 묶어 뇌의 저장 슬롯을 절약하는 부호화 기술입니다. 인간의 작업 기억은 정보의 물리적 양이 아니라 독립된 항목 수에 제약을 받기 때문에, 12자리의 숫자나 무작위 단어를 익숙한 패턴의 3~4개 덩어리로 압축하면 뇌의 인지 부하를 초과하지 않고도 2~3배 이상의 방대한 정보를 한 번에 기억할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "매일 규칙적으로 기억력 훈련을 하면 뇌 노화와 치매 예방에 도움이 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "그렇습니다. 규칙적인 기억력 훈련은 뇌의 신경가소성을 자극하여 해마의 시냅스 연결을 강화하고 '인지 예비능(Cognitive Reserve)'을 구축합니다. 인지 예비능이 높은 뇌는 연령 증가에 따른 신경 퇴행이나 기억력 감퇴를 더 오랫동안 보상하고 방어할 수 있어 노년기 건망증 완화 및 뇌 건강 유지에 큰 기여를 합니다."
      }
    },
    {
      "@type": "Question",
      "name": "최대 효과를 얻기 위한 하루 권장 훈련 시간과 빈도는 어떻게 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "인지 훈련은 장시간 무리하는 것보다 매일 15~20분씩 집중하여 주 3~5회 수행하는 것이 가장 이상적입니다. 작업 기억력 과제는 뇌 에너지 소모가 커서 25분 이상 지속하면 뇌 피로가 누적되어 훈련 효율이 떨어집니다. 짧고 밀도 높은 세션을 마치고 충분한 수면을 취해야 시냅스 강화와 기억 공고화(Consolidation)가 온전히 일어납니다."
      }
    },
    {
      "@type": "Question",
      "name": "웹 브라우저에서 진행하는 무료 메모리 테스트는 신뢰할 수 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SkillDrills의 기억력 드릴은 웩슬러 성인 지능 검사의 숫자 폭(Digit Span), 코르시 블록 검사(Corsi Block-Tapping), 커비 엔백(N-Back) 등 신경심리학계에서 공인된 표준 검사 패러다임을 정밀 웹 기술로 이식했습니다. 밀리초(ms) 단위의 반응 지연 측정과 표준화된 노출 타이밍을 적용하여 별도의 설치나 가입 없이도 공인 연구소 수준의 정확한 기억력 측정이 가능합니다."
      }
    }
  ]
};

export default function LocalizedMemoryClientPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <MemoryClient faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))} />
    </>
  );
}

