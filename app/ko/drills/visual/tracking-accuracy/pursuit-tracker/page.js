import AutoPursuitClient from '@/app/drills/visual/tracking-accuracy/pursuit-tracker/AutoPursuitClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "에임 트래킹 테스트: 안구 추적 훈련 | SkillDrills",
  description: "스무스 퍼슈트(활동성 안구운동)와 마우스 에임 트래킹 정밀도를 측정하는 무료 온라인 테스트. 지속적인 시선 추적과 조준 안정성을 극대화하세요.",
  keywords: [
    "에임 트래킹",
    "안구 추적 훈련",
    "스무스 퍼슈트",
    "에임 트래킹 테스트",
    "안구운동검사",
    "시선 추적 테스트",
    "FPS 트래킹 에임",
    "망막 슬립 보정",
    "손눈 협응",
    "에임 연습 사이트"
  ],
  openGraph: {
    title: "에임 트래킹 테스트・안구 추적 훈련 – 무료 온라인 스무스 퍼슈트 연습 | SkillDrills",
    description: "활동성 안구운동과 마우스 트래킹 정밀도를 결합한 무료 시각 훈련 도구. 연속적으로 움직이는 타깃을 시선과 커서로 유지하여 에임 안정성을 향상시키세요.",
    type: 'article',
    url: 'https://skilldrills.online/ko/drills/visual/tracking-accuracy/pursuit-tracker',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: "에임 트래킹 테스트・안구 추적 훈련 – 무료 온라인 스무스 퍼슈트 연습 | SkillDrills",
    description: "활동성 안구운동과 마우스 트래킹 정밀도를 결합한 무료 시각 훈련 도구. 망막 슬립을 억제하고 트래킹 에임을 과학적으로 강화하세요.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/visual/tracking-accuracy/pursuit-tracker',
    languages: getAlternateLanguages('/drills/visual/tracking-accuracy/pursuit-tracker'),
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
      "name": "에임 트래킹 테스트 (스무스 퍼슈트)",
      "item": "https://skilldrills.online/ko/drills/visual/tracking-accuracy/pursuit-tracker"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "SkillDrills 에임 트래킹 테스트・스무스 퍼슈트 안구 추적기",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "Any",
  "browserRequirements": "HTML5 Canvas 지원 최신 웹 브라우저",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "KRW"
  },
  "description": "신경안과학의 스무스 퍼슈트(활동성 안구추적) 메커니즘을 기반으로 이동 표적에 대한 시선 유지율, 망막 슬립 억제력, 미세 도약 사케이드 빈도를 밀리초 단위로 실시간 측정하는 온라인 에임 트레이너."
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "무료 온라인 에임 트래킹 테스트 및 안구운동 훈련",
  "url": "https://skilldrills.online/ko/drills/visual/tracking-accuracy/pursuit-tracker",
  "applicationCategory": "GameApplication",
  "genre": ["에임 트래킹", "안구 추적 훈련", "스무스 퍼슈트", "FPS 트래킹 에임"],
  "browserRequirements": "Requires HTML5 Canvas and JavaScript",
  "inLanguage": "ko-KR"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "스무스 퍼슈트 오토 트래커 (Smooth Pursuit Auto-Tracker)",
  "description": "부드럽고 불규칙하게 움직이는 오버레이에 마우스 조준점을 밀착시켜 연속 추적 시간과 시각 안정성을 측정하는 전문 트레이닝 게임.",
  "genre": ["Aim Trainer", "Vision Training", "Esports Reaction"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game"
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "활동성 안구운동(스무스 퍼슈트, Smooth Pursuit)이란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "시야 내에서 연속적으로 움직이는 물체에 시선을 고정하고, 물체의 속도와 안구의 회전 속도를 일치시켜 망막 중심와에 상을 깨끗하게 유지하는 고차원 안구운동 기능입니다(Leigh & Zee, 2015). 시선이 순간적으로 튀는 도약 안구운동(Saccade)과 달리, 대뇌 시각 피질(MT/MST 영역)과 소뇌가 밀리초 단위로 속도 벡터를 계산하여 망막 상의 흐림(망막 슬립)을 제로로 억제합니다."
      }
    },
    {
      "@type": "Question",
      "name": "움직이는 대상을 조준할 때 화면이 끊기거나 에임이 덜덜 떨리는 신경학적 원인은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "안구의 추적 속도가 표적의 실제 속도보다 뒤처져 망막에 위치 오차(Position Error)가 발생하면, 뇌는 표적을 놓치지 않기 위해 본능적으로 짧은 도약 안구운동인 '캐치업 사케이드(Catch-up Saccade)'를 발화시킵니다(Rashbass, 1961). 추적 근육 제어가 미숙할수록 부드러운 연결이 깨지고 미세한 급발진 도약이 잦아져 조준선이 뚝뚝 끊기듯 떨리게 됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "오버워치, 에이펙스 레전드, 발로란트 등 FPS 게임의 트래킹 에임과 어떤 관련이 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "적이 좌우로 불규칙하게 무빙(AD 스트레이프)하거나 공중으로 활공할 때 조준선을 상대 히트박스에 흡착시키는 '순수 트래킹 에임(Tracking Aim)'의 신경학적 본질이 바로 스무스 퍼슈트입니다. 이 능력이 단련되면 상대의 방향 전환 순간에도 망막 상의 흔들림이 최소화되어 마우스 커서가 적에게 자석처럼 달라붙는 안정성을 확보할 수 있습니다(Lisberger, 2010)."
      }
    },
    {
      "@type": "Question",
      "name": "마우스 감도(eDPI) 설정은 트래킹 안정성에 어떤 영향을 주나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "감도가 지나치게 높으면 손끝의 미세한 맥박이나 근육 긴장까지 커서에 전달되어 심한 마이크로 지터(미세 떨림)가 발생합니다. 반대로 너무 낮으면 화면을 가로지르는 급격한 턴 무빙에 팔 동작이 늦어져 타깃 뒤를 쫓게 됩니다. 패드 중앙에서 편안하게 좌우 궤적을 그릴 수 있는 중·저감도(eDPI 200~320 수준)를 권장하며, 윈도우 마우스 가속 기능은 반드시 꺼두어야 합니다."
      }
    },
    {
      "@type": "Question",
      "name": "스무스 퍼슈트 훈련을 반복하면 실제 동체시력과 시각 집중력이 향상되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네. 소뇌와 전두안야(FEF) 사이의 신경 연결성이 강화되어 궤적 예측 모델(Predictive Pursuit)의 정확도가 비약적으로 향상됩니다(Barnes, 2008). 이동 물체를 장시간 선명하게 식별할 수 있게 될 뿐 아니라, 독서 시의 안구 행 이동 속도 향상과 장시간 PC 모니터 응시 시 발생하는 시각 피로 감소에도 긍정적인 효과가 입증되어 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "야구, 테니스, 모터스포츠 등 현실 스포츠 경기력에도 도움이 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "매우 큽니다. 시속 150km의 변화구 궤적을 타격 직전까지 응시하는 야구 타자나 시속 250km 코너를 돌파하는 F1 레이서는 일반인보다 압도적으로 높은 스무스 퍼슈트 이득(Pursuit Gain)을 발휘합니다. 안구 추적의 지연이 없기 때문에 신체 타격 동작의 시작 타이밍을 밀리초 단위로 정확하게 가져갈 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "마우스를 컨트롤할 때 손목 에임과 팔(전완) 에임 중 무엇에 집중해야 하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "부드러운 대규모 궤적 추적에는 팔꿈치를 축으로 하는 전완 운동을 활용하고, 순간적인 미세 궤적 수정에는 손목과 손가락 근육을 결합하는 '운동 사슬 분리(Kinetic Decoupling)'가 최적입니다. 손목만으로 모든 궤적을 억지로 커버하려 하면 힘줄에 과도한 텐션이 생겨 커서가 단계적으로 튀는 계단 현상이 발생합니다."
      }
    },
    {
      "@type": "Question",
      "name": "타깃이 급격히 방향을 꺾을 때 조준선이 튕겨 나가지 않게 하는 팁은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "방향 전환을 감지한 순간 당황하여 손에 힘을 주며 급격히 끌어치기(플릭)를 시도하면 백프로 오버슈트가 일어납니다. 전환 순간 오히려 손목의 힘을 살짝 빼고, 타깃이 나아가는 새로운 경로를 향해 커서를 부드럽게 미끄러뜨리듯 연착륙시키는 '등속 슬라이드 감각'을 익혀야 합니다."
      }
    },
    {
      "@type": "Question",
      "name": "눈 피로를 예방하면서 최대의 훈련 성과를 내기 위한 하루 루틴은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "스무스 퍼슈트는 6개의 외안근을 쉬지 않고 연속 수축시키는 고강도 시각 과제입니다. 1회 45초 세션을 3~5회(총 5~10분) 수행하는 것이 가장 집중도가 높습니다. 훈련 후에는 손바닥을 비벼 따뜻하게 눈을 감싸주는 파밍(Palming)이나 20-20-20 규칙으로 안구 조절근을 완전히 이완해 주세요."
      }
    },
    {
      "@type": "Question",
      "name": "훈련 데이터와 트래킹 결과 기록이 외부 서버로 수집되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "전혀 수집되지 않습니다. 측정된 유지율(Time on Target), 평균 정확도, 평가 등급 등 모든 기록은 사용자의 웹 브라우저(localStorage)에만 안전하게 저장됩니다. 어떠한 개인정보나 마우스 입력 좌표도 외부 서버로 전송되지 않습니다."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "에임 트래킹 테스트・스무스 퍼슈트 안구 추적 실전 가이드",
  "description": "연속적으로 이동하는 타깃에 조준선을 완벽하게 밀착시켜 최고 점수와 높은 안정성을 획득하는 4단계 실전 공략법.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "초기 타깃 위치 흡착 및 호흡 안정",
      "text": "카운트다운 동안 화면 중앙에 대기하는 타깃 구체의 정중앙에 커서를 올리고, 손목과 어깨의 긴장을 풀어줍니다.",
      "url": "https://skilldrills.online/ko/drills/visual/tracking-accuracy/pursuit-tracker#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "등속 활동성 안구추적 개시",
      "text": "타깃이 움직이기 시작하면 중심와로 구체 중심을 지속 응시하며, 마우스를 일정한 속도로 부드럽게 미끄러뜨립니다.",
      "url": "https://skilldrills.online/ko/drills/visual/tracking-accuracy/pursuit-tracker#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "방향 전환 시 미세 도약 억제",
      "text": "타깃의 궤적이 꺾일 때 강하게 튕기지 않고, 부드러운 완만한 곡선을 그리며 새로운 벡터에 커서를 자연스럽게 연착륙시킵니다.",
      "url": "https://skilldrills.online/ko/drills/visual/tracking-accuracy/pursuit-tracker#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "45초 콤보 유지 및 결과 분석",
      "text": "45초 동안 타깃 오버레이를 놓치지 않고 유지하며, 종료 후 산출되는 유지율과 정확도 등급을 기록해 일일 루틴에 반영합니다.",
      "url": "https://skilldrills.online/ko/drills/visual/tracking-accuracy/pursuit-tracker#step-4"
    }
  ]
};

