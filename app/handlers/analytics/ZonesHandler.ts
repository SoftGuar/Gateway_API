import { FastifyReply, FastifyRequest } from "fastify";
import { ZonesService } from "../../services/analytics/ZonesService";

export async function getTopVisitedZonesHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const topVisitedZones = await ZonesService.getTopVisitedZones();
    reply.send(topVisitedZones);
  } catch (error) {
    reply.status(500).send({ error: "Failed to fetch top visited zones" });
  }
}

export async function getAverageTimeSpentHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const averageTimeSpent = await ZonesService.getAverageTimeSpentInZones();
    reply.send(averageTimeSpent);
  } catch (error) {
    reply
      .status(500)
      .send({ error: "Failed to calculate average time spent in zones" });
  }
}

export async function getHighestObstaclesHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const highestObstacleZones =
      await ZonesService.getZonesWithHighestObstacleCount();
    reply.send(highestObstacleZones);
  } catch (error) {
    reply
      .status(500)
      .send({ error: "Failed to fetch zones with highest obstacle count" });
  }
}
