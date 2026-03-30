import "dotenv/config";
import express from "express";
import swaggerUi from 'swagger-ui-express';
import specs from './config/swagger.js';
import authRouter from './routes/auth.routes.js';
import profileRouter from './routes/profile.routes.js';
import taskRouter from './routes/task.routes.js';
import categoryRouter from './routes/category.routes.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customSiteTitle: 'Task Management API Docs',
}));
// Routes
app.use('/auth', authRouter);
app.use('/profile', profileRouter);
app.use('/tasks', taskRouter);
app.use('/categories', categoryRouter);
// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is healthy',
        uptime: process.uptime(),
    });
});
// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found',
    });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📖 Swagger Docs available at http://localhost:${PORT}/api-docs`);
});
export default app;
