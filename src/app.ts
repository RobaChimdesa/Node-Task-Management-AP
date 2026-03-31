import './config/sentry'; // Initialize Sentry first
import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import swaggerUi from 'swagger-ui-express';
import { logger } from './config/logger';
import { swaggerSpec } from './config/swagger';
import * as Sentry from '@sentry/node';

const app = express();

import { authRoutes } from './routes/auth.routes';
import { categoryRoutes } from './routes/category.routes';
import { taskRoutes } from './routes/task.routes';

app.use(cors());
app.use(express.json());
app.use(pinoHttp({ logger }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Welcome to the Task Management API',
    version: '1.0.0',
    documentation: '/api-docs',
    health: '/health'
  });
});

app.get('/debug-sentry', (req, res) => {
  throw new Error('Sentry Debug Error');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/categories', categoryRoutes);

import { notFoundHandler } from './middleware/notFound';
import { errorHandler } from './middleware/errorHandler';

app.use(notFoundHandler);

// The Sentry error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

app.use(errorHandler);


export default app;