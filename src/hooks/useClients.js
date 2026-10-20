'use client'

import { useEffect, useState } from 'react'
import { fetchClients } from '@/lib/api'
import { getSegmentKeys, getStaticClientsByType, groupClientsBySegment } from '@/lib/clients'

/** @param {'domestic' | 'export'} type */
export function useClients(type) {
  const staticGrouped = getStaticClientsByType(type)
  const [grouped, setGrouped] = useState(staticGrouped)
  const [segments, setSegments] = useState(getSegmentKeys(staticGrouped))
  const [fromApi, setFromApi] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchClients(type)
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const g = groupClientsBySegment(data)
          setGrouped(g)
          setSegments(getSegmentKeys(g))
          setFromApi(true)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [type])

  return { grouped, segments, loading, fromApi }
}
