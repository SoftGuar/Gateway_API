import { FastifyRequest, FastifyReply } from 'fastify';
import { orderService } from '../../services/sales/orderService';


// Handler for placing an order
export async function placeOrderHandler(
    request: FastifyRequest<{ Body: { product_id: number; user_id: number; commercial_id: number } }>,
    reply: FastifyReply
) {
    try {
        const orderData = request.body;
        const orderResponse = await orderService.order(orderData);
        return reply.code(201).send({
            success: true,
            data: orderResponse,
        });
    } catch (error:any) {
        console.error('Error placing order:', error);
        return reply.code(500).send({
            success: false,
            message: error.message || 'Internal server error',
        });
    }
}