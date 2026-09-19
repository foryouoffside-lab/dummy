import TargetPrioritizationClient from '@/app/drills/fps/target-prioritization/TargetPrioritizationClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import RelatedDrills from '@/components/drill/RelatedDrills';
import DrillFooter from '@/components/drill/DrillFooter';

export const metadata = {
  title: "타겟 우선순위 에임 연습 – 위협 평가 트레이너 | SkillDrills",
  description: "무료 브라우저 타겟 우선순위 에임 트레이너. 다중 목표 교전 상황에서의 위협 평가, 시각적 주의 필터링, 아군 오사 방지를 위한 반응 억제(Go/No-Go)를 과학적으로 훈련합니다.",
  keywords: [
    "타겟 우선순위 에임",
    "타겟 식별 에임",
    "타겟 우선순위 에임 연습",
    "위협 평가 연습",
    "FPS 위협 판단",
    "발로란트 타겟 우선순위",
    "CS2 타겟 셀렉션",
    "사격 억제 훈련",
    "아군 오사 방지 연습",
    "적군 식별 사격",
    "무료 에임 트레이너",
    "FPS 타겟 식별 트레이너"
  ],
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/fps/target-prioritization",
    languages: getAlternateLanguages('/drills/fps/target-prioritization'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "타겟 우선순위 에임 연습 – 위협 평가 트레이너 | SkillDrills",
    description: "다중 목표 교전에서의 위협 평가 속도, 시각적 방해물 억제, 정밀한 반응 억제 제어를 훈련하는 무료 브라우저 FPS 에임 트레이너.",
    url: "https://skilldrills.online/ko/drills/fps/target-prioritization",
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "타겟 우선순위 에임 연습 – 위협 평가 트레이너 | SkillDrills",
    description: "다중 목표 교전에서의 위협 평가 속도, 시각적 방해물 억제, 정밀한 반응 억제 제어를 훈련하는 무료 브라우저 FPS 에임 트레이너.",
  },
};

