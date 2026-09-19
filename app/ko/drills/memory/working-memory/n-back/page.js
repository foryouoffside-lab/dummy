import NBackClient from '@/app/drills/memory/working-memory/n-back/NBackClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — ko-KR (n-back)
// PRIMARY:  "n-back 연습 사이트"          — High intent Korean search (15 Google suggestions)
//           "n-back 게임"                 — High volume query
//           "n-back"                      — Base query
// SECONDARY / LSI:
//           "n-back 게임 연습 사이트"     — Long-tail high conversion query
//           "n-back 훈련"                 — Practice query
//           "듀얼 n-back"                 — Dual N-back query
//           "작업기억 훈련"               — Cognitive domain query
// ============================================================

export const metadata = {
  title: "N-Back 게임・작업기억 훈련 도구 – 듀얼 N-Back | SkillDrills",
  description: "무료 온라인 N-Back 게임 및 연습 사이트. 연속 제시되는 문자 자극이 N단계 전과 일치하는지 판별하여 작업기억(Working Memory) 용량 갱신 능력과 유동성 지능을 뇌과학적으로 훈련하세요.",
  keywords: ['n-back 연습 사이트', 'n-back 게임', 'n-back 게임 연습 사이트', '작업기억 훈련', '듀얼 n-back', 'n백 테스트', '작업기억력 테스트', '유동성 지능 훈련', '두뇌 인지 훈련', '작업기억 갱신', '집중력 기억력 검사', 'n-back 온라인'],
  openGraph: {
    title: "N-Back 게임 및 연습 사이트 - 무료 작업기억 훈련 도구 | SkillDrills",
    description: "무료 온라인 N-Back 게임 및 연습 사이트. 연속 제시되는 문자 자극이 N단계 전과 일치하는지 판별하여 작업기억(Working Memory) 용량 갱신 능력과 유동성 지능을 뇌과학적으로 훈련하세요.",
    type: "website",
    url: "https://skilldrills.online/ko/drills/memory/working-memory/n-back",
    siteName: "SkillDrills",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "N-Back 게임 및 연습 사이트 - 무료 작업기억 훈련 도구 | SkillDrills",
    description: "무료 온라인 N-Back 게임 및 연습 사이트. 연속 제시되는 문자 자극이 N단계 전과 일치하는지 판별하여 작업기억(Working Memory) 용량 갱신 능력과 유동성 지능을 뇌과학적으로 훈련하세요.",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/ko/drills/memory/working-memory/n-back",
    languages: getAlternateLanguages('/drills/memory/working-memory/n-back'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
    { "@type": "ListItem", "position": 2, "name": "기억력 훈련", "item": "https://skilldrills.online/ko/drills/memory" },
    { "@type": "ListItem", "position": 3, "name": "작업기억", "item": "https://skilldrills.online/ko/drills/memory/working-memory" },
    { "@type": "ListItem", "position": 4, "name": "N-Back 게임 및 연습 사이트", "item": "https://skilldrills.online/ko/drills/memory/working-memory/n-back" }
  ]
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "N-Back 게임 및 연습 사이트 (작업기억 훈련)",
  "url": "https://skilldrills.online/ko/drills/memory/working-memory/n-back",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "isAccessibleForFree": true,
  "dateModified": "2026-09-11",
  "educationalUse": ["작업기억 용량", "연속 정보 갱신", "실행 제어 기능", "유동성 지능"]
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "N-Back 게임 – 무료 온라인 두뇌 트레이닝",
  "url": "https://skilldrills.online/ko/drills/memory/working-memory/n-back",
  "description": "연속 출력되는 문자가 N단계 전과 일치하는지 순간 판별하는 무료 브라우저 N-Back 게임 도구.",
  "dateModified": "2026-09-11",
  "gamePlatform": "Web Browser",
  "genre": ["Cognitive Training", "Working Memory", "Brain Training", "N-Back"],
  "playMode": "SinglePlayer",
  "applicationCategory": "Game",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};


const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "N-백 작업기억 테스트 (N-Back)",
  "url": "https://skilldrills.online/ko/drills/memory/working-memory/n-back",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "dateModified": "2026-09-11",
  "author": { "@type": "Organization", "name": "SkillDrills" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "N-Back 과제로 작업기억 갱신 능력을 훈련하는 4단계 방법",
  "description": "인지신경과학에 기반한 N-Back 과제 연속 갱신 및 실행 제어 실전 훈련 프로토콜.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "url": "https://skilldrills.online/ko/drills/memory/working-memory/n-back#step-1",
      
      "name": "내적 시연을 통해 회전 큐(FIFO) 버퍼 유지",
      "text": "제시되는 문자들을 머릿속으로 리드미컬하게 시연(음운 루프 활용)하며 최근 N개의 문자를 순서대로 유지합니다."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "url": "https://skilldrills.online/ko/drills/memory/working-memory/n-back#step-2",
      
      "name": "현재 자극과 정확히 N단계 전 자극 즉시 대조",
      "text": "새로운 문자가 화면에 나타나는 즉시, 활성 버퍼에서 가장 오래된 항목(정확히 N단계 전 문자)과 일치 여부를 대조합니다."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "url": "https://skilldrills.online/ko/drills/memory/working-memory/n-back#step-3",
      
      "name": "가장 오래된 항목을 방출하고 새 문자 갱신",
      "text": "판정 직후 가장 오래된 문자를 초점 주의에서 지우고, 방금 나타난 새 문자를 큐의 맨 앞에 밀어 넣어 작업기억을 업데이트합니다."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "url": "https://skilldrills.online/ko/drills/memory/working-memory/n-back#step-4",
      
      "name": "판정 오류에 머무르지 않고 일정한 주의 리듬 유지",
      "text": "실수를 자책하며 멈칫하면 후속 버퍼가 연쇄 붕괴합니다. 순서를 놓쳤다면 즉시 다음 문자를 1단계로 삼아 버퍼를 신속하게 재구축하세요."
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "N-Back 검사(과제)란 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "N-Back 과제는 인지신경과학에서 작업기억의 연속 갱신(Updating)과 실행 제어 능력을 평가하는 대표적인 표준 인지 패러다임입니다. 연속적으로 나타나는 자극 스트림을 관찰하며 현재 자극이 정확히 N단계 전에 제시된 것과 일치하는지 판별합니다."
      }
    },
    {
      "@type": "Question",
      "name": "N-Back 과제는 누가 언제 개발했나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1958년 심리학자 웨인 K. 커슈너(Wayne K. Kirchner)가 급변하는 동적 정보의 단기 파지 능력에서 나타나는 연령별 차이를 규명하기 위해 고안했습니다."
      }
    },
    {
      "@type": "Question",
      "name": "N-Back 훈련은 어떤 뇌 기능을 주로 향상시키나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "배외측 전전두엽(DLPFC)을 중심으로 한 중앙 실행기(Central Executive) 기능, 작업기억 용량의 동적 갱신, 주의력 통제 및 유혹 자극에 대한 간섭 억제 능력을 종합적으로 발달시킵니다."
      }
    },
    {
      "@type": "Question",
      "name": "단순 숫자 암기(Digit Span)와 N-Back의 차이점은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "단순 숫자 암기는 정보를 정적으로 보관했다가 출력하는 수동적 단기 기억을 평가합니다. 반면 N-Back은 새 자극이 들어올 때마다 가장 오래된 항목을 버리고 새 항목을 추가하는 능동적 조작과 갱신을 지속적으로 요구합니다."
      }
    },
    {
      "@type": "Question",
      "name": "N-Back 훈련이 유동성 지능(IQ)을 향상시킬 수 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Jaeggi 등(2008년, PNAS)의 획기적인 연구에서 적응형 N-Back 훈련이 레이븐 추론 검사로 측정한 유동성 지능(Gf)을 유의미하게 향상시킨 것으로 보고되었습니다. 일반화 전이 효과의 크기에는 학술적 논의가 있으나, 작업기억 용량과 집중 제어력 향상은 명확히 입증되었습니다."
      }
    },
    {
      "@type": "Question",
      "name": "성인의 표준 3-Back 과제 평균 점수와 정확도는 어느 정도인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "건강한 성인의 표준 3-Back 과제 평균 정확도는 65%~80% 수준입니다. 85% 이상의 높은 정확도를 꾸준히 유지하거나 4-Back 단계를 성공적으로 완수한다면 상위 퍼센타일의 우수한 작업기억 능력을 의미합니다."
      }
    },
    {
      "@type": "Question",
      "name": "싱글 N-Back과 듀얼 N-Back(Dual N-Back)의 차이는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "싱글 N-Back은 시각 문자 한 가지만 추적합니다. 듀얼 N-Back은 '화면 격자 위치(시각)'와 '음성 알파벳(청각)'의 두 가지 독립된 감각 자극을 동시에 제시하여 두 모달리티 모두에서 독립적으로 N단계 전 일치 여부를 판단하는 고난도 훈련입니다."
      }
    },
    {
      "@type": "Question",
      "name": "머릿속으로 소리 내어 읊는 내적 시연이 훈련에 어떤 도움이 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "내적 시연은 배들리 작업기억 모델의 '음운 루프(Phonological Loop)'를 가동합니다. 직전 N개의 문자를 리드미컬하게 되뇌임으로써 신경 흔적의 빠른 감쇠를 막고 일치 판별의 정확도를 크게 높여줍니다."
      }
    },
    {
      "@type": "Question",
      "name": "왜 4-Back과 5-Back 단계에서는 난이도가 급격히 올라가나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "넬슨 코완(Nelson Cowan, 2001)의 연구에 따르면 인간의 의식적 초점 주의 용량 한계는 4±1 청크입니다. 4-Back과 5-Back은 이 생물학적 한계선에 직접 부딪히기 때문에 정보의 간섭과 탈락이 급증합니다."
      }
    },
    {
      "@type": "Question",
      "name": "작업기억 갱신 능력은 현실 생활이나 게임에서 어떻게 발휘되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "복잡한 코딩 및 소프트웨어 디버깅, 다변수 금융 데이터 분석, 장문 독해력, 그리고 FPS나 전략 시뮬레이션 게임에서 급변하는 전황(적 위치, 쿨다운)을 순간적으로 갱신하고 최적의 판단을 내리는 능력에 직결됩니다."
      }
    }
  ]
};

