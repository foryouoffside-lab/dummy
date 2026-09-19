import FineMotorClient from '@/app/drills/motor/precision-control/tracing/TracingClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: '마우스 트레이싱 게임 – 정밀 궤적 추적 & 미세 제어 능력 측정',
  description: '움직이는 파형 곡선을 벗어나지 않고 따라가는 무료 브라우저 마우스 트레이싱 게임. 마우스 궤적 정밀도와 미세 손목 제어, 연속 트래킹 안정성을 정밀 평가합니다.',
  keywords: ["마우스 트레이싱 게임", "마우스 선 따라가기 연습", "정밀 마우스 제어 테스트", "마우스 트래킹 연습", "스무스 추적 안구운동", "손떨림 테스트", "마우스 손목 컨트롤", "FPS 트래킹 에임", "마우스 미세 제어", "에임 트레이너"],
  openGraph: {
    title: '마우스 트레이싱 게임 – 정밀 궤적 추적 & 미세 제어 능력 측정 | SkillDrills',
    description: '움직이는 파형 곡선을 벗어나지 않고 따라가는 무료 브라우저 마우스 트레이싱 게임. 마우스 궤적 정밀도와 미세 손목 제어, 연속 트래킹 안정성을 정밀 평가합니다.',
    type: 'article',
    url: 'https://skilldrills.online/ko/drills/motor/precision-control/tracing',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '마우스 트레이싱 게임 – 정밀 궤적 추적 & 미세 제어 능력 측정 | SkillDrills',
    description: '움직이는 파형 곡선을 벗어나지 않고 따라가는 무료 브라우저 마우스 트레이싱 게임. 마우스 궤적 정밀도와 미세 손목 제어, 연속 트래킹 안정성을 정밀 평가합니다.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/motor/precision-control/tracing',
    languages: getAlternateLanguages('/drills/motor/precision-control/tracing'),
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
      "name": "운동 조작 훈련",
      "item": "https://skilldrills.online/ko/drills/motor"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "마우스 트레이싱 게임",
      "item": "https://skilldrills.online/ko/drills/motor/precision-control/tracing"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "마우스 트레이싱 정밀 궤적 추적 도구",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "KRW"
  },
  "description": "움직이는 파형 곡선을 벗어나지 않고 따라가는 무료 브라우저 마우스 트레이싱 게임. 마우스 궤적 정밀도와 미세 손목 제어, 연속 트래킹 안정성을 정밀 평가합니다.",
  "url": "https://skilldrills.online/ko/drills/motor/precision-control/tracing",
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
  "name": "마우스 트레이싱 게임・정밀 궤적 추적 테스트 – 마우스 미세 제어 능력 측정",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas, Pointer Lock API, modern web browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "KRW"
  },
  "url": "https://skilldrills.online/ko/drills/motor/precision-control/tracing",
  "inLanguage": "ko-KR",
  "dateModified": "2026-09-11"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "마우스 트레이싱 게임 – 연속 파형 궤적 추적 및 제어 게임",
  "url": "https://skilldrills.online/ko/drills/motor/precision-control/tracing",
  "description": "움직이는 파형 곡선을 벗어나지 않고 따라가는 무료 브라우저 마우스 트레이싱 게임. 마우스 궤적 정밀도와 미세 손목 제어, 연속 트래킹 안정성을 정밀 평가합니다.",
  "genre": [
    "Action",
    "Aim Trainer",
    "Esports Training"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop"
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
      "name": "마우스 트레이싱 게임(Mouse Tracing Game)이란?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "화면을 가로질러 흐르는 사인파 곡선 위로 마우스 포인터를 계속 유지하여 미세한 선로 이탈 방지 능력을 측정하는 정밀 제어 훈련입니다."
      }
    },
    {
      "@type": "Question",
      "name": "단순 클릭 측정과 비교했을 때 트레이싱 훈련의 장점은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "일회성 타격 속도가 아니라, 목표물의 지속적인 움직임에 손의 속도를 일정하게 동기화시키는 연속 폐루프 신경 피드백 제어를 훈련합니다."
      }
    },
    {
      "@type": "Question",
      "name": "스무스 퍼슈트 안구 운동(Krauzlis, 2004)이란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "시야 내에서 움직이는 대상을 놓치지 않고 망막 중심와로 매끄럽게 뒤쫓는 눈의 생리학적 추적 기전입니다."
      }
    },
    {
      "@type": "Question",
      "name": "래시바스의 연구(Rashbass, 1961)가 증명한 사실은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "시각계가 물체의 위치 오차와 속도 정보를 별도로 계산하여 안구와 손의 추종 속도를 정밀하게 제어한다는 점입니다."
      }
    },
    {
      "@type": "Question",
      "name": "스티어링 법칙(Steering Law, Accot & Zhai, 1997)은 어떻게 작용하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "곡선의 폭이 좁고 굴곡이 가파를수록 허용 이동 속도가 물리적으로 제한된다는 컴퓨터 인터페이스 공학 법칙입니다."
      }
    },
    {
      "@type": "Question",
      "name": "경로를 벗어났을 때(Off-Path) 어떤 현상이 발생하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "라인을 벗어나는 즉시 플로우 점수가 감점되고 빨간색 경고 플래시와 함께 연속 콤보가 중단됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "경로 이탈 없이 안정적으로 따라가는 팁은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "마우스를 손가락 끝으로만 쥐지 말고 손바닥 하단부를 패드에 지지대로 밀착시켜 마찰 안정성을 확보하는 것이 중요합니다."
      }
    },
    {
      "@type": "Question",
      "name": "배틀로얄 및 하이퍼 FPS 게임에 어떤 도움이 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "에이펙스 레전드나 오버워치 등 지속적인 화력 투사가 필요한 상황에서 적의 회피 기동을 끝까지 따라붙는 트래킹 에임 능력을 향상시킵니다."
      }
    },
    {
      "@type": "Question",
      "name": "마우스 패드 선택이 트레이싱에 미치는 영향은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "마찰 계수가 균일한 밸런스형 패드가 미세한 방향 전환 시 커서 튐을 방지해 주어 이상적입니다."
      }
    },
    {
      "@type": "Question",
      "name": "점수와 통계는 어디에 보관되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "모든 세션 데이터는 사용자의 로컬 브라우저에만 암호화 저장되어 프라이버시가 안전하게 보호됩니다."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "마우스 트레이싱 게임・정밀 궤적 추적 테스트 – 마우스 미세 제어 능력 측정",
  "description": "움직이는 파형 곡선을 벗어나지 않고 따라가는 무료 브라우저 마우스 트레이싱 게임. 마우스 궤적 정밀도와 미세 손목 제어, 연속 트래킹 안정성을 정밀 평가합니다.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "포인터 락 활성화 및 곡선 정렬",
      "text": "화면을 클릭하여 마우스 포인터를 고정하고 파형 라인의 도입부에 커서를 정확히 맞춥니다.",
      "url": "https://skilldrills.online/ko/drills/motor/precision-control/tracing#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "일정한 속도로 파형 추종 유지",
      "text": "곡선이 이동하는 속도에 맞춰 손목을 부드럽게 글라이딩하며 선 중앙을 유지합니다.",
      "url": "https://skilldrills.online/ko/drills/motor/precision-control/tracing#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "변곡점 미세 감속 제어",
      "text": "곡선의 최고점과 최저점 굴곡 구간에서 순간적인 미세 브레이킹을 통해 바깥쪽 이탈을 방지합니다.",
      "url": "https://skilldrills.online/ko/drills/motor/precision-control/tracing#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "슈퍼 플로우 스트릭 유지",
      "text": "선로 이탈 없이 높은 일치도를 연속 유지하여 최대 플로우 점수와 랭크를 획득합니다.",
      "url": "https://skilldrills.online/ko/drills/motor/precision-control/tracing#step-4"
    }
  ]
};

