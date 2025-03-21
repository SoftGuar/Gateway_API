import { FastifyInstance } from 'fastify';
import {
  getProductsHandler,
  getProductByIdHandler,
  
} from '../../../handlers/commercial/productHandler';


import {
  getProductSchema,
  getAllProductsSchema,
} from './product.schema';

const commercialProductRouter = async (fastify: FastifyInstance) => {

  // Get all products
  fastify.get('/',{schema : getAllProductsSchema}, getProductsHandler);

  // Get a product by ID
  fastify.get('/:id', { schema: getProductSchema }, getProductByIdHandler);

};

export default commercialProductRouter;