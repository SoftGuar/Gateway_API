import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthenticationService } from '../services/authentication/authenticationService';

async function checkRole(req: FastifyRequest, reply: FastifyReply, role: string) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return reply.code(401).send({
      success: false,
      message: 'Missing or invalid Authorization header'
    });
  }

  const token = authHeader.split(' ')[1];
  const authService = new AuthenticationService();

  try {
    const decoded = await authService.verifyToken(token);

    console.log('Decoded token:', decoded.role);
    if (decoded.role !== role) {
      return reply.code(403).send({
        success: false,
        message: 'Access denied. Only admins can perform this action.'
      });
    }
  } catch (error) {
    return reply.code(401).send({
      success: false,
      message: 'Token verification failed'
    });
  }
}

export async function checkAdminRole(req: FastifyRequest, reply: FastifyReply) {
  return checkRole(req, reply, 'admin');
}