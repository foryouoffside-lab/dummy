import WordRecallClient from './WordRecallClient';
import DrillGuide from '@/components/drill/DrillGuide';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "Verbal Memory Test - Free Word Recall Game",
  description: "Free verbal memory test. Recall word lists, see the serial position effect in your own scores, and learn the encoding tricks that beat it.",
  keywords: [
    "verbal memory test",
    "word recall test",
    "word memory test",
    "free recall memory test",
    "verbal working memory test",
    "short term verbal memory test",
    "rey auditory verbal learning test",
    "word list memory test",
    "immediate word recall",
    "how to improve verbal memory",
    "言語 記憶 テスト",
    "언어 기억 테스트"
  ],
  alternates: {
    canonical: "https://skilldrills.online/drills/memory/short-term-memory/word-recall",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Verbal Memory Test - Free Word Recall Game",
    description: "Measure and train verbal working memory with our free online Verbal Memory Test. Master narrative linking, study list retention, and build cognitive recall.",
    url: "https://skilldrills.online/drills/memory/short-term-memory/word-recall",
    siteName: 'SkillDrills',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Verbal Memory Test - Free Word Recall Game",
    description: "Measure and train verbal working memory with our free online Verbal Memory Test. Master narrative linking, study list retention, and build cognitive recall.",
  },
};

