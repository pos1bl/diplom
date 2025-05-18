import { Schema, model } from 'mongoose';

const AvailabilitySlotSchema = new Schema({
  dayOfWeek: {
    type: String,
    enum: [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ],
    required: true,
  },
  from: { type: String, required: true }, // наприклад '09:00'
  to:   { type: String, required: true }, // наприклад '18:00'
}, { _id: false });

const SpecialistSchema = new Schema({
  // зв’язок із User
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },

  // базові дані
  dateOfBirth:          { type: Date, required: true },
  gender:               { type: String, enum: ['male','female'], required: true },
  bio:                  { type: String, default: '' },
  isFired:              { type: Boolean, default: false },

  // досвід та напрями
  yearsOfExperience:    { type: Number, default: 0 },
  mainAreas:            { type: [String], default: [] },
  secondaryAreas:       { type: [String], default: [] },
  excludedAreas:        { type: [String], default: [] },
  methods:              { type: [String], default: [] },
  specialNeeds:         { type: [String], default: [] },

  // availability як масив слотів
  availability:         { type: [AvailabilitySlotSchema], default: [] },

  // аватар, верифікація
  avatarUrl:            { type: String, default: '' },
});

SpecialistSchema.pre('save', async function(next) {
  const User = model('User');
  const user = await User.findById(this.user).lean();
  if (!user) return next(new Error('User not found'));
  if (user.role !== 'specialist')
    return next(new Error('User.role must be "specialist"'));
  next();
});

export default model('Specialist', SpecialistSchema);
