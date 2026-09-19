import TriangularPursuitClient from '@/app/drills/visual-tracking/triangular-pursuit/TriangularPursuitClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "삼각형 안구 추적 훈련・다각형 에임 정밀도 테스트 | SkillDrills",
  description: "삼각형 기하 궤적을 순환하는 표적을 추적하여 3개 꼭짓점에서의 급격한 보정 단속운동과 선형 원활추종을 결합 훈련하는 안구 운동 드릴. 무료.",
  keywords: [
    "삼각형 안구 추적 훈련",
    "다각형 에임 연습",
    "꼭짓점 재포착 단속운동",
    "원활추종 급격한 방향전환",
    "대각선 시선 이동 훈련",
    "망막 미끄러짐 보정 에임",
    "동체시력 다각형 추적",
    "스포츠 비전 안구운동",
    "반응속도 눈 운동 테스트",
    "시기능 시각 반응 훈련",
    "삼각 궤적 시선 추종 연습",
    "온라인 동체시력 측정 드릴"
  ],
  openGraph: {
    title: "삼각형 안구 추적 훈련・다각형 에임 정밀도 테스트 | SkillDrills",
    description: "삼각형 기하 궤적을 순환하는 표적을 추적하여 3개 꼭짓점에서의 급격한 보정 단속운동과 선형 원활추종을 결합 훈련하는 안구 운동 드릴. 무료.",
    url: 'https://skilldrills.online/ko/drills/visual-tracking/triangular-pursuit',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "삼각형 안구 추적 훈련・다각형 에임 정밀도 테스트 | SkillDrills",
    description: "삼각형 기하 궤적을 순환하는 표적을 추적하여 3개 꼭짓점에서의 급격한 보정 단속운동과 선형 원활추종을 결합 훈련하는 안구 운동 드릴. 무료.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/visual-tracking/triangular-pursuit',
    languages: getAlternateLanguages('/drills/visual-tracking/triangular-pursuit'),
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
      "name": "시각 훈련 허브",
      "item": "https://skilldrills.online/ko/drills"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "시각 추적·원활추종",
      "item": "https://skilldrills.online/ko/drills/visual-tracking"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "삼각형 안구 추적 훈련",
      "item": "https://skilldrills.online/ko/drills/visual-tracking/triangular-pursuit"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "삼각형 안구 추적 훈련・다각형 에임 정밀도 테스트",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "삼각형 기하 궤적을 순환하는 표적을 추적하여 3개 꼭짓점에서의 급격한 보정 단속운동과 선형 원활추종을 결합 훈련하는 안구 운동 드릴.",
  "url": "https://skilldrills.online/ko/drills/visual-tracking/triangular-pursuit",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online"
  },
  "dateModified": "2026-09-15"
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "삼각형 안구 추적 훈련・다각형 에임 정밀도 테스트",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas 및 JavaScript 지원 브라우저",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/ko/drills/visual-tracking/triangular-pursuit",
  "dateModified": "2026-09-15"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "삼각형 안구 추적 훈련・다각형 에임 정밀도 테스트",
  "url": "https://skilldrills.online/ko/drills/visual-tracking/triangular-pursuit",
  "description": "삼각형 기하 궤적을 순환하는 표적을 추적하여 3개 꼭짓점에서의 급격한 보정 단속운동과 선형 원활추종을 결합 훈련하는 안구 운동 드릴.",
  "genre": [
    "액션",
    "동체시력 훈련",
    "에임 트레이너"
  ],
  "gamePlatform": [
    "Web Browser",
    "Desktop",
    "Mobile"
  ],
  "applicationCategory": "Game",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "삼각형 안구 추적 훈련 진행 방법",
  "description": "닫힌 삼각형 궤도 상에서 등속 대각선 원활추종과 3개 예각 꼭짓점에서의 보정 단속운동을 연동하여 안구 기하학적 추적 정밀도를 극대화하는 4단계.",
  "dateModified": "2026-09-15",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "기하학적 트래킹 옵션 구성",
      "text": "세션 진행 시간(30~120초), 표적의 기준 이동 속도 배율, 타깃 크기 및 색상을 지정합니다. 고난도 훈련을 위해 'Hide Line(궤적 숨김)' 옵션을 켤 수 있습니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/triangular-pursuit#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "대각선 선형 구간 등속 원활추종 형성",
      "text": "삼각형의 직선 변을 이동하는 표적을 중심와(fovea)로 지속 고정하며, 수평근과 수직 외안근의 대각선 벡터 방전을 매끄럽게 동기화합니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/triangular-pursuit#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "예각 꼭짓점 도달 시 예측 제동 및 보정 단속운동",
      "text": "60도 급선회 꼭짓점에 도달하는 순간, 시선이 바깥으로 튕겨 나가는 오버슈트를 억제하고 신속한 보정 단속운동으로 다음 변의 표적을 정확히 재포착합니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/triangular-pursuit#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "속도 배율 및 무작위 가속 부하 점진적 증대",
      "text": "코너 착지 오차가 안정화되면 속도 배율을 높이고, 'Random Speed'를 활성화하여 불규칙한 가감속 환경에서도 흔들리지 않는 안구 운동 제어력을 완성합니다.",
      "url": "https://skilldrills.online/ko/drills/visual-tracking/triangular-pursuit#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "삼각형 안구 추적 훈련(Triangular Pursuit)이란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "정삼각형의 닫힌 기하 궤적을 따라 순환하는 표적을 중심와로 추적하는 훈련입니다. 대각선 직선 구간에서의 부드러운 원활추종(Smooth Pursuit)과 3곳의 60도 예각 꼭짓점에서 발생하는 순간적인 보정 단속운동(Catch-up Saccade)을 정밀하게 결합 조율합니다 (de Brouwer et al., 2002)."
      }
    },
    {
      "@type": "Question",
      "name": "원형이나 단순 선형 추적보다 삼각형 등 다각형 궤적 추적이 왜 더 어려운가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "원형 추적은 곡률과 각속도가 연속적으로 서서히 변하지만, 삼각형 궤적은 등속 직선 운동과 꼭짓점에서의 불연속적이고 급격한 방향 전환이 번갈아 발생합니다. 뇌의 안구 운동 제어 시스템이 원활추종 모드에서 고속 단속운동 모드로 즉각 전환되어야 하므로 신경학적 처리 부하가 훨씬 높습니다 (Orban de Xivry & Lefèvre, 2007)."
      }
    },
    {
      "@type": "Question",
      "name": "대각선 방향 안구 운동은 뇌간과 소뇌에서 어떻게 조율되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "대각선 안구 운동은 뇌교의 수평 주시 중추(PPRF)와 중뇌의 수직 주시 중추(riMLF)가 동시에 정밀한 비율로 흥분 발화해야 합니다. 소뇌 소엽(flocculus)과 충부(vermis)가 이 직교 신호들을 실시간으로 합성하여 하나의 매끄러운 합성 대각선 벡터를 생성합니다."
      }
    },
    {
      "@type": "Question",
      "name": "꼭짓점을 돌 때 왜 시선이 꼭짓점을 지나치지 않고 안쪽으로 가로지르는(코너 숏컷) 현상이 발생하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "뇌의 운동 피질이 다음 궤적을 과도하게 예측하여 꼭짓점에 도달하기도 전에 조기 단속운동을 유발하기 때문입니다 (Bennett & Barnes, 2006). 이를 의식적으로 제어하여 표적이 꼭짓점에 닿는 순간까지 정확히 주시해야 외안근의 정밀한 위치 고정력과 기하학적 제동력이 형성됩니다."
      }
    },
    {
      "@type": "Question",
      "name": "꼭짓점에서 시선이 바깥으로 튕겨 나가는 오버슈트(Overshoot)의 원인과 해결책은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "직선 구간의 안구 관성과 약 100~150ms에 달하는 시각 피드백 지연으로 인해 뇌간의 제동 신호가 한 박자 늦기 때문입니다. 꼭짓점 진입 직전 표적의 움직임에 고도의 집중을 유지하고, 각도를 꺾기 직전 추종 이득을 미세하게 낮추는 예측적 감속 훈련을 통해 오버슈트를 없앨 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "FPS 게임(발로란트, 오버워치, 배틀그라운드 등) 에임 향상에 어떤 실질적 도움이 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "엄폐물 뒤에서 갑자기 튀어나오거나, 벽 점프 및 슬라이딩으로 각도를 꺾으며 이동하는 적을 조준선으로 추적할 때, 직선 트래킹에서 코너 급정지 및 방향 재전환 능력이 필수적입니다. 삼각형 훈련은 이 꺾임 지점에서의 조준선 흔들림을 없애 첫 탄 명중률을 비약적으로 높입니다."
      }
    },
    {
      "@type": "Question",
      "name": "구기 스포츠(스쿼시, 테니스, 축구 등)의 동체시력 강화에 어떻게 작용하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "벽이나 지면에 튕겨 급격한 각도로 굴절되는 공이나, 상대 선수의 날카로운 컷인 동작을 시야에서 놓치지 않게 합니다. 급격한 벡터 변화에도 시선이 뒤처지지 않고 단 한 번의 단속운동으로 공을 중심와에 재밀착시킬 수 있습니다 (Heinen et al., 2005)."
      }
    },
    {
      "@type": "Question",
      "name": "하루 권장 트레이닝 세션 및 루틴 구성은 어떻게 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1세트당 45~60초씩 2~3세트를 수행하여 하루 총 3~5분간 훈련하는 것을 권장합니다. 꼭짓점에서의 급격한 감속과 재포착은 외안근과 전두엽 신경 회로에 피로를 집중시키므로, 짧고 밀도 높은 집중 세션을 갖는 것이 가장 높은 적응 효과를 냅니다."
      }
    },
    {
      "@type": "Question",
      "name": "고주사율(144Hz/240Hz) 게이밍 모니터 환경이 왜 중요한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "60Hz(16.7ms 프레임 간격) 대비 144Hz(6.9ms), 240Hz(4.2ms)는 꼭짓점 선회 순간의 프레임 밀도를 대폭 높여 모션 블러와 궤적 양자화 지터를 제거합니다 (Woods et al., 2015). 이를 통해 정확한 시점에 제동 단속운동을 시작할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "꾸준한 다각형 안구 추적 훈련 시 소뇌와 시각 운동계에 일어나는 신경가소성 적응은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "소뇌 푸르키니에 세포(Purkinje cells)의 장기 억압(LTD)을 통해 내부 순모델(Internal Forward Model)의 시공간 연산 정확도가 향상됩니다 (Barnes, 2008). 표적이 급격히 방향을 바꿔도 망막 슬립 없이 단속운동 착지 오차가 제로에 수렴하게 됩니다."
      }
    }
  ]
};

