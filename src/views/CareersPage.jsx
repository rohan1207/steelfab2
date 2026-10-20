'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { fetchJobs, trackLead } from '@/lib/api'
import { Briefcase, GraduationCap, FileText, Target, Award, ChevronDown } from 'lucide-react'

function JobField({ icon: Icon, label, children }) {
  if (!children) return null
  return (
    <div className="pt-3 border-t border-slate-100 first:border-t-0 first:pt-0">
      <div className="flex items-center gap-2 mb-1.5">
        <Icon size={14} className="text-indigo-600 shrink-0" />
        <span className="text-[11px] font-600 uppercase tracking-wider text-indigo-700">{label}</span>
      </div>
      <div className="text-[13px] text-slate-600 leading-relaxed pl-5">{children}</div>
    </div>
  )
}

function BulletList({ items }) {
  if (!items?.length) return null
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function JobCard({ role }) {
  const [open, setOpen] = useState(false)
  const jd = role.jd || role.description
  const hasDetails =
    jd || role.education || (role.kra && role.kra.length) || (role.certificates && role.certificates.length)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-indigo-200 transition-all">
      <h3 className="font-display font-700 text-[17px] text-navy-900 mb-2">{role.title}</h3>
      <p className="text-[13px] text-slate-500 mb-3">
        {[role.department, role.location, role.experience || role.type].filter(Boolean).join(' · ')}
      </p>
      {role.description && role.jd ? (
        <p className="text-[13px] text-slate-600 mb-3">{role.description}</p>
      ) : null}

      {hasDetails ? (
        <>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="mb-3 inline-flex items-center gap-1.5 text-[12px] font-600 text-indigo-700 hover:text-indigo-900"
          >
            {open ? 'Hide details' : 'View JD, Education, KRA & certificates'}
            <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          {open ? (
            <div className="mb-4 space-y-3 rounded-xl bg-slate-50/80 p-4">
              <JobField icon={FileText} label="JD — Job Description">
                {jd ? <p className="whitespace-pre-line">{jd}</p> : null}
              </JobField>
              <JobField icon={GraduationCap} label="Education">
                {role.education || null}
              </JobField>
              <JobField icon={Target} label="KRA — Key Result Areas">
                <BulletList items={role.kra} />
              </JobField>
              <JobField icon={Award} label="Certificates">
                <BulletList items={role.certificates} />
              </JobField>
              {role.requirements?.length ? (
                <JobField icon={Briefcase} label="Other requirements">
                  <BulletList items={role.requirements} />
                </JobField>
              ) : null}
            </div>
          ) : null}
        </>
      ) : role.description ? (
        <p className="text-[13px] text-slate-600 mb-4 line-clamp-3">{role.description}</p>
      ) : null}

      <Link
        href={`/enquiry?job=${encodeURIComponent(role.title)}&product=Career Application`}
        className="btn-pill btn-outline text-[12px] w-full justify-center"
        onClick={() =>
          trackLead({
            type: 'career_application',
            sourcePage: '/careers',
            jobId: role._id,
            jobTitle: role.title,
            subject: `Apply: ${role.title}`,
          }).catch(() => {})
        }
      >
        Apply Now
      </Link>
    </div>
  )
}

export default function CareersPage() {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    fetchJobs().then(setJobs).catch(() => setJobs([]))
    trackLead({ type: 'career_visit', sourcePage: '/careers', subject: 'Careers page visit' }).catch(() => {})
  }, [])

  return (
    <main>
      <Navbar />
      <div className="pt-nav">
        <section className="bg-gradient-to-br from-navy-950 to-indigo-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <Briefcase size={20} className="text-indigo-300 mb-4" />
            <h1 className="font-display font-700 text-[2rem] sm:text-[3rem] leading-tight mb-4">Careers at SEPL</h1>
            <p className="text-indigo-100 max-w-2xl text-[14px] sm:text-[16px]">
              Explore current openings — each role includes JD, education, KRAs and certificate requirements.
            </p>
          </div>
        </section>
        <section className="bg-slate-50/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {jobs.length === 0 ? (
              <p className="text-slate-500">No active openings right now. Share your profile via enquiry.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {jobs.map((role) => (
                  <JobCard key={role._id} role={role} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  )
}
