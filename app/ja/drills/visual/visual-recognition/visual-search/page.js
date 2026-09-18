import VisualSearchClient from '@/app/drills/visual/visual-recognition/visual-search/VisualSearchClientLoader';
import { getAlternateLanguages } from '@/lib/i18n/locales';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';

export const metadata = {
  title: "視覚探索テスト: 結合特徴スキャン＆標的検出 | SkillDrills",
  description: "96個の回転妨害文字から指定標的を最速で見つけ出す無料視覚探索テスト。特徴統合理論に基づく高密度マトリクスで選択的注意と周辺視野スキャン速度を測定・強化。",
  keywords: [
    "視覚探索テスト",
    "結合特徴探索",
    "特徴統合理論 トレイスマン",
    "選択的視覚注意 測定",
    "視覚走査トレーニング",
    "目標検出テスト",
    "周辺視野スキャン",
    "視覚探索速度",
    "符号探索 検査",
    "視覚的注意 集中力"
],
  openGraph: {
    title: "視覚探索テスト: 結合特徴スキャン＆標的検出 | SkillDrills",
    description: "96個の回転妨害文字から指定標的を最速で見つけ出す無料視覚探索テスト。特徴統合理論に基づく高密度マトリクスで選択的注意と周辺視野スキャン速度を測定・強化。",
    type: "website",
    url: "https://skilldrills.online/ja/drills/visual/visual-recognition/visual-search",
    siteName: "SkillDrills",
  },
  twitter: {
    card: "summary_large_image",
    title: "視覚探索テスト: 結合特徴スキャン＆標的検出 | SkillDrills",
    description: "96個の回転妨害文字から指定標的を最速で見つけ出す無料視覚探索テスト。特徴統合理論に基づく高密度マトリクスで選択的注意と周辺視野スキャン速度を測定・強化。",
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://skilldrills.online/ja/drills/visual/visual-recognition/visual-search",
    languages: getAlternateLanguages('/drills/visual/visual-recognition/visual-search', 'ja'),
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "SkillDrills", "item": "https://skilldrills.online/ja/" },
    { "@type": "ListItem", "position": 2, "name": "視覚トレーニング", "item": "https://skilldrills.online/ja/drills/visual" },
    { "@type": "ListItem", "position": 3, "name": "視覚認識", "item": "https://skilldrills.online/ja/drills/visual/visual-recognition" },
    { "@type": "ListItem", "position": 4, "name": "視覚探索テスト – 結合特徴スキャン", "item": "https://skilldrills.online/ja/drills/visual/visual-recognition/visual-search" }
  ]
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "視覚探索テスト – 結合特徴スキャン",
  "applicationCategory": "HealthApplication",
  "operatingSystem": "All",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "無料のオンライン結合視覚探索テスト。回転妨害文字が密集する12x8マトリクスから指定標的を素早く発見し、視覚探索速度と選択的注意力を測定。",
  "url": "https://skilldrills.online/ja/drills/visual/visual-recognition/visual-search",
  "publisher": { "@type": "Organization", "name": "SkillDrills", "url": "https://skilldrills.online" },
  "dateModified": "2026-09-05"
};

const webApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "結合視覚探索＆標的検出テスト",
  "browserRequirements": "Requires HTML5 canvas and JavaScript",
  "url": "https://skilldrills.online/ja/drills/visual/visual-recognition/visual-search",
  "applicationCategory": "EducationalApplication",
  "dateModified": "2026-09-05"
};

