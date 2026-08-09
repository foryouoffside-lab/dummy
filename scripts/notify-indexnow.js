// scripts/notify-indexnow.js
// Automatically notifies search engines after deployment

const { DRILLS } = require('../lib/drillsRegistry');

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'c8f7a3b2e1d4f5a6b7c8d9e0f1a2b3c4';

const CATEGORY_PAGES = [
  '/',
  '/drills',
  '/drills/cognitive',
  '/drills/fps',
  '/drills/memory',
  '/drills/motor',
  '/drills/physical',
  '/drills/visual',
  '/drills/visual-tracking',
  '/drills/reaction-speed',
];

// Drill URLs are derived from DRILLS (lib/drillsRegistry.js) — the same single
// source of truth used by app/sitemap.js — so a deleted or renamed drill can
// never leave a stale entry here again.
const ALL_URLS = [...CATEGORY_PAGES, ...DRILLS.map((drill) => drill.href)];

async function submitToIndexNow() {
  console.log(`\n🚀 SkillDrills IndexNow - Submitting ${ALL_URLS.length} URLs...\n`);

  const fullUrls = ALL_URLS.map(url => `https://skilldrills.online${url}`);

  // Submit in batches of 100
  const batchSize = 100;
  const batches = [];
  for (let i = 0; i < fullUrls.length; i += batchSize) {
    batches.push(fullUrls.slice(i, i + batchSize));
  }

  const engines = [
    { name: 'Bing', url: 'https://www.bing.com/indexnow' },
    { name: 'Yandex', url: 'https://yandex.com/indexnow' },
    { name: 'Seznam', url: 'https://search.seznam.cz/indexnow' },
  ];

  let totalSuccess = 0;
  let totalFailed = 0;

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`📦 Batch ${i + 1}/${batches.length}: ${batch.length} URLs`);

    const payload = {
      host: 'skilldrills.online',
      key: INDEXNOW_KEY,
      keyLocation: 'https://skilldrills.online/indexnow-key.txt',
      urlList: batch,
    };

    for (const engine of engines) {
      try {
        const response = await fetch(engine.url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(10000),
        });

        if (response.ok) {
          totalSuccess++;
          console.log(`   ✅ ${engine.name}: Submitted successfully`);
        } else {
          totalFailed++;
          const text = await response.text();
          console.log(`   ⚠️ ${engine.name}: HTTP ${response.status} - ${text.substring(0, 100)}`);
        }
      } catch (error) {
        totalFailed++;
        console.log(`   ❌ ${engine.name}: ${error.message}`);
      }
    }

    // Delay between batches
    if (i < batches.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log(`\n============================================`);
  console.log(`📊 IndexNow Summary:`);
  console.log(`   URLs Submitted: ${ALL_URLS.length}`);
  console.log(`   Engine Responses: ${totalSuccess} success, ${totalFailed} failed`);
  console.log(`   Time: ${new Date().toISOString()}`);
  console.log(`============================================\n`);
}

submitToIndexNow();