import mongoose from 'mongoose';

const importunitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  counter: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  }
});

export default mongoose.model('Importunity', importunitySchema);
