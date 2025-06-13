// Zone Routes
import { FastifyInstance } from 'fastify';
import {
  createZoneSchema,
  getZoneTypesSchema,
  getZonesByFloorSchema,
  getZoneByIdSchema,
  updateZoneSchema,
  deleteZoneSchema
} from './zone.schema';
import {
  createZoneHandler,
  getZoneTypesHandler,
  getZonesByFloorHandler,
  getZoneByIdHandler,
  updateZoneHandler,
  deleteZoneHandler
} from '../../../../handlers/cartography/zoneHandler';
import { checkAdminRole } from '../../../../middlewares/roleCheck';

export const zoneRouter = async (fastify: FastifyInstance) => {
  //fastify.addHook('preHandler', checkAdminRole);
  // POST /zones
  fastify.post('/', { schema: createZoneSchema }, createZoneHandler);
  // GET /zones/types
  fastify.get('/types', { schema: getZoneTypesSchema }, getZoneTypesHandler);
  // GET /zones/floor/:floorId
  fastify.get('/floor/:floorId', { schema: getZonesByFloorSchema }, getZonesByFloorHandler);

  // GET /zones/:id
  fastify.get('/:id', { schema: getZoneByIdSchema }, getZoneByIdHandler);

  // PUT /zones/:id
  fastify.put('/:id', { schema: updateZoneSchema }, updateZoneHandler);
  // DELETE /zones/:id
  fastify.delete('/:id', { schema: deleteZoneSchema }, deleteZoneHandler);
};
