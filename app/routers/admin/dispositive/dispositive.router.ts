import { FastifyInstance } from 'fastify';
import {
  createDispositiveHandler,
  getDispositivesHandler,
  getDispositiveByIdHandler,
  updateDispositiveHandler,
  deleteDispositiveHandler,
  assignUserHandler,
  toggleDispositiveBlockHandler,
  getDispositiveByProductIdHandler
} from '../../../handlers/admin/dispositiveHandler';

import { checkAdminRole } from '../../../middlewares/roleCheck';

// Import schemas (you'll need to create these)
import {
  createDispositiveSchema,
  getDispositiveByIdSchema,
  getDispositivesSchema,
  updateDispositiveSchema,
  deleteDispositiveSchema,
  assignUserSchema,
  blockDispositiveSchema,
  getDispositivesByProductSchema
} from './dispositive.schema';

const adminDispositiveRouter = async (fastify: FastifyInstance) => {
  // Register preHandler hook for admin authorization
  fastify.addHook('preHandler', checkAdminRole);

  // Create a dispositive
  fastify.post('/', { schema: createDispositiveSchema }, createDispositiveHandler);

  // Get all dispositives
  fastify.get('/',{schema : getDispositivesSchema}, getDispositivesHandler);

  // Get a dispositive by ID
  fastify.get('/:id', { schema: getDispositiveByIdSchema }, getDispositiveByIdHandler);

  // Update a dispositive
  fastify.put('/:id', { schema: updateDispositiveSchema }, updateDispositiveHandler);

  // Delete a dispositive
  fastify.delete('/:id', { schema: deleteDispositiveSchema }, deleteDispositiveHandler);

  // Assign a user to a dispositive
  fastify.patch('/:id/assign-user', { schema: assignUserSchema }, assignUserHandler);

  // Block/unblock a dispositive
  fastify.patch('/:id/block', { schema: blockDispositiveSchema }, toggleDispositiveBlockHandler);

  // Get dispositives by product ID
  fastify.get('/product/:id', { schema: getDispositivesByProductSchema }, getDispositiveByProductIdHandler);
};

export default adminDispositiveRouter;