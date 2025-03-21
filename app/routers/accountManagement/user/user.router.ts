// app/routes/api/userRoutes.ts
import { FastifyInstance } from 'fastify';
import { 
  createUserHandler, 
  getUsersHandler, 
  getUserByIdHandler, 
  updateUserHandler, 
  deleteUserHandler,
  getUserHelpersHandler,
  addHelperToUserHandler,
  removeHelperFromUserHandler
} from '../../../handlers/accountManagment/userHandler';
import { 
  createUserSchema, 
  deleteUserSchema, 
  getUserByIdSchema, 
  getUsersSchema, 
  updateUserSchema,
  getUserHelpersSchema,
  addHelperToUserSchema,
  removeHelperFromUserSchema
} from './user.schema';

const accountManagementUserRouter = async (fastify: FastifyInstance) => {
  // POST /users - Create a new user
  fastify.post('/', { schema: createUserSchema }, createUserHandler);
  
  // GET /users - Get all users
  fastify.get('/', { schema: getUsersSchema }, getUsersHandler);
  
  // GET /users/:id - Get a single user by ID
  fastify.get('/:id', { schema: getUserByIdSchema }, getUserByIdHandler);
  
  // PUT /users/:id - Update a user by ID
  fastify.put('/:id', { schema: updateUserSchema }, updateUserHandler);
  
  // DELETE /users/:id - Delete a user by ID
  fastify.delete('/:id', { schema: deleteUserSchema }, deleteUserHandler);
  
  fastify.get('/:id/helpers', { schema: getUserHelpersSchema }, getUserHelpersHandler);
  
  fastify.post('/:id/helpers/:helperId', { schema: addHelperToUserSchema }, addHelperToUserHandler);
  
  fastify.delete('/:id/helpers/:helperId', { schema: removeHelperFromUserSchema }, removeHelperFromUserHandler);
};

export default accountManagementUserRouter;