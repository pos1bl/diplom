import { Schema, model } from 'mongoose';

const DiplomaSchema = new Schema({
  specialist: { type: Schema.Types.ObjectId, ref: 'Specialist', required: true },
  title: { type: String, rquired: true },
  institution: { type: String, required: true },
  specialty: { type: String, required: true },
  degree: { type: String, required: true },
  year: { type: Number },
  imageUrl: { type: String, default: '' },
}, {
  timestamps: true,
});

export default model('Diploma', DiplomaSchema);

