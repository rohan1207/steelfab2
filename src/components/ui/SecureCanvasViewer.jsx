'use client'

import { useEffect, useRef, useState } from 'react'
import { encodeDocUrl } from '@/lib/staticDocuments'

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = String(text || '').split(' ')
  let line = ''
  const lines = []
  for (let n = 0; n < words.length; n++) {
    const test = line ? `${line} ${words[n]}` : words[n]
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line)
      line = words[n]
    } else {
      line = test
    }
  }
  if (line) lines.push(line)
  const startY = y - ((lines.length - 1) * lineHeight) / 2
  lines.forEach((l, i) => ctx.fillText(l, x, startY + i * lineHeight))
}

/**
 * Canvas-backed viewer so pixels can be wiped to gray+copyright on capture.
 * Native apps (GPay) use OS FLAG_SECURE — browsers cannot.
 */
export default function SecureCanvasViewer({ src, format, wipe, copyright, disclaimer }) {
  const canvasRef = useRef(null)
  const backupRef = useRef(null)
  const pdfRef = useRef(null)
  const [page, setPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)
  const [status, setStatus] = useState('loading')
  const [pdfTick, setPdfTick] = useState(0)
  const url = encodeDocUrl(src)

  const paintCopyright = (canvas, w, h) => {
    const ctx = canvas.getContext('2d')
    ctx.save()
    ctx.fillStyle = '#e5e7eb'
    ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = '#111827'
    ctx.font = '600 22px system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    wrapText(ctx, copyright, w / 2, h / 2 - 36, w * 0.8, 28)
    ctx.fillStyle = '#4b5563'
    ctx.font = '400 14px system-ui, sans-serif'
    wrapText(ctx, disclaimer, w / 2, h / 2 + 40, w * 0.75, 20)
    ctx.restore()
  }

  const snapshot = (canvas) => {
    try {
      const backup = document.createElement('canvas')
      backup.width = canvas.width
      backup.height = canvas.height
      backup.getContext('2d').drawImage(canvas, 0, 0)
      backupRef.current = backup
    } catch {
      backupRef.current = null
    }
  }

  const restore = (canvas) => {
    const backup = backupRef.current
    if (!backup) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(backup, 0, 0)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !canvas.width) return
    if (wipe) paintCopyright(canvas, canvas.width, canvas.height)
    else restore(canvas)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wipe])

  // Image
  useEffect(() => {
    if (format !== 'image' || !url) return undefined
    let cancelled = false
    setStatus('loading')
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => {
      if (cancelled) return
      const canvas = canvasRef.current
      if (!canvas) return
      const maxW = Math.min(1100, canvas.parentElement?.clientWidth || 900)
      const scale = Math.min(1, maxW / img.naturalWidth)
      const w = Math.max(1, Math.floor(img.naturalWidth * scale))
      const h = Math.max(1, Math.floor(img.naturalHeight * scale))
      canvas.width = w
      canvas.height = h
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, w, h)
      ctx.drawImage(img, 0, 0, w, h)
      snapshot(canvas)
      setPageCount(1)
      setStatus('ready')
      if (wipe) paintCopyright(canvas, w, h)
    }
    img.onerror = () => !cancelled && setStatus('error')
    img.src = url
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, format])

  // PDF load
  useEffect(() => {
    if (format !== 'pdf' || !url) return undefined
    let cancelled = false
    setStatus('loading')
    pdfRef.current = null

    ;(async () => {
      try {
        const pdfjs = await import('pdfjs-dist')
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          'pdfjs-dist/build/pdf.worker.min.mjs',
          import.meta.url
        ).toString()
        const pdf = await pdfjs.getDocument({ url }).promise
        if (cancelled) return
        pdfRef.current = pdf
        setPageCount(pdf.numPages)
        setPage(1)
        setPdfTick((t) => t + 1)
      } catch (err) {
        console.error(err)
        if (!cancelled) setStatus('error')
      }
    })()

    return () => {
      cancelled = true
      pdfRef.current = null
    }
  }, [url, format])

  // PDF page render
  useEffect(() => {
    if (format !== 'pdf' || !pdfRef.current || !pdfTick) return undefined
    let cancelled = false

    ;(async () => {
      try {
        const pdf = pdfRef.current
        const pdfPage = await pdf.getPage(page)
        if (cancelled) return
        const canvas = canvasRef.current
        if (!canvas) return
        const maxW = Math.min(1100, canvas.parentElement?.clientWidth || 900)
        const unscaled = pdfPage.getViewport({ scale: 1 })
        const scale = maxW / unscaled.width
        const viewport = pdfPage.getViewport({ scale })
        canvas.width = Math.floor(viewport.width)
        canvas.height = Math.floor(viewport.height)
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        await pdfPage.render({ canvasContext: ctx, viewport }).promise
        if (cancelled) return
        snapshot(canvas)
        setStatus('ready')
        if (wipe) paintCopyright(canvas, canvas.width, canvas.height)
      } catch (err) {
        console.error(err)
        if (!cancelled) setStatus('error')
      }
    })()

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pdfTick, format])

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div className="relative max-h-[78vh] w-full overflow-auto rounded-xl bg-slate-200">
        <canvas
          ref={canvasRef}
          className="mx-auto block max-w-full select-none"
          style={{ WebkitUserDrag: 'none' }}
          onContextMenu={(e) => e.preventDefault()}
        />
        {status === 'loading' && (
          <p className="absolute inset-0 flex items-center justify-center bg-slate-100/80 text-sm text-slate-600">
            Loading…
          </p>
        )}
        {status === 'error' && (
          <p className="absolute inset-0 flex items-center justify-center bg-slate-100/90 p-6 text-center text-sm text-red-600">
            Preview unavailable. Please request this document via the enquiry form.
          </p>
        )}
      </div>
      {format === 'pdf' && pageCount > 1 && (
        <div className="flex items-center gap-3 text-sm text-white">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-full bg-white/15 px-3 py-1.5 disabled:opacity-40"
          >
            Prev
          </button>
          <span>
            Page {page} / {pageCount}
          </span>
          <button
            type="button"
            disabled={page >= pageCount}
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            className="rounded-full bg-white/15 px-3 py-1.5 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
