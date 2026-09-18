import DrillsDirectoryClient from '@/app/drills/DrillsDirectoryClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

export const metadata = {
  title: '에임 연습 & 두뇌 훈련 82종 무료 드릴 모음 | SkillDrills',
  description: '8개 핵심 카테고리 82종 이상의 무료 온라인 피지컬 훈련. 발로란트 에임 연습, 반응속도 테스트, 시각 추적, 기억력 게임, 인지 능력 향상 드릴을 설치 없이 브라우저에서 즉시 시작하세요.',
  keywords: [
    '무료 에임 연습 사이트', '발로란트 에임 연습', '반응속도 테스트',
    '두뇌 훈련 게임', '기억력 테스트 게임', '시각 추적 훈련',
    '마우스 정확도 측정', 'cps 측정 사이트', '반사신경 테스트',
    '동체시력 테스트', '작업기억력 향상 게임', '순발력 훈련',
    '스트룹 검사 온라인', '공간지각력 테스트', '피지컬 트레이닝 온라인'
  ],
  openGraph: {
    title: '에임 연습 & 두뇌 훈련 82종 무료 드릴 모음 | SkillDrills',
    description: '8개 핵심 카테고리 82종 이상의 무료 온라인 피지컬 훈련. 발로란트 에임 연습, 반응속도 테스트, 시각 추적, 기억력 게임, 인지 능력 향상 드릴을 설치 없이 브라우저에서 즉시 시작하세요.',
    type: 'website',
    url: 'https://skilldrills.online/ko/drills',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    images: [{
      url: 'https://skilldrills.online/icons/icon-512x512.png',
      width: 512,
      height: 512,
      alt: 'SkillDrills 전체 훈련 드릴 도감',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '에임 연습 & 두뇌 훈련 82종 무료 드릴 모음 | SkillDrills',
    description: '8대 분야 82종 이상의 무료 온라인 에임 트레이너, 반응속도, 두뇌 인지 훈련.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills',
    languages: getAlternateLanguages('/ko/drills'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills 홈", "item": "https://skilldrills.online/ko" },
    { "@type": "ListItem", "position": 2, "name": "전체 훈련 도감", "item": "https://skilldrills.online/ko/drills" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "전체 에임 연습 및 인지 신체 훈련 도감 (82종)",
  "url": "https://skilldrills.online/ko/drills",
  "description": "8대 핵심 분야 82종의 과학적 인터랙티브 훈련 드릴 모음. 에임 트레이너, 반응속도, 시각 추적, 인지 제어, 기억력 평가.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": DRILLS.map((drill) => {
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
      "name": "SkillDrills의 82가지 훈련 드릴은 어떤 과학적 근거로 설계되었나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SkillDrills는 피츠의 법칙(Fitts's Law), 멘탈 크로노메트리(반응시간 측정학), 배들리의 작업기억 모델, 그리고 시각 운동 신경 통제 이론 등 저명한 신경과학 및 스포츠 운동역학 문헌을 기반으로 프로그래밍되었습니다. 각 드릴은 인위적인 게임성보다는 감각 수용체 자극, 중추신경계 정보 처리, 말초 운동 신경 명령 전달로 이어지는 신경 생리학적 루프를 정밀하게 자극하도록 수학적으로 보정되었습니다."
      }
    },
    {
      "@type": "Question",
      "name": "별도의 프로그램이나 플러그인 설치 없이 브라우저에서 어떻게 정밀한 측정이 가능한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SkillDrills의 모든 드릴은 브라우저 내장 performance.now() 고해상도 타이머 API를 활용하여 1밀리초 미만의 높은 정밀도로 로컬 기기에서 직접 구동됩니다. Pointer Lock API를 통한 무제한 마우스 로우 인풋 제어와 HTML5 Canvas 60~240Hz 고주사율 렌더링을 지원하므로 설치나 네트워크 핑 지연 없이 즉각적인 훈련이 가능합니다."
      }
    },
    {
      "@type": "Question",
      "name": "FPS 게임(발로란트, 오버워치, 카스2) 실력 향상을 위해 추천하는 입문 루틴은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "가장 권장되는 15분 워밍업 루틴은 다음과 같습니다: 1) 단순 반응속도 테스트 5회로 신경계 각성, 2) 플릭샷 연습(스냅 에임)으로 마우스패드 마찰 제동력 조율, 3) 스무스 퍼슈트(부드러운 추적 안구운동)로 표적 추적 안정화, 4) 타겟 스위칭 스웜으로 다중 표적 우선순위 판단력을 완성한 후 실전에 진입하는 것입니다."
      }
    },
    {
      "@type": "Question",
      "name": "두뇌 인지 능력 훈련과 작업기억력 게임이 일상생활과 학습에 어떤 도움을 주나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "N-백(N-Back) 테스트, 스트룹 검사, 분할 주의력 드릴 등은 배외측 전전두엽 피질(DLPFC)을 지속적으로 활성화합니다. 이를 통해 산만한 외부 자극을 억제하는 주의 제어력, 멀티태스킹 환경에서의 규칙 전환 유연성, 단기 기억 저장 용량이 확장되어 업무 집중력과 문제 해결 속도가 눈에 띄게 개선됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "모니터 주사율(Hz)과 마우스 감도(eDPI) 설정이 측정 점수에 영향을 주나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, 중요한 영향을 미칩니다. 60Hz 모니터는 프레임당 약 16.7ms의 화면 표시 지연이 있지만, 144Hz(6.9ms)나 240Hz(4.2ms) 모니터는 시각 자극 피드백을 훨씬 일찍 제공하여 감속 제동 오차를 줄여줍니다. 또한 본 사이트의 글로벌 감도 설정 슬라이더를 통해 플레이 중인 주 게임의 물리적 마우스 이동 거리(cm/360°)와 1:1로 정확히 동기화할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "일일 권장 훈련 시간과 세션 빈도는 어느 정도가 가장 효과적인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "신경 가소성(Neuroplasticity)을 극대화하기 위해서는 지칠 때까지 장시간 플레이하기보다 매일 15~25분간 고도의 집중력을 발휘하는 단기 분할 훈련이 훨씬 유리합니다. 말초 신경근 피로가 누적되면 오차 보정 학습 효율이 급격히 저하되므로 세션 사이에 1~2분의 짧은 안구 및 손목 휴식을 병행하세요."
      }
    },
    {
      "@type": "Question",
      "name": "측정된 점수, 반응속도 기록 및 개인 데이터가 외부 서버로 전송되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "아닙니다. SkillDrills는 사용자의 완벽한 프라이버시를 원칙으로 운영됩니다. 계정 가입이나 로그인이 일체 필요 없으며, 최고 점수와 커스텀 감도 세팅은 사용자의 로컬 브라우저 저장소(localStorage)에만 안전하게 보관됩니다. 외부 서버로 어떠한 개인 식별 정보나 점수 데이터도 전송되지 않습니다."
      }
    },
    {
      "@type": "Question",
      "name": "스마트폰이나 태블릿 등 모바일 터치 기기에서도 모든 훈련을 진행할 수 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "반응속도 테스트, 기억력 게임, 인지 판단 드릴 등 모바일 터치에 최적화된 드릴은 스마트폰과 태블릿에서 완벽하게 작동합니다. 다만 포인터 잠금(Pointer Lock)과 미세 마우스 컨트롤이 필수적인 FPS 에임 트레이너 및 정밀 모터 드릴은 데스크톱 환경(마우스/키보드 연결)에서 실행하도록 자동으로 안내됩니다."
      }
    }
  ]
};

export default function LocalizedDirectoryPage() {
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
      <DrillsDirectoryClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}
