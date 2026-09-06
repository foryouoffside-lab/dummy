# Research & Architecture Summary: Peripheral Ping Pursuit (Peripheral Vision Training Drill)

**Date:** 2026-09-05  
**Path:** `/drills/visual-tracking/peripheral-ping-pursuit`  
**Category:** Visual Tracking  
**Status:** In Progress (Drill 7 of 15 in Visual Tracking)

---

## 1. Keyword & Search Demand Analysis

- **Target Query / Anchor:** `peripheral vision training` (Exact match in `lib/drillSeo.js`)
- **Secondary Terms:** `peripheral ping pursuit`, `peripheral awareness exercise`, `wide field vision drill`, `peripheral vision test`, `covert attention drill`, `visual field expansion exercise`
- **Canonical Title:** `Peripheral Ping - Peripheral Vision Training Drill` (50 characters, strictly $\le 60$)
- **Canonical Description:** `Condition peripheral awareness and central gaze stability. Detect transient peripheral targets while maintaining foveal fixation online. Free, no sign-up.` (154 characters, strictly $\le 155$)
- **International Coverage:** Tested across US, GB, CA, AU, DE, FR, ES, BR, JP, KR in `scripts/keywords/out/peripheral-ping-pursuit-global-2026-09-05.csv`.

---

## 2. Neurocognitive Grounding & Peer-Reviewed Sources

All sources verified with persistent DOIs and registered in `lib/drillSources.js`:

1. **Posner (1980)**: *Orienting of attention.* Quarterly Journal of Experimental Psychology, 32(1), 3–25.  
   `https://doi.org/10.1080/00335558008248231`  
   *Core Finding:* The seminal investigation separating covert spatial attention from overt eye movements, demonstrating that visual processing can be strategically directed across peripheral fields while central gaze remains strictly locked.
2. **Eriksen & St. James (1986)**: *Visual attention within and around the field of focal attention: A zoom lens model.* Perception & Psychophysics, 40(4), 225–240.  
   `https://doi.org/10.3758/BF03211502`  
   *Core Finding:* Demonstrates how the functional visual field operates like a dynamic zoom lens, expanding attentional width at the cost of foveal spatial detail or contracting into high-resolution focal gaze.
3. **Wolfe (1994)**: *Guided Search 2.0 A revised model of visual search.* Psychonomic Bulletin & Review, 1(2), 202–238.  
   `https://doi.org/10.3758/BF03200774`  
   *Core Finding:* Details preattentive visual feature processing in extrafoveal regions, showing how transient luminance onset triggers bottom-up attentional salience maps.
4. **Findlay & Walker (1999)**: *A model of saccade generation based on parallel processing and competitive inhibition.* Behavioral and Brain Sciences, 22(4), 661–674.  
   `https://doi.org/10.1017/S0140525X99002150`  
   *Core Finding:* Models the competitive inhibition between tonic foveal fixation neurons and peripheral transient triggers in the superior colliculus.
5. **Leigh & Zee (2015)**: *The Neurology of Eye Movements (5th ed.).* Oxford University Press.  
   `https://doi.org/10.1093/med/9780199969203.001.0001`  
   *Core Finding:* Comprehensive neuro-ophthalmic reference detailing active fixation hold mechanisms, tonically suppressing reflexive saccades to peripheral visual transients.

---

## 3. SEO & Structured Data Architecture

- **Schema Types:**
  1. `BreadcrumbList`: Home > Visual Tracking > Peripheral Ping Pursuit
  2. `WebApplication`: Zero fabricated ratings (`aggregateRating` purged), free browser application, `dateModified: 2026-09-05`, `applicationCategory: SportsApplication`.
  3. `HowTo`: 4-step protocol matching DOM instructions.
  4. `FAQPage`: Exactly 10 questions with single-source 1:1 mapping to `DrillGuide` DOM.
- **Client Overhaul:**
  - Left-aligned sentence-case H1: `Peripheral Ping Pursuit` with subtitle `Peripheral Vision Training Drill`.
  - 2-sentence sourced AEO extractable answer placed directly beneath H1 before canvas.
  - Flush full-width stat cards (`grid grid-cols-4 gap-2 w-full -mb-2`).
  - Purged duplicate client accordions to eliminate duplicate FAQ schema conflicts.
  - 0 anchor drift against `lib/drillSeo.js` for related drills.
