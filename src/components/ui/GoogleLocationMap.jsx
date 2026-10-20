'use client'

import { COMPANY_LOCATION } from '@/lib/location'

export default function GoogleLocationMap({
  className = '',
  title = COMPANY_LOCATION.name,
  heightClass = 'h-[280px] sm:h-[360px] lg:h-[420px]',
}) {
  return (
    <div className={`overflow-hidden bg-slate-200 ${className}`}>
      <iframe
        title={title}
        src={COMPANY_LOCATION.embedSrc}
        className={`w-full border-0 ${heightClass}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  )
}
