import mongoose from 'mongoose'

const highlightSchema = new mongoose.Schema(
  {
    label: { type: String, default: '' },
    value: { type: String, default: '' },
  },
  { _id: false }
)

const galleryImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, default: '' },
  },
  { _id: false }
)

const productSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    imagePublicId: { type: String, default: '' },
    icon: { type: String, default: 'âš™ï¸' },
    tag: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    heroImage: { type: String, default: '' },
    heroImagePublicId: { type: String, default: '' },
    gallery: { type: [galleryImageSchema], default: [] },
    intro: { type: [String], default: [] },
    highlights: { type: [highlightSchema], default: [] },
    features: { type: [String], default: [] },
    applications: { type: [String], default: [] },
    specifications: { type: [String], default: [] },
    clients: { type: [String], default: [] },
    isPublished: { type: Boolean, default: true, index: true },
    isFeatured: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.models.Product || mongoose.model('Product', productSchema)
