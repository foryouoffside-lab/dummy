import MotorDrillsClient from '@/app/drills/motor/MotorDrillsClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const motorDrills = DRILLS.filter((d) => d.category === 'motor');

export const metadata = {
  title: '마우스 정확도 & 에임 연습・CPS 테스트 – 모터 스킬 | SkillDrills',
  description: '온라인 무료 마우스 정확도 & 에임 연습 드릴. 초당 클릭 속도(CPS 테스트), 손떨림 제어, 키보드 타건 및 소근육 협응력을 브라우저에서 과학적으로 측정하고 훈련하세요.',
  keywords: [
    '마우스 정확도 테스트', '에임 연습 사이트 무료', '클릭 속도 테스트',
    'CPS 테스트 온라인', '손떨림 테스트 마우스', '키보드 동시입력 테스트',
    '키보드 타건 속도 측정', '손가락 연타 속도 테스트', '눈 손 협응력 훈련',
    '마우스 미세 컨트롤 연습', '지터클릭 테스트 무료', '버터플라이 클릭 테스트',
    '에임 트레이너 웹 무료', '소근육 운동 조절 능력', '게이밍 마우스 정확도 측정'
  ],
  openGraph: {
    title: '마우스 정확도 & 에임 연습・CPS 테스트 – 모터 스킬 | SkillDrills',
    description: '온라인 무료 마우스 정확도 & 에임 연습 드릴. 초당 클릭 속도(CPS 테스트), 손떨림 제어, 키보드 타건 및 소근육 협응력을 브라우저에서 과학적으로 측정하고 훈련하세요.',
    type: 'website',
    url: 'https://skilldrills.online/ko/drills/motor',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: '마우스 정확도 및 소근육 모터 스킬 훈련 도감' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '마우스 정확도 & 에임 연습・CPS 테스트 – 모터 스킬 | SkillDrills',
    description: '초당 클릭 속도(CPS), 마우스 정밀 에임 트레이너, 손떨림 제어, 키보드 타건 속도 훈련: 9가지 과학적 모터 드릴을 무료로 시작하세요.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/motor',
    languages: getAlternateLanguages('/ko/drills/motor'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ko" },
    { "@type": "ListItem", "position": 2, "name": "전체 훈련 도감", "item": "https://skilldrills.online/ko/drills" },
    { "@type": "ListItem", "position": 3, "name": "모터 스킬 & 마우스 정밀도", "item": "https://skilldrills.online/ko/drills/motor" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "마우스 정확도 & 소근육 모터 스킬 훈련 (9가지 드릴)",
  "url": "https://skilldrills.online/ko/drills/motor",
  "description": "초당 클릭 속도(CPS), 마우스 정밀 에임 트레이너, 손떨림 제어, 키보드 무한동시입력 및 소근육 협응력을 측정하는 9가지 과학적 모터 훈련.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": motorDrills.map((drill) => {
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
      "name": "온라인 모터 훈련 드릴은 어떻게 눈과 손의 협응력을 향상시키나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "모터 훈련 드릴은 시각 피질의 망막 이미지 인식, 소뇌의 운동 계획, 운동 피질의 신호 전달을 연결하는 시각-운동 피드백 루프를 강화합니다. 고주파 미세 조준, 빠른 마우스 클릭 및 경로 추적 훈련을 통해 신경계의 감각운동 지연을 줄여 180ms 미만으로 시각 표적 변화를 물리적 동작으로 변환합니다."
      }
    },
    {
      "@type": "Question",
      "name": "평균적인 CPS(초당 클릭 수)는 얼마이며, 주요 클릭 기술은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "일반적인 표준 핑거 태핑 방식의 평균 CPS는 초당 6~8회입니다. e스포츠 게이머들은 지터 클릭(전완근을 수축시켜 손가락을 진동시키는 방식, 10~14 CPS)이나 버터플라이 클릭(검지와 중지를 번갈아 두 번 치는 방식, 15~22 CPS)을 사용합니다. 장기적인 손목 건강과 조준 정밀도를 위해 제어된 지터 또는 규칙적인 리듬 클릭이 권장됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "마우스 경로 추적과 손떨림 제어 훈련은 어떻게 에임 흔들림을 제거하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "마우스 오버슈팅(목표를 지나치는 현상)과 불규칙한 손떨림은 길항근의 감속 능력 부족에서 비롯됩니다. 좁아지는 통로 통과 훈련과 사인파 추적 드릴은 서브픽셀 단위의 정밀한 커서 제어를 강제하여 손목과 전완근의 안정화 근섬유를 단련하고 미세 떨림을 억제합니다."
      }
    },
    {
      "@type": "Question",
      "name": "피츠의 법칙(Fitts's Law)이란 무엇이며, 어떻게 속도와 정확도를 최적화하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "피츠의 법칙은 이동 시간이 목표 거리와 목표 너비의 비율에 로그 비례한다는 인간-컴퓨터 상호작용 원리입니다(MT = a + b * log2(2D/W)). 정밀 훈련은 거리의 80~90%를 빠르게 도달하는 1단계 탄도식 고속 이동 후, 감속하며 오버슈팅 없이 목표를 정확히 타격하는 2단계 미세 제어로 연결됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "게이밍과 타건 속도에서 키보드 동시입력과 민첩성이 중요한 이유는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "키보드 민첩성은 약지와 새끼손가락의 해부학적 힘줄 결합을 극복하는 독립적인 손가락 제어에 달려 있습니다. 키보드 테스트 및 인식 훈련은 손가락별 작동 패턴을 분리하여 키 전환 지연 시간을 줄이고 빠른 APM 상황에서 키 씹힘이나 오입력을 방지합니다."
      }
    },
    {
      "@type": "Question",
      "name": "브라우저 기반 마우스 및 키보드 테스트는 얼마나 정확한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "브라우저 타이머는 performance.now()를 통해 0.1ms 정밀도를 지원합니다. 전체 측정은 디스플레이 주사율(120Hz 약 8ms, 60Hz 약 16ms)과 마우스/키보드 폴링레이트(1000Hz 약 1ms)의 하드웨어 한계 내에서 작동하며, 브라우저 환경에서 장치 성능 및 개인 기록 향상을 추적하기에 충분한 정밀도를 제공합니다."
      }
    },
    {
      "@type": "Question",
      "name": "마우스 감도(DPI 및 인게임 감도)와 eDPI 설정이 모터 스킬 형성에 미치는 영향은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "DPI(인치당 도트 수)와 인게임 감도의 곱인 eDPI는 손목, 전완근, 어깨의 운동 단위(Motor Unit) 동원 비율을 결정합니다. 고감도는 손목과 손가락의 미세 근육(소근육)에 의존하여 빠른 180도 회전에 유리하지만 미세 조준 시 손떨림에 취약합니다. 반면 저감도는 팔 전체의 대근육을 활용하여 일관된 궤적과 안정성을 제공합니다. 모터 훈련 시 일관된 eDPI를 유지해야 소뇌의 근육 기억(Muscle Memory) 내부 모델이 왜곡 없이 정립됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "키보드 채터링(Chattering)과 고스팅(Ghosting) 현상은 타건 정확도에 어떤 문제를 일으키나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "채터링은 기계식 스위치의 접점 바운스 현상으로 단일 키 입력이 2회 이상 중복 인식되는 하드웨어 결함이며, 고스팅은 매트릭스 신호 간섭으로 누르지 않은 키가 오작동하거나 3개 이상의 동시 입력이 누락되는 문제입니다. SkillDrills의 키보드 테스트는 0.1ms 단위로 스위치의 접점 안정성과 무한 동시입력(NKRO) 상태를 실시간 진단하여, 하드웨어 지연이나 오작동 없는 최적의 모터 퍼포먼스를 보장합니다."
      }
    }
  ]
};

export default function KoreanMotorHubPage() {
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
      <MotorDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}

