// GET /api/donors - returns recent donor wall entries from Cloudflare KV
// Requires KV namespace binding: DONORS

export async function onRequestGet({ env }) {
  try {
    if (!env.DONORS) {
      return new Response(JSON.stringify({ donors: [], error: 'KV not bound' }), {
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
      });
    }

    const list = await env.DONORS.list({ prefix: 'donor:', limit: 100 });
    const donors = [];

    for (const key of list.keys) {
      const val = await env.DONORS.get(key.name, { type: 'json' });
      if (val) donors.push(val);
    }

    // Sort newest first
    donors.sort((a, b) => (b.ts || 0) - (a.ts || 0));

    return new Response(JSON.stringify({ donors: donors.slice(0, 50) }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=30',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ donors: [], error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
