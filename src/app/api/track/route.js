import { createLead } from '@/lib/server/public'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  return createLead(request)
}