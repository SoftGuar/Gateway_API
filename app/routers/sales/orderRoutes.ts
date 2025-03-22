import { placeOrderHandler } from '../../handlers/sales/orderHandler';
import { FastifyInstance } from 'fastify';

async function orderRoutes(fastify: FastifyInstance) {
    fastify.post(
        '/',
        {
            schema: {
                tags: ['Sales: Orders Management'],
                description: 'Place an order',
                summary: 'Place an order for a product',
                body: {
                    type: 'object',
                    required: ['product_id', 'commercial_id', 'user_id'],
                    properties: {
                        product_id: { type: 'integer' },
                        commercial_id: { type: 'integer' },
                        user_id: { type: 'integer' },
                    },
                },
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            id: { type: 'integer', description: 'The ID of the newly created order' },
                            transaction_id: { type: 'integer', description: 'The transaction ID associated with the order' },
                            dispositive_id: { type: 'integer', description: 'The dispositive ID associated with the order' },
                            isConfirmed: { type: 'boolean', description: 'Indicates whether the order is confirmed' },
                        },
                    },
                    500:{
                        type: 'object',
                        properties: {
                            success: { type: 'boolean', enum: [false] },
                            message: { type: 'string', description: 'Error message describing the failure' },
                        },
                        example: {
                            success: false,
                            message: 'Failed to process order: Sales service error: No available dispositive found for this product',
                        }
                    }
                },
            },
        },
        placeOrderHandler
    );
}

export default orderRoutes;