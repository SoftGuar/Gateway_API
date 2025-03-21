// app/routes/api/CommercialRoutes.ts
import { FastifyInstance } from 'fastify';
import { 
  getDispositivesHandler,
  getDispositiveByIdHandler,
  getDispositiveByProductIdHandler,
} from '../../../handlers/commercial/dispositiveHandler';
import { 
  getDispositiveByIdSchema,
  getDispositivesSchema,
  getDispositivesByProductSchema


} from './dispositive.schema';

const commercialDispositiveRouter = async (fastify: FastifyInstance) => {

    // Get all dispositives
    fastify.get('/',{schema : getDispositivesSchema}, getDispositivesHandler);
  
    // Get a dispositive by ID
    fastify.get('/:id', { schema: getDispositiveByIdSchema }, getDispositiveByIdHandler);
  
      // Get dispositives by product ID
      fastify.get('/product/:productId', { schema: getDispositivesByProductSchema }, getDispositiveByProductIdHandler);
    
};

export default commercialDispositiveRouter;