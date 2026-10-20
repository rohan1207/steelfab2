'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function PlaceholderPage({ title, subtitle, breadcrumb }) {
  return (
    <main>
      <Navbar />
      <div className="min-h-screen pt-nav bg-slate-50/60 flex flex-col">
        <div className="bg-gradient-to-br from-navy-950 to-indigo-900 text-white py-20 px-4">
          <div className="max-w-7xl mx-auto">
            {breadcrumb && (
              <div className="text-[12px] text-indigo-400 uppercase tracking-widest mb-4">{breadcrumb}</div>
            )}
            <h1 className="font-display font-700 text-[2rem] sm:text-[3rem] text-white tracking-tight mb-4">
              {title}
            </h1>
            {subtitle && (
              <p className="text-indigo-200 text-[15.5px] max-w-xl">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center py-20 px-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🏗️</span>
            </div>
            <h2 className="font-display font-700 text-[1.4rem] text-navy-900 mb-3">Page Coming Soon</h2>
            <p className="text-slate-500 text-[14.5px] leading-relaxed mb-8">
              This page is under construction. Contact us directly for any information you need.
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/" className="btn-pill btn-outline text-[13.5px]">
                Go Home
              </Link>
              <Link href="/enquiry" className="btn-pill btn-primary text-[13.5px]">
                Enquiry
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
