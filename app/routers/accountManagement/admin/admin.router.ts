import { FastifyInstance } from 'fastify';
import { createAdminHandler, getAdminsHandler, getAdminByIdHandler, updateAdminHandler, deleteAdminHandler } from '../../../handlers/accountManagment/adminHandler';
import { createAdminSchema, deleteAdminSchema , getAdminByIdSchema, getAdminsSchema, updateAdminSchema } from './admin.schema';

const accManagAdminRouter = async (fastify: FastifyInstance) => {
  fastify.post('/', { schema: createAdminSchema }, createAdminHandler);
  fastify.get('/', { schema: getAdminsSchema }, getAdminsHandler);
  fastify.get('/:id', { schema: getAdminByIdSchema }, getAdminByIdHandler);
  fastify.put('/:id', { schema: updateAdminSchema }, updateAdminHandler);
  fastify.delete('/:id', { schema: deleteAdminSchema }, deleteAdminHandler);
};

export default accManagAdminRouter;