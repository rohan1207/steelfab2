import { listResponse } from '@/lib/server/public'
import CsrEvent from '@/lib/server/models/CsrEvent'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  void searchParams
  return listResponse(() => CsrEvent.find({ isPublished: true }).sort({ year: -1, sortOrder: 1 }))
}