const nBackClientCopyKo = {
  h1Keyword: "N-Back 게임 및 연습 사이트",
  h1Suffix: " (작업기억 훈련)",
  caption: "N-Back 과제는 현재 자극이 정확히 N단계 전에 제시된 것과 일치하는지 판별하는 신경인지 평가입니다. 배들리와 히치(Baddeley & Hitch, 1974)의 작업기억 모델에 근거하여 정보의 보관과 능동적 갱신을 동시에 요구합니다.",
  statScore: "점수",
  statTime: "남은 시간",
  statLevel: "단계",
  statBest: "최고 점수",
  hudScore: "점수",
  hudTime: "남은 시간",
  modeSuffix: "-Back 훈련",
  memorizingText: "첫 {n}개 문자를 암기하는 중...",
  btnMatch: "일치 (MATCH)",
  btnNoMatch: "불일치 (NO MATCH)",
  startTitle: "듀얼 N-Back 트레이닝 프로",
  startSubtitle: "작업기억 용량 • 연속 정보 갱신 훈련",
  countdownSubtitle: "준비하세요",
  newBest: "최고 기록 달성",
  pointsLabel: "획득 점수",
  statAccuracy: "정확도",
  statPeakLevel: "최고 단계",
  statPerfects: "완벽 판정",
  btnPlayAgain: "다시 시작",
  rulesTitle: "훈련 규칙 및 채점 체계",
  rulesItems: [
    { num: "1", text: "일치/불일치 판정 (N단계 전)", highlight: "+150 PTS", result: "정확한 판정마다 즉시 가산" },
    { num: "2", text: "레벨 승급", highlight: "3-Back → 4-Back+", result: "1,200점 획득 시 단계 상승" },
    { num: "3", text: "문자 노출 가속", highlight: "2,000ms → 1,200ms", result: "높은 단계일수록 빠른 갱신 요구" },
    { num: "4", text: "시간 초과 (미응답)", highlight: "감점 없음", result: "점수나 시간 차감 없이 진행" },
    { num: "5", text: "오답 판정 (미스)", highlight: "연속 판정 초기화", result: "시간 차감 없이 45초 풀타임 지속" }
  ]
};

