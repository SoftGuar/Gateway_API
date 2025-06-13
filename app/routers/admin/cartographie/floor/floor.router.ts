// Floor Routes
import { FastifyInstance } from 'fastify';
import {  createFloorSchema,
  getFloorsSchema,
  getFloorByIdSchema,
  updateFloorSchema,
  getFloorImageSchema } from './floor.schema';
import {
  createFloorHandler,
  getFloorsHandler,
  getFloorByIdHandler,
  updateFloorHandler,
  getFloorImageHandler
} from '../../../../handlers/cartography/floorHandler';
import { checkAdminRole } from '../../../../middlewares/roleCheck';

export const floorRouter = async (fastify: FastifyInstance) => {
  fastify.addHook('preHandler', checkAdminRole);

  // GET /floors
  fastify.get('/', { schema: getFloorsSchema }, getFloorsHandler);
 
  // POST /floors
  fastify.post('/', { schema: createFloorSchema }, createFloorHandler);
 
  // GET /floors/:id
  fastify.get('/:id', { schema: getFloorByIdSchema }, getFloorByIdHandler);
  // PUT /floors/:id
  fastify.put('/:id', { schema: updateFloorSchema }, updateFloorHandler);
  // GET /floors/:id/image
  fastify.get('/:id/image', { schema: getFloorImageSchema },getFloorImageHandler);
};
