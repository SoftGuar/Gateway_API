import { FastifyRequest, FastifyReply } from 'fastify';
import { AccountManagementService } from '../../services/accountManagementService/accountManagement.service';

interface adminData {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone?: string;
    privilege: number;
    add_by: number;      
  }
  

const accountManagementService = new AccountManagementService();

// Handler for creating an admin
export async function createAdminHandler(
  request: FastifyRequest<{ Body: adminData }>,
  reply: FastifyReply
) {
  try {
    const result = await accountManagementService.createAdmin(request.body);
    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating admin:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create admin'
    });
  }
}

// Handler for getting all admins
export async function getAdminsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const result = await accountManagementService.getAdmins();
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching admins:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch admins'
    });
  }
}

// Handler for getting admin by ID
export async function getAdminByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await accountManagementService.getAdminById(id);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(`Error fetching admin with ID ${request.params.id}:`, error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch admin'
    });
  }
}

// Handler for updating admin
export async function updateAdminHandler(
  request: FastifyRequest<{ Params: { id: string }, Body: Partial<adminData> }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await accountManagementService.updateAdmin(id, request.body);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(`Error updating admin with ID ${request.params.id}:`, error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to update admin'
    });
  }
}

// Handler for deleting admin
export async function deleteAdminHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await accountManagementService.deleteAdmin(id);
    return reply.code(200).send({
      success: true,
      ...result
    });
  } catch (error) {
    console.error(`Error deleting admin with ID ${request.params.id}:`, error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to delete admin'
    });
  }
}