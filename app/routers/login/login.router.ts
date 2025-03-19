import { FastifyInstance } from 'fastify';
import { loginHandler } from '../../handlers/login/loginHandler';
import { loginSchema } from './login.schema';

const loginRouter = async (fastify: FastifyInstance) => {
  fastify.post('/', { schema: loginSchema }, loginHandler);
};

export default loginRouter;