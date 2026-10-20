import { DOMESTIC_CLIENTS, EXPORT_CLIENTS } from '@/lib/clientsData'

export function normalizeClient(c) {
  return {
    name: c.name,
    slug: c.slug,
    image: c.image || undefined,
  }
}

export function groupClientsBySegment(items) {
  return items.reduce((acc, item) => {
    const key = item.segment || 'Other'
    if (!acc[key]) acc[key] = []
    acc[key].push(normalizeClient(item))
    return acc
  }, {})
}

export function getStaticClientsByType(type) {
  const source = type === 'export' ? EXPORT_CLIENTS : DOMESTIC_CLIENTS
  const grouped = {}
  for (const [segment, list] of Object.entries(source)) {
    grouped[segment] = list.map(normalizeClient)
  }
  return grouped
}

export function getSegmentKeys(grouped) {
  return Object.keys(grouped)
}
