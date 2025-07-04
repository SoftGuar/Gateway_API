import * as th from '../../handlers/sales/transactionHandler';
import { FastifyInstance } from 'fastify';

async function transactionRoutes(fastify: FastifyInstance) {
    fastify.post('/', { schema: createTransactionSchema }, th.createTransactionHandler);
    fastify.get('/', { schema: getTransactionsSchema }, th.getTransactionsHandler);
    fastify.put('/:id', { schema: updateTransactionSchema }, th.updateTransactionHandler);
    fastify.get('/:id', { schema: getTransactionByIdSchema }, th.getTransactionByIdHandler);
    fastify.delete('/:id', { schema: deleteTransactionSchema }, th.deleteTransactionHandler);
    fastify.get('/sales', { schema: getSalesSchema }, th.fetchSalesHandler);
    fastify.put('/sales/:transaction_id/:dispositive_id', { schema: confirmProductTransactionSchema }, th.confirmProductTransactionHandler);
}

export default transactionRoutes;
const confirmProductTransactionSchema = {
    description: 'Confirm Product Transaction',
    tags: ['Sales: Transactions Management'],
    summary: 'This endpoint confirms a product transaction by its ID.',
    params: {
        type: 'object',
        properties: {
            transaction_id: { type: 'number' },
            dispositive_id: { type: 'number' }
        },
        required: ['transaction_id', 'dispositive_id']
    },
    response: {
        200: {
            description: 'Product transaction confirmed.',
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                data: {
                    type: 'object',
                    properties: {
                        dispositive_id: { type: 'number' },
                        transaction_id: { type: 'number' },
                        isConfirmed: { type: 'boolean' },
                        created_at: { type: 'string', format: 'date-time' },
                        updated_at: { type: 'string', format: 'date-time' }
                    }
                }
            }
        },
        500: {
            description: 'Internal server error.',
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                message: { type: 'string' }
            }
        }
    }
};
const getSalesSchema = {
    description: 'Get All Sales',
    tags: ['Sales: Transactions Management'],
    summary: 'This endpoint retrieves all sales.',
    response: {
        200: {
            description: 'List of sales.',
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            transactionId: { type: 'number' },
                            userName: { type: 'string' },
                            commercialName: { type: 'string' },
                            date: { type: 'string', format: 'date-time' },
                            dispositiveId: { type: 'number' },
                            Status: { type: 'boolean' }
                        }
                    }
                }
            }
        },
        500: {
            description: 'Internal server error.',
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                message: { type: 'string' }
            }
        }
    }
};
const createTransactionSchema = {
    description: 'Add Transaction',
    tags: ['Sales: Transactions Management'],
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
                success: { type: 'boolean' },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        user_id: { type: 'number' },
                        commercial_id: { type: 'number' },
                        processed: { type: 'boolean' },
                        date: { type: 'string', format: 'date-time' }
                    }
                }
            }
        },
        500: {
            description: 'Internal server error.',
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                message: { type: 'string' }
            }
        }
    }
};

const getTransactionsSchema = {
    description: 'Get All Transactions',
    tags: ['Sales: Transactions Management'],
    summary: 'This endpoint retrieves all transactions.',
    response: {
        200: {
            description: 'List of transactions.',
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            id: { type: 'number' },
                            user_id: { type: 'number' },
                            commercial_id: { type: 'number' },
                            processed: { type: 'boolean' },
                            date: { type: 'string', format: 'date-time' }
                        }
                    }
                }
            }
        },
        500: {
            description: 'Internal server error.',
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                message: { type: 'string' }
            }
        }
    }
};

const getTransactionByIdSchema = {
    description: 'Get Transaction By ID',
    tags: ['Sales: Transactions Management'],
    summary: 'This endpoint retrieves a transaction by its ID.',
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' }
        },
        required: ['id']
    },
    response: {
        200: {
            description: 'Transaction details.',
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        user_id: { type: 'number' },
                        commercial_id: { type: 'number' },
                        processed: { type: 'boolean' },
                        date: { type: 'string', format: 'date-time' }
                    }
                }
            }
        },
        404: {
            description: 'Transaction not found.',
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                message: { type: 'string' }
            }
        },
        500: {
            description: 'Internal server error.',
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                message: { type: 'string' }
            }
        }
    }
};

const updateTransactionSchema = {
    description: 'Update Transaction',
    tags: ['Sales: Transactions Management'],
    summary: 'This endpoint updates a transaction by its ID.',
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' }
        },
        required: ['id']
    },
    body: {
        type: 'object',
        properties: {
            user_id: { type: 'number' },
            commercial_id: { type: 'number' },
            processed: { type: 'boolean' },
            date: { type: 'string', format: 'date-time' }
        }
    },
    response: {
        200: {
            description: 'Transaction successfully updated.',
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                data: {
                    type: 'object',
                    properties: {
                        id: { type: 'number' },
                        user_id: { type: 'number' },
                        commercial_id: { type: 'number' },
                        processed: { type: 'boolean' },
                        date: { type: 'string', format: 'date-time' }
                    }
                }
            }
        },
        500: {
            description: 'Internal server error.',
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                message: { type: 'string' }
            }
        }
    }
};

const deleteTransactionSchema = {
    description: 'Delete Transaction',
    tags: ['Sales: Transactions Management'],
    summary: 'This endpoint is used to delete a specific transaction with the given ID.',
    params: {
        type: 'object',
        properties: {
            id: { type: 'number' }
        },
        required: ['id']
    },
    response: {
        200: {
            description: 'Transaction successfully deleted.',
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                message: { type: 'string' }
            }
        },
        500: {
            description: 'Internal server error.',
            type: 'object',
            properties: {
                success: { type: 'boolean' },
                message: { type: 'string' }
            }
        }
    }
};