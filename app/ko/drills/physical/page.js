import PhysicalDrillsClient from '@/app/drills/physical/PhysicalDrillsClient';
import { DRILLS } from '@/lib/drillsRegistry';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import { getLocalizedDrill } from '@/lib/i18n/drillNames';

const physicalDrills = DRILLS.filter((d) => d.category === 'physical');

export const metadata = {
  title: '신체 순발력 & 반사신경 훈련 테스트 (11개 드릴) | SkillDrills',
  description: '온라인 신체 순발력 및 반사신경 훈련. 11가지 과학적 드릴: 반응속도, 신체 균형 감각, 손 눈 협응력, 사다리 풋워크 및 장애물 회피 테스트.',
  keywords: [
    '신체 순발력 훈련', '반사신경 테스트 게임', '반응속도 테스트 온라인',
    '균형 감각 테스트 온라인', '손 눈 협응력 게임', '사다리 스텝 민첩성 훈련',
    '마우스 피하기 게임 순발력', '주변 시야 테스트 게임', '고노고 반응 억제 훈련',
    '동적 장애물 회피 테스트', '자 떨어뜨리기 반응속도', '순발력 기르는 운동',
    '양측 정중선 교차 협응', '운동신경 반응속도 올리는법', '무료 브라우저 순발력 게임'
  ],
  openGraph: {
    title: '신체 순발력 & 반사신경 훈련 테스트 (11개 드릴) | SkillDrills',
    description: '온라인 신체 순발력 및 반사신경 훈련. 11가지 과학적 드릴: 반응속도, 신체 균형 감각, 손 눈 협응력, 사다리 풋워크 및 장애물 회피 테스트.',
    type: 'website',
    url: 'https://skilldrills.online/ko/drills/physical',
    siteName: 'SkillDrills',
    locale: 'ko_KR',
    images: [{ url: 'https://skilldrills.online/icons/icon-512x512.png', width: 512, height: 512, alt: '신체 순발력 및 반사신경 훈련 도감 | SkillDrills' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '신체 순발력 & 반사신경 훈련 테스트 (11개 드릴) | SkillDrills',
    description: '11가지 과학적 신체 순발력 및 반사신경 테스트. 반응속도, 신체 균형감각, 사다리 스텝, 장애물 회피를 브라우저에서 무료로 훈련하세요.',
    images: ['https://skilldrills.online/icons/icon-512x512.png'],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://skilldrills.online/ko/drills/physical',
    languages: getAlternateLanguages('/ko/drills/physical'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ko" },
    { "@type": "ListItem", "position": 2, "name": "전체 훈련 도감", "item": "https://skilldrills.online/ko/drills" },
    { "@type": "ListItem", "position": 3, "name": "신체 순발력 & 반사 훈련", "item": "https://skilldrills.online/ko/drills/physical" }
  ]
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "신체 순발력 & 반사신경 훈련 도감 (11개 드릴)",
  "url": "https://skilldrills.online/ko/drills/physical",
  "description": "11가지 인터랙티브 신체 반사신경, 균형 감각, 손 눈 협응, 풋워크 민첩성 및 장애물 회피 테스트.",
  "author": { "@type": "Organization", "name": "SkillDrills" },
  "hasPart": physicalDrills.map((drill) => {
    const loc = getLocalizedDrill(drill.href, 'ko', drill.name);
    return {
      "@type": "WebApplication",
      "name": loc.name,
      "url": `https://skilldrills.online/ko${drill.href}`,
      "applicationCategory": "EducationalApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5 Canvas.",
      "description": loc.tagline || drill.description,
    };
  })
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "컴퓨터 화면 기반 사다리 훈련이 실제 발놀림(풋워크)과 스포츠 민첩성에 어떻게 도움이 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "컴퓨터 기반 스크롤링 민첩성 사다리 훈련은 고속 시각 신호 인지와 리듬 동기화를 강화합니다. 움직이는 타깃에 맞춰 빠른 동작 결정을 내리도록 운동 피질(Motor Cortex)을 자극함으로써 방향 전환 속도(COD)를 높이고 발놀림의 뇌신경 반응 지연을 최소화합니다."
      }
    },
    {
      "@type": "Question",
      "name": "반응 체인 및 충동 조절 훈련은 어떻게 경기 중 과도한 쏠림(오버커밋)을 방지하나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "충동 제동(Impulse Arrest) 반응 훈련은 이미 시작된 신체 동작을 페이크나 유인 신호 출현 시 급정지시키는 신경근 억제 능력을 측정합니다. 기저핵(Basal Ganglia)과 전전두엽의 억제 경로를 훈련하여 150ms 이내에 관성을 제어하고 상대의 페이크에 무너지는 것을 막아줍니다."
      }
    },
    {
      "@type": "Question",
      "name": "외력 저항 안정성 훈련(바람 저항 시뮬레이션)이 신체 평형 감각을 어떻게 발달시키나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "동적 평형성은 안구 시선 안정성, 전정기관(내이) 및 고유수용성 감각(Proprioception) 간의 감각통합에 의존합니다. 화면상의 외력 벡터에 대항하여 중심을 유지하는 훈련은 불규칙한 외력 섭동에 맞서 중추신경계가 미세 항력을 실시간 계산하고 자세 안정근을 동원하도록 돕습니다."
      }
    },
    {
      "@type": "Question",
      "name": "양측 정중선 교차 훈련(Cross-body Movement)이 중요한 이유는 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "신체의 중심선(정중선)을 교차하는 움직임은 뇌량(Corpus Callosum)을 통해 좌뇌와 우뇌가 정보를 교환하도록 유도합니다. 대각선 키네틱 체인을 활성화함으로써 다방향 민첩성, 순간 회전력, 3차원 공간 인식 능력을 비약적으로 향상시킵니다."
      }
    },
    {
      "@type": "Question",
      "name": "3x3 동적 그리드 회피 드릴은 순간 회피 반응시간을 얼마나 단축시키나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "예측 가능한 단순 반응 검사와 달리 불규칙한 다방향 장애물이 쏟아지는 동적 그리드 회피는 두정엽(Parietal Lobe)의 공간 지도 갱신 속도를 끌어올립니다. 고압박 상황에서 선택 반응 지연(Choice Reaction Time)을 평균 280ms에서 190ms 이하로 단축시킵니다."
      }
    },
    {
      "@type": "Question",
      "name": "주변 시야 위험 감지(Peripheral Threat Sweeper)가 경기력 향상과 부상 예방에 미치는 영향은 무엇인가요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "주변 시야 스캔 훈련은 유효 시야(FFOV: Functional Field of View)를 확장합니다. 시야 가장자리의 움직임을 대세포 시각 경로(Magnocellular Pathway)로 즉각 포착하여 직접 시선을 돌리지 않고도 사각지대 위험을 회피해 부상 위험을 대폭 낮춥니다."
      }
    },
    {
      "@type": "Question",
      "name": "신체 순발력 및 반사신경 훈련의 최적 루틴과 권장 주기는 어떻게 되나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "세션당 15~25분, 주 3~5회 훈련이 가장 이상적입니다. 고도의 신경근 집중력은 시냅스 에너지를 급격히 소모하므로 30분을 초과하면 중추신경계(CNS) 피로가 발생하여 반응 기제가 무뎌지고 효율이 급감합니다."
      }
    },
    {
      "@type": "Question",
      "name": "온라인 브라우저 반사신경 게임이 실제 체육관 및 필드 훈련을 보완할 수 있나요?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "네, 디지털 드릴은 근력이나 플라이오메트릭 파워 자체를 대체하지는 않지만, 스포츠 동작의 첫 단추인 '지각-인지 단계'를 극대화합니다. 시각 포착, 위협 식별, 운동 명령 발화를 단축시켜 실제 필드에서 신체 능력이 온전히 발휘되도록 만듭니다."
      }
    }
  ]
};

export default function PhysicalDrillsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PhysicalDrillsClient
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />
    </>
  );
}
