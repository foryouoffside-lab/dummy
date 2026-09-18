import ObjectLocationClient from '@/app/drills/memory/spatial-memory/object-location/ObjectLocationClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "공간 기억력 테스트・물체 위치 기억 검사 – 위치 회상 | SkillDrills",
  description: "무료 온라인 공간 기억력 테스트(사물 위치 기억 검사). 확장되는 격자 위 사물 위치를 1.5초 만에 기억하고 목표 좌표를 찾아 시공간 결합 능력을 측정하세요.",
  keywords: ['공간 기억력 테스트', '공간기억검사', '물체 위치 기억', '시공간 작업기억', '사물 위치 기억 테스트', '시각 공간 기억력', '위치 기억 검사', '오브젝트 로케이션 테스트', '공간 인지 능력 검사', '두뇌 인지 훈련', '좌표 기억력 테스트', '실버만 일스 테스트'],
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/memory/spatial-memory/object-location",
    languages: getAlternateLanguages('/drills/memory/spatial-memory/object-location', 'ko'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "공간 기억력 테스트 (물체 위치 기억 검사) - 무료 인지 훈련 | SkillDrills",
    description: "무료 온라인 공간 기억력 테스트 (Object Location Memory Test / 사물 위치 기억 검사). 확장되는 3x3~7x7 격자 위 사물 이모지의 위치를 1.5초 만에 순간 기억하고 지정된 목표 좌표를 신속하게 찾아 시각-공간 결합 능력을 측정하세요. 회원가입 불필요.",
    url: "https://skilldrills.online/ko/drills/memory/spatial-memory/object-location",
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "공간 기억력 테스트 (물체 위치 기억 검사) - 무료 인지 훈련 | SkillDrills",
    description: "무료 온라인 공간 기억력 테스트 (Object Location Memory Test / 사물 위치 기억 검사). 확장되는 3x3~7x7 격자 위 사물 이모지의 위치를 1.5초 만에 순간 기억하고 지정된 목표 좌표를 신속하게 찾아 시각-공간 결합 능력을 측정하세요. 회원가입 불필요.",
  },
};

export const dynamic = 'force-static';

