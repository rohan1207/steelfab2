'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { productSrc } from '@/lib/productImages'

/**
 * Swaps desktop/phone product photos below 640px.
 * Pass either `id` (catalog key) or explicit `desktop` + `phone` URLs.
 */
export default function ResponsiveProductImage({
  id,
  desktop,
  phone,
  alt = '',
  fill = false,
  className = '',
  sizes = '(max-width: 640px) 100vw, 50vw',
  priority = false,
  ...rest
}) {
  const desk = desktop || (id ? productSrc(id, 'desktop') : '')
  const mob = phone || (id ? productSrc(id, 'phone') : desk)
  const [src, setSrc] = useState(desk)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia('(max-width: 640px)')
    const apply = () => setSrc(mq.matches ? mob : desk)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [desk, mob])

  if (!src) return null

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        priority={priority}
        {...rest}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={rest.width || 1200}
      height={rest.height || 900}
      className={className}
      sizes={sizes}
      priority={priority}
      {...rest}
    />
  )
}
