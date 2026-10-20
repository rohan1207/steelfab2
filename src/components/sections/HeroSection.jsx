'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react'
import { HERO_SLIDES } from '@/lib/data'
import ChecksHoverBg from '@/components/ui/ChecksHoverBg'

const SLIDE_INTERVAL_MS = 5000
const ease = [0.22, 1, 0.36, 1]

const HERO_METRICS = [
  { value: '29+', label: 'Years of excellence' },
  { value: '500+', label: 'Projects delivered' },
  { value: 'ISO 9001', label: 'DNV certified' },
]

const DESKTOP_SUPPORT =
  'From ASME-aligned fabrication to Weights & Measures certified systems — engineered in Pune for terminals, refineries, aviation fuel, and export markets.'

const fadeUp = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

const fadeScale = {
  enter: { opacity: 0, scale: 1.02 },
  center: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.995 },
}

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const sectionRef = useRef(null)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  }, [])

  const onMove = useCallback((e) => {
    const el = sectionRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--checks-mx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--checks-my', `${e.clientY - rect.top}px`)
    el.style.setProperty('--checks-glow', '1')
  }, [])

  const onLeave = useCallback(() => {
    sectionRef.current?.style.setProperty('--checks-glow', '0')
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length)
    }, SLIDE_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [current])

  const slide = HERO_SLIDES[current]

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative flex min-h-0 sm:min-h-[100svh] flex-col overflow-hidden bg-[#f4f5fb]"
      style={{ '--checks-mx': '50%', '--checks-my': '40%', '--checks-glow': '0' }}
    >
      <ChecksHoverBg />

      {/* Order: heading → description → image → buttons / stats / controls */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 content-center gap-5 px-4 py-8 pt-[calc(var(--navbar-height)+0.75rem)] sm:gap-7 sm:px-6 sm:py-10 sm:pt-[calc(var(--navbar-height)+1rem)] lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-center lg:gap-x-10 lg:gap-y-6 lg:px-8 lg:pb-12 xl:gap-x-12">
        {/* 1 — Badge + heading + description */}
        <div className="relative min-w-0 lg:col-start-1 lg:row-start-1">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
            className="mb-4 inline-flex w-fit max-w-full items-center gap-2 rounded-full border border-indigo-200/80 bg-white/85 px-3.5 py-1.5 shadow-sm backdrop-blur-md"
          >
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#2E3192]" strokeWidth={2.25} />
            <span className="truncate text-[11px] font-600 tracking-wide text-navy-800 sm:text-[12px]">
              ASME U Stamp · Symbol of Quality
            </span>
          </motion.div>

          <div className="relative grid">
            {HERO_SLIDES.map((s) => (
              <div key={`measure-${s.id}`} className="invisible col-start-1 row-start-1" aria-hidden>
                <p className="mb-2 text-[11px] font-600 uppercase tracking-[0.16em] text-[#2E3192]">
                  {s.tag}
                </p>
                <h2 className="font-display text-[clamp(1.7rem,3.8vw,2.65rem)] font-700 leading-[1.15] tracking-tight">
                  {s.headline}
                </h2>
                <p className="mt-3 text-[14px] leading-relaxed sm:text-[15px] sm:leading-7">{s.subline}</p>
                <p className="mt-2 hidden text-[14px] leading-relaxed lg:block">{DESKTOP_SUPPORT}</p>
              </div>
            ))}

            <div className="col-start-1 row-start-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`copy-${current}`}
                  variants={fadeUp}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease }}
                >
                  <p className="mb-2 text-[11px] font-600 uppercase tracking-[0.16em] text-[#2E3192]">
                    {slide.tag}
                  </p>
                  <h1 className="font-display text-[clamp(1.7rem,3.8vw,2.65rem)] font-700 leading-[1.15] tracking-tight text-navy-950">
                    {slide.headline}
                  </h1>
                  <p className="mt-3 text-[14px] leading-relaxed text-slate-600 sm:text-[15px] sm:leading-7">
                    {slide.subline}
                  </p>
                  <p className="mt-2.5 hidden text-[14px] leading-relaxed text-slate-500 lg:block">
                    {DESKTOP_SUPPORT}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 2 — Banner slideshow (above buttons/stats on mobile; right column on desktop) */}
        <div className="relative min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.35rem] bg-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.12)] sm:aspect-[16/11] sm:rounded-[1.75rem] lg:aspect-auto lg:h-[min(68vh,620px)] lg:min-h-[min(68vh,620px)]">
            <AnimatePresence mode="sync">
              <motion.div
                key={`banner-${current}`}
                variants={fadeScale}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.65, ease }}
                className="absolute inset-0"
              >
                <Image
                  src={slide.image}
                  alt={slide.headline}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </motion.div>
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/45 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 sm:bottom-5 sm:left-5 sm:right-5">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`tag-${current}`}
                  variants={fadeUp}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="rounded-full bg-white/95 px-3.5 py-1.5 text-[11px] font-600 text-navy-900 shadow-sm backdrop-blur-sm sm:text-[12px]"
                >
                  {slide.tag}
                </motion.span>
              </AnimatePresence>
              {(slide.stat1 || slide.stat2) && (
                <div className="hidden items-center gap-2 sm:flex">
                  {slide.stat1 ? (
                    <span className="rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[11px] font-600 text-white backdrop-blur-md">
                      {slide.stat1.value}
                    </span>
                  ) : null}
                  {slide.stat2 ? (
                    <span className="rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[11px] font-600 text-white backdrop-blur-md">
                      {slide.stat2.value}
                    </span>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3 — Buttons, metrics, slide controls */}
        <div className="relative min-w-0 lg:col-start-1 lg:row-start-2">
          <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:flex-wrap">
            <Link
              href="/enquiry"
              className="btn-pill btn-primary min-h-11 w-full justify-center text-[14px] sm:w-auto"
            >
              Request a Quote
              <ArrowRight size={16} />
            </Link>
            <Link
              href={slide.href || '/products'}
              className="btn-pill min-h-11 w-full min-w-[9.5rem] justify-center border border-slate-300 bg-white text-[14px] text-navy-900 hover:border-indigo-300 hover:bg-indigo-50 sm:w-auto"
            >
              {slide.ctaLabel || 'View Product'}
            </Link>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2.5 sm:mt-6 sm:gap-3">
            {HERO_METRICS.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + i * 0.05, duration: 0.4, ease }}
                className="flex flex-col items-center justify-center rounded-xl border border-slate-200/90 bg-white px-1.5 py-2.5 text-center shadow-[0_4px_20px_rgba(15,23,42,0.05)] sm:min-h-[6.5rem] sm:rounded-[1.25rem] sm:px-3 sm:py-5"
              >
                <p className="font-numeric text-[clamp(1rem,2.8vw,1.45rem)] font-700 leading-none tracking-tight text-[#2E3192]">
                  {metric.value}
                </p>
                <p className="mt-1.5 text-[9px] font-600 leading-snug text-slate-500 sm:mt-2 sm:text-[11px]">
                  {metric.label}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-3 sm:mt-6">
            <span className="font-numeric text-[12px] font-600 text-slate-400">
              {String(current + 1).padStart(2, '0')}
              <span className="text-slate-300"> / {String(HERO_SLIDES.length).padStart(2, '0')}</span>
            </span>
            <div className="flex items-center gap-1.5">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === current ? 'w-7 bg-[#2E3192]' : 'w-1.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
            <div className="ml-0.5 flex gap-1.5">
              <button
                type="button"
                onClick={prev}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-navy-800 transition-colors hover:border-indigo-300 hover:bg-indigo-50"
                aria-label="Previous slide"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={next}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-navy-800 transition-colors hover:border-indigo-300 hover:bg-indigo-50"
                aria-label="Next slide"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
