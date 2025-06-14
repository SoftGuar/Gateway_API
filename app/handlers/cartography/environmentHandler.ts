import { FastifyRequest, FastifyReply } from 'fastify';
import { CartographieService } from '../../services/cartographie/cartographie.service';
import { EnvironmentCreateData } from '../../services/cartographie/types';
import { AuthenticationService } from '../../services/authentication/authenticationService';
import { AccountService } from '../../services/account/account.service';
import { Unknown } from '@sinclair/typebox';

const cartographieService = new CartographieService();

// Handler for creating environment
export async function createEnvironmentHandler(
  request: FastifyRequest<{ Body: EnvironmentCreateData }>,
  reply: FastifyReply
) {
  try {
    const authHeader = request.headers.authorization;
    let createdBy = 'unknown';
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const accountService = new AccountService();
      const userInfo = await accountService.getProfile(token);
      createdBy = `${userInfo.first_name} ${userInfo.last_name}` || "Unknown";
    }

    // Pass createdBy to the service
    const result = await cartographieService.environment.createEnvironment({
      ...request.body,
      createdBy, 
    });

    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating environment:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create environment'
    });
  }
}

// Handler for getting all environments
export async function getEnvironmentsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const result = await cartographieService.environment.getEnvironments();
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching environments:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch environments'
    });
  }
}

// Handler for getting environment by ID
export async function getEnvironmentByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await cartographieService.environment.getEnvironmentById(id);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching environment:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch environment'
    });
  }
}

// Handler for getting environment floors
export async function getEnvironmentFloorsHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await cartographieService.environment.getEnvironmentFloors(id);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching environment floors:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch environment floors'
    });
  }
}