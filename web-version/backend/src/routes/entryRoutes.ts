import { Router } from 'express';
import { createEntry, getEntries, getEntryById, deleteEntry } from '../controllers/entryController';
import { auth } from '../middleware/auth';

const router = Router();

// @route   POST /api/entries
// @desc    Create a new daily entry
// @access  Private
router.post('/', auth, createEntry);

// @route   GET /api/entries
// @desc    Get all entries for a user
// @access  Private
router.get('/', auth, getEntries);

// @route   GET /api/entries/:id
// @desc    Get entry by ID
// @access  Private
router.get('/:id', auth, getEntryById);

// @route   DELETE /api/entries/:id
// @desc    Delete an entry
// @access  Private
router.delete('/:id', auth, deleteEntry);

export default router;
