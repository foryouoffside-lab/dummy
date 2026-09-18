import DistractionFighterClient from '@/app/drills/cognitive/focus/distraction-fighter/DistractionFighterClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';

// ============================================================
// SEO RESEARCH FINDINGS — ja-JP (distraction-fighter / stroop-test)
// PRIMARY DOMESTIC: "ストループテスト" — 121 exact / 121 broad searches/mo
//                   "ストループ効果"   — 86 exact searches/mo
//                   Combined cluster: >200 searches/mo (Cognitive test winner)
// SECONDARY:        "認知的抑制機能 測定", "前頭前野 トレーニング"
// WINNER TITLE:     ストループテスト – 無料オンライン認知干渉・抑制機能テスト | SkillDrills
// ============================================================

export const metadata = {
  title: 'ストループテスト – 無料オンライン認知干渉・抑制機能テスト | SkillDrills',
  description:
    '無料オンラインのストループテスト（Stroop Test）。文字の意味と異なるインクの色を瞬時に判断してタップ。選択的注意力、衝動抑制、認知柔軟性を鍛える本格脳トレドリル。登録不要・ブラウザですぐに測定。',
  keywords: [
    'ストループテスト',
    'ストループ効果',
    '認知的抑制',
    '選択的注意',
    '前頭前野 トレーニング',
    '脳トレ ゲーム 無料',
    '集中力 テスト',
    '衝動抑制 トレーニング',
    '情報処理速度',
    '認知機能検査',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/cognitive/focus/distraction-fighter',
    languages: getAlternateLanguages('/drills/cognitive/focus/distraction-fighter'),
  },
  openGraph: {
    title: 'ストループテスト – 無料オンライン認知干渉・抑制機能テスト | SkillDrills',
    description:
      '無料オンラインのストループテスト（Stroop Test）。文字の意味と異なるインクの色を瞬時に判断してタップ。選択的注意力、衝動抑制、認知柔軟性を鍛える脳トレドリル。',
    url: 'https://skilldrills.online/ja/drills/cognitive/focus/distraction-fighter',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ストループテスト – 無料オンライン認知干渉・抑制機能テスト | SkillDrills',
    description: '無料オンラインのストループテスト。文字の意味と異なるインクの色を瞬時に判別し、認知抑制力を測定・トレーニング。',
  },
  robots: { index: true, follow: true },
};

// --- Structured Data Schemas ---

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'SkillDrills ホーム', item: 'https://skilldrills.online/ja' },
    { '@type': 'ListItem', position: 2, name: 'ドリル一覧', item: 'https://skilldrills.online/ja/drills' },
    { '@type': 'ListItem', position: 3, name: '認知機能', item: 'https://skilldrills.online/ja/drills/cognitive' },
    { '@type': 'ListItem', position: 4, name: 'ストループテスト', item: 'https://skilldrills.online/ja/drills/cognitive/focus/distraction-fighter' },
  ],
};

const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'ストループテスト – 無料オンライン認知干渉・抑制機能テスト',
  alternateName: ['ストループテスト', 'ストループ効果テスト', 'Stroop Test Online Japan'],
  applicationCategory: 'HealthApplication',
  operatingSystem: 'All',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  description: '文字の意味とインク色の不一致を瞬時に見極め、認知的抑制機能（インヒビション）と情報処理速度を測定・訓練する無料ゲームツール。',
  browserRequirements: 'JavaScript対応の最新Webブラウザ（Chrome, Edge, Safari, Firefox）',
  softwareVersion: '2.0',
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'ストループテスト — 無料オンライン認知干渉・抑制機能テスト | SkillDrills',
  url: 'https://skilldrills.online/ja/drills/cognitive/focus/distraction-fighter',
  description: '無料オンラインのストループ効果テスト。色名単語のインク色を瞬時に判別し、認知抑制力と情報処理速度を測定・トレーニングします。',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'All',
  browserRequirements: 'JavaScript対応の最新Webブラウザが必要。',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  author: { '@type': 'Organization', name: 'SkillDrills', url: 'https://skilldrills.online' },
  isAccessibleForFree: true,
  learningResourceType: 'Educational Game',
  teaches: 'ストループ効果, 認知的抑制, 選択的注意, 情報処理速度, 前頭前野機能',
};


const videoGameSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoGame',
  name: 'ストループテスト オンライン (Stroop Test Game)',
  url: 'https://skilldrills.online/ja/drills/cognitive/focus/distraction-fighter',
  description: '文字の意味とインク色の不一致を瞬時に見極める認知干渉抑制テスト・脳トレゲーム。',
  dateModified: '2026-09-11',
  gamePlatform: 'Web Browser',
  genre: ['認知トレーニング', '脳トレ', 'ストループテスト', '注意力テスト'],
  playMode: 'SinglePlayer',
  applicationCategory: 'Game',
  operatingSystem: 'Web Browser',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'ストループテストで認知抑制力を鍛える4ステップ',
  description: '文字の自動的な読み衝動を抑え、色識別と集中力を高めるステップ。',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      url: 'https://skilldrills.online/ja/drills/cognitive/focus/distraction-fighter#step-1',
      name: 'インクの色にのみ意識を集中する',
      text: '画面に表示される文字の意味（漢字・カタカナ）を読まず、物理的なフォントの色（インク色）だけを注視します。',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      url: 'https://skilldrills.online/ja/drills/cognitive/focus/distraction-fighter#step-2',
      name: '該当する色の選択ボタンを素早く押す',
      text: '表示された文字の意味に惑わされず、インク色と一致する選択肢ボタン（赤・青・緑・黄など）をタップします。',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      url: 'https://skilldrills.online/ja/drills/cognitive/focus/distraction-fighter#step-3',
      name: '衝動的な誤答を避けてコンボを維持する',
      text: '焦って文字の意味に引きずられたボタンを押さないよう、一瞬の認知的ブレーキ（抑制機能）を働かせます。',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      url: 'https://skilldrills.online/ja/drills/cognitive/focus/distraction-fighter#step-4',
      name: 'レベルアップによる制限時間の短縮に対応する',
      text: '正解を重ねるごとに制限時間が短くなり、認知的負荷が増加。45秒間のセッションで限界スコアを目指します。',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  dateModified: '2026-09-11',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'ストループテストとは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ストループテスト（Stroop test）は、1935年にJ.リドリー・ストループによって発表された心理学の古典的実験課題です。「赤」という文字が青色のインクで書かれている場合のように、文字の意味と物理的な色が食い違う状況において、文字の意味を無視して「青」と答える課題を通じて、脳の認知的抑制機能や選択的注意力を測定します。',
      },
    },
    {
      '@type': 'Question',
      name: 'ストループ効果が起きる理由は何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '人間にとって「文字を読む」という行為は長年の学習により高度に自動化されており、意識しなくても勝手に意味が頭に入ってきます。一方、「文字のインク色を識別して名付ける」行為には意識的な努力が必要です。自動的な読みの反応が先に立ち上がってしまうため、それを前頭葉で抑制するのに時間がかかり、反応の遅れやエラー（干渉効果）が生じます（MacLeod, 1991）。',
      },
    },
    {
      '@type': 'Question',
      name: '認知的抑制機能（インヒビション）とは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '認知的抑制機能（Inhibitory Control）とは、目的の達成を妨げる不要な衝動、思考、自動的習慣、周囲の刺激を自制・ブロックする脳の実行機能の一つです。ワーキングメモリや認知的柔軟性と並ぶ前頭前野の最重要機能であり、注意散漫の防止やマルチタスク環境での集中維持に直結します。',
      },
    },
    {
      '@type': 'Question',
      name: 'ストループテストで良いスコアを出すコツはありますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '文字の意味を頭の中で発音（内言）しないよう意識し、文字の輪郭や全体の色調だけを幾何学的な図形として捉えることが有効です。また、焦って早押ししようとすると自動的な読みの衝動に負けやすくなるため、一呼吸おいて色を視覚的に確認してから選択するリズムを掴むのが高得点への近道です。',
      },
    },
    {
      '@type': 'Question',
      name: 'このドリルはスマートフォンのタッチ操作にも対応していますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。PCのキーボード・マウスクリックだけでなく、スマートフォンやタブレットのタッチスクリーンにも完全最適化されています。親指や人差し指でテンポよく画面下部の色ボタンをタップしてトレーニングできます。',
      },
    },
    {
      '@type': 'Question',
      name: 'ストループテストの利用は無料ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '完全無料です。会員登録やアプリのダウンロードは一切不要で、Webブラウザを開くだけでいつでも何度でも練習・自己ベストの記録が可能です。',
      },
    },
    {
      '@type': 'Question',
      name: 'なぜ人間はこれほど気が散りやすいのですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '人間には新奇性や動き、目立つ刺激に無意識に注意を向ける「定位反射」が備わっています。これは危険や獲物を瞬時に察知するための進化的な生存本能です。現代のデジタル環境では通知や画面のチラつきがこの反射を過剰に刺激するため、前頭前野の抑制制御を鍛えて自動反射を意識的に抑え込む訓練が必要です。',
      },
    },
    {
      '@type': 'Question',
      name: 'フランカー課題とは何ですか？ストループ効果とどう違いますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'フランカー課題（Eriksen Flanker Task）は、中央の標的刺激の両脇に一致または不一致の妨害記号を配置し、方向判断を求める認知実験です。ストループ課題が「文字の意味と色」という刺激自体の内部矛盾に対する抑制力を測るのに対し、フランカー課題は「空間的に隣接する外的な妨害刺激」を遮断する能力を測定します。いずれも注意制御の必須スキルです。',
      },
    },
    {
      '@type': 'Question',
      name: 'ストループ効果のトレーニングは仕事や学習の生産性向上に役立ちますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい。オフィスでの周囲の話し声やPC・スマホの通知など、現代の作業環境は誘惑や妨害で溢れています。認知的抑制機能を鍛えることで、無関係な刺激を遮断する脳の消費エネルギーが削減され、長時間の深い集中（ディープワーク）を持続できるようになります。',
      },
    },
    {
      '@type': 'Question',
      name: 'このストループドリルでADHDや発達障害の診断・治療はできますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'いいえ。本ドリルは認知機能の向上とセルフチェックを目的とした無料のブラウザゲームであり、医療機器や診断ツールではありません。スコアの高低はADHD等の医学的診断を示すものではありません。集中力や注意力についてお悩みの場合は、専門医や医療機関にご相談ください。',
      },
    },
  ],
};

