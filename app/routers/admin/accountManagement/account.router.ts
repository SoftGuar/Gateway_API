import { FastifyInstance } from 'fastify';
import { 
  createUserHandler,
  createHelperHandler,
  createDeciderHandler,
  createCommercialHandler,
  createMaintainerHandler
} from '../../../handlers/admin/accountManagementHandler';



import { createUserSchema , createCommercialSchema , createDeciderSchema , createHelperSchema , createMaintainerSchema} from './account.schema';

const adminAccountRouter = async (fastify: FastifyInstance) => {

  // Register preHandler hook for all admin routes in this plugin.
  fastify.addHook('preHandler', checkAdminRole);

  // Create a regular user
  fastify.post('/user', {schema: createUserSchema }, createUserHandler);
  
  // Create a helper account
  fastify.post('/helper', {schema: createHelperSchema }, createHelperHandler);
  
  // Create a decider account
  fastify.post('/decider', {schema: createDeciderSchema }, createDeciderHandler);
  
  // Create a commercial account
  fastify.post('/commercial', {schema: createCommercialSchema }, createCommercialHandler);
  
  // Create a maintainer account
  fastify.post('/maintainer', {schema: createMaintainerSchema }, createMaintainerHandler);
};

export default adminAccountRouter;