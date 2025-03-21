// app/routes/api/HelperRoutes.ts
import { FastifyInstance } from 'fastify';
import { 
  createHelperHandler, 
  getHelpersHandler, 
  getHelperByIdHandler, 
  updateHelperHandler, 
  deleteHelperHandler,
} from '../../../handlers/accountManagment/helperHandler';
import { 
  createHelperSchema, 
  deleteHelperSchema, 
  getHelperByIdSchema, 
  getHelpersSchema, 
  updateHelperSchema,
} from './helper.schema';

const accountManagementHelperRouter = async (fastify: FastifyInstance) => {
  // POST /Helpers - Create a new Helper
  fastify.post('/', { schema: createHelperSchema }, createHelperHandler);
  
  // GET /Helpers - Get all Helpers
  fastify.get('/', { schema: getHelpersSchema }, getHelpersHandler);
  
  // GET /Helpers/:id - Get a single Helper by ID
  fastify.get('/:id', { schema: getHelperByIdSchema }, getHelperByIdHandler);
  
  // PUT /Helpers/:id - Update a Helper by ID
  fastify.put('/:id', { schema: updateHelperSchema }, updateHelperHandler);
  
  // DELETE /Helpers/:id - Delete a Helper by ID
  fastify.delete('/:id', { schema: deleteHelperSchema }, deleteHelperHandler);
  
};

export default accountManagementHelperRouter;