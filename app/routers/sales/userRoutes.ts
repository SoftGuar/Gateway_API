import { FastifyInstance } from 'fastify';
import * as um from '../../handlers/sales/userHandler';

async function userRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/',
    {
      schema: {
        tags: ['Sales'],
        description: 'This endpoint allows you to create a new user.',
        summary: 'Create a new user and helper accounts.',
        body: {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                first_name: { type: 'string', description: 'The first name of the user.' },
                last_name: { type: 'string', description: 'The last name of the user.' },
                email: { type: 'string', description: 'The email address of the user.' },
                password: { type: 'string', description: 'The password for the user account.' },
                phone: { type: 'string', description: 'The phone number of the user.' },
                role: { type: 'string', description: 'The role of the user.' },
              },
              required: ['first_name', 'last_name', 'email', 'password', 'phone', 'role'],
            },
            helper: {
              type: 'object',
              properties: {
                first_name: { type: 'string', description: 'The first name of the helper.' },
                last_name: { type: 'string', description: 'The last name of the helper.' },
                email: { type: 'string', description: 'The email address of the helper.' },
                password: { type: 'string', description: 'The password for the helper account.' },
                phone: { type: 'string', description: 'The phone number of the helper.' },
              },
              required: ['first_name', 'last_name', 'email', 'password', 'phone'],
            },
          },
          required: ['userData', 'helperData'],
        },
        response: {
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              message: { type: 'string' },
              userId: { type: 'string' },
              helperId: { type: 'string' },
            },
          },
        },
      },
    },
    um.createUserAndHelperHandler
  );

}

export default userRoutes;