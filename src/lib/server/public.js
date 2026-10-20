import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/server/db'
import Lead from '@/lib/server/models/Lead'
import { notifyLead } from '@/lib/server/email'

/**
 * Run a list query. On any failure (no MONGODB_URI, connection error, ...) respond with []
 * so the client hooks fall back to their dummy/static data.
 */
export async function listResponse(query) {
  try {
    await connectDB()
    const items = await query()
    return NextResponse.json(items)
  } catch (e) {
    console.error(e)
    return NextResponse.json([])
  }
}

/** Find a single document by slug. 404 JSON if missing, 503 JSON if DB unavailable. */
export async function itemResponse(query, transform) {
  try {
    await connectDB()
    const item = await query()
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(transform ? await transform(item) : item)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }
}

export async function createLead(request) {
  try {
    const body = (await request.json().catch(() => ({}))) || {}
    await connectDB()
    const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || request.headers.get('x-real-ip') || ''
    const lead = await Lead.create({
      type: body.type || body.formType || 'general_enquiry',
      sourcePage: body.sourcePage || body.page || '',
      productSlug: body.productSlug || '',
      name: body.name || '',
      email: body.email || '',
      phone: body.phone || '',
      company: body.company || '',
      subject: body.subject || '',
      message: body.message || '',
      jobId: body.jobId || '',
      jobTitle: body.jobTitle || '',
      assetId: body.assetId || '',
      assetTitle: body.assetTitle || '',
      complianceDoc: body.complianceDoc || '',
      meta: body.meta || {},
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
      console.error('Lead email failed:', mailErr)
    }
    return NextResponse.json({ success: true, id: lead._id }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to record submission' }, { status: 500 })
  }
}
