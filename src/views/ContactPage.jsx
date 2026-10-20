'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { trackLead } from '@/lib/api'
import { Clock3, ExternalLink, Mail, MapPin, PhoneCall, Send } from 'lucide-react'
import GoogleLocationMap from '@/components/ui/GoogleLocationMap'
import { COMPANY_LOCATION } from '@/lib/location'

const departments = [
  {
    name: 'Marketing & Sales',
    phone: '+91 88888 55975',
    emails: ['marketing@steelfabeng.com', 'sales@steelfabeng.com'],
  },
  {
    name: 'Human Resources',
    phone: '+91 88888 55973',
    emails: ['hr@steelfabeng.com'],
  },
  {
    name: 'Purchase & Procurement',
    phone: '+91 88888 91931',
    emails: ['purchase@steelfabeng.com'],
    vendorLink: true,
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')
    try {
      await trackLead({
        type: 'contact',
        sourcePage: '/contact',
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        subject: form.subject,
        message: form.message,
      })
      setStatus('Thank you — we will respond shortly.')
      setForm({ name: '', company: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      setStatus('Unable to send. Please email us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <Navbar />
      <div className="pt-nav bg-slate-50/60 min-h-screen">
        {/* Map hero — stacked on mobile, overlay on lg+ */}
        <section className="bg-navy-950 text-white">
          <div className="lg:hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full py-8 sm:py-10">
              <p className="text-[12px] font-600 uppercase tracking-widest text-indigo-300 mb-3">Our location</p>
              <h1 className="font-display font-700 text-[2rem] sm:text-[2.8rem] tracking-tight mb-3 max-w-xl">
                Contact Us
              </h1>
              <p className="text-indigo-100/95 text-[14px] sm:text-[16px] max-w-lg mb-6">
                Visit our Hadapsar manufacturing plant or reach sales, HR, and procurement directly.
              </p>
              <a
                href={COMPANY_LOCATION.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill btn-primary text-[13px] inline-flex items-center gap-2"
              >
                Open in Google Maps
                <ExternalLink size={14} />
              </a>
            </div>
            <GoogleLocationMap heightClass="h-[280px] sm:h-[360px]" className="opacity-95" />
          </div>
          <div className="relative hidden lg:block overflow-hidden">
            <GoogleLocationMap heightClass="h-[480px]" className="opacity-95" />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/92 via-navy-950/55 to-navy-950/20 pointer-events-none" />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
                <p className="text-[12px] font-600 uppercase tracking-widest text-indigo-300 mb-3">Our location</p>
                <h1 className="font-display font-700 text-[2rem] sm:text-[2.8rem] tracking-tight mb-3 max-w-xl">
                  Contact Us
                </h1>
                <p className="text-indigo-100/95 text-[14px] sm:text-[16px] max-w-lg mb-6">
                  Visit our Hadapsar manufacturing plant or reach sales, HR, and procurement directly.
                </p>
                <a
                  href={COMPANY_LOCATION.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill btn-primary text-[13px] inline-flex items-center gap-2 relative z-10 pointer-events-auto"
                >
                  Open in Google Maps
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-6">
            <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6">
              <div className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-slate-700">
                <MapPin size={16} className="mt-0.5 text-indigo-600 shrink-0" />
                <p>{COMPANY_LOCATION.address}</p>
              </div>
              <div className="flex items-center gap-2.5 mt-3 text-[13px] text-slate-600">
                <Clock3 size={16} className="text-indigo-600" />
                Mon – Sat | 9:30 AM – 6:30 PM
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {departments.map((d) => (
                <div key={d.name} className="rounded-2xl border border-slate-200 bg-white p-5">
                  <h3 className="font-display font-700 text-[15px] text-navy-900 mb-3">{d.name}</h3>
                  <div className="flex items-center gap-2 text-[13px] text-slate-600 mb-2">
                    <PhoneCall size={14} className="text-indigo-600" />
                    <a href={`tel:${d.phone.replace(/\s/g, '')}`} className="hover:text-indigo-700">{d.phone}</a>
                  </div>
                  {d.emails.map((em) => (
                    <div key={em} className="flex items-center gap-2 text-[12px] text-slate-600 mb-1">
                      <Mail size={14} className="text-indigo-600 shrink-0" />
                      <a href={`mailto:${em}`} className="hover:text-indigo-700 break-all">{em}</a>
                    </div>
                  ))}
                  {d.vendorLink && (
                    <Link href="/enquiry?type=vendor" className="inline-block mt-3 text-[12px] font-600 text-indigo-600 hover:underline">
                      Vendor / purchase enquiry →
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <h3 className="font-display font-700 text-[1.2rem] text-navy-900 mb-4">Send a Message</h3>
              <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-[14px] outline-none focus:border-indigo-400" placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <input className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-[14px] outline-none focus:border-indigo-400" placeholder="Company Name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                <input type="email" className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-[14px] outline-none focus:border-indigo-400" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                <input className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-[14px] outline-none focus:border-indigo-400" placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <input className="sm:col-span-2 rounded-xl border border-slate-300 px-3.5 py-2.5 text-[14px] outline-none focus:border-indigo-400" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                <textarea rows={5} className="sm:col-span-2 rounded-xl border border-slate-300 px-3.5 py-2.5 text-[14px] outline-none focus:border-indigo-400" placeholder="Tell us your requirement..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                <div className="sm:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4">
                  <button type="submit" disabled={loading} className="btn-pill btn-primary inline-flex">
                    <Send size={14} />
                    {loading ? 'Sending…' : 'Submit'}
                  </button>
                  {status && <p className="text-sm text-slate-600">{status}</p>}
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
