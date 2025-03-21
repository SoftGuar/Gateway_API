import * as th from '../../handlers/sales/transactionHandler';
import { FastifyInstance } from 'fastify';

/**
 * Defines the routes for handling transaction-related operations.
 * 
 * @param fastify - The Fastify instance used to register the routes.
 * 
 * @remarks
 * This function registers the following routes:
 * - `POST /` - Creates a new transaction.
 * - `GET /` - Retrieves a list of all transactions.
 * - `PUT /:id` - Updates an existing transaction by its ID.
 * - `GET /:id` - Retrieves a specific transaction by its ID.
 * - `DELETE /:id` - Deletes a transaction by its ID.
 */
async function transactionRoutes(fastify: FastifyInstance) {
    fastify.post('/', th.createTransactionHandler)
    fastify.get('/', th.getTransactionsHandler)
    fastify.put('/:id', th.updateTransactionHandler)
    fastify.get('/:id', th.getTransactionByIdHandler)
    fastify.delete('/:id', th.deleteTransactionHandler)
}   
export default transactionRoutes;