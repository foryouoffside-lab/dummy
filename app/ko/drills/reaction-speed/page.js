import ReactionSpeedDrillsClient from '@/app/drills/reaction-speed/ReactionSpeedDrillsClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const reactionDrills = DRILLS.filter((d) => d.category === 'reaction-speed');

export const metadata = {
  title: '반응속도 테스트 & 훈련 – 무료 반사신경 측정 | SkillDrills',
  description: '온라인 무료 반응속도 테스트 및 반사신경 훈련 프로그램. 초록불 단순 반응 시간부터 동체시력 추적, 안구 도약까지 8가지 전문 드릴을 즉시 시작하세요.',
  keywords: [
    '반응속도 테스트', '반사신경 테스트', '반응속도 훈련',
    '동체시력 테스트', '순발력 테스트', '초록색 반응속도 테스트',
    '단순 반응시간 측정', '선택 반응시간 훈련', 'FPS 반응속도 올리는법',
    '에임 반응속도 사이트', '안구 도약 운동 훈련', '눈 손 협응력 테스트',
    '게이밍 반응속도 밀리초', '인풋랙 줄이기', '무료 반사신경 게임'
  ],
  openGraph: {
    title: '반응속도 테스트 & 훈련 – 무료 반사신경 측정 | SkillDrills',
    description: '온라인 무료 반응속도 테스트 및 반사신경 훈련 프로그램. 초록불 단순 반응 시간부터 동체시력 추적, 안구 도약까지 8가지 전문 드릴을 즉시 시작하세요.',
    type: 'website',
    url: 'https://skilldrills.online/ko/drills/reaction-speed',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: '온라인 반응속도 테스트 및 반사신경 훈련' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '반응속도 테스트 & 훈련 – 무료 반사신경 측정 | SkillDrills',
    description: '단순 반응속도부터 동체시력, 안구 도약까지 8가지 전문 훈련 드릴을 무료로 시작하세요.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/reaction-speed',
    languages: getAlternateLanguages('/ko/drills/reaction-speed'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ko" },
    { "@type": "ListItem", "position": 2, "name": "전체 훈련 도감", "item": "https://skilldrills.online/ko/drills" },
    { "@type": "ListItem", "position": 3, "name": "반응속도 훈련", "item": "https://skilldrills.online/ko/drills/reaction-speed" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "무료 반응속도 테스트 및 반사신경 종합 훈련 도감",
  "url": "https://skilldrills.online/ko/drills/reaction-speed",
  "description": "단순 시각 반응시간(Simple RT)부터 다중 선택 반응, 동체시력 안구 추적, 도약 안구 운동까지 8가지 과학적 훈련 프로그램을 제공합니다.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": reactionDrills.map((drill) => {
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
      "name": "단순 반응시간(Simple RT)과 선택 반응시간(Choice RT)의 생리학적 차이는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "단순 반응시간(Simple Reaction Time)은 화면이 초록색으로 바뀔 때 즉각 클릭하는 것처럼 단 하나의 자극에 대해 미리 정해진 단일 운동을 실행하는 시간(평균 200~250ms)입니다. 반면 선택 반응시간(Choice Reaction Time)은 여러 자극 중 특정 타깃을 식별하고 적절한 행동을 선택해야 하므로 힉의 법칙(Hick's Law)에 따라 인지 판단 과정이 추가되어 300~450ms 이상 소요됩니다. 실제 FPS 및 격투 게임에서는 단순 자극 감지보다 피아 식별과 회피 방향을 결정하는 선택 반응력이 승패를 결정합니다."
      }
    },
    {
      "@type": "Question",
      "name": "인간의 평균 시각 반응속도는 얼마이며, 프로게이머 수준까지 단축할 수 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "건강한 성인의 시각 자극에 대한 평균 단순 반응속도는 약 240~270ms(밀리초)입니다. 망막의 광수용체 신호 전달(약 20~40ms), 시신경 및 시각 피질의 정보 처리(약 60~80ms), 운동 피질에서 척수를 거쳐 손가락 근육으로 전달되는 원심성 신경 전도(약 50~70ms)라는 생리학적 한계가 존재합니다. 그러나 규칙적인 반사신경 드릴과 신경가소성 훈련을 거치면 프로게이머 및 엘리트 사격 선수 기준인 150~180ms 영역까지 유의미하게 단축할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "동체시력(Dynamic Visual Acuity)과 안구 도약 운동(Saccades) 훈련이 반응속도에 미치는 영향은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "반응속도는 단순한 손가락 근육의 순발력이 아니라 눈이 목표물을 포착하는 시각 정보 처리 속도에 직결됩니다. 급격하게 이동하는 타깃을 추적하는 부드러운 추종 운동(Smooth Pursuit)과 한 지점에서 다른 지점으로 시선을 신속하게 이동하는 도약 안구 운동(Saccadic Movement)을 훈련하면 안구 외안근의 민첩성이 향상됩니다. 이는 망막 중심와(Fovea)에 상이 맺히는 시간을 수십 밀리초 이상 앞당겨 뇌의 의사결정 시점을 획기적으로 가속합니다."
      }
    },
    {
      "@type": "Question",
      "name": "반응속도 측정 시 모니터 주사율(Hz)과 마우스 폴링레이트는 얼마나 중요한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "하드웨어 레이턴시(Hardware Latency)는 측정 결과에 직접적인 오차를 유발합니다. 60Hz 모니터는 프레임 간격이 16.6ms에 달해 시각 정보 표시가 지연되지만, 144Hz(6.9ms), 240Hz(4.1ms) 고주사율 모니터는 프레임 딜레이를 극한으로 줄여줍니다. 또한 1000Hz 이상의 고폴링레이트 게이밍 마우스를 사용하고 웹 브라우저의 Pointer Lock API를 활용하면 운영체제의 마우스 가속 및 버퍼링 딜레이를 배제하여 순수한 신경 반응 시간을 1ms 단위 정밀도로 측정할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "수면 부족, 카페인 섭취, 탈수가 신경 반응속도에 미치는 영향은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "신경과학 연구에 따르면 단 2시간의 수면 부족만으로도 신경 전달 속도가 저하되어 반응시간이 30~50ms 이상 지연되며, 이는 가벼운 음주 상태와 유사한 인지 지연을 유발합니다. 반면 적정량의 카페인(100~200mg)은 아데노신 수용체를 차단하여 일시적으로 반응속도를 10~15ms 개선할 수 있습니다. 하지만 과다 섭취 시 미세 근육 떨림(Tremor)이 발생하여 정확도가 떨어지며, 체내 수분이 2%만 부족해도 뇌 전두엽의 반응 억제 능력이 급격히 감퇴합니다."
      }
    },
    {
      "@type": "Question",
      "name": "FPS 게임에서 핑(Ping)과 반응속도의 관계는 어떻게 작용하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "플레이어의 총 반응 대기 시간은 '생체 반응시간 + 시스템 인풋랙 + 네트워크 핑'의 합산입니다. 예를 들어 플레이어의 신체 반응속도가 200ms이고 시스템 인풋랙이 15ms, 서버 핑이 35ms라면 실제 서버에 사격 판정이 도달하는 총 시간은 250ms가 됩니다. 상대방보다 핑이 20ms 불리하더라도 체계적인 반사신경 훈련을 통해 신체 반응시간을 30ms 단축한다면 네트워크 지연을 극복하고 교전에서 선제 타격을 달성할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "반응속도를 가장 효과적으로 향상시키는 하루 훈련 루틴과 주기는?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "중추신경계는 고도의 집중을 요구하는 반응 훈련 시 빠르게 피로해집니다. 신경 피로가 누적된 상태에서의 훈련은 오히려 반응 지연 반응 패턴을 고착화시킵니다. 가장 이상적인 훈련법은 세션당 15~20분 내외로 짧고 폭발적인 집중력을 발휘하는 것이며, 주 4~5회 규칙적으로 반복하는 것입니다. 훈련 전 손목과 손가락의 가벼운 스트레칭으로 혈류량을 높이고, 세션 사이 1~2분의 안구 휴식을 취하는 것이 시냅스 연결을 강화하는 핵심입니다."
      }
    },
    {
      "@type": "Question",
      "name": "SkillDrills의 반응속도 테스트 및 훈련 프로그램은 모바일에서도 정확한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "SkillDrills의 모든 반응 드릴은 모바일 터치스크린과 PC 마우스 환경 모두에 최적화되어 있습니다. 다만 모니터와 유선 마우스 환경에 비해 스마트폰의 터치스크린 디지타이저는 하드웨어 특성상 약 20~40ms의 자체 입력 지연(Touch Latency)이 추가로 발생할 수 있습니다. 따라서 순수한 밀리초 단위의 절대적인 반응속도 측정과 미세 마우스 조작 반사 훈련은 144Hz 이상의 PC 환경을 권장하며, 모바일에서는 일상적인 인지 반사 루틴으로 활용하는 것이 적합합니다."
      }
    }
  ]
};

export default function LocalizedReactionHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ReactionSpeedDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}

