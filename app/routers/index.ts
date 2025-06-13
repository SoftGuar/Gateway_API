import exampleRoutes from './example.routes';
import adminRoutes from './admin';
import commercialRoutes from './commercial';

import accountRouter from './account/account.router';
import userHelperRouter from './user/user.router'
import UserenvironmentRouter from './user/env/env.router';
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


  // Register super admin routes with a prefix
  fastify.register(superAdminRouter, { prefix: '/superAdmin' });



  // Register commercial routes with a prefix
  fastify.register(commercialRoutes, { prefix: '/commercial' });


  // Register maintainer  routes with a prefix
  fastify.register(maintainerRoutes, { prefix: '/maintainer' });

  //Register helper routes with a prefix 
  fastify.register(helperRouter,{prefix: '/helepr'})

  //register user  routes with a prefix 
  fastify.register(userHelperRouter, { prefix: '/user' });

    fastify.register(UserenvironmentRouter, { prefix: '/user/environment' });



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