const videoGameSchema = {
  "@context": "https://schema.org",
  "@type": "VideoGame",
  "name": "視覚探索：結合特徴スキャントレーニング",
  "url": "https://skilldrills.online/ja/drills/visual/visual-recognition/visual-search",
  "description": "無料の科学的視覚探索ゲーム。96個の回転妨害文字の中から指定された標的を電光石火で検出し、視覚的情報処理速度を高めましょう。",
  "genre": ["Action", "Brain Game", "Search Game"],
  "gamePlatform": ["Web Browser", "Desktop", "Mobile"],
  "applicationCategory": "Game",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "視覚探索速度と結合特徴スキャン能力を向上させるトレーニング法",
  "description": "トレイスマンの特徴統合理論とウォルフのガイド探索モデルに裏付けられた4段階の科学的スキャン実践プロトコル。",
  "dateModified": "2026-09-05",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "画面上部に表示される標的文字の形状を記憶",
      "text": "探すべき指定シンボルの輪郭と特徴パターンを作業記憶に正確に刻み込みます。",
      "url": "https://skilldrills.online/ja/drills/visual/visual-recognition/visual-search#step-1"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "周辺視野を活かした粗いスクリーニング",
      "text": "すべてのマスを凝視するのではなく、視線を少し浮かせ、明らかに輪郭の異なる文字群を周辺視で一掃します。",
      "url": "https://skilldrills.online/ja/drills/visual/visual-recognition/visual-search#step-2"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "規則的なジグザグ走査（サッケード）を展開",
      "text": "96マスのグリッドを一定のリズムで水平・垂直にジグザグ走査し、無駄な視線の重複を防ぎます。",
      "url": "https://skilldrills.online/ja/drills/visual/visual-recognition/visual-search#step-3"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "標的を捉えた瞬間に即座にタップ",
      "text": "候補が指定文字と合致した瞬間、躊躇なくクリックしてミリ秒単位の探索潜時とスコアを記録します。",
      "url": "https://skilldrills.online/ja/drills/visual/visual-recognition/visual-search#step-4"
    }
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "dateModified": "2026-09-05",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "視覚探索テスト（Visual Search Test）とはどのような検査ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "高密度に散らばった妨害刺激の中から目標となるシンボルを特定する視覚走査速度、特徴統合効率、選択的注意力を測定するテストです。96個の回転文字から指定標的を45秒間で探します。"
      }
    },
    {
      "@type": "Question",
      "name": "単純特徴探索と結合探索はどう違いますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "単純特徴探索は1つの属性だけで区別できるため瞬時のポップアウトが起こります。結合探索は複数の特徴を統合する必要があるため、注意を1つずつ巡回させる系列探索が必須になります (Treisman & Gelade, 1980)。"
      }
    },
    {
      "@type": "Question",
      "name": "なぜ文字がランダムに回転しているのですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "文字が一定の向きで並んでいるとゲシュタルト心理学的な背景グループ化によって標的が浮き彫りになってしまうためです。回転を加えることで背景化を崩し、純粋な識別力を試します。"
      }
    },
    {
      "@type": "Question",
      "name": "ウォルフの『ガイド探索』モデルとは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "初期視覚野が粗い特徴情報を並列処理して優先順位マップを作り、可能性の高い領域へ効率よく視線を誘導するという認知モデルです (Wolfe, 1994)。"
      }
    },
    {
      "@type": "Question",
      "name": "45秒のテストで優秀とされるスコアはどのくらいですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "初心者は300〜550点（2〜3回発見）、標準的な成人で600〜1,000点（4〜6回）です。プロゲーマーや熟練者は1,500点以上（10回以上、潜時450ms以下）を記録します。"
      }
    },
    {
      "@type": "Question",
      "name": "ラヴィの知覚負荷理論（Perceptual Load Theory）とは？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "課題の感覚的負荷が高いほど脳の処理リソースが完全に消費され、課題と無関係な刺激や雑念が遮断されて驚異的な集中状態が生まれるという理論です (Lavie, 1995)。"
      }
    },
    {
      "@type": "Question",
      "name": "探索の上級者と初心者では目の動きにどのような差がありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "上級者は整然としたジグザグ走査、広い周辺視野の活用、200ms前後の短い固視時間を示しますが、初心者は視線があちこち彷徨い、1文字に長く滞留します。"
      }
    },
    {
      "@type": "Question",
      "name": "誤タップ時のペナルティはありますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "スコアの減点や制限時間の短縮はありません。赤いシグナルが表示されるだけでペナルティはないため、確信が持てたら躊躇なくタップするのが高得点の秘訣です。"
      }
    },
    {
      "@type": "Question",
      "name": "どのような職業やスポーツで視覚探索能力が求められますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "レントゲンやCTを診断する医師、航空管制官、セキュリティ検査員、軍事オペレーターのほか、サッカーやFPSゲームなど瞬時に標的を捉える全競技で極めて重要です。"
      }
    },
    {
      "@type": "Question",
      "name": "探索速度を劇的に速めるにはどのような練習が効果的ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "無駄な視線の往復をなくすジグザグ走査の習慣化、周辺視野での一括除外、1箇所に250ms以上留まらない素早い視線移動を意識することです。"
      }
    }
  ]
};

