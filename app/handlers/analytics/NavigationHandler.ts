import { FastifyReply, FastifyRequest } from "fastify";
import { NavigationService } from "../../services/analytics/NavigationService";

export async function getNavigationLogs(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const logs = await NavigationService.getAllNavigationLogs();
    reply.send(logs);
  } catch (error) {
    reply.status(500).send({ error: "Failed to fetch navigation logs" });
  }
}

export async function getMostReroutingRequests(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const reroutingRequests =
      await NavigationService.getMostReroutingRequests();
    reply.send(reroutingRequests);
  } catch (error) {
    reply
      .status(500)
      .send({ error: "Failed to fetch most rerouting requests" });
  }
}

export async function getSuccessfulNavigations(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const successfulNavigations =
      await NavigationService.getSuccessfulNavigations();
    reply.send(successfulNavigations);
  } catch (error) {
    reply.status(500).send({ error: "Failed to fetch successful navigations" });
  }
}
