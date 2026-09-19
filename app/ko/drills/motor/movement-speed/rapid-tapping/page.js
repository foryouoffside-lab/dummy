import RapidTappingClient from '@/app/drills/motor/movement-speed/rapid-tapping/RapidTappingClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — ko-KR (rapid-tapping / motor)
// PRIMARY DOMESTIC: "cps 측정"            — 1,160 exact Bing searches/mo (Domestic #1 query)
//                    "cps test"           — 769 exact Bing searches/mo
//                    "클릭속도 테스트"     — 746 exact Bing searches/mo
//                    "마우스 클릭 테스트"  — 664 exact Bing searches/mo
// SECONDARY / LSI:
//                    "클릭 속도 테스트"    — 240 exact searches/mo
//                    "cps 테스트"          — 183 exact searches/mo
//                    "마우스 광클"         — High-intent Korean gaming term
//                    "초당 클릭수"         — Descriptive calculation search
//                    "마우스 연타 속도"    — Motor velocity query
//                    "지터클릭" / "버터플라이 클릭" — Advanced clicking mechanics
//                    "마인크래프트 cps"     — Game-specific competitive demand
// NATIVE TITLE:      CPS 측정 – 무료 마우스 클릭속도 테스트 & 광클 지속력 훈련 | SkillDrills
// ============================================================

export const metadata = {
  title: 'CPS 측정 – 무료 마우스 클릭속도 테스트 & 광클 지속력 훈련 | SkillDrills',
  description:
    '브라우저에서 바로 측정하는 무료 CPS 측정 및 마우스 클릭속도 테스트. 초당 클릭 수(CPS), 마우스 광클 지속력, 지터 클릭 및 버터플라이 클릭 속도를 45초 동안 정밀 측정합니다. 마인크래프트 PvP 및 FPS 연타 훈련에 최적화.',
  keywords: [
    'CPS 측정',
    'cps 측정',
    '클릭속도 테스트',
    '마우스 클릭 테스트',
    '클릭 속도 테스트',
    'cps 테스트',
    'CPS 테스트',
    '마우스 광클',
    '초당 클릭수',
    '마우스 연타 속도',
    '지터클릭',
    '버터플라이 클릭',
    '마인크래프트 cps',
    'cps test',
  ],
  openGraph: {
    title: 'CPS 측정 – 무료 마우스 클릭속도 테스트 & 광클 지속력 훈련 | SkillDrills',
    description:
      '브라우저에서 바로 측정하는 무료 CPS 측정 및 마우스 클릭속도 테스트. 초당 클릭 수(CPS), 마우스 광클 지속력, 지터 및 버터플라이 클릭 속도를 45초 동안 정밀 측정합니다.',
    type: 'article',
    url: 'https://skilldrills.online/ko/drills/motor/movement-speed/rapid-tapping',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CPS 측정 – 무료 마우스 클릭속도 테스트 & 광클 지속력 훈련 | SkillDrills',
    description:
      '브라우저에서 바로 측정하는 무료 CPS 측정 및 마우스 클릭속도 테스트. 초당 클릭 수(CPS), 마우스 광클 지속력, 지터 및 버터플라이 클릭 속도를 45초 동안 정밀 측정합니다.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/motor/movement-speed/rapid-tapping',
    languages: getAlternateLanguages('/drills/motor/movement-speed/rapid-tapping'),
  },
};

