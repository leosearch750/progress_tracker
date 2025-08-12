import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import config from '../config/env';

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'Cet utilisateur existe déjà' });
    }

    // Create new user
    user = new User({
      username,
      password
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    // Create and return JWT token
    const payload = {
      id: user.id
    };

    jwt.sign(
      payload,
      config.jwtSecret,
      { expiresIn: '7d' }, // Utilisation d'une valeur littérale directement
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            username: user.username,
            creationDate: user.creationDate
          }
        });
      }
    );
  } catch (error) {
    console.error('Error in register:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Identifiants invalides' });
    }

    // Create and return JWT token
    const payload = {
      id: user.id
    };

    jwt.sign(
      payload,
      config.jwtSecret,
      { expiresIn: '7d' }, // Utilisation d'une valeur littérale directement
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            username: user.username,
            creationDate: user.creationDate
          }
        });
      }
    );
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @route   GET /api/auth/user
// @desc    Get user data
// @access  Private
export const getUser = async (req: Request, res: Response) => {
  try {
    // @ts-ignore - user is added by auth middleware
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error in getUser:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
