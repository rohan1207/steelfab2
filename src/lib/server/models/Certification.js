import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, default: '' },
    caption: { type: String, default: '' },
  },
  { _id: false }
)

const certificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    category: {
      type: String,
      enum: ['Company Certificate', 'Vendor Certificate', 'Quality & Compliance', 'Other'],
      default: 'Company Certificate',
    },
    images: { type: [imageSchema], default: [] },
    isPublished: { type: Boolean, default: true, index: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.models.Certification || mongoose.model('Certification', certificationSchema)
