// Environment Routes
import { FastifyInstance } from 'fastify';
import {
  navigateSchema,
  navigateWithObstacleSchema,
} from './env.schema';

import { checkUserRole } from '../../../middlewares/roleCheck';
import { navigateHandler, navigateWithObstacleHandler } from '../../../handlers/cartography/navigationHandler';
 const NavigationRouter = async (fastify: FastifyInstance) => {
  // Register preHandler hook for authentication
  fastify.addHook('preHandler', checkUserRole);
fastify.post('/navigate', {schema : navigateSchema }, navigateHandler);
fastify.post('/navigate/obstacle', {schema : navigateWithObstacleSchema }, navigateWithObstacleHandler);

};

export default NavigationRouter;
