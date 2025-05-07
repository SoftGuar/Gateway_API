import { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';

const registerMiddlewares = (fastify: FastifyInstance) => {
  fastify.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  });
};

export default registerMiddlewares;