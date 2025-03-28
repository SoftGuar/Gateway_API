import { FastifyReply, FastifyRequest } from "fastify";
import { InterventionService } from "../../services/analytics/interventionService";

export async function getInterventionAverageDuration(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const result = await InterventionService.getInterventionAverageDuration();
    reply.send(result);
  } catch (error) {
    reply
      .status(500)
      .send({ error: "Failed to fetch intervention average duration" });
  }
}

export async function getMonthlyAverageDuration(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const result = await InterventionService.getMonthlyAverageDuration();
    reply.send(result);
  } catch (error) {
    reply
      .status(500)
      .send({ error: "Failed to fetch monthly average duration" });
  }
}

export async function getMaintainerInterventionCount(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const result = await InterventionService.getMaintainerInterventionCount();
    reply.send(result);
  } catch (error) {
    reply
      .status(500)
      .send({ error: "Failed to fetch maintainer intervention count" });
  }
}

export async function getAverageAnswerTime(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const result = await InterventionService.getAverageAnswerTime();
    reply.send(result);
  } catch (error) {
    reply.status(500).send({ error: "Failed to fetch average answer time" });
  }
}
