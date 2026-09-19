import DragAndDropClient from '@/app/drills/motor/hand-eye-coordination/drag-and-drop/DragAndDropClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import DrillFooter from '@/components/drill/DrillFooter';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: '드래그 앤 드롭 연습・마우스 조작 트레이너 – 드래그 정밀도 및 속도 테스트 | SkillDrills',
  description: '무료 브라우저 드래그 앤 드롭 마우스 트레이닝 도구. 타깃 오브젝트를 클릭한 채로 끌어서 목표 지점에 정확히 놓는 정밀 드래그 속도와 제어력을 정밀 측정합니다.',
  keywords: [
    '드래그 앤 드롭 테스트',
    '마우스 드래그 연습',
    '드래그 정밀도 측정',
    '마우스 조작 연습',
    '마우스 트레이너',
    '인벤토리 드래그 연습',
    '마우스 제어 테스트',
    'RTS 마우스 연습',
    '드래그 속도 테스트',
    '마우스 정확도',
    '마우스 끌기 연습',
    '에임 브레이킹 연습',
  ],
  openGraph: {
    title: '드래그 앤 드롭 연습・마우스 조작 트레이너 – 드래그 정밀도 및 속도 테스트 | SkillDrills',
    description: '무료 브라우저 드래그 앤 드롭 마우스 트레이닝 도구. 타깃 오브젝트를 클릭한 채로 끌어서 목표 지점에 정확히 놓는 정밀 드래그 속도와 제어력을 정밀 측정합니다.',
    type: 'article',
    url: 'https://skilldrills.online/ko/drills/motor/hand-eye-coordination/drag-and-drop',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '드래그 앤 드롭 연습・마우스 조작 트레이너 – 드래그 정밀도 및 속도 테스트 | SkillDrills',
    description: '무료 브라우저 드래그 앤 드롭 마우스 트레이닝 도구. 타깃 오브젝트를 클릭한 채로 끌어서 목표 지점에 정확히 놓는 정밀 드래그 속도와 제어력을 정밀 측정합니다.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/motor/hand-eye-coordination/drag-and-drop',
    languages: getAlternateLanguages('/drills/motor/hand-eye-coordination/drag-and-drop'),
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'SkillDrills 홈',
      item: 'https://skilldrills.online/ko',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: '운동 신경 트레이닝',
      item: 'https://skilldrills.online/ko/drills/motor',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: '손과 눈의 협응력',
      item: 'https://skilldrills.online/ko/drills/motor/hand-eye-coordination',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: '드래그 앤 드롭 마우스 트레이너',
      item: 'https://skilldrills.online/ko/drills/motor/hand-eye-coordination/drag-and-drop',
    },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '드래그 앤 드롭 연습・마우스 정밀 조작 트레이너',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
  description: '브라우저 기반 무료 드래그 앤 드롭 정밀도 측정 도구. 마우스 커서 감속 제어, 연속 운반 및 릴리스 타이밍을 정밀 분석합니다.',
  url: 'https://skilldrills.online/ko/drills/motor/hand-eye-coordination/drag-and-drop',
  publisher: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  dateModified: '2026-09-16',
};

const webApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '드래그 앤 드롭 마우스 트레이너',
  browserRequirements: 'HTML5 Canvas 및 자바스크립트 지원 최신 브라우저',
  url: 'https://skilldrills.online/ko/drills/motor/hand-eye-coordination/drag-and-drop',
  applicationCategory: 'EducationalApplication',
  dateModified: '2026-09-16',
};

