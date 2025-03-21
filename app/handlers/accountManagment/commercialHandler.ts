import { FastifyRequest, FastifyReply } from 'fastify';
import { AccountManagementService } from '../../services/accountManagementService/accountManagement.service';

interface commercialData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
  }
  

const accountManagementService = new AccountManagementService();

// Handler for creating an commercial
export async function createCommercialHandler(
  request: FastifyRequest<{ Body: commercialData }>,
  reply: FastifyReply
) {
  try {
    const result = await accountManagementService.createCommercial(request.body);
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

// Handler for getting all commercials
export async function getCommercialsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const result = await accountManagementService.getCommercials();
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

// Handler for getting commercial by ID
export async function getCommercialByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await accountManagementService.getCommercialById(id);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(`Error fetching commercial with ID ${request.params.id}:`, error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch commercial'
    });
  }
}

// Handler for updating commercial
export async function updateCommercialHandler(
  request: FastifyRequest<{ Params: { id: string }, Body: Partial<commercialData> }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await accountManagementService.updateCommercial(id, request.body);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(`Error updating commercial with ID ${request.params.id}:`, error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to update commercial'
    });
  }
}

// Handler for deleting commercial
export async function deleteCommercialHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await accountManagementService.deleteCommercial(id);
    return reply.code(200).send({
      success: true,
      ...result
    });
  } catch (error) {
    console.error(`Error deleting commercial with ID ${request.params.id}:`, error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to delete commercial'
    });
  }
}