import { FastifyRequest, FastifyReply } from 'fastify';
import { MonitoringService } from '../../services/monitoringService/monitoring.service';

const monitoringService = new MonitoringService();
  
// Handler for getting all dispoissues
export async function getDispoIssuessHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const result = await monitoringService.getAllDispoIssues();
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching dispoIssues:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch dispoIssues'
    });
  }
}

// Handler for getting a dispoIssue by ID
export async function getDispoIssueByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await monitoringService.getDispoIssueById(id);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching dispoIssue:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch dispoIssue'
    });
  }
}

// Handler for getting a dispoIssue by product ID
export async function getDispoIssuesByDispositiveIdHandler(
  request: FastifyRequest<{ Params: { dispositiveId: string } }>,
  reply: FastifyReply
) {
  try {
    const { dispositiveId } = request.params;
    const result = await monitoringService.getDispoIssuesByDispositiveId(dispositiveId);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching dispoIssue by dispositive ID:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch dispoIssue by dispositive ID'
    });
  }
}
