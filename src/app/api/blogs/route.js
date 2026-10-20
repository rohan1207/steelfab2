import { listResponse } from '@/lib/server/public'
import Blog from '@/lib/server/models/Blog'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  void searchParams
  return listResponse(() =>
    Blog.find({ isPublished: true })
      .select('title slug excerpt coverImageUrl author tags publishedAt createdAt')
      .sort({ publishedAt: -1, createdAt: -1 })
  )
}