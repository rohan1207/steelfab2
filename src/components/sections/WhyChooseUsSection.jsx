'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Shield, Calendar, Building2, Globe, Settings, Truck } from 'lucide-react'
import { WHY_CHOOSE_US } from '@/lib/data'

const iconMap = {
  shield: Shield,
  calendar: Calendar,
  building: Building2,
  globe: Globe,
  settings: Settings,
  truck: Truck,
}

const ease = [0.22, 1, 0.36, 1]

export default function WhyChooseUsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="flex min-h-0 lg:min-h-[100svh] items-center bg-[#F4F6F9] py-10 sm:py-12 lg:py-14">
      <div ref={ref} className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-6">
          {/* Left visual column — fills height */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            className="relative flex min-h-[280px] flex-col overflow-hidden rounded-2xl bg-[#141646] sm:min-h-[340px] lg:min-h-0"
          >
            <Image
              src="/facilities/facility-hadapsar-main.jpg"
              alt="SEPL manufacturing facility"
              fill
              className="object-cover opacity-80"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d2e]/75 via-[#141646]/25 to-transparent" />

            <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6 lg:p-7">
              <div>
                <span className="text-[11px] font-600 uppercase tracking-[0.18em] text-indigo-200">
                  Why SEPL
                </span>
                <h2 className="mt-2 font-display text-[1.65rem] font-700 leading-[1.12] tracking-tight text-white sm:text-[2.1rem]">
                  Why Choose Us
                </h2>
                <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-white/70 sm:text-[14px]">
                  Nearly three decades of engineering expertise — fluid handling systems built for
                  quality, reliability, and performance.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-2 border-t border-white/15 pt-5 min-[400px]:grid-cols-3 sm:gap-3">
                {[
                  { value: 'ISO', label: 'Standards' },
                  { value: 'ASTM', label: 'Design' },
                  { value: 'BIS', label: 'Compliance' },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="font-numeric text-[1.1rem] font-700 text-white sm:text-[1.25rem]">
                      {item.value}
                    </p>
                    <p className="mt-0.5 text-[10px] font-600 uppercase tracking-wide text-indigo-200/80">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-[11px] text-white/45">ISO 9001:2008 certified by DNV</p>
            </div>
          </motion.div>

          {/* Right — equal cards */}
          <div className="grid grid-cols-2 content-stretch gap-2.5 sm:gap-3.5">
            {WHY_CHOOSE_US.map((item, i) => {
              const Icon = iconMap[item.icon] || Shield
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.06 + i * 0.04, ease }}
                  className="flex h-full flex-col rounded-xl border border-slate-200/90 bg-white p-3 shadow-[0_2px_14px_rgba(15,23,42,0.04)] sm:rounded-2xl sm:p-5"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 sm:h-10 sm:w-10 sm:rounded-xl">
                    <Icon className="h-3.5 w-3.5 sm:h-[18px] sm:w-[18px]" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-2 font-display text-[12.5px] font-700 leading-snug text-navy-900 sm:mt-3 sm:text-[15px]">
                    {item.title}
                  </h3>
                  <p className="mt-1 flex-1 text-[11px] leading-snug text-slate-500 sm:mt-1.5 sm:text-[13px] sm:leading-relaxed">
                    {item.description}
                  </p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
