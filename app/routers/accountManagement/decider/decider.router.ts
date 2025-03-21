// app/routes/api/DeciderRoutes.ts
import { FastifyInstance } from 'fastify';
import { 
  createDeciderHandler, 
  getDecidersHandler, 
  getDeciderByIdHandler, 
  updateDeciderHandler, 
  deleteDeciderHandler,
} from '../../../handlers/accountManagment/deciderHandler';
import { 
  createDeciderSchema, 
  deleteDeciderSchema, 
  getDeciderByIdSchema, 
  getDecidersSchema, 
  updateDeciderSchema,
} from './decider.schema';

const accountManagementDeciderRouter = async (fastify: FastifyInstance) => {
  // POST /Deciders - Create a new Decider
  fastify.post('/', { schema: createDeciderSchema }, createDeciderHandler);
  
  // GET /Deciders - Get all Deciders
  fastify.get('/', { schema: getDecidersSchema }, getDecidersHandler);
  
  // GET /Deciders/:id - Get a single Decider by ID
  fastify.get('/:id', { schema: getDeciderByIdSchema }, getDeciderByIdHandler);
  
  // PUT /Deciders/:id - Update a Decider by ID
  fastify.put('/:id', { schema: updateDeciderSchema }, updateDeciderHandler);
  
  // DELETE /Deciders/:id - Delete a Decider by ID
  fastify.delete('/:id', { schema: deleteDeciderSchema }, deleteDeciderHandler);
  
};

export default accountManagementDeciderRouter;