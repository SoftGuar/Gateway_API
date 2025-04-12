import adminAccountRouter from './accountManagement/account.router';
import adminDispositiveRouter from './dispositive/dispositive.router';
import adminProductRouter from './product/product.router';
import admintransactionRouter from './sales/transaction.router';


import { FastifyInstance, FastifyPluginOptions } from 'fastify';

const adminRoutes = (fastify: FastifyInstance) => {

  // Register admin account routes with a prefix
  fastify.register(adminAccountRouter, { prefix: '/account' });

  // Register admin dispositive routes with a prefix
  fastify.register(adminDispositiveRouter, { prefix: '/dispositive' });

  // Register admin product routes with a prefix
  fastify.register(adminProductRouter, { prefix: '/product' });

  //register admin confirm transaction route with a prefix 

  fastify.register(admintransactionRouter, { prefix: '/transaction' });
  


  
};

export default adminRoutes;


