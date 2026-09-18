import DropCatchClient from '@/app/drills/physical/reflex-training/drop-catch/DropCatchClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { pickSources } from '@/lib/drillSources';

// ============================================================
// SEO RESEARCH FINDINGS — South Korea (KR / KO)
// Primary Intent: 자 반응속도 테스트, 반사신경 테스트 게임, 순발력 게임, 선택 반응속도
// Korean Context: 페이커 자 반응속도 테스트(Ruler Drop Test) 온라인 대체 및 고속 낙하 표적/함정 식별 훈련
// High-Demand, Low-Competition Target Keywords:
//   - "자 반응속도 테스트" (Massive viral & athletic ruler drop query)
//   - "반사신경 테스트 게임" (High-intent interactive reflex game query)
//   - "반응속도 테스트 게임" (Core motor chronometry query)
//   - "순발력 게임 드랍 스틱" (Physical dropping stick reflex query)
//   - "순발력 측정 사이트" (Agility & reaction benchmark query)
//   - "선택 반응속도 테스트" (Donders Type C choice reaction query)
//   - "낙하 표적 요격 훈련" (Gravitational falling target interception)
//   - "충동 억제 반사 훈련" (Logan horse-race inhibitory motor drill)
//   - "동체시력 낙하 테스트" (Dynamic vertical visual acuity query)
//   - "드롭 캐치 반응속도" (Drop catch reflex coordination drill)
// ============================================================

