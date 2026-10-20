'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProtectedDocumentModal from '@/components/ui/ProtectedDocumentModal'
import { DOC_FILTERS, STATIC_DOCUMENTS } from '@/lib/staticDocuments'
import { Eye, FileBadge2, Filter, ShieldCheck } from 'lucide-react'

export default function DownloadPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [viewer, setViewer] = useState(null)

  const filtered = useMemo(
    () => (activeFilter === 'All' ? STATIC_DOCUMENTS : STATIC_DOCUMENTS.filter((d) => d.type === activeFilter)),
    [activeFilter]
  )

  return (
    <main>
      <Navbar />
      <div className="pt-nav">
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
            <h1 className="font-display font-700 text-[2rem] sm:text-[2.8rem] text-navy-900 tracking-tight mb-3">
              Documents Center
            </h1>
            <p className="text-slate-600 text-[14px] sm:text-[16px] max-w-3xl">
              Certificates, datasheets, and company policies.
            </p>
          </div>
        </section>

        <section className="bg-slate-50/60 min-h-[60vh]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <div className="flex items-center gap-2 mb-4">
              <Filter size={16} className="text-indigo-600" />
              <span className="text-[12px] font-600 uppercase tracking-[0.12em] text-slate-500">Filter by type</span>
            </div>
            <div className="flex flex-wrap gap-2.5 mb-6">
              {DOC_FILTERS.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3.5 py-2 rounded-full text-[12px] sm:text-[13px] font-600 border transition-all ${
                    activeFilter === filter
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-700'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <p className="text-slate-500 text-sm">No documents in this category.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setViewer(item)}
                    className="text-left rounded-2xl border border-slate-200 bg-white p-5 hover:border-indigo-200 hover:shadow-[0_10px_30px_rgba(67,56,202,0.08)] transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-600 uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full">
                        <FileBadge2 size={12} />
                        {item.type}
                      </span>
                      <span className="text-[11px] text-slate-500 uppercase">{item.format}</span>
                    </div>
                    <h3 className="font-display font-700 text-[16px] text-navy-900 leading-snug mb-4">{item.title}</h3>
                    <span className="btn-pill btn-outline w-full justify-center text-[12.5px] inline-flex">
                      <Eye size={14} />
                      View document
                    </span>
                  </button>
                ))}
              </div>
            )}

            <div className="mt-8 rounded-2xl border border-indigo-200 bg-indigo-50/50 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-2.5">
                <ShieldCheck size={18} className="text-indigo-700 mt-0.5" />
                <p className="text-[13px] sm:text-[14px] text-indigo-900 leading-relaxed">
                  Need a project-specific document pack? Share your requirement and we will send the exact technical set.
                </p>
              </div>
              <Link href="/enquiry" className="btn-pill btn-primary text-[12.5px]">
                Request Document Pack
              </Link>
            </div>
          </div>
        </section>
      </div>

      <ProtectedDocumentModal doc={viewer} onClose={() => setViewer(null)} />
      <Footer />
    </main>
  )
}
