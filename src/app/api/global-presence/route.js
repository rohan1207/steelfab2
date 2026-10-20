import { listResponse } from '@/lib/server/public'
import GlobalPresence from '@/lib/server/models/GlobalPresence'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  void searchParams
  return listResponse(() =>
    GlobalPresence.find({ isPublished: true })
      .select('slug title subtitle type clientSegment countryCode coordinates summary sortOrder')
      .sort({ sortOrder: 1, createdAt: -1 })
  )
}