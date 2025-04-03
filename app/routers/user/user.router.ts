import { FastifyInstance } from 'fastify';
import { 
  getUserHelpersHandler,
  addHelperToUserHandler,
  removeHelperFromUserHandler
} from '../../handlers/user/contactHandler';

import { checkUserRole } from '../../middlewares/roleCheck';
import { 
  getUserHelpersSchema,
  addHelperSchema,
  removeHelperSchema
} from './user.schema';

const userHelperRouter = async (fastify: FastifyInstance) => {
  // Register preHandler hook to ensure user authentication
  fastify.addHook('preHandler', checkUserRole);

  // GET /user/helpers - Get current user's helpers
  fastify.get('/helpers', { schema: getUserHelpersSchema }, getUserHelpersHandler);
  
  // POST /user/helpers/:helperId - Add a helper to current user
  fastify.post('/helpers/:helperId', { schema: addHelperSchema }, addHelperToUserHandler);
  
  // DELETE /user/helpers/:helperId - Remove a helper from current user
  fastify.delete('/helpers/:helperId', { schema: removeHelperSchema }, removeHelperFromUserHandler);
};

export default userHelperRouter;