export default function TargetPrioritizationKoPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ko" },
      { "@type": "ListItem", "position": 2, "name": "FPS 에임 훈련", "item": "https://skilldrills.online/ko/drills/fps" },
      { "@type": "ListItem", "position": 3, "name": "타겟 우선순위", "item": "https://skilldrills.online/ko/drills/fps/target-prioritization" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "타겟 우선순위 에임 연습",
    "applicationCategory": "GameApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "난전 상황에서의 신속한 위협 평가, 아군 오사 방지, 우선순위 타겟 격파 능력을 극대화하는 무료 브라우저 FPS 에임 트레이너.",
    "genre": "FPS Training / Target Prioritization",
    "url": "https://skilldrills.online/ko/drills/fps/target-prioritization",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "타겟 우선순위 에임 연습",
    "url": "https://skilldrills.online/ko/drills/fps/target-prioritization",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript and HTML5 Canvas support",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "난전 상황에서의 신속한 위협 평가, 아군 오사 방지, 우선순위 타겟 격파 능력을 극대화하는 무료 브라우저 FPS 에임 트레이너."
  };

  const videoGameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": "타겟 우선순위 에임 연습",
    "url": "https://skilldrills.online/ko/drills/fps/target-prioritization",
    "description": "난전 상황에서의 신속한 위협 평가, 아군 오사 방지, 우선순위 타겟 격파 능력을 극대화하는 무료 브라우저 FPS 에임 트레이너.",
    "dateModified": "2026-09-05",
    "gamePlatform": "Web Browser",
    "genre": ["FPS Training", "Aim Trainer", "Target Prioritization"],
    "playMode": "SinglePlayer",
    "applicationCategory": "Game",
    "operatingSystem": "Web Browser",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-05",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "경쟁전 FPS에서 '타겟 우선순위(Target Prioritization)'란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "타겟 우선순위는 화면에 여러 명의 적과 오브젝트가 동시에 등장했을 때 위협의 시급성, 위험도, 적의 역할을 신속히 평가하여 가장 치명적인 대상부터 순서대로 타격하는 인지적 판단 과정입니다."
        }
      },
      {
        "@type": "Question",
        "name": "한타 교전에서 왜 패닉 사격을 하며 엉뚱한 대상을 쏘게 되나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "시각 정보의 과부하와 급격한 교전 스트레스로 인해 전두엽의 반응 억제 기능이 저하되기 때문입니다. 훈련되지 않은 유저는 가장 위험한 적 대신 화면에서 가장 크게 움직이거나 가까운 오브젝트에 무의식적으로 반응하게 됩니다."
        }
      },
      {
        "@type": "Question",
        "name": "전술 슈팅 게임에서의 'Go/No-Go' 인지 패러다임이란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Go/No-Go 과제는 특정 위협 자극(적)에는 즉시 방아쇠를 당기고(Go), 아군이나 디코이 같은 비위협 자극에는 사격 충동을 즉각 억제하는(No-Go) 신경심리학적 테스트입니다. 실전 오사 방지와 침착한 샷의 기초가 됩니다."
        }
      },
      {
        "@type": "Question",
        "name": "FPS 게임에서 정지 신호 반응 시간(SSRT: Stop-Signal Reaction Time)이란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SSRT는 이미 시작되었거나 준비된 운동 동작(마우스 클릭 등)을 중간에 취소하는 데 걸리는 시간입니다. Logan & Cowan(1984)의 경주 모델에 따르면, SSRT가 짧을수록 돌발 상황에서 사격을 번개처럼 취소하고 안전을 확보할 수 있습니다."
        }
      },
      {
        "@type": "Question",
        "name": "프로 선수들은 적들이 사이트로 진입할 때 다중 타겟의 위협 순위를 어떻게 정하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "프로들은 ①자신을 직접 조준하고 있는 적, ②사격 중인 딜러/엔트리, ③스킬을 전개 중인 서포터 순서로 찰나의 순간에 트리아지(위협 분류)를 완료하여 피격 피해를 최소화하며 각개격파합니다."
        }
      },
      {
        "@type": "Question",
        "name": "시각 인지 과학에서의 '방해물 억제(Distractor Suppression)'란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "주의를 기울일 필요가 없는 디코이, 아군, 주변 이펙트 등의 비위협 시각 자극을 뇌에서 능동적으로 무시하는 메커니즘입니다. 이를 통해 소중한 인지 자원을 진짜 적에게만 집중할 수 있습니다."
        }
      },
      {
        "@type": "Question",
        "name": "발로란트나 CS2에서 아군이나 디코이에 헛사격하면 라운드 승률에 어떤 영향을 주나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "헛사격은 탄약과 시간을 소모할 뿐 아니라 반동 회복 딜레이를 유발하여 진짜 적에게 먼저 제압당하게 만들며, 특히 1vX 클러치 상황에서 라운드 승률을 치명적으로 떨어뜨립니다."
        }
      },
      {
        "@type": "Question",
        "name": "마우스 감도는 타겟 선택과 위협 전환에 어떤 영향을 미치나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "지나치게 높은 감도는 미세한 조준 정지와 억제 제동을 어렵게 만들고, 너무 낮은 감도는 먼 거리의 위협 목표로 전환하는 속도를 늦춥니다. 정밀하게 플릭을 멈출 수 있는 최적의 감도를 유지해야 합니다."
        }
      },
      {
        "@type": "Question",
        "name": "아드레날린 분비가 전술적 판단 속도를 왜 저하시키나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "극도의 긴장은 시야가 좁아지는 '터널 비전' 현상을 일으키고 주변 상황 파악과 다각적 판단을 관장하는 전두엽 기능을 억제하여, 충동적인 패닉 사격을 유발합니다."
        }
      },
      {
        "@type": "Question",
        "name": "타겟 우선순위 훈련은 얼마나 자주 해야 하나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "주 4~5회, 회당 10~15분의 집중 세션이 가장 이상적입니다. 짧고 밀도 높은 인지 훈련을 반복하면 실전의 극한 긴장 속에서도 무의식적으로 자동화된 위협 판단을 실행하게 됩니다."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "타겟 우선순위 및 위협 평가 훈련 단계",
    "description": "신속한 위협 판별, 방해물 억제, 사격 충동 제어를 숙달하기 위한 4단계 가이드.",
        "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "입력 감도 캘리브레이션",
        "text": "세션 설정에서 사용하는 DPI와 인게임 감도를 완벽히 일치시켜 1:1 하드웨어 머슬 메모리를 보존합니다.",
        "url": "https://skilldrills.online/ko/drills/fps/target-prioritization#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "최우선 빨간색(고위협) 타겟 즉각 포착",
        "text": "스폰 영역 전체를 빠르게 스캔하여 타이머 만료 전 활성화된 빨간색 타겟을 최우선으로 격파합니다.",
        "url": "https://skilldrills.online/ko/drills/fps/target-prioritization#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "중위협(노란색) 타겟으로의 신속한 전환",
        "text": "급박한 빨간색 목표를 제거한 직후, 빨간색으로 승격하기 전에 노란색 타겟으로 조준을 빠르게 이동합니다.",
        "url": "https://skilldrills.online/ko/drills/fps/target-prioritization#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "아군(초록색) 유닛에 대한 사격 충동 억제",
        "text": "초록색 아군 유닛을 향해서는 운동 억제력을 발휘하여 사격을 철저히 보류하고 콤보와 시간을 지킵니다.",
        "url": "https://skilldrills.online/ko/drills/fps/target-prioritization#step-4"
      }
    ]
  };

  const targetPrioritizationGuide = {
    heading: "타겟 우선순위 에임 트레이너 실전 가이드",
    subtitle: "난전 상황에서의 위협 평가 속도, 방해 자극 억제, 그리고 냉철한 사격 충동 제어를 완성하는 과학적 방법론",
    intro: [
      "타겟 우선순위(Target Prioritization) 에임 트레이너는 찰나의 순간에 전술적 위협도를 평가하고, 시각적 방해 요소를 필터링하며, 충동적인 격발을 제어하는 운동 억제 능력을 완성하는 고급 지각-인지 에임 드릴입니다. 발로란트, 카운터-스트라이크 2, 레인보우 식스 시즈, 에이펙스 레전드와 같은 정밀 전술 FPS에서는 클러치 승리 여부가 단순한 물리적 플릭 속도뿐 아니라 목표 선정 능력에 의해 좌우됩니다. 다수의 적과 아군이 뒤엉킨 혼전에서 어떤 대상을 가장 먼저 격파하고, 우선순위가 낮은 방해물이나 아군에 대한 사격을 침착하게 억제하는지가 라운드의 성패를 가릅니다.",
      "운동 억제와 의사결정 통제의 신경학적 기반은 Logan and Cowan(1984)의 정지 신호 패러다임(Stop-Signal Paradigm)으로 설명됩니다. 그들의 연구에 따르면 인간의 행동 실행(Go 프로세스)과 행동 억제(Stop 프로세스)는 전두엽-기저핵 네트워크에서 두 마리의 말이 결승선을 향해 달리는 '경주 모델(Horse-Race Model)'처럼 상호 독립적으로 속도 경쟁을 벌입니다. 사격 억제 훈련을 받지 않은 플레이어는 위협 수준을 검증하기도 전에 검지 손가락을 까딱이는 패닉 사격을 범하게 됩니다.",
      "선택적 시각 필터링 기전은 Donald E. Broadbent(1958)와 Anne Treisman(1964)의 초기 여과 및 감쇄 모델로 정립되었습니다. 여러 시각 자극이 망막의 인지 자원을 두고 경쟁할 때, 뇌는 하향식 주의 게이팅(Top-Down Attentional Gating; Posner & Petersen, 1990)을 작동시켜 비위협적인 아군 및 배경 무빙을 주변시에서 걸러내고 가장 치명적인 위협 벡터에 중심와 시각을 집중시킵니다.",
      "본 드릴은 F.C. Donders(1868)의 Go/No-Go 식별 반응시간 모델에 performance.now() 디지털 정밀 크로노메트리(Woods et al., 2015)를 결합하여, 단순한 마우스 조준 감각과 실전 교전 압박 하에서의 즉각적인 전술적 의사결정 속도를 하나로 연결합니다.",
      "측정 기준 및 하드웨어 지연 시간 안내: 모든 판정 이벤트는 브라우저 내장 performance.now() 고해상도 시계를 통해 로컬 기기 내에서만 정밀 측정되며 외부 서버로 데이터가 전송되지 않습니다. 브라우저 타이머는 스펙터(Spectre) 완화 조치로 약 1ms 단위로 양자화되며, 모니터 디스플레이는 주사율에 맞춰 시각 프레임을 양자화합니다(60Hz=약 16.7ms, 144Hz=약 6.9ms, 240Hz=약 4.1ms, Woods et al., 2015). 마우스 폴링레이트는 125Hz에서 약 8ms, 1000Hz에서 약 1ms의 지연 편차를 추가합니다. 따라서 약 5ms 미만의 차이는 기술적 측정 노이즈로 간주되며, 타인의 장비와 단순 비교하기보다는 동일한 하드웨어 환경에서 본인의 지연 시간 및 억제 성공률 개선도를 추적하십시오."
    ],
    benchmarks: {
      title: "타겟 우선순위 및 위협 평가 레이턴시 벤치마크 기준",
      headers: ["스킬 티어", "위협 평가 반응시간", "사격 억제 성공률 (No-Go)", "실전 인게임 교전 영향"],
      rows: [
        ["Tier 1 (프로 / 레디언트급)", "280 ms 미만", "98% – 100%", "완벽하고 즉각적인 위협 트리아지; 아군 오사 0%로 다중 러시 단독 제압"],
        ["Tier 2 (불멸 / 마스터급)", "280 – 340 ms", "92% – 98%", "우수한 전술적 판단력; 혼전 속에서도 최고 위협 적에게 단번에 초탄 적중"],
        ["Tier 3 (다이아 / 초월자급)", "340 – 420 ms", "85% – 92%", "안정적인 타겟 선별; 복잡한 다중 교전 시 50ms 수준의 미세한 판단 지체"],
        ["Tier 4 (골드 / 플래티넘급)", "420 – 520 ms", "75% – 85%", "가장 가까운 적에게 시선이 쏠려 후방의 고위협 딜러에게 반격 허용"],
        ["Tier 5 (실버 이하 초심자)", "520 ms 이상", "75% 미만", "빈번한 패닉 사격; 아군이나 디코이에 헛방을 쏘며 잦은 데스 발생"]
      ],
      note: "위협 평가 반응시간은 타겟 스폰 순간부터 올바른 고위협 목표에 유효 사격이 들어갈 때까지의 시간입니다(Woods et al., 2015)."
    },
    techniques: {
      title: "타겟 우선순위를 극대화하는 실전 테크닉",
      items: [
        {
          name: "Go/No-Go 사격 억제 신경 회로 강화",
          desc: "적과 아군의 색상을 반사적으로 판별하여, 초록색 유닛을 포착하는 순간 검지 손가락의 클릭 동작을 급제동하는 통제력을 기릅니다(Logan & Cowan, 1984).",
          tips: "초록 유닛이 보이면 무리하게 조준을 꺾지 말고 조준선이 그냥 스쳐 지나가게 두는 연습을 반복하세요."
        },
        {
          name: "시야 전체 위협 트리아지 (우선순위 선별)",
          desc: "시야 내 목표를 하나씩 훑지 않고, 빨강(긴급)→노랑(준긴급) 순서를 무의식적으로 정렬하는 전주의적 필터를 가동합니다(Treisman & Gelade, 1980).",
          tips: "빨간색 타겟이 남아있는 동안에는 아무리 가까이 다른 타겟이 있어도 빨간색 외에는 마우스를 주지 마세요."
        },
        {
          name: "방해 자극 (아군 / 디코이) 능동 억제",
          desc: "비위협 시각 신호를 뇌에서 적극적으로 무시하는 필터링 역량을 길러 인지 자원의 낭비를 방지합니다(Posner, 1990).",
          tips: "아군의 갑작스러운 움직임에 시선이 뺏기려 할 때마다 중앙 시야를 이완하며 냉정함을 유지하세요."
        },
        {
          name: "종단 브레이킹과 번개 같은 타겟 전환",
          desc: "빨간색 목표 격파 후 패드 마찰력을 활용하여 불필요한 오버슈트 없이 다음 노란색 타겟으로 예리하게 플릭합니다.",
          tips: "타겟이 파괴되는 순간 눈(사카드)을 다음 목표 좌표로 0.05초 먼저 이동시키세요."
        }
      ]
    },
    steps: [
      "인게임 감도를 확인하고 포인터 락을 활성화하여 훈련을 시작합니다.",
      "스폰되는 다중 타겟 중에서 최우선 목표인 '빨간색(고위협)'을 순간 포착합니다.",
      "빨간색 타겟을 신속히 플릭 사격하여 +100점(+0.4초 추가 시간)을 획득합니다.",
      "이어서 '노란색(중위협)'을 타격하여 빨간색으로 위험도가 승격하는 것을 차단합니다.",
      "초록색(아군) 유닛에 대한 사격은 철저히 억제하여 높은 정확도와 콤보 배율을 사수하세요."
    ],
    audience: "발로란트, 오버워치 2, 카운터스트라이크 2, 에이펙스 레전드에서 한타 난전 시 침착하게 우선순위 타겟을 식별하고 제압하고자 하는 모든 FPS 게이머.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    sources: pickSources('woods2015', 'posner1990', 'green2003', 'donders1969', 'treisman1980', 'logan1984'),
    related: [
      { href: "/ko/drills/fps/target-acquisition", label: "타겟 획득 에임 연습" },
      { href: "/ko/drills/fps/target-switching-swarm", label: "타겟 스위칭 에임 연습" },
      { href: "/ko/drills/fps/vertical-air-track", label: "수직 에임 트래킹 연습" },
      { href: "/ko/drills/fps/strafe-tracking", label: "스트레이프 트래킹 연습" },
      { href: "/ko/drills/fps/flick-shot-training", label: "플릭샷 에임 연습" }
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
      <TargetPrioritizationClient
        copy={{
          h1Keyword: "타겟 우선순위 에임 연습",
          h1Suffix: " - 위협 평가 & 사격 억제 트레이너",
          subtitle: "실시간 피드백으로 다중 위협 평가, 시각적 인지 필터링, 사격 반응 억제 능력을 훈련하세요.",
          statScore: "점수",
          statTime: "남은 시간",
          statAccuracy: "정확도",
          statBestScore: "최고 점수",
          statThreatsCleared: "격파한 위협",
          statMaxCombo: "최대 콤보",
          statPeakLevel: "최고 레벨",
          startTitle: "타겟 우선순위",
          startSubtitle: "위협 평가 & 인지 필터링 • 무한 레벨 난이도 진행",
          getReady: "준비",
          toggleFlash: "미스 플래시 켜기/끄기",
          toggleSound: "효과음 켜기/끄기",
          pausedTitle: "일시 정지됨",
          pausedSubtitle: "클릭하여 계속하기 — 마우스 커서 락이 다시 활성화됩니다.",
          stageCaption: "최고 위협인 붉은색 타겟을 최우선 사격하고 노란색 타겟을 처리하세요. 아군(초록색)은 절대 사격하지 마세요.",
          rulesTitle: "훈련 규칙 및 점수 산정 방식",
          rulesItems: [
            { num: "1", text: "고위협 타겟", highlight: "빨강 (+100점 / +0.4초)", result: "최우선 격파" },
            { num: "2", text: "중위협 타겟", highlight: "노랑 (+50점 / +0.4초)", result: "시간 만료 시 빨강 승격" },
            { num: "3", text: "아군 유닛", highlight: "초록 (사격 금지)", result: "오사/미스 시 콤보 초기화" },
            { num: "4", text: "레벨 상승", highlight: "+1 / 1400점", result: "밀도 및 속도 지속 증가" }
          ],
          aboutTitle: "타겟 우선순위 에임 트레이너 소개",
          aboutHeading: "타겟 우선순위(Target Prioritization)란?",
          aboutText: "타겟 우선순위는 시야 내 다수의 목표 중 위협 긴급도에 따라 사격할 대상을 즉시 선별하고, 동시에 아군이나 방해물에 대한 사격을 억제하는 고차원 인지-운동 능력입니다. 이미 시작된 동작을 멈추는 억제 통제는 별도의 뇌 신경 레이스 모델(Logan & Cowan, 1984)에 의해 작동하므로, 방아쇠를 당기는 것보다 멈추는 훈련이 더욱 필수적입니다."
        }}
      />
      <DrillGuide guide={targetPrioritizationGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="fps"
          currentHref="/drills/fps/target-prioritization"
          locale="ko"
        />
      </div>
      <DrillFooter />
    </>
  );
}
