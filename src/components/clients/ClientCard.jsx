'use client'

import { useState } from 'react'
import { getClientInitials } from '@/lib/clientsData'

const GRADIENTS = [
  'from-indigo-600 to-violet-700',
  'from-sky-600 to-indigo-700',
  'from-emerald-600 to-teal-700',
  'from-amber-600 to-orange-700',
  'from-rose-600 to-pink-700',
  'from-slate-700 to-navy-900',
]

function gradientForSlug(slug) {
  let hash = 0
  for (let i = 0; i < slug.length; i++) hash = slug.charCodeAt(i) + ((hash << 5) - hash)
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length]
}

export default function ClientCard({ client: item }) {
  const [imgFailed, setImgFailed] = useState(false)
  const initials = getClientInitials(item.name)
  const gradient = gradientForSlug(item.slug)
  const showImage = item.image && !imgFailed

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white overflow-hidden hover:border-indigo-200 hover:shadow-[0_10px_30px_rgba(67,56,202,0.08)] transition-all duration-300">
      <div className="relative h-24 sm:h-28 bg-slate-50 flex items-center justify-center p-4 border-b border-slate-100">
        {showImage ? (
          <img
            src={item.image}
            alt={`${item.name} logo`}
            className="max-h-full max-w-full w-auto object-contain"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md`}
          >
            <span className="font-display font-700 text-white text-[15px] sm:text-[17px] tracking-tight">
              {initials}
            </span>
          </div>
        )}
      </div>
      <div className="p-3.5 sm:p-4">
        <p className="text-[11px] sm:text-[13.5px] font-600 text-slate-800 leading-snug line-clamp-3 group-hover:text-indigo-900 transition-colors">
          {item.name}
        </p>
      </div>
    </article>
  )
}
