import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { connectDB } from '@/lib/server/db'
import Lead from '@/lib/server/models/Lead'
import { notifyLead } from '@/lib/server/email'

export const dynamic = 'force-dynamic'

const MAX_BYTES = 3 * 1024 * 1024
const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])

export async function POST(request) {
  try {
    const form = await request.formData()
    const name = String(form.get('name') || '')
    const email = String(form.get('email') || '')
    const phone = String(form.get('phone') || '')
    const company = String(form.get('company') || '')
    const description = String(form.get('description') || '')
    const sectorsRaw = String(form.get('sectors') || '')
    const sectors = sectorsRaw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
    const sourcePage = String(form.get('sourcePage') || '/products#custom')

    if (!name || !email || !description) {
      return NextResponse.json({ error: 'Name, email and description are required' }, { status: 400 })
    }
    if (!sectors.length) {
      return NextResponse.json({ error: 'Select at least one sector' }, { status: 400 })
    }

    let photoUrl = ''
    let photoName = ''
    const file = form.get('photo')
    if (file && typeof file === 'object' && 'arrayBuffer' in file && file.size > 0) {
      if (file.size > MAX_BYTES) {
        return NextResponse.json({ error: 'Photo must be under 3 MB' }, { status: 400 })
      }
      if (file.type && !ALLOWED.has(file.type)) {
        return NextResponse.json({ error: 'Only JPG, PNG, WEBP or GIF images allowed' }, { status: 400 })
      }
      const ext = (file.name?.split('.').pop() || 'jpg').toLowerCase().replace(/[^a-z0-9]/g, '') || 'jpg'
      const safeExt = ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext) ? ext : 'jpg'
      photoName = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`
      const dir = path.join(process.cwd(), 'public', 'uploads', 'custom')
      await mkdir(dir, { recursive: true })
      const buffer = Buffer.from(await file.arrayBuffer())
      await writeFile(path.join(dir, photoName), buffer)
      photoUrl = `/uploads/custom/${photoName}`
    }

    await connectDB()
    const ip =
      (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      ''

    const message = [
      'Customized product request',
      `Sectors: ${sectors.join(', ')}`,
      description,
      photoUrl ? `Reference photo: ${photoUrl}` : '',
    ]
      .filter(Boolean)
      .join('\n\n')

    const lead = await Lead.create({
      type: 'custom_product',
      sourcePage,
      name,
      email,
      phone,
      company,
      subject: `Custom product — ${sectors.slice(0, 2).join(', ')}`,
      message,
      meta: { sectors, description, photoUrl, photoName },
      ip,
      userAgent: request.headers.get('user-agent') || '',
    })

    try {
      const sent = await notifyLead(lead)
      if (sent) {
        lead.emailSent = true
        await lead.save()
      }
    } catch (mailErr) {
      console.error('Custom enquiry email failed:', mailErr)
    }

    return NextResponse.json({ success: true, id: lead._id, photoUrl }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to submit custom product enquiry' }, { status: 500 })
  }
}
