import nodemailer from 'nodemailer'

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: false,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
}

function formatLeadHtml(lead) {
  const rows = Object.entries({
    Type: lead.type,
    'Source Page': lead.sourcePage,
    'Product Slug': lead.productSlug,
    Name: lead.name,
    Email: lead.email,
    Phone: lead.phone,
    Company: lead.company,
    Subject: lead.subject,
    Message: lead.message,
    'Job Title': lead.jobTitle,
    'Asset': lead.assetTitle,
    'Compliance Doc': lead.complianceDoc,
    'Submitted At': new Date(lead.createdAt || Date.now()).toISOString(),
  })
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:600;">${k}</td><td style="padding:6px 12px;">${v}</td></tr>`)
    .join('')

  return `<div style="font-family:Arial,sans-serif;"><h2>SEPL Website Lead — ${lead.type}</h2><table border="1" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-color:#e2e8f0;">${rows}</table></div>`
}

export async function notifyLead(lead) {
  const to = process.env.NOTIFY_EMAIL || 'response@steelfabeng.com'
  const transporter = getTransporter()
  if (!transporter) {
    console.warn('SMTP not configured — lead saved to DB only:', lead.type)
    return false
  }

  const subject = `[SEPL ${lead.type}] ${lead.name || lead.email || 'New submission'}`
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    html: formatLeadHtml(lead),
  })
  return true
}
