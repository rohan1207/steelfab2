'use client'

import { useMemo, useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import BentoGrid from '@/components/gallery/BentoGrid'
import { useGallery } from '@/hooks/useGallery'
import { assignFilledBentoLayouts } from '@/lib/galleryData'
import { Images, Filter } from 'lucide-react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function GalleryPage() {
  const { items, categories, loading } = useGallery()
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = useMemo(() => {
    const base = activeFilter === 'All' ? items : items.filter((i) => i.category === activeFilter)
    return assignFilledBentoLayouts(base)
  }, [items, activeFilter])

  return (
    <main>
      <Navbar />
      <div className="pt-nav">
        <section className="bg-gradient-to-br from-navy-950 via-indigo-950 to-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-22">
            <span className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-indigo-300 font-600 mb-4">
              <Images size={14} />
              Product Gallery
            </span>
            <h1 className="font-display font-700 text-[2rem] sm:text-[3rem] leading-[1.1] tracking-tight mb-4 max-w-3xl">
              Manufacturing &amp; Product Showcase
            </h1>
            <p className="text-indigo-100 text-[14px] sm:text-[16px] max-w-2xl leading-relaxed">
              Browse our fluid handling systems, shop-floor capabilities, and engineered solutions. Click any tile to preview or visit the product page.
            </p>
          </div>
        </section>

        <section className="section-pad bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-5">
              <Filter size={16} className="text-indigo-600" />
              <span className="text-[12px] font-600 uppercase tracking-wider text-slate-500">Filter by category</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActiveFilter(f)}
                  className={`px-3.5 py-2 rounded-full text-[12px] sm:text-[13px] font-600 border transition-all ${
                    activeFilter === f
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {loading ? (
              <p className="text-slate-500 text-center py-12">Loading gallery…</p>
            ) : (
              <BentoGrid items={filtered} enableLightbox />
            )}

            <div className="mt-14 rounded-2xl border border-indigo-200 bg-indigo-50/50 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-700 text-[1.25rem] text-navy-900 mb-1">Need a custom configuration?</h2>
                <p className="text-slate-600 text-[14px]">Share your application and our engineering team will respond with the right solution.</p>
              </div>
              <Link href="/enquiry" className="btn-pill btn-primary shrink-0">
                Request a Quote
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
