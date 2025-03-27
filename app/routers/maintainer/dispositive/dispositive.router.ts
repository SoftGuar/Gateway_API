// app/routes/api/CommercialRoutes.ts
import { FastifyInstance } from 'fastify';
import { 
  getDispositivesHandler,
  getDispositiveByIdHandler,
} from '../../../handlers/maintainer/dispositiveHandler';
import { checkMaintainerRole } from '../../../middlewares/roleCheck';

import { 
  getDispositiveByIdSchema,
  getDispositivesSchema,
} from './dispositive.schema';

const maintainerDispositiveRouter = async (fastify: FastifyInstance) => {
      // Register preHandler hook for all admin routes in this plugin.
      fastify.addHook('preHandler', checkMaintainerRole);

    // Get all dispositives
    fastify.get('/',{schema : getDispositivesSchema}, getDispositivesHandler);
  
    // Get a dispositive by ID
    fastify.get('/:id', { schema: getDispositiveByIdSchema }, getDispositiveByIdHandler);
  
    
};

export default maintainerDispositiveRouter;