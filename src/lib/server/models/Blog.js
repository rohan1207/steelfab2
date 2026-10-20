import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, default: '' },
    content: { type: String, default: '' },
    coverImageUrl: { type: String, default: '' },
    coverImagePublicId: { type: String, default: '' },
    author: { type: String, default: 'SEPL Team' },
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: true, index: true },
    publishedAt: { type: Date, default: Date.now },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema)
