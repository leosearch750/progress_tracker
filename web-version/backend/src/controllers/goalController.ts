import { Request, Response } from 'express';
import AnnualGoal from '../models/AnnualGoal';

// @route   POST /api/goals
// @desc    Create or update annual goal
// @access  Private
export const createOrUpdateGoal = async (req: Request, res: Response) => {
  try {
    const { year, rdTotal, lbTotal, lcTotal, psTotal } = req.body;
    // @ts-ignore - user is added by auth middleware
    const userId = req.user.id;

    // Check if goal already exists for this user and year
    let goal = await AnnualGoal.findOne({ userId, year });

    if (goal) {
      // Update existing goal
      goal.rdTotal = rdTotal;
      goal.lbTotal = lbTotal;
      goal.lcTotal = lcTotal;
      goal.psTotal = psTotal;
    } else {
      // Create new goal
      goal = new AnnualGoal({
        userId,
        year,
        rdTotal,
        lbTotal,
        lcTotal,
        psTotal
      });
    }

    await goal.save();
    res.json(goal);
  } catch (error) {
    console.error('Error in createOrUpdateGoal:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @route   GET /api/goals/:year
// @desc    Get annual goal for specific year
// @access  Private
export const getGoalByYear = async (req: Request, res: Response) => {
  try {
    // @ts-ignore - user is added by auth middleware
    const userId = req.user.id;
    const year = parseInt(req.params.year);

    const goal = await AnnualGoal.findOne({ userId, year });

    if (!goal) {
      return res.status(404).json({ message: 'Objectif non trouvé pour cette année' });
    }

    res.json(goal);
  } catch (error) {
    console.error('Error in getGoalByYear:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
