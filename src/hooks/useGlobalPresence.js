'use client'

import { useEffect, useState } from 'react'
import { fetchGlobalPresence, fetchGlobalPresenceBySlug } from '@/lib/api'
import { getStaticPresenceDetail, getStaticPresenceList, normalizePresence } from '@/lib/globalPresence'

export function useGlobalPresenceList() {
  const [locations, setLocations] = useState(getStaticPresenceList())
  const [fromApi, setFromApi] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGlobalPresence()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setLocations(data.map(normalizePresence))
          setFromApi(true)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return { locations, loading, fromApi }
}

export function useGlobalPresenceDetail(slug) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    fetchGlobalPresenceBySlug(slug)
      .then((res) => {
        if (res && res.slug) {
          setData({
            ...normalizePresence(res),
            clients: (res.clients || []).map((c) => ({
              name: c.name,
              slug: c.slug,
              image: c.image,
            })),
          })
        } else {
          setData(getStaticPresenceDetail(slug))
        }
      })
      .catch(() => setData(getStaticPresenceDetail(slug)))
      .finally(() => setLoading(false))
  }, [slug])

  return { data, loading }
}
