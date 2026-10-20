import { itemResponse } from '@/lib/server/public'
import GlobalPresence from '@/lib/server/models/GlobalPresence'
import Client from '@/lib/server/models/Client'

export const dynamic = 'force-dynamic'

export async function GET(request, { params }) {
  const { slug } = await params
  return itemResponse(
    () => GlobalPresence.findOne({ slug, isPublished: true }),
    async (presence) => {
      const clients = await Client.find({
        type: 'export',
        isPublished: true,
        presenceSlug: presence.slug,
      }).sort({ sortOrder: 1, createdAt: -1 })
      return { ...presence.toObject(), clients }
    }
  )
}
