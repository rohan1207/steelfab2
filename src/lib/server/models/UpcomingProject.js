import mongoose from 'mongoose'

const upcomingProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, default: '' },
    description: { type: String, default: '' },
    status: { type: String, default: 'In Progress' },
    category: { type: String, default: 'Facility Expansion' },
    imageUrl: { type: String, default: '' },
    imagePublicId: { type: String, default: '' },
    expectedDate: { type: Date },
    isPublished: { type: Boolean, default: true, index: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.models.UpcomingProject || mongoose.model('UpcomingProject', upcomingProjectSchema)
