import exampleRoutes from './example.routes';
import adminAccountRouter from './admin/accountManagement/account.router';
import adminDispositiveRouter from './admin/dispositive/dispositive.router';
import adminProductRouter from './admin/product/product.router';


import loginRouter from './login/login.router';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

const registerRoutes = (fastify: FastifyInstance) => {
  // Register example routes with a prefix
  fastify.register(exampleRoutes, { prefix: '/example' });

  // Register admin account routes with a prefix
  fastify.register(adminAccountRouter, { prefix: '/admin/account' });

    // Register admin dispositive routes with a prefix
    fastify.register(adminDispositiveRouter, { prefix: '/admin/dispositive' });

      // Register admin product routes with a prefix
  fastify.register(adminProductRouter, { prefix: '/admin/product' });



  // Register login routes
  fastify.register(loginRouter, { prefix: '/login' });
  

};

export default registerRoutes;


