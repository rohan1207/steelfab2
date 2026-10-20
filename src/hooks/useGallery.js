'use client'

import { useEffect, useState } from 'react'
import { fetchGallery } from '@/lib/api'
import { getGalleryCategories, getStaticGalleryItems, normalizeGalleryItem } from '@/lib/gallery'

export function useGallery() {
  const [items, setItems] = useState(getStaticGalleryItems())
  const [categories, setCategories] = useState(getGalleryCategories(getStaticGalleryItems()))
  const [fromApi, setFromApi] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGallery()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const normalized = data.map(normalizeGalleryItem)
          setItems(normalized)
          setCategories(getGalleryCategories(normalized))
          setFromApi(true)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return { items, categories, loading, fromApi }
}
