import { FastifyRequest, FastifyReply } from 'fastify';
import { AccountManagementService } from '../../services/accountManagementService/accountManagement.service';

interface DeciderData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
  }
  

const accountManagementService = new AccountManagementService();

// Handler for creating a Decider
export async function createDeciderHandler(
  request: FastifyRequest<{ Body: DeciderData }>,
  reply: FastifyReply
) {
  try {
    const result = await accountManagementService.createDecider(request.body);
    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating Decider:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create Decider'
    });
  }
}

// Handler for getting all Deciders
export async function getDecidersHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const result = await accountManagementService.getDeciders();
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching Deciders:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch Deciders'
    });
  }
}

// Handler for getting Decider by ID
export async function getDeciderByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await accountManagementService.getDeciderById(id);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(`Error fetching Decider with ID ${request.params.id}:`, error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch Decider'
    });
  }
}

// Handler for updating Decider
export async function updateDeciderHandler(
  request: FastifyRequest<{ Params: { id: string }, Body: Partial<DeciderData> }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await accountManagementService.updateDecider(id, request.body);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(`Error updating Decider with ID ${request.params.id}:`, error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to update Decider'
    });
  }
}

// Handler for deleting Decider
export async function deleteDeciderHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await accountManagementService.deleteDecider(id);
    return reply.code(200).send({
      success: true,
      ...result
    });
  } catch (error) {
    console.error(`Error deleting Decider with ID ${request.params.id}:`, error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to delete Decider'
    });
  }
}