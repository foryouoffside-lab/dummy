import { pickSources } from '@/lib/drillSources';
import KeyboardTesterClient from '@/app/drills/motor/keyboard-tester/KeyboardTesterClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';

export const metadata = {
  title: '키보드 테스트 – 온라인 키보드 검사 및 동시입력 확인 | SkillDrills',
  description:
    '무료 온라인 키보드 테스트. 모든 키의 입력 인식 여부, 키 씹힘 및 안눌림, 무한 동시입력(NKRO), 키보드 채터링(두 번 눌림)을 브라우저에서 프로그램 설치 없이 즉시 확인하세요.',
  keywords: [
    '키보드 테스트',
    '키보드테스트',
    '키보드 테스트 사이트',
    '키보드 입력 테스트',
    '키보드 반응속도 테스트',
    '키보드 동시입력 테스트',
    '키보드 무한동시입력',
    '키보드 채터링 테스트',
    '키보드 검사',
    '노트북 키보드 테스트',
    '맥북 키보드 테스트',
    '키보드 두번 눌림',
    '키보드 안눌림',
    '키보드 확인',
    '온라인 키보드 테스트',
  ],
  openGraph: {
    title: '키보드 테스트 – 온라인 키보드 검사 및 동시입력 확인 | SkillDrills',
    description:
      '브라우저에서 즉시 실행하는 무료 키보드 테스트. 키 인식, 무한 동시입력(NKRO), 채터링을 설치 없이 실시간으로 검사하세요.',
    type: 'article',
    url: 'https://skilldrills.online/ko/drills/motor/keyboard-tester',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '키보드 테스트 – 온라인 키보드 검사 및 동시입력 확인 | SkillDrills',
    description:
      '브라우저에서 즉시 실행하는 무료 키보드 테스트. 키 인식, 무한 동시입력(NKRO), 채터링을 설치 없이 실시간으로 검사하세요.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/motor/keyboard-tester',
    languages: getAlternateLanguages('/drills/motor/keyboard-tester'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills 홈', item: 'https://skilldrills.online/ko' },
    {
      '@type': 'ListItem',
      position: 2,
      name: '훈련 허브',
      item: 'https://skilldrills.online/ko/drills',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: '모터 트레이닝',
      item: 'https://skilldrills.online/ko/drills/motor',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: '키보드 테스트',
      item: 'https://skilldrills.online/ko/drills/motor/keyboard-tester',
    },
    {
      '@type': 'Question',
      name: '키보드 동시입력(NKRO) 개수를 어떻게 확인하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '양손으로 최대한 많은 키를 동시에 누르면 화면 하단 최대 동시입력 수치에 현재 인식된 키 개수가 표시됩니다. N-Key Rollover 지원 키보드는 누른 모든 키가 동시에 점등됩니다.',
      },
    },
    {
      '@type': 'Question',
      name: '이 도구는 기계식, 멤브레인, 무접점 키보드 모두 지원하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네. 운영체제에서 전달되는 표준 키보드 신호를 읽기 때문에 모든 방식의 기계식, 멤브레인, 정전용량 무접점, 펜타그래프 키보드를 완벽하게 지원합니다.',
      },
    },
    {
      '@type': 'Question',
      name: 'event.code와 event.key의 차이는 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'event.code는 키보드 상의 물리적인 키 위치(예: KeyA)를 나타내며 한영 전환이나 언어 레이아웃에 영향을 받지 않습니다. 반면 event.key는 실제 입력된 문자(예: a 또는 ㅁ)를 나타냅니다.',
      },
    },
    {
      '@type': 'Question',
      name: '이 키보드 테스트 사이트는 무료인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, 완전 무료입니다. 별도의 프로그램 설치나 회원가입 없이 브라우저 접속 즉시 안전하게 무료로 키보드를 진단할 수 있습니다.',
      },
    },
  ],
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '온라인 키보드 테스트',
  alternateName: ['키보드 테스트', '키보드 검사기', '키보드 테스트 사이트', '키보드 입력 테스트'],
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'All',
  browserRequirements: '최신 웹 브라우저 및 물리적 키보드 필요',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  description:
    '무료 브라우저 기반 키보드 테스트 도구. 각 키의 입력 인식, 키 씹힘/안눌림, 무한 동시입력(NKRO), 채터링(더블클릭) 현상을 프로그램 설치 없이 실시간으로 확인합니다.',
  url: 'https://skilldrills.online/ko/drills/motor/keyboard-tester',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  inLanguage: 'ko-KR',
  dateModified: '2026-09-11',
};


