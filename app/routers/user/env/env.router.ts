// Environment Routes
import { FastifyInstance } from 'fastify';
import {
  getEnvironmentByIdSchema,
  getEnvironmentsSchema,
  navigateSchema,
  navigateWithObstacleSchema,
} from './env.schema';
import {
  getEnvironmentsHandler,
  getEnvironmentByIdHandler,
} from '../../../handlers/cartography/environmentHandler';
import { checkUserRole } from '../../../middlewares/roleCheck';
import { navigateHandler, navigateWithObstacleHandler } from '../../../handlers/cartography/navigationHandler';
 const UserenvironmentRouter = async (fastify: FastifyInstance) => {
  // Register preHandler hook for authentication
  fastify.addHook('preHandler', checkUserRole);
  
  // GET /environments
  fastify.get('/', { schema: getEnvironmentsSchema }, getEnvironmentsHandler);
  // GET /environments/:id
  fastify.get('/:id', { schema: getEnvironmentByIdSchema }, getEnvironmentByIdHandler);

fastify.post('/navigate', {schema : navigateSchema }, navigateHandler);
fastify.post('/navigate/obstacle', {schema : navigateWithObstacleSchema }, navigateWithObstacleHandler);

};

export default UserenvironmentRouter;
