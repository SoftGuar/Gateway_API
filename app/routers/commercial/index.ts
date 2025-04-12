import commercialDispositiveRouter from './dispositive/dispositive.router';
import commercialProductRouter from './product/product.router';
import commercialAccountRouter from './account/account.router';

import { FastifyInstance, FastifyPluginOptions } from 'fastify';

const commercialRoutes = (fastify: FastifyInstance) => {
  // Register commercial dispositive routes with a prefix
  fastify.register(commercialDispositiveRouter, { prefix: '/dispositive' });

    // Register commercial account routes with a prefix
    fastify.register(commercialAccountRouter, { prefix: '/account' });

      // Register comemrcial product routes with a prefix
  fastify.register(commercialProductRouter, { prefix: '/product' });

  
};

export default commercialRoutes;


