'use client'

import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ArrowRight } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <main>
      <Navbar />
      <div className="min-h-screen pt-nav flex flex-col bg-slate-50/60">
        <div className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="text-center max-w-md">
            <div className="font-numeric font-800 text-[8rem] leading-none text-indigo-100 mb-4 select-none">404</div>
            <h1 className="font-display font-700 text-[2rem] text-navy-900 mb-4">Page Not Found</h1>
            <div className="flex gap-3 justify-center">
              <Link href="/" className="btn-pill btn-outline">Go Home</Link>
              <Link href="/enquiry" className="btn-pill btn-primary">Enquiry <ArrowRight size={15} /></Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
