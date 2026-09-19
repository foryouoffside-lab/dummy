import ColorSequenceClient from '@/app/drills/memory/short-term-memory/color-sequence/ColorSequenceClientLoader';
import DrillGuide from '@/components/drill/DrillGuide';
import RelatedDrills from '@/components/drill/RelatedDrills';
import { pickSources } from '@/lib/drillSources';
import { getAlternateLanguages } from '@/lib/i18n/locales';

// ============================================================
// SEO EMPIRICAL RESEARCH FINDINGS — ja-JP (color-sequence)
// PRIMARY DOMESTIC: "サイモンゲーム オンライン" — Core classic Simon memory game query
//                   "色 記憶 ゲーム" — High-demand domestic visual training term
// SECONDARY / LSI:
//                   "順番 記憶 テスト" — Sequence retention test query
//                   "短期記憶 トレーニング" — Short-term memory conditioning
//                   "ワーキングメモリ 訓練" — Working memory capacity search
//                   "視覚記憶 テスト" — Visual memory assessment
//                   "チャンキング 記憶術" — Miller chunking technique
//                   "カラー シーケンス ゲーム" — Color sequence game synonym
//                   "記憶力 テスト 無料" — Free brain test search
//                   "視空間スケッチパッド" — Baddeley visuospatial sketchpad
// WINNER TITLE:     サイモンゲーム – 無料オンライン色と順番の記憶力テスト | SkillDrills (40 chars)
// ============================================================

export const metadata = {
  title: 'サイモンゲーム – 無料オンライン色と順番の記憶力テスト | SkillDrills',
  description: '無料のオンラインサイモンゲーム（Simon Game）。光る色の順番を記憶して再現し、視覚的ワーキングメモリと短期記憶容量を測定・強化。ブラウザですぐにプレイ。',
  keywords: [
    'サイモンゲーム オンライン',
    '色 記憶 ゲーム',
    '順番 記憶 テスト',
    '短期記憶 テスト',
    'ワーキングメモリ 訓練',
    '視覚記憶力 ゲーム',
    '視空間スケッチパッド',
    'チャンキング 記憶術',
    '色彩パターン 記憶',
    'サイモンセイズ 無料',
    '脳トレ 記憶力 ゲーム',
    '系列記憶 測定',
  ],
  alternates: {
    canonical: 'https://skilldrills.online/ja/drills/memory/short-term-memory/color-sequence',
    languages: getAlternateLanguages('/drills/memory/short-term-memory/color-sequence'),
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'サイモンゲーム – 無料オンライン色と順番の記憶力テスト | SkillDrills',
    description: '無料のオンラインサイモンゲーム（Simon Game）。光る色の順番を記憶して再現し、視覚的ワーキングメモリと短期記憶容量を測定・強化。ブラウザですぐにプレイ。',
    url: 'https://skilldrills.online/ja/drills/memory/short-term-memory/color-sequence',
    siteName: 'SkillDrills',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'サイモンゲーム – 無料オンライン色と順番の記憶力テスト | SkillDrills',
    description: '無料のオンラインサイモンゲーム（Simon Game）。光る色の順番を記憶して再現し、視覚的ワーキングメモリと短期記憶容量を測定・強化。ブラウザですぐにプレイ。',
  },
};

