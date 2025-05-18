import { Schema, model } from 'mongoose'

const SessionSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    specialist: { type: Schema.Types.ObjectId, ref: 'Specialist', required: true },
    scheduledAt: { type: Date, required: true },
    isFree: { type: Boolean, default: false },
    status: { type: String, enum: ['scheduled', 'completed', 'cancelled', 'no-show'], default: 'scheduled' },
    notes: { type: String },
  },
  {
    timestamps: true
  }
)

export default model('Session', SessionSchema);
