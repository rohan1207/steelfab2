'use client'

/**
 * Light brand-tinted checks grid. Soft lines by default;
 * darker lines reveal under a radial mask (driven by CSS vars from the parent).
 */
export default function ChecksHoverBg() {
  const CELL = 52

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        backgroundColor: '#f4f5fb',
        backgroundImage: `
          linear-gradient(45deg, rgba(46, 49, 146, 0.045) 25%, transparent 25%),
          linear-gradient(-45deg, rgba(46, 49, 146, 0.045) 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, rgba(46, 49, 146, 0.045) 75%),
          linear-gradient(-45deg, transparent 75%, rgba(46, 49, 146, 0.045) 75%)
        `,
        backgroundSize: `${CELL * 2}px ${CELL * 2}px`,
        backgroundPosition: `0 0, 0 ${CELL}px, ${CELL}px -${CELL}px, -${CELL}px 0`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(46, 49, 146, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(46, 49, 146, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: `${CELL}px ${CELL}px`,
        }}
      />

      <div
        className="absolute inset-0 transition-opacity duration-200"
        style={{
          opacity: 'var(--checks-glow, 0)',
          backgroundImage: `
            linear-gradient(to right, rgba(46, 49, 146, 0.45) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(46, 49, 146, 0.45) 1px, transparent 1px)
          `,
          backgroundSize: `${CELL}px ${CELL}px`,
          WebkitMaskImage:
            'radial-gradient(circle 170px at var(--checks-mx, 50%) var(--checks-my, 40%), #000 0%, transparent 72%)',
          maskImage:
            'radial-gradient(circle 170px at var(--checks-mx, 50%) var(--checks-my, 40%), #000 0%, transparent 72%)',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-[#f4f5fb]/85 via-transparent to-[#eef0f9]/65" />
    </div>
  )
}
