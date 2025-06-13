import { FastifyInstance } from 'fastify';
import { getProfileHandler, updateProfileHandler, deleteProfileHandler, getUserActionsHandler} from '../../handlers/account/accountHandler';
import { getProfileSchema, updateProfileSchema, deleteProfileSchema, getUserActionsSchema } from './account.schema';

const accountRouter = async (fastify: FastifyInstance) => {
  // Get the profile using the Bearer token
  fastify.get('/', { schema: getProfileSchema }, getProfileHandler);
  
  // Update the profile using the Bearer token and request body data
  fastify.put('/', { schema: updateProfileSchema }, updateProfileHandler);
  
  // Delete the profile using the Bearer token
  fastify.delete('/', { schema: deleteProfileSchema }, deleteProfileHandler);

  fastify.get(
    '/history',
    { schema: getUserActionsSchema },
    getUserActionsHandler
  );
};

export default accountRouter;