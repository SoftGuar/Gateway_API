import exampleRoutes from './example.routes';
import adminAccountRouter from './admin/accountManagement/account.router';
import adminDispositiveRouter from './admin/dispositive/dispositive.router';
import adminProductRouter from './admin/product/product.router';

import commercialDispositiveRouter from './commercial/dispositive/dispositive.router';
import commercialProductRouter from './commercial/product/product.router';
import accountRouter from './account/account.router';

import maintainerDispositiveRouter from'./maintainer/dispositive/dispositive.router';
import maintainerDispoIssueRouter from'./maintainer/dispoIssue/dispoIssue.router';
import maintainerInterventionRouter from'./maintainer/intervention/intervention.router';

import registerSalesRoutes from './sales/index';



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

  // Register commercial dispositive routes with a prefix
  fastify.register(commercialDispositiveRouter, { prefix: '/commercial/dispositive' });

    // Register maintainer dispositive routes with a prefix
    fastify.register(maintainerDispositiveRouter, { prefix: '/maintainer/dispositive' });

    // Register maintainer dispoIssue routes with a prefix
    fastify.register(maintainerDispoIssueRouter, { prefix: '/maintainer/dispoIssue' });

     // Register maintainer intervention routes with a prefix
    fastify.register(maintainerInterventionRouter, { prefix: '/maintainer/intervention' });

  // Register admin product routes with a prefix
  fastify.register(commercialProductRouter, { prefix: '/commercial/product' });

  // Register login routes
  fastify.register(loginRouter, { prefix: '/login' });

  //register sales routes from index.ts in sales folder
  fastify.register(registerSalesRoutes, { prefix: '/sales' });

  // Register account routes
  fastify.register(accountRouter, { prefix: '/account' });

  
};

export default registerRoutes;


