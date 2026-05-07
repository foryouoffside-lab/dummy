// Notifies Bing & Yandex instantly when pages are updated

const INDEXNOW_KEY = 'c8f7a3b2e1d4f5a6b7c8d9e0f1a2b3c4';
const BASE_URL = 'https://skilldrills.online';

export async function POST(request) {
  try {
    const body = await request.json();
    const { urls } = body;

    if (!urls || !Array.isArray(urls)) {
      return Response.json({ error: 'URLs array required' }, { status: 400 });
    }

    const fullUrls = urls.map(url => `${BASE_URL}${url}`);
    const engines = ['https://www.bing.com/indexnow', 'https://yandex.com/indexnow'];
    const results = [];

    for (const engine of engines) {
      try {
        const response = await fetch(engine, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            host: 'skilldrills.online',
            key: INDEXNOW_KEY,
            keyLocation: `${BASE_URL}/indexnow-key.txt`,
            urlList: fullUrls,
          }),
        });
        const result = await response.json();
        results.push({ engine, status: response.status, result });
      } catch (error) {
        results.push({ engine, error: error.message });
      }
    }

    return Response.json({ submitted: fullUrls, results, timestamp: new Date().toISOString() });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}