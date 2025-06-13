import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import { zoneRouter } from './zone/zone.router';
import { floorRouter } from './floor/floor.router';
import { floorPlanRouter } from './floor_process/floor_process.router';
import { poiRouter } from './poi/poi.router';
import{environmentRouter} from './env/env.router';

 const cartographyRouter = async (fastify: FastifyInstance, opts: FastifyPluginOptions) => {
  // Register zone routes
  fastify.register(zoneRouter, { prefix: '/zones' });

  // Register floor routes
  fastify.register(floorRouter, { prefix: '/floors' });

  // Register floor plan processing routes
  fastify.register(floorPlanRouter, { prefix: '/process_floor_plan' });

  // Register POI routes
  fastify.register(poiRouter, { prefix: '/pois' });

  // Register environment routes
  fastify.register(environmentRouter, { prefix: '/environments' });
};

export default cartographyRouter ;