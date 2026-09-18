import ReactionTimeTestWrapper from '@/app/drills/reaction-speed/reaction-time-test/ReactionTimeTestWrapperLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — ko-KR (reaction-speed / reaction-time-test)
// PRIMARY DOMESTIC: "반응속도 테스트" — 10,333 exact / 10,875 broad searches/mo (Domestic #1 winner)
// SECONDARY / LSI:
//                    "반응속도"      — 2,400+ searches/mo
//                    "반응속도 측정" — 1,200+ searches/mo
//                    "반속테스트"    — High-intent gaming slang
//                    "롤 반응속도"    — League of Legends competitive
//                    "발로란트 반응속도" — Valorant reaction speed
//                    "반응속도 게임" — 850+ searches/mo
// NATIVE TITLE:      반응속도 테스트 – 무료 밀리초(ms) 시각 반응속도 측정기 | SkillDrills
// ============================================================

export const metadata = {
  title: '반응속도 테스트 – 무료 밀리초(ms) 시각 반응속도 측정기 | SkillDrills',
  description:
    '무료 온라인 반응속도 테스트(반속테스트). 화면 자극에 맞춰 즉각 반응하여 밀리초(ms) 단위 시각 반사 신경을 측정하고 게이머 벤치마크 등급(롤, 발로란트)을 확인하세요.',
  keywords: [
    '반응속도 테스트',
    '반응속도',
    '반응속도 측정',
    '시각 반응속도',
    '롤 반응속도',
    '발로란트 반응속도',
    '반속테스트',
    '반응속도 게임',
    '밀리초 테스트',
    '에임 반응속도',
    '반사신경 테스트',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/reaction-speed/reaction-time-test',
    languages: getAlternateLanguages('/drills/reaction-speed/reaction-time-test'),
  },
  openGraph: {
    title: '반응속도 테스트 – 무료 밀리초(ms) 시각 반응속도 측정기 | SkillDrills',
    description:
      '무료 온라인 반응속도 테스트. 화면이 바뀔 때 즉시 클릭하여 밀리초(ms) 단위 시각 반사 신경을 측정하고 게이머 벤치마크 등급을 확인하세요.',
    url: 'https://skilldrills.online/ko/drills/reaction-speed/reaction-time-test',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '반응속도 테스트 – 무료 밀리초(ms) 시각 반응속도 측정기 | SkillDrills',
    description:
      '무료 온라인 반응속도 테스트. 밀리초 단위로 시각 반사 신경을 측정하고 벤치마크를 확인하세요.',
  },
  robots: { index: true, follow: true },
};