const guideData = {
  eyebrow: "신경안과학 및 시각 운동 제어 가이드",
  heading: "에임 트래킹 테스트 – 스무스 퍼슈트와 안구 추적 제어 메커니즘",
  intro: [
    "스무스 퍼슈트 안구운동(Smooth Pursuit Eye Movement, SPEM / 활동성 안구운동)은 시야에서 연속적으로 이동하는 목표물의 속도에 맞춰 안구를 매끄럽게 회전시켜, 목표물의 상을 망막에서 가장 해상도가 높은 중심와(Fovea centralis)에 안정적으로 고정하는 정밀 안구운동 시스템입니다. 이는 시선의 위치 오차를 급격한 점프로 만회하는 도약 안구운동(Saccade)과는 신경학적으로 완전히 독립된 제어 회로에 의해 작동합니다(Rashbass, 1961; Krauzlis, 2004).",
    "신경생리학적으로 스무스 퍼슈트를 구동하는 핵심 신호는 망막 위에서 상이 미끄러지는 속도, 즉 '망막 슬립(Retinal Slip)'입니다(Leigh & Zee, 2015). 시각 자극이 1차 시각 피질(V1)을 거쳐 중측두엽(MT/V5 영역) 및 내측상측두엽(MST 영역)으로 전달되어 밀리초 단위로 속도 벡터가 추출됩니다. 이후 전두안야(FEF)와 보조안야(SEF)를 거쳐 뇌교핵과 소뇌(Flocculus 및 Dorsal Vermis)로 전달된 후, 외안근을 움직이는 동안신경핵으로 정밀 운동 명령이 하달됩니다(Krauzlis, 2004; Lisberger, 2010).",
    "인간의 활동성 안구운동에는 명확한 생체역학적 한계가 존재합니다. Bahill, Iandolo 및 Troost(1980)의 연구에 따르면, 시각 목표물의 각속도가 초당 30~40도를 초과하거나 예측 불가능한 불규칙 궤적을 그릴 경우, 안구 추적 시스템은 유니티 게인(Unity Gain, 안구 속도와 목표 속도가 1.0으로 일치하는 비율)을 유지하지 못하고 급격한 위상 붕괴를 겪습니다. 망막상의 위치 오차가 임계치를 넘어서면 중추신경계는 비상 보상 기제로서 20~40ms의 순간 탄도성 수정 동작인 '캐치업 사케이드(Catch-up Saccade)'를 발동하여 시야에서 벗어난 타깃을 중심와로 강제 복귀시킵니다(Leigh & Zee, 2015). 최정상급 프로게이머와 엘리트 운동선수는 가속도 벡터의 정밀한 선행 예측을 통해 이러한 불필요한 보정 도약의 진폭과 빈도를 최소화합니다.",
    "인간의 시각-운동 피드백 루프에는 망막 자극부터 근육 수축까지 약 100~130ms의 불가피한 감각운동 지연(Sensorimotor Delay)이 발생하기 때문에, 순수 반응형 추적은 필연적으로 오버슈트와 궤적 이탈로 이어집니다(Woods et al., 2015). 이를 극복하기 위해 소뇌와 대뇌 운동 피질은 목표물의 미래 궤적과 벽면 반사 벡터를 사전 계산하는 내부 예측 모델(Internal Predictive Models)을 가동합니다(Land & McLeod, 2000; Barnes, 2008). 이러한 피드포워드 제어를 통해 100ms 지연된 망막 상이 아닌 타깃의 실제 도달 예상 위치로 커서를 선행 동기화합니다.",
    "본 시스템은 초정밀 performance.now() 타이머와 서브픽셀 렌더링 엔진을 통해 45초 동안 지속되는 안구 추적 세션에서 타깃 유효 접촉 시간 비율(Time on Target), 평균 추적 오차, 최대 연속 스트릭(Max Streak)을 실시간으로 정밀 측정합니다. 규칙적인 스무스 퍼슈트 훈련은 소뇌의 적응적 가소성을 자극하고 손과 눈의 협응력을 극대화하여, FPS 게임에서의 매끄러운 트래킹 에임 형성, 구기 종목의 궤적 인터셉트 능력 향상, 시각 피로 경감에 결정적인 기여를 합니다."
  ],
  benchmarks: {
    title: "에임 트래킹 및 스무스 퍼슈트 안구운동 표준 벤치마크 기준",
    headers: ["평가 등급 / 티어", "타깃 유지율 (Time on Target)", "평균 트래킹 정밀도", "보정 도약 억제율", "신경생리학적 도달 수준"],
    rows: [
      ["신인류 / 프로 특급 (상위 1%)", "88% 이상", "92% 이상", "95% 이상 억제", "완벽한 활동성 안구운동 및 망막 슬립 제로화. 소뇌 예측 제어 완벽 동기화 (Lisberger, 2010)"],
      ["상급 시각 추적 (상위 5%)", "76 – 87%", "84 – 91%", "88 – 94% 억제", "부드러운 외안근 협응과 방향 전환 시 즉각적인 속도 위상 적응"],
      ["중급 표준 수준 (상위 25%)", "62 – 75%", "72 – 83%", "78 – 87% 억제", "등속 구간의 안정적 추적 및 궤적 급변 시 최소 보정 사케이드"],
      ["초급 일반 단계 (상위 50%)", "48 – 61%", "60 – 71%", "65 – 77% 억제", "빈번한 타깃 이탈 및 캐치업 사케이드에 의한 단속적 추적"],
      ["기초 훈련 단계 (Baseline)", "48% 미만", "60% 미만", "65% 미만", "신경 반응 지연으로 인한 지속적 언더슈트 및 극심한 커서 떨림"]
    ],
    note: "신경안과학 및 안구운동 제어 문헌(Rashbass 1961; Krauzlis 2004; Leigh & Zee 2015; Lisberger 2010)에 기반한 객관적 평가 기준입니다."
  },
  techniques: {
    title: "에임 트래킹 정밀도를 극대화하는 4대 실전 원칙",
    items: [
      {
        name: "등가속도 위상 정합 (Smooth Acceleration Matching)",
        desc: "타깃의 위치를 뒤에서 쫓지 않고, 목표물의 이동 속도와 손가락-팔의 주행 속도를 일치시키는 감각을 익혀 망막 슬립을 지속적으로 0에 가깝게 유지합니다.",
        tips: "타깃의 외곽선이 아니라, 오버레이 중심부의 점을 중심와로 여유롭게 주시하며 따라가세요."
      },
      {
        name: "미세 도약 사케이드 억제 (Catch-up Saccade Suppression)",
        desc: "조준점이 타깃에서 살짝 벗어났을 때 급격하게 끌어치는 습관을 절제하고, 일정한 등속 운동을 유지하며 타깃 내부로 부드럽게 다시 합류시키는 훈련을 합니다.",
        tips: "손가락에 급격히 힘이 들어가면 조준점이 오버슈트됩니다. 항상 손목의 긴장을 푸는 것이 핵심입니다."
      },
      {
        name: "전완-손목 운동 사슬 분리 (Arm-Wrist Kinetic Decoupling)",
        desc: "넓은 반경의 연속 궤적은 팔꿈치를 축으로 하는 전완으로 지탱하고, 미세한 가감속 조정은 손목과 손가락이 담당하는 2단계 운동 사슬을 형성합니다.",
        tips: "손목을 마우스 패드에 너무 강하게 누르면 마찰력이 급증하여 부드러운 슬라이딩이 방해받습니다."
      },
      {
        name: "중심와 지속 고정 (Foveal Attentional Anchoring)",
        desc: "타깃이 급격히 회전하더라도 시야를 좁히지 않고, 중심와의 고해상도 초점과 주변시의 속도 감지 기능을 유기적으로 결합해 시각 앵커를 견고하게 유지합니다.",
        tips: "깜빡임을 억지로 참지 말고 자연스럽게 눈을 깜빡여 각막 표면의 눈물층을 균일하게 유지하세요."
      }
    ]
  },
  steps: [
    "시작 버튼을 누르고 화면 중앙에 대기하는 타깃 오버레이의 정중앙에 마우스 커서를 위치시킵니다.",
    "타깃이 이동을 시작하면 일정한 손목 힘과 속도를 유지하며 커서를 타깃 내부에 부드럽게 밀착시킵니다.",
    "급격한 방향 전환이나 속도 변화가 일어나더라도 시선을 놓치지 않고 완만한 손놀림으로 추적을 이어갑니다.",
    "45초 동안 타깃 밖으로 이탈하지 않고 유지한 총 시간 비율(Time on Target)을 측정합니다.",
    "최종 산출된 에임 트래킹 정확도와 평가 등급을 확인하고 일일 루틴 훈련으로 반복합니다."
  ],
  audience: "에이펙스 레전드, 오버워치, 발로란트, CS2에서 적의 무빙을 완벽하게 따라붙는 트래킹 에임을 완성하고 싶은 FPS 게이머, 야구·테니스·탁구 등에서 날아오는 공을 끝까지 주시해야 하는 운동선수, 그리고 전반적인 눈 운동 협응력을 향상시키고자 하는 모든 분.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('rashbass1961', 'krauzlis2004', 'leigh2015', 'lisberger2010', 'barnes2008', 'woods2015'),
  related: [
    { href: "/ko/drills/visual/tracking-accuracy/moving-target", label: "동체시력 테스트 (이동 타깃 요격)" },
    { href: "/ko/drills/visual/tracking-accuracy/multiple-targets", label: "다중 객체 추적 MOT 테스트" },
    { href: "/ko/drills/visual/visual-recognition/visual-search", label: "시각 탐색 검사 (주변시 스캐닝)" },
    { href: "/ko/drills/reaction-speed/visual-tracking-speed-test", label: "시각 추적 속도 테스트" }
  ]
};

export default function LocalizedPursuitTrackerKoPage() {
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

      <AutoPursuitClient copy={{ title: "에임 트래킹 테스트・안구 추적 훈련", subtitle: "스무스 퍼슈트 활동성 안구운동 정밀 검사" }} />
      <DrillGuide guide={guideData} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/ko/drills/visual/tracking-accuracy/pursuit-tracker" />
      </div>
    </>
  );
}
