import { NextResponse } from 'next/server'
import { corsHeaders } from '@/lib/server/cors'

export function middleware(request) {
  const headers = corsHeaders(request)
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers })
  }
  const res = NextResponse.next()
  Object.entries(headers).forEach(([k, v]) => res.headers.set(k, v))
  return res
}

export const config = { matcher: '/api/:path*' }
