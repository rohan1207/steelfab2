'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Award,
  CheckCircle2,
  ClipboardCheck,
  Factory,
  HeartHandshake,
  Milestone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { WHY_CHOOSE_US } from '@/lib/data'
import {
  COMPANY_FACILITIES,
  CORE_VALUES,
  INFRASTRUCTURE_ITEMS,
  POLICY_TABS,
  PROCESS_CAPABILITIES,
  TESTING_FACILITIES,
  TIMELINE,
} from '@/lib/aboutSections'
import ProtectedDocumentModal from '@/components/ui/ProtectedDocumentModal'

const whyIcons = [ShieldCheck, Award, Factory, Sparkles, ClipboardCheck, HeartHandshake]

export default function AboutClientSections() {
  const [policyTab, setPolicyTab] = useState(POLICY_TABS[0].id)
  const [viewer, setViewer] = useState(null)
  const activePolicy = POLICY_TABS.find((t) => t.id === policyTab) || POLICY_TABS[0]

  return (
    <>
      {/* Why Choose Us */}
      <section id="why-choose-us" className="bg-white border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-2xl mb-8">
            <span className="text-[12px] font-600 uppercase tracking-widest text-indigo-600">Why Choose Us?</span>
            <h2 className="font-display font-700 text-[1.7rem] sm:text-[2.1rem] text-navy-900 mt-2 tracking-tight">
              Built for safety, quality, and long-term performance
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY_CHOOSE_US.map((item, i) => {
              const Icon = whyIcons[i % whyIcons.length]
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6 hover:border-indigo-200 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-display font-700 text-[15px] sm:text-[16px] text-navy-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-[13px] sm:text-[14px] leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section id="core-values" className="bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-2xl mb-8">
            <span className="text-[12px] font-600 uppercase tracking-widest text-indigo-600">Core Values</span>
            <h2 className="font-display font-700 text-[1.7rem] sm:text-[2.1rem] text-navy-900 mt-2">
              Principles that guide every project
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CORE_VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 flex gap-3">
                <CheckCircle2 className="text-indigo-600 shrink-0 mt-0.5" size={18} />
                <div>
                  <h3 className="font-display font-700 text-[15px] text-navy-900 mb-1.5">{v.title}</h3>
                  <p className="text-slate-600 text-[13.5px] leading-relaxed">{v.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testing & Inspection */}
      <section id="testing-inspection" className="bg-white border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-2xl mb-8">
            <span className="text-[12px] font-600 uppercase tracking-widest text-indigo-600">
              Testing &amp; Inspection Facilities
            </span>
            <h2 className="font-display font-700 text-[1.7rem] sm:text-[2.1rem] text-navy-900 mt-2">
              Quality proven before every dispatch
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TESTING_FACILITIES.map((item) => (
              <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardCheck size={16} className="text-indigo-600" />
                  <h3 className="font-display font-700 text-[14px] sm:text-[15px] text-navy-900">{item.title}</h3>
                </div>
                <p className="text-slate-600 text-[13px] leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Facility & Infrastructure */}
      <section id="infrastructure" className="bg-indigo-50/40 border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-2xl mb-8">
            <span className="text-[12px] font-600 uppercase tracking-widest text-indigo-600">
              Company Facility &amp; Infrastructure
            </span>
            <h2 className="font-display font-700 text-[1.7rem] sm:text-[2.1rem] text-navy-900 mt-2">
              Our manufacturing locations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {COMPANY_FACILITIES.map((facility) => (
              <article
                key={facility.id}
                className="overflow-hidden rounded-2xl border border-indigo-200 bg-white shadow-sm"
              >
                <div className="relative aspect-square bg-slate-100">
                  <Image
                    src={facility.image}
                    alt={facility.address}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 33vw"
                    unoptimized
                  />
                </div>
                <div className="p-4 sm:p-5 text-center">
                  <p className="inline-block rounded-md bg-amber-200/90 px-3 py-1.5 font-numeric font-700 text-[15px] sm:text-[16px] text-navy-900">
                    {facility.area}
                  </p>
                  <p className="mt-3 text-[12px] sm:text-[13px] leading-relaxed text-slate-600 uppercase tracking-wide">
                    {facility.address}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mb-8">
            <h3 className="font-display font-700 text-[1.15rem] text-navy-900 mb-2">
              Blasting · Pickling · Passivation
            </h3>
            <p className="text-slate-600 text-[13.5px] max-w-2xl">
              In-house surface preparation and stainless finishing — controlled on site for coating readiness and corrosion resistance.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {PROCESS_CAPABILITIES.map((proc) => (
              <article
                key={proc.id}
                className="overflow-hidden rounded-2xl border border-indigo-200 bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3] bg-slate-100">
                  <Image
                    src={proc.image}
                    alt={proc.title}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 33vw"
                    unoptimized
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-navy-900/85 px-2.5 py-1 text-[11px] font-600 uppercase tracking-wider text-white">
                    {proc.title}
                  </span>
                </div>
                <div className="p-4 sm:p-5">
                  <h4 className="font-display font-700 text-[15px] text-navy-900 mb-1.5">{proc.title}</h4>
                  <p className="text-slate-600 text-[13px] leading-relaxed">{proc.detail}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INFRASTRUCTURE_ITEMS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-indigo-200 bg-white p-5">
                <Factory size={18} className="text-indigo-600 mb-3" />
                <h3 className="font-display font-700 text-[14px] sm:text-[15px] text-navy-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-[13px] leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Policy */}
      <section id="our-policy" className="bg-white border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-2xl mb-6">
            <span className="text-[12px] font-600 uppercase tracking-widest text-indigo-600">Our Policy</span>
            <h2 className="font-display font-700 text-[1.7rem] sm:text-[2.1rem] text-navy-900 mt-2">
              Company standards that shape how we work
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {POLICY_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setPolicyTab(tab.id)}
                className={`px-3.5 py-2 rounded-full text-[12px] sm:text-[13px] font-600 border transition-all ${
                  policyTab === tab.id
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-2xl border border-slate-200 bg-slate-50/50 p-5 sm:p-7">
            <div>
              <h3 className="font-display font-700 text-[1.2rem] text-navy-900 mb-4">{activePolicy.title}</h3>
              <div className="space-y-3 mb-5">
                {activePolicy.body.map((p) => (
                  <p key={p} className="text-slate-600 text-[14px] leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
              {activePolicy.stories && (
                <div className="space-y-3">
                  {activePolicy.stories.map((s) => (
                    <div key={s.title} className="rounded-xl border border-slate-200 bg-white p-4">
                      <h4 className="font-600 text-[14px] text-navy-900 mb-1">{s.title}</h4>
                      <p className="text-[13px] text-slate-600 leading-relaxed">{s.detail}</p>
                    </div>
                  ))}
                </div>
              )}
              {(activePolicy.image || activePolicy.previewImage) && (
                <button
                  type="button"
                  onClick={() =>
                    setViewer({
                      title: activePolicy.title,
                      file: activePolicy.previewImage || activePolicy.image,
                      format: activePolicy.previewImage ? 'image' : activePolicy.imageFormat,
                    })
                  }
                  className="mt-5 btn-pill btn-outline text-[12.5px]"
                >
                  View policy document
                </button>
              )}
            </div>
            <div className="relative min-h-[240px] rounded-2xl overflow-hidden border border-slate-200 bg-white">
              {(activePolicy.previewImage || (activePolicy.imageFormat === 'image' && activePolicy.image)) && (
                <Image
                  src={activePolicy.previewImage || activePolicy.image}
                  alt={activePolicy.title}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width:1024px) 100vw, 40vw"
                  unoptimized
                />
              )}
              {activePolicy.imageFormat === 'pdf' && !activePolicy.previewImage && (
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                  <p className="text-slate-500 text-sm">Open the policy document to view the full PDF.</p>
                </div>
              )}
            </div>
          </div>

          <p className="mt-4 text-[13px] text-slate-500">
            Full document library also available in{' '}
            <Link href="/download" className="text-indigo-700 font-600 hover:underline">
              Documents Center
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section id="our-timeline" className="bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-2xl mb-10">
            <span className="text-[12px] font-600 uppercase tracking-widest text-indigo-600">Our Timeline</span>
            <h2 className="font-display font-700 text-[1.7rem] sm:text-[2.1rem] text-navy-900 mt-2">
              Year-wise milestones &amp; project journey
            </h2>
          </div>

          <div className="relative space-y-8 pl-2 before:absolute before:left-[15px] before:top-3 before:bottom-3 before:w-px before:bg-indigo-200">
            {TIMELINE.map((item) => (
              <div key={item.year} className="relative grid grid-cols-1 md:grid-cols-[140px_1fr] gap-4 md:gap-8 pl-10 md:pl-0">
                <div className="md:text-right md:pr-2">
                  <span className="absolute left-0 md:left-[15px] md:-translate-x-1/2 top-1 w-[30px] h-[30px] rounded-full bg-indigo-600 border-4 border-white shadow flex items-center justify-center">
                    <Milestone size={12} className="text-white" />
                  </span>
                  <div className="font-numeric font-700 text-[1.25rem] text-indigo-700">{item.year}</div>
                </div>
                <article className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:border-indigo-200 transition-colors md:flex">
                  <div className="relative h-40 md:h-auto md:w-52 shrink-0 bg-slate-100">
                    <Image src={item.image} alt={item.title} fill className="object-cover" sizes="208px" unoptimized />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-700 text-[1.05rem] text-navy-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-[13.5px] leading-relaxed">{item.detail}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProtectedDocumentModal doc={viewer} onClose={() => setViewer(null)} />
    </>
  )
}