const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '키보드 테스트 (Keyboard Tester Online)',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: '브라우저 기반 무료 키보드 테스트 프로그램. 키 작동 확인, 동시입력(NKRO) 및 고스팅 현상, 채터링 진단.',
  url: 'https://skilldrills.online/ko/drills/motor/keyboard-tester',
  dateModified: '2026-09-11',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' }
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: '키보드 테스트 & 동시입력 진단 도구',
  url: 'https://skilldrills.online/ko/drills/motor/keyboard-tester',
  description: '웹 브라우저에서 실행되는 인터랙티브 키보드 진단 및 키 입력 검사기.',
  dateModified: '2026-09-11',
  gamePlatform: 'Web Browser',
  genre: ['키보드 테스트', '유틸리티', '하드웨어 진단'],
  playMode: 'SinglePlayer',
  applicationCategory: 'Game',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: '온라인 키보드 테스트 사용 방법 4단계',
  description: '키보드 키 작동 검사, 채터링 및 동시입력 상태를 진단하는 단계별 방법.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      url: 'https://skilldrills.online/ko/drills/motor/keyboard-tester#step-1',
      name: '각 키를 하나씩 눌러 작동 확인',
      text: '키보드의 모든 키를 순서대로 한 번씩 누릅니다. 정상 작동하는 키는 누르는 동안 파란색, 등록 후 초록색으로 표시됩니다.'
    },
    {
      '@type': 'HowToStep',
      position: 2,
      url: 'https://skilldrills.online/ko/drills/motor/keyboard-tester#step-2',
      name: '동시입력(무한 동시입력/안티고스팅) 테스트',
      text: '게임에서 자주 사용하는 키 조합(예: W+A+S+D+Spacebar)을 동시에 눌러 키 씹힘 현상이 발생하는지 확인합니다.'
    },
    {
      '@type': 'HowToStep',
      position: 3,
      url: 'https://skilldrills.online/ko/drills/motor/keyboard-tester#step-3',
      name: '실시간 키 이벤트 및 채터링 점검',
      text: '하단 정보 창에서 event.code 및 event.key 데이터를 확인하여 물리적 접점 불량이나 두 번 눌림(채터링) 여부를 분석합니다.'
    },
    {
      '@type': 'HowToStep',
      position: 4,
      url: 'https://skilldrills.online/ko/drills/motor/keyboard-tester#step-4',
      name: '미입력 키 점검 및 초기화',
      text: '화면에 초록색으로 변하지 않은 고장 키를 식별한 후, 필요 시 초기화 버튼을 눌러 추가 테스트를 진행합니다.'
    }
  ]
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '키보드 키가 정상 작동하는지 어떻게 테스트하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '이 온라인 키보드 테스트 페이지를 열고 물리적 키보드의 키를 하나씩 누르세요. 키를 누르고 있는 동안에는 청록색으로 표시되고, 키 입력이 성공적으로 확인되면 녹색으로 유지됩니다. 단단히 눌렀음에도 색상이 바뀌지 않는 키는 신호가 브라우저에 도달하지 않는 불량 키입니다. 상단의 미확인 키 목록을 통해 아직 테스트되지 않은 키를 정확히 파악할 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '키보드 키가 화면에서 반응하지 않는 이유는 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '키 입력 신호가 브라우저에 도달하지 못한 상태를 의미합니다. 이는 기계식 스위치 접점 불량, 키캡 아래 이물질, PCB 기판 고장, USB 케이블 단선, 무선 수신기 간섭 또는 운영체제 드라이버 충돌 등 다양한 원인으로 발생할 수 있습니다. 특정 키 하나만 작동하지 않는다면 스위치 불량이나 먼지일 가능성이 높으며, 한 줄 전체가 작동하지 않는다면 기판 리본 케이블이나 컨트롤러 고장일 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '키보드 동시입력(무한 동시입력 / 안티고스팅)이란 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '동시입력(Key Rollover)은 키보드가 한 번에 인식하고 전송할 수 있는 최대 키 개수를 의미합니다. 여러 키를 동시에 누르면 실시간으로 동시입력(Rollover) 숫자가 표시됩니다. 일반 멤브레인 키보드는 2~6개 키를 누르면 추가 입력을 무시하는 고스팅 현상이 발생하지만, 무한 동시입력(NKRO)을 지원하는 게이밍 기계식 키보드는 동시에 누른 모든 키를 누락 없이 정상 인식합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '키보드 채터링(두 번 눌림) 현상은 어떻게 확인하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '키보드 채터링은 스위치를 한 번만 가볍게 눌렀음에도 두 번 이상 중복 입력되는 하드웨어 접점 바운스 현상입니다. 본 도구의 하단 키 이벤트 감지기에서 단일 입력 시 키 다운(keydown) 이벤트가 비정상적으로 연속 발생하거나 글자가 중복 타이핑되는지 확인하여 스위치 교체 시기를 판별할 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '노트북이나 맥북 키보드도 이 도구로 테스트할 수 있나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, 윈도우 노트북, 맥북(MacBook), 외장 USB 키보드 및 블루투스 무선 키보드 모두 100% 호환됩니다. 별도의 드라이버나 프로그램을 다운로드할 필요 없이 브라우저에서 즉시 전 키 인식을 확인할 수 있습니다.',
      },
    },
    {
      '@type': 'Question',
      name: '키 입력 시 입력 내용이 서버에 저장되거나 유출되나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '아닙니다. 모든 키 이벤트는 사용자의 로컬 웹 브라우저 메모리 내에서만 즉시 처리되며, 페이지를 벗어나거나 새로고침하면 완전히 폐기됩니다. 어떠한 키 입력 기록도 서버로 전송되거나 외부 저장소에 저장되지 않습니다.',
      },
    },
  ],
};

