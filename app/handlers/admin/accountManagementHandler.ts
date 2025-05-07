import { FastifyRequest, FastifyReply } from 'fastify';
import { AdminService } from '../../services/adminService/admin.service';
import { AccountManagementService } from '../../services/accountManagementService/accountManagement.service';
import { appEmitter } from '../../services/notifications/event';
const adminService = new AdminService();
const accountManagementService=new AccountManagementService();

interface BaseAccountData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
}

interface CreateUserData extends BaseAccountData {
  MAC: string;
}

// Handler for creating a regular user
export async function createUserHandler(
  request: FastifyRequest<{ Body: CreateUserData }>,
  reply: FastifyReply
) {
  try {
    const result = await adminService.createUser(request.body);
    appEmitter.emit('userCreated', {
      id: result.id,
      email: result.email,
      name: `${result.first_name} ${result.last_name}`,
    });
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
    const result = await adminService.getUsers();
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
    const result = await adminService.getUserById(id);
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
    const result = await adminService.updateUser(id, updateData);
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
    const result = await adminService.deleteUser(id);
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
    const result = await adminService.getUserHelpers(id);
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
    const result = await adminService.addHelperToUser(id, helperId);
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
    const result = await adminService.removeHelperFromUser(id, helperId);
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

export async function createAssistanceHandler(
  request: FastifyRequest<{ Body: BaseAccountData }>,
  reply: FastifyReply
) {
  try {
    const result = await accountManagementService.createAssistance(request.body);
    appEmitter.emit('userCreated', {
      id: result.id,
      email: result.email,
      name: `${result.first_name} ${result.last_name}`,
    });
    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating assistance:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create assistance'
    });
  }
}




// Handler for creating a regular Helper
export async function createHelperHandler(
  request: FastifyRequest<{ Body: BaseAccountData }>,
  reply: FastifyReply
) {
  try {
    const result = await adminService.createHelper(request.body);
    appEmitter.emit('userCreated', {
      id: result.id,
      email: result.email,
      name: `${result.first_name} ${result.last_name}`,
    });
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
    const result = await adminService.getHelpers();
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
    const result = await adminService.getHelperById(id);
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
    const result = await adminService.updateHelper(id, updateData);
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
    const result = await adminService.deleteHelper(id);
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


// Handler for creating a regular decider
export async function createDeciderHandler(
  request: FastifyRequest<{ Body: BaseAccountData }>,
  reply: FastifyReply
) {
  try {
    const result = await adminService.createDecider(request.body);
    appEmitter.emit('userCreated', {
      id: result.id,
      email: result.email,
      name: `${result.first_name} ${result.last_name}`,
    });
    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating decider:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create decider'
    });
  }
}
// Get all deciders
export async function getDecidersHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const result = await adminService.getDeciders();
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching deciders:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch deciders'
    });
  }
}

// Get decider by ID
export async function getDeciderByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await adminService.getDeciderById(id);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching decider:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch decider'
    });
  }
}

// Update decider
export async function updateDeciderHandler(
  request: FastifyRequest<{ 
    Params: { id: string }, 
    Body: Partial<BaseAccountData> 
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const updateData = request.body;
    const result = await adminService.updateDecider(id, updateData);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error updating decider:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to update decider'
    });
  }
}

// Delete decider
export async function deleteDeciderHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await adminService.deleteDecider(id);
    return reply.code(200).send({
      success: true,
      message: result.message
    });
  } catch (error) {
    console.error('Error deleting decider:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to delete decider'
    });
  }
}


// Handler for creating a regular commercial
export async function createCommercialHandler(
  request: FastifyRequest<{ Body: BaseAccountData }>,
  reply: FastifyReply
) {
  try {
    const result = await adminService.createCommercial(request.body);
    appEmitter.emit('userCreated', {
      id: result.id,
      email: result.email,
      name: `${result.first_name} ${result.last_name}`,
    });
    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating commercial:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create commercial'
    });
  }
}
// Get all commercials
export async function getCommercialsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const result = await adminService.getCommercials();
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching commercials:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch commercials'
    });
  }
}

// Get commercial by ID
export async function getCommercialByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await adminService.getCommercialById(id);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching commercial:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch commercial'
    });
  }
}

// Update commercial
export async function updateCommercialHandler(
  request: FastifyRequest<{ 
    Params: { id: string }, 
    Body: Partial<BaseAccountData> 
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const updateData = request.body;
    const result = await adminService.updateCommercial(id, updateData);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error updating commercial:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to update commercial'
    });
  }
}

// Delete commercial
export async function deleteCommercialHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await adminService.deleteCommercial(id);
    return reply.code(200).send({
      success: true,
      message: result.message
    });
  } catch (error) {
    console.error('Error deleting commercial:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to delete commercial'
    });
  }
}

// Handler for creating a regular Maintainer
export async function createMaintainerHandler(
  request: FastifyRequest<{ Body: BaseAccountData }>,
  reply: FastifyReply
) {
  try {
    const result = await adminService.createMaintainer(request.body);
    appEmitter.emit('userCreated', {
      id: result.id,
      email: result.email,
      name: `${result.first_name} ${result.last_name}`,
    });
    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating maintainer:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create maintainer'
    });
  }
}
// Get all maintainers
export async function getMaintainersHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const result = await adminService.getMaintainers();
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching Maintainers:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch maintainers'
    });
  }
}

// Get maintainer by ID
export async function getMaintainerByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await adminService.getMaintainerById(id);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching maintainer:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch maintainer'
    });
  }
}

// Update maintainer
export async function updateMaintainerHandler(
  request: FastifyRequest<{ 
    Params: { id: string }, 
    Body: Partial<BaseAccountData> 
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const updateData = request.body;
    const result = await adminService.updateMaintainer(id, updateData);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error updating maintainer:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to update maintainer'
    });
  }
}

// Delete maintainer
export async function deleteMaintainerHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await adminService.deleteMaintainer(id);
    return reply.code(200).send({
      success: true,
      message: result.message
    });
  } catch (error) {
    console.error('Error deleting maintainer:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to delete maintainer'
    });
  }
}