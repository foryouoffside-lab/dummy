import GhostLinkClient from '@/app/drills/visual/tracking-accuracy/multiple-targets/GhostLinkClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "다중 객체 추적 MOT 테스트: 주변시 훈련 | SkillDrills",
  description: "인지심리학 표준 MOT(다중 객체 추적) 무료 온라인 검사. 복수의 이동 표적을 동시에 추적하여 주변시와 분할 주의력, 공간 작업기억을 극대화하세요.",
  keywords: [
    "다중 객체 추적",
    "MOT 테스트",
    "다중 물체 추적",
    "주변시 훈련",
    "분할 주의력 검사",
    "공간 작업기억",
    "동체시력 다중 추적",
    "파일럿 시야 검사",
    "FPS 주변시 훈련",
    "피리신 MOT"
  ],
  openGraph: {
    title: "다중 객체 추적 MOT 테스트: 주변시 훈련 | SkillDrills",
    description: "인지심리학 표준 MOT 과제를 활용한 무료 온라인 주변시 훈련. 동일한 형태의 고속 이동 구체 속에서 지정된 복수의 타깃을 동시에 추적하고 공간 작업기억을 극대화하세요.",
    type: 'article',
    url: 'https://skilldrills.online/ko/drills/visual/tracking-accuracy/multiple-targets',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "다중 객체 추적 MOT 테스트: 주변시 훈련 | SkillDrills",
    description: "인지심리학 표준 MOT 과제를 활용한 무료 온라인 주변시 훈련. 시야의 넓이와 분할 주의력을 과학적으로 측정하세요.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/visual/tracking-accuracy/multiple-targets',
    languages: getAlternateLanguages('/drills/visual/tracking-accuracy/multiple-targets'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "SkillDrills 홈",
      "item": "https://skilldrills.online/ko"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "훈련 허브",
      "item": "https://skilldrills.online/ko/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "시각·동체시력 훈련",
      "item": "https://skilldrills.online/ko/drills/visual"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "동체 추적 및 정밀도",
      "item": "https://skilldrills.online/ko/drills/visual/tracking-accuracy"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "다중 객체 추적 MOT 테스트 (주변시 훈련)",
      "item": "https://skilldrills.online/ko/drills/visual/tracking-accuracy/multiple-targets"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SkillDrills 다중 객체 추적 MOT 테스트・주변시 훈련기",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Any",
  "browserRequirements": "HTML5 Canvas 지원 최신 웹 브라우저",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "KRW"
  },
  "description": "인지심리학의 표준 MOT(Multiple Object Tracking) 패러다임에 기반하여 복수 목표물의 동시 추적 능력, 주변시 인지 폭, 시공간 작업기억 용량을 정밀 측정하는 브라우저 훈련 도구."
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "무료 온라인 다중 객체 추적 MOT 테스트",
  "url": "https://skilldrills.online/ko/drills/visual/tracking-accuracy/multiple-targets",
  "applicationCategory": "GameApplication",
  "genre": ["다중 객체 추적", "주변시 훈련", "MOT 테스트", "시각 주의력 검사"],
  "browserRequirements": "Requires HTML5 Canvas and JavaScript",
  "inLanguage": "ko-KR"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "다중 객체 추적 챌린지 (GhostLink Multiple Targets)",
  "description": "화면을 가로지르는 여러 동일 구체 중 지정된 타깃군을 놓치지 않고 동시에 추적하는 전문 비전 트레이닝 게임.",
  "genre": ["Vision Training", "Esports Reaction", "Cognitive Drill"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "다중 객체 추적(Multiple Object Tracking, MOT) 과제란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "인지과학자 제논 피리신(Zenon Pylyshyn, 1988)이 개발한 인간 시각 주의력 연구의 핵심 패러다임입니다. 외형이 완전히 동일한 여러 물체 중에서 사전에 지정된 복수의 목표물을, 무작위로 교차 이동하는 방해 구체들과 섞이는 도중에도 시선을 놓치지 않고 동시에 추적하는 능력을 평가합니다. 하나의 타깃만을 쫓는 일반 동체시력과 달리, 뇌의 시공간 작업기억과 주의력 분할(Divided Attention) 용량을 직접 측정합니다."
      }
    },
    {
      "@type": "Question",
      "name": "일반 성인이 한 번에 동시에 추적할 수 있는 물체의 한계 개수는 몇 개인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "인지신경과학의 광범위한 실험 결과에 따르면 일반적인 성인의 동시 추적 한계는 평균 3~4개입니다(Cavanagh & Alvarez, 2005). 이 한계를 넘어서면 뇌의 주의 리소스가 포화되어 타깃이 서로 교차할 때 추적을 놓치기 쉽습니다. 그러나 프로 e스포츠 선수, 전투기 조종사, 프로 구기 스포츠 선수는 5~6개의 대상을 동시에 높은 정확도로 추적할 수 있는 것으로 확인되었습니다(Green & Bavelier, 2006; Faubert, 2013)."
      }
    },
    {
      "@type": "Question",
      "name": "구체들을 하나씩 번갈아 쳐다보는 순차 도약 방식으로는 왜 실패하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "안구를 한 지점에서 다른 지점으로 이동시키는 급속 도약 안구운동(Saccade)은 약 200ms의 잠복 지연 시간을 수반하며, 도약하는 순간 시각 정보 입력이 차단되는 사케이드 억제 현상이 일어납니다. 고속으로 교차하는 구체들을 차례대로 확인하면 시선을 돌린 찰나에 다른 타깃이 방해 구체와 교차하여 분간할 수 없게 되므로, 시야 전체를 아우르는 병렬 처리가 필수적입니다."
      }
    },
    {
      "@type": "Question",
      "name": "무게중심 전략(Centroid Strategy)이란 구체적으로 어떤 기술인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "추적해야 할 여러 타깃 구체들이 형성하는 가상의 다각형 중심점(무게중심)에 시선의 초점을 느긋하게 고정하고, 개별 구체의 움직임은 중심와가 아닌 넓은 '주변시(Peripheral Vision)'로 감지하는 고급 추적 전략입니다. 안구의 불필요한 도약을 억제하고 다각형의 외곽선 변형을 하나의 게슈탈트(전체 형태)로 인지함으로써 교차 시 오인 혼선을 획기적으로 줄여줍니다."
      }
    },
    {
      "@type": "Question",
      "name": "좌우 시야 반구 분할(Hemifield Independence) 원리는 어떻게 활용하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "신경과학 연구(Alvarez & Cavanagh, 2005)에 따르면 좌측 시야의 정보는 우뇌에서, 우측 시야의 정보는 좌뇌에서 독립적인 주의 자원으로 처리됩니다. 타깃들이 한쪽 시야에 몰려 있는 것보다 화면 중앙을 기준으로 좌우에 균형 있게 분산되어 있을 때 추적 정확도가 현저히 높아집니다. 화면 중앙의 가상 수직축을 의식하며 양쪽 뇌의 인지 자원을 균등하게 배분하는 감각을 익히는 것이 중요합니다."
      }
    },
    {
      "@type": "Question",
      "name": "축구, 농구, 배구 등 구기 스포츠 경기에서 주변시와 MOT 능력이 왜 중요한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "스포츠에서 흔히 말하는 '넓은 시야(Court Vision)'의 본질이 바로 이 MOT 능력입니다. 일류 미드필더나 포인트 가드는 공을 드리블하면서도 시선을 공에 고정하지 않고, 주변을 달리는 여러 팀원과 수비수의 침투 동선을 동시에 한눈에 읽어냅니다. Faubert (2013)의 연구에 따르면 프로 엘리트 선수는 일반인 대비 MOT 학습 속도와 한계 속도가 월등히 높습니다."
      }
    },
    {
      "@type": "Question",
      "name": "발로란트, 에이펙스 레전드, 오버워치 등 FPS 게임에 어떤 실질적 도움이 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "조준선(크로스헤어)으로 적을 조준하는 동시에 미니맵의 상황 변화, 아군의 백업 위치, 적의 2차 진입 경로, 날아오는 투척물의 궤적을 주변시로 실시간 파악할 수 있게 됩니다. 시야가 좁아지는 '터널 비전'을 극복하여 다대다 난전 상황에서의 생존율과 상황 판단력(Situational Awareness)이 비약적으로 향상됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "구체들이 겹치며 교차(오클루전)할 때 타깃을 놓치지 않는 핵심 비결은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "구체가 맞닿는 접점 순간을 주시하지 말고, 충돌 직전의 '운동 관성 벡터'를 뇌 속에서 선행 시뮬레이션해야 합니다. 물리적으로 직진 관성을 유지하여 교차점을 통과해 빠져나가는 방향을 미리 예측함으로써, 교차 직후 엉뚱한 방해 구체로 주의가 옮겨가는 식별 교환 오류(Identity Swap)를 차단할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "주변시와 MOT 능력을 향상시키기 위한 하루 권장 훈련 시간은 어느 정도인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "다중 객체 추적은 두정엽의 시공간 작업기억을 극도로 소모하는 고강도 인지 과제입니다. 하루 10~15분(5~8라운드)을 주 4~5회 꾸준히 수행하는 것이 신경가소성을 촉진하는 가장 이상적인 프로토콜입니다. 뇌가 피로한 상태에서 무리하게 진행하면 주의력이 흐트러져 잘못된 안구운동 습관이 들 수 있으므로 고도의 집중 상태에서 짧게 진행하는 것이 효과적입니다."
      }
    },
    {
      "@type": "Question",
      "name": "측정 점수나 훈련 기록이 외부 서버로 전송되거나 수집되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "전혀 전송되지 않습니다. 모든 계산은 브라우저 내부에서 실시간으로 처리되며, 훈련 기록 및 정답률 데이터는 사용자의 로컬 스토리지(localStorage)에만 안전하게 보관됩니다. 회원가입이나 로그인 없이 100% 무료로 이용하실 수 있습니다."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "다중 객체 추적 MOT 테스트 공략 단계 및 최고 점수 가이드",
  "description": "다수의 고속 이동 타깃을 동시에 놓치지 않고 추적하여 최고 등급과 넓은 주변시 능력을 획득하는 4단계 실전 공략법.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "지정 타깃군의 기하학적 형상 인식",
      "text": "시작 시 점멸하며 표시되는 타깃 구체들을 선으로 연결한 가상의 다각형(삼각형, 사각형)을 머릿속에 형성하여 하나의 덩어리로 인지합니다.",
      "url": "https://skilldrills.online/ko/drills/visual/tracking-accuracy/multiple-targets#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "중앙 무게중심 시선 고정 (소프트 포커스)",
      "text": "개별 구체를 일일이 쳐다보지 않고 타깃 다각형의 중앙 무게중심에 시선을 부드럽게 고정하여 주변시 시야각을 최대로 개방합니다.",
      "url": "https://skilldrills.online/ko/drills/visual/tracking-accuracy/multiple-targets#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "교차 순간의 관성 벡터 선행 예측",
      "text": "방해 구체와 타깃이 어지럽게 교차하는 찰나, 이전 운동 속도와 각도를 기반으로 교차 후 이탈 방향을 머릿속으로 시뮬레이션합니다.",
      "url": "https://skilldrills.online/ko/drills/visual/tracking-accuracy/multiple-targets#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "정지 후 정확한 타깃 선택",
      "text": "운동이 완전히 멈추는 순간 기억에 유지된 주의 앵커를 최종 확인하고 올바른 구체들을 차례대로 클릭하여 정답을 제출합니다.",
      "url": "https://skilldrills.online/ko/drills/visual/tracking-accuracy/multiple-targets#step-4"
    }
  ]
};

