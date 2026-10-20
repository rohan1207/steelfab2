import { itemResponse } from '@/lib/server/public'
import Blog from '@/lib/server/models/Blog'

export const dynamic = 'force-dynamic'

export async function GET(request, { params }) {
  const { slug } = await params
  return itemResponse(() => Blog.findOne({ slug, isPublished: true }))
}
