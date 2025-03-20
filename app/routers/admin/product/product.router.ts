import { FastifyInstance } from 'fastify';
import {
  createProductHandler,
  getProductsHandler,
  getProductByIdHandler,
  updateProductHandler,
  deleteProductHandler
} from '../../../handlers/admin/productHandler';

import { checkAdminRole } from '../../../middlewares/roleCheck';

import {
  createProductSchema,
  getProductSchema,
  updateProductSchema,
  deleteProductSchema
} from './product.schema';

const adminProductRouter = async (fastify: FastifyInstance) => {
  // Register preHandler hook for admin authorization
  fastify.addHook('preHandler', checkAdminRole);

  // Create a product
  fastify.post('/', { schema: createProductSchema }, createProductHandler);

  // Get all products
  fastify.get('/', getProductsHandler);

  // Get a product by ID
  fastify.get('/:id', { schema: getProductSchema }, getProductByIdHandler);

  // Update a product
  fastify.put('/:id', { schema: updateProductSchema }, updateProductHandler);

  // Delete a product
  fastify.delete('/:id', { schema: deleteProductSchema }, deleteProductHandler);
};

export default adminProductRouter;