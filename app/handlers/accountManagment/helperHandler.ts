import { FastifyRequest, FastifyReply } from 'fastify';
import { AccountManagementService } from '../../services/accountManagementService/accountManagement.service';

interface HelperData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
  }
  

const accountManagementService = new AccountManagementService();

// Handler for creating an Helper
export async function createHelperHandler(
  request: FastifyRequest<{ Body: HelperData }>,
  reply: FastifyReply
) {
  try {
    const result = await accountManagementService.createHelper(request.body);
    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating Helper:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create Helper'
    });
  }
}

// Handler for getting all Helpers
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
    console.error('Error fetching Helpers:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch Helpers'
    });
  }
}

// Handler for getting Helper by ID
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
    console.error(`Error fetching Helper with ID ${request.params.id}:`, error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch Helper'
    });
  }
}

// Handler for updating Helper
export async function updateHelperHandler(
  request: FastifyRequest<{ Params: { id: string }, Body: Partial<HelperData> }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await accountManagementService.updateHelper(id, request.body);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(`Error updating Helper with ID ${request.params.id}:`, error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to update Helper'
    });
  }
}

// Handler for deleting Helper
export async function deleteHelperHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await accountManagementService.deleteHelper(id);
    return reply.code(200).send({
      success: true,
      ...result
    });
  } catch (error) {
    console.error(`Error deleting Helper with ID ${request.params.id}:`, error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to delete Helper'
    });
  }
}