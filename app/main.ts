import dotenv from 'dotenv';
import Fastify from 'fastify';
import registerMiddlewares from './middlewares';
import registerRoutes from './routers';

// Load environment variables from .env or example-env
dotenv.config();

const fastify = Fastify({ logger: true });

async function startServer() {
  // 1. Register middlewares
  registerMiddlewares(fastify);

  // 2. Register routes
  registerRoutes(fastify);

  // 3. Start server
  try {
    const port = Number(process.env.PORT) || 3000;
    const host = process.env.HOST || '0.0.0.0';
    await fastify.listen({ port, host });
    fastify.log.info(`Server started on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

startServer();