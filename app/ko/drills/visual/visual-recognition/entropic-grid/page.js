import EntropicGridClient from '@/app/drills/visual/visual-recognition/entropic-grid/EntropicGridClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "시각 탐색 검사: 엔트로픽 그리드 훈련 | SkillDrills",
  description: "동적 시각 잡음과 100셀 매트릭스 속에서 목표 코드를 빠르게 식별하는 무료 온라인 시각 탐색 검사. 선택적 주의력과 주변시 스캐닝 속도를 극대화하세요.",
  keywords: [
    "시각 탐색 검사",
    "시각 주의력 훈련",
    "엔트로픽 그리드",
    "선택적 주의력 테스트",
    "동적 시각 잡음 필터링",
    "주변시 스캐닝",
    "특징 통합 이론",
    "시각 탐색 과제",
    "정보처리 속도 검사",
    "에임 서칭 훈련"
  ],
  openGraph: {
    title: "시각 탐색 검사・엔트로픽 그리드 훈련 – 무료 온라인 시각 주의력 테스트 | SkillDrills",
    description: "100개 셀의 고밀도 매트릭스와 동적 시각 노이즈 속에서 목표 코드를 최속으로 식별하는 무료 시각 탐색 검사. 선택적 주의력과 주변시 스캔 능력을 강화하세요.",
    type: 'article',
    url: 'https://skilldrills.online/ko/drills/visual/visual-recognition/entropic-grid',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "시각 탐색 검사・엔트로픽 그리드 훈련 – 무료 온라인 시각 주의력 테스트 | SkillDrills",
    description: "고밀도 그리드와 동적 노이즈 속에서 목표 코드를 최속으로 식별하는 무료 시각 탐색 검사. 선택적 주의력을 과학적으로 측정하고 훈련하세요.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/visual/visual-recognition/entropic-grid',
    languages: getAlternateLanguages('/drills/visual/visual-recognition/entropic-grid'),
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
      "name": "시각 탐색 및 패턴 인지",
      "item": "https://skilldrills.online/ko/drills/visual/visual-recognition"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "name": "동적 시각 탐색 검사 (엔트로픽 그리드)",
      "item": "https://skilldrills.online/ko/drills/visual/visual-recognition/entropic-grid"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SkillDrills 시각 탐색 검사기 (엔트로픽 그리드)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Any",
  "browserRequirements": "HTML5 Canvas 지원 최신 웹 브라우저",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "KRW"
  },
  "description": "트레이스먼의 특징 통합 이론(FIT) 및 울프의 가이드 탐색 모델(GS4)에 기반하여 고밀도 동적 그리드 환경에서의 목표물 탐색 시간, 선택적 시각 주의력, 배경 노이즈 억제 능력을 정밀 측정하는 온라인 인지 훈련 도구."
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "무료 온라인 시각 탐색 훈련 및 동적 그리드 주의력 테스트",
  "url": "https://skilldrills.online/ko/drills/visual/visual-recognition/entropic-grid",
  "applicationCategory": "GameApplication",
  "genre": ["시각 탐색 검사", "선택적 주의력 훈련", "시각 주의력", "인지심리학 훈련"],
  "browserRequirements": "Requires HTML5 Canvas and JavaScript",
  "inLanguage": "ko-KR"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "엔트로픽 그리드 비주얼 서치 (Entropic Grid Visual Search)",
  "description": "100개 셀의 동적 매트릭스에서 700ms마다 변하는 배경 잡음을 극복하고 제시된 영숫자 타겟 코드를 최속으로 클릭하는 지각 속도 측정 게임.",
  "genre": ["Cognitive Drill", "Vision Training", "Esports Reaction"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "엔트로픽 그리드 시각 탐색 검사(Visual Search Task)란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "인지심리학의 핵심 연구 방법인 시각 탐색 패러다임(Visual Search Paradigm)을 동적 잡음 환경으로 확장한 정밀 검사입니다. 100개의 셀로 이루어진 고밀도 격자 속에서 700ms 주기로 무작위 영숫자 노이즈가 계속해서 갱신됩니다. 피험자는 상단에 제시되는 단 하나의 목표 코드(예: 'K7')를 실시간 시각적 잡음 속에서 찾아내어 클릭해야 합니다. 고정된 숫자판을 순서대로 누르는 정적인 슐테 테이블과 달리, 끊임없이 깜빡이는 방해 자극을 뇌에서 능동적으로 차단하는 선택적 시각 주의력(Selective Visual Attention)을 측정합니다."
      }
    },
    {
      "@type": "Question",
      "name": "병렬 탐색(팝아웃)과 순차 탐색(직렬 탐색)은 어떤 차이가 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "앤 트레이스먼의 특징 통합 이론(Treisman & Gelade, 1980)에 따르면 색상이나 선의 기울기 같은 단일 물리적 특징만을 찾는 작업은 시야 전체에서 즉각적으로 목표가 두드러지는 '병렬 탐색(Pop-out)'으로 처리됩니다. 반면 본 검사처럼 복합적인 영숫자 형태를 결합해 식별해야 하는 과제는 시선의 초점을 순차적으로 이동하며 확인하는 '직렬 탐색(Serial Search)'이 요구됩니다. 숙련자는 제레미 울프의 가이드 탐색 모델(Wolfe, 2007)을 활용해 부분적 병렬 스캔과 신속한 안구 단속운동을 결합하여 탐색 시간을 극소화합니다."
      }
    },
    {
      "@type": "Question",
      "name": "발로란트, 에이펙스 레전드, 배틀그라운드 등 FPS 게임 실전에서의 효과는?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "현대 FPS 게임의 전장은 복잡한 텍스처, 그림자, 스모크, 각종 투사체 효과 등 극심한 시각적 클러터(Visual Clutter)로 가득 차 있습니다. 본 훈련을 통해 뇌의 배경 잡음 필터링 능력을 극대화하면, 복잡한 지형지물 사이로 노출되는 적의 헤드라인이나 미세한 피킹 움직임을 찰나의 순간에 포착하는 '색적(索敵) 반응 속도'가 획기적으로 단축됩니다. 타깃을 인지하고 조준을 시작하기까지의 초동 지각 지연(Target Acquisition Latency)을 크게 줄일 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "100개의 셀을 가장 빠르고 효율적으로 탐색하는 안구 스캔 기법은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "셀 하나하나를 순서대로 읽어나가는 방식은 비효율적입니다. 격자 전체를 '좌상단, 우상단, 좌하단, 우하단'의 4개 분면(Quadrant)으로 마음속으로 나누고, 각 분면의 중앙에 시선을 고정한 뒤 주변시를 활용해 4~9개 셀을 하나의 덩어리(청크)로 훑어보는 '4분면 블록 래스터 스캔'이 가장 우수합니다. 불필요한 미세 안구 단속운동의 횟수를 절반 이하로 줄여 탐색 잠복기를 대폭 줄입니다."
      }
    },
    {
      "@type": "Question",
      "name": "700ms 주기로 깜빡이는 동적 배경 노이즈에 흔들리지 않으려면?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "대뇌 피질의 배측 주의 네트워크(Dorsal Attention Network)를 활성화하여 강력한 '하향식(Top-down) 주의 제어'를 발휘해야 합니다. 배경 문자가 깜빡이며 튀어나오는 자극 주도형 상향식 반사를 전두엽에서 의식적으로 억제하고, 목표 문자가 가진 독특한 기하학적 특징(사선, 직각, 곡선 등)만을 필터링하는 인지 마스크를 시각 수용야에 적용하는 것이 핵심입니다(Duncan & Humphreys, 1989)."
      }
    },
    {
      "@type": "Question",
      "name": "일반 슐테 테이블(Schulte Table)이나 집중력 그리드와의 본질적 차이점은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "기존 슐테 테이블은 1부터 25까지 고정된 숫자를 오름차순으로 터치하는 정적이고 예측 가능한 작업입니다. 반면 엔트로픽 그리드는 격자 내의 배경 문자가 실시간으로 계속해서 변화하며 방해 자극을 생성하고, 타깃 또한 매 라운드 무작위로 변경됩니다. 위치 기억에 의존하는 편법이 원천 차단되므로 순수한 시각 탐색 속도와 시각적 잡음 저항 능력만을 정밀하게 평가합니다."
      }
    },
    {
      "@type": "Question",
      "name": "장시간 모니터 작업이나 대량 문서 속독 능력 향상에도 도움이 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "탁월한 도움이 됩니다. 시각 탐색 훈련은 안구의 주시 지속 시간(Fixation Duration)을 단축시키고, 단 한 번의 주시로 판독할 수 있는 정보의 폭(시지각 스팬)을 확장합니다. 방대한 양의 문서, 데이터 표, 소스 코드에서 핵심 키워드나 오류를 신속하게 식별해내는 전문 사무 및 연구 직무의 업무 효율성을 비약적으로 높여줍니다."
      }
    },
    {
      "@type": "Question",
      "name": "연령 증가에 따라 시각 탐색 속도가 저하되는 이유와 개선 방안은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "노화에 따라 주변부 시각 정보를 처리하는 유효 시야(UFOV: Useful Field of View)의 축소와 전두엽의 방해 자극 억제 능력 저하가 발생합니다(Woods et al., 2015). 하지만 고밀도 동적 격자 훈련을 꾸준히 수행하면 대뇌 피질 시각 영역의 신경 가소성이 자극되어 유효 시야의 넓이와 반응 속도를 젊은 성인 수준으로 유지하고 회복할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "최고 점수를 달성하기 위한 하루 권장 훈련 시간과 올바른 주기법은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1세션당 45초의 집중 테스트를 3~5회 반복(총 5~8분 내외)하는 것이 가장 이상적입니다. 고도의 선택적 주의 집중은 뇌의 포도당 소모가 매우 빠르기 때문에 피로가 누적되면 잡음 필터링 능력이 급격히 저하됩니다. 집중력이 가장 명료한 아침 시간대나 게임 플레이 전 워밍업으로 진행하는 것을 강력히 권장합니다."
      }
    },
    {
      "@type": "Question",
      "name": "측정된 시각 탐색 기록과 반응 시간 데이터는 외부에 저장되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "아닙니다. 달성한 식별 횟수, 평균 탐색 잠복기, 정확도 등 모든 훈련 기록은 사용자의 기기 내부(웹 브라우저의 localStorage)에만 안전하게 암호화되어 저장됩니다. 외부 중앙 서버로 개인 데이터나 마우스 클릭 좌표를 무단 전송하거나 수집하지 않으므로 안심하고 이용하실 수 있습니다."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "동적 시각 탐색 테스트 고득점 공략법 및 단계별 훈련 가이드",
  "description": "100셀 동적 노이즈 격자에서 목표 코드를 전광석화처럼 식별하기 위한 4단계 인지 전략.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "목표 코드 형태의 순간 시각화",
      "text": "화면 상단에 주어지는 2자리 영숫자 타깃 코드(예: 'X4')를 확인하고, 해당 문자의 고유한 윤곽선과 기울기를 머릿속에 선명하게 떠올립니다.",
      "url": "https://skilldrills.online/ko/drills/visual/visual-recognition/entropic-grid#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "4분면 블록 래스터 스캐닝",
      "text": "격자 전체를 4개의 25셀 블록으로 대별하고, 시선의 중심을 블록 중앙으로 부드럽게 이동하며 주변시로 묶음 스캔을 수행합니다.",
      "url": "https://skilldrills.online/ko/drills/visual/visual-recognition/entropic-grid#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "동적 배경 점멸의 능동적 억제",
      "text": "700ms마다 깜빡이며 변화하는 방해 문자에 시선을 빼앗기지 않고, 하향식 필터를 통해 목표 문자의 형태적 단서만을 추출합니다.",
      "url": "https://skilldrills.online/ko/drills/visual/visual-recognition/entropic-grid#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "최단 궤적 클릭 및 다음 목표 즉각 전환",
      "text": "목표 셀을 포착한 즉시 군더더기 없는 마우스 궤적으로 정확히 클릭하고, 시선을 즉시 다음 타깃 코드로 전환하여 연속 득점을 이어갑니다.",
      "url": "https://skilldrills.online/ko/drills/visual/visual-recognition/entropic-grid#step-4"
    }
  ]
};

