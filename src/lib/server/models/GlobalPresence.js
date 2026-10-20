import mongoose from 'mongoose'

const globalPresenceSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    type: { type: String, enum: ['country', 'region'], default: 'country' },
    clientSegment: {
      type: String,
      enum: ['Middle East', 'Africa', 'Europe & Others'],
      required: true,
    },
    countryCode: { type: String, default: '' },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: (v) => Array.isArray(v) && v.length === 2,
        message: 'coordinates must be [longitude, latitude]',
      },
    },
    summary: { type: String, default: '' },
    description: { type: String, default: '' },
    highlights: [{ type: String }],
    projects: [
      {
        title: { type: String, required: true },
        summary: { type: String, default: '' },
        status: { type: String, default: 'Delivered' },
      },
    ],
    image: { type: String, default: '' },
    imagePublicId: { type: String, default: '' },
    isPublished: { type: Boolean, default: true, index: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.models.GlobalPresence || mongoose.model('GlobalPresence', globalPresenceSchema)
