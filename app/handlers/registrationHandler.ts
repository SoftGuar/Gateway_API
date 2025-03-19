import { FastifyRequest, FastifyReply } from 'fastify';
import { AccountManagementService } from '../services/accountManagementService/accountManagement.service';

const service = new AccountManagementService();

export async function registerUser(
  request: FastifyRequest<{
    Body: {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      phone?: string;
    };
  }>,
  reply: FastifyReply
) {
  try {
    // Create the new user using the AccountManagementService
    const newUser = await service.createUser(request.body);
    return reply.code(201).send({
      success: true,
      data: newUser
    });
  } catch (error) {
    console.error('Registration error:', error);
    return reply.code(500).send({
      success: false,
      message: 'Registration failed. Please try again later.'
    });
  }
}