const guideProps = {
  sources: pickSources('accot1997', 'krauzlis2004', 'rashbass1961', 'woodworth1899', 'woods2015'),
  intro: {
    title: "마우스 트레이싱 게임・정밀 궤적 추적 테스트 – 마우스 미세 제어 능력 측정",
    paragraphs: [
      "움직이는 파형 곡선을 벗어나지 않고 따라가는 무료 브라우저 마우스 트레이싱 게임. 마우스 궤적 정밀도와 미세 손목 제어, 연속 트래킹 안정성을 정밀 평가합니다.",
      "일회성 타격 속도가 아니라, 목표물의 지속적인 움직임에 손의 속도를 일정하게 동기화시키는 연속 폐루프 신경 피드백 제어를 훈련합니다.",
      "시야 내에서 움직이는 대상을 놓치지 않고 망막 중심와로 매끄럽게 뒤쫓는 눈의 생리학적 추적 기전입니다.",
    ],
  },
  benchmarks: {
    title: '운동 제어 능력 표준 평가 벤치마크',
    headers: ['등급 (Tier)', '호칭 (Rank)', '평가 기준', '도달 수준', '정확도', '백분위'],
    rows: [
      { tier: 'Tier 1', rank: '그랜드마스터 / 초정밀 궤적 조작자', stat: '상위 1%', level: '엘리트 (최상위)', accuracy: '98% 이상', percentile: '상위 1%' },
      { tier: 'Tier 2', rank: '마스터 / 정밀 추적자', stat: '상위 5%', level: '다이아몬드 (우수)', accuracy: '94–97%', percentile: '상위 5%' },
      { tier: 'Tier 3', rank: '프로 / 숙련 제어자', stat: '상위 15%', level: '플래티넘 (숙련)', accuracy: '88–93%', percentile: '상위 15%' },
      { tier: 'Tier 4', rank: '일반 / 중급 조작자', stat: '상위 50%', level: '골드 (표준)', accuracy: '78–87%', percentile: '상위 50%' },
      { tier: 'Tier 5', rank: '입문 / 기초 기준선', stat: '기준선 (기초)', level: '실버 (기초)', accuracy: '78% 미만', percentile: '기준선 (하위)' },
    ],
  },
  protocols: {
    title: '마우스 조작 제어력을 극대화하는 4대 훈련 프로토콜',
    description: '스티어링 법칙(Accot-Zhai, 1997) 및 부드러운 안구 추적(Smooth Pursuit, Krauzlis, 2004)에 기반한, 연속 궤적 일치도와 손목 미세 제어를 최적화하는 과학적 모터 훈련 프로토콜입니다.',
    items: [
      { title: "포인터 락 활성화 및 곡선 정렬", description: "화면을 클릭하여 마우스 포인터를 고정하고 파형 라인의 도입부에 커서를 정확히 맞춥니다." },
      { title: "일정한 속도로 파형 추종 유지", description: "곡선이 이동하는 속도에 맞춰 손목을 부드럽게 글라이딩하며 선 중앙을 유지합니다." },
      { title: "변곡점 미세 감속 제어", description: "곡선의 최고점과 최저점 굴곡 구간에서 순간적인 미세 브레이킹을 통해 바깥쪽 이탈을 방지합니다." },
      { title: "슈퍼 플로우 스트릭 유지", description: "선로 이탈 없이 높은 일치도를 연속 유지하여 최대 플로우 점수와 랭크를 획득합니다." },
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

const koCopy = {
  title: "마우스 트레이싱 게임",
  subtitle: "원시 마우스 입력 연속 궤적 추적 • 45초 타이머",
  startButtonText: "훈련 시작",
  trainAgain: "다시 훈련",
  shareTitle: "결과 공유",
  exitTitle: "나가기",
  statFlowScore: "플로우 점수",
  statTimeLeft: "남은 시간",
  statFlowIntegrity: "플로우 안정도",
  statBestScore: "최고 점수",
  maxStreakLabel: "최대 연속 프레임",
  peakFlowLabel: "피크 플로우 상태",
  bestScoreLabel: "개인 최고 점수",
  rulesTitle: "훈련 가이드 및 점수 규칙",
  rulesItems: [
    { num: "1", text: "궤적 추종", highlight: "에메랄드 파형", result: "경로 유지 시 프레임당 +1점" },
    { num: "2", text: "속도 가속", highlight: "점진적 가속", result: "45초간 2.2 → 3.8 px/f 증속" },
    { num: "3", text: "플로우 보너스", highlight: "슈퍼 플로우", result: "4초 연속 유지 시 +5점 추가" },
    { num: "4", text: "정밀 제어", highlight: "데스크톱 전용", result: "1:1 하드웨어 원시 마우스 입력" }
  ],
};

export default function LocalizedMotorPage() {
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
      <FineMotorClient copy={koCopy} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/ko/drills/motor/precision-control/tracing" />
      </div>
      <DrillFooter />
    </>
  );
}
