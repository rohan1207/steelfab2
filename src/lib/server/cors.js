// Edge-safe CORS helper (used by src/middleware.js). Same-origin requests need no CORS.
// Cross-origin callers are allowed only if their origin is listed in CLIENT_URL / ADMIN_URL
// (comma-separated values accepted).

function allowedOrigins() {
  return [process.env.CLIENT_URL, process.env.ADMIN_URL]
    .filter(Boolean)
    .flatMap((v) => v.split(','))
    .map((v) => v.trim().replace(/\/$/, ''))
    .filter(Boolean)
}

export function corsHeaders(request) {
  const origin = request.headers.get('origin')
  if (!origin) return {}
  if (!allowedOrigins().includes(origin.replace(/\/$/, ''))) return {}
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  }
}
