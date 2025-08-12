import dotenv from 'dotenv';
import path from 'path';

// Charger les variables d'environnement
dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/progress-tracker',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  jwtExpiration: process.env.JWT_EXPIRATION || '7d',
  environment: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173'
};

export default config;
