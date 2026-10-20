'use client'

import Link from 'next/link'
import { getLogoClients } from '@/lib/clientsData'

function LogoTrack({ clients, direction }) {
  const loop = [...clients, ...clients]

  return (
    <div className="group relative overflow-hidden py-1">
      <div
        className={`flex w-max items-center gap-4 sm:gap-6 ${
          direction === 'ltr' ? 'animate-marquee-ltr' : 'animate-marquee-rtl'
        } group-hover:[animation-play-state:paused]`}
      >
        {loop.map((client, i) => (
          <div
            key={`${client.image}-${i}`}
            className="flex h-[72px] w-[150px] shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-white px-4 py-3 shadow-[0_2px_12px_rgba(15,23,42,0.04)] sm:h-[80px] sm:w-[170px]"
          >
            <img
              src={client.image}
              alt={client.name}
              loading="lazy"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ClientsMarquee() {
  const clients = getLogoClients()
  if (!clients.length) return null

  const mid = Math.ceil(clients.length / 2)
  const rowA = clients.slice(0, mid)
  const rowB = clients.slice(mid)

  return (
    <section className="relative overflow-hidden border-b border-slate-200/70 bg-white py-10 sm:py-12">
      <div className="mx-auto mb-7 max-w-7xl px-4 text-center sm:mb-8 sm:px-6 lg:px-8">
        <p className="text-[11px] font-600 uppercase tracking-[0.2em] text-[#ED1C24] sm:text-[12px]">
          Our Clients
        </p>
        <h2 className="mt-2 font-display text-[1.45rem] font-700 tracking-tight text-navy-900 sm:text-[1.85rem]">
          Trusted by industry leaders
        </h2>
      </div>

      <div className="space-y-4 sm:space-y-5">
        <LogoTrack clients={rowA} direction="ltr" />
        <LogoTrack clients={rowB.length ? rowB : rowA} direction="rtl" />
      </div>

      <div className="mt-7 flex justify-center sm:mt-8">
        <Link
          href="/clients"
          className="text-[13px] font-600 text-[#2E3192] underline-offset-4 hover:underline"
        >
          View all clients
        </Link>
      </div>
    </section>
  )
}
