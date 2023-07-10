import express, { NextFunction, Request, Response } from 'express';
import bikes from './controllers/bikes';
import locations from './controllers/locations';
import bookingRoutes from './controllers/bookings/bookings.controller';
import { HttpError } from 'http-errors';
import authRoutes from './controllers/auth';
import userRoutes from './controllers/user';

const app = express();

// Middleware to parse JSON data
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/bikes', bikes);
app.use('/locations', locations);
app.use('/user', userRoutes);
app.use('/bookings', bookingRoutes);
app.use('/auth', authRoutes);

// Error handling middleware
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  console.error('ERROR', err);
  const status = err.statusCode || 500;
  const message = err.message;

  res.status(status).json({ message });
});

export default app;
