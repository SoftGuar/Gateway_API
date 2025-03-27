import { FastifyInstance } from 'fastify';
import {
  getProductsHandler,
  getProductByIdHandler,
  
} from '../../../handlers/commercial/productHandler';
import { checkCommercialRole } from '../../../middlewares/roleCheck';


import {
  getProductSchema,
  getAllProductsSchema,
} from './product.schema';

const commercialProductRouter = async (fastify: FastifyInstance) => {

  // Register preHandler hook for all admin routes in this plugin.
  fastify.addHook('preHandler', checkCommercialRole);

  // Get all products
  fastify.get('/',{schema : getAllProductsSchema}, getProductsHandler);

  // Get a product by ID
  fastify.get('/:id', { schema: getProductSchema }, getProductByIdHandler);

};

export default commercialProductRouter;