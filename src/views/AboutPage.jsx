'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AboutClientSections from '@/components/about/AboutClientSections'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  Factory,
  MapPin,
  Phone,
  ShieldCheck,
  Users2,
} from 'lucide-react'

const MOTTO = 'Environment Friendly · Safe · Economical · Fast · Easy · Reliable'

const founders = [
  {
    name: 'Mr. B. D. Petakar',
    role: 'Founder',
    address: 'Ganga Residency, Hadapsar, Pune - 411 028, Maharashtra, India',
    phone: null,
  },
  {
    name: 'Mr. B. U. Hingane',
    role: 'Founder',
    address: '108, Hingane Ali, Hadapsar, Pune - 411 028, Maharashtra, India',
    phone: '+91 98810 70692',
  },
  {
    name: 'Mr. B. B. Chatterjee',
    role: 'Founder',
    address: 'Pune, Maharashtra, India',
    phone: null,
  },
]

const currentManagement = [
  {
    name: 'Ms. Pooja Hingane',
    role: 'BE Petroleum · Director',
    image: '/team/pooja-hingane.png',
  },
  {
    name: 'Mr. Bharat Hingane',
    role: 'Founder & CEO',
    image: '/team/bharat-hingane.png',
  },
  {
    name: 'Mr. Pariksheet Hingane',
    role: 'ME Heat Power · Director',
    image: '/team/pariksheet-hingane.png',
  },
]

const factories = [
  {
    name: 'Factory I',
    address: 'Plot No. 37, Swami Vivekanand Co-op Indl. Estate, Hadapsar, Pune',
    covered: '468',
    open: '1158',
  },
  {
    name: 'Factory II',
    address: 'A-15, MIDC, Jejuri, Dist. Pune',
    covered: '130',
    open: '1970',
  },
]

