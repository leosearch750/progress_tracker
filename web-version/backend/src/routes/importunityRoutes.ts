import { Router } from 'express';
import { 
  createImportunity, 
  getImportunities, 
  getImportunityById, 
  updateImportunityCounter, 
  deleteImportunity 
} from '../controllers/importunityController';
import { auth } from '../middleware/auth';

const router = Router();

// @route   POST /api/importunities
// @desc    Create a new importunity
// @access  Private
router.post('/', auth, createImportunity);

// @route   GET /api/importunities
// @desc    Get all importunities for a user
// @access  Private
router.get('/', auth, getImportunities);

// @route   GET /api/importunities/:id
// @desc    Get importunity by ID
// @access  Private
router.get('/:id', auth, getImportunityById);

// @route   PUT /api/importunities/:id
// @desc    Update importunity counter
// @access  Private
router.put('/:id', auth, updateImportunityCounter);

// @route   DELETE /api/importunities/:id
// @desc    Delete an importunity
// @access  Private
router.delete('/:id', auth, deleteImportunity);

export default router;
