'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Award, Factory, Globe, TrendingUp } from 'lucide-react'

const stats = [
  { value: '1995', label: 'Established', icon: TrendingUp },
  { value: 'ISO 9001', label: 'Certified', icon: Award },
  { value: 'NSIC', label: 'Registered', icon: Factory },
  { value: 'Pune', label: 'India HQ', icon: Globe },
]

const ease = [0.22, 1, 0.36, 1]

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="about" className="flex min-h-0 lg:min-h-[100svh] items-center bg-white py-10 sm:py-12 lg:py-14">
      <div ref={ref} className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease }}
            className="relative min-h-[280px] overflow-hidden rounded-2xl sm:min-h-[340px] lg:min-h-0"
          >
            <Image
              src="/facilities/facility-hadapsar-plot32.jpg"
              alt="SEPL manufacturing infrastructure — Hadapsar Plot 32"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-4 right-4 text-[12px] font-600 text-white/90 sm:bottom-5 sm:left-5">
              Hadapsar Plot 32 facility · Pune
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.06, ease }}
            className="flex flex-col justify-center"
          >
            <span className="text-[11px] font-600 uppercase tracking-[0.18em] text-indigo-600 sm:text-[12px]">
              About Us
            </span>
            <h2 className="mt-2 font-display text-[1.55rem] font-700 leading-[1.15] tracking-tight text-navy-900 sm:text-[2.15rem]">
              Welcome to Steelfab Engineering Pvt. Ltd.
            </h2>
            <p className="mt-2 text-[12px] font-600 uppercase tracking-[0.06em] text-indigo-700">
              Fluid Transferring &amp; Handling Solution
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-slate-600 sm:text-[14px] sm:leading-relaxed">
              Established in 1995 and ISO 9001:2015 certified for design, manufacture and supply of loading
              arms, swivel joints, storage tanks, floating suction, prover tanks, and mechanical seal support
              systems. An NSIC-registered manufacturer based in Pune, serving customers across India and
              export markets.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2.5 sm:gap-3">
              {stats.map(({ value, label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-xl border border-slate-200/90 bg-slate-50 px-3 py-3"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                    <Icon size={15} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-numeric text-[13px] font-700 leading-tight text-navy-900 sm:text-[14px]">
                      {value}
                    </p>
                    <p className="text-[10px] text-slate-500 sm:text-[11px]">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-row flex-nowrap items-center gap-2 sm:gap-2.5">
              <Link href="/about" className="btn-pill btn-primary min-w-0 flex-1 justify-center px-3 text-[12px] sm:flex-none sm:px-7 sm:text-[13px]">
                Learn About SEPL
                <ArrowRight size={14} />
              </Link>
              <Link href="/global" className="btn-pill btn-outline min-w-0 flex-1 justify-center px-3 text-[12px] sm:flex-none sm:px-7 sm:text-[13px]">
                Global Exports
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
