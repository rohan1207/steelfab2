import mongoose from 'mongoose'

export const LEAD_TYPES = [
  'product_inquiry',
  'custom_product',
  'purchase_vendor',
  'career_application',
  'career_visit',
  'asset_download',
  'compliance_view',
  'general_enquiry',
  'contact',
  'page_view',
]

const leadSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, enum: LEAD_TYPES, index: true },
    sourcePage: { type: String, default: '' },
    productSlug: { type: String, default: '' },
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    company: { type: String, default: '' },
    subject: { type: String, default: '' },
    message: { type: String, default: '' },
    jobId: { type: String, default: '' },
    jobTitle: { type: String, default: '' },
    assetId: { type: String, default: '' },
    assetTitle: { type: String, default: '' },
    complianceDoc: { type: String, default: '' },
    meta: { type: mongoose.Schema.Types.Mixed, default: {} },
    ip: { type: String, default: '' },
    userAgent: { type: String, default: '' },
    emailSent: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.models.Lead || mongoose.model('Lead', leadSchema)
