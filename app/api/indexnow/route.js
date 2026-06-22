// app/api/indexnow/route.js
// Notifies Bing, Yandex, Seznam, & Naver instantly when pages are updated

export const dynamic = 'force-dynamic';

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'c8f7a3b2e1d4f5a6b7c8d9e0f1a2b3c4';
const BASE_URL = 'https://skilldrills.online';

// ============================================
// GET - Key verification & status check
// ============================================
export async function GET(request) {
  if (!INDEXNOW_KEY) {
    return new Response('IndexNow key not configured', { status: 500 });
  }

  // Return the key file for verification
  return new Response(INDEXNOW_KEY, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}

// ============================================
// POST - Submit URLs to IndexNow
// ============================================
export async function POST(request) {
  const startTime = Date.now();
  
  try {
    const body = await request.json();
    const { urls, key } = body;

    // Validate API key (key is REQUIRED)
    if (!key || key !== INDEXNOW_KEY) {
      return Response.json({ 
        error: 'Invalid or missing API key',
        message: 'Provide a valid IndexNow key in the request body'
      }, { status: 401 });
    }

    // Validate URLs
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return Response.json({ 
        error: 'URLs array required',
        example: { urls: ['/drills/fps/flick-shot-training', '/drills/cognitive/memory/n-back'] }
      }, { status: 400 });
    }

    // Convert to full URLs
    const fullUrls = urls.map(url => {
      if (url.startsWith('http')) return url;
      return `${BASE_URL}${url.startsWith('/') ? url : '/' + url}`;
    });

    // Deduplicate URLs
    const uniqueUrls = [...new Set(fullUrls)];

    // IndexNow payload
    const payload = {
      host: 'skilldrills.online',
      key: INDEXNOW_KEY,
      keyLocation: `${BASE_URL}/api/indexnow`,
      urlList: uniqueUrls,
    };

    console.log(`📤 IndexNow: Submitting ${uniqueUrls.length} URLs...`);
    console.log(`   URLs: ${uniqueUrls.join(', ')}`);

    // Submit to all engines simultaneously
    const engines = [
      { name: 'Bing', url: 'https://www.bing.com/indexnow' },
      { name: 'Yandex', url: 'https://yandex.com/indexnow' },
      { name: 'Seznam', url: 'https://search.seznam.cz/indexnow' },
      { name: 'Naver', url: 'https://searchadvisor.naver.com/indexnow' },
    ];

    const results = await Promise.allSettled(
      engines.map(async (engine) => {
        try {
          const response = await fetch(engine.url, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'User-Agent': 'SkillDrills-IndexNow/1.0',
            },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(10000), // 10 second timeout
          });
          
          let result;
          try {
            result = await response.json();
          } catch {
            result = { status: 'ok', httpStatus: response.status };
          }

          console.log(`   ✅ ${engine.name}: ${response.status} - Submitted`);
          return { 
            engine: engine.name, 
            url: engine.url,
            status: response.status, 
            success: response.ok,
            result 
          };
        } catch (error) {
          console.log(`   ❌ ${engine.name}: ${error.message}`);
          return { 
            engine: engine.name, 
            url: engine.url,
            error: error.message,
            success: false 
          };
        }
      })
    );

    // Format results
    const formattedResults = results.map(r => {
      if (r.status === 'fulfilled') return r.value;
      return { engine: 'unknown', error: r.reason?.message || 'Unknown error' };
    });

    const successCount = formattedResults.filter(r => r.success).length;
    const failCount = formattedResults.filter(r => !r.success).length;
    const duration = Date.now() - startTime;

    console.log(`📊 IndexNow Complete: ${successCount} success, ${failCount} failed (${duration}ms)`);

    return Response.json({
      success: true,
      submitted: uniqueUrls.length,
      urls: uniqueUrls,
      results: formattedResults,
      summary: {
        total: formattedResults.length,
        successful: successCount,
        failed: failCount,
        durationMs: duration,
      },
      timestamp: new Date().toISOString(),
      message: `${successCount}/${formattedResults.length} search engines notified`,
    });

  } catch (error) {
    console.error('❌ IndexNow Error:', error.message);
    return Response.json({ 
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}