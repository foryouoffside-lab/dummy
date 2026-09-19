import FPSTrackingTrainerClient from '@/app/drills/reaction-speed/fps-tracking-trainer/FPSTrackingTrainerWrapperLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS – ko-KR (reaction-speed / fps-tracking-trainer)
// PRIMARY DOMESTIC: "트래킹 에임 연습" / "마우스 트래킹 트레이너"
// SECONDARY / LSI:
//   "스무스 에임 훈련" / "따라가기 에임"
//   "에임 떨림 교정" / "스트레이프 트래킹"
// ============================================================

export const metadata = {
  title: '트래킹 에임 연습 – 마우스 스무스 에임 훈련 | SkillDrills',
  description: '무료 온라인 트래킹 에임(따라가기 에임) 연습. 움직이는 표적을 부드럽게 추적하고 에임 떨림을 교정하여 일관된 조준 제어력을 기릅니다.',
  keywords: [
    '트래킹 에임 연습',
    '마우스 트래킹 트레이너',
    '스무스 에임 훈련',
    '따라가기 에임',
    '에임 떨림 교정',
    '스트레이프 트래킹',
    '에이펙스 트래킹 훈련',
    '동체시력 추적 훈련',
    '마우스 제어력 향상',
    '오버워치 트래킹 에임',
    '반응형 에임 연습',
    '부드러운 에임 루틴',
  ],
  openGraph: {
    title: '트래킹 에임 연습 – 마우스 스무스 에임 훈련 | SkillDrills',
    description: '무료 온라인 트래킹 에임(따라가기 에임) 연습. 움직이는 표적을 부드럽게 추적하고 에임 떨림을 교정하여 일관된 조준 제어력을 기릅니다.',
    type: 'article',
    url: 'https://skilldrills.online/ko/drills/reaction-speed/fps-tracking-trainer',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '트래킹 에임 연습 – 마우스 스무스 에임 훈련 | SkillDrills',
    description: '무료 온라인 트래킹 에임(따라가기 에임) 연습. 움직이는 표적을 부드럽게 추적하고 에임 떨림을 교정하여 일관된 조준 제어력을 기릅니다.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/reaction-speed/fps-tracking-trainer',
    languages: getAlternateLanguages('/drills/reaction-speed/fps-tracking-trainer'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills 홈', item: 'https://skilldrills.online/ko' },
    { '@type': 'ListItem', position: 2, name: '훈련 허브', item: 'https://skilldrills.online/ko/drills' },
    { '@type': 'ListItem', position: 3, name: '반응속도', item: 'https://skilldrills.online/ko/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: '트래킹 에임 연습', item: 'https://skilldrills.online/ko/drills/reaction-speed/fps-tracking-trainer' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '트래킹 에임 연습 – 마우스 스무스 에임 및 추적 훈련',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  description: 'FPS 게이머를 위한 브라우저 기반 트래킹 에임 훈련 툴. 움직이는 표적을 부드럽게 조준선에 유지시키는 안구 및 근육 협응 훈련.',
  url: 'https://skilldrills.online/ko/drills/reaction-speed/fps-tracking-trainer',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  inLanguage: 'ko-KR',
  dateModified: '2026-09-15',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '트래킹 에임 트레이너',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'HTML5 Canvas, 포인터 락 지원 최신 웹 브라우저',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  url: 'https://skilldrills.online/ko/drills/reaction-speed/fps-tracking-trainer',
  inLanguage: 'ko-KR',
  dateModified: '2026-09-15',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'FPS Tracking Trainer – 연속 표적 추적 에임 게임',
  url: 'https://skilldrills.online/ko/drills/reaction-speed/fps-tracking-trainer',
  description: '부드러운 안구 추적(Smooth Pursuit)과 마우스 제어력을 극대화하여 불규칙 이동 표적을 타격하는 브라우저 게임.',
  genre: ['Action', '에임 트레이너', '이스포츠 시각 훈련'],
  gamePlatform: ['Web Browser', 'Desktop'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'FPS 트래킹 에임 트레이너란 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '불규칙하게 이동하고 좌우로 무빙하는 적 표적 위에 조준선을 끈김이나 떨림 없이 부드럽게 올려두는 부드러운 안구 추적(Smooth Pursuit) 및 미세 근육 제어 훈련 도구입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '트래킹 에임을 실질적으로 향상시키는 3대 원칙은?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '손목의 과도한 그립 긴장을 풀어 미세 떨림을 방지하고, 적의 방향 전환을 지레짐작하지 않고 실제 속도 벡터를 시각으로 읽으며, 손목(미세 조정)과 팔 전체(넓은 글라이딩)를 부드럽게 연계하는 것입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '트래킹할 때 에임이 심하게 떨리는(Shaky Aim) 이유는 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '손가락과 손목에 불필요한 힘이 들어가 미세 떨림이 증폭되거나, 지나치게 높은 마우스 감도를 사용하거나, 부드러운 글라이딩 대신 짧은 끊어치기(Micro-flick)로 오차를 수정하려 하기 때문입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '트래킹 중에는 조준선과 적 중 어디를 바라보아야 하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '적의 캐릭터 모델을 직접 응시해야 합니다. 시각 심리학(Krauzlis, 2004)에 따르면 시각적 주의가 표적의 속도 신호에 집중되어야만 뇌가 정확한 속도 벡터를 계산할 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '에임 훈련에서 스무스 퍼슈트(Smooth Pursuit)란?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '안구의 회전 속도를 움직이는 표적의 속도와 정확히 일치시켜 상을 중심와에 고정하는 시각 운동 기제입니다(Rashbass, 1961).',
      },
    },
    {
      '@type': 'Question',
      name: '트래킹 에임에 가장 적합한 마우스 감도는?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '일반적으로 360도 회전당 28cm~45cm의 중감도가 권장됩니다. 원거리 미세 트래킹의 정밀도와 근거리 급격한 방향 전환 시 팔을 시원하게 뻗을 수 있는 안정성을 동시에 제공합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '고주사율 모니터가 트래킹 정확도에 도움을 주나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, 144Hz~240Hz 모니터는 프레임 표시 간격을 4.1ms로 단축시켜(Woods et al., 2015) 모션 블러를 획기적으로 줄이고 적의 감속 및 방향 전환 조짐을 훨씬 빠르게 포착하게 돕습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '스트레이프(좌우 무빙) 트래킹을 잘하는 비결은?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '적이 방향을 바꿀 시점을 예측하여 먼저 마우스를 꺾지 말고, 방향 전환이 시각적으로 확인된 직후 침착하게 마우스를 따라 전환하는 반응적 트래킹 습관을 길러야 합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '하루에 몇 분 정도 트래킹 훈련을 진행해야 하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '하루 15분에서 25분의 집중적인 연습이 가장 적합합니다. 45분을 넘어가면 근신경계 피로가 누적되어 나쁜 끊어치기 버릇이 들 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '이 트래킹 트레이너는 무료인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, SkillDrills 트래킹 트레이너는 프로그램 설치나 로그인 없이 브라우저에서 100% 무료로 정밀하게 이용할 수 있습니다.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: '트래킹 에임 연습 및 스무스 에임 훈련법',
  description: '마우스 감도 조절, 표적 시각 고정 및 부드러운 속도 동기화를 위한 단계별 가이드.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '감도 최적화 및 전체화면 모드 실행',
      text: '게임 환경에 맞는 마우스 DPI를 맞추고 전체화면 모드로 전환하여 브라우저 테두리 간섭을 차단합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/fps-tracking-trainer#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '이동하는 표적 자체에 시선 고정',
      text: '내 마우스 조준선을 멍하니 보지 말고, 움직이는 표적의 중심 모델에 시각 초점을 집중합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/fps-tracking-trainer#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '부드러운 마우스 글라이딩(스무스 퍼슈트)',
      text: '손목에 힘을 빼고 표적의 이동 속도에 맞춰 마우스를 끊김 없이 부드럽게 활주시키며 유지합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/fps-tracking-trainer#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: '표적 방향 전환에 침착하게 반응',
      text: '표적이 반대로 꺾이는 순간 당황하여 급격히 플릭하지 않고 시각 확인 후 부드럽게 마우스 궤적을 수정합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/fps-tracking-trainer#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('krauzlis2004', 'rashbass1961', 'green2003', 'woods2015'),
  intro: {
    title: '트래킹 에임 연습 및 스무스 에임 정복 가이드',
    paragraphs: [
      '에이펙스 레전드, 오버워치, 발로란트 등 빠른 템포의 FPS에서 가장 확실한 화력 투사를 결정짓는 메커니즘은 바로 트래킹 에임(Tracking Aim)입니다. 순간적인 끌어치기와 달리 트래킹은 시각과 손의 지속적인 실시간 피드백 루프를 요구합니다.',
      '신경안과학적으로 이는 표적의 속도 벡터에 시선을 동기화시키는 부드러운 안구 추적(Smooth Pursuit; Rashbass, 1961)에 기반합니다. 표적이 빗나갔을 때 끊어치는 미세 플릭으로 교정하려 들면 에임이 덜덜 떨리는 지터링(Jitter)이 발생하므로, 손목 긴장을 풀고 부드러운 글라이딩을 유지하는 것이 핵심입니다.',
      '고주사율 모니터(Woods et al., 2015)에서 지속적으로 연습하면 적의 기동 신호를 조기에 식별(Krauzlis, 2004; Green & Bavelier, 2003)하고 자석처럼 달라붙는 안정적인 크로스헤어 통제력을 확립할 수 있습니다.',
    ],
  },
  benchmarks: {
    title: '트래킹 에임 정확도 및 유지율 성능 기준표',
    headers: ['티어 단계', '랭크 분류', '트래킹 정확도', '유효 추적 시간', '상위 백분위'],
    rows: [
      ['Tier 1', '신계・익스프레스 (Apex / Pro)', '95 %+', '90 %+ 유지율', 'Top 1 %'],
      ['Tier 2', '엘리트 (Elite / Master)', '88 – 94 %', '80 – 89 % 유지율', 'Top 5 %'],
      ['Tier 3', '프로 (Diamond / Platinum)', '78 – 87 %', '68 – 79 % 유지율', 'Top 15 %'],
      ['Tier 4', '중급 (Gold / Silver)', '65 – 77 %', '50 – 67 % 유지율', 'Top 50 %'],
      ['Tier 5', '초급 (Bronze / Novice)', '< 65 %', '< 50 % 유지율', '기본'],
    ],
    note: '스무스 퍼슈트 안구 운동 및 속도 오차 보정 연구(Rashbass, 1961; Krauzlis, 2004)와 고성능 게이밍 입력 환경(Woods et al., 2015)을 기반으로 도출된 기준치입니다.',
  },
  protocols: {
    title: '과학적 4단계 트래킹 훈련 프로토콜',
    description: '에임 떨림을 없애고 일관된 표적 고정 능력을 기르기 위한 체계적 훈련 절차.',
    items: [
      {
        title: '감도 최적화 및 전체화면 모드 실행',
        description: '게임 환경에 맞는 마우스 DPI를 맞추고 전체화면 모드로 전환하여 브라우저 테두리 간섭을 차단합니다.',
      },
      {
        title: '이동하는 표적 자체에 시선 고정',
        description: '내 마우스 조준선을 멍하니 보지 말고, 움직이는 표적의 중심 모델에 시각 초점을 집중합니다.',
      },
      {
        title: '부드러운 마우스 글라이딩(스무스 퍼슈트)',
        description: '손목에 힘을 빼고 표적의 이동 속도에 맞춰 마우스를 끊김 없이 부드럽게 활주시키며 유지합니다.',
      },
      {
        title: '표적 방향 전환에 침착하게 반응',
        description: '표적이 반대로 꺾이는 순간 당황하여 급격히 플릭하지 않고 시각 확인 후 부드럽게 마우스 궤적을 수정합니다.',
      },
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

export default function KoreanFPSTrackingTrainerPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <FPSTrackingTrainerClient copy={{ title: '트래킹 에임 연습' }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="reaction-speed"
          currentHref="https://skilldrills.online/ko/drills/reaction-speed/fps-tracking-trainer"
        />
      </div>
      <DrillFooter />
    </>
  );
}
