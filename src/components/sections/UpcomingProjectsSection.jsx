'use client'

import { useEffect, useState } from 'react'
import { fetchUpcomingProjects } from '@/lib/api'
import { Rocket } from 'lucide-react'

export default function UpcomingProjectsSection() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetchUpcomingProjects().then(setProjects).catch(() => setProjects([]))
  }, [])

  if (!projects.length) return null

  return (
    <section className="section-pad bg-white border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-2">
          <Rocket size={18} className="text-indigo-600" />
          <span className="text-[12px] font-600 uppercase tracking-widest text-indigo-600">Upcoming Projects</span>
        </div>
        <h2 className="font-display font-700 text-[1.8rem] sm:text-[2.2rem] text-navy-900 tracking-tight mb-8">
          Latest Developments & Facility Expansions
        </h2>
        <div className="grid grid-cols-2 gap-2.5 sm:gap-5 lg:grid-cols-3">
          {projects.map((p) => (
            <article key={p._id} className="rounded-xl border border-slate-200 bg-slate-50/50 overflow-hidden hover:border-indigo-200 transition-all sm:rounded-2xl">
              {p.imageUrl && <img src={p.imageUrl} alt={p.title} className="w-full h-24 object-cover sm:h-40" />}
              <div className="p-2.5 sm:p-5">
                <span className="text-[9px] font-600 uppercase tracking-wider text-indigo-600 sm:text-[10px]">{p.status}</span>
                <h3 className="font-display font-700 text-[12.5px] text-navy-900 mt-1 mb-1 leading-snug sm:text-[17px] sm:mb-2">{p.title}</h3>
                <p className="text-[11px] text-slate-600 leading-snug line-clamp-3 sm:text-[13.5px] sm:leading-relaxed sm:line-clamp-none">{p.summary || p.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