const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: '드래그 앤 드롭 마우스 정밀도 게임',
  url: 'https://skilldrills.online/ko/drills/motor/hand-eye-coordination/drag-and-drop',
  description: '타깃을 누른 채 신속하게 이동해 움직이는 용기에 정확히 넣는 정밀 조작 드릴.',
  genre: ['정밀도 게임', '액션', 'e스포츠 트레이닝'],
  gamePlatform: ['Web Browser', 'Desktop'],
  applicationCategory: 'Game',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-16',
  mainEntity: [
    {
      '@type': 'Question',
      name: '드래그 앤 드롭 연습(Drag and Drop Test)의 목적은 무엇인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '물체를 클릭한 상태로 유지하며 이동하는 연속 조작 능력, 목표 지점에 다다를 때의 감속 제어력, 그리고 정확한 시점에 버튼을 해제하는 릴리스 정확도를 측정하고 단련합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '단순 클릭과 드래그 조작 간의 생체역학적 차이는?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '단순 클릭은 찰나의 근수축 후 이완되지만, 드래그는 검지 근육의 정적 수축을 유지한 채 손목과 팔의 동적 운동을 동시에 수행해야 하므로 뇌의 운동 피질에 더 높은 부하가 걸립니다.',
      },
    },
    {
      '@type': 'Question',
      name: 'MacKenzie et al. (1991)의 연구 결과는 무엇을 시사하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '드래그 앤 드롭은 포인팅 후 클릭하는 동작에 비해 오류율과 소요 시간이 유의미하게 증가한다는 점을 실험적으로 증명했습니다. 클릭 유지가 손과 패드 간의 마찰을 증가시키기 때문입니다.',
      },
    },
    {
      '@type': 'Question',
      name: '조종의 법칙(Steering Law, Accot & Zhai, 1997)이란?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '제한된 터널 통로를 따라 커서를 이동할 때 이동 시간은 터널 폭과 이동 거리에 비례한다는 법칙으로, 궤적을 이탈하지 않기 위한 지속적인 시각 피드백 과정을 설명합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '드래그 실수를 줄이기 위한 올바른 손 모양은?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '버튼을 지나치게 꽉 누르지 말고 스위치가 유지될 최소한의 힘만 가해야 합니다. 손목 전체에 과도한 힘이 들어가면 미세 제어가 불가능해지고 근육 경련이 발생합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '드롭 타이밍을 맞추는 최적의 방법은?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '용기의 현재 위치보다 이동 방향을 미리 예측하여 용기 안쪽에 도달하기 30~50ms 전에 브레이킹을 시작하고 중심부에서 버튼을 놓아야 안전하게 판정됩니다.',
      },
    },
    {
      '@type': 'Question',
      name: '어떤 게임 장르에서 특히 중요한 기술인가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RTS나 MOBA(롤, 스타크래프트)의 드래그 박스 부대 지정, 배틀로얄 FPS(에이펙스, 배그)의 고속 인벤토리 파밍 및 방어구 스왑 시 결정적인 승패 요인으로 작용합니다.',
      },
    },
    {
      '@type': 'Question',
      name: '단계가 올라갈수록 난이도는 어떻게 변하나요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '오브젝트와 타깃 용기의 크기가 축소되고, 용기의 이동 속도가 빨라지며 허용 제한 시간이 촉박해져 정밀한 고속 조작이 요구됩니다.',
      },
    },
    {
      '@type': 'Question',
      name: '마우스 장비와 마우스패드가 드래그에 미치는 영향은?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '클릭 상태에서 마우스를 누르면 패드로 가해지는 하향 압력이 커집니다. 일정한 동마찰력을 제공하는 밸런스형 패드와 균일한 스위치 반발력이 정밀도에 큰 도움을 줍니다.',
      },
    },
    {
      '@type': 'Question',
      name: '브라우저 환경에서 별도의 설치 없이 이용 가능한가요?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '네, 프로그램 설치나 로그인 없이 크롬, 엣지 등 모든 최신 웹 브라우저에서 즉시 실행되며 개인 기록은 로컬에 안전하게 보관됩니다.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: '드래그 앤 드롭 마우스 정밀도 훈련 프로토콜',
  description: '마우스 커서 감속 제어, 공간적 운반 궤적 최적화, 정밀 릴리스 타이밍 4단계 훈련.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '타깃 객체 정확한 조준 및 클릭 유지',
      text: '스폰된 객체 위로 커서를 올린 후 마우스 왼쪽 버튼을 확실하게 누르고 있습니다.',
      url: 'https://skilldrills.online/ko/drills/motor/hand-eye-coordination/drag-and-drop#step-1',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '목표 지점으로의 직선 궤적 이동',
      text: '버튼 누름을 유지하면서 목표 드롭 슬롯을 향해 흔들림 없이 빠르게 커서를 이동합니다.',
      url: 'https://skilldrills.online/ko/drills/motor/hand-eye-coordination/drag-and-drop#step-2',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '슬롯 중심 정렬 및 미세 조정',
      text: '객체가 목표 슬롯 경계 안에 온전히 진입하도록 손목의 미세 근육으로 위치를 안정시킵니다.',
      url: 'https://skilldrills.online/ko/drills/motor/hand-eye-coordination/drag-and-drop#step-3',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: '정밀 릴리스(놓기)',
      text: '타깃 구역 내에서 버튼을 신속하게 해제하여 완벽한 드롭 판정과 시간 점수를 획득합니다.',
      url: 'https://skilldrills.online/ko/drills/motor/hand-eye-coordination/drag-and-drop#step-4',
    },
  ],
};

