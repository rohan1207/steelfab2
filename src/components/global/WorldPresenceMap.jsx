'use client'

import { useRouter } from 'next/navigation'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

function PresenceMarker({ location, onSelect }) {
  const [lng, lat] = location.coordinates
  return (
    <Marker coordinates={[lng, lat]}>
      <g
        role="button"
        tabIndex={0}
        className="cursor-pointer outline-none"
        onClick={() => onSelect(location.slug)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onSelect(location.slug)
          }
        }}
        aria-label={`View presence in ${location.title}`}
      >
        <circle r={18} fill="rgba(99,102,241,0.2)" className="animate-ping" />
        <circle r={12} fill="rgba(129,140,248,0.15)" />
        <circle r={7} fill="#4f46e5" stroke="#e0e7ff" strokeWidth={2} />
        <circle r={2.5} fill="#ffffff" />
        <title>{location.title}</title>
      </g>
    </Marker>
  )
}

export default function WorldPresenceMap({ locations, className = '' }) {
  const router = useRouter()

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-indigo-500/20 bg-gradient-to-b from-slate-900 via-navy-950 to-slate-950 shadow-[0_20px_60px_rgba(30,27,75,0.25)] ${className}`}
    >
      <div className="w-full min-h-[240px] sm:min-h-[340px] lg:min-h-[420px] [&_svg]:w-full [&_svg]:h-auto">
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{ scale: 155, center: [12, 4] }}
          width={800}
          height={420}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#1e293b"
                  stroke="#475569"
                  strokeWidth={0.35}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: '#334155', outline: 'none', cursor: 'default' },
                    pressed: { fill: '#334155', outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>
          {locations.map((loc) => (
            <PresenceMarker
              key={loc.slug}
              location={loc}
              onSelect={(slug) => router.push(`/global/${slug}`)}
            />
          ))}
        </ComposableMap>
      </div>

      <p className="text-center text-indigo-200/80 text-[11px] sm:text-[12px] py-2.5 sm:py-3 border-t border-white/5 px-3">
        Tap a pulsing pin to explore clients &amp; projects in that market
      </p>
    </div>
  )
}
