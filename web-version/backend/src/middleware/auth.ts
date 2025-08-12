import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/env';

interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Récupérer le token du header
  const token = req.header('x-auth-token');

  // Vérifier si le token existe
  if (!token) {
    return res.status(401).json({ message: 'Accès refusé, token manquant' });
  }

  try {
    // Vérifier le token
    const decoded = jwt.verify(token, config.jwtSecret) as { id: string };
    
    // Ajouter l'utilisateur à la requête
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
};