const KOREAN_COPY = {
  title: '온라인 키보드 테스트',
  subtitle: '무료 브라우저 키보드 검사기 — 전 키 입력 및 동시입력 확인',
  intro:
    '키보드의 각 키를 하나씩 눌러보세요. 키를 누르는 동안 하이라이트되며, 정상적으로 인식된 키는 녹색으로 표시됩니다. 불이 들어오지 않는 키는 신호가 브라우저에 도달하지 않는 불량 스위치, 키 씹힘, 또는 접점 고장 상태를 나타냅니다. 프로그램 설치가 필요 없으며 데이터는 절대 저장되지 않습니다.',
  keysConfirmed: '확인된 키',
  rollover: '동시입력',
  capturing: '키 캡처 중',
  paused: '일시정지',
  reset: '초기화',
  captureNotice:
    '키 캡처가 활성화되어 브라우저 단축키가 일시 차단됩니다. 단축키를 사용하려면 Shift + Esc를 누르거나 키 캡처 버튼을 클릭하세요.',
  lastKeyEvent: '최근 감지된 키 이벤트',
  eventCode: 'event.code (물리 키 코드)',
  eventKey: 'event.key (입력 문자)',
  keyCode: 'keyCode',
  location: '키 위치',
  autoRepeat: '자동 반복',
  yes: '예',
  no: '아니오',
  space: '(스페이스)',
  pressAnyKey: '아무 키나 눌러 브라우저가 수신하는 실시간 신호를 확인하세요.',
  keysNotOnLayout: '표준 레이아웃 외 추가 감지 키',
  notYetConfirmed: '아직 확인되지 않은 키',
  allConfirmed: '모든 키가 정상적으로 인식되었습니다. 키보드가 완벽히 작동 중입니다.',
  untestedSingular: '개의 키가 아직 테스트되지 않았습니다. 여러 번 눌러도 반응하지 않는 키를 점검하세요.',
  untestedPlural: '개의 키가 아직 테스트되지 않았습니다. 여러 번 눌러도 반응하지 않는 키를 점검하세요.',
  mobileWarning:
    '본 도구는 물리적 키보드가 필요합니다. 데스크톱이나 노트북 PC에서 접속하시거나 외장 키보드를 연결해 주세요.',
  howTitle: '키보드 테스트 사용 방법',
  howStep1: '키보드의 왼쪽 상단 Esc 키부터 오른쪽 하단까지 각 줄을 따라 순서대로 키를 누릅니다.',
  howStep2: '누르고 있는 동안 키는 청록색으로 켜지고, 한 번이라도 인식되면 영구적인 녹색으로 바뀝니다.',
  howStep3: '“아직 확인되지 않은 키” 목록이 비워지는지 확인합니다. 끝까지 남는 키가 불량 키입니다.',
  howStep4: '여러 키를 동시에 눌러 상단의 동시입력(Rollover) 최대 수치를 확인합니다.',
  rolloverTitle: '무한 동시입력(NKRO) 및 고스팅 안내',
  rolloverP1:
    '동시입력은 키보드가 여러 키를 동시에 눌렀을 때 한 번에 컴퓨터로 전달할 수 있는 키 개수입니다. 일반 사무용 키보드는 3~6개 이상 누르면 추가 입력을 무시하는 고스팅이 발생하지만, 게이밍 키보드는 무한 동시입력(NKRO)을 지원하여 누른 모든 키를 인식합니다.',
  rolloverP2:
    '양손으로 키 여러 개를 동시에 누르고 상단의 동시입력 수치를 확인하세요. 3~4개에서 더 이상 올라가지 않는다면 키보드 하드웨어의 설계 한계입니다.',
  limitsTitle: '테스트 도구가 판별할 수 없는 한계',
  limitsP1:
    '본 도구는 브라우저가 수신하는 최종 키 이벤트를 감지합니다. 키 스위치, 컨트롤러, 케이블, 드라이버, 운영체제를 거친 최종 신호이므로, 신호가 오지 않는다는 사실은 100% 확실히 증명하지만 정확히 어느 부품이 고장인지는 하드웨어 분해 검사가 필요합니다.',
  limitsP2:
    '운영체제가 가로채는 시스템 단축키(Alt+Tab, Ctrl+Alt+Del 등)는 브라우저에 도달하지 않는 것이 정상입니다. 또한 새로고침(F5), 전체화면(F11), 개발자도구(F12)는 웹 서핑 보호를 위해 브라우저에 기본 전달됩니다.',
};

