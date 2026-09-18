import CognitiveHubClient from '@/app/drills/cognitive/CognitiveHubClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const cognitiveDrills = DRILLS.filter((d) => d.category === 'cognitive');

export const metadata = {
  title: '두뇌 트레이닝 & 인지 기능 훈련 – 무료 집중력 게임 | SkillDrills',
  description: '온라인 무료 두뇌 트레이닝 및 인지 기능 훈련 도감. 집중력 지속, 정보 처리 속도, 스트룹 검사, 슐테 테이블 등 8가지 과학적 뇌 운동을 브라우저에서 바로 시작하세요.',
  keywords: [
    '두뇌 트레이닝 무료', '인지 기능 훈련', '집중력 향상 훈련',
    '주의력 집중력 테스트', '정보 처리 속도 테스트', '뇌 운동 게임',
    '분할 주의력 검사', '스트룹 검사 온라인', '슐테 테이블 훈련',
    '작업 기억력 훈련', '성인 ADHD 집중력 운동', '인지 유연성 훈련',
    '멀티태스킹 능력 테스트', '무료 치매 예방 두뇌 게임', 'e스포츠 인지 반응 훈련'
  ],
  openGraph: {
    title: '두뇌 트레이닝 & 인지 기능 훈련 – 무료 집중력 게임 | SkillDrills',
    description: '온라인 무료 두뇌 트레이닝 및 인지 기능 훈련 도감. 집중력 지속, 정보 처리 속도, 스트룹 검사, 슐테 테이블 등 8가지 과학적 뇌 운동을 브라우저에서 바로 시작하세요.',
    type: 'website',
    url: 'https://skilldrills.online/ko/drills/cognitive',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: '무료 온라인 두뇌 트레이닝 및 인지 기능 훈련 도감' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '두뇌 트레이닝 & 인지 기능 훈련 – 무료 집중력 게임 | SkillDrills',
    description: '집중력 강화, 정보 처리 속도, 스트룹 검사, 슐테 테이블 등 8가지 인지 훈련을 브라우저에서 무료로 플레이하세요.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/cognitive',
    languages: getAlternateLanguages('/ko/drills/cognitive'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ko" },
    { "@type": "ListItem", "position": 2, "name": "전체 훈련 도감", "item": "https://skilldrills.online/ko/drills" },
    { "@type": "ListItem", "position": 3, "name": "두뇌 및 인지 기능 훈련", "item": "https://skilldrills.online/ko/drills/cognitive" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "무료 온라인 두뇌 트레이닝 & 인지 기능 훈련 도감 (8 Drills)",
  "url": "https://skilldrills.online/ko/drills/cognitive",
  "description": "집중력, 주의력 분할, 작업 처리 속도, 스트룹 억제 제어, 슐테 테이블 등 8가지 신경심리학 기반 인지 훈련을 무료로 제공합니다.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": cognitiveDrills.map((drill) => {
    const loc = getLocalizedDrill(drill.href, 'ko', drill.name);
    return {
      "@type": "WebApplication",
      "name": loc.name,
      "url": `https://skilldrills.online/ko${drill.href}`
    };
  })
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "인지 기능 훈련(Cognitive Training)이란 무엇이며, 뇌에 어떤 생리학적 변화를 일으키나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "인지 기능 훈련은 전전두엽 피질(Prefrontal Cortex)이 관장하는 고차원 실행 기능(Executive Functions)을 강화하기 위해 설계된 표적화된 신경 인지 연습입니다. 단순 암기가 아닌 선택적 주의 집중, 작업 기억 용량, 인지 유연성(규칙 전환), 시각 정보 처리 속도를 지속적으로 자극합니다. 정밀한 인지 부하를 가함으로써 전두엽과 두정엽을 잇는 전두-두정 네트워크(Frontoparietal Network)의 신경 가소성(Neuroplasticity)을 촉진하고 시냅스 신호 전달 효율을 극대화합니다."
      }
    },
    {
      "@type": "Question",
      "name": "두뇌 트레이닝 게임이 뇌의 정보 처리 속도(Processing Speed)를 실제로 빠르게 만드나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, 시각-운동 루프를 자극하는 타임어택 드릴은 시각 피질에서 두정엽 연합 영역, 운동 실행 영역으로 이어지는 신경 경로의 전달 지연을 단축시킵니다. 목표 자극을 인지하고 정확한 입력을 내리는 연습을 반복하면 불필요한 시냅스 망설임이 줄어들고 감각 입력의 하향식 필터링이 정밀해져, 반응 정확도를 희생하지 않고도 자극 식별 및 운동 명령 생성 속도가 15~30% 빨라집니다."
      }
    },
    {
      "@type": "Question",
      "name": "단순 집중력(Sustained Focus)과 분할 주의력(Divided Attention)의 차이는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "단순 집중력(지속적 각성)은 청반-노르에피네프린계와 전전두엽이 외부 방해나 잡념을 억제하면서 단일 과제에 장시간 몰입을 유지하는 능력입니다. 반면 분할 주의력(이중 과제 처리)은 배측 및 복측 주의 네트워크를 활성화하여 동시에 주어지는 둘 이상의 독립된 정보 흐름 사이에서 인지 자원을 균형 있게 분배하거나 빠르게 전환하는 멀티태스킹 조율 능력입니다."
      }
    },
    {
      "@type": "Question",
      "name": "스트룹 효과(Stroop Effect)란 무엇이며, 인지 억제 제어 능력을 어떻게 측정하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "스트룹 효과는 자동화된 무의식적 처리(단어 읽기)와 의식적 실행 제어(글자 색상 명명) 사이의 충돌 현상을 나타냅니다. 예를 들어 빨간색 잉크로 쓰인 '파랑'이라는 단어를 볼 때, 전대상피질(ACC)이 충돌을 감지하고 배외측 전전두엽(DLPFC)이 반사적인 단어 읽기 충동을 억제해야 합니다. 일치 조건과 불일치 조건 사이의 반응 시간 차이(간섭 지연)를 통해 충동 억제 제어 및 인지 유연성을 정밀 측정합니다."
      }
    },
    {
      "@type": "Question",
      "name": "슐테 테이블(Schulte Table) 훈련은 주변시와 시각 탐색 속도 향상에 어떤 원리로 작용하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "슐테 테이블은 항공 조종사의 시각 탐색 효율과 속독 능력 측정을 위해 개발된 5x5 숫자 격자 도구입니다. 화면 중앙에 시선을 고정한 채 눈동자를 크게 움직이지 않고 주변시야를 확장하여 1부터 25까지의 숫자를 순서대로 찾아내는 훈련입니다. 이를 통해 망막 주변부의 공간 정보 처리 범위가 넓어져, 목표물을 찾기 위해 필요한 불필요한 도약 안구 운동(Saccades) 횟수를 절반 이하로 줄여줍니다."
      }
    },
    {
      "@type": "Question",
      "name": "두뇌 트레이닝 게임의 효과가 프로게이머나 일상 업무 능력으로 전이(Transfer)되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "신경과학계는 훈련 효과의 '근접 전이(Near Transfer)'를 명확히 입증하고 있습니다. 시각 탐색 속도, 선택적 주의 필터링, 방해 자극 억제 능력은 게임 내 적 탐지, 미니맵 리딩, 혼전 속 타깃 우선순위 설정, 직무에서의 멀티태스킹 실수 방지에 직접적으로 전이됩니다. 단기간에 일반 지능(IQ)을 올린다는 과장과 달리, 특정 실행 기능 회로를 훈련하면 실전 압박 상황에서 뇌의 반응 안정성이 월등해집니다."
      }
    },
    {
      "@type": "Question",
      "name": "두뇌 및 인지 훈련은 하루에 몇 분 정도 수행하는 것이 뇌 피로 없이 가장 효과적인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "전두엽의 인지 포도당 대사는 매우 빠르기 때문에 세션당 10~15분, 주 3~5회가 황금 루틴입니다. 20분 이상 무리하게 고난도 인지 억제 및 멀티태스킹 과제를 진행하면 중추 신경 피로(Mental Fatigue)가 누적되어 오히려 주의 집중력이 급격히 저하되고 신경 가소성 효율이 떨어집니다. 짧고 폭발적인 몰입 후 충분한 뇌 휴식을 취하는 것이 가장 효과적입니다."
      }
    },
    {
      "@type": "Question",
      "name": "두뇌 훈련 게임이 성인 ADHD 집중력 개선 및 뇌 노화 예방에 도움이 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, 인지 억제 훈련과 주의력 분할 드릴은 성인 ADHD 환자의 도파민 및 노르에피네프린 신경 전달 회로를 활성화하여 충동 조절과 주의 산만을 줄이는 비약물적 보조 요법으로 널리 활용됩니다. 또한 노화로 인해 감퇴하기 쉬운 시각 정보 처리 속도와 작업 기억력을 지속적으로 자극함으로써 뇌의 인지 예비능(Cognitive Reserve)을 구축하여 치매 및 뇌 기능 쇠퇴를 예방하는 데 뛰어난 효과를 발휘합니다."
      }
    }
  ]
};

export default function LocalizedCognitiveHubClientPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CognitiveHubClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}
