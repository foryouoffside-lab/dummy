import VisualDrillsClient from '@/app/drills/visual/VisualDrillsClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const visualDrills = DRILLS.filter((d) => d.category === 'visual');

export const metadata = {
  title: '시각 훈련 & 동체시력·입체시 테스트 | SkillDrills',
  description: '동체시력, 입체시(원근감), 시각 반응속도, 다중 객체 추적(MOT), 시각 탐색 훈련 등 9가지 신경과학 기반 무료 시각 기능 훈련 및 시력 검사 도구.',
  keywords: [
    '동체시력 테스트', '동체시력 훈련 게임', '입체시 검사',
    '원근감 테스트', '눈 운동 훈련 프로그램', '시각 반응속도 검사',
    '빛 반응속도 테스트', '다중 객체 추적 검사', '주변 시야 테스트',
    '시각 탐색 훈련', '안구 운동 트레이닝', '스무스 퍼슈트 눈 운동',
    '시각 주의력 검사', '선택적 주의력 테스트', '스포츠 시각 훈련 도구'
  ],
  openGraph: {
    title: '시각 훈련 & 동체시력·입체시 테스트 | SkillDrills',
    description: '동체시력, 입체시(원근감), 시각 반응속도, 다중 객체 추적(MOT), 시각 탐색 훈련 등 9가지 신경과학 기반 무료 시각 기능 훈련 및 시력 검사 도구.',
    type: 'website',
    url: 'https://skilldrills.online/ko/drills/visual',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: 'SkillDrills 시각 기능 및 동체시력 훈련' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '시각 훈련 & 동체시력·입체시 테스트 | SkillDrills',
    description: '동체시력, 입체시(원근감), 다중 객체 추적(MOT), 시각 반응속도 등 9가지 신경과학 기반 무료 시각 훈련 도구.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/visual',
    languages: getAlternateLanguages('/ko/drills/visual'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ko" },
    { "@type": "ListItem", "position": 2, "name": "퍼포먼스 훈련", "item": "https://skilldrills.online/ko/drills" },
    { "@type": "ListItem", "position": 3, "name": "시각 인지 & 동체시력", "item": "https://skilldrills.online/ko/drills/visual" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "시각 기능 훈련 & 동체시력 검사 (9개 종목)",
  "url": "https://skilldrills.online/ko/drills/visual",
  "description": "동체시력, 입체시 검사, 광학 반응속도, 다중 객체 추적, 시각 탐색 및 주기 분해능을 평가하는 9가지 시각 인지 훈련.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": visualDrills.map((drill) => {
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
      "name": "동체시력(Dynamic Visual Acuity) 훈련은 실제 구기 종목이나 FPS 게임 반응에 어떻게 도움이 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "정적 시력과 달리 동체시력은 빠르게 비행하는 물체의 궤적을 망막 중심와(fovea)에 안정적으로 고정하는 신경-외안근 협응 능력입니다. 이동 표적 요격 및 궤적 추적 훈련을 반복하면 안구 운동 신경 전달 속도가 향상되어, 야구·테니스·배드민턴의 타격 타이밍과 FPS 게임의 이동 타깃 트래킹 정확도가 크게 증가합니다."
      }
    },
    {
      "@type": "Question",
      "name": "삼간법(Three-Rod Test) 기반의 입체시·원근감 테스트는 무엇을 측정하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "삼간법 검사는 양쪽 눈의 망막에 맺히는 상의 미세한 각도 차이(양안 시차)를 뇌 시각 피질이 융합하여 입체적 깊이와 거리를 정확히 지각하는 능력을 평가합니다. 원근 깊이 판단력이 향상되면 고속 주행 시 전방 차간 거리 예측, 드라이빙, 농구 패스 거리 계산 등 3차원 공간 인지력이 정밀해집니다."
      }
    },
    {
      "@type": "Question",
      "name": "다중 객체 추적(MOT, Multiple Object Tracking) 훈련이 주변 시야 확장에 중요한 이유는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MOT 훈련은 뇌의 두정엽(Parietal Lobe)에서 담당하는 공간 분할 주의력과 시각 작업기억을 집중적으로 단련합니다. 중앙 시야를 응시하면서도 주변부에서 무작위로 이동하는 복수의 객체를 동시 감시하는 훈련을 통해 유효 시야(UFOV)가 대폭 넓어지며, 축구·농구 경기 시야 확보나 운전 중 돌발 상황 감지 능력이 극대화됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "스무스 퍼슈트(Smooth Pursuit) 안구 운동 훈련이란 무엇이며 왜 필요한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "스무스 퍼슈트는 움직이는 표적을 시선이 끊기지 않고 부드럽게 따라가는 활동성 안구 운동입니다. 표적 속도가 빠르거나 집중력이 떨어지면 시선이 툭툭 끊기며 도약(Saccade) 현상이 발생합니다. 매끄러운 궤적 추적 훈련은 외안근의 정밀 조절 능력을 강화하여 화면 떨림 없이 표적을 주시할 수 있게 합니다."
      }
    },
    {
      "@type": "Question",
      "name": "광 반응속도 검사(Light Reaction)와 일반 반응속도 테스트의 차이는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "일반 반응속도 테스트는 색상 변화나 복합 인지 처리를 거치지만, 광 반응속도 검사는 망막 광수용체의 광전기적 변환(Phototransduction)부터 운동 피질의 근육 수축 명령까지 순수한 신경 전달 지연(Visual-Motor Latency)을 밀리초(ms) 단위로 측정하여 원초적 신경 반사 능력을 진단합니다."
      }
    },
    {
      "@type": "Question",
      "name": "고밀도 시각 탐색(Visual Search) 훈련은 뇌의 어떤 인지 기능을 자극하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "시각 탐색 검사는 수십 개의 회전 방해 자극(Distractor) 속에서 특정 결합 특징을 가진 표적을 순간 식별하는 훈련입니다. 이는 시각 피질의 전주의적 특징 분석(Feature Integration)과 배외측 전두엽의 노이즈 필터링 메커니즘을 가속화하여 복잡한 시각 환경에서 핵심 정보를 포착하는 속도를 높여줍니다."
      }
    },
    {
      "@type": "Question",
      "name": "시각 훈련 세션의 권장 지속 시간과 주기적인 훈련 빈도는 어떻게 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "시각 기능 훈련은 외안근과 시각 피질 신경망에 집중적인 에너지를 소모하므로, 회당 15~20분, 주 3~5회 세션이 가장 이상적입니다. 25분 이상의 과도한 연속 훈련은 안구 모양체근 피로 및 시각 피로를 유발할 수 있으므로 규칙적인 짧은 인터벌 훈련이 효과적입니다."
      }
    },
    {
      "@type": "Question",
      "name": "브라우저 기반 시각 훈련 도구가 실제 임상 안구 운동 및 스포츠 비전 트레이닝을 대체할 수 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "브라우저 기반 도구는 고가의 전문 시각 훈련 장비에 접근하기 어려운 운동선수와 일반인이 일상에서 신경학적 시각 인지 및 반응 기제를 강화할 수 있는 훌륭한 훈련 보조 도구입니다. 정밀한 임상 진단을 대체할 수는 없으나, 동체시력, 주의력 분할, 반응 시간 개선에 과학적으로 입증된 효과를 제공합니다."
      }
    }
  ]
};

export default function VisualDrillsPage() {
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
      <VisualDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}
