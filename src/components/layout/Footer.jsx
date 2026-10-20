'use client'

import Link from 'next/link'
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react'

const footerLinks = {
  Products: [
    { label: 'Loading Arms', href: '/products/loading-arms' },
    { label: 'Unloading Arms', href: '/products/unloading-arms' },
    { label: 'Floating Suction', href: '/products/floating-suction' },
    { label: 'Prover Tanks', href: '/products/prover-tanks' },
    { label: 'Swivel Joints', href: '/products/swivel-joints' },
    { label: 'Test Aiders', href: '/products/test-aiders' },
  ],
  Company: [
    { label: 'About SEPL', href: '/about' },
    { label: 'Certificates', href: '/about/certificates' },
    { label: 'Global Presence', href: '/global' },
    { label: 'Clients', href: '/clients' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      {/* Compact CTA */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-stretch gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-8 lg:px-8">
          <div className="min-w-0 text-center sm:text-left">
            <h3 className="font-display text-[1.05rem] font-700 text-white sm:text-xl">
              Ready to discuss your project?
            </h3>
            <p className="mt-0.5 text-[12px] text-slate-400 sm:text-[13px]">
              Get a customized quote for your fluid handling needs.
            </p>
          </div>
          <div className="flex flex-row gap-2 sm:shrink-0">
            <Link href="/enquiry" className="btn-pill btn-primary flex-1 justify-center px-3 text-[12px] sm:flex-none sm:px-5 sm:text-[13px]">
              Request a Quote
            </Link>
            <Link href="/contact" className="btn-pill btn-ghost-white flex-1 justify-center px-3 text-[12px] sm:flex-none sm:px-5 sm:text-[13px]">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Main — brand + 2-col links on phone */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:gap-8 lg:grid-cols-4 lg:gap-10">
          {/* Brand spans full width on phone */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="mb-3 flex items-center gap-2.5 sm:mb-4 sm:gap-3">
              <img
                src="/logo.png"
                alt="SEPL — Symbol of Quality"
                className="h-10 w-auto rounded-lg bg-white p-1 object-contain sm:h-12"
              />
              <div className="min-w-0">
                <div className="font-display text-[13px] font-700 leading-snug text-white sm:text-[15px]">
                  Steelfab Engineering Pvt. Ltd.
                </div>
                <div className="mt-0.5 text-[10px] font-600 tracking-wide text-red-400">Symbol of Quality</div>
              </div>
            </Link>
            <p className="mb-3 max-w-sm text-[12px] leading-relaxed text-slate-400 sm:mb-4 sm:text-[14px]">
              Fluid handling systems since 1995 — ISO 9001 certified, trusted across India and export markets.
            </p>
            <div className="flex flex-col gap-1.5 text-[12px] text-slate-400 sm:gap-2 sm:text-[13px]">
              <div className="flex items-center gap-2">
                <MapPin size={13} className="shrink-0 text-indigo-400" />
                <span>Pune, Maharashtra, India</span>
              </div>
              <a href="tel:+918888855975" className="flex items-center gap-2 hover:text-white">
                <Phone size={13} className="shrink-0 text-indigo-400" />
                <span>+91 88888 55975</span>
              </a>
              <a href="mailto:marketing@steelfabeng.com" className="flex items-center gap-2 hover:text-white">
                <Mail size={13} className="shrink-0 text-indigo-400" />
                <span className="truncate">marketing@steelfabeng.com</span>
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="min-w-0">
              <h4 className="mb-2.5 text-[10px] font-600 uppercase tracking-widest text-slate-500 sm:mb-3.5 sm:text-[12px]">
                {category}
              </h4>
              <ul className="space-y-1.5 sm:space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-1 text-[12px] text-slate-400 transition-colors hover:text-white sm:text-[13.5px]"
                    >
                      <span className="truncate">{link.label}</span>
                      <ArrowUpRight
                        size={11}
                        className="shrink-0 text-indigo-400 opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-1.5 px-4 py-4 text-center sm:px-6 sm:py-5 lg:px-8">
          <p className="text-[11px] text-slate-500 sm:text-[12.5px]">
            © {new Date().getFullYear()} Steelfab Engineering Pvt. Ltd. All rights reserved.
          </p>
          <p className="text-[11px] text-slate-600">
            Designed and developed by - TheSocialKollab
          </p>
          <p className="text-[10px] text-slate-600 sm:text-[12px]">
            ISO 9001:2015 · Est. 1995
          </p>
        </div>
      </div>
    </footer>
  )
}
