import { FastifyRequest, FastifyReply } from 'fastify';
import { AdminService } from '../../services/adminService/admin.service';

const adminService = new AdminService();
  

// Handler for getting all products
export async function getProductsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const result = await adminService.getProducts();
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch products'
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
    const result = await adminService.getProductById(id);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch product'
    });
  }
}