const guideData = {
  eyebrow: "인지심리학 & 선택적 시각 주의 제어 가이드",
  heading: "시각 탐색 검사 – 동적 잡음 환경에서의 특징 통합과 주의 집중 기전",
  intro: [
    "시각 탐색(Visual Search)은 무수한 방해 자극(Distractor)이 복잡하게 얽혀 있는 시각 환경 속에서 특정 목표물(Target)을 빠르고 정확하게 찾아내는 인간의 핵심 인지 생체 기능입니다. 인지심리학의 중대한 기초 이론인 앤 트레이스먼의 특징 통합 이론(Feature Integration Theory: FIT, Treisman & Gelade, 1980)에 따르면, 인간의 시각 시스템은 색상, 밝기, 단순한 선분 기울기와 같은 기본 특징을 무의식적 전주의 단계(Preattentive Stage)에서 병렬적으로 감지합니다. 그러나 영숫자 결합과 같은 복합 형태를 식별하기 위해서는 공간적 주의 스포트라이트를 집중시키는 의식적 결합 과정이 필수적입니다.",
    "제레미 울프의 가이드 탐색 모델(Guided Search, Wolfe, 1994; Wolfe, 2007)은 시각 자극 자체의 두드러짐(상향식 현저성)과 관찰자의 목표 지향적 의도(하향식 주의 편향)가 결합하여 뇌 속에서 '우선순위 맵(Priority Map)'을 형성한다고 설명합니다. 본 엔트로픽 그리드 과제처럼 100개의 셀 전반에서 700ms 주기로 동적 잡음이 쏟아지는 고엔트로피 환경에서는 방해 문자의 점멸이 상향식 주의를 극도로 교란합니다. 이를 극복하려면 전전두엽 피질과 후두정엽 피질이 협력하여 강력한 하향식 억제 신호를 보내고, 목표물 이외의 시각 잡음을 뇌 내부에서 능동적으로 소거해야 합니다(Duncan & Humphreys, 1989).",
    "엔트로픽 그리드에서 700ms 주기로 배경 문자가 재생성되는 메커니즘은 닐리 라비(Nilli Lavie, 1995)의 '지각 부하 이론(Perceptual Load Theory)'을 정밀하게 반영합니다. 선택적 주의는 뇌의 구조적 용량 한계에 따라 작동합니다. 지각 부하가 낮은 작업 환경에서는 남는 인지 대역폭이 불필요한 방해 자극으로 자동 누출되어 심각한 집중력 저하를 초래합니다. 반면, 100개 셀로 가득 찬 복잡한 격자판에서 찰나의 순간에 특정 코드를 찾아내야 하는 고지각 부하(High Perceptual Load) 상태에서는 시각 정보 처리 용량이 과제 관련 자극에 100% 포화되면서 배경의 무작위 노이즈가 신경화학적으로 자동 차단되는 선택적 배제 현상이 완성됩니다(Lavie, 1995; Eriksen & St. James, 1986).",
    "인간의 공간적 주의력은 고정된 손전등이 아니라 신축성 있는 줌 렌즈처럼 작동합니다(Zoom Lens Model, Eriksen & St. James, 1986). 노련한 탐색자는 10x10 전체의 광역 저해상도 스캔과 2x2 블록의 고해상도 초점 조정을 자유자재로 전환합니다. 특히 중심와(Fovea) 바깥의 부중심와(Parafovea) 영역을 적극적으로 활용하여, 모든 셀에 일일이 개별 안구 도약을 발생시키지 않고도 주변 셀의 형태학적 불일치를 일괄 배제합니다(Posner, 1980; Woods et al., 2015).",
    "본 엔트로픽 그리드 도구는 초정밀 performance.now() 타이머를 통해 45초 동안 코드 식별 반응 잠복기, 유효 획득 수, 오클릭 페널티를 종합적으로 측정하여 실시간 인지 스코어를 도출합니다. 지속적인 동적 그리드 탐색 훈련은 극심한 시각적 클러터 환경에서도 망막의 유효 시야를 극대화하며, FPS 게임에서의 찰나의 색적, 복잡한 도로 주행 시의 돌발 위험 감지, 대용량 데이터 모니터링 시의 인지 생산성을 비약적으로 향상시킵니다."
  ],
  benchmarks: {
    title: "동적 시각 탐색 및 선택적 주의력 벤치마크 기준",
    headers: ["평가 등급 / 티어", "코드 식별 성공수 (45초)", "평균 탐색 주시 잠복기", "잡음 식별 정확도", "신경 인지적 처리 단계"],
    rows: [
      ["최상위 / 프로 엘리트 (Top 1%)", "18회 이상", "< 180 ms", "96% 이상", "병렬적 팝아웃 추출과 하향식 가이드 탐색의 완전 통합 (Wolfe, 2007)"],
      ["상급 시각 탐색 (Top 5%)", "14 – 17회", "180 – 230 ms", "88 – 95%", "동적 잡음의 효율적 필터링 및 4분면 래스터 스캔의 숙달"],
      ["중급 표준 수준 (Top 25%)", "10 – 13회", "230 – 300 ms", "76 – 87%", "표준 성인 인지 속도. 순차 스캔과 부분적 병렬 추출 병용"],
      ["초급 일반 단계 (Top 50%)", "7 – 9회", "300 – 400 ms", "65 – 75%", "방해 자극에 대한 주의 분산 (시각적 클러터로 인한 탐색 지연)"],
      ["기초 훈련 단계 (Baseline)", "7회 미만", "> 400 ms", "65% 미만", "과도한 안구 단속도 방황 및 작업 기억 속 목표 코드 이탈"]
    ],
    note: "인지심리학 및 시각 탐색 이론 문헌(Treisman & Gelade 1980; Wolfe 2007; Duncan & Humphreys 1989; Posner 1980)에 기반한 객관적 성과 기준입니다."
  },
  techniques: {
    title: "시각 탐색 속도를 극대화하는 4대 핵심 테크닉",
    items: [
      {
        name: "병렬 팝아웃 특징 필터링 (Parallel Pop-Out Feature Extraction)",
        desc: "목표 문자의 의미를 글자 단위로 읽으려 하지 말고, 해당 문자가 지닌 고유한 기하학적 엣지(예: 대각선, 둥근 곡선, 열린 각도)만을 시각적 필터로 띄워 노이즈 속에서 두드러지게 만듭니다.",
        tips: "예를 들어 'K'라면 사선 교차선, 'O'라면 원형 윤곽선처럼 가장 두드러지는 형태학적 단서에 초점을 맞추세요."
      },
      {
        name: "4분면 블록 래스터 스캐닝 (Quadrant Systematic Raster Scan)",
        desc: "100개의 격자 전체를 4개의 25셀 블록(좌상·우상·좌하·우하)으로 구분하고, 각 블록 중심에 시선을 던지며 주변시로 일괄 탐색합니다.",
        tips: "시선을 무질서하게 방황시키지 말고 일정한 Z자형 혹은 사분면 회전 궤적을 고정하여 스캔 누락을 방지하세요."
      },
      {
        name: "동적 시각 잡음 능동 억제 (Dynamic Noise Perceptual Filtering)",
        desc: "700ms마다 깜빡이며 변화하는 방해 문자에 동요하지 않고, 전두엽의 하향식 억제 신호를 유지하여 시각 자극에 대한 불필요한 반사 반응을 차단합니다.",
        tips: "화면이 깜빡이는 순간마다 눈동자를 급격히 움직이지 말고, 점멸 직후 안정되는 찰나의 순간에 초점을 동기화하세요."
      },
      {
        name: "주의 스포트라이트 광역 배분 (Attentional Spotlight Broadening)",
        desc: "한 칸에 지나치게 좁은 터널 시야를 형성하면 탐색 시간이 급증합니다. 시각적 주의 범위를 3×3 셀 크기로 넓혀 포괄적으로 인식하는 감각을 훈련합니다.",
        tips: "모니터와 50cm 이상의 적정 시청 거리를 유지하고 목과 어깨의 긴장을 풀어 시야각 전체를 편안하게 수용하세요."
      }
    ]
  },
  steps: [
    "시작 버튼을 클릭하고 상단에 표시되는 2자리 영숫자 목표 코드를 신속하게 확인합니다.",
    "격자판을 4분면 블록으로 조망하며 목표 코드의 형태학적 윤곽선이 튀어나오는 위치를 주변시로 스캔합니다.",
    "700ms 주기로 변화하는 배경 노이즈의 점멸을 무시하고 타깃 셀을 발견하는 즉시 클릭합니다.",
    "정답을 맞히면 새로운 타깃 코드가 즉각 제시되므로 45초 동안 리듬을 유지하며 식별을 이어갑니다.",
    "검사 종료 후 도출되는 총 식별 횟수, 평균 탐색 잠복기, 종합 티어를 확인하고 일일 루틴으로 훈련합니다."
  ],
  audience: "발로란트, 에이펙스 레전드, 배틀그라운드, 오버워치 등에서 적 식별 속도와 색적(索敵) 능력을 극대화하려는 FPS 게이머, 항공관제사·X선 판독관·보안 모니터링 요원, 대량의 시각 데이터와 서류를 초고속으로 검토해야 하는 전문직 종사자.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('treisman1980', 'wolfe2007', 'duncan1989', 'posner1980', 'green2006', 'woods2015'),
  related: [
    { href: "/ko/drills/visual/visual-recognition/visual-search", label: "시각 탐색 테스트 (주변시 스캐닝)" },
    { href: "/ko/drills/visual/tracking-accuracy/multiple-targets", label: "다중 객체 추적 MOT 테스트" },
    { href: "/ko/drills/visual/tracking-accuracy/moving-target", label: "동체시력 테스트 (이동 목표 요격)" },
    { href: "/ko/drills/visual/reaction-speed/go/no-go", label: "Go / No-Go 선택 반응 테스트" }
  ]
};

export default function LocalizedEntropicGridKoPage() {
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

      <EntropicGridClient copy={{ title: "시각 탐색 검사・엔트로픽 그리드 훈련", subtitle: "동적 노이즈 필터링 & 선택적 시각 주의력 검사" }} />
      <DrillGuide guide={guideData} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/ko/drills/visual/visual-recognition/entropic-grid" />
      </div>
    </>
  );
}
