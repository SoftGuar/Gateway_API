// Floor Plan Processing Routes
import { FastifyInstance } from 'fastify';
import { processFloorPlanSchema } from './floor_process.schema';
 import { processFloorPlanHandler } from '../../../../handlers/cartography/floor_plan_processingHandler';
import { checkAdminRole } from '../../../../middlewares/roleCheck';
export const floorPlanRouter = async (fastify: FastifyInstance) => {

  fastify.addHook('preHandler', checkAdminRole);

  // POST /process_floor_plan
  fastify.post('/', { schema: processFloorPlanSchema }, processFloorPlanHandler);
};