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
              },
              required: ['first_name', 'last_name', 'email', 'password'],
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
              required: ['first_name', 'last_name', 'email', 'password'],
            },
          },
          required: ['user', 'helper'],
        },
        response: {
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              message: { type: 'string' },
              user: {
                type: 'object',
                properties: {
                  id: { type: 'number', description: 'The id of the user.' },
                  first_name: { type: 'string', description: 'The first name of the user.' },
                  last_name: { type: 'string', description: 'The last name of the user.' },
                  email: { type: 'string', description: 'The email address of the user.' },
                  password: { type: 'string', description: 'The password for the user account.' },
                  phone: { type: 'string', description: 'The phone number of the user.' },
                },
              },
              helper: {
                type: 'object',
                properties: {
                  id: { type: 'number', description: 'The id of the helper.' },
                  first_name: { type: 'string', description: 'The first name of the helper.' },
                  last_name: { type: 'string', description: 'The last name of the helper.' },
                  email: { type: 'string', description: 'The email address of the helper.' },
                  password: { type: 'string', description: 'The password for the helper account.' },
                  phone: { type: 'string', description: 'The phone number of the helper.' },
                },
              },
            },
          },
        },
      },
    },
    um.createUserAndHelperHandler
  );

}

export default userRoutes;