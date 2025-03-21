// app/routes/api/MaintainerRoutes.ts
import { FastifyInstance } from 'fastify';
import { 
  createMaintainerHandler, 
  getMaintainersHandler, 
  getMaintainerByIdHandler, 
  updateMaintainerHandler, 
  deleteMaintainerHandler,
} from '../../../handlers/accountManagment/maintainerHandler';
import { 
  createMaintainerSchema, 
  deleteMaintainerSchema, 
  getMaintainerByIdSchema, 
  getMaintainersSchema, 
  updateMaintainerSchema,
} from './maintainer.schema';

const accountManagementMaintainerRouter = async (fastify: FastifyInstance) => {
  // POST /Maintainers - Create a new Maintainer
  fastify.post('/', { schema: createMaintainerSchema }, createMaintainerHandler);
  
  // GET /Maintainers - Get all Maintainers
  fastify.get('/', { schema: getMaintainersSchema }, getMaintainersHandler);
  
  // GET /Maintainers/:id - Get a single Maintainer by ID
  fastify.get('/:id', { schema: getMaintainerByIdSchema }, getMaintainerByIdHandler);
  
  // PUT /Maintainers/:id - Update a Maintainer by ID
  fastify.put('/:id', { schema: updateMaintainerSchema }, updateMaintainerHandler);
  
  // DELETE /Maintainers/:id - Delete a Maintainer by ID
  fastify.delete('/:id', { schema: deleteMaintainerSchema }, deleteMaintainerHandler);
  
};

export default accountManagementMaintainerRouter;