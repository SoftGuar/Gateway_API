import { FastifyRequest, FastifyReply } from 'fastify';
import { AccountManagementService } from '../../services/accountManagementService/accountManagement.service';
import { AuthenticationService } from '../../services/authentication/authenticationService';


const accountManagementService = new AccountManagementService();
interface HelperRecommendationData {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
  }
  

export async function createHelperRecommendaation(
    request: FastifyRequest<{ Body: HelperRecommendationData }>,
     reply: FastifyReply) {
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
      const mergedData = {
        ...request.body,
        user_id: userId, 
      };
      

      // Creat helper 
      const result = await accountManagementService.createHelperRecommendation(mergedData);

      return reply.code(200).send({
        success: true,
        data: result
      });
    } catch (error) {
      console.error(`Error creating recommendation `, error);
      return reply.code(500).send({
        success: false,
        message: 'Failed to create recommendation'
      });
    }
}

