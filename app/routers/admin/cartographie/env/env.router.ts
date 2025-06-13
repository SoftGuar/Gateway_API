// Environment Routes
import { FastifyInstance } from 'fastify';
import {
  createEnvironmentSchema,
  getEnvironmentByIdSchema,
  getEnvironmentsSchema,
} from './env.schema';
import {
  createEnvironmentHandler,
  getEnvironmentsHandler,
  getEnvironmentByIdHandler,
  getEnvironmentFloorsHandler,
} from '../../../../handlers/cartography/environmentHandler';
import { checkAdminRole } from '../../../../middlewares/roleCheck';
export const environmentRouter = async (fastify: FastifyInstance) => {
  // Register preHandler hook for authentication
  fastify.addHook('preHandler', checkAdminRole);
  
  // GET /environments
  fastify.get('/', { schema: getEnvironmentsSchema }, getEnvironmentsHandler);

  // POST /environments
  fastify.post('/', { schema: createEnvironmentSchema }, createEnvironmentHandler);

  // GET /environments/:id
  fastify.get('/:id', { schema: getEnvironmentByIdSchema }, getEnvironmentByIdHandler);
  // GET /environments/:id/floors
  fastify.get('/:id/floors', getEnvironmentFloorsHandler);

};
