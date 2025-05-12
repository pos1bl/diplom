import { Schema, model } from 'mongoose';

const DiplomaSchema = new Schema({
  specialist: { type: Schema.Types.ObjectId, ref: 'Specialist', required: true },
  institution: { type: String, required: true },
  specialty: { type: String, required: true },
  degree: { type: String, required: true },
  year: { type: Number },         
}, {
  timestamps: true,
});

export default model('Diploma', DiplomaSchema);

