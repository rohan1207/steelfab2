'use client'

import { use } from 'react'
import ProductDetailPage from '@/views/ProductDetailPage'

export default function Page({ params }) {
  const p = use(params)
  return <ProductDetailPage params={p} />
}
