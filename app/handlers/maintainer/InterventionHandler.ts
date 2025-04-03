import { FastifyRequest, FastifyReply } from 'fastify';
import { MonitoringService } from '../../services/monitoringService/monitoring.service';
import { InterventionStatus } from '../../services/monitoringService/types';
import { UpdateInterventionData, CreateInterventionData, UpdateReportData } from '../../services/monitoringService/intervention.service';

const monitoringService = new MonitoringService();

// Handler pour obtenir toutes les interventions
export async function getAllInterventionsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const result = await monitoringService.getAllInterventions();
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching interventions:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch interventions'
    });
  }
}

// Handler pour obtenir une intervention par ID
export async function getInterventionByIdHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await monitoringService.getInterventionById(id);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching intervention:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch intervention'
    });
  }
}

// Handler pour obtenir les interventions par ID de mainteneur
export async function getInterventionsByMaintainerIdHandler(
  request: FastifyRequest<{ Params: { maintainerId: string } }>,
  reply: FastifyReply
) {
  try {
    const { maintainerId } = request.params;
    const result = await monitoringService.getInterventionsByMaintainerId(maintainerId);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching interventions by maintainer ID:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to fetch interventions by maintainer ID'
    });
  }
}

// Handler pour créer une nouvelle intervention
export async function createInterventionHandler(
  request: FastifyRequest<{ Body: CreateInterventionData }>,
  reply: FastifyReply
) {
  try {
    const interventionData = request.body;
    const result = await monitoringService.createIntervention(interventionData);
    return reply.code(201).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error creating intervention:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to create intervention'
    });
  }
}

// Handler pour mettre à jour une intervention
export async function updateInterventionHandler(
  request: FastifyRequest<{ Params: { id: string }, Body: UpdateInterventionData }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const updateData = request.body;
    const result = await monitoringService.updateIntervention(id, updateData);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error updating intervention:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to update intervention'
    });
  }
}


// Handler pour mettre à jour le statut d'une intervention
export async function updateInterventionStatusHandler(
  request: FastifyRequest<{ Params: { id: string }, Body: { status: InterventionStatus } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const { status } = request.body;
    const result = await monitoringService.updateInterventionStatus(id, status);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error updating intervention status:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to update intervention status'
    });
  }
}

//Handler pour mettre a jour le rapport d'une intervention 

export async function updateInterventionReportHandler(
  request: FastifyRequest<{ Params: { id: string }, Body: UpdateReportData }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const  reportData  = request.body;
    const result = await monitoringService.updateInterventionReport(id, reportData);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error updating intervention report:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to update intervention report'
    });
  }
}



// Handler pour supprimer une intervention
export async function deleteInterventionHandler(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  try {
    const { id } = request.params;
    const result = await monitoringService.deleteIntervention(id);
    return reply.code(200).send({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error deleting intervention:', error);
    return reply.code(500).send({
      success: false,
      message: 'Failed to delete intervention'
    });
  }
}