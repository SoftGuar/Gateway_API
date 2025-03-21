import { FastifyRequest, FastifyReply } from 'fastify';
import { productService } from '../../services/sales/productService';

export async function getAllProductsHandler(
    request: FastifyRequest,
    reply: FastifyReply
) {
    try {
        const products = await productService.getAllProducts();
        return reply.code(200).send({
            success: true,
            data: products,
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return reply.code(500).send({
            success: false,
            message: 'Failed to fetch products',
        });
    }
}

// Handler for getting a product by ID
export async function getProductByIdHandler(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) {
    try {
        const { id } = request.params;
        const product = await productService.getProductById(Number(id));
        if (!product) {
            return reply.code(404).send({
                success: false,
                message: 'Product not found',
            });
        }
        return reply.code(200).send({
            success: true,
            data: product,
        });
    } catch (error) {
        console.error(`Error fetching product with ID ${request.params.id}:`, error);
        return reply.code(500).send({
            success: false,
            message: 'Failed to fetch product',
        });
    }
}