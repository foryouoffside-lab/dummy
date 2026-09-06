# Research & Architecture Summary: Infinity Pursuit (Figure-8 Eye Tracking Exercise)

**Date:** 2026-09-05  
**Path:** `/drills/visual-tracking/infinity-pursuit`  
**Category:** Visual Tracking  
**Status:** In Progress (Drill 5 of 15 in Visual Tracking)

---

## 1. Keyword & Search Demand Analysis

- **Target Query / Anchor:** `figure-8 eye tracking exercise` (Exact match in `lib/drillSeo.js`)
- **Secondary Terms:** `infinity pursuit`, `infinity loop tracking`, `lazy eight eye drill`, `smooth pursuit training`, `figure 8 visual tracking`, `lemniscate eye exercise`
- **Canonical Title:** `Infinity Pursuit - Figure-8 Eye Tracking Exercise` (50 characters, strictly $\le 60$)
- **Canonical Description:** `Condition smooth pursuit eye tracking along a continuous figure-8 Lemniscate loop. Train multi-axial ocular coordination online. Free, no sign-up.` (147 characters, strictly $\le 155$)
- **International Coverage:** Tested across US, GB, CA, AU, DE, FR, ES, BR, JP, KR in `scripts/keywords/out/infinity-pursuit-global-2026-09-05.csv`.

---

## 2. Neurocognitive Grounding & Peer-Reviewed Sources

All sources verified with persistent DOIs and registered in `lib/drillSources.js`:

1. **Barnes (2008)**: *Cognitive processes involved in smooth pursuit eye movements.* Brain and Cognition, 68(3), 309–326.  
   `https://doi.org/10.1016/j.bandc.2008.08.020`  
   *Core Finding:* Examines predictive motor models in smooth pursuit during continuous multi-dimensional periodic trajectories (such as figure-8 and elliptical curves), detailing how the cerebellum constructs feedforward drive to minimize phase lag.
2. **Robinson (1965)**: *The mechanics of human smooth pursuit eye movement.* The Journal of Physiology, 180(3), 569–591.  
   `https://doi.org/10.1113/jphysiol.1965.sp007718`  
   *Core Finding:* Control-systems mechanics of extraocular muscle innervations and dynamic velocity saturation during curved pursuit paths.
3. **Rashbass (1961)**: *The relationship between saccadic and smooth tracking eye movements.* The Journal of Physiology, 159(2), 326–338.  
   `https://doi.org/10.1113/jphysiol.1961.sp006811`  
   *Core Finding:* Foundational evidence establishing the independence of smooth pursuit velocity tracking from catch-up saccadic repositioning.
4. **Krauzlis (2004)**: *Recasting the smooth pursuit eye movement system.* Journal of Neurophysiology, 91(2), 591–603.  
   `https://doi.org/10.1152/jn.00801.2003`  
   *Core Finding:* Details cortical motion processing in area MT/MST and how superior colliculus coordinates continuous foveal lock.
5. **Leigh & Zee (2015)**: *The neurology of eye movements (5th ed.).* Oxford University Press.  
   `https://doi.org/10.1093/med/9780199969203.001.0001`  
   *Core Finding:* Clinical and neuro-ophthalmic analysis of oblique and multi-axial ocular tracking, detailing synergies between rectus and oblique muscle pairs during complex 2D curve tracking.

---

## 3. SEO & Structured Data Architecture

- **Schema Types:**
  1. `BreadcrumbList`: Home > Visual Tracking > Infinity Pursuit
  2. `WebApplication`: Zero fabricated ratings (`aggregateRating` purged), free browser application, `dateModified: 2026-09-05`, `applicationCategory: SportsApplication`.
  3. `HowTo`: 4-step protocol matching DOM instructions.
  4. `FAQPage`: Exactly 10 questions with single-source 1:1 mapping to `DrillGuide` DOM.
- **Client Overhaul:**
  - Left-aligned sentence-case H1: `Infinity Pursuit` with subtitle `Figure-8 Eye Tracking Exercise`.
  - 2-sentence sourced AEO extractable answer placed directly beneath H1 before canvas.
  - Flush full-width stat cards (`grid grid-cols-4 gap-2 w-full -mb-2`).
  - Purged duplicate client accordions to eliminate duplicate FAQ schema conflicts.
  - 0 anchor drift against `lib/drillSeo.js` for related drills.
