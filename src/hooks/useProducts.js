'use client'

import { useEffect, useState } from 'react'
import { fetchProducts } from '@/lib/api'
import { getStaticProducts, normalizeProduct } from '@/lib/products'

export function useProducts() {
  const [products, setProducts] = useState(getStaticProducts())
  const [fromApi, setFromApi] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data.map(normalizeProduct))
          setFromApi(true)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return { products, loading, fromApi }
}
