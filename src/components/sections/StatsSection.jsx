'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { target: 29, suffix: '+', label: 'Years of Excellence' },
  { target: 3128, suffix: '+', label: 'Sq. Meter Facility' },
  { target: 500, suffix: '+', label: 'Projects Completed' },
  { target: 10, suffix: 'Cr+', label: 'Annual Sales Volume' },
  { target: 3, suffix: '', label: 'Continents Served' },
]

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

function RollingNumber({ target, suffix, active, duration = 1600, delay = 0 }) {
  const [display, setDisplay] = useState(0)
  const frameRef = useRef(0)

  useEffect(() => {
    if (!active) {
      setDisplay(0)
      return
    }

    let startTime = null
    const startDelay = delay

    const tick = (now) => {
      if (startTime === null) startTime = now
      const elapsed = now - startTime - startDelay

      if (elapsed < 0) {
        frameRef.current = requestAnimationFrame(tick)
        return
      }

      const progress = Math.min(1, elapsed / duration)
      const value = Math.round(easeOutCubic(progress) * target)
      setDisplay(value)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick)
      }
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [active, target, duration, delay])

  return (
    <span className="inline-flex items-baseline justify-center tabular-nums">
      <span className="relative inline-block overflow-hidden leading-none">
        <motion.span
          key={active ? display : 'idle'}
          initial={active ? { y: 12, opacity: 0.35 } : false}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.12, ease: 'easeOut' }}
          className="inline-block"
        >
          {display}
        </motion.span>
      </span>
      {suffix ? <span className="text-indigo-300">{suffix}</span> : null}
    </span>
  )
}

export default function StatsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative overflow-hidden bg-gradient-to-br from-navy-900 to-indigo-900 py-14">
      <div className="pointer-events-none absolute right-1/4 top-0 h-96 w-96 rounded-full bg-indigo-600/20 blur-[80px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-navy-800/50 blur-[60px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 min-[380px]:grid-cols-2 sm:grid-cols-3 sm:gap-8 lg:grid-cols-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`text-center ${i === stats.length - 1 ? 'col-span-2 sm:col-span-1' : ''}`}
            >
              <div className="mb-1.5 font-numeric text-[1.75rem] font-800 leading-none text-white sm:text-[2.2rem]">
                <RollingNumber
                  target={stat.target}
                  suffix={stat.suffix}
                  active={inView}
                  duration={1500 + i * 120}
                  delay={i * 80}
                />
              </div>
              <div className="px-1 text-[11px] tracking-wide text-indigo-200/80 sm:text-[12.5px]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
