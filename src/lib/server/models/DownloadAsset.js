import mongoose from 'mongoose'

const downloadAssetSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ['Brochure', 'Datasheet', 'Catalog', 'Certificate', 'Policy', 'Other'],
      default: 'Brochure',
    },
    category: {
      type: String,
      enum: ['product', 'compliance', 'general'],
      default: 'product',
    },
    fileUrl: { type: String, default: '' },
    filePublicId: { type: String, default: '' },
    sizeLabel: { type: String, default: '' },
    productSlug: { type: String, default: '' },
    isPublished: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.models.DownloadAsset || mongoose.model('DownloadAsset', downloadAssetSchema)
