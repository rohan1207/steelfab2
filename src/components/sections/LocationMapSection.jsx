'use client'

import Link from 'next/link'
import { ExternalLink, MapPin } from 'lucide-react'
import GoogleLocationMap from '@/components/ui/GoogleLocationMap'
import { COMPANY_LOCATION } from '@/lib/location'

export default function LocationMapSection() {
  return (
    <section id="location" className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <span className="text-[12px] font-600 uppercase tracking-widest text-indigo-600">Find us</span>
            <h2 className="font-display font-700 text-[1.6rem] sm:text-[2rem] text-navy-900 mt-2">
              Our location
            </h2>
            <p className="mt-2 flex items-start gap-2 text-[13px] sm:text-[14px] text-slate-600 max-w-xl">
              <MapPin size={16} className="text-indigo-600 shrink-0 mt-0.5" />
              {COMPANY_LOCATION.address}
            </p>
          </div>
          <a
            href={COMPANY_LOCATION.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-outline text-[13px] inline-flex items-center gap-2 shrink-0"
          >
            Open in Google Maps
            <ExternalLink size={14} />
          </a>
        </div>
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
          <GoogleLocationMap heightClass="h-[300px] sm:h-[400px] lg:h-[460px]" />
        </div>
        <p className="mt-4 text-center text-[13px] text-slate-500">
          Need directions or a site visit?{' '}
          <Link href="/contact" className="text-indigo-700 font-600 hover:underline">
            Contact us
          </Link>
        </p>
      </div>
    </section>
  )
}
