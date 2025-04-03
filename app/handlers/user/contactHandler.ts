import { FastifyRequest, FastifyReply } from 'fastify';
import { AccountManagementService } from '../../services/accountManagementService/accountManagement.service';
import { AuthenticationService } from '../../services/authentication/authenticationService';

const accountManagementService = new AccountManagementService();

export async function getUserHelpersHandler(request: FastifyRequest, reply: FastifyReply) {
    try {
      // Extract the token 
      const authHeader = request.headers.authorization;
      
      if (!authHeader) {
        return reply.code(401).send({
          success: false,
          message: 'Authorization header missing'
        });
      }

      const token = authHeader.split(' ')[1];

      // Get user ID from token
      const authService = new AuthenticationService();
      const decoded = await authService.verifyToken(token);
      const userId = decoded.userId;

      // Get helpers for the current user
      const result = await accountManagementService.getUserHelpers(userId);

      return reply.code(200).send({
        success: true,
        data: result
      });
    } catch (error) {
      console.error(`Error fetching helpers for user:`, error);
      return reply.code(500).send({
        success: false,
        message: 'Failed to fetch user helpers'
      });
    }
}

// Add a helper to the current user
export async function addHelperToUserHandler(
  request: FastifyRequest<{ Params: { helperId: string } }>,
  reply: FastifyReply
) {
  try {
    // Extract the token
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return reply.code(401).send({
        success: false,
        message: 'Authorization header missing'
      });
    }

    const token = authHeader.split(' ')[1];

    // Get user ID from token
    const authService = new AuthenticationService();
    const decoded = await authService.verifyToken(token);
    const userId = decoded.userId;

    const { helperId } = request.params;
    // Add helper to the current user
    const result = await accountManagementService.addHelperToUser(userId, helperId);
    
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(`Error adding helper to user:`, error);

    const errorMessage = error instanceof Error ? error.message : 'Failed to add helper to user';

    return reply.code(500).send({
      success: false,
      message: errorMessage
    });
  }
}

// Remove a helper from the current user
export async function removeHelperFromUserHandler(
  request: FastifyRequest<{ Params: { helperId: string } }>,
  reply: FastifyReply
) {
  try {
    // Extract the token
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return reply.code(401).send({
        success: false,
        message: 'Authorization header missing'
      });
    }

    const token = authHeader.split(' ')[1];

    // Get user ID from token
    const authService = new AuthenticationService();
    const decoded = await authService.verifyToken(token);
    const userId = decoded.userId;

    const { helperId } = request.params;

    // Remove helper from the current user
    const result = await accountManagementService.removeHelperFromUser(userId, helperId);
    
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(`Error removing helper from user:`, error);

    const errorMessage = error instanceof Error ? error.message : 'Failed to remove helper from user';

    if (errorMessage === 'Helper not found' || errorMessage === 'Helper is not associated with this user') {
      return reply.code(404).send({
        success: false,
        message: errorMessage
      });
    }

    return reply.code(500).send({
      success: false,
      message: 'Failed to remove helper from user'
    });
  }
}
