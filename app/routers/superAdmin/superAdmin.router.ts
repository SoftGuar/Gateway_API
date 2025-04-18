import { FastifyInstance } from 'fastify';
import {
  createAdminHandler,
  getAdminsHandler,
  getAdminByIdHandler,
  updateAdminHandler,
  deleteAdminHandler
} from '../../handlers/superAdmin/adminHandler';
import {
  createAdminSchema,
  getAdminsSchema,
  getAdminByIdSchema,
  updateAdminSchema,
  deleteAdminSchema
} from './superAdmin.schema';
import { checkSuperAdminRole } from '../../middlewares/roleCheck';


const superAdminRouter = async (fastify: FastifyInstance) => {

  fastify.addHook('preHandler', checkSuperAdminRole);
  
  // Create a new administrator account
  fastify.post('/admin', { schema: createAdminSchema }, createAdminHandler);

  // Get all administrator accounts
  fastify.get('/admins', { schema: getAdminsSchema }, getAdminsHandler);

  // Get a single administrator by ID
  fastify.get('/admin/:id', { schema: getAdminByIdSchema }, getAdminByIdHandler);

  // Update an administrator by ID
  fastify.put('/admin/:id', { schema: updateAdminSchema }, updateAdminHandler);

  // Delete an administrator by ID
  fastify.delete('/admin/:id', { schema: deleteAdminSchema }, deleteAdminHandler);
};

export default superAdminRouter;