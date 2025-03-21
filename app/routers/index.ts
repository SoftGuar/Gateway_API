import exampleRoutes from './example.routes';
import adminAccountRouter from './admin/accountManagement/account.router';
import adminDispositiveRouter from './admin/dispositive/dispositive.router';
import adminProductRouter from './admin/product/product.router';
import accountManagementUserRouter from './accountManagement/user/user.router'
import accManagAdminRouter from './accountManagement/admin/admin.router'
import accountManagementHelperRouter from './accountManagement/helper/helper.router'
import accountManagementCommercialRouter from './accountManagement/commercial/commercial.router'
import accountManagementMaintainerRouter from './accountManagement/maintainer/maintainer.router'
import accountManagementDeciderRouter from './accountManagement/decider/decider.router'



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

  // Register account managment admin routes with a prefix
  fastify.register(accManagAdminRouter, { prefix: '/accountManagment/admin' });
         
  // Register account managment user routes with a prefix
  fastify.register(accountManagementUserRouter, { prefix: '/accountManagment/user' });
  
  // Register account management helper routes with a prefix
  fastify.register(accountManagementHelperRouter, { prefix: '/accountManagment/helper' });
  
  // Register account management commercial routes with a prefix
  fastify.register(accountManagementCommercialRouter, { prefix: '/accountManagment/commercial' });
  
  // Register account management maintainer routes with a prefix
  fastify.register(accountManagementMaintainerRouter, { prefix: '/accountManagment/maintainer' });
  
  // Register account management decider routes with a prefix
  fastify.register(accountManagementDeciderRouter, { prefix: '/accountManagment/decider' });


  // Register login routes
  fastify.register(loginRouter, { prefix: '/login' });
  

};

export default registerRoutes;


