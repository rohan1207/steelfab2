import { listResponse } from '@/lib/server/public'
import Certification from '@/lib/server/models/Certification'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const q = { isPublished: true }
  const category = searchParams.get('category')
  if (category) q.category = category
  return listResponse(() => Certification.find(q).sort({ sortOrder: 1, createdAt: -1 }))
}