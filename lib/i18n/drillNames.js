// lib/i18n/drillNames.js
// Per-locale override layer for drill display names and taglines.
// Keyed strictly by canonical English href -> locale -> { name, tagline }.
//
// WHY THIS FILE EXISTS:
// lib/drillsRegistry.js and lib/drillCatalog.js are flat English.
// When rendering drill cards, H1s, and internal anchor text in localized views,
// this provides native terminology justified by empirical keyword research.

export const DRILL_LOCALIZATIONS = {
  "/drills/physical/balance-training/stability-challenge": {
    "ja": {
      "name": "マウス安定性テスト・体幹バランス測定",
      "tagline": "風圧と反動力のベクトルに抗してカーソルを中央に安定維持するモーター制御テスト"
    },
    "ko": {
      "name": "마우스 안정성 테스트・신체 균형 감각 훈련",
      "tagline": "불규칙한 외력과 바람 저항 벡터에 맞서 크로스헤어를 중앙에 정밀 유지하는 제어 훈련"
    },
    "de": {
      "name": "Maus Stabilität Test (Balance Challenge Online)",
      "tagline": "Posturale Stabilität und präzise Maus-Stabilisierung gegen dynamische Kraftvektoren"
    },
    "es": {
      "name": "Test de Estabilidad del Ratón (Reto de Equilibrio)",
      "tagline": "Estabilidad postural y control micromotor contra vectores dinámicos de viento y fuerza"
    },
    "fr": {
      "name": "Test de Stabilité de la Souris (Défi d'Équilibre)",
      "tagline": "Stabilité posturale et contrôle micromoteur contre les vecteurs dynamiques de vent et de force"
    },
    "pt": {
      "name": "Teste de Estabilidade do Mouse (Desafio de Equilíbrio)",
      "tagline": "Estabilidade postural e controle micromotor contra vetores dinâmicos de vento e força"
    }
  },
  "/drills/physical/coordination/complex-pattern": {
    "ja": {
      "name": "パターン記憶ゲーム・視覚空間追従テスト",
      "tagline": "複雑化する幾何学パスを瞬時に記憶し正確に再現する視覚記憶・協調運動ドリル"
    },
    "ko": {
      "name": "패턴 기억 게임・공간 기억력 훈련",
      "tagline": "점점 복잡해지는 시각 경로를 기억하고 정확하게 다시 그리는 공간 인지 협응 훈련"
    },
    "de": {
      "name": "Muster Gedächtnis Spiel (Visuelles Gedächtnistraining)",
      "tagline": "Präge dir geometrische Pfade ein und zeichne sie fehlerfrei nach"
    },
    "es": {
      "name": "Juego de Memoria de Patrones (Memoria Espacial)",
      "tagline": "Memoriza trayectorias geométricas complejas y reprodúcelas sin errores"
    },
    "fr": {
      "name": "Jeu de Mémorisation de Motifs (Mémoire Spatiale)",
      "tagline": "Mémorisez des tracés géométriques complexes et reproduisez-les sans erreur"
    },
    "pt": {
      "name": "Jogo de Memória de Padrões (Memória Espacial)",
      "tagline": "Memorize trajetórias geométricas complexas e reproduza os caminhos motores sem cometer falhas"
    }
  },
  "/drills/physical/coordination/cross-body-movement": {
    "ja": {
      "name": "手と目の協調ゲーム・両側性正中線交差運動",
      "tagline": "画面の正中線を越えてノードを連結し大脳半球間の情報伝達と対角線エイムを強化"
    },
    "ko": {
      "name": "손 눈 협응력 게임・양측 정중선 교차 훈련",
      "tagline": "화면 중앙 정중선을 교차하는 노드를 신속하게 연결하여 양뇌 소통과 협응력을 극대화"
    },
    "de": {
      "name": "Hand-Auge-Koordination Spiel (Bilaterales Training)",
      "tagline": "Verbinde Knotenpunkte über die Mittellinie zur Schulung der interhemisphärischen Koordination"
    },
    "es": {
      "name": "Juego de Coordinación Ojo-Mano (Movimiento Bilateral)",
      "tagline": "Conecta nodos cruzando la línea media para entrenar la coordinación interhemisférica"
    },
    "fr": {
      "name": "Jeu de Coordination Œil-Main (Mouvement Bilatéral)",
      "tagline": "Reliez des nœuds en franchissant la ligne médiane pour stimuler la coordination interhémisphérique"
    },
    "pt": {
      "name": "Jogo de Coordenação Olho-Mão (Movimento Bilateral)",
      "tagline": "Conecte nós cruzando a linha média visual para estimular a integração inter-hemisférica"
    }
  },
  "/drills/physical/coordination/dynamic-grid-evasion": {
    "ja": {
      "name": "障害物回避ゲーム・グリッド空間認識テスト",
      "tagline": "格子状グリッド上を移動する危険エリアを瞬時に察知しカーソルを安全区画へ退避"
    },
    "ko": {
      "name": "마우스 피하기 게임・그리드 공간 회피 훈련",
      "tagline": "그리드 셀에서 발생하는 위험 요소를 신속하게 예측하고 안전 구역으로 마우스를 긴급 회피"
    },
    "de": {
      "name": "Ausweichspiel Online (Gitter-Ausweich-Trainer)",
      "tagline": "Taktisches Ausweichen vor Gefahrenzonen im dynamischen Koordinatengitter"
    },
    "es": {
      "name": "Juego de Esquivar Cuadrícula (Evasión Rápida)",
      "tagline": "Esquiva zonas de peligro en una cuadrícula dinámica con reflejos rápidos"
    },
    "fr": {
      "name": "Jeu d'Esquive sur Grille (Évasion Rapide)",
      "tagline": "Esquivez les zones de danger sur une grille dynamique avec des réflexes rapides"
    },
    "pt": {
      "name": "Jogo de Esquiva na Grade (Evasão Dinâmica)",
      "tagline": "Desvie de zonas dinâmicas de risco em uma grade coordenada com reflexos rápidos e precisão"
    }
  },
  "/drills/physical/fitness/agility-ladder": {
    "ja": {
      "name": "ラダートレーニング・敏捷性フットワークドリル",
      "tagline": "アジリティラダーのリズミカルなステップ運動と両側運動シーケンスを体得"
    },
    "ko": {
      "name": "민첩성 사다리 훈련・풋워크 스텝 드릴",
      "tagline": "양측성 운동 시퀀싱과 리듬감 있는 발놀림 스텝으로 신체 민첩성 극대화"
    },
    "de": {
      "name": "Koordinationsleiter Übungen (Agility Ladder Training)",
      "tagline": "Bilateral motorische Schrittfolgen und Rhythmusgefühl für maximale Beinschnelligkeit"
    },
    "es": {
      "name": "Escalera de Agilidad Online (Entrenamiento de Pies)",
      "tagline": "Secuencias motoras bilaterales y ritmo para maximizar la velocidad de pies y agilidad"
    },
    "fr": {
      "name": "Échelle d'Agilité en Ligne (Entraînement des Pieds)",
      "tagline": "Séquences motrices bilatérales et rythme pour maximiser la vitesse des appuis et la vivacité"
    },
    "pt": {
      "name": "Escada de Agilidade Online (Treino de Passadas)",
      "tagline": "Sequências motoras bilaterales e ritmo ágil para maximizar a velocidade de pés e coordenação"
    }
  },
  "/drills/physical/fitness/jump-sequence": {
    "ja": {
      "name": "ジャンプタイミング練習・プライオメトリクス運動",
      "tagline": "伸張-短縮サイクル(SSC)のインパルスを計算し空中の標的を完璧なタイミングで捉える"
    },
    "ko": {
      "name": "점프 타이밍 훈련・플라이오메트릭 리듬 테스트",
      "tagline": "신장-단축 주기(SSC) 탄성을 활용하여 공중 표적을 정확한 타점에 요격"
    },
    "de": {
      "name": "Sprung Timing Übung (Reaktivkraft-Training)",
      "tagline": "Berechne Sprungtrajektorien und nutze den Dehnungs-Verkürzungs-Zyklus optimal"
    },
    "es": {
      "name": "Test de Timing de Salto (Fuerza Reactiva)",
      "tagline": "Calcula trayectorias y optimiza el ciclo de estiramiento-acortamiento para interceptar dianas"
    },
    "fr": {
      "name": "Test de Timing de Saut (Force Réactive)",
      "tagline": "Calculez les trajectoires et exploitez le cycle étirement-détente pour intercepter les cibles"
    },
    "pt": {
      "name": "Teste de Timing de Salto (Força Reativa)",
      "tagline": "Calcule trajetórias balísticas e use o ciclo de alongamento-encurtamento para interceptar alvos"
    }
  },
  "/drills/physical/fitness/speed-drill": {
    "ja": {
      "name": "マウスクリック連打テスト・俊敏性タッピング速度",
      "tagline": "縮小するターゲットに対して高精度かつ最速のクリック連打を叩き込む"
    },
    "ko": {
      "name": "마우스 클릭 속도 테스트・광클 연타 훈련",
      "tagline": "수축하는 표적의 경계 내에서 최고 속도로 정밀 연타를 기록하는 민첩성 테스트"
    },
    "de": {
      "name": "Click Speed Test (Klick-Geschwindigkeitstest & Speed Drill)",
      "tagline": "Zielerfassung und Klickkadenz unter schrumpfenden Zielradien testen"
    },
    "es": {
      "name": "Test de Velocidad de Clic (Speed Drill de Reflejos)",
      "tagline": "Precisión y cadencia de clics a máxima velocidad en objetivos de tamaño decreciente"
    },
    "fr": {
      "name": "Test de Vitesse de Clic (Speed Drill de Réflexes)",
      "tagline": "Précision et cadence de clics à cadence maximale sur des cibles au rayon décroissant"
    },
    "pt": {
      "name": "Teste de Velocidade de Clique (Speed Drill de Reflexos)",
      "tagline": "Cadência máxima de cliques e precisão em alvos dinâmicos com raio de acerto decrescente"
    }
  },
  "/drills/physical/reflex-training/drop-catch": {
    "ja": {
      "name": "ものさし落下テスト・ドロップキャッチ反射神経測定",
      "tagline": "重力加速度で落下する緑の標的を最速でキャッチし赤のデコイを瞬時に抑制"
    },
    "ko": {
      "name": "자 떨어뜨리기 반응속도・낙하 드롭 캐치 테스트",
      "tagline": "자유낙하하는 표적을 밀리초(ms) 단위로 낚아채고 붉은 유인물을 억제하는 순발력 훈련"
    },
    "de": {
      "name": "Lineal Fall Test Online (Drop-Catch-Reaktionstest)",
      "tagline": "Fange fallende Zielobjekte im freien Fall und widerstehe roten Ködern"
    },
    "es": {
      "name": "Test de la Regla que Cae (Drop Catch de Reflejos)",
      "tagline": "Atrapa objetivos en caída libre en milisegundos e inhibe la respuesta a señuelos rojos"
    },
    "fr": {
      "name": "Test de la Règle qui Tombe (Drop Catch de Réflexes)",
      "tagline": "Attrapez les cibles en chute libre en millisecondes et inhibez la réponse aux leurres rouges"
    },
    "pt": {
      "name": "Teste da Régua Caindo (Drop Catch de Reflexos)",
      "tagline": "Capture alvos em queda livre com rapidez milimétrica e iniba impulsos diante de iscas vermelhas"
    }
  },
  "/drills/physical/reflex-training/peripheral-threat-sweeper": {
    "ja": {
      "name": "周辺視野トレーニングゲーム・有効視野(UFOV)測定",
      "tagline": "中心を注視しながら周辺視野に出現する脅威を迅速に察知・排除する動体視野テスト"
    },
    "ko": {
      "name": "주변 시야 테스트 게임・유효 시야(UFOV) 훈련",
      "tagline": "화면 중앙을 응시하면서 주변부 시야에 깜빡이는 위험을 감지하여 반응하는 동체시력 훈련"
    },
    "de": {
      "name": "Gesichtsfeld Test Online (Peripheres Sehen Training)",
      "tagline": "Trainiere dein peripheres Blickfeld (UFOV) und reagiere blitzschnell auf radiale Reize"
    },
    "es": {
      "name": "Test de Visión Periférica (Campo Visual Útil UFOV)",
      "tagline": "Entrena tu campo visual periférico y reacciona de inmediato a amenazas perimétricas"
    },
    "fr": {
      "name": "Test de Vision Périphérique (Champ Visuel Utile UFOV)",
      "tagline": "Entraînez votre champ visuel périphérique et réagissez instantanément aux menaces radiales"
    },
    "pt": {
      "name": "Teste de Visão Periférica (Campo Visual Útil UFOV)",
      "tagline": "Treine a amplitude do campo visual útil periférico e responda de imediato a ameaças radiais"
    }
  },
  "/drills/physical/reflex-training/quick-dodge": {
    "ja": {
      "name": "マウス回避ゲーム・反射神経弾幕ドッジ",
      "tagline": "四方から迫り来る高速プロジェクタイルを極限のミリメートル精度で回避し続ける"
    },
    "ko": {
      "name": "마우스 피하기 게임・순발력 탄막 회피 챌린지",
      "tagline": "화면을 가로지르는 고속 투사체를 마우스 커서로 극한까지 회피하는 반사신경 게임"
    },
    "de": {
      "name": "Ausweichspiel Online (Maus-Ausweich-Challenge)",
      "tagline": "Weiche dynamischen Projektilen mit präziser Cursor-Steuerung millimetergenau aus"
    },
    "es": {
      "name": "Juego de Esquivar con el Ratón (Evasión de Balas)",
      "tagline": "Esquiva proyectiles dinámicos a alta velocidad con precisión milimétrica del cursor"
    },
    "fr": {
      "name": "Jeu d'Esquive à la Souris (Esquive de Projectiles)",
      "tagline": "Esquivez des projectiles dynamiques à haute vitesse avec une précision millimétrique du curseur"
    },
    "pt": {
      "name": "Jogo de Esquiva com o Mouse (Desvio de Projéteis)",
      "tagline": "Desvie o cursor de projéteis em alta velocidade com precisão milimétrica e reflexos afiados"
    }
  },
  "/drills/physical/reflex-training/reaction-chain": {
    "ja": {
      "name": "ゴーノーゴーテスト・連続反応＆衝動制御ドリル",
      "tagline": "連続する視覚シグナルに対して進行と即時停止(Go/No-Go)を切り替える制動抑制テスト"
    },
    "ko": {
      "name": "고노고 테스트 온라인・충동 조절 연속 반응 훈련",
      "tagline": "급가속하는 마우스 커서를 정지 구역에 즉각 제동하여 모터 억제력을 평가하는 반응 드릴"
    },
    "de": {
      "name": "Go No Go Test Online (Reaktionskette & Impulskontrolle)",
      "tagline": "Trainiere blitzschnelle Beschleunigung und präzise Bremskontrolle bei visuellen Stoppsignalen"
    },
    "es": {
      "name": "Test Go/No-Go Online (Cadena de Reacción & Freno)",
      "tagline": "Entrena aceleración rápida y desaceleración inmediata ante señales visuales de parada"
    },
    "fr": {
      "name": "Test Go/No-Go en Ligne (Chaîne de Réaction & Frein)",
      "tagline": "Entraînez accélération vive et décélération immédiate face aux signaux visuels d'arrêt"
    },
    "pt": {
      "name": "Teste Go/No-Go Online (Cadeia de Reação & Freio)",
      "tagline": "Acelere o movimento e aplique desaceleração imediata de frenagem motora a sinais de parada"
    }
  },
  "/drills/reaction-speed/reaction-time-test": {
    "ko": {
      "name": "반응속도 테스트",
      "tagline": "밀리초(ms) 단위 시각 반응속도 정밀 측정 및 등급 판정"
    },
    "ja": {
      "name": "反射神経テスト・反応速度テスト",
      "tagline": "ミリ秒(ms)単位で視覚反射神経と反応速度を正確に測定・診断"
    },
    "de": {
      "name": "Reaktionstest (Reaktionszeit Test)",
      "tagline": "Reaktionszeit in Millisekunden (ms) online messen und Reflexe trainieren"
    },
    "pt": {
      "name": "Teste de Reflexo (Tempo de Reação)",
      "tagline": "Meça seu tempo de reação visual e reflexos em milissegundos (ms)"
    },
    "es": {
      "name": "Test de Reflejos (Tiempo de Reacción)",
      "tagline": "Mide tu velocidad de reacción visual en milisegundos (ms) online"
    },
    "fr": {
      "name": "Test de Réflexe (Temps de Réaction)",
      "tagline": "Mesurez votre temps de réaction visuelle en millisecondes en ligne"
    }
  },
  "/drills/reaction-speed/reflex-training-drill": {
    "ja": {
      "name": "反射神経ゲーム",
      "tagline": "画面に出現する複数ターゲットを素早くタップして反射神経と分割注意力を強化"
    },
    "ko": {
      "name": "순발력 테스트・반사신경 게임",
      "tagline": "동시에 출현하는 멀티 타깃을 신속하게 타격하여 순발력과 분할 주의력을 훈련"
    },
    "de": {
      "name": "Reflex-Training & Reaktionsspiel",
      "tagline": "Multi-Target-Reflextraining zur Steigerung von Reaktionsschnelligkeit und geteilter Aufmerksamkeit"
    },
    "pt": {
      "name": "Jogo de Reflexo e Treino de Reflexos",
      "tagline": "Acerte múltiplos alvos simultâneos para treinar atenção dividida e reflexos rápidos"
    },
    "es": {
      "name": "Juego de Reflejos (Multi-Objetivo)",
      "tagline": "Elimina objetivos múltiples simultáneos para entrenar reflejos rápidos y atención dividida"
    },
    "fr": {
      "name": "Jeu de Réflexe & Entraînement",
      "tagline": "Éliminez les cibles multiples pour développer vos réflexes et votre attention divisée"
    }
  },
  "/drills/reaction-speed/visual-tracking-speed-test": {
    "ja": {
      "name": "動体視力テスト（視覚追従スピード測定）",
      "tagline": "動くターゲットを滑動性眼球運動で追跡し動体視力と空間認知スピードを測定・強化"
    },
    "ko": {
      "name": "동체시력 테스트 (시각 추적 속도 검사)",
      "tagline": "화면을 이동하는 운동 타깃을 눈으로 추적하여 동체시력과 시각 반응속도를 정밀 측정"
    },
    "de": {
      "name": "Visueller Reaktionstest (Blickverfolgung & Reflex-Test)",
      "tagline": "Blickfolgebewegung und visuelle Reflexe an dynamisch bewegten Zielen online messen"
    },
    "pt": {
      "name": "Teste de Rastreamento Visual (Acuidade Visual Dinâmica)",
      "tagline": "Meça sua capacidade de rastreamento ocular e reflexo visual em alvos em movimento"
    },
    "es": {
      "name": "Test de Seguimiento Visual (Agudeza Visual Dinámica)",
      "tagline": "Mide la agudeza visual dinámica y el tiempo de intercepción de objetivos en movimiento"
    },
    "fr": {
      "name": "Test de Poursuite Visuelle",
      "tagline": "Test de poursuite visuelle gratuit en ligne. Suivez les cibles en mouvement pour mesurer votre acuité dynamique et votre vitesse de réaction motrice."
    }
  },
  "/drills/reaction-speed/reaction-game": {
    "ja": {
      "name": "反射神経ゲーム (Reaction Game)",
      "tagline": "落下ターゲットを瞬時迎撃する縦方向視覚追跡＆反射速度トレーニング"
    },
    "ko": {
      "name": "반응속도 게임 (Reaction Game)",
      "tagline": "낙하하는 타겟을 순간 요격하는 수직 시각 추적 및 순발력 측정"
    },
    "de": {
      "name": "Reaktionsspiel Online",
      "tagline": "Fallende Ziele abfangen und vertikale Blickverfolgung trainieren"
    },
    "pt": {
      "name": "Jogos de Reflexo Online",
      "tagline": "Intercepte alvos em queda acelerada e treine rastreamento vertical"
    },
    "es": {
      "name": "Juego de Reflejos Online",
      "tagline": "Intercepta objetivos en caída acelerada y entrena seguimiento vertical"
    },
    "fr": {
      "name": "Jeu de Réflexe en Ligne",
      "tagline": "Jeu de réflexe et de réaction en ligne gratuit : interceptez les cibles en chute rapide, entraînez votre suivi visuel et vos réflexes dans le navigateur."
    }
  },
  "/drills/cognitive/focus/concentration-grid": {
    "es": {
      "name": "Tabla de Schulte (Concentration Grid)",
      "tagline": "Busca números secuenciales en cuadrículas Schulte en expansión y amplía tu visión periférica"
    },
    "pt": {
      "name": "Tabela de Schulte (Concentration Grid)",
      "tagline": "Encontre números sequenciais em grades de Schulte em expansão e amplie sua visão periférica"
    },
    "ja": {
      "name": "シュルテテーブル (Concentration Grid)",
      "tagline": "拡大するグリッド上の連番を素早く見つけ周辺視野と集中力を鍛える無料認知トレーニング"
    },
    "ko": {
      "name": "슐테 테이블 – 주변시야 집중력 격자 훈련",
      "tagline": "무작위 배열된 숫자를 순서대로 빠르게 찾아 시각 탐색 속도와 시야각 확장 훈련"
    },
    "de": {
      "name": "Schulte-Tabelle Online",
      "tagline": "Kostenlose Schulte-Tabelle online: Trainiere peripheres Sehen, Schnelllesen und visuelle Suchgeschwindigkeit auf anpassbaren Zahlen-Gittern."
    },
    "fr": {
      "name": "Table de Schulte en Ligne",
      "tagline": "Table de Schulte gratuite en ligne: entraînez vision périphérique, lecture rapide et exploration séquentielle sur des grilles dynamiques sans inscription."
    }
  },
  "/drills/cognitive/focus/distraction-fighter": {
    "ja": {
      "name": "ストループテスト (Stroop Test)",
      "tagline": "文字の意味とインク色の不一致を瞬時に見極める認知干渉抑制テスト"
    },
    "ko": {
      "name": "스트룹 검사 – 인지 억제 및 주의력 테스트",
      "tagline": "단어 의미와 글자 색상의 인지적 간섭을 극복하고 순간 반응 판단력 측정"
    },
    "de": {
      "name": "Stroop-Test Online",
      "tagline": "Kostenloser Stroop-Test online: Messe kognitive Inhibition und selektive Aufmerksamkeit beim Farb-Wort-Interferenztest direkt im Browser ohne Anmeldung."
    },
    "es": {
      "name": "Test de Stroop Online",
      "tagline": "Test de Stroop online gratis: mida su inhibición cognitiva y atención selectiva indicando el color de la tinta sin dejarse confundir por la palabra escrita."
    },
    "fr": {
      "name": "Test de Stroop en Ligne",
      "tagline": "Test de Stroop gratuit en ligne: évaluez votre inhibition cognitive et votre attention sélective en nommant la couleur de police sans lire le mot écrit."
    },
    "pt": {
      "name": "Teste de Stroop Online",
      "tagline": "Teste de Stroop online grátis: avalie sua inibição cognitiva e atenção seletiva nomeando a cor da fonte enquanto ignora o significado da palavra escrita."
    }
  },
  "/drills/motor/keyboard-tester": {
    "pt": {
      "name": "Teste de Teclado",
      "tagline": "Verifique teclas, ghosting e key rollover online no navegador"
    },
    "ko": {
      "name": "키보드 테스트",
      "tagline": "온라인 키 입력 검사, 무한 동시입력(NKRO) 및 채터링 실시간 확인"
    },
    "ja": {
      "name": "キーボードテスト",
      "tagline": "全キーの入力確認・チャタリング検査・同時押し測定をオンラインで即座に診断"
    },
    "fr": {
      "name": "Test Clavier",
      "tagline": "Testez chaque touche, anti-ghosting et key rollover en ligne"
    },
    "de": {
      "name": "Tastatur Test Online (Ghosting & Chattering)",
      "tagline": "Tastenfunktionen, N-Key-Rollover (NKRO) und Prellfehler (Chattering) im Browser testen"
    },
    "es": {
      "name": "Test de Teclado Online (Ghosting & Chattering)",
      "tagline": "Comprueba pulsación de teclas, anti-ghosting, rollover (NKRO) y chattering en el navegador"
    }
  },
  "/drills/motor/movement-speed/rapid-tapping": {
    "ko": {
      "name": "CPS 측정 (클릭속도 테스트)",
      "tagline": "초당 클릭 수(CPS) 정밀 측정 및 마우스 광클 지속력 훈련"
    },
    "ja": {
      "name": "連打測定・CPSテスト",
      "tagline": "1秒間のクリック速度測定・CPS測定と連打持久力テスト"
    },
    "pt": {
      "name": "Teste de CPS (Velocidade de Clique)",
      "tagline": "Meça seus cliques por segundo (CPS) e resistência de toque"
    },
    "fr": {
      "name": "Test CPS (Vitesse de Clic)",
      "tagline": "Mesurez vos clics par seconde et votre endurance de frappe"
    },
    "es": {
      "name": "Test de CPS (Clicks Por Segundo)",
      "tagline": "Mide tus clicks por segundo y velocidad de cliqueo con prueba de 45 segundos"
    },
    "de": {
      "name": "CPS Test (Klickgeschwindigkeit)",
      "tagline": "Klicks pro Sekunde und Klickgeschwindigkeit mit 45-Sekunden-Test messen"
    }
  },
  "/drills/motor/hand-eye-coordination/aim-trainer": {
    "ko": {
      "name": "에임 연습 (Aim Trainer)",
      "tagline": "축소되는 타겟을 연속 격파하는 동적 마우스 정확도 훈련"
    },
    "ja": {
      "name": "エイム練習 (Aim Trainer)",
      "tagline": "小さくなるターゲットを素早く連続クリックするマウス精度訓練"
    },
    "de": {
      "name": "Aim Trainer Online",
      "tagline": "Kostenloses Maus-Präzisionstraining & Zielgenauigkeitstest im Browser"
    },
    "pt": {
      "name": "Treino de Mira Online (Aim Trainer)",
      "tagline": "Treine a precisão do mouse, reflexos e micro-flicks para jogos FPS"
    },
    "es": {
      "name": "Aim Trainer Online (Entrenador de Puntería)",
      "tagline": "Entrena puntería con el mouse, micro-flicks y precisión para juegos FPS"
    },
    "fr": {
      "name": "Aim Trainer en Ligne (Entraînement de Visée)",
      "tagline": "Entraînez votre précision de souris, vos micro-flicks et votre visée pour jeux FPS"
    }
  },
  "/drills/motor/movement-speed/keyboard-recognition": {
    "ko": {
      "name": "키보드 타건 속도 훈련",
      "tagline": "화면 프롬프트에 맞는 키를 즉시 입력하는 키 속도 훈련"
    },
    "ja": {
      "name": "キーボード練習 (Keyboard Speed Test)",
      "tagline": "ブラインドタッチと打鍵反応速度を測定・訓練する無料キートレーナー"
    },
    "de": {
      "name": "Tastatur Reaktionsgeschwindigkeitstest",
      "tagline": "Reagiere blitzschnell auf Bildschirmanweisungen zur Stärkung des Tastatur-Muskelgedächtnisses"
    },
    "es": {
      "name": "Test de Velocidad de Teclado",
      "tagline": "Reacciona a indicaciones en pantalla para consolidar la memoria muscular mecanográfica"
    },
    "fr": {
      "name": "Test de Vitesse de Frappe au Clavier",
      "tagline": "Réagissez aux instructions à l'écran pour ancrer la mémoire musculaire dactyle"
    },
    "pt": {
      "name": "Teste de Velocidade no Teclado (Digitação Rápida)",
      "tagline": "Reaja a comandos na tela para fortalecer a memória muscular de digitação e keybinds"
    }
  },
  "/drills/motor/hand-eye-coordination/precision-flick-shot": {
    "ko": {
      "name": "정밀 플릭 샷",
      "tagline": "미세 조리개 중심 타겟을 순간 포착하는 스냅 조준 훈련"
    },
    "ja": {
      "name": "精密フリックショット (Precision Flick Shot)",
      "tagline": "微小な開口部の中央ターゲットを瞬間的に捉えるスナップエイム訓練"
    },
    "de": {
      "name": "Präzisions-Flick-Shot (Snap-Aim-Training)",
      "tagline": "Erfasse winzige Zielpunkte im Blenden-Zentrum mit blitzschnellem Snap-Aiming"
    },
    "es": {
      "name": "Flick Shot de Precisión (Snap Aim)",
      "tagline": "Fija objetivos minúsculos en el centro de la mirilla con micro-flicks instantáneos"
    },
    "fr": {
      "name": "Flick Shot de Précision (Snap Aim)",
      "tagline": "Verrouillez des micro-cibles au centre du réticule avec des flicks instantanés"
    },
    "pt": {
      "name": "Flick Shot de Precisão (Snap Aim)",
      "tagline": "Acerte alvos minúsculos no centro da mira com micro-flicks instantâneos"
    }
  },
  "/drills/motor/hand-eye-coordination/drag-and-drop": {
    "ko": {
      "name": "드래그 앤 드롭 테스트",
      "tagline": "순간이동하는 링 안으로 정밀하게 볼을 이동시키는 마우스 조작 훈련"
    },
    "ja": {
      "name": "ドラッグ＆ドロップ テスト",
      "tagline": "テレポートするリング内へ高精度にボールを運ぶマウス操作ドラッグ訓練"
    },
    "de": {
      "name": "Drag-and-Drop Test Online",
      "tagline": "Bewege Bälle präzise in dynamische Teleportationsringe zur Kalibrierung der Mausführung"
    },
    "es": {
      "name": "Test de Arrastrar y Soltar (Drag and Drop)",
      "tagline": "Mueve esferas con precisión hacia anillos dinámicos para calibrar el agarre del cursor"
    },
    "fr": {
      "name": "Test Glisser-Déposer (Drag and Drop)",
      "tagline": "Déplacez les sphères avec précision dans des anneaux dynamiques pour calibrer le guidage du curseur"
    },
    "pt": {
      "name": "Teste de Arrastar e Soltar (Drag and Drop)",
      "tagline": "Mova esferas com precisão para anéis dinâmicos para calibrar o controle do cursor"
    }
  },
  "/drills/motor/precision-control/tracing": {
    "ko": {
      "name": "마우스 트레이싱",
      "tagline": "불규칙한 파동 궤적을 부드럽게 추적하는 마우스 연속 제어"
    },
    "ja": {
      "name": "マウストレーシング (Mouse Tracing Game)",
      "tagline": "不規則な正弦波の軌道を滑らかに追従するマウス連続コントロール訓練"
    },
    "de": {
      "name": "Maus Tracing Spiel (Pfadverfolgung)",
      "tagline": "Verfolge unregelmäßige Wellenkurven geschmeidig für kontinuierliche Mikrokontrolle"
    },
    "es": {
      "name": "Test de Trazado de Ratón (Mouse Tracing)",
      "tagline": "Sigue ondas sinusoidales continuas con suavidad para un micro-control quirúrgico"
    },
    "fr": {
      "name": "Test de Tracé à la Souris (Mouse Tracing)",
      "tagline": "Suivez des trajectoires sinusoïdales continues avec fluidité pour un micro-contrôle chirurgical"
    },
    "pt": {
      "name": "Teste de Traçado com o Mouse (Mouse Tracing)",
      "tagline": "Siga ondas senoidais contínuas com suavidade para micro-controle cirúrgico do cursor"
    }
  },
  "/drills/motor/movement-speed/finger-sequencing": {
    "ko": {
      "name": "순서 조준 테스트",
      "tagline": "크기 순서대로 노드를 신속하게 클릭하는 손가락 기민성 훈련"
    },
    "ja": {
      "name": "順序エイム練習 (Sequence Aim Trainer)",
      "tagline": "大きさ順にノードを最速クリックする指先の敏捷性と反応シーケンス訓練"
    },
    "de": {
      "name": "Reihenfolge-Zieltraining (Finger-Sequenzierung)",
      "tagline": "Klicke Knotenpunkte in aufsteigender Größenordnung zur Schulung von Fingerfertigkeit und Rhythmus"
    },
    "es": {
      "name": "Secuencia de Disparo (Sequence Aim Trainer)",
      "tagline": "Haz clic en nodos por orden de tamaño para entrenar destreza digital y ritmo motor"
    },
    "fr": {
      "name": "Séquence de Visée (Sequence Aim Trainer)",
      "tagline": "Cliquez sur les nœuds par ordre de taille pour développer la dextérité digitale et le rythme"
    },
    "pt": {
      "name": "Sequência de Mira (Sequence Aim Trainer)",
      "tagline": "Clique em nós por ordem de tamanho para treinar destreza digital e ritmo motor"
    }
  },
  "/drills/fps/angle-hold-trainer": {
    "ja": {
      "name": "置きエイム 練習 (プリエイム)",
      "tagline": "チョークポイントの飛び出しに対する置き幅と初弾反応速度を測定・強化：ピークアドバンテージを打破する防御プリエイムFPSドリル"
    },
    "ko": {
      "name": "대기 에임 연습 (각 쪼개기)",
      "tagline": "모퉁이에서 튀어나오는 적에 맞춘 적정 대기폭(오프셋)과 격발 반응속도를 훈련：피커스 어드밴티지를 무력화하는 방어형 프리 에임 트레이너"
    },
    "de": {
      "name": "Crosshair Placement Training",
      "tagline": "Kostenloser Crosshair Placement Trainer. Optimiere Wandabstand, Kopfhöhe und Reaktionszeit, um den Peeker-Advantage in CS2 und Valorant auszukontern."
    },
    "es": {
      "name": "Colocación de Mira",
      "tagline": "Entrena colocación de mira y retención de ángulos en el navegador. Calibra la separación de esquina y supera la ventaja del peeker en CS2 y Valorant."
    },
    "fr": {
      "name": "Placement du Viseur",
      "tagline": "Entraînez le placement du viseur et la tenue de ligne sur PC. Calibrez votre distance au mur et neutralisez le peeker advantage sur CS2 et Valorant."
    },
    "pt": {
      "name": "Posicionamento de Mira",
      "tagline": "Treine posicionamento de mira e marcação de ângulos no navegador. Calibre o espaçamento da parede e neutralize o peeker advantage no CS2 e Valorant."
    }
  },
  "/drills/memory/short-term-memory/color-sequence": {
    "pt": {
      "name": "Jogo da Memória Online (Color Sequence)",
      "tagline": "Treino interativo de memória operacional visual e retenção de sequências de cores"
    },
    "ko": {
      "name": "사이먼 게임 – 색깔 순서 단기 기억력 테스트",
      "tagline": "점진적으로 길어지는 발광 컬러 시퀀스를 정확히 기억하고 재현하는 순차 기억력 훈련"
    },
    "ja": {
      "name": "サイモンゲーム – 色と順番の記憶力テスト",
      "tagline": "光る色の順番を記憶して再現し、視覚的ワーキングメモリと短期記憶容量を測定・強化"
    },
    "de": {
      "name": "Senso Spiel Online",
      "tagline": "Kostenloses Senso-Spiel online: Merke dir die wachsende Farb-Reihenfolge und teste dein visuelles Arbeitsgedächtnis direkt im Browser ohne Anmeldung."
    },
    "es": {
      "name": "Juego Simón Online",
      "tagline": "Juego Simón online gratis: Memoriza secuencias de colores en expansión y pon a prueba tu memoria de trabajo visual directamente en el navegador sin descargas."
    },
    "fr": {
      "name": "Jeu Simon en Ligne",
      "tagline": "Jeu Simon en ligne gratuit: Retenez des suites de couleurs croissantes et testez votre mémoire de travail visuelle directement dans le navigateur sans compte."
    }
  },
  "/drills/visual/depth-perception/distance-judgment": {
    "ja": {
      "name": "深視力検査 (Distance Judgment)",
      "tagline": "大型・二種免許の三桿法に対応した深視力・遠近感の測定・練習シミュレーター"
    },
    "ko": {
      "name": "입체시 검사・원근감 테스트 (삼간법 거리 판단)",
      "tagline": "삼간법 원리를 기반으로 양안 시차와 원근 입체시를 정밀 측정하는 시각 훈련 도구"
    },
    "de": {
      "name": "Tiefensehen Test (Räumliches Sehen & Abstandsschätzung)",
      "tagline": "Präzise Messung der Tiefenwahrnehmung und des stereoskopischen Sehens basierend auf dem Dreistäbchen-Test"
    },
    "es": {
      "name": "Test de Percepción de Profundidad (Cálculo de Distancia)",
      "tagline": "Evaluación precisa de la visión estereoscópica y disparidad binocular con la prueba de las tres varillas"
    },
    "fr": {
      "name": "Test de Perception de la Profondeur (Calcul de Distance)",
      "tagline": "Évaluation précise de la vision stéréoscopique et de la disparité binoculaire par le test des trois tiges"
    },
    "pt": {
      "name": "Teste de Percepção de Profundidade (Cálculo de Distância)",
      "tagline": "Avaliação precisa da visão estereoscópica e disparidade binocular baseada no teste das três hastes"
    }
  },
  "/drills/motor/precision-control/steady-hand": {
    "ja": {
      "name": "イライラ棒 (Steady Hand Game)",
      "tagline": "壁に触れずに狭まる電撃コースを進む無料イライラ棒・マウス精度テスト"
    },
    "ko": {
      "name": "손떨림 제어 테스트 (Steady Hand Game)",
      "tagline": "좁아지는 통로를 벗어나지 않고 이동하는 미세 마우스 제어 및 손떨림 억제 훈련"
    },
    "de": {
      "name": "Ruhige Hand Spiel (Heißer Draht Online)",
      "tagline": "Führe den Cursor ohne Wandberührung durch enge Korridore zur Unterdrückung von Handzittern"
    },
    "es": {
      "name": "Juego del Pulso Firme (Laberinto del Ratón)",
      "tagline": "Guía el cursor por pasillos estrechos sin tocar los bordes para suprimir el temblor de mano"
    },
    "fr": {
      "name": "Jeu de la Main Ferme (Fil Chaud Virtuel)",
      "tagline": "Guidez le curseur dans des couloirs étroits sans toucher les parois pour supprimer les tremblements"
    },
    "pt": {
      "name": "Jogo da Mão Firme (Fio Elétrico Online)",
      "tagline": "Guie o cursor por corredores estreitos sem tocar as bordas para eliminar tremores"
    }
  },
  "/drills/fps/recoil-control": {
    "ja": {
      "name": "リコイル練習 (スプレー制御)",
      "tagline": "武器の反動パターンとマウス引き下げ速度を同期させるリコイル制御トレーニング：長押しフルオート時の集弾率を極めるFPSエイムトレーナー"
    },
    "ko": {
      "name": "반동 제어 연습 (스프레이 조절)",
      "tagline": "총기별 반동 패턴과 수직 마우스 드래그 속도를 정밀하게 제어하는 리코일 컨트롤 트레이너: 연사 시 탄퍼짐 억제 및 집탄율 극대화"
    },
    "de": {
      "name": "Recoil Control lernen",
      "tagline": "Kostenloses Recoil Control Training im Browser. Meistere Spray Patterns, vertikale Mauskompensation und Trefferdichte für CS2, Valorant und Apex Legends."
    },
    "es": {
      "name": "Control de Retroceso FPS",
      "tagline": "Entrena el control de retroceso y patrones de spray en tu navegador. Domina la compensación vertical y ráfagas para CS2 y Valorant gratis."
    },
    "fr": {
      "name": "Contrôle du Recul FPS",
      "tagline": "Entraînez le contrôle du recul et les spray patterns sur votre navigateur. Maîtrisez la compensation verticale et les tirs groupés sur CS2 et Valorant."
    },
    "pt": {
      "name": "Treino de Controle de Recoil",
      "tagline": "Treine controle de recoil e padrões de spray no navegador. Domine a compensação vertical e transferências de tiro para CS2 e Valorant gratuitamente."
    }
  },
  "/drills/fps/strafe-tracking": {
    "ja": {
      "name": "追いエイム練習 (Strafe Tracking Aim Trainer)",
      "tagline": "不規則な左右ストレイフと切り返しに吸い付く無料ブラウザ追いエイム・トラッキング練習ツール"
    },
    "ko": {
      "name": "에임 트래킹 연습 (Strafe Tracking Aim Trainer)",
      "tagline": "불규칙한 좌우 무빙과 방향 전환을 정확하게 추적하는 무료 브라우저 에임 트래킹 훈련 도구"
    },
    "de": {
      "name": "Strafe Tracking Übung",
      "tagline": "Kostenlose Strafe-Tracking-Übung im Browser. Trainiere reaktives Zielen auf AD-Strafes, Smooth Pursuit und schnelle Richtungswechsel für Apex und CS2."
    },
    "es": {
      "name": "Strafe Tracking de Puntería",
      "tagline": "Entrena strafe tracking reactivo y lectura de cambios de dirección en tu navegador. Domina el seguimiento de blancos para Apex y Overwatch 2 gratis."
    },
    "fr": {
      "name": "Strafe Tracking FPS",
      "tagline": "Entraînez le strafe tracking réactif et la lecture des changements de direction. Maîtrisez le suivi de cibles pour Apex Legends et Overwatch 2."
    },
    "pt": {
      "name": "Treino de Strafe Tracking",
      "tagline": "Treine strafe tracking reativo e mudanças de direção no navegador. Domine o rastreamento de alvos velozes para Apex Legends e Overwatch 2 grátis."
    }
  },
  "/drills/memory/working-memory/n-back": {
    "ja": {
      "name": "nバック課題 (デュアルnバック)",
      "tagline": "ワーキングメモリ・作業記憶の連続情報更新と実行機能を鍛える無料ブラウザ認知トレーニング"
    },
    "ko": {
      "name": "N-Back 게임 및 연습 사이트 (N백 작업기억 훈련)",
      "tagline": "연속적인 정보 갱신과 작업기억 용량을 측정하고 유동성 지능을 훈련하는 무료 브라우저 도구"
    },
    "de": {
      "name": "N-Back Test Online (Arbeitsgedächtnis-Training)",
      "tagline": "Kostenloser N-Back Test zur Messung und Steigerung der kontinuierlichen Arbeitsgedächtnis-Kapazität"
    },
    "es": {
      "name": "Test N-Back Online (Tarea N-Back Memoria de Trabajo)",
      "tagline": "Entrena la actualización continua de la memoria de trabajo y el control ejecutivo gratis en el navegador"
    },
    "pt": {
      "name": "Teste N-Back Online (Treino de Memória Operacional)",
      "tagline": "Treine a atualização contínua da memória operacional e a flexibilidade cognitiva online grátis"
    },
    "fr": {
      "name": "Test N-Back en Ligne",
      "tagline": "Test N-back en ligne gratuit: Entrainez votre memoire de travail et la mise a jour continue de l information a 2-back et 3-back sans inscription."
    }
  },
  "/drills/memory/spatial-memory/grid-memorization": {
    "ja": {
      "name": "瞬間記憶テスト (Visual Memory Test)",
      "tagline": "4×4〜5×5の拡大グリッドパターンを記憶し視覚キャッシュ容量を鍛える無料ブラウザ瞬間記憶テスト"
    },
    "ko": {
      "name": "순간 기억 테스트 (시각 기억력 검사)",
      "tagline": "확장되는 격자 매트릭스 패턴을 순간 기억하여 시각 작업기억 용량을 훈련하는 무료 브라우저 도구"
    },
    "de": {
      "name": "Visueller Gedächtnistest Online (Memory Matrix)",
      "tagline": "Visuelles Arbeitsgedächtnis und räumliches Mustergedächtnis auf Matrixgittern online trainieren"
    },
    "es": {
      "name": "Test de Memoria Visual Online (Juego de Memoria en Cuadrícula)",
      "tagline": "Entrena la memoria de trabajo visoespacial y la retención de patrones matriciales gratis"
    },
    "pt": {
      "name": "Teste de Memória Visual Online (Treino de Memória em Grade)",
      "tagline": "Treine a memória operacional visoespacial e retenção de padrões em matrizes online grátis"
    },
    "fr": {
      "name": "Test de Mémoire Visuelle",
      "tagline": "Test de memoire visuelle en ligne gratuit: Memorisez les motifs de grille en 1,5s et developpez votre empan spatial et chunking visuel sans inscription."
    }
  },
  "/drills/memory/short-term-memory/digit-span": {
    "ja": {
      "name": "数唱課題・数唱テスト (Digit Span)",
      "tagline": "ランダムな数字の提示シーケンスを記憶し音韻ループ容量と短期記憶スパンを測定・鍛える無料ツール"
    },
    "ko": {
      "name": "숫자 기억력 테스트 (디지트 스팬)",
      "tagline": "점진적으로 길어지는 숫자 배열을 기억하고 입력하여 음운 루프와 작업기억 용량을 측정하는 무료 도구"
    },
    "de": {
      "name": "Zahlenspannen-Test Online (Digit Span)",
      "tagline": "Zahlenfolgen einprägen und abrufen: Phonologische Schleife und Kurzzeitgedächtnis-Kapazität online testen"
    },
    "es": {
      "name": "Test de Dígitos Online (Digit Span)",
      "tagline": "Memoriza secuencias numéricas crecientes y mide la capacidad de retención y bucle fonológico gratis"
    },
    "pt": {
      "name": "Teste de Dígitos Online (Span de Dígitos)",
      "tagline": "Treine a retenção de sequências numéricas e avalie o span de memória de curto prazo e alça fonológica online"
    },
    "fr": {
      "name": "Test d Empan de Chiffres",
      "tagline": "Test d empan de chiffres en ligne gratuit: Retenez des suites de nombres croissantes et evaluez votre boucle phonologique sans telechargement ni inscription."
    }
  },
  "/drills/memory/short-term-memory/word-recall": {
    "ja": {
      "name": "単語記憶テスト・単語再生テスト (Verbal Memory)",
      "tagline": "提示された単語リストを記憶し自由再生で入力：言語性短期記憶と意味的処理能力を鍛える無料認知テスト"
    },
    "ko": {
      "name": "단어 기억력 테스트 (언어 기억 회상)",
      "tagline": "제시된 단어 목록을 기억하고 자유 회상으로 입력하여 언어성 단기 기억력과 작업기억을 측정하는 무료 도구"
    },
    "de": {
      "name": "Verbaler Gedächtnistest Online (Wortliste & Freie Wiedergabe)",
      "tagline": "Wortlisten einprägen und frei abrufen: Verbales Kurzzeitgedächtnis und semantische Enkodierung online testen"
    },
    "es": {
      "name": "Test de Memoria Verbal Online (Recuerdo Libre de Palabras)",
      "tagline": "Memoriza listas de palabras y evalúa el recuerdo libre inmediato y la memoria verbal a corto plazo gratis"
    },
    "pt": {
      "name": "Teste de Memória Verbal Online (Evocação Livre de Palavras)",
      "tagline": "Treine a evocação livre de palavras e avalie a capacidade de memória verbal de curto prazo online grátis"
    },
    "fr": {
      "name": "Test de Mémoire Verbale",
      "tagline": "Test de memoire verbale en ligne gratuit: Retenez des listes de mots, maitrisez l effet de position serielle et entrainez votre memoire de travail sans compte."
    }
  },
  "/drills/memory/spatial-memory/object-location": {
    "ja": {
      "name": "空間記憶テスト (物体位置記憶テスト)",
      "tagline": "拡大グリッド上の物体配置を記憶し目標座標を特定：空間位置記憶と視覚特徴結合能を鍛える無料認知テスト"
    },
    "ko": {
      "name": "공간 기억력 테스트 (물체 위치 기억 검사)",
      "tagline": "확장되는 격자 매트릭스 위 사물 위치를 순간 기억하고 목표 좌표를 찾는 공간 기억력 및 시각 결합 훈련"
    },
    "de": {
      "name": "Räumliches Gedächtnistest (Objektposition-Gedächtnis)",
      "tagline": "Objektpositionen auf expandierenden Rastern einprägen und abrufen: Visuell-räumliche Merkfähigkeit online testen"
    },
    "es": {
      "name": "Test de Memoria Espacial (Localización de Objetos)",
      "tagline": "Memoriza la ubicación de objetos en cuadrículas expansivas y entrena la retención visoespacial gratis"
    },
    "pt": {
      "name": "Teste de Memória Espacial (Localização de Objetos)",
      "tagline": "Memorize a localização de objetos em matrizes expansivas e treine a retenção visoespacial online grátis"
    },
    "fr": {
      "name": "Test de Mémoire Spatiale",
      "tagline": "Test de memoire spatiale en ligne gratuit: Memorisez la position des objets sur grille en 1,5s et retrouvez les coordonnees cibles sans inscription."
    }
  },
  "/drills/memory/spatial-memory/path-tracing": {
    "ja": {
      "name": "順番記憶テスト (コルシブロック・パストレーシング)",
      "tagline": "光るタイルの移動軌跡を記憶し正確な順番でなぞる：空間系列記憶とコルシブロック課題を鍛える無料認知テスト"
    },
    "ko": {
      "name": "순서 기억 테스트 (패스 트레이싱)",
      "tagline": "점등되는 타일의 이동 경로를 기억하고 순서대로 재현하는 공간 순서 기억 및 코시 블록 훈련"
    },
    "de": {
      "name": "Corsi-Block-Test (Sequenzgedächtnis Online)",
      "tagline": "Pfadsequenzen einprägen und exakt nachzeichnen: Räumliches Sequenzgedächtnis und Corsi-Block-Spanne online testen"
    },
    "es": {
      "name": "Test de Memoria Secuencial (Bloques de Corsi)",
      "tagline": "Memoriza secuencias de rutas animadas y reprodúcelas en orden: Evalúa la memoria de trabajo visoespacial gratis"
    },
    "pt": {
      "name": "Teste de Memória Sequencial (Blocos de Corsi)",
      "tagline": "Memorize trajetórias em grade e reproduza na ordem exata: Avalie o span de memória sequencial espacial online grátis"
    },
    "fr": {
      "name": "Test des Blocs de Corsi",
      "tagline": "Test des blocs de corsi en ligne gratuit: Memorisez les trajectoires animees sur grille et reproduisez les sequences dans l ordre exact sans inscription."
    }
  },
  "/drills/fps/vertical-air-track": {
    "ja": {
      "name": "垂直 エイム 練習 (縦エイム・空中トラッキング)",
      "tagline": "重力に従って放物線を描く空中ターゲットを追従：ApexやOverwatchの縦エイムと滞空追従を鍛えるFPSエイム練習"
    },
    "ko": {
      "name": "수직 에임 연습 (공중 타겟 트래킹)",
      "tagline": "중력 가속도로 낙하하는 공중 타겟을 부드럽게 추적: 에이펙스와 오버워치 수직 트래킹 에임 연습"
    },
    "de": {
      "name": "Vertikales Aim Training",
      "tagline": "Kostenloser Vertical Aim Trainer: Trainiere Y-Achsen-Mauskontrolle, Parabel-Flugkurven und Luftziel-Tracking für Apex Legends und Overwatch 2."
    },
    "es": {
      "name": "Puntería Vertical FPS",
      "tagline": "Entrena puntería vertical y rastreo aéreo en el navegador. Domina el control del eje Y y trayectorias parabólicas en Apex Legends y Overwatch 2 gratis."
    },
    "fr": {
      "name": "Visée Verticale FPS",
      "tagline": "Entraînez la visée verticale et le suivi aérien. Maîtrisez l"
    },
    "pt": {
      "name": "Treino de Mira Vertical",
      "tagline": "Treine mira vertical e rastreamento aéreo no navegador. Domine o controle no eixo Y e trajetórias parabólicas no Apex Legends e Overwatch 2 de graça."
    }
  },
  "/drills/fps/target-switching-swarm": {
    "ja": {
      "name": "ターゲット スイッチング エイム練習",
      "tagline": "動的スワーム群を連続フリックで高速撃破：複数敵戦やスプレーツランスファーを鍛えるFPSエイム練習"
    },
    "ko": {
      "name": "타겟 스위칭 에임 연습",
      "tagline": "동적으로 생성되는 다중 타겟을 딜레이 없이 신속하게 연속 격추하는 FPS 타겟 전환 에임 트레이너"
    },
    "de": {
      "name": "Target Switching Aim Trainer",
      "tagline": "Kostenloses Target-Switching-Training im Browser: Trainiere schnelle Zielwechsel, Spray Transfers und verzögerungsfreie Flicks für CS2 und Valorant."
    },
    "es": {
      "name": "Target Switching FPS",
      "tagline": "Entrena target switching y cambio rápido de blancos en el navegador. Elimina la duda tras cada baja y domina spray transfers en Valorant y CS2 gratis."
    },
    "fr": {
      "name": "Target Switching FPS",
      "tagline": "Entraînez le target switching et le changement de cible. Éliminez l"
    },
    "pt": {
      "name": "Target Switching FPS",
      "tagline": "Treine target switching e troca rápida de alvos no navegador. Elimine o atraso de confirmação e domine spray transfers no Valorant e CS2 gratuitamente."
    }
  },
  "/drills/fps/target-acquisition": {
    "ja": {
      "name": "ターゲット捕捉 エイム練習",
      "tagline": "視野内の高優先度ターゲットを瞬時に識別し初弾を正確に叩き込む：索敵認識とフリック精度を高めるFPSエイム練習"
    },
    "ko": {
      "name": "타겟 획득 에임 연습",
      "tagline": "시야 내 위협 대상을 즉각 식별하고 초탄을 정밀하게 타격하는 FPS 타겟 포착 및 초탄 에임 트레이너"
    },
    "de": {
      "name": "Zielerfassung FPS Training",
      "tagline": "Kostenloses Zielerfassungs-Training im Browser: Trainiere visuelle Zielerkennung, Kontrastunterscheidung und präzise erste Schüsse für CS2 und Valorant."
    },
    "es": {
      "name": "Adquisición de Objetivos FPS",
      "tagline": "Entrena adquisición de objetivos, detección visual y precisión del primer tiro en el navegador. Domina el primer disparo para CS2 y Valorant gratis."
    },
    "fr": {
      "name": "Acquisition de Cibles FPS",
      "tagline": "Entraînez l"
    },
    "pt": {
      "name": "Treino de Aquisição de Alvos",
      "tagline": "Treine aquisição de alvos, velocidade de detecção visual e precisão do primeiro tiro no navegador. Domine o primeiro disparo para CS2 e Valorant grátis."
    }
  },
  "/drills/fps/target-prioritization": {
    "ja": {
      "name": "ターゲット優先度 エイム練習",
      "tagline": "高脅威ターゲットを瞬時に見極め味方への誤射を抑制：脅威評価と意思決定スピードを高めるFPSエイム練習"
    },
    "ko": {
      "name": "타겟 우선순위 에임 연습",
      "tagline": "위협 수준이 높은 적을 즉각 선별하고 아군 오사를 억제하는 FPS 위협 평가 및 우선순위 판단 에임 트레이너"
    },
    "de": {
      "name": "Zielpriorisierung FPS Training",
      "tagline": "Kostenloses Zielpriorisierungs-Training im Browser: Trainiere Bedrohungseinschätzung, Trigger-Disziplin und Schusshemmung für CS2 und Valorant."
    },
    "es": {
      "name": "Priorización de Objetivos FPS",
      "tagline": "Entrena priorización de objetivos, evaluación de amenazas y disciplina de gatillo en el navegador. Domina la toma de decisiones para Valorant y CS2 gratis."
    },
    "fr": {
      "name": "Priorisation des Cibles FPS",
      "tagline": "Entraînez la priorisation des cibles, l"
    },
    "pt": {
      "name": "Treino de Priorização de Alvos",
      "tagline": "Treine priorização de alvos, avaliação de ameaças e disciplina de gatilho no navegador. Domine a mira decisiva para Valorant e CS2 gratuitamente."
    }
  },
  "/drills/fps/flick-shot-training": {
    "ja": {
      "name": "フリック エイム 練習",
      "tagline": "出現するターゲットへ瞬時に照準を飛ばす弾道フリックエイム練習：初弾精度と終末制動力を鍛えるFPSエイムトレーナー"
    },
    "ko": {
      "name": "플릭 에임 연습",
      "tagline": "화면 곳곳에 무작위로 생성되는 목표를 번개처럼 정확하게 타격하는 FPS 플릭샷 및 초탄 정확도 에임 트레이너"
    },
    "de": {
      "name": "Flick Shot Training",
      "tagline": "Kostenloses Flick Shot Training im Browser. Trainiere Snap Aiming, Mausbeschleunigung und Reibungsbremsung für präzise Headshots in CS2 und Valorant."
    },
    "es": {
      "name": "Entrenamiento de Flick Shot",
      "tagline": "Entrena flick shot y puntería rápida en el navegador. Perfecciona la aceleración balística y el frenado de ratón para dar headshots en CS2 y Valorant."
    },
    "fr": {
      "name": "Entraînement Flick Shot",
      "tagline": "Entraînez le flick shot et le tir réflexe sur PC. Maîtrisez la propulsion balistique et le freinage de souris pour réussir vos tirs sur CS2 et Valorant."
    },
    "pt": {
      "name": "Treino de Flick Shot",
      "tagline": "Treine flick shot e mira rápida no navegador. Aperfeiçoe a aceleração balística e a frenagem de mouse para acertar tiros na cabeça no CS2 e Valorant."
    }
  },
  "/drills/fps/micro-correction-precision": {
    "ja": {
      "name": "マイクロフリック 練習",
      "tagline": "一次フリック直後の微小な位置ズレを瞬時に修正：精密な終末減速とヘッドショット精度を高めるFPSエイム練習"
    },
    "ko": {
      "name": "마이크로 플릭 연습",
      "tagline": "초기 플릭 후 목표 중심의 미세 오차를 번개처럼 보정하는 FPS 에임 미세조정 및 헤드샷 정밀도 트레이너"
    },
    "de": {
      "name": "Mikrokorrektur Aiming",
      "tagline": "Mikrokorrektur-Aiming im Browser: Trainiere Feinjustierung nach dem ersten Flick, Bremskontrolle und Headshot-Präzision für CS2 und Valorant."
    },
    "es": {
      "name": "Micro Corrección de Puntería",
      "tagline": "Entrena la micro corrección de puntería y desaceleración en tu navegador. Domina micro ajustes y precisión de headshots en Valorant y CS2 gratis."
    },
    "fr": {
      "name": "Micro-Correction de Visée",
      "tagline": "Entraînez la micro-correction de visée et la décélération terminale. Maîtrisez les micro-ajustements et la précision headshot sur Valorant et CS2."
    },
    "pt": {
      "name": "Treino de Micro Correção de Mira",
      "tagline": "Treine micro correção de mira e desaceleração terminal no navegador. Domine micro-ajustes finos e precisão de headshots para Valorant e CS2 gratuitamente."
    }
  },
  "/drills/fps/180-degree-awareness": {
    "ja": {
      "name": "180度 振り向き 練習",
      "tagline": "画面端や背後の敵を瞬時に捉える180度振り向きエイム練習：周辺視野認識と大振りフリックの初弾精度を高めるFPSエイムトレーナー"
    },
    "ko": {
      "name": "180도 플릭 에임 연습",
      "tagline": "화면 가장자리와 후방의 적을 번개처럼 포착하는 180도 화면전환 플릭 트레이너: 주변시야 반응과 급격한 시야 회전 정확도 향상"
    },
    "de": {
      "name": "180 Grad Aiming",
      "tagline": "Kostenloses 180-Grad-Aim-Training im Browser: Trainiere schnelle 180°-Drehungen, peripheres Sehen und Flashbang-Reaktionen für CS2, Valorant und Apex."
    },
    "es": {
      "name": "Entrenamiento de Giro 180°",
      "tagline": "Entrena giros rápidos de 180 grados, detección periférica y reacción ante flancos en el navegador. Mejora tu puntería y control de alfombrilla en FPS."
    },
    "fr": {
      "name": "Entraînement Demi-Tour 180°",
      "tagline": "Entraînez les demi-tours à 180 degrés, la vision périphérique et la réaction aux attaques de dos. Perfectionnez vos flicks et votre vitesse sur CS2."
    },
    "pt": {
      "name": "Treino de Giro 180°",
      "tagline": "Treine giros rápidos de 180 graus, reflexo contra flancos e visão periférica no navegador. Melhore sua agilidade de braço e mira no CS2 e Valorant."
    }
  },
  "/drills/fps/instant-response": {
    "ja": {
      "name": "FPS 反応速度 テスト",
      "tagline": "視覚刺激に対する反射神経とクリック反応速度をミリ秒単位で測定：置きエイムと飛び出し反応を高めるFPS反射神経トレーナー"
    },
    "ko": {
      "name": "FPS 반응속도 테스트",
      "tagline": "시각 자극에 대한 클릭 반응 시간(ms)을 정밀 측정하고 페인트 사격을 억제하는 FPS 에임 반사신경 및 격발 트레이너"
    },
    "de": {
      "name": "FPS Reaktionszeit Test",
      "tagline": "Kostenloser FPS-Reaktionszeit-Test im Browser: Miss visuelle Reaktionszeit, Klicklatenz und Trigger-Reflexe in Millisekunden für CS2 und Valorant."
    },
    "es": {
      "name": "Tiempo de Reacción FPS",
      "tagline": "Mide tu tiempo de reacción en shooters en milisegundos. Perfecciona el reflejo de clic y la retención de ángulos para ganar duelos en CS2 y Valorant."
    },
    "fr": {
      "name": "Temps de Réaction FPS",
      "tagline": "Mesurez votre temps de réaction FPS en millisecondes. Développez la vitesse de clic et la tenue de ligne pour remporter vos duels sur CS2 et Valorant."
    },
    "pt": {
      "name": "Tempo de Reação FPS",
      "tagline": "Teste seu tempo de reação no FPS em milissegundos. Aperfeiçoe os reflexos de clique e segure ângulos com precisão para vencer duelos no CS2 e Valorant."
    }
  },
  "/drills/fps/anti-strafe-jitter-duel": {
    "ja": {
      "name": "レレレ撃ち 練習 (ジッタートラッキング)",
      "tagline": "高速ADAD移動（レレレ撃ち）に追従するリアクティブトラッキング練習：近距離での切り返し反応と照準ブレを抑えるFPSエイムトレーナー"
    },
    "ko": {
      "name": "무빙 트래킹 에임 연습 (ADAD 지터)",
      "tagline": "예측 불가능한 고빈도 ADAD 좌우 무빙을 놓치지 않고 추적하는 리액티브 트래킹 트레이너: 근거리 교전 트래킹 정확도 향상"
    },
    "de": {
      "name": "Anti-Strafe Aim Trainer",
      "tagline": "Kostenloser Anti-Strafe Trainer im Browser: Meistere reaktives Tracking und unberechenbare ADAD-Strafes für Apex Legends, Overwatch 2 und Warzone."
    },
    "es": {
      "name": "Tracking Reactivo",
      "tagline": "Entrena tracking reactivo contra strafes erráticos ADAD en el navegador. Domina duelos a corta distancia y microcorrecciones en Apex Legends y Overwatch 2."
    },
    "fr": {
      "name": "Tracking Réactif",
      "tagline": "Entraînez le tracking réactif face aux strafes rapides ADAD sur PC. Maîtrisez le suivi à courte distance et les micro-ajustements sur Apex et Overwatch 2."
    },
    "pt": {
      "name": "Treino de Anti-Strafe",
      "tagline": "Treine tracking reativo contra strafes rápidos ADAD no navegador. Domine trocas de tiro a curta distância e microajustes no Apex Legends e Overwatch 2."
    }
  },
  "/drills/fps/anti-zigzag-movement-trainer": {
    "ja": {
      "name": "ジグザグ移動 練習 (スライディング追従)",
      "tagline": "不規則なジグザグ移動・スライディングキャンセルに照準を吸い付かせるリアクティブトラッキング練習：切り返し時のオーバーシュートを防ぐFPSエイムトレーナー"
    },
    "ko": {
      "name": "지그재그 무빙 트래킹 (슬라이딩 추적)",
      "tagline": "급격한 지그재그 회피 기동과 슬라이딩 캔슬을 침착하게 추적하는 리액티브 에임 트레이너: 방향 전환 시 오버에이밍 억제 및 트래킹 유지력 향상"
    },
    "de": {
      "name": "Anti-Zigzag Aim Trainer",
      "tagline": "Kostenloser Anti-Zigzag-Trainer im Browser: Meistere reaktives Tracking gegen Zickzack-Ausweichbewegungen und Slide-Cancels für Apex Legends und Warzone."
    },
    "es": {
      "name": "Tracking Zigzag",
      "tagline": "Entrena tracking contra zigzag y slide cancels en el navegador. Elimina el overshoot de tu mira y domina objetivos evasivos en Apex Legends y Warzone."
    },
    "fr": {
      "name": "Tracking Zigzag",
      "tagline": "Entraînez le tracking contre les zigzags et slide cancels. Éliminez le dépassement du viseur et touchez les cibles évasives sur Apex et Warzone."
    },
    "pt": {
      "name": "Tracking Zigue-Zague",
      "tagline": "Treine tracking contra zigue-zague e slide cancels no navegador. Elimine o overshoot da mira e domine alvos com movimentação evasiva no Apex e Warzone."
    }
  },
  "/drills/fps/pro-smooth-pursuit": {
    "ja": {
      "name": "スムーズ トラッキング 練習 (滑走性眼球運動)",
      "tagline": "リサジュー曲線の不規則な軌道を滑らかに追従するスムースパシュート練習：手首の力みやブレを抑え吸い付くようなエイムを鍛えるFPSドリル"
    },
    "ko": {
      "name": "스무스 트래킹 에임 연습 (활창 추적)",
      "tagline": "리사주 곡선 궤적을 부드럽게 추종하는 스무스 퍼슈트 에임 훈련: 불필요한 떨림을 억제하고 목표물에 조준선을 밀착시키는 고정밀 트래킹 트레이너"
    },
    "de": {
      "name": "Smooth Pursuit Aim Trainer",
      "tagline": "Kostenloser Smooth Pursuit Aim Trainer. Trainiere kontinuierliches Kurven-Tracking und flüssige Mausführung für High-TTK-Shooter wie Apex und Overwatch 2."
    },
    "es": {
      "name": "Tracking Suave de Puntería",
      "tagline": "Entrena el tracking suave y seguimiento en curva en tu navegador. Domina la puntería continua y fluida para Apex Legends y Overwatch 2 gratis."
    },
    "fr": {
      "name": "Tracking Fluide FPS",
      "tagline": "Entraînez le tracking fluide et le suivi de trajectoire en courbe. Maîtrisez la visée continue sans tremblements pour Apex et Overwatch 2."
    },
    "pt": {
      "name": "Treino de Tracking Suave",
      "tagline": "Treine tracking suave e rastreamento em curva no navegador. Domine a mira contínua sem tremores para Apex Legends e Overwatch 2 gratuitamente."
    }
  },
  "/drills/fps/flow-state": {
    "ja": {
      "name": "フロー状態 エイム 練習 (集中力持続)",
      "tagline": "無心で目標を追い続ける心理的フロー状態（ゾーン）を誘導：余計な力みや雑念を排除し滑らかな追従リズムを極めるFPS集中力トレーナー"
    },
    "ko": {
      "name": "플로우 상태 에임 연습 (몰입 훈련)",
      "tagline": "잡념과 불필요한 긴장을 제거하고 에임 몰입 상태(Zone)를 유도하는 리듬 트레이너: 연속적인 표적 전환과 부드러운 트래킹 지속력 극대화"
    },
    "de": {
      "name": "Flow State Aim Trainer",
      "tagline": "Kostenloser Flow State Aim Trainer. Trainiere Konzentrationsausdauer, Smooth Pursuit Tracking und erreiche den mentalen Flow-Zustand für FPS-Gaming."
    },
    "es": {
      "name": "Entrenamiento de Foco FPS",
      "tagline": "Entrena el estado de flow y foco para shooters en el navegador. Desarrolla enfoque sostenido y tracking suave para rendir al máximo en CS2 y Valorant."
    },
    "fr": {
      "name": "Entraînement Focus FPS",
      "tagline": "Entraînez la concentration mentale et la visée continue sur PC. Entrez dans la zone pour éliminer les hésitations et réussir vos duels sur CS2 et Valorant."
    },
    "pt": {
      "name": "Treino de Foco FPS",
      "tagline": "Treine o estado de flow e foco para FPS no navegador. Desenvolva atenção sustentada e tracking contínuo para manter a mira calibrada em partidas longas."
    }
  },
  "/drills/visual/reaction-speed/go/no-go": {
    "ja": {
      "name": "Go/No-Goテスト・反応抑制トレーニング",
      "tagline": "緑のGoに最速反応し赤のNo-Goを即座に踏みとどまる衝動制御・運動抑制検査"
    },
    "ko": {
      "name": "Go/No-Go 검사・반응 억제 훈련",
      "tagline": "녹색 Go에는 최속 반응하고 적색 No-Go는 즉각 억제하는 충동 제어 및 운동 억제력 검사"
    },
    "de": {
      "name": "Go/No-Go Test (Reaktionshemmung & Impulskontrolle)",
      "tagline": "Reagiere auf grüne Go-Signale und stoppe motorische Impulse bei roten No-Go-Zielen"
    },
    "es": {
      "name": "Test Go/No-Go Visual (Inhibición de Respuesta)",
      "tagline": "Reacciona a la señal verde de Go y frena el impulso motor ante objetivos rojos de No-Go"
    },
    "fr": {
      "name": "Test Go/No-Go Visuel (Inhibition de Réponse)",
      "tagline": "Réagissez immédiatement au signal vert Go et inhibez l'impulsion motrice face aux cibles rouges No-Go"
    },
    "pt": {
      "name": "Teste Go/No-Go Visual (Inibição de Resposta)",
      "tagline": "Reaja imediatamente ao sinal verde Go e freie o impulso motor diante de alvos vermelhos No-Go"
    }
  },
  "/drills/visual/reaction-speed/light-reaction": {
    "ja": {
      "name": "光反応測定・視覚反射神経テスト",
      "tagline": "ストロボ閃光に対する光受容から筋収縮までの視覚反応速度をミリ秒単位で測定"
    },
    "ko": {
      "name": "빛 반응속도 테스트 (광 반응 반사신경 검사)",
      "tagline": "광학 섬광 자극에 대한 시각 반응 시간 및 근수축 지연 시간을 밀리초 단위로 측정"
    },
    "de": {
      "name": "Lichtreaktionstest (Visueller Reflextest)",
      "tagline": "Messe die reine visuelle Reaktionszeit auf Lichtblitze präzise in Millisekunden"
    },
    "es": {
      "name": "Test de Reacción a la Luz (Reflejo Visual)",
      "tagline": "Mide el tiempo de reacción visual puro ante destellos lumínicos en milisegundos"
    },
    "fr": {
      "name": "Test de Réaction à la Lumière (Réflexe Visuel)",
      "tagline": "Mesurez le temps de réaction visuel pur face à des flashs stroboscopiques en millisecondes"
    },
    "pt": {
      "name": "Teste de Reação à Luz (Reflexo Visual)",
      "tagline": "Meça a latência visuomotora primária diante de flashes estroboscópicos em milissegundos"
    }
  },
  "/drills/visual-tracking/constant-slow-pursuit": {
    "ja": {
      "name": "追従眼球運動トレーニング・低速視覚追従テスト",
      "tagline": "リサージュ曲線に沿って滑らかに追従し、視線のブレ（サッケード跳躍）を抑制して中心窩捕捉力を高めるアイトラッキング練習"
    },
    "ko": {
      "name": "안구 운동 훈련・저속 시각 추적 트레이닝",
      "tagline": "리사주 곡선을 따라 완만하게 이동하는 표적을 매끄럽게 추적하며 도약 안구운동을 억제하는 스무스 퍼슈트 눈 운동 훈련"
    },
    "de": {
      "name": "Augenfolgebewegung Training – Visuelle Blickstabilisation",
      "tagline": "Trainiere glatte Augenfolgebewegungen (Smooth Pursuit) entlang harmonischer Lissajous-Kurven und minimiere foveale Sakkadensprünge"
    },
    "es": {
      "name": "Movimientos Oculares",
      "tagline": "Entrena movimientos oculares de seguimiento suave (smooth pursuit) en curva de Lissajous. Mejora la estabilidad de la mirada y el rastreo visual gratis."
    },
    "fr": {
      "name": "Mouvements Oculaires",
      "tagline": "Entraînez la poursuite oculaire le long d"
    },
    "pt": {
      "name": "Treino de Movimento Ocular",
      "tagline": "Treine movimentos oculares de perseguição suave (smooth pursuit) na curva de Lissajous. Melhore a estabilidade do olhar e o tracking visual de graça."
    }
  },
  "/drills/visual-tracking/directional-chaos-pursuit": {
    "ja": {
      "name": "不規則方向追従トレーニング・カオス動体視力テスト",
      "tagline": "予測不能に急激な方向転換と速度変化を繰り返す標的を素早く再捕捉するサッケードリカバリー＆反応型アイトラッキング練習"
    },
    "ko": {
      "name": "불규칙 안구 추적 훈련・카오스 방향 전환 테스트",
      "tagline": "예측 불가능한 급격한 방향 전환과 속도 변화를 추적하여 시선 재포착(사케드 회복) 속도를 극대화하는 반응형 눈 운동 훈련"
    },
    "de": {
      "name": "Chaotische Augenfolgebewegung – Unvorhersehbare Zielverfolgung",
      "tagline": "Konditioniere die reaktive Blickreakquisition und sakkadische Rückholbewegungen bei unberechenbaren Richtungswechseln im Browser"
    },
    "es": {
      "name": "Seguimiento Ocular Caótico",
      "tagline": "Entrenamiento gratuito de seguimiento ocular caótico: mejora la recuperación sacádica y la refixación foveal inmediata ante trayectorias impredecibles."
    },
    "fr": {
      "name": "Poursuite Oculaire Chaotique",
      "tagline": "Entraînement gratuit de poursuite oculaire chaotique : développez la réactivité des saccades et la refixation fovéale sur trajectoires imprévisibles."
    },
    "pt": {
      "name": "Rastreamento Ocular Caótico",
      "tagline": "Treino gratuito de rastreamento ocular caótico: aprimore a recuperação sacádica e a refixação foveal imediata diante de trajetórias imprevisíveis."
    }
  },
  "/drills/visual/tracking-accuracy/moving-target": {
    "ja": {
      "name": "動体視力テスト・動体視力トレーニング (動体追従測定)",
      "tagline": "加速・跳ね返る移動ターゲットの弾道軌跡を予測し正確に迎撃する動体視力テスト"
    },
    "ko": {
      "name": "동체시력 테스트・동체시력 훈련 게임",
      "tagline": "가속하는 이동 표적의 비행 궤적을 예측하여 타이밍에 맞춰 요격하는 동체시력 측정"
    },
    "de": {
      "name": "Augentraining Online & Visuelle Reaktionszeit Test",
      "tagline": "Dynamische Sehschärfe, Blickfolgebewegung und Zielverfolgung auf bewegte Objekte im Browser trainieren"
    },
    "es": {
      "name": "Entrenamiento de Agudeza Visual Dinámica (Interceptación Cinética)",
      "tagline": "Predice trayectorias balísticas e intercepta objetivos dinámicos a alta velocidad"
    },
    "fr": {
      "name": "Entraînement de l'Acuité Visuelle Dynamique (Interception Cinétique)",
      "tagline": "Prédisez les trajectoires balistiques et interceptez des cibles dynamiques à haute vitesse"
    },
    "pt": {
      "name": "Treino de Acuidade Visual Dinâmica (Interceptação Cinética)",
      "tagline": "Preveja trajetórias balísticas e intercepte alvos móveis em alta velocidade com precisão"
    }
  },
  "/drills/visual/tracking-accuracy/multiple-targets": {
    "ja": {
      "name": "周辺視野トレーニング・多目標追従 MOT テスト",
      "tagline": "視野内の複数ターゲットを同時に記憶・追尾し周辺視野と空間的注意力を極限まで高めるMOTトレーニング"
    },
    "ko": {
      "name": "다중 객체 추적 MOT 테스트 (주변시 훈련)",
      "tagline": "불규칙하게 움직이는 복수의 타깃을 동시 추적하여 분할 주의력과 공간 작업기억을 극대화하는 MOT 검사"
    },
    "de": {
      "name": "Multiple Object Tracking Test (MOT Mehrzielverfolgung)",
      "tagline": "Verfolge mehrere identische Ziele simultan im dynamischen Raum und trainiere dein peripheres Blickfeld"
    },
    "es": {
      "name": "Test de Seguimiento de Objetos Múltiples (MOT y Visión Periférica)",
      "tagline": "Rastrea múltiples objetivos dinámicos a la vez para expandir tu campo visual periférico"
    },
    "fr": {
      "name": "Test de Poursuite d'Objets Multiples (MOT & Vision Périphérique)",
      "tagline": "Suivez simultanément plusieurs cibles dynamiques pour élargir votre champ visuel périphérique"
    },
    "pt": {
      "name": "Teste de Rastreamento de Múltiplos Objetos (MOT & Visão Periférica)",
      "tagline": "Rastreie múltiplos alvos dinâmicos ao mesmo tempo para expandir seu campo visual periférico"
    }
  },
  "/drills/visual/tracking-accuracy/pursuit-tracker": {
    "ja": {
      "name": "追従眼球運動テスト・眼球運動トレーニング (スムーズパシュート)",
      "tagline": "滑らかに移動するオーブをカーソルで追随し続け滑動性追従眼球運動とエクスプロイト安定性を向上"
    },
    "ko": {
      "name": "에임 트래킹 테스트・안구 추적 훈련 (스무스 퍼슈트)",
      "tagline": "연속적으로 움직이는 타깃을 시선과 커서로 유지하여 활동성 안구운동과 에임 트래킹 정밀도를 극대화"
    },
    "de": {
      "name": "Smooth Pursuit Eye-Tracking Test (Augenfolgebewegung)",
      "tagline": "Stufenlose Blickfolgebewegungen und Hand-Auge-Präzision auf sich kontinuierlich bewegende Ziele im Browser trainieren"
    },
    "es": {
      "name": "Seguimiento Ocular Continuo (Smooth Pursuit)",
      "tagline": "Entrena movimientos oculares continuos y precisión visoespacial en trayectorias dinámicas"
    },
    "fr": {
      "name": "Poursuite Oculaire Continue (Smooth Pursuit)",
      "tagline": "Entraînez les mouvements oculares continus et la précision visuo-spatiale sur des trajectoires fluides"
    },
    "pt": {
      "name": "Perseguição Ocular Contínua (Smooth Pursuit)",
      "tagline": "Treine movimentos oculares contínuos e fixação foveal sem saltos sacádicos bruscos"
    }
  },
  "/drills/visual/visual-recognition/entropic-grid": {
    "ja": {
      "name": "視覚探索テスト・動的グリッド探索トレーニング (視覚的注意)",
      "tagline": "高密度な100セルグリッドと動的ノイズの中で特定コードを最速特定する視覚的注意検査"
    },
    "ko": {
      "name": "시각 탐색 검사・엔트로픽 그리드 훈련 (선택적 주의력)",
      "tagline": "100개 셀의 동적 매트릭스 속에서 목표 코드를 신속히 식별하는 선택적 주의력 및 노이즈 필터링 훈련"
    },
    "de": {
      "name": "Visuelle Suche Test – Entropic Grid (Selektive Aufmerksamkeit)",
      "tagline": "Finde Zielsymbole in einer dynamischen 100-Zellen-Matrix unter wechselndem Hintergrundrauschen"
    },
    "es": {
      "name": "Test de Búsqueda en Cuadrícula Entrópica (Atención Selectiva)",
      "tagline": "Identifica símbolos objetivo en una cuadrícula dinámica con ruido visual cambiante"
    },
    "fr": {
      "name": "Test de Recherche sur Grille Entropique (Attention Sélective)",
      "tagline": "Identifiez les symboles cibles dans une matrice dynamique sous un bruit visuel fluctuant"
    },
    "pt": {
      "name": "Teste de Busca em Grade Entrópica (Atenção Seletiva)",
      "tagline": "Identifique símbolos-alvo em uma matriz dinâmica de 100 células sob ruído visual oscilante"
    }
  },
  "/drills/visual/visual-recognition/rhythm-anomaly": {
    "ja": {
      "name": "視覚リズムテスト・アノマリー周期検出トレーニング",
      "tagline": "36マスの点滅パルスから位相のズレた異常リズムをミリ秒で見抜く視覚的時間分解能検査"
    },
    "ko": {
      "name": "시각 리듬 검사・주기 이상 판별 훈련",
      "tagline": "36개 점멸 셀 속에서 위상이 어긋난 이상 리듬을 순간 판별하는 시각 시간 분해능 검사"
    },
    "de": {
      "name": "Visueller Rhythmus Test – Temporale Diskrimination",
      "tagline": "Erkenne Phasenverschiebungen in pulsierenden 36-Zellen-Rastern zur Messung der visuellen Zeitauflösung"
    },
    "es": {
      "name": "Test de Discriminación Temporal (Anomalía de Ritmo Visual)",
      "tagline": "Detecta desfases y ritmos anómalos en pulsos luminosos con alta resolución temporal"
    },
    "fr": {
      "name": "Test de Discrimination Temporelle (Anomalie de Rythme Visuel)",
      "tagline": "Détectez les déphasages et anomalies rythmiques parmi des impulsions lumineuses périodiques"
    },
    "pt": {
      "name": "Teste de Discriminação Temporal (Anomalia de Ritmo Visual)",
      "tagline": "Detecte desfasamentos e anomalias de ritmo em pulsos luminosos com alta resolução temporal"
    }
  },
  "/drills/visual/visual-recognition/visual-search": {
    "ja": {
      "name": "視覚探索テスト・結合特徴走査トレーニング",
      "tagline": "96セルの高密度回転妨害文字の中から標的を瞬時に特定する視覚的注意・特徴結合検査"
    },
    "ko": {
      "name": "시각 탐색 검사・결합 특징 스캐닝 훈련",
      "tagline": "96개 고밀도 회전 방해 문자 속에서 표적을 순간 식별하는 시각 주의력 및 특징 결합 검사"
    },
    "de": {
      "name": "Visuelle Suche Test (Konjunktive Merkmalsintegration)",
      "tagline": "Finde Zielzeichen in dichten 96-Zellen-Matrizen rotierter Störreize zur Messung serieller visueller Suchzeiten"
    },
    "es": {
      "name": "Test de Búsqueda Visual (Integración de Rasgos)",
      "tagline": "Localiza objetivos en matrices densas de distractores rotados para evaluar el rastreo serial"
    },
    "fr": {
      "name": "Test de Recherche Visuelle (Intégration des Traits)",
      "tagline": "Localisez des cibles dans des matrices denses de distracteurs orientés pour mesurer l'exploration sérielle"
    },
    "pt": {
      "name": "Teste de Busca Visual (Integração de Características)",
      "tagline": "Localize alvos em matrizes densas de distratores rotacionados para avaliar o rastreamento serial"
    }
  },
  "/drills/visual-tracking/dynamic-evasion-pursuit": {
    "ja": {
      "name": "標的回避追従トレーニング・動体視力リアクティブエイムテスト",
      "tagline": "急激な回避旋回を繰り返す標的を素早く捕捉し続けるリアクティブ追従眼球運動＆エイムリカバリートレーニング"
    },
    "ko": {
      "name": "회피 표적 추적 훈련・동체시력 리액티브 에임 테스트",
      "tagline": "마우스와 시선을 능동적으로 회피하는 급선회 타깃을 지속적으로 재포착하여 반응형 안구 추종성과 에임 순발력을 극대화"
    },
    "de": {
      "name": "Reaktives Tracking Training – Dynamische Ausweichziel-Verfolgung",
      "tagline": "Verfolge aktiv ausweichende Hochgeschwindigkeitsziele bei abrupten Richtungsbrüchen und schule die reaktive Fovea-Neuzentrierung"
    },
    "es": {
      "name": "Seguimiento Ocular Evasivo",
      "tagline": "Entrenamiento gratuito de tracking reactivo y blancos evasivos: mejora la refijación foveal y sacadas de corrección ante cambios bruscos de dirección."
    },
    "fr": {
      "name": "Poursuite de Cible Évasive",
      "tagline": "Entraînement gratuit de tracking réactif et cibles évasives : développez la refixation fovéale et les saccades correctives sur ruptures de direction."
    },
    "pt": {
      "name": "Rastreamento de Alvo Evasivo",
      "tagline": "Treino gratuito de rastreamento reativo e alvos evasivos: aprimore a refixação foveal imediata e sacadas corretivas em mudanças bruscas de trajetória."
    }
  },
  "/drills/visual-tracking/ghosting-suppress-pursuit": {
    "ja": {
      "name": "残像抑制固視トレーニング・動体視力視線安定性テスト",
      "tagline": "網膜残像や動的ゴースティングを抑制し、移動標的の中心窩ロックと固視安定性を極限まで高めるアイトラッキング練習"
    },
    "ko": {
      "name": "잔상 억제 시선 고정 훈련・동체시력 고정 안정성 테스트",
      "tagline": "망막의 동적 잔상과 모션 블러를 억제하고 이동 표적에 대한 중심와 고정 안정성을 극대화하는 신경 시각 훈련"
    },
    "de": {
      "name": "Fixationsstabilität Sehtraining – Bewegungsunschärfe-Unterdrückung",
      "tagline": "Unterdrücke visuelle Nachbilder und Bewegungsunschärfe für maximale foveale Fixationsschärfe auf dynamische Ziele"
    },
    "es": {
      "name": "Estabilidad de Fijación Ocular",
      "tagline": "Entrenamiento gratuito de fijación foveal y supresión de estelas visuales: mejora la nitidez dinámica y la estabilidad de la mirada frente al movimiento."
    },
    "fr": {
      "name": "Stabilité de Fixation Oculaire",
      "tagline": "Entraînement gratuit de fixation fovéale et suppression des traînées visuelles : améliorez la netteté dynamique et la stabilité du regard en ligne."
    },
    "pt": {
      "name": "Estabilidade de Fixação Ocular",
      "tagline": "Treino gratuito de fixação foveal e supressão de rastros visuais: aprimore a nitidez dinâmica e estabilidade do olhar contra desfoque de movimento."
    }
  },
  "/drills/visual-tracking/infinity-pursuit": {
    "ja": {
      "name": "8の字眼球運動トレーニング・インフィニティ視覚追従テスト",
      "tagline": "ベルヌーイのレムニスケート（8の字無限軌道）に沿って全6外眼筋を連動させ、正中線交差と滑動追従ゲインを鍛えるビジョントレーニング"
    },
    "ko": {
      "name": "8자 안구 운동 훈련・인피니티 시각 추적 테스트",
      "tagline": "베르누이 렘니스케이트(8자 무한 궤적)를 따라 6개 외안근을 복합 연동시키며 정중선 교차와 양안 협응성을 극대화하는 안구 운동"
    },
    "de": {
      "name": "Liegende Acht Augentraining – Achter-Schleifen-Blickübung",
      "tagline": "Stufenlose Blickführung entlang der Bernoullischen Lemniskate (liegende Acht) zur Schulung der interhemisphärischen Mittellinienkreuzung und aller sechs äußeren Augenmuskeln"
    },
    "es": {
      "name": "Ejercicio Ocular del Ocho Tumbado",
      "tagline": "Ejercicio gratuito de seguimiento ocular en ocho tumbado: entrena el cruce de la línea media, coordinación binocular y persecución suave en el navegador."
    },
    "fr": {
      "name": "Exercice Oculaire du Huit Couché",
      "tagline": "Exercice gratuit de poursuite oculaire en huit couché : renforcez le passage de la ligne médiane, la coordination binoculaire et la motricité en ligne."
    },
    "pt": {
      "name": "Exercício Ocular do Oito Deitado",
      "tagline": "Exercício gratuito de rastreamento ocular em oito deitado: aprimore o cruzamento da linha média, coordenação binocular e perseguição lenta no navegador."
    }
  },
  "/drills/visual-tracking/momentum-teleport-pursuit": {
    "ja": {
      "name": "テレポート追従エイムトレーニング・サッケード再捕捉テスト",
      "tagline": "瞬間移動（テレポート）する標的へ瞬時にサッケード跳躍し、速度慣性を引き継いで滑動追従へ移行するハイブリッド動体視力訓練"
    },
    "ko": {
      "name": "순간이동 에임 연습・타겟 재포착 안구 추적 테스트",
      "tagline": "예측 불가능하게 순간이동(텔레포트)하는 표적을 신속한 도약 안구운동으로 재포착하고 관성 속도를 즉각 동기화하는 복합 동체시력 훈련"
    },
    "de": {
      "name": "Sprungziel Tracking Training – Sakkadische Reakquisition",
      "tagline": "Antizipiere plötzliche Positionssprünge (Teleportation) mit blitzschnellen Sakkaden und synchronisiere die Trägheitsgeschwindigkeit in glatte Folgebewegungen"
    },
    "es": {
      "name": "Seguimiento de Blanco Teletransportado",
      "tagline": "Entrena seguimiento visual de blancos con inercia y teletransporte: mejora la reincorporacion sacadica rapida y persecucion suave gratis en el navegador."
    },
    "fr": {
      "name": "Poursuite de Cible Téléportée",
      "tagline": "Testez la poursuite oculaire avec cibles teleportees: entrainez les saccades de reacquisition rapide et le recalibrage dynamique sans aucun telechargement."
    },
    "pt": {
      "name": "Rastreamento de Alvo Teleportado",
      "tagline": "Treine rastreamento visual de alvos teleportados com inercia: desenvolva sacadas rapidas de reaquisição e reconexao de busca suave gratis no navegador."
    }
  },
  "/drills/visual-tracking/peripheral-ping-pursuit": {
    "ja": {
      "name": "周辺視野ピン追従トレーニング・中心視周辺視統合テスト",
      "tagline": "中心標的を中心窩で滑らかに追従しながら、周辺視野に出現するパルスピンを不随意サッケードを起こさずに検知する潜在的空間注意訓練"
    },
    "ko": {
      "name": "주변시 핑 추적 훈련・중심시 주변시 통합 테스트",
      "tagline": "중심 타깃을 시선으로 유지하면서 시야 외곽에 발생하는 순간 펄스를 반사적 시선 이동 없이 감지하는 잠재적 공간 주의력 훈련"
    },
    "de": {
      "name": "Peripheres Sehen Training – Peripherer Ping & Blickfeld-Erweiterung",
      "tagline": "Halte die foveale Fixation auf dem wandernden Zentrum stabil und detektiere periphere Lichtimpulse ohne reflektorische Blicksprünge"
    },
    "es": {
      "name": "Entrenamiento de Visión Periférica",
      "tagline": "Entrena tu vision periferica y estabilidad foveal central: detecta impulsos laterales mientras sigues el blanco continuo. Gratis en el navegador."
    },
    "fr": {
      "name": "Entraînement Vision Périphérique",
      "tagline": "Entrainez votre vision peripherique: reperez les signaux lateraux en maintenant une fixation oculaire centrale stable. Gratuit et sans telechargement."
    },
    "pt": {
      "name": "Treino de Visão Periférica",
      "tagline": "Treine a visao periferica e a estabilidade foveal: detecte estimulos perifericos mantendo o foco central no alvo em movimento. Gratis no navegador."
    }
  },
  "/drills/visual-tracking/predictive-pursuit": {
    "ja": {
      "name": "予測性追従テスト (遮蔽軌道予測トレーニング)",
      "tagline": "障害物でターゲットが遮蔽される間も脳内内部モデルで軌道を先読みして追尾"
    },
    "ko": {
      "name": "예측 안구 추적 훈련 (가림 구간 궤적 예측)",
      "tagline": "장애물에 가려 표적이 보이지 않는 순간에도 뇌의 내부 물리 모델로 궤적을 예측하는 훈련"
    },
    "de": {
      "name": "Predictive Pursuit (Prädiktive Blickführung)",
      "tagline": "Führe die Blickbewegung bei verdeckten Zielbahnen mental und okulomotorisch präzise fort"
    },
    "es": {
      "name": "Seguimiento Ocular Predictivo",
      "tagline": "Entrena seguimiento ocular predictivo y anticipacion de trayectorias ocluidas: mejora la memoria visual motriz y control anticipatorio en el navegador."
    },
    "fr": {
      "name": "Poursuite Oculaire Prédictive",
      "tagline": "Entrainez la poursuite oculaire predictive et la projection de cibles masquees: developpez le controle visuel anticipe sans frais et sans telechargement."
    },
    "pt": {
      "name": "Rastreamento Visual Preditivo",
      "tagline": "Treine rastreamento visual preditivo e antecipacao de trajetorias ocluidas: aprimore a memoria motora ocular e controle feedforward gratis no navegador."
    }
  },
  "/drills/visual-tracking/sine-wave-pursuit": {
    "ja": {
      "name": "サイン波追従テスト (正弦波眼球運動)",
      "tagline": "水平・垂直の正弦波オシレーション（波形運動）に合わせて周期的眼球追従速度を最適化"
    },
    "ko": {
      "name": "사인파 안구 추적 훈련 (정현파 파동 추종)",
      "tagline": "상하좌우 정현파 진동 궤적에 맞춰 안구의 주기적 가속과 감속 반응을 조화롭게 제어"
    },
    "de": {
      "name": "Sine Wave Pursuit (Sinuswellen-Tracking)",
      "tagline": "Periodische sinusförmige Augenfolgebewegungen zur Optimierung harmonischer Oszillationen"
    },
    "es": {
      "name": "Entrenamiento Ocular Sinusoidal",
      "tagline": "Entrena el seguimiento ocular suave a traves de ondas sinusoidales. Optimiza la ganancia de velocidad y elimina el desfase visual gratis."
    },
    "fr": {
      "name": "Entraînement Oculaire Sinusoïdal",
      "tagline": "Suivez des trajectoires sinusoidales harmoniques. Ameliorez le gain de vitesse et eliminez le dephasage sensoriel sans inscription."
    },
    "pt": {
      "name": "Treino de Movimento Ocular Senoidal",
      "tagline": "Exercite o seguimento ocular ao longo de ondas senoidais. Aprimore o ganho de velocidade e elimine a latencia de fase sem cadastro."
    }
  },
  "/drills/visual-tracking/spatial-shift-pursuit": {
    "ja": {
      "name": "空間シフト追従テスト (視野座標系再編訓練)",
      "tagline": "空間座標系が段階的に移動・回転する動的視野の中で目標物を安定して捕捉し続ける訓練"
    },
    "ko": {
      "name": "공간 시프트 안구 추적 훈련 (좌표계 전환 적응)",
      "tagline": "화면의 공간 좌표계가 이동하고 회전하는 상황에서도 목표물의 상대 궤적을 놓치지 않는 훈련"
    },
    "de": {
      "name": "Spatial Shift Pursuit (Räumliche Verschiebung)",
      "tagline": "Optische Verfolgung bei rotierenden und verschobenen räumlichen Koordinatenrastern"
    },
    "es": {
      "name": "Seguimiento con Cambio Espacial",
      "tagline": "Entrena el control oculomotor adaptativo ante desplazamientos del marco de referencia. Optimiza el remapero de coordenadas visuales gratis."
    },
    "fr": {
      "name": "Poursuite avec Saut Spatial",
      "tagline": "Entrainez le controle oculomoteur adaptatif face aux sauts et rotations du repere spatial. Ameliorez le remappage visuel sans inscription."
    },
    "pt": {
      "name": "Rastreamento com Mudança Espacial",
      "tagline": "Treine o controle oculomotor adaptativo sob mudancas bruscas no referencial espacial. Aprimore o remapeamento de coordenadas sem cadastro."
    }
  },
  "/drills/visual-tracking/split-screen-tracking": {
    "ja": {
      "name": "スプリットスクリーン分割追従テスト (複眼追跡)",
      "tagline": "分割された複数画面領域でそれぞれ独立して動くターゲットを同時に監視・追跡"
    },
    "ko": {
      "name": "스플릿 스크린 분할 추적 훈련 (다중 화면 분할)",
      "tagline": "화면이 좌우 또는 상하로 분할된 영역에서 독립적으로 이동하는 표적들을 동시 모니터링"
    },
    "de": {
      "name": "Split-Screen Tracking (Geteilte Bildschirmüberwachung)",
      "tagline": "Simultane optische Überwachung unabhängig wandernder Ziele über geteilte Bildschirmsektoren"
    },
    "es": {
      "name": "Seguimiento en Pantalla Dividida",
      "tagline": "Entrena la atencion visual dividida siguiendo dos objetivos ortogonales en pantalla dividida. Ejercicio ocular bilateral gratis sin registro."
    },
    "fr": {
      "name": "Poursuite sur Écran Scindé",
      "tagline": "Entrainez lattention visuelle divisee en suivant deux cibles orthogonales simultanees sur ecran scinde. Exercice bilateral gratuit et en ligne."
    },
    "pt": {
      "name": "Rastreamento em Tela Dividida",
      "tagline": "Exercite a atencao visual dividida atraves de alvos ortogonais simultaneos em tela dividida. Treino ocular bilateral gratuito sem cadastro."
    }
  },
  "/drills/visual-tracking/staircase-step": {
    "ja": {
      "name": "階段ステップサッケード追従テスト (垂直階段跳躍)",
      "tagline": "段階的に垂直・水平にステップ移動するターゲットに小刻みなサッケードで追従"
    },
    "ko": {
      "name": "계단형 스텝 안구 추적 훈련 (수직 계단 도약)",
      "tagline": "계단식으로 불연속 점프하는 타깃에 맞춰 짧고 정확한 도약 안구운동을 반복하는 훈련"
    },
    "de": {
      "name": "Staircase Step (Treppenstufen-Sakkaden)",
      "tagline": "Präzise gestufte Sakkadenfolgen entlang treppenförmiger horizontaler und vertikaler Pfade"
    },
    "es": {
      "name": "Seguimiento Ocular Vertical",
      "tagline": "Entrena el seguimiento ocular vertical y sacadas de elevacion en trayectorias escalonadas. Estimulacion del mesencefalo gratis sin registro."
    },
    "fr": {
      "name": "Poursuite Oculaire Verticale",
      "tagline": "Conditionnez la poursuite oculaire verticale et les saccades delevation sur trajectoires en marches descalier. Entrainement gratuit en ligne."
    },
    "pt": {
      "name": "Rastreamento Ocular Vertical",
      "tagline": "Condicione o seguimento ocular vertical e sacadas de elevacao ao longo de degraus angulares. Treino oculomotor no mesencefalo gratuito online."
    }
  },
  "/drills/visual-tracking/strobe-prediction-pursuit": {
    "ja": {
      "name": "ストロボ予測遮蔽追従テスト (断続光眼球追従)",
      "tagline": "ストロボ点滅による断続的な視覚情報から欠落フレームを補完して連続追従を完遂"
    },
    "ko": {
      "name": "스트로브 예측 차단 추적 훈련 (간헐 시각 보정)",
      "tagline": "빛이 깜빡이며 단속적으로 끊기는 시각 정보 속에서 결손 구간을 예측 보정하여 추적"
    },
    "de": {
      "name": "Strobe Prediction Pursuit (Stroboskopische Verfolgung)",
      "tagline": "Visuelle Extrapolation unterbrochener Zielbahnen unter stroboskopischen Beleuchtungsintervallen"
    },
    "es": {
      "name": "Visión Estroboscópica y Predicción",
      "tagline": "Entrene la anticipación visual y predicción de trayectoria bajo oclusión estroboscópica. Optimice sus reflejos deportivos con este test oculomotor gratuito."
    },
    "fr": {
      "name": "Vision Stroboscopique et Prédiction",
      "tagline": "Entraînez votre anticipation motrice et la prédiction de trajectoire sous masquage stroboscopique. Test neuro-visuel gratuit pour sportifs et gamers."
    },
    "pt": {
      "name": "Treino de Visão Estroboscópica",
      "tagline": "Condicione a antecipação visual e a predição de trajetória sob oclusão estroboscópica. Melhore seus reflexos no esporte com treino oculomotor gratuito."
    }
  },
  "/drills/visual-tracking/triangular-pursuit": {
    "ja": {
      "name": "トライアングル三角軌道追従テスト (鋭角方向転換)",
      "tagline": "三角形の鋭角な頂点で発生する急減速と急旋回に対して瞬時に追従ベクトルを修正"
    },
    "ko": {
      "name": "트라이앵글 삼각 궤도 추적 훈련 (예각 방향 전환)",
      "tagline": "삼각형의 꼭짓점에서 발생하는 급격한 방향 전환에 즉각적으로 감속 및 재가속 대응"
    },
    "de": {
      "name": "Triangular Pursuit (Dreiecksbahn-Tracking)",
      "tagline": "Meistere spitze Wendewinkel und ruckartige Richtungsänderungen entlang geometrischer Dreiecke"
    },
    "es": {
      "name": "Seguimiento Ocular Triangular",
      "tagline": "Entrene la persecución ocular a lo largo de vectores triangulares y sacadas en ángulos agudos. Ejercicio oculomotor gratuito para puntería y reflejos."
    },
    "fr": {
      "name": "Poursuite Oculaire Triangulaire",
      "tagline": "Entraînez la poursuite visuelle le long de vecteurs triangulaires et les saccades de virage aux sommets. Test oculomoteur gratuit pour sportifs et gamers."
    },
    "pt": {
      "name": "Rastreamento Ocular Triangular",
      "tagline": "Treine o seguimento ocular ao longo de vetores triangulares e sacadas de precisão em vértices agudos. Exercício oculomotor gratuito para mira e esportes."
    }
  },
  "/drills/visual-tracking/zig-zag-path-pursuit": {
    "ja": {
      "name": "ジグザグ経路追従テスト (鋸波エイム安定性)",
      "tagline": "鋭いジグザグのジッター軌道に対して過度のオーバーシュートを起こさず正確に追随"
    },
    "ko": {
      "name": "지그재그 경로 안구 추적 훈련 (지그재그 에임)",
      "tagline": "날카롭게 꺾이는 톱니형 지그재그 궤적을 과도한 오버슈트 없이 매끄럽게 밀착 추적"
    },
    "de": {
      "name": "Zig-Zag Path Pursuit (Zickzack-Präzision)",
      "tagline": "Schnelle Richtungswechsel ohne Überschwingen entlang sägezahnartiger Zickzack-Trajektorien"
    },
    "es": {
      "name": "Seguimiento Ocular en Zigzag",
      "tagline": "Entrene el rastreo ocular rápido en zigzag y suprima el sobrepaso en reversiones agudas. Ejercicio oculomotor gratuito para reflejos y puntería."
    },
    "fr": {
      "name": "Poursuite Visuelle en Zigzag",
      "tagline": "Entraînez la poursuite visuelle rapide en zigzag et supprimez les dépassements de trajectoire. Test oculomoteur gratuit pour sportifs et gamers."
    },
    "pt": {
      "name": "Rastreamento em Zigue-Zague",
      "tagline": "Treine o seguimento ocular rápido em zigue-zague e elimine ultrapassagens em reversões agudas. Exercício oculomotor gratuito para reflexos e pontaria."
    }
  },
  "/drills/cognitive/attention/concentration-stamina": {
    "ko": {
      "name": "집중력 테스트・지속 주의력 검사",
      "tagline": "무료 온라인 집중력 테스트(CPT 지속수행검사)"
    },
    "ja": {
      "name": "集中力テスト・持続的注意測定",
      "tagline": "無料ブラウザ完結の集中力持続テスト（CPT）。長時間の刺激提示に対するビジランス低下、抑制機能、ルール切り替え耐性を精密測定。ADHD傾向の把握や仕事・勉強前の集中ウォームアップに。"
    },
    "de": {
      "name": "Konzentrationstest",
      "tagline": "Kostenloser Online-Konzentrationstest (CPT): Teste Daueraufmerksamkeit, Impulskontrolle und kognitive Ausdauer bei dynamischen Regelwechseln direkt im Browser"
    },
    "es": {
      "name": "Test de Concentración",
      "tagline": "Test de concentración y atención sostenida online gratis: Mide decaimiento de vigilancia, foco visual continuo y control inhibitorio sin registro"
    },
    "fr": {
      "name": "Test de Concentration",
      "tagline": "Test de concentration et d attention soutenue en ligne gratuit: Évaluez le déclin de vigilance, la stabilité attentionnelle et le contrôle inhibiteur"
    },
    "pt": {
      "name": "Teste de Concentração",
      "tagline": "Teste de concentração e atenção sustentada online grátis: Meça declínio de vigilância, foco contínuo e controle inibitório sob pressão temporal"
    }
  },
  "/drills/cognitive/attention/divided-attention": {
    "ko": {
      "name": "주의분할 테스트・이중과제 훈련",
      "tagline": "무료 브라우저 주의분할(이중과제) 테스트 도구"
    },
    "ja": {
      "name": "注意分割テスト・二重課題トレーニング",
      "tagline": "無料ブラウザ完結の注意分割テスト・デュアルタスク訓練ツール。動くターゲットの視覚追従と数字ストリームの偶数判定を同時に処理し、心理的不応期（PRP）と脳の認知ボトルネック処理能力を精密測定。"
    },
    "de": {
      "name": "Geteilte Aufmerksamkeit Test",
      "tagline": "Kostenloser Online-Test für geteilte Aufmerksamkeit (Dual-Task): Verfolge visuelle Ziele und klassifiziere Zahlenreihen zur Messung kognitiver Engpässe"
    },
    "es": {
      "name": "Test de Atención Dividida",
      "tagline": "Test de atención dividida y doble tarea online gratis: Rastrea objetivos visuales móviles y procesa secuencias numéricas simultáneas sin registro previo"
    },
    "fr": {
      "name": "Test d Attention Divisée",
      "tagline": "Test d attention divisée et double tâche en ligne gratuit: Suivez des cibles visuelles en mouvement tout en classant des flux numériques sans inscription"
    },
    "pt": {
      "name": "Teste de Atenção Dividida",
      "tagline": "Teste de atenção dividida e dupla tarefa online grátis: Monitore alvos visuais em movimento e classifique sequências numéricas simultaneamente sem cadastro"
    }
  },
  "/drills/cognitive/attention/multi-tasking": {
    "ko": {
      "name": "멀티태스킹 테스트・이중 표적 추적 훈련",
      "tagline": "무료 멀티태스킹 테스트"
    },
    "ja": {
      "name": "マルチタスクテスト・二重ターゲット追従",
      "tagline": "無料ブラウザ完結のマルチタスクテスト。対向方向に流れる2つの独立した図形ストリームを両視野で同時に監視し、タスク切り替えコストと大脳半球間の協調処理能力を精密測定。"
    },
    "de": {
      "name": "Multitasking Test",
      "tagline": "Kostenloser Online-Multitasking-Test: Verfolge zwei gegenläufige Symbol-Streams gleichzeitig und messe kognitive Belastung und Reaktionszeit im Browser"
    },
    "es": {
      "name": "Test de Multitarea",
      "tagline": "Test de multitarea y flexibilidad cognitiva online: Rastrea dos flujos visuales opuestos en tiempo real y evalua el coste de alternancia mental sin registro"
    },
    "fr": {
      "name": "Test de Multitâche",
      "tagline": "Test de multitache et flexibilite cognitive en ligne gratuit: Suivez deux flux visuels opposes en simultane et evaluez le cout d alternance sans inscription"
    },
    "pt": {
      "name": "Teste de Multitarefa",
      "tagline": "Teste de multitarefa e flexibilidade cognitiva online gratis: Monitore dois fluxos visuais opostos em tempo real e avalie a alternancia mental sob pressao"
    }
  },
  "/drills/cognitive/processing-speed/reaction-time": {
    "ko": {
      "name": "선택 반응시간 테스트・판단 속도 측정",
      "tagline": "무료 브라우저 선택 반응시간(CRT) 측정 도구"
    },
    "ja": {
      "name": "選択反応時間テスト・判断速度測定",
      "tagline": "無料ブラウザ完結の選択反応時間（CRT）測定ツール。動的に反転する色ルールを瞬時に判別して正しい標的をクリックし、意思決定潜時と前頭葉の認知柔軟性をミリ秒単位で精密診断。"
    },
    "de": {
      "name": "Wahlreaktionszeit Test",
      "tagline": "Kostenloser Wahlreaktionszeit-Test (CRT): Miss deine Entscheidungsgeschwindigkeit, visuelle Diskrimination und kognitive Flexibilitat bei Farbwechseln"
    },
    "es": {
      "name": "Test de Tiempo de Reacción de Elección",
      "tagline": "Test de tiempo de reacción de elección online gratis: Mide tu velocidad de toma de decisiones, discriminación visual y flexibilidad cognitiva sin registro"
    },
    "fr": {
      "name": "Test de Temps de Réaction de Choix",
      "tagline": "Test de temps de réaction de choix en ligne gratuit: Mesurez votre vitesse de décision, discrimination visuelle et flexibilité cognitive sans inscription"
    },
    "pt": {
      "name": "Teste de Tempo de Reação de Escolha",
      "tagline": "Teste de tempo de reação de escolha online grátis: Meça sua velocidade de decisão, discriminação visual e flexibilidade cognitiva sob regras dinâmicas"
    }
  },
  "/drills/cognitive/processing-speed/rsvp-reader": {
    "ko": {
      "name": "속독 연습 RSVP・읽기 속도 테스트",
      "tagline": "무료 온라인 RSVP 속독 연습 및 독서 속도 검사"
    },
    "ja": {
      "name": "速読トレーニング・RSVP読書速度測定",
      "tagline": "無料ブラウザ完結のRSVP速読トレーニングツール。視線跳躍（サッカード）を排除し、単語の最適認識点（ORP）へ高速連続表示することで、最大850WPMの超高速テキスト処理と読解速度を精密測定。"
    },
    "de": {
      "name": "Schnelllesetest RSVP",
      "tagline": "Kostenloser RSVP-Schnelllesetest: Trainiere Wortverarbeitung bis 850 WPM ohne Sakkaden durch serielle optische Textprasentation direkt im Browser"
    },
    "es": {
      "name": "Lector RSVP",
      "tagline": "Lector RSVP y test de lectura rápida online gratis: Elimina saltos sacádicos oculares y entrena tu velocidad léxica y comprensión hasta 850 WPM sin registro"
    },
    "fr": {
      "name": "Lecteur RSVP",
      "tagline": "Lecteur RSVP et test de lecture rapide en ligne gratuit: Éliminez les saccades oculaires et entraînez votre vitesse de traitement lexical jusqu à 850 MPM"
    },
    "pt": {
      "name": "Leitor RSVP",
      "tagline": "Leitor RSVP e teste de leitura dinâmica online grátis: Elimine movimentos sacádicos oculares e treine velocidade de leitura e compreensão até 850 WPM"
    }
  },
  "/drills/cognitive/processing-speed/symbol-matching": {
    "ko": {
      "name": "기호 숫자 매칭 인지속도・SDMT 인지 검사",
      "tagline": "무료 온라인 기호 숫자 매칭 인지 검사(SDMT)"
    },
    "ja": {
      "name": "符号テストSDMT・記号数字置換",
      "tagline": "無料ブラウザ完結の符号テスト（Symbol Digit Modalities Test / SDMT）。記号と数字の対応マトリックスを照合して即座に入力し、情報処理速度、視覚スキャン効率、短期連想記憶を精密測定。"
    },
    "de": {
      "name": "Symbol",
      "tagline": "Kostenloser Symbol Digit Modalities Test (SDMT): Teste deine kognitive Verarbeitungsgeschwindigkeit und visuelle Scanning-Effizienz ohne Registrierung"
    },
    "es": {
      "name": "Test SDMT",
      "tagline": "Test SDMT y emparejamiento de símbolos y dígitos online gratis: Evalúa tu velocidad de procesamiento cognitivo, rastreo visual y memoria de trabajo asociativa"
    },
    "fr": {
      "name": "Test SDMT",
      "tagline": "Test SDMT en ligne gratuit: Évaluez votre vitesse de traitement cognitif, votre balayage visuel et votre mémoire associative de travail sans inscription"
    },
    "pt": {
      "name": "Teste SDMT",
      "tagline": "Teste SDMT e substituição de símbolos e dígitos online grátis: Meça velocidade de processamento cognitivo, rastreamento visual e memória associativa"
    }
  },
  "/drills/reaction-speed/barrier-sequence-pursuit": {
    "ko": {
      "name": "지글 피킹 연습",
      "tagline": "무료 온라인 지글 피킹 및 각 홀딩 에임 훈련"
    },
    "ja": {
      "name": "置きエイム練習",
      "tagline": "無料の置きエイム＆ジグルピーク訓練ツール。遮蔽物からの飛び出しに対する反射速度と、ピーク有利を克服するクロスヘアオフセット技術をブラウザで測定・強化。"
    },
    "de": {
      "name": "Jiggle Peek Trainer",
      "tagline": "Kostenloser Jiggle-Peek-Trainer online"
    },
    "es": {
      "name": "Entrenador de Jiggle Peek",
      "tagline": "Entrenador de jiggle peek y ángulos online gratis"
    },
    "fr": {
      "name": "Entraînement Jiggle Peek",
      "tagline": "Entraînement de jiggle peek et ligne défensive gratuit en ligne"
    },
    "pt": {
      "name": "Treino de Jiggle Peek",
      "tagline": "Treino de jiggle peek e mira de espera online grátis"
    }
  },
  "/drills/reaction-speed/fps-tracking-trainer": {
    "ko": {
      "name": "트래킹 에임 연습",
      "tagline": "무료 온라인 트래킹 에임(따라가기 에임) 연습"
    },
    "ja": {
      "name": "トラッキングエイム練習",
      "tagline": "無料のトラッキングエイム（追いエイム）練習ツール。動く標的への滑らかなマウス追従と視線追従を鍛え、エイムのブレやガタつきをブラウザで解消。"
    },
    "de": {
      "name": "FPS Tracking Trainer",
      "tagline": "Kostenloser FPS-Tracking-Trainer online"
    },
    "es": {
      "name": "Tracking FPS",
      "tagline": "Entrenador de tracking FPS online y gratuito"
    },
    "fr": {
      "name": "Entraînement Tracking FPS",
      "tagline": "Entraîneur de tracking FPS gratuit en ligne"
    },
    "pt": {
      "name": "Tracking FPS",
      "tagline": "Treino de tracking FPS online e gratuito"
    }
  },
  "/drills/reaction-speed/market-doors-pursuit": {
    "ko": {
      "name": "각 지우기 연습",
      "tagline": "무료 각 지우기(파이 썰기) 및 코너 체킹 에임 훈련"
    },
    "ja": {
      "name": "クリアリング練習",
      "tagline": "無料のクリアリング＆コーナーチェック訓練ツール。開口部や死角から出現する標的を瞬時に索敵・迎撃する反応速度と視覚走査能力をブラウザで測定・強化。"
    },
    "de": {
      "name": "Ecken Clearen Trainer",
      "tagline": "Kostenloser Corner-Checking-Trainer online"
    },
    "es": {
      "name": "Limpieza de Esquinas",
      "tagline": "Entrenador de limpieza de esquinas y ángulos online gratis"
    },
    "fr": {
      "name": "Prise d Angle FPS",
      "tagline": "Entraînement de prise d angle et nettoyage de coins gratuit en ligne"
    },
    "pt": {
      "name": "Varredura de Cantos",
      "tagline": "Treino de varredura de cantos e limpeza de ângulos online grátis"
    }
  },
  "/drills/reaction-speed/saccadic-gallery": {
    "ko": {
      "name": "단속성 안구운동 훈련",
      "tagline": "무료 온라인 단속성 안구운동 훈련"
    },
    "ja": {
      "name": "サッケードトレーニング",
      "tagline": "無料のサッケード眼球運動トレーニング。ランダム点滅する標的へ瞬時に視線を飛ばし、跳躍性眼球運動の速度と着弾精度をブラウザで測定・強化。"
    },
    "de": {
      "name": "Sakkaden Sehtraining",
      "tagline": "Kostenloses Sakkadentraining online"
    },
    "es": {
      "name": "Ejercicios Sacádicos Online",
      "tagline": "Ejercicios sacádicos online gratis"
    },
    "fr": {
      "name": "Exercices Saccadiques",
      "tagline": "Exercices saccadiques gratuits en ligne"
    },
    "pt": {
      "name": "Exercícios Sacádicos Online",
      "tagline": "Exercícios sacádicos online grátis"
    }
  }
};

export function getLocalizedDrill(href, locale, fallbackName = '', fallbackDescription = '') {
  if (!href) return { name: fallbackName, tagline: fallbackDescription };
  
  // Normalize href (ensure leading slash, strip locale prefix if present)
  let cleanHref = href;
  const match = cleanHref.match(/^\/(?:ko|ja|de|es|fr|pt)(\/.*)$/);
  if (match) {
    cleanHref = match[1];
  }
  if (!cleanHref.startsWith('/')) {
    cleanHref = '/' + cleanHref;
  }

  const drill = DRILL_LOCALIZATIONS[cleanHref];
  if (drill && drill[locale] && drill[locale].name) {
    return {
      name: drill[locale].name,
      tagline: drill[locale].tagline || fallbackDescription,
    };
  }

  return {
    name: fallbackName,
    tagline: fallbackDescription,
  };
}
