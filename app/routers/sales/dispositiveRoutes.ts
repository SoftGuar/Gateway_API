import { FastifyInstance } from 'fastify';
import * as handler from '../../handlers/sales/dispositiveHandler';

async function dispositiveRoutes(fastify: FastifyInstance) {
    fastify.get(
        '/',
        {
            schema: {
                description: 'Get all dispositives',
                tags: ['Sales: Dispositive Management'],
                summary: 'Fetch all available dispositives',
                response: {
                    200: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                name: { type: 'string' },
                                status: { type: 'string' },
                            },
                        },
                    },
                },
            },
        },
        handler.getAllDispositivesHandler
    );

    fastify.get(
        '/:product_id',
        {
            schema: {
                description: 'Find available dispositive by product ID',
                summary: 'Fetch an available dispositive for a product',
                tags: ['Sales: Dispositive Management'],
                params: {
                    type: 'object',
                    properties: {
                        product_id: { type: 'string' },
                    },
                    required: ['product_id'],
                },
                response: {
                    200: {
                        type: 'object',
                        properties: {
                            id: { type: 'string' },
                            name: { type: 'string' },
                            status: { type: 'string' },
                        },
                    },
                },
            },
        },
        handler.findAvailableDispositiveHandler
    );
}

export default dispositiveRoutes;