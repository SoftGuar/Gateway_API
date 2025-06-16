import { FastifyRequest, FastifyReply } from 'fastify';
import { CartographieService } from '../../services/cartographie/cartographie.service';
import { NavigationObstacleRequest, NavigationRequest } from '../../services/cartographie/types';


const cartographieService = new CartographieService();

// Handler for creating environment
export async function navigateHandler(
  request: FastifyRequest<{ Body: NavigationRequest }>,
  reply: FastifyReply
) {
  try {
    const result = await cartographieService.navigation.navigate(request.body);
    
    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error navigating:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to navigate'
    });
  }
}

// Handler for navigating with obstacle
export async function navigateWithObstacleHandler(  
    request: FastifyRequest<{ Body: NavigationObstacleRequest }>,
    reply: FastifyReply
    ) {
    try {
        const result = await cartographieService.navigation.navigateWithObstacle(request.body);
    
        return reply.code(201).send({
        success: true,
        data: result
        });
    } catch (error) {
        console.error('Error navigating with obstacle:', error);
        return reply.code(500).send({
        success: false,
        message: 'Failed to navigate with obstacle'
        });
    }
    }