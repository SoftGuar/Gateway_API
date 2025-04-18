import { FastifyRequest, FastifyReply } from 'fastify';
import { AdminService } from '../../services/accountManagementService/admin.service';
import { AuthenticationService } from '../../services/authentication/authenticationService';

const adminService = new AdminService();
const authService = new AuthenticationService();
// Handler to create a new administrator account.
export async function createAdminHandler(
  request: FastifyRequest<{
    Body: {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      phone?: string;
      privilege: number;
    };
  }>,
  reply: FastifyReply
) {
  try {

    const authHeader = request.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.code(401).send({
        success: false,
        message: 'Missing or invalid Authorization header'
      });
    }
  
    const token = authHeader.split(' ')[1];
    
    const userObject = await authService.verifyToken(token)

    const addBy = userObject.userId;

    const adminData = {
        ...request.body,
        add_by: Number(addBy)
    }

    const newAdmin = await adminService.createAdmin(adminData);
    return reply.code(201).send({
      success: true,
      data: newAdmin
    });
  } catch (error) {
    console.error('Error creating admin:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create admin'
    });
  }
}

// Handler to retrieve the list of administrator accounts.
export async function getAdminsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const admins = await adminService.getAdmins();
    return reply.code(200).send({
      success: true,
      data: admins
    });
  } catch (error) {
    console.error('Error fetching admins:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to get admins'
    });
  }
}

// Handler to retrieve a single administrator account by ID.
export async function getAdminByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const admin = await adminService.getAdminById(request.params.id);
    if (!admin) {
      return reply.code(404).send({
        success: false,
        message: 'Admin not found'
      });
    }
    return reply.code(200).send({
      success: true,
      data: admin
    });
  } catch (error) {
    console.error('Error fetching admin:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to get admin'
    });
  }
}

// Handler to update an administrator account.
export async function updateAdminHandler(
  request: FastifyRequest<{
    Params: { id: string };
    Body: Partial<{
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      phone?: string;
    }>;
  }>,
  reply: FastifyReply
) {
  try {
    const updatedAdmin = await adminService.updateAdmin(request.params.id, request.body);
    return reply.code(200).send({
      success: true,
      data: updatedAdmin
    });
  } catch (error) {
    console.error('Error updating admin:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to update admin'
    });
  }
}

// Handler to delete an administrator account.
export async function deleteAdminHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const result = await adminService.deleteAdmin(request.params.id);
    return reply.code(200).send({
      success: true,
      message: result.message
    });
  } catch (error) {
    console.error('Error deleting admin:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to delete admin'
    });
  }
}