// --- Structured Data Schemas ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills 홈', item: 'https://skilldrills.online/ko' },
    { '@type': 'ListItem', position: 2, name: '훈련 허브', item: 'https://skilldrills.online/ko/drills' },
    { '@type': 'ListItem', position: 3, name: '반응 속도', item: 'https://skilldrills.online/ko/drills/reaction-speed' },
    { '@type': 'ListItem', position: 4, name: '반응속도 테스트', item: 'https://skilldrills.online/ko/drills/reaction-speed/reaction-time-test' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '반응속도 테스트 – 밀리초(ms) 시각 반응속도 측정기',
  alternateName: ['반응속도 테스트', '반속테스트', '반사신경 측정기', 'FPS 반응속도 측정'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  description:
    '웹 브라우저에서 밀리초(ms) 단위로 시각 반응속도를 정밀 측정하는 온라인 도구. 과학적 벤치마크, 롤 및 발로란트 티어 판정, 콤보 배수 시스템 탑재.',
  browserRequirements: '자바스크립트를 지원하는 최신 브라우저 (Chrome, Whale, Edge, Safari)',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '반응속도 테스트 — 밀리초(ms) 시각 반응속도 측정기 | SkillDrills',
  url: 'https://skilldrills.online/ko/drills/reaction-speed/reaction-time-test',
  description:
    '무료 온라인 시각 반응속도 테스트 및 반사 신경 측정 도구. 밀리초 단위로 반응 지연 시간을 측정합니다.',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: '자바스크립트를 지원하는 최신 브라우저 필요.',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: '반응속도, 반사신경, 시각 자극 인지 속도, 신경근 반응 시간, 멘탈 크로노메트리',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: '반응속도 테스트 - 밀리초(ms) 시각 반응속도 측정 게임',
  url: 'https://skilldrills.online/ko/drills/reaction-speed/reaction-time-test',
  description: '반응속도 테스트 - 밀리초(ms) 시각 반응속도 측정 게임',
  genre: ['Reflex Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: '반응속도 테스트 측정 방법',
  description: '간단한 클릭 기반의 온라인 도구를 사용하여 시각 반응 속도를 측정하는 방법.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '테스트 시작',
      text: '훈련 시작 버튼을 클릭하여 전체화면 반응속도 테스트 모드를 실행합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/reaction-time-test#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '화면 및 타이밍 집중',
      text: '화면 중앙에 표시되는 목표 밀리초 인터벌을 파악하고 시각 자극 출현을 대기합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/reaction-time-test#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '즉시 클릭',
      text: '타깃이 나타나는 순간 최대한 신속하게 마우스를 클릭하거나 화면을 탭합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/reaction-time-test#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: '밀리초 결과 및 티어 확인',
      text: '반복 측정 후 평균 지연 오차(ms), 정확도, e스포츠 환산 등급을 분석합니다.',
      url: 'https://skilldrills.online/ko/drills/reaction-speed/reaction-time-test#step-4'
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-11',
  mainEntity: [
    {
      '@type': 'Question',
      name: '인간의 평균 반응속도는 몇 밀리초(ms)인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '시각 자극에 대한 일반 성인의 평균 반응 속도는 약 200~250ms(밀리초)입니다(Kosinski, 2008). 200ms 미만은 매우 우수한 수준이며, 180ms 이하는 프로게이머(발로란트, 롤 프로) 및 F1 레이서급 최상위 1~3%에 해당합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '반속테스트(반응속도 테스트)는 어떤 원리로 측정되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '화면에 시각 자극이 렌더링되는 순간부터 브라우저에 마우스 클릭 또는 화면 터치 입력 이벤트가 등록되는 시점까지의 경과 시간을 브라우저 고해상도 performance.now() API(1ms 미만 정밀도)로 로컬에서 직접 측정합니다(Woods et al., 2015).',
      },
    },
    {
      '@type': 'Question',
      name: '반응속도를 훈련과 연습으로 개선할 수 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, 반응 훈련을 꾸준히 반복하면 시각 자극 인지 지연을 단축하고 운동 신경 루프가 최적화되어 15~30ms 이상의 실질적인 반응 속도 단축과 일관성 향상이 입증되었습니다(Dye, Green, & Bavelier, 2009).',
      },
    },
    {
      '@type': 'Question',
      name: '반응속도가 날마다 다른 이유는 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '수면 부족, 신체 일주기 리듬(바이오리듬), 두뇌 피로도, 카페인 섭취 여부, 집중도, 그리고 모니터 주사율 및 마우스 입력 지연 등의 하드웨어 환경에 따라 매일 달라집니다.',
      },
    },
    {
      '@type': 'Question',
      name: '모니터 주사율(Hz)이 반응속도 측정값에 영향을 주나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '그렇습니다. 60Hz 모니터는 프레임당 약 16.7ms의 화면 표시 버퍼 지연이 발생하지만, 144Hz(6.9ms) 또는 240Hz(4.2ms) 게이밍 모니터는 시각 자극을 훨씬 일찍 전달하므로 약 10ms 이상 더 빠른 수치가 기록됩니다(Woods et al., 2015).',
      },
    },
    {
      '@type': 'Question',
      name: '무조건 반사와 의식적 반응시간의 차이는 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '무릎 반사 같은 무조건 반사는 대뇌를 거치지 않고 척수 반사궁을 통과하여 20~50ms 내에 일어납니다. 반면 반응시간은 망막에서 1차 시각 피질로 신호가 전달되어 대뇌의 인지 및 운동 결정을 거치므로 통상 150~250ms 이상 소요됩니다.',
      },
    },
    {
      '@type': 'Question',
      name: '청각 반응이 시각 반응보다 더 빠른 이유는 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '청각 신호는 내이에서 뇌간 및 청각 피질까지 8~10ms 만에 도달하는 반면, 시각 신호는 망막의 광수용체 화학 반응과 시신경 경로에 20~40ms가 소요됩니다. 따라서 청각 반응(약 140~160ms)이 시각 반응보다 30~50ms 더 빠릅니다(Shelton & Kumar, 2010).',
      },
    },
    {
      '@type': 'Question',
      name: '나이가 들면 반응속도가 느려지나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '단순 반응속도는 만 18~24세 전후에 최고점을 찍고, 이후 10년마다 약 2~6ms씩 완만하게 느려지는 경향이 있습니다(Der & Deary, 2006). 그러나 규칙적인 유산소 운동과 반응 훈련을 지속하면 신경 전달 효율을 장기간 높게 유지할 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '카페인을 섭취하면 반응속도가 빨라지나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '적정량의 카페인 섭취는 중추신경계의 아데노신 수용체를 차단하여 대뇌 각성도를 높이고, 일시적으로 반응 시간을 10~20ms 단축시키는 효과가 확인되었습니다(Smith, 2002).',
      },
    },
    {
      '@type': 'Question',
      name: '기존 휴먼벤치마크(Human Benchmark)와 SkillDrills의 차이점은?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '단순히 빨간 화면이 초록색으로 바뀔 때 클릭하는 기본 측정과 달리, SkillDrills는 목표 밀리초 시간 감각 예측(멘탈 크로노메트리), 섣부른 조기 클릭 방지, 난이도 상승에 따른 콤보 점수 시스템을 결합하여 실전 피지컬 제어력을 기릅니다.',
      },
    },
    {
      '@type': 'Question',
      name: '롤(LoL)이나 발로란트에서 반응속도가 왜 중요한가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '발로란트에서 모퉁이 피킹 상대에 대한 초탄 교전 반응, 점멸 및 회피기 즉각 사용, 롤에서의 논타깃 스킬 회피 및 한타 반응에서 20~30ms의 차이가 킬과 데스를 결정합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '모바일 스마트폰이나 태블릿에서도 사용 가능한가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, 별도의 앱 설치나 로그인 없이 모바일 기기의 터치스크린에서도 완벽하게 작동하며, 가로 및 세로 모드를 모두 지원합니다.',
      },
    },
  ],
};

