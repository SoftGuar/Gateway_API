import { FastifyRequest, FastifyReply } from 'fastify';
import { AdminService } from '../../services/adminService/admin.service';

const adminService = new AdminService();
interface ProductData {
    name: string;
    description: string | null;
    price: number;

}

// Handler for creating a product
export async function createProductHandler(
  request: FastifyRequest<{ Body: ProductData }>,
  reply: FastifyReply
) {
  try {
    const result = await adminService.createProduct(request.body);
    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create product'
    });
  }
}

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

// Handler for updating a product
export async function updateProductHandler(
  request: FastifyRequest<{ Params: { id: string }, Body: Partial<ProductData> }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await adminService.updateProduct(id, request.body);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to update product'
    });
  }
}

// Handler for deleting a product
export async function deleteProductHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await adminService.deleteProduct(id);
    return reply.code(200).send({
      success: true,
      message: result.message
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to delete product'
    });
  }
}