import { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import requestLoggerMiddleware from './RequestLoggerMiddleware';

const registerMiddlewares = (fastify: FastifyInstance) => {

  requestLoggerMiddleware(fastify);

  
  fastify.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  });
};

export default registerMiddlewares;