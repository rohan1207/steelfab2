import { listResponse } from '@/lib/server/public'
import GalleryItem from '@/lib/server/models/GalleryItem'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  void searchParams
  return listResponse(() => GalleryItem.find({ isPublished: true }).sort({ sortOrder: 1, createdAt: -1 }))
}