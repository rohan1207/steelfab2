'use client'

import { useMemo, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Images } from 'lucide-react'
import BentoGrid from '@/components/gallery/BentoGrid'
import { useGallery } from '@/hooks/useGallery'
import { getHomeBentoItems } from '@/lib/galleryData'

export default function ProductGalleryBento() {
  const { items } = useGallery()
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true, margin: '-60px' })
  const previewItems = useMemo(() => getHomeBentoItems(items), [items])

  return (
    <section
      id="gallery"
      className="flex min-h-0 lg:min-h-[100svh] items-center border-t border-slate-200/60 bg-gradient-to-b from-white via-slate-50/80 to-white py-10 sm:py-12 lg:py-14"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 sm:flex-row sm:items-end"
        >
          <div className="max-w-xl">
            <span className="mb-2 inline-flex items-center gap-2 text-[11px] font-600 uppercase tracking-widest text-indigo-600 sm:text-[12px]">
              <Images size={14} />
              Product Gallery
            </span>
            <h2 className="font-display text-[1.55rem] font-700 leading-[1.12] tracking-tight text-navy-900 sm:text-[2.1rem]">
              Engineered Systems, Built in Pune
            </h2>
          </div>
          <Link href="/gallery" className="btn-pill btn-primary shrink-0 self-start text-[13px] sm:self-auto">
            View All Gallery
            <ArrowRight size={15} />
          </Link>
        </motion.div>

        <BentoGrid items={previewItems} />
      </div>
    </section>
  )
}
