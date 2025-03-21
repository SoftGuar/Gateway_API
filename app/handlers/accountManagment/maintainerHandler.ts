import { FastifyRequest, FastifyReply } from 'fastify';
import { AccountManagementService } from '../../services/accountManagementService/accountManagement.service';

interface MaintainerData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
  }
  

const accountManagementService = new AccountManagementService();

// Handler for creating an Maintainer
export async function createMaintainerHandler(
  request: FastifyRequest<{ Body: MaintainerData }>,
  reply: FastifyReply
) {
  try {
    const result = await accountManagementService.createMaintainer(request.body);
    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating Maintainer:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create Maintainer'
    });
  }
}

// Handler for getting all Maintainers
export async function getMaintainersHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const result = await accountManagementService.getMaintainers();
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching Maintainers:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch Maintainers'
    });
  }
}

// Handler for getting Maintainer by ID
export async function getMaintainerByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await accountManagementService.getMaintainerById(id);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(`Error fetching Maintainer with ID ${request.params.id}:`, error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch Maintainer'
    });
  }
}

// Handler for updating Maintainer
export async function updateMaintainerHandler(
  request: FastifyRequest<{ Params: { id: string }, Body: Partial<MaintainerData> }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await accountManagementService.updateMaintainer(id, request.body);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(`Error updating Maintainer with ID ${request.params.id}:`, error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to update Maintainer'
    });
  }
}

// Handler for deleting Maintainer
export async function deleteMaintainerHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await accountManagementService.deleteMaintainer(id);
    return reply.code(200).send({
      success: true,
      ...result
    });
  } catch (error) {
    console.error(`Error deleting Maintainer with ID ${request.params.id}:`, error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to delete Maintainer'
    });
  }
}