const qualityPolicyPoints = [
  'We at Steelfab Engineering Pvt. Ltd. are committed to enhance customer satisfaction by manufacturing, supplying and providing service for the products and fulfilling their requirements of quality, timely delivery and competitive price.',
  'We shall be sensitive to the needs of our customers and shall strive to exceed their expectations.',
  'We shall train, motivate and involve our employees to continually improve their effectiveness, and that of our quality management system as well.',
  'We shall ensure all our work processes are carried out in a safe manner without any harm to personnel or property.',
  'We shall maintain ethical business practices and create a mutually beneficial relationship with our business partners.',
]

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-nav">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-indigo-900 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_28%,rgba(129,140,248,0.18)_0%,rgba(129,140,248,0)_44%)]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative">
            <span className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.16em] text-indigo-300 font-600 mb-4">
              <BadgeCheck size={14} />
              About Us
            </span>
            <h1 className="font-display font-700 text-[2rem] sm:text-[3rem] lg:text-[3.4rem] leading-[1.08] tracking-tight max-w-4xl mb-3">
              Welcome to Steelfab Engineering Pvt. Ltd.
            </h1>
            <p className="text-[13px] sm:text-[14px] font-600 uppercase tracking-wider text-indigo-200 mb-2">{MOTTO}</p>
            <p className="text-indigo-100 text-[14px] sm:text-[17px] leading-relaxed max-w-3xl mb-8">
              Fluid transferring and handling solutions — ISO 9001:2015 certified design, manufacture and supply since 1995.
            </p>
            <div className="flex flex-row flex-nowrap items-center gap-2 sm:gap-3">
              <Link href="/enquiry" className="btn-pill btn-primary min-w-0 flex-1 justify-center px-3 text-[12px] sm:flex-none sm:px-7 sm:text-[0.9rem]">
                Contact Us
                <ArrowRight size={15} />
              </Link>
              <Link href="/products" className="btn-pill btn-ghost-white min-w-0 flex-1 justify-center px-3 text-[12px] sm:flex-none sm:px-7 sm:text-[0.9rem]">
                Our Products
              </Link>
            </div>
          </div>
        </section>

        {/* Quick facts */}
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                { label: 'Established', value: '1995' },
                { label: 'Certification', value: 'ISO 9001:2015' },
                { label: 'Registration', value: 'NSIC' },
                { label: 'Head Office', value: 'Pune, MH' },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5 text-center sm:text-left">
                  <div className="text-[11px] uppercase tracking-widest text-slate-500 mb-1">{s.label}</div>
                  <div className="font-numeric font-700 text-[1.1rem] sm:text-[1.35rem] text-navy-900">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company overview */}
        <section className="bg-slate-50/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <h2 className="font-display font-700 text-[1.7rem] sm:text-[2.2rem] text-navy-900 tracking-tight mb-6">
              About SEPL
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-5 text-slate-600 text-[14px] sm:text-[15.5px] leading-relaxed">
                <p>
                  SEPL was established in the year 1995. The company is managed by a team of directors with vast experience
                  and expertise in their respective fields of operation. SEPL is an ISO 9001:2015 certified company for design,
                  manufacture and supply of loading arm systems / unloading arm systems, independent swivel joints, storage tanks,
                  floating suction assemblies, prover tanks, and manufacturer of mechanical seal support systems viz. coolers,
                  pressure vessels, thermosyphons and API Plan 52/53.
                </p>
                <p>
                  SEPL is an NSIC registered company for the above products. SEPL&apos;s quality policy is to enhance customer
                  satisfaction by supplying world-class quality products at the right time and at the right price.
                </p>
                <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-5">
                  <div className="flex items-start gap-3">
                    <Building2 size={20} className="text-indigo-600 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-display font-700 text-[15px] text-navy-900 mb-1">Incorporation</h3>
                      <p className="text-[13.5px] text-slate-700 leading-relaxed">
                        Steelfab Engineering Private Ltd. was formed in the year 1995 vide Certificate of Incorporation
                        No. <strong>11-85768</strong> dated <strong>21.02.1995</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 h-fit">
                <h3 className="font-display font-700 text-[1.1rem] text-navy-900 mb-4">What we manufacture</h3>
                <ul className="space-y-2.5 text-[13px] text-slate-600">
                  {[
                    'Loading Arm',
                    'Floating Suction Assembly',
                    'Independent Swivel Joint',
                    'Mobile Prover/Calibration Tank',
                    'Storage Tank',
                    'Pressure Vessel',
                    'API Plan 23, 72, 76, 74, 32, 21, 41, 52&53B',
                    'Gas Panel',
                    'SS/MS fabrications as per customer requirement',
                    'Mechanical Seal support System',
                    'ATU Skid',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Founders & Current Management */}
        <section className="bg-white border-y border-slate-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="max-w-3xl mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Users2 size={20} className="text-indigo-600" />
                <h2 className="font-display font-700 text-[1.7rem] sm:text-[2.1rem] text-navy-900">Leadership</h2>
              </div>
              <p className="text-slate-600 text-[14px] sm:text-[15px] leading-relaxed">
                Founded by experienced industry leaders, SEPL is guided today by a professional management team.
              </p>
            </div>

            <h3 className="font-display font-700 text-[1.15rem] text-navy-900 mb-4">Our Founders</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-10">
              {founders.map((d) => (
                <div key={d.name} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 sm:p-6 hover:border-indigo-200 transition-colors">
                  <div className="text-[11px] uppercase tracking-wider text-indigo-600 font-600 mb-1">{d.role}</div>
                  <h4 className="font-display font-700 text-[1.1rem] sm:text-[1.2rem] text-navy-900 mb-3">{d.name}</h4>
                  <div className="flex items-start gap-2 text-[13px] text-slate-600 mb-2">
                    <MapPin size={15} className="text-indigo-500 mt-0.5 shrink-0" />
                    <span>{d.address}</span>
                  </div>
                  {d.phone && (
                    <a href={`tel:${d.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 text-[13px] font-600 text-indigo-700 hover:text-indigo-900">
                      <Phone size={14} />
                      {d.phone}
                    </a>
                  )}
                </div>
              ))}
            </div>

            <h3 className="font-display font-700 text-[1.15rem] text-navy-900 mb-4">Current Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              {currentManagement.map((m) => (
                <article key={m.name} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <div className="relative aspect-[4/5] bg-slate-100">
                    <img src={m.image} alt={m.name} className="absolute inset-0 h-full w-full object-cover object-top" />
                  </div>
                  <div className="p-4 sm:p-5 text-center">
                    <h4 className="font-display font-700 text-[1.05rem] text-navy-900">{m.name}</h4>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-indigo-600 font-600">{m.role}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="rounded-2xl border border-indigo-200 bg-indigo-50/40 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-indigo-100 flex items-center justify-center">
                  <Phone size={18} className="text-indigo-600" />
                </div>
                <div>
                  <div className="text-[12px] uppercase tracking-wider text-slate-500 font-600">Marketing</div>
                  <a href="tel:+918888855975" className="font-numeric font-700 text-[1rem] sm:text-[1.1rem] text-navy-900 hover:text-indigo-700">
                    +91 88888 55975
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Factory area */}
        <section className="bg-slate-50/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="flex items-center gap-2 mb-6">
              <Factory size={20} className="text-indigo-600" />
              <h2 className="font-display font-700 text-[1.7rem] sm:text-[2.1rem] text-navy-900">Factory Area</h2>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full min-w-[640px] text-left text-[13px] sm:text-[14px]">
                <thead>
                  <tr className="bg-navy-900 text-white">
                    <th className="px-4 sm:px-6 py-3.5 font-600">Factory Address</th>
                    <th className="px-4 sm:px-6 py-3.5 font-600 whitespace-nowrap">Covered (sq. m)</th>
                    <th className="px-4 sm:px-6 py-3.5 font-600 whitespace-nowrap">Open usable (sq. m)</th>
                  </tr>
                </thead>
                <tbody>
                  {factories.map((f, i) => (
                    <tr key={f.name} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/80'}>
                      <td className="px-4 sm:px-6 py-4 text-slate-700 border-t border-slate-100">
                        <span className="font-600 text-navy-900 block mb-0.5">{f.name}</span>
                        {f.address}
                      </td>
                      <td className="px-4 sm:px-6 py-4 font-numeric font-700 text-navy-900 border-t border-slate-100">{f.covered}</td>
                      <td className="px-4 sm:px-6 py-4 font-numeric font-700 text-navy-900 border-t border-slate-100">{f.open}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[12px] text-slate-500 mt-3">
              Total manufacturing footprint across Hadapsar and Jejuri facilities.
            </p>
          </div>
        </section>

        {/* Quality policy */}
        <section className="bg-white border-y border-slate-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck size={22} className="text-indigo-600" />
              <h2 className="font-display font-700 text-[1.7rem] sm:text-[2.1rem] text-navy-900">Quality Policy</h2>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-indigo-50/30 p-6 sm:p-8">
              <div className="space-y-4">
                {qualityPolicyPoints.map((point, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white text-[11px] font-700 flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-slate-700 text-[14px] sm:text-[15px] leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <AboutClientSections />

        {/* CTA */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
            <div className="rounded-2xl bg-gradient-to-r from-navy-900 to-indigo-900 text-white p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
              <div>
                <h3 className="font-display font-700 text-[1.3rem] sm:text-[1.8rem] mb-2">Partner with SEPL</h3>
                <p className="text-indigo-100 text-[13px] sm:text-[15px] leading-relaxed max-w-2xl">
                  Discuss your fluid handling requirement with our engineering and sales team.
                </p>
              </div>
              <div className="flex w-full flex-row flex-nowrap items-center gap-2 sm:gap-3 lg:w-auto">
                <Link href="/enquiry" className="btn-pill btn-primary min-w-0 flex-1 justify-center px-3 text-[12px] sm:flex-none sm:px-7 sm:text-[0.9rem]">
                  Start an Enquiry
                </Link>
                <Link href="/contact" className="btn-pill btn-ghost-white min-w-0 flex-1 justify-center px-3 text-[12px] sm:flex-none sm:px-7 sm:text-[0.9rem]">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
        
      </div>
      <Footer />
    </main>
  )

}
