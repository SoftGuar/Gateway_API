import { FastifyReply, FastifyRequest } from "fastify";
import { UserSessionsService } from "../../services/analytics/UserSessionsService";
export class UserHandler {
  static async getTotalUsers(req: FastifyRequest, reply: FastifyReply) {
    try {
      const userTotal = await UserSessionsService.getTotalUsers();
      reply.status(200).send(userTotal);
    } catch (error) {
      console.error("Error in getUserTotal handler:", error);
      reply.status(500).send({ error: "Failed to fetch user total" });
    }
  }
  static async getTopUsers(req: FastifyRequest, reply: FastifyReply) {
    try {
      const topUsers = await UserSessionsService.getTopUsers();
      reply.status(200).send(topUsers);
    } catch (error) {
      console.error("Error in getTopUsers handler:", error);
      reply.status(500).send({ error: "Failed to fetch top users" });
    }
  }

  static async getUserSessionDuration(
    req: FastifyRequest,
    reply: FastifyReply
  ) {
    try {
      const sessionDurations =
        await UserSessionsService.getUserSessionDuration();
      reply.status(200).send(sessionDurations);
    } catch (error) {
      console.error("Error in getUserSessionDuration handler:", error);
      reply
        .status(500)
        .send({ error: "Failed to fetch user session durations" });
    }
  }

  static async getDAUs(req: FastifyRequest, reply: FastifyReply) {
    try {
      const daus = await UserSessionsService.getDAUs();
      reply.status(200).send(daus);
    } catch (error) {
      console.error("Error in getDAUs handler:", error);
      reply.status(500).send({ error: "Failed to fetch daily active users" });
    }
  }

  static async getMAUs(req: FastifyRequest, reply: FastifyReply) {
    try {
      const maus = await UserSessionsService.getMAUs();
      reply.status(200).send(maus);
    } catch (error) {
      console.error("Error in getMAUs handler:", error);
      reply.status(500).send({ error: "Failed to fetch monthly active users" });
    }
  }

  static async getWAUs(req: FastifyRequest, reply: FastifyReply) {
    try {
      const waus = await UserSessionsService.getWAUs();
      reply.status(200).send(waus);
    } catch (error) {
      console.error("Error in getWAUs handler:", error);
      reply.status(500).send({ error: "Failed to fetch weekly active users" });
    }
  }
}
