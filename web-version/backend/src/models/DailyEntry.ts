import mongoose from 'mongoose';

const dailyEntrySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  rdCompleted: {
    type: Number,
    required: true,
    min: 0
  },
  rdTarget: {
    type: Number,
    required: true,
    min: 0
  },
  psHours: {
    type: Number,
    required: true,
    min: 0
  },
  psTarget: {
    type: Number,
    required: true,
    min: 0
  }
});

// Ensure each user can only have one entry per date
dailyEntrySchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model('DailyEntry', dailyEntrySchema);
