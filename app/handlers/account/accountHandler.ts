import { FastifyRequest, FastifyReply } from 'fastify';
import { AccountService } from '../../services/account/account.service';

// Handler to get the profile based on the Bearer token
export async function getProfileHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.code(401).send({
        success: false,
        message: 'Missing or invalid Authorization header'
      });
    }
    const token = authHeader.split(' ')[1];
    const accountService = new AccountService();
    const profile = await accountService.getProfile(token);
    return reply.code(200).send({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error("Error retrieving profile:", error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to retrieve profile'
    });
  }
}

// Handler to update a profile based on the Bearer token and update data in the request body
export async function updateProfileHandler(
  request: FastifyRequest<{ Body: Partial<any> }>,
  reply: FastifyReply
) {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.code(401).send({
        success: false,
        message: 'Missing or invalid Authorization header'
      });
    }
    const token = authHeader.split(' ')[1];
    const updateData = request.body;
    const accountService = new AccountService();
    const updatedProfile = await accountService.updateProfile(token, updateData);
    return reply.code(200).send({
      success: true,
      data: updatedProfile
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to update profile'
    });
  }
}

// Handler to delete a profile based on the Bearer token
export async function deleteProfileHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.code(401).send({
        success: false,
        message: 'Missing or invalid Authorization header'
      });
    }
    const token = authHeader.split(' ')[1];
    const accountService = new AccountService();
    const result = await accountService.deleteProfile(token);
    return reply.code(200).send({
      success: true,
      message: result.message
    });
  } catch (error) {
    console.error("Error deleting profile:", error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to delete profile'
    });
  }
}