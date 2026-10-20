import mongoose from 'mongoose'

const csrEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: Number, required: true },
    category: {
      type: String,
      enum: ['CSR', 'Employee Welfare', 'Health', 'Education', 'Environment'],
      default: 'CSR',
    },
    description: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    imagePublicId: { type: String, default: '' },
    isPublished: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.models.CsrEvent || mongoose.model('CsrEvent', csrEventSchema)