const guideProps = {
  sources: pickSources('accot1997', 'mackenzie1991', 'fitts1954', 'elliott2010', 'woods2015'),
  intro: {
    title: '드래그, 조종 궤적 및 감속 제어의 생체역학적 원리',
    paragraphs: [
      '인간과 컴퓨터의 상호작용(HCI)에서 지속적인 드래그 앤 드롭 조작은 단순 포인트 앤 클릭과 신경근육학적으로 완전히 구별됩니다. 이산적인 포인팅은 피츠의 법칙(Fitts, 1954)에 의해 지배되는 반면, 드래그는 검지 굴근의 지속적인 등척성 수축을 유지하면서 동시에 패드 위에서 팔과 손목의 다축 병진 운동을 조화롭게 수행해야 합니다.',
      '선구적인 실험 연구에서 MacKenzie, Sellen, Buxton(1991)은 드래그 작업이 단순 포인팅에 비해 15%에서 25%에 달하는 고유한 처리량(Throughput) 저하를 겪는다는 사실을 입증했습니다. 지속적인 하향 압력은 마우스 피트와 패드 사이의 마찰 계수를 변화시키고, 손가락의 미세한 관절 가동성을 제약하여 신경근 모터 노이즈를 증폭시킵니다.',
      '또한 Johnny Accot과 Shumin Zhai(1997)는 궤적 제약 운동을 수학적으로 모델링한 스티어링 법칙(Steering Law)을 정립했습니다. 동적인 드래그 과정에서 사용자는 전방 추진 운동량과 종단 경계 내에서의 신속한 감속 제동(Elliott et al., 2010)을 끊임없이 조율하여 목표 영역을 벗어나는 오버슈트를 방지해야 합니다.',
      '측정 분해능 및 브라우저 환경 한계: 측정값은 브라우저 performance.now() 고해상도 타이머를 기반으로 산출됩니다. 디스플레이 재생률(60Hz 약 16.7ms, 144Hz 약 6.9ms)과 마우스 폴링레이트(125Hz 약 8ms vs 1000Hz 약 1ms)에 따른 양자화 오차가 존재하므로(Woods et al., 2015), 타인과의 절대 비교보다 동일 환경에서의 개인 기록 향상 추이에 집중하는 것을 권장합니다.',
    ],
  },
  benchmarks: {
    title: '드래그 정밀도 및 감속 제어 표준 벤치마크',
    caption: 'Accot & Zhai(1997) 조종 모델 및 MacKenzie et al.(1991) 드래그 분석에 기초한 표준 지표. SkillDrills는 일체의 사용자 데이터를 외부로 수집하지 않습니다.',
    headers: ['등급 (Tier)', '숙련도 분류', '도달 레벨 및 콤보', '평균 운반 소요시간', '드롭 정확도', '신경운동 특성 프로필'],
    rows: [
      [
        'Tier 1',
        '엘리트 / 프로 게이머',
        'Lv. 12–15 (콤보 > 18회)',
        '< 420 ms',
        '≥ 98.0%',
        '이상적인 종형 속도 곡선, 완벽한 브레이킹 제어, 고속 이동 중 조기 릴리스 오류 전무.',
      ],
      [
        'Tier 2',
        '상급 / 숙련자',
        'Lv. 9–11 (콤보 12–17회)',
        '420–510 ms',
        '94.0%–97.9%',
        '안정적인 감속 궤적, 좁은 통로 추적 우수, 종단부 미세 보정 시간 35ms 미만.',
      ],
      [
        'Tier 3',
        '중급 / 일반 게이머',
        'Lv. 6–8 (콤보 7–11회)',
        '511–640 ms',
        '87.0%–93.9%',
        '가속 구간에서 약간의 궤적 오버슈트 발생, 슬롯 진입 직전 감속 정체 관찰.',
      ],
      [
        'Tier 4',
        '초급 / 발달 단계',
        'Lv. 3–5 (콤보 3–6회)',
        '641–800 ms',
        '78.0%–86.9%',
        '다중 충동형 다듬질 조작, 과도한 그립 압력으로 패드 마찰 급증 및 경계 이탈 빈번.',
      ],
      [
        'Tier 5',
        '입문 / 초보자',
        'Lv. 1–2 (콤보 < 3회)',
        '> 800 ms',
        '< 78.0%',
        '느린 운반 속도, 슬롯 외부에서의 잦은 버튼 해제, 클릭 유지 근육 피로 발생.',
      ],
    ],
  },
  protocols: {
    title: '마우스 조작 제어력을 극대화하는 4대 훈련 프로토콜',
    items: [
      {
        title: '프로토콜 1: 등척성 파지 압력 최적화 (레벨 1–4)',
        description: '마우스 버튼을 누른 상태에서 손가락의 하향 압력을 최소화하여 긴장을 푸는 데 집중합니다. 과도한 악력은 손목 굴근을 경직시켜 고주파 미세 떨림을 유발합니다.',
      },
      {
        title: '프로토콜 2: 아코트-차이 스티어링 터널 최적화 (레벨 5–8)',
        description: '오브젝트 획득 지점과 목표 슬롯 사이의 공간 궤적 편차를 최소화합니다. 두 지점을 잇는 가상의 직선 터널을 상상하며 불필요한 곡선 이동을 배제하세요.',
      },
      {
        title: '프로토콜 3: 길항근 감속 및 릴리스 브레이킹 (레벨 9–12)',
        description: '움직이는 슬롯 경계에 도달하기 약 50ms 전 전완 신근을 활성화하여 전진 관성을 부드럽게 제동하고 중심점에서 정밀하게 버튼을 해제합니다.',
      },
      {
        title: '프로토콜 4: 동적 리드각 예측 도달 훈련 (레벨 13–15)',
        description: '고속으로 이동하는 용기의 순간 위치가 아닌 예측 이동 궤적을 향해 커서를 전진시켜 용기 진입 경로에 물체를 유연하게 떨어뜨립니다.',
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

const copyKo = {
  title: "드래그 앤 드롭 연습・마우스 조작 트레이너",
  subtitle: "공간 드래그 앤 드롭 타깃 정렬 • 15단계 레벨 스케일링",
  startButtonText: "훈련 시작",
  playAgainText: "다시 도전",
  shareText: "결과 공유",
  exitText: "나가기",
  accuracyLabel: "정확도",
  targetDropsLabel: "타깃 안착",
  maxComboLabel: "최대 콤보",
  peakLevelLabel: "최고 레벨",
  rulesTitle: "드릴 조작법 & 점수 획득 규칙",
  rulesItems: [
    { num: "1", text: "타깃 안착", highlight: "+100점 × 콤보", result: "볼을 드래그해 컨테이너 내부 릴리즈" },
    { num: "2", text: "연속 콤보", highlight: "최대 3.0배 배율", result: "연속 성공 시 보너스 획득" },
    { num: "3", text: "레벨 난이도 상승", highlight: "250점마다 +1 레벨", result: "컨테이너 축소 및 이동 속도 가속" },
    { num: "4", text: "빗맞힘 / 시간 초과", highlight: "콤보 초기화", result: "컨테이너 외부 릴리즈 시 배율 초기화" }
  ],
};

export default function DragAndDropPage() {
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
      <DragAndDropClient copy={copyKo} />
      <DrillGuide {...guideProps} />
      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="motor"
          currentHref="/drills/motor/hand-eye-coordination/drag-and-drop"
          locale="ko"
        />
      </div>
      <DrillFooter />
    </>
  );
}
