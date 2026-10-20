import { itemResponse } from '@/lib/server/public'
import Product from '@/lib/server/models/Product'

export const dynamic = 'force-dynamic'

export async function GET(request, { params }) {
  const { slug } = await params
  return itemResponse(() => Product.findOne({ slug, isPublished: true }))
}