// --- Structured Data Schemas ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills 홈', item: 'https://skilldrills.online/ko' },
    { '@type': 'ListItem', position: 2, name: '훈련 허브', item: 'https://skilldrills.online/ko/drills' },
    { '@type': 'ListItem', position: 3, name: '모터 정밀 훈련', item: 'https://skilldrills.online/ko/drills/motor' },
    { '@type': 'ListItem', position: 4, name: 'CPS 측정 (클릭속도 테스트)', item: 'https://skilldrills.online/ko/drills/motor/movement-speed/rapid-tapping' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CPS 측정 – 마우스 클릭속도 테스트 및 광클 지속력 훈련',
  alternateName: ['CPS 측정', '클릭속도 테스트', '마우스 클릭 테스트', '초당 클릭수 테스트', '마우스 광클 훈련'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  description:
    '웹브라우저 기반 무료 CPS 측정 및 클릭속도 테스트 도구. 단일 손가락 타건, 지터 클릭, 버터플라이 클릭의 초당 클릭수와 점진적으로 축소되는 타겟에 대한 신경근 지구력을 45초간 정밀 측정합니다.',
  url: 'https://skilldrills.online/ko/drills/motor/movement-speed/rapid-tapping',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  inLanguage: 'ko-KR',
  dateModified: '2026-09-11',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'CPS 측정기',
  alternateName: ['CPS 측정', '클릭속도 테스트', '마우스 연타 테스트'],
  applicationCategory: 'GameApplication',
  operatingSystem: 'All',
  browserRequirements: 'HTML5 Canvas 및 고주파 포인터 입력을 지원하는 최신 웹브라우저',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  url: 'https://skilldrills.online/ko/drills/motor/movement-speed/rapid-tapping',
  inLanguage: 'ko-KR',
  dateModified: '2026-09-11',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'CPS 테스트 – 무료 마우스 클릭 속도 측정기 (초당 클릭수)',
  url: 'https://skilldrills.online/ko/drills/motor/movement-speed/rapid-tapping',
  description: 'CPS 테스트 – 무료 마우스 클릭 속도 측정기 (초당 클릭수)',
  genre: ['Clicker Game', 'Action', 'Esports Training'],
  gamePlatform: ['Web Browser', 'Desktop', 'Mobile'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' }
};


const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'CPS 측정(초당 클릭 수 테스트)이란 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CPS(Clicks Per Second) 측정은 1초 동안 마우스 버튼이나 터치스크린을 클릭한 횟수를 평가하는 디지털 운동 제어 진단 도구입니다. 대뇌 운동 피질에서 손가락으로 이어지는 신경근 발화 속도, 건의 진동 주기 및 전완근 근지구력을 밀리초 단위로 정밀 분석합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '일반 게이머와 프로게이머의 평균 CPS 기준은 어떻게 되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '일반 사용자가 편안하게 검지 손가락으로 클릭할 때의 평균 속도는 5.0~6.5 CPS입니다. 게임 숙련자는 단일 클릭으로 8.0~10.5 CPS에 달하며, 마인크래프트 PvP 및 리듬 게임 전문가는 지터 클릭으로 12.0~16.0+ CPS, 버터플라이 클릭으로 16.0~20.0+ CPS를 기록합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '지터 클릭(Jitter Clicking)이란 무엇이며 어떤 원리로 작동하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '지터 클릭은 전완근의 굴근과 신근을 동시에 강하게 수축시켜 등척성 진동을 유발하고, 이 미세 경련을 손목을 통해 검지 끝으로 전달하는 고급 광클 기술입니다. 손가락을 개별적으로 움직이지 않고도 초당 11~15회 이상의 초고속 클릭을 발생시킵니다.',
      },
    },
    {
      '@type': 'Question',
      name: '버터플라이 클릭(Butterfly Clicking)과 지터 클릭의 차이점은 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '버터플라이 클릭은 마우스 왼쪽 버튼 하나를 검지와 중지로 번갈아 두드리듯 타건하는 방식입니다. 팔 전체를 긴장시키는 지터 클릭에 비해 근육 피로가 적고, 더블 클릭(디바운스 타임 최소화) 세팅이 가능한 게이밍 마우스에서 16~22+ CPS 이상의 극한 연타 속도를 낼 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '마인크래프트(Minecraft) PvP에서 높은 CPS가 왜 중요한가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '마인크래프트(특히 1.8 전투 메커니즘)에서는 타격 시점의 클릭 빈도가 높을수록 상대에게 가해지는 피격 판정과 넉백이 극대화되고 본인이 받는 넉백은 감소합니다. 상대를 공중에 띄운 채 연속 공격을 퍼붓는 콤보를 유지하려면 안정적인 고CPS 유지가 필수적입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '발로란트나 CS2 같은 정밀 FPS 게임에서도 클릭 속도가 중요한가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '정밀 슈팅 게임에서는 조준선 정렬과 초탄 정밀도가 핵심이지만, 클래식, 고스트, USP-S 등 반자동 권총을 사용하는 피스톨 라운드에서는 에임을 흔들지 않고 빠르게 단발 속사를 넣는 광클 제어 능력이 교전 승패를 가릅니다.',
      },
    },
    {
      '@type': 'Question',
      name: '단일 손가락으로 달성할 수 있는 생리학적 최대 클릭 속도는 얼마인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '신경심리학 연구(Halstead 1947, Todor & Kyprie 1980)에 따르면, 중추신경계의 운동 불응기로 인해 건강한 성인의 단일 검지 타건 한계는 초당 약 5.5~7.0Hz(10초간 약 50~55회)입니다. 10 CPS를 초과하는 수치는 근육 공명 진동이나 다중 손가락 교차 타건 같은 생체역학적 기술을 통해서만 달성 가능합니다.',
      },
    },
    {
      '@type': 'Question',
      name: 'SkillDrills의 45초 CPS 테스트는 어떻게 난이도가 상승하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '단순 5초 측정기와 달리, 본 훈련은 45초 동안 진행되는 지속력 평가입니다. 타겟 구체를 클릭할 때마다 크기가 커지지만, 점수가 높아질수록 초당 최대 600픽셀까지 타겟이 급격히 축소됩니다. 타겟이 완전히 소멸하면 페널티가 부여되므로 일정한 광클 리듬과 근지구력이 요구됩니다.',
      },
    },
    {
      '@type': 'Question',
      name: '클릭 속도를 높이면서 손목 터널 증후군(RSI)이나 근육 피로를 예방하려면 어떻게 해야 하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '45초간 집중 연타 후 60초간 손과 팔을 완전히 이완하는 인터벌 방식이 가장 효과적입니다. 마우스를 손바닥으로 강하게 누르지 말고 손가락 중수수지관절(MCP)을 가볍게 축으로 삼아 타건하며, 훈련 전후로 전완 굴근 스트레칭을 병행해야 합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '스마트폰이나 태블릿 터치스크린에서도 CPS 테스트가 가능한가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, 본 드릴은 Pointer Events API를 통해 멀티터치 입력을 완벽히 지원하므로 모바일 기기 화면을 직접 두드려 탭 속도를 측정할 수 있습니다. 모바일 리듬 게임이나 모바일 슈팅 게임을 위한 2핑거 교차 연타 훈련에도 적합합니다.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'CPS 테스트 – 무료 마우스 클릭 속도 측정기 (초당 클릭수)',
  description: 'CPS 테스트 – 무료 마우스 클릭 속도 측정기 (초당 클릭수)',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '마우스 그립 및 손목 자세 정렬',
      text: '마우스패드 위에 손목을 안정적으로 거치하고 검지 손가락을 마우스 버튼 위에 가볍게 올립니다.',
      url: 'https://skilldrills.online/ko/drills/motor/movement-speed/rapid-tapping#step-1'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '45초 클릭 스프린트 시작',
      text: '훈련 시작 버튼을 누르고 카운트다운과 함께 가능한 한 최대 속도로 타깃 볼을 연속 클릭합니다.',
      url: 'https://skilldrills.online/ko/drills/motor/movement-speed/rapid-tapping#step-2'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '수축 엔진에 맞선 콤보 유지',
      text: '클릭할 때마다 타깃 볼이 팽창하므로, 시간이 지남에 따라 가속되는 수축 속도에 맞춰 일정한 리듬을 유지합니다.',
      url: 'https://skilldrills.online/ko/drills/motor/movement-speed/rapid-tapping#step-3'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: '평균 CPS 및 피크 속도 분석',
      text: '세션 종료 후 평균 CPS(초당 클릭수), 최고 버스트 속도, 롤/발로란트 벤치마크 등급을 확인합니다.',
      url: 'https://skilldrills.online/ko/drills/motor/movement-speed/rapid-tapping#step-4'
    }
  ],
};

