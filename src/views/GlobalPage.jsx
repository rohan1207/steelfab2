'use client'

import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WorldPresenceMap from '@/components/global/WorldPresenceMap'
import { useGlobalPresenceList } from '@/hooks/useGlobalPresence'
import { Globe2, MapPin, ArrowRight } from 'lucide-react'

export default function GlobalPage() {
  const { locations, loading } = useGlobalPresenceList()

  return (
    <main>
      <Navbar />
      <div className="pt-nav">
        <section className="bg-gradient-to-br from-indigo-950 via-navy-950 to-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
            <span className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-indigo-300 font-600 mb-4">
              <Globe2 size={14} />
              Global Presence
            </span>
            <h1 className="font-display font-700 text-[1.75rem] sm:text-[2.75rem] lg:text-[3rem] leading-[1.1] tracking-tight mb-4 max-w-3xl">
              International Footprint Across Middle East, Africa &amp; Beyond
            </h1>
            <p className="text-indigo-100 text-[14px] sm:text-[16px] max-w-2xl leading-relaxed">
              Explore markets where Steelfab supplies loading arms, prover tanks, swivel joints, and engineered fluid handling systems.
            </p>
            <Link
              href="/clients"
              className="inline-flex items-center gap-2 mt-5 text-indigo-300 text-sm font-600 hover:text-white transition-colors"
            >
              View all domestic clients <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        <section className="bg-slate-50/80 -mt-6 sm:-mt-10 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {loading ? (
              <p className="text-slate-500 text-center py-16">Loading global map…</p>
            ) : (
              <>
                <WorldPresenceMap locations={locations} />

                <div className="mt-8 sm:mt-10">
                  <h2 className="font-display font-700 text-[1.15rem] sm:text-[1.35rem] text-navy-900 mb-3 flex items-center gap-2">
                    <MapPin size={18} className="text-indigo-600" />
                    All markets
                  </h2>
                  <p className="text-slate-500 text-[13px] sm:text-[14px] mb-4 sm:hidden">
                    Tap a country to view clients and project highlights.
                  </p>
                  <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3 xl:grid-cols-4">
                    {locations.map((loc) => (
                      <Link
                        key={loc.slug}
                        href={`/global/${loc.slug}`}
                        className="flex items-center justify-between gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-2.5 hover:border-indigo-300 hover:shadow-md transition-all group sm:gap-2 sm:px-4 sm:py-3.5"
                      >
                        <div className="min-w-0">
                          <p className="font-600 text-[12px] text-navy-900 truncate group-hover:text-indigo-700 sm:text-[14px]">
                            {loc.title}
                          </p>
                          <p className="text-[10px] text-slate-500 truncate sm:text-[11px]">{loc.clientSegment}</p>
                        </div>
                        <ArrowRight size={12} className="text-indigo-500 shrink-0 opacity-60 group-hover:opacity-100 sm:w-[14px] sm:h-[14px]" />
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
