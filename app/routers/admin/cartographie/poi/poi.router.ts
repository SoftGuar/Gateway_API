// POI Routes
import { FastifyInstance } from 'fastify';
import {
  createPOISchema,
  getCategoriesSchema,
  searchPOIsSchema,
  getPOIsByFloorSchema,
  getPOIByIdSchema,
  updatePOISchema,
  deletePOISchema
} from './poi.schema';
import {
  createPOIHandler,
  getPOICategoriesHandler,
  searchPOIsHandler,
  getPOIsByFloorHandler,
  getPOIByIdHandler,
  updatePOIHandler,
  deletePOIHandler
} from '../../../../handlers/cartography/poiHandler';
import { checkAdminRole } from '../../../../middlewares/roleCheck';
export const poiRouter = async (fastify: FastifyInstance) => {
  fastify.addHook('preHandler', checkAdminRole);
  // POST /pois
  fastify.post('/', { schema: createPOISchema },createPOIHandler);
  // GET /pois/categories
  fastify.get('/categories', { schema: getCategoriesSchema }, getPOICategoriesHandler);
  // GET /pois/search
  fastify.get('/search', { schema: searchPOIsSchema }, searchPOIsHandler);
  // GET /pois/floor/:floorId
  fastify.get('/floor/:floorId', { schema: getPOIsByFloorSchema }, getPOIsByFloorHandler);
  // GET /pois/:id
  fastify.get('/:id', { schema: getPOIByIdSchema },getPOIByIdHandler);  
  // PUT /pois/:id
  fastify.put('/:id', { schema: updatePOISchema }, updatePOIHandler);
  // DELETE /pois/:id
  fastify.delete('/:id', { schema: deletePOISchema }, deletePOIHandler);
};
