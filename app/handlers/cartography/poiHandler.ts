// handlers/maintainer/poiHandler.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { CartographieService } from '../../services/cartographie/cartographie.service';

const cartographieService = new CartographieService();

// Handler for creating a POI
export async function createPOIHandler(
  request: FastifyRequest<{ 
    Body: { 
      name: string; 
      description?: string; 
      category_id: string; 
      x: number; 
      y: number; 
      zone_id?: string; 
      floor_id: string; 
    } 
  }>,
  reply: FastifyReply
) {
  try {
    const result = await cartographieService.poi.createPOI(request.body);
    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating POI:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create POI'
    });
  }
}


// Handler for getting a POI by ID
export async function getPOIByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await cartographieService.poi.getPOIById(id);
    if (!result) {
      return reply.code(404).send({
        success: false,
        message: 'POI not found'
      });
    }
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching POI:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch POI'
    });
  }
}

// Handler for updating a POI
export async function updatePOIHandler(
  request: FastifyRequest<{ 
    Params: { id: string }; 
    Body: { 
      name?: string; 
      description?: string; 
      category_id?: string; 
      x?: number; 
      y?: number; 
    } 
  }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await cartographieService.poi.updatePOI(id, request.body);
    if (!result) {
      return reply.code(404).send({
        success: false,
        message: 'POI not found'
      });
    }
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error updating POI:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to update POI'
    });
  }
}

// Handler for deleting a POI
export async function deletePOIHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await cartographieService.poi.deletePOI(id);
    if (!result) {
      return reply.code(404).send({
        success: false,
        message: 'POI not found'
      });
    }
    return reply.code(200).send({
      success: true,
      message: 'POI deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting POI:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to delete POI'
    });
  }
}

// Handler for getting POIs by floor
export async function getPOIsByFloorHandler(
  request: FastifyRequest<{ Params: { floorId: string } }>,
  reply: FastifyReply
) {
  try {
    const { floorId } = request.params;
    const result = await cartographieService.poi.getPOIsByFloor(floorId);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching POIs by floor:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch POIs by floor'
    });
  }
}

// Handler for searching POIs
export async function searchPOIsHandler(
  request: FastifyRequest<{ Querystring: { query: string } }>,
  reply: FastifyReply
) {
  try {
    const { query } = request.query;
    const result = await cartographieService.poi.searchPOIs(query);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error searching POIs:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to search POIs'
    });
  }
}

// Handler for getting POI categories
export async function getPOICategoriesHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const result = await cartographieService.poi.getCategories();
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching POI categories:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch POI categories'
    });
  }
}