import { EXPORT_CLIENTS } from '@/lib/clientsData'
import { STATIC_GLOBAL_PRESENCE, STATIC_PRESENCE_CLIENT_SLUGS } from '@/lib/globalPresenceData'
import { normalizeClient } from '@/lib/clients'

export function lngLatToPercent([lng, lat]) {
  const x = ((Number(lng) + 180) / 360) * 100
  const y = ((90 - Number(lat)) / 180) * 100
  return { left: `${x}%`, top: `${y}%` }
}

export function normalizePresence(p) {
  return {
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle || '',
    type: p.type || 'country',
    clientSegment: p.clientSegment,
    countryCode: p.countryCode || '',
    coordinates: p.coordinates,
    summary: p.summary || '',
    description: p.description || '',
    highlights: p.highlights || [],
    projects: p.projects || [],
    image: p.image || '',
    sortOrder: p.sortOrder ?? 0,
  }
}

export function getStaticPresenceList() {
  return STATIC_GLOBAL_PRESENCE.map(normalizePresence)
}

export function getStaticPresenceDetail(slug) {
  const presence = STATIC_GLOBAL_PRESENCE.find((p) => p.slug === slug)
  if (!presence) return null
  const slugs = STATIC_PRESENCE_CLIENT_SLUGS[slug] || []
  const allExport = Object.values(EXPORT_CLIENTS).flat()
  const clients = allExport
    .filter((c) => slugs.includes(c.slug))
    .map(normalizeClient)
  return { ...normalizePresence(presence), clients }
}
