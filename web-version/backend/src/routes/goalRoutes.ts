import { Router } from 'express';
import { createOrUpdateGoal, getGoalByYear } from '../controllers/goalController';
import { auth } from '../middleware/auth';

const router = Router();

// @route   POST /api/goals
// @desc    Create or update annual goal
// @access  Private
router.post('/', auth, createOrUpdateGoal);

// @route   GET /api/goals/:year
// @desc    Get annual goal for specific year
// @access  Private
router.get('/:year', auth, getGoalByYear);

export default router;
