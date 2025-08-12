import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db';
import config from './config/env';

// Routes
import authRoutes from './routes/authRoutes';
import goalRoutes from './routes/goalRoutes';
import entryRoutes from './routes/entryRoutes';
import importunityRoutes from './routes/importunityRoutes';

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: config.corsOrigin
}));
app.use(helmet());
app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/entries', entryRoutes);
app.use('/api/importunities', importunityRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({ message: 'API ProgressTracker' });
});

// Start server
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
