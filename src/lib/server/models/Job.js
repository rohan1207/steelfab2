import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    department: { type: String, default: 'General' },
    location: { type: String, default: 'Pune, Maharashtra' },
    type: { type: String, default: 'Full Time' },
    experience: { type: String, default: '' },
    description: { type: String, default: '' },
    /** Full job description (JD) */
    jd: { type: String, default: '' },
    education: { type: String, default: '' },
    /** Key Result Areas */
    kra: [{ type: String }],
    certificates: [{ type: String }],
    requirements: [{ type: String }],
    isActive: { type: Boolean, default: true, index: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.models.Job || mongoose.model('Job', jobSchema)
