import  app  from './app';
import { env } from './config/env';
import { logger } from './config/logger';

const PORT = env.PORT || 3000;

const startServer = async () => {
  try {
    if (!env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined in environment variables');
    }
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server started on port ${PORT}!`);
      console.log(`- Health check: http://localhost:${PORT}/health`);
    });

  } catch (error) {
    logger.error({ err: error }, 'Failed to start server');
    process.exit(1);
  }
};

startServer();