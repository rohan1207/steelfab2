'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { CheckCircle2, Send } from 'lucide-react'
import { trackLead } from '@/lib/api'

export default function EnquiryPage() {
  const searchParams = useSearchParams()
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    product: searchParams.get('product') || '',
    quantity: '',
    city: '',
    message: '',
  })

  useEffect(() => {
    const product = searchParams.get('product') || ''
    const job = searchParams.get('job') || ''
    if (product) setForm((f) => ({ ...f, product }))
    if (job) setForm((f) => ({ ...f, message: f.message || `Application for: ${job}` }))
  }, [searchParams])
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', text: '' })

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', text: '' })

    try {
      const productSlug = searchParams.get('slug') || ''
      const inquiryType = searchParams.get('type')
      const job = searchParams.get('job')
      let leadType = 'general_enquiry'
      if (inquiryType === 'vendor') leadType = 'purchase_vendor'
      else if (job) leadType = 'career_application'
      else if (productSlug || form.product) leadType = 'product_inquiry'

      await trackLead({
        type: leadType,
        sourcePage: '/enquiry',
        productSlug,
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        message: `Product: ${form.product}\nQty: ${form.quantity}\nCity: ${form.city}\n\n${form.message}`,
        jobTitle: searchParams.get('job') || '',
      })

      setStatus({ type: 'success', text: 'Thank you! Your enquiry has been submitted successfully.' })
      setForm({
        name: '',
        company: '',
        email: '',
        phone: '',
        product: '',
        quantity: '',
        city: '',
        message: '',
      })
    } catch (err) {
      setStatus({
        type: 'error',
        text: 'Unable to submit right now. Please try again in a moment or contact us directly.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <Navbar />
      <div className="pt-nav bg-slate-50/60 min-h-screen">
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-18">
            <h1 className="font-display font-700 text-[2rem] sm:text-[2.8rem] text-navy-900 tracking-tight mb-3">
              Send an Enquiry
            </h1>
            <p className="text-slate-600 text-[14px] sm:text-[16px] max-w-3xl">
              Share your requirement details and our engineering team will get back with the right product recommendation and quote.
            </p>
          </div>
        </section>

        <section>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-[0_10px_28px_rgba(15,23,42,0.06)]"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Full Name *"
                  required
                  className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-[14px] outline-none focus:border-indigo-400"
                />
                <input
                  name="company"
                  value={form.company}
                  onChange={onChange}
                  placeholder="Company Name"
                  className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-[14px] outline-none focus:border-indigo-400"
                />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="Email Address *"
                  required
                  className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-[14px] outline-none focus:border-indigo-400"
                />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  placeholder="Phone Number *"
                  required
                  className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-[14px] outline-none focus:border-indigo-400"
                />
                <input
                  name="product"
                  value={form.product}
                  onChange={onChange}
                  placeholder="Product of Interest (e.g. Loading Arms)"
                  className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-[14px] outline-none focus:border-indigo-400"
                />
                <input
                  name="quantity"
                  value={form.quantity}
                  onChange={onChange}
                  placeholder="Required Quantity"
                  className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-[14px] outline-none focus:border-indigo-400"
                />
                <input
                  name="city"
                  value={form.city}
                  onChange={onChange}
                  placeholder="City / Location"
                  className="sm:col-span-2 rounded-xl border border-slate-300 px-3.5 py-2.5 text-[14px] outline-none focus:border-indigo-400"
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={5}
                  placeholder="Write your requirement (fluid type, pressure, temperature, operation details)... *"
                  required
                  className="sm:col-span-2 rounded-xl border border-slate-300 px-3.5 py-2.5 text-[14px] outline-none focus:border-indigo-400"
                />
              </div>

              {status.text && (
                <div
                  className={`mt-4 rounded-xl px-3.5 py-2.5 text-[13px] ${
                    status.type === 'success'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  {status.type === 'success' && <CheckCircle2 size={14} className="inline mr-1.5" />}
                  {status.text}
                </div>
              )}

              <button type="submit" disabled={loading} className="btn-pill btn-primary mt-4">
                <Send size={14} />
                {loading ? 'Submitting...' : 'Submit Enquiry'}
              </button>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
