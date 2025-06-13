// Environment Routes
import { FastifyInstance } from 'fastify';
import {
  getEnvironmentByIdSchema,
  getEnvironmentsSchema,
} from './env.schema';
import {
  getEnvironmentsHandler,
  getEnvironmentByIdHandler,
} from '../../../handlers/cartography/environmentHandler';
import { checkUserRole } from '../../../middlewares/roleCheck';
 const UserenvironmentRouter = async (fastify: FastifyInstance) => {
  // Register preHandler hook for authentication
  fastify.addHook('preHandler', checkUserRole);
  
  // GET /environments
  fastify.get('/', { schema: getEnvironmentsSchema }, getEnvironmentsHandler);
  // GET /environments/:id
  fastify.get('/:id', { schema: getEnvironmentByIdSchema }, getEnvironmentByIdHandler);

};

export default UserenvironmentRouter;
