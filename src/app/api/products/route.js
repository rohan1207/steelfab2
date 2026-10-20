import { listResponse } from '@/lib/server/public'
import Product from '@/lib/server/models/Product'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  void searchParams
  return listResponse(() => Product.find({ isPublished: true }).sort({ sortOrder: 1, createdAt: -1 }))
}