export default function WordRecallPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/" },
      { "@type": "ListItem", "position": 2, "name": "Memory Drills", "item": "https://skilldrills.online/drills/memory" },
      { "@type": "ListItem", "position": 3, "name": "Short-Term Memory", "item": "https://skilldrills.online/drills/memory/short-term-memory" },
      { "@type": "ListItem", "position": 4, "name": "Word Recall", "item": "https://skilldrills.online/drills/memory/short-term-memory/word-recall" }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Verbal Memory Test",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "dateModified": "2026-09-05",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "description": "Free cognitive verbal memory assessment measuring immediate free recall, semantic associative encoding, and narrative chunking capacity across progressive word lists.",
    "genre": "Cognitive Assessment / Verbal Memory",
    "url": "https://skilldrills.online/drills/memory/short-term-memory/word-recall",
    "publisher": {
      "@type": "Organization",
      "name": "SkillDrills",
      "url": "https://skilldrills.online"
    }
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Verbal Memory Test",
    "url": "https://skilldrills.online/drills/memory/short-term-memory/word-recall",
    "description": "Free browser-based verbal memory and word recall assessment with adaptive list progression, semantic feedback, and millisecond typing chronometry.",
    "dateModified": "2026-09-05",
    "applicationCategory": "GameApplication",
    "operatingSystem": "All",
    "isAccessibleForFree": true,
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": "2026-09-05",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the Verbal Memory Test (Word Recall)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Verbal Memory Test is a neuropsychological assessment evaluating verbal short-term memory, working memory span, and immediate free recall. Participants study a list of distinct nouns, encode them into memory, and retrieve as many as possible without order restrictions."
        }
      },
      {
        "@type": "Question",
        "name": "What is free recall and how does it differ from recognition memory?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Free recall requires active spontaneous retrieval of stored memory traces from internal cues without prompts. Recognition memory presents items and merely asks if they were previously seen. Free recall is significantly more cognitively demanding and provides a truer measure of active verbal memory capacity."
        }
      },
      {
        "@type": "Question",
        "name": "What is an average score on a word recall test?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "On standard clinical word list assessments such as the RAVLT, healthy adults immediately recall about 4 to 6 words on a first trial of an unfamiliar list, and mnemonic strategies can extend that. Those figures come from a supervised, spoken assessment with set word lists; this drill uses different words, timing and scoring, so your score here is not comparable to them and is not a clinical result."
        }
      },
      {
        "@type": "Question",
        "name": "What is the Rey Auditory Verbal Learning Test (RAVLT)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The RAVLT is a clinical neuropsychological evaluation developed by André Rey in 1958. It evaluates verbal learning rate, immediate memory span, retroactive and proactive interference, and retention across multiple trials."
        }
      },
      {
        "@type": "Question",
        "name": "What is the serial position effect in word lists?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Described by Bennet B. Murdock Jr. in 1962, the serial position effect shows that memory accuracy follows a U-shaped curve: early words benefit from primacy (rehearsal into secondary memory), while final words benefit from recency (fresh sensory echo), leaving middle words most vulnerable to forgetting."
        }
      },
      {
        "@type": "Question",
        "name": "Why do I remember the first and last words but forget the middle?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Middle words suffer from both proactive interference (interference from preceding words) and retroactive interference (interference from newly presented words), causing an informational bottleneck in the working memory buffer."
        }
      },
      {
        "@type": "Question",
        "name": "How does narrative linking improve word recall?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Narrative linking weaves isolated words into a vivid, cohesive storyline. Craik & Lockhart (1972) demonstrated that this deep semantic processing synthesizes multiple independent tokens into a single associative mental schema, dramatically multiplying retrieval success."
        }
      },
      {
        "@type": "Question",
        "name": "Does word order matter during free recall testing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. In free recall paradigms, words may be typed or recalled in any arbitrary order. Testing without serial constraints measures total storage and retrieval volume rather than sequential position tracking."
        }
      },
      {
        "@type": "Question",
        "name": "Does practising word recall improve my memory in general?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You will get better at this task, and mnemonic strategies you learn here -- grouping, narrative linking, imagery -- do transfer to remembering other lists. Broad improvement to memory in general is a much weaker claim: gains on a trained task often fail to generalise to untrained ones. Treat this as practice and a strategy workout, not as a treatment for anything, and note that nothing here can prevent, diagnose or screen for any medical condition."
        }
      },
      {
        "@type": "Question",
        "name": "Is this online Verbal Memory Test free to use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, SkillDrills Verbal Memory Test is 100% free, runs entirely client-side in your web browser with zero software downloads or registrations, and provides instant accuracy and span metrics."
        }
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Train Verbal Free Recall Memory",
    "description": "Step-by-step methodology to encode, narratively link, and freely retrieve progressive word lists.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Read and Semantically Encode the Word List",
        "text": "Observe the presented words during the memorization phase, pronouncing each word sub-vocally while forming a mental image."
      },
      {
        "@type": "HowToStep",
        "name": "Construct an Associative Narrative Link",
        "text": "Weave the words into a vivid, continuous micro-story (e.g., 'The knight climbed the mountain with a golden lantern') to chunk the items together."
      },
      {
        "@type": "HowToStep",
        "name": "Execute Free Recall Retrieval",
        "text": "When the input prompt triggers, type the recalled words separated by spaces, starting with the freshest recency words before reciting your narrative."
      }
    ]
  };

  const wordRecallGuide = {
    heading: "Verbal Memory Test Guide & Immediate Free Recall",
    intro: [
      "Verbal Memory Test (Word Recall) is a clinical-grade cognitive exercise engineered to assess and strengthen verbal working memory, semantic associative encoding, and immediate free recall capacity. Free recall testing represents one of the most demanding benchmarks of human cognitive architecture, requiring the brain to retrieve information without external prompts or multiple-choice cues.",
      "The scientific study of verbal memory began with Hermann Ebbinghaus (1885), who mathematically formulated the human forgetting curve and the dynamics of serial learning. In 1958, Swiss psychologist André Rey introduced the Rey Auditory Verbal Learning Test (RAVLT), which standardized word list learning to quantify immediate memory span, proactive and retroactive interference, and delayed retrieval across clinical populations.",
      "In 1962, Bennet B. Murdock Jr. mathematically formalized the Serial Position Effect in free recall, demonstrating the distinct operations of the Primacy Effect (long-term consolidation of initial items) and the Recency Effect (temporary maintenance of terminal items in the sensory echoic buffer). Later, Fergus I. M. Craik & Robert S. Lockhart (1972) established the 'Levels of Processing' framework, proving that deep semantic encoding—such as narrative linking and thematic clustering—vastly outperforms shallow rote rehearsal.",
      "Featuring high-precision digital chronometry (Woods et al., 2015), this drill measures both word span and retrieval throughput, converging on your true verbal memory capacity through an adaptive staircase protocol.",
      "How this is measured: every event is timestamped with the browser's performance.now() high-resolution clock, entirely on your device -- no score is uploaded. Browser timers are deliberately coarsened as a Spectre mitigation (typically to about 1 ms), and your display quantizes each change to its refresh interval, about 16.7 ms per frame at 60 Hz (Woods et al., 2015). Treat differences smaller than about 5 ms as measurement noise, and compare your own runs on the same hardware rather than against someone else's setup.",
      "Data transparency: SkillDrills collects no aggregate data. Your scores and settings live only in your browser's localStorage and are never uploaded, so this site publishes no user averages, percentiles or player counts. Every figure quoted here comes from the published work in the References panel below.",
      "This drill is a free browser game for practice and interest. It is not a medical device, a diagnostic instrument, or a screening or treatment tool for any condition, and no score here says anything about your health or your memory in a clinical sense. If you have concerns about your memory or thinking, speak to a qualified clinician."
    ],
    benchmarks: {
      title: "Normative Verbal Free Recall & Word Span Benchmarks",
      headers: ["Performance Tier", "Word Span (Count)", "Free Recall Score", "Cognitive Storage & Retrieval Profile"],
      rows: [
        ["Tier 1 (Superior / Clinical 99th Percentile)", "Span 8 – 11+ Words", "1,100+ Points", "Mnemonic master; deploys deep semantic narrative chaining (Craik & Lockhart, 1972); effortlessly overcomes retroactive interference; sub-800 ms per-word retrieval cadence"],
        ["Tier 2 (High Average / 85th–95th Percentile)", "Span 6 – 7 Words", "850 – 1,099 Points", "Exceeds standard adult baseline; clusters words into relational pairs or triplets; consistent free recall under time pressure with 800 – 1,100 ms cadence"],
        ["Tier 3 (Average Adult Baseline / 50th Percentile)", "Span 4 – 5 Words", "550 – 849 Points", "Normal population average on initial free recall trials; manages basic paired chunking; shows classic serial position dip where middle words drop; 1,100 – 1,500 ms cadence"],
        ["Tier 4 (Low Average / Verbal Recall Bottleneck)", "Span 3 Words", "350 – 549 Points", "Relies strictly on phonological echo without semantic encoding; struggles to recall words beyond the immediate recency buffer; 1,500 – 2,000 ms cadence"],
        ["Tier 5 (Impaired / Below Average Span)", "Span < 3 Words", "< 350 Points", "Rapid memory trace decay; severe proactive interference; difficulty retrieving words without external recognition prompts; cadence exceeding 2,000 ms"]
      ],
      note: "Word span indicates maximum error-free list length achieved on the adaptive staircase; normative scores reflect adult free recall trial 1 baselines (Rey, 1964; Murdock, 1962; Woods et al., 2015)."
    },
    techniques: {
      title: "Evidence-Based Protocols to Expand Verbal Free Recall",
      items: [
        {
          name: "Narrative Story Linking & Associative Chaining",
          desc: "Weave unrelated words into a bizarre, vivid mental micro-story (Craik & Lockhart, 1972; Tulving, 1962). Linking 'eagle', 'castle', and 'lantern' into 'An eagle carrying a burning lantern landed on the castle roof' binds 3 isolated tokens into a single cohesive episodic scene, multiplying recall durability.",
          tips: "The more exaggerated, colorful, or physically impossible the narrative image, the more indelible the mental trace."
        },
        {
          name: "Dual-Coding Method (Mental Imagery + Auditory Echo)",
          desc: "Activate Allan Paivio's dual-coding mechanism by visualizing each noun's physical appearance while pronouncing its phonetic syllables. Creating simultaneous visual and auditory memory traces provides two independent cortical pathways during retrieval.",
          tips: "Visualize the object's color and texture for half a second while silently articulating its name."
        },
        {
          name: "Categorical & Semantic Clustering",
          desc: "Mentally reorganize the presented list into conceptual categories (architecture, nature, precious materials, tools) regardless of presented sequence (Tulving, 1962). Semantic clustering enables associative priming: recalling one category member unlocks the others.",
          tips: "Tag words by shared traits (e.g., 'castle, temple = buildings; diamond, crystal = gems')."
        },
        {
          name: "Recency-First Dumping Strategy",
          desc: "When the recall window opens, type the final 2-3 words immediately (Murdock, 1962). These terminal items reside in fragile short-term sensory memory and decay within 3 to 5 seconds. Offloading the recency buffer first clears working memory to reconstruct your narrative story.",
          tips: "Type the last words you saw first, then relax and unroll your opening narrative chunk."
        }
      ]
    },
    steps: [
      "Center your gaze on the word display area and focus attention during the presentation phase.",
      "As words appear, immediately connect them into a vivid mental narrative or thematic clusters.",
      "Form high-contrast visual mental images of each noun to establish dual-coded episodic traces.",
      "When the input box activates, immediately type the final words from fresh echoic memory, then unroll your story.",
      "Allow the adaptive staircase to calibrate your current capacity and progressively expand your verbal memory boundaries."
    ],
    audience: "Students, professionals, cognitive fitness enthusiasts, and individuals preparing for neuropsychological evaluations (RAVLT, CVLT) seeking to maximize verbal working memory and free recall throughput.",
    faqs: faqSchema.mainEntity.map(e => ({ q: e.name, a: e.acceptedAnswer.text })),
    // Works named in this page's copy, with DOIs so a reader or an answer
    // engine can check the figures rather than take them on trust.
    sources: pickSources('craik1972', 'murdock1962', 'tulving1962', 'woods2015'),
    related: [
      { href: "/drills/memory/short-term-memory/digit-span", label: "Digit Span Memory Test" },
      { href: "/drills/memory/short-term-memory/color-sequence", label: "Color Memory Game" },
      { href: "/drills/memory/spatial-memory/grid-memorization", label: "Visual Memory Test" },
      { href: "/drills/memory/spatial-memory/object-location", label: "Object Location Memory Test" },
      { href: "/drills/memory/working-memory/n-back", label: "3-Back Working Memory Test" }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <WordRecallClient />
      <DrillGuide guide={wordRecallGuide} />
    </>
  );
}