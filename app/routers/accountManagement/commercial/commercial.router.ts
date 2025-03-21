// app/routes/api/CommercialRoutes.ts
import { FastifyInstance } from 'fastify';
import { 
  createCommercialHandler, 
  getCommercialsHandler, 
  getCommercialByIdHandler, 
  updateCommercialHandler, 
  deleteCommercialHandler,
} from '../../../handlers/accountManagment/commercialHandler';
import { 
  createCommercialSchema, 
  deleteCommercialSchema, 
  getCommercialByIdSchema, 
  getCommercialsSchema, 
  updateCommercialSchema,
} from './commercial.schema';

const accountManagementCommercialRouter = async (fastify: FastifyInstance) => {
  // POST /Commercials - Create a new Commercial
  fastify.post('/', { schema: createCommercialSchema }, createCommercialHandler);
  
  // GET /Commercials - Get all Commercials
  fastify.get('/', { schema: getCommercialsSchema }, getCommercialsHandler);
  
  // GET /Commercials/:id - Get a single Commercial by ID
  fastify.get('/:id', { schema: getCommercialByIdSchema }, getCommercialByIdHandler);
  
  // PUT /Commercials/:id - Update a Commercial by ID
  fastify.put('/:id', { schema: updateCommercialSchema }, updateCommercialHandler);
  
  // DELETE /Commercials/:id - Delete a Commercial by ID
  fastify.delete('/:id', { schema: deleteCommercialSchema }, deleteCommercialHandler);
  
};

export default accountManagementCommercialRouter;