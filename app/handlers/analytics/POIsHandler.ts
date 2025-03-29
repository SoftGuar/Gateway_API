import { FastifyRequest, FastifyReply } from "fastify";
import { POIsService } from "../../services/analytics/POIsService";

export class POIsHandler {
  static async getTopVisitedPOIs(
    req: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    try {
      const topVisitedPOIs = await POIsService.getTopVisitedPOIs();
      reply.status(200).send(topVisitedPOIs);
    } catch (error) {
      console.error("Error in POIsHandler.getTopVisitedPOIs:", error);
      reply.status(500).send({ error: "Failed to fetch top visited POIs" });
    }
  }
}
