import { Request, Response } from 'express';
import DailyEntry from '../models/DailyEntry';
import BibleReading from '../models/BibleReading';
import ChristianReading from '../models/ChristianReading';

// @route   POST /api/entries
// @desc    Create a new daily entry
// @access  Private
export const createEntry = async (req: Request, res: Response) => {
  try {
    const { 
      date, 
      rdCompleted, 
      rdTarget, 
      psHours, 
      psTarget, 
      bibleReading, 
      christianReading 
    } = req.body;
    
    // @ts-ignore - user is added by auth middleware
    const userId = req.user.id;

    // Check if entry already exists for this date
    const existingEntry = await DailyEntry.findOne({ 
      userId, 
      date: new Date(date) 
    });

    if (existingEntry) {
      return res.status(400).json({ 
        message: 'Une entrée existe déjà pour cette date' 
      });
    }

    // Create new entry
    const entry = new DailyEntry({
      userId,
      date: new Date(date),
      rdCompleted,
      rdTarget,
      psHours,
      psTarget
    });

    const savedEntry = await entry.save();

    // Add Bible reading if provided
    if (bibleReading) {
      const newBibleReading = new BibleReading({
        entryId: savedEntry._id,
        chaptersCount: bibleReading.chaptersCount,
        chaptersTarget: bibleReading.chaptersTarget,
        chaptersList: bibleReading.chaptersList
      });
      await newBibleReading.save();
    }

    // Add Christian reading if provided
    if (christianReading) {
      const newChristianReading = new ChristianReading({
        entryId: savedEntry._id,
        pagesCount: christianReading.pagesCount,
        bookName: christianReading.bookName
      });
      await newChristianReading.save();
    }

    res.status(201).json(savedEntry);
  } catch (error) {
    console.error('Error in createEntry:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @route   GET /api/entries
// @desc    Get all entries for a user
// @access  Private
export const getEntries = async (req: Request, res: Response) => {
  try {
    // @ts-ignore - user is added by auth middleware
    const userId = req.user.id;
    
    const entries = await DailyEntry.find({ userId }).sort({ date: -1 });
    
    // Get related readings for each entry
    const entriesWithReadings = await Promise.all(entries.map(async (entry) => {
      const bibleReading = await BibleReading.findOne({ entryId: entry._id });
      const christianReading = await ChristianReading.findOne({ entryId: entry._id });
      
      return {
        ...entry.toObject(),
        bibleReading,
        christianReading
      };
    }));
    
    res.json(entriesWithReadings);
  } catch (error) {
    console.error('Error in getEntries:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @route   GET /api/entries/:id
// @desc    Get entry by ID
// @access  Private
export const getEntryById = async (req: Request, res: Response) => {
  try {
    const entryId = req.params.id;
    // @ts-ignore - user is added by auth middleware
    const userId = req.user.id;
    
    const entry = await DailyEntry.findOne({ _id: entryId, userId });
    
    if (!entry) {
      return res.status(404).json({ message: 'Entrée non trouvée' });
    }
    
    const bibleReading = await BibleReading.findOne({ entryId });
    const christianReading = await ChristianReading.findOne({ entryId });
    
    res.json({
      ...entry.toObject(),
      bibleReading,
      christianReading
    });
  } catch (error) {
    console.error('Error in getEntryById:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @route   DELETE /api/entries/:id
// @desc    Delete an entry
// @access  Private
export const deleteEntry = async (req: Request, res: Response) => {
  try {
    const entryId = req.params.id;
    // @ts-ignore - user is added by auth middleware
    const userId = req.user.id;
    
    const entry = await DailyEntry.findOne({ _id: entryId, userId });
    
    if (!entry) {
      return res.status(404).json({ message: 'Entrée non trouvée' });
    }
    
    // Delete related readings
    await BibleReading.deleteOne({ entryId });
    await ChristianReading.deleteOne({ entryId });
    
    // Delete the entry
    await DailyEntry.deleteOne({ _id: entryId });
    
    res.json({ message: 'Entrée supprimée avec succès' });
  } catch (error) {
    console.error('Error in deleteEntry:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
