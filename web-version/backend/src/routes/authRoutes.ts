import { Router } from 'express';
import { register, login, getUser } from '../controllers/authController';
import { auth } from '../middleware/auth';

const router = Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', login);

// @route   GET /api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, getUser);

export default router;