const reactionGuide = {
  heading: '반응속도 테스트 가이드 & 벤치마크 등급표',
  intro: [
    '반응속도 테스트(일명 반속테스트)는 눈이 시각 자극을 감지한 후 뇌의 시각 피질을 거쳐 손가락 근육으로 클릭 신호를 전달하는 총 반응 지연 시간을 밀리초(ms) 단위로 측정합니다.',
    '발로란트, 오버워치, 리그 오브 레전드, 배틀그라운드 등 e스포츠 FPS 및 MOBA 장르에서 상대방의 피킹에 즉각 대처하고 교전 승률을 높이는 핵심 지표입니다.',
    '정밀 측정 매커니즘: 본 도구는 브라우저 내장 performance.now() 고해상도 타이머를 활용하여 네트워크 핑(지연 시간)의 간섭 없이 클라이언트 장치에서 순수한 로컬 입력 반응을 기록합니다.',
    '하드웨어 딜레이 고려: 60Hz 모니터는 프레임당 약 16.7ms의 화면 표시 버퍼 지연이 발생하지만, 144Hz(6.9ms) 또는 240Hz(4.2ms) 모니터와 1000Hz 폴링레이트 마우스를 사용할 때 신체 본연의 신경 반응 속도를 가장 오차 없이 측정할 수 있습니다(Woods et al., 2015).',
  ],
  benchmarks: {
    title: '반응속도 벤치마크 및 게이머 티어 등급표',
    headers: ['반응 시간 (ms)', '티어 등급', '백분위수', '인게임 환산 티어', '신경 반응 분석'],
    rows: [
      ['< 150 ms', '신계・초인 (Godlike)', '상위 1%', 'F1 레이서 / 최정상 프로', '극도의 사전 예측 및 시냅스 선제 활성화, 인체 신경전달 한계'],
      ['150 – 190 ms', '최상위 프로 (Elite)', '상위 5%', '불멸 / 레디언트 (Immortal+)', '초고속 시각 정보 처리 및 군더더기 없는 즉각적 근육 수축'],
      ['190 – 240 ms', '고급 게이머 (Advanced)', '상위 25%', '다이아몬드 / 초월자', '우수한 자극 식별 및 즉각적인 조준선 발사 타이밍'],
      ['240 – 280 ms', '일반 성인 평균 (Average)', '중위 50%', '골드 / 플래티넘', '표준적인 건강 성인의 시각 반응 속도 (60Hz 디스플레이 기준)'],
      ['> 300 ms', '입문 / 라이트 (Developing)', '하위 20%', '실버 / 브론즈', '신경 피로, 수면 부족 또는 하드웨어/모니터 입력 지연 과다'],
    ],
    note: '본 등급표는 인체 크로노메트리(반응시간 측정학) 학술 연구(Kosinski, 2008; Woods et al., 2015)를 기반으로 작성되었습니다. 60Hz 모니터는 프레임당 약 16.7ms의 추가 버퍼 지연이 있습니다.',
  },
  techniques: {
    title: '감각 자극별 반응 속도 한계와 과학적 원리',
    items: [
      {
        name: '시각 자극 반응 지연 (~200–250ms)',
        desc: '빛이 망막 광수용체에 도달하여 전기 신호로 변환된 후 시신경을 거쳐 1차 시각 피질(V1)에 도달하고, 운동 피질로 전달되어 클릭 명령을 내리는 전 과정에 소요되는 시간입니다(Kosinski, 2008).',
        tips: '눈에 과도하게 힘을 주기보다 주변 시야의 간상세포가 자극 변화를 빠르게 감지하도록 편안한 시선을 유지하세요.',
      },
      {
        name: '청각 자극 반응 우위 (~140–170ms)',
        desc: '소리 신호는 뇌간과 청각 피질에 도달하는 경로가 시각 경로보다 짧기 때문에, 청각 자극 반응이 시각 반응보다 통상 30~50ms 더 빠릅니다(Shelton & Kumar, 2010; Jain et al., 2015).',
        tips: 'FPS 게임에서는 상대방이 시야에 보이기 전에 발소리 등 사운드 플레이에 즉각 반응하는 것이 유리합니다.',
      },
      {
        name: '촉각・체성 감각 반사 루프 (~130–160ms)',
        desc: '물리적인 진동과 촉각 자극은 복잡한 시각 인지 과정을 거치지 않으므로 가장 빠른 근육 수축을 유도합니다.',
        tips: '구분감이 뚜렷한 기계식 스위치를 사용하여 클릭 입력 지연을 최소화하세요.',
      },
      {
        name: '하드웨어 및 입력 지연 최소화',
        desc: '60Hz 모니터는 프레임당 16.7ms의 대기 시간이 발생하지만, 240Hz e스포츠 모니터는 4.1ms에 불과합니다(Woods et al., 2015).',
        tips: '1000Hz 폴링레이트 게이밍 마우스 사용 및 수직동기화(V-Sync) 비활성화를 강력 권장합니다.',
      },
    ],
  },
  steps: [
    '훈련 시작 버튼을 눌러 전체화면 반응 속도 측정 영역을 활성화합니다.',
    '화면 중앙의 목표 시간과 대기 상태를 확인합니다.',
    '타깃이 나타나는 즉시 가장 빠르게 마우스를 클릭하거나 화면을 탭합니다.',
    '여러 라운드를 반복하여 밀리초 평균값, 정확도, 게이머 티어 등급을 확인합니다.',
  ],
  audience: 'FPS 및 MOBA e스포츠 선수(발로란트, 롤, CS2, 오버워치), 리듬 게임 플레이어, 모터스포츠 레이서 및 뇌 반응 속도를 강화하고자 하는 모든 사용자.',
  faqs: faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('kosinski2008', 'woods2015', 'jain2015', 'shelton2010', 'dye2009', 'der2006', 'smith2002'),
  related: [
    { href: '/ko/drills/reaction-speed', label: '반응속도 훈련 허브' },
    { href: '/ko/drills/motor/movement-speed/rapid-tapping', label: 'CPS 클릭 속도 테스트' },
    { href: '/ko/drills/reaction-speed/fps-tracking-trainer', label: 'FPS 트래킹 에임 트레이너' },
    { href: '/ko/drills/fps/flick-shot-training', label: '플릭샷 훈련' },
  ],
};

export default function KoreanReactionTimeTestPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ReactionTimeTestWrapper copy={{ title: '반응속도 테스트' }} />
      <DrillGuide guide={reactionGuide} />
    </>
  );
}
