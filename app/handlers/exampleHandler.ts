import { FastifyRequest, FastifyReply } from 'fastify';

async function getExample(request: FastifyRequest, reply: FastifyReply) {
  // Handler logic
  return { message: 'Hello from example handler! ci/cd working ?' };
}

export { getExample };