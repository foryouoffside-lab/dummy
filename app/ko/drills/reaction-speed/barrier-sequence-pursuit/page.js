import BarrierSequencePursuitClient from '@/app/drills/reaction-speed/barrier-sequence-pursuit/BarrierSequencePursuitWrapperLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS – ko-KR (reaction-speed / barrier-sequence-pursuit)
// PRIMARY DOMESTIC: "지글 피킹 연습" / "각 홀딩 에임"
// SECONDARY / LSI:
//   "피커스 어드밴티지 대처" / "숄더 피킹 훈련"
//   "조준선 오프셋" / "브레이킹 반응속도"
// ============================================================

export const metadata = {
  title: '지글 피킹 연습 – 각 홀딩 에임 훈련 | SkillDrills',
  description: '무료 온라인 지글 피킹 및 각 홀딩 에임 훈련. 엄폐물 뒤 돌발 피킹에 대처하고 피커스 어드밴티지를 무력화하는 조준선 오프셋 반응을 단련합니다.',
  keywords: [
    '지글 피킹 연습',
    '각 홀딩 에임',
    '피커스 어드밴티지 대처',
    '숄더 피킹 훈련',
    '조준선 오프셋',
    '브레이킹 반응속도',
    '발로란트 각 쪼개기',
    '모퉁이 방어 에임',
    '크로스헤어 배치 연습',
    '택티컬 에임 홀딩',
    '엄폐물 반사신경 테스트',
    'FPS 피킹 타이밍',
  ],
  openGraph: {
    title: '지글 피킹 연습 – 각 홀딩 에임 훈련 | SkillDrills',
    description: '무료 온라인 지글 피킹 및 각 홀딩 에임 훈련. 엄폐물 뒤 돌발 피킹에 대처하고 피커스 어드밴티지를 무력화하는 조준선 오프셋 반응을 단련합니다.',
    type: 'article',
    url: 'https://skilldrills.online/ko/drills/reaction-speed/barrier-sequence-pursuit',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '지글 피킹 연습 – 각 홀딩 에임 훈련 | SkillDrills',
    description: '무료 온라인 지글 피킹 및 각 홀딩 에임 훈련. 엄폐물 뒤 돌발 피킹에 대처하고 피커스 어드밴티지를 무력화하는 조준선 오프셋 반응을 단련합니다.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/reaction-speed/barrier-sequence-pursuit',
    languages: getAlternateLanguages('/drills/reaction-speed/barrier-sequence-pursuit'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills 홈', item: 'https://skilldrills.online/ko' },
    { '@type': 'ListItem', position: 2, name: '훈련 허브', item: 'https://skilldrills.online/ko/drills' },
    { '@type': 'ListItem', position: 3, name: '반응속도', item: 'https://skilldrills.online/ko/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: '지글 피킹 연습', item: 'https://skilldrills.online/ko/drills/reaction-speed/barrier-sequence-pursuit' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '지글 피킹 연습 – 각 홀딩 및 엄폐물 반사신경 트레이너',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  description: '방어적 각 홀딩, 피커스 어드밴티지 무력화 및 엄폐물 뒤 돌발 튀어나오기 대처를 위한 온라인 에임 훈련 툴.',
  url: 'https://skilldrills.online/ko/drills/reaction-speed/barrier-sequence-pursuit',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  inLanguage: 'ko-KR',
  dateModified: '2026-09-15',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '지글 피킹 트레이너',
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'HTML5 Canvas, 포인터 락 지원 최신 웹 브라우저',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  url: 'https://skilldrills.online/ko/drills/reaction-speed/barrier-sequence-pursuit',
  inLanguage: 'ko-KR',
  dateModified: '2026-09-15',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'Jiggle Peek Trainer – 엄폐물 피킹 및 각 홀딩 반응 게임',
  url: 'https://skilldrills.online/ko/drills/reaction-speed/barrier-sequence-pursuit',
  description: '전술 슈팅 게임의 모퉁이 대기, 브레이킹 타이밍 및 조준선 간격 조절을 극대화하는 브라우저 반응 게임.',
  genre: ['Action', '에임 트레이너', '택티컬 FPS'],
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
      name: '지글 피킹(Jiggle Peeking)이란 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '엄폐물 모퉁이에서 몸을 살짝 내밀었다가 순간적으로 반대 방향키를 눌러 숨는 기술로, 상대의 사격을 유도하거나 위험 부담 없이 적의 위치 정보를 따내는 핵심 무빙입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '피커스 어드밴티지(Peeker’s Advantage)의 과학적 원리는 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네트워크 핑과 클라이언트 보간 처리 지연(deWet & Straily, 2020)으로 인해, 먼저 움직여 각을 여는 공격자가 가만히 서서 기다리는 수비자보다 화면상에서 수십 밀리초 먼저 적을 보게 되는 현상입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '수비할 때 피커스 어드밴티지를 어떻게 극복하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '조준선을 벽 모서리에 딱 붙이지 말고, 인간의 평균 반응 시간(약 150~200ms) 동안 적이 이동할 거리만큼 조준선을 벽에서 띄워 두는 조준선 오프셋(Crosshair Offset)을 적용해야 합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '돈더스(Donders, 1868)의 반응 시간 이론은 각 홀딩에 어떻게 적용되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '시각 자극의 인지와 손가락의 클릭 명령 전송에는 생리학적 지연(약 200ms)이 필연적으로 발생하므로, 조준선 오프셋 없이는 튀어나오는 적을 인간의 신체 반응으로 따라잡을 수 없습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '숄더 피킹(Shoulder Peeking)이 유용한 이유는 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '머리(헤드샷 판정)는 엄폐물 뒤에 남겨두고 어깨 부분만 50~100ms 동안 살짝 노출시켜 스나이퍼나 상대 소총의 탄환을 낭비하게 만드는 안전한 낚시 기술입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '카운터 스트레이핑(브레이킹)의 원리는 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '이동 중 반대 방향키를 톡 쳐서 관성을 즉각 상쇄시켜 탄착군 퍼짐을 0으로 만들고 첫 발의 100% 명중률을 즉시 확보하는 메커니즘입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '올바른 크로스헤어 배치가 왜 반응 시간을 단축시키나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '미리 정확한 위치에 에임을 거치해 두면 조준선을 끌어치는(Flick) 데 소요되는 근육 미세조정 지연이 완전히 제거되어 단순 1버튼 타이밍 사격으로 전환되기 때문입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '모니터 주사율이 각 홀딩 승률에 미치는 영향은?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '240Hz 디스플레이는 프레임 표시 주기가 4.1ms로 60Hz(16.7ms) 대비 월등히 빨라(Woods et al., 2015), 상대가 모퉁이에서 튀어나오는 첫 픽셀을 훨씬 일찍 포착할 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '효과적인 지글 피킹 훈련 루틴은?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '매일 10분간 좁은 오프 앵글 홀딩과 빠른 지글 피킹 후 복귀 타이밍을 번갈아 연습하면 모퉁이 교전 반응이 크게 향상됩니다.',
      },
    },
    {
      '@type': 'Question',
      name: '이 훈련 도구는 무료인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, SkillDrills 지글 피킹 트레이너는 별도 다운로드나 회원가입 없이 브라우저에서 100% 무료로 사용할 수 있습니다.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: '지글 피킹 및 각 홀딩 에임 훈련법',
  description: '엄폐물 간격 설정, 조준선 오프셋 적용 및 돌발 출현 표적 격추를 위한 실천 가이드.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '엄폐물 기하학 및 교전 각도 설정',
      text: '플레이하는 게임의 전형적인 좁은 길목이나 방어 구역에 맞춰 벽 모서리와 간격을 조정합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/barrier-sequence-pursuit#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '인간 반응속도를 고려한 조준선 오프셋 적용',
      text: '벽 모서리에 에임을 밀착시키지 말고, 신체 반응 지연(150~200ms)만큼 조준선을 벽에서 띄워 거치합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/barrier-sequence-pursuit#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '벽 모서리 돌발 움직임 집중 감지',
      text: '엄폐물 경계선에 시야를 집중하고 적 표적이 튀어나오는 첫 움직임 단서를 민첩하게 감지합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/barrier-sequence-pursuit#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: '조준선 통과 순간 즉각 격발',
      text: '적 표적이 배치해 둔 조준선 평면을 지나는 찰나에 과도한 플릭 없이 즉각 클릭하여 제압합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/barrier-sequence-pursuit#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('donders1868', 'dewet2020', 'kosinski2008', 'woods2015'),
  intro: {
    title: '지글 피킹 연습 및 각 홀딩 가이드',
    paragraphs: [
      '발로란트나 카운터스트라이크에서 모퉁이를 지키는 수비자가 흔히 저지르는 치명적 실수는 조준선을 벽 모서리에 바짝 붙여 대기하는 것입니다. 인간의 반응 속도 한계와 네트워크 지연으로 인한 피커스 어드밴티지(Peeker’s Advantage; deWet & Straily, 2020)로 인해, 벽에 붙인 에임은 무조건 뚫릴 수밖에 없습니다.',
      '돈더스(Donders, 1868)의 신경 반응 연구에 따르면 시각 자극이 운동 명령으로 출력되기까지 약 200ms의 지연이 발생합니다. 최상위권 플레이어들은 이 지연 시간 동안 적이 이동할 거리를 미리 계산하여 조준선을 벽에서 띄워 두는 오프셋 테크닉을 구사합니다.',
      '본 훈련은 고주사율 모니터(Woods et al., 2015) 환경에서 엄폐물 뒤 돌발 튀어나오기에 대한 방어적 반응 타이밍을 몸에 각인시켜, 적이 내 조준선 속으로 스스로 걸어 들어오게 만듭니다.',
    ],
  },
  benchmarks: {
    title: '각 홀딩 및 지글 피킹 성능 기준표',
    headers: ['티어 단계', '랭크 분류', '홀딩 반응시간', '클릭 정확도', '상위 백분위'],
    rows: [
      ['Tier 1', '신계・익스프레스 (Apex / Pro)', '< 150 ms', '98 %+', 'Top 1 %'],
      ['Tier 2', '엘리트 (Elite / Master)', '150 – 190 ms', '94 – 97 %', 'Top 5 %'],
      ['Tier 3', '프로 (Diamond / Platinum)', '191 – 240 ms', '88 – 93 %', 'Top 15 %'],
      ['Tier 4', '중급 (Gold / Silver)', '241 – 310 ms', '78 – 87 %', 'Top 50 %'],
      ['Tier 5', '초급 (Bronze / Novice)', '> 310 ms', '< 78 %', '기본'],
    ],
    note: '단순 반응 및 신경계 지연 시간(Donders, 1868; Kosinski, 2008)과 네트워크 환경 모델(deWet & Straily, 2020)을 종합한 기준치입니다.',
  },
  protocols: {
    title: '과학적 4단계 각 홀딩 훈련 프로토콜',
    description: '안정적인 방어 에임과 타이밍 제어를 체화하기 위한 훈련 단계.',
    items: [
      {
        title: '엄폐물 기하학 및 교전 각도 설정',
        description: '플레이하는 게임의 전형적인 좁은 길목이나 방어 구역에 맞춰 벽 모서리와 간격을 조정합니다.',
      },
      {
        title: '인간 반응속도를 고려한 조준선 오프셋 적용',
        description: '벽 모서리에 에임을 밀착시키지 말고, 신체 반응 지연(150~200ms)만큼 조준선을 벽에서 띄워 거치합니다.',
      },
      {
        title: '벽 모서리 돌발 움직임 집중 감지',
        description: '엄폐물 경계선에 시야를 집중하고 적 표적이 튀어나오는 첫 움직임 단서를 민첩하게 감지합니다.',
      },
      {
        title: '조준선 통과 순간 즉각 격발',
        description: '적 표적이 배치해 둔 조준선 평면을 지나는 찰나에 과도한 플릭 없이 즉각 클릭하여 제압합니다.',
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

export default function KoreanBarrierSequencePursuitPage() {
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
      <BarrierSequencePursuitClient copy={{ title: '지글 피킹 연습' }} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="reaction-speed"
          currentHref="https://skilldrills.online/ko/drills/reaction-speed/barrier-sequence-pursuit"
        />
      </div>
      <DrillFooter />
    </>
  );
}
