import FPSHubClient from '@/app/drills/fps/FPSHubClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const fpsDrills = DRILLS.filter((d) => d.category === 'fps');

export const metadata = {
  title: '무료 FPS 에임 연습 – 발로란트 & CS2 온라인 에임 트레이너 | SkillDrills',
  description: '브라우저에서 설치 없이 무료로 즐기는 FPS 에임 연습 도감. 발로란트·CS2·에이펙스를 위한 15개 전문 훈련: 끌어치기, 트래킹, 반동 제어, 반응속도.',
  keywords: [
    '무료 FPS 에임 연습', '발로란트 에임 연습', 'CS2 에임 연습',
    '온라인 에임 트레이너', '에임 연습 사이트', '끌어치기 연습',
    '에임 트래킹 훈련', 'FPS 반동 제어', '반응속도 테스트',
    '크로스헤어 플레이스먼트', '헤드라인 조준선', '타깃 스위칭',
    '손목 에임 팔 에임', 'eDPI 감도 설정', '무설치 에임 트레이너'
  ],
  openGraph: {
    title: '무료 FPS 에임 연습 – 발로란트 & CS2 온라인 에임 트레이너 | SkillDrills',
    description: '브라우저에서 설치 없이 무료로 즐기는 FPS 에임 연습 도감. 발로란트·CS2·에이펙스를 위한 15개 전문 훈련: 끌어치기, 트래킹, 반동 제어, 반응속도.',
    type: 'website',
    url: 'https://skilldrills.online/ko/drills/fps',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: '무료 FPS 에임 연습 허브' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '무료 FPS 에임 연습 – 발로란트 & CS2 온라인 에임 트레이너 | SkillDrills',
    description: '브라우저에서 설치 없이 무료로 즐기는 FPS 에임 연습 도감. 발로란트·CS2·에이펙스를 위한 15개 전문 훈련.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/fps',
    languages: getAlternateLanguages('/ko/drills/fps'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ko" },
    { "@type": "ListItem", "position": 2, "name": "전체 훈련 도감", "item": "https://skilldrills.online/ko/drills" },
    { "@type": "ListItem", "position": 3, "name": "FPS 에임 연습", "item": "https://skilldrills.online/ko/drills/fps" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "무료 FPS 에임 연습 – 온라인 에임 트레이너 도감",
  "url": "https://skilldrills.online/ko/drills/fps",
  "description": `15개 이상의 전문 FPS 에임 훈련 도감. 끌어치기(플릭), 부드러운 트래킹, 반동 제어, 180도 상황 인지 능력, 조준선 정렬. 발로란트, CS2, 에이펙스 레전드 완벽 호환. 무료 무설치.`,
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": fpsDrills.map((drill) => {
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
      "name": "발로란트 및 카스2(CS2) 같은 택티컬 FPS에 브라우저 에임 연습이 어떻게 도움이 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "발로란트와 카스2는 TTK(Time to Kill)가 200ms 미만으로 극히 짧기 때문에, 적을 마주치는 찰나의 초탄 정밀도와 미세 조정(Micro-adjustment)이 승패를 결정합니다. 인게임 데스매치는 리스폰 대기 시간과 불필요한 이동 시간이 긴 반면, 전용 에임 트레이너는 10분 동안 수백 번의 순수 끌어치기(Flick)와 조준점 제동 운동을 반복할 수 있습니다. 이를 통해 운동 피질(Motor Cortex)의 근육 기억을 자동화하여 실전에서 크로스헤어 플레이스먼트와 앵글 클리어링에 더 많은 인지 대역폭을 할당할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "플릭(끌어치기), 트래킹(추적), 타깃 스위칭(전환)의 차이점과 중요성은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "FPS 에임의 3대 핵심 기둥은 다음과 같습니다: 1) 플릭(Flick/끌어치기): 정지된 상태에서 표적을 향해 순간적으로 탄도성 궤적을 그리며 이동 후 격발하는 기술로, 밴달이나 AK-47의 단발 헤드샷에 필수적입니다. 2) 트래킹(Tracking/동체 추적): 불규칙하게 움직이는 적의 이동 벡터에 조준선을 계속 밀착시키는 기술로, 에이펙스 레전드와 오버워치 2의 자동 화기 교전에 직결됩니다. 3) 타깃 스위칭(Target Switching): 다수의 표적 사이를 최고 속도로 이동하여 순차 사격하는 능력으로, 다인 교전 클러치 상황의 핵심 역량입니다."
      }
    },
    {
      "@type": "Question",
      "name": "에임 연습 시 손목 에임과 팔 에임 중 어떤 방식을 사용해야 하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "프로 선수들이 사용하는 최적의 방식은 팔과 손목, 손가락을 모두 유기적으로 활용하는 하이브리드 에임(Hybrid Aiming)입니다. 팔꿈치와 전완근(Forearm)은 180도 화면 회전과 광범위한 좌우 각도 전환을 담당하고, 손목(Wrist)은 중거리 목표물 조준을, 손가락 끝(Fingertip)은 헤드라인 미세 교정과 수직 반동 제어를 미세하게 보정합니다. 손목만 단독으로 사용할 경우 가동 범위가 좁아지고 수근관 증후군(손목 터널 증후군) 위험이 커지며, 팔만 사용할 경우 픽셀 단위의 미세 조준력이 저하됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "자신에게 맞는 최적의 eDPI 및 cm/360 감도는 어떻게 찾나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "마우스 감도는 마우스패드 위에서 360도 회전하는 데 필요한 물리적 이동 거리인 cm/360으로 표준화하여 측정합니다. 발로란트, 카스2 같은 저감도 택티컬 FPS는 35~55 cm/360 (eDPI 200~320 수준)이 미세 조준 안정성에 가장 유리하며, 에이펙스 레전드나 오버워치 같은 트래킹 중심 하이퍼 FPS는 24~38 cm/360의 중감도가 광범위한 타깃 추적에 적합합니다. 좌우로 스트레이프 무빙을 하면서 정지된 고정 표적에 크로스헤어를 흔들림 없이 유지할 수 있는 감도가 본인에게 가장 이상적인 감도입니다."
      }
    },
    {
      "@type": "Question",
      "name": "에임이 떨리거나 목표물을 지나치는 오버플릭 현상은 어떻게 교정하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "에임 떨림과 오버플릭(Overshooting)의 주된 원인은 전완근의 과도한 긴장, 마우스 그립을 너무 강하게 쥐는 버릇, 또는 본인의 신경근 제동력보다 높은 감도를 사용하는 데 있습니다. 이를 교정하려면: 1) 마우스패드 표면과의 적절한 마찰력을 활용하여 동작 종단에서 손바닥 하단과 손가락으로 마우스를 지그시 누르는 제동 기술(Braking Mechanism)을 연습하고, 2) 스무스 퍼슈트(Smooth Pursuit) 트래킹 훈련을 통해 근육 긴장도를 낮추며, 3) 감도를 10~15% 낮추어 오차 허용 범위를 확보하는 것이 효과적입니다."
      }
    },
    {
      "@type": "Question",
      "name": "브라우저 기반 에임 트레이너가 스팀 다운로드 프로그램만큼 반응이 빠른가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네. SkillDrills는 W3C 표준 Raw Pointer Lock API와 HTML5 하드웨어 가속 캔버스를 사용하여 운영체제의 마우스 가속 곡선과 바탕화면 경계를 완전히 우회하고 순수 하드웨어 델타값(movementX/movementY)을 직접 처리합니다. 또한 렌더링 프레임과 분리된 고정 시간 간격 물리 엔진을 탑재하여 144Hz, 240Hz, 360Hz 게이밍 모니터의 초고주사율에서도 입력 지연(Input Lag) 없이 프로급 1:1 하드웨어 입력을 지원합니다."
      }
    },
    {
      "@type": "Question",
      "name": "크로스헤어 플레이스먼트(헤드라인)와 순수 플릭 에임 중 실전에서 무엇이 더 중요한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "택티컬 슈팅 게임에서 교전 승률의 약 70%는 적이 나타날 경로와 높이에 미리 에임을 두고 피킹하는 크로스헤어 플레이스먼트(선조준)에서 결정됩니다. 그러나 적이 예상 밖의 오프 앵글에 위치하거나 기습적인 와이드 스윙, 난전 상황에서는 선조준만으로 대응할 수 없습니다. 이때 200ms 이내에 목표물을 정확히 낚아채는 순수 플릭(Flick)과 마이크로 교정 속도가 나머지 30%의 승리를 결정짓는 궁극적인 실력 차이를 만듭니다."
      }
    },
    {
      "@type": "Question",
      "name": "하루에 에임 연습은 몇 분 정도 하는 것이 가장 효과적인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "운동 제어 및 신경과학 연구에 따르면 뇌신경의 미세 운동 학습 피로는 집중 훈련 약 30~35분 경과 후 급격히 누적됩니다. 따라서 하루 15분에서 25분 정도의 고강도 집중 훈련을 주 4~6회 지속하는 것이 가장 효과적입니다. 주말에 몇 시간씩 몰아서 연습하는 것보다 매일 짧고 밀도 높은 세션을 진행한 뒤 충분한 수면을 취할 때 신경 수초화(Myelination)가 촉진되어 근육 기억이 안정적으로 정착됩니다."
      }
    }
  ]
};

export default function LocalizedFPSHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FPSHubClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}