const guideData = {
  eyebrow: "시각 인지 심리학 및 주변시 신경과학 가이드",
  heading: "다중 객체 추적 MOT 테스트 – 주변시와 시공간 작업기억의 병렬 처리",
  intro: [
    "다중 객체 추적 과제(Multiple Object Tracking, MOT)는 인지심리학자 제논 피리신(Zenon Pylyshyn, 1988)에 의해 고안된, 인간의 병렬적 시각 정보 처리 한계를 측정하는 대표적인 인지 패러다임입니다. 외형이 완전히 동일한 여러 이동 객체들 사이에서 사전에 지정된 복수의 타깃을, 불규칙한 궤적으로 교차 운동하는 다수의 방해 자극(Distractor) 속에서도 단 한 번도 놓치지 않고 지속적으로 추적하는 능력을 평가합니다.",
    "인지신경과학 연구에 따르면 MOT 수행은 대뇌 피질의 광범위한 배측 주의 네트워크, 특히 후두정구(Intraparietal Sulcus, IPS), 전두안야(Frontal Eye Fields, FEF), 상구(Superior Colliculus)의 동시 신경 발화에 의해 지배됩니다(Cavanagh & Alvarez, 2005). 인간의 뇌는 개별 물체의 세부 형태를 언어적으로 기억하는 것이 아니라, 망막 좌표와 무관하게 작동하는 시각 인덱스(FINST: Feature-blind Visual Index) 포인터를 동시에 3~4개 위치에 투사하여 병렬 추적을 수행합니다.",
    "특히 좌측 시야와 우측 시야는 우뇌와 좌뇌의 독립적인 주의 자원에 의해 개별적으로 처리된다는 '시야 반구 독립성(Hemifield Independence)'이 입증되어 있습니다(Alvarez & Cavanagh, 2004). 물체를 하나씩 번갈아 쳐다보는 순차 도약 안구운동(Saccade)을 구사하면 약 200ms의 신경 지연과 사케이드 억제로 인해 교차 순간 정보가 유실됩니다. 최상위권 게이머와 프로 운동선수는 여러 타깃이 형성하는 가상 다각형의 기하학적 무게중심에 시선을 고정하고 주변시로 전체의 변형을 감지하는 '무게중심 전략(Centroid Strategy)'을 본능적으로 활용합니다(Green & Bavelier, 2006; Faubert, 2013).",
    "본 시스템은 최신 HTML5 Canvas 그래픽스 파이프라인을 통해 객체 개수, 이동 속도, 교차 빈도를 밀리초 단위로 제어합니다. 체계적인 MOT 훈련은 시야가 극도로 좁아지는 터널 비전을 해소하고, 축구·농구 등 구기 종목에서의 코트 비전, FPS 게임에서의 난전 맵 리딩 및 상황 판단력(Situational Awareness), 나아가 일상 운전 시 돌발 상황에 대한 위험 인지 속도를 비약적으로 끌어올립니다."
  ],
  benchmarks: {
    title: "다중 객체 추적(MOT) 표준 성과 벤치마크 기준",
    headers: ["평가 등급 / 티어", "동시 추적 가능 타깃 수", "최대 추적 속도 적응", "정답률 / 정확도", "신경인지 도달 수준"],
    rows: [
      ["신인류 / 프로 특급 (상위 1%)", "5 – 6개", "고속 (400 px/s 이상)", "92% 이상", "기하학적 무게중심 고정 및 대뇌 반구 자원의 완전 분할 병렬 처리 (Cavanagh & Alvarez, 2005)"],
      ["상급 시각 인지 (상위 5%)", "4 – 5개", "중고속 (300 – 400 px/s)", "82 – 91%", "고밀도 교차 시 일시적 궤적 관성 보완 및 안정적인 주변시 앵커링"],
      ["중급 표준 수준 (상위 25%)", "3 – 4개", "중속 (200 – 300 px/s)", "72 – 81%", "일반 성인의 표준 시각 인지 한계. 완만한 궤적에서의 복수 추적 가능"],
      ["초급 일반 단계 (상위 50%)", "2 – 3개", "저중속 (150 – 200 px/s)", "60 – 71%", "시선의 순차 도약(사케이드)에 의한 정보 누락 (단일 객체에 시선 고착)"],
      ["기초 훈련 단계 (Baseline)", "2개 미만", "저속 (150 px/s 미만)", "60% 미만", "교차 직후 타깃 식별 혼선 및 시공간 작업기억 과부하"]
    ],
    note: "인지신경과학 및 스포츠 시각인지 문헌(Pylyshyn 1988; Cavanagh & Alvarez 2005; Green & Bavelier 2006; Faubert 2013)에 기반한 객관적 평가 기준입니다."
  },
  techniques: {
    title: "다중 객체 추적 능력을 극대화하는 4대 실전 기법",
    items: [
      {
        name: "무게중심 소프트 포커스 기법 (Centroid Soft-Focus Fixation)",
        desc: "개별 구체를 쫓지 않고 복수 타깃군이 만드는 다각형의 중앙 공간에 시선을 부드럽게 거치해 둔 채, 주변시 전체를 활용하여 형태의 팽창과 수축을 감지합니다.",
        tips: "화면의 특정 한 점에 과도하게 초점을 주지 말고, 모니터 전체를 한 폭의 그림처럼 여유롭게 바라보세요."
      },
      {
        name: "좌우 시야 반구 자원 배분 (Hemifield Resource Allocation)",
        desc: "좌측 시야와 우측 시야는 독립된 뇌 반구에서 처리되므로, 타깃이 화면 좌우에 균형 있게 배치되도록 공간적 주의의 밸런스를 조절합니다.",
        tips: "화면 중앙의 수직 분할선을 의식하며 좌뇌와 우뇌의 주의 자원을 골고루 활용하는 감각을 유지하세요."
      },
      {
        name: "교차 관성 예측 인지 모델 (Collision Vector Extrapolation)",
        desc: "타깃 구체끼리 혹은 방해 구체와 겹치는 순간, 직전의 진행 방향과 운동량을 뇌에서 연장 시뮬레이션하여 교차 후 이탈 궤적을 선제적으로 포착합니다.",
        tips: "구체가 부딪히는 지점을 응시하지 말고, 통과해 나갈 빈 공간으로 주의의 앵커를 미리 이동시켜 두세요."
      },
      {
        name: "주의 앵커 능동적 리프레시 (Attentional Anchor Active Refresh)",
        desc: "추적 도중 타깃의 위치 기억이 희미해지는 느낌이 들면, 마음속으로 타깃들의 외곽선을 빠르게 1회 스캔하여 객체 식별 포인터를 재충전합니다.",
        tips: "실제 눈동자를 급격히 움직이는 것이 아니라, 마음속 주의의 초점만을 밀리초 단위로 가볍게 순회시킵니다."
      }
    ]
  },
  steps: [
    "시작 버튼을 누르고 화면에 점멸하는 지정 타깃들의 초기 위치와 다각형 배치를 기억합니다.",
    "타깃이 일반 구체와 동일한 색상으로 바뀌며 움직이기 시작하면, 타깃군의 중앙 무게중심에 시선을 고정합니다.",
    "눈을 고정한 채 주변시를 넓게 펼쳐 방해 구체들과의 복잡한 교차 운동을 침착하게 추적합니다.",
    "모든 구체의 이동이 완전히 멈추면, 기억하고 있는 타깃 구체들을 순서대로 정확하게 클릭합니다.",
    "정답률, 추적 타깃 수, 인지 티어를 확인하고 매일 꾸준한 주변시 루틴으로 훈련을 이어갑니다."
  ],
  audience: "발로란트, 에이펙스 레전드, 오버워치, CS2 등 난전 맵 리딩과 빠른 상황 판단력이 필요한 FPS 게이머, 축구·농구·배구·테니스 등 넓은 코트 비전이 필수적인 구기 선수, 그리고 파일럿 및 항공관제 적성 준비자.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('pylyshyn1988', 'cavanagh2005', 'alvarez2004', 'green2006', 'faubert2013', 'woods2015'),
  related: [
    { href: "/ko/drills/visual/tracking-accuracy/moving-target", label: "동체시력 테스트 (이동 타깃 요격)" },
    { href: "/ko/drills/visual/visual-recognition/visual-search", label: "시각 탐색 검사 (주변시 스캐닝)" },
    { href: "/ko/drills/visual/depth-perception/distance-judgment", label: "심시력 검사 (삼간법 입체시)" },
    { href: "/ko/drills/reaction-speed/visual-tracking-speed-test", label: "시각 추적 속도 테스트" }
  ]
};

export default function LocalizedMultipleTargetsKoPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <GhostLinkClient copy={{ title: "다중 객체 추적 MOT 테스트 (주변시 훈련)", subtitle: "복수 타깃 동시 추적 및 시공간 주의력 검사" }} />
      <DrillGuide guide={guideData} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/ko/drills/visual/tracking-accuracy/multiple-targets" />
      </div>
    </>
  );
}
