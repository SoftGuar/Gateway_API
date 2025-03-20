import { FastifyRequest, FastifyReply } from 'fastify';
import { AdminService } from '../../services/adminService/admin.service';

const adminService = new AdminService();

interface DispositiveData {
    type: string;
    start_date: string;
    end_date: string;
    initial_state: string;
    MAC: string;
    state: string;
    product_id:number;
}

interface BlockDispositiveInput  {
    blocked: boolean;
  };


// Handler for creating a dispositive
export async function createDispositiveHandler(
  request: FastifyRequest<{ Body: DispositiveData }>,
  reply: FastifyReply
) {
  try {
    const result = await adminService.createDispositive(request.body);
    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating dispositive:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create dispositive'
    });
  }
}

// Handler for getting all dispositives
export async function getDispositivesHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const result = await adminService.getDispositives();
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching dispositives:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch dispositives'
    });
  }
}

// Handler for getting a dispositive by ID
export async function getDispositiveByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await adminService.getDispositiveById(id);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching dispositive:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch dispositive'
    });
  }
}

// Handler for updating a dispositive
export async function updateDispositiveHandler(
  request: FastifyRequest<{ Params: { id: string }, Body: Partial<DispositiveData> }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await adminService.updateDispositive(id, request.body);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error updating dispositive:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to update dispositive'
    });
  }
}

// Handler for deleting a dispositive
export async function deleteDispositiveHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await adminService.deleteDispositive(id);
    return reply.code(200).send({
      success: true,
      message: result.message
    });
  } catch (error) {
    console.error('Error deleting dispositive:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to delete dispositive'
    });
  }
}

// Handler for assigning a user to a dispositive
export async function assignUserHandler(
  request: FastifyRequest<{ Params: { id: string }, Body: { user_id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const { user_id } = request.body;
    const result = await adminService.assignUser(id, user_id);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error assigning user to dispositive:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to assign user'
    });
  }
}

// Handler for blocking/unblocking a dispositive
export async function toggleDispositiveBlockHandler(
  request: FastifyRequest<{ Params: { id: string }, Body: BlockDispositiveInput }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await adminService.toggleDispositiveBlock(id, request.body);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error toggling dispositive block status:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to toggle dispositive block status'
    });
  }
}

// Handler for getting a dispositive by product ID
export async function getDispositiveByProductIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await adminService.getDispositiveByProductId(id);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching dispositive by product ID:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch dispositive by product ID'
    });
  }
}