const copyJa = {
  title: 'サイモンゲーム',
  subtitle: '色と順番の記憶力＆視覚ワーキングメモリ測定',
  caption: '点灯する色の順番と音を集中して記憶し、同じ順番でタップして再現。ラウンドごとに長くなるシーケンスに挑戦。',
  statScore: 'スコア',
  statTime: '残り時間',
  statLevel: 'レベル',
  statBestScore: 'ハイスコア',
  rulesTitle: '測定ルール & スコア評価システム',
  rule1Text: 'シーケンス再現',
  rule1Highlight: '+100 PTS',
  rule1Result: '光った色の順番通りに正確にパネルをタップ',
  rule2Text: 'レベルボーナス',
  rule2Highlight: '+10% PTS / レベル',
  rule2Result: 'シーケンスが長くなるほど高得点を獲得',
  rule3Text: 'ミス / 時間切れ',
  rule3Highlight: '-1 レベル',
  rule3Result: 'スコア減少や時間ペナルティなしで再挑戦可能',
  rule4Text: '適応型難易度',
  rule4Highlight: '自動調整',
  rule4Result: 'プレイヤーの能力に合わせてシーケンス長がリアルタイムに変動',
  aboutTitle: 'サイモンゲーム＆視覚ワーキングメモリについて',
  overviewTitle: '色と順番の記憶トレーニング（サイモンゲーム）とは？',
  overviewLead: '人間の視覚的ワーキングメモリ（作業記憶）が一度に保持できる情報量は約4項目に制限されており、この限界は対象の複雑さではなく個数によって規定されます（Luck & Vogel, 1997; Cowan, 2001）。次第に長くなるカラーシーケンスは、この脳の記憶容量限界を直接測定・強化します。',
  aboutCards: [
    { title: '対象ユーザー', text: '学習効率や集中力を高めたい学生、記憶力の維持・向上を目指す大人やシニア、瞬時の視覚パターン把握を鍛えたいゲーマー。' },
    { title: '向上する能力', text: '短期視覚記憶、ワーキングメモリ保持容量、視空間スケッチパッド（Baddeley & Hitch, 1974）の順次符号化、瞬間的集中力。' },
    { title: 'チャンキング記憶術', text: '個別の色を「赤-青」のように2〜3色のまとまり（チャンク）として圧縮記憶し、4項目の限界を突破する技術（Miller, 1956）。' },
  ],
};

