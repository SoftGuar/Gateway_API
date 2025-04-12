import { FastifyRequest, FastifyReply } from 'fastify';
import { HelperService } from '../../services/accountManagementService/helper.service';

const helperService = new HelperService();


// Handler for getting helper's usesr
export async function getHelperUsersHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await helperService.getHelperUsers(id);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error(`Error fetching users for helper with ID ${request.params.id}:`, error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch helper users'
    });
  }
}

