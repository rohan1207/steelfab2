'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, X, ZoomIn } from 'lucide-react'
import { GALLERY_ITEMS, BENTO_LAYOUT_CLASS } from '@/lib/galleryData'

function BentoTile({ item, index, onPreview }) {
  const layoutClass = BENTO_LAYOUT_CLASS[item.layout] || BENTO_LAYOUT_CLASS.sm

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative min-h-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-200 ${layoutClass}`}
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/25 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-end p-3 pt-10 sm:p-4 sm:pt-4">
        <span className="mb-0.5 text-[10px] font-600 uppercase tracking-wider text-indigo-300 sm:text-[11px]">
          {item.category}
        </span>
        <h3 className="font-display text-[13px] font-700 leading-snug text-white sm:text-[15px]">
          {item.title}
        </h3>
      </div>

      <div className="absolute right-2.5 top-2.5 flex gap-1.5 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
        {onPreview ? (
          <button
            type="button"
            onClick={() => onPreview(item)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-md hover:bg-white/25"
            aria-label={`Preview ${item.title}`}
          >
            <ZoomIn size={15} />
          </button>
        ) : null}
        <Link
          href={item.href}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white backdrop-blur-md hover:bg-indigo-500/80"
          aria-label={`View ${item.title}`}
        >
          <ArrowUpRight size={15} />
        </Link>
      </div>
    </motion.article>
  )
}

export default function BentoGrid({ items = GALLERY_ITEMS, enableLightbox = false }) {
  const [preview, setPreview] = useState(null)

  return (
    <>
      {/* 4-col filled bento — mobile stacks as 2-col with adjusted spans */}
      <div className="grid auto-rows-[110px] grid-cols-2 gap-3 sm:auto-rows-[140px] sm:gap-3.5 md:auto-rows-[150px] md:grid-cols-4 lg:auto-rows-[160px]">
        {items.map((item, i) => (
          <BentoTile
            key={item.id}
            item={item}
            index={i}
            onPreview={enableLightbox ? setPreview : undefined}
          />
        ))}
      </div>

      {preview ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setPreview(null)}
        >
          <button
            type="button"
            onClick={() => setPreview(null)}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
            aria-label="Close preview"
          >
            <X size={20} />
          </button>
          <div
            className="relative aspect-[4/3] w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={preview.image} alt={preview.title} fill className="object-cover" sizes="90vw" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-950 to-transparent p-5">
              <p className="mb-1 text-xs uppercase tracking-wider text-indigo-300">{preview.category}</p>
              <h3 className="font-display text-xl font-700 text-white">{preview.title}</h3>
              <Link
                href={preview.href}
                className="mt-3 inline-flex items-center gap-1.5 text-sm text-indigo-200 hover:text-white"
              >
                View details <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
