import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import cors from '@fastify/cors';
import registerRoutes from './routes/routes'; // Updated to use the refactored routes
// Assuming other route files follow a similar pattern
import cardRoutes from './routes/cardRoutes';
import loungeRoutes from './routes/loungeRoutes';
import rewardRoutes from './routes/rewardRoutes';
import mileageRoutes from './routes/mileageRoutes';
import zerofeeRoutes from './routes/zerofeeRoutes';
import exclusiveRoutes from './routes/exclusiveRoutes';

// Configuration
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3333;
const HOST = process.env.HOST || '0.0.0.0';

// Server setup
const serverOptions: FastifyServerOptions = {
  logger: {
    level: process.env.LOG_LEVEL || 'info',
  },
};

const app: FastifyInstance = Fastify(serverOptions);

// Error handling
app.setErrorHandler((error, request, reply) => {
  app.log.error(error);
  const statusCode = error.statusCode || 400;
  reply.status(statusCode).send({
    error: 'Bad Request',
    message: error.message,
    statusCode,
  });
});

// Register plugins and routes
async function registerPluginsAndRoutes() {
  await app.register(cors, {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'DELETE'],
  });

  // Register all route modules
  await Promise.all([
    app.register(registerRoutes),
    app.register(cardRoutes),
    app.register(loungeRoutes),
    app.register(rewardRoutes),
    app.register(mileageRoutes),
    app.register(zerofeeRoutes),
    app.register(exclusiveRoutes),
  ]);
}

// Start server
async function start() {
  try {
    await registerPluginsAndRoutes();
    await app.listen({ port: PORT, host: HOST });
    app.log.info(`🚀 Server running on http://${HOST}:${PORT}`);
  } catch (err) {
    app.log.error('Server startup failed:', err);
    process.exit(1);
  }
}

// Graceful shutdown
async function shutdown() {
  app.log.info('Shutting down server...');
  await app.close();
  process.exit(0);
}

// Handle process signals
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// Start the server
start().catch((err) => {
  app.log.error('Unexpected error during startup:', err);
  process.exit(1);
});

export default app; // For testing or other purposes