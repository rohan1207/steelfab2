'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { CheckCircle2, Play } from 'lucide-react'
import {
  FACILITY_VIDEO,
  FACILITY_VIDEO_INTRO,
  PRODUCT_BENEFITS,
} from '@/lib/facilityVideo'

const ease = [0.22, 1, 0.36, 1]

export default function FacilityVideoSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [useLocal, setUseLocal] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch(FACILITY_VIDEO.localSrc, { method: 'HEAD' })
      .then((res) => {
        if (!cancelled && res.ok) setUseLocal(true)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  const youtubeSrc = `https://www.youtube.com/embed/${FACILITY_VIDEO.youtubeId}?rel=0&modestbranding=1`

  return (
    <section
      id="facility-video"
      className="flex min-h-0 lg:min-h-[100svh] items-center border-y border-slate-200/70 bg-slate-50/80 py-10 sm:py-12 lg:py-14"
    >
      <div ref={ref} className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            className="relative min-h-[260px] overflow-hidden rounded-2xl border border-slate-200 bg-navy-950 shadow-[0_12px_40px_rgba(15,23,42,0.1)] sm:min-h-[320px] lg:min-h-0"
          >
            {useLocal ? (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                controls
                playsInline
                preload="metadata"
                poster={FACILITY_VIDEO.poster}
                src={FACILITY_VIDEO.localSrc}
              >
                Your browser does not support the video tag.
              </video>
            ) : playing ? (
              <iframe
                title={FACILITY_VIDEO.title}
                src={`${youtubeSrc}&autoplay=1`}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group absolute inset-0 h-full w-full"
                aria-label="Play facility video"
              >
                <img
                  src={FACILITY_VIDEO.poster}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-70"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/20 to-transparent" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-indigo-700 shadow-lg transition-transform group-hover:scale-105">
                    <Play size={24} className="ml-0.5" fill="currentColor" />
                  </span>
                </span>
                <span className="absolute bottom-4 left-4 right-4 text-left text-[12px] font-600 text-white sm:text-[13px]">
                  {FACILITY_VIDEO.title}
                </span>
              </button>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.06, ease }}
            className="flex flex-col justify-center"
          >
            <span className="text-[11px] font-600 uppercase tracking-[0.18em] text-indigo-600 sm:text-[12px]">
              Facility &amp; Products
            </span>
            <h2 className="mt-2 font-display text-[1.55rem] font-700 leading-[1.15] tracking-tight text-navy-900 sm:text-[2.1rem]">
              See our facility, products &amp; benefits
            </h2>
            <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-slate-600 sm:text-[14px]">
              {FACILITY_VIDEO_INTRO}
            </p>

            <ul className="mt-4 grid flex-1 content-center gap-2 sm:gap-2.5">
              {PRODUCT_BENEFITS.map((item) => (
                <li
                  key={item.title}
                  className="flex gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 sm:px-3.5 sm:py-3"
                >
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-indigo-600" />
                  <div className="min-w-0">
                    <p className="text-[13px] font-600 text-navy-900">{item.title}</p>
                    <p className="mt-0.5 line-clamp-1 text-[12px] leading-snug text-slate-500">
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link href="/products" className="btn-pill btn-primary text-[13px]">
                Explore products
              </Link>
              <Link href="/about#infrastructure" className="btn-pill btn-outline text-[13px]">
                Our facilities
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
