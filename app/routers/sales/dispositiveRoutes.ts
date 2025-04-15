import { FastifyInstance } from 'fastify';
import * as handler from '../../handlers/sales/dispositiveHandler';

async function dispositiveRoutes(fastify: FastifyInstance) {
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
                        psuperAdminRouterroperties: {
                        id: { type: 'number' },
                        type: { type: 'string' },
                        start_date: { type: 'string', format: 'date-time' },
                        end_date: { type: 'string', format: 'date-time' },
                        initial_state: { type: 'string' },
                        MAC: { type: 'string' },
                        state: { type: 'string' },
                        product_id: { type: 'number' },
                        user_id: { type: ['number', 'null'] },
                        },
                    },
                    500: {
                        type: 'object',
                        properties: {
                        success: { type: 'boolean' },
                        message: { type: 'string' },
                        },
                    },
                },
            },
        },
        handler.findAvailableDispositiveHandler
    );
}

export default dispositiveRoutes;