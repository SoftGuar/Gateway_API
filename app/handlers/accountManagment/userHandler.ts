import { FastifyRequest, FastifyReply } from 'fastify';
import { AccountManagementService } from '../../services/accountManagementService/accountManagement.service';

interface UserData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
  }

const accountManagementService = new AccountManagementService();

// Handler for creating an User
export async function createUserHandler(
  request: FastifyRequest<{ Body: UserData }>,
  reply: FastifyReply
) {
  try {
    const result = await accountManagementService.createUser(request.body);
    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating User:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create User'
    });
  }
}

// Handler for getting all Users
export async function getUsersHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const result = await accountManagementService.getUsers();
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching Users:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch Users'
    });
  }
}

// Handler for getting User by ID
export async function getUserByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await accountManagementService.getUserById(id);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(`Error fetching User with ID ${request.params.id}:`, error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch User'
    });
  }
}

// Handler for updating User
export async function updateUserHandler(
  request: FastifyRequest<{ Params: { id: string }, Body: Partial<UserData> }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await accountManagementService.updateUser(id, request.body);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(`Error updating User with ID ${request.params.id}:`, error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to update User'
    });
  }
}

// Handler for deleting User
export async function deleteUserHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await accountManagementService.deleteUser(id);
    return reply.code(200).send({
      success: true,
      ...result
    });
  } catch (error) {
    console.error(`Error deleting User with ID ${request.params.id}:`, error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to delete User'
    });
  }
}

// Handler for getting user's helpers
export async function getUserHelpersHandler(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;
      const result = await accountManagementService.getUserHelpers(id);
      return reply.code(200).send({
        success: true,
        data: result
      });
    } catch (error) {
      console.error(`Error fetching helpers for user with ID ${request.params.id}:`, error);
      return reply.code(500).send({
        success: false,
        message: 'Failed to fetch user helpers'
      });
    }
  }
  
  // Handler for adding helper to user
  export async function addHelperToUserHandler(
    request: FastifyRequest<{ Params: { id: string, helperId: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { id, helperId } = request.params;
      const result = await accountManagementService.addHelperToUser(id, helperId);
      return reply.code(200).send({
        success: true,
        data: result
      });
    } catch (error) {
      console.error(`Error adding helper ${request.params.helperId} to user ${request.params.id}:`, error);
      return reply.code(500).send({
        success: false,
        message: 'Failed to add helper to user'
      });
    }
  }
  
  // Handler for removing helper from user
  export async function removeHelperFromUserHandler(
    request: FastifyRequest<{ Params: { id: string, helperId: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { id, helperId } = request.params;
      const result = await accountManagementService.removeHelperFromUser(id, helperId);
      return reply.code(200).send({
        success: true,
        data: result
      });
    } catch (error) {
      console.error(`Error removing helper ${request.params.helperId} from user ${request.params.id}:`, error);
      return reply.code(500).send({
        success: false,
        message: 'Failed to remove helper from user'
      });
    }
  }
  
  
  