export const metadata = {
  title: "자 반응속도 테스트 & 반사신경 테스트 게임 – 무료 낙하 드롭 캐치 훈련 | SkillDrills",
  description: "무료 온라인 자 반응속도 테스트 및 반사신경 측정 게임. 중력 가속도로 낙하하는 초록색 표적을 밀리초 단위로 낚아채고 붉은색 유인 함정을 억제하여 돈더스 C형 선택 반응시간과 전두엽 충동 제어력을 과학적으로 단련합니다.",
  keywords: [
    "자 반응속도 테스트",
    "반사신경 테스트 게임",
    "반응속도 테스트 게임",
    "순발력 게임 드랍 스틱",
    "순발력 측정 사이트",
    "선택 반응속도 테스트",
    "낙하 표적 요격 훈련",
    "충동 억제 반사 훈련",
    "동체시력 낙하 테스트",
    "드롭 캐치 반응속도"
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/physical/reflex-training/drop-catch',
    languages: getAlternateLanguages('/drills/physical/reflex-training/drop-catch'),
  },
  openGraph: {
    title: "자 반응속도 테스트 & 반사신경 테스트 게임 – 무료 낙하 드롭 캐치 훈련 | SkillDrills",
    description: "무료 온라인 자 반응속도 테스트 및 반사신경 측정 게임. 중력 가속도로 낙하하는 초록색 표적을 밀리초 단위로 낚아채고 붉은색 유인 함정을 억제하여 돈더스 C형 선택 반응시간과 전두엽 충동 제어력을 과학적으로 단련합니다.",
    url: 'https://skilldrills.online/ko/drills/physical/reflex-training/drop-catch',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "자 반응속도 테스트 & 반사신경 테스트 게임 – 무료 낙하 드롭 캐치 훈련 | SkillDrills",
    description: "무료 온라인 자 반응속도 테스트 및 반사신경 측정 게임. 중력 가속도로 낙하하는 초록색 표적을 밀리초 단위로 낚아채고 붉은색 유인 함정을 억제하여 돈더스 C형 선택 반응시간과 전두엽 충동 제어력을 과학적으로 단련합니다.",
  },
  robots: { index: true, follow: true },
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
      "name": "신체 훈련 허브",
      "item": "https://skilldrills.online/ko/drills/physical"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "반사신경 및 순발력",
      "item": "https://skilldrills.online/ko/drills/physical/reflex-training"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "자 반응속도 테스트・드롭 캐치 반사 훈련",
      "item": "https://skilldrills.online/ko/drills/physical/reflex-training/drop-catch"
    }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "자 반응속도 테스트 및 낙하 드롭 캐치 트레이너",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "중력 가속 낙하 표적을 포착하고 유인 함정을 억제하여 돈더스 C형 선택 반응시간과 시각 변별력을 측정하는 무료 브라우저 트레이너.",
  "url": "https://skilldrills.online/ko/drills/physical/reflex-training/drop-catch",
  "publisher": {
    "@type": "Organization",
    "name": "SkillDrills",
    "url": "https://skilldrills.online/ko"
  },
  "inLanguage": "ko",
  "dateModified": "2026-09-12"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "드롭 캐치 반응속도 측정 웹 앱",
  "applicationCategory": "GameApplication",
  "operatingSystem": "All",
  "browserRequirements": "HTML5 Canvas 및 고속 포인터 입력을 지원하는 최신 브라우저",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "url": "https://skilldrills.online/ko/drills/physical/reflex-training/drop-catch",
  "inLanguage": "ko",
  "dateModified": "2026-09-12"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "드롭 캐치: 낙하 표적 요격 및 충동 제어 게임 (Drop Catch)",
  "url": "https://skilldrills.online/ko/drills/physical/reflex-training/drop-catch",
  "description": "중력 낙하하는 초록 표적을 낚아채고 붉은 함정을 회피하는 반응속도 및 충동 억제 액션 게임.",
  "genre": [
    "Action Game",
    "Reflex Game",
    "Aim Trainer",
    "Coordination"
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-12",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "전통적인 '자 떨어뜨리기 반응속도 테스트(Ruler Drop Test)'와 본 온라인 드롭 캐치의 생체역학적 차이는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "물리적인 자 떨어뜨리기 시험은 단순 중력 낙하 거리(d = 1/2gt²)를 엄지와 검지의 핀치 그립으로 측정하는 단순 반응(Donders Type A)에 가깝습니다. 반면 본 온라인 드롭 캐치는 화면 상단에서 400 px/s에서 1250 px/s로 가속 낙하하는 유효 초록 표적과 붉은색 유인 함정을 실시간 판별해야 하는 돈더스 C형(Donders Type C) 변별 반응 과제로, 시각 피질의 색채 변별과 전두엽의 충동 억제 신경망을 동시에 평가합니다."
      }
    },
    {
      "@type": "Question",
      "name": "데이비드 리(David N. Lee, 1976)의 광학적 타우(Optical Tau, τ) 이론은 낙하 요격에 어떻게 작용하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "물체가 중력 가속도를 받으며 아래로 떨어질 때 인간의 뇌는 물리적 거리나 순간 속도를 수치로 계산하지 않습니다. 망막에 투영되는 표적 상의 수직 변위 및 팽창률의 역수인 '광학적 타우(τ)'를 시각 피질이 직접 감지하여, 표적이 화면 하단 소멸선에 도달하기까지의 남은 접촉 시간(Time-to-Contact)을 밀리초 단위로 정확히 예측하고 격발 시점을 동기화합니다."
      }
    },
    {
      "@type": "Question",
      "name": "고든 로건(Gordon D. Logan, 1984)의 경마 모델(Horse-Race Model)과 붉은색 함정 억제 원리란?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "표적이 나타나는 즉시 뇌에서는 마우스를 누르려는 자동적 '실행(Go)' 운동 충동과, 색상을 확인하고 멈추려는 '정지(Stop)' 억제 과정이 동시에 출발하는 경마(Race)가 벌어집니다. 붉은색 함정을 실수로 클릭하지 않으려면 전두엽의 억제 신호가 운동 피질의 발화 임계점을 넘기 전에 도착해야 합니다. 본 드릴은 섣부른 오발 충동을 제어하는 강력한 신경 억제 훈련을 제공합니다."
      }
    },
    {
      "@type": "Question",
      "name": "리그 오브 레전드(LoL), 발로란트 등 e스포츠에서 아군 오인 사격 방지와 스킬 회피에 어떻게 전이되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "복잡한 난전 상황에서는 적의 주요 스킬 투사체와 아군의 투사체, 혹은 적의 페이크 스킬을 즉각적으로 구분해야 합니다. 붉은색 유인체를 보고 손가락을 멈추는 충동 조절 능력은 FPS 게임에서 아군 오사(Friendly Fire) 및 낚시성 유틸리티에 대한 낭비를 줄이고, 긴박한 상황에서 완벽한 선택 반응을 발휘하도록 돕습니다."
      }
    },
    {
      "@type": "Question",
      "name": "레벨이 상승함에 따라 낙하 속도, 표적 크기, 함정 출현 빈도는 어떻게 변하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "1,750점마다 레벨이 상승하며 최대 15레벨 이상 확장됩니다. 표적의 기본 낙하 속도는 초당 400px에서 최대 1250px까지 3배 이상 폭발적으로 빨라지며, 스폰 간격은 0.8초에서 0.18초로 단축됩니다. 또한 가짜 붉은 함정의 출현 확률이 초기 15%에서 최대 45%까지 급증하여 극도의 집중력을 요구합니다."
      }
    },
    {
      "@type": "Question",
      "name": "초록색 타깃을 격추했을 때 부여되는 +0.6초 시간 연장 보너스의 전략적 의미는?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "훈련 세션은 45초 기본 타이머로 시작하지만, 초록 표적을 포착할 때마다 0.6초가 즉각 충전됩니다. 실수 없이 빠른 템포로 표적을 요격하면 45초의 제한 시간을 넘어 60초, 90초 이상 세션을 지속시키며 3.0배 최대 콤보를 유지해 24,000점 이상의 엘리트 점수에 도달할 수 있습니다."
      }
    },
    {
      "@type": "Question",
      "name": "붉은색 함정을 클릭하거나 초록 표적을 놓쳤을 때 적용되는 페널티는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "초록색 표적이 바닥에 닿아 소멸하거나 붉은색 유인 함정을 클릭하면 쌓아둔 콤보 배수가 즉시 1.0배로 초기화됩니다. 또한 설정에서 페널티를 활성화한 경우, 실수 1회당 0.8초의 잔여 시간이 즉각 삭감되므로 무작정 광클하는 행위를 엄격히 차단합니다."
      }
    },
    {
      "@type": "Question",
      "name": "수직 낙하 요격에 가장 이상적인 마우스 그립법과 화면 시선 분산 요령은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "마우스 상하 조작에 유연성을 부여하기 위해 손바닥을 패드에서 살짝 띄우는 핑거팁 그립(Fingertip Grip)이나 클로 그립(Claw Grip)이 적합합니다. 시선은 화면 맨 위 스폰 지점이 아닌 상단 1/3 지점에 부드럽게 두어, 물체가 출현하자마자 색상을 1차 판별하고 낙하 궤적 아래로 마우스를 선제 배치하는 것이 핵심입니다."
      }
    },
    {
      "@type": "Question",
      "name": "144Hz/240Hz 고주사율 모니터가 1250 px/s 초고속 낙하 포착에 미치는 물리적 영향은?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "초당 1250px로 곤두박질치는 표적은 60Hz 모니터에서 프레임당 약 20.8px씩 순간이동하며 심한 모션 블러를 유발합니다. 반면 240Hz 모니터에서는 프레임당 변위가 5.2px로 극소화되어 표적의 색상 경계와 중심 좌표를 잔상 없이 선명하게 유지시켜 오조준을 획기적으로 줄입니다 (Woods et al., 2015)."
      }
    },
    {
      "@type": "Question",
      "name": "본 드롭 캐치 테스트에서 수집되는 반응속도 지표나 플레이 데이터는 안전한가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "완벽하게 안전합니다. 반응 지연 시간, 변별 정확도, 유인 함정 회피율, 최종 스코어 등의 모든 측정값은 사용자의 브라우저 로컬 저장소(LocalStorage)에만 암호화 저장되며, 외부 서버로 일체 전송되지 않습니다."
      }
    }
  ]
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "자 반응속도 테스트 및 낙하 드롭 캐치 4단계 과학적 훈련 프로토콜",
  "description": "돈더스 변별 반응과 로건 충동 억제 모델을 적용해 낙하 표적 요격 속도와 반응성을 극대화하는 단계별 훈련법.",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "상단 1/3 지점 시선 고정 및 색채 변별 준비 (Visual Anchoring)",
      "text": "화면 최상단이 아닌 상단 1/3 지점에 시선을 고정하고, 표적이 낙하 궤도에 진입하는 첫 50ms 내에 초록색인지 붉은색인지 색채를 변별합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/reflex-training/drop-catch#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "로건 정지 신호 기반 함정 억제 (Logan Inhibitory Veto)",
      "text": "붉은색 유인 함정이 확인되면 전두엽 억제 신호를 활성화하여 손가락의 무조건적 반사 클릭 충동을 철저히 차단합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/reflex-training/drop-catch#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "리 광학적 타우 기반 수직 선제 요격 (Optical Tau Interception)",
      "text": "초록색 유효 표적임이 확인되면 가속하는 낙하 벡터를 예측하여 타깃의 진행 경로 아래쪽으로 커서를 이동시켜 정확하게 클릭합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/reflex-training/drop-catch#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "시간 보너스 누적 및 콤보 가열 유지 (Time Extension & Streak Heat)",
      "text": "초록 표적 요격마다 주어지는 +0.6초를 누적하여 세션 시간을 지속하고, 최대 3.0배 콤보를 45초 이상 유지하여 24,000점 엘리트에 도달합니다.",
      "url": "https://skilldrills.online/ko/drills/physical/reflex-training/drop-catch#step-4"
    }
  ]
};

