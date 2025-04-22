import { FastifyRequest, FastifyReply } from 'fastify';
import { HelperService } from '../../services/accountManagementService/helper.service';
import { AuthenticationService } from '../../services/authentication/authenticationService';

const helperService = new HelperService();


// Handler for getting helper's usesr
export async function getHelperUsersHandler(request: FastifyRequest, reply: FastifyReply) {
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

      // Get helper ID from token
      const authService = new AuthenticationService();
      const decoded = await authService.verifyToken(token);
      const Id = decoded.userId;

      // Get users for the current helper
      const result = await helperService.getHelperUsers(Id);

      return reply.code(200).send({
        success: true,
        data: result
      });
    } catch (error) {
      console.error(`Error fetching users for helper:`, error);
      return reply.code(500).send({
        success: false,
        message: 'Failed to fetch helper userss'
      });
    }
}


