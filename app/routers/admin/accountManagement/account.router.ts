import { FastifyInstance } from 'fastify';
import { 
  createUserHandler, getUsersHandler, getUserByIdHandler,updateUserHandler,deleteUserHandler,getUserHelpersHandler,addHelperToUserHandler,removeHelperFromUserHandler,
  createHelperHandler, getHelpersHandler, getHelperByIdHandler,updateHelperHandler,deleteHelperHandler,
  createAssistanceHandler,
  createDeciderHandler, getDecidersHandler, getDeciderByIdHandler,updateDeciderHandler,deleteDeciderHandler,
  createCommercialHandler, getCommercialsHandler, getCommercialByIdHandler,updateCommercialHandler,deleteCommercialHandler,
  createMaintainerHandler, getMaintainersHandler, getMaintainerByIdHandler,updateMaintainerHandler,deleteMaintainerHandler,
} from '../../../handlers/admin/accountManagementHandler';

import { checkAdminRole } from '../../../middlewares/roleCheck';

import { 
  createUserSchema ,getUsersSchema,getUserByIdSchema,updateUserSchema,deleteUserSchema,getUserHelpersSchema,removeHelperFromUserSchema,addHelperToUserSchema,
  createCommercialSchema,getCommercialsSchema,getCommercialByIdSchema,updateCommercialSchema,deleteCommercialSchema,
  createDeciderSchema ,getDecidersSchema,getDeciderByIdSchema,updateDeciderSchema,deleteDeciderSchema,
  createHelperSchema ,getHelpersSchema,getHelperByIdSchema,updateHelperSchema,deleteHelperSchema,
  createAssistanceSchema,
  createMaintainerSchema ,getMaintainersSchema,getMaintainerByIdSchema,updateMaintainerSchema,deleteMaintainerSchema,

} from './account.schema';

const adminAccountRouter = async (fastify: FastifyInstance) => {

  // Register preHandler hook for all admin routes in this plugin.
  fastify.addHook('preHandler', checkAdminRole);

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

  // Create an assistance account
  fastify.post('/assistance', {schema: createAssistanceSchema }, createAssistanceHandler);
  
  // Create a decider account
  fastify.post('/decider', {schema: createDeciderSchema }, createDeciderHandler);
    // GET /Deciders - Get all Deciders
    fastify.get('/decider', { schema: getDecidersSchema }, getDecidersHandler);
  
    // GET /Deciders/:id - Get a single Decider by ID
    fastify.get('/decider/:id', { schema: getDeciderByIdSchema }, getDeciderByIdHandler);
    
    // PUT /Deciders/:id - Update a Decider by ID
    fastify.put('/decider/:id', { schema: updateDeciderSchema }, updateDeciderHandler);
    
    // DELETE /Deciders/:id - Delete a Decider by ID
    fastify.delete('/decider/:id', { schema: deleteDeciderSchema }, deleteDeciderHandler);
  
  
  // Create a commercial account
  fastify.post('/commercial', {schema: createCommercialSchema }, createCommercialHandler);
      // GET /comemrcials - Get all comemrcials
      fastify.get('/comemrcial', { schema: getCommercialsSchema }, getCommercialsHandler);
  
      // GET /comemrcials/:id - Get a single comemrcial by ID
      fastify.get('/comemrcial/:id', { schema: getCommercialByIdSchema }, getCommercialByIdHandler);
      
      // PUT /comemrcials/:id - Update a comemrcial by ID
      fastify.put('/comemrcial/:id', { schema: updateCommercialSchema }, updateCommercialHandler);
      
      // DELETE /comemrcials/:id - Delete a comemrcial by ID
      fastify.delete('/comemrcial/:id', { schema: deleteCommercialSchema }, deleteCommercialHandler);
  
  // Create a maintainer account
  fastify.post('/maintainer', {schema: createMaintainerSchema }, createMaintainerHandler);
    // GET /Maintainers - Get all Maintainers
    fastify.get('/maintainer', { schema: getMaintainersSchema }, getMaintainersHandler);
  
    // GET /Maintainers/:id - Get a single Maintainer by ID
    fastify.get('/maintainer/:id', { schema: getMaintainerByIdSchema }, getMaintainerByIdHandler);
    
    // PUT /Maintainers/:id - Update a Maintainer by ID
    fastify.put('/maintainer/:id', { schema: updateMaintainerSchema }, updateMaintainerHandler);
    
    // DELETE /Maintainers/:id - Delete a Maintainer by ID
    fastify.delete('/maintainer/:id', { schema: deleteMaintainerSchema }, deleteMaintainerHandler);
  
};

export default adminAccountRouter;