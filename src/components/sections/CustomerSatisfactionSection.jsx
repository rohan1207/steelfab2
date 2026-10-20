'use client'

import Link from 'next/link'
import { Star } from 'lucide-react'
import { CUSTOMER_REVIEWS, REVIEW_HIGHLIGHTS } from '@/lib/customerReviews'

function initials(review) {
  const src = review.company || review.author || 'SE'
  const words = src.replace(/\(.*?\)/g, '').trim().split(/\s+/).filter(Boolean)
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return src.slice(0, 2).toUpperCase()
}

function ReviewCard({ review, dark, compact = false }) {
  return (
    <article
      className={`flex shrink-0 flex-col rounded-2xl border ${
        compact
          ? 'w-[260px] max-w-[260px] p-3.5 sm:w-[280px] sm:max-w-[280px]'
          : 'w-full max-w-[320px] p-5 sm:p-6'
      } ${
        dark
          ? 'border-white/10 bg-[#141646] text-white'
          : 'border-slate-200/90 bg-white text-navy-900 shadow-[0_2px_14px_rgba(15,23,42,0.04)]'
      }`}
    >
      <p
        className={`leading-relaxed ${
          compact
            ? 'line-clamp-3 text-[12.5px] sm:text-[13px]'
            : 'text-[13px] sm:text-[14px]'
        } ${dark ? 'text-white/80' : 'text-slate-600'}`}
      >
        &ldquo;{review.quote}&rdquo;
      </p>

      <div
        className={`mt-3 flex items-end justify-between gap-2 border-t pt-3 ${
          compact ? 'mt-3 pt-3' : 'mt-5 pt-4'
        } ${dark ? 'border-white/10' : 'border-slate-100'}`}
      >
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={`flex shrink-0 items-center justify-center rounded-full text-[10px] font-700 ${
              compact ? 'h-8 w-8' : 'h-9 w-9 text-[11px]'
            } ${dark ? 'bg-[#ED1C24] text-white' : 'bg-[#2E3192] text-white'}`}
          >
            {initials(review)}
          </span>
          <div className="min-w-0">
            <p className={`truncate text-[12px] font-700 sm:text-[13px] ${dark ? 'text-white' : 'text-navy-900'}`}>
              {review.author}
            </p>
            <p className={`truncate text-[10px] sm:text-[11px] ${dark ? 'text-white/50' : 'text-slate-500'}`}>
              {review.company}
            </p>
          </div>
        </div>
        <span
          className={`shrink-0 text-[9px] font-600 uppercase tracking-wider sm:text-[10px] ${
            dark ? 'text-white/35' : 'text-slate-400'
          }`}
        >
          {review.sector}
        </span>
      </div>
    </article>
  )
}

function VerticalTrack({ reviews, direction, startDark = false }) {
  const loop = [...reviews, ...reviews]

  return (
    <div className="hidden h-[520px] overflow-hidden sm:block md:h-[560px]">
      <div
        className={`flex w-full flex-col gap-4 ${
          direction === 'down' ? 'animate-marquee-y-down' : 'animate-marquee-y-up'
        } hover:[animation-play-state:paused]`}
      >
        {loop.map((review, i) => (
          <ReviewCard
            key={`v-${review.id}-${i}`}
            review={review}
            dark={(startDark ? i + 1 : i) % 2 === 1}
          />
        ))}
      </div>
    </div>
  )
}

function HorizontalTrack({ reviews, direction, startDark = false }) {
  const loop = [...reviews, ...reviews]

  return (
    <div className="overflow-hidden sm:hidden">
      <div
        className={`flex w-max items-stretch gap-3 ${
          direction === 'ltr' ? 'animate-marquee-ltr' : 'animate-marquee-rtl'
        } hover:[animation-play-state:paused]`}
      >
        {loop.map((review, i) => (
          <ReviewCard
            key={`h-${review.id}-${i}`}
            review={review}
            dark={(startDark ? i + 1 : i) % 2 === 1}
            compact
          />
        ))}
      </div>
    </div>
  )
}

export default function CustomerSatisfactionSection() {
  const mid = Math.ceil(CUSTOMER_REVIEWS.length / 2)
  const colA = CUSTOMER_REVIEWS.slice(0, mid)
  const colB = CUSTOMER_REVIEWS.slice(mid)
  const rowB = colB.length ? colB : colA
  const avg = REVIEW_HIGHLIGHTS.find((h) => h.label.toLowerCase().includes('rating'))?.value || '4.9'

  return (
    <section className="overflow-hidden bg-white py-14 sm:py-16 lg:py-20" id="reviews">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:gap-10 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 lg:px-8">
        <div>
          <p className="text-[11px] font-600 uppercase tracking-[0.2em] text-[#ED1C24] sm:text-[12px]">
            Testimonials
          </p>
          <h2 className="mt-3 font-display text-[1.75rem] font-700 leading-[1.15] tracking-tight text-navy-900 sm:text-[2.4rem]">
            What partners say about SEPL
          </h2>
          <p className="mt-4 max-w-md text-[14px] leading-relaxed text-slate-500 sm:text-[15px]">
            From terminal operators to pump OEMs — trusted for loading arms, Test Aiders, and engineered
            fluid-handling systems across India and export markets.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-0.5" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={16} className="fill-[#ED1C24] text-[#ED1C24]" />
              ))}
            </div>
            <p className="text-[13px] font-600 text-navy-900">
              <span className="font-numeric">{avg}</span> across trusted project reviews
            </p>
          </div>

          <Link
            href="/clients"
            className="btn-pill btn-primary mt-8 inline-flex min-h-11 text-[13px]"
          >
            Read every review
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="min-w-0">
          {/* Phone: opposite horizontal strips */}
          <div className="flex flex-col gap-3 sm:hidden">
            <HorizontalTrack reviews={colA} direction="ltr" startDark={false} />
            <HorizontalTrack reviews={rowB} direction="rtl" startDark={true} />
          </div>

          {/* Tablet/desktop: opposite vertical strips */}
          <div className="hidden grid-cols-2 gap-4 sm:grid sm:gap-5">
            <VerticalTrack reviews={colA} direction="down" startDark={false} />
            <VerticalTrack reviews={rowB} direction="up" startDark={true} />
          </div>
        </div>
      </div>
    </section>
  )
}
