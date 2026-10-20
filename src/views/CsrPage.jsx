'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { fetchCsrEvents } from '@/lib/api'
import { HeartHandshake, Leaf, Users } from 'lucide-react'
import Link from 'next/link'

const staticInitiatives = [
  'Blood donation camps',
  'Disaster relief fund contributions',
  'Educational skill development & internships',
  'Scholarships for rural youth and schools',
  'Food distribution drives',
  'Tree plantation events',
  'Health checkups and sanitization drives',
  'MLWF (Maharashtra Labour Welfare Fund) activities',
  'Support for orphanages and old age homes',
]

export default function CsrPage() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetchCsrEvents().then(setEvents).catch(() => setEvents([]))
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'general_enquiry', sourcePage: '/csr', subject: 'CSR page visit' }),
    }).catch(() => {})
  }, [])

  return (
    <main>
      <Navbar />
      <div className="pt-nav">
        <section className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <span className="inline-flex items-center gap-2 text-[12px] uppercase tracking-widest text-emerald-200 mb-4">
              <HeartHandshake size={14} /> CSR & Employee Welfare
            </span>
            <h1 className="font-display font-700 text-[2rem] sm:text-[3rem] leading-tight mb-4">Building Beyond Business</h1>
            <p className="text-emerald-100 max-w-3xl text-[14px] sm:text-[16px]">Month-by-month CSR calendar and employee welfare programs for 2025–26.</p>
          </div>
        </section>

        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="font-display font-700 text-[1.6rem] text-navy-900 mb-5">Our Initiatives</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {staticInitiatives.map((item) => (
                <div key={item} className="rounded-xl border border-slate-200 bg-slate-50/60 p-3 text-[12px] sm:text-[14px] text-slate-700 flex gap-2">
                  <Leaf size={16} className="text-emerald-600 flex-shrink-0" /> {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-2 mb-5">
              <Users size={18} className="text-indigo-600" />
              <h2 className="font-display font-700 text-[1.6rem] text-navy-900">2025–26 Event Calendar</h2>
            </div>
            {events.length === 0 ? (
              <p className="text-slate-500 text-sm">No calendar events are listed right now. Please check back soon.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map((e) => (
                  <div key={e._id} className="rounded-2xl border bg-white p-5">
                    <div className="text-xs font-600 uppercase text-indigo-600 mb-1">{e.month} {e.year} · {e.category}</div>
                    <h3 className="font-display font-700 text-[16px] text-navy-900 mb-2">{e.title}</h3>
                    <p className="text-[13px] text-slate-600">{e.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
