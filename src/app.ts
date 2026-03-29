import "dotenv/config";                    // ← Must be first
import express from "express";
import authRouter from './routes/auth.routes.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter);

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;