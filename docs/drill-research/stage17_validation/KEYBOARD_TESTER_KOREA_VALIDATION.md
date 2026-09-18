# STAGE 17: Pre-Implementation Validation Dossier — South Korea (`ko-KR`)
**Target Drill:** Keyboard Tester (`/drills/motor/keyboard-tester`)  
**Locale:** South Korea (`ko-KR`) | Geolocation: `gl=kr` | Host Language: `hl=ko`  
**Date:** 2026-09-11  
**Validation Standard:** Stage 17 — Google SERP Deep Audit, 10-Tier Keyword Expansion & Authority Scoring  

---

## 1. The 10-Tier Keyword Expansion Waterfall (Measured Evidence)

*Attribution: Numerical volumes represent Bing-reported exact-match demand; query intent and suggestions validated live via Google Korea (`gl=kr&hl=ko`).*

| Tier | Category | Measured Query | Bing Exact-Match /mo | Google Korea Suggestion Validation (`gl=kr&hl=ko`) | Search Intent & Cultural Nuance |
|---|---|---|:---:|---|---|
| **1** | **Head Terms** | `키보드 테스트`<br>`키보드테스트` | **2,201**<br>*(Compound)* | `키보드 테스트 프로그램`, `키보드 테스트 페이지`, `키보드 테스트기` | Primary head queries for hardware key validation. |
| **2** | **Synonyms** | `키보드 테스트 사이트`<br>`키보드 입력 테스트`<br>`키보드 반응속도 테스트` | **218**<br>**209**<br>**46** | `키보드 검사 사이트`, `키보드 확인 테스트`, `키보드 점검 사이트` | Searchers seeking browser-based verification tools rather than downloadable software. |
| **3** | **Laptop / Mac** | `맥북 키보드 테스트`<br>`노트북 키보드 테스트` | *(Active Modifier)* | `맥북 키보드 테스트 사이트`, `노트북 키보드 불량 테스트` | High domestic interest in MacBook and laptop membrane/scissor switch diagnostics. |
| **4** | **Layout & IME** | `키보드 두벌식`<br>`한글 키보드 테스트` | *(Active Modifier)* | `키보드 두벌식 세벌식 차이` | **Critical Architecture Discovery:** Korean keyboard testing requires understanding the difference between physical ANSI layout and OS Hangul IME composition buffer. |
| **5** | **Problem Tier** | `키보드 두번 눌림`<br>`키보드 안눌림`<br>`키보드 씹힘` | *(Informational)* | `키보드 두번 눌림 해결`, `키보드 안눌림 테스트`, `키보드 안눌림 디시` | Acute user problems: key chatter (typing twice) or non-registering dead keys. |
| **6** | **Community Qs** | `키보드 테스트 사이트 디시`<br>`키보드 테스트 펀키스` | *(Community)* | `키보드 채터링 테스트 디시`, `키보드 테스트 프로그램 디시` | **Key Finding:** Korean mechanical keyboard enthusiasts actively search DC Inside (디시) and Funkeys (펀키스) forums for tool recommendations. |
| **7** | **Gaming / Rollover** | `키보드 동시입력 테스트`<br>`키보드 무한동시입력` | **39**<br>*(Active Modifier)* | `키보드 무한동시입력 테스트`, `독거미 키보드 무한동시입력` | NKRO rollover testing. Heavy correlation with viral budget keyboards like the AULA F75 ("독거미"). |
| **8** | **Mechanical** | `키보드 축 테스트`<br>`자석축 키보드 테스트` | *(Active Modifier)* | `자석축 키보드 테스트` | Switch testing, shifting rapidly toward magnetic/Hall Effect switches. |
| **9** | **Chattering** | `키보드 채터링 테스트`<br>`키보드 더블클릭` | *(Active Modifier)* | `키보드 채터링 테스트 디시`, `키보드 채터링 뜻`, `키보드 더블클릭 해결` | Switch degradation / debounce testing. |
| **10**| **Rapid Trigger** | `래피드 트리거 테스트` | *(Breakout)* | `래피드 트리거 테스트 사이트`, `래피드 트리거 테스트 디시` | Breakout gaming query for magnetic keyboard actuation reset verification. |

---

## 2. Technical Nuance: Physical Layout vs. Hangul IME Input

A critical architectural distinction exists for South Korea:

