import PathTracingClient from '@/app/drills/memory/spatial-memory/path-tracing/PathTracingClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "순서 기억 테스트・코시 블록 검사 – 궤적 회상 훈련 | SkillDrills",
  description: "무료 온라인 순서 기억 테스트(코시 블록 검사). 점등되는 타일 이동 궤적을 기억하고 동일한 순서로 되짚어 공간 순서 기억력과 코시 스팬을 측정하세요.",
  keywords: ['순서 기억 테스트', '순서 기억 게임', '도형 순서 기억하기', '코시 블록 검사', '경로 기억력 테스트', '시각 순서 기억', '패스 트레이싱 검사', '작업기억 순서 검사', '코르시 블록 테스트', '공간 시퀀스 기억', '두뇌 인지 순서 훈련', '움직임 궤적 기억'],
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/memory/spatial-memory/path-tracing",
    languages: getAlternateLanguages('/drills/memory/spatial-memory/path-tracing', 'ko'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "순서 기억 테스트 (패스 트레이싱) - 무료 인지 훈련 | SkillDrills",
    description: "무료 온라인 순서 기억 테스트 (코시 블록 검사 / Path Tracing). 점등되는 타일의 이동 궤적을 순간 기억하고 동일한 순서로 되짚어 공간 순서 기억력과 코시 블록 작업기억 스팬을 측정하세요. 회원가입 불필요.",
    url: "https://skilldrills.online/ko/drills/memory/spatial-memory/path-tracing",
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "순서 기억 테스트 (패스 트레이싱) - 무료 인지 훈련 | SkillDrills",
    description: "무료 온라인 순서 기억 테스트 (코시 블록 검사 / Path Tracing). 점등되는 타일의 이동 궤적을 순간 기억하고 동일한 순서로 되짚어 공간 순서 기억력과 코시 블록 작업기억 스팬을 측정하세요. 회원가입 불필요.",
  },
};

export const dynamic = 'force-static';

