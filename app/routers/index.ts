import exampleRoutes from './example.routes';
import adminAccountRouter from './admin/accountManagement/account.router';
import loginRouter from './login/login.router';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

const registerRoutes = (fastify: FastifyInstance) => {
  // Register example routes with a prefix
  fastify.register(exampleRoutes, { prefix: '/example' });

  // Register admin account routes with a prefix
  fastify.register(adminAccountRouter, { prefix: '/admin/account' });

  // Register login routes
  fastify.register(loginRouter, { prefix: '/login' });
  

};

export default registerRoutes;


