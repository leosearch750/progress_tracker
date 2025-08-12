import mongoose from 'mongoose';

const christianReadingSchema = new mongoose.Schema({
  entryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DailyEntry',
    required: true
  },
  pagesCount: {
    type: Number,
    required: true,
    min: 0
  },
  bookName: {
    type: String,
    required: true,
    trim: true
  }
});

export default mongoose.model('ChristianReading', christianReadingSchema);
