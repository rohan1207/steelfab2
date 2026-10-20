import { listResponse } from '@/lib/server/public'
import Client from '@/lib/server/models/Client'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const q = { isPublished: true }
  const type = searchParams.get('type')
  if (type) q.type = type
  return listResponse(() => Client.find(q).sort({ sortOrder: 1, createdAt: -1 }))
}