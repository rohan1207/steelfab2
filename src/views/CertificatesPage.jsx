'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { fetchCertifications } from '@/lib/api'
import ProtectedMedia from '@/components/ui/ProtectedMedia'
import { Award, X, ZoomIn } from 'lucide-react'

const FILTERS = ['All', 'Company Certificate', 'Vendor Certificate', 'Quality & Compliance', 'Other']

export default function CertificatesPage() {
  const pathname = usePathname()
  const isVendorRoute = (pathname || '').includes('vendor-certificate')

  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState(isVendorRoute ? 'Vendor Certificate' : 'All')
  const [lightbox, setLightbox] = useState(null)

  useEffect(() => {
    fetchCertifications()
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (isVendorRoute) setFilter('Vendor Certificate')
  }, [isVendorRoute])

  const filtered = useMemo(() => {
    if (filter === 'All') return items
    return items.filter((i) => i.category === filter)
  }, [items, filter])

  const pageTitle = isVendorRoute ? 'Certificate of Vendor' : 'Certificates & Accreditations'
  const pageDesc = isVendorRoute
    ? 'Vendor approval and pre-qualification certificates from our oil, gas, and industrial clients.'
    : 'ISO certifications, quality accreditations, and compliance documents that underpin our manufacturing and supply operations.'

  return (
    <main>
      <Navbar />
      <div className="pt-nav">
        <section className="bg-gradient-to-br from-navy-950 via-indigo-950 to-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <span className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-indigo-300 font-600 mb-4">
              <Award size={14} />
              Quality &amp; Compliance
            </span>
            <h1 className="font-display font-700 text-[2rem] sm:text-[3rem] leading-[1.1] tracking-tight mb-4 max-w-3xl">
              {pageTitle}
            </h1>
            <p className="text-indigo-100 text-[14px] sm:text-[16px] max-w-2xl leading-relaxed">{pageDesc}</p>
          </div>
        </section>

        <section className="bg-slate-50/60 min-h-[50vh]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            {!isVendorRoute && (
              <div className="flex flex-wrap gap-2 mb-8">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-full text-[12px] font-600 border transition-all ${
                      filter === f
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'
                    }`}
                  >
                    {f === 'All' ? 'All' : f.replace(' Certificate', '').replace('Quality & Compliance', 'Quality')}
                  </button>
                ))}
              </div>
            )}

            {loading ? (
              <p className="text-slate-500 text-center">Loading certificates…</p>
            ) : filtered.length === 0 ? (
              <p className="text-slate-500 text-center">No certificates published in this category yet.</p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filtered.map((cert) => (
                  <article
                    key={cert._id}
                    className="rounded-2xl border border-slate-200 bg-white overflow-hidden hover:border-indigo-200 hover:shadow-[0_12px_40px_rgba(67,56,202,0.08)] transition-all"
                  >
                    <div className="p-5 sm:p-6 border-b border-slate-100">
                      <span className="text-[10px] font-600 uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                        {cert.category}
                      </span>
                      <h2 className="font-display font-700 text-[1.15rem] sm:text-[1.35rem] text-navy-900 mt-3 leading-snug">
                        {cert.title}
                      </h2>
                      {cert.description && (
                        <p className="text-slate-600 text-[13px] sm:text-[14px] leading-relaxed mt-2">{cert.description}</p>
                      )}
                    </div>

                    {(cert.images || []).length > 0 && (
                      <div
                        className={`p-4 sm:p-5 grid gap-3 ${
                          cert.images.length === 1 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
                        }`}
                      >
                        {cert.images.map((img, idx) => (
                          <button
                            key={`${cert._id}-${idx}`}
                            type="button"
                            onClick={() => setLightbox({ src: img.url, caption: img.caption || cert.title })}
                            className="group relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 aspect-[4/3] text-left focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          >
                            <ProtectedMedia
                              src={img.url}
                              alt={img.caption || cert.title}
                              className="w-full h-full p-2 group-hover:scale-[1.02] transition-transform duration-300"
                            />
                            <span className="absolute inset-0 z-[2] bg-navy-950/0 group-hover:bg-navy-950/20 transition-colors flex items-center justify-center pointer-events-none">
                              <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow" size={28} />
                            </span>
                            {img.caption && (
                              <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-950/80 to-transparent text-white text-[11px] px-3 py-2 line-clamp-1">
                                {img.caption}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[200] bg-navy-950/90 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox(null)}
          onContextMenu={(e) => e.preventDefault()}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Close"
          >
            <X size={22} />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <ProtectedMedia
              src={lightbox.src}
              alt={lightbox.caption || ''}
              className="w-full max-h-[80vh] rounded-lg"
            />
            {lightbox.caption && (
              <p className="text-center text-indigo-100 text-sm mt-3">{lightbox.caption}</p>
            )}
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
