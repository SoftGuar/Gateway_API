import { FastifyRequest, FastifyReply } from 'fastify';
import { AdminService } from '../../services/adminService/admin.service';

const adminService = new AdminService();

interface BaseAccountData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
}

// Handler for creating a regular user
export async function createUserHandler(
  request: FastifyRequest<{ Body: BaseAccountData }>,
  reply: FastifyReply
) {
  try {
    const result = await adminService.createUser(request.body);
    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create user'
    });
  }
}

// Handler for creating a helper
export async function createHelperHandler(
  request: FastifyRequest<{ Body: BaseAccountData }>,
  reply: FastifyReply
) {
  try {
    const result = await adminService.createHelper(request.body);
    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating helper:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create helper'
    });
  }
}

// Handler for creating a decider
export async function createDeciderHandler(
  request: FastifyRequest<{ Body: BaseAccountData }>,
  reply: FastifyReply
) {
  try {
    const result = await adminService.createDecider(request.body);
    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating decider:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create decider'
    });
  }
}

// Handler for creating a commercial
export async function createCommercialHandler(
  request: FastifyRequest<{ Body: BaseAccountData }>,
  reply: FastifyReply
) {
  try {
    const result = await adminService.createCommercial(request.body);
    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating commercial:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create commercial'
    });
  }
}

// Handler for creating a maintainer
export async function createMaintainerHandler(
  request: FastifyRequest<{ Body: BaseAccountData }>,
  reply: FastifyReply
) {
  try {
    const result = await adminService.createMaintainer(request.body);
    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating maintainer:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create maintainer'
    });
  }
}