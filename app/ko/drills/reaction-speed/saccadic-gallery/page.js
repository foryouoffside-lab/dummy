import SaccadicGalleryClient from '@/app/drills/reaction-speed/saccadic-gallery/SaccadicGalleryClient';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — ko-KR (reaction-speed / saccadic-gallery)
// PRIMARY DOMESTIC: "단속성 안구운동 훈련" / "안구 도약 운동"
// SECONDARY / LSI:
//   "시선 도약 훈련" / "사케드 안구운동" / "동체시력 훈련"
//   "시각 포착 속도" / "중심와 고정" / "안구 반응속도"
// ============================================================

export const metadata = {
  title: '단속성 안구운동 훈련 – 시선 도약 반응속도 테스트 | SkillDrills',
  description:
    '무료 온라인 단속성 안구운동 훈련. 화면 속 표적을 향해 시선을 순간 점프시켜 안구 도약 속도와 중심와 포착 정확도를 정밀하게 측정하고 단련합니다.',
  keywords: [
    '단속성 안구운동 훈련',
    '안구 도약 운동',
    '시선 도약 훈련',
    '사케드 안구운동',
    '동체시력 훈련',
    '시각 포착 속도',
    '중심와 고정',
    '안구 반응속도',
    '이스포츠 시각 훈련',
    '안구 협응력',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/reaction-speed/saccadic-gallery',
    languages: getAlternateLanguages('/drills/reaction-speed/saccadic-gallery'),
  },
  openGraph: {
    title: '단속성 안구운동 훈련 – 시선 도약 반응속도 테스트 | SkillDrills',
    description:
      '무료 온라인 단속성 안구운동 훈련. 화면 곳곳에서 번쩍이는 타깃을 향해 시선을 순간 점프시켜 시각 포착 속도를 측정하세요.',
    type: 'article',
    url: 'https://skilldrills.online/ko/drills/reaction-speed/saccadic-gallery',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '단속성 안구운동 훈련 – 시선 도약 반응속도 테스트 | SkillDrills',
    description:
      '무료 온라인 단속성 안구운동 훈련. 시선 도약 반응속도와 중심와 고정 정밀도를 향상시키세요.',
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills 홈', item: 'https://skilldrills.online/ko' },
    { '@type': 'ListItem', position: 2, name: '훈련 허브', item: 'https://skilldrills.online/ko/drills' },
    { '@type': 'ListItem', position: 3, name: '반응 속도', item: 'https://skilldrills.online/ko/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: '단속성 안구운동 훈련', item: 'https://skilldrills.online/ko/drills/reaction-speed/saccadic-gallery' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '단속성 안구운동 훈련 – 시선 도약 반응속도 측정 도구',
  alternateName: ['사케드 트레이너', '안구 도약 운동 측정기', '시각 탐색 훈련'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  description:
    '웹 브라우저에서 화면 주변부에 출현하는 고대비 표적으로 시선을 초고속 도약시켜 중심와 고정 지연 시간을 정밀 측정하는 시지각 훈련 도구.',
  browserRequirements: '자바스크립트 및 HTML5 Canvas를 지원하는 최신 브라우저',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '단속성 안구운동 훈련 — 시선 도약 반응속도 | SkillDrills',
  url: 'https://skilldrills.online/ko/drills/reaction-speed/saccadic-gallery',
  description:
    '무료 온라인 안구 도약 훈련. 단속성 안구운동 속도와 주변 시야 탐색 능력을 극대화하는 브라우저 반응속도 게임.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: '자바스크립트를 지원하는 최신 브라우저 필요.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: '단속성 안구운동, 안구 도약 속도, 주변 시야 포착, 중심와 정렬, 동체시력',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: '단속성 안구운동 훈련 - 시선 도약 속도 게임',
  url: 'https://skilldrills.online/ko/drills/reaction-speed/saccadic-gallery',
  description: '웹 브라우저 기반 안구 도약 반응속도 및 표적 포착 정밀 훈련 게임.',
  genre: ['Vision Training', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: '단속성 안구운동 및 시선 도약 속도 훈련 방법',
  description: '시야 주변부 표적을 빠르게 탐색하고 중심와로 포착하는 단계별 훈련 지침.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '자세 정렬 및 화면 중심 응시',
      text: '모니터와 50~70cm 거리를 유지하고 시선을 화면 정중앙 기준점에 고정합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/saccadic-gallery#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '주변 시야 표적 점멸 감지',
      text: '머리를 고정한 채 주변 시야에서 번쩍이는 고대비 타깃을 즉각 감지합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/saccadic-gallery#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '탄도성 안구 도약 실행',
      text: '중간 흔들림 없이 시축을 타깃의 중심 좌표로 단번에 점프시킵니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/saccadic-gallery#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: '중심와 고정 및 타격 확인',
      text: '타깃 중심에 선명하게 초점을 맞추고 클릭하여 반응 지연 시간을 기록합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/saccadic-gallery#step-4',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-15',
  mainEntity: [
    {
      '@type': 'Question',
      name: '단속성 안구운동(사케드) 훈련이란 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '단속성 안구운동(Saccadic Eye Movement) 훈련은 시야 내 한 주시점에서 다른 지점으로 시선을 순간적으로 도약시키는 속도, 정확도, 반응 지연 시간을 향상시키는 전문 시지각 훈련입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '인간의 시각 시스템에서 사케드(Saccade)의 속도는 어느 정도인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '사케드는 최대 각속도가 초당 200~700도(deg/sec)에 달하며, 인체에서 일어나는 가장 빠른 생물학적 운동 중 하나입니다(Rayner, 1998).',
      },
    },
    {
      '@type': 'Question',
      name: '익스프레스 사케드(Express Saccades)란 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '익스프레스 사케드(Fischer & Boch, 1984)는 약 100~120ms라는 극도로 짧은 지연 시간 만에 발동되는 초고속 도약 운동으로, 중뇌 상구(Superior Colliculus)의 직접적인 신경 회로를 통해 유발됩니다.',
      },
    },
    {
      '@type': 'Question',
      name: '사케드 훈련이 FPS 및 실전 게이밍에 어떤 도움을 주나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '발로란트나 CS2 같은 게임에서 코너를 확인하거나 미니맵을 읽고 급작스럽게 나타난 적을 조준할 때 시각 억제 시간을 최소화하여 선제공격 성공률을 높입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '사케드 억제(Saccadic Suppression)란 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '안구가 초고속으로 점프하는 20~40ms 동안 뇌가 시각 정보 처리를 일시 중단하여 모션 블러나 어지럼증을 방지하는 신경학적 방어 기제입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '사케드 변형(Saccadic Dysmetria)이란 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '시선이 표적에 미치지 못하거나(과소 도약) 표적을 지나쳐버려(과대 도약) 중심와 초점을 맞추기 위해 미세한 2차 교정 사케드가 추가로 소요되는 현상입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '모니터 주사율이 사케드 측정에 미치는 영향은 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '144Hz나 240Hz 모니터는 프레임 지연이 4~7ms 수준으로 낮아(Woods et al., 2015), 망막이 표적 출현을 훨씬 빠르게 인식하여 안구운동 발동을 앞당깁니다.',
      },
    },
    {
      '@type': 'Question',
      name: '사케드 훈련이 읽기 속도와 집중력 향상에도 도움이 되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네. 정밀한 단속성 안구 제어는 줄 바꿈 시 시선 이탈을 줄이고 역행 주시(Regression)를 방지하여 텍스트 정보 처리 속도를 높여줍니다.',
      },
    },
    {
      '@type': 'Question',
      name: '단속성 안구운동 훈련은 하루에 얼마나 하는 것이 좋나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '하루 5~10분 정도의 집중 세션이 가장 적절합니다. 과도한 연속 훈련은 외안근 피로를 유발하므로 짧고 기민한 세트가 권장됩니다.',
      },
    },
    {
      '@type': 'Question',
      name: '이 훈련 도구는 무료로 제공되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네. SkillDrills의 단속성 안구운동 훈련은 100% 무료이며 별도 설치나 회원가입 없이 브라우저에서 High Resolution Time API(performance.now())로 정밀 측정됩니다.',
      },
    },
  ],
};