export default function VisualSearchLocalePage() {
  const sources = pickSources('treisman1980', 'wolfe1994', 'duncan1989', 'lavie1995', 'eriksen1986', 'bacon1994', 'woods2015');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <VisualSearchClient copy={{ title: "視覚探索：結合特徴スキャントレーニング" }} />
      <DrillGuide
        eyebrow="認知心理学 & 視覚探索メカニズム"
        title="視覚探索・特徴統合理論・選択的注意の神経科学"
        sources={sources}
      >
        <p dangerouslySetInnerHTML={{ __html: `視覚的ノイズや妨害要素が散乱する複雑な環境下から特定のターゲットを素早く見つけ出す能力は、極めて高度な脳機能です。放射線科医によるレントゲン読影、空港の手荷物X線検査、自動車運転時の障害物発見、eスポーツにおける索敵など、あらゆる動的状況において中心的な役割を果たしています (Treisman & Gelade, 1980; Wolfe, 1994)。` }} />

        <h3>特徴統合理論：並列ポップアウト vs 系列的結合探索</h3>
        <p dangerouslySetInnerHTML={{ __html: `アン・トレイスマン（Anne Treisman）の特徴統合理論（FIT）によれば、ターゲットが色や単純な向きなど1つの基本特徴で妨害物と異なる場合、脳は視野全体を<strong>前注意的に並列スキャン</strong>し、妨害要素の数にかかわらず一瞬で発見します（ポップアウト現象）。しかし、複数の特徴の組み合わせで定義される結合探索や、本ドリル斑のように妨害文字が不規則に回転している環境では並列処理が通用しません。視覚系は注意のスポットライトを1つずつ順番に当てる<strong>系列探索（Serial Search）</strong>を強いられ、妨害要素が増えるほど探索時間が線形に増加します (Treisman & Gelade, 1980; Duncan & Humphreys, 1989)。` }} />

        <h3>ガイド探索モデル（GS）と妨害要素の均質性</h3>
        <p dangerouslySetInnerHTML={{ __html: `ジェレミー・ウォルフ（Jeremy Wolfe）の『ガイド探索（Guided Search）』モデルは、脳が完全に当てずっぽうで探すのではなく、初期視覚野の特徴マップを統合して『優先順位マップ（Priority Map）』を形成することを示しました。ダンカンとハンフリーズ（Duncan & Humphreys, 1989）の法則が示す通り、妨害要素が同じ向きで揃っていればゲシュタルト心理学的な背景化が生じますが、本ドリルでは文字がバラバラに回転しているため背景化が崩壊し、個別の中心窩精査が不可欠となります。` }} />

        <h3>ズームレンズモデル & 知覚負荷理論 (Lavie, 1995; Eriksen & St. James, 1986)</h3>
        <p dangerouslySetInnerHTML={{ __html: `エリックセンのズームレンズモデル（Eriksen & St. James, 1986）によれば、視覚的注意は焦点径を調整できるライトのように機能します。照射野を広げると解像度が低下し、1マスに絞ると解像度が最大化します。またニリ・ラヴィ（Nilli Lavie）の知覚負荷理論（1995）は、感覚負荷が高い課題ほど余剰な注意が残らず、雑念や無関係な刺激が脳内で自動的に遮断されることを実証しました。96マスの高密度文字グリッド下での45秒タイムアタックは、認知帯域を100%飽和させて極限の集中力を引き出します (Lavie, 1995; Bacon & Egeth, 1994)。` }} />

        <h3>視覚探索潜時・スコア性能基準（96セルマトリクス）</h3>
        <div className="overflow-x-auto my-6">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/10 text-slate-400">
                <th className="py-2.5 px-3 font-semibold">ランク</th>
                <th className="py-2.5 px-3 font-semibold">標的検出潜時</th>
                <th className="py-2.5 px-3 font-semibold">45秒獲得スコア</th>
                <th className="py-2.5 px-3 font-semibold">到達レベル</th>
                <th className="py-2.5 px-3 font-semibold">分類プロファイル</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="py-2.5 px-3 font-bold text-purple-400">Tier 1</td>
                <td className="py-2.5 px-3 font-semibold text-white">&lt; 450 ms</td>
                <td className="py-2.5 px-3 tabular-nums">&gt; 1,500 PTS (10回以上検出)</td>
                <td className="py-2.5 px-3 tabular-nums">卓越</td>
                <td className="py-2.5 px-3">プロゲーマー / レーダー迎撃管制官</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-teal-400">Tier 2</td>
                <td className="py-2.5 px-3 font-semibold text-white">450 – 700 ms</td>
                <td className="py-2.5 px-3 tabular-nums">1,050 – 1,450 PTS (7–9回)</td>
                <td className="py-2.5 px-3 tabular-nums">上級</td>
                <td className="py-2.5 px-3">競技アスリート / 高度視覚認知者</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-blue-400">Tier 3</td>
                <td className="py-2.5 px-3 font-semibold text-white">701 – 1,100 ms</td>
                <td className="py-2.5 px-3 tabular-nums">600 – 1,000 PTS (4–6回)</td>
                <td className="py-2.5 px-3 tabular-nums">標準</td>
                <td className="py-2.5 px-3">一般的な未訓練成人の標準値</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-amber-400">Tier 4</td>
                <td className="py-2.5 px-3 font-semibold text-white">1,101 – 1,600 ms</td>
                <td className="py-2.5 px-3 tabular-nums">300 – 550 PTS (2–3回)</td>
                <td className="py-2.5 px-3 tabular-nums">発展途上</td>
                <td className="py-2.5 px-3">探索の遅延 / 視覚的疲労の蓄積</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-rose-400">Tier 5</td>
                <td className="py-2.5 px-3 font-semibold text-white">&gt; 1,600 ms</td>
                <td className="py-2.5 px-3 tabular-nums">&lt; 300 PTS (0–1回)</td>
                <td className="py-2.5 px-3 tabular-nums">初級</td>
                <td className="py-2.5 px-3">視野狭窄 / 視覚的過負荷状態</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>探索スループットを極限まで高める実践プロトコル</h3>
        <ol className="list-decimal pl-5 space-y-2 my-4 text-slate-300">
          <li>
            <strong>周辺視野による粗い特徴除外（Wolfe, 1994）:</strong> 1文字ずつ順番に凝視してはいけません。視線をグリッド上部に軽く置き、明らかに外形が異なる文字群を周辺視野で一気に視覚野から除外します。
          </li>
          <li>
            <strong>規則的なジグザグ走査の徹底:</strong> 視線をあちこちに飛ばすランダム走査を避け、水平または垂直の整然としたジグザグ軌道を描いて重複確認をゼロにします。
          </li>
          <li>
            <strong>最適固視時間（200〜250ms）の厳守:</strong> 1箇所に留まる時間を人間の視覚情報処理の最小単位である200〜250ミリ秒に制限し、一致しなければ即座に次の文字へ跳躍します。
          </li>
          <li>
            <strong>作業記憶での標的テンプレート維持:</strong> 探すべき文字の回転形態を脳内に明確に保ち、腹側視覚路での妨害刺激抑制を自動化します (Duncan & Humphreys, 1989)。
          </li>
        </ol>

        <h3>よくある質問 (FAQ)</h3>
        <div className="space-y-4 my-6">
          <div>
            <h4 className="font-semibold text-white">視覚探索テスト（Visual Search Test）とはどのような検査ですか？</h4>
            <p className="text-slate-300 mt-1">
              高密度に散らばった妨害刺激の中から目標となるシンボルを特定する視覚走査速度、特徴統合効率、選択的注意力を測定するテストです。96個の回転文字から指定標的を45秒間で探します。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">単純特徴探索と結合探索はどう違いますか？</h4>
            <p className="text-slate-300 mt-1">
              単純特徴探索は1つの属性だけで区別できるため瞬時のポップアウトが起こります。結合探索は複数の特徴を統合する必要があるため、注意を1つずつ巡回させる系列探索が必須になります (Treisman & Gelade, 1980)。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">なぜ文字がランダムに回転しているのですか？</h4>
            <p className="text-slate-300 mt-1">
              文字が一定の向きで並んでいるとゲシュタルト心理学的な背景グループ化によって標的が浮き彫りになってしまうためです。回転を加えることで背景化を崩し、純粋な識別力を試します。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">ウォルフの『ガイド探索』モデルとは何ですか？</h4>
            <p className="text-slate-300 mt-1">
              初期視覚野が粗い特徴情報を並列処理して優先順位マップを作り、可能性の高い領域へ効率よく視線を誘導するという認知モデルです (Wolfe, 1994)。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">45秒のテストで優秀とされるスコアはどのくらいですか？</h4>
            <p className="text-slate-300 mt-1">
              初心者は300〜550点（2〜3回発見）、標準的な成人で600〜1,000点（4〜6回）です。プロゲーマーや熟練者は1,500点以上（10回以上、潜時450ms以下）を記録します。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">ラヴィの知覚負荷理論（Perceptual Load Theory）とは？</h4>
            <p className="text-slate-300 mt-1">
              課題の感覚的負荷が高いほど脳の処理リソースが完全に消費され、課題と無関係な刺激や雑念が遮断されて驚異的な集中状態が生まれるという理論です (Lavie, 1995)。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">探索の上級者と初心者では目の動きにどのような差がありますか？</h4>
            <p className="text-slate-300 mt-1">
              上級者は整然としたジグザグ走査、広い周辺視野の活用、200ms前後の短い固視時間を示しますが、初心者は視線があちこち彷徨い、1文字に長く滞留します。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">誤タップ時のペナルティはありますか？</h4>
            <p className="text-slate-300 mt-1">
              スコアの減点や制限時間の短縮はありません。赤いシグナルが表示されるだけでペナルティはないため、確信が持てたら躊躇なくタップするのが高得点の秘訣です。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">どのような職業やスポーツで視覚探索能力が求められますか？</h4>
            <p className="text-slate-300 mt-1">
              レントゲンやCTを診断する医師、航空管制官、セキュリティ検査員、軍事オペレーターのほか、サッカーやFPSゲームなど瞬時に標的を捉える全競技で極めて重要です。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">探索速度を劇的に速めるにはどのような練習が効果的ですか？</h4>
            <p className="text-slate-300 mt-1">
              無駄な視線の往復をなくすジグザグ走査の習慣化、周辺視野での一括除外、1箇所に250ms以上留まらない素早い視線移動を意識することです。
            </p>
          </div>
        </div>
      </DrillGuide>
      <div className="max-w-6xl mx-auto px-4 pb-12">
        <RelatedDrills currentCategory="visual" currentHref="https://skilldrills.online/ja/drills/visual/visual-recognition/visual-search" />
      </div>
    </>
  );
}
