'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, ChevronDown, ChevronRight } from 'lucide-react'
import { NAV_ITEMS, getPrimaryNavItems } from '@/lib/data'
import { cn } from '@/lib/utils'

const primaryNav = getPrimaryNavItems()

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState(null)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
    setExpandedSection(null)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white border-b border-slate-200 shadow-[0_10px_30px_rgba(15,23,42,0.08)]'
            : 'bg-white border-b border-slate-100'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[80px] lg:h-[88px] gap-4">
            <Link href="/" className="group flex min-w-0 flex-shrink items-center gap-2.5 sm:gap-4">
              <img
                src="/logo.png"
                alt="SEPL — Symbol of Quality"
                className="h-11 w-auto flex-shrink-0 object-contain sm:h-[60px] xl:h-[66px]"
              />
              <div className="hidden min-w-0 sm:block">
                <div className="max-w-[140px] truncate font-display text-[12px] font-700 leading-tight tracking-[0.01em] text-navy-900 md:max-w-none sm:text-[14px] xl:text-[15px]">
                  Steelfab Engineering Pvt. Ltd.
                </div>
                <div className="mt-1 hidden truncate text-[10px] font-600 tracking-[0.02em] text-sepl-red md:block sm:text-[11px]">
                  Symbol of Quality
                </div>
                <div className="mt-0.5 hidden truncate text-[9px] font-500 tracking-[0.015em] text-slate-500 lg:block sm:text-[10px]">
                  ASME U Stamp Certified Company
                </div>
              </div>
            </Link>

            {/* 6 primary links — dropdown on About & Products */}
            <div
              ref={dropdownRef}
              className="hidden xl:flex items-center gap-2 sm:gap-3 flex-1 justify-center max-w-3xl px-2"
            >
              {primaryNav.map((item) =>
                item.children ? (
                  <motion.div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'nav-link-underline flex items-center gap-1 px-4 py-2.5 text-[15px] font-600 rounded-xl transition-all whitespace-nowrap',
                        activeDropdown === item.label
                          ? 'text-indigo-700 bg-indigo-50/80'
                          : 'text-slate-700 hover:text-indigo-700 hover:bg-indigo-50/80'
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        size={15}
                        className={cn(
                          'text-slate-400 transition-transform duration-200',
                          activeDropdown === item.label && 'rotate-180 text-indigo-500'
                        )}
                      />
                    </Link>
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.97 }}
                          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute top-full left-0 pt-2 z-50"
                        >
                          <div className="bg-white border border-slate-200 rounded-2xl shadow-[0_12px_32px_rgba(15,23,42,0.14)] p-2 min-w-[240px]">
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                className="flex items-center gap-3 px-4 py-2.5 text-[14px] font-500 text-slate-700 hover:text-indigo-700 hover:bg-indigo-50 rounded-xl transition-all group"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-200 group-hover:bg-indigo-500 transition-colors shrink-0" />
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="nav-link-underline px-4 py-2.5 text-[15px] font-600 text-slate-700 hover:text-indigo-700 hover:bg-indigo-50/80 rounded-xl transition-all whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                href="/enquiry"
                className="btn-pill btn-primary btn-pill-compact hidden sm:inline-flex shadow-[0_6px_16px_rgba(67,56,202,0.22)]"
              >
                Enquiry
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="xl:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-800 transition-colors hover:border-indigo-200 hover:bg-indigo-50 sm:h-12 sm:w-12"
                aria-label="Open full menu"
                aria-expanded={menuOpen}
              >
                <Menu size={24} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-navy-950 text-white flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(99,102,241,0.25)_0%,transparent_50%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(14,165,233,0.12)_0%,transparent_45%)] pointer-events-none" />

            <div className="relative flex items-center justify-between px-4 sm:px-8 h-[72px] border-b border-white/10">
              <span className="font-display font-700 text-lg tracking-tight text-white/90">Menu</span>
              <button
                type="button"
                onClick={closeMenu}
                className="w-11 h-11 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="relative flex-1 overflow-y-auto px-4 sm:px-8 py-6 sm:py-10">
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                {NAV_ITEMS.filter((item) => !item.highlight).map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.35 }}
                  >
                    {item.children ? (
                      <div className="mb-4">
                        <div className="flex w-full items-center gap-2 py-1">
                          <Link
                            href={item.href}
                            onClick={closeMenu}
                            className="min-h-11 flex-1 py-2 font-display text-[1.25rem] font-700 text-white transition-colors hover:text-indigo-300 sm:text-[1.6rem]"
                          >
                            {item.label}
                          </Link>
                          <button
                            type="button"
                            onClick={() => setExpandedSection(expandedSection === item.label ? null : item.label)}
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10"
                            aria-expanded={expandedSection === item.label}
                            aria-label={`Expand ${item.label}`}
                          >
                            <ChevronRight
                              size={20}
                              className={cn(
                                'text-indigo-400 transition-transform duration-200',
                                expandedSection === item.label && 'rotate-90'
                              )}
                            />
                          </button>
                        </div>
                        <AnimatePresence>
                          {expandedSection === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22 }}
                              className="overflow-hidden pl-1"
                            >
                              <div className="pt-2 pb-3 space-y-1 border-l-2 border-indigo-500/50 ml-1 pl-4">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.label}
                                    href={child.href}
                                    onClick={closeMenu}
                                    className="flex items-center gap-2 py-2 text-[14px] sm:text-[15px] text-indigo-100/90 hover:text-white transition-colors group"
                                  >
                                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-indigo-400" />
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className="mb-2 block min-h-11 py-2 font-display text-[1.25rem] font-700 text-white transition-colors hover:text-indigo-300 sm:text-[1.6rem]"
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Mobile / tablet quick primary row */}
              <div className="xl:hidden max-w-4xl mx-auto mt-8 pt-8 border-t border-white/10">
                <p className="text-[11px] uppercase tracking-widest text-indigo-300 mb-3">Quick links</p>
                <div className="flex flex-wrap gap-2">
                  {primaryNav.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={closeMenu}
                      className="min-h-11 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-600 transition-colors hover:bg-indigo-600"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative px-4 sm:px-8 py-5 border-t border-white/10 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <p className="text-[13px] text-indigo-200/80 hidden sm:block">
                Steelfab Engineering Pvt. Ltd. · Pune, Maharashtra
              </p>
              <Link
                href="/enquiry"
                onClick={closeMenu}
                className="btn-pill btn-primary justify-center sm:min-w-[200px]"
              >
                Send Enquiry
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
