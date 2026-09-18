import VisualTrackingDrillsClient from '@/app/drills/visual-tracking/VisualTrackingDrillsClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const trackingDrills = DRILLS.filter((d) => d.category === 'visual-tracking');

export const metadata = {
  title: '동체시력 훈련 & 시각 추적 도감 – 무료 안구 운동 | SkillDrills',
  description: '온라인 무료 동체시력 훈련 및 시각 추적 프로그램. 부드러운 안구 추종(Smooth Pursuit), 궤적 예측, 주변시 등 14가지 과학적 안구 훈련을 바로 시작하세요.',
  keywords: [
    '동체시력 훈련', '시각 추적 훈련', '안구 운동 훈련',
    '동체시력 테스트', '부드러운 안구 추종 운동', '도약 안구 운동 훈련',
    '에임 트래킹 연습', '시선 고정 안정성', '야구 동체시력 기르기',
    '주변시 훈련', 'FPS 트래킹 에임 사이트', '탄도 궤적 예측 훈련',
    '전정 안구 반사 VOR', '무료 동체시력 게임', '안구 피로 회복 시기능 훈련'
  ],
  openGraph: {
    title: '동체시력 훈련 & 시각 추적 도감 – 무료 안구 운동 | SkillDrills',
    description: '온라인 무료 동체시력 훈련 및 시각 추적 프로그램. 부드러운 안구 추종(Smooth Pursuit), 궤적 예측, 주변시 등 14가지 과학적 안구 훈련을 바로 시작하세요.',
    type: 'website',
    url: 'https://skilldrills.online/ko/drills/visual-tracking',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: '온라인 무료 동체시력 및 시각 추적 훈련 도감' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '동체시력 훈련 & 시각 추적 도감 – 무료 안구 운동 | SkillDrills',
    description: '부드러운 안구 추종부터 탄도 궤적 예측까지 14가지 전문 안구 운동 드릴을 브라우저에서 무료로 시작하세요.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/visual-tracking',
    languages: getAlternateLanguages('/ko/drills/visual-tracking'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ko" },
    { "@type": "ListItem", "position": 2, "name": "전체 훈련 도감", "item": "https://skilldrills.online/ko/drills" },
    { "@type": "ListItem", "position": 3, "name": "동체시력 및 시각 추적", "item": "https://skilldrills.online/ko/drills/visual-tracking" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "무료 동체시력 및 시각 추적(Visual Tracking) 훈련 도감",
  "url": "https://skilldrills.online/ko/drills/visual-tracking",
  "description": "부드러운 안구 추종(Smooth Pursuit), 사인파 추적, 무한대 궤적, 탄도 예측, 주변시 등 14가지 전문 안구 운동 프로그램을 무료로 제공합니다.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": trackingDrills.map((drill) => {
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
      "name": "부드러운 안구 추종(Smooth Pursuit)과 도약 안구 운동(Saccades)의 생리학적 차이는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "부드러운 안구 추종 운동(Smooth Pursuit Eye Movement, SPEM)은 날아가는 공이나 움직이는 적처럼 이동하는 시각 목표물을 망막의 가장 해상도가 높은 중심와(Fovea)에 지속적으로 유지하기 위해 안구가 자율적으로 미끄러지듯 추적하는 운동입니다. 반면 도약 안구 운동(Saccades)은 정지된 두 지점 사이를 초당 최대 900도의 속도로 순간 점프하여 시선을 재배치하는 탄도성 운동입니다. 야구, 테니스, FPS 게임에서 빠른 물체의 이동 궤적을 놓치지 않고 분석하려면 강력한 안구 추종 능력이 필수적입니다."
      }
    },
    {
      "@type": "Question",
      "name": "동체시력(Dynamic Visual Acuity) 훈련이 스포츠 경기력과 게임 실력에 어떤 영향을 미치나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "정지 시력이 아무리 뛰어나도 고속으로 이동하는 물체를 선명하게 포착하지 못하면 정확한 타격이나 사격이 불가능합니다. 동체시력 훈련은 외안근(Extraocular Muscles) 6개의 협응력을 강화하여 고속 비행하는 야구공이나 급격히 대시하는 인게임 캐릭터의 윤곽선을 선명하게 유지시킵니다. 이를 통해 시각 피질의 정보 처리 지연을 50~80ms 단축시켜, 타자에게는 공의 구종을 판단할 시간을, 게이머에게는 정확한 트래킹 에임 락온(Lock-on) 기회를 제공합니다."
      }
    },
    {
      "@type": "Question",
      "name": "예측적 시각 추적(Predictive Pursuit)이란 무엇이며, 표적이 일시적으로 가려졌을 때 어떻게 반응하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "예측적 시각 추적은 표적이 장애물 뒤로 숨거나 순간적으로 깜빡일 때(Strobe/Occlusion), 뇌의 소뇌(Cerebellum)가 내부 순방향 모델을 활용하여 물체의 속도와 가속도를 계산하고 궤적을 외삽(Extrapolation)하는 고급 시각 인지 과정입니다. 타깃 차폐 드릴을 꾸준히 수행하면 표적이 화면에서 잠시 사라지더라도 시선이 표적보다 앞서 이동하여, 표적이 다시 나타나는 순간 지체 없이 헤드샷이나 리드 사격을 성공시킬 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "시각 추적 도중 발생하는 보상성 도약(Catch-up Saccade) 현상은 왜 발생하며 어떻게 교정하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "보상성 도약(Catch-up Saccade)은 안구의 추종 속도가 표적의 이동 속도를 따라가지 못해(Pursuit Gain < 1.0), 뒤처진 시선을 표적으로 맞추기 위해 눈이 튕기듯 덜컹거리는 현상입니다. 이로 인해 시야가 흔들리고 미세 트래킹이 끊기게 됩니다. 이를 교정하기 위해서는 일정한 저속 추종(Constant Slow Pursuit) 및 부드러운 사인파 곡선 드릴부터 시작하여 안구 모터 게인을 점진적으로 높여야 하며, 과도한 안면 근육 긴장을 풀고 부드럽게 시선을 유지하는 이완 훈련이 병행되어야 합니다."
      }
    },
    {
      "@type": "Question",
      "name": "시기능 훈련(Vision Therapy)과 뇌진탕 후유증 회복에 안구 추종 훈련이 도움이 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, 신경안과 및 스포츠 의학에서는 뇌진탕 후 증후군(PCS) 및 안구 운동 기능 장애 환자에게 부드러운 안구 추종 및 시선 안정화 훈련을 필수적으로 처방합니다. 점진적인 시각 추적 드릴은 뇌간과 소뇌를 자극하여 양안 협응력을 재건하고, 두통, 어지럼증, 독서 시의 집중력 저하를 완화하는 데 탁월한 임상적 효과를 발휘합니다."
      }
    },
    {
      "@type": "Question",
      "name": "시선 고정 안정성(Gaze Stability)과 전정 안구 반사(VOR)는 어떤 관계가 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "시선 고정 안정성은 머리나 신체가 격렬하게 움직이는 환경에서도 시야의 흔들림 없이 특정 목표물에 시선을 고정하는 능력입니다. 이는 내이의 전정기관과 외안근이 연결되어 머리 움직임과 정반대 방향으로 안구를 동일한 속도로 회전시키는 전정 안구 반사(Vestibulo-Ocular Reflex, VOR)에 기반합니다. 시각 추적 드릴을 통해 미세 외안근 조절력을 강화하면 신체 기동 중에도 조준선이 흔들리지 않고 안정적으로 유지됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "안구 추적 훈련은 하루에 몇 분 정도 진행하는 것이 눈 건강에 안전한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "안구를 움직이는 6개의 외안근은 매우 섬세한 근섬유로 구성되어 있어 쉽게 피로해집니다. 권장되는 최적 루틴은 하루 10~15분 내외, 주 3~5회입니다. 20분 이상 무리하게 안구 추적을 지속하면 조절 경련, 안구 건조, 눈 주위 피로감이 발생할 수 있으므로, 세션 도중 먼 산이나 6미터 이상 먼 곳을 20초간 바라보며 눈의 피로를 풀어주는 '20-20-20 규칙'을 준수하는 것이 중요합니다."
      }
    },
    {
      "@type": "Question",
      "name": "동체시력 및 안구 추적 훈련에서 고주사율 모니터(144Hz~360Hz)가 필수적인 이유는?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "일반 60Hz 모니터는 프레임이 16.7ms마다 갱신되므로 고속 이동 표적이 잔상(Ghosting)을 남기거나 뚝뚝 끊겨 보이는 계단 현상이 발생합니다. 이는 눈이 부드러운 추종을 유지하지 못하고 불필요한 보상성 도약을 유발하게 만듭니다. 반면 144Hz, 240Hz, 360Hz 초고주사율 디스플레이는 프레임 간격을 2.7~6.9ms로 단축시켜 실세계와 완벽히 동일한 물리적 연속성을 제공하므로, 외안근이 자연스럽고 매끄러운 유기적 추종 운동을 온전히 체득할 수 있습니다."
      }
    }
  ]
};

export default function LocalizedVisualTrackingDrillsClientPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <VisualTrackingDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}