export default function JapaneseDistractionFighterPage() {
  const sources = pickSources('stroop1935', 'macleod1991', 'logan1984', 'woods2015');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoGameSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <DistractionFighterClient
        copy={{
          title: 'ストループテスト (Stroop Test)',
          subtitle: 'ストループテスト オンライン — 文字色識別・認知干渉抑制テスト',
          caption: '文字の意味に惑わされず、表示された文字のインク色を素早く判断してタップ。自動的な読みの衝動を抑える認知的抑制機能を測定・トレーニングします。',
        }}
        faqs={faqSchema.mainEntity.map((e) => ({ q: e.name, a: e.acceptedAnswer.text }))}
      />

      <DrillGuide
        eyebrow="認知神経心理学 & 前頭前野実行機能"
        title="ストループテストの科学：自動化された言語処理と認知的抑制の葛藤"
        sources={sources}
      >
        <p>
          ストループ効果（Stroop Effect）は、1935年にJ.リドリー・ストループによって報告されて以来、認知心理学および神経科学において最も堅牢で信頼性の高い知見の一つとして知られています（Stroop, 1935）。文字の意味と異なるインク色を提示された際、人間の反応速度は著しく低下し、エラー率が上昇します。
        </p>

        <h3>自動的読解と選択的抑制の競合（MacLeod, 1991; Logan &amp; Cowan, 1984）</h3>
        <p>
          成人にとって文字の読解は日常の反復により無意識かつ自動的な処理として確立されています。一方で、フォントの「色」を同定する処理は意図的な視覚注意を必要とします。不一致条件（例：青色インクで書かれた「あか」）では、強力な読解衝動とインク色命名の命令が脳内で競合（レースモデル：Logan &amp; Cowan, 1984）し、前頭前野背外側部（DLPFC）と前帯状皮質（ACC）が不要な単語情報を抑制するために活動します。
        </p>

        <h3>ストループテスト 実力判定基準（45秒セッション）</h3>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-left border-collapse border border-white/10 text-xs sm:text-sm">
            <thead>
              <tr className="bg-white/5 text-slate-200">
                <th className="p-2.5 border border-white/10 font-bold">ランク</th>
                <th className="p-2.5 border border-white/10 font-bold">スコア目安</th>
                <th className="p-2.5 border border-white/10 font-bold">正解率</th>
                <th className="p-2.5 border border-white/10 font-bold">認知抑制評価</th>
                <th className="p-2.5 border border-white/10 font-bold">総合判定</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-red-400">Tier 1 (神速)</td>
                <td className="p-2.5 border border-white/10">&gt; 18,000 PTS</td>
                <td className="p-2.5 border border-white/10">&gt; 96%</td>
                <td className="p-2.5 border border-white/10">完全な衝動遮断・高速弁別</td>
                <td className="p-2.5 border border-white/10">卓越した認知柔軟性と実行制御</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-amber-400">Tier 2 (上級)</td>
                <td className="p-2.5 border border-white/10">12,000 – 17,999 PTS</td>
                <td className="p-2.5 border border-white/10">92 – 95%</td>
                <td className="p-2.5 border border-white/10">わずかな干渉・安定タップ</td>
                <td className="p-2.5 border border-white/10">上位水準・強固な集中持続力</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-blue-400">Tier 3 (中級)</td>
                <td className="p-2.5 border border-white/10">7,000 – 11,999 PTS</td>
                <td className="p-2.5 border border-white/10">85 – 91%</td>
                <td className="p-2.5 border border-white/10">標準的なストループ干渉</td>
                <td className="p-2.5 border border-white/10">一般的な成人平均レベル</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-slate-400">Tier 4 (初級)</td>
                <td className="p-2.5 border border-white/10">3,000 – 6,999 PTS</td>
                <td className="p-2.5 border border-white/10">75 – 84%</td>
                <td className="p-2.5 border border-white/10">単語の読みに引きずられがち</td>
                <td className="p-2.5 border border-white/10">トレーニングによる改善余地大</td>
              </tr>
              <tr>
                <td className="p-2.5 border border-white/10 font-bold text-rose-500">Tier 5 (入門)</td>
                <td className="p-2.5 border border-white/10">&lt; 3,000 PTS</td>
                <td className="p-2.5 border border-white/10">&lt; 75%</td>
                <td className="p-2.5 border border-white/10">衝動的誤答・タイムアウト多数</td>
                <td className="p-2.5 border border-white/10">疲労や注意散漫の可能性</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-1 mb-4 leading-relaxed">
          ※本ベンチマークはStroop（1935）、MacLeod（1991）、Woodsら（2015）の実験心理学知見を元に、ブラウザ上のタップ・クリック操作向けに規格化されたものです。
        </p>

        <h3>認知的抑制力を鍛える4つの実践プロトコル</h3>
        <ul className="list-disc pl-5 space-y-2 my-3 text-slate-300">
          <li>
            <strong>フォントの輪郭注視：</strong> 単語全体を「読む」のではなく、文字のエッジや輪郭の色そのものに焦点を当てることで言語処理の介入を抑えます。
          </li>
          <li>
            <strong>内的言語化の抑制：</strong> 頭の中で単語を音読せず、色を視覚パターンとして直接認識しボタンへ指を運ぶ練習をします。
          </li>
          <li>
            <strong>リズミカルな判断テンポ：</strong> 焦って衝動的にクリックすると誤答が増加します。確実な弁別リズムを保ちながら徐々にテンポを上げましょう。
          </li>
          <li>
            <strong>短時間・高頻度セッション：</strong> 認知的抑制は脳のエネルギーを激しく消費します。1日3〜5分のセッションを継続することが最も効果的です。
          </li>
        </ul>

        <h3>よくある質問（FAQ）</h3>
        <div className="space-y-4 my-4">
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">ストループテストとは何ですか？</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              ストループテスト（Stroop test）は、文字の意味とインクの色が異なる刺激を用いて、脳の認知的葛藤と抑制機能を測定する代表的な心理学テストです。文字を無意識に読んでしまう自動的反応を抑え、インク色を素早く判断する能力を評価します。
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">ストループ効果が起きる理由は何ですか？</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              人間にとって文字を読む処理（言語処理）は高度に自動化されているため、色を識別する視覚処理よりも速く脳内で活性化します。意味と色が一致しない場合、脳の前頭前野や前帯状皮質が自動的な読みの衝動を抑制しなければならず、判断の遅延（干渉）が生じます（MacLeod, 1991）。
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">認知的抑制機能（インヒビション）とは何ですか？</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              認知的抑制機能とは、無関係な刺激や自動的な衝動を抑制し、目的に沿った適切な行動を選択・維持するための実行機能（エグゼクティブ・ファンクション）の一つです。集中力の維持、マルチタスク、誘惑への抵抗、仕事やゲームのパフォーマンスに直結します。
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">ストループテストで良いスコアを出すコツはありますか？</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              単語全体を読もうとせず、文字の輪郭や色そのものに視線を集中させることが効果的です。焦って誤タップするとコンボが途切れるため、最初は正確性を重視し、徐々にテンポを上げていくのがハイスコアへの近道です。
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">このドリルはスマートフォンのタッチ操作にも対応していますか？</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              はい。PCのマウスクリックだけでなく、スマートフォンやタブレットのタッチスクリーンにも完全対応しています。ブラウザ上でインストール不要ですぐにプレイできます。
            </p>
          </div>
          <div className="border-b border-white/10 pb-3">
            <h4 className="font-bold text-white text-sm mb-1">ストループテストの利用は無料ですか？</h4>
            <p className="text-xs sm:text-sm text-slate-300">
              はい、完全無料です。アカウント登録やダウンロードは不要で、ブラウザからいつでも何度でもトレーニングできます。
            </p>
          </div>
        </div>
      </DrillGuide>
      <RelatedDrills />
    </>
  );
}
