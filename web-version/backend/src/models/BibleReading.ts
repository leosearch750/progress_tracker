import mongoose from 'mongoose';

const bibleReadingSchema = new mongoose.Schema({
  entryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DailyEntry',
    required: true
  },
  chaptersCount: {
    type: Number,
    required: true,
    min: 0
  },
  chaptersTarget: {
    type: Number,
    required: true,
    min: 0
  },
  chaptersList: {
    type: [String],
    default: []
  }
});

export default mongoose.model('BibleReading', bibleReadingSchema);
