// handlers/helperRecommendationHandler.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { AccountManagementService } from '../../services/accountManagementService/accountManagement.service';

const accountManagementService = new AccountManagementService();
export const getHelperRecommendations = async (
  request: FastifyRequest ,
  reply: FastifyReply
) => {
  try {
    const recommendations = await accountManagementService.getHelperRecommendations();
    
    return reply.code(200).send({
      success: true,
      data: recommendations
    });
  } catch (error: any) {
    
    return reply.code(500).send({
      success: false,
      message: error.message || 'Failed to get helper recommendations'
      
    });
  }
};

export const getHelperRecommendationById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const recommendation = await accountManagementService.getHelperRecommendationById(String(id));
    
    return reply.code(200).send({
      success: true,
      data: recommendation
    });
  } catch (error: any) {
    return reply.code(404).send({
      success: false,
      message: error.message || 'Helper recommendation not found'
    });
  }
};

export const approveHelperRecommendation = async (
  request: FastifyRequest<{ Params: { id: string }, Body: { password: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const { password } = request.body;
    
    const result = await accountManagementService.approveRecommendation(String(id), password);
    
    return reply.code(200).send({
      success: true,
      data: result,
      message: 'Helper recommendation approved successfully'
    });
  } catch (error: any) {
    return reply.code(400).send({
      success: false,
      message: error.message || 'Failed to approve helper recommendation'
    });
  }
};

export const rejectHelperRecommendation = async (
  request: FastifyRequest<{ Params: { id: string }, Body: { notes?: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const { notes } = request.body;
    
    const result = await accountManagementService.rejectRecommendation(String(id), notes);
    
    return reply.code(200).send({
      success: true,
      data: result,
      message: 'Helper recommendation rejected successfully'
    });
  } catch (error: any) {
    return reply.code(400).send({
      success: false,
      message: error.message || 'Failed to reject helper recommendation'
    });
  }
};

export const deleteHelperRecommendation = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    
    await accountManagementService.deleteHelperRecommendation(String(id));
    
    return reply.code(200).send({
      success: true,
      message: 'Helper recommendation deleted successfully'
    });
  } catch (error: any) {
    return reply.code(400).send({
      success: false,
      message: error.message || 'Failed to delete helper recommendation'
    });
  }
};