import './config/sentry'; // Initialize Sentry first
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';
import * as Sentry from '@sentry/node';
const app = express();
import authRouter from './routes/auth.routes.js';
// import profileRouter from './routes/profile.routes.js';
import taskRouter from './routes/task.routes.js';
import categoryRouter from './routes/category.routes.js';
app.use(cors());
app.use(express.json());
// app.use(pinoHttp({ logger }));
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
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/categories', categoryRouter);
// import { notFoundHandler } from './middleware/notFound';
import { notFoundHandler } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
app.use(notFoundHandler);
// The Sentry error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);
app.use(errorHandler);
export default app;
