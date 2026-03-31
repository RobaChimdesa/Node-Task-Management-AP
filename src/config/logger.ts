import pino from 'pino';

// Create a logger instance
export const logger = pino({
  level: process.env.LOG_LEVEL || 'info', 
  // LOG_LEVEL controls verbosity:
  // debug -> detailed logs (dev)
  // info  -> normal logs (production)
  // error -> only errors

  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true // makes logs readable in terminal
    }
  }
});