const dropGuide = {
  heading: "자 반응속도 테스트 및 중력 낙하 요격 신경생체역학 가이드",
  intro: {
    title: "중력 가속도 낙하와 시각 변별-충동 억제 신경계의 역학",
    paragraphs: [
      "드롭 캐치(Drop Catch)는 화면 상단에서 중력 가속도를 받으며 아래로 떨어지는 표적을 밀리초 단위로 낚아채고 붉은색 유인 함정을 거르는 고난도 반사신경 및 충동 조절 훈련 시스템입니다. 학교나 운동부에서 전통적으로 시행하던 '자 떨어뜨리기 반응속도 시험(Ruler Drop Test)'을 디지털 환경으로 계승 발전시켜, 단순 낙하 포착에 그치지 않고 프란시스쿠스 돈더스(Donders, 1868)의 C형 변별 반응 시간(Discrimination Reaction Time)과 인지 억제 신경망을 통합 평가합니다.",
      "중력 가속 낙하 운동(y = 1/2gt²)에서 표적 속도는 초당 400px에서 최대 1250px까지 가속합니다. 데이비드 리(Lee, 1976)의 광학적 타우(Optical Tau, τ) 이론에 따르면, 인간 시각 피질은 망막에 맺히는 상의 상대적 팽창률을 통해 충돌 잔여 시간(Time-to-Contact)을 직관적으로 연산합니다. 표적의 가속도를 의식적으로 계산하려 하면 지연이 발생하므로, 타우 신호에 맞춰 커서를 낙하 경로 선상에 미리 안착시키는 선제적 요격 기술이 필수적입니다.",
      "본 드릴의 핵심적인 인지적 난관은 불시에 떨어지는 붉은색 유인체(Decoy)입니다. 고든 로건(Logan et al., 1984)의 경마 모델(Horse-Race Model)에 규명된 바와 같이, 자극을 보자마자 손가락이 튀어나가는 무조건적 '실행(Go)' 충동과, 색상을 식별하고 클릭을 멈추려는 전두엽 '정지(Stop)' 억제 과정이 신경계 내부에서 경쟁합니다. 훈련을 거듭할수록 전두엽의 하향식(Top-Down) 제어 능력이 강화되어 오발 사고를 원천 방지하게 됩니다.",
      "밀리초 단위의 정밀 계측을 위해 본 시스템은 브라우저 performance.now() 고해상도 타이머를 활용합니다. 144Hz 및 240Hz 고주사율 디스플레이 환경은 최대 1250 px/s의 고속 낙하 표적의 모션 블러를 억제하여 잔상 없는 선명한 색채 판별을 지원합니다 (Woods et al., 2015). 모든 반응속도 지표와 훈련 기록은 사용자 개인정보 보호를 위해 온전히 로컬 스토리지에만 저장됩니다."
    ]
  },
  benchmarks: {
    title: "자 반응속도 및 낙하 변별 요격 5단계 등급 기준표",
    headers: ["티어 및 등급", "칭호 (Rank Title)", "기준 점수", "변별 반응시간 및 정확도", "종합 등급", "신경생체역학적 프로파일"],
    rows: [
      ["Tier 1: 최정상 중력 요격 마스터", "Apex Gravitational Interceptor", "24,000점 이상", "< 190ms / 95% 이상", "Grade S", "상위 0.1% 전투기 조종사 및 프로게이머 수준. 완벽한 로건 억제 제어 구사와 1250 px/s 극초음속 낙하 표적 무결점 요격 (Lee 1976; Logan 1984)"],
      ["Tier 2: 정밀 충동 제어 스트라이커", "Precision Reflex Striker", "17,000 – 23,999점", "195 – 240ms / 90 – 94%", "Grade A", "상위 10% e스포츠 준프로 수준. 뛰어난 광학적 타우 연산과 45% 고빈도 함정 속에서도 흔들리지 않는 3.0배 콤보 연타 유지"],
      ["Tier 3: 숙련 낙하 포착자", "Skilled Drop Catcher", "11,000 – 16,999점", "245 – 310ms / 82 – 89%", "Grade B", "상위 35% 일반 게이머 수준. 안정된 손-눈 협응 반응성과 +0.6초 시간 연장 보너스를 활용한 탄탄한 생존력"],
      ["Tier 4: 발전형 반사 훈련생", "Developing Reflex Trainee", "6,000 – 10,999점", "311 – 370ms / 70 – 81%", "Grade C", "일반 성인 평균 기준. 낙하 속도 800 px/s 초과 시 색상 판별 지연으로 인한 붉은 함정 오클릭 및 콤보 초기화 빈발"],
      ["Tier 5: 초급 충동 반응 입문자", "Novice Decoy Learner", "6,000점 미만", "> 370ms / < 70%", "Grade D", "입문자 baseline. 표적 낙하에 당황하여 붉은색 함정에 성급한 손가락 발화 빈발. 화면 상단 1/3 시선 고정 훈련 권장"]
    ],
    note: "돈더스 C형 변별 반응 시간(Donders 1868), 리의 광학적 타우 충돌 이론(Lee 1976), 로건의 억제 경마 모델(Logan 1984)에 근거한 종합 평가 기준입니다."
  },
  techniques: {
    title: "자 반응속도 및 낙하 요격 극대화 4대 실전 프로토콜",
    items: [
      {
        name: "상단 1/3 지점 시각적 앵커링 (Upper Third Visual Anchoring)",
        desc: "시선을 표적이 생성되는 화면 맨 꼭대기나 맨 밑바닥에 두지 마십시오. 화면 상단 1/3 지점에 시각 중심을 두고, 표적이 출현하자마자 첫 50ms 이내에 색상을 판별한 뒤 낙하 경로 아래로 마우스를 선제 하강시키십시오.",
        tips: "표적을 뒤쫓아 내려가는 것이 아니라, 표적이 떨어질 예상 위치에 미리 마우스를 대기시키는 길목 지키기 전략을 취하세요."
      },
      {
        name: "로건 정지 신호 전두엽 억제 (Logan Stop-Signal Veto)",
        desc: "물체가 떨어지자마자 무조건 클릭하려는 손가락의 성급한 반사 충동을 의도적으로 억누르십시오. 붉은색이 인식되는 즉시 손가락 근육의 긴장을 해제하고 타깃이 그대로 바닥에 떨어져 소멸하도록 방치하십시오.",
        tips: "붉은 함정을 클릭하는 것은 단순히 1점을 잃는 것이 아니라 3.0배 최대 콤보를 날려버리는 치명타임을 기억하세요."
      },
      {
        name: "광학적 타우 기반 중력 가속 요격 (Optical Tau Gravitational Interception)",
        desc: "표적은 아래로 내려올수록 속도가 급격히 빨라집니다. 망막 상의 수직 변위 가속도를 읽고, 표적이 중간 영역을 지날 때 가장 이상적인 판정 범위에서 정확하게 스냅 클릭을 실행하십시오.",
        tips: "바닥에 닿기 직전까지 기다리지 말고, 조작 공간이 넉넉한 화면 중하단 교차점에서 단호하게 끊어치세요."
      },
      {
        name: "핑거팁 그립 기반 수직 미세 조향 (Fingertip Vertical Micro-Steering)",
        desc: "손바닥을 마우스 패드에 붙이면 아래위로 마우스를 빠르게 당기고 미는 데 저항이 생깁니다. 손바닥을 띄운 핑거팁 그립을 유지하고, 손가락 끝의 신전과 굴곡만으로 수직 궤적을 날렵하게 조향하십시오.",
        tips: "팔 전체를 움직이기보다 손가락 관절의 탄성을 이용하여 마우스를 위아래로 민첩하게 슬라이드하세요."
      }
    ]
  },
  steps: [
    "바른 자세로 앉아 마우스 커서를 화면 중앙에 위치시키고 상단 1/3 지점을 주시합니다.",
    "표적이 낙하하기 시작하면 첫 50ms 내에 초록색(유효)인지 붉은색(함정)인지 변별합니다.",
    "초록색 표적은 가속 궤적을 예측하여 낚아채고, 붉은색 함정은 클릭을 억제하여 흘려보냅니다.",
    "요격 성공 시 +0.6초 보너스를 축적하여 콤보를 3.0배로 유지하며 24,000점 이상에 도전합니다."
  ],
  audience: "전통적인 자 반응속도 테스트의 디지털 정밀 측정을 원하시는 분, FPS/MOBA에서 아군 오사 방지와 순간 스킬 회피력을 기르고자 하는 게이머.",
  faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
  sources: pickSources('donders1868', 'lee1976', 'logan1984', 'woodworth1899', 'fitts1954', 'woods2015')
};

