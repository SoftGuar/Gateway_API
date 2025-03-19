import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthenticationService } from '../../services/authentication/authenticationService';


export async function loginHandler(
  request: FastifyRequest<{
    Body: {
      email: string;
      password: string;
      role: string;
    }
  }>,
  reply: FastifyReply
) {
  const authService = new AuthenticationService();

  try {
    const loginResponse = await authService.login(request.body);
    
    // Initialize a cookie named "token" with the login token.
    reply.header('Authorization', `Bearer ${loginResponse.token}`);


    if (loginResponse.token === undefined || loginResponse.token === null || loginResponse.token === '') {
      return reply.code(401).send({
        success: false,
        message: 'Login failed'
      });
    }

    return reply.code(200).send({
      success: true,
      data: loginResponse
    });
  } catch (error) {
    console.error('Error in loginHandler:', error);
    return reply.code(401).send({
      success: false,
      message: 'Login failed'
    });
  }
}