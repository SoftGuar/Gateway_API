import { FastifyInstance } from 'fastify';
import { 
  createUserHandler, getUsersHandler, getUserByIdHandler,updateUserHandler,deleteUserHandler,getUserHelpersHandler,addHelperToUserHandler,removeHelperFromUserHandler,
  createHelperHandler, getHelpersHandler, getHelperByIdHandler,updateHelperHandler,deleteHelperHandler,
} from '../../../handlers/commercial/accountHandler';

import { checkCommercialRole } from '../../../middlewares/roleCheck';

import { 
  createUserSchema ,getUsersSchema,getUserByIdSchema,updateUserSchema,deleteUserSchema,getUserHelpersSchema,removeHelperFromUserSchema,addHelperToUserSchema,
  createHelperSchema ,getHelpersSchema,getHelperByIdSchema,updateHelperSchema,deleteHelperSchema,

} from './account.schema';

const commercialAccountRouter = async (fastify: FastifyInstance) => {

  // Register preHandler hook for all admin routes in this plugin.
  fastify.addHook('preHandler', checkCommercialRole);

  // Create a regular user
  fastify.post('/user', {schema: createUserSchema }, createUserHandler);
    // GET /users - Get all users
    fastify.get('/user', { schema: getUsersSchema }, getUsersHandler);
  
    // GET /users/:id - Get a single user by ID
    fastify.get('/user/:id', { schema: getUserByIdSchema }, getUserByIdHandler);
    
    // PUT /users/:id - Update a user by ID
    fastify.put('/user/:id', { schema: updateUserSchema }, updateUserHandler);
    
    // DELETE /users/:id - Delete a user by ID
    fastify.delete('/user/:id', { schema: deleteUserSchema }, deleteUserHandler);
    
    fastify.get('/user/:id/helpers', { schema: getUserHelpersSchema }, getUserHelpersHandler);
    
    fastify.post('/user/:id/helpers/:helperId', { schema: addHelperToUserSchema }, addHelperToUserHandler);
    
    fastify.delete('/user/:id/helpers/:helperId', { schema: removeHelperFromUserSchema }, removeHelperFromUserHandler);
  
  
  // Create a helper account
  fastify.post('/helper', {schema: createHelperSchema }, createHelperHandler);
  // GET /Helpers - Get all Helpers
  fastify.get('/helper', { schema: getHelpersSchema }, getHelpersHandler);
  
  // GET /Helpers/:id - Get a single Helper by ID
  fastify.get('/helper/:id', { schema: getHelperByIdSchema }, getHelperByIdHandler);
  
  // PUT /Helpers/:id - Update a Helper by ID
  fastify.put('/helper/:id', { schema: updateHelperSchema }, updateHelperHandler);
  
  // DELETE /Helpers/:id - Delete a Helper by ID
  fastify.delete('/helper/:id', { schema: deleteHelperSchema}, deleteHelperHandler);
  
};

export default commercialAccountRouter;