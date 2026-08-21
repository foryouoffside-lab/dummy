// app/api/indexnow/route.js
// Relays URL-update pings to Bing, Yandex, Seznam and Naver via the IndexNow protocol.
//
// SECURITY NOTE — two different keys are in play here, do not conflate them:
//
//   INDEXNOW_KEY        The *public* protocol key. IndexNow requires it to be
//                       downloadable at https://skilldrills.online/indexnow-key.txt
//                       so the engines can verify we own the host. It is published
//                       by design and is NOT a secret. It must never gate writes.
//
//   INDEXNOW_ADMIN_KEY  The private secret that authorises a POST to this route.
//                       Env-only, no fallback. If it is unset the route refuses
//                       every POST, because this endpoint makes outbound requests
//                       to four third parties under our host identity and an
//                       unauthenticated version of it is an abuse amplifier.
//
// Until 2026-08-21 the POST handler compared the caller's key against INDEXNOW_KEY,
// i.e. against a value published at a public URL and echoed by this route's own GET
// handler. The endpoint was effectively unauthenticated.

export const dynamic = 'force-dynamic';

const PUBLIC_INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'c8f7a3b2e1d4f5a6b7c8d9e0f1a2b3c4';
const ADMIN_KEY = process.env.INDEXNOW_ADMIN_KEY || '';
const BASE_URL = 'https://skilldrills.online';
const KEY_LOCATION = `${BASE_URL}/indexnow-key.txt`;

const MAX_URLS_PER_REQUEST = 100;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

// Best-effort in-process throttle. Serverless instances are not shared, so this
// caps a single warm instance rather than the fleet — it is a speed bump on top
// of the admin key, not the primary control.
const hits = [];

function rateLimited() {
  const now = Date.now();
  while (hits.length && now - hits[0] > RATE_LIMIT_WINDOW_MS) hits.shift();
  if (hits.length >= RATE_LIMIT_MAX) return true;
  hits.push(now);
  return false;
}

// Length-independent comparison so a wrong key cannot be recovered by timing.
function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < len; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

// ============================================
// GET - serve the public protocol key
// ============================================
export async function GET() {
  return new Response(PUBLIC_INDEXNOW_KEY, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
      'X-Robots-Tag': 'noindex',
    },
  });
}

// ============================================
// POST - submit URLs to IndexNow (admin only)
// ============================================
export async function POST(request) {
  const startTime = Date.now();

  if (!ADMIN_KEY) {
    return Response.json(
      { error: 'Endpoint disabled', message: 'INDEXNOW_ADMIN_KEY is not configured' },
      { status: 503 }
    );
  }

  // Bearer header preferred; the legacy body `key` field still works so the
  // existing deploy tooling keeps functioning.
  const authHeader = request.headers.get('authorization') || '';
  const bearer = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { urls, key } = body || {};

  if (!safeEqual(bearer, ADMIN_KEY) && !safeEqual(key || '', ADMIN_KEY)) {
    // Deliberately vague: do not confirm whether the key exists or is merely wrong.
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (rateLimited()) {
    return Response.json(
      { error: 'Rate limited', message: `At most ${RATE_LIMIT_MAX} submissions per hour` },
      { status: 429, headers: { 'Retry-After': '3600' } }
    );
  }

  if (!Array.isArray(urls) || urls.length === 0) {
    return Response.json({
      error: 'URLs array required',
      example: { urls: ['/drills/fps/flick-shot-training'] },
    }, { status: 400 });
  }

  if (urls.length > MAX_URLS_PER_REQUEST) {
    return Response.json({
      error: 'Too many URLs',
      message: `Submit at most ${MAX_URLS_PER_REQUEST} URLs per request`,
    }, { status: 400 });
  }

  if (!urls.every((u) => typeof u === 'string')) {
    return Response.json({ error: 'URLs must be strings' }, { status: 400 });
  }

  // Resolve against our own origin and reject anything that escapes it — this
  // payload is relayed to four search engines under our host identity, so an
  // off-origin URL would be us vouching for someone else's page.
  let fullUrls;
  try {
    fullUrls = urls.map((url) => new URL(url, BASE_URL).toString());
  } catch {
    return Response.json({ error: 'Malformed URL in list' }, { status: 400 });
  }

  const ownOrigin = new URL(BASE_URL).origin;
  const invalidUrl = fullUrls.find((url) => new URL(url).origin !== ownOrigin);
  if (invalidUrl) {
    return Response.json({
      error: 'Invalid URL origin',
      message: `All URLs must belong to ${BASE_URL}`,
      invalidUrl,
    }, { status: 400 });
  }

  const uniqueUrls = [...new Set(fullUrls)];

  const payload = {
    host: new URL(BASE_URL).host,
    key: PUBLIC_INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: uniqueUrls,
  };

  const engines = [
    { name: 'Bing', url: 'https://www.bing.com/indexnow' },
    { name: 'Yandex', url: 'https://yandex.com/indexnow' },
    { name: 'Seznam', url: 'https://search.seznam.cz/indexnow' },
    { name: 'Naver', url: 'https://searchadvisor.naver.com/indexnow' },
  ];

  const results = await Promise.all(
    engines.map(async (engine) => {
      try {
        const response = await fetch(engine.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'SkillDrills-IndexNow/1.0',
          },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(10000),
        });
        return { engine: engine.name, status: response.status, success: response.ok };
      } catch (error) {
        return { engine: engine.name, error: error.message, success: false };
      }
    })
  );

  const successCount = results.filter((r) => r.success).length;

  return Response.json({
    success: true,
    submitted: uniqueUrls.length,
    results,
    summary: {
      total: results.length,
      successful: successCount,
      failed: results.length - successCount,
      durationMs: Date.now() - startTime,
    },
    timestamp: new Date().toISOString(),
  });
}
