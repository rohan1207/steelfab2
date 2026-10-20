import { listResponse } from '@/lib/server/public'
import Job from '@/lib/server/models/Job'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  void searchParams
  return listResponse(() => Job.find({ isActive: true }).sort({ sortOrder: 1, createdAt: -1 }))
}