export default function LocalizedPathTracingPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://skilldrills.online/ko" },
      { "@type": "ListItem", "position": 2, "name": "기억력 훈련", "item": "https://skilldrills.online/ko/drills/memory" },
      { "@type": "ListItem", "position": 3, "name": "공간 기억", "item": "https://skilldrills.online/ko/drills/memory/spatial-memory" },
      { "@type": "ListItem", "position": 4, "name": "순서 기억 테스트", "item": "https://skilldrills.online/ko/drills/memory/spatial-memory/path-tracing" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "순서 기억 테스트 (코시 블록 검사 / 패스 트레이싱)",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "점등되는 타일의 이동 궤적을 기억하고 정확한 순서로 재현하여 공간 순서 기억, 방향 벡터 청킹 및 이너 스크라이브 작업기억 스팬을 측정하는 무료 브라우저 신경심리학 테스트.",
    "genre": "Cognitive Assessment / Spatial Memory",
    "url": "https://skilldrills.online/ko/drills/memory/spatial-memory/path-tracing",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "순서 기억 테스트 (코시 블록 검사 / 패스 트레이싱)",
    "url": "https://skilldrills.online/ko/drills/memory/spatial-memory/path-tracing",
    "description": "점등되는 타일의 이동 궤적을 기억하고 정확한 순서로 재현하여 공간 순서 기억, 방향 벡터 청킹 및 이너 스크라이브 작업기억 스팬을 측정하는 무료 브라우저 신경심리학 테스트.",
    "dateModified": "2026-09-05",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "isAccessibleForFree": true,
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "순서 기억 테스트 (코시 블록 검사 / 패스 트레이싱)",
    "description": "점등되는 타일의 이동 궤적을 기억하고 정확한 순서로 재현하여 공간 순서 기억, 방향 벡터 청킹 및 이너 스크라이브 작업기억 스팬을 측정하는 무료 브라우저 신경심리학 테스트.",
    "url": "https://skilldrills.online/ko/drills/memory/spatial-memory/path-tracing",
    "genre": ["Memory Game", "Cognitive Training", "Spatial Sequence Memory"],
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
            "name": "순서 기억 테스트(Path Tracing Memory Test)란 무엇인가요?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "격자 화면에서 순서대로 점등되는 타일들의 동적 이동 궤적을 관찰한 뒤, 제시되었던 시간적 순서 그대로 정확히 재현하는 공간 시퀀스 작업기억(Sequential Spatial Working Memory) 평가 도구입니다."
            }
      },
      {
            "@type": "Question",
            "name": "코시 블록 검사(Corsi Block-Tapping Task)란 무엇인가요?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "1972년 피에트로 코시가 고안한 임상 신경심리학의 세계 표준 검사입니다. 검사자가 불규칙한 블록들을 특정 순서로 두드리면 수검자가 동일한 순서로 재현하여 비언어적 공간 작업기억 스팬을 측정합니다."
            }
      },
      {
            "@type": "Question",
            "name": "작업기억 이론에서 '이너 스크라이브(Inner Scribe)'란 무엇인가요?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "로버트 로기(Logie, 1995)가 제안한 개념으로, 정적인 시각 이미지를 담는 시각 캐시와 달리 동적인 움직임 시퀀스, 운동 궤적, 공간적 경로를 능동적으로 되뇌고 유지하는 신경 메커니즘입니다."
            }
      },
      {
            "@type": "Question",
            "name": "일반 성인의 평균 공간 순서 기억 스팬(Corsi Span)은 얼마인가요?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Kessels 등의 표준화 연구(2000)에 따르면 건강한 성인의 순방향 공간 스팬 평균은 5.4 ± 0.9단계입니다. 8단계 이상의 복합 경로를 정확히 기억한다면 매우 뛰어난 공간 청킹 능력을 지닌 것입니다."
            }
      },
      {
            "@type": "Question",
            "name": "방향 벡터 청킹이란 어떤 기억 전략인가요?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "독립된 셀들의 좌표를 하나씩 외우는 대신 '오른쪽 2칸, 위로 1칸, 대각선 왼쪽'처럼 연속된 이동 방향 덩어리로 묶는 기법입니다. 이를 통해 4개 항목으로 제한된 작업기억 병목을 우회할 수 있습니다."
            }
      },
      {
            "@type": "Question",
            "name": "정적 순간 기억 테스트(Visual Matrix)와 어떤 점이 다른가요?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "정적 격자 기억은 모든 타일이 한 번에 점등되어 하나의 정지 사진처럼 기억할 수 있습니다. 반면 패스 트레이싱은 각 단계가 언제 나타났는가 하는 '시간적 순서 정보'를 반드시 유지해야 하므로 인지 부하가 큽니다."
            }
      },
      {
            "@type": "Question",
            "name": "단계가 길어질수록 급격히 어려워지는 이유는 무엇인가요?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "넬슨 코완(2001)의 연구처럼 청킹되지 않은 순수 주의 집중 작업기억의 한계가 4개 항목으로 엄격히 제한되어 있기 때문입니다. 5단계를 넘어가면 체계적 묶기 없이는 기억 흔적이 즉시 붕괴합니다."
            }
      },
      {
            "@type": "Question",
            "name": "공간 순서 기억력은 일상생활과 게임에서 어떻게 활용되나요?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "복잡한 길 찾기 경로 기억, 댄스나 스포츠 동작 시퀀스 암기, FPS나 MOBA 게임에서 맵 순찰 동선 및 스킬 콤보 시퀀스를 정확하게 실행하는 능력과 직결됩니다."
            }
      },
      {
            "@type": "Question",
            "name": "잘못된 타일을 클릭했을 때 페널티가 있나요?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "아닙니다. 오답을 클릭해도 점수 감점이나 남은 시간 차감 페널티가 전혀 없습니다. 현재 레벨에서 새로운 경로로 바로 재도전할 수 있습니다."
            }
      },
      {
            "@type": "Question",
            "name": "순서 기억력도 의도적 훈련을 통해 향상될 수 있나요?",
            "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "네, 반복 훈련을 통해 이너 스크라이브의 궤적 시뮬레이션 효율이 증가하고 방향 벡터 청킹이 자동화되어 훨씬 길고 복잡한 경로도 수월하게 회상할 수 있게 됩니다."
            }
      }
]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "순서 기억 테스트로 공간 순서 스팬을 확장하는 방법",
    "description": "방향 벡터 청킹과 운동 피질 내적 리허설을 활용하여 경로 이동 궤적의 순서 기억력을 극대화하는 4단계 실전 프로토콜.",
    "step": [
      {
            "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/ko/drills/memory/spatial-memory/path-tracing#step-1",
            
            "name": "시작점 응시 및 전역 시야 확보",
            "text": "최초 점등 타일에 시선을 두되 각 타일을 따라 눈을 급격히 굴리지 않고 격자 전체를 조망하여 이동 벡터의 흐름을 포착합니다."
      },
      {
            "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/ko/drills/memory/spatial-memory/path-tracing#step-2",
            
            "name": "방향성 벡터 단위 청킹 압축",
            "text": "개별 좌표 대신 '우측으로 2칸, 위로 1칸', 'L자 꺾임'처럼 방향과 형태가 결합된 매크로 벡터로 묶어 기억합니다."
      },
      {
            "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/ko/drills/memory/spatial-memory/path-tracing#step-3",
            
            "name": "이너 스크라이브 운동 내적 리허설",
            "text": "자극 제시 후 대기 시간 동안 손가락으로 선을 긋는 상상을 머릿속 운동 피질로 실행하여 기억 흔적의 소멸을 방지합니다."
      },
      {
            "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/ko/drills/memory/spatial-memory/path-tracing#step-4",
            
            "name": "일정한 리듬의 유연한 연속 입력",
            "text": "클릭 사이의 망설임은 후반부 시퀀스의 급격한 망각을 부르므로, 기억한 청크를 하나의 부드러운 리듬으로 단숨에 입력합니다."
      }
]
  };

  const pathTracingGuide = {
    intro: [
      "순서 기억 테스트(Path Tracing Memory Test)는 시각-공간 순환 작업기억, 동적 경로 파악 및 방향 궤적 재현 능력을 정밀하게 측정하고 훈련하기 위해 설계된 신경인지 평가입니다. 브렌다 밀너(Milner, 1971)와 피에트로 코시(Corsi, 1972)의 고전적 코시 블록 검사와 로버트 로기(Logie, 1995)의 '이너 스크라이브' 모델에 기반하여, 정적 이미지 기억과 구별되는 능동적 시공간 이동 부호화 능력을 평가합니다.",
      "각 라운드마다 3x3에서 7x7로 확장되는 매트릭스 위에서 타일들이 약 500ms 간격으로 차례대로 점등됩니다. 사용자는 공간 좌표뿐 아니라 나타난 시간적 순서까지 동시에 머릿속에 각인한 후, 동일한 차례대로 정확하게 클릭하여 경로를 재현해야 합니다.",
      "작업기억 아키텍처에서 로기(Logie, 1995)와 앨런 배들리(Baddeley, 2000)는 연속적인 움직임이 '이너 스크라이브'라는 동적 시각공간 리허설 고리를 통해 보존됨을 규명했습니다. 또한 조지 밀러(Miller, 1956)와 허버트 사이먼(Simon, 1974)은 계층적 청킹(정보 묶기)이 순서 기억의 핵심임을 증명했으며, 넬슨 코완(Cowan, 2001)은 비보조 초점 작업기억 한계가 약 4개 항목에 불과함을 밝혔습니다.",
      "전산화 코시 블록 표준화 연구(Kessels et al., 2000)에서 건강한 성인의 평균 공간 시퀀스 스팬은 5.4 ± 0.9단계로 확립되었으며, 공간 순서 유지 능력은 인지적 피로, 수면 부족, 전두엽 실행 기능에 대단히 민감하게 반응함이 밝혀졌습니다.",
      "측정 원리: 모든 사용자 상호작용은 브라우저의 performance.now() 고해상도 타이머를 통해 사용자 기기 내에서만 실시간 측정되며, 점수가 외부 서버로 업로드되지 않습니다. 브라우저 타이머는 스펙터 완화 조치로 약 1ms 단위로 반올림되며 디스플레이 재생 빈도(60Hz 기준 프레임당 약 16.7ms)에 따라 양자화됩니다(Woods et al., 2015). 5ms 미만의 차이는 측정 노이즈로 간주하고 동일한 환경에서 자신의 기록 추이를 관찰하십시오.",
      "데이터 투명성: SkillDrills는 일체의 집계 데이터를 수집하지 않습니다. 점수와 설정은 브라우저의 localStorage에만 저장되고 외부로 전송되지 않으므로, 본 사이트는 사용자 평균이나 순위를 게시하지 않습니다. 본 페이지에 인용된 모든 수치는 하단 참고문헌 패널에 명시된 공인 학술 연구에서 비롯되었습니다.",
      "본 도구는 두뇌 훈련과 재미를 위한 무료 브라우저 게임입니다. 의료 기기나 진단 도구가 아니며, 이곳의 결과가 의학적 진단이나 뇌 건강 상태를 증명하지 않습니다. 인지 기능이나 기억력에 이상을 느끼신다면 전문 의료진과 상담하시기 바랍니다."
],
    benchmarks: {
      title: "공간 순서 기억 스팬 및 코시 블록 과제 표준 규준 벤치마크",
      headers: ["성능 등급", "스팬 범위 & 격자 규모", "훈련 점수", "인지 프로필 및 궤적 유지 특성"],
      rows: [
        [
                "1등급 (최우수 / 상위 1% 수준)",
                "스팬 10 – 14+ 단계 (6x6~7x7 격자)",
                "1,200점 이상",
                "시각공간 시퀀스 최상위권. 복잡한 다중 격자 경로를 2~3개의 방향 매크로 벡터로 분해; 완벽한 이너 스크라이브 리허설; 400ms 미만의 고속 등속 탭"
        ],
        [
                "2등급 (우수 / 상위 15% 수준)",
                "스팬 8 – 9 단계 (5x5~6x6 격자)",
                "900 – 1,199점",
                "성인 평균 상회; L자 꺾임, 지그재그 등 공간 벡터 군집화 안정 구사; 순서 간섭에 강한 저항력; 400~600ms 입력 속도"
        ],
        [
                "3등급 (보통 성인 평균 / 50백분위수)",
                "스팬 5 – 7 단계 (4x4~5x5 격자)",
                "600 – 899점",
                "일반 인구 평균 규준(Corsi, 1972; Kessels et al., 2000, 5.4 ± 0.9스팬). 5~6단계 경로 원활히 재현; 5x5 격자의 중간 경유지에서 누락 발생; 600~850ms"
        ],
        [
                "4등급 (주의 필요 / 시퀀스 감쇠)",
                "스팬 4 단계 (3x3~4x4 격자)",
                "400 – 599점",
                "미청킹 작업기억 한계선(Cowan, 2001). 벡터 묶기 없이 개별 점으로 암기하려 하여 급격한 기억 소멸 발생; 850~1,100ms"
        ],
        [
                "5등급 (훈련 권장 / 단기 스팬 한계)",
                "스팬 4 단계 미만 (3x3 격자)",
                "400점 미만",
                "시간적 기억 흔적의 급속한 퇴화; 순서 역전 오류 빈발; 3단계를 초과하는 경로 유지에 어려움; 입력 간격 1,100ms 초과"
        ]
],
      note: "스팬 길이와 격자 규모는 45초 동안 달성한 최고 난이도를 반영하며 Corsi Block-Tapping 표준 규준에 매핑되었습니다."
    },
    techniques: {
      title: "공간 순서 기억 스팬을 확장하는 실전 기법",
      items: [
        {
                "name": "방향 벡터 청킹 (Directional Vector Chunking)",
                "desc": "연속된 점들을 '오른쪽 2칸, 위로 1칸, 왼쪽 2칸'처럼 방향성 매크로 화살표로 묶습니다(Miller, 1956; Simon, 1974). 개별 좌표 대신 기하학적 획으로 인식하면 작업기억 부하가 60% 이상 줄어듭니다.",
                "tips": "점이 아닌 L자형, 삼각 꺾임, 계단형 선 패턴을 찾으세요."
        },
        {
                "name": "이너 스크라이브 운동 시뮬레이션",
                "desc": "타일이 깜빡이는 동안 손가락으로 선을 잇는 느낌을 머릿속 운동 피질로 시뮬레이션합니다(Logie, 1995). 운동 계획 회로를 미리 활성화하면 시각 잔상을 운동 감각으로 강력히 뒷받침할 수 있습니다.",
                "tips": "화면을 터치하기 전에 손끝에서 느껴지는 궤적의 감각을 먼저 떠올리세요."
        },
        {
                "name": "중앙 응시 및 주변시 앵커링 (Parafoveal Anchoring)",
                "desc": "불빛이 켜질 때마다 눈을 바쁘게 움직이지 말고 격자 중앙부에 시선을 가볍게 고정한 뒤 주변시로 움직임의 흐름을 조망합니다. 급격한 안구 도약에 따른 인지 지연을 방지할 수 있습니다.",
                "tips": "머리와 시선을 고정하고 영화 스크린을 보듯 넓게 시야를 펼치세요."
        },
        {
                "name": "리드미컬한 등속 탭 (Rhythmical Pacing)",
                "desc": "재현할 때 중간에 멈칫거리지 않고 일정한 템포로 단숨에 입력합니다. 클릭 사이의 망설임은 후반부 기억 흔적의 감쇠를 유발하므로 하나의 흐르는 듯한 모터 버스트로 실행합니다.",
                "tips": "한 칸씩 고민하지 말고 머릿속 리듬에 맞춰 경쾌하게 탭하세요."
        }
]
    },
    steps: [
      "격자 중앙에 시선을 두고 점등되는 타일들의 동적 이동 시퀀스를 관찰합니다.",
      "개별 점등을 독립된 점이 아닌 연속된 방향 벡터(화살표나 기하 도형)로 묶습니다.",
      "자극 제시 직후의 짧은 지연 시간 동안 머릿속 이너 스크라이브로 경로를 재현합니다.",
      "기억한 순서 그대로 일정한 리듬을 유지하며 유연하게 타일을 차례로 탭합니다.",
      "3x3부터 7x7까지 점진적으로 확장되는 매트릭스에 도전하여 공간 시퀀스 스팬을 극대화합니다."
],
    audience: "동선 파악과 스킬 콤보 실행력을 극대화하려는 FPS 및 MOBA 게이머, 안무나 스포츠 동작 시퀀스를 기억하는 선수, 이공계 학생 및 공간 순서 기억력을 강화하려는 모든 사용자.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('corsi1972', 'milner1971', 'logie1995', 'cowan2001', 'baddeley2000', 'miller1956', 'simon1974', 'kessels2000', 'woods2015'),
    related: [
      {
            "href": "/drills/memory/spatial-memory/grid-memorization",
            "label": "순간 기억 테스트 (Visual Memory)"
      },
      {
            "href": "/drills/memory/spatial-memory/object-location",
            "label": "공간 기억력 테스트 (Object Location Test)"
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
      <PathTracingClient
        copy={{
        "h1Keyword": "순서 기억 테스트",
        "h1Suffix": " (패스 트레이싱)",
        "subtitle": "공간 스팬은 순서대로 정확하게 재현할 수 있는 가장 긴 위치 이동 시퀀스입니다. 신경심리학 표준 평가인 코시 블록 검사에서 정상 성인의 평균 스팬은 약 5~7단계이며(Milner, 1971; Corsi, 1972), 언어성 숫자 기억과는 다른 뇌의 공간 루프를 활용합니다(Logie, 1995).",
        "statScore": "점수",
        "statTime": "남은 시간",
        "statLevel": "레벨",
        "statBestScore": "최고 점수",
        "levelPrefix": "Lv.",
        "startTitle": "순서 기억 Pro",
        "startSubtitle": "공간 순서 기억 • 코시 블록 경로 회상",
        "countdownSubtitle": "준비하세요",
        "newBest": "최고 기록 달성",
        "pointsLabel": "포인트",
        "statAccuracy": "정확도",
        "statPeakLevel": "최고 레벨",
        "statPerfects": "퍼펙트",
        "btnPlayAgain": "다시 도전하기",
        "rulesTitle": "훈련 규칙 & 점수 산출 방식",
        "aboutTitle": "순서 기억(Path Tracing / 코시 블록)에 대하여",
        "rulesItems": [
                {
                        "num": "1",
                        "text": "이동 궤적 암기 및 순서 재현",
                        "highlight": "+150 PTS",
                        "result": "타일이 점등된 순서를 기억하고 동일한 차례대로 클릭"
                },
                {
                        "num": "2",
                        "text": "점진적 난이도 및 스팬 확장",
                        "highlight": "3x3 → 7x7",
                        "result": "레벨이 상승할수록 격자 크기와 단계 수가 자연스럽게 증가"
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
                        "result": "실패해도 레벨이 떨어지지 않아 공간 벡터 청킹 전략 확립에 집중"
                }
        ]
}}
      />
      <DrillGuide guide={pathTracingGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/spatial-memory/path-tracing"
          locale="ko"
        />
      </div>
    </>
  );
}
