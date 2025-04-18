import exampleRoutes from './example.routes';
import adminRoutes from './admin';
import commercialRoutes from './commercial';

import accountRouter from './account/account.router';
import userHelperRouter from './user/user.router'
import helperRouter from './helper/helper.router'
import maintainerRoutes from'./maintainer';

import registerSalesRoutes from './sales/index';
import registerAnalyticsRoutes from './analytics/index';


import loginRouter from './login/login.router';

import superAdminRouter from './superAdmin/superAdmin.router';

import { FastifyInstance, FastifyPluginOptions } from 'fastify';

  const registerRoutes = (fastify: FastifyInstance) => {
  // Register example routes with a prefix
  fastify.register(exampleRoutes, { prefix: '/example' });


  // Register admin routes  with a prefix
  fastify.register(adminRoutes, { prefix: '/admin' });

  // Register admin account routes with a prefix
  fastify.register(adminAccountRouter, { prefix: '/admin/account' });

  // Register admin dispositive routes with a prefix
  fastify.register(adminDispositiveRouter, { prefix: '/admin/dispositive' });

  // Register admin product routes with a prefix
  fastify.register(adminProductRouter, { prefix: '/admin/product' });

  // Register super admin routes with a prefix
  fastify.register(superAdminRouter, { prefix: '/superAdmin' });

  // Register commercial dispositive routes with a prefix
  fastify.register(commercialDispositiveRouter, { prefix: '/commercial/dispositive' });

  // Register commercial account routes with a prefix
  fastify.register(commercialAccountRouter, { prefix: '/commercial/account' });

  // Register comemrcial product routes with a prefix
  fastify.register(commercialProductRouter, { prefix: '/commercial/product' });


  // Register commercial routes with a prefix
  fastify.register(commercialRoutes, { prefix: '/commercial' });


  // Register maintainer  routes with a prefix
  fastify.register(maintainerRoutes, { prefix: '/maintainer' });

  //Register helper routes with a prefix 
  fastify.register(helperRouter,{prefix: '/helepr'})


  // Register maintainer dispositive routes with a prefix
  fastify.register(maintainerDispositiveRouter, { prefix: '/maintainer/dispositive' });

  // Register maintainer dispoIssue routes with a prefix
  fastify.register(maintainerDispoIssueRouter, { prefix: '/maintainer/dispoIssue' });

  // Register maintainer intervention routes with a prefix
  fastify.register(maintainerInterventionRouter, { prefix: '/maintainer/intervention' });


  //register user  routes with a prefix 
  fastify.register(userHelperRouter, { prefix: '/user' });


  // Register login routes
  fastify.register(loginRouter, { prefix: '/login' });

  //register sales routes from index.ts in sales folder
  fastify.register(registerSalesRoutes, { prefix: '/sales' });

  // Register account routes
  fastify.register(accountRouter, { prefix: '/account' });

  //register analytics routes form index.ts in analytics folder
  fastify.register(registerAnalyticsRoutes, { prefix: '/analytics' });

  
};

export default registerRoutes;


