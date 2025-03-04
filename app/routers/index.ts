import exampleRoutes from './example.routes';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';

const registerRoutes = (fastify: FastifyInstance) => {
  // Enregistrer les routes d'exemple avec un préfixe
  fastify.register(exampleRoutes, { prefix: '/example' });
};

export default registerRoutes;