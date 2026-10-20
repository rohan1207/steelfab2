'use client'

/**
 * View-only media: blocks context menu, drag, and common save shortcuts.
 * Cannot fully prevent screenshots (OS-level), but reduces casual download/copy.
 */
export default function ProtectedMedia({ src, alt = '', className = '', fit = 'contain' }) {
  if (!src) return null

  return (
    <div
      className={`relative select-none ${className}`}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        draggable={false}
        className={`w-full h-full pointer-events-none ${fit === 'cover' ? 'object-cover' : 'object-contain'}`}
        style={{ WebkitUserDrag: 'none', userSelect: 'none' }}
      />
      {/* Transparent overlay blocks direct image interaction / “Save image as” */}
      <div className="absolute inset-0 z-[1]" aria-hidden />
    </div>
  )
}
