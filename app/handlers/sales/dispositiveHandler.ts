import { FastifyRequest, FastifyReply } from 'fastify';
import dispositiveService from '../../services/sales/dispositiveService';

// Handler for finding an available dispositive for a specific product
export async function findAvailableDispositiveHandler(
    request: FastifyRequest<{ Querystring: { product_id: number } }>,
    reply: FastifyReply
) {
    try {
        const { product_id } = request.query;
        const dispositive = await dispositiveService.findAvailableDispositive(product_id);
        return reply.code(200).send({
            success: true,
            data: dispositive,
        });
    } catch (error: any) {
        console.error('Error finding available dispositive:', error);
        return reply.code(500).send({
            success: false,
            message: error.message || 'Internal server error',
        });
    }
}