import mongoose from 'mongoose'

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, index: true },
    image: { type: String, default: '' },
    imagePublicId: { type: String, default: '' },
    type: { type: String, enum: ['domestic', 'export'], required: true, index: true },
    segment: { type: String, required: true, index: true },
    presenceSlug: { type: String, default: '', index: true },
    isPublished: { type: Boolean, default: true, index: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
)

clientSchema.index({ type: 1, slug: 1 }, { unique: true })

export default mongoose.models.Client || mongoose.model('Client', clientSchema)