const guideProps = {
  intro: {
    title: "키보드 테스트 도구가 실제로 확인하는 항목",
    sources: pickSources('woods2015'),
    paragraphs: [
      "키보드 테스트 도구는 각 물리적 키가 운영체제와 브라우저에 정상적인 입력 신호 이벤트를 전달하는지 검증합니다. 키를 눌렀을 때 브라우저가 키 위치 식별 코드를 수신하지 못한다면, 해당 키는 기계적 또는 전기적으로 읽히지 않고 있음을 의미합니다.",
      "스위치, 컨트롤러 회로, 케이블 및 드라이버로 이어지는 신호 체계의 최종 수신 여부를 판별하여, 소프트웨어 오류와 물리적 하드웨어 고장을 명확히 분리 진단할 수 있습니다.",
    ],
  },
  benchmarks: {
    title: '키보드 동시입력 및 하드웨어 성능 등급',
    caption: '키보드 매트릭스 스캔, 스위치 디바운스, USB 폴링레이트에 기초한 하드웨어 분류 체계입니다. 데이터는 브라우저 로컬에서만 처리됩니다.',
    headers: ['등급 (Tier)', '하드웨어 아키텍처', '동시입력(Rollover) 한도', '안티고스팅 매트릭스', '스위치 반응 지연시간', '진단 및 게이밍 프로필'],
    rows: [
      [
        'Tier 1',
        '무한 동시입력 NKRO (자석축 / 광축 스위치)',
        '완전 N-Key (> 50키 동시입력)',
        '스위치별 독립 다이오드 장착; 고스팅 전무',
        '1.0 ms 미만 (8000 Hz / 1000 Hz 폴링)',
        '최상위 e스포츠 등급: 래피드 트리거 완벽 지원, 동시 키코드 씹힘 제로, 채터링 방지.',
      ],
      [
        'Tier 2',
        '6KRO / 10KRO 기계식 키보드 (기계식 축)',
        '6~10키 동시입력 보장',
        '주요 알파벳 및 모디파이어 키 다이오드 분리',
        '2.0–5.0 ms (1000 Hz 폴링, 접점 디바운스)',
        '게이밍 표준: 화려한 방향 전환 무빙과 스킬 콤보 입력 시 키 씹힘 없는 안정적 반응.',
      ],
      [
        'Tier 3',
        '게이밍 최적화 매트릭스 (하이브리드 멤브레인)',
        '4~6키 동시입력 (WASD 클러스터)',
        '게임 주요 키 중심 클러스터 안티고스팅',
        '8.0–15.0 ms (125–500 Hz 폴링)',
        '일반 게이머 등급: 기본 FPS 조작은 원활하나 3개 이상 모디파이어 조합 시 간헐적 씹힘.',
      ],
      [
        'Tier 4',
        '표준 사무용 매트릭스 (일반 멤브레인)',
        '2~3키 동시입력 (2KRO)',
        '회로선 공유 매트릭스; 빈번한 고스팅 블로킹',
        '15.0–30.0 ms (125 Hz 폴링)',
        '사무용 기본 등급: 3키 이상 고속 동시 입력 시 신호 누락 또는 엉뚱한 키 오입력 발생.',
      ],
      [
        'Tier 5',
        '스위치 불량 / 채터링 (접점 마모 및 부식)',
        '간헐적 끊김 / 단일 키 먹통',
        '접점 산화, 스프링 장력 상실, PCB 패턴 단선',
        '불규칙 접점 바운스 (> 35 ms 지터)',
        '하드웨어 고장 판정: 한 번 눌렀는데 두 번 입력되는 채터링, 인식 불가, 키 걸림 현상.',
      ],
    ],
  },
  faqs: {
    title: '키보드 테스트 관련 자주 묻는 질문 (FAQ)',
    items: faqSchema.mainEntity.map((q) => ({
      q: q.name,
      a: q.acceptedAnswer.text,
    })),
  },
};

export default function KoreanKeyboardTesterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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
      <KeyboardTesterClient copy={KOREAN_COPY} defaultLayout="korean" />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="motor" currentHref="/drills/motor/keyboard-tester" />
      </div>
    </>
  );
}