### Physical Layout vs. Hangul IME
1. **Physical Layout:** Standard Korean keyboards use a 104-key ANSI or 106-key layout. Physical key switch positions match US ANSI 1:1, with the addition of dedicated `한/영` (Hangul/English toggle, `code: "HangulMode"`) and `한자` (Hanja, `code: "Hanja"`) keys.
2. **IME Input Method:** When typing in Korean, the operating system uses an IME (most commonly Du-beol-sik / 두벌식). When a user presses `KeyQ`, the browser receives physical `code: "KeyQ"`, but `key` may return `"ㅂ"` or `"Process"` during composition.
3. **The Incumbent Flaw:** Foreign sites (`key-test.com`, `keyboardtester.com`) listen primarily to `event.key` or only render Roman legends (`Q, W, E, R`). When Korean users have Hangul active, inputs fail to highlight properly, forcing them to switch their OS input language to English US.
4. **SkillDrills Competitive Advantage:**
   * Listen strictly to physical `event.code` (immune to IME composition state).
   * Render **dual-legend keycaps** in the Korean UI: Roman letter + Hangul Jamo (e.g. `Q / ㅂ`, `W / ㅈ`, `E / ㄷ`, `R / ㄱ`).
   * Support explicit physical detection for the `한/영` (HangulMode) and `한자` (HanjaMode) hardware keys.

---

## 3. Google Korea SERP Audit (`gl=kr&hl=ko`)

### Top Ranking Competitors Analyzed:
1. `key-test.com` — Russian/English tool with partial machine translation; English-only keycap legends.
2. `keyboardtester.com` — English-only legacy tool.
3. `keyboardchecker.com` — English-only tool.
4. `uvi.gg/keyboard-tester` — English gaming tool.
5. Community Threads: `quasarzone.com`, `dcinside.com` (Mechanical Keyboard Gallery discussions linking to web tools).

### SERP Features & Landscape:
* **AI Overviews:** Active on definitions (`키보드 채터링 뜻`) and troubleshooting (`키보드 안눌림 해결`).
* **People Also Ask / Related Queries:**
  1. *키보드 고장 확인하는 방법은?* (How to check if a keyboard is broken?)
  2. *키보드 채터링이란 무엇인가요?* (What is key chattering?)
  3. *동시입력이 안 될 때 해결 방법은?* (What to do when multi-key rollover fails?)
  4. *노트북 키보드가 안 눌릴 때 대처법* (How to fix unresponsive laptop keys)

---

## 4. SERP Weakness & Ranking Opportunity Scoring

### Metric Breakdown (Internal Composite Model):
* **Demand Score (7/10):** 2,201 exact-match in Bing (~2,600 cluster); Google Korea Suggest confirms active presence across all 10 query tiers.
* **SERP Weakness Score (7.5/10):** The Korean SERP currently shows limited native-language competition. Foreign tools rank with zero Hangul keycap integration and English-only instructional copy. Ranking probability must be validated through page-level SERP and authority analysis.
* **Intent Fit (10/10):** High utility intent; searchers want an instant, no-download in-browser tester.
* **Localization Advantage (9.5/10):** Dual-legend Hangul keycaps and `한/영` key support provide an immediate native UX advantage over foreign tools.
* **Feature Advantage (8.5/10):** Zero ads, sub-100ms potential, raw event code inspection, live rollover counter, and key chatter detector.

### Calculated Ranking Opportunity Score:
$$\text{Opportunity Score} = 7 \times 7.5 \times 10 \times 9.5 \times 8.5 = \mathbf{42,393 \longrightarrow 8.4 / 10 \text{ (High Opportunity)}}$$

---

## 5. Implementation Blueprint for `/ko/drills/motor/keyboard-tester`

* **Target URL:** `https://skilldrills.online/ko/drills/motor/keyboard-tester`
* **Primary Title Tag:** `키보드 테스트 – 온라인 키보드 검사 및 동시입력 확인 | SkillDrills` (63 chars)
* **Primary H1:** `온라인 키보드 테스트`
* **Core On-Page Features:**
  1. Dual-legend keycaps (English + 두벌식 Hangul Jamo).
  2. Hardware detection for `한/영` (HangulMode) and `한자` (HanjaMode).
  3. Live 무한 동시입력 (NKRO) counter and 키보드 채터링 (key chatter) detector.
* **AEO BLUF Answer Architecture:**
  * H2: *키보드 키가 정상 작동하는지 어떻게 테스트하나요?* (45-word Korean BLUF block).
  * H2: *키보드 동시입력(고스팅)이란 무엇이며 어떻게 확인하나요?* (42-word Korean BLUF block).
  * H2: *키보드 채터링(두 번 눌림) 현상은 어떻게 확인하나요?* (40-word Korean BLUF block).
* **Technical SEO / Hreflang:**
  * Self-referencing canonical: `https://skilldrills.online/ko/drills/motor/keyboard-tester`
  * Reciprocal `hreflang`: `ko`, `pt-BR`, `fr`, `ja`, `en`, `x-default`.
