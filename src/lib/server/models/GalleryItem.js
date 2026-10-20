import mongoose from 'mongoose'

const galleryItemSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    category: { type: String, default: 'General' },
    image: { type: String, default: '' },
    imagePublicId: { type: String, default: '' },
    href: { type: String, default: '' },
    layout: {
      type: String,
      enum: ['hero', 'wide', 'tall', 'medium', 'default'],
      default: 'default',
    },
    isPublished: { type: Boolean, default: true, index: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.models.GalleryItem || mongoose.model('GalleryItem', galleryItemSchema)
