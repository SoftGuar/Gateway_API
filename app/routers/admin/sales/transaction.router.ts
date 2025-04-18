import { FastifyInstance } from 'fastify';
import {
    confirmProductTransactionHandler,
} from '../../../handlers/sales/transactionHandler';

import { checkAdminRole } from '../../../middlewares/roleCheck';

import {
    confirmProductTransactionSchema
} from './transaction.schema';

const adminTransactionRouter = async (fastify: FastifyInstance) => {
  // Register preHandler hook for admin authorization
  fastify.addHook('preHandler', checkAdminRole);

  // Create a product
    fastify.put('/:transaction_id/:dispositive_id', { schema: confirmProductTransactionSchema }, confirmProductTransactionHandler);

};

export default adminTransactionRouter;