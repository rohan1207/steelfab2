'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ClientCard from '@/components/clients/ClientCard'
import CustomerSatisfactionSection from '@/components/sections/CustomerSatisfactionSection'
import { useClients } from '@/hooks/useClients'
import Link from 'next/link'

export default function ClientsPage() {
  const { grouped, segments, loading } = useClients('domestic')
  const [segment, setSegment] = useState('')
  const clients = grouped[segment] || []

  useEffect(() => {
    if (segments.length && !segments.includes(segment)) {
      setSegment(segments[0])
    }
  }, [segments, segment])

  return (
    <main>
      <Navbar />
      <div className="pt-nav">
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
            <h1 className="font-display font-700 text-[2rem] sm:text-[2.8rem] text-navy-900 tracking-tight mb-3">
              Domestic Clients
            </h1>
            <p className="text-slate-600 text-[14px] sm:text-[16px] max-w-3xl">
              Trusted by leading oil & gas, petrochemical and industrial organizations across India.
            </p>
            <Link href="/global" className="inline-block mt-4 text-indigo-600 text-sm font-600 hover:underline">
              View Global Exports →
            </Link>
          </div>
        </section>

        <section className="bg-slate-50/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            {loading ? (
              <p className="text-slate-500 text-center">Loading clients…</p>
            ) : (
              <>
                <div className="flex flex-wrap gap-2.5 mb-6">
                  {segments.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSegment(s)}
                      className={`px-4 py-2 rounded-full text-[12px] font-600 border transition-all ${
                        segment === s ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {clients.map((item) => (
                    <ClientCard key={item.slug} client={item} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        <CustomerSatisfactionSection />
      </div>
      <Footer />
    </main>
  )
}
