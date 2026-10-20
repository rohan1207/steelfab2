'use client'

import { useRef, useState } from 'react'
import { CheckCircle2, ImagePlus, Send, X } from 'lucide-react'
import { CUSTOM_SECTORS } from '@/lib/customProducts'

const empty = {
  name: '',
  company: '',
  email: '',
  phone: '',
  description: '',
}

export default function CustomizedProductsSection() {
  const fileRef = useRef(null)
  const [form, setForm] = useState(empty)
  const [sectors, setSectors] = useState([])
  const [photo, setPhoto] = useState(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', text: '' })

  const toggleSector = (id) => {
    setSectors((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  const onPhoto = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 3 * 1024 * 1024) {
      setStatus({ type: 'error', text: 'Photo must be under 3 MB.' })
      return
    }
    setPhoto(file)
    setPreview(URL.createObjectURL(file))
    setStatus({ type: '', text: '' })
  }

  const clearPhoto = () => {
    setPhoto(null)
    if (preview) URL.revokeObjectURL(preview)
    setPreview('')
    if (fileRef.current) fileRef.current.value = ''
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!sectors.length) {
      setStatus({ type: 'error', text: 'Please select at least one sector.' })
      return
    }
    setLoading(true)
    setStatus({ type: '', text: '' })
    try {
      const data = new FormData()
      data.append('name', form.name)
      data.append('company', form.company)
      data.append('email', form.email)
      data.append('phone', form.phone)
      data.append('description', form.description)
      data.append('sectors', sectors.join(','))
      data.append('sourcePage', '/products#custom')
      if (photo) data.append('photo', photo)

      const res = await fetch('/api/custom-enquiry', { method: 'POST', body: data })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error || 'Submit failed')

      setStatus({ type: 'success', text: 'Thank you — your custom product request has been received.' })
      setForm(empty)
      setSectors([])
      clearPhoto()
    } catch (err) {
      setStatus({
        type: 'error',
        text: err.message || 'Unable to submit right now. Please try again or email us.',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="custom" className="bg-slate-50/80 border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-2xl mb-8">
          <span className="text-[12px] font-600 uppercase tracking-widest text-indigo-600">
            Customized products available
          </span>
          <h2 className="font-display font-700 text-[1.7rem] sm:text-[2.1rem] text-navy-900 mt-2">
            Tell us your sector &amp; requirement
          </h2>
          <p className="mt-3 text-slate-600 text-[14px] leading-relaxed">
            Select the industries you serve, describe the application, and optionally upload a reference photo —
            our engineering team will propose a tailored configuration.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7 shadow-[0_10px_28px_rgba(15,23,42,0.06)]"
        >
          <h3 className="font-display font-700 text-[15px] text-navy-900 mb-3">Which sectors?</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {CUSTOM_SECTORS.map((s) => {
              const on = sectors.includes(s.id)
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggleSector(s.id)}
                  className={`rounded-full border px-3.5 py-2 text-[12px] sm:text-[13px] font-600 transition-all ${
                    on
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'
                  }`}
                >
                  {s.label}
                </button>
              )
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
            <input
              required
              placeholder="Full Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-[14px] outline-none focus:border-indigo-400"
            />
            <input
              placeholder="Company Name"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-[14px] outline-none focus:border-indigo-400"
            />
            <input
              required
              type="email"
              placeholder="Email Address *"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-[14px] outline-none focus:border-indigo-400"
            />
            <input
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="rounded-xl border border-slate-300 px-3.5 py-2.5 text-[14px] outline-none focus:border-indigo-400"
            />
          </div>

          <textarea
            required
            rows={5}
            placeholder="Describe your custom requirement (fluid, size, pressure, temperature, site conditions)... *"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-[14px] outline-none focus:border-indigo-400 mb-4"
          />

          <div className="mb-4">
            <p className="text-[13px] font-600 text-navy-900 mb-2">Reference photo (optional)</p>
            <div className="flex flex-wrap items-start gap-4">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-[13px] font-600 text-slate-600 hover:border-indigo-300 hover:text-indigo-700">
                <ImagePlus size={16} />
                Upload photo
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  className="hidden"
                  onChange={onPhoto}
                />
              </label>
              {preview ? (
                <div className="relative">
                  <img src={preview} alt="Upload preview" className="h-24 w-24 rounded-xl object-cover border border-slate-200" />
                  <button
                    type="button"
                    onClick={clearPhoto}
                    className="absolute -right-2 -top-2 rounded-full bg-navy-900 p-1 text-white"
                    aria-label="Remove photo"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : null}
            </div>
            <p className="mt-1.5 text-[12px] text-slate-500">JPG, PNG, WEBP or GIF · max 3 MB</p>
          </div>

          {status.text && (
            <div
              className={`mb-4 rounded-xl px-3.5 py-2.5 text-[13px] ${
                status.type === 'success'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
            >
              {status.type === 'success' && <CheckCircle2 size={14} className="inline mr-1.5" />}
              {status.text}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-pill btn-primary">
            <Send size={14} />
            {loading ? 'Submitting…' : 'Submit custom request'}
          </button>
        </form>
      </div>
    </section>
  )
}
