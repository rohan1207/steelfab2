/**
 * Forms POST to /api/send-form.
 * For static hosting, set NEXT_PUBLIC_SEND_FORM_URL to your deployed backend API
 * (e.g. cPanel Node app URL).
 */
export function getSendFormEndpoint() {
  const u = process.env.NEXT_PUBLIC_SEND_FORM_URL
  if (u && String(u).trim()) return String(u).trim().replace(/\/$/, '')
  return '/api/send-form'
}
