'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

/** Desktop/phone hero photo with fallback. */
export default function HeroBackground({ image, imagePhone, imageFallback, alt }) {
  const [src, setSrc] = useState(image)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)')
    const apply = () => setSrc(mq.matches && imagePhone ? imagePhone : image)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [image, imagePhone])

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority
      className="object-cover object-[center_35%] sm:object-center"
      sizes="100vw"
      onError={(e) => {
        if (imageFallback && e.currentTarget.src !== imageFallback) {
          e.currentTarget.src = imageFallback
        }
      }}
    />
  )
}
