// handlers/maintainer/zoneHandler.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { CartographieService } from '../../services/cartographie/cartographie.service';

const cartographieService = new CartographieService();

// Handler for creating a zone
export async function createZoneHandler(
  request: FastifyRequest<{ 
    Body: { 
      name: string; 
      color: string; 
      type_id: string; 
      shape: Array<{ type: string; coordinates: number[][] }>; 
      floor_id: string; 
    } 
  }>,
  reply: FastifyReply
) {
  try {
    const result = await cartographieService.zone.createZone(request.body);
    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating zone:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create zone'
    });
  }
}



// Handler for getting a zone by ID
export async function getZoneByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await cartographieService.zone.getZoneById(id);
    if (!result) {
      return reply.code(404).send({
        success: false,
        message: 'Zone not found'
      });
    }
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching zone:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch zone'
    });
  }
}

// Handler for updating a zone
export async function updateZoneHandler(
  request: FastifyRequest<{ 
    Params: { id: string }; 
    Body: { 
      name?: string; 
      color?: string; 
      type_id?: string; 
      shape?: Array<{ type: string; coordinates: number[][] }>; 
    } 
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await cartographieService.zone.updateZone(id, request.body);
    if (!result) {
      return reply.code(404).send({
        success: false,
        message: 'Zone not found'
      });
    }
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error updating zone:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to update zone'
    });
  }
}

// Handler for deleting a zone
export async function deleteZoneHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await cartographieService.zone.deleteZone(id);
    if (!result) {
      return reply.code(404).send({
        success: false,
        message: 'Zone not found'
      });
    }
    return reply.code(200).send({
      success: true,
      message: 'Zone deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting zone:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to delete zone'
    });
  }
}

// Handler for getting zones by floor
export async function getZonesByFloorHandler(
  request: FastifyRequest<{ Params: { floorId: string } }>,
  reply: FastifyReply
) {
  try {
    const { floorId } = request.params;
    const result = await cartographieService.zone.getZonesByFloor(floorId);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching zones by floor:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch zones by floor'
    });
  }
}

// Handler for getting zone types
export async function getZoneTypesHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const result = await cartographieService.zone.getZoneTypes();
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching zone types:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch zone types'
    });
  }
}