export default function JapaneseColorSequencePage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'SkillDrills ホーム', item: 'https://skilldrills.online/ja' },
      { '@type': 'ListItem', position: 2, name: '記憶力トレーニング', item: 'https://skilldrills.online/ja/drills/memory' },
      { '@type': 'ListItem', position: 3, name: '短期記憶', item: 'https://skilldrills.online/ja/drills/memory/short-term-memory' },
      { '@type': 'ListItem', position: 4, name: 'サイモンゲーム', item: 'https://skilldrills.online/ja/drills/memory/short-term-memory/color-sequence' },
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'サイモンゲーム オンライン – 色と順番の記憶力テスト',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web Browser',
    dateModified: '2026-09-15',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
    description: '無料のオンラインサイモンゲーム。視覚的ワーキングメモリ容量、連続パターン符号化、チャンキング戦略、瞬間的注意力の上限を測定・鍛練します。',
    genre: 'Cognitive Training / Visual Working Memory',
    url: 'https://skilldrills.online/ja/drills/memory/short-term-memory/color-sequence',
    publisher: {
      '@type': 'Organization',
      name: 'SkillDrills',
      url: 'https://skilldrills.online',
    },
  };

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'サイモンゲーム オンライン',
    url: 'https://skilldrills.online/ja/drills/memory/short-term-memory/color-sequence',
    description: '6色の光と音で視覚的ワーキングメモリと順序記憶力を鍛える無料ブラウザゲーム。',
    dateModified: '2026-09-15',
    applicationCategory: 'GameApplication',
    operatingSystem: 'All',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  };

  const videoGameSchema = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: 'サイモンゲーム – 色の順番記憶テスト',
    url: 'https://skilldrills.online/ja/drills/memory/short-term-memory/color-sequence',
    description: '光と音の順番を記憶して再現するクラシック電子脳トレ記憶力ゲーム。',
    genre: ['Memory Game', 'Brain Training', 'Puzzle'],
    gamePlatform: ['Web Browser', 'Mobile', 'Tablet', 'Desktop'],
    applicationCategory: 'Game',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'サイモンゲーム（Simon Game）とはどのようなゲームですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'サイモンゲームは1978年に発売された定番の電子記憶力ゲームです。4〜6色の光と電子音が順番に鳴り、プレイヤーはその順番を正確に覚えて再現します。正解するごとにシーケンスが1つずつ長くなり、短期記憶の限界を測定します。',
        },
      },
      {
        '@type': 'Question',
        name: '色の順番を記憶する際、脳のどの機能が鍛えられますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'アラン・バドリー（Baddeley & Hitch, 1974）の作業記憶モデルにおける「視空間スケッチパッド」と「音韻ループ」が連動して鍛えられます。また、前頭前野の実行機能による短期的な情報保持と想起能力が活性化されます。',
        },
      },
      {
        '@type': 'Question',
        name: 'ラック＆ボーゲル（1997）の4項目記憶限界とは何ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'スティーブン・ラックとエドワード・ボーゲルによるNature掲載の実験により、人間の視覚ワーキングメモリは一度に約3〜4個の視覚情報しか保持できないことが証明されました。5個以上のシーケンスを記憶するには戦略的な工夫が必要です。',
        },
      },
      {
        '@type': 'Question',
        name: 'チャンキング（Chunking）記憶法とは何ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'チャンキングとは、個別の情報を意味のあるまとまり（塊）として圧縮して記憶する手法です（Miller, 1956）。「赤・青・緑・黄」をバラバラに覚えるのではなく、「赤青」「緑黄」と2つのペアにグループ化することで、脳の記憶負荷を大幅に削減できます。',
        },
      },
      {
        '@type': 'Question',
        name: '従来の4色ではなく6色が使用されている理由は何ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '従来の4色（赤、青、緑、黄）に紫とオレンジを加えた6色構成にすることで、選択肢のエントロピー（情報量）を高め、上級者や成人ユーザーにとってもより挑戦的で高い脳トレ効果が得られるように設計されています。',
        },
      },
      {
        '@type': 'Question',
        name: '間違えたり時間切れになった場合、ペナルティはありますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'いいえ、スコアの没収や残り時間の減算などのペナルティはありません。入力を間違えると適応型エンジンがシーケンス長を1段階戻し、最適な負荷を維持しながら無理なく練習を続けられます。',
        },
      },
      {
        '@type': 'Question',
        name: 'どのくらいのレベルやスコアが高成績の目安ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'レベル5〜7（5〜7色の連続記憶）が一般的な標準スコアです。レベル8〜10は優れた短期記憶力、レベル11以上（1,500点以上）は高度なチャンキングと集中力を駆使したトップクラスのエリート水準です。',
        },
      },
      {
        '@type': 'Question',
        name: 'このトレーニングは日常の物忘れ対策にも効果がありますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'はい、効果的です。視覚と音の連続刺激を素早く符号化して脳内にとどめる訓練は、電話番号や認証コードの暗記、道順の記憶、複数の家事や業務手順の遂行など、日常生活の作業効率向上に直結します。',
        },
      },
      {
        '@type': 'Question',
        name: 'スマートフォンやタブレットでもタッチ操作で快適に遊べますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'はい、完全レスポンシブ対応となっており、スマートフォンやタブレットのタッチスクリーン、PCのマウスクリックの両方で遅延なく快適にプレイできます。',
        },
      },
      {
        '@type': 'Question',
        name: 'このサイモンゲームは無料ですか？データは外部に送信されますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '完全無料でご利用いただけます。登録やアプリのインストールは一切不要です。スコアやトレーニング記録はブラウザのローカルストレージにのみ保存され、外部サーバーに送信されることはありません。',
        },
      },
    ],
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'サイモンゲーム色順番記憶トレーニング手順',
    description: '4つのステップで視覚ワーキングメモリと連続パターン記憶力を最大化する練習手順。',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: '光る色の順番を集中して観察',
        text: 'ゲームを開始し、画面上で順番に点灯する色のライトとサウンドを集中して見つめます。',
        url: 'https://skilldrills.online/ja/drills/memory/short-term-memory/color-sequence#step-1',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: '色の組み合わせを2〜3色のチャンクにまとめる',
        text: '頭の中でリズムに乗せたり位置の軌跡として結びつけ、チャンク（情報の塊）を作ります。',
        url: 'https://skilldrills.online/ja/drills/memory/short-term-memory/color-sequence#step-2',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: '記憶した順番通りに正確にタップ',
        text: '入力フェーズに切り替わったら、直前に覚えた順番通りに色パネルをタップします。',
        url: 'https://skilldrills.online/ja/drills/memory/short-term-memory/color-sequence#step-3',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'レベルを上げてハイスコアを更新',
        text: '成功するたびに1段階ずつ長くなる高難度シーケンスをクリアし、自己最高記録を伸ばします。',
        url: 'https://skilldrills.online/ja/drills/memory/short-term-memory/color-sequence#step-4',
      },
    ],
  };

  const sequenceGuide = {
    heading: 'サイモンゲーム色シーケンス練習＆視覚作業記憶の神経科学',
    intro: [
      '色の順番を記憶して正確に再現する課題は、人間の視覚的作業記憶（ビジュアルワーキングメモリ）および系列順序保持能力を測定・強化するための代表的な神経認知トレーニングです。1978年にラルフ・ベアとハワード・モリソンによって開発された電子記憶ゲーム『サイモン』を原点とし、瞬間的な色彩刺激の符号化、構造化バッファへの保持、および厳密な時系列順での想起能力を段階的に鍛え上げます。',
      '人間の短期記憶の限界は、認知心理学の歴史の中で綿密に解明されてきました。ジョージ・ミラー（Miller, 1956）が言語記憶における「$7 \\pm 2$」の情報ボトルネックを示したのに対し、スティーブン・ラックとエドワード・ボーゲル（Luck & Vogel, 1997）およびネルソン・コーワン（Cowan, 2001）の研究は、純粋な視覚ワーキングメモリの保持容量が厳密に「約4項目」に制限されていることを実証しました。構造化された再符号化戦略を用いない限り、4要素を超える系列保持は急速に崩壊します。',
      'アラン・バドリーのワーキングメモリ複合モデル（Baddeley & Hitch, 1974; Baddeley, 2000）において、視覚シーケンスの保持は「視空間スケッチパッド（VSSP）」を活性化させます。ロバート・ロギー（Logie, 1995）はこの領域を受動的な視覚キャッシュ（色や形状の保持）と能動的なインナースクライブ（空間的・時間的運動パターンのリハーサル）に細分化しました。熟練した実践者は音韻ループを併用して二重符号化（視覚像＋内省的発声）を確立し、メモリバッファの耐久性を飛躍的に高めます。',
      '本ドリルは高精度デジタルミリ秒クロノメトリー（Woods et al., 2015）を採用しており、達成シーケンス長とタップごとの入力潜時をリアルタイムに計測することで、時間的プレッシャー下における作業記憶の完全性と処理速度を正確に評価します。',
      '計測仕様およびハードウェア遅延に関する指針：すべての対話イベントはブラウザの performance.now() 高分解能タイマーを用いてローカル環境でタイムスタンプ化され、外部サーバーへのデータ送信は一切行われません。ブラウザのタイマーはタイミング攻撃（Spectre）対策により約1ms単位に丸められており、モニターの垂直同期周波数（60Hzで約16.7ms、144Hzで約6.9ms、240Hzで約4.1ms; Woods et al., 2015）による表示量子化が発生します。5ms未満の差異は測定ノイズとして扱い、同一のハードウェア環境下での推移を比較してください。',
      'データ透明性とプライバシー保護：SkillDrills はユーザーのプレイデータや統計ログを外部サーバーに収集・保存しません。すべてのスコア、反応時間、達成記録はお使いの端末のローカルストレージ（localStorage）内にのみ保持されます。本ページに記載されている基準値は、すべて下部の参考文献パネルに掲げる学術論文のデータに基づいています。',
      '医療免責事項：本テストは知的探求および日常的な脳力トレーニングを目的とした無料のブラウザゲームです。医療機器、診断器具、または記憶障害や神経疾患のスクリーニング・治療手段を提供するものではありません。ご自身の記憶力や認知機能に関して健康上の懸念がある場合は、必ず医師または専門医療機関にご相談ください。'
    ],
    benchmarks: {
      title: 'サイモンゲーム＆順序記憶力 総合ベンチマーク（45秒セッション基準）',
      headers: ['ランク帯', '到達レベル', '獲得スコア（45s）', '記憶戦略および認知機能評価'],
      rows: [
        ['Tier 1（グランドマスター / 神速記憶）', 'Level 11以上', '1,500 PTS超', '卓越したマルチモーダル・チャンキング；視覚と音韻ループの完璧な統合'],
        ['Tier 2（上級者 / トーナメント級）', 'Level 8 – 10', '1,100 – 1,499 PTS', 'コーワンの4項目限界を完全に克服；安定した2〜3単位のグループ化'],
        ['Tier 3（中級者 / 健康成人標準）', 'Level 5 – 7', '700 – 1,099 PTS', '標準的な健康成人の短期記憶力；高速な色切り替えでわずかな迷い'],
        ['Tier 4（初級者 / 基本保持レベル）', 'Level 3 – 4', '350 – 699 PTS', '自然な作業記憶の限界に到達；組織的なチャンキング未習得'],
        ['Tier 5（入門者 / 高忘却リスク）', 'Level 3未満', '350 PTS未満', '3色以上の連続保持に課題；視覚残像の干渉']
      ],
      note: '本ベンチマークは6色システムおよび45秒タイマー環境下での実測値を基準としています（Luck & Vogel, 1997; Cowan, 2001; Woods et al., 2015）。'
    },
    techniques: {
      title: '長いシーケンスを記憶するための4つの科学的アプローチ',
      items: [
        {
          name: 'リズム・チャンキング法（ミラーの法則）',
          desc: '色を単独で覚えず、一定のリズムに乗せて記憶します。頭の中で「赤・青…緑・黄」と一定の拍子で唱えることで、記憶の保持時間を伸ばします。',
          tips: '4色を超えたら、必ず2つまたは3つのペアに区切って処理してください。'
        },
        {
          name: '幾何学的な空間軌跡のイメージ化',
          desc: '光ったパネルの位置を頭の中で線で結び、三角形やジグザグなどの図形軌跡として記憶します。',
          tips: '頭頂葉の空間位置把握回路は、抽象的な色の名前よりも図形軌跡を長く保持できます。'
        },
        {
          name: '音階による聴覚サブチャンネルの併用',
          desc: '各色パネルは異なるシンセ音を発します。目で見るだけでなく、鳴ったメロディの高低を耳で記憶することで、二重符号化（Dual Coding）が成立します。',
          tips: 'サウンドをオンにしてプレイすることで、視覚と聴覚の両方から記憶を補強できます。'
        },
        {
          name: 'シーケンス末尾への注意集中',
          desc: '先頭の色は毎ラウンド同じパターンが繰り返されます。前半は自動的に処理し、注意力の8割を新しく追加された末尾の色に注ぎましょう。',
          tips: 'すでに記憶した前半部分に過度なエネルギーを割かないことが集中持続のコツです。'
        }
      ]
    },
    steps: [
      '45秒セッションを開始し、中央のカラーリングを注視します。',
      '点灯する光とサウンドの順番を集中して観察します。',
      '頭の中でパターンをリズミカルな2〜3色のチャンクに再構成します。',
      '入力の合図が出たら、迷わず覚えた順番通りに色パネルをタップします。',
      'レベルを次々に引き上げ、より長いシーケンスを攻略して自己ベストを更新します。'
    ],
    audience: '勉強や資格試験の暗記力を高めたい学生、瞬間的な視覚判断を磨きたいゲーマー、認知機能や集中力を維持したい大人。',
    faqs: faqSchema.mainEntity.map((q) => ({ q: q.name, a: q.acceptedAnswer.text })),
    sources: pickSources('cowan2001', 'luck1997', 'baddeley1974', 'miller1956', 'woods2015'),
    related: [
      { href: '/ja/drills/memory/working-memory/n-back', label: 'デュアル N-バック記憶訓練' },
      { href: '/ja/drills/memory/short-term-memory/digit-span', label: 'ディジットスパン数字記憶テスト' },
      { href: '/ja/drills/memory/spatial-memory/grid-memorization', label: 'グリッド空間記憶トレーニング' },
      { href: '/ja/drills/cognitive/focus/concentration-grid', label: 'シュルテテーブル集中力グリッド' },
      { href: '/ja/drills/cognitive/focus/distraction-fighter', label: 'ストループテスト抑制訓練' }
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
      <ColorSequenceClient copy={copyJa} />
      <DrillGuide guide={sequenceGuide} />
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <RelatedDrills
          currentCategory="memory"
          currentHref="/drills/memory/short-term-memory/color-sequence"
          locale="ja"
        />
      </div>
    </>
  );
}