const saccadicGuide = {
  heading: '단속성 안구운동(사케드) 훈련 가이드: 시선 도약 속도와 안구 기민성',
  intro: [
    '단속성 안구운동(사케드)은 시선 중심을 한 주시점에서 다음 주시점으로 신속하게 탄도식으로 도약시키는 핵심 시각 메커니즘입니다(Rayner, 1998; Fischer & Boch, 1984).',
    '최대 각속도가 초당 700도에 달하는 사케드 중에는 뇌가 시각 정보를 순간적으로 차단하는 사케드 억제(Saccadic Suppression)가 발생합니다. 시선이 표적에 정확히 꽂히지 못하면 교정 사케드가 발생하여 소중한 반응 시간이 낭비됩니다. 본 훈련은 교정 사케드를 최소화하고 단 한 번의 도약으로 표적 정중앙에 중심와를 정렬하는 기민성을 단련합니다.',
    '측정 정밀도 안내: 모든 연산은 사용자 브라우저에서 로컬로 진행됩니다. 브라우저 보안 타이머(약 1ms 양자화), 디스플레이 프레임 지연(60Hz 16.7ms, 240Hz 4.1ms; Woods et al., 2015) 및 마우스 입력 주기가 반영됩니다. 5ms 미만의 오차는 측정 노이즈로 해석하십시오.',
    '동일한 기기 환경에서 지속적으로 훈련하여 실질적인 안구 운동 능력과 반응 지연 시간의 단축 추이를 점검하십시오.',
  ],
  benchmarks: {
    title: '단속성 안구운동 도약 지연 기준표',
    headers: ['사케드 반응 지연', '등급 티어', '도약 메커니즘 특성', '실전 적용 분야', '추천 훈련 중점'],
    rows: [
      ['< 130 ms', '신계・익스프레스 (Apex / Pro)', '상구(Superior Colliculus) 직결 서브코티컬 점프; 극소 지연', '프로 게이머 / 전투기 조종사 (Fischer & Boch, 1984)', '최대 각도 도약 시 안정성 유지'],
      ['130 – 170 ms', '엘리트 (Elite)', '극도로 신속한 피질 발동; 주시 해제 딜레이 최소화', '상위권 e스포츠 선수 / 프로 운동선수', '표적 착지 시 오버슈트 방지 훈련'],
      ['171 – 220 ms', '고급 게이머 (Advanced)', '건강한 성인의 표준 정상 안구 도약 반응 시간', '일반 성인 건강 기준선 (Rayner, 1998)', '주변 시야 인지 반경 확장'],
      ['221 – 280 ms', '중급자 (Intermediate)', '주시 억제 해제 지연 발생; 약간의 시선 탐색 지체', '일시적 시각 피로 또는 불완전한 회복 상태', '20-20-20 안구 휴식 적용'],
      ['> 280 ms', '입문・성장 (Developing)', '명확한 사케드 변형 및 2차 교정 사케드 빈발', '외안근 피로 누적 또는 시각적 주의 산만', '속도보다 원샷 안구 착지 정확도 집중'],
    ],
    note: '본 기준표는 신경안과학 안구운동 연구(Rayner, 1998; Fischer & Boch, 1984; Leigh & Zee, 2015)를 토대로 디지털 환경 디스플레이 지연(Woods et al., 2015)을 감안하여 산정되었습니다.',
  },
  techniques: {
    title: '시선 도약 반응속도 최적화 테크닉',
    items: [
      {
        name: '머리 회전 억제 및 안구 독립 운동',
        desc: '고개를 돌리지 않고 안구만 독립적으로 움직이도록 훈련하세요. 순수한 안구 도약은 고개 회전이 결합된 동작보다 2배 이상 빠릅니다.',
        tips: '턱을 손에 살짝 괴고 고개가 돌아가는지 점검해보세요.',
      },
      {
        name: '주변 시야 사전 탐색',
        desc: '화면 중심을 부드럽게 바라보며 주변 망막으로 타깃의 위치를 먼저 포착한 뒤 안구 도약을 개시하세요.',
        tips: '터널 시야에 빠지지 않도록 시야를 넓게 유지하세요.',
      },
      {
        name: '원샷 중심와 고정 (Stopping Power)',
        desc: '표적을 지나치거나 모자라게 도약하지 않고 목표 지점에 시선을 딱 멈추는 제동 능력이 반응속도의 핵심입니다.',
        tips: '무리한 속도 경쟁보다 정확한 착지를 우선시하세요.',
      },
      {
        name: '눈 근육 이완과 깜빡임 유지',
        desc: '모니터 응시 중 깜빡임이 줄어들면 안구 건조로 인해 근육 협응력이 급격히 저하됩니다.',
        tips: '세트 사이에 의식적으로 눈을 깜빡이고 먼 곳을 바라보세요.',
      },
    ],
  },
  steps: [
    '화면 중앙에서 약 60cm 거리를 두고 정면으로 앉습니다.',
    '훈련을 시작하고 중앙에 표시되는 시작점에 시선을 둡니다.',
    '화면 어디선가 표적이 점멸하는 즉시 안구만 빠르게 날립니다.',
    '표적 정중앙에 초점을 맞추고 즉시 클릭하여 반응을 기록합니다.',
    '세트를 완료하고 평균 사케드 도약 지연 시간과 정확도를 점검합니다.',
  ],
  audience: 'FPS(발로란트, 오버워치, 에이펙스) 게이머, 구기 종목 운동선수, 독서 속도 및 시각 탐색 속도를 단련하려는 모든 이용자.',
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('rayner1998', 'fischer1984', 'leigh2015', 'woods2015'),
  related: [
    { href: '/ko/drills/reaction-speed', label: '반응 속도 허브' },
    { href: '/ko/drills/reaction-speed/reaction-time-test', label: '반응속도 테스트' },
    { href: '/ko/drills/reaction-speed/reflex-training-drill', label: '순발력 테스트 (반사신경 게임)' },
    { href: '/ko/drills/reaction-speed/visual-tracking-speed-test', label: '동체시력 테스트' },
  ],
};

export default function KoreanSaccadicGalleryPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SaccadicGalleryClient copy={{ title: '단속성 안구운동 훈련' }} />
      <DrillGuide guide={saccadicGuide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="reaction-speed" currentHref="https://skilldrills.online/ko/drills/reaction-speed/saccadic-gallery" />
      </div>
    </>
  );
}
