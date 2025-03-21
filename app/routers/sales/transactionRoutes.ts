import * as th from '../../handlers/sales/transactionHandler';
import { FastifyInstance } from 'fastify';


async function transactionRoutes(fastify: FastifyInstance) {
    fastify.post('/', { schema: createTransactionSchema }, th.createTransactionHandler);
    fastify.get('/', { schema: getTransactionsSchema }, th.getTransactionsHandler);
    fastify.put('/:id', { schema: updateTransactionSchema }, th.updateTransactionHandler);
    fastify.get('/:id', { schema: getTransactionByIdSchema }, th.getTransactionByIdHandler);
    fastify.delete('/:id', { schema: deleteTransactionSchema }, th.deleteTransactionHandler);
}

export default transactionRoutes;


const createTransactionSchema = {
    description: 'Add Transaction',
    tags: ['Sales'],
    summary: 'This endpoint allows you to add a new transaction.',
    body: {
        type: 'object',
        required: ['user_id', 'commercial_id', 'date'],
        properties: {
            user_id: { type: 'number', description: 'The ID of the user associated with the transaction.' },
            commercial_id: { type: 'number', description: 'The ID of the commercial associated with the transaction.' },
            date: { type: 'string', format: 'date-time', description: 'The date and time of the transaction in ISO 8601 format.' }
        }
    },
    response: {
        201: {
            description: 'Transaction successfully created.',
            type: 'object',
            properties: {
                id: { type: 'number', description: 'The ID of the created transaction.' },
                user_id: { type: 'number', description: 'The ID of the user associated with the transaction.' },
                commercial_id: { type: 'number', description: 'The ID of the commercial associated with the transaction.' },
                processed: { type: 'boolean', description: 'Indicates whether the transaction has been processed.' },
                date: { type: 'string', format: 'date-time', description: 'The date and time of the transaction in ISO 8601 format.' }
            }
        }
    }
};

const getTransactionsSchema = {
    description: 'Get All Transactions',
    tags: ['Sales'],
    summary: 'This endpoint retrieves all transactions.',
    response: {
        200: {
            description: 'List of transactions.',
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number', description: 'The ID of the transaction.' },
                    user_id: { type: 'number', description: 'The ID of the user associated with the transaction.' },
                    commercial_id: { type: 'number', description: 'The ID of the commercial associated with the transaction.' },
                    processed: { type: 'boolean', description: 'Indicates whether the transaction has been processed.' },
                    date: { type: 'string', format: 'date-time', description: 'The date and time of the transaction in ISO 8601 format.' }
                }
            }
        }
    }
};

const getTransactionByIdSchema = {
    description: 'Get Transaction By ID',
    tags: ['Sales'],
    summary: 'This endpoint retrieves a transaction by its ID.',
    params: {
        type: 'object',
        properties: {
            id: { type: 'number', description: 'The ID of the transaction.' }
        },
        required: ['id']
    },
    response: {
        200: {
            description: 'Transaction details.',
            type: 'object',
            properties: {
                id: { type: 'number', description: 'The ID of the transaction.' },
                user_id: { type: 'number', description: 'The ID of the user associated with the transaction.' },
                commercial_id: { type: 'number', description: 'The ID of the commercial associated with the transaction.' },
                processed: { type: 'boolean', description: 'Indicates whether the transaction has been processed.' },
                date: { type: 'string', format: 'date-time', description: 'The date and time of the transaction in ISO 8601 format.' }
            }
        }
    }
};

const updateTransactionSchema = {
    description: 'Update Transaction',
    tags: ['Sales'],
    summary: 'This endpoint updates a transaction by its ID.',
    params: {
        type: 'object',
        properties: {
            id: { type: 'number', description: 'The ID of the transaction.' }
        },
        required: ['id']
    },
    body: {
        type: 'object',
        properties: {
            user_id: { type: 'number', description: 'The ID of the user associated with the transaction.' },
            commercial_id: { type: 'number', description: 'The ID of the commercial associated with the transaction.' },
            processed: { type: 'boolean', description: 'Indicates whether the transaction has been processed.' },
            date: { type: 'string', format: 'date-time', description: 'The date and time of the transaction in ISO 8601 format.' }
        }
    },
    response: {
        200: {
            description: 'Transaction successfully updated.',
            type: 'object',
            properties: {
                id: { type: 'number', description: 'The ID of the transaction.' },
                user_id: { type: 'number', description: 'The ID of the user associated with the transaction.' },
                commercial_id: { type: 'number', description: 'The ID of the commercial associated with the transaction.' },
                processed: { type: 'boolean', description: 'Indicates whether the transaction has been processed.' },
                date: { type: 'string', format: 'date-time', description: 'The date and time of the transaction in ISO 8601 format.' }
            }
        }
    }
};

const deleteTransactionSchema = {
    description: 'Delete Transaction',
    tags: ['Sales'],
    summary: 'This endpoint is used to delete a specific transaction with the given ID.',
    params: {
        type: 'object',
        properties: {
            id: { type: 'number', description: 'The ID of the transaction.' }
        },
        required: ['id']
    },
    response: {
        200: {
            description: 'Transaction successfully deleted.',
            type: 'object',
            properties: {
                id: { type: 'number', description: 'The ID of the deleted transaction.' },
                user_id: { type: 'number', description: 'The ID of the user associated with the transaction.' },
                commercial_id: { type: 'number', description: 'The ID of the commercial associated with the transaction.' },
                processed: { type: 'boolean', description: 'Indicates if the transaction has been processed.' },
                date: { type: 'string', format: 'date-time', description: 'The date of the transaction.' }
            }
        }
    }
};