const guide = {
  heading: "삼각형 안구 추적 훈련・다각형 에임 정밀도 테스트: 예각 선회와 제동 단속운동의 신경 적응",
  intro: [
    "삼각형과 같은 닫힌 기하 다각형 궤적을 따라 순환하는 시각 표적을 주시하는 과제는, 수평 및 수직 외안근군 간의 극도로 정밀한 동적 협응을 요구합니다. 정삼각형의 직선 변을 표적이 주행할 때 안구 운동 제어계는 대각선 방향의 원활추종(Smooth Pursuit)을 전개합니다. 이를 위해서는 뇌교의 수평 주시 회로(PPRF)와 중뇌의 수직 주시 회로(riMLF)가 밀리초 단위로 정확히 조율된 신경 방전을 방출하고, 소뇌 소엽에서 이를 합성해야 합니다 (Orban de Xivry & Lefèvre, 2007).",
    "이러한 운동 제어에서 가장 중대한 신경생리학적 과제는 삼각형의 예각 꼭짓점(60도 코너)에 표적이 도달하는 순간 발생합니다. 직선 주행에서 급격한 각도 전환이 일어날 때, 기존 주행 방향의 망막 슬립 속도는 급감하고 위치 오차(Position Error)는 폭발적으로 증가합니다. de Brouwer et al. (2002)과 Heinen et al. (2005)의 연구에 따르면, 이러한 불연속 지점에서는 전두안야(FEF) 및 보완안야(SEF)의 신경 회로가 가동되어 순간 슬립과 위치 오차를 종합 연산한 보정 단속운동(Catch-up Saccade)을 점화합니다.",
    "훈련되지 않은 일반인의 경우, 관성에 밀려 시선이 꼭짓점 바깥으로 튕겨 나가는 오버슈트(Overshoot)를 겪거나, 반대로 다음 경로를 성급하게 예측하여 꼭짓점 안쪽으로 시선을 가로지르는 숏컷(Cutting Corners) 현상이 발생합니다. 두 경우 모두 표적이 중심와를 벗어나며 수차례의 불안정한 교정 사케드가 뒤따릅니다. 그러나 지속적인 다각형 안구 운동 훈련을 진행하면 소뇌의 내부 순모델(Internal Forward Model)이 강화되어, 꼭짓점 직전에서 원활추종 속도를 선제적으로 감속시키고 전환 후 새로운 궤적 레그로 지체 없이 시선을 안착시키는 능력을 획득하게 됩니다 (Bennett & Barnes, 2006; Barnes, 2008).",
    "본 '삼각형 안구 추적(Triangular Pursuit)' 드릴은 이러한 기하학적 안구 민첩성을 웹 환경에서 체계적으로 단련하도록 설계되었습니다. 정삼각형 궤도를 회전하는 표적을 추적하며 직선 등속 추종과 3개 코너에서의 급감속·재가속 제어력을 동시에 극대화할 수 있습니다. 'Hide Line(궤적 숨김)' 모드를 켜면 안내선을 완전히 제거한 순수 감각운동 추종 능력을 테스트할 수 있으며, 'Random Speed'를 통해 기계적 타이밍 암기를 배제한 실전 적응 훈련이 가능합니다.",
    "하드웨어 지연 시간 및 측정 환경 안내: 화면 갱신 주기는 디스플레이 주사율(60Hz 기준 약 16.7ms, 144Hz 기준 약 6.9ms, 240Hz 기준 약 4.1ms) 및 입력 기기의 폴링 레이트(125Hz 기준 약 8ms 대 1,000Hz 기준 약 1ms)에 의해 시간적 양자화가 발생합니다 (Woods et al., 2015). 본 훈련의 모든 점수와 반응 데이터는 사용자의 브라우저 로컬 저장소(localStorage)에만 안전하게 보관되며 외부 서버로 전송되지 않습니다."
  ],
  benchmarks: {
    title: "삼각형 안구 추적 퍼포먼스 벤치마크 (속도 배율・꼭짓점 착지 오차)",
    headers: ["숙련도 등급", "권장 속도 배율", "꼭짓점 착지 오차", "꼭짓점 단속운동 잠복기", "예상 인구 백분위"],
    rows: [
      ["프로 / 기하 신경 완전 적응 (Elite)", "3.5x〜5.0x+", "오차 < 12px (꼭짓점에 완벽 흡착)", "잠복기 < 110ms (예측 감속 완벽)", "상위 1.5%"],
      ["마스터 / 고급 궤적 제어 (Master)", "2.5x〜3.5x", "오차 < 22px (미세 교정만 발생)", "잠복기 < 140ms (고정밀 코너링)", "상위 8%"],
      ["어드밴스 / 실전 숙련 (Advanced)", "1.8x〜2.5x", "오차 < 38px (신속한 재포착)", "잠복기 < 180ms (일반 선수급)", "상위 25%"],
      ["인터미디에이트 / 기초 (Intermediate)", "1.2x〜1.8x", "오차 38〜70px (안쪽 숏컷 및 오버슈트)", "잠복기 180〜240ms (복수 사케드 발생)", "중위 45%"],
      ["노비스 / 미훈련 (Novice)", "0.5x〜1.2x", "오차 > 70px (꼭짓점 완전 이탈)", "잠복기 > 250ms (심각한 오버슈트)", "입문 수준"]
    ],
    note: "벤치마크 기준은 de Brouwer et al. (2002)의 보정 단속운동 슬립 속도 분석 및 Heinen et al. (2005)의 예각 선회 안구 잠복기 연구 데이터를 기반으로 설정되었습니다."
  },
  techniques: [
    {
      title: "대각선 선형 구간에서의 수평・수직 외안근 벡터 균등 협응",
      description: "삼각형의 각 변을 대각선으로 이동할 때, 수평 직근과 수직 직근·사근이 완벽히 균등한 장력으로 동기화되어야 합니다. 한쪽 축으로 힘이 쏠리면 시선 궤적이 물결치며 중심와에서 표적이 이탈합니다.",
      tips: [
        "시선을 표적의 중심 또는 '진행 방향의 앞쪽 끝'에 고정하고 반듯한 선을 긋듯 이동",
        "목이나 고개를 기울이지 않고 오직 안구 근육만을 분리 제어(Eye Isolation)하는 연습",
        "직선 구간 주행 중에는 불필요한 깜빡임을 자제하여 시각 피드백의 연속성을 확보"
      ]
    },
    {
      title: "예각 꼭짓점 진입 전 예측 감속 및 오버슈트 제동 제어",
      description: "60도 코너를 돌기 직전, 소뇌의 브레이크 메커니즘을 작동시켜 원활추종 속도를 미세하게 감속합니다. 직선 관성에 휩쓸려 꼭짓점을 지나치는 오버슈트를 차단하는 핵심 테크닉입니다.",
      tips: [
        "꼭짓점 도달 30~50ms 전, 표적의 감속 조짐에 시각적 주의 집중을 극대화",
        "꼭짓점을 뚫고 나가지 않도록 '노드 위치에 시선을 잠깐 멈춘다'는 의식적 제동을 형성",
        "숨을 얇게 내쉬며 코너를 통과하여 목과 어깨의 불필요한 근긴장을 이완"
      ]
    },
    {
      title: "60도 방향 전환 시 보정 단속운동(Catch-up) 오차 최소화",
      description: "꼭짓점에서 방향이 꺾인 순간, 시선이 뒤처졌다면 여러 번 떨리는 사케드가 아니라 단 한 번의 빠르고 정확한 보정 단속운동으로 표적을 재포착해야 합니다.",
      tips: [
        "코너 선회 직후 '시선을 도약시켜 표적 정중앙에 내려놓는다'는 감각을 유지",
        "코너 안쪽을 성급하게 가로지르는 플라잉을 방지하고 꼭짓점 정점 통과를 확인 후 도약",
        "표적이 새로운 변의 궤도에 오르면 0.1초 이내에 다시 부드러운 원활추종 모드로 복귀"
      ]
    },
    {
      title: "Hide Line(궤적 숨김)을 통한 내재적 기하학 멘탈 모델 활성화",
      description: "시각 보조선이 보일 때는 감각적 의존도가 높아집니다. 설정에서 'Hide Line'을 켜서 보이지 않는 정삼각형의 3개 꼭짓점 좌표를 뇌 속에서 3차원적으로 재구성하며 추적하는 능력을 단련합니다.",
      tips: [
        "화면 모서리와 중앙 공간을 기준으로 가상의 삼각형 꼭짓점 3개를 마음속에 배치",
        "표적 속도로부터 '하나, 둘, 셋' 리듬 템포를 체득하여 박자에 맞춰 꼭짓점을 공략",
        "안내선 숨김 모드에서도 꼭짓점 착지 오차가 20px 이하로 유지될 때까지 반복 숙달"
      ]
    }
  ],
  deviceCalibration: {
    title: "다각형 추적 및 꼭짓점 단속운동을 위한 하드웨어・인체공학 기준",
    points: [
      "디스플레이 주사율: 60도 예각 선회 시의 프레임 왜곡과 시각 지터를 없애기 위해 144Hz 이상의 고주사율 모니터를 권장. 프레임 간격을 6.9ms 이하로 단축하여 정밀한 제동 시점을 시각화 (Woods et al., 2015).",
      "픽셀 응답 속도 및 잔상 제어: 코너 급회전 시 잔상(고스팅)이 발생하면 표적 중심점 착지 오차가 왜곡되므로 1ms 이하의 초고속 게이밍 패널을 권장.",
      "시야각 및 바른 자세 유지: 전체 화면이 수평 시야각 40도 내외에 들어오도록 50~65cm의 거리 유지. 삼각형 상단 꼭짓점을 올려다보지 않도록 모니터 상단을 눈높이에 맞춥니다.",
      "명암비와 실내 조명 세팅: 칠흑 배경(#050508)과 표적(#ef4444) 간의 명암 대비를 최대로 확보하고, 주변 조명을 은은하게 조절하여 망막의 피로도를 최소화."
    ]
  },
  faqs: [
    {
      "q": "삼각형 안구 추적 훈련(Triangular Pursuit)이란 무엇인가요?",
      "a": "정삼각형의 닫힌 기하 궤적을 따라 순환하는 표적을 중심와로 추적하는 훈련입니다. 대각선 직선 구간에서의 부드러운 원활추종(Smooth Pursuit)과 3곳의 60도 예각 꼭짓점에서 발생하는 순간적인 보정 단속운동(Catch-up Saccade)을 정밀하게 결합 조율합니다 (de Brouwer et al., 2002)."
    },
    {
      "q": "원형이나 단순 선형 추적보다 삼각형 등 다각형 궤적 추적이 왜 더 어려운가요?",
      "a": "원형 추적은 곡률과 각속도가 연속적으로 서서히 변하지만, 삼각형 궤적은 등속 직선 운동과 꼭짓점에서의 불연속적이고 급격한 방향 전환이 번갈아 발생합니다. 뇌의 안구 운동 제어 시스템이 원활추종 모드에서 고속 단속운동 모드로 즉각 전환되어야 하므로 신경학적 처리 부하가 훨씬 높습니다 (Orban de Xivry & Lefèvre, 2007)."
    },
    {
      "q": "대각선 방향 안구 운동은 뇌간과 소뇌에서 어떻게 조율되나요?",
      "a": "대각선 안구 운동은 뇌교의 수평 주시 중추(PPRF)와 중뇌의 수직 주시 중추(riMLF)가 동시에 정밀한 비율로 흥분 발화해야 합니다. 소뇌 소엽(flocculus)과 충부(vermis)가 이 직교 신호들을 실시간으로 합성하여 하나의 매끄러운 합성 대각선 벡터를 생성합니다."
    },
    {
      "q": "꼭짓점을 돌 때 왜 시선이 꼭짓점을 지나치지 않고 안쪽으로 가로지르는(코너 숏컷) 현상이 발생하나요?",
      "a": "뇌의 운동 피질이 다음 궤적을 과도하게 예측하여 꼭짓점에 도달하기도 전에 조기 단속운동을 유발하기 때문입니다 (Bennett & Barnes, 2006). 이를 의식적으로 제어하여 표적이 꼭짓점에 닿는 순간까지 정확히 주시해야 외안근의 정밀한 위치 고정력과 기하학적 제동력이 형성됩니다."
    },
    {
      "q": "꼭짓점에서 시선이 바깥으로 튕겨 나가는 오버슈트(Overshoot)의 원인과 해결책은?",
      "a": "직선 구간의 안구 관성과 약 100~150ms에 달하는 시각 피드백 지연으로 인해 뇌간의 제동 신호가 한 박자 늦기 때문입니다. 꼭짓점 진입 직전 표적의 움직임에 고도의 집중을 유지하고, 각도를 꺾기 직전 추종 이득을 미세하게 낮추는 예측적 감속 훈련을 통해 오버슈트를 없앨 수 있습니다."
    },
    {
      "q": "FPS 게임(발로란트, 오버워치, 배틀그라운드 등) 에임 향상에 어떤 실질적 도움이 되나요?",
      "a": "엄폐물 뒤에서 갑자기 튀어나오거나, 벽 점프 및 슬라이딩으로 각도를 꺾으며 이동하는 적을 조준선으로 추적할 때, 직선 트래킹에서 코너 급정지 및 방향 재전환 능력이 필수적입니다. 삼각형 훈련은 이 꺾임 지점에서의 조준선 흔들림을 없애 첫 탄 명중률을 비약적으로 높입니다."
    },
    {
      "q": "구기 스포츠(스쿼시, 테니스, 축구 등)의 동체시력 강화에 어떻게 작용하나요?",
      "a": "벽이나 지면에 튕겨 급격한 각도로 굴절되는 공이나, 상대 선수의 날카로운 컷인 동작을 시야에서 놓치지 않게 합니다. 급격한 벡터 변화에도 시선이 뒤처지지 않고 단 한 번의 단속운동으로 공을 중심와에 재밀착시킬 수 있습니다 (Heinen et al., 2005)."
    },
    {
      "q": "하루 권장 트레이닝 세션 및 루틴 구성은 어떻게 되나요?",
      "a": "1세트당 45~60초씩 2~3세트를 수행하여 하루 총 3~5분간 훈련하는 것을 권장합니다. 꼭짓점에서의 급격한 감속과 재포착은 외안근과 전두엽 신경 회로에 피로를 집중시키므로, 짧고 밀도 높은 집중 세션을 갖는 것이 가장 높은 적응 효과를 냅니다."
    },
    {
      "q": "고주사율(144Hz/240Hz) 게이밍 모니터 환경이 왜 중요한가요?",
      "a": "60Hz(16.7ms 프레임 간격) 대비 144Hz(6.9ms), 240Hz(4.2ms)는 꼭짓점 선회 순간의 프레임 밀도를 대폭 높여 모션 블러와 궤적 양자화 지터를 제거합니다 (Woods et al., 2015). 이를 통해 정확한 시점에 제동 단속운동을 시작할 수 있습니다."
    },
    {
      "q": "꾸준한 다각형 안구 추적 훈련 시 소뇌와 시각 운동계에 일어나는 신경가소성 적응은 무엇인가요?",
      "a": "소뇌 푸르키니에 세포(Purkinje cells)의 장기 억압(LTD)을 통해 내부 순모델(Internal Forward Model)의 시공간 연산 정확도가 향상됩니다 (Barnes, 2008). 표적이 급격히 방향을 바꿔도 망막 슬립 없이 단속운동 착지 오차가 제로에 수렴하게 됩니다."
    }
  ],
  sources: pickSources('debrouwer2002', 'heinen2005', 'orbandexivry2007', 'bennett2006', 'barnes2008', 'woods2015'),
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

      <TriangularPursuitClient copy={{
        title: "삼각형 안구 추적 훈련 (다각형 예각 트래킹)",
        subtitle: "3개 꼭짓점 급선회・직선 원활추종과 보정 단속운동 통합 훈련",
        description: "정삼각형 기하학적 궤적을 순환하는 표적을 주시하며, 대각선 선형 구간의 등속 원활추종과 3개 예각(60도) 꼭짓점에서의 순간적인 보정 단속운동(Catch-up Saccade)을 연동 훈련하는 고급 안구 운동 드릴입니다. 각속도 급변에 대한 소뇌의 순모델 제어력과 꼭짓점에서의 오버슈트 억제력을 극대화합니다 (de Brouwer et al., 2002; Orban de Xivry & Lefèvre, 2007)."
      }} />
      <DrillGuide guide={guide} />
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual-tracking" currentHref="https://skilldrills.online/ko/drills/visual-tracking/triangular-pursuit" />
      </div>
    </>
  );
}
