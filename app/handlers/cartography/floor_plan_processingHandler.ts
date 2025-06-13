import { FastifyRequest, FastifyReply } from 'fastify';
import { CartographieService } from '../../services/cartographie/cartographie.service';

const cartographieService = new CartographieService();

export async function processFloorPlanHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // Simple redirection vers le service Python
    const response = await cartographieService.floorPlan.processFloorPlan(request);
    
    // Forward la réponse telle quelle
    const data = await response.json();
    
    return reply
      .code(response.status)
      .headers(Object.fromEntries(response.headers.entries()))
      .send(data);

  } catch (error) {
    console.error('Gateway error:', error);
    return reply.code(500).send({
      error: 'Gateway error',
      message: 'Failed to reach floor plan service'
    });
  }
}