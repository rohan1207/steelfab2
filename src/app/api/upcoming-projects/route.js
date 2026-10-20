import { listResponse } from '@/lib/server/public'
import UpcomingProject from '@/lib/server/models/UpcomingProject'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  void searchParams
  return listResponse(() => UpcomingProject.find({ isPublished: true }).sort({ sortOrder: 1, createdAt: -1 }))
}