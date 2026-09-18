import ConstantSlowPursuitClient from '@/app/drills/visual-tracking/constant-slow-pursuit/ConstantSlowPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// KOREAN SEARCH KEYWORD RESEARCH & INTENT CLUSTERING
// Primary query: "안구 운동 훈련" / "눈 운동 훈련" (High-intent oculomotor query in KR)
// Secondary:    "시각 추적 훈련", "에임 트래킹 연습" (Massive gaming & athletics organic query)
// LSI / Domain:  "스무스 퍼슈트 (활무동 안구운동)", "리사주 곡선 시선 추적",
//               "시선 흔들림 억제", "중심와 시선 고정", "도약 안구운동(사케드) 억제", "동체시력 운동"
// Authentic Domain Terms: 활무동 추적 안구 운동(Smooth Pursuit), 사케드(도약 안구운동), 망막 슬립(Retinal Slip), 전두안구영역(FEF), 전정안구반사(VOR)
// ============================================================

export const metadata = {
  title: '안구 운동 훈련 – 저속 스무스 퍼슈트 시각 추적 | SkillDrills',
  description: "리사주 곡선을 따라 부드럽게 활주하는 저속 활무동(스무스 퍼슈트) 안구 운동 훈련. 시선의 불필요한 도약(사케드)을 억제하고 중심와 시선 고정 능력을 극대화하여 동체시력과 트래킹 에임을 강화하세요. 무료, 무설치.",
  keywords: [
    "안구 운동 훈련",
    "눈 운동 훈련",
    "시각 추적 훈련",
    "에임 트래킹 연습",
    "스무스 퍼슈트",
    "동체시력 운동",
    "시선 고정 훈련",
    "리사주 곡선 안구 훈련",
    "안구 추적 검사",
    "도약 안구운동 억제",
    "시각 안정성 트레이닝",
    "오버워치 트래킹 에임"
  ],
  openGraph: {
    title: '안구 운동 훈련 – 저속 스무스 퍼슈트 시각 추적 | SkillDrills',
    description: "리사주 곡선을 따라 부드럽게 활주하는 저속 활무동(스무스 퍼슈트) 안구 운동 훈련. 시선의 불필요한 도약(사케드)을 억제하고 중심와 시선 고정 능력을 극대화하여 동체시력과 트래킹 에임을 강화하세요.",
    type: "website",
    url: "https://skilldrills.online/ko/drills/visual-tracking/constant-slow-pursuit",
    siteName: "SkillDrills",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: '안구 운동 훈련 – 저속 스무스 퍼슈트 시각 추적 | SkillDrills',
    description: "활무동 추적 안구 운동(스무스 퍼슈트)과 시선 안정성을 정밀하게 측정하고 단련하는 무료 브라우저 훈련 툴.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/visual-tracking/constant-slow-pursuit",
    languages: getAlternateLanguages('/drills/visual-tracking/constant-slow-pursuit'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "홈", "item": "https://skilldrills.online/ko" },
    { "@type": "ListItem", "position": 2, "name": "훈련 허브", "item": "https://skilldrills.online/ko/drills" },
    { "@type": "ListItem", "position": 3, "name": "시각 추적 훈련", "item": "https://skilldrills.online/ko/drills/visual-tracking" },
    { "@type": "ListItem", "position": 4, "name": "안구 운동 훈련 (저속 추적)", "item": "https://skilldrills.online/ko/drills/visual-tracking/constant-slow-pursuit" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "안구 운동 훈련・저속 시각 추적 트레이닝 (Constant Slow Pursuit)",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Web Browser",
  "url": "https://skilldrills.online/ko/drills/visual-tracking/constant-slow-pursuit",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "리사주 기하 곡선을 따라 일정한 저속으로 이동하는 타깃을 활무동 안구 운동으로 부드럽게 추적하여 시선 흔들림을 억제하고 동체시력을 극대화하는 무료 브라우저 트레이너.",
  "featureList": [
    "각진 모서리가 없는 매끄러운 리사주 조화 곡선 기반의 무중단 활무동 추적",
    "0.5배속부터 9.0배속까지 지원하는 속도 조절 및 가속 변동 모드",
    "궤적선 투명화, 잔상 효과, 타깃 발광 모드 등 다채로운 시각 자극 제어",
    "외부 서버 통신 없이 브라우저 내부에만 안전하게 보관되는 100% 로컬 데이터"
  ],
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "안구 운동 훈련 – 활무동 스무스 퍼슈트 온라인 트레이너 | SkillDrills",
  "alternateName": "Constant Slow Pursuit Korea",
  "url": "https://skilldrills.online/ko/drills/visual-tracking/constant-slow-pursuit",
  "dateModified": "2026-09-15",
  "description": "무료 온라인 안구 운동 트레이닝. 머리를 움직이지 않고 안구 근육만을 사용하여 움직이는 타깃을 부드럽게 추종함으로써 불필요한 사케드(시선 도약)를 억제합니다.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas를 지원하는 최신 웹 브라우저",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "isAccessibleForFree": true,
  "learningResourceType": "Educational Game",
  "teaches": "활무동 추적 안구 운동(SPEM), 중심와 시선 고정, 도약 안구운동 억제, 전정안구반사 분리, 시각 추적 안정화"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "안구 운동 훈련・저속 시각 추적 트레이닝 (Constant Slow Pursuit)",
  "url": "https://skilldrills.online/ko/drills/visual-tracking/constant-slow-pursuit",
  "description": "무료 시각 추적 트레이닝 게임. 조화로운 리사주 곡선을 활주하는 타깃을 안구 운동만으로 추적하여 눈 근육의 지구력과 시선 안정성을 단련합니다.",
  "genre": ["Eye Tracking", "Visual Training", "Reaction Speed"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "안구 운동 훈련(스무스 퍼슈트)의 올바른 측정 및 연습 방법",
  "dateModified": "2026-09-15",
  "description": "리사주 곡선을 활용하여 안구 운동의 매끄러움을 극대화하고 시선 끊김 없는 정밀한 동체시력을 기르기 위한 공식 가이드.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "적정 속도 배율 및 세션 시간 설정",
      "text": "처음에는 눈에 무리가 가지 않는 1.0배속 이하의 저속을 선택하고 세션 시간을 60초 또는 90초로 지정합니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/constant-slow-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "머리 고정 및 인체공학적 시선 각도 확보",
      "text": "모니터와 약 50~70cm 거리를 두고 머리를 완전히 고정한 채 목을 돌리지 않고 오직 안구 근육만을 움직이는 자세를 취합니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/constant-slow-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "중심와를 통한 타깃 중심점 지속 고정 (활무동 추적)",
      "text": "「훈련 시작」을 누르고 리사주 곡선을 따라 부드럽게 움직이는 타깃의 중심부에 양안의 초점을 견고하게 고정합니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/constant-slow-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "도약 안구운동(사케드) 억제 및 속도 단계적 증속",
      "text": "시선이 튀거나 목표물을 놓쳐 덜컹거리는 현상(보정 도약)을 억제하며 매끄러운 추종을 유지하고, 숙련도에 따라 점진적으로 속도를 높입니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/constant-slow-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-15",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "활무동(스무스 퍼슈트) 안구 운동 훈련이란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "활무동 추적 안구 운동(Smooth Pursuit Eye Movement / SPEM)은 시야 내에서 연속적으로 움직이는 대상을 망막의 최고 해상도 부위인 중심와(Fovea)에 안정적으로 유지하기 위해 눈동자를 매끄럽게 회전시키는 수의적 안구 운동입니다. 한 지점에서 다른 지점으로 빠르게 튀는 사케드(도약 안구운동)와 달리, 뇌의 시각 피질과 소뇌가 망막의 상 미끄러짐(망막 슬립 속도)을 실시간 계산하여 눈의 이동 속도를 타깃 속도와 일치시키는 고차원적 신경 제어 시스템입니다 (Rashbass, 1961; Krauzlis, 2004)."
      }
    },
    {
      "@type": "Question",
      "name": "왜 저속 구간에서의 시각 추적이 더 어렵고 중요한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "대상이 천천히 움직일 때 눈의 회전 속도가 목표 속도에 미치지 못하면 망막에 오차가 발생하여, 뇌가 이를 따라잡기 위해 시선을 덜컹거리며 튕겨내는 불수의적 '추종 보정 도약(Catch-up Saccade)'을 강제로 유발하게 됩니다 (Robinson, 1965). 저속 추종은 운동 관성에 기댈 수 없으므로 소뇌의 지속적인 고이득(High-gain) 신경 제어가 요구되며, 시선 안정성과 안구 제어력을 평가하는 가장 엄격한 척도가 됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "훈련 궤적으로 리사주 곡선(Lissajous Curve)을 채택한 이유는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "리사주 곡선은 서로 직교하는 수평 및 수직 방향의 정현파(Sine wave) 진동이 결합하여 형성되는 연속 기하학적 폐곡선입니다. 급격한 모서리나 반전 정지점이 전혀 없기 때문에 눈이 멈추거나 튕기지 않고, 상하·좌우·대각선의 모든 외안근(내직근, 외직근, 상사근, 하사근)을 고르게 복합적으로 자극할 수 있는 최적의 안구 운동 경로입니다."
      }
    },
    {
      "@type": "Question",
      "name": "이 안구 운동 훈련이 FPS 게임(에임 트래킹)과 구기 스포츠에 어떻게 도움이 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "오버워치, 에이펙스 레전드, 발로란트와 같은 정밀 FPS 게임에서 좌우로 무빙(스트레이프)하는 적을 조준할 때 시선이 흔들리면 크로스헤어가 빗나가게 됩니다. 활무동 안구 추종이 발달하면 표적의 미세한 움직임을 흔들림 없이 선명하게 포착하여 트래킹 에임의 명중률이 대폭 상승합니다 (Yang et al., 2025). 야구, 테니스, 배드민턴 등 고속 구기 스포츠에서도 날아오는 공의 궤적을 끝까지 주시하는 기초 시각 능력으로 직결됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "고개를 돌려 머리로 타깃을 따라가면 안 되는 생리학적 이유는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "머리를 함께 움직이면 내이의 전정기관이 자극을 받아 무조건 반사인 '전정안구반사(VOR: Vestibulo-Ocular Reflex)'가 주도권을 쥐게 됩니다 (Leigh & Zee, 2015). 전정안구반사는 단순 반사이므로 대뇌 피질과 소뇌가 주관하는 정밀한 활무동 추적 신경망(SPEM)이 충분히 자극받지 못합니다. 순수한 눈 운동 신경을 단련하려면 머리를 완전히 고정하고 안구만으로 타깃을 쫓아야 합니다."
      }
    },
    {
      "@type": "Question",
      "name": "하루에 몇 분 정도 연습하는 것이 신경 적응에 가장 효과적인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1회 60초에서 90초 정도의 세션을 휴식과 함께 3~5회 반복하여 하루 총 5~10분 정도 진행하는 것이 가장 이상적입니다. 눈 근육은 매우 미세하고 피로에 민감하므로 장시간 무리한 훈련은 오히려 역효과를 냅니다. 짧고 밀도 높은 세션을 매일 꾸준히 반복하는 것이 소뇌의 신경 가소성을 안정화시키는 최선의 방법입니다."
      }
    },
    {
      "@type": "Question",
      "name": "연습 도중 눈이 뻑뻑하거나 눈물이 나는 이유는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "타깃에 고도로 집중하면서 자신도 모르게 눈 깜빡임(Blink) 횟수가 줄어들어 각막 표면의 눈물막이 마르기 때문입니다. 증상이 느껴지면 세션을 잠시 멈추고 눈을 지그시 깜빡여 준 뒤, 5미터 이상 떨어진 먼 곳을 20~30초간 바라보며 눈 주변 근육을 이완시켜 주세요."
      }
    },
    {
      "@type": "Question",
      "name": "모니터 주사율(60Hz vs 144Hz vs 240Hz)이 안구 추적에 어떤 영향을 주나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "일반 60Hz 모니터는 프레임 갱신 간격이 약 16.7ms로 길어 타깃이 이동할 때 미세한 끊김(잔상 및 프레임 건너뜀)이 발생합니다. 반면 144Hz(6.9ms)나 240Hz(4.1ms) 고주사율 디스플레이는 망막에 전달되는 이동 궤적을 극도로 매끄럽게 렌더링하여 뇌가 속도를 오판하지 않고 순수한 활무동 추적을 유지할 수 있도록 돕습니다 (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "궤적 예측 안구 운동(Predictive Pursuit)이란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "규칙적이고 반복적인 궤적을 추적할 때 소뇌의 내부 모델은 이전 궤적을 학습하여 미래의 위치를 선행 계산합니다 (Barnes, 2008). 이를 통해 약 100ms에 달하는 신경계의 시각 정보 전달 지연 시간을 완전히 상쇄하고 타깃과 오차 없이 완벽히 동기화된 안구 운동을 생성할 수 있게 됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "이 안구 운동 훈련은 무료인가요? 시각 데이터가 외부 서버로 전송되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, SkillDrills의 안구 운동 트레이닝은 100% 무료이며 회원가입이나 광고 시청이 전혀 필요 없습니다. 모든 훈련 설정값, 총 훈련 횟수, 세션 기록은 사용자의 웹브라우저 로컬 저장소(localStorage)에만 안전하게 암호화 보관되며 외부 분석 서버로 전송되지 않습니다."
      }
    }
  ]
};