const guideKo = {
  heading: "N-Back 과제 가이드 및 작업기억 능력 기준",
  intro: [
    "N-Back 작업기억 과제(N-Back Task)는 시간적 압박 속에서 연속적인 정보 갱신, 실행 제어 기능, 그리고 능동적 정보 유지 능력을 평가하는 인지신경과학의 최고 표준 패러다임입니다. 1958년 웨인 K. 커슈너(Wayne K. Kirchner)의 급변하는 정보 보유 연구에서 시작된 이 과제는 전두엽 실행 기능 평가의 핵심으로 자리잡았습니다.",
    "단순히 정보를 담아두기만 하는 수동적인 기억 검사와 달리, N-Back 과제는 참가자에게 쉼 없이 변화하는 멘탈 버퍼의 실시간 갱신을 요구합니다. 문자가 연속해서 나타나는 동안 현재 문자가 정확히 N단계 전(기본 3-Back에서 시작하여 실력에 따라 4-Back, 5-Back으로 확장)에 나타난 문자와 일치하는지 순간적으로 결정해야 합니다.",
    "측정 방식 안내: 모든 반응과 시간 측정은 귀하의 브라우저에서 performance.now() 고해상도 시계를 통해 100% 로컬(기기 내)에서 밀리초 단위로 타임스탬프가 기록됩니다. 서버로 개인 점수가 전송되지 않습니다. 브라우저 타이머는 보안 조치(Spectre 대응)로 인해 약 1ms 단위로 양자화되며 디스플레이 주사율(60Hz 기준 약 16.7ms)에 따른 지연이 존재하므로, 5ms 미만의 미세한 차이는 측정 오차로 간주하시고 동일 기기에서 자신의 이전 기록과 비교하시기 바랍니다.",
    "데이터 투명성: SkillDrills는 어떠한 개인 성적 데이터도 수집하거나 서버에 저장하지 않습니다. 모든 점수와 설정은 사용자의 브라우저 localStorage에만 안전하게 보관됩니다. 본 페이지에 안내된 모든 벤치마크 수치는 하단 참고문헌 패널에 수록된 정식 출간 논문에 근거합니다.",
    "본 도구는 인지 능력 훈련과 흥미를 위한 무료 브라우저 게임입니다. 의료 기기나 신경인지 진단 도구가 아니며, 어떠한 인지 질환의 진단이나 치료를 목적으로 하지 않습니다. 기억력이나 사고력에 우려가 있으시다면 공인된 전문 의료진과 상담하시기 바랍니다."
  ],
  metrics: [
    { label: "최고 도달 N-Back 단계", desc: "세션 중 달성한 가장 높은 N-Back 깊이 (3-Back 기준치, 4-Back 고급, 5-Back 이상 엘리트)." },
    { label: "종합 획득 점수", desc: "45초간 누적된 총 포인트 (정답 판정 시마다 +150점 가산, 감점 없음)." },
    { label: "타깃 판정 정확도", desc: "오경보 및 누락 오류 대비 올바른 일치/불일치 판정의 백분율." },
    { label: "작업기억 갱신 속도", desc: "자극 노출 창 내에서의 의사결정 신속성 및 반응 잠복기." }
  ],
  benchmarks: [
    { tier: "Tier 1: 탁월한 작업기억 (Executive Elite / 상위 1%)", range: "4-Back ~ 5-Back+ 단계 (1,200점 이상)", desc: "엘리트 집행 기능; 4~5개 항목의 멘탈 선입선출 큐 완벽 유지; 즉각적인 토큰 교체; 600ms 미만 반응 지연; 정확도 92% 이상." },
    { tier: "Tier 2: 우수 수준 (Strong Updating Control / 상위 5~15%)", range: "견고한 3-Back 및 4-Back 진입 (900 ~ 1,199점)", desc: "표준 성인 기준 초과; 간섭 오류를 최소화하며 연속 3-Back 갱신 유지; 4-Back 시도로 순조롭게 전환; 정확도 80%~91%." },
    { tier: "Tier 3: 일반 성인 정상 기준치 (50th Percentile Normal)", range: "안정적인 3-Back (600 ~ 899점)", desc: "정상 성인 기준선 (Kirchner, 1958; Jaeggi et al., 2008); 3개 항목 음운 버퍼 유지; 빠른 제시 속도에서 간헐적 탈락 발생; 정확도 65%~79%." },
    { tier: "Tier 4: 평균 이하 (Executive Buffer Decay / 하위 15~30%)", range: "불안정한 3-Back (400 ~ 599점)", desc: "연속적인 3개 항목 버퍼 갱신에 어려움; 2-Back과 3-Back 간섭 혼란 발생; 일치 시행 정확도 50%~64%로 저하." },
    { tier: "Tier 5: 훈련 권장 (< 15th Percentile)", range: "3-Back 미만 (< 400점)", desc: "작업기억 정보 갱신 병목 현상; 전환 과정에서 3개 연속 항목을 활성 버퍼에 유지하지 못함; 빈번한 시간 초과 발생." }
  ],
  science: [
    { title: "Wayne K. Kirchner (1958): N-Back 패러다임의 창시", body: "커슈너는 1958년 연구에서 급변하는 정보의 파지 능력을 조사하기 위해 N-back 과제를 도입했습니다. 단순 단기 기억이 보존되어 있더라도, 낡은 정보를 실시간으로 버리고 새 정보를 추가하는 작업에서 결정적인 인지 병목이 발생함을 밝혔습니다." },
    { title: "Alan Baddeley (1986, 2000): 중앙 실행기 제어 모델", body: "배들리의 다요소 작업기억 모델에서 N-back은 중앙 실행기를 평가하는 대표적 과제입니다. 음운 루프의 리허설과 배외측 전전두엽(DLPFC)의 능동적 주의 제어 간의 동시 협응을 요구합니다." },
    { title: "Adele Diamond (2013): 실행 기능 3요소", body: "다이아몬드는 작업기억 갱신, 억제 제어, 인지적 유연성을 인간 실행 기능의 3대 핵심축으로 정의했습니다. N-back은 버퍼 갱신, 유혹 자극 억제, 유연한 정신적 재구성을 동시에 요구합니다." },
    { title: "Susanne M. Jaeggi et al. (2008): 유동성 지능 전이 (PNAS)", body: "예기 연구팀의 유명한 PNAS 논문은 적응형 N-back 과제의 집중 훈련이 레이븐 지능 검사로 측정한 유동성 지능(Gf)의 유의미한 향상으로 이어진다는 결과를 발표하여 두뇌 가소성을 입증했습니다." },
    { title: "Nelson Cowan (2001, 2010): 4±1 용량 한계선", body: "코완의 작업기억 모델은 인간 의식의 초점 주의 용량이 묶이지 않은 순수 단위 기준 약 4개임을 증명했습니다. 3-back에서 4-back으로의 전환은 이 생물학적 한계점에 직접 부딪히는 과정입니다." },
    { title: "David L. Woods et al. (2015): 인지 시간측정학 표준", body: "우즈 연구팀은 컴퓨터화된 인지 측정 기준을 정립하여 정답률, 오경보율, 민감도 지표(d')와 performance.now() 기반 밀리초 정밀도 검증 표준을 규정했습니다." }
  ],
  protocols: [
    { title: "회전 큐 음운 시연 (Baddeley 1986)", body: "머릿속에서 3글자 언어 루프를 리드미컬하게 되뇝니다. 새 문자가 들어오면 루프의 첫 글자와 비교한 후, 첫 글자를 버리고 새 글자를 끝에 붙입니다 (예: 'B-M-T' → 'M-T-R')." },
    { title: "친숙도 유혹 자극 억제 (Diamond 2013)", body: "정확히 3단계 전이 아니라 1~2단계 전에 나타났던 '유혹 자극'을 조심하세요. 막연한 익숙함 때문에 일치 버튼을 누르려는 충동을 전두엽에서 의식적으로 억제해야 합니다." },
    { title: "음운-공간 이중 부호화", body: "머릿속 말소리 반복과 함께, 눈앞에 3개의 슬롯이 놓여 있고 문자가 왼쪽으로 한 칸씩 밀려나는 모습을 시각화하세요. 이중 부호화가 기억 흔적의 보존력을 극대화합니다." },
    { title: "주의력 순간 재설정", body: "순서를 놓쳤더라도 당황하여 과거를 기억해내려 하지 마세요. 즉시 다음 문자를 1단계로 삼고, 이어지는 2개의 문자를 통해 신속하게 3개 버퍼를 다시 구성해야 합니다." }
  ],
  sources: pickSources('baddeley1974', 'baddeley1986', 'cowan2001', 'woods2015'),
  faqs: [
    { q: "N-Back 검사(과제)란 무엇인가요?", a: "N-Back 과제는 인지신경과학에서 작업기억의 연속 갱신과 실행 제어 능력을 평가하는 표준 인지 패러다임입니다. 현재 자극이 N단계 전과 일치하는지 판별합니다." },
    { q: "N-Back 과제는 누가 언제 개발했나요?", a: "1958년 심리학자 웨인 K. 커슈너(Wayne K. Kirchner)가 급변하는 정보의 단기 파지 능력을 조사하기 위해 개발했습니다." },
    { q: "N-Back 훈련은 어떤 뇌 기능을 주로 향상시키나요?", a: "배외측 전전두엽(DLPFC) 중심의 중앙 실행기 기능, 작업기억 용량의 동적 갱신, 주의력 통제 및 간섭 억제력을 강화합니다." },
    { q: "단순 숫자 암기(Digit Span)와 N-Back의 차이점은 무엇인가요?", a: "단순 숫자 암기는 수동적 단기 보관을 평가하지만, N-Back은 정보를 지속적으로 방출하고 교체하는 능동적 조작과 갱신을 요구합니다." },
    { q: "N-Back 훈련이 유동성 지능(IQ)을 향상시킬 수 있나요?", a: "Jaeggi 등(2008년, PNAS)의 연구에서 적응형 N-Back 훈련이 유동성 지능(Gf)을 유의미하게 향상시킬 수 있음이 입증되었습니다." },
    { q: "성인의 표준 3-Back 과제 평균 점수와 정확도는 어느 정도인가요?", a: "건강한 성인의 표준 3-Back 평균 정확도는 65%~80% 수준입니다. 85% 이상을 유지하면 상위 수준으로 평가됩니다." },
    { q: "싱글 N-Back과 듀얼 N-Back(Dual N-Back)의 차이는 무엇인가요?", a: "싱글 N-Back은 시각 문자 한 가지만 추적하며, 듀얼 N-Back은 시각 위치와 청각 문자의 두 감각 자극을 동시에 병렬로 추적합니다." },
    { q: "머릿속으로 소리 내어 읊는 내적 시연이 훈련에 어떤 도움이 되나요?", a: "내적 시연은 음운 루프를 활성화하여 기억 흔적의 감쇠를 방지하고 판별 정확도를 크게 끌어올립니다." },
    { q: "왜 4-Back과 5-Back 단계에서는 난이도가 급격히 올라가나요?", a: "넬슨 코완(2001)의 이론에 따르면 인간 초점 주의 용량 한계는 4±1개로, 4-Back 이상은 이 생물학적 한계선에 부딪히기 때문입니다." },
    { q: "작업기억 갱신 능력은 현실 생활이나 게임에서 어떻게 발휘되나요?", a: "소프트웨어 디버깅, 금융 분석, 독해력 향상, 그리고 e스포츠에서 시시각각 변하는 전황을 즉시 파악하고 판단하는 데 직결됩니다." }
  ],
  related: [
    { href: "/ko/drills/memory/spatial-memory/path-tracing", title: "공간 경로 기억 테스트", desc: "동적 경로를 기억하고 격자 매트릭스 상에서 공간 작업기억 훈련." },
    { href: "/ko/drills/memory/spatial-memory/grid-memorization", title: "시각 그리드 기억 테스트", desc: "정적 2D 체크보드 패턴을 암기하고 시각 캐시 용량 측정." },
    { href: "/ko/drills/memory/spatial-memory/object-location", title: "사물 위치 기억 테스트", desc: "다분면 지도상에서 공간적 관계 결합 및 오브젝트 배치 기억 평가." },
    { href: "/ko/drills/memory/short-term-memory/digit-span", title: "숫자 기억 테스트 (Digit Span)", desc: "순방향 숫자 단기 기억 용량과 음운 루프 시연 능력 측정." },
    { href: "/ko/drills/memory/short-term-memory/word-recall", title: "단어 회상 기억력 테스트", desc: "제한 시간 내 즉각적인 언어 회상 및 의미적 군집화 능력 평가." },
    { href: "/ko/drills/memory/short-term-memory/color-sequence", title: "색상 기억 게임", desc: "점점 빨라지는 색상 점멸 시퀀스를 순서대로 기억하는 게임." }
  ]
};

export default function NBackPageKo() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <NBackClient copy={nBackClientCopyKo} />

      <DrillGuide {...guideKo} />

      <div className="max-w-6xl w-full mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="memory" currentHref="/drills/memory/working-memory/n-back" locale="ko" />
      </div>
    </>
  );
}
