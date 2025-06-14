import { FastifyRequest, FastifyReply } from 'fastify';
import { CartographieService } from '../../services/cartographie/cartographie.service';
import { AccountService } from '../../services/account/account.service';
import { FloorCreateData, FloorUpdateData } from '../../services/cartographie/types';

const cartographieService = new CartographieService();

// Handler for getting all floors
export async function getFloorsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const result = await cartographieService.floor.getFloors();
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching floors:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch floors'
    });
  }
}

// Handler for creating floor
export async function createFloorHandler(
  request: FastifyRequest<{ Body: FloorCreateData }>,
  reply: FastifyReply
) {
  try {
    const authHeader = request.headers.authorization;
    let createdBy = 'unknown';
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const accountService = new AccountService();
      const userInfo = await accountService.getProfile(token);
      createdBy = `${userInfo.first_name} ${userInfo.last_name}` || "Unknown";
    }
    const result = await cartographieService.floor.createFloor({ ...request.body, createdBy });
    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating floor:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create floor'
    });
  }
}

// Handler for getting floor by ID
export async function getFloorByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await cartographieService.floor.getFloorById(id);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching floor:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch floor'
    });
  }
}

// Handler for updating floor
export async function updateFloorHandler(
  request: FastifyRequest<{ Params: { id: string }; Body: FloorUpdateData }>,
  reply: FastifyReply
) {
  try {
    const authHeader = request.headers.authorization;
    let updatedBy = 'unknown';
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const accountService = new AccountService();
      const userInfo = await accountService.getProfile(token);
      updatedBy = `${userInfo.first_name} ${userInfo.last_name}` || "Unknown";
    }
    const { id } = request.params;
    const result = await cartographieService.floor.updateFloor(id, { ...request.body, updatedBy });
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error updating floor:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to update floor'
    });
  }
}

// Handler for getting floor image
export async function getFloorImageHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await cartographieService.floor.getFloorImage(id);
    
    // Convert Blob to Buffer for Fastify response
    const buffer = await result.arrayBuffer();
    
    return reply
      .type('image/png')
      .code(200)
      .send(Buffer.from(buffer));
  } catch (error) {
    console.error('Error fetching floor image:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch floor image'
    });
  }
}