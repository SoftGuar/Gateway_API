import { FastifyInstance } from 'fastify';
import { 
    getHelperUsersHandler
} from '../../handlers/helper/helperHandler';

import { checkHelperRole } from '../../middlewares/roleCheck';

import { 
    getHelperUsersSchema

} from './helper.schema';

const helperRouter = async (fastify: FastifyInstance) => {

  // Register preHandler hook for all admin routes in this plugin.
  fastify.addHook('preHandler', checkHelperRole);

    
    fastify.get('/user/:id/helpers', { schema: getHelperUsersSchema }, getHelperUsersHandler);
    
  
};

export default helperRouter;