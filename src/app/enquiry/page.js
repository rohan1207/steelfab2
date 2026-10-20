'use client'

import { Suspense } from 'react'
import EnquiryPage from '@/views/EnquiryPage'

export default function Page() {
  return (
    <Suspense fallback={null}>
      <EnquiryPage />
    </Suspense>
  )
}
