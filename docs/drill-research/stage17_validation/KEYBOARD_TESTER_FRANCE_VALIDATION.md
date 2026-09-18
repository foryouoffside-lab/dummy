# STAGE 17: Pre-Implementation Validation Dossier — France (`fr-FR`)
**Target Drill:** Keyboard Tester (`/drills/motor/keyboard-tester`)  
**Locale:** France (`fr-FR`) | Geolocation: `gl=fr` | Host Language: `hl=fr`  
**Date:** 2026-09-11  
**Validation Standard:** Stage 17 — Google SERP Deep Audit, 10-Tier Keyword Expansion & Authority Scoring  

---

## 1. The 10-Tier Keyword Expansion Waterfall (Measured Evidence)

*Attribution: Numerical volumes represent Bing-reported exact-match demand; query intent and suggestions validated live via Google France (`gl=fr&hl=fr`).*

| Tier | Category | Measured Query | Bing Exact-Match /mo | Google France Suggestion Validation (`gl=fr&hl=fr`) | Search Intent & Cultural Nuance |
|---|---|---|:---:|---|---|
| **1** | **Head Terms** | `test clavier`<br>`clavier test` | **1,329**<br>**73** | `test clavier azerty`, `test clavier touche`, `test clavier en ligne azerty` | Primary French queries for hardware key validation. |
| **2** | **AZERTY Specific** | `test clavier azerty`<br>`testeur clavier azerty`<br>`testé clavier azerty` | **707**<br>**102**<br>**38** | `test clavier azerty en ligne`, `testeur de clavier azerty` | **Massive Cultural Requirement:** French users explicitly demand AZERTY layout verification because global tools default to US QWERTY. |
| **3** | **Synonyms** | `testeur de clavier`<br>`tester clavier`<br>`test de clavier` | **52**<br>**22**<br>**11** | `testeur de clavier en ligne`, `testeur de touche clavier` | Explicit tool-seeking searchers. |
| **4** | **Key Diagnostics** | `test touche clavier`<br>`tester touche clavier` | **107**<br>*(Active Modifier)* | `tester les touches de son clavier`, `tester la réactivité de son clavier` | Individual key switch testing and contact inspection. |
| **5** | **Laptop / Portables** | `test clavier pc portable` | *(Active Modifier)* | `tester son clavier pc portable`, `test clavier macbook` | Laptop chiclet switch failure checks (Asus, HP, Dell, Lenovo). |
| **6** | **Problem Tier** | `touche clavier ne marche plus`<br>`touche clavier bloquée` | *(Informational)* | `touche clavier ne fonctionne plus windows 11`, `touche clavier pc portable ne fonctionne plus` | Troubleshooting unresponsive or stuck physical keys. |
| **7** | **Gaming / Anti-Ghosting** | `test anti ghosting clavier`<br>`test rollover clavier` | *(Active Modifier)* | `test anti ghosting clavier gamer`, `test n key rollover azerty` | Gaming keyboard verification for simultaneous key press detection. |
| **8** | **Mechanical Switches**| `test switch clavier`<br>`testeur de switch clavier` | *(Active Modifier)* | `test switch clavier mécanique` | Verifying mechanical key switches and optical/magnetic sensors. |
| **9** | **Chattering / Rebond** | `rebond touche clavier`<br>`double frappe clavier` | *(Informational)* | `touche clavier qui tape deux fois` | Key chattering / switch debounce failure diagnosis. |
| **10**| **Rapid Trigger** | `rapid trigger azerty test` | *(Breakout)* | `rapid trigger test site`, `clavier magnetique azerty` | Magnetic keyboard verification in competitive French esports (CS2, Valorant). |

**Total Measured French Cluster Demand:** **~2,500 exact-match searches/mo**.

---

## 2. Technical Nuance: US QWERTY vs. French AZERTY

The French keyboard layout is fundamentally distinct from the US ANSI standard:

1. **Key Placement:**
   * `A` and `Q` are swapped.
   * `Z` and `W` are swapped.
   * `M` is on the third row (next to `L`), where semicolon sits on ANSI.
2. **Number Row Shifts:**
   * Numbers `1` through `0` require holding `Shift` on French AZERTY.
   * Direct unshifted presses produce accented letters: `&`, `é`, `"`, `'`, `(`, `-`, `è`, `_`, `ç`, `à`.
3. **Dedicated Characters:**
   * `²` at the top left.
   * `ù %` key next to Enter.
   * `AltGr` combinations produce `@`, `€`, `[`, `]`, `{`, `}`, `\`, `|`.
4. **Incumbent Flaw:**
   * US QWERTY tools force French users to think in English physical positions, causing widespread frustration.
5. **SkillDrills Moat:**
   * Native AZERTY physical layout rendering matching French standard hardware.
   * Direct key recognition for all French accented characters and `AltGr` symbols.

---

## 3. Google France SERP Audit (`gl=fr&hl=fr`)

### Top Competitors:
1. `key-test.com` — Foreign site; default QWERTY; forces manual layout change.
2. `keyboard-test.space` — Minimal French translation; ad-heavy.
3. `onlinemictest.com/fr/test-clavier/` — Basic utility; thin technical content.
4. `ratatype.com/fr/learn/test/` — Typing speed test ranking for utility queries due to lack of good native utility competitors.

---

## 4. SERP Weakness & Ranking Opportunity Scoring

* **Demand Score (7.5/10):** ~2,500 exact-match searches/mo across Bing in France; high localized Google Suggest presence.
* **SERP Weakness Score (8.5/10):** Very weak native French competition; top rankers are foreign QWERTY sites with automated translations.
* **Intent Fit (10/10):** Pure diagnostic utility.
* **Localization Advantage (9.5/10):** Full AZERTY layout with accented keycaps and native French technical guides.
* **Feature Advantage (9.0/10):** Zero ads, sub-100ms load time, raw event inspector, live rollover.

$$\text{Opportunity Score} = 7.5 \times 8.5 \times 10 \times 9.5 \times 9.0 = \mathbf{54,506 \longrightarrow 8.9 / 10 \text{ (Extremely High Opportunity)}}$$

---

## 5. Implementation Blueprint for `/fr/drills/motor/keyboard-tester`

* **Target URL:** `https://skilldrills.online/fr/drills/motor/keyboard-tester`
* **Primary Title Tag:** `Test Clavier en Ligne – Vérification des Touches & Anti-Ghosting | SkillDrills` (73 chars)
* **Primary H1:** `Test de Clavier en Ligne`
* **Default Layout:** `azerty` (AZERTY France)
* **Schemas:** `WebApplication` (EUR, fr-FR), `BreadcrumbList`, visible-aligned `FAQPage`.