const guideProps = {
  heading: "활무동 추적 안구 운동(SPEM)과 리사주 시선 안정화의 신경생리학적 표준",
  intro: [
    "활무동 추적 안구 운동(Smooth Pursuit Eye Movement / SPEM)은 시야 내에서 이동하는 물체의 상을 중심와(망막에서 가장 선명하게 시각 정보를 처리하는 황반 중심부)에 일치시키기 위해 정밀하게 작동하는 고위 시각 인지 기능입니다. 정지된 두 지점 사이를 빠르게 건너뛰는 도약 안구운동(사케드)과 달리, 시각 피질(MT/MST 영역)이 산출한 타깃의 각속도와 망막에 비친 상의 이동 속도(망막 슬립)를 오차 없이 계산하여 소뇌 편엽(Flocculus)이 외안근으로 연속적인 신경 신호를 공급함으로써 완성됩니다 (Rashbass, 1961; Krauzlis, 2004).",
    "저속 영역에서의 시각 추적 난이도: 이동체의 속도가 느릴 경우, 안구의 회전 속도가 목표물의 이동 속도와 완벽히 맞아떨어지지 않으면 즉각적인 위상 지연이 발생합니다. 이때 뇌는 오차를 만회하기 위해 본인도 모르게 덜컹거리며 위치를 당겨오는 '추종 보정 도약(Catch-up Saccade)'을 강제로 개입시키게 되며, 이로 인해 시선이 튀고 미세한 세부 정보를 놓치게 됩니다 (Robinson, 1965). 저속 구간에서 도약의 방해 없이 부드러운 글라이딩 시선을 지속할 수 있는 제어력이야말로 최고 수준의 시각 안정성을 입증하는 증거입니다.",
    "리사주 기하 곡선을 통한 전방위 안구 근육 발달: 단순한 좌우 왕복 운동은 양 끝단에서 속도가 0이 되므로 예측이 지나치게 단순해집니다. 본 훈련 프로그램에 적용된 리사주 궤적(수평 코사인파와 수직 사인파의 위상 결합)은 꺾이는 모서리나 정지 지점이 전혀 없는 무한 곡선을 그리며, 상하좌우 및 대각선 방향의 외안근(내직근, 외직근, 상사근, 하사근)을 유기적으로 고르게 자극합니다. 이는 격투 게임이나 FPS의 현란한 회피 기동(Yang et al., 2025), 축구·테니스 등 복합 궤적의 구기 스포츠(Appelbaum & Erickson, 2018)에서 목표를 놓치지 않는 시각 운동 협응력을 길러줍니다.",
    "인체공학적 자세 및 하드웨어 권장 사항: 성공적인 훈련을 위해서는 턱을 살짝 당기고 머리를 완전히 고정한 채 오직 양쪽 눈동자만을 굴려 대상을 쫓아야 합니다. 고개가 표적을 따라 회전하면 내이의 세반고리관이 반응하여 전정안구반사(VOR)가 개입되므로 대뇌와 소뇌의 순수 추종 신경 회로가 자극받지 못합니다 (Leigh & Zee, 2015). 또한 시각적 끊김 현상을 방지하기 위해 144Hz 이상의 고주사율 모니터 환경에서 진행하는 것을 권장합니다 (Woods et al., 2015). 모든 세션 데이터는 로컬 브라우저에 안전하게 저장됩니다."
  ],
  benchmarks: {
    title: "활무동 안구 추적 및 시선 안정성 성취도 기준 (에디토어 표준)",
    headers: ["숙련도 티어", "설정 속도 대역 (Speed Multiplier)", "시선 유지력 및 도약 억제 특성", "신경 안구 운동 프로필"],
    rows: [
      ["티어 1: 최상위 시선 고정 (Apex Gaze Lock)", "2.0x 이상의 고속 대역", "보정 도약 전무. 고속 리사주 곡선의 급격한 회전 구간에서도 중심와가 타깃에 자석처럼 밀착.", "소뇌의 운동 이득과 궤적 예측 기능(Barnes, 2008)이 완벽히 동기화된 프로 게이머 및 국가대표 선수 수준."],
      ["티어 2: 우수 활무동 추적 (Superior Pursuit)", "1.4x – 1.9x 중고속 대역", "균일한 글라이딩 추적. 방향 전환 시 시선 흔들림이 극히 적으며 미세 도약 후 즉각 복귀.", "뛰어난 외안근 협응력과 망막 슬립 감지력 보유. 빠르게 움직이는 적의 세부 윤곽 완벽 식별."],
      ["티어 3: 건장한 성인 기준 (Solid Baseline)", "1.0x – 1.3x 표준 대역", "기본 속도에서의 안정적 추적. 곡선의 변곡점이나 가속 구간에서 경미한 시선 끊김 발생.", "일반 성인의 건강한 안구 운동 수준. 일상생활 및 캐주얼 게임 플레이에 아무런 지장이 없는 상태."],
      ["티어 4: 도약 간섭 빈발 (Developing Pursuit)", "0.7x – 0.9x 저속 대역", "타깃의 속도를 따라가지 못해 계단식 사케드로 위치를 자주 보정함.", "저속 구간에서의 운동 이득 부족. 머리를 고정하고 눈 근육만으로 부드럽게 글라이딩하는 훈련 필요."],
      ["티어 5: 시선 이탈・초심자 (Extended Jitter)", "0.7x 미만", "타깃 궤적에서 시선이 빈번히 이탈. 머리가 함께 움직이거나 눈 근육 피로가 누적된 상태.", "최저 속도로 궤적을 따라가는 기본기부터 시작하여 머리 고정과 눈 깜빡임 이완 훈련 선행."]
    ],
    note: "본 성취도 기준은 신경안과학 및 안구 운동 연구 문헌(Robinson, 1965; Rashbass, 1961; Krauzlis, 2004; Leigh & Zee, 2015)의 통계치를 바탕으로 리사주 추적 시의 시선 지속성을 평가하기 위해 수립된 기준입니다."
  },
  techniques: {
    title: "시선 추적 안정성을 극대화하는 4가지 과학적 훈련법",
    items: [
      {
        name: "머리 고정을 통한 전정안구반사(VOR) 배제",
        desc: "Leigh & Zee(2015)의 신경안과학 연구에 따르면, 고개를 움직여 목표를 쫓으면 내이 반사(VOR)가 작동하여 대뇌 피질 추종계(SPEM)에 가해지는 훈련 부하가 사라집니다.",
        tips: "턱을 가볍게 당기고 머리를 벽이나 의자에 고정한 채 오직 안구의 회전만으로 타깃을 응시하는 자세를 엄격히 지키세요."
      },
      {
        name: "중심와 고정 및 망막 슬립의 의식적 최소화",
        desc: "Krauzlis(2004)가 입증했듯, 활무동 시스템을 구동하는 핵심 신호는 '망막에 맺힌 상의 미끄러짐 속도'입니다. 타깃의 정중앙에 초점을 꽂아야 불필요한 사케드가 억제됩니다.",
        tips: "타깃 원 전체를 멍하니 보지 말고, 구체의 정중앙 핵(Core) 한 점만을 날카롭게 뚫어지게 주시하세요."
      },
      {
        name: "리사주 조화 궤적 예측 모델 구축 (선행 주시)",
        desc: "Barnes(2008)는 뇌의 소뇌 내부 모델이 주기적 궤적을 학습하여 약 100ms에 달하는 신경 전달 지연을 상쇄할 수 있음을 증명했습니다.",
        tips: "다음 곡선의 진행 방향을 뇌 속에서 미리 그리며 눈동자를 반 박자 앞서 미끄러지듯 이동시키는 감각을 익히세요."
      },
      {
        name: "고주사율 디스플레이 활용 및 의식적 눈 깜빡임",
        desc: "Woods et al.(2015)의 분석에 따라 60Hz에서 144Hz/240Hz로 전환하면 프레임 끊김이 사라져 망막에 전달되는 연속 운동 신호의 품질이 향상됩니다.",
        tips: "고주사율 게이밍 모니터를 사용하고, 세션이 끝나면 눈을 질끈 감았다 뜨며 눈물막을 충분히 보충해 눈의 피로를 방지하세요."
      }
    ]
  },
  steps: [
    "속도 배율(0.5x~2.0x 권장)과 훈련 시간(60초)을 설정하고 훈련을 시작합니다.",
    "화면과 50~70cm 거리를 유지하고 머리를 완전히 고정하여 바른 자세를 정돈합니다.",
    "리사주 곡선을 따라 매끄럽게 활주하기 시작하는 타깃의 중심점에 시선을 고정합니다.",
    "목을 돌리지 않고 오직 안구 근육만을 활용하여 타깃의 속도에 맞춰 시선을 미끄러뜨립니다.",
    "시선이 덜컹거리거나 튀는 느낌이 든다면 속도를 한 단계 낮춰 매끄러움을 최우선으로 재정비합니다."
  ],
  audience: "FPS(에이펙스, 오버워치, 발로란트) 게이머, 야구·테니스·배드민턴 등 구기 스포츠 선수, 동체시력 향상 및 시선 흔들림 억제를 원하는 운동선수, 모니터 작업으로 눈 근육이 둔화된 직장인 및 학생.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('robinson1965', 'rashbass1961', 'krauzlis2004', 'barnes2008', 'leigh2015', 'yang2025', 'woods2015'),
  related: [
    { href: "/ko/drills/visual-tracking/sine-wave-pursuit", label: "정현파 추적 훈련 (Sine Wave)" },
    { href: "/ko/drills/visual-tracking/infinity-pursuit", label: "8자 무한루프 추적 훈련 (Infinity)" },
    { href: "/ko/drills/visual-tracking/directional-chaos-pursuit", label: "불규칙 방향 전환 추적 (Directional Chaos)" },
    { href: "/ko/drills/visual-tracking/predictive-pursuit", label: "예측 안구 추적 훈련 (Predictive)" },
    { href: "/ko/drills/visual-tracking/dynamic-evasion-pursuit", label: "반응형 회피 표적 추적 (Dynamic Evasion)" },
    { href: "/ko/drills/visual-tracking/ghosting-suppress-pursuit", label: "시선 고정 안정성 훈련 (Ghosting Suppress)" }
  ]
};

export default function LocalizedPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ConstantSlowPursuitClient
        copy={{
          title: "안구 운동 훈련・저속 시각 추적 트레이닝",
          subtitle: "활무동 추적 안구 운동(스무스 퍼슈트) & 리사주 시선 안정화 훈련"
        }}
      />
      <DrillGuide guide={guideProps} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/ko/drills/visual-tracking/constant-slow-pursuit" />
      </div>
    </>
  );
}
