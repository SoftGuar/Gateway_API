import { FastifyRequest, FastifyReply } from "fastify";
import { SalesStatsService } from "../../services/analytics/salesStatsService";

const salesStatsService = new SalesStatsService();

export class SalesStatsHandler {
  async getCRR(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const crr = await salesStatsService.getCRR();
      reply.status(200).send(crr);
    } catch (error) {
      console.error("Error in SalesStatsHandler.getCRR:", error);
      reply
        .status(500)
        .send({ error: "Failed to fetch customer retention rate" });
    }
  }
  async getCustomerRetentionDetails(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const details = await salesStatsService.getCustomerRetentionDetails();
      reply.status(200).send(details);
    } catch (error) {
      console.error("Error in SalesStatsHandler.getCustomerRetentionDetails:", error);
      reply
        .status(500)
        .send({ error: "Failed to fetch customer retention details" });
    }
  }
}