const guideProps = {
  sources: pickSources('halstead1947', 'todor1980', 'keele1968', 'woods2015'),
  intro: {
    title: '클릭 속도(CPS) 측정 원리와 과학적 배경',
    paragraphs: [
      'CPS(Clicks Per Second) 테스트는 1초 동안 마우스 버튼을 클릭할 수 있는 횟수를 측정합니다. 단일 손가락으로 유지 가능한 지속 타건 속도는 대략 초당 5~7회 수준이며, 이는 건강한 성인의 우세 손 검지 손가락 기준 표준 손가락 타건 검사(10초당 50~55회 타건)와 일치합니다(Halstead, 1947; Todor & Kyprie, 1980). 이를 초과하는 고속 연타는 1타마다 뇌의 의식적 신호를 거치는 것이 아니라, 사전에 프로그래밍된 운동 연쇄(오픈 루프 제어)로 실행됩니다(Keele, 1968).',
      '측정 오차 및 디스플레이 양자화: 브라우저 내부 시간 측정은 Spectre 취약점 완화를 위해 약 1ms 단위로 반올림되는 performance.now() 시계를 사용합니다. 또한 모니터는 주사율에 따라 목표 화면을 갱신합니다(60Hz 약 16.7ms, 144Hz 약 6.9ms, 240Hz 약 4.1ms, Woods et al., 2015). 마우스 폴링레이트 역시 125Hz에서 약 8ms, 1000Hz에서 약 1ms의 지연을 발생시킵니다. 따라서 약 5ms 미만의 미세한 차이는 하드웨어 노이즈로 해석해야 하며, 타인과의 단순 비교보다는 동일한 장비에서 본인의 기록 변화를 추적하는 것이 과학적입니다. SkillDrills는 모든 데이터를 브라우저에 로컬 저장하며 외부로 수집하지 않습니다.',
    ],
  },
  benchmark: {
    title: '공식 CPS 등급표 및 상위 퍼센타일 기준표',
    description: '본인의 클릭 속도를 객관적으로 평가할 수 있는 표준 기준표입니다. 단일 타건 기준은 운동신경 생리학 데이터(Halstead 1947; Todor & Kyprie 1980)를 기반으로 하며, 지터 및 버터플라이 기준은 최상위 게이머의 실측 데이터를 반영합니다.',
    columns: ['등급 티어', '공식 타이틀', '평균 CPS', '순간 최고 CPS (5초)', '타건 기술', '경쟁력 평가'],
    rows: [
      {
        tier: 'Tier 1',
        rank: '신속의 달인 (Apex Tapper)',
        stat: '16.0+ CPS',
        level: '20.0+ CPS',
        accuracy: '버터플라이 / 드래그 클릭',
        percentile: '상위 0.1% 최상위권',
      },
      {
        tier: 'Tier 2',
        rank: '프로 경쟁자 (Pro Competitor)',
        stat: '12.0–15.9 CPS',
        level: '15.0–19.0 CPS',
        accuracy: '지터 클릭 마스터',
        percentile: '상위 3% 상위권',
      },
      {
        tier: 'Tier 3',
        rank: '숙련 게이머 (Competitive Gamer)',
        stat: '9.0–11.9 CPS',
        level: '11.0–14.0 CPS',
        accuracy: '고속 단일타건 / 긴장 연타',
        percentile: '상위 15% 숙련자',
      },
      {
        tier: 'Tier 4',
        rank: '일반 플레이어 (Proficient Casual)',
        stat: '6.0–8.9 CPS',
        level: '7.5–10.0 CPS',
        accuracy: '일반 단일타건',
        percentile: '상위 50% 평균',
      },
      {
        tier: 'Tier 5',
        rank: '초심자 (Novice Tapper)',
        stat: '6.0 CPS 미만',
        level: '7.5 CPS 미만',
        accuracy: '미훈련 단일타건',
        percentile: '하위 20% 기초 훈련 필요',
      },
    ],
  },
  protocols: {
    title: '클릭 속도 및 광클 지속력을 극대화하는 4대 훈련 프로토콜',
    description: '운동 단위 동원 속도를 가속하고 건의 내구성을 기르며 신경근 피로를 줄이는 체계적인 타건 루틴입니다.',
    items: [
      {
        title: '프로토콜 1: 할스테드 모터 리듬 교정 (중수수지관절 탈력 피벗)',
        description: '표준 단일 손가락 클릭 시 손목을 마우스패드에 가볍게 안착시키고, 손가락 뿌리 관절(MCP 관절)만을 피벗으로 삼아 움직입니다. 전완의 불필요한 긴장을 제거하면 장시간 광클 시에도 조준선이 흔들리지 않습니다.',
      },
      {
        title: '프로토콜 2: 토도르-키프리 고주파 버스트 인터벌 (마이크로 휴식 페이싱)',
        description: '최대 속도 5초 전력 연타와 3초간의 편안한 정속 연타를 번갈아 수행합니다. 이 고저차 인터벌 훈련은 신경계가 높은 운동 방전 빈도를 유지하도록 유도하며 젖산 축적을 효과적으로 지연시킵니다.',
      },
      {
        title: '프로토콜 3: 등척성 전완 미세 진동 (지터 클릭 안정화 훈련)',
        description: '손목 굴근과 신근을 가볍게 동시 수축시켜 팔의 미세 경련을 검지 끝으로 전달합니다. 마우스를 바닥에 너무 강하게 누르지 않고 패드 위를 매끄럽게 활주할 수 있도록 하향 압력을 조절하는 것이 관건입니다.',
      },
      {
        title: '프로토콜 4: 다중 손가락 교차 운동학 (버터플라이 클릭 드럼 타법)',
        description: '검지와 중지를 왼쪽 클릭 스위치 위에 수평으로 두고 북을 치듯 교차 타건합니다. 마우스의 디바운스 타임을 최소치(0~4ms)로 설정하여 물리 스위치의 반발력을 이용한 최고 연타를 끌어냅니다.',
      },
    ],
  },
  faqs: {
    title: 'CPS 측정 및 클릭속도 테스트 자주 묻는 질문 (FAQ)',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

const koCopy = {
  title: "CPS 측정",
  desc: "초당 마우스 클릭 수(CPS)를 측정하는 온라인 테스트입니다. 일반적인 단일 손가락 연타는 초당 약 5~7회(할스테드 손가락 두드리기 규준, 50~55회/10초)를 기록하며, 온라인상의 10+ 고득점은 지터 클릭이나 버터플라이 클릭 같은 특수 테크닉을 활용합니다.",
  score: "점수",
  timeLeft: "남은 시간",
  cpsRate: "현재 CPS",
  bestScore: "최고 점수",
  startButtonText: "훈련 시작",
  startSubtitle: "CPS 마우스 클릭속도 훈련 • 하드웨어 1:1 원시 입력",
  getReady: "준비",
  playAgain: "다시 훈련",
  shareTitle: "결과 공유",
  exitTitle: "나가기",
  avgCps: "평균 CPS",
  totalClicks: "총 클릭 수",
  maxDifficulty: "최대 난이도",
  peakCps: "최고 CPS",
  newBest: "신기록",
  rulesTitle: "훈련 가이드 및 점수 규칙",
  rulesItems: [
    { num: "1", text: "신속한 타겟 타격", highlight: "에메랄드 타겟", result: "클릭 시 반경 확장 및 축소 방어" },
    { num: "2", text: "점수 획득 기준", highlight: "10회 클릭당 +1점", result: "최종 세션 점수로 누적" },
    { num: "3", text: "동적 수축 가속", highlight: "점수 비례 가속", result: "손가락 속도 및 근지구력 극한 시험" },
    { num: "4", text: "광클 테크닉", highlight: "지터 / 버터플라이 / 단타", result: "순수 기계적 클릭 속도 극대화" }
  ],
};

export default function KoreanRapidTappingPage() {
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
      <RapidTappingClient copy={koCopy} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/ko/drills/motor/movement-speed/rapid-tapping" />
      </div>
      <DrillFooter />
    </>
  );
}

