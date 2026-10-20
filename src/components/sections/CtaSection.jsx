'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Phone, Mail } from 'lucide-react'

export default function CtaSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-pad bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-indigo-900 to-indigo-800 p-10 sm:p-14 text-white text-center"
        >
          {/* Decorative */}
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-indigo-500/20 blur-[60px]" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-navy-800/60 blur-[60px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(129,140,248,0.15)_0%,transparent_60%)]" />

          <div className="relative z-10">
            <span className="inline-block text-[11px] font-600 tracking-widest uppercase text-indigo-300 mb-4">
              Get Started Today
            </span>
            <h2 className="font-display font-700 text-[2rem] sm:text-[2.6rem] leading-[1.15] tracking-tight mb-5">
              Looking for a Custom Fluid<br className="hidden sm:block" /> Handling Solution?
            </h2>
            <p className="text-indigo-200 text-[15.5px] max-w-xl mx-auto mb-10 leading-relaxed">
              Our engineering team is ready to help you find the right product for your application. Send us your requirements and get a detailed quote.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/enquiry" className="btn-pill btn-primary text-[14px] py-3.5 px-8 shadow-xl">
                Send Enquiry
                <ArrowRight size={17} />
              </Link>
              <Link href="/contact" className="btn-pill btn-ghost-white text-[14px] py-3.5 px-8">
                <Phone size={16} />
                Contact Us
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[13px] text-indigo-300">
              <span className="flex items-center gap-2">
                <span className="w-4 h-px bg-indigo-500" />
                ISO 9001:2008 Certified
              </span>
              <span className="flex items-center gap-2">
                <span className="w-4 h-px bg-indigo-500" />
                29+ Years Experience
              </span>
              <span className="flex items-center gap-2">
                <span className="w-4 h-px bg-indigo-500" />
                Global Delivery
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
