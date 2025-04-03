import { FastifyRequest, FastifyReply } from 'fastify';
import { AccountManagementService } from '../../services/accountManagementService/accountManagement.service';

const accountManagementService = new AccountManagementService();

interface BaseAccountData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
}

// Handler for creating a regular user
export async function createUserHandler(
  request: FastifyRequest<{ Body: BaseAccountData }>,
  reply: FastifyReply
) {
  try {
    const result = await accountManagementService.createUser(request.body);
    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create user'
    });
  }
}
// Get all users
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
    console.error('Error fetching users:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch users'
    });
  }
}

// Get user by ID
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
    console.error('Error fetching user:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch user'
    });
  }
}

// Update user
export async function updateUserHandler(
  request: FastifyRequest<{ 
    Params: { id: string }, 
    Body: Partial<BaseAccountData> 
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const updateData = request.body;
    const result = await accountManagementService.updateUser(id, updateData);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to update user'
    });
  }
}

// Delete user
export async function deleteUserHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await accountManagementService.deleteUser(id);
    return reply.code(200).send({
      success: true,
      message: result.message
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to delete user'
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



// Handler for creating a regular Helper
export async function createHelperHandler(
  request: FastifyRequest<{ Body: BaseAccountData }>,
  reply: FastifyReply
) {
  try {
    const result = await accountManagementService.createHelper(request.body);
    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating helper:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create helper'
    });
  }
}
// Get all helpers
export async function getHelpersHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const result = await accountManagementService.getHelpers();
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching helpers:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch helpers'
    });
  }
}

// Get helper by ID
export async function getHelperByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await accountManagementService.getHelperById(id);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching helper:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch helper'
    });
  }
}

// Update helper
export async function updateHelperHandler(
  request: FastifyRequest<{ 
    Params: { id: string }, 
    Body: Partial<BaseAccountData> 
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const updateData = request.body;
    const result = await accountManagementService.updateHelper(id, updateData);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error updating helper:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to update helper'
    });
  }
}

// Delete helper
export async function deleteHelperHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await accountManagementService.deleteHelper(id);
    return reply.code(200).send({
      success: true,
      message: result.message
    });
  } catch (error) {
    console.error('Error deleting helper:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to delete helper'
    });
  }
}

