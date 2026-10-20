'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ClientCard from '@/components/clients/ClientCard'
import { useGlobalPresenceDetail } from '@/hooks/useGlobalPresence'
import { ArrowLeft, Globe2, Briefcase, Users, Sparkles } from 'lucide-react'

export default function GlobalPresenceDetailPage() {
  const { slug } = useParams()
  const { data, loading } = useGlobalPresenceDetail(slug)

  return (
    <main>
      <Navbar />
      <div className="pt-nav bg-white min-h-screen">
        {loading ? (
          <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-500">Loading…</div>
        ) : !data ? (
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <p className="text-slate-600 mb-4">Location not found.</p>
            <Link href="/global" className="btn-pill btn-outline">Back to global map</Link>
          </div>
        ) : (
          <>
            <section className="bg-gradient-to-br from-indigo-950 via-navy-950 to-slate-900 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
                <Link
                  href="/global"
                  className="inline-flex items-center gap-2 text-[13px] font-600 text-indigo-300 hover:text-white mb-6"
                >
                  <ArrowLeft size={16} /> Global map
                </Link>
                <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest text-indigo-300 font-600 mb-3">
                  <Globe2 size={13} />
                  {data.clientSegment}
                </span>
                <h1 className="font-display font-700 text-[1.75rem] sm:text-[2.75rem] leading-tight tracking-tight mb-2">
                  {data.title}
                </h1>
                {data.subtitle && (
                  <p className="text-indigo-200 text-[14px] sm:text-[16px] mb-4">{data.subtitle}</p>
                )}
                {data.summary && (
                  <p className="text-indigo-100 text-[14px] sm:text-[15px] max-w-3xl leading-relaxed">{data.summary}</p>
                )}
              </div>
            </section>

            {data.highlights?.length > 0 && (
              <section className="border-b border-slate-200 bg-slate-50/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                  <h2 className="font-display font-700 text-[1.2rem] sm:text-[1.4rem] text-navy-900 mb-4 flex items-center gap-2">
                    <Sparkles size={18} className="text-indigo-600" />
                    Market highlights
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {data.highlights.map((h) => (
                      <li
                        key={h}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-[13px] sm:text-[14px] text-slate-700"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {data.projects?.length > 0 && (
              <section className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                  <h2 className="font-display font-700 text-[1.2rem] sm:text-[1.4rem] text-navy-900 mb-4 flex items-center gap-2">
                    <Briefcase size={18} className="text-indigo-600" />
                    Projects &amp; supply
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.projects.map((p) => (
                      <article key={p.title} className="rounded-2xl border border-slate-200 p-4 sm:p-5 hover:border-indigo-200 transition-colors">
                        <span className="text-[10px] font-600 uppercase tracking-wider text-indigo-600">{p.status}</span>
                        <h3 className="font-600 text-navy-900 mt-1 mb-2">{p.title}</h3>
                        {p.summary && <p className="text-slate-600 text-[13px] leading-relaxed">{p.summary}</p>}
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            )}

            <section className="bg-slate-50/60">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <h2 className="font-display font-700 text-[1.2rem] sm:text-[1.4rem] text-navy-900 mb-2 flex items-center gap-2">
                  <Users size={18} className="text-indigo-600" />
                  Clients in {data.title}
                </h2>
                <p className="text-slate-500 text-[13px] sm:text-[14px] mb-6">
                  Export partners and buyers we serve in this market.
                </p>
                {data.clients?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {data.clients.map((c) => (
                      <ClientCard key={c.slug} client={c} />
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-sm">Client list for this market is being updated.</p>
                )}
              </div>
            </section>

            <section className="bg-white border-t border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/enquiry" className="btn-pill btn-primary justify-center">
                  Request export quote
                </Link>
                <Link href="/global" className="btn-pill btn-outline justify-center">
                  Explore other markets
                </Link>
              </div>
            </section>
          </>
        )}
      </div>
      <Footer />
    </main>
  )
}