export default function LocalizedDropCatchPageKo() {
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
      <DropCatchClient
        copy={{
          title: "자 반응속도 테스트 & 드롭 캐치",
          subtitle: "낙하 표적 요격 & 유인 함정 충동 억제 • 15단계 난이도 스케일링",
          hudLabels: {
            score: "현재 점수",
            time: "남은 시간",
            bestScore: "최고 점수",
            bestCombo: "최대 콤보"
          },
          rulesTitle: "드릴 진행 규칙 및 점수 산정 체계",
          rulesItems: [
            { title: "초록색 타깃 포착 & 시간 보너스", text: "낙하하는 초록색 표적을 클릭하여 100점(콤보 및 레벨 배율 적용)을 획득하고 남은 시간을 0.6초 연장하십시오." },
            { title: "콤보 시스템 증폭", text: "실수 없이 연속으로 표적을 요격하면 콤보 배수가 최대 3.0배까지 증가합니다." },
            { title: "점진적 난이도 상향", text: "1,750점마다 레벨이 상승하며 낙하 속도(최대 1250 px/s)와 붉은 함정 출현 확률(최대 45%)이 높아집니다." },
            { title: "함정 오클릭 및 놓침 페널티", text: "초록 표적을 놓치거나 붉은색 함정을 클릭하면 콤보가 즉시 초기화되며(설정에 따라 0.8초 시간 차감), 라운드가 위태로워집니다." }
          ],
          aboutTitle: "드롭 캐치 및 낙하 반응속도 생체역학",
          aboutSections: [
            {
              title: "중력 가속도와 광학적 타우(τ) 충돌 예측",
              subtitle: "데이비드 리(Lee, 1976) 비선형 수직 가속도 접촉 시간 연산",
              content: "낙하 표적은 속도가 가속됩니다. 인간 시각계는 망막 상의 수직 변위 팽창률(τ)을 감지하여 소멸선에 닿기 직전 정확한 요격 좌표를 선제적으로 산출합니다."
            },
            {
              title: "충동 제어와 로건 경마 정지 신호 모델",
              subtitle: "고든 로건(Logan, 1984) 전두엽 억제 기제와 무조건적 발화 억제",
              content: "붉은 함정의 출현은 마우스를 누르려는 'Go' 충동과 'Stop' 억제 신호의 경마를 유발합니다. 섣부른 오클릭을 억제하는 전두엽 통제력을 발달시킵니다."
            },
            {
              title: "돈더스 C형(Donders Type C) 변별 반응 시간",
              subtitle: "단순 반사를 넘어선 자극 판별 후 운동 명령 개시",
              content: "단순한 1자극 1반응과 달리, 복수의 자극 중 유효 타깃에만 선택적으로 반응하고 함정은 통과시키는 고차원적 인지 반응성을 단련합니다."
            },
            {
              title: "우드워스 탄도 플릭 및 착지 감속 역학",
              subtitle: "우드워스(1899) 및 피츠의 법칙(1954) 기반 속도-정확도 최적화",
              content: "낙하 궤적 아래로 85% 이상의 거리를 탄도적으로 내던진 뒤, 미세한 광학 피드백 감속으로 축소되는 표적 중심에 커서를 정확히 착지시킵니다."
            }
          ]
        }}
      />
      <DrillGuide {...dropGuide} />
      <RelatedDrills currentCategory="physical" currentHref="/drills/physical/reflex-training/drop-catch" />
    </>
  );
}
