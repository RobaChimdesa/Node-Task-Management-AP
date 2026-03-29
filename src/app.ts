import "dotenv/config";                    // ← Must be first
import express from "express";
import authRouter from './routes/auth.routes.js';
import profileRouter from './routes/profile.routes.js'
import taskRouter from './routes/task.routes.js';
import categoryRouter from './routes/category.routes.js';



const app = express();
const PORT = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);
app.use('/profile', profileRouter)
app.use('/tasks', taskRouter);
app.use('/categories', categoryRouter);

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;