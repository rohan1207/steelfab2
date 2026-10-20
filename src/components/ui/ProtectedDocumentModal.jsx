'use client'

import { useCallback, useEffect, useState } from 'react'
import { X } from 'lucide-react'
import SecureCanvasViewer from '@/components/ui/SecureCanvasViewer'

const COPYRIGHT = '© Steel Fab Engineers Pvt. Ltd. (SEPL) — All rights reserved.'
const DISCLAIMER =
  'Confidential document. Screenshots and screen recordings of this content are not permitted. Captured frames show only this notice.'

function isCoarsePointer() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0
}

/**
 * Banking-style blank capture (best-effort on web):
 * GPay/PhonePe use OS FLAG_SECURE (native apps). Browsers cannot set that.
 * Desktop: wipe on blur / PrintScreen / Win+Shift+S / tab hide.
 * Phone: only wipe when the tab/app is actually hidden — mobile browsers
 * constantly fire blur/hasFocus=false (URL bar, sheets), which used to leave
 * the gray shield stuck and make certificates unreadable.
 */
export default function ProtectedDocumentModal({ doc, onClose }) {
  const [shield, setShield] = useState(false)

  const raiseShield = useCallback(() => {
    setShield(true)
  }, [])

  const lowerShield = useCallback(() => {
    if (document.visibilityState === 'visible') {
      setShield(false)
    }
  }, [])

  useEffect(() => {
    if (!doc) return undefined

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const touchUi = isCoarsePointer()

    const onVis = () => {
      if (document.visibilityState !== 'visible') raiseShield()
      else lowerShield()
    }
    const onBlur = () => {
      if (!touchUi) raiseShield()
    }
    const onFocus = () => lowerShield()
    const onKeyDown = (e) => {
      const k = e.key
      if (
        k === 'PrintScreen' ||
        k === 'F12' ||
        ((e.ctrlKey || e.metaKey) && ['s', 'p', 'u'].includes(k.toLowerCase())) ||
        (e.metaKey && e.shiftKey) ||
        (e.ctrlKey && e.shiftKey && ['s', 'i', 'j'].includes(k.toLowerCase())) ||
        (e.shiftKey && (k === 's' || k === 'S') && (e.metaKey || e.key === 'Meta'))
      ) {
        e.preventDefault()
        raiseShield()
      }
      if (k === 'Escape') onClose()
    }
    const onKeyUp = (e) => {
      if (e.key === 'PrintScreen') raiseShield()
    }
    const onContext = (e) => e.preventDefault()
    const onBeforePrint = () => raiseShield()

    // Desktop only: snipping tools steal window focus without hiding the tab.
    // On phones this poll falsely trips every time Chrome/Safari chrome steals focus.
    const interval = touchUi
      ? null
      : window.setInterval(() => {
          if (!document.hasFocus() || document.visibilityState !== 'visible') {
            raiseShield()
          }
        }, 200)

    document.addEventListener('visibilitychange', onVis)
    window.addEventListener('blur', onBlur)
    window.addEventListener('focus', onFocus)
    window.addEventListener('keydown', onKeyDown, true)
    window.addEventListener('keyup', onKeyUp, true)
    document.addEventListener('contextmenu', onContext)
    window.addEventListener('beforeprint', onBeforePrint)

    return () => {
      document.body.style.overflow = prevOverflow
      if (interval != null) window.clearInterval(interval)
      document.removeEventListener('visibilitychange', onVis)
      window.removeEventListener('blur', onBlur)
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('keydown', onKeyDown, true)
      window.removeEventListener('keyup', onKeyUp, true)
      document.removeEventListener('contextmenu', onContext)
      window.removeEventListener('beforeprint', onBeforePrint)
    }
  }, [doc, onClose, raiseShield, lowerShield])

  if (!doc) return null

  return (
    <div
      className="fixed inset-0 z-[220] flex items-center justify-center bg-slate-950/90 p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div
        data-print-shield
        className={`fixed inset-0 z-[230] flex flex-col items-center justify-center bg-gray-200 px-6 text-center transition-opacity duration-75 ${
          shield ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!shield}
      >
        <p className="text-slate-900 text-lg sm:text-2xl font-700 mb-4">{COPYRIGHT}</p>
        <p className="text-slate-600 text-sm sm:text-base max-w-lg leading-relaxed">{DISCLAIMER}</p>
        {shield && (
          <button
            type="button"
            className="mt-8 min-h-11 px-5 py-2.5 rounded-full bg-slate-900 text-white text-sm font-600"
            onClick={lowerShield}
          >
            Continue viewing
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-[225] flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/25"
        aria-label="Close"
      >
        <X size={22} />
      </button>

      <div className="relative z-[221] w-full max-w-5xl flex flex-col max-h-[92vh]">
        <div className="text-center mb-3 px-4 pr-14 sm:px-10">
          <p className="text-white font-600 text-sm sm:text-base">{doc.title}</p>
        </div>

        <SecureCanvasViewer
          src={doc.file}
          format={doc.format === 'image' ? 'image' : 'pdf'}
          wipe={shield}
          copyright={COPYRIGHT}
          disclaimer={DISCLAIMER}
        />
      </div>
    </div>
  )
}
