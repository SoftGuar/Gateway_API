import { FastifyRequest, FastifyReply } from 'fastify';
import { AdminService } from '../../services/adminService/admin.service';

const adminService = new AdminService();
  
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

// Handler for getting a dispositive by product ID
export async function getDispositiveByProductIdHandler(
  request: FastifyRequest<{ Params: { productId: string } }>,
  reply: FastifyReply
) {
  try {
    const { productId } = request.params;
    const result = await adminService.getDispositiveByProductId(productId);
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
