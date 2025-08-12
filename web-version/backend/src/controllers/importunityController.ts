import { Request, Response } from 'express';
import Importunity from '../models/Importunity';

// @route   POST /api/importunities
// @desc    Create a new importunity
// @access  Private
export const createImportunity = async (req: Request, res: Response) => {
  try {
    const { date, subject, counter } = req.body;
    // @ts-ignore - user is added by auth middleware
    const userId = req.user.id;

    const importunity = new Importunity({
      userId,
      date: new Date(date),
      subject,
      counter
    });

    const savedImportunity = await importunity.save();
    res.status(201).json(savedImportunity);
  } catch (error) {
    console.error('Error in createImportunity:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @route   GET /api/importunities
// @desc    Get all importunities for a user
// @access  Private
export const getImportunities = async (req: Request, res: Response) => {
  try {
    // @ts-ignore - user is added by auth middleware
    const userId = req.user.id;
    
    const importunities = await Importunity.find({ userId }).sort({ date: -1 });
    res.json(importunities);
  } catch (error) {
    console.error('Error in getImportunities:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @route   GET /api/importunities/:id
// @desc    Get importunity by ID
// @access  Private
export const getImportunityById = async (req: Request, res: Response) => {
  try {
    const importunityId = req.params.id;
    // @ts-ignore - user is added by auth middleware
    const userId = req.user.id;
    
    const importunity = await Importunity.findOne({ _id: importunityId, userId });
    
    if (!importunity) {
      return res.status(404).json({ message: 'Importunité non trouvée' });
    }
    
    res.json(importunity);
  } catch (error) {
    console.error('Error in getImportunityById:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @route   PUT /api/importunities/:id
// @desc    Update importunity counter
// @access  Private
export const updateImportunityCounter = async (req: Request, res: Response) => {
  try {
    const importunityId = req.params.id;
    const { counter } = req.body;
    // @ts-ignore - user is added by auth middleware
    const userId = req.user.id;
    
    const importunity = await Importunity.findOne({ _id: importunityId, userId });
    
    if (!importunity) {
      return res.status(404).json({ message: 'Importunité non trouvée' });
    }
    
    importunity.counter = counter;
    const updatedImportunity = await importunity.save();
    
    res.json(updatedImportunity);
  } catch (error) {
    console.error('Error in updateImportunityCounter:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @route   DELETE /api/importunities/:id
// @desc    Delete an importunity
// @access  Private
export const deleteImportunity = async (req: Request, res: Response) => {
  try {
    const importunityId = req.params.id;
    // @ts-ignore - user is added by auth middleware
    const userId = req.user.id;
    
    const importunity = await Importunity.findOne({ _id: importunityId, userId });
    
    if (!importunity) {
      return res.status(404).json({ message: 'Importunité non trouvée' });
    }
    
    await Importunity.deleteOne({ _id: importunityId });
    
    res.json({ message: 'Importunité supprimée avec succès' });
  } catch (error) {
    console.error('Error in deleteImportunity:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