export default function LocalizedObjectLocationPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://skilldrills.online/ko" },
      { "@type": "ListItem", "position": 2, "name": "기억력 훈련", "item": "https://skilldrills.online/ko/drills/memory" },
      { "@type": "ListItem", "position": 3, "name": "공간 기억", "item": "https://skilldrills.online/ko/drills/memory/spatial-memory" },
      { "@type": "ListItem", "position": 4, "name": "공간 기억력 테스트", "item": "https://skilldrills.online/ko/drills/memory/spatial-memory/object-location" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "공간 기억력 테스트 (물체 위치 기억 검사)",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "확장되는 격자 매트릭스 위 사물 위치를 순간 기억하고 목표 좌표를 찾는 공간 위치 기억, 시각-공간 특징 결합 및 인지 지도 형성 검사.",
    "genre": "Cognitive Assessment / Spatial Memory",
    "url": "https://skilldrills.online/ko/drills/memory/spatial-memory/object-location",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "공간 기억력 테스트 (물체 위치 기억 검사)",
    "url": "https://skilldrills.online/ko/drills/memory/spatial-memory/object-location",
    "description": "확장되는 격자 매트릭스 위 사물 위치를 순간 기억하고 목표 좌표를 찾는 공간 위치 기억, 시각-공간 특징 결합 및 인지 지도 형성 검사.",
    "dateModified": "2026-09-05",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "isAccessibleForFree": true,
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "공간 기억력 테스트 (물체 위치 기억 검사)",
    "description": "확장되는 격자 매트릭스 위 사물 위치를 순간 기억하고 목표 좌표를 찾는 공간 위치 기억, 시각-공간 특징 결합 및 인지 지도 형성 검사.",
    "url": "https://skilldrills.online/ko/drills/memory/spatial-memory/object-location",
    "genre": ["Memory Game", "Cognitive Training", "Spatial Memory"],
    "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
    "applicationCategory": "Game",
    "operatingSystem": "Any",
    "numberOfPlayers": {
      "@type": "QuantitativeValue",
      "value": 1
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-05",
    "mainEntity": [
      {
            "@type": "Question",
            "name": "공간 기억력 테스트(Object Location Memory Test)란 무엇인가요?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "사물이 무엇인가(시각적 정체성)와 어디에 위치해 있는가(공간적 좌표)를 뇌 속에서 동시에 결합하고 유지하는 능력(특징 결합 / Feature Binding)을 측정하는 대표적인 신경심리학적 인지 평가입니다."
            }
      },
      {
            "@type": "Question",
            "name": "이 훈련의 진행 방식과 규칙은 어떻게 되나요?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "3x3에서 7x7까지 점진적으로 커지는 격자 매트릭스에 여러 사물 이모지가 1.5초 동안 나타납니다. 격자가 비워진 후 상단에 지정된 하나의 목표 사물이 제시되며, 해당 사물이 위치했던 원래 좌표를 클릭하여 정답을 맞힙니다."
            }
      },
      {
            "@type": "Question",
            "name": "실버먼-얼스(Silverman-Eals) 물체 위치 기억 과제란 무엇인가요?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "1994년 매리언 얼스와 어윈 실버먼이 개발한 획기적인 신경심리학 과제입니다. 공간 인지에서 3차원 회전 능력과 독립적으로 작동하는 부수적 물체 위치 기억이라는 진화적 메커니즘을 규명했습니다."
            }
      },
      {
            "@type": "Question",
            "name": "인지 신경과학에서 '특징 결합(Object-Location Binding)'이란 무엇인가요?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "뇌의 복측 시각 경로('무엇'을 식별)와 배측 시각 경로('어디'를 처리)에서 전달된 정보가 해마 및 해마곁이랑에서 하나의 통합된 에피소드 표상으로 결합되는 신경학적 과정입니다."
            }
      },
      {
            "@type": "Question",
            "name": "물체 위치 기억 테스트의 일반적인 성인 평균 점수는 얼마인가요?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "CANTAB PAL과 같은 표준 임상 평가에서 정상 성인은 중간 크기 격자에서 약 4~6개의 사물 위치를 정확히 결합합니다. 본 도구는 독자적인 난이도와 시간 제약을 가진 웹 게임이므로 의학적 진단이 아닌 개인 연습용 지표로 참고하시기 바랍니다."
            }
      },
      {
            "@type": "Question",
            "name": "순수 격자 기억 테스트(Visual Matrix)와 어떤 점이 다른가요?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "순수 격자 기억은 켜진 타일의 흑백 패턴만을 기억하므로 기하학적 형태 청킹이 가능합니다. 반면 물체 위치 기억은 '어떤 사물이 어떤 좌표에 있었는가'를 결합해야 하므로 인지적 부담이 훨씬 높습니다."
            }
      },
      {
            "@type": "Question",
            "name": "단순한 기하학 패턴보다 사물 위치를 기억하기 어려운 이유는 무엇인가요?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "작업기억에서 다차원 특징 결합(Conjunction)은 단일 특징 유지보다 훨씬 많은 주의력 자원을 소모하기 때문입니다(Luck & Vogel, 1997). 시각적 정체성과 공간 좌표라는 두 차원을 동시에 처리해야 합니다."
            }
      },
      {
            "@type": "Question",
            "name": "물체 위치 기억을 담당하는 주요 뇌 부위는 어디인가요?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "양측 해마, 해마곁이랑, 후두정엽 피질, 그리고 공간 좌표의 능동적 유지를 담당하는 등외측 전전두엽 피질(DLPFC)이 핵심 신경망을 형성합니다."
            }
      },
      {
            "@type": "Question",
            "name": "잘못된 위치를 클릭하면 감점이나 페널티가 있나요?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "아닙니다. 오답을 클릭해도 점수 감점이나 남은 시간 차감 페널티가 전혀 없습니다. 현재 레벨에서 바로 재도전할 수 있어 차분하게 공간 전략을 가다듬을 수 있습니다."
            }
      },
      {
            "@type": "Question",
            "name": "공간 기억력 향상이 일상생활과 게임 플레이에 어떤 도움이 되나요?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "열쇠나 스마트폰을 둔 위치, 주차 위치 등을 기억하는 일상 능력이 개선되며, FPS나 MOBA 게임에서 미니맵의 적 위치, 스킬 쿨타임, 오브젝트 배치를 순간적으로 파악하는 공간 지각력이 크게 향상됩니다."
            }
      }
]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "공간 기억력 테스트로 사물 위치 기억과 시각 결합 능력을 강화하는 방법",
    "description": "사분면 분할 스캔과 기준점 앵커링 기법을 적용하여 격자 위 사물의 위치와 특징을 정확히 결합하고 회상하는 4단계 실전 프로토콜.",
    "step": [
      {
            "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/ko/drills/memory/spatial-memory/object-location#step-1",
            
            "name": "격자 사분면 분할 스캔",
            "text": "사물이 나타나는 첫 500밀리초 동안 격자를 4개 사분면(좌상, 우상, 좌하, 우하)으로 나누어 전체적인 분포를 빠르게 파악합니다."
      },
      {
            "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/ko/drills/memory/spatial-memory/object-location#step-2",
            
            "name": "고정 랜드마크 기준 앵커링",
            "text": "각 사물의 위치를 모서리 4곳, 외곽 경계선, 정중앙 셀과 같은 고정된 시각 기준점과 결합하여 좌표를 고정합니다."
      },
      {
            "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/ko/drills/memory/spatial-memory/object-location#step-3",
            
            "name": "의미-공간 연상 결합 생성",
            "text": "사물의 정체성(이모지)과 위치를 연결하는 즉각적인 언어적 또는 시각적 결합을 형성합니다(예: '별은 우상단 모서리')."
      },
      {
            "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/ko/drills/memory/spatial-memory/object-location#step-4",
            
            "name": "목표 사물 좌표 회상 및 클릭",
            "text": "격자가 사라지고 목표 아이콘이 제시되면 머릿속 인지 지도를 탐색하여 정확한 셀을 망설임 없이 클릭합니다."
      }
]
  };

  const objectLocationGuide = {
    intro: [
      "공간 기억력 테스트(Object Location Memory Test)는 공간 위치 기억, 시각-공간 특징 결합(Object-Location Binding), 그리고 배치 회상 능력을 평가하고 훈련하기 위해 설계된 신경인지 평가 도구입니다. 단순히 점등된 칸의 위치만을 암기하는 단순 격자 테스트와 달리, 고유한 시각적 토큰과 정확한 공간 좌표를 뇌 속에서 결합하는 고차원적 인지 과정을 측정합니다.",
      "사물 위치 기억의 임상적 토대는 매리언 얼스와 어윈 실버먼(Eals & Silverman, 1994)의 선구적인 연구를 통해 확립되었습니다. 이들은 사물 위치 기억이 심상 회전(Mental Rotation)과 같은 유클리드 공간 조작과 구별되는 진화적 특화 기제임을 밝혔습니다. 이에 앞서 에드워드 톨먼(Tolman, 1948)은 유기체가 환경의 내부 공간 모델을 형성하는 방식을 설명하는 '인지 지도(Cognitive Map)'의 개념을 제시했습니다.",
      "작업기억 아키텍처에서 로버트 로기(Logie, 1995)와 앨런 배들리(Baddeley, 2000)는 사물 위치 결합이 일화 완충기(Episodic Buffer)에 의해 조율되며 시각 캐시(사물 정체성)와 내부 서기(공간 좌표)의 입력을 통합함을 입증했습니다. 스티븐 럭과 에드워드 보겔(Luck & Vogel, 1997)은 특징 결합이 상당한 주의 집중 부하를 유발함을 밝혔으며, 넬슨 코완(Cowan, 2001)은 비보조 초점 작업기억 용량이 엄격하게 3~4개의 사물-위치 쌍으로 제한됨을 증명했습니다.",
      "Woods 등(2015)의 시간 측정 표준에 맞추어 본 훈련은 고정된 1.5초 암기 창과 3x3에서 7x7로 확장되는 적응형 난이도 계단을 활용하여 사용자의 정밀한 공간 결합 한계를 측정합니다.",
      "측정 원리: 모든 사용자 상호작용은 브라우저의 performance.now() 고해상도 타이머를 통해 사용자 기기 내에서만 실시간 측정되며, 점수가 외부 서버로 업로드되지 않습니다. 브라우저 타이머는 스펙터 완화 조치로 약 1ms 단위로 반올림되며 디스플레이 재생 빈도(60Hz 기준 프레임당 약 16.7ms)에 따라 양자화됩니다(Woods et al., 2015). 5ms 미만의 차이는 측정 노이즈로 간주하고 다른 사람의 기기와 비교하기보다 동일한 환경에서 자신의 기록 추이를 관찰하십시오.",
      "데이터 투명성: SkillDrills는 일체의 집계 데이터를 수집하지 않습니다. 점수와 설정은 브라우저의 localStorage에만 저장되고 외부로 전송되지 않으므로, 본 사이트는 사용자 평균이나 순위를 게시하지 않습니다. 본 페이지에 인용된 모든 수치는 하단 참고문헌 패널에 명시된 공인 학술 연구에서 비롯되었습니다.",
      "본 도구는 두뇌 훈련과 재미를 위한 무료 브라우저 게임입니다. 의료 기기나 진단 도구가 아니며, 이곳의 결과가 의학적 진단이나 뇌 건강 상태를 증명하지 않습니다. 인지 기능이나 기억력에 이상을 느끼신다면 전문 의료진과 상담하시기 바랍니다."
],
    benchmarks: {
      title: "공간 위치 결합 용량 표준 규준 벤치마크",
      headers: ["성능 등급", "사물 개수 & 격자 규모", "훈련 점수", "인지 결합 및 공간 인지 지도 프로필"],
      rows: [
        [
                "1등급 (최우수 / 상위 1% 수준)",
                "레벨 8 – 10+ (8~10개 이상, 6x6~7x7 격자)",
                "1,000점 이상",
                "시각공간 최상위권. 신속한 사분면 분할과 랜드마크 앵커링 구사; 8개 이상의 사물-위치 결합을 손쉽게 처리; 500ms 미만의 초고속 목표 식별"
        ],
        [
                "2등급 (우수 / 상위 15% 수준)",
                "레벨 6 – 7 (6~7개, 5x5~6x6 격자)",
                "750 – 999점",
                "일반 성인 평균 상회; 견고한 의미-공간 연상 기법 구사; 대형 격자에서의 시각적 역행 간섭에 강력한 저항력; 500~700ms 식별"
        ],
        [
                "3등급 (보통 성인 평균 / 50백분위수)",
                "레벨 4 – 5 (4~5개, 4x4~5x5 격자)",
                "450 – 749점",
                "일반 인구 평균 기준치(Eals & Silverman, 1994). 코완 한계인 4개 사물 결합 완벽 수행; 5x5 격자의 중앙부 사물에서 망각 시작; 700~950ms 식별"
        ],
        [
                "4등급 (주의 필요 / 특징 결합 병목)",
                "레벨 3 (3개, 3x3~4x4 격자)",
                "250 – 449점",
                "2~3개의 고립된 사물만 회상 가능; 인접 칸의 좌표 혼동 발생; 방해 요소 추가 시 급격한 정확도 하락; 950~1,300ms 식별"
        ],
        [
                "5등급 (훈련 권장 / 단기 보유 한계)",
                "레벨 1 – 2 (2개, 3x3 격자)",
                "250점 미만",
                "급격한 시각 잔상 소멸; 사물과 위치의 결합 실패; 1.5초의 짧은 지연 후에도 목표 위치 탐색 지연; 식별 지연 시간 1,300ms 초과"
        ]
],
      note: "사물 개수와 격자 규모는 45초 동안 달성한 최고 난이도를 반영하며 Silverman-Eals OLM 및 CANTAB PAL 표준 기준에 매핑되었습니다."
    },
    techniques: {
      title: "공간 위치 기억 결합 용량을 확장하는 실전 기법",
      items: [
        {
                "name": "상대적 랜드마크 앵커링 (Landmark Anchoring)",
                "desc": "모서리 4곳, 중앙 셀, 외곽 경계선 등 고정된 기준점에 사물의 위치를 묶어 앵커를 생성합니다(Tolman, 1948). '다이아몬드는 좌상단 모서리'처럼 직관적인 랜드마크와 결합하면 좌표 계산 부하를 대폭 줄일 수 있습니다.",
                "tips": "사물이 나타난 첫 500ms 안에 모서리나 외곽선에 위치한 사물을 가장 먼저 파악하세요."
        },
        {
                "name": "의미-공간 연상 페어링 (Semantic-Spatial Pairing)",
                "desc": "사물의 상징적 의미와 공간적 방향을 연결하는 빠른 연상 이야기를 구성합니다(Baddeley, 2000). 예를 들어 상단에 위치한 '별'은 밤하늘과 연결하고, 하단의 '열쇠'는 숨겨진 서랍과 연결합니다.",
                "tips": "사물 이름과 방향을 합친 짧은 단어 쌍(예: '별은 위, 열쇠는 아래')을 마음속으로 즉시 읊조리세요."
        },
        {
                "name": "사분면 분할 구역화 (Quadrantal Zoning)",
                "desc": "5x5나 7x7 같은 대형 격자를 머릿속에서 4개 사분면(좌상, 우상, 좌하, 우하)으로 분할합니다. 각 구역에 사물이 몇 개씩 배치되어 있는지 파악하면 탐색 범위를 크게 좁힐 수 있습니다.",
                "tips": "구역별 사물 개수를 먼저 세고, 그 후 각 구역 내 세부 위치를 파악하세요."
        },
        {
                "name": "중앙 응시 및 주변시 스캔 (Parafoveal Sweep)",
                "desc": "시선을 격자 정중앙에 고정하여 주변시로 전체적인 사물 배치를 흡수한 뒤, 불명확한 아이콘을 향해 1~2회의 미세 도약 안구운동(Micro-saccades)을 수행합니다.",
                "tips": "시선을 어지럽게 굴리지 말고 안정된 시야를 유지하며 부드럽게 스캔하세요."
        }
]
    },
    steps: [
      "격자 정중앙에 시선을 고정하고 초기 사물 배열의 전체 구도를 파악합니다.",
      "1.5초의 암기 시간 동안 각 사물을 랜드마크(모서리, 경계선, 중앙)에 신속히 앵커링합니다.",
      "사물 아이콘과 위치를 연결하는 즉각적인 의미-공간 연상 페어를 형성합니다.",
      "격자가 비워지고 목표 아이콘이 제시되면 마음속 인지 지도에서 해당 위치를 즉시 탭합니다.",
      "3x3부터 7x7까지 확장되는 매트릭스에 도전하여 대용량 시각 결합 능력을 구축합니다."
],
    audience: "미니맵과 전장 인지 능력을 극대화하려는 FPS 및 MOBA 게이머, 의료 영상 판독 능력을 향상하려는 전문가, 이공계 학생 및 시각-공간 작업기억 능력을 강화하려는 모든 사용자.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('cowan2001', 'baddeley2000', 'logie1995', 'luck1997', 'tolman1948', 'eals1994', 'woods2015'),
    related: [
      {
            "href": "/drills/memory/spatial-memory/grid-memorization",
            "label": "순간 기억 테스트 (Visual Memory)"
      },
      {
            "href": "/drills/memory/spatial-memory/path-tracing",
            "label": "경로 추적 기억력 (Path Tracing)"
      },
      {
            "href": "/drills/memory/short-term-memory/digit-span",
            "label": "숫자 기억력 테스트 (Digit Span)"
      },
      {
            "href": "/drills/memory/short-term-memory/word-recall",
            "label": "단어 기억력 테스트 (Verbal Memory)"
      },
      {
            "href": "/drills/memory/working-memory/n-back",
            "label": "n백 테스트 (Dual N-Back)"
      }
]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
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
      <ObjectLocationClient
        copy={{
        "h1Keyword": "공간 기억력 테스트",
        "h1Suffix": " (물체 위치 기억 검사)",
        "subtitle": "물체 위치 기억(Object-location memory)은 무엇이 어디에 있었는지를 기억하는 핵심 능력입니다. Eals와 Silverman(1994)은 이와 같은 사물 배열 과제를 통해 이를 입증했으며, 다른 시각 작업기억 과제와 마찬가지로 약 4개 항목의 용량 한계에 직면합니다(Luck & Vogel, 1997).",
        "statScore": "점수",
        "statTime": "남은 시간",
        "statLevel": "레벨",
        "statBestScore": "최고 점수",
        "levelPrefix": "Lv.",
        "memorizePrompt": "사물의 위치를 기억하세요",
        "targetPrompt": "목표:",
        "startTitle": "물체 위치 기억 Pro",
        "startSubtitle": "공간 위치 기억 • 배치 회상 테스트",
        "countdownSubtitle": "준비하세요",
        "newBest": "최고 기록 달성",
        "pointsLabel": "포인트",
        "statAccuracy": "정확도",
        "statPeakLevel": "최고 레벨",
        "statPerfects": "퍼펙트",
        "btnPlayAgain": "다시 도전하기",
        "rulesTitle": "훈련 규칙 & 점수 산출 방식",
        "aboutTitle": "물체 위치 기억(Object Location Training)에 대하여",
        "rulesItems": [
                {
                        "num": "1",
                        "text": "배치 암기 및 목표 위치 탐색",
                        "highlight": "+150 PTS",
                        "result": "1.5초간 위치를 기억한 뒤 제시된 목표 아이콘의 좌표를 클릭"
                },
                {
                        "num": "2",
                        "text": "점진적 난이도 확장",
                        "highlight": "3x3 → 7x7",
                        "result": "레벨이 오를수록 격자 크기와 사물 개수가 자연스럽게 증가"
                },
                {
                        "num": "3",
                        "text": "오답 및 시간 초과",
                        "highlight": "무감점",
                        "result": "점수나 시간 차감 없이 현재 난이도에서 즉시 재도전"
                },
                {
                        "num": "4",
                        "text": "난이도 유지 시스템",
                        "highlight": "레벨 하락 없음",
                        "result": "실패해도 레벨이 떨어지지 않아 공간 앵커 전략 구축에 집중 가능"
                }
        ]
}}
      />
      <DrillGuide guide={objectLocationGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/spatial-memory/object-location"
          locale="ko"
        />
      </div>
    </>
  );
}
