import mongoose from 'mongoose';

const annualGoalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  rdTotal: {
    type: Number,
    required: true,
    min: 0
  },
  lbTotal: {
    type: Number,
    required: true,
    min: 0
  },
  lcTotal: {
    type: Number,
    required: true,
    min: 0
  },
  psTotal: {
    type: Number,
    required: true,
    min: 0
  }
});

// Ensure each user can only have one goal per year
annualGoalSchema.index({ userId: 1, year: 1 }, { unique: true });

export default mongoose.model('AnnualGoal', annualGoalSchema);
